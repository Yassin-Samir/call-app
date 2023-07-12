import { defineConfig } from "vite";
import fs from "fs";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    https: {
      key: fs.readFileSync("mykey.pem"),
      cert: fs.readFileSync("mycert.pem"),
    },
  },
  css: { devSourcemap: true },
});
