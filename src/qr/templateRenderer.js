import { roundedRect } from "../utils/canvas.js";
import { getTemplateStyle } from "./templates.js";

const CARD_RATIO = {
  width: 1.15,
  height: 1.58,
};

const CARD_OFFSETS = {
  x: 16,
  y: 16,
  panelInset: 24,
};

const LABEL_LAYOUTS = {
  plain_bottom: { x: 24, yFromBottom: 86, widthInset: 48, height: 48 },
  pill_bottom: { x: 30, yFromBottom: 92, widthInset: 60, height: 46 },
  bar_bottom: { x: 26, yFromBottom: 88, widthInset: 52, height: 44 },

  pill_top: { x: 34, y: 12, widthInset: 68, height: 42 },
  outline_top: { x: 34, y: 12, widthInset: 68, height: 42 },
  plain_top: { x: 24, y: 18, widthInset: 48, height: 42 },
  arrow_top: { x: 24, y: 14, widthInset: 48, height: 44 },
  arrow_side: { x: 24, y: 16, widthInset: 48, height: 44 },
};

const TOP_LABEL_STYLES = new Set(["pill_top", "outline_top", "plain_top"]);
const BOTTOM_COMPACT_PANEL_STYLES = new Set(["pill_bottom", "plain_bottom"]);

export function buildScene({
  size,
  scaleFactor,
  showFrame,
  frameStyle,
  templateStyle,
}) {
  const template = getTemplateStyle(templateStyle);

  if (template.kind !== "card") {
    return buildStandardScene({ size, scaleFactor, showFrame, frameStyle, template });
  }

  return buildCardScene({ size, scaleFactor, template });
}

function buildStandardScene({ size, scaleFactor, showFrame, frameStyle, template }) {
  const frameTop = showFrame && frameStyle !== "none" ? 96 * scaleFactor : 0;
  const outerPadding = 28 * scaleFactor;
  const qrPixelSize = size * scaleFactor;

  return {
    template,
    fullWidth: qrPixelSize + outerPadding * 2,
    fullHeight: qrPixelSize + outerPadding * 2 + frameTop,
    qrX: outerPadding,
    qrY: outerPadding + frameTop,
    qrPixelSize,
    isTemplateCard: false,
    cardRect: null,
    panelRect: null,
    labelRect: null,
  };
}

function buildCardScene({ size, scaleFactor, template }) {
  const cardWidth = Math.round(size * CARD_RATIO.width * scaleFactor);
  const cardHeight = Math.round(size * CARD_RATIO.height * scaleFactor);
  const cardX = CARD_OFFSETS.x * scaleFactor;
  const cardY = CARD_OFFSETS.y * scaleFactor;

  const panelInset = CARD_OFFSETS.panelInset * scaleFactor;
  const pointerSize = 20 * scaleFactor;

  let panelX = cardX + panelInset;
  let panelY = cardY + panelInset;
  let panelWidth = cardWidth - panelInset * 2;
  let panelHeight = size * 0.98 * scaleFactor;

  if (TOP_LABEL_STYLES.has(template.labelStyle)) {
    const offset = 52 * scaleFactor;
    panelY += offset;
    panelHeight -= offset;
  }

  if (BOTTOM_COMPACT_PANEL_STYLES.has(template.labelStyle)) {
    panelHeight = size * 0.92 * scaleFactor;
  }

  const qrBoxSize = Math.min(
    panelWidth - 48 * scaleFactor,
    panelHeight - 52 * scaleFactor,
  );

  const qrX = panelX + (panelWidth - qrBoxSize) / 2;
  const qrY = panelY + 32 * scaleFactor;

  return {
    template,
    fullWidth: cardWidth + cardX * 2,
    fullHeight: cardHeight + cardY * 2,
    qrX,
    qrY,
    qrPixelSize: qrBoxSize,
    isTemplateCard: true,
    cardRect: {
      x: cardX,
      y: cardY,
      width: cardWidth,
      height: cardHeight,
      radius: template.outerRadius * scaleFactor,
      pointerSize,
    },
    panelRect: {
      x: panelX,
      y: panelY,
      width: panelWidth,
      height: panelHeight,
      radius: template.panelRadius * scaleFactor,
      pointerSize,
    },
    labelRect: createLabelRect({
      labelStyle: template.labelStyle,
      cardX,
      cardY,
      cardWidth,
      cardHeight,
      scaleFactor,
    }),
  };
}

function createLabelRect({
  labelStyle,
  cardX,
  cardY,
  cardWidth,
  cardHeight,
  scaleFactor,
}) {
  const config = LABEL_LAYOUTS[labelStyle];
  if (!config) return null;

  const x = cardX + config.x * scaleFactor;
  const width = cardWidth - config.widthInset * scaleFactor;
  const height = config.height * scaleFactor;

  const y =
    typeof config.y === "number"
      ? cardY + config.y * scaleFactor
      : cardY + cardHeight - config.yFromBottom * scaleFactor;

  return {
    x,
    y,
    width,
    height,
    kind: labelStyle,
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

function applyCenteredText(ctx, { text, x, y, fontSize, color }) {
  ctx.fillStyle = color;
  ctx.font = `700 ${Math.round(fontSize)}px Inter, Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
}

function drawRoundedLabel(ctx, labelRect, { fill, stroke, radius = 12, lineWidth = 3 }) {
  if (fill) {
    ctx.fillStyle = fill;
    roundedRect(ctx, labelRect.x, labelRect.y, labelRect.width, labelRect.height, radius);
    ctx.fill();
  }

  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    roundedRect(ctx, labelRect.x, labelRect.y, labelRect.width, labelRect.height, radius);
    ctx.stroke();
  }
}

function drawDownPointer(ctx, { x, y, size, fill, stroke, lineWidth = 3 }) {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.moveTo(x - size, y);
  ctx.lineTo(x, y + size);
  ctx.lineTo(x + size, y);
  ctx.closePath();
  ctx.fill();

  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x - size, y);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x + size, y);
    ctx.stroke();
  }
}

function drawLabel(ctx, template, labelRect, labelText) {
  if (!labelRect) return;

  const centerX = labelRect.x + labelRect.width / 2;
  const centerY = labelRect.y + labelRect.height / 2;
  const textColor = template.labelTextColor || "#FFFFFF";

  switch (labelRect.kind) {
    case "pill_bottom":
    case "pill_top":
    case "outline_top": {
      drawRoundedLabel(ctx, labelRect, {
        fill: template.labelBg,
        stroke: labelRect.kind === "outline_top" ? template.labelBorder : null,
        radius: 12,
        lineWidth: 3,
      });

      drawDownPointer(ctx, {
        x: centerX,
        y: labelRect.y + labelRect.height,
        size: 9,
        fill: template.labelBg || "#FFFFFF",
        stroke: labelRect.kind === "outline_top" ? template.labelBorder : null,
        lineWidth: 3,
      });

      applyCenteredText(ctx, {
        text: labelText,
        x: centerX,
        y: centerY + 1,
        fontSize: labelRect.height * 0.56,
        color: textColor,
      });
      return;
    }

    case "bar_bottom": {
      drawRoundedLabel(ctx, labelRect, {
        fill: template.labelBg || "#111111",
        radius: 10,
      });

      applyCenteredText(ctx, {
        text: labelText,
        x: centerX,
        y: centerY + 1,
        fontSize: labelRect.height * 0.56,
        color: textColor,
      });
      return;
    }

    case "arrow_top": {
      applyCenteredText(ctx, {
        text: labelText,
        x: centerX,
        y: centerY,
        fontSize: labelRect.height * 0.62,
        color: template.labelTextColor || "#111111",
      });

      drawDownPointer(ctx, {
        x: centerX,
        y: labelRect.y + labelRect.height,
        size: 12,
        fill: template.labelTextColor || "#111111",
      });
      return;
    }

    case "arrow_side": {
      const color = template.labelTextColor || "#111111";

      applyCenteredText(ctx, {
        text: labelText,
        x: labelRect.x + labelRect.width * 0.42,
        y: centerY,
        fontSize: labelRect.height * 0.58,
        color,
      });

      const x = labelRect.x + labelRect.width - 18;
      const y = labelRect.y + 8;

      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + 20, y + 18, x - 8, y + 38);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x - 8, y + 38);
      ctx.lineTo(x - 1, y + 31);
      ctx.lineTo(x + 2, y + 40);
      ctx.closePath();
      ctx.fill();
      return;
    }

    case "plain_top":
    case "plain_bottom": {
      applyCenteredText(ctx, {
        text: labelText,
        x: centerX,
        y: centerY,
        fontSize: labelRect.height * 0.6,
        color: template.labelTextColor || "#111111",
      });
      return;
    }

    default:
      return;
  }
}

function drawCardBackground(ctx, template, cardRect) {
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
}

function drawPanel(ctx, template, panelRect) {
  if (template.panelGradient) {
    const gradient = ctx.createLinearGradient(
      panelRect.x,
      panelRect.y,
      panelRect.x + panelRect.width,
      panelRect.y + panelRect.height,
    );
    gradient.addColorStop(0, template.panelGradient[0]);
    gradient.addColorStop(1, template.panelGradient[1]);
    drawPanelWithPointer(ctx, panelRect, gradient);
    return;
  }

  if (template.panelBg) {
    drawPanelWithPointer(ctx, panelRect, template.panelBg);
  }
}

export function drawTemplateChrome(ctx, scene, labelText = "SCAN ME") {
  const { template, cardRect, panelRect, labelRect, qrX, qrY, qrPixelSize } = scene;
  if (!scene.isTemplateCard) return;

  ctx.save();

  drawCardBackground(ctx, template, cardRect);
  drawPanel(ctx, template, panelRect);
  drawLabel(ctx, template, labelRect, labelText);

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
