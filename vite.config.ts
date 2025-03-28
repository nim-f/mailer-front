import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
    server: {
        host: "local.dev",
        port: 5173,
        https: {
            cert: "local.dev.pem",
            key: "local.dev-key.pem",
        },
        cors: {
            origin: "https://local.dev",
            credentials: true,
        },
    },
    plugins: [react(), mkcert()],
});
