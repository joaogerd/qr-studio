import { renderQrBase, renderLogo } from "../qr/qrRenderer.js";

export function downloadQrPng(options) {
  const {
    state,
    qrData,
    filenameSuffix = "",
    scaleFactor = 1,
  } = options;

  const tempCanvas = document.createElement("canvas");

  renderQrBase(tempCanvas, {
    qrData,
    size: state.size,
    margin: state.margin,
    background: state.background,
    foreground: state.foreground,
    frameColor: state.frameColor,
    moduleStyle: state.moduleStyle,
    eyeStyle: state.eyeStyle,
    frameStyle: state.frameStyle,
    labelText: state.labelText,
    templateStyle: state.templateStyle,
    showFrame: state.showFrame,
    showQuietZone: state.showQuietZone,
    logoDataUrl: state.logoDataUrl,
    logoScale: state.logoScale,
    logoPadding: state.logoPadding,
    scaleFactor,
  });

  if (state.logoDataUrl) {
    renderLogo(tempCanvas, {
      logoDataUrl: state.logoDataUrl,
      logoScale: state.logoScale,
      logoPadding: state.logoPadding,
      logoBackground: state.logoBackground,
      background: state.background,
      size: state.size,
      margin: state.margin,
      scaleFactor,
      qrData,
      showFrame: state.showFrame,
      frameStyle: state.frameStyle,
      showQuietZone: state.showQuietZone,
      templateStyle: state.templateStyle,
    });

    setTimeout(() => {
      const link = document.createElement("a");
      link.download = `${(state.title || "qr-studio").toLowerCase().replace(/\s+/g, "-")}${filenameSuffix}.png`;
      link.href = tempCanvas.toDataURL("image/png");
      link.click();
    }, 120);
  } else {
    const link = document.createElement("a");
    link.download = `${(state.title || "qr-studio").toLowerCase().replace(/\s+/g, "-")}${filenameSuffix}.png`;
    link.href = tempCanvas.toDataURL("image/png");
    link.click();
  }
}
