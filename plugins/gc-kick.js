/**comando kick desarrollado por ReyEndymion */

import { areJidsSameUser } from '@whiskeysockets/baileys'
let handler = async (m, {text, args, conn, participants, command, usedPrefix, isAdmin, groupMetadata }) => {
let resp, res, consola
let messageToSend = '';
if (!global.db.data.bot[conn.user.jid].settings.restrict) {
resp = '*[ ⚠️ ] EL OWNER TIENE RESTRINGIDO (_enable restrict_ / _disable restrict_) EL USO DE ESTE COMANDO*'
}
let usuariosNoRegistrados = [];
let usuariosEnGrupo = [];
let usuariosAEliminar = [];
let kickUser = '';
let _participants = participants.map(user => user.id)
const creator = groupMetadata.owner || '';  
const owners = global.owner.map(([number]) => (conn.formatNumberWA(number) + '@s.whatsapp.net'))
let numeros = args.join(' ').split(/[\s,]+/).map(v => v.replace(/@/g, '')).map(v => v.replace(/@[^0-9]/g, '')).filter(v => v.length > 4 && v.length < 20);
try {
if (isAdmin) {
if (numeros.length > 0) {
for (let kickUsers of numeros) {
kickUser = kickUsers.replace('@', '') + userID;
let [isRegistered] = await conn.onWhatsApp(kickUser);
if (!isRegistered?.exists) {
usuariosNoRegistrados.push(kickUsers);
continue;
} else if (_participants.includes(kickUsers)) {
usuariosEnGrupo.push(kickUsers);
continue;
} else {
usuariosAEliminar.push(kickUser);
await remove(kickUser)
await delay(1 * 10000)
}
}
} else if (m.quoted && m.quoted.sender) {
kickUser = m.quoted.sender;
usuariosAEliminar.push(kickUser);
await remove(kickUser)
} else {
kickUser = m.sender;
messageToSend = `*[❗] ETIQUETÉ A UNA PERSONA O PERSONAS O RESPONDA A UN MENSAJE DEL USUARIO EN EL GRUPO PARA ELIMINAR A DICHO USUARIO*\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} @${conn.user.jid.split('@')[0]}*\n\nAhora se puede eliminar en silencio sin etiquetar a alguien:\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} 5215533827255 5215535705067*\n\n*[❗] ADVERTENCIA:* @${kickUser.split('@')[0]} este comando no es para jugar y aunque seas admin, si lo usas 2 veces mas te expulso de verdad`
}
} else {
kickUser = m.sender;
messageToSend = `**[❗]** Solo los admins pueden hacer uso de este comando\n\nEl comando no es para jugar @${kickUser.split('@')[0]} si lo usas 2 veces mas te expulso de verdad`
}

} catch (error) {
messageToSend = `${error.stack}`
}
async function remove (user) {
const remove = await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
let exitoso1 = `*@${user.split("@")[0]} FUE ELIMINADO EXITOSAMENTE DEL GRUPO*\n\n`
let error1 = `*@${user.split("@")[0]} ES EL CREADOR DEL GRUPO, NO PUEDO ELIMINAR AL CREADOR DEL GRUPO*\n\n`
let error2 = `@${user.split("@")[0]} YA HA SIDO ELIMINADO O HA ABANDONADO EL GRUPO*\n\n`
if (remove[0].status === "200") messageToSend += exitoso1
else if (remove[0].status === "406") messageToSend += error1 
else if (remove[0].status === "404") messageToSend += error2
}
if (conn.user.jid.includes(kickUser)) {
messageToSend = "*[❗] NO PUEDO ELIMINARME A MI MISMO, POR FAVOR SACAME MANUALMENTE SI ASI LO DESEAS*"

} else if (owners.includes(kickUser)) {
messageToSend = `no se puede eliminar al owner @${kickUser.split('@')[0]}`
} else if (creator.includes(kickUser)) {
messageToSend = `no se puede eliminar al creador @${kickUser.split('@')[0]}`
} else if (usuariosAEliminar.length > 0) {
messageToSend += `Se ha Eliminado del grupo a los siguientes usuarios:\n${usuariosAEliminar.map(u => `@${u.split('@')[0]}`).join(', ')}\n\n`;
}
if (usuariosNoRegistrados.length > 0) {
messageToSend += `Los siguientes números no están registrados en WhatsApp:\n${usuariosNoRegistrados.join(', ')}\n\n`;
}

if (!messageToSend) {
messageToSend = 'No se encontraron números válidos para eliminar.';
}
return conn.sendWritingText(m.chat, messageToSend, m);
}
handler.help = ['kick']
handler.tags = ['group']
handler.command = /^(kick|echar|hechar|sacar)$/i
handler.admin = handler.group = handler.botAdmin = true
export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))


/*
let handler = async (m, { conn, args, participants, command, usedPrefix }) => {
try {
if (!global.db.data.bot[conn.user.jid].settings.restrict) return conn.sendWritingText(m.chat, '*[ ⚠️ ] EL OWNER TIENE RESTRINGIDO (_enable restrict_ / _disable restrict_) EL USO DE ESTE COMANDO*', m)
let kicktext = `*[❗] ETIQUETÉ A UNA PERSONA O RESPONDA A UN MENSAJE DEL GRUPO PARA ELIMINAR AL USUARIO*\n\n*—◉ 𝙴𝙹𝙴𝙼𝙿𝙻𝙾:*\n*${usedPrefix + command} @${global.suittag}*`
if (!m.mentionedJid[0] && !m.quoted) return conn.sendWritingText(m.chat, kicktext, m.chat, { mentions: conn.parseMention(kicktext)}) 
if (m.message.extendedTextMessage === undefined || m.message.extendedTextMessage === null) return conn.sendWritingText(m.chat, '*[❗] ETIQUETE A UNA PERSONA O RESPONDA A UN MENSAJE DEL GRUPO PARA ELIMINAR AL USUARIO*', m) 
if(m.message.extendedTextMessage.contextInfo.participant !== null && m.message.extendedTextMessage.contextInfo.participant != undefined && m.message.extendedTextMessage.contextInfo.participant !== "") {
var mentioned = m.message.extendedTextMessage.contextInfo.mentionedJid[0] ? m.message.extendedTextMessage.contextInfo.mentionedJid[0] : m.message.extendedTextMessage.contextInfo.participant
if(conn.user.jid.includes(mentioned)) return conn.sendWritingText(m.chat, "*[❗] NO PUEDO ELIMINARME A MI MISMO, POR FAVOR SACAME MANUALMENTE SI ASI LO DESEAS*", m)
let responseb = await conn.groupParticipantsUpdate(m.chat, [mentioned], 'remove')
let exitoso1 = `*@${mentioned.split("@")[0]} FUE ELIMINADO EXITOSAMENTE DEL GRUPO*`
let error1 = `*@${mentioned.split("@")[0]} ES EL CREADOR DEL GRUPO, NO PUEDO ELIMINAR AL CREADOR DEL GRUPO*`
let error2 = `@${mentioned.split("@")[0]} YA HA SIDO ELIMINADO O HA ABANDONADO EL GRUPO*`
if (responseb[0].status === "200") conn.sendWritingText(m.chat, exitoso1, m.chat, { mentions: conn.parseMention(exitoso1)})
else if (responseb[0].status === "406") conn.sendWritingText(m.chat, error1, m.chat, { mentions: conn.parseMention(error1)}) 
else if (responseb[0].status === "404") conn.sendWritingText(m.chat, error2, m.chat, { mentions: conn.parseMention(error2)})
else conn.sendMessage(m.chat, {text: `*[❗] OCURRIO UN ERROR INESPERADO*`, mentions: [m.sender], contextInfo:{forwardingScore:999, isForwarded:true}}, {quoted: m})
} else if (m.message.extendedTextMessage.contextInfo.mentionedJid != null && m.message.extendedTextMessage.contextInfo.mentionedJid != undefined) {
return
}
} catch {
 //let lol = args[0].replace(/[+]/g, '')
let users = m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id))
let kickedUser = participants.map(u => u.id).filter(v => v !== conn.user.jid 
//&& v.startsWith(lol || lol)/
)
for (let user of users)
if (user.endsWith('@s.whatsapp.net') && !(participants.find(v => areJidsSameUser(v.id, user)) || { admin: true }).admin) {
const res = await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
kickedUser.concat(res)
await delay(1 * 10000)
}
conn.sendWritingText(m.chat, `*LA ELIMINACION FUE EXITOSA* ${users.map(v => '@' + v.split('@')[0]) || kickedUser.map(v => '@' + v.split('@')[0])}`, null, { mentions: kickedUser })
 
}
}
var mentioned = m.message.extendedTextMessage.contextInfo.mentionedJid
if(mentioned.includes(conn.user.jid)) return conn.sendWritingText(m.chat, "*[❗] 𝙽𝙾 𝙿𝚄𝙴𝙳𝙾 𝙴𝙻𝙸𝙼𝙸𝙽𝙰𝚁𝙼𝙴 𝙰 𝙼𝙸 𝙼𝙸𝚂𝙼𝙾, 𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁 𝚂𝙰𝙲𝙰𝙼𝙴 𝙼𝙰𝙽𝚄𝙰𝙻𝙼𝙴𝙽𝚃𝙴 𝚂𝙸 𝙰𝚂𝙸 𝙻𝙾 𝙳𝙴𝚂𝙴𝙰𝚂*")
if(mentioned.length > 1) {
if(mentioned.length > groupMembers.length || mentioned.length === groupMembers.length || mentioned.length > groupMembers.length - 3) return conn.sendWritingText(m.chat, `¿De verdad vas a banear a todos?`)
sexocomrato = 0
for (let banned of mentioned) {
await sleep(100)
let responseb2 = await conn.groupParticipantsUpdate(m.chat, [banned], 'remove')
if (responseb2[0].status === "200") sexocomrato = sexocomrato + 1
}
conn.sendMessage(m.chat, {text: `${sexocomrato} participante elimanado del grupo.`, mentions: [m.sender], contextInfo:{forwardingScore:999, isForwarded:true}}, {quoted: m})
} else {
let responseb3 = await conn.groupParticipantsUpdate(m.chat, [mentioned[0]], 'remove')
if (responseb3[0].status === "200") conn.sendMessage(m.chat, {text: `@${mentioned[0].split("@")[0]} fue eliminado exitosamente del grupo.️`, mentions: [mentioned[0], m.sender], contextInfo:{forwardingScore:999, isForwarded:true}}, {quoted: m})
else if (responseb3[0].status === "406") conn.sendMessage(m.chat, {text: `@${mentioned[0].split("@")[0]} creó este grupo y no puede ser eliminado.`, mentions: [mentioned[0], m.sender], contextInfo:{forwardingScore:999, isForwarded:true}}, {quoted: m})
else if (responseb3[0].status === "404") conn.sendMessage(m.chat, {text: `@${mentioned[0].split("@")[0]} ya ha sido eliminado o abandonado el grupo`, mentions: [mentioned[0], m.sender], contextInfo:{forwardingScore:999, isForwarded:true}}, {quoted: m})
else conn.sendMessage(m.chat, {text: `A ocurrido un error.`, mentions: [m.sender], contextInfo:{forwardingScore:999, isForwarded:true}}, {quoted: m})
}*/
