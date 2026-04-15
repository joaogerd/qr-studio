/**
 * Templates completos de card inspirados nas referências visuais do usuário.
 */

export const TEMPLATE_KIND = {
  STANDARD: "standard",
  CARD: "card",
};

export const LABEL_STYLE = {
  PLAIN_BOTTOM: "plain_bottom",
  PILL_BOTTOM: "pill_bottom",
  BAR_BOTTOM: "bar_bottom",
  PILL_TOP: "pill_top",
  OUTLINE_TOP: "outline_top",
  PLAIN_TOP: "plain_top",
  ARROW_TOP: "arrow_top",
  ARROW_SIDE: "arrow_side",
};

export const TEMPLATE_STYLES = Object.freeze({
  none: { name: "Sem template", kind: TEMPLATE_KIND.STANDARD },

  classic_pink_blue: {
    name: "Classic Pink / Blue",
    kind: TEMPLATE_KIND.CARD,
    outerBg: "#2F3C94",
    outerBorder: null,
    panelBg: "#FFFFFF",
    panelGradient: null,
    qrColor: "#FF5B73",
    cornerColor: "#FF5B73",
    labelTextColor: "#FFFFFF",
    labelStyle: LABEL_STYLE.PLAIN_BOTTOM,
    outerRadius: 38,
    panelRadius: 22,
  },

  blue_gradient_card: {
    name: "Blue Gradient Card",
    kind: "card",
    outerBg: "#2F3C94",
    outerBorder: null,
    panelBg: null,
    panelGradient: ["#28B6F6", "#1D7FEA"],
    qrColor: "#FFFFFF",
    cornerColor: "#FFFFFF",
    labelTextColor: "#FFFFFF",
    labelStyle: "plain_bottom",
    outerRadius: 38,
    panelRadius: 22,
  },

  green_bottom_label: {
    name: "Green Bottom Label",
    kind: "card",
    outerBg: "#1FBE5B",
    outerBorder: null,
    panelBg: null,
    panelGradient: null,
    qrColor: "#FFFFFF",
    cornerColor: "#FFFFFF",
    labelTextColor: "#1FBE5B",
    labelBg: "#FFFFFF",
    labelStyle: "pill_bottom",
    outerRadius: 24,
    panelRadius: 18,
  },

  coral_top_label: {
    name: "Coral Top Label",
    kind: "card",
    outerBg: "#FF5A72",
    outerBorder: null,
    panelBg: "#FFFFFF",
    panelGradient: null,
    qrColor: "#FF5A72",
    cornerColor: "#FF5A72",
    labelTextColor: "#FFFFFF",
    labelBg: "#FF5A72",
    labelStyle: "pill_top",
    outerRadius: 24,
    panelRadius: 18,
  },

  yellow_minimal: {
    name: "Yellow Minimal",
    kind: "card",
    outerBg: "#F3C425",
    outerBorder: null,
    panelBg: null,
    panelGradient: null,
    qrColor: "#FFFFFF",
    cornerColor: "#FFFFFF",
    labelTextColor: "#FFFFFF",
    labelStyle: "plain_top",
    outerRadius: 24,
    panelRadius: 18,
  },

  blue_outline_card: {
    name: "Blue Outline Card",
    kind: "card",
    outerBg: "#FFFFFF",
    outerBorder: "#3D7EE8",
    panelBg: "#3D7EE8",
    panelGradient: null,
    qrColor: "#FFFFFF",
    cornerColor: "#FFFFFF",
    labelTextColor: "#3D7EE8",
    labelBg: "#FFFFFF",
    labelBorder: "#3D7EE8",
    labelStyle: "outline_top",
    outerRadius: 24,
    panelRadius: 18,
  },

  scanner_minimal: {
    name: "Scanner Minimal",
    kind: "card",
    outerBg: "#FFFFFF",
    outerBorder: null,
    panelBg: "#FFFFFF",
    qrColor: "#111111",
    cornerColor: "#111111",
    labelTextColor: "#111111",
    labelStyle: "plain_bottom",
    outerRadius: 20,
    panelRadius: 16,
  },
  
  scanner_top_arrow: {
    name: "Scanner Top Arrow",
    kind: "card",
    outerBg: "#FFFFFF",
    panelBg: "#111111",
    qrColor: "#FFFFFF",
    cornerColor: "#FFFFFF",
    labelTextColor: "#111111",
    labelStyle: "arrow_top",
    outerRadius: 20,
    panelRadius: 16,
  },
  
  scanner_bottom_bar: {
    name: "Scanner Bottom Bar",
    kind: "card",
    outerBg: "#FFFFFF",
    panelBg: "#FFFFFF",
    qrColor: "#111111",
    cornerColor: "#111111",
    labelTextColor: "#FFFFFF",
    labelBg: "#111111",
    labelStyle: "bar_bottom",
    outerRadius: 20,
    panelRadius: 16,
  },
  
  scanner_frame_focus: {
    name: "Scanner Focus Frame",
    kind: "card",
    outerBg: "#FFFFFF",
    panelBg: "#FFFFFF",
    qrColor: "#111111",
    cornerColor: "#111111",
    labelTextColor: "#111111",
    labelStyle: "plain_bottom",
    outerRadius: 20,
    panelRadius: 16,
  },
  
  scanner_black_card: {
    name: "Scanner Dark Card",
    kind: "card",
    outerBg: "#111111",
    panelBg: "#111111",
    qrColor: "#FFFFFF",
    cornerColor: "#FFFFFF",
    labelTextColor: "#FFFFFF",
    labelStyle: "arrow_top",
    outerRadius: 20,
    panelRadius: 16,
  },
  
  scanner_arrow_side: {
    name: "Scanner Arrow Side",
    kind: "card",
    outerBg: "#FFFFFF",
    panelBg: "#FFFFFF",
    qrColor: "#111111",
    cornerColor: "#111111",
    labelTextColor: "#111111",
    labelStyle: "arrow_side",
    outerRadius: 20,
    panelRadius: 16,
  },
});

export function getTemplateStyle(templateStyle) {
  return TEMPLATE_STYLES[templateStyle] ?? TEMPLATE_STYLES.none;
}
