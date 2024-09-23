import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#60A5FA",
        "secondary-color": "#3B82F6",
      },
      fontFamily: {
        roboto: ["Roboto", "system-ui"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["winter"],
  },
};

export default config;
