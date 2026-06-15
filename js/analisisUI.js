// ============================================================
//  analisisUI.js · Pestaña Análisis (observaciones + gráficos)
// ============================================================
import { calcularMetricas, generarObservaciones } from "./analisis.js?v=29";
import { ESTADOS, estadoInfo } from "./clientes.js?v=29";

function esc(s){
  return (s??"").toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

const TONOS = {
  ok:    { color:"var(--verde)",  fondo:"var(--verde-suave)" },
  aviso: { color:"#c06a2c",       fondo:"var(--dorado-suave)" },
  idea:  { color:"#3f7e9b",       fondo:"#e7f0f5" },
  neutro:{ color:"var(--gris)",   fondo:"var(--fondo)" }
};

export function renderAnalisis(){
  const cont = document.getElementById("vista-analisis");
  if(!cont) return;
  const m = calcularMetricas();
  const obs = generarObservaciones();

  cont.innerHTML = `
    <div class="page-head"><div>
      <h2>Análisis y recomendaciones</h2>
      <div class="sub">El asistente revisa tu cartera y te señala lo importante</div>
    </div></div>

    ${graficoPipeline(m)}
    ${graficoCanales(m)}

    <div class="an-obs-titulo">Observaciones del asistente</div>
    <div class="an-obs">
      ${obs.map(o=>{
        const t = TONOS[o.tono]||TONOS.neutro;
        return `<div class="an-card" style="border-left:4px solid ${t.color};background:${t.fondo}">
          <div class="an-card-ico">${o.icono}</div>
          <div><div class="an-card-tit">${esc(o.titulo)}</div>
          <div class="an-card-txt">${esc(o.texto)}</div></div>
        </div>`;
      }).join("")}
    </div>`;
}

// Gráfico de barras horizontal del pipeline
function graficoPipeline(m){
  const max = Math.max(1, ...ESTADOS.map(e=>m.porEstado[e.id]||0));
  const filas = ESTADOS.map(e=>{
    const n = m.porEstado[e.id]||0;
    const pct = Math.round(n/max*100);
    return `<div class="bar-row">
      <div class="bar-lbl">${e.label}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${e.color}"></div></div>
      <div class="bar-num">${n}</div>
    </div>`;
  }).join("");
  return `<div class="an-bloque">
    <div class="an-bloque-tit">Embudo de clientes (${m.total} en total · ${m.conversion}% conversión)</div>
    ${filas}
  </div>`;
}

// Gráfico de barras de canales
function graficoCanales(m){
  const entradas = Object.entries(m.porCanal).sort((a,b)=>b[1]-a[1]);
  if(entradas.length===0) return "";
  const max = Math.max(1, ...entradas.map(e=>e[1]));
  const filas = entradas.map(([canal,n])=>{
    const pct = Math.round(n/max*100);
    return `<div class="bar-row">
      <div class="bar-lbl">${esc(canal)}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:var(--dorado)"></div></div>
      <div class="bar-num">${n}</div>
    </div>`;
  }).join("");
  return `<div class="an-bloque">
    <div class="an-bloque-tit">Clientes por canal</div>
    ${filas}
  </div>`;
}
