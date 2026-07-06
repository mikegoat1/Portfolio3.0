import { renderHook, act, waitFor } from "@testing-library/react";
import useGitHubRepos from "./useGitHubRepos";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const makeFakeRepo = (overrides = {}) => ({
  id: 1,
  name: "my-repo",
  description: "A cool repo",
  language: "JavaScript",
  stargazers_count: 5,
  html_url: "https://github.com/mikegoat1/my-repo",
  fork: false,
  archived: false,
  ...overrides,
});

const makeSlim = (r) => ({
  id: r.id,
  name: r.name,
  description: r.description,
  language: r.language,
  stars: r.stargazers_count,
  url: r.html_url,
});

const makeOkResponse = (repos, extraHeaders = {}) => ({
  ok: true,
  status: 200,
  headers: {
    get: (name) => {
      const all = {
        "X-RateLimit-Remaining": "59",
        "X-RateLimit-Reset": null,
        ...extraHeaders,
      };
      return all[name] ?? null;
    },
  },
  json: async () => repos,
});

const makeRateLimitResponse = (resetEpoch) => ({
  ok: false,
  status: 403,
  headers: {
    get: (name) => {
      const all = {
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": String(resetEpoch),
      };
      return all[name] ?? null;
    },
  },
  json: async () => ({}),
});

// ---------------------------------------------------------------------------
// sessionStorage mock
// ---------------------------------------------------------------------------

let store = {};
const sessionStorageMock = {
  getItem: jest.fn((key) => store[key] ?? null),
  setItem: jest.fn((key, val) => { store[key] = val; }),
  removeItem: jest.fn((key) => { delete store[key]; }),
  clear: jest.fn(() => { store = {}; }),
};

Object.defineProperty(window, "sessionStorage", {
  value: sessionStorageMock,
  writable: true,
});

// ---------------------------------------------------------------------------
// Setup / teardown
// ---------------------------------------------------------------------------

beforeEach(() => {
  store = {};
  jest.clearAllMocks();
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("useGitHubRepos", () => {
  describe("successful fetch", () => {
    it("populates repos and sets status to 'success'", async () => {
      const fakeRepos = [makeFakeRepo({ id: 1 }), makeFakeRepo({ id: 2, name: "other-repo" })];
      global.fetch.mockResolvedValueOnce(makeOkResponse(fakeRepos));

      const { result } = renderHook(() => useGitHubRepos());

      await waitFor(() => expect(result.current.status).toBe("success"));

      expect(result.current.repos).toHaveLength(2);
      expect(result.current.repos[0]).toEqual(makeSlim(fakeRepos[0]));
    });

    it("sets loading to false (status is not 'loading') after data arrives", async () => {
      global.fetch.mockResolvedValueOnce(makeOkResponse([makeFakeRepo()]));

      const { result } = renderHook(() => useGitHubRepos());
      await waitFor(() => expect(result.current.status).not.toBe("loading"));

      expect(result.current.status).toBe("success");
    });

    it("isStale is false on a clean successful fetch", async () => {
      global.fetch.mockResolvedValueOnce(makeOkResponse([makeFakeRepo()]));

      const { result } = renderHook(() => useGitHubRepos());
      await waitFor(() => expect(result.current.status).toBe("success"));

      expect(result.current.isStale).toBe(false);
    });

    it("trims the repo payload to only the slim fields", async () => {
      const fat = makeFakeRepo({ id: 42, extra_field: "should be dropped" });
      global.fetch.mockResolvedValueOnce(makeOkResponse([fat]));

      const { result } = renderHook(() => useGitHubRepos());
      await waitFor(() => expect(result.current.status).toBe("success"));

      const repo = result.current.repos[0];
      expect(repo).toEqual(makeSlim(fat));
      expect(repo.extra_field).toBeUndefined();
    });
  });

  describe("sessionStorage caching", () => {
    it("writes repos to sessionStorage under 'gh_repos_v3' after a successful fetch", async () => {
      const fakeRepos = [makeFakeRepo()];
      global.fetch.mockResolvedValueOnce(makeOkResponse(fakeRepos));

      const { result } = renderHook(() => useGitHubRepos());
      await waitFor(() => expect(result.current.status).toBe("success"));

      expect(sessionStorageMock.setItem).toHaveBeenCalledWith(
        "gh_repos_v3",
        JSON.stringify([makeSlim(fakeRepos[0])])
      );
    });

    it("filters old portfolio repos, forks, and archived repos before rendering", async () => {
      const fakeRepos = [
        makeFakeRepo({ id: 1, name: "ecom-starter-kit" }),
        makeFakeRepo({ id: 2, name: "Ticket-Scalper" }),
        makeFakeRepo({ id: 3, name: "forked", fork: true }),
        makeFakeRepo({ id: 4, name: "archived", archived: true }),
        makeFakeRepo({ id: 5, name: "KsenseAssignment" }),
      ];
      global.fetch.mockResolvedValueOnce(makeOkResponse(fakeRepos));

      const { result } = renderHook(() => useGitHubRepos());
      await waitFor(() => expect(result.current.status).toBe("success"));

      expect(result.current.repos).toEqual([makeSlim(fakeRepos[0])]);
    });

    it("reads from cache on second call and does NOT call fetch again", async () => {
      const slim = [makeSlim(makeFakeRepo())];
      // Prime the mock so getItem returns the serialised cache
      sessionStorageMock.getItem.mockReturnValue(JSON.stringify(slim));

      const { result } = renderHook(() => useGitHubRepos());
      await waitFor(() => expect(result.current.status).toBe("success"));

      expect(global.fetch).not.toHaveBeenCalled();
      expect(result.current.repos).toEqual(slim);
    });

    it("cache hit sets status to 'success' with the cached repos", async () => {
      const cached = [makeSlim(makeFakeRepo({ id: 99, name: "cached-repo" }))];
      sessionStorageMock.getItem.mockReturnValue(JSON.stringify(cached));

      const { result } = renderHook(() => useGitHubRepos());
      await waitFor(() => expect(result.current.status).toBe("success"));

      expect(result.current.repos[0].name).toBe("cached-repo");
    });

    it("bypasses cache when refetch() is called", async () => {
      const cached = [makeSlim(makeFakeRepo({ id: 1, name: "old" }))];
      sessionStorageMock.getItem.mockReturnValue(JSON.stringify(cached));

      const fresh = [makeFakeRepo({ id: 2, name: "fresh" })];
      global.fetch.mockResolvedValueOnce(makeOkResponse(fresh));

      const { result } = renderHook(() => useGitHubRepos());
      // First render uses cache
      await waitFor(() => expect(result.current.status).toBe("success"));
      expect(global.fetch).not.toHaveBeenCalled();

      // refetch bypasses cache — clear the mock return so the force=true path
      // goes to the network and then updates cache with the fresh response.
      sessionStorageMock.getItem.mockReturnValue(null);

      act(() => { result.current.refetch(); });
      await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(result.current.status).toBe("success"));
      expect(result.current.repos[0].name).toBe("fresh");
    });
  });

  describe("rate-limit response (403 + X-RateLimit-Remaining: 0)", () => {
    it("sets status to 'rate-limit'", async () => {
      const resetEpoch = Math.floor(Date.now() / 1000) + 3600;
      global.fetch.mockResolvedValueOnce(makeRateLimitResponse(resetEpoch));

      const { result } = renderHook(() => useGitHubRepos());
      await waitFor(() => expect(result.current.status).toBe("rate-limit"));
    });

    it("parses resetTime into a HH:MM string", async () => {
      // Use a known epoch: 2000-01-01T12:00:00 UTC = 946728000
      const resetEpoch = 946728000;
      global.fetch.mockResolvedValueOnce(makeRateLimitResponse(resetEpoch));

      const { result } = renderHook(() => useGitHubRepos());
      await waitFor(() => expect(result.current.status).toBe("rate-limit"));

      // resetTime must be a non-null string that looks like HH:MM
      expect(result.current.resetTime).toMatch(/^\d{1,2}:\d{2}/);
    });

    it("isStale is true and repos contains cached data when rate-limited", async () => {
      const cached = [makeSlim(makeFakeRepo({ id: 5, name: "stale-repo" }))];
      const resetEpoch = Math.floor(Date.now() / 1000) + 3600;
      global.fetch.mockResolvedValueOnce(makeRateLimitResponse(resetEpoch));

      // First getItem call (cache check before network): cache miss → forces fetch.
      // Second getItem call (inside rate-limit handler): returns stale data.
      sessionStorageMock.getItem
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(JSON.stringify(cached));

      const { result } = renderHook(() => useGitHubRepos());
      await waitFor(() => expect(result.current.status).toBe("rate-limit"));

      expect(result.current.isStale).toBe(true);
      expect(result.current.repos).toEqual(cached);
    });

    it("repos is an empty array when rate-limited with no cache", async () => {
      const resetEpoch = Math.floor(Date.now() / 1000) + 3600;
      global.fetch.mockResolvedValueOnce(makeRateLimitResponse(resetEpoch));

      // No cache in store
      const { result } = renderHook(() => useGitHubRepos());
      await waitFor(() => expect(result.current.status).toBe("rate-limit"));

      expect(result.current.repos).toEqual([]);
      expect(result.current.isStale).toBe(false);
    });
  });

  describe("network error (fetch rejection)", () => {
    it("sets status to 'error' when fetch rejects", async () => {
      global.fetch.mockRejectedValueOnce(new Error("Network down"));

      const { result } = renderHook(() => useGitHubRepos());
      await waitFor(() => expect(result.current.status).toBe("error"));
    });

    it("repos is empty array with no stale cache", async () => {
      global.fetch.mockRejectedValueOnce(new Error("Network down"));

      const { result } = renderHook(() => useGitHubRepos());
      await waitFor(() => expect(result.current.status).toBe("error"));

      expect(result.current.repos).toEqual([]);
      expect(result.current.isStale).toBe(false);
    });

    it("returns stale cache as fallback when fetch fails and cache exists", async () => {
      const cached = [makeSlim(makeFakeRepo({ id: 7, name: "fallback-repo" }))];

      // First getItem call (cache check before network): miss → triggers fetch.
      // Second getItem call (inside catch handler): returns stale data.
      sessionStorageMock.getItem
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(JSON.stringify(cached));

      global.fetch.mockRejectedValueOnce(new Error("Network down"));

      const { result } = renderHook(() => useGitHubRepos());
      await waitFor(() => expect(result.current.status).toBe("error"));

      expect(result.current.repos).toEqual(cached);
      expect(result.current.isStale).toBe(true);
    });
  });

  describe("empty API response", () => {
    it("sets status to 'empty' when the API returns an empty array", async () => {
      global.fetch.mockResolvedValueOnce(makeOkResponse([]));

      const { result } = renderHook(() => useGitHubRepos());
      await waitFor(() => expect(result.current.status).toBe("empty"));

      expect(result.current.repos).toEqual([]);
    });
  });
});
