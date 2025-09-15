import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/party-menu/", // 👈 this must match your repo name
  plugins: [react()],
});
