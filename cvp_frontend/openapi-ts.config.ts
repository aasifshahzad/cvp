import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://localhost:8000/openapi.json",
  output: {
    path: "src/client",
    postProcess: ["prettier"],
  },
  plugins: [
    "@hey-api/schemas",
    {
      name: "@hey-api/sdk",
      operations: {
        strategy: "byTags",
      },
    },
    "@hey-api/typescript",
  ],
});
