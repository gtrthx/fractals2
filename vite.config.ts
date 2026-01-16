import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import glsl from "vite-plugin-glsl";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    glsl(), // This is the "magic" for our shaders
  ],
  server: {
    port: 3000,
  },
});
