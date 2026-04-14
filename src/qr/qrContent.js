/**
 * Gera texto vCard.
 *
 * @param {object} data
 * @returns {string}
 */
export function buildVCard(data) {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${data.name || ""}`,
    `ORG:${data.company || ""}`,
    `TEL:${data.phone || ""}`,
    `EMAIL:${data.email || ""}`,
    `URL:${data.website || ""}`,
    "END:VCARD",
  ].join("\n");
}

/**
 * Constrói o payload final do QR com base no estado.
 *
 * @param {object} state
 * @returns {string}
 */
export function buildQrValue(state) {
  switch (state.qrType) {
    case "text":
      return state.textValue || "Texto livre";

    case "whatsapp": {
      const number = (state.whatsNumber || "").replace(/\D/g, "");
      const message = encodeURIComponent(state.whatsMessage || "Olá");
      return `https://wa.me/${number}?text=${message}`;
    }

    case "wifi":
      return `WIFI:T:${state.wifiSecurity};S:${state.wifiSsid};P:${state.wifiPassword};;`;

    case "email": {
      const subject = encodeURIComponent(state.emailSubject || "Contato");
      const body = encodeURIComponent(state.emailBody || "Olá");
      return `mailto:${state.emailAddress}?subject=${subject}&body=${body}`;
    }

    case "vcard":
      return buildVCard({
        name: state.vcardName,
        company: state.vcardCompany,
        phone: state.vcardPhone,
        email: state.vcardEmail,
        website: state.vcardWebsite,
      });

    case "url":
    default:
      return state.urlValue || "https://seusite.com.br";
  }
}
