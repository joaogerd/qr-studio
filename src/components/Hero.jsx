import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Download, RefreshCcw } from "lucide-react";

/**
 * Hero principal da aplicação.
 *
 * Responsabilidades:
 * - exibir a marca do produto
 * - apresentar o título principal
 * - exibir a descrição curta
 * - renderizar as ações principais
 *
 * Importante:
 * - este componente não deve conter <section> nem .container
 * - o posicionamento em grid deve ser controlado pelo componente pai
 */
export default function Hero({ onDownload, onDownload4x, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="hero-copy"
    >
      <div className="badge">
        <BadgeCheck size={14} />
        <span>QR Studio Pro</span>
      </div>

      <h1>Crie QR Codes elegantes, personalizáveis e prontos para uso profissional.</h1>

      <p>
        Gere QR Codes para links, WhatsApp, Wi-Fi, e-mail, contatos e texto livre em uma
        interface limpa, séria e adequada para uso institucional ou comercial.
      </p>

      <div className="hero-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={onDownload}
          aria-label="Baixar QR Code em PNG"
        >
          <Download size={16} />
          <span>Baixar PNG</span>
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={onDownload4x}
          aria-label="Baixar QR Code em SVG"
        >
          <Download size={16} />
          <span>Baixar SVG</span>
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={onReset}
          aria-label="Restaurar configurações padrão"
        >
          <RefreshCcw size={16} />
          <span>Restaurar padrão</span>
        </button>
      </div>
    </motion.div>
  );
}
