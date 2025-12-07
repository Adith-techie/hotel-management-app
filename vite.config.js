// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // For Vercel (normal build): base = '/'
  // For GitHub Pages (gh build): base = '/hotel-management-app/'
  base: mode === "gh-pages" ? "/hotel-management-app/" : "/",
}));
