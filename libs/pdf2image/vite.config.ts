/// <reference types="vitest" />
import nodeExternals from "rollup-plugin-node-externals";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
    nodeExternals(),
  ],
  build: {
    lib: {
      formats: ["es", "cjs"],
      entry: "src/index.ts",
      fileName: "index",
    },
  },
});
