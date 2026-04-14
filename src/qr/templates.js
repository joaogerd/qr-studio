/**
 * Templates completos de card inspirados nas referências visuais do usuário.
 */
export const TEMPLATE_STYLES = {
  none: { name: "Sem template", kind: "standard" },

  classic_pink_blue: {
    name: "Classic Pink / Blue",
    kind: "card",
    outerBg: "#2F3C94",
    outerBorder: null,
    panelBg: "#FFFFFF",
    panelGradient: null,
    qrColor: "#FF5B73",
    cornerColor: "#FF5B73",
    labelTextColor: "#FFFFFF",
    labelStyle: "plain_bottom",
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
};

export function getTemplateStyle(templateStyle) {
  return TEMPLATE_STYLES[templateStyle] ?? TEMPLATE_STYLES.none;
}
