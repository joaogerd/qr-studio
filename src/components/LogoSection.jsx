import React from "react";
import { ImageIcon } from "lucide-react";
import { Section, Field } from "./ui.jsx";

/**
 * Seção de upload e controle do logo.
 */
export default function LogoSection({ state, setState }) {
  function handleLogoUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setState((prev) => ({ ...prev, logoDataUrl: String(reader.result) }));
    };
    reader.readAsDataURL(file);
  }

  return (
    <Section icon={<ImageIcon size={18} />} title="Logo central">
      <Field label="Enviar logo" hint="PNG transparente costuma dar o melhor resultado.">
        <input className="file-input" type="file" accept="image/*" onChange={handleLogoUpload} />
      </Field>

      {state.logoDataUrl && (
        <div className="logo-preview">
          <img src={state.logoDataUrl} alt="Logo enviada" />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700 }}>Logo carregado</div>
            <div style={{ color: "var(--muted)", fontSize: "0.92rem" }}>
              O QR já está sendo redesenhado com área segura central.
            </div>
          </div>
          <button
            className="btn btn-secondary"
            onClick={() => setState((prev) => ({ ...prev, logoDataUrl: null }))}
          >
            Remover
          </button>
        </div>
      )}
    </Section>
  );
}
