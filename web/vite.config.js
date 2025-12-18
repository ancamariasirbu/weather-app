import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname), // this makes web/ the root
  plugins: [react()],
  build: {
    outDir: "dist", // outputs to web/dist
  },
});
