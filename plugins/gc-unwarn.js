import path, { join } from 'path'
import fetch from 'node-fetch';
import Jimp from 'jimp';
import fs from 'fs'
let handler = async (m, { conn, text, command, usedPrefix }) => {
let resp, imagen, q, who
if (q == undefined) {q = m}
let pp = fs.readFileSync(join(media, 'pictures/warn.jpg'))
if (m.isGroup) {who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
} else {who = m.chat}
let user = global.db.data.bot[conn.user.jid].users[who]
let bot = global.db.data.bot[conn.user.jid].settings || {}
if (!who) {
resp = `*[❗] Etiquete a una persona o responda a un mensaje del grupo*\n\n*—◉ Ejemplo:*\n*${usedPrefix + command} @${global.suittag}*`
} else {
user.warn -= 1
    resp = `${user.warn == 1 ? `*@${who.split`@`[0]}*` : `♻️ *@${who.split`@`[0]}*`} SE TE QUITO UNA ADVERTENCIA\n\n*ADVERTENCIAS:*\n⚠️ *Antes: ${user.warn + 1}/3*\n⚠️ *Ahora: ${user.warn}/3*\n\n${wm}\n\n📋 𝙻𝙸𝚂𝚃𝚆𝙰𝚁𝙽 📋\n => *${usedPrefix}listwarn*`
    imagen = pp
}
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;
    if (count % 10 === 0) {
      
    await conn.sendPresenceUpdate('composing' , m.chat);
    }
}
if (resp && imagen) {
return conn.sendMessage(m.chat, {image: imagen, caption: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} else {
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
}
}
handler.command = /^(unwarn|delwarn|deladvertir|deladvertencia|delwarning)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
