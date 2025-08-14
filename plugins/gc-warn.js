import path, { join } from 'path'
let { default: fetch } = await import('node-fetch');
let { default: Jimp } = await import('jimp');
import fs from 'fs'
let handler = async (m, {conn, text, command, usedPrefix, db, userdb, senderJid}) => {
let resp, imagen, q
if (q == undefined ) {q = m}
let pp = fs.readFileSync(join(media, 'pictures/warn.jpg'))
let who
if (m.isGroup) {who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
} else {who = m.chat}
let user = db.data.bot[conn.user.jid].users[who]
let bot = db.data.bot[conn.user.jid].settings || {}
if (conn.user.jid == who) { 
resp = 'No puedo advertirme a mi mismo'
}
if (!who) {
resp = `*[❗] ETIQUETE A UNA PERSONA O RESPONDA A UN MENSAJE DEL GRUPO PARA ADVERTIR AL USUARIO*\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} @${global.animxscans[0][0]}*`
}
if (user.warn += 1 ) {
resp = `${user.warn == 1 ? `*@${who.split`@`[0]}*` : `*@${who.split`@`[0]}*`} RECIBIO UNA ADVERTENCIA EN ESTE GRUPO!\n\n*ADVERTENCIAS ${user.warn}/3*\n\n${info.nanie}\n\n📋 LISTA DE ADVERTENCIAS 📋\n => *${usedPrefix}listwarn*`
imagen = pp
} 
if (user.warn >= 3) {
if (!bot.restrict) {
let resp = '*[❗INFO❗] EL PROPIETARIO DEL BOT NO TIENE HABILITADO LAS RESTRICCIONES (#enable restrict) CONTACTE CON EL PARA QUE LO HABILITE*'
}
if (user.warn = 0) {
resp = `TE LO ADVERTI VARIAS VECES!!\n*@${who.split`@`[0]}* SUPERASTE LAS *3* ADVERTENCIAS, AHORA SERAS ELIMINADO/A 👽`
user.banned = true
return conn.groupParticipantsUpdate(m.chat, [who], 'remove') 
}
} 

if (resp && imagen) {
q = await conn.sendMessage(m.chat, { image: pp, caption: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} else {
return conn.sendWritingText(m.chat, resp, userdb, q)
}
}
handler.command = /^(advertir|advertencia|warn|warning)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
