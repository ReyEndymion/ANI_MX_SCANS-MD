/* Created By https://github.com/unptoadrih15 || unificado en un solo plugin por https://github.com/ReyEndymion*/
///*
import fs from 'fs'
import similarity from 'similarity'
let data = {}
let handler = async (m, {conn, usedPrefix, command, db, userdb, senderJid, objs}) => {
let timeout = 60000
let poin = 1000
const path = await import('path')
const {raizPath} = await import('../config.js')
let id = m.chat
if (/^cancion|canción$/i.test(command)) {
if (id in data) {
let resp = 'Todavía hay canciones sin respuesta en este chat.'//, 
return conn.sendWritingText(m.chat, resp, userdb, data[id][0] );
}
const jsonCancion = path.join(raizPath, `src/JSON/game-cancion.json`)
let res = JSON.parse(fs.readFileSync(jsonCancion))
let json = res[Math.floor(Math.random() * res.length)]
let caption = `
ADIVINA EL TITULO DE LA CANCION
Tiempo ${(timeout / 1000).toFixed(2)} segundos
Escribe *${usedPrefix}pista* Para obtener una pista
Premio: ${poin} XP
RESPONDE A ESTE MENSAJE CON LAS RESPUESTAS!`.trim()
let msg = await conn.sendWritingText(m.chat, caption, userdb, m )
data[id] = [
msg,
await conn.sendAudio(m.chat, json.link_song, msg),
json, poin,
setTimeout(async () => {
if (data[id]) {
let resp = `Se acabó el tiempo!\nLa respuesta es ${json.name}`
await conn.sendWritingText(m.chat, resp, userdb, data[id][0]);
delete data[id]
}}, timeout)
]
}
if (/^insinuar|^hint|pista$/i.test(command)) {
if (!(id in data)) throw false
let json = data[id][2]
if (!json.name) {
throw new Error('La propiedad name no existe en este objeto')
}
let word = json.name
const mapRegex = [/[BCDEFGHJKLMNÑPQRSTVWXYZ]/g,/[AEIOU]/g,/[bcdfghjklmnñpqrstvwxyz]/g,/[aeiou]/g,]
//const randomCount = mapRegexRandom.getRandom().length

let randomCount = Math.floor(Math.random() * mapRegex.length) + 1 // de 1 a 4 tipos
console.log ('cancion: ', randomCount)
let selected = []

while (selected.length < randomCount) {
let r = mapRegex.getRandom()
if (!selected.includes(r)) selected.push(r)
}

let transform = word
for (let r of selected) {
transform = transform.replace(r, '_')
}//let transform = word.replace(mapRegexRandom, '_')
return conn.sendWritingText(m.chat, `${transform}`, userdb, m)

}
}
handler.help = ['tebaklagu']
handler.tags = ['game']
handler.command = /^cancion|canción|^insinuar|^hint|pista$/i
handler.menu = [
{title: "🎖️ ADIVINA LA CANCION", description: "Adivina el título de la canción que se reproduce", id: `cancion`},
{title: "🎖️ PISTA", description: "Muestra una pista de la canción que se reproduce", id: `pista`},
];
handler.type = "juegos";
handler.disabled = false;
handler.before = async function before(m, {conn, userdb}) {
const threshold = 0.72
let id = m.chat
//if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/^ⷮ/i.test(m.quoted.text)) return !0
//this.tebaklagu = this.tebaklagu ? this.tebaklagu : {}
if (!(id in data)) {
if (m.fromMe) return
const quoted = m.quoted
let quotedText = quoted?.text
const isAdivCanBot = quoted?.fromMe && /ADIVINA EL TITULO DE LA CANCION/i.test(quotedText)
if (isAdivCanBot) {
return conn.sendWritingText(m.chat, 'El juego ha terminado', userdb, m)
}
return
}
if (m.quoted?.id == data[id][0].id || m.quoted?.id === data[id][1].id ) {
if (m.fromMe) return
let json = JSON.parse(JSON.stringify(data[id][2]))
if (m.text.toLowerCase() == json.name.toLowerCase().trim()) {
userdb.exp += data[id][3]
conn.sendWritingText(m.chat, `✅Correcto!\n+${data[id][3]} XP`, userdb, m)
clearTimeout(data[id][3])
delete data[id]
} else if (similarity(m.text.toLowerCase(), json.name.toLowerCase().trim()) >= threshold) conn.sendWritingText(m.chat, `Casii!`, userdb, m)
else conn.sendWritingText(m.chat, `❌Incorrecto!`, userdb, m)
}
}
export default handler
