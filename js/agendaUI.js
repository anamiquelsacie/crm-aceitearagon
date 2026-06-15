// ============================================================
//  agendaUI.js · Pestaña Agenda + Asistente flotante
// ============================================================
import { calcularPendientes, agrupar, contarPendientes, resolverPendiente, posponer } from "./agenda.js";
import { bandera, estadoInfo } from "./clientes.js";

let abrirFichaCb = null;
let irAgendaCb = null;
export function setAgendaCallbacks({ abrirFicha, irAgenda }){
  abrirFichaCb = abrirFicha; irAgenda = irAgenda; irAgendaCb = irAgenda;
}

function esc(s){
  return (s??"").toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

// ---------- Pestaña Agenda ----------
export function renderAgenda(){
  const cont = document.getElementById("vista-agenda");
  if(!cont) return;
  const grupos = agrupar(calcularPendientes());

  const bloque = (titulo, items, claseCab) => {
    if(items.length===0) return "";
    return `
      <div class="ag-grupo">
        <div class="ag-cab ${claseCab}">${titulo} <span class="ag-num">${items.length}</span></div>
        ${items.map(itemHTML).join("")}
      </div>`;
  };

  const vacio = grupos.vencidos.length+grupos.hoy.length+grupos.proximos.length===0;

  cont.innerHTML = `
    <div class="page-head"><div>
      <h2>Agenda y alertas</h2>
      <div class="sub">Lo que requiere tu atención, agrupado por urgencia</div>
    </div></div>
    ${vacio ? `<div class="tabla-card"><div class="vacio"><b>Todo al día 🎉</b>No tienes pendientes ahora mismo.</div></div>` : `
      ${bloque("⚠️ Vencidos / requieren atención", grupos.vencidos, "ag-venc")}
      ${bloque("📌 Para hoy", grupos.hoy, "ag-hoy")}
      ${bloque("🗓️ Próximos", grupos.proximos, "ag-prox")}
    `}`;

  // conectar acciones
  cont.querySelectorAll("[data-ficha]").forEach(b=>
    b.addEventListener("click", ()=> abrirFichaCb && abrirFichaCb(b.dataset.ficha)));
  cont.querySelectorAll("[data-hecho]").forEach(b=>
    b.addEventListener("click", async ()=>{
      b.disabled=true;
      try{ await resolverPendiente(b.dataset.hecho); renderAgenda(); actualizarFlotante(); }
      catch(e){ console.error(e); alert("No se pudo actualizar."); b.disabled=false; }
    }));
  cont.querySelectorAll("[data-pos]").forEach(b=>
    b.addEventListener("click", async ()=>{
      const [id,dias] = b.dataset.pos.split("|");
      b.disabled=true;
      try{ await posponer(id, parseInt(dias,10)); renderAgenda(); actualizarFlotante(); }
      catch(e){ console.error(e); alert("No se pudo posponer."); b.disabled=false; }
    }));
}

function itemHTML(p){
  const e = estadoInfo(p.estado);
  const cuando = p.tipo==="recordatorio"
    ? (p.dias<0 ? `vencido hace ${Math.abs(p.dias)} día(s)` : p.dias===0 ? "hoy" : `en ${p.dias} día(s)`)
    : "requiere seguimiento";
  return `
    <div class="ag-item">
      <div class="ag-info">
        <div class="ag-empresa"><span class="flag">${bandera(p.pais)}</span>${esc(p.empresa)}
          <span class="ag-estado"><span class="dot" style="background:${e.color}"></span>${e.label}</span></div>
        <div class="ag-texto">${esc(p.texto)}</div>
        <div class="ag-cuando">${cuando}</div>
      </div>
      <div class="ag-acc">
        <button class="btn btn-ghost" data-ficha="${p.clienteId}">Ver ficha</button>
        <button class="btn btn-ghost" data-pos="${p.clienteId}|1">+1d</button>
        <button class="btn btn-ghost" data-pos="${p.clienteId}|2">+2d</button>
        <button class="btn btn-primary" data-hecho="${p.clienteId}">✓ Hecho</button>
      </div>
    </div>`;
}

// ---------- Asistente flotante ----------
export function initFlotante(){
  if(document.getElementById("flotante")) { actualizarFlotante(); return; }
  const div = document.createElement("div");
  div.className = "float"; div.id = "flotante";
  div.innerHTML = `
    <div class="float-bubble oculto" id="floatBubble"></div>
    <div class="float-char" id="floatChar">
      <span class="drop">🫒</span>
      <span class="badge oculto" id="floatBadge">0</span>
    </div>`;
  document.body.appendChild(div);

  document.getElementById("floatChar").addEventListener("click", ()=>{
    if(irAgendaCb) irAgendaCb();
  });
  actualizarFlotante();
}

export function actualizarFlotante(){
  const badge = document.getElementById("floatBadge");
  const bubble = document.getElementById("floatBubble");
  if(!badge) return;
  const n = contarPendientes();
  if(n>0){
    badge.textContent = n; badge.classList.remove("oculto");
    const g = agrupar(calcularPendientes());
    const primero = (g.vencidos[0] || g.hoy[0]);
    if(primero){
      bubble.innerHTML = `Tienes <b>${n}</b> pendiente${n!==1?"s":""} que requiere${n!==1?"n":""} atención. Ej.: <b>${esc(primero.empresa)}</b>.`;
      bubble.classList.remove("oculto");
      // auto-ocultar la burbuja tras unos segundos
      clearTimeout(window.__bubbleT);
      window.__bubbleT = setTimeout(()=> bubble.classList.add("oculto"), 6000);
    }
  }else{
    badge.classList.add("oculto");
    bubble.classList.add("oculto");
  }
}
