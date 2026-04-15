import React from "react";
import { CreditCard } from "lucide-react";
import { Section, Field } from "./ui.jsx";
import { TEMPLATE_STYLES } from "../qr/templates.js";

export default function CardSection({ state, setState }) {
  const cardTemplates = Object.entries(TEMPLATE_STYLES).filter(([key]) => key !== "none");

  function updateField(field, value) {
    setState((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <Section
      icon={<CreditCard size={18} />}
      title="Card e template"
      subtitle="Escolha o modelo visual do card e personalize o texto exibido no template."
    >
      <div className="grid-2">
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

        <Field label="Texto do template">
          <input
            value={state.labelText || "SCAN ME"}
            onChange={(e) => updateField("labelText", e.target.value)}
          />
        </Field>
      </div>
    </Section>
  );
}
