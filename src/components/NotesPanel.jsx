import React from "react";
import {
  QrCode,
  Type,
  Link2,
  MessageCircle,
  Wifi,
  Mail,
  User,
} from "lucide-react";

/**
 * Painel lateral com resumo e recursos.
 *
 * Mantém a estrutura original do projeto:
 * - container simples com display grid
 * - cards usando apenas a classe note-card
 * - sem depender de classes extras no CSS
 */
export default function NotesPanel({ state, typeLabel }) {
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div className="note-card">
        <h3
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 0,
            marginBottom: 16,
          }}
        >
          <QrCode size={18} />
          <span>Resumo do QR</span>
        </h3>

        <div style={{ display: "grid", gap: 12 }}>
          <SummaryRow label="Tipo" value={typeLabel} />
          <SummaryRow label="Módulos" value={state.moduleStyle} />
          <SummaryRow label="Olhos" value={state.eyeStyle} />
          <SummaryRow label="Frame" value={state.frameStyle} />
          <SummaryRow label="Logo" value={state.logoDataUrl ? "Carregado" : "Sem logo"} />
        </div>
      </div>

      <div className="note-card">
        <h3
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 0,
            marginBottom: 8,
          }}
        >
          <Type size={18} />
          <span>Recursos disponíveis</span>
        </h3>

        <p style={{ color: "#64748b", marginTop: 0, marginBottom: 16 }}>
          A ferramenta cobre usos reais do dia a dia sem perder a estética profissional.
        </p>

        <div style={{ display: "grid", gap: 12 }}>
          <FeatureRow icon={<Link2 size={16} />} text="QR para links e páginas" />
          <FeatureRow icon={<MessageCircle size={16} />} text="QR para WhatsApp com mensagem pronta" />
          <FeatureRow icon={<Wifi size={16} />} text="QR para acesso a Wi-Fi" />
          <FeatureRow icon={<Mail size={16} />} text="QR para e-mail" />
          <FeatureRow icon={<User size={16} />} text="QR para contato em vCard" />
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        paddingBottom: 10,
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      <span style={{ color: "#64748b" }}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function FeatureRow({ icon, text }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        color: "#334155",
      }}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}
