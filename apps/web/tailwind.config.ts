import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0d0d0b",
          raised: "#141412",
          sunken: "#090908",
          line: "#252420",
          "line-strong": "#3a3833"
        },
        paper: {
          DEFAULT: "#edeae2",
          dim: "#a7a398",
          faint: "#7c786f"
        },
        signal: {
          DEFAULT: "#ff6a2b",
          soft: "#ff8a57",
          ink: "#170a03"
        },
        ok: "#9bc59d",
        danger: "#ff8f7a"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      fontSize: {
        display: ["clamp(2.5rem, 5.4vw, 4.75rem)", { lineHeight: "1", letterSpacing: "-0.04em" }],
        title: ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.04", letterSpacing: "-0.03em" }],
        lead: ["1.125rem", { lineHeight: "1.65" }],
        meta: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.06em" }]
      },
      maxWidth: {
        shell: "1240px"
      },
      spacing: {
        gutter: "clamp(1rem, 4vw, 2.5rem)"
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)"
      }
    }
  },
  plugins: []
};

export default config;
