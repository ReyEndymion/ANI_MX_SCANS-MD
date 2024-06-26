import { areJidsSameUser } from '@whiskeysockets/baileys'
let handler = async (m, { conn, text, participants, args, command }) => {

let chat = global.db.data.bot[conn.user.jid].chats.groups[m.chat]
let resp = '', ghostKick = false
let participantIds = new Set(participants.map(u => u.id));
let users = chat.users
var sum = participants.length
let adminUsers = participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(p => p.id);
let botJid = conn.user.jid;
let groupOwner = (await conn.groupMetadata(m.chat)).owner;

for (let participant of participants) {
let user = participant.id;
if (!(user in users)) {
global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[user] = {
msgcount: {
count: 0,
time: 0
}
};
await global.db.write();
console.log(`Usuario ${user} inicializado en la base de datos.`);
} else if ((users[user] && users[user].msgcount && users[user].msgcount.count && users[user].msgcount.time) === undefined) {
global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[user] = {
msgcount: {
count: 0,
time: 0
}
}
}
}

for (let user in users) {
if (!participantIds.has(user) || typeof users[user] !== 'object' || users[user] === null) {
delete users[user];
}
}
let usersToKick = [];
let tags = ''
for (let usuario in users) {
let user = users[usuario];
let tag = usuario.split('@')[0];

if (user && user.msgcount && user.msgcount.count === 0 && usuario !== botJid && usuario !== groupOwner) {
if (args[0] === 'todos' || !adminUsers.includes(usuario)) {
usersToKick.push(usuario);
let count = user.msgcount.count
tags += `@${tag} con ${count} mensajes\n`;
}
}
}

if (usersToKick.length > 0) {
const date = new Date(users[m.sender].msgcount.time);
const day = date.getDate();
const monthNames = [
'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];
const month = monthNames[date.getMonth()];
const year = date.getFullYear();
const formattedDate = `${day} de ${month} de ${year}`;
resp = `*[ELIMINACION DE INACTIVOS]*\n\n*Grupo: ${await conn.getName(m.chat)}*\n*Participantes: ${sum}*\n\n*[ 👻 FANTASMAS QUE MORIRAN 👻 ]*\n${tags}\n\n*Nota: Esto es 100% acertado y el conteo empezo desde ${formattedDate}, el Bot eliminara la lista mencionada, empezando en 20 segundos y cada 10 segundos eliminara un numero*`
ghostKick = true
} else {
resp = `*Este grupo no tiene fantasmas :D.*`;
ghostKick = false
}
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 5));
txt += c;
count++;
if (count % 10 === 0) {
conn.sendPresenceUpdate('composing' , m.chat);
}
}
if (ghostKick) {
await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
chat.welcome = false;
await delay(20000);
txt = ''
for (let usuario of usersToKick) {
console.log('KickMentionedANI: ', usuario, conn.user.jid, usuario.includes(conn.user.jid) )
await conn.groupParticipantsUpdate(m.chat, [usuario], 'remove')
delete users[usuario];
await delay(10000);
}
chat.welcome = true;
txt = `La eliminacion fue exitosa`
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} else {
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
}
}
handler.command = /^(kick|sacar)fantasmas$/i
handler.admin = true
handler.botAdmin = true
export default handler
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

//desarrollado totalmente por https://github.com/ReyEndymion
//participa en desactivacion de despedida https://github.com/BrunoSobrino/
