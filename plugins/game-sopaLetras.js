/**
 * Script creado por ChatGPT de la sesion de Rey Endymion
 *  Chat GPT te reta a que superes Esta sopa de letras
 */
const sopaLetras = {}
let handler = async (m, { conn, usersdb, args, usedPrefix, db, command, userdb }) => {
const {PALABRAS, levelSPMode} = await import('../lib/constants.js')
const {generarSopaDeLetras, generarSopaDeLetrasMultiple} = await import('../lib/functionsGames.js')
let id = m.chat
let user = m.sender
let nivel = 1, modo = 1
if (!usersdb[user].retoSP) {
usersdb[user].retoSP = {nivel, modo}
db.write()
} else {
nivel = usersdb[user].retoSP.nivel
modo = usersdb[user].retoSP.modo
usersdb[user].retoSP = {nivel, modo}
db.write()
}
if (args[0] && Number(args[0]) < modo) {
let disponibles = Object.keys(levelSPMode[nivel].modos).slice(modo - 1)
return m.reply(`⚠️ Ese modo ya está superado.\n\n📌 Modos disponibles ahora: ${disponibles.join(', ')}\nUsa ${usedPrefix+command} reset si quieres resetar tu avance`)
} else if (args[0] === 'reset') {
userdb.retoSP = {nivel: 1, modo: 1}
db.write()
return conn.sendWritingText(m.chat, `El nivel del jugador @${user.split('@')[0]} ha sido reseteado`, userdb, m)
}
let configNivel = levelSPMode[nivel]?.modos[modo]
const palabrasFiltradas = PALABRAS.filter(p => p.length >= configNivel.minLen && p.length <= configNivel.maxLen)

if (!configNivel) {
return m.reply(`❌ Ya superaste todos los modos disponibles.`)
}

let tableros = [];
if (!palabrasFiltradas.length) throw `No hay palabras que entren en el modo ${modo}`
let totalTableros = configNivel.tableros || 1;
let totalNecesarias = configNivel.palabras * totalTableros

if (palabrasFiltradas.length < totalNecesarias) {
throw m.reply(`⚠️ No hay suficientes palabras (${palabrasFiltradas.length}) para generar ${totalTableros} tableros de ${configNivel.palabras} palabras`)
}
let disponibles = [...palabrasFiltradas]
let palabrasNivel = [];

if (configNivel.palabras === 1) {
const PALABRA = palabrasFiltradas[Math.floor(Math.random() * palabrasFiltradas.length)];
palabrasNivel = [PALABRA];
tableros.push((await generarSopaDeLetras(PALABRA, configNivel.grid)));
} else {
for (let i = 0; i < totalTableros; i++) {
palabrasNivel = []
for (let i = 0; i < configNivel.palabras; i++) {
const idx = Math.floor(Math.random() * disponibles.length)
palabrasNivel.push(disponibles.splice(idx, 1)[0])
}
let tablero = await generarSopaDeLetrasMultiple(palabrasNivel, configNivel.grid)
tableros.push({imagen: tablero.imgbuff, palabras: palabrasNivel});
}
}

for (let t of tableros) {
await conn.sendImageWriting(m.chat, t.imagen, `
🧩 Nivel ${nivel} - Modo ${modo}
🔡 Palabras a encontrar: ${palabrasNivel.length}
📖 Lista: ${t.palabras.map(p=> `${p}`).join(', ')}
🕒 Tiempo: 3 minutos
📌 ${palabrasNivel.length > 1 ? 'Responde con las coordenadas iniciales separadas por comas De cada palabra separadas por un punto por palabra\nEjemplo:\n0,8.2,4' : 'Responde con las coordenadas iniciales separadas por comas\n Ejemplo:\n0,8'}
Usa ${usedPrefix+command} reset si quieres resetar tu avance 
`, userdb, m);
}

let gameSP = sopaLetras[id] = {reto: {}}
gameSP.reto = {
user: m.sender, nivel, modo, soluciones: (tableros.flatMap(t => t.ubicacionesPalabras ? t.ubicacionesPalabras.flatMap(u => `${u.fila},${u.columna}`) : `${t.fila},${t.columna}`) ),
tiempo: Date.now() + (3 * 60 * 1000)
}
}
handler.before = async (m, { conn, db, usersdb, userdb }) => {
const {PALABRAS, levelSPMode} = await import('../lib/constants.js')
let id = m.chat
let gameSP = sopaLetras[id]
if (!gameSP?.reto) return
let user = gameSP.reto.user
if (m.sender !== user) return
if (Date.now() > gameSP.reto.tiempo) {
delete gameSP.reto
return m.reply('⏰ Tiempo agotado. Intenta otra vez.')
}

const soluciones = gameSP.reto.soluciones.slice(); // copia
let coords = m.text.split('.').map(x => x.trim())
if (coords.length !== gameSP.reto.soluciones.length) {
return
}

let correcto = coords.every(c => {
const idx = soluciones.indexOf(c);
if (idx === -1) return false;
soluciones.splice(idx, 1);
return true;
});
if (correcto) {
const totalModos = Object.keys(levelSPMode[usersdb[user].retoSP.nivel].modos).length;
if (gameSP.reto.modo < totalModos) {
usersdb[user].retoSP.modo++
gameSP.reto.modo = usersdb[user].retoSP.modo
m.reply('✅ ¡Correcto! Avanzas al siguiente modo.')
} else { 
gameSP.reto.nivel++
usersdb[user].retoSP.nivel = gameSP.reto.nivel;
gameSP.reto.modo = 1
usersdb[user].retoSP.modo = gameSP.reto.modo
m.reply('✅ ¡Correcto! Avanzas al siguiente nivel.')
}
db.write()
delete gameSP.reto
} else {
m.reply('❌ Respuesta incorrecta, vuelve a intentarlo.')
}
}
handler.help = ['juegos']
handler.tags = ['games']
handler.command = /^sopaletras|gptsp$/i
handler.admin = false 
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler

