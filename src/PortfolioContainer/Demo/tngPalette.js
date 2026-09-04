// Paleta del demo. Se define aquí y no en el CSS porque el canvas necesita los
// valores en JS, y una sola fuente evita que el lienzo y la interfaz se desfasen.
//
// El lienzo usa el MISMO gris que el header del sitio (#d3d3d3, que es el color
// sólido de bg.jpg), para que la página se lea homogénea.
//
// Ese gris es bastante más oscuro que el blanco, así que la paleta no se eligió a
// ojo: se fijó el contraste objetivo sobre #d3d3d3 y se resolvió la luminosidad
// de cada tono. Todos los grupos quedan en 3.5:1, los brazos en 4.5 y 6.6:1, y
// las escalas de 3.2 a 11:1. Ese suelo es lo que hace que en un videobeam, con
// luz ambiente, no desaparezca ningún punto.

export const LIENZO = "#d3d3d3";

// Seis tonos bien repartidos por el círculo cromático: rojo, naranja, verde,
// azul, violeta y magenta. Evitan a propósito el teal y el ámbar oscuro de los
// brazos.
export const CLUSTER_COLORS = [
  "#cc2f17", // rojo-coral
  "#ab5409", // naranja
  "#0a7c43", // verde
  "#1470b3", // azul
  "#8050d3", // violeta
  "#c23079", // magenta
];

// Los dos brazos. Entre sí quedan a 1.45:1 de luminancia, así que el brazo 2 va
// además con trazo discontinuo: el color no puede ser el único indicador.
export const ARM_COLORS = ["#056760", "#6a3603"];
export const ARM_DASH = [[], [9, 6]];

export const BACKGROUND_DOT = "rgba(24, 30, 46, 0.20)";
export const MUTED_DOT = "rgba(24, 30, 46, 0.38)";
export const SCALE_INK = "rgba(24, 30, 46, 0.80)";

// Escalas de cinco paradas. Más recorrido de tono que un degradado de dos
// colores: en pantalla grande, la diferencia entre niveles se lee de lejos.
function rampa(paradas, t, alpha) {
  const c = Math.max(0, Math.min(1, t)) * (paradas.length - 1);
  const i = Math.min(paradas.length - 2, Math.floor(c));
  const f = c - i;
  const [a, b] = [paradas[i], paradas[i + 1]];
  const v = a.map((x, k) => Math.round(x + (b[k] - x) * f));
  return `rgba(${v[0]},${v[1]},${v[2]},${alpha})`;
}

// Densidad: acero -> azul profundo -> navy.
const DENSIDAD = [[70, 120, 146], [51, 100, 135], [37, 79, 127], [28, 56, 111], [18, 29, 63]];

// Contraste: oro quemado -> naranja -> carmín -> vino. Distinta familia de tono
// que la de densidad, para que Δρ no se confunda con ρ.
const CONTRASTE = [[148, 107, 12], [156, 77, 8], [156, 37, 13], [125, 18, 39], [82, 15, 48]];

export function densityColor(t, alpha = 1) {
  return rampa(DENSIDAD, t, alpha);
}

export function contrastColor(t, alpha = 1) {
  return rampa(CONTRASTE, t, alpha);
}
