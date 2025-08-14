/**
* revicion del contador de mensajes para ANI MX SCANS
* Creado por Rey Endymion
*/

//import { Low, JSONFile } from 'lowdb';
//import { join } from 'path';
//import fs, { existsSync, mkdirSync } from 'fs';
/**
const contMensajes = '../CountMessages';
const databaseFile = './countMessagesReg.json';
const adapter = new JSONFile(databaseFile);
const db = new Low(adapter);
*/
async function handler (m, {conn, args, participants, isAdmin, db, usersdb }) {
const {isNumber, formatNumberWA} = await import('../lib/functions.js')
   //await db.read();
let participantIds = new Set(participants.map(u => u.id));
//let groupMetadata = await conn.groupMetadata(m.chat)
//participants = groupMetadata.participants //= conn.chats[m.chat].metadata.!(userId in users)
for (let participant of participants) {
let userId = await participant.id;
if (!(userId in usersdb)) {
usersdb[userId] = {
msgcount: {
count: 0,
time: 0
}
};
//await db.write();
console.log(`Usuario ${userId} inicializado en la base de datos.`);
}
//
}
for (let userId in usersdb) {
if (!participantIds.has(userId) || typeof usersdb[userId] !== 'object' || usersdb[userId] === null) {
//delete usersdb[userId];
}
}
let resp = ''
try {
if (/\d+/g.test(args[0]) && isAdmin) {
console.log('mentioned: ', args)

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
users[who].msgcount.count = 0;
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
who = m.sender;
}
} else {
who = m.sender;
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
if (resp === undefined) return
return conn.sendWritingText(m.chat, resp, m)}
//handler.admin = true
handler.command = /^revcount$/i
export default handler