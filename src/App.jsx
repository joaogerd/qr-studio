import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link2, Palette, Check, Image as ImageIcon } from "lucide-react";
import StyleWorkspace from "./components/StyleWorkspace.jsx";

import Hero from "./components/Hero.jsx";
import PreviewCard from "./components/PreviewCard.jsx";
import ContentSection from "./components/ContentSection.jsx";
import NotesPanel from "./components/NotesPanel.jsx";

import { QR_TYPE_LABELS } from "./qr/constants.js";
import { buildQrValue } from "./qr/qrContent.js";
import { createQrData, renderLogo, renderQrBase } from "./qr/qrRenderer.js";
import { downloadQrPng } from "./utils/download.js";

const INITIAL_STATE = {
  qrType: "url",
  title: "Seu QR Code",
  frameLabel: "SCAN ME",
  labelText: "SCAN ME",
  templateStyle: "none",

  urlValue: "https://seusite.com.br",
  textValue: "Acesse nosso conteúdo.",
  whatsNumber: "5511999999999",
  whatsMessage: "Olá, vim pelo QR Code.",
  wifiSsid: "MinhaRedeWiFi",
  wifiPassword: "senha12345",
  wifiSecurity: "WPA",
  emailAddress: "contato@empresa.com.br",
  emailSubject: "Contato via QR Code",
  emailBody: "Olá, gostaria de mais informações.",
  vcardName: "Seu Nome",
  vcardCompany: "Sua Empresa",
  vcardPhone: "+55 12 99999 9999",
  vcardEmail: "contato@empresa.com.br",
  vcardWebsite: "https://seusite.com.br",

  foreground: "#111827",
  background: "#ffffff",
  frameColor: "#111827",

  size: 320,
  margin: 4,
  moduleStyle: "square",
  eyeStyle: "square",
  frameStyle: "none",
  showFrame: false,
  showQuietZone: true,

  logoDataUrl: null,
  logoScale: 22,
  logoPadding: 10,
  logoBackground: true,
};

function cls(...items) {
  return items.filter(Boolean).join(" ");
}

export default function App() {
  const [state, setState] = useState(INITIAL_STATE);
  const [activeTab, setActiveTab] = useState("content");
  const canvasRef = useRef(null);

  const qrValue = useMemo(() => buildQrValue(state), [state]);
  const qrData = useMemo(() => createQrData(qrValue, state.margin), [qrValue, state.margin]);
  const typeLabel = QR_TYPE_LABELS[state.qrType];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    renderQrBase(canvas, {
      qrData,
      size: state.size,
      margin: state.margin,
      background: state.background,
      foreground: state.foreground,
      frameColor: state.frameColor,
      moduleStyle: state.moduleStyle,
      eyeStyle: state.eyeStyle,
      frameStyle: state.frameStyle,
      frameLabel: state.frameLabel,
      labelText: state.labelText,
      templateStyle: state.templateStyle,
      showFrame: state.showFrame,
      showQuietZone: state.showQuietZone,
      logoDataUrl: state.logoDataUrl,
      logoScale: state.logoScale,
      logoPadding: state.logoPadding,
      scaleFactor: 1,
    });

    if (state.logoDataUrl) {
      renderLogo(canvas, {
        logoDataUrl: state.logoDataUrl,
        logoScale: state.logoScale,
        logoPadding: state.logoPadding,
        logoBackground: state.logoBackground,
        background: state.background,
        size: state.size,
        margin: state.margin,
        scaleFactor: 1,
        qrData,
        showFrame: state.showFrame,
        frameStyle: state.frameStyle,
        showQuietZone: state.showQuietZone,
        templateStyle: state.templateStyle,
      });
    }
  }, [state, qrData]);

  function handleDownload(scaleFactor, suffix) {
    downloadQrPng({
      state,
      qrData,
      filenameSuffix: suffix,
      scaleFactor,
    });
  }

  function resetAll() {
    setState(INITIAL_STATE);
    setActiveTab("content");
  }

  return (
    <div className="app-shell">
      <section className="hero">
        <div className="container hero-layout">
          <Hero
            onDownload={() => handleDownload(1, "")}
            onDownload4x={() => handleDownload(4, "-4x")}
            onReset={resetAll}
          />

          <PreviewCard
            title={state.title}
            typeLabel={typeLabel}
            canvasRef={canvasRef}
            background={state.background}
          />
        </div>
      </section>

      <main className="container main-grid">
        <section className="panel card editor-card">
          <div className="card-header">
            <h3>Editor</h3>
            <p>
              Ajuste o tipo de QR, conteúdo, identidade visual e exportação mantendo uma aparência sóbria.
            </p>
          </div>

          <div className="tabs-row">
            {[
              ["content", <Link2 size={16} />, "Conteúdo"],
              ["style", <Palette size={16} />, "Estilo"],
              ["saved", <Check size={16} />, "Meus estilos"],
              ["export", <ImageIcon size={16} />, "Exportação"],
            ].map(([key, icon, label]) => (
              <button
                key={key}
                type="button"
                className={cls("tab-button", activeTab === key && "tab-button-active")}
                onClick={() => setActiveTab(key)}
              >
                {icon}
                <span>{label}</span>
              </button>
            ))}
          </div>

          {activeTab === "content" && (
            <div className="stack-lg">
              <ContentSection state={state} setState={setState} />
            </div>
          )}

          {activeTab === "style" && (
            <StyleWorkspace state={state} setState={setState} />
          )}

          {activeTab === "saved" && (
            <div className="tip-box">
              Área reservada para estilos salvos. Se quiser, eu te monto essa aba depois com salvar, aplicar e excluir presets.
            </div>
          )}

          {activeTab === "export" && (
            <div className="stack-lg">
              <div className="tip-box">
                Exportação disponível no topo da página pelos botões principais.
              </div>
            </div>
          )}
        </section>

        <NotesPanel state={state} typeLabel={typeLabel} />
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          QR Studio · projeto auto-contido em React + Vite, sem shadcn
        </div>
      </footer>
    </div>
  );
}
