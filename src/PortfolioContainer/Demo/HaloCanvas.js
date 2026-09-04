import React, { useEffect, useRef } from "react";
import {
  ARM_COLORS,
  BACKGROUND_DOT,
  CLUSTER_COLORS,
  contrastColor,
  densityColor,
} from "./tngPalette";

// Dibuja una etapa del halo sobre un canvas. Se hace a mano y no con una
// librería de gráficos porque son ~9.000 puntos por etapa: el canvas los pinta
// en un frame y evita sumar 3 MB de dependencia a un sitio que debe abrir rápido.
//
// La transición entre etapas es un cruce de opacidad: la etapa saliente se apaga
// mientras la entrante aparece, así se ve que es el MISMO disco en otro paso.

const DURACION_MS = 520;

function crearProyeccion(ancho, alto, limite) {
  const lado = Math.min(ancho, alto);
  const escala = (lado / 2) * 0.92 / limite;
  return {
    px: (x) => ancho / 2 + x * escala,
    py: (y) => alto / 2 - y * escala,
    escala,
  };
}

function dibujarPuntos(ctx, proy, etapa, clave, alpha, radio) {
  if (!etapa || alpha <= 0.01) return;
  const { x, y } = etapa;
  const n = x.length;

  if (clave === "clusters") {
    const k = etapa.k;
    for (let i = 0; i < n; i += 1) {
      const grupo = k[i];
      ctx.fillStyle =
        grupo < 0
          ? BACKGROUND_DOT.replace(/[\d.]+\)$/, `${0.25 * alpha})`)
          : CLUSTER_COLORS[grupo % CLUSTER_COLORS.length] +
            Math.round(alpha * 235).toString(16).padStart(2, "0");
      ctx.fillRect(proy.px(x[i]), proy.py(y[i]), radio, radio);
    }
    return;
  }

  const c = etapa.c;
  const escalaColor = clave === "contrast" ? contrastColor : densityColor;
  for (let i = 0; i < n; i += 1) {
    ctx.fillStyle = escalaColor(c[i], alpha * 0.85);
    ctx.fillRect(proy.px(x[i]), proy.py(y[i]), radio, radio);
  }
}

function dibujarBrazos(ctx, proy, skeleton, alpha) {
  if (!skeleton || alpha <= 0.01) return;
  skeleton.arms.forEach((brazo, idx) => {
    const principal = brazo.principal;
    ctx.beginPath();
    for (let i = 0; i < brazo.x.length; i += 1) {
      const px = proy.px(brazo.x[i]);
      const py = proy.py(brazo.y[i]);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = principal
      ? ARM_COLORS[idx % ARM_COLORS.length]
      : "rgba(200, 214, 235, 0.45)";
    ctx.globalAlpha = alpha * (principal ? 1 : 0.6);
    ctx.lineWidth = principal ? 2.6 : 1.3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    if (principal) {
      ctx.shadowColor = ARM_COLORS[idx % ARM_COLORS.length];
      ctx.shadowBlur = 12;
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    if (principal) {
      for (let i = 0; i < brazo.x.length; i += 1) {
        ctx.beginPath();
        ctx.arc(proy.px(brazo.x[i]), proy.py(brazo.y[i]), 2.6, 0, Math.PI * 2);
        ctx.fillStyle = ARM_COLORS[idx % ARM_COLORS.length];
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  });
}

function dibujarEscala(ctx, proy, ancho, alto, limite) {
  // Barra de escala: un demo sin unidades no dice nada.
  const objetivo = limite / 3;
  const paso = Math.pow(10, Math.floor(Math.log10(objetivo)));
  const kpc = [1, 2, 5, 10].map((m) => m * paso).find((v) => v >= objetivo) || paso;
  const largo = kpc * proy.escala;
  const x0 = ancho - largo - 26;
  const y0 = alto - 26;

  ctx.strokeStyle = "rgba(226, 236, 250, 0.85)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x0 + largo, y0);
  ctx.stroke();

  ctx.fillStyle = "rgba(226, 236, 250, 0.85)";
  ctx.font = "12px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`${kpc} kpc`, x0 + largo / 2, y0 - 8);
  ctx.textAlign = "start";
}

const HaloCanvas = ({ halo, etapaIndex, etapas, reducirMovimiento }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const estadoRef = useRef({ desde: etapaIndex, hasta: etapaIndex, t: 1 });

  // Nuevo destino de animación cuando cambia la etapa o el halo.
  useEffect(() => {
    const st = estadoRef.current;
    if (st.hasta === etapaIndex) return;
    st.desde = st.hasta;
    st.hasta = etapaIndex;
    st.t = reducirMovimiento ? 1 : 0;
  }, [etapaIndex, reducirMovimiento]);

  useEffect(() => {
    estadoRef.current = { desde: etapaIndex, hasta: etapaIndex, t: 1 };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [halo && halo.id]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !halo) return undefined;
    const ctx = canvas.getContext("2d");
    let inicio = null;

    const render = (ts) => {
      const st = estadoRef.current;
      if (st.t < 1) {
        if (inicio === null) inicio = ts;
        st.t = Math.min(1, (ts - inicio) / DURACION_MS);
      }
      const suave = st.t < 1 ? st.t * st.t * (3 - 2 * st.t) : 1; // smoothstep

      const dpr = window.devicePixelRatio || 1;
      const ancho = canvas.clientWidth;
      const alto = canvas.clientHeight;
      if (canvas.width !== ancho * dpr || canvas.height !== alto * dpr) {
        canvas.width = ancho * dpr;
        canvas.height = alto * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, ancho, alto);

      const proy = crearProyeccion(ancho, alto, halo.limite_kpc);
      const radio = ancho < 520 ? 1.6 : 2.1;

      const claveDesde = etapas[st.desde].key;
      const claveHasta = etapas[st.hasta].key;
      const datos = halo.etapas;

      // La etapa de brazos se dibuja sobre los clusters: el visitante debe ver
      // de dónde salió el esqueleto, no un trazo flotando en el vacío.
      const fondoHasta = claveHasta === "skeleton" ? "clusters" : claveHasta;
      const fondoDesde = claveDesde === "skeleton" ? "clusters" : claveDesde;

      if (st.t < 1 && fondoDesde !== fondoHasta) {
        dibujarPuntos(ctx, proy, datos[fondoDesde], fondoDesde, 1 - suave, radio);
      }
      dibujarPuntos(
        ctx, proy, datos[fondoHasta], fondoHasta,
        fondoDesde === fondoHasta ? 1 : suave, radio
      );

      const alphaBrazos =
        (claveHasta === "skeleton" ? suave : 0) +
        (claveDesde === "skeleton" && st.t < 1 ? 1 - suave : 0);
      dibujarBrazos(ctx, proy, datos.skeleton, Math.min(1, alphaBrazos));

      dibujarEscala(ctx, proy, ancho, alto, halo.limite_kpc);

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animRef.current);
  }, [halo, etapas]);

  return (
    <canvas
      ref={canvasRef}
      className="tng-canvas"
      role="img"
      aria-label={
        halo
          ? `${halo.nombre}, etapa ${etapas[etapaIndex].etiqueta}: ${etapas[etapaIndex].titulo}`
          : "Cargando halo"
      }
    />
  );
};

export default HaloCanvas;
