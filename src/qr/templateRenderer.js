import { roundedRect } from "../utils/canvas.js";
import { getTemplateStyle } from "./templates.js";

const CARD_RATIO = {
  width: 1.15,
  height: 1.58,
};

const DEFAULT_CARD_INSET = 16;
const DEFAULT_PANEL_INSET = 24;
const DEFAULT_POINTER_SIZE = 20;

const TOP_LABEL_KINDS = new Set([
  "pill_top",
  "outline_top",
  "plain_top",
  "arrow_top",
]);

const BOTTOM_LABEL_KINDS = new Set([
  "plain_bottom",
  "pill_bottom",
  "bar_bottom",
]);

export function buildScene({
  size,
  scaleFactor,
  showFrame,
  frameStyle,
  templateStyle,
}) {
  const template = getTemplateStyle(templateStyle);

  if (template.kind !== "card") {
    return buildStandardScene({
      size,
      scaleFactor,
      showFrame,
      frameStyle,
      template,
    });
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
    iconRect: null,
    ctaRect: null,
  };
}

function buildCardScene({ size, scaleFactor, template }) {
  const cardCfg = template.card ?? {};
  const panelCfg = template.panel ?? {};
  const labelCfg = template.label ?? {};
  const iconCfg = template.icon ?? {};
  const ctaCfg = template.cta ?? {};

  const cardInset = (cardCfg.inset ?? DEFAULT_CARD_INSET) * scaleFactor;
  const cardWidth = Math.round(size * (cardCfg.widthRatio ?? CARD_RATIO.width) * scaleFactor);
  const cardHeight = Math.round(size * (cardCfg.heightRatio ?? CARD_RATIO.height) * scaleFactor);
  const cardX = cardInset;
  const cardY = cardInset;

  const fullWidth = cardWidth + cardInset * 2;
  const fullHeight = cardHeight + cardInset * 2;

  const panelInset = (panelCfg.inset ?? DEFAULT_PANEL_INSET) * scaleFactor;
  const panelTopExtra = (panelCfg.topExtra ?? 0) * scaleFactor;
  const panelBottomExtra = (panelCfg.bottomExtra ?? 0) * scaleFactor;

  const panelX = cardX + panelInset;
  const panelY = cardY + panelInset + panelTopExtra;
  const panelWidth = cardWidth - panelInset * 2;
  const panelHeight = cardHeight - panelInset * 2 - panelTopExtra - panelBottomExtra;

  const qrPaddingX = (panelCfg.qrPaddingX ?? 22) * scaleFactor;
  const qrPaddingTop = (panelCfg.qrPaddingTop ?? 22) * scaleFactor;
  const qrPaddingBottom = (panelCfg.qrPaddingBottom ?? 22) * scaleFactor;

  const qrPixelSize = Math.min(
    panelWidth - qrPaddingX * 2,
    panelHeight - qrPaddingTop - qrPaddingBottom,
  );

  const qrX = panelX + (panelWidth - qrPixelSize) / 2 + (panelCfg.qrOffsetX ?? 0) * scaleFactor;
  const qrY = panelY + qrPaddingTop + (panelCfg.qrOffsetY ?? 0) * scaleFactor;

  const labelRect = createLabelRect({
    cardX,
    cardY,
    cardWidth,
    cardHeight,
    scaleFactor,
    label: labelCfg,
  });

  const iconRect = createIconRect({
    cardX,
    cardY,
    cardWidth,
    cardHeight,
    scaleFactor,
    icon: iconCfg,
    labelRect,
  });

  const ctaRect = createCtaRect({
    cardX,
    cardY,
    cardWidth,
    cardHeight,
    scaleFactor,
    cta: ctaCfg,
  });

  return {
    template,
    fullWidth,
    fullHeight,
    qrX,
    qrY,
    qrPixelSize,
    isTemplateCard: true,
    cardRect: {
      x: cardX,
      y: cardY,
      width: cardWidth,
      height: cardHeight,
      radius: (cardCfg.radius ?? template.outerRadius ?? 24) * scaleFactor,
      pointerSize: (panelCfg.pointerSize ?? DEFAULT_POINTER_SIZE) * scaleFactor,
    },
    panelRect: {
      x: panelX,
      y: panelY,
      width: panelWidth,
      height: panelHeight,
      radius: (panelCfg.radius ?? template.panelRadius ?? 18) * scaleFactor,
      pointerSize: (panelCfg.pointerSize ?? DEFAULT_POINTER_SIZE) * scaleFactor,
    },
    labelRect,
    iconRect,
    ctaRect,
  };
}

function createLabelRect({ cardX, cardY, cardWidth, cardHeight, scaleFactor, label }) {
  if (!label?.kind || label.kind === "none") return null;

  const x = cardX + (label.x ?? 24) * scaleFactor;
  const width = cardWidth - (label.widthInset ?? 48) * scaleFactor;
  const height = (label.height ?? 42) * scaleFactor;

  let y = cardY + (label.y ?? 0) * scaleFactor;

  if (typeof label.yFromBottom === "number") {
    y = cardY + cardHeight - label.yFromBottom * scaleFactor;
  }

  return {
    kind: label.kind,
    x,
    y,
    width,
    height,
    radius: (label.radius ?? 12) * scaleFactor,
    pointerSize: (label.pointerSize ?? 9) * scaleFactor,
  };
}

function createIconRect({ cardX, cardY, cardWidth, cardHeight, scaleFactor, icon, labelRect }) {
  if (!icon?.kind || icon.kind === "none") return null;

  const width = (icon.width ?? 44) * scaleFactor;
  const height = (icon.height ?? 28) * scaleFactor;

  let x = cardX + cardWidth / 2 - width / 2;
  let y = cardY + (icon.y ?? 0) * scaleFactor;

  if (icon.anchor === "below_label" && labelRect) {
    y = labelRect.y + labelRect.height + (icon.gap ?? 8) * scaleFactor;
  }

  if (icon.anchor === "top_inside") {
    y = cardY + (icon.y ?? 18) * scaleFactor;
  }

  if (icon.anchor === "right_top") {
    x = cardX + cardWidth - (icon.right ?? 18) * scaleFactor - width;
    y = cardY + (icon.top ?? 18) * scaleFactor;
  }

  if (icon.anchor === "left_bottom") {
    x = cardX + (icon.left ?? 18) * scaleFactor;
    y = cardY + cardHeight - (icon.bottom ?? 64) * scaleFactor;
  }

  return {
    kind: icon.kind,
    x,
    y,
    width,
    height,
    lineWidth: (icon.lineWidth ?? 4) * scaleFactor,
    color: icon.color ?? null,
  };
}

function createCtaRect({ cardX, cardY, cardWidth, cardHeight, scaleFactor, cta }) {
  if (!cta?.enabled) return null;

  const width = (cta.width ?? cardWidth - 52) * scaleFactor;
  const height = (cta.height ?? 44) * scaleFactor;
  const x = cardX + (cta.x ?? 26) * scaleFactor;
  const y =
    typeof cta.yFromBottom === "number"
      ? cardY + cardHeight - cta.yFromBottom * scaleFactor
      : cardY + (cta.y ?? 0) * scaleFactor;

  return {
    x,
    y,
    width,
    height,
    radius: (cta.radius ?? 10) * scaleFactor,
  };
}

function drawRoundedBox(ctx, rect, fillStyle, strokeStyle = null, lineWidth = 0) {
  roundedRect(ctx, rect.x, rect.y, rect.width, rect.height, rect.radius);

  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }

  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    roundedRect(ctx, rect.x, rect.y, rect.width, rect.height, rect.radius);
    ctx.stroke();
  }
}

function drawPanel(ctx, panelRect, template) {
  const panel = template.panel ?? {};
  const fill = panel.fill ?? template.panelBg ?? null;
  const stroke = panel.stroke ?? null;
  const lineWidth = panel.strokeWidth ?? 0;

  if (panel.variant === "none") return;

  if (panel.variant === "gradient" && Array.isArray(template.panelGradient)) {
    const gradient = ctx.createLinearGradient(
      panelRect.x,
      panelRect.y,
      panelRect.x + panelRect.width,
      panelRect.y + panelRect.height,
    );
    gradient.addColorStop(0, template.panelGradient[0]);
    gradient.addColorStop(1, template.panelGradient[1]);
    drawRoundedBox(ctx, panelRect, gradient);
    return;
  }

  if (panel.variant === "outline") {
    drawRoundedBox(ctx, panelRect, fill, stroke, lineWidth);
    return;
  }

  drawRoundedBox(ctx, panelRect, fill, stroke, lineWidth);
}

function drawCenteredText(ctx, { text, x, y, color, size, weight = 700 }) {
  ctx.fillStyle = color;
  ctx.font = `${weight} ${Math.round(size)}px Inter, Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
}

function drawLabel(ctx, labelRect, template, labelText) {
  if (!labelRect) return;

  const label = template.label ?? {};
  const textColor = label.textColor ?? template.labelTextColor ?? "#111111";
  const fill = label.fill ?? template.labelBg ?? null;
  const stroke = label.stroke ?? template.labelBorder ?? null;
  const fontScale = label.fontScale ?? 0.58;

  const centerX = labelRect.x + labelRect.width / 2;
  const centerY = labelRect.y + labelRect.height / 2;

  switch (labelRect.kind) {
    case "pill_top":
    case "pill_bottom": {
      drawRoundedBox(ctx, labelRect, fill, null, 0);

      if (label.pointer !== false) {
        drawDownTriangle(ctx, {
          x: centerX,
          y: labelRect.y + labelRect.height,
          size: labelRect.pointerSize,
          fill: fill || "#FFFFFF",
        });
      }

      drawCenteredText(ctx, {
        text: labelText,
        x: centerX,
        y: centerY + 1,
        color: textColor,
        size: labelRect.height * fontScale,
      });
      return;
    }

    case "outline_top": {
      drawRoundedBox(ctx, labelRect, fill, stroke, label.strokeWidth ?? 3);

      if (label.pointer !== false) {
        drawDownTriangle(ctx, {
          x: centerX,
          y: labelRect.y + labelRect.height,
          size: labelRect.pointerSize,
          fill: fill || "#FFFFFF",
          stroke,
          lineWidth: label.strokeWidth ?? 3,
        });
      }

      drawCenteredText(ctx, {
        text: labelText,
        x: centerX,
        y: centerY + 1,
        color: textColor,
        size: labelRect.height * fontScale,
      });
      return;
    }

    case "bar_bottom": {
      drawRoundedBox(ctx, labelRect, fill || "#111111", null, 0);

      drawCenteredText(ctx, {
        text: labelText,
        x: centerX,
        y: centerY + 1,
        color: textColor,
        size: labelRect.height * (label.fontScale ?? 0.56),
      });
      return;
    }

    case "plain_top":
    case "plain_bottom": {
      drawCenteredText(ctx, {
        text: labelText,
        x: centerX,
        y: centerY,
        color: textColor,
        size: labelRect.height * fontScale,
      });
      return;
    }

    default:
      return;
  }
}

function drawDownTriangle(ctx, { x, y, size, fill, stroke = null, lineWidth = 0 }) {
  ctx.beginPath();
  ctx.moveTo(x - size, y);
  ctx.lineTo(x, y + size);
  ctx.lineTo(x + size, y);
  ctx.closePath();

  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }

  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

function drawArrowDownIcon(ctx, iconRect, color) {
  const cx = iconRect.x + iconRect.width / 2;
  const top = iconRect.y;
  const bottom = iconRect.y + iconRect.height;
  const shaftWidth = iconRect.width * 0.24;
  const headWidth = iconRect.width * 0.9;
  const headHeight = iconRect.height * 0.42;
  const shaftBottom = bottom - headHeight;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx - shaftWidth / 2, top);
  ctx.lineTo(cx + shaftWidth / 2, top);
  ctx.lineTo(cx + shaftWidth / 2, shaftBottom);
  ctx.lineTo(cx + headWidth / 2, shaftBottom);
  ctx.lineTo(cx, bottom);
  ctx.lineTo(cx - headWidth / 2, shaftBottom);
  ctx.lineTo(cx - shaftWidth / 2, shaftBottom);
  ctx.closePath();
  ctx.fill();
}

function drawCurvedArrowIcon(ctx, iconRect, color, lineWidth) {
  const x = iconRect.x;
  const y = iconRect.y;
  const w = iconRect.width;
  const h = iconRect.height;

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(x + w * 0.8, y + h * 0.1);
  ctx.quadraticCurveTo(x + w * 1.02, y + h * 0.4, x + w * 0.72, y + h * 0.78);
  ctx.quadraticCurveTo(x + w * 0.58, y + h * 0.94, x + w * 0.42, y + h * 0.92);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + w * 0.74, y + h * 0.78);
  ctx.lineTo(x + w * 0.6, y + h * 0.72);
  ctx.lineTo(x + w * 0.68, y + h * 0.9);
  ctx.closePath();
  ctx.fill();
}

function drawIcon(ctx, iconRect, template) {
  if (!iconRect) return;

  const icon = template.icon ?? {};
  const color = icon.color ?? template.labelTextColor ?? "#111111";

  switch (iconRect.kind) {
    case "arrow_down":
      drawArrowDownIcon(ctx, iconRect, color);
      return;
    case "arrow_curve":
      drawCurvedArrowIcon(ctx, iconRect, color, iconRect.lineWidth);
      return;
    default:
      return;
  }
}

function drawCta(ctx, ctaRect, template, labelText) {
  if (!ctaRect) return;

  const cta = template.cta ?? {};
  const text = cta.text ?? labelText;
  const bg = cta.fill ?? "#111111";
  const color = cta.textColor ?? "#FFFFFF";

  drawRoundedBox(ctx, ctaRect, bg, null, 0);

  drawCenteredText(ctx, {
    text,
    x: ctaRect.x + ctaRect.width / 2,
    y: ctaRect.y + ctaRect.height / 2 + 1,
    color,
    size: ctaRect.height * (cta.fontScale ?? 0.56),
  });
}

function drawCard(ctx, cardRect, template) {
  const card = template.card ?? {};
  const fill = card.fill ?? template.outerBg ?? null;
  const stroke = card.stroke ?? template.outerBorder ?? null;
  const strokeWidth = card.strokeWidth ?? 4;

  if (fill || stroke) {
    drawRoundedBox(ctx, cardRect, fill, stroke, strokeWidth);
  }
}

function drawPanelFrameOverlay(ctx, scene) {
  const { template, panelRect } = scene;
  const frame = template.frame ?? {};
  if (!frame.type || frame.type === "none") return;

  const color = frame.color ?? template.cornerColor ?? template.qrColor ?? "#111111";
  const lineWidth = frame.lineWidth ?? Math.max(3, scene.qrPixelSize * 0.03);

  if (frame.type === "corners") {
    drawCornerMarks(ctx, {
      x: scene.qrX,
      y: scene.qrY,
      size: scene.qrPixelSize,
      color,
      lineWidth,
      lengthRatio: frame.lengthRatio ?? 0.18,
      insetRatio: frame.insetRatio ?? 0.02,
    });
    return;
  }

  if (frame.type === "panel_outline") {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    roundedRect(
      ctx,
      panelRect.x,
      panelRect.y,
      panelRect.width,
      panelRect.height,
      panelRect.radius,
    );
    ctx.stroke();
    ctx.restore();
    return;
  }
}

export function drawTemplateChrome(ctx, scene, labelText = "SCAN ME") {
  if (!scene.isTemplateCard) return;

  const { template, cardRect, panelRect, labelRect, iconRect, ctaRect } = scene;

  ctx.save();

  drawCard(ctx, cardRect, template);
  drawPanel(ctx, panelRect, template);
  drawLabel(ctx, labelRect, template, labelText);
  drawIcon(ctx, iconRect, template);
  drawCta(ctx, ctaRect, template, labelText);
  drawPanelFrameOverlay(ctx, scene);

  if (template.showDefaultCorners) {
    drawCornerMarks(ctx, {
      x: scene.qrX,
      y: scene.qrY,
      size: scene.qrPixelSize,
      color: template.cornerColor || template.qrColor || "#FFFFFF",
      lineWidth: Math.max(3, scene.qrPixelSize * 0.025),
    });
  }

  ctx.restore();
}

export function drawCornerMarks(
  ctx,
  { x, y, size, color, lineWidth, lengthRatio = 0.14, insetRatio = 0.03 },
) {
  const mark = size * lengthRatio;
  const inset = size * insetRatio;

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
