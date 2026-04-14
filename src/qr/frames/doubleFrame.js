import { roundedRect } from "../../utils/canvas.js";

/**
 * Desenha um frame com dupla linha.
 *
 * Regras de composição:
 * - `fullWidth` é a referência principal do layout;
 * - o frame externo fica sempre centralizado horizontalmente;
 * - largura e altura do frame externo nascem de proporções de `fullWidth`;
 * - o frame interno é calculado a partir do frame externo;
 * - o espaçamento entre as duas linhas também é proporcional ao frame externo;
 * - o posicionamento vertical continua simples e explícito.
 *
 * Estrutura visual:
 * - 1 moldura externa com cantos arredondados
 * - 1 moldura interna com cantos arredondados
 *
 * @param {CanvasRenderingContext2D} ctx
 *   Contexto 2D do canvas.
 *
 * @param {number} fullWidth
 *   Largura total disponível para o desenho.
 *
 * @param {number} scaleFactor
 *   Mantido na assinatura para compatibilidade.
 *   Aqui ele é usado apenas no deslocamento vertical e na espessura da linha.
 *
 * @param {string} frameColor
 *   Cor da borda do frame.
 */
export function drawDoubleFrame(ctx, fullWidth, scaleFactor, frameColor) {
  /**
   * Configuração visual do frame.
   *
   * Todos os valores são proporções nomeadas,
   * evitando números mágicos espalhados pelo desenho.
   */
  const LAYOUT = {
    /**
     * Largura do frame externo em relação à largura total disponível.
     */
    outerWidthRatio: 0.85,

    /**
     * Altura do frame externo em relação à largura total disponível.
     */
    outerHeightRatio: 0.2,

    /**
     * Distância do topo do canvas.
     *
     * Mantida como medida simples, escalada por `scaleFactor`.
     */
    topOffset: 20,

    /**
     * Raio dos cantos do frame externo,
     * como fração da altura do próprio frame externo.
     */
    outerRadiusRatioFromHeight: 0.2,

    /**
     * Distância entre o frame externo e o interno,
     * aplicada em todos os lados.
     *
     * O valor é calculado como fração da largura do frame externo.
     */
    insetRatioFromOuterWidth: 0.0326,

    /**
     * Raio dos cantos do frame interno,
     * como fração da altura do frame interno.
     */
    innerRadiusRatioFromHeight: 0.21,

    /**
     * Espessura da linha.
     */
    borderWidth: 2,
  };

  /**
   * Dimensões do frame externo.
   */
  const outerWidth = fullWidth * LAYOUT.outerWidthRatio;
  const outerHeight = fullWidth * LAYOUT.outerHeightRatio;

  /**
   * Como o frame é sempre centralizado,
   * a posição X nasce automaticamente da largura externa.
   */
  const outerX = (fullWidth - outerWidth) / 2;

  /**
   * Posição vertical do frame externo.
   */
  const outerY = LAYOUT.topOffset * scaleFactor;

  /**
   * Espaçamento entre a linha externa e a interna.
   *
   * Esse valor é aplicado igualmente:
   * - à esquerda
   * - à direita
   * - em cima
   * - embaixo
   */
  const inset = outerWidth * LAYOUT.insetRatioFromOuterWidth;

  /**
   * Dimensões do frame interno,
   * calculadas a partir do frame externo.
   */
  const innerX = outerX + inset;
  const innerY = outerY + inset;
  const innerWidth = outerWidth - 2 * inset;
  const innerHeight = outerHeight - 2 * inset;

  /**
   * Raios dos cantos arredondados.
   */
  const outerRadius =
    outerHeight * LAYOUT.outerRadiusRatioFromHeight;

  const innerRadius =
    innerHeight * LAYOUT.innerRadiusRatioFromHeight;

  /**
   * Espessura da linha.
   */
  const borderWidth = LAYOUT.borderWidth * scaleFactor;

  ctx.save();
  ctx.strokeStyle = frameColor;
  ctx.lineWidth = borderWidth;

  /**
   * Moldura externa.
   */
  roundedRect(
    ctx,
    outerX,
    outerY,
    outerWidth,
    outerHeight,
    outerRadius,
  );
  ctx.stroke();

  /**
   * Moldura interna.
   */
  roundedRect(
    ctx,
    innerX,
    innerY,
    innerWidth,
    innerHeight,
    innerRadius,
  );
  ctx.stroke();

  ctx.restore();
}
