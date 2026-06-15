// ============================================================
//  plantillasUI.js · Pestaña de plantillas de correo
//  Permite elegir cliente, fase e idioma, ver/editar el texto,
//  copiarlo o abrirlo en el correo (mailto) con BCC opcional.
// ============================================================
import { getActivos, bandera } from "./clientes.js?v=29";
import { IDIOMAS, FASES, getPlantilla, rellenar } from "./plantillas.js?v=29";

// La dirección de BCC y los datos del remitente se guardan en localStorage
// (config local del navegador). Hueco listo para cuando exista la captura de correos.
const CFG_KEY = "crm_config_correo";
export function getConfigCorreo(){
  try{ return JSON.parse(localStorage.getItem(CFG_KEY)) || {}; }
  catch{ return {}; }
}
function setConfigCorreo(cfg){
  localStorage.setItem(CFG_KEY, JSON.stringify(cfg));
}

let sel = { clienteId:"", fase:"presentacion", idioma:"es" };

export function initPlantillas(){
  render();
}

function render(){
  const cont = document.getElementById("vista-plantillas");
  if(!cont) return;
  const cfg = getConfigCorreo();
  const clientes = getActivos();

  cont.innerHTML = `
    <div class="page-head"><div>
      <h2>Plantillas de correo</h2>
      <div class="sub">Elige cliente, fase e idioma. Personaliza y envía.</div>
    </div></div>

    <div class="plt-config">
      <div class="campo"><label>Tu nombre (firma)</label>
        <input id="cfgNombre" value="${esc(cfg.miNombre||"")}" placeholder="Ej: Roberto"></div>
      <div class="campo"><label>Tu empresa</label>
        <input id="cfgEmpresa" value="${esc(cfg.miEmpresa||"Aceite Aragón")}"></div>
      <div class="campo"><label>BCC automático (opcional)
        <span class="ayuda" title="Dirección secreta para archivar copias. Déjalo vacío hasta montar la captura de correos.">ⓘ</span></label>
        <input id="cfgBcc" value="${esc(cfg.bcc||"")}" placeholder="(pendiente de configurar)"></div>
    </div>

    <div class="plt-selectores">
      <div class="campo"><label>Cliente</label>
        <select id="pltCliente">
          <option value="">— Sin cliente (texto genérico) —</option>
          ${clientes.map(c=>`<option value="${c.id}" ${c.id===sel.clienteId?"selected":""}>${esc(c.empresa)}</option>`).join("")}
        </select></div>
      <div class="campo"><label>Fase</label>
        <select id="pltFase">${FASES.map(f=>`<option value="${f.id}" ${f.id===sel.fase?"selected":""}>${f.label}</option>`).join("")}</select></div>
      <div class="campo"><label>Idioma</label>
        <select id="pltIdioma">${IDIOMAS.map(i=>`<option value="${i.id}" ${i.id===sel.idioma?"selected":""}>${i.bandera} ${i.label}</option>`).join("")}</select></div>
    </div>

    <div class="plt-preview">
      <div class="campo"><label>Asunto</label><input id="pltAsunto"></div>
      <div class="campo"><label>Mensaje</label><textarea id="pltCuerpo" style="min-height:280px"></textarea></div>
    </div>

    <div class="plt-acciones">
      <button class="btn btn-ghost" id="pltCopiarAsunto">Copiar asunto</button>
      <button class="btn btn-ghost" id="pltCopiar">Copiar mensaje</button>
      <button class="btn btn-primary" id="pltCorreo">✉️ Abrir en mi correo</button>
    </div>
    <div class="plt-aviso" id="pltAviso"></div>
  `;

  // Guardar config al cambiar
  ["cfgNombre","cfgEmpresa","cfgBcc"].forEach(id=>{
    document.getElementById(id).addEventListener("input", ()=>{
      setConfigCorreo({
        miNombre: document.getElementById("cfgNombre").value,
        miEmpresa: document.getElementById("cfgEmpresa").value,
        bcc: document.getElementById("cfgBcc").value
      });
      pintarTexto();
    });
  });

  document.getElementById("pltCliente").addEventListener("change", e=>{ sel.clienteId=e.target.value; pintarTexto(); });
  document.getElementById("pltFase").addEventListener("change", e=>{ sel.fase=e.target.value; pintarTexto(); });
  document.getElementById("pltIdioma").addEventListener("change", e=>{ sel.idioma=e.target.value; pintarTexto(); });

  document.getElementById("pltCopiar").addEventListener("click", ()=> copiar(document.getElementById("pltCuerpo").value, "Mensaje copiado"));
  document.getElementById("pltCopiarAsunto").addEventListener("click", ()=> copiar(document.getElementById("pltAsunto").value, "Asunto copiado"));
  document.getElementById("pltCorreo").addEventListener("click", abrirCorreo);

  pintarTexto();
}

function clienteActual(){
  if(!sel.clienteId) return { empresa:"", contacto:"", email:"" };
  return getActivos().find(c=>c.id===sel.clienteId) || { empresa:"", contacto:"", email:"" };
}

function pintarTexto(){
  const p = getPlantilla(sel.fase, sel.idioma);
  if(!p) return;
  const cfg = getConfigCorreo();
  const c = clienteActual();
  document.getElementById("pltAsunto").value = rellenar(p.asunto, c, cfg);
  document.getElementById("pltCuerpo").value = rellenar(p.cuerpo, c, cfg);
}

function abrirCorreo(){
  const c = clienteActual();
  const cfg = getConfigCorreo();
  const asunto = document.getElementById("pltAsunto").value;
  const cuerpo = document.getElementById("pltCuerpo").value;
  const aviso = document.getElementById("pltAviso");

  const params = [];
  params.push("subject=" + encodeURIComponent(asunto));
  params.push("body=" + encodeURIComponent(cuerpo));
  if(cfg.bcc) params.push("bcc=" + encodeURIComponent(cfg.bcc));

  const dest = c.email || "";
  const url = "mailto:" + encodeURIComponent(dest) + "?" + params.join("&");

  // mailto tiene un límite de longitud; si es muy largo, avisamos para usar Copiar
  if(url.length > 1900){
    aviso.innerHTML = `⚠️ El mensaje es largo y tu correo podría recortarlo. Usa <b>“Copiar mensaje”</b> y pégalo a mano.`;
    aviso.className = "plt-aviso visible";
  }else{
    aviso.className = "plt-aviso";
    aviso.textContent = "";
  }
  window.location.href = url;
  if(!dest){
    aviso.innerHTML = `ℹ️ Este cliente no tiene email en su ficha; añádelo en el destinatario de tu correo.`;
    aviso.className = "plt-aviso visible";
  }
}

async function copiar(texto, msg){
  try{
    await navigator.clipboard.writeText(texto);
    toast(msg);
  }catch{
    // fallback
    const ta=document.createElement("textarea"); ta.value=texto; document.body.appendChild(ta);
    ta.select(); document.execCommand("copy"); ta.remove(); toast(msg);
  }
}
function toast(msg){
  const a=document.getElementById("pltAviso");
  a.textContent="✓ "+msg; a.className="plt-aviso visible ok";
  setTimeout(()=>{ a.className="plt-aviso"; a.textContent=""; }, 2200);
}

function esc(s){
  return (s??"").toString()
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
