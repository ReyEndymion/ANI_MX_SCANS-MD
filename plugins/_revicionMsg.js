const isNumber = (x) => typeof x === 'number' && !isNaN(x);
async function handler(m, { conn, args, participants, command, isAdmin, db, usersdb, userdb, senderJid }) {
await db.read();

const participantsJIDs = participants.map(p => p.id);

for (const jid of Object.keys(usersdb)) {
if (!participantsJIDs.includes(jid)) {
delete usersdb[jid];
console.log(`Usuario ${jid} eliminado de la base de datos.`);
}
}

await db.write();

for (const participant of participants) {
if (!(participant.id in usersdb)) {
usersdb[participant.id] = {
msgcount: {
count: 0,
time: 0
}
};
await db.write();
console.log(`Usuario ${participant.id} inicializado en la base de datos.`);
} else if (!Object.keys(usersdb).includes(participant.id)) {
}
}
//console.log('revCountBC=>users: ', usersdb[senderJid].name);
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
} else if (/t|todos/i.test(args[0]) && isAdmin) {
resp = `Total de usuarios: ${participants.length}\n\n`;
for (let usuario in usersdb) {
let user = usersdb[usuario];
let tag = usuario.split('@')[0];
let count = user.msgcount ? user.msgcount.count : 0; 
resp += `@${tag} tiene ${count} mensajes\n`;
}
} else {
console.log('revcontador:', participants);
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
}
} catch (error) {
resp = `${error.stack}`
}

return conn.sendWritingText(m.chat, resp, userdb, m)
}
handler.group = true
handler.command = /revcount/
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";

handler.disabled = false;

export default handler
