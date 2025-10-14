import fetch from 'node-fetch'
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

//RPG
export function reward(user = {}) {
let rewards = {
reward: {
money: 400,
exp: 300,
trash: 150,
potion: 3,
rock: 2,
	joincount: 2,
wood: 3,
string: 2,
common: 2 * (user.dog && (user.dog > 2 ? 2 : user.dog) * 1.2 || 1),
uncoommon: [0, 0, 0, 1, 0].concat(
new Array(5 - (
(user.dog > 2 && user.dog < 6 && user.dog) || (user.dog > 5 && 5) || 2
)).fill(0)
),
mythic: [0, 0, 0, 0, 0, 1, 0, 0, 0].concat(
new Array(8 - (
(user.dog > 5 && user.dog < 8 && user.dog) || (user.dog > 7 && 8) || 3
)).fill(0)
),
legendary: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0].concat(
new Array(10 - (
(user.dog > 8 && user.dog) || 4
)).fill(0)
),
cat: [0, 1, 0, 0, 0],
centaur: [0, 1, 0, 0, 0],
dog: [0, 1, 0, 0, 0],
dragon: [0, 1, 0, 0, 0],
emerald: [0, 1, 0, 0, 0],
fox: [0, 1, 0, 0, 0],
griffin: [0, 1, 0, 0, 0],
horse: [0, 1, 0, 0, 0],
kyubi: [0, 1, 0, 0, 0],
lion: [0, 1, 0, 0, 0],
pet: [0, 1, 0, 0, 0],
phonix: [0, 1, 0, 0, 0],
rhinoceros: [0, 1, 0, 0, 0],
robo: [0, 1, 0, 0, 0],
wolf: [0, 1, 0, 0, 0],
iron: [0, 0, 0, 1, 0, 0],
gold: [0, 0, 0, 0, 0, 1, 0],
diamond: [0, 0, 0, 0, 0, 0, 1, 0].concat(
new Array(5 - (
(user.fox < 6 && user.fox) || (user.fox > 5 && 5) || 0
)).fill(0)
),
},
lost: {
health: 101 - user.cat * 4,
armordurability: (15 - user.armor) * 7
}
}
return rewards
}

export async function inventory(daily, weekly, monthly, adventure) {
return {
others: {
level: true,
limit: true,
health: true,
money: true,
exp: true
},
items: {
semillasdeuva: true,
semillasdemango: true,
semillasdeplatano: true,
semillasdemanzana: true,
semillasdenaranja: true,
potion: true,
trash: true,
wood: true,
rock: true,
string: true,
emerald: true,
diamond: true,
gold: true,
iron: true,
upgrader: true
},
durabi: {
sworddurability: true,
pickaxedurability: true,
fishingroddurability: true,
armordurability: true
},
tools: {
armor: {
'0': '❌',
'1': 'Leather Armor',
'2': 'Iron Armor',
'3': 'Gold Armor',
'4': 'Diamond Armor',
'5': 'Emerald Armor',
'6': 'Crystal Armor',
'7': 'Obsidian Armor',
'8': 'Netherite Armor',
'9': 'Wither Armor',
'10': 'Dragon Armor',
'11': 'Hacker Armor'
},
sword: {
'0': '❌',
'1': 'Wooden Sword',
'2': 'Stone Sword',
'3': 'Iron Sword',
'4': 'Gold Sword',
'5': 'Copper Sword',
'6': 'Diamond Sword',
'7': 'Emerald Sword',
'8': 'Obsidian Sword',
'9': 'Netherite Sword',
'10': 'Samurai Slayer Green Sword',
'11': 'Hacker Sword'
},
pickaxe: {
'0': '❌',
'1': 'Wooden Pickaxe',
'2': 'Stone Pickaxe',
'3': 'Iron Pickaxe',
'4': 'Gold Pickaxe',
'5': 'Copper Pickaxe',
'6': 'Diamond Pickaxe',
'7': 'Emerlad Pickaxe',
'8': 'Crystal Pickaxe',
'9': 'Obsidian Pickaxe',
'10': 'Netherite Pickaxe',
'11': 'Hacker Pickaxe'
},
fishingrod: true

},
crates: {
common: true,
uncoommon: true,
mythic: true,
pet: true,
legendary: true
},
pets: {
horse: 10,
gato: 10,
zorro: 10,
dog: 10,
robo: 10,
lion: 10,
rhinoceros: 10,
dragon: 10,
centauro: 10,
kyubi: 10,
griffin: 10,
phonix: 10,
wolf: 10
},
cooldowns: {
lastclaim: {
name: 'claim',
time: daily.cooldown
},
lastweekly: {
name: 'weekly',
time: weekly.cooldown
},
lastmonthly: {
name: 'monthly',
time: monthly.cooldown
},
lastadventure: {
name: 'adventure',
time: adventure.cooldown
}
}
}
}

export async function worldbank(alpha2, maxRetries = 3) {
console.log('worldbank: ', alpha2)
let attempt = 0
while (attempt < maxRetries) {
try {
const res = await fetch(`https://api.worldbank.org/v2/country/${alpha2}?format=json`)
const data = await res.json()

if (Array.isArray(data) && data[0]?.message) {
throw new Error("Respuesta inválida de la API del World Bank")
}

return data

} catch (err) {
attempt++
if (attempt >= maxRetries) {
throw new Error(`Falló al obtener datos de World Bank después de ${maxRetries} intentos: ${err.message}`)
}
await new Promise(r => setTimeout(r, 1000))
}
}
}

export async function itemsBuySell(properBuyCommand, properSellCommand, userdb) {
const {pickRandom} = await import('./functions.js')
return {
[properBuyCommand]: {
exp: { eleksirb: 3 },
limit: { money: 400 },
diamond: { berlian: 5 },
joincount: { limit: 15 },
emerald: { emasbatang: 5 },
berlian: { kyubi: 25 },
kyubi: { trash: 15 },
gold: {diamond: 35 },
money: { kaleng: 2 },
tiketcoin: { joincount: 3 },
stamina: { potion: 2 },

potion: { money: 550 },
aqua: { botol: 2 },
trash: { eleksirb: 5 },
wood: { string: 5 },
rock: { kardus: 6 },
batu: { coal: 25 },
string: { kaleng: 4 },
iron: { kyubi: 20 },
coal: { trash: 20 },
botol: { wood: 4 },
kaleng: { potion: 2 },
kardus: { trash: 20 },

eleksirb: { healtmonster: 2},
emasbatang: { kayu: 30},
emasbiasa: { diamond: 18 },
rubah: { berlian: 40 },
sampah: { trash: 70 },
serigala: { kaleng: 125 },
kayu: { wood: 40 },
sword: { gold: 2 },
umpan: { aqua: 2 },
healtmonster: { kyubi: 19 },
pancingan: { trash: userdb.pancingan == 0 ? 5 : '' || userdb.pancingan == 1 ? 10 : '' || userdb.pancingan == 2 ? 15 : '' || userdb.pancingan == 3 ? 20 : '' || userdb.pancingan >= 4 ? 25 : '' },
emas: { berlian: 20 },
pancing: { tiketcoin: userdb.pancing == 0 ? 1 : '' || userdb.pancing == 1 ? 2 : '' || userdb.pancing == 2 ? 3 : '' || userdb.pancing == 3 ? 4 : '' || userdb.pancing >= 4 ? 7 : '' },

common: { aqua: 40 },
uncoommon: { kyubi: 55 },
mythic: { tiketcoin: 17 },
pet: { kayu: 45 },
gardenboxs: { healtmonster: 25 },
legendary: { emerald: 75 },

anggur: { emerald: 3 },
apel: { emerald: 3 },
jeruk: { emerald: 3 },
mangga: { emerald: 3 },
pisang: { emerald: 3 },

semillasdeuva: { aqua: 15 },
semillasdemanzana: { aqua: 15 },
semillasdenaranja: { aqua: 15 },
semillasdemango: { aqua: 15 },
semillasdeplatano: { aqua: 15 },

centauro: { limit:45 },
griffin: { limit: 55 },
kucing: { limit: 70 },
naga: { limit: 85 },
zorro: { limit: 100 },
kuda: { limit: 125 },
phonix: { limit: 140 },
wolf: { limit: 155 },

petFood: { tiketcoin: 4 },
makanancentaur: { tiketcoin: 6 },
makanangriffin: { tiketcoin: 8 },
makanankyubi: { tiketcoin: 10 },
makanannaga: { tiketcoin: 12 },
makananpet: { tiketcoin: 14 },
makananphonix: { tiketcoin: 16 }
},

[properSellCommand]: {
exp: { trash: pickRandom([1, 1, 2]) },
limit: { eleksirb: pickRandom([1, 4, 1]) },
diamond: { tiketcoin: pickRandom([1, 1, 2]) },
joincount: { emasbatang: pickRandom([1, 1, 2]) },
emerald: { money: pickRandom([10, 500, 1]) },
berlian: { sword: pickRandom([1, 1, 2]) },
kyubi: { aqua: pickRandom([1, 1, 2]) },
gold: { exp: pickRandom([1, 20, 800]) },
money: { aqua: pickRandom([1, 1, 2]) },
tiketcoin: { kyubi: pickRandom([1, 1, 2]) },

potion: { botol: pickRandom([1, 1, 3]) },
aqua: { kaleng: pickRandom([1, 1, 2]) },
trash: { umpan: pickRandom([1, 1, 2]) },
wood: { coal: pickRandom([1, 1, 2]) },
rock: { string: pickRandom([1, 1, 2]) },
batu: { joincount: pickRandom([1, 1, 2]) },
string: { kardus: pickRandom([1, 1, 2]) },
iron: { healtmonster: pickRandom([1, 1, 3]) },
coal: { money: pickRandom([1, 3, 30]) },
botol: { aqua: pickRandom([1, 1, 2]) },
kaleng: { batu: pickRandom([1, 1, 2]) },
kardus: { pancingan: pickRandom([1, 1, 2]) },

eleksirb: { rubah: pickRandom([1, 1, 2]) },
emasbatang: { emasbiasa: pickRandom([1, 1, 3]) },
emasbiasa: { potion: pickRandom([1, 1, 2]) },
rubah: { petFood: pickRandom([1, 1, 4]) },
sampah: { trash: pickRandom([1, 2, 20]) },
serigala: { petFood: pickRandom([1, 2, 22]) },
kayu: { wood: pickRandom([1, 3, 5]) },
sword: { berlian: pickRandom([1, 1, 2]) },
umpan: { exp: pickRandom([1, 5, 40, 0]) },
healtmonster: { diamond: pickRandom([1, 1, 2]) },
pancingan: { money: pickRandom([1, 10, 30]) },
emas: { berlian: pickRandom([1, 1, 3]) },

common: { limit: pickRandom([1, 3, 10]) },
uncoommon: { diamond: pickRandom([1, 4, 15]) },
mythic: { berlian: pickRandom([1, 3, 13]) },
pet: { money: pickRandom([1, 500, 1500]) },
gardenboxs: { gold: pickRandom([1, 1, 3]) },
legendary: { emerald: pickRandom([1, 4, 20]) },

anggur: { joincount: pickRandom([1, 1, 2]) },
apel: { tiketcoin: pickRandom([1, 1, 2]) },
jeruk: { berlian: pickRandom([1, 1, 2]) },
mangga: { gold: pickRandom([1, 1, 2]) },
pisang: { diamond: pickRandom([1, 1, 2]) },

semillasdeuva: { potion: pickRandom([1, 1, 2]) },
semillasdemanzana: { umpan: pickRandom([1, 1, 3]) },
semillasdenaranja: { healtmonster: pickRandom([1, 1, 2]) },
semillasdemango: { pancingan: pickRandom([1, 1, 3]) },
semillasdeplatano: { wood: pickRandom([1, 2, 4]) },

centauro: { anggur: pickRandom([1, 3, 5]) },
griffin: { apel: pickRandom([1, 2, 4]) },
kucing: { jeruk: pickRandom([1, 3, 6]) },
naga: { mangga: pickRandom([1, 4, 8]) },
zorro: { pisang: pickRandom([1, 5, 9]) },
kuda: { anggur: pickRandom([1, 6, 10]) },
phonix: { apel: pickRandom([1, 7, 12]) },
wolf: { jeruk: pickRandom([1, 8, 15]) },

petFood: { money: pickRandom([1, 400, 1400]) },
makanancentaur: { diamond: pickRandom([1, 1, 2]) },
makanangriffin: { diamond: pickRandom([1, 1, 3]) },
makanankyubi: { diamond: pickRandom([1, 2, 4]) },
makanannaga: { diamond: pickRandom([1, 2, 4]) },
makananpet: { diamond: pickRandom([1, 3, 5]) },
makananphonix: { diamond: pickRandom([1, 3, 5]) },
}
} 

}