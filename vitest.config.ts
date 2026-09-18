import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@content": r("./content/index.ts"),
      "@content/": r("./content/"),
      "@/": r("./src/"),
    },
  },
  test: {
    include: ["src/**/*.test.ts", "content/**/*.test.ts"],
    environment: "node",
  },
});
