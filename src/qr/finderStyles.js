import { roundedRect } from "../utils/canvas.js";

/**
 * Desenha os olhos do QR Code.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} cell
 * @param {string} color
 * @param {"square"|"rounded"|"leaf"} style
 */
export function drawFinder(ctx, x, y, cell, color, style) {
  const outer = 7 * cell;
  const inner = 5 * cell;
  const pupil = 3 * cell;
  const innerOffset = cell;
  const pupilOffset = 2 * cell;

  ctx.save();
  ctx.fillStyle = color;

  if (style === "rounded") {
    roundedRect(ctx, x, y, outer, outer, cell * 1.7);
    ctx.fill();
    ctx.clearRect(x + innerOffset, y + innerOffset, inner, inner);
    roundedRect(ctx, x + pupilOffset, y + pupilOffset, pupil, pupil, cell * 1.05);
    ctx.fill();
  } else if (style === "leaf") {
    ctx.beginPath();
    ctx.moveTo(x + outer * 0.18, y + outer * 0.1);
    ctx.quadraticCurveTo(x + outer, y, x + outer * 0.92, y + outer * 0.78);
    ctx.quadraticCurveTo(x + outer * 0.9, y + outer, x + outer * 0.2, y + outer * 0.92);
    ctx.quadraticCurveTo(x, y + outer * 0.88, x + outer * 0.08, y + outer * 0.18);
    ctx.closePath();
    ctx.fill();

    ctx.clearRect(x + innerOffset, y + innerOffset, inner, inner);

    ctx.beginPath();
    ctx.moveTo(x + pupilOffset + pupil * 0.2, y + pupilOffset + pupil * 0.05);
    ctx.quadraticCurveTo(
      x + pupilOffset + pupil,
      y + pupilOffset,
      x + pupilOffset + pupil * 0.9,
      y + pupilOffset + pupil * 0.82,
    );
    ctx.quadraticCurveTo(
      x + pupilOffset + pupil * 0.85,
      y + pupilOffset + pupil,
      x + pupilOffset + pupil * 0.18,
      y + pupilOffset + pupil * 0.92,
    );
    ctx.quadraticCurveTo(
      x + pupilOffset,
      y + pupilOffset + pupil * 0.86,
      x + pupilOffset + pupil * 0.08,
      y + pupilOffset + pupil * 0.18,
    );
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.fillRect(x, y, outer, outer);
    ctx.clearRect(x + innerOffset, y + innerOffset, inner, inner);
    ctx.fillRect(x + pupilOffset, y + pupilOffset, pupil, pupil);
  }

  ctx.restore();
}
