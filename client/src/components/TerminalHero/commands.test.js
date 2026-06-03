import { runCommand, COMMAND_NAMES } from "./commands";

describe("runCommand", () => {
  describe("help", () => {
    it("returns a non-empty output array", () => {
      const { output } = runCommand("help");
      expect(Array.isArray(output)).toBe(true);
      expect(output.length).toBeGreaterThan(0);
    });

    it("output includes an 'Available commands' line", () => {
      const { output } = runCommand("help");
      const flat = output
        .flatMap((l) => (l.segments ? l.segments.map((s) => s.text) : [l.text]))
        .filter(Boolean)
        .join(" ");
      expect(flat).toMatch(/available commands/i);
    });

    it("output lists all known command names", () => {
      const { output } = runCommand("help");
      const flat = output
        .flatMap((l) => (l.segments ? l.segments.map((s) => s.text) : [l.text]))
        .filter(Boolean)
        .join(" ");
      COMMAND_NAMES.forEach((name) => {
        expect(flat).toMatch(name);
      });
    });

    it("does not return an action", () => {
      const result = runCommand("help");
      expect(result.action).toBeUndefined();
    });
  });

  describe("whoami", () => {
    it("returns a non-empty output array", () => {
      const { output } = runCommand("whoami");
      expect(output.length).toBeGreaterThan(0);
    });

    it("output mentions michael johnson", () => {
      const { output } = runCommand("whoami");
      const flat = output
        .flatMap((l) => (l.segments ? l.segments.map((s) => s.text) : [l.text]))
        .filter(Boolean)
        .join(" ");
      expect(flat).toMatch(/michael johnson/i);
    });

    it("does not return an action", () => {
      const result = runCommand("whoami");
      expect(result.action).toBeUndefined();
    });
  });

  describe("about", () => {
    it("returns a navigate action to /about", () => {
      const { action } = runCommand("about");
      expect(action).toEqual({ type: "navigate", to: "/about" });
    });

    it("output is non-empty", () => {
      const { output } = runCommand("about");
      expect(output.length).toBeGreaterThan(0);
    });
  });

  describe("projects", () => {
    it("returns a navigate action to /work", () => {
      const { action } = runCommand("projects");
      expect(action).toEqual({ type: "navigate", to: "/work" });
    });

    it("output is non-empty", () => {
      const { output } = runCommand("projects");
      expect(output.length).toBeGreaterThan(0);
    });
  });

  describe("contact", () => {
    it("returns a navigate action to /contact", () => {
      const { action } = runCommand("contact");
      expect(action).toEqual({ type: "navigate", to: "/contact" });
    });

    it("output is non-empty", () => {
      const { output } = runCommand("contact");
      expect(output.length).toBeGreaterThan(0);
    });
  });

  describe("clear", () => {
    it("returns an action with type 'clear'", () => {
      const { action } = runCommand("clear");
      expect(action).toEqual({ type: "clear" });
    });

    it("returns an empty output array", () => {
      const { output } = runCommand("clear");
      expect(output).toEqual([]);
    });
  });

  describe("'open contact-form' alias", () => {
    it("resolves to the contact command output", () => {
      const alias = runCommand("open contact-form");
      const direct = runCommand("contact");
      expect(alias.output).toEqual(direct.output);
    });

    it("returns the same navigate action as contact", () => {
      const { action } = runCommand("open contact-form");
      expect(action).toEqual({ type: "navigate", to: "/contact" });
    });
  });

  describe("unknown commands", () => {
    it("returns isError: true", () => {
      const result = runCommand("foobar");
      expect(result.isError).toBe(true);
    });

    it("output contains 'bash: command not found:' with the input", () => {
      const { output } = runCommand("foobar");
      const flat = output
        .flatMap((l) => (l.segments ? l.segments.map((s) => s.text) : [l.text]))
        .filter(Boolean)
        .join("");
      expect(flat).toMatch(/bash: command not found:/);
      expect(flat).toContain("foobar");
    });

    it("echoes the full multi-word unknown input in the error", () => {
      const { output } = runCommand("rm -rf /");
      const flat = output
        .flatMap((l) => (l.segments ? l.segments.map((s) => s.text) : []))
        .filter(Boolean)
        .join("");
      expect(flat).toContain("rm -rf /");
    });

    it("does not return an action", () => {
      const result = runCommand("foobar");
      expect(result.action).toBeUndefined();
    });
  });

  describe("empty input", () => {
    it("returns an empty output for an empty string", () => {
      const result = runCommand("");
      expect(result.output).toEqual([]);
    });

    it("returns an empty output for a whitespace-only string", () => {
      const result = runCommand("   ");
      expect(result.output).toEqual([]);
    });
  });

  describe("case sensitivity", () => {
    it("treats 'HELP' as an unknown command (commands are lowercase only)", () => {
      const result = runCommand("HELP");
      expect(result.isError).toBe(true);
    });

    it("treats 'Help' as an unknown command", () => {
      const result = runCommand("Help");
      expect(result.isError).toBe(true);
    });

    it("accepts lowercase 'help' correctly", () => {
      const result = runCommand("help");
      expect(result.isError).toBeUndefined();
      expect(result.output.length).toBeGreaterThan(0);
    });
  });
});
