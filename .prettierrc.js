import prettierConfig from "@resolid/config/prettier";

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...prettierConfig,
  plugins: [...prettierConfig.plugins, "prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./website/src/root.css",
  tailwindFunctions: ["cx", "tv"],
};

// noinspection JSUnusedGlobalSymbols
export default config;
