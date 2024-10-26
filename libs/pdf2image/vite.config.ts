/// <reference types="vitest" />
import nodeExternals from "rollup-plugin-node-externals";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts(), nodeExternals()],

  build: {
    lib: {
      formats: ["es", "cjs"],
      entry: "src/index",
      name: "PDF to Images",
      fileName: "index",
    },
  },
});
