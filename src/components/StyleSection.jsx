import React from "react";
import { Settings2 } from "lucide-react";
import { Section, RangeField, ToggleButton, Field } from "./ui.jsx";
import { TEMPLATE_STYLES } from "../qr/templates.js";

export default function StyleSection({ state, setState }) {
  function updateField(field, value) {
    setState((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleFrameChange(value) {
    setState((prev) => ({
      ...prev,
      frameStyle: value,
      showFrame: value !== "none",
    }));
  }

  const cardTemplates = Object.entries(TEMPLATE_STYLES).filter(([key]) => key !== "none");

  return (
    <Section
      icon={<Settings2 size={18} />}
      title="Customização visual"
      subtitle="Ajuste a estrutura visual do QR, o espaço de leitura, o template do card e a apresentação do logo."
    >
      <div className="grid-3">
        <Field label="Template do card">
          <select
            value={state.templateStyle || "none"}
            onChange={(e) => updateField("templateStyle", e.target.value)}
          >
            <option value="none">Sem template</option>
            {cardTemplates.map(([key, def]) => (
              <option key={key} value={key}>
                {def.name}
              </option>
            ))}
          </select>
        </Field>

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
      </div>

      <div className="grid-2" style={{ marginTop: 14 }}>
        <Field label="Texto do template">
          <input
            value={state.labelText || "SCAN ME"}
            onChange={(e) => updateField("labelText", e.target.value)}
          />
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

        <RangeField
          label="Escala do logo"
          valueLabel={`${state.logoScale}%`}
          value={state.logoScale}
          min="10"
          max="30"
          step="1"
          onChange={(e) => updateField("logoScale", Number(e.target.value))}
        />

        <RangeField
          label="Padding do logo"
          valueLabel={`${state.logoPadding}px`}
          value={state.logoPadding}
          min="0"
          max="20"
          step="1"
          onChange={(e) => updateField("logoPadding", Number(e.target.value))}
        />
      </div>

      <div className="toggle-row" style={{ marginTop: 14 }}>
        <ToggleButton
          active={state.showQuietZone}
          onClick={() => updateField("showQuietZone", !state.showQuietZone)}
          activeLabel="Quiet zone ativa"
          inactiveLabel="Quiet zone oculta"
        />

        <ToggleButton
          active={state.logoBackground}
          onClick={() => updateField("logoBackground", !state.logoBackground)}
          activeLabel="Fundo do logo ativo"
          inactiveLabel="Fundo do logo oculto"
        />
      </div>
    </Section>
  );
}
