import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#101415",
        surface: "#101415",
        "surface-dim": "#101415",
        "surface-bright": "#363a3b",
        "surface-container-lowest": "#0b0f10",
        "surface-container-low": "#191c1e",
        "surface-container": "#1d2022",
        "surface-container-high": "#272a2c",
        "surface-container-highest": "#323537",
        "surface-variant": "#323537",
        "on-background": "#e0e3e5",
        "on-surface": "#e0e3e5",
        "on-surface-variant": "#b9cacb",
        outline: "#849495",
        "outline-variant": "#3b494b",
        primary: "#dbfcff",
        "primary-fixed": "#7df4ff",
        "primary-fixed-dim": "#00dbe9",
        "primary-container": "#00f0ff",
        "on-primary": "#00363a",
        "on-primary-fixed": "#002022",
        "on-primary-fixed-variant": "#004f54",
        "on-primary-container": "#006970",
        secondary: "#bec6e0",
        "secondary-container": "#3f465c",
        "on-secondary": "#283044",
        "on-secondary-container": "#adb4ce",
        tertiary: "#f4f6ff",
        "tertiary-container": "#cfdaf2",
        "on-tertiary": "#263143",
        "on-tertiary-container": "#545f73",
        error: "#ffb4ab",
        accent: "#ffe08a",
        success: "#99f6b3"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem"
      },
      fontFamily: {
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        code: ["Space Grotesk", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      fontSize: {
        body: ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        lead: ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        h1: ["48px", { lineHeight: "1.1", letterSpacing: "0", fontWeight: "700" }],
        h2: ["32px", { lineHeight: "1.2", letterSpacing: "0", fontWeight: "600" }],
        h3: ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        code: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        label: ["12px", { lineHeight: "1", letterSpacing: "0.08em", fontWeight: "600" }]
      },
      maxWidth: {
        container: "1120px"
      },
      spacing: {
        gutter: "24px",
        "stack-sm": "8px",
        "stack-md": "16px",
        "stack-lg": "32px",
        section: "120px"
      },
      boxShadow: {
        glow: "0 0 30px rgba(0, 219, 233, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
