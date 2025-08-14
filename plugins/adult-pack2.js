import { delay } from '../lib/functions.js'
import { packgirl } from '../src/enlaces.js'
import fetch from 'node-fetch'
let handler = async (m, {conn, command, chatdb, db, userdb, senderJid}) => {
if (!chatdb.modohorny && m.isGroup) {return conn.sendWritingText(m.chat, '*[ ⚠️ ] LOS COMANDOS +18 ESTAN DESACTIVADOS EN ESTE GRUPO, SI ES ADMINISTRADOR DE ESTE GRUPO Y DESEA ACTIVARLOS ESCRIBA #enable modohorny*', m)
} else {
let url = packgirl[Math.floor(Math.random() * packgirl.length)]
let resp = '*_🥵 Pack2 🥵_*'
let q = await conn.sendMessage(m.chat, { image: {url: url}, caption: resp.trim(), mentions: conn.parseMention(resp), viewOnce: true }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
await delay(1 * 2000)
return conn.sendWritingText(m.chat, resp, userdb, q)
}
}
handler.help = ['pack2']
handler.tags = ['internet']
handler.command = /^(pack2)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
