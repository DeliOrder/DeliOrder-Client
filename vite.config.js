import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@images",
        replacement: path.resolve(__dirname, "src/renderer/assets/images"),
      },
      {
        find: "@renderer",
        replacement: path.resolve(__dirname, "src/renderer"),
      },
    ],
  },
});
