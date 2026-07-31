import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import astroPlugin from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    ignores: ["dist/", ".astro/", "node_modules/", ".vscode/", "public/", ".worktrees/"],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  ...astroPlugin.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["src/env.d.ts", "**/*.env.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
);