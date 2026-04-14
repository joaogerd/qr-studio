import { roundedRect } from "../../utils/canvas.js";

/**
 * Desenha um frame simples com borda.
 *
 * Regras de composição:
 * - `fullWidth` representa a largura total disponível;
 * - o frame é sempre centralizado horizontalmente;
 * - a largura do frame nasce de uma proporção de `fullWidth`;
 * - as medidas verticais continuam sendo controladas por `scaleFactor`;
 * - o raio e a espessura da borda também acompanham a escala.
 *
 * @param {CanvasRenderingContext2D} ctx
 *   Contexto 2D do canvas.
 *
 * @param {number} fullWidth
 *   Largura total disponível para o desenho.
 *
 * @param {number} scaleFactor
 *   Fator de escala aplicado às medidas verticais e à espessura da borda.
 *
 * @param {string} frameColor
 *   Cor da borda do frame.
 */
export function drawSimpleFrame(ctx, fullWidth, scaleFactor, frameColor) {
  /**
   * Configuração visual do frame.
   *
   * Observação:
   * O frame fica sempre centralizado, então não precisamos
   * guardar deslocamento horizontal manual.
   */
  const LAYOUT = {
    /**
     * Largura do frame em relação à largura total disponível.
     *
     * Exemplo:
     * 0.42 significa que o frame ocupará 42% de `fullWidth`.
     */
    widthRatio: 0.85,

    /**
     * Distância do topo do canvas.
     */
    topOffset: 20,

    /**
     * Altura do frame.
     */
    heightRatio: 0.2,

    /**
     * Raio dos cantos arredondados.
     */
    borderRadius: 8,

    /**
     * Espessura da borda.
     */
    borderWidth: 2,
  };

  /**
   * Função auxiliar para aplicar escala às medidas verticais
   * e aos detalhes visuais.
   */
  const s = (value) => value * scaleFactor;

  /**
   * Largura final do frame.
   *
   * A dimensão horizontal nasce diretamente de `fullWidth`.
   */
  const frameWidth = fullWidth * LAYOUT.widthRatio;

  /**
   * Como o frame é sempre centralizado, a posição X
   * é calculada automaticamente:
   *
   * - calcula o espaço que sobra;
   * - divide esse espaço por 2;
   * - assim o frame fica igualmente afastado das duas laterais.
   */
  const frameX = (fullWidth - frameWidth) / 2;

  /**
   * Posição e dimensões verticais.
   */
  const frameY = s(LAYOUT.topOffset);
  const frameHeight = fullWidth * LAYOUT.heightRatio;

  /**
   * Detalhes visuais da borda.
   */
  const borderRadius = s(LAYOUT.borderRadius);
  const borderWidth = s(LAYOUT.borderWidth);

  ctx.save();

  ctx.strokeStyle = frameColor;
  ctx.lineWidth = borderWidth;

  roundedRect(
    ctx,
    frameX,
    frameY,
    frameWidth,
    frameHeight,
    borderRadius,
  );
  ctx.stroke();

  ctx.restore();
}
