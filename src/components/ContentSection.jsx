import React from "react";
import { Field } from "./ui.jsx";

/**
 * Conteúdo da aba "Conteúdo".
 *
 * Sem cabeçalho interno, porque o título já está na aba.
 */
export default function ContentSection({ state, setState }) {
  return (
    <div className="stack-lg">
      <div className="field">
        <label>Título</label>
        <input
          value={state.title}
          onChange={(e) => setState((prev) => ({ ...prev, title: e.target.value }))}
        />
      </div>

      <div className="field">
        <label>Tipo de QR Code</label>
        <select
          value={state.qrType}
          onChange={(e) => setState((prev) => ({ ...prev, qrType: e.target.value }))}
        >
          <option value="url">Link</option>
          <option value="text">Texto livre</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="wifi">Wi-Fi</option>
          <option value="email">E-mail</option>
          <option value="vcard">Contato vCard</option>
        </select>
      </div>

      {state.qrType === "url" && (
        <div className="field">
          <label>Link</label>
          <input
            value={state.urlValue}
            onChange={(e) => setState((prev) => ({ ...prev, urlValue: e.target.value }))}
          />
        </div>
      )}

      {state.qrType === "text" && (
        <div className="field">
          <label>Texto</label>
          <textarea
            value={state.textValue}
            onChange={(e) => setState((prev) => ({ ...prev, textValue: e.target.value }))}
            rows={5}
          />
        </div>
      )}

      {state.qrType === "whatsapp" && (
        <div className="stack-lg">
          <div className="field">
            <label>Número</label>
            <input
              value={state.whatsNumber}
              onChange={(e) => setState((prev) => ({ ...prev, whatsNumber: e.target.value }))}
            />
          </div>

          <div className="field">
            <label>Mensagem</label>
            <textarea
              value={state.whatsMessage}
              onChange={(e) => setState((prev) => ({ ...prev, whatsMessage: e.target.value }))}
              rows={4}
            />
          </div>
        </div>
      )}

      {state.qrType === "wifi" && (
        <div className="stack-lg">
          <div className="field">
            <label>Nome da rede</label>
            <input
              value={state.wifiSsid}
              onChange={(e) => setState((prev) => ({ ...prev, wifiSsid: e.target.value }))}
            />
          </div>

          <div className="field">
            <label>Segurança</label>
            <select
              value={state.wifiSecurity}
              onChange={(e) => setState((prev) => ({ ...prev, wifiSecurity: e.target.value }))}
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">Sem senha</option>
            </select>
          </div>

          <div className="field">
            <label>Senha</label>
            <input
              value={state.wifiPassword}
              onChange={(e) => setState((prev) => ({ ...prev, wifiPassword: e.target.value }))}
            />
          </div>
        </div>
      )}

      {state.qrType === "email" && (
        <div className="stack-lg">
          <div className="field">
            <label>E-mail</label>
            <input
              value={state.emailAddress}
              onChange={(e) => setState((prev) => ({ ...prev, emailAddress: e.target.value }))}
            />
          </div>

          <div className="field">
            <label>Assunto</label>
            <input
              value={state.emailSubject}
              onChange={(e) => setState((prev) => ({ ...prev, emailSubject: e.target.value }))}
            />
          </div>

          <div className="field">
            <label>Mensagem</label>
            <textarea
              value={state.emailBody}
              onChange={(e) => setState((prev) => ({ ...prev, emailBody: e.target.value }))}
              rows={4}
            />
          </div>
        </div>
      )}

      {state.qrType === "vcard" && (
        <div className="stack-lg">
          <div className="field">
            <label>Nome</label>
            <input
              value={state.vcardName}
              onChange={(e) => setState((prev) => ({ ...prev, vcardName: e.target.value }))}
            />
          </div>

          <div className="field">
            <label>Empresa</label>
            <input
              value={state.vcardCompany}
              onChange={(e) => setState((prev) => ({ ...prev, vcardCompany: e.target.value }))}
            />
          </div>

          <div className="field">
            <label>Telefone</label>
            <input
              value={state.vcardPhone}
              onChange={(e) => setState((prev) => ({ ...prev, vcardPhone: e.target.value }))}
            />
          </div>

          <div className="field">
            <label>E-mail</label>
            <input
              value={state.vcardEmail}
              onChange={(e) => setState((prev) => ({ ...prev, vcardEmail: e.target.value }))}
            />
          </div>

          <div className="field">
            <label>Site</label>
            <input
              value={state.vcardWebsite}
              onChange={(e) => setState((prev) => ({ ...prev, vcardWebsite: e.target.value }))}
            />
          </div>
        </div>
      )}

      <div className="tip-box">
        Para materiais impressos, prefira contraste alto, tamanho adequado e conteúdo curto.
      </div>
    </div>
  );
}
