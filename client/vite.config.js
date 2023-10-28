import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
// as we do not want to use localhost:3000 again and again we create a proxy to connect to the server
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        // whenever the code will detect /api it will directly come here and pit localhost:3000 in front of it so as making the rewriting the code minimum.
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },

  plugins: [react()],
});
