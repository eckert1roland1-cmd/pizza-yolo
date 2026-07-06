import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // The homepage must never link to a "ghost" SEO page — those are only
    // discoverable via sitemap.xml, never from the landing page itself.
    files: ["src/components/home/**", "src/app/page.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["**/detroit-style-pizza/**", "**/faq/**", "**/events/**"],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
