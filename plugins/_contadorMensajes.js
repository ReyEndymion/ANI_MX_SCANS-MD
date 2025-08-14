export async function before (m, {conn, participants, isAdmin, db, chatdb, usersdb, userdb, senderJid, objs}) {
const {sessionNameAni} = objs
const {monthNames} = await import('../lib/constants.js')
if (!m.isGroup || !chatdb.isCountMsgs) return; 
if (userdb) {
if (!('msgcount' in userdb)) userdb.msgcount = {};
if (!('count') in userdb.msgcount) userdb.msgcount.count = 0
if (!('time') in userdb.msgcount) userdb.msgcount.time = 0
if (m.mtype) {
userdb.msgcount.count++;
}
console.log(`countANI: `, senderJid, userdb.msgcount)
await db.write();
} else {
Object.assign(userdb, {msgcount: {count: 0, time: 0}})
}
if (/^resetcount|rc$/i.test(m.text) && isAdmin) {
let resp = ''
try {
const currentTime = Date.now();
const date = new Date(currentTime);
const day = date.getDate();
const month = monthNames[date.getMonth()];
const year = date.getFullYear();
const formattedDate = `${day} de ${month} de ${year}`;
for (let user in usersdb) {
console.log('resetCountANI=>users: ', user);
usersdb[user].msgcount.count = 0;
usersdb[user].msgcount.time = currentTime;
}
await db.write();
resp = `Se ha reiniciado el contador con fecha => ${formattedDate}`;
} catch (e) {
resp = `${e.stack}`
}
return conn.sendWritingText(m.chat, resp, userdb, m)

}
await db.write();
}
