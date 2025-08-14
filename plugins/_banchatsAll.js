let handler = async (m, {conn, chatsdb, db, userdb, senderJid}) => {
const allchats = { ...chatsdb.groups, ...chatsdb.privs }
try {
// Leer la base de datos
//await db.read();

// Buscar y actualizar todos los isBanned: false
let successfulBans = 0;
for (const [key, value] of Object.entries(allchats)) {

if (value.isBanned === false) {
value.isBanned = true;
//console.log('Baneando chat:', key);
successfulBans++;
}
}

// Escribir los cambios en la base de datos
//await db.write();

if (successfulBans === 0) {
try {

} catch (error) {
let resp = `${error} No se pudo banear ningún chat`.trim()
console.log (error, 'No se pudo banear ningún chat')
await conn.sendWritingText(m.chat, resp, userdb, m )
throw new Error('No se pudo banear ningún chat', error);
}
} else {
let resp = `Se banearon ${successfulBans} chats correctamente`.trim()
console.log(`Se banearon ${successfulBans} chats correctamente`);
await conn.sendWritingText(m.chat, resp, userdb, m )
}

} catch (e) {
let resp = `Error: ${e.message}`.trim()
await conn.sendWritingText(m.chat, resp, userdb, m )
} 
const {waitTwoMinutes} = await import('../lib/functions.js')
await waitTwoMinutes() 
try {
// Leer la base de datos
//await db.read();

// Buscar y actualizar todos los isBanned: false
let successfulUnbans = 0;

for (const [key, value] of Object.entries(allchats)) {
if (value.isBanned === true) {
value.isBanned = false;
//console.log('Desbaneando chat:', key);
successfulUnbans++;
}
}

// Escribir los cambios en la base de datos
//await db.write();

if (successfulUnbans === 0) {
try {

} catch (error) {
let resp = `No se pudo desbanear ningún chat`.trim()
await conn.sendWritingText(m.chat, resp, userdb, m )
throw new Error('No se pudo desbanear ningún chat', error);

}
} else {
let resp = `Se desbanearon ${successfulUnbans} chats correctamente`.trim()
await conn.sendWritingText(m.chat, resp, userdb, m )
}

} catch (e) {
let resp = `Error: ${e.message}`.trim()
await conn.sendWritingText(m.chat, resp, userdb, m )
}


};
handler.help = ['banchatAll']

handler.tags = ['owner']

handler.command = /^banchatall$/i
handler.owner = true
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler