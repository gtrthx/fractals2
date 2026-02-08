import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import glsl from "vite-plugin-glsl";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [vue(), glsl()],
  server: {
    port: 3000,
  },
});
