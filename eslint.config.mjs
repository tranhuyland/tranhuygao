```js
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript"
  ),

  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "coverage/**",
      "node_modules/**"
    ],
  },

  {
    rules: {
      /**
       * React
       */
      "react/react-in-jsx-scope": "off",
      "react/jsx-key": "error",

      /**
       * TypeScript
       */
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],

      /**
       * Import
       */
      "@next/next/no-img-element": "warn",

      /**
       * General
       */
      "no-console": [
        "warn",
        {
          allow: ["warn", "error"]
        }
      ]
    }
  }
];

export default eslintConfig;
```
