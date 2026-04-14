import { roundedRect } from "../../utils/canvas.js";

/**
 * Desenha um frame estilo balão usando apenas proporções
 * da largura total disponível.
 *
 * Filosofia:
 * - `fullWidth` é a referência principal do layout;
 * - tudo é calculado a partir dele;
 * - nada depende de números absolutos espalhados;
 * - os valores usados são proporções nomeadas.
 */
export function drawSpeechFrame(ctx, fullWidth, scaleFactor, frameColor) {
  /**
   * Proporções do layout em relação à largura total disponível.
   *
   * Esses valores não são "números mágicos":
   * eles representam regras de composição visual.
   */
  const LAYOUT = {
    /**
     * O corpo do balão ocupa 80% da largura total.
     */
    bodyWidthRatio: 0.72,

    /**
     * O corpo começa a 15% da largura total.
     */
    bodyLeftRatio: 0.15,

    /**
     * A altura do corpo é 22% da largura do próprio balão.
     */
    bodyHeightRatio: 0.22,

    /**
     * O arredondamento da borda é 4% da largura do balão.
     */
    borderRadiusRatio: 0.05,

    /**
     * Distância do topo.
     *
     * Como aqui o posicionamento vertical não depende do comprimento,
     * mantemos a altura escalável com `scaleFactor`.
     */
    topOffset: 15,

    tail: {
      /**
       * Posição horizontal da base esquerda da ponta,
       * medida dentro do corpo do balão.
       */
      baseLeftRatioInsideBody: 0.72,

      /**
       * Posição horizontal da base direita da ponta,
       * medida dentro do corpo do balão.
       */
      baseRightRatioInsideBody: 0.81,

      /**
       * Posição horizontal da ponta inferior,
       * medida dentro do corpo do balão.
       */
      tipRatioInsideBody: 0.76,

      /**
       * Altura da ponta em relação à altura do corpo.
       */
      heightRatioFromBody: 0.37,
    },
  };

  /**
   * Função auxiliar de escala para medidas verticais/fixas.
   */
  const s = (value) => value * scaleFactor;

  /**
   * -------------------------------------------------------------------------
   * CORPO DO BALÃO
   * -------------------------------------------------------------------------
   */
  const bodyWidth = fullWidth * LAYOUT.bodyWidthRatio;
  const bodyX = fullWidth * LAYOUT.bodyLeftRatio;
  const bodyY = s(LAYOUT.topOffset);

  const bodyHeight = bodyWidth * LAYOUT.bodyHeightRatio;
  const borderRadius = bodyWidth * LAYOUT.borderRadiusRatio;

  /**
   * -------------------------------------------------------------------------
   * PONTA DO BALÃO
   * -------------------------------------------------------------------------
   *
   * A base da ponta fica exatamente na base do retângulo.
   */
  const tailBaseY = bodyY + bodyHeight;
  const tailTipY = tailBaseY + bodyHeight * LAYOUT.tail.heightRatioFromBody;

  const tailBaseLeftX =
    bodyX + bodyWidth * LAYOUT.tail.baseLeftRatioInsideBody;

  const tailBaseRightX =
    bodyX + bodyWidth * LAYOUT.tail.baseRightRatioInsideBody;

  const tailTipX =
    bodyX + bodyWidth * LAYOUT.tail.tipRatioInsideBody;

  /**
   * -------------------------------------------------------------------------
   * DESENHO
   * -------------------------------------------------------------------------
   */
  ctx.save();
  ctx.fillStyle = frameColor;

  // Corpo principal do balão
  roundedRect(ctx, bodyX, bodyY, bodyWidth, bodyHeight, borderRadius);
  ctx.fill();

  // Ponta do balão
  ctx.beginPath();
  ctx.moveTo(tailBaseLeftX, tailBaseY);
  ctx.lineTo(tailBaseRightX, tailBaseY);
  ctx.lineTo(tailTipX, tailTipY);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}
