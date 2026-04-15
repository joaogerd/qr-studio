import React, { useState } from "react";
import { Palette, CreditCard, Settings2, Image as ImageIcon } from "lucide-react";
import ColorSection from "./ColorSection.jsx";
import CardSection from "./CardSection.jsx";
import FrameSection from "./FrameSection.jsx";
import LogoSection from "./LogoSection.jsx";

function cls(...items) {
  return items.filter(Boolean).join(" ");
}

export default function StyleWorkspace({ state, setState }) {
  const [subTab, setSubTab] = useState("appearance");

  return (
    <div className="stack-lg">
      <div className="subtabs-row">
        {[
          ["appearance", <Palette size={16} />, "Aparência"],
          ["card", <CreditCard size={16} />, "Card"],
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
      {subTab === "card" && <CardSection state={state} setState={setState} />}
      {subTab === "frame" && <FrameSection state={state} setState={setState} />}
      {subTab === "logo" && <LogoSection state={state} setState={setState} />}
    </div>
  );
}
