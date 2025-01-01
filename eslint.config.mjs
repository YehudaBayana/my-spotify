// import globals from "globals";
// import pluginJs from "@eslint/js";
// import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
// import { fixupConfigRules } from "@eslint/compat";

// export default [
//   {files: ["**/*.{js,mjs,cjs,jsx}"]},
//   { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
//   ...fixupConfigRules(pluginReactConfig),
// ];
import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import globals from "globals";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";

export default [
  {
    ignores: ["dist/**/*"],
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    ignores: ["dist/**/*"],
    ...reactRecommended,
    settings: {
      version: "detect",
    },
    languageOptions: {
      ...reactRecommended.languageOptions,
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      react,
    },
    rules: {
      //rules here
    },
  },
];
