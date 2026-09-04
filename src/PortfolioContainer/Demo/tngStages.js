// The five steps of the method, in the order they are applied. They follow the
// flow of the conference talk: slides 4 to 7, and the A-B-C-D outline on slide 18.
//
// The copy is what a visitor reads: it says what each step achieves, not how it
// is implemented.
//
// This demo is public and has no switch: it must NOT explain how the pitch angle
// is measured (that in the (r, θ) plane an arm becomes a straight line whose
// slope gives the angle). That step of the method is not published yet. The full
// explanation lives in the Dash app, behind TNG_PLANO_POLAR.

const STAGES = [
  {
    key: "sim",
    etiqueta: "Simulation",
    titulo: "What the simulation delivers",
    texto:
      "Every gas cell bound to the subhalo, straight out of IllustrisTNG50. There is no disc yet: a thick, tilted cloud that still holds material the disc does not own. Colour is density.",
  },
  {
    key: "disk",
    etiqueta: "Filtering",
    titulo: "Isolate the disc and turn it face-on",
    texto:
      "Density clustering plus cuts on internal energy and orbital circularity, then de-projection to a face-on view. What survives is a thin disc, and the frame closes in on it.",
  },
  {
    key: "contrast",
    etiqueta: "Density contrast",
    titulo: "Subtract the disc so the pattern shows",
    texto:
      "A mean radial density profile is fitted and subtracted in log space. What sits above that average (Δρ > 0) is overdensity: the material that traces the spiral. The rest is disc background.",
  },
  {
    key: "clusters",
    etiqueta: "Clustering",
    titulo: "Group what belongs together",
    texto:
      "A neighbourhood graph over the overdensities is traversed breadth-first to collect connected points. Each colour is one group; the grey points fell outside the main ones.",
  },
  {
    key: "skeleton",
    etiqueta: "Arms",
    titulo: "Extract the ridge and measure it",
    texto:
      "Each group yields the centroid path that runs along the arm, and the two longest become the principal arms. Width and pitch angle are measured on them: the quantities later correlated against halo properties.",
  },
];

export default STAGES;
