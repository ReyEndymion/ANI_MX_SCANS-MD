/**comando kick desarrollado por ReyEndymion */
import { areJidsSameUser } from '@whiskeysockets/baileys'
let handler = async (m, {text, args, conn, participants, command, usedPrefix, isAdmin, groupMetadata, isBotAdmin, botdb, chatdb, userdb, senderJid, isLidGroup}) => {
const {formatNumberWA, delay} = await import('../lib/functions.js');
const {userID, lid, owner} = await import('../config.js');
let resp, res, consola
let messageToSend = '';
if (!botdb.settings.restrict) {
resp = '*[ ⚠️ ] EL OWNER TIENE RESTRINGIDO (_enable restrict_ / _disable restrict_) EL USO DE ESTE COMANDO*'
}
const creator = conn.lidToJid(groupMetadata.owner, m.chat) || '';
const owners = owner.map(([number]) => (formatNumberWA(number) + userID))
let usuariosNoRegistrados = [];
let usuariosAdmin = [];
let usuariosAEliminar = [];
let kickUsers = [];
let q
if (isBotAdmin && isAdmin) {
let chatbye = chatdb.bye
if (chatdb.bye) chatdb.bye = false
if (/^(banear|kick|sacar|\-)$/i.test(command)) {
if((!isNaN(text)) && (m.quoted?.sender == undefined) && m.mentionedJid.length === 0) {
messageToSend = `*[❗] ETIQUETÉ A UNA PERSONA O PERSONAS O RESPONDA A UN MENSAJE DEL USUARIO EN EL GRUPO PARA ELIMINAR A DICHO USUARIO*\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} @${conn.user.jid.split('@')[0]}*\n\nAhora se puede eliminar en silencio sin etiquetar a alguien:\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} ${m.sender.split('@')[0]} ${conn.user.jid.split('@')[0]}*`
return conn.sendWritingText(m.chat, messageToSend, userdb, m);
}

let numeros = args.length > 0 ? args.join(' ').split(/[\s,]+/).map(v => v.replace(/@/g, '')).map(v => v.replace(/@[^0-9]/g, '')).filter(v => v.length > 4 && v.length < 20) : m.quoted?.sender ? [m.quoted.sender.split('@')[0]] : m.mentionedJid.length > 0 ? m.mentionedJid.map(m => m) : [text];
q = await conn.sendWritingText(m.chat, `Un Momento espere...`, userdb, m)
try {
for (let numero of numeros) {
let kickUser = formatNumberWA(numero) + userID
let [isRegistered] = await conn.onWhatsApp(numero);
if (!isRegistered?.exists) {
usuariosNoRegistrados.push(numero);
delete numeros[numero]
continue;
}
let mentionedIsAdmin = participants.find(u => isLidGroup ? u.phoneNumber === (kickUser || m.quoted?.sender) : u.id === (kickUser || m.quoted?.sender)).admin
if (mentionedIsAdmin === 'admin') {
usuariosAdmin.push(`@${numero}`)
if (kickUser.includes(conn.user.jid)) {
q = await conn.sendEditWritingText(m.chat, "*[❗] NO PUEDO ELIMINARME A MI MISMO, POR FAVOR SACAME MANUALMENTE SI ASI LO DESEAS*", q.key, userdb, m)
}

if (owners.includes(kickUser)) {
q = await conn.sendEditWritingText(m.chat, `no se puede eliminar al owner @${numero} mientras sea admin`, q.key, userdb, m)
}
} else if (mentionedIsAdmin === 'superadmin' && creator.includes(kickUser)) {
if (kickUser.includes(conn.user.jid)) {
q = await conn.sendEditWritingText(m.chat, "*[❗] NO PUEDO ELIMINARME A MI MISMO, POR FAVOR SACAME MANUALMENTE SI ASI LO DESEAS*", q.key, userdb, m)
}
q = await conn.sendEditWritingText(m.chat, `no se puede eliminar al creador del grupo @${numero}`, q.key, userdb, m)
} else {
usuariosAEliminar.push(kickUser);
}
}

if (usuariosNoRegistrados.length > 0) {
q = await conn.sendEditWritingText(m.chat, `Los siguientes números no están registrados en WhatsApp:\n${usuariosNoRegistrados.join(', ')}\n\n`, q.key, userdb, m)
}
if (usuariosAdmin.length > 0) {
q = await conn.sendEditWritingText(m.chat, `Admins no eliminados: ${usuariosAdmin.join(', ')}`, q.key, userdb, m)
}
if (usuariosAEliminar.length > 0) {
for (const kickUser of usuariosAEliminar) {
const kick = await remove(kickUser)
q = await conn.sendEditWritingText(m.chat, kick, q.key, userdb, m)
await delay(1 * 10000)
}
q = await conn.sendEditWritingText(m.chat, `Se ha Eliminado del grupo a los siguientes usuarios:\n${usuariosAEliminar.map(u => `@${u.split('@')[0]}`).join(', ')}`, q.key, userdb, m)
}
if (!usuariosAEliminar) {
messageToSend = 'No se encontraron números válidos para eliminar.';
q = await conn.sendEditWritingText(m.chat, messageToSend, q.key, userdb, m)
}
} catch (error) {
messageToSend = `${error.stack}`
q = await conn.sendEditWritingText(m.chat, messageToSend, q.key, userdb, m)
}
}

if (/^(kick2|echar2|hechar2|sacar2)$/i.test(command)) {
if (!m.quoted?.mentionedJid) return conn.sendWritingText(m.chat, `*[❗] RESPONDA A UN MENSAJE DEL GRUPO PARA ELIMINAR A LOS MENCIONADOS EN DICHO MENSAJE SIN AFECTAR AL USUARIO QUE LO MANDO*`, userdb, m)
const mentioned = new Set(m.quoted.mentionedJid)
q = await conn.sendWritingText(m.chat, `Eliminando a los usuarios tagueados...`, userdb, m)
for (let kickUser of mentioned) {
const numero = kickUser.split('@')[0]
//let kickUser = formatNumberWA(numero) + userID
let [isRegistered] = await conn.onWhatsApp(numero);
if (!isRegistered?.exists) {
usuariosNoRegistrados.push(numero);
delete mentioned[kickUser]
continue;
}
let mentionedIsAdmin = participants.find(u => isLidGroup ? u.phoneNumber === (kickUser || m.quoted?.sender) : u.id === (kickUser || m.quoted?.sender)).admin
if (mentionedIsAdmin === 'superadmin' && creator.includes(kickUser)) {
if (kickUser.includes(conn.user.jid)) {
q = await conn.sendEditWritingText(m.chat, "*[❗] NO PUEDO ELIMINARME A MI MISMO, POR FAVOR SACAME MANUALMENTE SI ASI LO DESEAS*", q.key, userdb, m)
q = await conn.sendEditWritingText(m.chat, `no se puede eliminar al creador del grupo @${numero}`, q.key, userdb, m)
}
continue
} 
if (mentionedIsAdmin === 'admin') {
usuariosAdmin.push(`@${numero}`)
if (kickUser.includes(conn.user.jid)) {
q = await conn.sendEditWritingText(m.chat, "*[❗] NO PUEDO ELIMINARME A MI MISMO, POR FAVOR SACAME MANUALMENTE SI ASI LO DESEAS*", q.key, userdb, m)
continue
}

if (owners.includes(kickUser)) {
q = await conn.sendEditWritingText(m.chat, `no se puede eliminar al owner @${numero} mientras sea admin`, q.key, userdb, m)
continue
}
continue
}

usuariosAEliminar.push(kickUser);
}
if (usuariosNoRegistrados.length > 0) {
q = await conn.sendEditWritingText(m.chat, `Los siguientes números no están registrados en WhatsApp:\n${usuariosNoRegistrados.join(', ')}\n\n`, q.key, userdb, m)
}
if (usuariosAdmin.length > 0) {
q = await conn.sendEditWritingText(m.chat, `Admins no eliminados: ${usuariosAdmin.join(', ')}`, q.key, userdb, m)
}
if (usuariosAEliminar.length > 0) {
for (const kickUser of usuariosAEliminar) {
const kick = await remove(kickUser)
q = await conn.sendEditWritingText(m.chat, kick, q.key, userdb, m)
await delay(1 * 10000)
}
q = await conn.sendEditWritingText(m.chat, `Se ha Eliminado del grupo a los siguientes usuarios:\n${usuariosAEliminar.map(u => `@${u.split('@')[0]}`).join(', ')}`, q.key, userdb, m)
} else {
q = await conn.sendEditWritingText(m.chat, 'No se encontraron números válidos para eliminar.', q.key, userdb, m)
}
if (!chatdb.bye) chatdb.bye = true 
else chatdb.bye = chatbye
}
if (/^(kicknum)$/.test(command)) {
if (!args[0]) return conn.sendWritingText(m.chat, `*[❗] INGRESA EL PREFIJO DE ALGUN PAIS PARA BUSCAR NUMEROS EN ESTE GRUPO DE ESE PAIS, EJEMPLO: ${usedPrefix + command} 52*`, userdb, m) 
if (isNaN(args[0])) return conn.sendWritingText(m.chat, `*[❗] INGRESA EL PREFIJO DE ALGUN PAIS PARA BUSCAR NUMEROS EN ESTE GRUPO DE ESE PAIS, EJEMPLO: ${usedPrefix + command} 52*`, userdb, m) 
let lol = args[0].replace(/[+]/g, '')
let ps = participants.map(u => isLidGroup ? u.phoneNumber : u.id).filter(v => v !== conn.user.jid && v.startsWith(lol)) 
if (ps == '') return conn.sendWritingText(m.chat, `*[❗] EN ESTE GRUPO NO HAY NINGUN NUMERO CON EL PREFIJO +${lol}*`, userdb, m)
let numeros = ps.map(v=> '⭔ @' + v.replace(/@.+/, ''))
q = await conn.sendWritingText(m.chat, `*[❗] INICIANDO LA ELIMINACION DE NUMEROS CON EL PREFIJO +${lol}, CADA 20 SEGUNDOS SE ELIMINARA A UN USUARIO*`, userdb, m)            
for (const user of ps) {
if (user !== conn.user.jid && !owners.includes(user) && user.startsWith(lol) &&  !creator.includes(user)) { 
const removeUser = await remove(user)
usuariosAEliminar.push(user)
q = await conn.sendEditWritingText(m.chat, removeUser, q.key, userdb, m)
await delay(1 * 20000)
}
}
if (usuariosAEliminar.length === 0) {
q = await conn.sendEditWritingText(m.chat, `No se eliminó ningún usuario con el prefijo ${lol}`, q.key, userdb, m)
} else {
q = await conn.sendEditWritingText(m.chat, `Se ha Eliminado del grupo a los siguientes usuarios:\n${usuariosAEliminar.map(u => `@${u.split('@')[0]}`).join(', ')}`, q.key, userdb, m)
}
}
if (/^kickallusers$/i.test(command)) {
const groupNoAdmins = participants.filter(p => !p.admin)
const listUsers = groupNoAdmins.map((v) => isLidGroup ? `@${v.phoneNumber.split('@')[0]}` : `@${v.id.split('@')[0]}`).join(' ')
const listUsersMaps = groupNoAdmins.map((v) => isLidGroup ? v.phoneNumber : v.id)
q = await conn.sendWritingText(m.chat, `*[❗] INICIANDO LA ELIMINACION DE TODOS LOS USUAROS NO ADMINS, CADA 20 SEGUNDOS SE ELIMINARA A UN USUARIO*\n\n${listUsers}`, userdb, m)            
for (let user of listUsersMaps) {
console.info('kick2: ', groupNoAdmins, listUsers, user)
await delay(10 * 10000);
const removeUser = await remove(user);
q = await conn.sendEditWritingText(m.chat, removeUser, q.key, userdb, m)
}

}
if (/^kicknum$/i.test(command)) {
}
} else if (!isBotAdmin && isAdmin) {
let resp = `*[❗INFO❗] EL BOT NO ES ADMINISTRADOR DEL GRUPO, NO PUEDE REALIZAR ESTA ACCIÓN HASTA QUE LOD HAGAS ADMIN*`;
return conn.sendWritingText(m.chat, resp, userdb, m);
} else {
let resp = `*[❗INFO❗] SOLO UN ADMINISTRADOR DEL GRUPO PUEDE REALIZAR ESTA ACCIÓN*`;
return conn.sendWritingText(m.chat, resp, userdb, m);
}

async function remove (user) {
const remove = await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
let exitoso1 = `*@${user.split("@")[0]} FUE ELIMINADO EXITOSAMENTE DEL GRUPO*`
let error1 = `*@${user.split("@")[0]} ES EL CREADOR DEL GRUPO, NO PUEDO ELIMINAR AL CREADOR DEL GRUPO*`
let error2 = `@${user.split("@")[0]} YA HA SIDO ELIMINADO O HA ABANDONADO EL GRUPO*`
if (remove[0].status === "200") return exitoso1
else if (remove[0].status === "406") return error1 
else if (remove[0].status === "404") return error2
}
}
handler.help = ['kick']
handler.tags = ['group']
handler.command = /^(kick(allusers|num)?|sacar|(h)?echar)(2)?$/i
handler.admin = handler.group = handler.botAdmin = true
handler.menu = [
{title: "💎 ELIMINAR", description: "Eliminar a uno o a varios usuarios del grupo con su tag, numero o desde su mensaje usando #kick", id: `kick`},
{title: "💎 ELIMINAR DESDE EL TAG DEL MENSAJE", description: "Elimina a alguien contestando un mensaje que tenga uno o varios mencionados usando #kick2", id: `kick2`},
{title: "💎 ELIMINA NUMEROS POR PREFIJO", description: "elimina una lista de numeros del grupo por su prefijo usando #kicknum", id: `kicknum`}, 
{title:"💎 ELIMINAR TODOS LOS USUARIOS", description: "elimina a todos los usuarios no admin del grupo usando #kickallusers <mensaje>", id: `kickallusers`}
];
handler.type = "gadmin";
handler.disabled = false;

export default handler


