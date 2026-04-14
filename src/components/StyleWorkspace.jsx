import React, { useState } from "react";
import { Palette, Settings2, Image as ImageIcon } from "lucide-react";
import ColorSection from "./ColorSection.jsx";
import StyleSection from "./StyleSection.jsx";
import LogoSection from "./LogoSection.jsx";

function cls(...items) {
  return items.filter(Boolean).join(" ");
}

/**
 * Área interna da aba "Estilo".
 *
 * Responsabilidades:
 * - dividir a configuração visual em subabas menores
 * - evitar um painel longo demais
 * - reaproveitar os componentes já existentes
 */
export default function StyleWorkspace({ state, setState }) {
  const [subTab, setSubTab] = useState("appearance");

  return (
    <div className="stack-lg">
      <div className="subtabs-row">
        {[
          ["appearance", <Palette size={16} />, "Aparência"],
          ["frame", <Settings2 size={16} />, "Frame"],
          ["logo", <ImageIcon size={16} />, "Logo"],
        ].map(([key, icon, label]) => (
          <button
            key={key}
            type="button"
            className={cls("subtab-button", subTab === key && "subtab-button-active")}
            onClick={() => setSubTab(key)}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </div>

      {subTab === "appearance" && <ColorSection state={state} setState={setState} />}

      {subTab === "frame" && <StyleSection state={state} setState={setState} />}

      {subTab === "logo" && <LogoSection state={state} setState={setState} />}
    </div>
  );
}
