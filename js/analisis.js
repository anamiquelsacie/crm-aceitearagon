// ============================================================
//  analisis.js · Motor de análisis y recomendaciones (sin coste)
//  Calcula métricas sobre los clientes de Firebase y genera
//  observaciones en lenguaje claro, por reglas.
// ============================================================
import { getActivos, ESTADOS, estadoInfo } from "./clientes.js";

function diasDesde(ts){
  if(!ts) return null;
  const f = ts.toDate ? ts.toDate() : new Date(ts);
  return Math.floor((Date.now() - f.getTime()) / 86400000);
}

// Países "vecinos / perfil similar" para sugerencias de expansión
const VECINOS = {
  "Corea del Sur":["Japón","Taiwán","Singapur"],
  "Japón":["Corea del Sur","Taiwán"],
  "Francia":["Bélgica","Suiza","Italia","Alemania"],
  "Alemania":["Austria","Suiza","Países Bajos","Dinamarca"],
  "Italia":["Francia","Suiza","Austria"],
  "Países Bajos":["Bélgica","Alemania"],
  "España":["Portugal","Francia","Italia"],
  "Reino Unido":["Irlanda","Países Bajos"],
  "Estados Unidos":["Canadá","México"]
};

// Devuelve un objeto con todas las métricas calculadas
export function calcularMetricas(){
  const cs = getActivos();
  const total = cs.length;

  // reparto por estado
  const porEstado = {};
  ESTADOS.forEach(e=> porEstado[e.id] = cs.filter(c=>c.estado===e.id).length);

  // reparto por canal
  const porCanal = {};
  cs.forEach(c=>{ const k=c.canal||"Sin canal"; porCanal[k]=(porCanal[k]||0)+1; });

  // reparto por país
  const porPais = {};
  cs.forEach(c=>{ const k=(c.pais||"").trim(); if(k) porPais[k]=(porPais[k]||0)+1; });

  // clientes cerrados por país
  const cerradosPais = {};
  cs.filter(c=>c.estado==="cliente").forEach(c=>{
    const k=(c.pais||"").trim(); if(k) cerradosPais[k]=(cerradosPais[k]||0)+1;
  });

  // conversión global (clientes / total con contacto iniciado)
  const conContacto = cs.filter(c=>c.estado!=="potencial").length;
  const clientes = porEstado["cliente"]||0;
  const conversion = conContacto>0 ? Math.round(clientes/conContacto*100) : 0;

  return { cs, total, porEstado, porCanal, porPais, cerradosPais, conContacto, clientes, conversion };
}

// Genera una lista de observaciones { icono, titulo, texto, tono }
export function generarObservaciones(){
  const m = calcularMetricas();
  const obs = [];
  if(m.total===0){
    obs.push({ icono:"🫒", titulo:"Empieza a cargar clientes",
      texto:"Cuando tengas clientes y registres interacciones, aquí aparecerán análisis y recomendaciones sobre tu cartera.", tono:"neutro" });
    return obs;
  }

  // Cuello de botella del pipeline
  const cuellos = ESTADOS.filter(e=>e.id!=="cliente" && e.id!=="potencial")
    .map(e=>({e, n:m.porEstado[e.id]||0})).sort((a,b)=>b.n-a.n);
  if(cuellos[0] && cuellos[0].n>=2){
    obs.push({ icono:"🔎", titulo:"Posible cuello de botella",
      texto:`Tienes ${cuellos[0].n} clientes atascados en "${cuellos[0].e.label}". Revisa qué frena su avance: a veces basta una llamada o una propuesta concreta.`, tono:"aviso" });
  }

  // Conversión
  if(m.conContacto>=3){
    obs.push({ icono:"📈", titulo:"Tasa de conversión",
      texto:`De los clientes con contacto iniciado, un ${m.conversion}% ha llegado a pedido (${m.clientes} de ${m.conContacto}). ${m.conversion<25?"Hay margen para mejorar el seguimiento.":"Buen ritmo de cierre."}`, tono: m.conversion<25?"aviso":"ok" });
  }

  // Mercado más fuerte
  const paisesOrden = Object.entries(m.porPais).sort((a,b)=>b[1]-a[1]);
  if(paisesOrden[0]){
    const [pais, n] = paisesOrden[0];
    const cerr = m.cerradosPais[pais]||0;
    obs.push({ icono:"🌍", titulo:"Tu mercado más sólido",
      texto:`${pais} es tu mercado con más presencia: ${n} cliente(s)${cerr?`, ${cerr} ya con pedidos`:""}. Apóyate en estos casos de éxito para abrir mercados parecidos.`, tono:"ok" });
  }

  // Sugerencia de expansión por vecindad
  const sugeridos = new Set();
  Object.keys(m.cerradosPais).forEach(pais=>{
    (VECINOS[pais]||[]).forEach(v=>{
      if(!m.porPais[v]) sugeridos.add(v);
    });
  });
  if(sugeridos.size>0){
    const lista = [...sugeridos].slice(0,4).join(", ");
    obs.push({ icono:"🧭", titulo:"Oportunidad de expansión",
      texto:`Tienes clientes consolidados en mercados con perfil premium similar a: ${lista}, donde aún no tienes presencia. Podrían ser buenos objetivos de prospección.`, tono:"idea" });
  }

  // Potenciales sin contactar
  const potenciales = m.porEstado["potencial"]||0;
  if(potenciales>=3){
    obs.push({ icono:"📥", titulo:"Potenciales pendientes",
      texto:`Tienes ${potenciales} cliente(s) potenciales sin primer contacto. Plantéate una tanda de presentaciones esta semana para activarlos.`, tono:"aviso" });
  }

  // Clientes enfriándose
  const enfriando = m.cs.filter(c=>{
    const d=diasDesde(c.ultimaInteraccion);
    const u={negociacion:7,catalogo:10,precios:10,contacto:20,potencial:20}[c.estado];
    return d!==null && u && d>=u;
  });
  if(enfriando.length>0){
    obs.push({ icono:"❄️", titulo:"Clientes enfriándose",
      texto:`${enfriando.length} cliente(s) llevan demasiado tiempo sin movimiento para su fase. Retómalos antes de perderlos: ${enfriando.slice(0,3).map(c=>c.empresa).join(", ")}${enfriando.length>3?"…":""}.`, tono:"aviso" });
  }

  // Canal que mejor convierte (clientes cerrados por canal)
  const canalCerrado = {};
  m.cs.filter(c=>c.estado==="cliente").forEach(c=>{ const k=c.canal||"Sin canal"; canalCerrado[k]=(canalCerrado[k]||0)+1; });
  const mejorCanal = Object.entries(canalCerrado).sort((a,b)=>b[1]-a[1])[0];
  if(mejorCanal && mejorCanal[1]>=2){
    obs.push({ icono:"🏷️", titulo:"Canal más rentable",
      texto:`El canal "${mejorCanal[0]}" es el que más pedidos te genera (${mejorCanal[1]}). Considera priorizar la prospección en ese tipo de cliente.`, tono:"ok" });
  }

  return obs;
}
