/* global React */
const { useState } = React;

function Logo({ size = "md" }) {
  const dims = { sm: 36, md: 56, lg: 96 }[size] || 56;
  return (
    <img
      src="assets/logo-fms-icon.png"
      alt="Fraen a Mammen Schëtter"
      width={dims}
      height={dims}
      style={{ display: "block", objectFit: "contain" }}
    />
  );
}

window.Logo = Logo;
