let handler = async (m, {conn, args, usedPrefrix, command, db, privsdb, groupsdb, chatdb, chatsdb, usersdb, userdb, senderJid, objs}) => {
const {waitTwoMinutes} = await import('../lib/functions.js')
const {userID} = await import('../config.js')
if (/^(un)?banuser$/i.test(command)) {
let who
if (m.isGroup) {who = m.mentionedJid[0]} else {who = m.chat}
if (!text || !who) {
return conn.sendWritingText(m.chat, '*[❗INFO❗] INGRESA EL @tag DE ALGUN USUARIO*', userdb, m)
} else {
try {
console.log('(ban/unban)user: ', /^banuser$/i.test(command))
if (/^banuser$/i.test(command)) {
usersdb[who].banned = true
return conn.sendWritingText(m.chat, `*[❗INFO❗] EL USUARIO FUE BANEADO CON ÉXITO*\n*—◉ EL USUARIO YA NO PODRÁ USAR EL BOT HASTA QUE SEA DESBANEADO*`, userdb, m)
} else if (/^unbanuser$/i.test(command)) {
usersdb[who].banned = false
return conn.sendWritingText(m.chat, `*[❗INFO❗] EL USUARIO FUE DESBANEADO CON ÉXITO*\n*—◉ EL USUARIO YA PUEDE USAR EL BOT*`, userdb, m)
}
} catch (error) {
return conn.sendWritingText(m.chat, `${error.stack}`, userdb, m)
}
}
}
if (/^(un)?banchat$/i.test(command)) {
console.log('(ban/unban)chat: ', m.mentionedJid)
let resp = ''
//let me = args !== null ? : m.quoted.fromMe.includes(conn.user.jid)
//if (m.isGroup && !m.mentionedJid.includes(conn.user.jid)) return
try {
if (/^banchat$/i.test(command)) {
if (!args[0] || (m && m.quoted && m.quoted.fromMe)) {
chatdb.isBanned = true
resp = '*[❗INFO❗] ESTE CHAT FUE BANEADO CON EXITO*\n\n*—◉ EL BOT NO REACCIONARA A NINGUN COMANDO HASTA DESBANEAR ESTE CHAT*'
return conn.sendWritingText(m.chat, resp, userdb, m);
} else if (m.isGroup && (args[0].toString().replace('@', '') + userID).includes(conn.user.jid)) {
chatdb.isBanned = true
resp = `*[❗INFO❗] ESTE CHAT FUE BANEADO PARA QUE @${conn.user.jid.split`@`[0]} NO RESPONDA EN ESTE CHAT*\n\n—◉ LOS BOTS BANEADOS NO RESPONDERÁN A NINGÚN COMANDO HASTA QUE SEAN *DESBANEADOS*`
return conn.sendWritingText(m.chat, resp, userdb, m);
} else if (!m.isGroup && !m.mentionedJid.includes(conn.user.jid) && !m.quoted) {
chatdb.isBanned = true
resp = `*[❗INFO❗] ESTE CHAT FUE BANEADO CON EXITO*\n\n*—◉ EL BOT NO REACCIONARA A NINGUN COMANDO HASTA DESBANEAR ESTE CHAT*`
return conn.sendWritingText(m.chat, resp, userdb, m);
}
} else if (/^unbanchat$/i.test(command)) {
if (!args[0] || (m && m.quoted && m.quoted.fromMe)) {
chatdb.isBanned = false
resp = '*[❗INFO❗] ESTE CHAT FUE DESBANEADO CON EXITO*'
return conn.sendWritingText(m.chat, resp, userdb, m);
} else if (m.isGroup && (args[0].toString().replace('@', '') + userID).includes(conn.user.jid)) {
chatdb.isBanned = false
resp = `*[❗INFO❗] ESTE CHAT FUE DESBANEADO PARA QUE @${conn.user.jid.split`@`[0]} RESPONDA EN ESTE CHAT*\n\n—◉ LOS BOTS DESBANEADOS RESPONDERÁN A TODOS LOS COMANDOS HASTA QUE SEAN *BANEADOS*`
return conn.sendWritingText(m.chat, resp, userdb, m);
} else if (!m.isGroup && !m.mentionedJid.includes(conn.user.jid) && !m.quoted) {
chatdb.isBanned = false
resp = `*[❗INFO❗] ESTE CHAT FUE DESBANEADO CON EXITO*\n\n*—◉ EL BOT REACCIONARA A TODOS LOS COMANDO HASTA BANEAR ESTE CHAT*`
return conn.sendWritingText(m.chat, resp, userdb, m);
}
}
} catch (error) {
resp = `${error}`
return conn.sendWritingText(m.chat, resp, userdb, m);
}
}
if (/^banchatsprivs$/i.test(command)) {}
if (/^banchatsgroups$/i.test(command)) {}
if (/^banchatsall$/i.test(command)) {
try {
// Leer la base de datos
//await db.read();

// Buscar y actualizar todos los isBanned: false
const chats = db.data.bot[conn.user.jid].chats;
let successfulBans = 0;

for (const [key, value] of Object.entries(chats)) {

if (value.isBanned === false) {
value.isBanned = true;
//console.log('Baneando chat:', key);
successfulBans++;
}
}

// Escribir los cambios en la base de datos
await db.write();

if (successfulBans === 0) {
try {

} catch (error) {
let resp = `${error} No se pudo banear ningún chat`.trim()
await conn.sendWritingText(m.chat, resp, userdb, m) 
throw new Error('No se pudo banear ningún chat', error);
}
} else {
let resp = `Se banearon ${successfulBans} chats correctamente`.trim()
await conn.sendWritingText(m.chat, resp, userdb, m)
}

} catch (e) {
let resp = `Error: ${e.message}`.trim()
await conn.sendWritingText(m.chat, resp, userdb, m)
} 
await waitTwoMinutes() 
try {
// Leer la base de datos
await db.read();

// Buscar y actualizar todos los isBanned: false
const chats = db.data.bot[conn.user.jid].chats;
let successfulUnbans = 0;

for (const [key, value] of Object.entries(chats)) {
if (value.isBanned === true) {
value.isBanned = false;
//console.log('Desbaneando chat:', key);
successfulUnbans++;
}
}

// Escribir los cambios en la base de datos
await db.write();

if (successfulUnbans === 0) {
try {

} catch (error) {
let resp = `No se pudo desbanear ningún chat`.trim()
await conn.sendWritingText(m.chat, resp, userdb, m)
throw new Error('No se pudo desbanear ningún chat', error);

}
} else {
let resp = `Se desbanearon ${successfulUnbans} chats correctamente`.trim()
await conn.sendWritingText(m.chat, resp, userdb, m)
}

} catch (e) {
let resp = `Error: ${e.message}`.trim()
await conn.sendWritingText(m.chat, resp, userdb, m)}
}

};
handler.help = ['banchatAll']

handler.tags = ['owner']

handler.command = /^((un)?ban(chat(s(privs|groups|all))?))$/i
handler.owner = true
handler.menu = [];
handler.type = "";

handler.disabled = false;

export default handler