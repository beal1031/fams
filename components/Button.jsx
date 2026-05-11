/* global React */
function Button({ variant = "primary", size = "md", children, onClick, type = "button", disabled }) {
  const base = {
    fontFamily: "var(--font-serif)",
    fontWeight: 600,
    borderRadius: 999,
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    lineHeight: 1,
    letterSpacing: "0.005em",
    transition: "background 140ms var(--ease-soft), color 140ms var(--ease-soft), box-shadow 140ms",
    opacity: disabled ? 0.55 : 1,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  };
  const sizes = {
    sm: { padding: "7px 14px", fontSize: 13 },
    md: { padding: "11px 22px", fontSize: 15 },
    lg: { padding: "14px 28px", fontSize: 17 },
  }[size];
  const variants = {
    primary: { background: "var(--fms-sage-700)", color: "var(--fms-cream-100)", boxShadow: "var(--shadow-1)" },
    secondary: { background: "var(--fms-cream-300)", color: "var(--fms-sage-800)", borderColor: "var(--fms-sage-300)" },
    ghost: { background: "transparent", color: "var(--fms-sage-700)" },
    accent: { background: "var(--fms-terracotta-500)", color: "var(--fms-cream-100)", boxShadow: "var(--shadow-1)" },
  }[variant];
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{ ...base, ...sizes, ...variants }}>
      {children}
    </button>
  );
}
window.Button = Button;
