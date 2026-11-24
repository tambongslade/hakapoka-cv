import type { Config } from "tailwindcss";

const token = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem" }, screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1240px" } },
    extend: {
      colors: {
        background: token("background"),
        foreground: token("foreground"),
        card: { DEFAULT: token("card"), foreground: token("card-foreground") },
        primary: { DEFAULT: token("primary"), foreground: token("primary-foreground") },
        secondary: { DEFAULT: token("secondary"), foreground: token("secondary-foreground") },
        muted: { DEFAULT: token("muted"), foreground: token("muted-foreground") },
        accent: { DEFAULT: token("accent"), foreground: token("accent-foreground") },
        ink: { DEFAULT: token("ink"), foreground: token("ink-foreground"), muted: token("ink-muted") },
        gold: token("gold"),
        destructive: { DEFAULT: token("destructive"), foreground: token("destructive-foreground") },
        border: token("border"),
        input: token("input"),
        ring: token("ring"),
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.375rem" }],
        base: ["1rem", { lineHeight: "1.65rem" }],
        lg: ["1.25rem", { lineHeight: "1.85rem" }],
        xl: ["1.5625rem", { lineHeight: "2.1rem", letterSpacing: "-0.01em" }],
        "2xl": ["1.953rem", { lineHeight: "2.4rem", letterSpacing: "-0.015em" }],
        "3xl": ["2.441rem", { lineHeight: "2.8rem", letterSpacing: "-0.02em" }],
        "4xl": ["3.052rem", { lineHeight: "3.3rem", letterSpacing: "-0.025em" }],
        "5xl": ["3.815rem", { lineHeight: "4rem", letterSpacing: "-0.03em" }],
        "6xl": ["4.768rem", { lineHeight: "4.9rem", letterSpacing: "-0.035em" }],
      },
    },
  },
  plugins: [],
};
export default config;
