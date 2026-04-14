import React from "react";
import { Palette } from "lucide-react";
import { PRESETS } from "../qr/constants.js";
import { Section, Field } from "./ui.jsx";

/**
 * Seção de cores e presets.
 */
export default function ColorSection({ state, setState }) {
  function applyPreset(preset) {
    setState((prev) => ({
      ...prev,
      foreground: preset.fg,
      background: preset.bg,
      frameColor: preset.frame,
    }));
  }

  return (
    <Section
      icon={<Palette size={18} />}
      title="Cores e presets"
      subtitle="Escolhe um preset profissional ou ajusta QR, fundo e frame separadamente."
    >
      <div className="preset-grid">
        {PRESETS.map((preset) => (
          <button key={preset.name} className="preset-btn" onClick={() => applyPreset(preset)}>
            <div className="swatches">
              <span className="swatch" style={{ backgroundColor: preset.fg }} />
              <span className="swatch" style={{ backgroundColor: preset.bg }} />
              <span className="swatch" style={{ backgroundColor: preset.frame }} />
            </div>
            <div style={{ fontWeight: 700, fontSize: "0.94rem" }}>{preset.name}</div>
          </button>
        ))}
      </div>

      <div className="grid-3" style={{ marginTop: 14 }}>
        <Field label="Cor do QR">
          <input
            className="input"
            type="color"
            value={state.foreground}
            onChange={(e) => setState((prev) => ({ ...prev, foreground: e.target.value }))}
          />
        </Field>

        <Field label="Fundo">
          <input
            className="input"
            type="color"
            value={state.background}
            onChange={(e) => setState((prev) => ({ ...prev, background: e.target.value }))}
          />
        </Field>

        <Field label="Frame / borda">
          <input
            className="input"
            type="color"
            value={state.frameColor}
            onChange={(e) => setState((prev) => ({ ...prev, frameColor: e.target.value }))}
          />
        </Field>
      </div>
    </Section>
  );
}
