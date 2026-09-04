// Las cuatro etapas del método, en el orden en que se aplican.
// El texto es la explicación que ve el visitante: describe lo que hace el paso,
// no cómo está implementado.

const STAGES = [
  {
    key: "raw",
    etiqueta: "Disco de gas",
    titulo: "Lo que entrega la simulación",
    texto:
      "Las celdas de gas del subhalo, ya aisladas del resto de la galaxia y giradas para verlas de frente. El color es la densidad. A ojo se intuyen los brazos, pero no hay nada que los defina todavía.",
  },
  {
    key: "contrast",
    etiqueta: "Contraste Δρ",
    titulo: "Restar el disco para ver el patrón",
    texto:
      "Se ajusta un perfil de densidad medio en función del radio y se resta. Lo que queda por encima de ese promedio (Δρ > 0) es sobredensidad: el material que forma el patrón espiral. El resto es fondo del disco.",
  },
  {
    key: "clusters",
    etiqueta: "Agrupamiento",
    titulo: "Agrupar lo que va junto",
    texto:
      "Sobre las sobredensidades se construye un grafo de vecindad en el plano polar (r, θ) y se recorre por anchura para agrupar los puntos conectados. Cada color es un grupo distinto; los grises quedaron fuera de los grupos principales.",
  },
  {
    key: "skeleton",
    etiqueta: "Brazos",
    titulo: "Extraer el camino central",
    texto:
      "De cada grupo se extrae el camino de centroides que recorre el brazo. Los dos más largos se toman como brazos principales. Sobre ellos se mide el ángulo de enrollamiento y el ancho.",
  },
];

export default STAGES;
