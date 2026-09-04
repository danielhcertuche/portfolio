// Paleta del demo. Se define aquí y no en el CSS porque el canvas necesita los
// valores en JS, y una sola fuente evita que el lienzo y la interfaz se desfasen.
//
// Los colores vienen del propio sitio: #1d2334 es su color oscuro, #f95738 el
// coral de los botones y #0cbfae su verde-azul secundario. El coral queda
// reservado a la interfaz, para que dentro del gráfico no signifique dos cosas.

export const CLUSTER_COLORS = [
  "#f95738", // coral del sitio
  "#ffb703", // ámbar
  "#0cbfae", // verde-azul del sitio
  "#7aa2ff", // azul
  "#c77dff", // violeta
  "#ff8fab", // rosa
];

// Los dos brazos. Se distinguen bien por tono, pero entre sí solo hay 1.32:1 de
// luminancia: el trazo del brazo 2 va discontinuo para que el color no sea el
// único indicador.
export const ARM_COLORS = ["#0cbfae", "#ffb703"];
export const ARM_DASH = [[], [9, 6]];

export const BACKGROUND_DOT = "rgba(154, 166, 191, 0.18)";
export const MUTED_DOT = "rgba(154, 166, 191, 0.34)";

// Escala de densidad: navy profundo -> verde-azul -> blanco cálido.
export function densityColor(t, alpha = 1) {
  const c = Math.max(0, Math.min(1, t));
  const r = Math.round(35 + 215 * Math.pow(c, 1.7));
  const g = Math.round(95 + 145 * Math.pow(c, 1.0));
  const b = Math.round(150 + 80 * (1 - c) * (1 - c));
  return `rgba(${r},${g},${b},${alpha})`;
}

// Escala de contraste: violeta -> coral -> ámbar, para que Δρ se lea distinto de ρ.
export function contrastColor(t, alpha = 1) {
  const c = Math.max(0, Math.min(1, t));
  const r = Math.round(150 + 105 * c);
  const g = Math.round(70 + 113 * Math.pow(c, 0.85));
  const b = Math.round(160 - 157 * c);
  return `rgba(${r},${g},${b},${alpha})`;
}
