import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-2rd-color": "var(--secondary-2rd-color)",
        "secondary-3rd-color": "var(--secondary-3rd-color)",
        "secondary-4th-color": "var(--secondary-4th-color)",
        "secondary-color": "var(--secondary-color)",
      },
    },
  },
  plugins: [],
};
export default config;
