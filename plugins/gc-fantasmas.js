import { plugins, getCommandVariants, wrapText, delay } from '../lib/functions.js'
let usersToGhost = [];
let tags = '', isWelcome = false
let handler = async (m, {conn, db, text, usedPrefix, command, groupMetadata, participants, chatdb, usersdb, userdb, senderJid, isLidGroup}) => {
if (!chatdb.isCountMsgs) return conn.sendWritingText(m.chat, `El contador en este chat está desactivado Es posible Que no existan datos Para los usuarios así que actívelo usando ${usedPrefix}enable countmsg Y Espere a que los usuarios Hagan mensajes`, userdb, m)
const {lid, userID} = await import('../config.js')
let resp = ''
let participantIds = new Set(groupLid ? participants.map(u => u.phoneNumber) : participants.map(u => u.id));
var sum = participants.length

for (let participant of participants) {
if (!participant.id.endsWith(userID)) delete usersdb[participant.id]
let userId = groupLid ? participant.phoneNumber : participant.id;
if (!(userId in usersdb)) {
usersdb[userId] = {
msgcount: {
count: 0,
time: 0
}
};
await db.write();
console.log(`Usuario ${userId} inicializado en la base de datos.`);
} else {
if (usersdb[userId.endsWith(lid)]) {
delete usersdb[userId.endsWith(lid)] 
await db.write();
}
}
}
for (let userId in usersdb) {
if (!participantIds.has(userId) || typeof usersdb[userId] !== 'object' || usersdb[userId] === null) {
delete usersdb[userId];
await db.write();
}
}
if (/^(verfantasmas|fantasmas|sider|Sider)$/i.test(command)) {
for (let usuario in usersdb) {
let user = usersdb[usuario];
let tag = usuario.split('@')[0];

if (user && user.msgcount && user.msgcount.count === 0) {
usersToGhost.push(usuario);
let count = user.msgcount.count
tags += `@${tag} con ${count} mensajes\n`;
}
}

if (usersToGhost.length > 0) {
const date = new Date(usersdb[senderJid].msgcount.time);
const day = date.getDate();
const monthNames = [
'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];
const month = monthNames[date.getMonth()];
const year = date.getFullYear();
const formattedDate = `${day} de ${month} de ${year}`;
resp = `*[REVISIÓN DE INACTIVOS]*\n\n*Grupo: ${await conn.getName(m.chat)}*\n*Participantes: ${sum}*\n\n*[👻 LISTA DE FANTASMAS 👻 ]*\n${tags}\n\n*Nota: Esto es 100% acertado y el conteo empezo desde ${formattedDate}*`
await conn.sendWritingText(m.chat, resp, userdb, m)
} else {
resp = `*Este grupo no tiene fantasmas :D.*`;
return conn.sendWritingText(m.chat, resp, userdb, m)
}
}
if (/^(kickfantasmas|sacarfantasmas)$/i.test(command)) {
if (usersToGhost.length > 0) {
resp = `*[ELIMINACION DE INACTIVOS]*\n\n*Grupo: ${await conn.getName(m.chat)}*\n*Participantes: ${sum}*\n\n*[ 👻 FANTASMAS QUE MORIRAN 👻 ]*\n${tags}\n\n*Nota: Esto es 100% acertado y el Bot eliminara la lista mencionada, empezando en 20 segundos y cada 10 segundos eliminara un numero*`
let {key} = await conn.sendWritingText(m.chat, resp, userdb, m)
await delay(1 * 20000)

if (chatdb.welcome) {
chatdb.welcome = false
isWelcome = true
}
try {
const emottime = ['🕛','🕧','🕐','🕜','🕑','🕝','🕒','🕞','🕓','🕟','🕔','🕠','🕕','🕡','🕖','🕢','🕗','🕣','🕘','🕤','🕙','🕥','🕚','🕦']
let userCount = 1
for (let user of usersToGhost) {
let isAdmin = participants.some(v => (isLidGroup ? v.phoneNumber === user : v.id === user) && v.admin);
if (isAdmin) {
await conn.sendEditWritingText(m.chat, `⚠️ El admin @${user.split('@')[0]} no lo puedo eliminar, sacalo por tu cuenta.`, key, userdb, m)
await delay(1 * 10000)
continue
}
await conn.sendReact(m.chat, `${userCount}️⃣`, m.key)
await conn.sendEditWritingText(m.chat, `Eliminando a @${user.split('@')[0]}`, key, userdb, m)
await delay(1 * 10000)
await conn.sendReact(m.chat, `⚰️`, key)
await conn.sendReact(m.chat, `🪦`, key)

let res = await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
await delay(1 * 10000)
if (res[0].status === "200") {
await conn.sendReact(m.chat, `✅`, m.key)
await conn.sendEditWritingText(m.chat, `Listo ✅`, key, userdb, m)
await conn.sendReact(m.chat, `✅`, key)
} else if (res[0].status === "406") {
await conn.sendEditWritingText(m.chat, `El creador es inmutable, no se puede eliminar`, key, userdb, m) 
} else if (res[0].status === "404") {
await conn.sendEditWritingText(m.chat, `El usuario ya ha salido del grupo`, key, userdb, null)
}
}
} finally {
if (isWelcome) {
chatdb.welcome = true
isWelcome = false
}
usersToGhost = []
}

} else {
return conn.sendWritingText(m.chat, ` Debe ejecutar el comando *${usedPrefix}fantasmas* antes de continuar con la eliminación`, userdb, m)
}
}
}
handler.command = /^(ver|kick|sacar)?(fantasmas|sider|Sider)$/i
handler.group = true
handler.botAdmin = true
handler.admin = true
handler.help = [];
handler.tags = [];
handler.menu = [
{title:"💎 FANTASMAS", description: `Busca y encuentra gente inactiva en el grupo usando:\n\n${getCommandVariants(handler.command).map(hc => `#${hc}`).join('\n')}`, id: `fantasmas`},
{title:"💎 ELIMINAR FANTASMAS", description: "elimina a los usuarios inactivos del grupo usando #kickfantasmas", id: `kickfantasmas`}
];
handler.type = "gadmin";
handler.disabled = false;

export default handler
