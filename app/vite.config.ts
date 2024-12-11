import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/",
    plugins: [react()],
    build: {
        outDir: './build'
    },
    server: {
        port: 3000,
        proxy: {
            "/api": "http://localhost:4000",
        },
    },
});
