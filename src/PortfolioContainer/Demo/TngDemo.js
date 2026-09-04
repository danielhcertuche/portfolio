import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./TngDemo.css";
import HaloCanvas from "./HaloCanvas";
import STAGES from "./tngStages";
import TngCredits from "./TngCredits";

// Demo del método de trazado automático de brazos espirales.
// Los datos son las salidas reales del pipeline de la tesis, precomputadas y
// muestreadas; se piden por fetch para que no engorden el bundle de JavaScript.

const BASE = `${process.env.PUBLIC_URL || ""}/demo`;
const AVANCE_MS = 2600;

const ROL_ETIQUETA = {
  canonico: "caso canónico",
  limpio: "disco limpio",
  dificil: "caso difícil",
  masivo: "disco masivo",
};

const TngDemo = ({ screenName }) => {
  const [manifiesto, setManifiesto] = useState(null);
  const [halos, setHalos] = useState({});
  const [haloId, setHaloId] = useState(null);
  const [etapa, setEtapa] = useState(0);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);

  const reducirMovimiento = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    let vivo = true;
    fetch(`${BASE}/manifest.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`manifest ${r.status}`);
        return r.json();
      })
      .then((m) => {
        if (!vivo) return;
        setManifiesto(m);
        setHaloId(m.halos[0].id);
      })
      .catch((e) => vivo && setError(e.message));
    return () => {
      vivo = false;
    };
  }, []);

  // Carga perezosa del halo seleccionado; se cachea para no repedirlo.
  useEffect(() => {
    if (haloId == null || halos[haloId]) return undefined;
    let vivo = true;
    fetch(`${BASE}/halo_${haloId}.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`halo ${haloId}: ${r.status}`);
        return r.json();
      })
      .then((d) => vivo && setHalos((prev) => ({ ...prev, [haloId]: d })))
      .catch((e) => vivo && setError(e.message));
    return () => {
      vivo = false;
    };
  }, [haloId, halos]);

  useEffect(() => {
    if (!reproduciendo) return undefined;
    timerRef.current = setTimeout(
      () => setEtapa((e) => (e + 1) % STAGES.length),
      AVANCE_MS
    );
    return () => clearTimeout(timerRef.current);
  }, [reproduciendo, etapa]);

  const elegirHalo = useCallback((id) => {
    setHaloId(id);
    setEtapa(0);
  }, []);

  const halo = haloId != null ? halos[haloId] : null;
  const meta =
    manifiesto && haloId != null
      ? manifiesto.halos.find((h) => h.id === haloId)
      : null;
  const info = STAGES[etapa];

  if (error) {
    return (
      <div id={screenName} className="tng-demo tng-demo--error">
        <h2>Interactive demo</h2>
        <p>No se pudieron cargar los datos del demo ({error}).</p>
      </div>
    );
  }

  return (
    <div id={screenName} className="tng-demo">
      <header className="tng-head">
        <p className="tng-kicker">IllustrisTNG50 · trazado automático de brazos</p>
        <h2>How the spiral arms are found</h2>
        <div className="underline">
          <div className="circle" />
        </div>
        <p className="tng-lead">
          Cuatro pasos convierten un disco de gas simulado en dos brazos medibles.
          Todo lo que se ve aquí son salidas reales del análisis, no una recreación.
          Elige un halo y avanza por las etapas.
        </p>
      </header>

      <div className="tng-halos" role="tablist" aria-label="Halos disponibles">
        {manifiesto &&
          manifiesto.halos.map((h) => (
            <button
              key={h.id}
              role="tab"
              aria-selected={h.id === haloId}
              className={`tng-chip ${h.id === haloId ? "is-active" : ""}`}
              onClick={() => elegirHalo(h.id)}
            >
              <span className="tng-chip-id">{h.nombre}</span>
              <span className="tng-chip-rol">{ROL_ETIQUETA[h.rol] || h.rol}</span>
            </button>
          ))}
      </div>

      <div className="tng-panel">
        <div className="tng-lienzo">
          {halo ? (
            <HaloCanvas
              halo={halo}
              etapaIndex={etapa}
              etapas={STAGES}
              reducirMovimiento={reducirMovimiento}
            />
          ) : (
            <div className="tng-cargando">Cargando halo…</div>
          )}

          {halo && info.key === "skeleton" && (
            <ul className="tng-leyenda">
              <li><i style={{ background: "#ffe066" }} /> Brazo 1</li>
              <li><i style={{ background: "#ff8787" }} /> Brazo 2</li>
              <li><i style={{ background: "rgba(200,214,235,.55)" }} /> Segmentos descartados</li>
            </ul>
          )}
        </div>

        <aside className="tng-lateral">
          <ol className="tng-pasos">
            {STAGES.map((s, i) => (
              <li key={s.key}>
                <button
                  className={`tng-paso ${i === etapa ? "is-active" : ""} ${i < etapa ? "is-done" : ""}`}
                  onClick={() => {
                    setReproduciendo(false);
                    setEtapa(i);
                  }}
                  aria-current={i === etapa ? "step" : undefined}
                >
                  <span className="tng-paso-n">{i + 1}</span>
                  <span className="tng-paso-txt">{s.etiqueta}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className="tng-explica">
            <h3>{info.titulo}</h3>
            <p>{info.texto}</p>
          </div>

          <button
            className="tng-play"
            onClick={() => setReproduciendo((v) => !v)}
            aria-pressed={reproduciendo}
          >
            {reproduciendo ? "Pausar recorrido" : "Reproducir las 4 etapas"}
          </button>

          {meta && (
            <div className="tng-metricas">
              <p className="tng-nota">{meta.nota}</p>
              <dl>
                <div>
                  <dt>Celdas de gas en el disco</dt>
                  <dd>{meta.n_particulas_disco.toLocaleString("es-CO")}</dd>
                </div>
                {meta.metricas.pa_abs_mediana != null && (
                  <div>
                    <dt>Ángulo de enrollamiento |PA|</dt>
                    <dd>
                      {meta.metricas.pa_abs_mediana}°
                      <small>mediana de {meta.metricas.pa_n_segmentos} segmentos</small>
                    </dd>
                  </div>
                )}
                {meta.metricas.ancho_fwhm_mediana != null && (
                  <div>
                    <dt>Ancho de brazo</dt>
                    <dd>
                      {meta.metricas.ancho_fwhm_mediana} kpc
                      <small>
                        mediana del FWHM sobre {meta.metricas.ancho_n_nodos} nodos,
                        medido en los puntos del grupo
                      </small>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </aside>
      </div>

      <TngCredits />
    </div>
  );
};

export default TngDemo;
