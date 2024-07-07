// vite.config.ts
import nodeExternals from "file:///Users/abdelfattah/DEV/perso/semantik/node_modules/.pnpm/rollup-plugin-node-externals@7.1.2_rollup@4.18.0/node_modules/rollup-plugin-node-externals/dist/index.js";
import { defineConfig } from "file:///Users/abdelfattah/DEV/perso/semantik/node_modules/.pnpm/vite@5.2.12_@types+node@20.11.24_terser@5.31.1/node_modules/vite/dist/node/index.js";
import react from "file:///Users/abdelfattah/DEV/perso/semantik/node_modules/.pnpm/@vitejs+plugin-react@4.3.0_vite@5.2.12_@types+node@20.11.24_terser@5.31.1_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dts from "file:///Users/abdelfattah/DEV/perso/semantik/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.11.24_rollup@4.18.0_typescript@5.3.3_vite@5.2.12_@types+_vxyi5vvjdlhk6jojf4gwoisqmu/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///Users/abdelfattah/DEV/perso/semantik/libs/react/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [react(), dts(), nodeExternals()],
  resolve: {
    alias: {
      "@/": new URL("./src/", __vite_injected_original_import_meta_url).pathname
    }
  },
  build: {
    lib: {
      formats: ["es", "cjs"],
      entry: "src/main.tsx",
      name: "Semantik React SDK",
      fileName: "index"
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWJkZWxmYXR0YWgvREVWL3BlcnNvL3NlbWFudGlrL2xpYnMvcmVhY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9hYmRlbGZhdHRhaC9ERVYvcGVyc28vc2VtYW50aWsvbGlicy9yZWFjdC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYWJkZWxmYXR0YWgvREVWL3BlcnNvL3NlbWFudGlrL2xpYnMvcmVhY3Qvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5pbXBvcnQgbm9kZUV4dGVybmFscyBmcm9tIFwicm9sbHVwLXBsdWdpbi1ub2RlLWV4dGVybmFsc1wiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCBkdHMgZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCksIGR0cygpLCBub2RlRXh0ZXJuYWxzKCldLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQC9cIjogbmV3IFVSTChcIi4vc3JjL1wiLCBpbXBvcnQubWV0YS51cmwpLnBhdGhuYW1lLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBmb3JtYXRzOiBbXCJlc1wiLCBcImNqc1wiXSxcbiAgICAgIGVudHJ5OiBcInNyYy9tYWluLnRzeFwiLFxuICAgICAgbmFtZTogXCJTZW1hbnRpayBSZWFjdCBTREtcIixcbiAgICAgIGZpbGVOYW1lOiBcImluZGV4XCIsXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIl0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHJlYWN0OiBcIlJlYWN0XCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxPQUFPLG1CQUFtQjtBQUMxQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxTQUFTO0FBSndMLElBQU0sMkNBQTJDO0FBT3pQLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLGNBQWMsQ0FBQztBQUFBLEVBQ3pDLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLE1BQU0sSUFBSSxJQUFJLFVBQVUsd0NBQWUsRUFBRTtBQUFBLElBQzNDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLE1BQ3JCLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsU0FBUyxXQUFXO0FBQUEsTUFDL0IsUUFBUTtBQUFBLFFBQ04sU0FBUztBQUFBLFVBQ1AsT0FBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
