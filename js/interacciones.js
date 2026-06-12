// ============================================================
//  interacciones.js · Interfaz del histórico de interacciones
//  Se integra dentro de la ficha de cliente (app.js lo llama).
// ============================================================
import {
  TIPOS_INTERACCION, tipoInfo, ESTADOS, estadoInfo,
  registrarInteraccion, editarInteraccion, borrarInteraccion
} from "./clientes.js";

function esc(s){
  return (s??"").toString()
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function fechaCorta(iso){
  const d = new Date(iso);
  return d.toLocaleDateString("es-ES",{day:"2-digit",month:"short",year:"numeric"}) +
         " · " + d.toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"});
}

// Devuelve el HTML de la sección histórico para insertar en la ficha.
export function htmlHistorico(cliente){
  const hist = [...(cliente.historico||[])].sort((a,b)=> new Date(b.fecha)-new Date(a.fecha));
  const lista = hist.length ? hist.map(e=>{
    const t = tipoInfo(e.tipo);
    return `<div class="hist-item" data-eid="${e.id}">
      <div class="hist-ico">${t.icono}</div>
      <div class="hist-cuerpo">
        <div class="hist-top">
          <span class="hist-tipo">${t.label}</span>
          <span class="hist-fecha">${fechaCorta(e.fecha)}</span>
        </div>
        ${e.comentario ? `<div class="hist-coment">${esc(e.comentario)}</div>` : ""}
      </div>
      <div class="hist-acc">
        <button class="hist-btn" data-accion="editar" data-eid="${e.id}" title="Editar">✎</button>
        <button class="hist-btn" data-accion="borrar" data-eid="${e.id}" title="Borrar">🗑</button>
      </div>
    </div>`;
  }).join("") : `<div class="hist-vacio">Aún no hay interacciones registradas.</div>`;

  return `
    <div class="bloque-titulo" style="display:flex;justify-content:space-between;align-items:center">
      <span>Histórico de interacciones</span>
      <button class="btn btn-ghost" id="btnRegistrar" style="padding:6px 12px;font-size:12.5px">＋ Registrar</button>
    </div>
    <div id="formInter"></div>
    <div class="hist-lista">${lista}</div>`;
}

// Conecta los botones del histórico dentro de la ficha ya renderizada.
// onCambio() se llama tras guardar para refrescar la ficha.
export function conectarHistorico(cliente, onCambio){
  const cont = document.getElementById("formInter");

  document.getElementById("btnRegistrar")?.addEventListener("click", ()=>{
    cont.innerHTML = formRegistro(cliente);
    conectarForm(cliente, onCambio, cont);
  });

  document.querySelectorAll('.hist-btn[data-accion="editar"]').forEach(b=>{
    b.addEventListener("click", ()=>{
      const e = (cliente.historico||[]).find(x=>x.id===b.dataset.eid);
      if(!e) return;
      cont.innerHTML = formEdicion(e);
      document.getElementById("inEdGuardar").addEventListener("click", async ()=>{
        await editarInteraccion(cliente.id, e.id, {
          tipo: document.getElementById("inEdTipo").value,
          comentario: document.getElementById("inEdComent").value.trim()
        });
        onCambio();
      });
      document.getElementById("inEdCancelar").addEventListener("click", ()=> cont.innerHTML="");
    });
  });

  document.querySelectorAll('.hist-btn[data-accion="borrar"]').forEach(b=>{
    b.addEventListener("click", async ()=>{
      if(!confirm("¿Borrar esta interacción del histórico? No se puede deshacer.")) return;
      await borrarInteraccion(cliente.id, b.dataset.eid);
      onCambio();
    });
  });
}

// --- Formulario de registro ---
function formRegistro(cliente){
  const tipos = TIPOS_INTERACCION.map(t=>
    `<option value="${t.id}">${t.icono} ${t.label}</option>`).join("");
  const estados = ESTADOS.map(e=>
    `<option value="${e.id}" ${e.id===cliente.estado?"selected":""}>${e.label}</option>`).join("");
  return `
  <div class="form-inter">
    <div class="grid2">
      <div class="campo"><label>Tipo</label><select id="inTipo">${tipos}</select></div>
      <div class="campo"><label>Estado del cliente</label><select id="inEstado">${estados}</select></div>
    </div>
    <div class="campo"><label>Comentario</label>
      <textarea id="inComent" placeholder="Qué ha pasado: lo hablado, lo acordado…"></textarea></div>

    <div class="campo">
      <label>Programar siguiente acción (opcional)</label>
      <input id="inProxima" placeholder="Ej: Llamar para cerrar pedido">
    </div>
    <div class="plazos">
      <span class="plazo-lbl">¿Cuándo?</span>
      <button type="button" class="plazo" data-d="1">En 1 día</button>
      <button type="button" class="plazo" data-d="3">En 3 días</button>
      <button type="button" class="plazo" data-d="7">En 7 días</button>
      <button type="button" class="plazo" data-d="15">En 15 días</button>
      <input type="date" id="inFecha" class="plazo-fecha">
    </div>

    <div class="form-inter-acc">
      <button class="btn btn-ghost" id="inCancelar">Cancelar</button>
      <button class="btn btn-primary" id="inGuardar">Guardar interacción</button>
    </div>
  </div>`;
}

function conectarForm(cliente, onCambio, cont){
  // atajos de plazo -> rellenan el campo de fecha
  cont.querySelectorAll(".plazo").forEach(b=>{
    b.addEventListener("click", ()=>{
      const d = parseInt(b.dataset.d,10);
      const f = new Date(); f.setDate(f.getDate()+d);
      document.getElementById("inFecha").value = f.toISOString().slice(0,10);
      cont.querySelectorAll(".plazo").forEach(x=>x.classList.remove("activo"));
      b.classList.add("activo");
    });
  });
  document.getElementById("inCancelar").addEventListener("click", ()=> cont.innerHTML="");
  document.getElementById("inGuardar").addEventListener("click", async ()=>{
    const btn = document.getElementById("inGuardar");
    btn.disabled=true; btn.textContent="Guardando…";
    try{
      await registrarInteraccion(cliente.id, {
        tipo: document.getElementById("inTipo").value,
        comentario: document.getElementById("inComent").value.trim(),
        nuevoEstado: document.getElementById("inEstado").value,
        proximaAccion: document.getElementById("inProxima").value.trim(),
        fechaProxima: document.getElementById("inFecha").value || ""
      });
      onCambio();
    }catch(e){
      console.error(e); alert("No se ha podido guardar la interacción.");
      btn.disabled=false; btn.textContent="Guardar interacción";
    }
  });
}

// --- Formulario de edición ---
function formEdicion(entrada){
  const tipos = TIPOS_INTERACCION.map(t=>
    `<option value="${t.id}" ${t.id===entrada.tipo?"selected":""}>${t.icono} ${t.label}</option>`).join("");
  return `
  <div class="form-inter">
    <div class="campo"><label>Tipo</label><select id="inEdTipo">${tipos}</select></div>
    <div class="campo"><label>Comentario</label>
      <textarea id="inEdComent">${esc(entrada.comentario||"")}</textarea></div>
    <div class="form-inter-acc">
      <button class="btn btn-ghost" id="inEdCancelar">Cancelar</button>
      <button class="btn btn-primary" id="inEdGuardar">Guardar cambios</button>
    </div>
  </div>`;
}
