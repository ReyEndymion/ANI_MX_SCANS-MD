/**comando kick desarrollado por ReyEndymion */

import { areJidsSameUser } from '@whiskeysockets/baileys'
let handler = async (m, {text, args, conn, participants, command, usedPrefix, isAdmin, groupMetadata, isBotAdmin }) => {
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
if (isBotAdmin) {
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

}
console.info('kickCheck: ', conn.user.jid.includes(kickUser))
if (kickUser.includes(conn.user.jid)) {
messageToSend = "*[❗] NO PUEDO ELIMINARME A MI MISMO, POR FAVOR SACAME MANUALMENTE SI ASI LO DESEAS*"
} else if (owners.includes(kickUser)) {
messageToSend = `no se puede eliminar al owner @${kickUser.split('@')[0]}`
} else if (creator.includes(kickUser)) {
messageToSend = `no se puede eliminar al creador @${kickUser.split('@')[0]}`
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
} else {
if (kickUser.includes(conn.user.jid)) {
messageToSend = "*[❗] NO PUEDO ELIMINARME A MI MISMO, POR FAVOR SACAME MANUALMENTE SI ASI LO DESEAS*"
}}

} catch (error) {
messageToSend = `${error.stack}`
}
if (kickUser.includes(conn.user.jid)) {
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

async function remove (user) {
const remove = await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
let exitoso1 = `*@${user.split("@")[0]} FUE ELIMINADO EXITOSAMENTE DEL GRUPO*\n\n`
let error1 = `*@${user.split("@")[0]} ES EL CREADOR DEL GRUPO, NO PUEDO ELIMINAR AL CREADOR DEL GRUPO*\n\n`
let error2 = `@${user.split("@")[0]} YA HA SIDO ELIMINADO O HA ABANDONADO EL GRUPO*\n\n`
if (remove[0].status === "200") messageToSend += exitoso1
else if (remove[0].status === "406") messageToSend += error1 
else if (remove[0].status === "404") messageToSend += error2
}
}
handler.help = ['kick']
handler.tags = ['group']
handler.command = /^(kick|echar|hechar|sacar)$/i
handler.admin = handler.group = handler.botAdmin = true
export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))


