import React, { useEffect, useRef } from "react";
import {
  ARM_COLORS,
  ARM_DASH,
  BACKGROUND_DOT,
  CLUSTER_COLORS,
  MUTED_DOT,
  SCALE_INK,
  contrastColor,
  densityColor,
} from "./tngPalette";

// Dibuja una etapa del halo sobre un canvas. Se hace a mano y no con una librería
// de gráficos porque son ~9.000 puntos por etapa: el canvas los pinta en un frame
// y evita sumar 3 MB de dependencia a un sitio que debe abrir rápido.
//
// Dos cosas se interpolan entre etapas, y las dos importan:
//   opacidad  la etapa saliente se apaga mientras la entrante aparece, así se ve
//             que es el MISMO objeto en otro paso del método.
//   encuadre  cada etapa trae su propio límite en kpc. El salto de la simulación
//             al disco filtrado es de decenas de kpc a poco más de diez, y animar
//             ese zoom es lo que hace visible qué recorta el filtrado.

const DURACION_MS = 640;
const CON_PUNTOS = { sim: 1, disk: 1, contrast: 1, clusters: 1 };

function proyeccion(ancho, alto, limite) {
  const escala = (Math.min(ancho, alto) / 2) * 0.92 / limite;
  return {
    px: (x) => ancho / 2 + x * escala,
    py: (y) => alto / 2 - y * escala,
    escala,
  };
}

// Qué nube de puntos sirve de fondo a cada etapa. El esqueleto se dibuja sobre
// los grupos: el visitante debe ver de dónde salió, no un trazo en el vacío.
function fondoDe(clave) {
  return clave === "skeleton" ? "clusters" : clave;
}

// Con `apagados`, los grupos se pintan todos del mismo gris. Es lo que se usa en
// la etapa de brazos: ahí el sujeto es el camino central, y dejar los grupos a todo
// color compite con él. Peor aún: el rojo de un grupo y el del brazo 2 son casi el
// mismo tono, así que el trazo se perdía justo encima de los puntos.
function dibujarPuntos(ctx, proy, etapa, clave, alpha, radio, apagados) {
  if (!etapa || alpha <= 0.01) return;
  const { x, y } = etapa;
  const n = x.length;

  if (clave === "clusters") {
    const k = etapa.k;
    for (let i = 0; i < n; i += 1) {
      const g = k[i];
      if (g < 0) {
        ctx.fillStyle = BACKGROUND_DOT.replace(/[\d.]+\)$/, `${0.20 * alpha})`);
      } else if (apagados) {
        ctx.fillStyle = MUTED_DOT.replace(/[\d.]+\)$/, `${0.38 * alpha})`);
      } else {
        ctx.fillStyle =
          CLUSTER_COLORS[g % CLUSTER_COLORS.length] +
          Math.round(alpha * 235).toString(16).padStart(2, "0");
      }
      ctx.fillRect(proy.px(x[i]), proy.py(y[i]), radio, radio);
    }
    return;
  }

  const c = etapa.c;
  const color = clave === "contrast" ? contrastColor : densityColor;
  for (let i = 0; i < n; i += 1) {
    ctx.fillStyle = color(c[i], alpha * 0.85);
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
      : "rgba(29, 35, 52, 0.28)";
    // El brazo 2 va discontinuo: entre los dos colores solo hay 1.32:1 de
    // luminancia, así que el tono no basta como único indicador.
    ctx.setLineDash(principal ? ARM_DASH[idx % ARM_DASH.length] : []);
    ctx.globalAlpha = alpha * (principal ? 1 : 0.6);
    ctx.lineWidth = principal ? 3.1 : 1.5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    // Sin halo de brillo: sobre fondo claro emborrona el trazo en vez de
    // destacarlo. El grosor y el patrón de guiones ya lo separan del fondo.
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.shadowBlur = 0;

    if (principal) {
      for (let i = 0; i < brazo.x.length; i += 1) {
        ctx.beginPath();
        ctx.arc(proy.px(brazo.x[i]), proy.py(brazo.y[i]), 3.1, 0, Math.PI * 2);
        ctx.fillStyle = ARM_COLORS[idx % ARM_COLORS.length];
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  });
}

function dibujarEscala(ctx, proy, ancho, alto, limite) {
  // Un demo sin unidades no dice nada, y aquí la escala cambia entre etapas.
  const objetivo = limite / 3;
  const paso = Math.pow(10, Math.floor(Math.log10(objetivo)));
  const kpc = [1, 2, 5, 10].map((m) => m * paso).find((v) => v >= objetivo) || paso;
  const largo = kpc * proy.escala;
  const x0 = ancho - largo - 26;
  const y0 = alto - 26;

  ctx.strokeStyle = SCALE_INK;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x0 + largo, y0);
  ctx.stroke();

  ctx.fillStyle = SCALE_INK;
  ctx.font = "12px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`${kpc} kpc`, x0 + largo / 2, y0 - 8);
  ctx.textAlign = "start";
}

const HaloCanvas = ({ halo, etapaIndex, etapas, reducirMovimiento }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const estadoRef = useRef({ desde: etapaIndex, hasta: etapaIndex, t: 1 });

  useEffect(() => {
    const st = estadoRef.current;
    if (st.hasta === etapaIndex) return;
    st.desde = st.hasta;
    st.hasta = etapaIndex;
    st.t = reducirMovimiento ? 1 : 0;
    st.inicio = null;
  }, [etapaIndex, reducirMovimiento]);

  useEffect(() => {
    estadoRef.current = { desde: etapaIndex, hasta: etapaIndex, t: 1 };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [halo && halo.id]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !halo) return undefined;
    const ctx = canvas.getContext("2d");

    const limiteDe = (clave) => {
      const et = halo.etapas[fondoDe(clave)];
      return (et && et.limite) || halo.limite_kpc;
    };

    const render = (ts) => {
      const st = estadoRef.current;
      if (st.t < 1) {
        if (!st.inicio) st.inicio = ts;
        st.t = Math.min(1, (ts - st.inicio) / DURACION_MS);
      }
      const s = st.t < 1 ? st.t * st.t * (3 - 2 * st.t) : 1; // smoothstep

      const dpr = window.devicePixelRatio || 1;
      const ancho = canvas.clientWidth;
      const alto = canvas.clientHeight;
      if (canvas.width !== ancho * dpr || canvas.height !== alto * dpr) {
        canvas.width = ancho * dpr;
        canvas.height = alto * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, ancho, alto);

      const claveDesde = etapas[st.desde].key;
      const claveHasta = etapas[st.hasta].key;

      // El encuadre se interpola en logaritmo: el salto de la simulación al disco
      // puede ser de un orden de magnitud, y en lineal el zoom se ve a tirones.
      const lDesde = limiteDe(claveDesde);
      const lHasta = limiteDe(claveHasta);
      const limite = Math.exp(
        Math.log(lDesde) + (Math.log(lHasta) - Math.log(lDesde)) * s
      );

      const proy = proyeccion(ancho, alto, limite);
      // Un punto de 2 px se pierde al proyectar; se sube sin llegar a empastar
      // el disco, que en las etapas 1 y 2 trae miles de celdas.
      const radio = ancho < 520 ? 2.0 : 2.7;
      const datos = halo.etapas;
      const fDesde = fondoDe(claveDesde);
      const fHasta = fondoDe(claveHasta);

      // Los grupos se apagan cuando la etapa mostrada es la del esqueleto. Durante
      // la transición cada lado usa el suyo, así el color se desvanece con el paso.
      const apDesde = claveDesde === "skeleton";
      const apHasta = claveHasta === "skeleton";

      if (st.t < 1 && CON_PUNTOS[fDesde] && (fDesde !== fHasta || apDesde !== apHasta)) {
        dibujarPuntos(ctx, proy, datos[fDesde], fDesde, 1 - s, radio, apDesde);
      }
      if (CON_PUNTOS[fHasta]) {
        const solo = fDesde === fHasta && apDesde === apHasta;
        dibujarPuntos(ctx, proy, datos[fHasta], fHasta, solo ? 1 : s, radio, apHasta);
      }

      const alphaBrazos =
        (claveHasta === "skeleton" ? s : 0) +
        (claveDesde === "skeleton" && st.t < 1 ? 1 - s : 0);
      dibujarBrazos(ctx, proy, datos.skeleton, Math.min(1, alphaBrazos));

      dibujarEscala(ctx, proy, ancho, alto, limite);
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
          ? `${halo.nombre}, paso ${etapaIndex + 1} de ${etapas.length}: ${etapas[etapaIndex].titulo}`
          : "Cargando halo"
      }
    />
  );
};

export default HaloCanvas;
