import { Low, JSONFile } from 'lowdb';
import fs, { existsSync, mkdirSync } from 'fs';
const isNumber = (x) => typeof x === 'number' && !isNaN(x);
export async function before (m, {conn, participants, isAdmin}) {
if (!m.isGroup) return; 
let bot = global.db.data.bot[conn.user.jid];
if (typeof bot != 'object') global.db.data.bot[conn.user.jid] = {}
if (bot) {
let chats = global.db.data.bot[conn.user.jid].chats
if (typeof chats != 'object') global.db.data.bot[conn.user.jid].chats = {}
if (chats) {
let groups = global.db.data.bot[conn.user.jid].chats.groups
if (typeof groups != 'object') global.db.data.bot[conn.user.jid].chats.groups = {}
if (groups) {
let chat = global.db.data.bot[conn.user.jid].chats.groups[m.chat]
if (typeof chat != 'object') chat = {}
if (chat) {
let users = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users
if (typeof users != 'object') global.db.data.bot[conn.user.jid].chats.groups[m.chat].users = {}
if (users) {
const participantsJIDs = participants.map(p => p.id);

for (const jid of Object.keys(users)) {
if (!participantsJIDs.includes(jid)) {
delete users[jid];
console.log(`Usuario ${jid} eliminado de la base de datos del grupo ${m.chat}.`, !jid.includes(participantsJIDs));
}
}

let user = users[m.sender]
if (typeof user != 'object') global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender] = {}
if (user) {
if (!('msgcount' in user)) user.msgcount = {};
if (!('count') in user.msgcount) user.msgcount.count = 0
if (!('time') in user.msgcount) user.msgcount.time = 0
if (m.mtype) {
users[m.sender].msgcount.count++;
}
console.log('countANI: ', m.sender, user.msgcount)
await global.db.write();
} else {
if (m.sender) {
users[m.sender] = {msgcount: {count: 0, time: 0}}
} else {
for (const participant of participants) {
if (!(participant.id in users)) {
users[participant.id] = {
msgcount: {
count: 0,
time: 0
}
};
await global.db.write();
console.log(`Usuario ${participant.id} inicializado en la base de datos.`);
} else if (!Object.keys(users).includes(participant.id)) {
console.log('comandReset: ', m.chat)
// Aquí no haces nada, pero es un lugar donde podrías agregar lógica adicional si lo necesitas.
}
}
}
}
if(/^resetcount|rc$/i.test(m.text) && isAdmin) {
let resp = ''
try {
const currentTime = Date.now();
const date = new Date(currentTime);
const day = date.getDate();
const monthNames = [
'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];
const month = monthNames[date.getMonth()];
const year = date.getFullYear();
const formattedDate = `${day} de ${month} de ${year}`;
for (let user in users) {
console.log('resetCountANI=>users: ', m.sender, users[user].msgcount);
if (user) {
//delete db.data.bot[conn.user.jid].chats.groups[m.chat].users[user].msgcount.count
//db.data.bot[conn.user.jid].chats.groups[m.chat].users[user] = {msgcount: {count: 0, time: currentTime}}
}
users[user].msgcount.count = 0;
users[user].msgcount.time = currentTime;
}
await global.db.write();
resp = `Se ha reiniciado el contador con fecha => ${formattedDate}`;
} catch (e) {
resp = `${e.stack}`
}
let txt = '';
let count = 0;
if (resp === undefined) return
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 15));
txt += c;
count++;
if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
}
}
return conn.sendMessage(m.chat, {text: resp, mentions: conn.parseMention(resp)}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})

}
await global.db.write();
} else {
global.db.data.bot[conn.user.jid].chats.groups[m.chat].users = {
[m.sender]: {}
}
}
} else {
global.db.data.bot[conn.user.jid].chats.groups[m.chat] = {
users: {}
}
}
} else {
global.db.data.bot[conn.user.jid].chats.groups = {
[m.chat]: {}
}
}
} else {
global.db.data.bot[conn.user.jid].chats = {
groups: {}
}
}
} else {
global.db.data.bot[conn.user.jid] = {
chats: {
privs: {},
groups: {}
}
}
}
if (!bot) {
bot[conn.user.jid] = { chats: { privs: {}, groups: {} } };
global.db.data.bot[conn.user.jid] = bot;
}
}

/*
// soporte para bots
import { Low, JSONFile } from 'lowdb';
import fs, { existsSync, mkdirSync } from 'fs';
const isNumber = (x) => typeof x === 'number' && !isNaN(x);

const databaseFile = './countMessagesReg.json';
const adapter = new JSONFile(databaseFile);
const db = new Low(adapter);
if (db) {
await db.read();
db.data = db.data || {};
db.data.bot = db.data.bot || {};
db.write();
} else {
db.write();
}

export async function before (m, {conn, participants, isAdmin}) {
if (!m.isGroup) return; 
let bot = db.data.bot[conn.user.jid];
if (typeof bot != 'object') db.data.bot[conn.user.jid] = {}
if (bot) {
let chats = db.data.bot[conn.user.jid].chats
if (typeof chats != 'object') db.data.bot[conn.user.jid].chats = {}
if (chats) {
let groups = db.data.bot[conn.user.jid].chats.groups
if (typeof groups != 'object') db.data.bot[conn.user.jid].chats.groups = {}
if (groups) {
let chat = db.data.bot[conn.user.jid].chats.groups[m.chat]
if (typeof chat != 'object') chat = {}
if (chat) {
let users = db.data.bot[conn.user.jid].chats.groups[m.chat].users
if (typeof users != 'object') db.data.bot[conn.user.jid].chats.groups[m.chat].users = {}
if (users) {
const participantsJIDs = participants.map(p => p.id);

for (const jid of Object.keys(users)) {
console.log('fixcountANI: ', m.sender, participants)
if (!participantsJIDs.includes(jid)) {
delete users[jid];
console.log(`Usuario ${jid} eliminado de la base de datos.`);
}
}

let user = users[m.sender]
if (typeof user != 'object') db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender] = {}
if (user) {
if (!('msgcount' in user)) user.msgcount = {};
if (!('count') in user.msgcount) user.msgcount.count = 0
if (!('time') in user.msgcount) user.msgcount.time = 0
if (m.mtype) {
users[m.sender].msgcount.count++;
}
console.log('countANI: ', m.sender, user.msgcount)
await db.write();
} else {
if (m.sender) {
users[m.sender] = {msgcount: {count: 0, time: 0}}
} else {
for (const participant of participants) {
if (!(participant.id in users)) {
users[participant.id] = {
msgcount: {
count: 0,
time: 0
}
};
await db.write();
console.log(`Usuario ${participant.id} inicializado en la base de datos.`);
} else if (!Object.keys(users).includes(participant.id)) {
console.log('comandReset: ', m.chat)
// Aquí no haces nada, pero es un lugar donde podrías agregar lógica adicional si lo necesitas.
}
}
}}
if(/^resetcount|rc$/i.test(m.text) && isAdmin) {
let resp = ''
try {
const currentTime = Date.now();
const date = new Date(currentTime);
const day = date.getDate();
const monthNames = [
'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];
const month = monthNames[date.getMonth()];
const year = date.getFullYear();
const formattedDate = `${day} de ${month} de ${year}`;
for (let user in users) {
console.log('resetCountANI=>users: ', m.sender, users[user].msgcount);
if (user) {
//delete db.data.bot[conn.user.jid].chats.groups[m.chat].users[user].msgcount.count
//db.data.bot[conn.user.jid].chats.groups[m.chat].users[user] = {msgcount: {count: 0, time: currentTime}}
}
users[user].msgcount.count = 0;
users[user].msgcount.time = currentTime;
}
await db.write();
resp = `Se ha reiniciado el contador con fecha => ${formattedDate}`;
} catch (e) {
resp = `${e.stack}`
}
let txt = '';
let count = 0;
if (resp === undefined) return
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 15));
txt += c;
count++;
if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
}
}
return conn.sendMessage(m.chat, {text: resp, mentions: conn.parseMention(resp)}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})

}
await db.write();
} else {

}
} else {}
} else {}
} else {}
} else {
db.data.bot[conn.user.jid] = {
chats: {
privs: {},
groups: {}
}
}
}
if (!bot) {
bot[conn.user.jid] = { chats: { privs: {}, groups: {} } };
db.data.bot[conn.user.jid] = bot;
}
*/
