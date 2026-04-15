import React from "react";
import { Settings2 } from "lucide-react";
import { Section, Field, RangeField, ToggleButton } from "./ui.jsx";

export default function FrameSection({ state, setState }) {
  function updateField(field, value) {
    setState((prev) => ({ ...prev, [field]: value }));
  }

  function handleFrameChange(value) {
    setState((prev) => ({
      ...prev,
      frameStyle: value,
      showFrame: value !== "none",
    }));
  }

  return (
    <Section
      icon={<Settings2 size={18} />}
      title="Frame e leitura"
      subtitle="Ajuste a moldura, a área de leitura e parâmetros que impactam legibilidade."
    >
      <div className="grid-3">
        <Field label="Formato dos módulos">
          <select
            value={state.moduleStyle}
            onChange={(e) => updateField("moduleStyle", e.target.value)}
          >
            <option value="square">Quadrado</option>
            <option value="rounded">Arredondado</option>
            <option value="dots">Pontos</option>
          </select>
        </Field>

        <Field label="Estilo dos olhos">
          <select
            value={state.eyeStyle}
            onChange={(e) => updateField("eyeStyle", e.target.value)}
          >
            <option value="square">Quadrado</option>
            <option value="rounded">Arredondado</option>
            <option value="leaf">Orgânico</option>
          </select>
        </Field>

        <Field label="Tipo de frame">
          <select
            value={state.frameStyle}
            onChange={(e) => handleFrameChange(e.target.value)}
          >
            <option value="none">Sem frame</option>
            <option value="speech">Balão</option>
            <option value="badge">Badge</option>
            <option value="simple">Simples</option>
            <option value="double">Duplo</option>
            <option value="ribbon">Ribbon</option>
            <option value="ticket">Ticket</option>
          </select>
        </Field>
      </div>

      <div className="grid-2" style={{ marginTop: 14 }}>
        <RangeField
          label="Tamanho do QR"
          valueLabel={`${state.size}px`}
          value={state.size}
          min="220"
          max="520"
          step="10"
          onChange={(e) => updateField("size", Number(e.target.value))}
        />

        <RangeField
          label="Margem"
          valueLabel={String(state.margin)}
          value={state.margin}
          min="0"
          max="6"
          step="1"
          onChange={(e) => updateField("margin", Number(e.target.value))}
        />
      </div>

      <div className="toggle-row" style={{ marginTop: 14 }}>
        <ToggleButton
          active={state.showQuietZone}
          onClick={() => updateField("showQuietZone", !state.showQuietZone)}
          activeLabel="Quiet zone ativa"
          inactiveLabel="Quiet zone oculta"
        />
      </div>
    </Section>
  );
}
