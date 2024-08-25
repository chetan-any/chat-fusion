import { nextui } from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ['class'], //Now next-themes will put `class = "dark"` attribute in HTML element
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(avatar|badge|button|chip|input|spinner|popover|user|ripple).js"
  ],

  theme: {
    extend: {},
  },

  plugins: [nextui()],
};
export default config;
