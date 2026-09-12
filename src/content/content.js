// GENERADO — no editar a mano.
// Fuente: github-presencia/data/{profile,projects,talks}.yml
// Regenerar: make render && make sync
/* eslint-disable */

export const profile = {
  name: "Daniel Certuche",
  location: "Medellín, Colombia",
  email: "danielcert3@gmail.com",
  website: "https://www.linkedin.com/in/daniel-certuche-grueso",
  headline: "Data engineer trained in astronomy, where the working standard was that somebody else could rerun your pipeline and get the same number.",
  summary: "I work on a four-layer Databricks lakehouse governed through Unity Catalog: the transformations between layers, idempotent loads that a reprocess cannot duplicate, and the orchestration and data contracts around them. Over the past year I also took on its applied AI layer, which reads documents and serves embeddings without moving data off the platform.",
  publicScope: "Most of that work lives in private company repositories. What is public here is academic and personal: the code behind my thesis, coursework, and side projects.",
  tools: "Python, SQL, PySpark and Spark SQL. Databricks with Delta Lake and Unity Catalog. Azure. scikit-learn and MLflow. FastAPI, React and TypeScript.",
};

export const projects = [
  {
    id: "demo-brazos-tng50",
    title: "Automated spiral-arm tracing on TNG50 gas discs",
    summary: "An interactive walkthrough of how a simulated gas disc becomes two measurable spiral arms: density contrast, graph-based clustering in the polar plane, and the centroid path of each arm. Five halos, real pipeline outputs, no recreation.",
    repo: "portfolio",
    href: "https://danielhcertuche.github.io/portfolio/#demo",
    status: "pendiente-verificar",
    featured: true,
  },
  {
    id: "tesis-brazos-espirales",
    title: "Morphological characterization of spiral arms in disk galaxies",
    summary: "Analysis code behind my B.Sc. thesis. It reads HDF5 output from the IllustrisTNG cosmological simulation, characterizes the spiral structure of the simulated galaxies and correlates their geometry with properties of the hosting dark matter halo. Configuration driven, run in batch on a remote server, reproducible end to end.",
    repo: "SpiralStructure-Analysis-IllustrisTNG50",
    href: "https://github.com/danielhcertuche/SpiralStructure-Analysis-IllustrisTNG50",
    status: "pendiente-verificar",
    featured: true,
  },
  {
    id: "dash-halos",
    title: "Galaxy halo explorer",
    summary: "The deep dive behind the demo: the four stages of the arm-tracing method across five halos, the polar plane where a logarithmic spiral becomes a straight line, and free cross-plots of the gas-cell variables.",
    repo: "dash-app",
    href: "https://dash-app-ce28.onrender.com/",
    status: "vivo",
    featured: true,
  },
  {
    id: "inteligencia-comercial-rag",
    title: "Commercial intelligence over a public e-commerce dataset",
    summary: "Three chained components over a public Brazilian e-commerce dataset. Product, customer and analytical PDFs are parsed by document type into structured facts, chunked and indexed as embeddings; a customer profile is built from purchase behaviour and segmented; and the answer is written per segment, citing the passages it used. Retrieval is measured, not claimed: 83 per cent hit at one over twelve queries, with the two failures kept and explained as the limit of lexical matching. It runs without credentials, on a deterministic fallback that says so in its own output.",
    repo: "commercial-intelligence-rag",
    href: "https://github.com/danielhcertuche/commercial-intelligence-rag",
    status: "vivo",
    featured: true,
  },
  {
    id: "mecanica-celeste",
    title: "Celestial mechanics",
    summary: "Numerical integration and orbital dynamics, from coursework.",
    repo: "CelestialMechanics",
    href: "https://github.com/danielhcertuche/CelestialMechanics",
    status: "pendiente-verificar",
    featured: false,
  },
];

export const talks = [
  {
    id: "ponencia-fisica-2026",
    title: "Reading Spiral Structure Through Dark Matter Halos",
    event: "Congreso de física",
    href: "/PonenciaCoCoA_Certuche.pdf",
  },
];

// Excluidas por enlace caído o sin verificar, ver data/talks.yml:
//   - cocoa-2024: caido
