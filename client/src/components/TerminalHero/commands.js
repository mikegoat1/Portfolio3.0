// Command definitions for the TerminalHero CLI.
//
// Each command returns an "output" — an array of line objects. A line is:
//   { segments: [{ text, color, weight, italic }] }
// or a convenience { text, color } single-segment line.
// `kind: "rule"` renders a separator rule. `kind: "blank"` is an empty line.
//
// Side-effecting commands (about/projects/contact/clear) return an optional
// `action` describing navigation or clearing — the component executes it.

import { EMAIL, LINKEDIN_HANDLE, GITHUB_USERNAME } from "../../config/site";

const C = {
  text: "var(--text)",
  muted: "var(--text-muted)",
  accent: "var(--accent)",
  accent2: "var(--accent-2)",
  error: "var(--terminal-error)",
};

const rule = () => ({ kind: "rule" });
const blank = () => ({ kind: "blank" });
const line = (text, color = C.text, extra = {}) => ({
  segments: [{ text, color, ...extra }],
});

// Ordered list drives both the `help` table and Tab autocomplete.
export const COMMAND_NAMES = [
  "about",
  "projects",
  "contact",
  "whoami",
  "help",
  "clear",
];

const HELP_ROWS = [
  ["about", "// about me"],
  ["projects", "// view recent work"],
  ["contact", "// get in touch"],
  ["whoami", "// who is this guy?"],
  ["help", "// show this message"],
  ["clear", "// clear the terminal"],
];

const commands = {
  help: () => ({
    output: [
      line("Available commands:", C.muted),
      rule(),
      ...HELP_ROWS.map(([name, desc]) => ({
        segments: [
          { text: name.padEnd(11, " "), color: C.accent },
          { text: desc, color: C.muted },
        ],
      })),
      rule(),
      line("Tip: press Tab to autocomplete.", C.muted, { italic: true }),
    ],
  }),

  whoami: () => ({
    output: [
      line("michael johnson", C.text, { weight: 500 }),
      line("full-stack developer — los angeles, ca", C.muted),
      line("5+ years · apple · 2U · open to roles", C.muted),
    ],
  }),

  about: () => ({
    output: [
      line("// about michael johnson", C.muted),
      rule(),
      line("Frontend + backend engineer with a", C.text),
      line("passion for craft and clean systems.", C.text),
      line("React · Node.js · AWS · MongoDB · MySQL", C.text),
      blank(),
      {
        segments: [
          { text: 'Type "contact" to get in touch.', color: C.muted },
        ],
      },
      line("→ opening /about …", C.accent2),
    ],
    action: { type: "navigate", to: "/about" },
  }),

  projects: () => ({
    output: [
      line("// recent work — ls ~/projects", C.muted),
      rule(),
      ...[
        ["01", "the-event.tsx", "React · Node · MongoDB"],
        ["02", "little-lemon.tsx", "React"],
        ["03", "flick-picker.tsx", "HTML · CSS · jQuery"],
        ["04", "ticket-scalper.tsx", "Express · Sequelize"],
        ["05", "serverless-task-tracker.tsx", "AWS · Lambda · DynamoDB"],
      ].map(([idx, file, tags]) => ({
        segments: [
          { text: `${idx}  `, color: C.muted },
          { text: file.padEnd(30, " "), color: C.accent },
          { text: tags, color: C.muted },
        ],
      })),
      blank(),
      line("→  /work  to see full case studies", C.accent2),
    ],
    action: { type: "navigate", to: "/work" },
  }),

  contact: () => ({
    output: [
      line("// get in touch", C.muted),
      rule(),
      {
        segments: [
          { text: "email     ", color: C.muted },
          { text: EMAIL, color: C.text },
        ],
      },
      {
        segments: [
          { text: "linkedin  ", color: C.muted },
          { text: LINKEDIN_HANDLE, color: C.text },
        ],
      },
      {
        segments: [
          { text: "github    ", color: C.muted },
          { text: `github.com/${GITHUB_USERNAME}`, color: C.text },
        ],
      },
      blank(),
      line("→ opening contact form …", C.accent2),
    ],
    action: { type: "navigate", to: "/contact" },
  }),

  clear: () => ({ output: [], action: { type: "clear" } }),
};

/**
 * Resolve a raw input string to a command result.
 * Returns { output, action } or an error result for unknown commands.
 */
export function runCommand(raw) {
  const input = raw.trim();
  if (input === "") return { output: [] };

  // Allow "open contact-form" alias from the contact output.
  const normalized =
    input === "open contact-form" ? "contact" : input.split(/\s+/)[0];

  const cmd = commands[normalized];
  if (!cmd) {
    return {
      isError: true,
      output: [
        {
          segments: [
            { text: "bash: command not found: ", color: C.error },
            { text: input, color: C.error },
          ],
        },
      ],
    };
  }
  return cmd();
}

export { C as COLORS };
