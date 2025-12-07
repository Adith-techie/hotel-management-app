import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // normal build (Vercel): base = '/'
  // GitHub Pages build: base = '/hotel-management-app/'
  base: mode === "gh-pages" ? "/hotel-management-app/" : "/",
}));
