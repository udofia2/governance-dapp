import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
    watch: {
      usePolling: true,
      interval: 100
    }
  },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
