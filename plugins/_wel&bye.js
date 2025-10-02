let handler = async (m, {conn, text, usedPrefix, command, customPrefix, db, userdb, senderJid}) => {
const { media, info } = await import('../config.js');
const { default: path } = await import('path');
const { default: fs } = await import('fs')

if (!m.isGroup) return
let stikerwelgc = path.join(media, "stickers/welgc.webp")
let stikerbyegc = path.join(media, "stickers/byegc.webp")
const metadatos = {packname: info.packname, wm: info.nanipe}
if (command == 'welcomegc') {
return conn.sendSticker(m.chat, stikerwelgc, metadatos, m)
}
if (command == 'byegc') {
return conn.sendSticker(m.chat, stikerbyegc, metadatos, m)
}

}
handler.command = ['welcomegc', 'byegc']
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
