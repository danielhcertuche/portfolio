// Las cinco etapas del método, en el orden en que se aplican. Siguen el flujo de
// la ponencia: diapositivas 4 a 7, y el esquema A-B-C-D de la 18.
//
// El texto es lo que lee el visitante: describe qué hace el paso, no cómo está
// implementado.
//
// Este demo es público y no tiene interruptor: NO debe explicar cómo se mide el
// ángulo de enrollamiento (que en el plano (r, θ) el brazo es una recta y que su
// pendiente da el PA). Ese paso del método aún no está publicado. La explicación
// completa vive en la app Dash, detrás de TNG_PLANO_POLAR.

const STAGES = [
  {
    key: "sim",
    etiqueta: "Simulación",
    titulo: "Lo que entrega TNG50",
    texto:
      "Todas las celdas de gas ligadas al subhalo, tal como salen de la simulación. No hay un disco todavía: es una nube gruesa e inclinada, con material que no pertenece al disco. El color es la densidad.",
  },
  {
    key: "disk",
    etiqueta: "Filtrado",
    titulo: "Aislar el disco y ponerlo de frente",
    texto:
      "Inspección visual, agrupamiento por densidad, selección por energía interna y por circularidad de la órbita, y de-proyección a vista frontal. Lo que queda es un disco delgado, y el encuadre se cierra sobre él.",
  },
  {
    key: "contrast",
    etiqueta: "Contraste Δρ",
    titulo: "Restar el disco para que aparezca el patrón",
    texto:
      "Se ajusta un perfil de densidad medio en función del radio y se resta, en escala logarítmica. Lo que queda por encima de ese promedio (Δρ > 0) es sobredensidad: el material que forma la espiral.",
  },
  {
    key: "clusters",
    etiqueta: "Agrupamiento",
    titulo: "Agrupar lo que va junto",
    texto:
      "Sobre las sobredensidades se construye un grafo de vecindad y se recorre por anchura para agrupar los puntos conectados. Cada color es un grupo distinto; los grises quedaron fuera de los principales.",
  },
  {
    key: "skeleton",
    etiqueta: "Brazos",
    titulo: "Extraer el camino central y medir",
    texto:
      "De cada grupo se extrae el camino de centroides que recorre el brazo. Los dos más largos son los brazos principales. Sobre ellos se mide el ancho y el ángulo de enrollamiento, que es lo que se correlaciona después con las propiedades del halo.",
  },
];

export default STAGES;
