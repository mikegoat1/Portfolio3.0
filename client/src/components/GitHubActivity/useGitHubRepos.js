import { useCallback, useEffect, useRef, useState } from "react";
import { GITHUB_USERNAME } from "../../config/site";

const ENDPOINT = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`;
const CACHE_KEY = "gh_repos";

// Trim the GitHub payload to only what the cards render — keeps sessionStorage small.
const slimRepo = (r) => ({
  id: r.id,
  name: r.name,
  description: r.description,
  language: r.language,
  stars: r.stargazers_count,
  url: r.html_url,
});

const readCache = () => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeCache = (repos) => {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(repos));
  } catch {
    /* sessionStorage unavailable (private mode) — fail silently */
  }
};

/**
 * Fetches recent public repos for GITHUB_USERNAME from the unauthenticated
 * GitHub REST API. Caches in sessionStorage to respect the 60 req/hr limit.
 *
 * Returns:
 *   status: "loading" | "success" | "empty" | "rate-limit" | "error"
 *   repos:  slim repo array (may be stale cache on rate-limit)
 *   resetTime: local HH:MM string when rate-limited (or null)
 *   isStale: true if showing cached data during an error
 *   refetch: () => void  (forces a network fetch, bypassing cache)
 */
export default function useGitHubRepos() {
  const [state, setState] = useState({
    status: "loading",
    repos: [],
    resetTime: null,
    isStale: false,
  });
  const mountedRef = useRef(true);

  const load = useCallback(async (force = false) => {
    if (!mountedRef.current) return;

    if (!force) {
      const cached = readCache();
      if (cached && cached.length > 0) {
        setState({ status: "success", repos: cached, resetTime: null, isStale: false });
        return;
      }
    }

    setState((s) => ({ ...s, status: "loading" }));

    try {
      const res = await fetch(ENDPOINT, {
        headers: { Accept: "application/vnd.github+json" },
      });

      const remaining = res.headers.get("X-RateLimit-Remaining");
      const reset = res.headers.get("X-RateLimit-Reset");

      if ((res.status === 403 || res.status === 429) && remaining === "0") {
        const resetTime = reset
          ? new Date(Number(reset) * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : null;
        const cached = readCache();
        if (!mountedRef.current) return;
        setState({
          status: "rate-limit",
          repos: cached || [],
          resetTime,
          isStale: Boolean(cached && cached.length > 0),
        });
        return;
      }

      if (!res.ok) throw new Error(`GitHub responded ${res.status}`);

      const data = await res.json();
      const repos = Array.isArray(data) ? data.map(slimRepo) : [];
      if (!mountedRef.current) return;

      if (repos.length === 0) {
        setState({ status: "empty", repos: [], resetTime: null, isStale: false });
        return;
      }

      writeCache(repos);
      setState({ status: "success", repos, resetTime: null, isStale: false });
    } catch {
      const cached = readCache();
      if (!mountedRef.current) return;
      setState({
        status: "error",
        repos: cached || [],
        resetTime: null,
        isStale: Boolean(cached && cached.length > 0),
      });
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    load();
    return () => {
      mountedRef.current = false;
    };
  }, [load]);

  const refetch = useCallback(() => load(true), [load]);

  return { ...state, refetch };
}
