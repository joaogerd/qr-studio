import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function PreviewCard({
  title,
  typeLabel,
  canvasRef,
  background,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay: 0.08 }}
      className="preview-card"
    >
      <div className="preview-header">
        <div>
          <div className="eyebrow">Prévia</div>
          <h2>{title}</h2>
          <div className="muted">Tipo: {typeLabel}</div>
        </div>

        <ShieldCheck size={18} className="muted-icon" />
      </div>

      <div className="canvas-frame" style={{ backgroundColor: background }}>
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            maxWidth: "100%",
            borderRadius: 16,
          }}
        />
      </div>
    </motion.div>
  );
}
