import { drawSpeechFrame } from "./speechFrame.js";
import { drawBadgeFrame } from "./badgeFrame.js";
import { drawSimpleFrame } from "./simpleFrame.js";
import { drawDoubleFrame } from "./doubleFrame.js";
import { drawRibbonFrame } from "./ribbonFrame.js";
import { drawTicketFrame } from "./ticketFrame.js";

/**
 * Dispatcher central dos frames.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} frameStyle
 * @param {number} fullWidth
 * @param {number} scaleFactor
 * @param {string} frameColor
 */
export function drawFrameByType(ctx, frameStyle, fullWidth, scaleFactor, frameColor) {
  switch (frameStyle) {
    case "speech":
      return drawSpeechFrame(ctx, fullWidth, scaleFactor, frameColor);
    case "badge":
      return drawBadgeFrame(ctx, fullWidth, scaleFactor, frameColor);
    case "simple":
      return drawSimpleFrame(ctx, fullWidth, scaleFactor, frameColor);
    case "double":
      return drawDoubleFrame(ctx, fullWidth, scaleFactor, frameColor);
    case "ribbon":
      return drawRibbonFrame(ctx, fullWidth, scaleFactor, frameColor);
    case "ticket":
      return drawTicketFrame(ctx, fullWidth, scaleFactor, frameColor);
    default:
      return;
  }
}
