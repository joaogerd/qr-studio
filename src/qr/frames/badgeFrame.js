import { roundedRect } from "../../utils/canvas.js";

/**
 * Desenha um frame no estilo badge / cápsula.
 *
 * Regra de composição:
 * - `fullWidth` representa a largura total disponível do próprio badge;
 * - o frame sempre fica centralizado horizontalmente;
 * - a largura do badge é derivada de `fullWidth`;
 * - a posição X é calculada automaticamente para manter a centralização;
 * - as medidas verticais continuam controladas por `scaleFactor`.
 *
 * @param {CanvasRenderingContext2D} ctx
 *   Contexto 2D do canvas.
 *
 * @param {number} fullWidth
 *   Largura total disponível para o desenho.
 *
 * @param {number} scaleFactor
 *   Fator de escala aplicado às medidas verticais.
 *
 * @param {string} frameColor
 *   Cor de preenchimento do badge.
 */
export function drawBadgeFrame(ctx, fullWidth, scaleFactor, frameColor) {
  /**
   * Configuração visual do badge.
   *
   * Não usamos posição horizontal fixa, porque o badge
   * é sempre centralizado.
   */
  const LAYOUT = {
    /**
     * Largura do badge em relação à largura total disponível.
     *
     * Exemplo:
     * 0.85 significa que o badge ocupará 85% de `fullWidth`.
     */
    widthRatio: 0.85,

    /**
     * Distância do topo do canvas.
     */
    topOffset: 20,

    /**
     * Altura do badge.
     */
    heightRatio: 0.2,

    /**
     * O raio da borda é calculado como fração da altura.
     *
     * Metade da altura produz o visual de cápsula.
     */
    borderRadiusRatioFromHeight: 0.4,
  };

  /**
   * Função auxiliar para aplicar escala às medidas verticais.
   */
  const s = (value) => value * scaleFactor;

  /**
   * Largura final do badge.
   *
   * Aqui a largura nasce diretamente de `fullWidth`.
   */
  const badgeWidth = fullWidth * LAYOUT.widthRatio;

  /**
   * Altura e posição vertical do badge.
   */
  const badgeHeight = fullWidth * LAYOUT.heightRatio;
  const badgeY = s(LAYOUT.topOffset);

  /**
   * Centralização horizontal automática.
   *
   * Explicação:
   * - `fullWidth - badgeWidth` calcula o espaço que sobra;
   * - dividindo por 2, metade sobra à esquerda
   *   e metade à direita;
   * - isso posiciona o badge exatamente no centro.
   */
  const badgeX = (fullWidth - badgeWidth) / 2;

  /**
   * Raio das bordas.
   *
   * Como depende da altura final, o visual continua correto
   * mesmo se a altura mudar depois.
   */
  const borderRadius = badgeHeight * LAYOUT.borderRadiusRatioFromHeight;

  ctx.save();
  ctx.fillStyle = frameColor;

  roundedRect(
    ctx,
    badgeX,
    badgeY,
    badgeWidth,
    badgeHeight,
    borderRadius,
  );
  ctx.fill();

  ctx.restore();
}
