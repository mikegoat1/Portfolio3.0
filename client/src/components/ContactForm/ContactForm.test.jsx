import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "./index";

// ContactForm uses CSS custom properties; jsdom doesn't parse them, so we
// silence the MUI/Emotion "unknown property" noise that would otherwise clutter
// the test output.
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation((msg, ...args) => {
    // Let through errors that are actually relevant.
    if (
      typeof msg === "string" &&
      (msg.includes("Warning:") || msg.includes("Error:"))
    ) {
      // Suppress MUI/Emotion CSS variable warnings in jsdom.
      return;
    }
    console.warn(msg, ...args);
  });
});

afterAll(() => {
  console.error.mockRestore();
});

// ---------- helpers ----------

const fillForm = async (
  user,
  {
    name = "Alice",
    email = "alice@example.com",
    company = "Acme",
    projectType = "Full-stack build",
    budget = "$5k-$15k",
    timeline = "This month",
    message = "Hello!",
  } = {}
) => {
  if (name !== null) {
    await user.type(screen.getByRole("textbox", { name: /name/i }), name);
  }
  if (email !== null) {
    await user.type(screen.getByRole("textbox", { name: /email/i }), email);
  }
  if (company !== null) {
    await user.type(screen.getByRole("textbox", { name: /company/i }), company);
  }
  if (projectType !== null) {
    await user.selectOptions(
      screen.getByRole("combobox", { name: /project type/i }),
      projectType
    );
  }
  if (budget !== null) {
    await user.selectOptions(screen.getByRole("combobox", { name: /budget/i }), budget);
  }
  if (timeline !== null) {
    await user.selectOptions(
      screen.getByRole("combobox", { name: /timeline/i }),
      timeline
    );
  }
  if (message !== null) {
    await user.type(screen.getByRole("textbox", { name: /message/i }), message);
  }
};

const submitForm = async (user) => {
  await user.click(screen.getByRole("button", { name: /send message/i }));
};

// ---------- fetch mock reset ----------

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

// ---------- tests ----------

describe("ContactForm", () => {
  // PromptLabel renders the field name and "=" in adjacent sibling spans, so
  // the "=" sign is in its own text node. We use getAllByText with a function
  // matcher to find the combined visual label across element boundaries.
  const promptLabelText = (container, fieldName) => {
    // Find the span containing the field name text (e.g. "name", "email", "message")
    const spans = container.querySelectorAll("span");
    return Array.from(spans).some(
      (el) => el.textContent.trim() === fieldName
    );
  };

  describe("field rendering", () => {
    it("renders a name field with aria-label 'name'", () => {
      render(<ContactForm />);
      expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();
    });

    it("renders the prompt-style 'name' label segment in the DOM", () => {
      const { container } = render(<ContactForm />);
      expect(promptLabelText(container, "name")).toBe(true);
    });

    it("renders an email field with aria-label 'email'", () => {
      render(<ContactForm />);
      expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    });

    it("renders the prompt-style 'email' label segment in the DOM", () => {
      const { container } = render(<ContactForm />);
      expect(promptLabelText(container, "email")).toBe(true);
    });

    it("renders a message textarea with aria-label 'message'", () => {
      render(<ContactForm />);
      expect(screen.getByRole("textbox", { name: /message/i })).toBeInTheDocument();
    });

    it("renders client project intake fields", () => {
      render(<ContactForm />);
      expect(screen.getByRole("textbox", { name: /company/i })).toBeInTheDocument();
      expect(
        screen.getByRole("combobox", { name: /project type/i })
      ).toBeInTheDocument();
      expect(screen.getByRole("combobox", { name: /budget/i })).toBeInTheDocument();
      expect(screen.getByRole("combobox", { name: /timeline/i })).toBeInTheDocument();
    });

    it("renders the prompt-style 'message' label segment in the DOM", () => {
      const { container } = render(<ContactForm />);
      expect(promptLabelText(container, "message")).toBe(true);
    });

    it("renders the send button", () => {
      render(<ContactForm />);
      expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
    });
  });

  // ErrorMsg prepends "bash: " to the message, so rendered text is e.g.
  // "bash: name: required". We query the specific error element by id to
  // avoid matching the live region which also echoes the message.
  const findErrorById = (id) => document.getElementById(id);

  describe("validation — empty fields", () => {
    it("shows 'name: required' when name is blank on submit", async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      await submitForm(user);
      await waitFor(() => {
        const el = findErrorById("err-name");
        expect(el).not.toBeNull();
        expect(el.textContent).toMatch(/name: required/i);
      });
    });

    it("shows 'email: required' when email is blank on submit", async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      await submitForm(user);
      await waitFor(() => {
        const el = findErrorById("err-email");
        expect(el).not.toBeNull();
        expect(el.textContent).toMatch(/email: required/i);
      });
    });

    it("shows 'message: required' when message is blank on submit", async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      await submitForm(user);
      await waitFor(() => {
        const el = findErrorById("err-message");
        expect(el).not.toBeNull();
        expect(el.textContent).toMatch(/message: required/i);
      });
    });

    it("shows 'project_type: required' when project type is blank on submit", async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      await submitForm(user);
      await waitFor(() => {
        const el = findErrorById("err-project-type");
        expect(el).not.toBeNull();
        expect(el.textContent).toMatch(/project_type: required/i);
      });
    });

    it("shows 'timeline: required' when timeline is blank on submit", async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      await submitForm(user);
      await waitFor(() => {
        const el = findErrorById("err-timeline");
        expect(el).not.toBeNull();
        expect(el.textContent).toMatch(/timeline: required/i);
      });
    });

    it("does NOT call fetch when validation fails", async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      await submitForm(user);
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  describe("validation — invalid email", () => {
    it("shows 'email: invalid format' for a string without @", async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      await user.type(screen.getByRole("textbox", { name: /name/i }), "Alice");
      await user.type(screen.getByRole("textbox", { name: /email/i }), "notanemail");
      await user.type(screen.getByRole("textbox", { name: /message/i }), "Hello");
      await submitForm(user);
      await waitFor(() => {
        const el = findErrorById("err-email");
        expect(el).not.toBeNull();
        expect(el.textContent).toMatch(/email: invalid format/i);
      });
    });

    it("shows 'email: invalid format' for a string with @ but no domain", async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      await user.type(screen.getByRole("textbox", { name: /name/i }), "Alice");
      await user.type(screen.getByRole("textbox", { name: /email/i }), "bad@");
      await user.type(screen.getByRole("textbox", { name: /message/i }), "Hello");
      await submitForm(user);
      await waitFor(() => {
        const el = findErrorById("err-email");
        expect(el).not.toBeNull();
        expect(el.textContent).toMatch(/email: invalid format/i);
      });
    });

    it("accepts a well-formed email without format error", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });
      const user = userEvent.setup();
      render(<ContactForm />);
      await fillForm(user);
      await submitForm(user);
      await waitFor(() => {
        expect(screen.queryByText(/email: invalid format/i)).not.toBeInTheDocument();
      });
    });
  });

  describe("successful submission", () => {
    it("renders the success state after a 200 response from Formspree", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });
      const user = userEvent.setup();
      render(<ContactForm />);
      await fillForm(user, { name: "Alice", email: "alice@example.com", message: "Hi" });
      await submitForm(user);
      // The success view renders "[exit code 0] Message sent successfully." in a div.
      // Use getAllByText to handle it also appearing in the live region.
      await waitFor(() => {
        const matches = screen.getAllByText(/message sent successfully/i);
        expect(matches.length).toBeGreaterThan(0);
      });
    });

    it("shows the submitter's name in the 'I'll be in touch' line", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });
      const user = userEvent.setup();
      render(<ContactForm />);
      await fillForm(user, { name: "Bob", email: "bob@test.com", message: "Hey" });
      await submitForm(user);
      // "Thanks, Bob. I'll be in touch." is split across multiple text nodes.
      // We search the full textContent of the containing div.
      await waitFor(() => {
        const body = document.body.textContent;
        expect(body).toMatch(/thanks,\s*bob/i);
      });
    });

    it("shows a 'new message' button after success", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });
      const user = userEvent.setup();
      render(<ContactForm />);
      await fillForm(user);
      await submitForm(user);
      expect(await screen.findByText(/\[n\] new message/i)).toBeInTheDocument();
    });

    it("submits client project context to Formspree", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });
      const user = userEvent.setup();
      render(<ContactForm />);
      await fillForm(user, {
        name: "Client",
        email: "client@example.com",
        company: "Studio Co",
        projectType: "API/SaaS integration",
        budget: "$15k-$30k",
        timeline: "1-3 months",
        message: "Need Stripe and storage integration support.",
      });
      await submitForm(user);

      await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
      const [, options] = global.fetch.mock.calls[0];
      expect(JSON.parse(options.body)).toEqual({
        name: "Client",
        email: "client@example.com",
        company: "Studio Co",
        projectType: "API/SaaS integration",
        budget: "$15k-$30k",
        timeline: "1-3 months",
        message: "Need Stripe and storage integration support.",
      });
    });
  });

  describe("network error", () => {
    it("renders the error state when fetch rejects", async () => {
      global.fetch.mockRejectedValueOnce(new Error("Network failure"));
      const user = userEvent.setup();
      render(<ContactForm />);
      await fillForm(user);
      await submitForm(user);
      expect(
        await screen.findByText(/connection failed/i)
      ).toBeInTheDocument();
    });

    it("shows the retry button on network error", async () => {
      global.fetch.mockRejectedValueOnce(new Error("Network failure"));
      const user = userEvent.setup();
      render(<ContactForm />);
      await fillForm(user);
      await submitForm(user);
      expect(await screen.findByText(/\[r\] retry/i)).toBeInTheDocument();
    });

    it("shows the quit button on network error", async () => {
      global.fetch.mockRejectedValueOnce(new Error("Network failure"));
      const user = userEvent.setup();
      render(<ContactForm />);
      await fillForm(user);
      await submitForm(user);
      expect(await screen.findByText(/\[q\] quit/i)).toBeInTheDocument();
    });
  });

  describe("Formspree HTTP error responses", () => {
    it("renders the error state on a 400 response", async () => {
      global.fetch.mockResolvedValueOnce({ ok: false, status: 400, json: async () => ({}) });
      const user = userEvent.setup();
      render(<ContactForm />);
      await fillForm(user);
      await submitForm(user);
      expect(await screen.findByText(/connection failed/i)).toBeInTheDocument();
    });

    it("renders the error state on a 500 response", async () => {
      global.fetch.mockResolvedValueOnce({ ok: false, status: 500, json: async () => ({}) });
      const user = userEvent.setup();
      render(<ContactForm />);
      await fillForm(user);
      await submitForm(user);
      expect(await screen.findByText(/connection failed/i)).toBeInTheDocument();
    });
  });

  describe("keyboard navigation", () => {
    it("pressing Enter on the name field moves focus to the email field", async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      const nameInput = screen.getByRole("textbox", { name: /name/i });
      const emailInput = screen.getByRole("textbox", { name: /email/i });
      await user.click(nameInput);
      await user.type(nameInput, "Alice");
      fireEvent.keyDown(nameInput, { key: "Enter", code: "Enter" });
      expect(document.activeElement).toBe(emailInput);
    });

    it("pressing Enter on the email field moves focus to the company field", async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      const emailInput = screen.getByRole("textbox", { name: /email/i });
      const companyInput = screen.getByRole("textbox", { name: /company/i });
      await user.click(emailInput);
      fireEvent.keyDown(emailInput, { key: "Enter", code: "Enter" });
      expect(document.activeElement).toBe(companyInput);
    });

    it("pressing Enter on the company field moves focus to project type", async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      const companyInput = screen.getByRole("textbox", { name: /company/i });
      const projectTypeInput = screen.getByRole("combobox", { name: /project type/i });
      await user.click(companyInput);
      fireEvent.keyDown(companyInput, { key: "Enter", code: "Enter" });
      expect(document.activeElement).toBe(projectTypeInput);
    });

    it("pressing Ctrl+Enter on the message textarea submits the form", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });
      const user = userEvent.setup();
      render(<ContactForm />);
      await fillForm(user);
      const messageInput = screen.getByRole("textbox", { name: /message/i });
      fireEvent.keyDown(messageInput, {
        key: "Enter",
        code: "Enter",
        ctrlKey: true,
      });
      expect(await screen.findByText(/message sent successfully/i)).toBeInTheDocument();
    });
  });
});
