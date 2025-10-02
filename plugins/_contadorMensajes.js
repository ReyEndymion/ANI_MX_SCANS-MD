let stopCount = false
async function handler(m, { conn, args, participants, command, isAdmin, db, usersdb, userdb, senderJid, isLidGroup }) {
const {isNumber} = await import('../lib/functions.js')
await db.read();

const {lid, userID} = await import('../config.js')
let participantsJIDs = new Set(isLidGroup ? participants.map(u => u.phoneNumber) : participants.map(u => u.id));
for (const jid of Object.keys(usersdb)) {
if (!participantsJIDs.has(jid)) {
delete usersdb[jid];
console.log(`Usuario ${jid} eliminado de la base de datos.`);
await db.write();
}
}


for (const participant of participantsJIDs.keys()) {
if (!(participant in usersdb)) {
usersdb[participant] = {
msgcount: {
count: 0,
time: 0
}
};
await db.write();
console.log(`Usuario ${participant} inicializado en la base de datos.`);
} else if (!Object.keys(usersdb).includes(participant)) {
}
}
if (/^revcount/i.test(command)) {
let resp = ''
try {
if (/\d+/g.test(args[0]) && isAdmin) {
let rawNumber = args.toString().replace(/,/g, '').match(/\d+/g).toString();
let numero;
if (rawNumber.startsWith(52) && !rawNumber.startsWith('521')) {
numero = rawNumber.replace(/^52/, '521');
} else {
numero = rawNumber;
}
let who = args ? numero + '@s.whatsapp.net' : m.mentionedJid.toString();
if (!(who in usersdb)) {
usersdb[who] = {};
} else {
if (!('msgcount' in usersdb[who])) usersdb[who].msgcount = {};
if (!isNumber(usersdb[who].msgcount.count)) {
usersdb[who].msgcount.count = 0;
}
if (!isNumber(usersdb[who].msgcount.time)) {
usersdb[who].msgcount.time = 0;
}
}
let data = { msgcount: { count: 0, time: 0 } };
if (!(who in usersdb)) usersdb[who] = data;
let count = usersdb[who].msgcount.count;
resp = `@${who.split('@')[0]} tiene ${count} mensajes`;
return conn.sendWritingText(m.chat, resp, userdb, m)
} else if (/t|todos/i.test(args[0]) && isAdmin) {
resp = `Total de usuarios: ${participants.length}\n\n`;
for (let usuario in usersdb) {
let user = usersdb[usuario];
let tag = usuario.split('@')[0];
let count = user.msgcount ? user.msgcount.count : 0; 
resp += `@${tag} tiene ${count} mensajes\n`;
}
return conn.sendWritingText(m.chat, resp, userdb, m)
} else {
let who;

if (isAdmin) {
if (m.quoted && m.quoted.sender) {
who = m.quoted.sender;
} else {
who = senderJid;
}
} else {
who = senderJid;
}
if (!(who in usersdb)) {
usersdb[who] = {};
} else {
if (!('msgcount' in usersdb[who])) usersdb[who].msgcount = {};
if (!isNumber(usersdb[who].msgcount.count)) {
usersdb[who].msgcount.count = 0;
}
if (!isNumber(usersdb[who].msgcount.time)) {
usersdb[who].msgcount.time = 0;
}
}
let count = usersdb[who].msgcount.count;
resp = `@${who.split('@')[0]} tiene ${count} mensajes`;
return conn.sendWritingText(m.chat, resp, userdb, m)
}
} catch (error) {
resp = `${error.stack}`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
}
if (/^resetcount|rc$/i.test(command) && isAdmin) {
stopCount = true
await conn.sendWritingText(m.chat, `Reiniciando contador, espere...`, userdb, m)
}

}
handler.before = async function before(m, {conn, participants, isAdmin, db, chatdb, usersdb, userdb, senderJid, objs}) {
if (!m.isGroup || !chatdb.isCountMsgs) return; 
if (stopCount && isAdmin) {
let resp = ''
try {
const {monthNames} = await import('../lib/constants.js')
const currentTime = Date.now();
const date = new Date(currentTime);
const day = date.getDate();
const month = monthNames[date.getMonth()];
const year = date.getFullYear();
const formattedDate = `${day} de ${month} de ${year}`;
for (let user in usersdb) {
usersdb[user].msgcount.count = 0;
usersdb[user].msgcount.time = currentTime;
}
await db.write();
resp = `Se ha reiniciado el contador con fecha => ${formattedDate}`;
} catch (e) {
resp = `${e.stack}`
}
await conn.sendWritingText(m.chat, resp, userdb, m)
stopCount = false

} 

if (userdb) {
if (!('msgcount' in userdb)) userdb.msgcount = {};
if (!('count') in userdb.msgcount) userdb.msgcount.count = 0
if (!('time') in userdb.msgcount) userdb.msgcount.time = 0
if (m.mtype) {
userdb.msgcount.count++;
}
console.log('countANI ', senderJid, userdb.msgcount, stopCount)
await db.write();
} else {
Object.assign(userdb, {msgcount: {count: 0, time: 0}})
}
}
handler.group = true
handler.command = /^revcount|resetcount|rc$/
handler.help = [];
handler.tags = [];
handler.menu = [
{
title: "👤 REVCOUNT PERSONAL",
description: "#revcount → Muestra cuántos mensajes has enviado tú mismo",
id: "revcount"
},
{
title: "📝 REVCOUNT USUARIO ESPECÍFICO",
description: "#revcount <número> → Solo admin. Consulta los mensajes de un miembro específico del grupo",
id: "revcount"
},
{
title: "👥 REVCOUNT TODOS LOS USUARIOS",
description: "#revcount todos → Solo admin. Muestra el total de usuarios y el número de mensajes de cada uno",
id: "revcount t"
},
{
title: "📬 REVCOUNT CITADO",
description: "Respondiendo a un mensaje con #revcount → Solo admin. Consulta los mensajes del usuario citado",
id: "revcount"
},
{
title: "📬 RESETCOUNT",
description: "Solo admin. reinicia los mensajes de todos los usuarios",
id: "resetcount"
}
];
handler.type = "gadmin";
handler.disabled = false;
export default handler
