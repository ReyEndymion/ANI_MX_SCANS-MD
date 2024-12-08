import { Low, JSONFile } from 'lowdb';
const databaseFile = './countMessagesReg.json';
const adapter = new JSONFile(databaseFile);
const db = new Low(adapter);
let handler = async (m, { conn, text, participants }) => {
await db.read();
let chat = db.data.bot[conn.user.jid].chats.groups[m.chat]
let resp = '', ghost = false
let participantIds = new Set(participants.map(u => u.id));
let users = chat.users || {}
var sum = participants.length

for (let participant of participants) {
let user = participant.id;
console.log('mentioned: ', users[user] && users[user].msgcount && users[user].msgcount.count)
if (!(user in users)) {
db.data.bot[conn.user.jid].chats.groups[m.chat].users[user] = {
msgcount: {
count: 0,
time: 0
}
};
await db.write();
console.log(`Usuario ${user} inicializado en la base de datos.`);
} else if ((users[user] && users[user].msgcount && users[user].msgcount.count && users[user].msgcount.time) === undefined) {
db.data.bot[conn.user.jid].chats.groups[m.chat].users[user] = {
msgcount: {
count: 0,
time: 0
}
}
}
}
//
for (let user in users) {
if (!participantIds.has(user) || typeof users[user] !== 'object' || users[user] === null) {
delete users[user];
}
}
let usersToGhost = [];
let tags = ''
for (let usuario in users) {
let user = users[usuario];
let tag = usuario.split('@')[0];

if (user && user.msgcount && user.msgcount.count === 0) {
usersToGhost.push(usuario); // Agregar usuario a la lista de eliminación
let count = user.msgcount.count
tags += `@${tag} con ${count} mensajes\n`;
}
}

if (usersToGhost.length > 0) {
const date = new Date(users[m.sender].msgcount.time);
const day = date.getDate();
const monthNames = [
'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];
const month = monthNames[date.getMonth()];
const year = date.getFullYear();
const formattedDate = `${day} de ${month} de ${year}`;
resp = `*[REVISIÓN DE INACTIVOS]*\n\n*Grupo: ${await conn.getName(m.chat)}*\n*Participantes: ${sum}*\n\n*[👻 LISTA DE FANTASMAS 👻 ]*\n${tags}\n\n*Nota: Esto es 100% acertado y el conteo empezo desde ${formattedDate}*`
ghost = true
} else {
resp = `*Este grupo no tiene fantasmas :D.*`;
ghost = false
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
if (ghost) {
await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} else {
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
}
}
handler.command = /^((ver)?fantasmas|sider|ghosts)$/i
handler.group = true
//handler.botAdmin = true
//handler.admin = true
export default handler
