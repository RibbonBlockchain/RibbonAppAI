import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xxxs: "320px",
        xxs: "375px",
        xs: "425px",
      },
      colors: {
        primary: { DEFAULT: "#7C56FE", "50": "#F2EEFF" },
      },
      backgroundImage: {
        aiBackground: "url('/assets/AI-background.png')",
        account: "url('/images/user-bg.png')",
        peronalDetails: "url('/images/personal-details.png')",
        walletBg: 'url("/images/connect-wallet-bg.png")',
      },
    },
  },
  plugins: [],
};
export default config;
