// ============================================================
//  mapa.js · Mapa de clientes (Leaflet + OpenStreetMap)
//  - Vista mundial: 1 chincheta por país con nº de clientes contactados
//  - Al pulsar un país: zoom y chinchetas por ciudad, color = estado
//  - Solo clientes contactados (excluye potenciales sin contactar)
// ============================================================
import { getClientes, getActivos, ESTADOS, estadoInfo, bandera } from "./clientes.js?v=26";
import { coordenadas, coordenadasPais, PAISES } from "./geo.js?v=26";

let map = null;
let capa = null;          // capa de marcadores actual
let vista = "mundo";      // "mundo" | "pais"
let paisActivo = null;
let abrirFichaCb = null;  // callback que app.js inyecta para abrir la ficha

// app.js llama esto una vez para conectar el "Ver ficha" del mapa con la ficha real
export function setAbrirFicha(fn){ abrirFichaCb = fn; }
// el popup llama a esta función global al pulsar "Ver ficha"
window.__abrirFichaDesdeMapa = function(id){
  if(abrirFichaCb) abrirFichaCb(id);
};

// Un cliente cuenta en el mapa si NO es un potencial sin contactar.
// Es decir: cualquier estado distinto de "potencial" sin interacción.
function contactado(c){
  if(c.estado && c.estado !== "potencial") return true;
  // un potencial que ya tiene alguna interacción también cuenta
  return (c.historico && c.historico.length > 0);
}

export function initMapa(){
  if(map) { map.invalidateSize(); return; }   // ya creado: solo reajusta
  map = L.map("mapaCanvas", { worldCopyJump:true, minZoom:2 }).setView([30,10], 2);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:"© OpenStreetMap", maxZoom:18
  }).addTo(map);
  renderMundo();
}

// Llama esto cuando la pestaña Mapa se muestra (Leaflet necesita recalcular tamaño)
export function refrescarMapa(){
  if(!map){ initMapa(); return; }
  setTimeout(()=> map.invalidateSize(), 60);
  if(vista==="mundo") renderMundo(); else renderPais(paisActivo);
}

function limpiarCapa(){
  if(capa){ map.removeLayer(capa); }
  capa = L.layerGroup().addTo(map);
}

// ---------- Vista mundial: agrupado por país ----------
function renderMundo(){
  vista = "mundo"; paisActivo = null;
  limpiarCapa();
  actualizarCabecera();

  const porPais = {};
  getActivos().filter(contactado).forEach(c=>{
    const p = (c.pais||"").trim();
    if(!p) return;
    (porPais[p] = porPais[p] || []).push(c);
  });

  Object.entries(porPais).forEach(([pais, lista])=>{
    const co = coordenadasPais(pais);
    if(!co) return;
    const n = lista.length;
    const icon = L.divIcon({
      className:"pin-pais",
      html:`<div class="pin-pais-burbuja">${n}</div>
            <div class="pin-pais-nombre">${bandera(pais)} ${pais}</div>`,
      iconSize:[44,44], iconAnchor:[22,22]
    });
    const m = L.marker(co, { icon }).addTo(capa);
    m.on("click", ()=>{ paisActivo = pais; renderPais(pais); });
  });

  if(Object.keys(porPais).length===0){
    mostrarVacio();
  }
}

// ---------- Vista de país: chinchetas por ciudad ----------
function renderPais(pais){
  vista = "pais";
  limpiarCapa();
  actualizarCabecera();

  const lista = getActivos().filter(c=> contactado(c) && (c.pais||"").trim()===pais);
  const co = coordenadasPais(pais);
  if(co) map.setView(co, 6);

  const bounds = [];
  lista.forEach(c=>{
    const xy = coordenadas(c);
    if(!xy) return;
    const e = estadoInfo(c.estado);
    const icon = L.divIcon({
      className:"pin-cliente",
      html:`<div class="pin-dot" style="background:${e.color}"></div>`,
      iconSize:[18,18], iconAnchor:[9,9]
    });
    const m = L.marker(xy, { icon }).addTo(capa);
    m.bindPopup(`
      <div class="popup">
        <b>${escapeHtml(c.empresa)}</b>
        <div class="popup-l"><span class="dot" style="background:${e.color}"></span>${e.label}</div>
        <div class="popup-l">${bandera(c.pais)} ${escapeHtml(c.ciudad||c.pais||"")}</div>
        ${c.canal?`<div class="popup-l">🏷 ${escapeHtml(c.canal)}</div>`:""}
        <button class="popup-btn" onclick="window.__abrirFichaDesdeMapa('${c.id}')">Ver ficha →</button>
      </div>`);
    bounds.push(xy);
  });

  if(bounds.length>1) map.fitBounds(bounds, { padding:[50,50], maxZoom:9 });
}

function mostrarVacio(){
  // No hay clientes contactados con país conocido
}

// ---------- Cabecera del mapa (botón volver + leyenda) ----------
function actualizarCabecera(){
  const cab = document.getElementById("mapaCabecera");
  if(!cab) return;
  if(vista==="pais"){
    cab.innerHTML = `
      <button class="btn btn-ghost" id="btnVolverMundo">← Volver al mundo</button>
      <span class="mapa-titulo">${bandera(paisActivo)} ${paisActivo}</span>
      <span class="mapa-leyenda">${leyenda()}</span>`;
    document.getElementById("btnVolverMundo").addEventListener("click", ()=>{
      map.setView([30,10],2); renderMundo();
    });
  }else{
    cab.innerHTML = `
      <span class="mapa-titulo">Clientes por país</span>
      <span class="mapa-sub">Pulsa un país para ver el detalle</span>`;
  }
}
function leyenda(){
  return ESTADOS.filter(e=>e.id!=="potencial").map(e=>
    `<span class="leg"><span class="dot" style="background:${e.color}"></span>${e.label}</span>`
  ).join("");
}

function escapeHtml(s){
  return (s??"").toString()
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
