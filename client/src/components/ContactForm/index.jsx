import React, { useRef, useState } from "react";
import { Box } from "@mui/material";
import "./ContactForm.css";
import { FORMSPREE_ENDPOINT } from "../../config/site";

// Status: "idle" | "submitting" | "success" | "network-error"
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TitleBar = () => (
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
      new-message.sh
    </Box>
  </Box>
);

const fieldUnderline = (focused, error) => {
  if (error) return "2px solid var(--terminal-error)";
  if (focused) return "2px solid var(--accent)";
  return "1px solid var(--border)";
};

const PromptLabel = ({ name }) => (
  <Box
    component="span"
    aria-hidden="true"
    sx={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", flexShrink: 0 }}
  >
    <Box component="span" sx={{ color: "var(--accent)", fontWeight: 500 }}>
      ~/portfolio{" "}
    </Box>
    <Box component="span" sx={{ color: "var(--text-muted)" }}>$ </Box>
    <Box component="span" sx={{ color: "var(--accent)" }}>{name}</Box>
    <Box component="span" sx={{ color: "var(--text-muted)" }}>=</Box>
  </Box>
);

const ErrorMsg = ({ id, children }) =>
  children ? (
    <Box
      id={id}
      sx={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.8rem",
        color: "var(--terminal-error)",
        mt: "var(--space-1)",
      }}
    >
      bash: {children}
    </Box>
  ) : null;

const inputBaseSx = {
  flex: 1,
  background: "transparent",
  border: "none",
  outline: "none",
  color: "var(--text)",
  fontFamily: "var(--font-mono)",
  fontSize: "0.875rem",
  lineHeight: 1.65,
  minHeight: 28,
  padding: "0 0 4px 0.5ch",
};

const Rule = () => (
  <Box
    aria-hidden="true"
    sx={{
      borderTop: "1px solid var(--border)",
      opacity: 0.3,
      my: "var(--space-2)",
      maxWidth: "48ch",
    }}
  />
);

const ContactForm = () => {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(null);
  const [status, setStatus] = useState("idle");

  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const sendRef = useRef(null);
  const liveRef = useRef(null);
  const retryRef = useRef(null);

  const disabled = status === "submitting";

  const announce = (msg) => {
    if (liveRef.current) liveRef.current.textContent = msg;
  };

  const setField = (key) => (e) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "name: required";
    if (!values.email.trim()) next.email = "email: required";
    else if (!EMAIL_RE.test(values.email.trim()))
      next.email = "email: invalid format";
    if (!values.message.trim()) next.message = "message: required";
    setErrors(next);
    return next;
  };

  const submit = async () => {
    const found = validate();
    if (Object.keys(found).length > 0) {
      const firstKey = ["name", "email", "message"].find((k) => found[k]);
      announce(`Validation error: ${found[firstKey]}`);
      const refMap = { name: null, email: emailRef, message: messageRef };
      if (refMap[firstKey] && refMap[firstKey].current)
        refMap[firstKey].current.focus();
      return;
    }

    setStatus("submitting");
    announce("Sending message.");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      });

      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);

      setStatus("success");
      announce(`Message sent successfully. Thanks, ${values.name}.`);
    } catch {
      setStatus("network-error");
      announce("Network error. Message not sent. Press r to retry.");
      // Move focus to retry once it renders.
      setTimeout(() => retryRef.current && retryRef.current.focus(), 0);
    }
  };

  const resetForm = () => {
    setValues({ name: "", email: "", message: "" });
    setErrors({});
    setStatus("idle");
    announce("Form reset.");
  };

  const handleFieldKeyDown = (nextRef) => (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextRef && nextRef.current) nextRef.current.focus();
    }
  };

  const handleMessageKeyDown = (e) => {
    // Enter = newline (default). Ctrl/Cmd+Enter submits.
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      submit();
    }
  };

  const handleErrorKeyDown = (e) => {
    if (e.key.toLowerCase() === "r") {
      e.preventDefault();
      setStatus("idle");
      submit();
    } else if (e.key.toLowerCase() === "q") {
      e.preventDefault();
      resetForm();
    }
  };

  // ---- Success view ----
  if (status === "success") {
    return (
      <TerminalShell>
        <Box
          aria-live="assertive"
          sx={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.875rem",
            lineHeight: 1.65,
            color: "var(--text)",
          }}
        >
          <Box>
            <Box component="span" sx={{ color: "var(--accent)", fontWeight: 500 }}>
              ~/portfolio{" "}
            </Box>
            <Box component="span" sx={{ color: "var(--text-muted)" }}>
              $ send ↵
            </Box>
          </Box>
          <Box sx={{ height: "var(--space-3)" }} />
          <Box sx={{ color: "var(--accent)", fontWeight: 500 }}>
            [exit code 0] Message sent successfully.
          </Box>
          <Rule />
          <Box sx={{ color: "var(--text-muted)" }}>
            Thanks, {values.name || "friend"}. I'll be in touch.
          </Box>
          <Box sx={{ height: "var(--space-3)" }} />
          <Box>
            <Box component="span" sx={{ color: "var(--accent)" }}>
              ~/portfolio{" "}
            </Box>
            <Box component="span" sx={{ color: "var(--text-muted)" }}>$ </Box>
            <span className="submit-caret" />
          </Box>
          <Box sx={{ mt: "var(--space-3)" }}>
            <MonoButton onClick={resetForm} buttonRef={null}>
              [n] new message
            </MonoButton>
          </Box>
        </Box>
        <LiveRegion liveRef={liveRef} />
      </TerminalShell>
    );
  }

  // ---- Idle / submitting / error view ----
  return (
    <TerminalShell>
      <Box
        component="form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        sx={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.875rem",
          lineHeight: 1.65,
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {/* name */}
        <Box sx={{ mb: "var(--space-3)" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              borderBottom: fieldUnderline(focused === "name", errors.name),
              minHeight: 44,
            }}
          >
            <PromptLabel name="name" />
            <Box
              component="input"
              type="text"
              value={values.name}
              onChange={setField("name")}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
              onKeyDown={handleFieldKeyDown(emailRef)}
              disabled={disabled}
              aria-label="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "err-name" : undefined}
              autoComplete="name"
              sx={inputBaseSx}
            />
          </Box>
          <ErrorMsg id="err-name">{errors.name}</ErrorMsg>
        </Box>

        {/* email */}
        <Box sx={{ mb: "var(--space-3)" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              borderBottom: fieldUnderline(focused === "email", errors.email),
              minHeight: 44,
            }}
          >
            <PromptLabel name="email" />
            <Box
              component="input"
              ref={emailRef}
              type="email"
              value={values.email}
              onChange={setField("email")}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              onKeyDown={handleFieldKeyDown(messageRef)}
              disabled={disabled}
              aria-label="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "err-email" : undefined}
              autoComplete="email"
              sx={inputBaseSx}
            />
          </Box>
          <ErrorMsg id="err-email">{errors.email}</ErrorMsg>
        </Box>

        {/* message */}
        <Box sx={{ mb: "var(--space-3)" }}>
          <Box sx={{ mb: "var(--space-1)" }}>
            <PromptLabel name="message" />
          </Box>
          <Box
            sx={{
              display: "flex",
              borderBottom: fieldUnderline(focused === "message", errors.message),
            }}
          >
            <Box
              component="span"
              aria-hidden="true"
              sx={{
                color: "var(--text-muted)",
                pr: "0.5ch",
                pt: "2px",
                userSelect: "none",
              }}
            >
              {">"}
            </Box>
            <Box
              component="textarea"
              ref={messageRef}
              value={values.message}
              onChange={setField("message")}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              onKeyDown={handleMessageKeyDown}
              disabled={disabled}
              rows={4}
              aria-label="message"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "err-message" : undefined}
              placeholder="type your message… (Ctrl+Enter to send)"
              sx={{
                ...inputBaseSx,
                resize: "none",
                width: "100%",
                minHeight: "calc(4 * 1.65 * 0.875rem)",
                maxHeight: "calc(12 * 1.65 * 0.875rem)",
                overflowY: "auto",
                "&::placeholder": { color: "var(--text-muted)", opacity: 0.6 },
              }}
            />
          </Box>
          <ErrorMsg id="err-message">{errors.message}</ErrorMsg>
        </Box>

        {/* send / submitting */}
        {status === "submitting" ? (
          <Box sx={{ color: "var(--text-muted)", mt: "var(--space-2)" }}>
            <Box component="span" sx={{ color: "var(--accent)" }}>
              ~/portfolio{" "}
            </Box>
            $ send ↵
            <Box component="span" sx={{ display: "block", mt: "var(--space-1)" }}>
              <Box component="span" sx={{ color: "var(--text)" }}>
                Sending
              </Box>
              <Box component="span" className="submitting-ellipsis" />
              <span className="submit-caret" />
            </Box>
          </Box>
        ) : status === "network-error" ? (
          <Box
            role="alert"
            tabIndex={-1}
            onKeyDown={handleErrorKeyDown}
            sx={{ color: "var(--text-muted)", mt: "var(--space-2)" }}
          >
            <Box sx={{ color: "var(--terminal-error)", fontWeight: 500 }}>
              [exit code 1] Connection failed.
            </Box>
            <Rule />
            <Box sx={{ color: "var(--terminal-error)" }}>
              bash: send: network error — try again?
            </Box>
            <Box
              sx={{
                mt: "var(--space-3)",
                display: "flex",
                gap: "var(--space-3)",
                flexWrap: "wrap",
              }}
            >
              <MonoButton
                buttonRef={retryRef}
                onClick={() => {
                  setStatus("idle");
                  submit();
                }}
              >
                [r] retry
              </MonoButton>
              <MonoButton onClick={resetForm}>[q] quit</MonoButton>
            </Box>
          </Box>
        ) : (
          <Box
            component="button"
            type="submit"
            ref={sendRef}
            aria-label="Send message (Enter)"
            sx={{
              mt: "var(--space-2)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
              color: "var(--accent)",
              backgroundColor: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              px: "var(--space-3)",
              minHeight: 44,
              cursor: "pointer",
              "&:hover": { borderColor: "var(--accent)" },
              "&:focus-visible": {
                outline: "2px solid var(--terminal-focus-ring)",
                outlineOffset: "2px",
              },
            }}
          >
            <Box component="span" sx={{ color: "var(--text-muted)" }}>
              ~/portfolio ${" "}
            </Box>
            send ↵
          </Box>
        )}
      </Box>

      <LiveRegion liveRef={liveRef} />
    </TerminalShell>
  );
};

// ---- Shared sub-components ----

const MonoButton = ({ children, onClick, buttonRef }) => (
  <Box
    component="button"
    type="button"
    ref={buttonRef}
    onClick={onClick}
    sx={{
      fontFamily: "var(--font-mono)",
      fontSize: "0.85rem",
      color: "var(--accent)",
      backgroundColor: "transparent",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-sm)",
      px: "var(--space-3)",
      minHeight: 44,
      minWidth: 44,
      cursor: "pointer",
      "&:hover": { borderColor: "var(--accent)" },
      "&:focus-visible": {
        outline: "2px solid var(--terminal-focus-ring)",
        outlineOffset: "2px",
      },
    }}
  >
    {children}
  </Box>
);

const TerminalShell = ({ children }) => (
  <Box
    sx={{
      backgroundColor: "var(--terminal-chrome)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--terminal-shadow)",
      overflow: "hidden",
      width: "100%",
      maxWidth: 640,
      mx: "auto",
    }}
  >
    <TitleBar />
    <Box sx={{ p: "var(--space-4)" }}>{children}</Box>
  </Box>
);

const LiveRegion = ({ liveRef }) => (
  <Box
    ref={liveRef}
    aria-live="assertive"
    sx={{
      position: "absolute",
      width: 1,
      height: 1,
      overflow: "hidden",
      clip: "rect(0 0 0 0)",
      whiteSpace: "nowrap",
    }}
  />
);

export default ContactForm;
