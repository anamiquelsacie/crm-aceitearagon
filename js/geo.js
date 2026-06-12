// ============================================================
//  geo.js · Coordenadas de países y ciudades (sin coste)
//  Tabla local para ubicar clientes en el mapa sin servicios externos.
//  Ampliable: añade aquí países/ciudades según tus mercados.
// ============================================================

// Coordenadas [lat, lng] del centro aproximado de cada país
export const PAISES = {
  "España":[40.2,-3.7], "Corea del Sur":[36.5,127.8], "Corea":[36.5,127.8],
  "Japón":[36.2,138.2], "Francia":[46.6,2.2], "Alemania":[51.1,10.4],
  "Italia":[42.8,12.6], "Países Bajos":[52.1,5.3], "Holanda":[52.1,5.3],
  "Portugal":[39.5,-8.0], "Reino Unido":[54.0,-2.5], "Estados Unidos":[39.5,-98.3],
  "China":[35.8,104.2], "Bélgica":[50.6,4.6], "Suiza":[46.8,8.2],
  "Austria":[47.6,14.1], "Dinamarca":[56.1,9.5], "Suecia":[60.1,18.6],
  "Noruega":[60.5,8.5], "Polonia":[52.0,19.1], "Irlanda":[53.2,-8.0],
  "Grecia":[39.0,22.0], "Canadá":[56.1,-106.3], "México":[23.6,-102.5],
  "Brasil":[-14.2,-51.9], "Emiratos Árabes Unidos":[23.4,53.8], "Catar":[25.3,51.2],
  "Singapur":[1.35,103.8], "Australia":[-25.3,133.8], "Finlandia":[61.9,25.7],
  "Rusia":[61.5,105.3], "India":[20.6,79.0], "Taiwán":[23.7,121.0]
};

// Coordenadas [lat, lng] de ciudades principales (clave: "ciudad" en minúscula sin tildes)
export const CIUDADES = {
  // España
  "madrid":[40.42,-3.70],"barcelona":[41.39,2.17],"valencia":[39.47,-0.38],
  "zaragoza":[41.65,-0.89],"sevilla":[37.39,-5.99],"bilbao":[43.26,-2.93],
  "malaga":[36.72,-4.42],"castellon":[39.99,-0.04],"castello":[39.99,-0.04],
  "valdealgorfa":[40.99,-0.03],"teruel":[40.34,-1.11],"alcaniz":[41.05,-0.13],
  // Corea / Japón
  "seul":[37.57,126.98],"seoul":[37.57,126.98],"busan":[35.18,129.08],
  "tokio":[35.68,139.69],"tokyo":[35.68,139.69],"osaka":[34.69,135.50],"kioto":[35.01,135.77],
  // Europa
  "paris":[48.86,2.35],"lyon":[45.76,4.84],"marsella":[43.30,5.37],
  "berlin":[52.52,13.40],"munich":[48.14,11.58],"hamburgo":[53.55,9.99],"frankfurt":[50.11,8.68],
  "roma":[41.90,12.50],"milan":[45.46,9.19],"napoles":[40.85,14.27],"turin":[45.07,7.69],
  "amsterdam":[52.37,4.90],"rotterdam":[51.92,4.48],
  "lisboa":[38.72,-9.14],"oporto":[41.15,-8.61],
  "londres":[51.51,-0.13],"manchester":[53.48,-2.24],
  "bruselas":[50.85,4.35],"viena":[48.21,16.37],"zurich":[47.37,8.54],"ginebra":[46.20,6.14],
  "copenhague":[55.68,12.57],"estocolmo":[59.33,18.07],"oslo":[59.91,10.75],
  "varsovia":[52.23,21.01],"atenas":[37.98,23.73],"dublin":[53.35,-6.26],
  "helsinki":[60.17,24.94],
  // Otros
  "nueva york":[40.71,-74.01],"new york":[40.71,-74.01],"los angeles":[34.05,-118.24],
  "miami":[25.76,-80.19],"shanghai":[31.23,121.47],"pekin":[39.90,116.40],"beijing":[39.90,116.40],
  "hong kong":[22.32,114.17],"singapur":[1.35,103.82],"dubai":[25.20,55.27],
  "doha":[25.29,51.53],"taipei":[25.03,121.57]
};

// quita tildes y pasa a minúscula para casar nombres de ciudad
function norm(s){
  return (s||"").toString().toLowerCase().trim()
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"");
}

// Devuelve [lat,lng] para un cliente. Prioriza ciudad; si no, país.
// Aplica un pequeño desplazamiento aleatorio estable para que clientes
// de la misma ciudad no queden exactamente superpuestos.
export function coordenadas(cliente){
  const ciudad = norm(cliente.ciudad);
  let base = CIUDADES[ciudad] || PAISES[(cliente.pais||"").trim()];
  if(!base) return null;
  // desplazamiento determinista según el id (para que no "bailen" al recargar)
  const semilla = (cliente.id||"x").split("").reduce((a,c)=>a+c.charCodeAt(0),0);
  const dx = ((semilla % 20) - 10) / 250;   // ~±0.04º
  const dy = (((semilla*7) % 20) - 10) / 250;
  return [ base[0]+dx, base[1]+dy ];
}

export function coordenadasPais(pais){
  return PAISES[(pais||"").trim()] || null;
}
