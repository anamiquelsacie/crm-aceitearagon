// ============================================================
//  auth.js · Login y control de sesión
// ============================================================
import { auth } from "./firebase.js?v=29";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// --- Iniciar sesión ---
export async function entrar(email, password){
  const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
  return cred.user;
}

// --- Cerrar sesión ---
export async function salir(){
  await signOut(auth);
}

// --- Observa el estado de sesión y ejecuta el callback ---
export function vigilarSesion(callback){
  onAuthStateChanged(auth, callback);
}

// --- Traduce errores de Firebase a mensajes claros ---
export function traducirError(codigo){
  const mapa = {
    "auth/invalid-email": "El correo no tiene un formato válido.",
    "auth/user-not-found": "No existe ningún usuario con ese correo.",
    "auth/wrong-password": "La contraseña no es correcta.",
    "auth/invalid-credential": "Correo o contraseña incorrectos.",
    "auth/too-many-requests": "Demasiados intentos. Espera un momento e inténtalo de nuevo.",
    "auth/network-request-failed": "Sin conexión. Revisa tu red e inténtalo otra vez."
  };
  return mapa[codigo] || "No se ha podido iniciar sesión. Inténtalo de nuevo.";
}
