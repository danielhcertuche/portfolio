// Paleta del demo. Se define aquí y no en el CSS porque el canvas necesita los
// valores en JS y una sola fuente evita que el lienzo y la interfaz se desfasen.

export const CLUSTER_COLORS = [
  "#ff4d6d", // rojo
  "#ffa62b", // naranja
  "#b388ff", // violeta
  "#38d9a9", // verde agua
  "#4dabf7", // azul
  "#f783ac", // rosa
];

export const ARM_COLORS = ["#ffe066", "#ff8787"];
export const BACKGROUND_DOT = "rgba(120, 160, 210, 0.30)";

// Escala de densidad: azul profundo -> cian -> blanco cálido.
export function densityColor(t, alpha = 1) {
  const c = Math.max(0, Math.min(1, t));
  const r = Math.round(40 + 215 * Math.pow(c, 1.6));
  const g = Math.round(90 + 150 * Math.pow(c, 1.1));
  const b = Math.round(170 + 70 * (1 - c));
  return `rgba(${r},${g},${b},${alpha})`;
}

// Escala de contraste: magenta -> ámbar, para que Δρ se lea distinto de ρ.
export function contrastColor(t, alpha = 1) {
  const c = Math.max(0, Math.min(1, t));
  const r = Math.round(150 + 105 * c);
  const g = Math.round(40 + 175 * Math.pow(c, 0.8));
  const b = Math.round(150 - 110 * c);
  return `rgba(${r},${g},${b},${alpha})`;
}
