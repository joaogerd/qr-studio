import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Configuração do Vite para deploy no GitHub Pages.
 *
 * Se o repositório for:
 * qr-studio-definitivo-modular
 *
 * então o base precisa apontar para:
 * /qr-studio/
 */
export default defineConfig({
  plugins: [react()],
  base: "/qr-studio/",
});
