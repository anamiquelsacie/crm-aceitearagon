// ============================================================
//  clientes.js · Núcleo de gestión de clientes
//  - Lee y escribe la colección "clientes" en Firestore
//  - Pinta el resumen (KPIs), la tabla con filtros y orden
//  - Abre/edita/crea la ficha de cliente
// ============================================================
import { db } from "./firebase.js";
import {
  collection, onSnapshot, addDoc, updateDoc, doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ---------- Catálogos (valores fijos del negocio) ----------
export const ESTADOS = [
  { id:"potencial",   label:"Potencial",            color:"#9aa8a0", clase:"k1" },
  { id:"contacto",    label:"Primer contacto",      color:"#7bb0c9", clase:"k2" },
  { id:"catalogo",    label:"Catálogo enviado",     color:"#8bbf7a", clase:"k3" },
  { id:"precios",     label:"Precios / referencias",color:"#d99a2b", clase:"k4" },
  { id:"negociacion", label:"En negociación",       color:"#d98a4f", clase:"k5" },
  { id:"cliente",     label:"Cliente con pedidos",  color:"#2f7d62", clase:"k6" }
];
export const CANALES = ["Importador","Distribuidor","Tienda gourmet","HORECA","Supermercado","Otro"];
export const PRIORIDADES = [
  { id:"caliente", label:"Caliente 🔥", icono:"🔥" },
  { id:"templado", label:"Templado ➖", icono:"➖" },
  { id:"frio",     label:"Frío ❄️",     icono:"❄️" }
];
export const PRODUCTOS = ["Palacio Andilla 1624","Antonio Pérez 1631","Valdealgorfa"];

// Bandera por nombre de país (los más habituales; se amplía fácil)
const BANDERAS = {
  "España":"🇪🇸","Corea del Sur":"🇰🇷","Corea":"🇰🇷","Japón":"🇯🇵","Francia":"🇫🇷",
  "Alemania":"🇩🇪","Italia":"🇮🇹","Países Bajos":"🇳🇱","Holanda":"🇳🇱","Portugal":"🇵🇹",
  "Reino Unido":"🇬🇧","Estados Unidos":"🇺🇸","China":"🇨🇳","Bélgica":"🇧🇪","Suiza":"🇨🇭",
  "Austria":"🇦🇹","Dinamarca":"🇩🇰","Suecia":"🇸🇪","Noruega":"🇳🇴","Polonia":"🇵🇱"
};
export function bandera(pais){ return BANDERAS[(pais||"").trim()] || "🌍"; }

export function estadoInfo(id){ return ESTADOS.find(e=>e.id===id) || ESTADOS[0]; }
export function prioridadInfo(id){ return PRIORIDADES.find(p=>p.id===id) || PRIORIDADES[1]; }

// ---------- Estado en memoria ----------
let clientes = [];               // copia local sincronizada con Firestore
let onChange = ()=>{};           // callback que avisa a la UI cuando cambian los datos

const col = collection(db, "clientes");

// Suscripción en tiempo real: cualquier cambio en Firestore actualiza la app sola
export function escucharClientes(callback){
  onChange = callback;
  return onSnapshot(col, snap => {
    clientes = snap.docs.map(d => ({ id:d.id, ...d.data() }));
    onChange(clientes);
  }, err => {
    console.error("Error al leer clientes:", err);
  });
}

export function getClientes(){ return clientes; }

// ---------- Crear / actualizar ----------
export async function crearCliente(datos){
  return await addDoc(col, {
    ...datos,
    creado: serverTimestamp(),
    ultimaInteraccion: null,
    historico: []
  });
}

export async function actualizarCliente(id, datos){
  return await updateDoc(doc(db,"clientes",id), datos);
}

// ---------- Alta rápida (varios de golpe) ----------
// Acepta texto con un cliente por línea: "Empresa; País; Canal"
export async function altaRapida(texto){
  const lineas = texto.split("\n").map(l=>l.trim()).filter(Boolean);
  const creados = [];
  for(const linea of lineas){
    const partes = linea.split(/[;,\t]/).map(p=>p.trim());
    const datos = {
      empresa: partes[0] || "(sin nombre)",
      pais:    partes[1] || "",
      canal:   partes[2] || "Otro",
      estado:  "potencial",
      prioridad:"frio",
      ciudad:"", contacto:"", cargo:"", email:"", telefono:"", web:"",
      productos:[], volumen:"", idioma:"", comentarios:"",
      precioAcordado:"", divisa:"", incoterm:"", notasCondiciones:""
    };
    const ref = await crearCliente(datos);
    creados.push(ref.id);
  }
  return creados;
}
