import { delay } from '../lib/functions.js'
import { pack } from '../src/enlaces.js'
let handler = async (m, {conn, command, chatdb, db, userdb, senderJid}) => {
if (!chatdb.modohorny && m.isGroup) { 
let resp = '*[ ⚠️ ] LOS COMANDOS +18 ESTAN DESACTIVADOS EN ESTE GRUPO, SI ES ADMINISTRADOR DE ESTE GRUPO Y DESEA ACTIVARLOS ESCRIBA #enable modohorny*'
return await conn.sendWritingText(m.chat, resp, m );
}
let url = pack[Math.floor(Math.random() * pack.length)]
let resp = '*_🥵 Pack 🥵_*'
let q = await conn.sendMessage(m.chat, { image: {url: url}, caption: resp.trim(), mentions: conn.parseMention(resp), viewOnce: true }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
await delay(1 * 2000)
return conn.sendWritingText(m.chat, resp, userdb, q)
}
handler.help = ['pack']
handler.tags = ['internet']
handler.command = /^(pack)$/i
handler.register = true
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
