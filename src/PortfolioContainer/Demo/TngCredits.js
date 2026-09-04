import React, { useState } from "react";

// Pie de créditos del demo.
//
// La colaboración TNG pide explícitamente que quien use los datos públicos cite
// el artículo de liberación de datos más los dos artículos de primeros resultados
// de TNG50, y ofrece un texto de agradecimiento sobre el cómputo. Se reproduce
// aquí porque el demo muestra datos derivados de esa simulación.
// Fuente: https://www.tng-project.org/data/docs/background/

const REFERENCIAS = [
  {
    cita: "Nelson, D., Springel, V., Pillepich, A., et al. (2019). The IllustrisTNG simulations: public data release. Computational Astrophysics and Cosmology, 6, 2.",
    url: "https://arxiv.org/abs/1812.05609",
    motivo: "Liberación pública de los datos",
  },
  {
    cita: "Nelson, D., Pillepich, A., Springel, V., et al. (2019). First results from the TNG50 simulation: galactic outflows driven by supernovae and black hole feedback. MNRAS, 490(3), 3234–3261.",
    url: "https://arxiv.org/abs/1902.05554",
    motivo: "Primeros resultados de TNG50",
  },
  {
    cita: "Pillepich, A., Nelson, D., Springel, V., et al. (2019). First results from the TNG50 simulation: the evolution of stellar and gaseous discs across cosmic time. MNRAS, 490(3), 3196–3233.",
    url: "https://arxiv.org/abs/1902.05553",
    motivo: "Discos estelares y de gas en TNG50",
  },
];

const AGRADECIMIENTO =
  "The IllustrisTNG simulations were undertaken with compute time awarded by the " +
  "Gauss Centre for Supercomputing (GCS) under GCS Large-Scale Projects GCS-ILLU and " +
  "GCS-DWAR on the GCS share of the supercomputer Hazel Hen at the High Performance " +
  "Computing Center Stuttgart (HLRS), as well as on the machines of the Max Planck " +
  "Computing and Data Facility (MPCDF) in Garching, Germany.";

const TngCredits = () => {
  const [abierto, setAbierto] = useState(false);

  return (
    <footer className="tng-credits">
      <div className="tng-credits-fila">
        <p>
          Datos derivados de la simulación cosmológica{" "}
          <a href="https://www.tng-project.org/" target="_blank" rel="noopener noreferrer">
            IllustrisTNG50
          </a>
          , de acceso público. Análisis propio dentro del Grupo de Física y Astrofísica
          Computacional (FACom), Instituto de Física, Universidad de Antioquia. La idea
          original y el método de trazado de brazos son de Juan Carlos Muñoz-Cuartas.
        </p>
        <button
          className="tng-credits-toggle"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
        >
          {abierto ? "Ocultar citación" : "Cómo citar TNG50"}
        </button>
      </div>

      {abierto && (
        <div className="tng-credits-detalle">
          <p className="tng-credits-intro">
            La colaboración TNG pide que el uso de estos datos cite los siguientes trabajos:
          </p>
          <ol>
            {REFERENCIAS.map((r) => (
              <li key={r.url}>
                <span className="tng-credits-motivo">{r.motivo}</span>
                <a href={r.url} target="_blank" rel="noopener noreferrer">
                  {r.cita}
                </a>
              </li>
            ))}
          </ol>
          <p className="tng-credits-intro">Agradecimiento solicitado por la colaboración:</p>
          <blockquote>{AGRADECIMIENTO}</blockquote>
        </div>
      )}
    </footer>
  );
};

export default TngCredits;
