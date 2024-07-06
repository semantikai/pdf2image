/// <reference types="vitest" />
import nodeExternals from "rollup-plugin-node-externals";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts(), nodeExternals()],
  resolve: {
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
  },
  build: {
    lib: {
      formats: ["es", "cjs"],
      entry: "src/main.tsx",
      name: "Semantik React SDK",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
