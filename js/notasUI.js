// ============================================================
//  notasUI.js · Pestaña Bloc de notas
// ============================================================
import {
  escucharNotas, getNotas, crearNota, actualizarNota, fijarNota, borrarNota
} from "./notas.js?v=29";

let escuchando = false;

function esc(s){
  return (s??"").toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function fechaCorta(ts){
  if(!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("es-ES",{day:"2-digit",month:"short"}) + " " +
         d.toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"});
}

export function initNotas(){
  // Suscribir solo una vez; cada cambio repinta si la pestaña está visible
  if(!escuchando){
    escuchando = true;
    escucharNotas(()=> {
      const vista = document.getElementById("vista-notas");
      if(vista && !vista.classList.contains("oculto")) render();
    });
  }
  render();
}

function render(){
  const cont = document.getElementById("vista-notas");
  if(!cont) return;
  const notas = [...getNotas()].sort((a,b)=>{
    if(!!b.fijada !== !!a.fijada) return (b.fijada?1:0)-(a.fijada?1:0); // fijadas primero
    const fa = a.modificada?.toDate ? a.modificada.toDate() : new Date(a.modificada||0);
    const fb = b.modificada?.toDate ? b.modificada.toDate() : new Date(b.modificada||0);
    return fb - fa; // más recientes primero
  });

  cont.innerHTML = `
    <div class="page-head">
      <div>
        <h2>Bloc de notas</h2>
        <div class="sub">Anotaciones generales · compartidas entre los socios</div>
      </div>
      <button class="btn btn-primary" id="btnNuevaNota">＋ Nueva nota</button>
    </div>
    <div id="formNota"></div>
    ${notas.length ? `<div class="notas-grid">${notas.map(tarjeta).join("")}</div>`
      : `<div class="tabla-card"><div class="vacio"><b>No hay notas</b>Crea tu primera nota con “Nueva nota”.</div></div>`}
  `;

  document.getElementById("btnNuevaNota").addEventListener("click", ()=> abrirForm());
  cont.querySelectorAll("[data-editar]").forEach(b=>
    b.addEventListener("click", ()=> abrirForm(b.dataset.editar)));
  cont.querySelectorAll("[data-fijar]").forEach(b=>
    b.addEventListener("click", async ()=>{
      const n = getNotas().find(x=>x.id===b.dataset.fijar);
      await fijarNota(b.dataset.fijar, !n.fijada);
    }));
  cont.querySelectorAll("[data-borrar]").forEach(b=>
    b.addEventListener("click", async ()=>{
      if(!confirm("¿Borrar esta nota? No se puede deshacer.")) return;
      await borrarNota(b.dataset.borrar);
    }));
}

function tarjeta(n){
  return `<div class="nota ${n.fijada?"fijada":""}">
    <div class="nota-cab">
      <div class="nota-titulo">${esc(n.titulo)||"<span style='color:var(--gris)'>(sin título)</span>"}</div>
      <button class="nota-pin ${n.fijada?"on":""}" data-fijar="${n.id}" title="${n.fijada?"Desfijar":"Fijar arriba"}">📌</button>
    </div>
    <div class="nota-cuerpo">${esc(n.contenido)}</div>
    <div class="nota-pie">
      <span class="muted">${fechaCorta(n.modificada)}</span>
      <span class="nota-acc">
        <button class="hist-btn" data-editar="${n.id}" title="Editar">✎</button>
        <button class="hist-btn" data-borrar="${n.id}" title="Borrar">🗑</button>
      </span>
    </div>
  </div>`;
}

function abrirForm(id){
  const n = id ? getNotas().find(x=>x.id===id) : { titulo:"", contenido:"" };
  const cont = document.getElementById("formNota");
  cont.innerHTML = `
    <div class="nota-form">
      <div class="campo"><label>Título</label><input id="ntTitulo" value="${esc(n.titulo||"")}" placeholder="Ej: Ideas feria Anuga"></div>
      <div class="campo"><label>Contenido</label><textarea id="ntCuerpo" style="min-height:120px" placeholder="Escribe aquí…">${esc(n.contenido||"")}</textarea></div>
      <div class="nota-form-acc">
        <button class="btn btn-ghost" id="ntCancelar">Cancelar</button>
        <button class="btn btn-primary" id="ntGuardar">${id?"Guardar cambios":"Crear nota"}</button>
      </div>
    </div>`;
  document.getElementById("ntCancelar").addEventListener("click", ()=> cont.innerHTML="");
  document.getElementById("ntGuardar").addEventListener("click", async ()=>{
    const titulo = document.getElementById("ntTitulo").value.trim();
    const contenido = document.getElementById("ntCuerpo").value.trim();
    if(!titulo && !contenido){ alert("Escribe al menos un título o contenido."); return; }
    const btn = document.getElementById("ntGuardar"); btn.disabled=true; btn.textContent="Guardando…";
    try{
      if(id) await actualizarNota(id, { titulo, contenido });
      else await crearNota({ titulo, contenido });
      cont.innerHTML="";
    }catch(e){ console.error(e); alert("No se pudo guardar la nota."); btn.disabled=false; btn.textContent=id?"Guardar cambios":"Crear nota"; }
  });
}
