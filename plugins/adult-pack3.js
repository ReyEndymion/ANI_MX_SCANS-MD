import { delay } from '../lib/functions.js'
import { packmen } from '../src/enlaces.js'
import fetch from 'node-fetch'
let handler = async (m, {conn, command, db, userdb, senderJid}) => {
const bot = db.data.bot[conn.user.jid]
const chats = bot.chats
const privs = chats.privs
const groups = chats.groups
const chat = m.isGroup ? groups[m.chat] : privs[m.chat]
let resp = ''
if (!chat.modohorny && m.isGroup) {
resp = '*[ ⚠️ ] LOS COMANDOS +18 ESTAN DESACTIVADOS EN ESTE GRUPO, SI ES ADMINISTRADOR DE ESTE GRUPO Y DESEA ACTIVARLOS ESCRIBA #enable modohorny*'
return conn.sendWritingText(m.chat, resp, userdb, q)
} else {
let url = packmen[Math.floor(Math.random() * packmen.length)]
let resp = '*_🥵 Pack3 🥵_*'
let q = await conn.sendMessage(m.chat, { image: {url: url}, caption: resp.trim(), mentions: conn.parseMention(resp), viewOnce: true }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
await delay(1 * 2000)
return conn.sendWritingText(m.chat, resp, userdb, q)
}
}
handler.help = ['pack3']
handler.tags = ['internet']
handler.command = /^(pack3)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
