import { roundedRect } from "../../utils/canvas.js";

/**
 * Desenha um frame no estilo ticket / ingresso.
 *
 * Regras de composição:
 * - `fullWidth` é a referência principal do layout;
 * - o ticket fica sempre centralizado horizontalmente;
 * - largura e altura nascem de proporções de `fullWidth`;
 * - os recortes laterais também são proporcionais ao tamanho do ticket;
 * - o posicionamento vertical continua explícito e simples.
 *
 * Estrutura visual:
 * - 1 corpo principal com cantos arredondados
 * - 2 recortes circulares laterais, um em cada lado
 *
 * @param {CanvasRenderingContext2D} ctx
 *   Contexto 2D do canvas.
 *
 * @param {number} fullWidth
 *   Largura total disponível para o desenho.
 *
 * @param {number} scaleFactor
 *   Mantido na assinatura para compatibilidade.
 *   Nesta versão, a geometria principal nasce de `fullWidth`.
 *
 * @param {string} frameColor
 *   Cor de preenchimento do ticket.
 */
export function drawTicketFrame(ctx, fullWidth, scaleFactor, frameColor) {
  /**
   * Configuração visual do ticket.
   *
   * Todos os valores abaixo são proporções semânticas,
   * e não números mágicos espalhados pelo desenho.
   */
  const LAYOUT = {
    /**
     * Largura do ticket em relação à largura total disponível.
     */
    widthRatio: 0.8,

    /**
     * Altura do ticket em relação à largura total disponível.
     *
     * Seguindo exatamente a lógica que tu descreveu.
     */
    heightRatio: 0.2,

    /**
     * Distância do topo do canvas.
     *
     * Como tu comentou que a mudança principal foi a altura,
     * mantive o deslocamento vertical simples.
     */
    topOffset: 20,

    /**
     * Raio dos cantos arredondados como fração da altura.
     */
    borderRadiusRatioFromHeight: 0.2,

    /**
     * Raio dos recortes laterais como fração da altura.
     */
    notchRadiusRatioFromHeight: 0.16,
  };

  /**
   * Dimensões principais do ticket.
   */
  const ticketWidth = fullWidth * LAYOUT.widthRatio;
  const ticketHeight = fullWidth * LAYOUT.heightRatio;

  /**
   * Centralização horizontal automática.
   */
  const ticketX = (fullWidth - ticketWidth) / 2;

  /**
   * Posição vertical.
   *
   * Mantive com `scaleFactor` para preservar teu padrão de deslocamento,
   * mas a altura em si nasce de `fullWidth`.
   */
  const ticketY = LAYOUT.topOffset * scaleFactor;

  /**
   * Raio dos cantos do corpo principal.
   */
  const borderRadius =
    ticketHeight * LAYOUT.borderRadiusRatioFromHeight;

  /**
   * Raio dos recortes laterais.
   */
  const notchRadius =
    ticketHeight * LAYOUT.notchRadiusRatioFromHeight;

  /**
   * Centro vertical dos recortes.
   *
   * Os recortes ficam exatamente no meio da altura do ticket.
   */
  const notchCenterY = ticketY + ticketHeight / 2;

  ctx.save();

  /**
   * Corpo principal do ticket.
   */
  ctx.fillStyle = frameColor;
  roundedRect(
    ctx,
    ticketX,
    ticketY,
    ticketWidth,
    ticketHeight,
    borderRadius,
  );
  ctx.fill();

  /**
   * Recortes laterais.
   *
   * Usamos "destination-out" para "furar" o ticket,
   * removendo pixels já desenhados.
   */
  ctx.globalCompositeOperation = "destination-out";

  // Recorte do lado esquerdo
  ctx.beginPath();
  ctx.arc(ticketX, notchCenterY, notchRadius, 0, Math.PI * 2);
  ctx.fill();

  // Recorte do lado direito
  ctx.beginPath();
  ctx.arc(ticketX + ticketWidth, notchCenterY, notchRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
