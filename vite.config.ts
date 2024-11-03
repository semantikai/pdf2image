/// <reference types="vitest" />
import nodeExternals from "rollup-plugin-node-externals";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
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
