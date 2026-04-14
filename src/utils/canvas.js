/**
 * Junta classes CSS condicionais.
 *
 * @param {...(string|false|null|undefined)} parts
 * @returns {string}
 */
export function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Desenha um retângulo arredondado no contexto atual.
 *
 * A função apenas cria o path. O chamador decide se faz fill ou stroke.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {number} radius
 */
export function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

/**
 * Desenha um módulo arredondado.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} size
 * @param {number} radius
 * @param {string} fill
 */
export function drawRoundedCell(ctx, x, y, size, radius, fill) {
  ctx.save();
  ctx.fillStyle = fill;
  roundedRect(ctx, x, y, size, size, radius);
  ctx.fill();
  ctx.restore();
}

/**
 * Desenha um módulo em formato de ponto.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} cxValue
 * @param {number} cyValue
 * @param {number} radius
 * @param {string} fill
 */
export function drawDot(ctx, cxValue, cyValue, radius, fill) {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = fill;
  ctx.arc(cxValue, cyValue, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
