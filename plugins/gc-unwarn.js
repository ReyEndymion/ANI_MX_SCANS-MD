import path, { join } from 'path'
let { default: fetch } = await import('node-fetch');
let { default: Jimp } = await import('jimp');
import fs from 'fs'
let handler = async (m, {conn, text, command, usedPrefix, db, userdb, senderJid}) => {
let resp, imagen, q, who
if (q == undefined) {q = m}
let pp = fs.readFileSync(join(media, 'pictures/warn.jpg'))
if (m.isGroup) {who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
} else {who = m.chat}
let user = db.data.bot[conn.user.jid].users[who]
let bot = db.data.bot[conn.user.jid].settings || {}
if (!who) {
resp = `*[❗] Etiquete a una persona o responda a un mensaje del grupo*\n\n*—◉ Ejemplo:*\n*${usedPrefix + command} @${global.suittag}*`
} else {
user.warn -= 1
resp = `${user.warn == 1 ? `*@${who.split`@`[0]}*` : `♻️ *@${who.split`@`[0]}*`} SE TE QUITO UNA ADVERTENCIA\n\n*ADVERTENCIAS:*\n⚠️ *Antes: ${user.warn + 1}/3*\n⚠️ *Ahora: ${user.warn}/3*\n\n${info.nanie}\n\n📋 LIST𝚆ARN 📋\n => *${usedPrefix}listwarn*`
imagen = pp
}

if (resp && imagen) {
return conn.sendMessage(m.chat, {image: imagen, caption: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} else {
return conn.sendWritingText(m.chat, resp, userdb, m)
}
}
handler.command = /^(unwarn|delwarn|deladvertir|deladvertencia|delwarning)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
