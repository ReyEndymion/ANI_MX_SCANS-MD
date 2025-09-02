import path, { join } from 'path'
import fs from 'fs'
import { media } from '../config.js'
let handler = async (m, {conn, isOwner, usersdb, db, userdb, senderJid}) => {
let adv = Object.entries(usersdb).filter(user => user[1].warn)
let imagewarn = fs.readFileSync(join(media, 'pictures/warn.jpg'))
let caption = `⚠️ USUARIOS ADVERTIDOS\n 
*╔═══════════════════·•*
║ *Total : ${adv.length}\n Usuarios* ${adv ? '\n' + adv.map(([jid, user], i) => `
║
║ 1.- ${isOwner ? '@' + jid.split`@`[0] : jid} *(${user.warn}/3)*\n║\n║ - - - - - - - - -`.trim()).join('\n') : ''}
*╚═══════════════════·•*`
return conn.sendImageWriting(m.chat, imagewarn, caption, m )
}
handler.command = /^(listwarn)$/i 
handler.group = true
handler.admin = true
handler.help = [];
handler.tags = [];
handler.menu = [
{title:"💎 LISTA DE ADVERTENCIAS", description: "muestra la lista de advertencias de los usuarios usando #listwarn", id: `listwarn`}
];
handler.type = "gadmin";
handler.disabled = false;

export default handler
