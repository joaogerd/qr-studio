import { roundedRect } from "../utils/canvas.js";
import { getTemplateStyle } from "./templates.js";

export function buildScene({ size, scaleFactor, showFrame, frameStyle, templateStyle }) {
  const template = getTemplateStyle(templateStyle);

  if (template.kind !== "card") {
    const frameTop = showFrame && frameStyle !== "none" ? 96 * scaleFactor : 0;
    const outerPadding = 28 * scaleFactor;
    const qrPixelSize = size * scaleFactor;
    const fullWidth = qrPixelSize + outerPadding * 2;
    const fullHeight = qrPixelSize + outerPadding * 2 + frameTop;

    return {
      template,
      fullWidth,
      fullHeight,
      qrX: outerPadding,
      qrY: outerPadding + frameTop,
      qrPixelSize,
      isTemplateCard: false,
      cardRect: null,
      panelRect: null,
      labelRect: null,
    };
  }

  const cardWidth = Math.round(size * 1.15 * scaleFactor);
  const cardHeight = Math.round(size * 1.58 * scaleFactor);
  const cardX = 16 * scaleFactor;
  const cardY = 16 * scaleFactor;
  const fullWidth = cardWidth + cardX * 2;
  const fullHeight = cardHeight + cardY * 2;

  let panelX = cardX + 24 * scaleFactor;
  let panelY = cardY + 24 * scaleFactor;
  let panelWidth = cardWidth - 48 * scaleFactor;
  let panelHeight = size * 0.98 * scaleFactor;

  const pointerSize = 20 * scaleFactor;

  if (template.labelStyle === "pill_top" || template.labelStyle === "outline_top" || template.labelStyle === "plain_top") {
    panelY += 52 * scaleFactor;
    panelHeight -= 52 * scaleFactor;
  }

  if (template.labelStyle === "pill_bottom" || template.labelStyle === "plain_bottom") {
    panelHeight = size * 0.92 * scaleFactor;
  }

  const qrBoxSize = Math.min(panelWidth - 48 * scaleFactor, panelHeight - 52 * scaleFactor);
  const qrX = panelX + (panelWidth - qrBoxSize) / 2;
  const qrY = panelY + 32 * scaleFactor;

  let labelRect = null;
  if (template.labelStyle === "plain_bottom") {
    labelRect = { x: cardX + 24 * scaleFactor, y: cardY + cardHeight - 86 * scaleFactor, width: cardWidth - 48 * scaleFactor, height: 48 * scaleFactor, kind: "plain_bottom" };
  } else if (template.labelStyle === "pill_bottom") {
    labelRect = { x: cardX + 30 * scaleFactor, y: cardY + cardHeight - 92 * scaleFactor, width: cardWidth - 60 * scaleFactor, height: 46 * scaleFactor, kind: "pill_bottom" };
  } else if (template.labelStyle === "pill_top") {
    labelRect = { x: cardX + 34 * scaleFactor, y: cardY + 12 * scaleFactor, width: cardWidth - 68 * scaleFactor, height: 42 * scaleFactor, kind: "pill_top" };
  } else if (template.labelStyle === "outline_top") {
    labelRect = { x: cardX + 34 * scaleFactor, y: cardY + 12 * scaleFactor, width: cardWidth - 68 * scaleFactor, height: 42 * scaleFactor, kind: "outline_top" };
  } else if (template.labelStyle === "plain_top") {
    labelRect = { x: cardX + 24 * scaleFactor, y: cardY + 18 * scaleFactor, width: cardWidth - 48 * scaleFactor, height: 42 * scaleFactor, kind: "plain_top" };
  }

  return {
    template,
    fullWidth,
    fullHeight,
    qrX,
    qrY,
    qrPixelSize: qrBoxSize,
    isTemplateCard: true,
    cardRect: { x: cardX, y: cardY, width: cardWidth, height: cardHeight, radius: template.outerRadius * scaleFactor, pointerSize },
    panelRect: { x: panelX, y: panelY, width: panelWidth, height: panelHeight, radius: template.panelRadius * scaleFactor, pointerSize },
    labelRect,
  };
}

function drawPanelWithPointer(ctx, rect, fillStyle) {
  ctx.save();
  ctx.fillStyle = fillStyle;
  roundedRect(ctx, rect.x, rect.y, rect.width, rect.height, rect.radius);
  ctx.fill();

  const px = rect.x + rect.width / 2;
  const py = rect.y + rect.height;
  const ps = rect.pointerSize;

  ctx.beginPath();
  ctx.moveTo(px - ps, py);
  ctx.lineTo(px, py + ps);
  ctx.lineTo(px + ps, py);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function drawTemplateChrome(ctx, scene, labelText = "SCAN ME") {
  const { template, cardRect, panelRect, labelRect, qrX, qrY, qrPixelSize } = scene;
  if (!scene.isTemplateCard) return;

  ctx.save();

  if (template.outerBg) {
    ctx.fillStyle = template.outerBg;
    roundedRect(ctx, cardRect.x, cardRect.y, cardRect.width, cardRect.height, cardRect.radius);
    ctx.fill();
  }

  if (template.outerBorder) {
    ctx.strokeStyle = template.outerBorder;
    ctx.lineWidth = 4;
    roundedRect(ctx, cardRect.x, cardRect.y, cardRect.width, cardRect.height, cardRect.radius);
    ctx.stroke();
  }

  if (template.panelGradient) {
    const gradient = ctx.createLinearGradient(panelRect.x, panelRect.y, panelRect.x + panelRect.width, panelRect.y + panelRect.height);
    gradient.addColorStop(0, template.panelGradient[0]);
    gradient.addColorStop(1, template.panelGradient[1]);
    drawPanelWithPointer(ctx, panelRect, gradient);
  } else if (template.panelBg) {
    drawPanelWithPointer(ctx, panelRect, template.panelBg);
  }

  if (labelRect) {
    const radius = 12;

    if (labelRect.kind === "pill_bottom" || labelRect.kind === "pill_top" || labelRect.kind === "outline_top") {
      if (template.labelBg) {
        ctx.fillStyle = template.labelBg;
        roundedRect(ctx, labelRect.x, labelRect.y, labelRect.width, labelRect.height, radius);
        ctx.fill();
      }

      if (labelRect.kind === "outline_top" && template.labelBorder) {
        ctx.strokeStyle = template.labelBorder;
        ctx.lineWidth = 3;
        roundedRect(ctx, labelRect.x, labelRect.y, labelRect.width, labelRect.height, radius);
        ctx.stroke();
      }

      const px = labelRect.x + labelRect.width / 2;
      const py = labelRect.y + labelRect.height;
      const ps = 9;

      ctx.fillStyle = template.labelBg || "#FFFFFF";
      ctx.beginPath();
      ctx.moveTo(px - ps, py);
      ctx.lineTo(px, py + ps);
      ctx.lineTo(px + ps, py);
      ctx.closePath();
      ctx.fill();

      if (labelRect.kind === "outline_top" && template.labelBorder) {
        ctx.strokeStyle = template.labelBorder;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(px - ps, py);
        ctx.lineTo(px, py + ps);
        ctx.lineTo(px + ps, py);
        ctx.stroke();
      }
    }

    ctx.fillStyle = template.labelTextColor || "#FFFFFF";
    ctx.font = `700 ${Math.round(labelRect.height * 0.56)}px Inter, Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(labelText, labelRect.x + labelRect.width / 2, labelRect.y + labelRect.height / 2 + 1);
  }

  drawCornerMarks(ctx, {
    x: qrX,
    y: qrY,
    size: qrPixelSize,
    color: template.cornerColor || template.qrColor || "#FFFFFF",
    lineWidth: Math.max(3, qrPixelSize * 0.025),
  });

  ctx.restore();
}

export function drawCornerMarks(ctx, { x, y, size, color, lineWidth }) {
  const mark = size * 0.14;
  const inset = size * 0.03;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "square";

  ctx.beginPath();
  ctx.moveTo(x + inset, y + inset + mark);
  ctx.lineTo(x + inset, y + inset);
  ctx.lineTo(x + inset + mark, y + inset);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + size - inset - mark, y + inset);
  ctx.lineTo(x + size - inset, y + inset);
  ctx.lineTo(x + size - inset, y + inset + mark);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + inset, y + size - inset - mark);
  ctx.lineTo(x + inset, y + size - inset);
  ctx.lineTo(x + inset + mark, y + size - inset);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + size - inset - mark, y + size - inset);
  ctx.lineTo(x + size - inset, y + size - inset);
  ctx.lineTo(x + size - inset, y + size - inset - mark);
  ctx.stroke();

  ctx.restore();
}
