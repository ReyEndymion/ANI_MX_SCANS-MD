import { WAMessageStubType } from '@whiskeysockets/baileys'
import path, {join} from 'path'

export async function before(m, { conn, groupMetadata }) {
if (!m.isGroup) return
let chats = global.db.data.bot[conn.user.jid].chats || {}
let chat = chats.groups[m.chat] || {}
if (!m.messageStubType || !m.isGroup || chat.isBanned) return

let sender = m.sender.split`@`[0]
let user = `@${sender}`
let who = m.messageStubParameters[0]
//let whoUser = `@${who.split`@`[0]}`
let contact, parti
if (m.sender.endsWith('@g.us')) {
parti = m.messageStubParameters[0]
contact = `${m.messageStubParameters}`.split`@`[0]
} else {
parti = m.sender
contact = sender
}
let fkontak = { key: { participants: parti, remoteJid: await conn.getName(m.chat), fromMe: false, id: "" }, message: { contactMessage: { vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${contact}:${contact}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, participant: parti }
if (chat.detect && (m.messageStubType === 21 || m.messageStubType === 22 || m.messageStubType === 23 || m.messageStubType === 24 || m.messageStubType === 25 || m.messageStubType === 26 || m.messageStubType === 29 || m.messageStubType === 30 || m.messageStubType === 72 || m.messageStubType === 123)) {
if (m.messageStubType === 21) {
return conn.sendWritingText(m.chat, `${user} Ha cambiado el nombre del grupo a:\n*${m.messageStubParameters[0]}*`, fkontak)
}
if (m.messageStubType === 22) {
return conn.sendWritingText(m.chat, `${user} Ha cambiado la foto del grupo`, fkontak)
} 
if (chat.detect && m.messageStubType === 22) {
return conn.sendWritingText(m.chat, `${user} Ha cambiado la foto del grupo`, fkontak)
}
if (chat.detect && m.messageStubType === 23) {
return conn.sendWritingText(m.chat, `${user} cambio el enlace del grupo\nAhora hay un nuevo enlace del grupo!!\n\n`, fkontak)
}
if (chat.detect && m.messageStubType === 24) {
return conn.sendWritingText(m.chat, `${user} Ha cambiado la descripcion del grupo, ahora dice:\n\n${m.messageStubParameters[0]}`, fkontak)
}
if (chat.detect && m.messageStubType === 25) {
return conn.sendWritingText(m.chat, `🔒 ${user} AHORA *${m.messageStubParameters[0] === 'on' ? 'SOLO ADMINS' : 'TODOS'}* PUEDEN EDITAR LAS INFORMACION DEL GRUPO.`, fkontak)
}
if (m.messageStubType === 26) {
return conn.sendWritingText(m.chat, `🔓 ${user} EL GRUPO *${m.messageStubParameters[0] === 'on' ? 'ESTA CERRADO' : 'ESTA ABIERTO'}*\n ${m.messageStubParameters[0] === 'on' ? 'SOLO ADMINS' : 'TODOS'} PUEDEN ENVIAR MENSAJES.`, fkontak)
}
if (chat.detect && m.messageStubType === 29) {
return conn.sendWritingText(m.chat, `AHORA ES ADMIN EN ESTE GRUPO @${m.messageStubParameters[0].split`@`[0]}\n\n🌎🫵ACCIÓN REALIZADA POR: ${user}`, fkontak)
}
if (chat.detect && m.messageStubType === 30) {
return conn.sendWritingText(m.chat, `DEJA DE SER ADMIN EN ESTE GRUPO @${m.messageStubParameters[0].split`@`[0]}\n\n🌎🫵ACCION REALIZADA POR: ${user}`, fkontak)
}
if (chat.detect && m.messageStubType === 72) {
return conn.sendWritingText(m.chat, `${user} CAMBIO LAS DURACIÓN DEL LOS MENSAJE TEMPORALES A *@${m.messageStubParameters[0]}*`, fkontak)
}
if (chat.detect && m.messageStubType === 123) {
return conn.sendWritingText(m.chat, `${user} *DESACTIVÓ* LOS MENSAJE TEMPORALES..`, fkontak)
}
}
//if (chat.detect && m.messageStubType === 172) {  messageStubType: 172,  messageStubParameters: [ '59168557412@s.whatsapp.net', 'created', invite_link' ],  type: 'GROUP_MEMBERSHIP_JOIN_APPROVAL_REQUEST_NON_ADMIN_ADD'


if ((m.messageStubType == 27 || m.messageStubType == 28 || m.messageStubType ==32) && chat.welcome) {
//let groupMetadata = (await conn.groupMetadata(m.chat)) || (conn.chats[m.chat] || {}).metadata;
let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => null) || join(media, 'pictures/sinFoto.png');
if (m.messageStubType == 27 && chat.welcome) {
let inv = /\d+@g.us/.test(m.sender) ? 'DESDE EL ENLACE DE INVITACION SE' : user;
let welcomeUsers = '';
for (let param of m.messageStubParameters) {
const user = param.endsWith(userID) ? param.split('@')[0] : param.split(`:`)[0]
chat.users[user]
global.db.write()
welcomeUsers += `@${user}, `;
}
welcomeUsers = welcomeUsers.slice(0, -2); // Eliminar la coma extra al final

let sWelcome = chat.sWelcome.replace('@user', `${welcomeUsers}`).replace('@group', `${await conn.getName(m.chat)}`).replace('@desc', `${groupMetadata.desc?.toString() || '*SIN DESCRIPCION*'}`)
let welcome = `${inv} AÑADIO A ${welcomeUsers}\n\n*╔══════════════*\n*╟❧ ${await conn.getName(m.chat)}*\n*╠══════════════*\n*╟❧ @${m.messageStubParameters[0].split`@`[0]}*\n*╟❧ BIENVENIDO/A* \n*║*\n*╟❧ DESCRIPCIÓN DEL GRUPO:*\n*╟❧* ${groupMetadata.desc?.toString() || '*SIN DESCRIPCION*'} \n*║*\n*╟❧ DISFRUTA TU ESTANCIA!!*\n*╚══════════════*`
const resp = sWelcome !== '' ? sWelcome : welcome
console.log('chatUpdateCheck: ', resp)
return conn.sendWritingImage(m.chat, pp, resp, fkontak)
}
if (m.messageStubType == 28 && chat.welcome) {
delete chat.users[m.messageStubParameters[0]]
global.db.write()
return conn.sendWritingImage(m.chat, pp, `╔══════════════*\n*║〘 *EXPULSADO* 〙*\n*╠══════════════*\n║*_☠ ${user} ELIMINO A @${m.messageStubParameters[0].split`@`[0]}, si lo Sacaron tendran sus motivos_*\n║*_Si no regresa..._*\n║ *_Nadie l@ va a extrañar 😇👍🏼_*\n*╚══════════════*`, fkontak)
}
if (m.messageStubType ==32 && chat.welcome) {
delete chat.users[m.messageStubParameters[0]]
global.db.write()
return conn.sendWritingImage(m.chat, pp, `╔══════════════*\n*║〘 *ADIÓS*〙*\n*╠══════════════*\n║*_Se fue @${m.messageStubParameters[0].split`@`[0]} del Grupo_*\n║*_Tal vez alguien si lo extrañe o nada mas vino a mirar..._*\n║ *_Esperamos que le vaya bien 😇👍🏼_*\n*╚══════════════*`, fkontak)
}
}
}