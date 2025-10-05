import path, { join } from 'path'
import fs from 'fs'
let handler = async (m, {conn, text, command, isOwner, usedPrefix, botdb, usersdb, userdb, senderJid}) => {
let { default: fetch } = await import('node-fetch');
let { Jimp } = await import('jimp');
if (!m.isGroup) return !1
const { temp, media, userID, lid } = await import('../config.js')
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
else who = m.chat
let user = usersdb[who]
let settings = botdb.settings || {}
let pp = fs.readFileSync(join(media, 'pictures/warn.jpg'))
if (/^(advert(ir|encia)|warn(ing)?)$/i.test(command)) {
if (!who) {
let warntext = `*[❗] ETIQUETE A UNA PERSONA O RESPONDA A UN MENSAJE DEL GRUPO PARA ADVERTIR AL USUARIO*\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} @${conn.user.jid.split('@')[0]}*`
return conn.sendWritingText(m.chat, warntext, userdb, m)
}
if (conn.user.jid == who) { 
let resp = 'No puedo advertirme a mi mismo'
return conn.sendWritingText(m.chat, resp, userdb, m)
}
user.warn += 1 
{
let what = `${user.warn == 1 ? `*@${who.split`@`[0]}*` : `*@${who.split`@`[0]}*`} RECIBIO UNA ADVERTENCIA EN ESTE GRUPO!\n\n*ADVERTENCIAS ${user.warn}/3*\n\n> ${info.nanipe}\n\n📋 LISTA DE ADVERTENCIAS 📋\n => *${usedPrefix}listwarn*`

await conn.sendImageWriting(m.chat, pp, what, userdb, m);
} 
if (user.warn >= 3) {
if (!settings.restrict) {
let resp = '*[❗INFO❗] EL PROPIETARIO DEL BOT NO TIENE HABILITADO LAS RESTRICCIONES (#enable restrict) CONTACTE CON EL PARA QUE LO HABILITE*'
return conn.sendWritingText(m.chat, resp, userdb, m)
}
user.warn = 0
let kill = `TE LO ADVERTI VARIAS VECES!!\n*@${who.split`@`[0]}* SUPERASTE LAS *3* ADVERTENCIAS, AHORA SERAS ELIMINADO/A 👽`
await conn.sendWritingText(m.chat, kill, userdb, m)
await conn.groupParticipantsUpdate(m.chat, [who], 'remove') 
}
}
if (/^((un|del)(advert(ir|encia)|warn(ing)?))$/i.test(command)) {
let warntext = `*[❗] Etiquete a una persona o responda a un mensaje del grupo*\n\n*—◉ Ejemplo:*\n*${usedPrefix + command} @${m.sender.split('@')[0]}*`
if (!who) {
return conn.sendWritingText(m.chat, warntext, userdb, m)
}
user.warn -= 1
let resp = `${user.warn == 1 ? `*@${who.split`@`[0]}*` : `♻️ *@${who.split`@`[0]}*`} SE TE QUITO UNA ADVERTENCIA\n\n*ADVERTENCIAS:*\n⚠️ *Antes: ${user.warn + 1}/3*\n⚠️ *Ahora: ${user.warn}/3*\n\n${info.nanip}\n\n📋 LISTWARN 📋\n => *${usedPrefix}listwarn*`
return conn.sendImageWriting(m.chat, pp, resp, userdb, m);
}
if (/^(listwarn(ing)?)$/i.test(command)) {
let adv = Object.entries(usersdb).filter(user => user[1].warn)
let caption = `⚠️ USUARIOS ADVERTIDOS\n 
*╔═══════════════════·•*
║ *Total : ${adv.length}\n Usuarios* ${adv ? '\n' + adv.map(([jid, user], i) => `
║
║ 1.- ${isOwner ? '@' + jid.split`@`[0] : jid} *(${user.warn}/3)*\n║\n║ - - - - - - - - -`.trim()).join('\n') : ''}
*╚═══════════════════·•*`
return conn.sendImageWriting(m.chat, pp, caption, m )
}
}
handler.command = /^((un|del|list)?(advert(ir|encia)|warn(ing)?))$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.help = [];
handler.tags = [];
handler.menu = [
{title:"💎 ADVERTIR A USUARIOS", description: "advierte a los usuarios del grupo usando #advertir <@tag> o respondiendo al mensaje", id: `advertir`},
{title:"💎 ELIMINAR ADVERTENCIA", description: "elimina una advertencia a un usuario usando #unwarn @tag", id: `unwarn`},
{title:"💎 LISTA DE ADVERTENCIAS", description: "muestra la lista de advertencias de los usuarios usando #listwarn", id: `listwarn`}
];
handler.type = "gadmin";

handler.disabled = false;

export default handler
