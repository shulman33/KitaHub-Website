import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgba(13, 108, 255, 1)",
        "accent-purple": "rgba(214, 32, 255, 1)",
        "accent-purple-hover": "rgba(224, 120, 255, 1)",
        "cool-gray": "rgba(148, 163, 187, 1)",
        "light-blue": "rgba(226, 232, 240, 1)",
        "dark-blue": "rgba(17, 23, 41, 1)",
        "off-white": "#F8F8F8",
        "midnight-blue": "#191235",
        secondary:"#0B0B2C",
        lightBlue:"#EFF4FF",
        darkBlue:"#0D6CFF",
        lightGray:"#74759A"
      },
    },
  },
  plugins: [],
};
export default config;
