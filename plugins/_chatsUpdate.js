
let isApproval = {};
export async function before(m, { conn, info, start, groupMetadata, participantFind, db, chatdb, userdb, senderJid, isAdmin, isBotAdmin, objs }) {
const { default: path } = await import('path');
const { userID, lid, groupID, media } = await import('../config.js');
const {inMstore, dbGroups} = objs
const {findJidInAllGroups} = await import('../lib/functions.js')
if (Object.entries(isApproval).length !== 0) {
const text = (m.message?.templateButtonReplyMessage?.selectedDisplayText || m.message?.listResponseMessage?.title || m.message?.interactiveResponseMessage?.body?.text || m.text || '').toLowerCase();
if (/^si$/.test(text) && isAdmin) {
await conn.groupRequestParticipantsUpdate(m.chat, [isApproval[m.chat].user], 'approve');
delete isApproval[m.chat];
} else if (/^no$/.test(text) && isAdmin) {
await conn.groupRequestParticipantsUpdate(m.chat, [isApproval[m.chat].user], 'reject');
delete isApproval[m.chat];
}
}

if (!m.messageStubType || !m.isGroup || chatdb.isBanned) return
const user = m.messageStubParameters[0].endsWith(lid) ? await findJidInAllGroups(conn, inMstore, dbGroups, m.messageStubParameters[0]) || await conn.lidToJidPromises(m.messageStubParameters[0], m.chat) : null
const messsageParams = !m.messageStubParameters[0].endsWith(lid) || m.messageStubParameters[0].endsWith(userID) ? m.messageStubParameters[0] : null
let who = senderJid.split`@`[0]
let sender = user ? user.split`@`[0] : who
let usertag = `@${sender}`
let whotag = `@${who}`
let contact, parti

if (chatdb.detect) {
let fkontak = { key: { participants: senderJid, remoteJid: m.chat, fromMe: false, id: '' }, message: { contactMessage: { vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${sender}:${sender}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, participant: senderJid}
if (m.messageStubType === 21) {
const resp = `${usertag} Ha cambiado el nombre del grupo a:\n*${m.messageStubParameters[0]}*`
return conn.sendWritingText(m.chat, resp, userdb, fkontak);
}
if (m.messageStubType === 22) {
const resp = `${usertag} Ha cambiado la foto del grupo`
return conn.sendWritingText(m.chat, resp, userdb, fkontak);
}
if (m.messageStubType === 23) {
const resp = `${usertag} cambio el enlace del grupo\nAhora hay un nuevo enlace del grupo!!\n\n`
return conn.sendWritingText(m.chat, resp, userdb, fkontak);
}
if (m.messageStubType === 24) {
const resp = `${usertag} Ha cambiado la descripcion del grupo, ahora dice:\n\n${m.messageStubParameters[0]}`
return conn.sendWritingText(m.chat, resp, userdb, fkontak);
}
if (m.messageStubType === 25) {
const resp = `🔒 ${usertag} AHORA *${m.messageStubParameters[0] === 'on' ? 'SOLO ADMINS' : 'TODOS'}* PUEDEN EDITAR LAS INFORMACION DEL GRUPO.*`
return conn.sendWritingText(m.chat, resp, userdb, fkontak);
}
if (m.messageStubType === 26) {
const resp = `🔓 ${usertag} EL GRUPO *${m.messageStubParameters[0] === 'on' ? 'ESTA CERRADO' : 'ESTA ABIERTO'}*\n ${m.messageStubParameters[0] === 'on' ? 'SOLO ADMINS' : 'TODOS'} PUEDEN ENVIAR MENSAJES.*`
return conn.sendWritingText(m.chat, resp, userdb, fkontak);
}
if (m.messageStubType === 29) {
const resp = `AHORA ES ADMIN EN ESTE GRUPO @${who.split`@`[0]}\n\n🌎🫵ACCIÓN REALIZADA POR: ${usertag}*`
return conn.sendWritingText(m.chat, resp, userdb, fkontak);
}
if (m.messageStubType === 30) {
const resp = `DEJA DE SER ADMIN EN ESTE GRUPO @${who.split`@`[0]}\n\n🌎🫵ACCION REALIZADA POR: ${usertag}`
return conn.sendWritingText(m.chat, resp, userdb, fkontak);
}
if (m.messageStubType === 72) {
const resp = `${usertag} CAMBIO LAS DURACIÓN DEL LOS MENSAJE TEMPORALES A *@${m.messageStubParameters[0]}*`
return conn.sendWritingText(m.chat, resp, userdb, fkontak);
}
if (m.messageStubType === 123) {
const resp = `${usertag} *DESACTIVÓ* LOS MENSAJE TEMPORALES..`
return conn.sendWritingText(m.chat, resp, userdb, fkontak);
}
}
if (m.messageStubType === 172 && isBotAdmin) {
if (m.messageStubParameters[1] === 'created' && (m.messageStubParameters[2] === 'linked_group_join' || m.messageStubParameters[2] === 'invite_link')) {
let resp = `Un usuario ${usertag} ha solicitado entrar al grupo.. ¿Desea que lo apruebe?`
const buttons = [['si', 'si'], ['no', 'no']]
if (start.buttons) {
const message = {
text: resp,
footer: info.nanie
}
await conn.sendButton(m.chat, message, null, buttons, userdb, null)
} else {
resp += `\nPara aprobar conteste con la palabra sí para rechazar conteste con la palabra no`
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
await conn.sendWritingText(m.chat, resp, userdb, null)
}
isApproval[m.chat] = {
buttons,
user
}
} else {
delete isApproval[m.chat]
}
}

let fkontak = { key: { participants: user, remoteJid: m.chat, fromMe: false, id: '' }, message: { contactMessage: { vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${sender}:${sender}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, participant: user}
if (chatdb.welcome) {
let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => null) || path.join(media, 'pictures/sinFoto.png');
if (m.messageStubType == 27) {
let inv = /\d+@g.us/.test(m.sender) ? 'DESDE EL ENLACE SE' : `${whotag}`;
let welcomeUsers = '';
for (let param of m.messageStubParameters) {
if (param.endsWith(lid)) param = await conn.lidToJidPromises(param, m.chat)
welcomeUsers += `@${param.split('@')[0]}, `;
chatdb.users[param]
db.write()
}
welcomeUsers = welcomeUsers.slice(0, -2);

let sWelcome = chatdb.sWelcome.replace('@user', `${welcomeUsers}`).replace('@group', `${await conn.getName(m.chat)}`).replace('@desc', `${groupMetadata.desc?.toString() || '*SIN DESCRIPCION*'}`)
let welcome = `${inv} AÑADIO A ${welcomeUsers}\n\n*╔══════════════*\n*╟❧ ${await conn.getName(m.chat)}*\n*╠══════════════*\n*╟❧ ${welcomeUsers}*\n*╟❧ BIENVENIDO/A* \n*║*\n*╟❧ DESCRIPCIÓN DEL GRUPO:*\n*╟❧* ${groupMetadata.desc?.toString() || '*SIN DESCRIPCION*'} \n*║*\n*╟❧ DISFRUTA TU ESTANCIA!!*\n*╚══════════════*`
const resp = sWelcome !== '' ? sWelcome : welcome
return conn.sendWritingText(m.chat, resp, userdb, fkontak);
}
}
if (chatdb.bye) {
if (m.messageStubType == 28) {
const resp = `╔══════════════*\n*║〘 *EXPULSADO* 〙*\n*╠══════════════*\n║*_☠ ${whotag} ELIMINO A ${usertag}, si lo Sacaron tendran sus motivos_*\n║*_Si no regresa..._*\n║ *_Nadie l@ va a extrañar 😇👍🏼_*\n*╚══════════════*`
delete chatdb.users[who]
db.write()
return conn.sendWritingText(m.chat, resp, userdb, fkontak);
}
if (m.messageStubType == 32) {
const resp = `╔══════════════*\n*║〘 *ADIÓS*〙*\n*╠══════════════*\n║*_Se fue ${usertag} del Grupo_*\n║*_Tal vez alguien si lo extrañe o nada mas vino a mirar..._*\n║ *_Esperamos que le vaya bien 😇👍🏼_*\n*╚══════════════*`
delete chatdb.users[who]
db.write()
return conn.sendWritingText(m.chat, resp, userdb, fkontak);
}
}
}