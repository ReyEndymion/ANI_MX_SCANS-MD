import path, { join } from 'path'
import fetch from 'node-fetch';
import Jimp from 'jimp';
import fs from 'fs'
let handler = async (m, { conn, text, command, usedPrefix }) => {
    let resp, imagen, q
    if (q == undefined ) {q = m}
let pp = fs.readFileSync(join(media, 'pictures/warn.jpg'))
let who
if (m.isGroup) {who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
} else {who = m.chat}
let user = global.db.data.bot[conn.user.jid].users[who]
let bot = global.db.data.bot[conn.user.jid].settings || {}
if (conn.user.jid == who) { 
resp = 'No puedo advertirme a mi mismo'
}
if (!who)  {
resp = `*[❗] ETIQUETE A UNA PERSONA O RESPONDA A UN MENSAJE DEL GRUPO PARA ADVERTIR AL USUARIO*\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} @${global.animxscans[0][0]}*`
}
if (user.warn += 1 ) {
resp = `${user.warn == 1 ? `*@${who.split`@`[0]}*` : `*@${who.split`@`[0]}*`} RECIBIO UNA ADVERTENCIA EN ESTE GRUPO!\n\n*ADVERTENCIAS ${user.warn}/3*\n\n${wm}\n\n📋 LISTA DE ADVERTENCIAS 📋\n => *${usedPrefix}listwarn*`
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
    q = await conn.sendMessage(m.chat, { image: pp, caption: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} else {
    return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: q, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
}
}
handler.command = /^(advertir|advertencia|warn|warning)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
