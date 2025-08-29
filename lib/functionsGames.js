export async function generarSopaDeLetras(PALABRA, LADO) {
const data = {}
const {cellBordImageCreate} = await import('./jimpHelper.js')

let sopaDeLetras = Array.from({ length: LADO }, () => Array(LADO).fill(null));

let filaInicial = Math.floor(Math.random() * LADO)
let columnaInicial = Math.floor(Math.random() * LADO)
const DIRECCIONES = ["horizontal", "vertical", "diagonalDerecha", "diagonalIzquierda"]
const DIRECCION = DIRECCIONES[Math.floor(Math.random() * DIRECCIONES.length)]

let palabraAgregada = false
while (!palabraAgregada) {
filaInicial = Math.floor(Math.random() * LADO)
columnaInicial = Math.floor(Math.random() * LADO)

let palabraEntra = true;
for (let i = 0; i < PALABRA.length; i++) {
if (DIRECCION === "horizontal" && (columnaInicial + i >= LADO)) {
palabraEntra = false
break;
} else if (DIRECCION === "vertical" && (filaInicial + i >= LADO)) {
palabraEntra = false
break;
} else if (DIRECCION === "diagonalDerecha" && (filaInicial + i >= LADO || columnaInicial + i >= LADO)) {
palabraEntra = false
break;
} else if (DIRECCION === "diagonalIzquierda" && (filaInicial + i >= LADO || columnaInicial - i < 0)) {
palabraEntra = false
break;
}
}

if (palabraEntra) {
for (let i = 0; i < PALABRA.length; i++) {
if (DIRECCION === "horizontal") {
sopaDeLetras[filaInicial][columnaInicial + i] = PALABRA.charAt(i)
} else if (DIRECCION === "vertical") {
sopaDeLetras[filaInicial + i][columnaInicial] = PALABRA.charAt(i)
} else if (DIRECCION === "diagonalDerecha") {
sopaDeLetras[filaInicial + i][columnaInicial + i] = PALABRA.charAt(i)
} else {
sopaDeLetras[filaInicial + i][columnaInicial - i] = PALABRA.charAt(i)
}
}
palabraAgregada = true;
}
}

const LETRAS_POSIBLES = `ABCDEFGHIJKLMNÑOPQRSTUVWXYZ`
const numerosUni = [...Array(LADO).keys()]
let letras = " " + numerosUni.join(" ") + "\n";
for (let i = 0; i < LADO; i++) {
let fila = numerosUni[i] + " "

for (let j = 0; j < LADO; j++) {
if (sopaDeLetras[i][j]) {
fila += sopaDeLetras[i][j] + " "
} else {
sopaDeLetras[i][j] = LETRAS_POSIBLES.charAt(Math.floor(Math.random() * LETRAS_POSIBLES.length))
let letraAleatoria = sopaDeLetras[i][j]
fila += letraAleatoria + " "
}
}
fila += " "
letras += fila + "\n"
}
data.matriz = sopaDeLetras
data.fila = filaInicial 
data.columna = columnaInicial
data.sopaNube = letras
data.sopaPalabra = PALABRA 
data.sopaDir = DIRECCION.replace(/([A-Z])/g, ' $1').toLowerCase().replace(/^./, str => str.toUpperCase())
data.imgbuff = await cellBordImageCreate(sopaDeLetras, LADO)
return data
}

export async function generarSopaDeLetrasMultiple(PALABRAS, LADO) {
const data = {};
const { cellBordImageCreate } = await import('./jimpHelper.js');

let sopaDeLetras = Array.from({ length: LADO }, () => Array(LADO).fill(null));
const DIRECCIONES = ["horizontal", "vertical", "diagonalDerecha", "diagonalIzquierda"];

const ubicacionesPalabras = [];

for (let PALABRA of PALABRAS) {
let palabraAgregada = false;
while (!palabraAgregada) {
const filaInicial = Math.floor(Math.random() * LADO);
const columnaInicial = Math.floor(Math.random() * LADO);
const DIRECCION = DIRECCIONES[Math.floor(Math.random() * DIRECCIONES.length)];

let palabraEntra = true;
for (let i = 0; i < PALABRA.length; i++) {
let fila = filaInicial;
let col = columnaInicial;
if (DIRECCION === "horizontal") col += i;
else if (DIRECCION === "vertical") fila += i;
else if (DIRECCION === "diagonalDerecha") {
fila += i;
col += i;
} else {
fila += i;
col -= i;
}

if (fila < 0 || fila >= LADO || col < 0 || col >= LADO) {
palabraEntra = false;
break;
}

if (sopaDeLetras[fila][col] && sopaDeLetras[fila][col] !== PALABRA[i]) {
palabraEntra = false;
break;
}
}

if (!palabraEntra) continue;

for (let i = 0; i < PALABRA.length; i++) {
let fila = filaInicial;
let col = columnaInicial;
if (DIRECCION === "horizontal") col += i;
else if (DIRECCION === "vertical") fila += i;
else if (DIRECCION === "diagonalDerecha") {
fila += i;
col += i;
} else { 
fila += i;
col -= i;
}
sopaDeLetras[fila][col] = PALABRA.charAt(i);
}

ubicacionesPalabras.push({
palabra: PALABRA,
fila: filaInicial,
columna: columnaInicial,
direccion: DIRECCION.replace(/([A-Z])/g, ' $1').toLowerCase().replace(/^./, str => str.toUpperCase())
});

palabraAgregada = true;
}
}

const LETRAS_POSIBLES = `ABCDEFGHIJKLMNÑOPQRSTUVWXYZ`;
const numerosUni = [...Array(LADO).keys()];
let sopaNube = " " + numerosUni.join(" ") + "\n";

for (let i = 0; i < LADO; i++) {
let fila = numerosUni[i] + " ";
for (let j = 0; j < LADO; j++) {
if (!sopaDeLetras[i][j]) sopaDeLetras[i][j] = LETRAS_POSIBLES.charAt(Math.floor(Math.random() * LETRAS_POSIBLES.length));
fila += sopaDeLetras[i][j] + " ";
}
fila += " ";
sopaNube += fila + "\n";
}

data.matriz = sopaDeLetras;
data.sopaNube = sopaNube;
data.ubicacionesPalabras = ubicacionesPalabras;
data.imgbuff = await cellBordImageCreate(sopaDeLetras, LADO);

return data;
}

export function generarSopaDeLetrasEJEM(palabra, LADO) {
let sopa = Array.from({ length: LADO }, () => Array(LADO).fill(null));

for (let i = 0; i < palabra.length && i < LADO; i++) {
sopa[0][i] = palabra[i];
}

const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
for (let i = 0; i < LADO; i++) {
for (let j = 0; j < LADO; j++) {
if (!sopa[i][j]) {
sopa[i][j] = letras[Math.floor(Math.random() * letras.length)];
}
}
}

return sopa;
}
