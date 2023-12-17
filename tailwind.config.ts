import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        "300p": "340px",
        "500p": "520px",
        "768p": "820px",
        "1024p": "1120px",
        "1080p": "1640px",
        "4k": "2250px",
      },
      keyframes: {
        menuUpMobile_KF: {
          from: { transform: "translateY(150px) scale(0.6)" },
          to: { transform: "translateY(0) scale(1)" },
        },
        menuUpPC_KF: {
          from: { transform: "translateY(-150px) scale(0.5)" },
          to: { transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        menuAppearsMobile: "menuUpMobile_KF 1s ease-in-out",
        menuAppearsPC: "menuUpPC_KF 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
