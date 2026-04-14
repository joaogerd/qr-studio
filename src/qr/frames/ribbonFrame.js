/**
 * Desenha um frame no estilo ribbon.
 *
 * Regras de composição:
 * - `fullWidth` é a referência principal do layout;
 * - a faixa principal fica sempre centralizada horizontalmente;
 * - largura e altura nascem de proporções de `fullWidth`;
 * - as abas inferiores também são proporcionais ao tamanho da faixa;
 * - o posicionamento vertical continua simples e explícito.
 *
 * Estrutura visual:
 * - 1 retângulo principal
 * - 2 abas inferiores triangulares, uma de cada lado
 *
 * @param {CanvasRenderingContext2D} ctx
 *   Contexto 2D do canvas.
 *
 * @param {number} fullWidth
 *   Largura total disponível para o desenho.
 *
 * @param {number} scaleFactor
 *   Mantido na assinatura para compatibilidade.
 *   Aqui ele é usado apenas no deslocamento vertical.
 *
 * @param {string} frameColor
 *   Cor de preenchimento da ribbon.
 */
export function drawRibbonFrame(ctx, fullWidth, scaleFactor, frameColor) {
  /**
   * Configuração visual da ribbon.
   *
   * Todos os valores são proporções nomeadas,
   * evitando números mágicos soltos no desenho.
   */
  const LAYOUT = {
    /**
     * Largura da faixa principal em relação à largura total disponível.
     */
    widthRatio: 0.8,

    /**
     * Altura da faixa principal em relação à largura total disponível.
     */
    heightRatio: 0.18,

    /**
     * Distância do topo do canvas.
     *
     * Mantida como medida simples, escalada por `scaleFactor`.
     */
    topOffset: 20,

    /**
     * Largura da base horizontal de cada aba inferior,
     * como fração da largura da faixa principal.
     */
    flapWidthRatioFromBody: 0.1,

    /**
     * Distância horizontal do vértice inferior da aba
     * em relação à borda lateral correspondente.
     *
     * Exemplo:
     * - na aba esquerda, o vértice fica um pouco para dentro;
     * - na aba direita, também fica um pouco para dentro.
     */
    flapTipInsetRatioFromBody: 0.05,

    /**
     * Altura das abas inferiores em relação à altura da faixa principal.
     */
    flapHeightRatioFromBody: 0.32,
  };

  /**
   * Dimensões principais da faixa.
   */
  const ribbonWidth = fullWidth * LAYOUT.widthRatio;
  const ribbonHeight = fullWidth * LAYOUT.heightRatio;

  /**
   * Como a ribbon sempre fica centralizada,
   * a posição X é calculada automaticamente.
   */
  const ribbonX = (fullWidth - ribbonWidth) / 2;

  /**
   * Posição vertical da faixa principal.
   */
  const ribbonY = LAYOUT.topOffset * scaleFactor;

  /**
   * Medidas das abas inferiores.
   */
  const flapWidth = ribbonWidth * LAYOUT.flapWidthRatioFromBody;
  const flapTipInset = ribbonWidth * LAYOUT.flapTipInsetRatioFromBody;
  const flapHeight = ribbonHeight * LAYOUT.flapHeightRatioFromBody;

  /**
   * Base inferior da faixa principal.
   */
  const bottomY = ribbonY + ribbonHeight;

  ctx.save();
  ctx.fillStyle = frameColor;

  /**
   * Corpo principal da ribbon.
   */
  ctx.fillRect(ribbonX, ribbonY, ribbonWidth, ribbonHeight);

  /**
   * Aba inferior esquerda.
   *
   * Pontos:
   * - canto inferior esquerdo da faixa
   * - base horizontal da aba
   * - vértice inferior
   */
  ctx.beginPath();
  ctx.moveTo(ribbonX, bottomY);
  ctx.lineTo(ribbonX + flapWidth, bottomY);
  ctx.lineTo(ribbonX + flapTipInset, bottomY + flapHeight);
  ctx.closePath();
  ctx.fill();

  /**
   * Aba inferior direita.
   *
   * Pontos:
   * - canto inferior direito da faixa
   * - base horizontal da aba
   * - vértice inferior
   */
  ctx.beginPath();
  ctx.moveTo(ribbonX + ribbonWidth, bottomY);
  ctx.lineTo(ribbonX + ribbonWidth - flapWidth, bottomY);
  ctx.lineTo(ribbonX + ribbonWidth - flapTipInset, bottomY + flapHeight);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}
