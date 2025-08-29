import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          850: "#141a22"
        }
      }
    }
  },
  plugins: []
} satisfies Config;
