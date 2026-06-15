// ============================================================
//  notas.js · Bloc de notas (colección "notas" en Firestore)
//  Notas sueltas con título, contenido y opción de fijar.
// ============================================================
import { db } from "./firebase.js?v=29";
import {
  collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const col = collection(db, "notas");
let notas = [];
let onChange = ()=>{};

export function escucharNotas(cb){
  onChange = cb;
  return onSnapshot(col, snap=>{
    notas = snap.docs.map(d=>({ id:d.id, ...d.data() }));
    onChange(notas);
  }, err=> console.error("Error al leer notas:", err));
}
export function getNotas(){ return notas; }

export async function crearNota(datos){
  return await addDoc(col, {
    titulo: datos.titulo || "",
    contenido: datos.contenido || "",
    fijada: false,
    creada: serverTimestamp(),
    modificada: serverTimestamp()
  });
}
export async function actualizarNota(id, datos){
  return await updateDoc(doc(db,"notas",id), { ...datos, modificada: serverTimestamp() });
}
export async function fijarNota(id, fijada){
  return await updateDoc(doc(db,"notas",id), { fijada });
}
export async function borrarNota(id){
  return await deleteDoc(doc(db,"notas",id));
}
