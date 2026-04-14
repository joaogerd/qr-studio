import QRCode from "qrcode";
import { drawRoundedCell, drawDot, roundedRect } from "../utils/canvas.js";
import { drawFinder } from "./finderStyles.js";
import { drawFrameByType } from "./frames/index.js";
import { buildScene, drawTemplateChrome } from "./templateRenderer.js";
import { getTemplateStyle } from "./templates.js";

export function createQrData(qrValue, margin) {
  return QRCode.create(qrValue, {
    errorCorrectionLevel: "H",
    margin,
  });
}

export function renderQrBase(canvas, options) {
  if (!canvas) return null;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const {
    qrData,
    size,
    margin,
    background,
    foreground,
    frameColor,
    moduleStyle,
    eyeStyle,
    frameStyle,
    frameLabel,
    showFrame,
    showQuietZone,
    logoDataUrl,
    logoScale,
    logoPadding,
    scaleFactor,
    templateStyle = "none",
    labelText = "SCAN ME",
  } = options;

  const template = getTemplateStyle(templateStyle);
  const scene = buildScene({
    size,
    scaleFactor,
    showFrame,
    frameStyle,
    templateStyle,
  });

  const moduleCount = qrData.modules.size;
  const quietZoneCells = showQuietZone ? margin : 0;
  const totalCells = moduleCount + quietZoneCells * 2;
  const cell = scene.qrPixelSize / totalCells;

  const qrStartX = scene.qrX + quietZoneCells * cell;
  const qrStartY = scene.qrY + quietZoneCells * cell;
  const activeQrSize = moduleCount * cell;

  canvas.width = scene.fullWidth;
  canvas.height = scene.fullHeight;

  ctx.clearRect(0, 0, scene.fullWidth, scene.fullHeight);
  ctx.fillStyle = "#e5e7eb";
  ctx.fillRect(0, 0, scene.fullWidth, scene.fullHeight);

  if (scene.isTemplateCard) {
    drawTemplateChrome(ctx, scene, labelText || frameLabel || "SCAN ME");
  } else {
    if (showFrame && frameStyle !== "none") {
      drawFrameByType(ctx, frameStyle, scene.fullWidth, scaleFactor, frameColor);

      ctx.save();
      ctx.fillStyle =
        frameStyle === "simple" || frameStyle === "double"
          ? frameColor
          : "#ffffff";
      ctx.font = `${700} ${34 * scaleFactor}px Inter, Arial, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const textY =
        frameStyle === "ribbon"
          ? 55 * scaleFactor
          : frameStyle === "speech"
            ? 45 * scaleFactor
            : 60 * scaleFactor;

      ctx.fillText(frameLabel || "SCAN ME", scene.fullWidth / 2, textY);
      ctx.restore();
    }

    ctx.fillStyle = background;
    roundedRect(
      ctx,
      scene.qrX - 10 * scaleFactor,
      scene.qrY - 10 * scaleFactor,
      scene.qrPixelSize + 20 * scaleFactor,
      scene.qrPixelSize + 20 * scaleFactor,
      10 * scaleFactor,
    );
    ctx.fill();

    if (showQuietZone) {
      ctx.fillStyle = background;
      ctx.fillRect(scene.qrX, scene.qrY, scene.qrPixelSize, scene.qrPixelSize);
    }
  }

  const hasLogo = Boolean(logoDataUrl);
  const logoSize = hasLogo ? activeQrSize * (logoScale / 100) : 0;
  const logoSafe = logoSize + logoPadding * 2 * scaleFactor;
  const logoSafeX = qrStartX + (activeQrSize - logoSafe) / 2;
  const logoSafeY = qrStartY + (activeQrSize - logoSafe) / 2;

  const effectiveForeground = scene.isTemplateCard ? (template.qrColor || foreground) : foreground;

  const isInFinder = (r, c) => {
    const topLeft = r < 7 && c < 7;
    const topRight = r < 7 && c >= moduleCount - 7;
    const bottomLeft = r >= moduleCount - 7 && c < 7;
    return topLeft || topRight || bottomLeft;
  };

  for (let r = 0; r < moduleCount; r += 1) {
    for (let c = 0; c < moduleCount; c += 1) {
      const dark = qrData.modules.get(c, r);
      if (!dark) continue;
      if (isInFinder(r, c)) continue;

      const x = qrStartX + c * cell;
      const y = qrStartY + r * cell;

      const insideLogo =
        hasLogo &&
        x + cell > logoSafeX &&
        x < logoSafeX + logoSafe &&
        y + cell > logoSafeY &&
        y < logoSafeY + logoSafe;

      if (insideLogo) continue;

      if (moduleStyle === "dots") {
        drawDot(ctx, x + cell / 2, y + cell / 2, cell * 0.34, effectiveForeground);
      } else if (moduleStyle === "rounded") {
        drawRoundedCell(ctx, x + cell * 0.08, y + cell * 0.08, cell * 0.84, cell * 0.26, effectiveForeground);
      } else {
        ctx.fillStyle = effectiveForeground;
        ctx.fillRect(x, y, cell, cell);
      }
    }
  }

  drawFinder(ctx, qrStartX, qrStartY, cell, effectiveForeground, eyeStyle);
  drawFinder(ctx, qrStartX + (moduleCount - 7) * cell, qrStartY, cell, effectiveForeground, eyeStyle);
  drawFinder(ctx, qrStartX, qrStartY + (moduleCount - 7) * cell, cell, effectiveForeground, eyeStyle);

  if (!scene.isTemplateCard) {
    ctx.strokeStyle = frameColor;
    ctx.lineWidth = 1.5 * scaleFactor;
    roundedRect(
      ctx,
      scene.qrX - 6 * scaleFactor,
      scene.qrY - 6 * scaleFactor,
      scene.qrPixelSize + 12 * scaleFactor,
      scene.qrPixelSize + 12 * scaleFactor,
      8 * scaleFactor,
    );
    ctx.stroke();
  }

  return {
    ctx,
    canvas,
    qrX: scene.qrX,
    qrY: scene.qrY,
    qrStartX,
    qrStartY,
    qrPixelSize: scene.qrPixelSize,
    activeQrSize,
    logoSize,
    scaleFactor,
    fullWidth: scene.fullWidth,
    fullHeight: scene.fullHeight,
  };
}

export function renderLogo(canvas, options) {
  const {
    logoDataUrl,
    logoScale,
    logoPadding,
    logoBackground,
    background,
    size,
    margin,
    scaleFactor,
    qrData,
    showFrame,
    frameStyle,
    showQuietZone,
    templateStyle = "none",
  } = options;

  if (!logoDataUrl || !canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const scene = buildScene({
    size,
    scaleFactor,
    showFrame,
    frameStyle,
    templateStyle,
  });

  const image = new Image();
  image.onload = () => {
    const moduleCount = qrData.modules.size;
    const quietZoneCells = showQuietZone ? margin : 0;
    const totalCells = moduleCount + quietZoneCells * 2;
    const cell = scene.qrPixelSize / totalCells;

    const qrStartX = scene.qrX + quietZoneCells * cell;
    const qrStartY = scene.qrY + quietZoneCells * cell;
    const activeQrSize = moduleCount * cell;

    const logoSize = activeQrSize * (logoScale / 100);
    const imageRatio = image.width / image.height || 1;

    let drawW = logoSize;
    let drawH = logoSize;

    if (imageRatio > 1) {
      drawH = logoSize / imageRatio;
    } else {
      drawW = logoSize * imageRatio;
    }

    const dx = qrStartX + (activeQrSize - drawW) / 2;
    const dy = qrStartY + (activeQrSize - drawH) / 2;

    if (logoBackground) {
      ctx.save();
      ctx.fillStyle = background;
      roundedRect(
        ctx,
        dx - logoPadding * scaleFactor,
        dy - logoPadding * scaleFactor,
        drawW + logoPadding * 2 * scaleFactor,
        drawH + logoPadding * 2 * scaleFactor,
        14 * scaleFactor,
      );
      ctx.fill();
      ctx.restore();
    }

    ctx.drawImage(image, dx, dy, drawW, drawH);
  };

  image.src = logoDataUrl;
}
