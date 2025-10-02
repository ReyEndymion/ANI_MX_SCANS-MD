import fs from 'fs'
import similarity from 'similarity'
const data = {}
let handler = async (m, {conn, usedPrefix, db, userdb, senderJid, objs}) => {
let timeout = 60000
let poin = 500
const path = await import('path')
const {raizPath} = await import('../config.js')

let id = m.chat
if (id in data) {
let resp = `Todavía hay acertijos sin responder en este chat`
data.before = false
return conn.sendWritingText(m.chat, resp, userdb, data[id][0]);
throw false
}
const jsonAcertijo = path.join(raizPath, `src/JSON/ANI-game-acertijo.json`)
let tekateki = JSON.parse(fs.readFileSync(jsonAcertijo))
let json = tekateki[Math.floor(Math.random() * tekateki.length)]
let _clue = json.response
let clue = _clue.replace(/[A-Za-z]/g, '_')
let caption = `
ⷮ *${json.question}*\n\nPista: ${clue}\n
*• Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
*• Bono:* +${poin} Exp
`.trim()

let resp = `Se acabó el tiempo!\n*Respuesta:* ${json.response}`
data[id] = [
await conn.sendWritingText(m.chat, caption, userdb, m), json, 
poin,
setTimeout(async () => {
if (data[id]) {
await conn.sendWritingText(m.chat, resp, userdb, data[id][0]);
delete data[id]
}
}, timeout)]
}
handler.before = async function before(m, {conn, userdb, senderJid}) {
const threshold = 0.72
let id = m.chat
const gamestart = Object.values(data)
if (!(id in data)) { 
const quoted = m.quoted
let quotedText = quoted?.text
const isAcertijoBot = quoted?.fromMe && /^ⷮ/i.test(quotedText)
if (isAcertijoBot && !m.fromMe ) {
let resp = 'Ese acertijo ya ha terminado!'
return conn.sendWritingText(m.chat, resp, userdb, m);
}
return
}
console.log('acertijo: ', gamestart)
if (m.quoted?.id == data[id][0].id) {
let json = JSON.parse(JSON.stringify(data[id][1]))
let userResponse = m.text.toLowerCase();
if (userResponse.includes(json.response.toLowerCase().trim())) {
userdb.exp += data[id][2]
let resp = `*Respuesta correcta!*\n+${data[id][2]} Exp`
clearTimeout(data[id][3])
delete data[id]
return conn.sendWritingText(m.chat, resp, userdb, m );
} else if (similarity(userResponse, json.response.toLowerCase().trim()) >= threshold) {
let resp = `Casi lo logras!`
await conn.sendWritingText(m.chat, resp, userdb, m);
} else {
let resp = 'Respuesta incorrecta!'
await conn.sendWritingText(m.chat, resp, userdb, m);
}
}
}
handler.help = ['acertijo']
handler.tags = ['game']
handler.command = /^(acertijo|acert|pregunta|adivinanza|tekateki)$/i
handler.menu = [
{title: "🎖️ ADIVINA EL ACERTIJO", description: "Adivina el acertijo que se te presenta", id: `acertijo`},
];
handler.type = "juegos";
handler.disabled = false;
export default handler
