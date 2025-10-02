/* By https://github.com/GataNina-Li */
/*viewOnce by rey Endymion*/
import { owner, info, temp, newsletterID, sBroadCastID, groupID, media } from '../config.js'
import { lesbi as asupan } from '../src/enlaces.js'
import { pickRandom, delay, filterValidLinks } from '../lib/functions.js'
let handler = async (m, {conn, usedPrefix, command, chatdb, db, userdb, senderJid}) => {
if (!chatdb.modohorny && m.isGroup) return conn.sendWritingText(m.chat, '*[❗INFO❗] LOS COMANDOS +18 ESTAN DESACTIVADOS EN ESTE GRUPO, SI ES ADMIN Y DESEA ACTIVARLOS USE EL COMANDO #enable modohorny*', m)
let res = await pickRandom(asupan)

// Ejecuta la limpieza de la lista de enlaces
filterValidLinks(asupan).then((validLinks) => {
console.log("Enlaces accesibles:", validLinks);
});
conn.sendFile (m.chat, res, null, '*DISFRUTA DEL VIDEO 🥵*', m, null, {viewOnce: true})
await delay(1 * 10000)
//await conn.sendMessage(m.chat, { text: `*DISFRUTA DEL VIDEO 🥵*`, info.nanipe, [['🔄 SIGUIENTE 🔄', `/${command}`]], m)
}
handler.help = ['videoxxxlesbi']
handler.tags = ['random']
handler.command = /^(videoxxxlesbi|videolesbixxx|pornolesbivid|pornolesbianavid|pornolesbiv|pornolesbianav|Pornolesbivid|Pornolesbianavid|pornolesv|Pornolesv)$/i

handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
