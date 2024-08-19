const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
import fetch from 'node-fetch'
let handler = async (m, { conn, command }) => {
const bot = global.db.data.bot[conn.user.jid]
const chats = bot.chats
const privs = chats.privs
const groups = chats.groups
const chat = m.isGroup ? groups[m.chat] : privs[m.chat]
let resp = ''
if (!chat.modohorny && m.isGroup) {
resp = '*[ ⚠️ ] LOS COMANDOS +18 ESTAN DESACTIVADOS EN ESTE GRUPO, SI ES ADMINISTRADOR DE ESTE GRUPO Y DESEA ACTIVARLOS ESCRIBA #enable modohorny*'
return conn.sendWritingText(m.chat, resp, q)
} else {
let url = packmen[Math.floor(Math.random() * packmen.length)]
let resp = '*_🥵 Pack3 🥵_*'
let q = await conn.sendMessage(m.chat, { image: {url: url}, caption: resp.trim(), mentions: conn.parseMention(resp), viewOnce: true }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
await delay(1 * 2000)
return conn.sendWritingText(m.chat, resp, q)
}
}
handler.help = ['pack3']
handler.tags = ['internet']
handler.command = /^(pack3)$/i
export default handler

global.packmen = [
"https://i.imgur.com/TK0qLAu.jpg",
"https://i.imgur.com/q8lKT40.jpg",
"https://i.imgur.com/OwWdL9u.jpg",
"https://i.imgur.com/Er7WiQo.jpg",
"https://i.imgur.com/u4y0q4P.jpg",
"https://i.imgur.com/y8y4PPr.jpg",
"https://i.imgur.com/qgfLlRY.jpg",
"https://i.imgur.com/irgyUTD.jpg",
"https://i.imgur.com/uXrqfBl.jpg",
"https://i.imgur.com/lgXjetf.jpg",
"https://i.imgur.com/81QLh8s.jpg",
"https://i.imgur.com/R3AlYe1.jpg",
"https://i.imgur.com/a2Myr3F.jpg",
"https://i.imgur.com/Wp9cgGw.jpg",
"https://i.imgur.com/ggKUnxt.jpg",
"https://i.imgur.com/eCJNWBl.jpg",
"https://i.imgur.com/6lcrBQB.jpg",
"https://i.imgur.com/eSSbXJ1.jpg",
"https://i.imgur.com/tNyvzyO.jpg"
]
