/* ============================================================
   estilos.css · Aceite Aragón CRM
   Línea visual clara y luminosa · verde marca + dorado acento
   ============================================================ */

:root{
  --verde:#2f7d62;
  --verde-hondo:#1f5a46;
  --verde-suave:#e8f1ec;
  --dorado:#d99a2b;
  --dorado-suave:#f7ecd4;
  --tinta:#1d2b25;
  --gris:#6b7a72;
  --linea:#e4e9e6;
  --fondo:#f7faf8;
  --blanco:#ffffff;
  --rojo:#c2543c;
  --rojo-suave:#f8e4de;
  --sombra:0 6px 18px rgba(31,90,70,.08);
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{
  font-family:'Segoe UI',system-ui,-apple-system,sans-serif;
  background:var(--fondo);color:var(--tinta);
  -webkit-font-smoothing:antialiased;
}
button{font-family:inherit}
.oculto{display:none !important}

/* ---------- Botones ---------- */
.btn{
  border:none;cursor:pointer;font-size:13.5px;font-weight:600;
  padding:9px 16px;border-radius:9px;display:inline-flex;align-items:center;
  gap:7px;transition:.15s;
}
.btn-primary{background:var(--verde);color:#fff}
.btn-primary:hover{background:var(--verde-hondo)}
.btn-ghost{background:var(--verde-suave);color:var(--verde-hondo)}
.btn-ghost:hover{background:#dceae3}
.btn-rojo{background:var(--rojo-suave);color:#a8432e}
.btn-rojo:hover{background:#f3d6cd}
.btn:disabled{opacity:.55;cursor:not-allowed}

/* ---------- Login ---------- */
.login-wrap{
  min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;
  background:linear-gradient(160deg,#eaf3ee,#f7faf8 60%);
}
.login-card{
  background:var(--blanco);border:1px solid var(--linea);border-radius:18px;
  box-shadow:0 14px 40px rgba(31,90,70,.12);padding:36px 32px;width:100%;max-width:380px;
}
.login-brand{display:flex;align-items:center;gap:13px;margin-bottom:26px;justify-content:center}
.login-brand .mark{
  width:46px;height:46px;border-radius:11px;background:var(--verde);position:relative;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}
.login-brand .mark span{color:#fff;font-weight:800;font-size:24px;font-family:Georgia,serif}
.login-brand .mark::after{
  content:"";position:absolute;right:-4px;bottom:-4px;width:16px;height:16px;
  border-radius:50%;background:var(--dorado);border:3px solid var(--blanco);
}
.login-brand h1{font-size:18px;font-weight:700}
.login-brand p{font-size:12px;color:var(--gris);margin-top:1px}
.campo{margin-bottom:15px}
.campo label{display:block;font-size:12.5px;font-weight:600;color:var(--gris);margin-bottom:6px}
.campo input{
  width:100%;border:1px solid var(--linea);border-radius:10px;padding:11px 13px;
  font-size:14px;color:var(--tinta);background:var(--fondo);outline:none;transition:.15s;
}
.campo input:focus{border-color:var(--verde);background:#fff;box-shadow:0 0 0 3px var(--verde-suave)}
.login-card .btn-primary{width:100%;justify-content:center;padding:12px;font-size:14.5px;margin-top:6px}
.login-error{
  background:var(--rojo-suave);color:#a8432e;font-size:12.5px;border-radius:9px;
  padding:10px 12px;margin-bottom:14px;text-align:center;
}

/* ---------- Topbar ---------- */
.topbar{
  background:var(--blanco);border-bottom:1px solid var(--linea);
  display:flex;align-items:center;justify-content:space-between;
  padding:14px 26px;position:sticky;top:0;z-index:20;
}
.brand{display:flex;align-items:center;gap:12px}
.brand .mark{
  width:38px;height:38px;border-radius:9px;background:var(--verde);position:relative;
  flex-shrink:0;display:flex;align-items:center;justify-content:center;
}
.brand .mark span{color:#fff;font-weight:800;font-size:20px;font-family:Georgia,serif}
.brand .mark::after{
  content:"";position:absolute;right:-4px;bottom:-4px;width:14px;height:14px;
  border-radius:50%;background:var(--dorado);border:2.5px solid var(--blanco);
}
.brand h1{font-size:16px;font-weight:700}
.brand p{font-size:11.5px;color:var(--gris);margin-top:1px}
.top-actions{display:flex;align-items:center;gap:10px}
.user-chip{
  width:36px;height:36px;border-radius:50%;background:var(--dorado-suave);color:#8a5e12;
  font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;
  border:1px solid #ecd9b0;cursor:pointer;
}

/* ---------- Layout ---------- */
.wrap{max-width:1180px;margin:0 auto;padding:26px}
.page-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:18px;flex-wrap:wrap;gap:8px}
.page-head h2{font-size:22px;font-weight:700}
.page-head .sub{font-size:13px;color:var(--gris)}

/* ---------- Resumen KPIs ---------- */
.resumen{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-bottom:14px}
.kpi{
  background:var(--blanco);border:1px solid var(--linea);border-radius:13px;
  padding:14px;cursor:pointer;transition:.15s;position:relative;overflow:hidden;
}
.kpi:hover{border-color:var(--verde);transform:translateY(-2px);box-shadow:var(--sombra)}
.kpi.activo{border-color:var(--verde);box-shadow:var(--sombra)}
.kpi .n{font-size:26px;font-weight:800;line-height:1}
.kpi .l{font-size:11.5px;color:var(--gris);margin-top:7px;line-height:1.25}
.kpi .bar{position:absolute;left:0;top:0;height:3px;width:100%}
.kpi.k1 .bar{background:#9aa8a0}.kpi.k1 .n{color:#5d6b63}
.kpi.k2 .bar{background:#7bb0c9}.kpi.k2 .n{color:#3f7e9b}
.kpi.k3 .bar{background:#8bbf7a}.kpi.k3 .n{color:#4f9039}
.kpi.k4 .bar{background:var(--dorado)}.kpi.k4 .n{color:#b97f16}
.kpi.k5 .bar{background:#d98a4f}.kpi.k5 .n{color:#c06a2c}
.kpi.k6 .bar{background:var(--verde)}.kpi.k6 .n{color:var(--verde)}

.mini-row{display:flex;gap:12px;margin-bottom:22px;flex-wrap:wrap}
.mini{
  background:var(--blanco);border:1px solid var(--linea);border-radius:11px;
  padding:11px 15px;font-size:13px;color:var(--gris);display:flex;align-items:center;gap:9px;
}
.mini b{color:var(--tinta);font-size:15px}
.mini.alert{background:var(--rojo-suave);border-color:#f0cabf;color:#a8432e}
.mini.alert b{color:#a8432e}
.dot{width:9px;height:9px;border-radius:50%;display:inline-block;flex-shrink:0}

/* ---------- Toolbar filtros ---------- */
.toolbar{
  background:var(--blanco);border:1px solid var(--linea);border-radius:13px;
  padding:13px 15px;display:flex;gap:10px;align-items:center;margin-bottom:14px;flex-wrap:wrap;
}
.search{
  flex:1;min-width:180px;display:flex;align-items:center;gap:8px;
  background:var(--fondo);border:1px solid var(--linea);border-radius:9px;padding:8px 12px;
}
.search input{border:none;background:none;outline:none;font-size:13.5px;width:100%;color:var(--tinta)}
.filtro{
  font-size:13px;color:var(--tinta);background:var(--fondo);border:1px solid var(--linea);
  border-radius:9px;padding:8px 12px;cursor:pointer;font-weight:500;outline:none;
}
.filtro.alerta-activa{background:var(--rojo-suave);border-color:#f0cabf;color:#a8432e}

/* ---------- Tabla ---------- */
.tabla-card{background:var(--blanco);border:1px solid var(--linea);border-radius:13px;overflow:hidden}
.tabla-scroll{overflow-x:auto}
table{width:100%;border-collapse:collapse}
thead th{
  text-align:left;font-size:11.5px;text-transform:uppercase;letter-spacing:.04em;
  color:var(--gris);font-weight:600;padding:13px 16px;border-bottom:1px solid var(--linea);
  cursor:pointer;white-space:nowrap;user-select:none;
}
thead th .ar{color:var(--verde);font-size:10px}
tbody td{padding:14px 16px;border-bottom:1px solid var(--linea);font-size:13.5px;vertical-align:middle}
tbody tr{cursor:pointer;transition:.12s}
tbody tr:hover{background:var(--verde-suave)}
tbody tr:last-child td{border-bottom:none}
.empresa{font-weight:600;display:flex;align-items:center;gap:10px}
.flag{font-size:17px}
.canal{font-size:11.5px;padding:3px 9px;border-radius:20px;font-weight:600;display:inline-block;background:#eef3f0;color:#4a5b53}
.estado{display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:500;white-space:nowrap}
.prio{font-size:16px}
.alerta-cell{text-align:center;font-size:15px}
.muted{color:var(--gris);font-size:12.5px}
.vacio{padding:48px 20px;text-align:center;color:var(--gris);font-size:14px}
.vacio b{display:block;color:var(--tinta);font-size:15px;margin-bottom:6px}

/* ---------- Modal ficha ---------- */
.modal-bg{
  position:fixed;inset:0;background:rgba(20,40,32,.45);z-index:60;
  display:flex;align-items:flex-start;justify-content:center;padding:30px 16px;overflow-y:auto;
}
.modal{
  background:var(--blanco);border-radius:16px;width:100%;max-width:680px;
  box-shadow:0 20px 60px rgba(0,0,0,.25);overflow:hidden;
}
.modal-head{
  display:flex;align-items:center;justify-content:space-between;
  padding:18px 22px;border-bottom:1px solid var(--linea);
}
.modal-head h3{font-size:17px;font-weight:700}
.modal-x{background:none;border:none;font-size:22px;cursor:pointer;color:var(--gris);line-height:1}
.modal-body{padding:22px;max-height:70vh;overflow-y:auto}
.modal-foot{
  padding:15px 22px;border-top:1px solid var(--linea);display:flex;gap:10px;justify-content:flex-end;
  background:var(--fondo);
}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.bloque-titulo{
  font-size:11.5px;text-transform:uppercase;letter-spacing:.04em;color:var(--verde);
  font-weight:700;margin:18px 0 10px;padding-bottom:6px;border-bottom:1px solid var(--linea);
}
.bloque-titulo:first-child{margin-top:0}
.campo textarea{
  width:100%;border:1px solid var(--linea);border-radius:10px;padding:11px 13px;font-size:14px;
  color:var(--tinta);background:var(--fondo);outline:none;font-family:inherit;resize:vertical;min-height:70px;
}
.campo textarea:focus,.campo select:focus{border-color:var(--verde);background:#fff;box-shadow:0 0 0 3px var(--verde-suave)}
.campo select{
  width:100%;border:1px solid var(--linea);border-radius:10px;padding:11px 13px;font-size:14px;
  color:var(--tinta);background:var(--fondo);outline:none;cursor:pointer;
}

/* ---------- Responsive ---------- */
@media(max-width:900px){
  .resumen{grid-template-columns:repeat(3,1fr)}
  .col-hide{display:none}
  .grid2{grid-template-columns:1fr}
}
@media(max-width:560px){
  .resumen{grid-template-columns:repeat(2,1fr)}
  .wrap{padding:16px}
  .topbar{padding:12px 16px}
  .brand p{display:none}
}

/* ---------- Histórico de interacciones ---------- */
.hist-lista{display:flex;flex-direction:column;gap:8px;margin-top:4px}
.hist-vacio{color:var(--gris);font-size:13px;padding:14px 4px;text-align:center}
.hist-item{
  display:flex;gap:11px;align-items:flex-start;background:var(--fondo);
  border:1px solid var(--linea);border-radius:11px;padding:11px 13px;
}
.hist-ico{font-size:18px;line-height:1.2;flex-shrink:0}
.hist-cuerpo{flex:1;min-width:0}
.hist-top{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
.hist-tipo{font-weight:600;font-size:13px;color:var(--tinta)}
.hist-fecha{font-size:11.5px;color:var(--gris)}
.hist-coment{font-size:13px;color:var(--tinta);margin-top:4px;line-height:1.45;white-space:pre-wrap;word-break:break-word}
.hist-acc{display:flex;gap:4px;flex-shrink:0}
.hist-btn{
  background:none;border:none;cursor:pointer;font-size:13px;color:var(--gris);
  padding:4px 6px;border-radius:7px;transition:.12s;
}
.hist-btn:hover{background:var(--verde-suave);color:var(--verde-hondo)}

/* Formulario de interacción */
.form-inter{
  background:var(--verde-suave);border:1px solid #d3e5db;border-radius:12px;
  padding:15px;margin-bottom:12px;
}
.form-inter-acc{display:flex;gap:9px;justify-content:flex-end;margin-top:6px}
.plazos{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin-bottom:13px}
.plazo-lbl{font-size:12.5px;color:var(--gris);font-weight:600}
.plazo{
  background:var(--blanco);border:1px solid var(--linea);border-radius:8px;
  padding:6px 11px;font-size:12.5px;cursor:pointer;color:var(--tinta);transition:.12s;
}
.plazo:hover{border-color:var(--verde)}
.plazo.activo{background:var(--verde);color:#fff;border-color:var(--verde)}
.plazo-fecha{
  border:1px solid var(--linea);border-radius:8px;padding:5px 10px;font-size:12.5px;
  color:var(--tinta);background:var(--blanco);outline:none;font-family:inherit;
}

/* ---------- Pestañas ---------- */
.tabs{display:flex;gap:4px;margin-bottom:20px;border-bottom:1px solid var(--linea)}
.tab{
  background:none;border:none;cursor:pointer;font-size:14px;font-weight:600;
  color:var(--gris);padding:11px 18px;border-bottom:2.5px solid transparent;
  margin-bottom:-1px;transition:.15s;
}
.tab:hover{color:var(--verde-hondo)}
.tab.activo{color:var(--verde);border-bottom-color:var(--verde)}

/* ---------- Mapa ---------- */
.mapa-cabecera{
  display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:12px;min-height:38px;
}
.mapa-titulo{font-size:16px;font-weight:700;color:var(--tinta)}
.mapa-sub,.mapa-leyenda{font-size:12.5px;color:var(--gris)}
.mapa-leyenda{display:flex;gap:12px;flex-wrap:wrap;margin-left:auto}
.leg{display:inline-flex;align-items:center;gap:5px;font-size:12px;color:var(--gris)}
#mapaCanvas{
  width:100%;height:560px;border:1px solid var(--linea);border-radius:13px;overflow:hidden;
  background:#e8eef0;
}

/* Chincheta de país (burbuja con número) */
.pin-pais{background:none;border:none}
.pin-pais-burbuja{
  width:38px;height:38px;border-radius:50%;background:var(--verde);color:#fff;
  display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;
  border:3px solid #fff;box-shadow:0 3px 10px rgba(31,90,70,.4);cursor:pointer;
}
.pin-pais-nombre{
  position:absolute;top:42px;left:50%;transform:translateX(-50%);white-space:nowrap;
  font-size:11px;font-weight:600;color:var(--tinta);background:rgba(255,255,255,.9);
  padding:1px 7px;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,.1);
}
/* Chincheta de cliente (punto de color) */
.pin-cliente{background:none;border:none}
.pin-dot{
  width:16px;height:16px;border-radius:50%;border:2.5px solid #fff;
  box-shadow:0 2px 6px rgba(0,0,0,.3);cursor:pointer;
}
/* Popup */
.popup b{font-size:14px;color:var(--tinta)}
.popup-l{font-size:12.5px;color:var(--gris);margin-top:3px;display:flex;align-items:center;gap:6px}

@media(max-width:560px){
  #mapaCanvas{height:440px}
  .mapa-leyenda{margin-left:0}
}

/* Botón Ver ficha dentro del popup del mapa */
.popup-btn{
  margin-top:9px;width:100%;background:var(--verde);color:#fff;border:none;
  border-radius:8px;padding:7px 10px;font-size:12.5px;font-weight:600;cursor:pointer;
  font-family:inherit;transition:.12s;
}
.popup-btn:hover{background:var(--verde-hondo)}

/* ---------- Papelera ---------- */
.papelera-lista{display:flex;flex-direction:column;gap:9px}
.papelera-item{
  display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;
  background:var(--fondo);border:1px solid var(--linea);border-radius:11px;padding:11px 13px;
}
.papelera-info{display:flex;align-items:center;gap:11px}
.papelera-nombre{font-weight:600;font-size:14px;color:var(--tinta)}
.papelera-acc{display:flex;gap:8px}
.papelera-acc .btn{padding:7px 12px;font-size:12.5px}

/* ---------- Plantillas ---------- */
.plt-config{
  display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:18px;
  background:var(--blanco);border:1px solid var(--linea);border-radius:13px;padding:16px;
}
.plt-selectores{display:grid;grid-template-columns:2fr 1.4fr 1.2fr;gap:14px;margin-bottom:16px}
.plt-preview{
  background:var(--blanco);border:1px solid var(--linea);border-radius:13px;padding:16px;margin-bottom:14px;
}
.plt-preview .campo input,.plt-preview .campo textarea{font-size:13.5px;line-height:1.5}
.plt-acciones{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}
.ayuda{cursor:help;color:var(--gris);font-size:12px}
.plt-aviso{font-size:13px;margin-top:12px;text-align:right;min-height:18px;color:var(--gris)}
.plt-aviso.visible{padding:10px 13px;border-radius:9px;text-align:left;background:var(--dorado-suave);color:#8a5e12}
.plt-aviso.visible.ok{background:var(--verde-suave);color:var(--verde-hondo)}

@media(max-width:760px){
  .plt-config,.plt-selectores{grid-template-columns:1fr}
}
