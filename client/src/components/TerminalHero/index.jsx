import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./TerminalHero.css";
import { runCommand, COMMAND_NAMES } from "./commands";

const PROMPT_HOST = "~/portfolio";
const SUGGESTED = ["help", "whoami", "about", "projects", "contact"];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---- Presentational helpers -------------------------------------------------

const Prompt = ({ ariaHidden }) => (
  <Box
    component="span"
    aria-hidden={ariaHidden ? "true" : undefined}
    sx={{ flexShrink: 0, whiteSpace: "pre" }}
  >
    <Box component="span" sx={{ color: "var(--accent)", fontWeight: 500 }}>
      {PROMPT_HOST}
    </Box>
    <Box component="span" sx={{ color: "var(--text-muted)", mx: "0.5ch" }}>
      $
    </Box>
  </Box>
);

const OutputLine = ({ line }) => {
  if (line.kind === "blank") return <Box sx={{ height: "1.65em" }} />;
  if (line.kind === "rule") {
    return (
      <Box
        aria-hidden="true"
        sx={{
          borderTop: "1px solid var(--border)",
          opacity: 0.3,
          my: "0.4em",
          width: "100%",
          maxWidth: "34ch",
        }}
      />
    );
  }
  return (
    <Box sx={{ whiteSpace: "pre-wrap" }}>
      {line.segments.map((seg, i) => (
        <Box
          component="span"
          key={i}
          sx={{
            color: seg.color,
            fontWeight: seg.weight || 400,
            fontStyle: seg.italic ? "italic" : "normal",
          }}
        >
          {seg.text}
        </Box>
      ))}
    </Box>
  );
};

const HistoryEntry = ({ entry }) => (
  <Box sx={{ mb: "var(--space-2)" }}>
    {/* committed input line */}
    <Box sx={{ display: "flex", alignItems: "baseline" }}>
      <Prompt ariaHidden />
      <Box component="span" sx={{ color: "var(--text)" }}>
        {entry.command}
      </Box>
    </Box>
    {/* output block */}
    {entry.output.length > 0 && (
      <Box sx={{ py: "var(--space-2)" }}>
        {entry.output.map((line, i) => (
          <OutputLine key={i} line={line} />
        ))}
      </Box>
    )}
  </Box>
);

// ---- Main component ---------------------------------------------------------

const TerminalHero = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const viewportRef = useRef(null);
  const liveRef = useRef(null);

  const [history, setHistory] = useState([]); // [{ command, output }]
  const [value, setValue] = useState("");
  const [executing, setExecuting] = useState(false);
  const [introLines, setIntroLines] = useState([]); // pre-history intro block
  const [introDone, setIntroDone] = useState(false);

  const cmdHistoryRef = useRef([]); // raw command strings for ArrowUp/Down
  const histIndexRef = useRef(-1);
  const reduced = prefersReducedMotion();

  // --- Intro sequence (gated) ---
  useEffect(() => {
    const finalIntro = [
      { type: "cmd", text: "whoami" },
      { type: "out", text: "michael johnson — full-stack developer" },
      { type: "blank" },
      { type: "out", text: 'Type "help" for available commands.' },
    ];

    if (reduced) {
      setIntroLines(finalIntro);
      setIntroDone(true);
      return;
    }

    const timers = [];
    let acc = 300; // first-line delay
    finalIntro.forEach((node) => {
      timers.push(
        setTimeout(() => {
          setIntroLines((prev) => [...prev, node]);
        }, acc)
      );
      acc += 400; // pause between lines (simulated thinking)
    });
    timers.push(setTimeout(() => setIntroDone(true), acc));
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  // --- Auto-scroll to newest output ---
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    vp.scrollTo({
      top: vp.scrollHeight,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [history, introLines, executing, reduced]);

  const announce = useCallback((msg) => {
    if (liveRef.current) liveRef.current.textContent = msg;
  }, []);

  const focusInput = useCallback(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const execute = useCallback(
    (raw) => {
      const command = raw.trim();
      if (command === "") {
        setHistory((h) => [...h, { command: "", output: [] }]);
        return;
      }

      cmdHistoryRef.current.push(command);
      histIndexRef.current = cmdHistoryRef.current.length;

      const result = runCommand(command);

      const commit = () => {
        if (result.action && result.action.type === "clear") {
          setHistory([]);
          setIntroLines([]);
          announce("Terminal cleared.");
          setExecuting(false);
          return;
        }

        setHistory((h) => [...h, { command, output: result.output }]);

        // Screen-reader announcement of textual output.
        const flat = result.output
          .filter((l) => l.segments)
          .map((l) => l.segments.map((s) => s.text).join(""))
          .join(". ");
        announce(flat || (result.isError ? "Command not found." : "Done."));

        setExecuting(false);

        if (result.action && result.action.type === "navigate") {
          // Brief beat so the output is visible before route change.
          setTimeout(() => navigate(result.action.to), reduced ? 0 : 450);
        }
      };

      // Simulated latency preserves the terminal illusion.
      if (reduced) {
        commit();
      } else {
        setExecuting(true);
        const delay = 80 + Math.random() * 120; // 80–200ms
        setTimeout(commit, delay);
      }
    },
    [announce, navigate, reduced]
  );

  const handleKeyDown = (e) => {
    if (executing) {
      e.preventDefault();
      return;
    }
    switch (e.key) {
      case "Enter": {
        e.preventDefault();
        execute(value);
        setValue("");
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const hist = cmdHistoryRef.current;
        if (hist.length === 0) break;
        histIndexRef.current = Math.max(0, histIndexRef.current - 1);
        setValue(hist[histIndexRef.current] || "");
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        const hist = cmdHistoryRef.current;
        if (hist.length === 0) break;
        histIndexRef.current = Math.min(hist.length, histIndexRef.current + 1);
        setValue(hist[histIndexRef.current] || "");
        break;
      }
      case "Tab": {
        e.preventDefault();
        const partial = value.trim().toLowerCase();
        if (!partial) break;
        const matches = COMMAND_NAMES.filter((c) => c.startsWith(partial));
        if (matches.length === 0) break;
        // Cycle through matches if already on one.
        const curIdx = matches.indexOf(partial);
        const next = matches[(curIdx + 1) % matches.length];
        setValue(next);
        break;
      }
      case "Escape": {
        e.preventDefault();
        if (inputRef.current) inputRef.current.blur();
        break;
      }
      default:
        break;
    }
  };

  const runSuggested = (cmd) => {
    setValue("");
    focusInput();
    execute(cmd);
  };

  return (
    <Box
      role="region"
      aria-label="Interactive terminal"
      sx={{
        backgroundColor: "var(--terminal-chrome)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--terminal-shadow)",
        overflow: "hidden",
        width: "100%",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Title bar */}
      <Box
        sx={{
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: "var(--space-3)",
          backgroundColor: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <Box sx={{ display: "flex", gap: "6px" }} aria-hidden="true">
          {[
            "var(--terminal-dot-close)",
            "var(--terminal-dot-min)",
            "var(--terminal-dot-max)",
          ].map((c, i) => (
            <Box
              key={i}
              sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: c }}
            />
          ))}
        </Box>
        <Box
          component="span"
          sx={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
          }}
        >
          terminal — bash
        </Box>
      </Box>

      {/* Scrollback viewport (clicking anywhere focuses the input) */}
      <Box
        ref={viewportRef}
        onClick={focusInput}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        sx={{
          minHeight: { xs: 320, md: 420 },
          maxHeight: "60vh",
          overflowY: "auto",
          p: "var(--space-3)",
          backgroundColor: "var(--terminal-chrome)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.875rem",
          lineHeight: 1.65,
          color: "var(--text)",
          cursor: "text",
        }}
      >
        {/* Intro block */}
        {introLines.map((node, i) => {
          if (node.type === "blank")
            return <Box key={`i-${i}`} sx={{ height: "1.65em" }} />;
          if (node.type === "cmd")
            return (
              <Box key={`i-${i}`} sx={{ display: "flex", alignItems: "baseline" }}>
                <Prompt ariaHidden />
                <Box component="span" sx={{ color: "var(--text)" }}>
                  {node.text}
                </Box>
              </Box>
            );
          return (
            <Box key={`i-${i}`} sx={{ color: "var(--text)", whiteSpace: "pre-wrap" }}>
              {node.text}
            </Box>
          );
        })}

        {introLines.length > 0 && (
          <Box sx={{ height: "var(--space-2)" }} />
        )}

        {/* Command history */}
        {history.map((entry, i) => (
          <HistoryEntry key={i} entry={entry} />
        ))}

        {/* Active input line */}
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <Prompt />
          <Box
            sx={{
              position: "relative",
              flex: 1,
              display: "flex",
              alignItems: "baseline",
              minHeight: 24,
            }}
          >
            {/* Rendered text mirror + caret (caret only when not executing) */}
            <Box
              aria-hidden="true"
              sx={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                whiteSpace: "pre",
                color: executing ? "var(--text-muted)" : "var(--text)",
                display: "flex",
                alignItems: "center",
              }}
            >
              {executing ? "" : value}
              {!executing && <span className="terminal-caret" />}
            </Box>
            <input
              ref={inputRef}
              className="terminal-input"
              type="text"
              value={value}
              disabled={executing}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label={`Terminal command input, prompt ${PROMPT_HOST} $`}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              style={{ color: "transparent", minHeight: 44 }}
            />
          </Box>
        </Box>
      </Box>

      {/* Suggested command chips */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-2)",
          p: "var(--space-3)",
          borderTop: "1px solid var(--border)",
          backgroundColor: "var(--surface)",
        }}
      >
        {SUGGESTED.map((cmd) => (
          <Box
            key={cmd}
            component="button"
            type="button"
            onClick={() => runSuggested(cmd)}
            disabled={!introDone || executing}
            sx={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              backgroundColor: "var(--terminal-chrome)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              px: "var(--space-2)",
              minHeight: 32,
              cursor: "pointer",
              transition: "border-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease)",
              "&:hover": { borderColor: "var(--accent)", color: "var(--accent)" },
              "&:focus-visible": {
                outline: "2px solid var(--terminal-focus-ring)",
                outlineOffset: "2px",
              },
              "&:disabled": { opacity: 0.5, cursor: "default" },
            }}
          >
            {cmd}
          </Box>
        ))}
      </Box>

      {/* SR-only live region for announcements outside the log */}
      <Box
        ref={liveRef}
        aria-live="polite"
        sx={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
        }}
      />
    </Box>
  );
};

export default TerminalHero;
