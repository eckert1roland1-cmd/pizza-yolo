import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // The homepage must never import a "ghost" SEO page's component — those
    // stay discoverable only via sitemap.xml, never linked from the landing
    // page. FAQ was deliberately promoted to a real linked nav item and is
    // no longer in this list; detroit-style-pizza and events remain ghosts.
    files: ["src/components/home/**", "src/app/page.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["**/detroit-style-pizza/**", "**/events/**"],
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
