// Tailwind settings: content paths and the crimson brand colour.
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: { colors: { crimson: "#B3122E" } } },
} satisfies Config;
