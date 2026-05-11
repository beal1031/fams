/* global React */
function Field({ id, label, hint, type = "text", value, onChange, placeholder, required, multiline, options }) {
  const labelStyle = {
    fontFamily: "var(--font-sans)",
    fontSize: 12,
    fontWeight: 700,
    color: "var(--fms-sage-800)",
    letterSpacing: "0.02em",
    marginBottom: 6,
    display: "block",
  };
  const inputStyle = {
    fontFamily: "var(--font-serif)",
    fontSize: 15,
    padding: "10px 12px",
    border: "1px solid var(--border-2)",
    borderRadius: 8,
    background: "var(--fms-paper)",
    color: "var(--fg-1)",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    fontFeatureSettings: '"kern"',
  };
  return (
    <div style={{ marginBottom: 14 }}>
      <label htmlFor={id} style={labelStyle}>{label}{required && <span style={{ color: "var(--fms-terracotta-700)", marginLeft: 4 }}>*</span>}</label>
      {multiline ? (
        <textarea id={id} value={value} onChange={onChange} placeholder={placeholder} rows={3} style={inputStyle} />
      ) : options ? (
        <select id={id} value={value} onChange={onChange} style={inputStyle}>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : (
        <input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} style={inputStyle} />
      )}
      {hint && <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--fg-3)", marginTop: 4 }}>{hint}</div>}
    </div>
  );
}
window.Field = Field;
