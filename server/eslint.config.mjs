import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ["**/*.config.js"],
    rules: {
      rules: {
        '@typescript-eslint/no-var-requires': 0,
      }
    }
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.amd,
        ...globals.node,
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];