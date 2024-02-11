import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "build",
    assetsDir: "assets",
    manifest: true,
    minify: true,
  },
  optimizeDeps: {
    exclude: ["pdfjs-dist"],
  },
});
