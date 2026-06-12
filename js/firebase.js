// ============================================================
//  firebase.js · Conexión a Firebase (proyecto crm-aceitearagon)
// ============================================================
//  Usa los SDK de Firebase v10 vía CDN (módulos ES).
//  Este archivo inicializa la app y exporta auth y db para
//  que el resto de módulos los usen.
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// --- Configuración de tu proyecto (clave pública de cliente) ---
const firebaseConfig = {
  apiKey: "AIzaSyAGbC4zj1g3jjEzfYRzcfuZIiY6PnK8_WQ",
  authDomain: "crm-aceitearagon.firebaseapp.com",
  projectId: "crm-aceitearagon",
  storageBucket: "crm-aceitearagon.firebasestorage.app",
  messagingSenderId: "292572979023",
  appId: "1:292572979023:web:5eebeb8ec945fa65d4ef3a"
};

// --- Inicialización ---
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
