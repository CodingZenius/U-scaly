import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src",

  plugins: [],

  build: {
    outDir: "../dist",
    emptyOutDir: true,

    rollupOptions: {
      input: resolve(__dirname, "src/index.html")
    },

    target: "es2022",

    minify: "esbuild",

    sourcemap: false
  },

  server: {
    host: true,
    port: 5173
  }
});
