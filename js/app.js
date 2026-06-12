// ============================================================
//  app.js · Orquestador de la pantalla principal
// ============================================================
import { vigilarSesion, salir } from "./auth.js";
import {
  escucharClientes, getClientes, crearCliente, actualizarCliente, altaRapida,
  ESTADOS, CANALES, PRIORIDADES, PRODUCTOS,
  estadoInfo, prioridadInfo, bandera
} from "./clientes.js";
import { htmlHistorico, conectarHistorico } from "./interacciones.js";
import { initMapa, refrescarMapa, setAbrirFicha } from "./mapa.js";

// ---------- Protección: sin sesión, fuera ----------
let usuarioActual = null;
vigilarSesion(user => {
  if(!user){ window.location.href = "login.html"; return; }
  usuarioActual = user;
  document.getElementById("userChip").textContent =
    (user.email || "··").slice(0,2).toUpperCase();
  arrancar();
});

document.getElementById("userChip").addEventListener("click", async ()=>{
  if(confirm("¿Cerrar sesión?")){ await salir(); window.location.href = "login.html"; }
});

// ---------- Estado de la vista ----------
let filtros = { buscar:"", pais:"", estado:"", canal:"", soloAlerta:false };
let orden = { campo:"empresa", asc:true };

// ---------- Arranque ----------
function arrancar(){
  poblarSelectores();
  conectarToolbar();
  conectarTabs();
  setAbrirFicha(abrirFichaDesdeMapa);
  escucharClientes(()=> render());
}

// Abre la ficha de un cliente desde el mapa: cambia a la pestaña Clientes y abre el modal
function abrirFichaDesdeMapa(id){
  document.querySelector('.tab[data-tab="clientes"]').click();
  abrirFicha(id);
}

// ---------- Navegación por pestañas ----------
function conectarTabs(){
  document.querySelectorAll(".tab").forEach(t=>{
    t.addEventListener("click", ()=>{
      const destino = t.dataset.tab;
      document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("activo", x===t));
      document.getElementById("vista-clientes").classList.toggle("oculto", destino!=="clientes");
      document.getElementById("vista-mapa").classList.toggle("oculto", destino!=="mapa");
      if(destino==="mapa"){
        initMapa();
        refrescarMapa();
      }
    });
  });
}

// ---------- Lógica de alertas (reglas, sin coste) ----------
// Devuelve true si el cliente necesita atención según las reglas acordadas.
function tieneAlerta(c){
  const dias = diasDesde(c.ultimaInteraccion);
  if(dias === null) return false;
  // Enfriamiento por fase
  const umbral = { negociacion:7, catalogo:10, precios:10, contacto:20, potencial:20, cliente:90 };
  const u = umbral[c.estado];
  if(u && dias >= u) return true;
  return false;
}
function diasDesde(ts){
  if(!ts) return null;
  const f = ts.toDate ? ts.toDate() : new Date(ts);
  return Math.floor((Date.now() - f.getTime()) / 86400000);
}
function textoUltima(c){
  const d = diasDesde(c.ultimaInteraccion);
  if(d === null) return "—";
  if(d === 0) return "hoy";
  if(d === 1) return "hace 1 día";
  return `hace ${d} días`;
}

// ---------- Render principal ----------
function render(){
  const todos = getClientes();
  renderResumen(todos);
  const lista = aplicarFiltrosYOrden(todos);
  renderTabla(lista);
  document.getElementById("contadorTotal").textContent =
    `${todos.length} cliente${todos.length!==1?"s":""} en cartera`;
}

function renderResumen(todos){
  const cont = document.getElementById("resumen");
  cont.innerHTML = ESTADOS.map(e=>{
    const n = todos.filter(c=>c.estado===e.id).length;
    const activo = filtros.estado===e.id ? "activo" : "";
    return `<div class="kpi ${e.clase} ${activo}" data-estado="${e.id}">
      <div class="bar"></div><div class="n">${n}</div><div class="l">${e.label}</div></div>`;
  }).join("");
  cont.querySelectorAll(".kpi").forEach(k=>{
    k.addEventListener("click", ()=>{
      const id = k.dataset.estado;
      filtros.estado = (filtros.estado===id) ? "" : id;
      document.getElementById("fEstado").value = filtros.estado;
      render();
    });
  });

  const conAlerta = todos.filter(tieneAlerta).length;
  const mercados = new Set(todos.map(c=>c.pais).filter(Boolean)).size;
  document.getElementById("miniRow").innerHTML = `
    <div class="mini"><span class="dot" style="background:var(--verde)"></span>Total cartera <b>${todos.length}</b></div>
    <div class="mini ${conAlerta?'alert':''}">⚠ Con alerta pendiente <b>${conAlerta}</b></div>
    <div class="mini">🌍 Mercados activos <b>${mercados}</b></div>`;
}

function aplicarFiltrosYOrden(todos){
  let lista = todos.filter(c=>{
    if(filtros.estado && c.estado!==filtros.estado) return false;
    if(filtros.pais && c.pais!==filtros.pais) return false;
    if(filtros.canal && c.canal!==filtros.canal) return false;
    if(filtros.soloAlerta && !tieneAlerta(c)) return false;
    if(filtros.buscar){
      const t = (c.empresa+" "+(c.contacto||"")+" "+(c.ciudad||"")+" "+(c.pais||"")).toLowerCase();
      if(!t.includes(filtros.buscar.toLowerCase())) return false;
    }
    return true;
  });
  const { campo, asc } = orden;
  lista.sort((a,b)=>{
    let va, vb;
    if(campo==="ultima"){ va=diasDesde(a.ultimaInteraccion)??1e9; vb=diasDesde(b.ultimaInteraccion)??1e9; }
    else if(campo==="estado"){ va=ESTADOS.findIndex(e=>e.id===a.estado); vb=ESTADOS.findIndex(e=>e.id===b.estado); }
    else { va=(a[campo]||"").toString().toLowerCase(); vb=(b[campo]||"").toString().toLowerCase(); }
    if(va<vb) return asc?-1:1;
    if(va>vb) return asc?1:-1;
    return 0;
  });
  return lista;
}

function renderTabla(lista){
  const tb = document.getElementById("tbody");
  if(lista.length===0){
    tb.innerHTML = `<tr><td colspan="8"><div class="vacio">
      <b>No hay clientes que mostrar</b>
      Crea tu primer cliente con “Nuevo cliente” o usa “Alta rápida”.</div></td></tr>`;
    return;
  }
  tb.innerHTML = lista.map(c=>{
    const e = estadoInfo(c.estado);
    const p = prioridadInfo(c.prioridad);
    const al = tieneAlerta(c) ? "⚠️" : "—";
    return `<tr data-id="${c.id}">
      <td><div class="empresa"><span class="flag">${bandera(c.pais)}</span>${esc(c.empresa)}</div></td>
      <td class="col-hide"><span class="canal">${esc(c.canal||"—")}</span></td>
      <td>${esc(c.pais||"—")}${c.ciudad?" · "+esc(c.ciudad):""}</td>
      <td><span class="estado"><span class="dot" style="background:${e.color}"></span>${e.label}</span></td>
      <td class="col-hide prio">${p.icono}</td>
      <td class="col-hide muted">${textoUltima(c)}</td>
      <td class="col-hide muted">${esc(c.proximaAccion||"—")}</td>
      <td class="alerta-cell">${al}</td>
    </tr>`;
  }).join("");
  tb.querySelectorAll("tr[data-id]").forEach(tr=>{
    tr.addEventListener("click", ()=> abrirFicha(tr.dataset.id));
  });
}

// ---------- Selectores y toolbar ----------
function poblarSelectores(){
  const fEstado = document.getElementById("fEstado");
  ESTADOS.forEach(e=> fEstado.insertAdjacentHTML("beforeend", `<option value="${e.id}">${e.label}</option>`));
  const fCanal = document.getElementById("fCanal");
  CANALES.forEach(c=> fCanal.insertAdjacentHTML("beforeend", `<option value="${c}">${c}</option>`));
}
function refrescarPaises(){
  const fPais = document.getElementById("fPais");
  const actual = fPais.value;
  const paises = [...new Set(getClientes().map(c=>c.pais).filter(Boolean))].sort();
  fPais.innerHTML = `<option value="">🌍 Todos los países</option>` +
    paises.map(p=>`<option value="${p}">${bandera(p)} ${p}</option>`).join("");
  fPais.value = actual;
}

function conectarToolbar(){
  document.getElementById("buscar").addEventListener("input", e=>{ filtros.buscar=e.target.value; render(); });
  document.getElementById("fPais").addEventListener("change", e=>{ filtros.pais=e.target.value; render(); });
  document.getElementById("fEstado").addEventListener("change", e=>{ filtros.estado=e.target.value; render(); });
  document.getElementById("fCanal").addEventListener("change", e=>{ filtros.canal=e.target.value; render(); });
  document.getElementById("fAlerta").addEventListener("click", e=>{
    filtros.soloAlerta = !filtros.soloAlerta;
    e.target.classList.toggle("alerta-activa", filtros.soloAlerta);
    render();
  });
  document.querySelectorAll("thead th[data-orden]").forEach(th=>{
    th.addEventListener("click", ()=>{
      const campo = th.dataset.orden;
      if(orden.campo===campo) orden.asc=!orden.asc;
      else { orden.campo=campo; orden.asc=true; }
      render();
    });
  });
  document.getElementById("btnNuevo").addEventListener("click", ()=> abrirFicha(null));
  document.getElementById("btnAlta").addEventListener("click", abrirAltaRapida);

  // refrescar la lista de países cada vez que cambian los datos
  const obs = new MutationObserver(()=> refrescarPaises());
  obs.observe(document.getElementById("tbody"), { childList:true });
}

// ---------- Ficha (crear / editar) ----------
function abrirFicha(id){
  const c = id ? getClientes().find(x=>x.id===id) : {};
  const nuevo = !id;
  const opc = (arr, sel, val=(x=>x), lab=(x=>x)) =>
    arr.map(x=>`<option value="${val(x)}" ${val(x)===sel?"selected":""}>${lab(x)}</option>`).join("");

  document.getElementById("modal").innerHTML = `
  <div class="modal-bg">
    <div class="modal">
      <div class="modal-head">
        <h3>${nuevo?"Nuevo cliente":esc(c.empresa||"Ficha de cliente")}</h3>
        <button class="modal-x" id="cerrar">×</button>
      </div>
      <div class="modal-body">
        <div class="bloque-titulo">Identificación</div>
        <div class="grid2">
          <div class="campo"><label>Empresa *</label><input id="f_empresa" value="${esc(c.empresa||"")}"></div>
          <div class="campo"><label>Persona de contacto</label><input id="f_contacto" value="${esc(c.contacto||"")}"></div>
          <div class="campo"><label>Cargo</label><input id="f_cargo" value="${esc(c.cargo||"")}"></div>
          <div class="campo"><label>CIF / VAT</label><input id="f_vat" value="${esc(c.vat||"")}"></div>
        </div>

        <div class="bloque-titulo">Clasificación comercial</div>
        <div class="grid2">
          <div class="campo"><label>Canal</label><select id="f_canal">${opc(CANALES, c.canal||"Otro")}</select></div>
          <div class="campo"><label>Estado</label><select id="f_estado">${opc(ESTADOS, c.estado||"potencial", e=>e.id, e=>e.label)}</select></div>
          <div class="campo"><label>Prioridad</label><select id="f_prioridad">${opc(PRIORIDADES, c.prioridad||"frio", p=>p.id, p=>p.label)}</select></div>
        </div>

        <div class="bloque-titulo">Ubicación</div>
        <div class="grid2">
          <div class="campo"><label>País</label><input id="f_pais" value="${esc(c.pais||"")}"></div>
          <div class="campo"><label>Ciudad</label><input id="f_ciudad" value="${esc(c.ciudad||"")}"></div>
          <div class="campo"><label>Dirección</label><input id="f_direccion" value="${esc(c.direccion||"")}"></div>
        </div>

        <div class="bloque-titulo">Contacto</div>
        <div class="grid2">
          <div class="campo"><label>Email</label><input id="f_email" value="${esc(c.email||"")}"></div>
          <div class="campo"><label>Teléfono</label><input id="f_telefono" value="${esc(c.telefono||"")}"></div>
          <div class="campo"><label>Web</label><input id="f_web" value="${esc(c.web||"")}"></div>
          <div class="campo"><label>Idioma preferido</label><input id="f_idioma" value="${esc(c.idioma||"")}"></div>
        </div>

        <div class="bloque-titulo">Interés comercial</div>
        <div class="grid2">
          <div class="campo"><label>Volumen estimado por pedido</label><input id="f_volumen" value="${esc(c.volumen||"")}"></div>
          <div class="campo"><label>Productos de interés (coma)</label><input id="f_productos" value="${esc((c.productos||[]).join(', '))}"></div>
        </div>

        <div class="bloque-titulo">Seguimiento</div>
        <div class="grid2">
          <div class="campo"><label>Próxima acción</label><input id="f_proxima" value="${esc(c.proximaAccion||"")}"></div>
        </div>

        <div class="bloque-titulo">Comentarios manuales</div>
        <div class="campo"><textarea id="f_comentarios" placeholder="Notas personales, impresiones, lo hablado…">${esc(c.comentarios||"")}</textarea></div>

        <div class="bloque-titulo">Condiciones comerciales</div>
        <div class="grid2">
          <div class="campo"><label>Precio acordado</label><input id="f_precio" value="${esc(c.precioAcordado||"")}"></div>
          <div class="campo"><label>Divisa</label><input id="f_divisa" value="${esc(c.divisa||"")}" placeholder="€, USD, KRW…"></div>
          <div class="campo"><label>Incoterm</label><input id="f_incoterm" value="${esc(c.incoterm||"")}" placeholder="EXW, FOB, CIF…"></div>
          <div class="campo"><label>Notas de condiciones</label><input id="f_notascond" value="${esc(c.notasCondiciones||"")}"></div>
        </div>

        ${nuevo ? "" : `<div id="seccionHistorico">${htmlHistorico(c)}</div>`}
      </div>
      <div class="modal-foot">
        <button class="btn btn-ghost" id="cancelar">Cancelar</button>
        <button class="btn btn-primary" id="guardar">${nuevo?"Crear cliente":"Guardar cambios"}</button>
      </div>
    </div>
  </div>`;

  const cerrar = ()=> document.getElementById("modal").innerHTML="";
  document.getElementById("cerrar").addEventListener("click", cerrar);
  document.getElementById("cancelar").addEventListener("click", cerrar);
  document.querySelector(".modal-bg").addEventListener("click", e=>{ if(e.target.classList.contains("modal-bg")) cerrar(); });

  // Histórico de interacciones (solo clientes existentes)
  if(!nuevo){
    conectarHistorico(c, ()=> abrirFicha(id));
  }

  document.getElementById("guardar").addEventListener("click", async ()=>{
    const v = id => document.getElementById(id).value.trim();
    const datos = {
      empresa:v("f_empresa"), contacto:v("f_contacto"), cargo:v("f_cargo"), vat:v("f_vat"),
      canal:v("f_canal"), estado:v("f_estado"), prioridad:v("f_prioridad"),
      pais:v("f_pais"), ciudad:v("f_ciudad"), direccion:v("f_direccion"),
      email:v("f_email"), telefono:v("f_telefono"), web:v("f_web"), idioma:v("f_idioma"),
      volumen:v("f_volumen"),
      productos:v("f_productos").split(",").map(s=>s.trim()).filter(Boolean),
      proximaAccion:v("f_proxima"), comentarios:v("f_comentarios"),
      precioAcordado:v("f_precio"), divisa:v("f_divisa"),
      incoterm:v("f_incoterm"), notasCondiciones:v("f_notascond")
    };
    if(!datos.empresa){ alert("La empresa es obligatoria."); return; }
    const btn = document.getElementById("guardar");
    btn.disabled=true; btn.textContent="Guardando…";
    try{
      if(nuevo) await crearCliente(datos);
      else await actualizarCliente(id, datos);
      cerrar();
    }catch(e){
      console.error(e); alert("No se ha podido guardar. Revisa tu conexión.");
      btn.disabled=false; btn.textContent = nuevo?"Crear cliente":"Guardar cambios";
    }
  });
}

// ---------- Alta rápida ----------
function abrirAltaRapida(){
  document.getElementById("modal").innerHTML = `
  <div class="modal-bg">
    <div class="modal" style="max-width:520px">
      <div class="modal-head">
        <h3>Alta rápida de potenciales</h3>
        <button class="modal-x" id="cerrar">×</button>
      </div>
      <div class="modal-body">
        <p class="sub" style="margin-bottom:12px;color:var(--gris);font-size:13px">
          Pega un cliente por línea con el formato <b>Empresa; País; Canal</b>.
          Entran como “Potencial”. Ejemplo:</p>
        <div class="campo">
          <textarea id="ta_alta" style="min-height:150px"
            placeholder="Tokyo Fine Foods; Japón; Importador&#10;Berlin Feinkost; Alemania; Tienda gourmet"></textarea>
        </div>
      </div>
      <div class="modal-foot">
        <button class="btn btn-ghost" id="cancelar">Cancelar</button>
        <button class="btn btn-primary" id="procesar">Añadir al pipeline</button>
      </div>
    </div>
  </div>`;
  const cerrar = ()=> document.getElementById("modal").innerHTML="";
  document.getElementById("cerrar").addEventListener("click", cerrar);
  document.getElementById("cancelar").addEventListener("click", cerrar);
  document.getElementById("procesar").addEventListener("click", async ()=>{
    const texto = document.getElementById("ta_alta").value;
    if(!texto.trim()){ alert("Escribe al menos un cliente."); return; }
    const btn=document.getElementById("procesar"); btn.disabled=true; btn.textContent="Añadiendo…";
    try{
      const ids = await altaRapida(texto);
      cerrar();
      alert(`${ids.length} cliente(s) añadidos al pipeline como potenciales.`);
    }catch(e){
      console.error(e); alert("No se han podido añadir. Revisa tu conexión.");
      btn.disabled=false; btn.textContent="Añadir al pipeline";
    }
  });
}

// ---------- util ----------
function esc(s){
  return (s??"").toString()
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
