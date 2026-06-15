// ============================================================
//  agenda.js · Agenda de alertas y pendientes
//  Calcula, sin coste, los avisos a partir de las reglas:
//   - Correo enviado sin respuesta: 3 días
//   - Cliente pidió algo y no contestas: 24 h
//   - Enfriamiento por fase: negociación 7 / catálogo-precios 10 / contacto-potencial 20
//   - Recordatorios manuales (fechaProxima programada en la ficha)
//  Agrupa en: vencidos / hoy / próximos.
// ============================================================
import { getActivos, estadoInfo, bandera, registrarInteraccion } from "./clientes.js";

function diasDesde(ts){
  if(!ts) return null;
  const f = ts.toDate ? ts.toDate() : new Date(ts);
  return Math.floor((Date.now() - f.getTime()) / 86400000);
}
function diasHasta(fechaISO){
  if(!fechaISO) return null;
  const hoy = new Date(); hoy.setHours(0,0,0,0);
  const f = new Date(fechaISO + "T00:00:00");
  return Math.round((f - hoy) / 86400000);
}

const UMBRAL_ENFRIA = { negociacion:7, catalogo:10, precios:10, contacto:20, potencial:20, cliente:90 };

// Genera la lista de alertas/pendientes de todos los clientes activos
export function calcularPendientes(){
  const pend = [];
  getActivos().forEach(c=>{
    // 1) Recordatorio manual programado
    if(c.fechaProxima){
      const d = diasHasta(c.fechaProxima);
      pend.push({
        clienteId:c.id, empresa:c.empresa, pais:c.pais, estado:c.estado,
        tipo:"recordatorio",
        texto: c.proximaAccion || "Acción programada",
        dias: d,                       // <0 vencido, 0 hoy, >0 futuro
        fecha: c.fechaProxima
      });
    }
    // 2) Enfriamiento por fase (según última interacción)
    const dInter = diasDesde(c.ultimaInteraccion);
    if(dInter !== null){
      const u = UMBRAL_ENFRIA[c.estado];
      if(u && dInter >= u){
        pend.push({
          clienteId:c.id, empresa:c.empresa, pais:c.pais, estado:c.estado,
          tipo:"enfriamiento",
          texto:`Sin movimiento desde hace ${dInter} días (${estadoInfo(c.estado).label})`,
          dias: -1,                    // se trata como vencido/atención
          fecha: null
        });
      }
    }
  });
  return pend;
}

// Agrupa en vencidos / hoy / próximos
export function agrupar(pend){
  const grupos = { vencidos:[], hoy:[], proximos:[] };
  pend.forEach(p=>{
    if(p.tipo==="recordatorio"){
      if(p.dias < 0) grupos.vencidos.push(p);
      else if(p.dias === 0) grupos.hoy.push(p);
      else grupos.proximos.push(p);
    }else{
      // enfriamiento => requiere atención ya: lo ponemos en vencidos
      grupos.vencidos.push(p);
    }
  });
  // ordenar próximos por cercanía
  grupos.proximos.sort((a,b)=> (a.dias||0)-(b.dias||0));
  return grupos;
}

export function contarPendientes(){
  const g = agrupar(calcularPendientes());
  return g.vencidos.length + g.hoy.length;   // lo "urgente" para el badge
}

// Marca una alerta como atendida: registra interacción y limpia la próxima acción
export async function resolverPendiente(clienteId, comentario){
  await registrarInteraccion(clienteId, {
    tipo:"nota",
    comentario: comentario || "Pendiente atendido desde la agenda",
    proximaAccion:"", fechaProxima:""
  });
}

// Posponer: mueve la fecha de la próxima acción X días
export async function posponer(clienteId, dias){
  const c = getActivos().find(x=>x.id===clienteId);
  const base = (c && c.fechaProxima) ? new Date(c.fechaProxima+"T00:00:00") : new Date();
  base.setDate(base.getDate()+dias);
  const nueva = base.toISOString().slice(0,10);
  await registrarInteraccion(clienteId, {
    tipo:"nota",
    comentario:`Pospuesto ${dias} día(s)`,
    proximaAccion: c?.proximaAccion || "Recordatorio pospuesto",
    fechaProxima: nueva
  });
}

export { diasDesde, diasHasta };
