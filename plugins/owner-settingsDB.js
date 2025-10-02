let handler = async (m, {conn, args, text, isOwner, usedPrefix, command, db, botdb, privsdb, groupsdb, chatdb, chatsdb, usersdb, userdb, senderJid, objs}) => {
const {waitTwoMinutes, parseDuration, wait} = await import('../lib/functions.js')
const {userID} = await import('../config.js')
//USER
if (/^((un)?banuser)$/i.test(command)) {
let who
if (m.isGroup) {who = m.mentionedJid.length > 0 ? m.mentionedJid[0] : m.quoted?.sender ? m.quoted.sender : undefined} else {who = m.chat}
if (!who) {
return conn.sendWritingText(m.chat, '*[❗INFO❗] INGRESA EL @tag DE ALGUN USUARIO O CONTESTA A UN MENSAJE*', userdb, m)
} else {
try {
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
//CHAT
if (/^((un)?banchat)$/i.test(command)) {
let resp = ''
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
//MASIVE USERS
if (/^(un)?banusersall$/i.test(command)) {
if (!args[0]) {
if (/^banusersall$/i.test(command)) {
try {

let successfulBans = 0;

for (const [jid, data] of Object.entries(usersdb)) {
if (data.banned === true) continue
if (data.banned === false) {
data.banned = true;
successfulBans++;
}
}
for (const [key, value] of Object.entries(usersdb)) {
}
await db.write();

if (successfulBans === 0) {
try {

let resp = `${error} No se pudo banear ningún chat`.trim()
await conn.sendWritingText(m.chat, resp, userdb, m) 
} catch (error) {
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
}
if (/^(unbanusersall)$/i.test(command)) {
try {
await db.read();

let successfulUnbans = 0;

for (const [jid, data] of Object.entries(usersdb)) {
if (data.banned === false) continue
if (data.banned === true) {
data.banned = false;
successfulUnbans++;
}
}

await db.write();

if (successfulUnbans === 0) {
try {
let resp = `No se pudo desbanear ningún chat`.trim()
await conn.sendWritingText(m.chat, resp, userdb, m)

} catch (error) {
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
} else {
const ms = parseDuration(args[0])
if (ms) {
await handler(m, {conn, args: [], usedPrefrix, command: /^banusersall$/i.test(command) ? 'banusersall' : 'unbanusersall', db, privsdb, groupsdb, chatdb, chatsdb, usersdb, userdb, senderJid, objs})
setTimeout(async () => {
await handler(m, {conn, args: [], usedPrefrix, command: /^banusersall$/i.test(command) ? 'unbanusersall' : 'banusersall', db, privsdb, groupsdb, chatdb, chatsdb, usersdb, userdb, senderJid, objs})
}, ms)
}
}
}
//MASIVE PRIVS
if (/^(un)?banchatsprivs$/i.test(command)) {
if (!args[0]) {
if (/^banchatsprivs$/i.test(command)) {
try {
let successfulBans = 0;

for (const [jid, data] of Object.entries(privsdb)) {
if (data.isBanned === true) continue
if (data.isBanned === false) {
data.isBanned = true;
successfulBans++;
}
}

await db.write();

if (successfulBans === 0) {
try {

let resp = `${error} No se pudo banear ningún chat`.trim()
await conn.sendWritingText(m.chat, resp, userdb, m) 
} catch (error) {
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
}
if (/^(unbanchatsprivs)$/i.test(command)) {
try {
await db.read();

let successfulUnbans = 0;

for (const [jid, data] of Object.entries(privsdb)) {
if (data.isBanned === false) continue
if (data.isBanned === true) {
data.isBanned = false;
successfulUnbans++;
}
}

await db.write();

if (successfulUnbans === 0) {
try {

let resp = `No se pudo desbanear ningún chat`.trim()
await conn.sendWritingText(m.chat, resp, userdb, m)
} catch (error) {
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
} else {
const ms = parseDuration(args[0])
if (ms) {
await handler(m, {conn, args: [], usedPrefrix, command: /^banchatsprivs$/i.test(command) ? 'banchatsprivs' : 'unbanchatsprivs', db, privsdb, groupsdb, chatdb, chatsdb, usersdb, userdb, senderJid, objs})
setTimeout(async () => {
await handler(m, {conn, args: [], usedPrefrix, command: /^banchatsprivs$/i.test(command) ? 'unbanchatsprivs' : 'banchatsprivs', db, privsdb, groupsdb, chatdb, chatsdb, usersdb, userdb, senderJid, objs})
}, ms)
}
}
}
//MASIVE GROUPS
if (/^((un)?banchatsgroups)$/i.test(command)) {
if (!args[0]) {
if (/^banchatsgroups$/i.test(command)) {
try {
let successfulBans = 0;

for (const [jid, data] of Object.entries(groupsdb)) {
if (data.isBanned === true) continue
if (data.isBanned === false) {
data.isBanned = true;
successfulBans++;
}
}

await db.write();

if (successfulBans === 0) {
try {

let resp = `${error} No se pudo banear ningún chat`.trim()
await conn.sendWritingText(m.chat, resp, userdb, m) 
} catch (error) {
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
}
if (/^(unbanchatsgroups)$/i.test(command)) {
try {
await db.read();

let successfulUnbans = 0;

for (const [jid, data] of Object.entries(groupsdb)) {
if (data.isBanned === false) continue
if (data.isBanned === true) {
data.isBanned = false;
successfulUnbans++;
}
}

await db.write();

if (successfulUnbans === 0) {
try {

let resp = `No se pudo desbanear ningún chat`.trim()
await conn.sendWritingText(m.chat, resp, userdb, m)
} catch (error) {
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
} else {
const ms = parseDuration(args[0])
if (ms) {
await handler(m, {conn, args: [], usedPrefrix, command: /^banchatsgroups$/i.test(command) ? 'banchatsgroups' : 'unbanchatsgroups', db, privsdb, groupsdb, chatdb, chatsdb, usersdb, userdb, senderJid, objs})
setTimeout(async () => {
await handler(m, {conn, args: [], usedPrefrix, command: /^banchatsgroups$/i.test(command) ? 'unbanchatsgroups' : 'banchatsgroups', db, privsdb, groupsdb, chatdb, chatsdb, usersdb, userdb, senderJid, objs})
}, ms)
}
}

}
//MASIVE ALL CHATS
if (/^(un)?banchatsall$/i.test(command)) {
if (!args[0]) {
if (/^banchatsall$/i.test(command)) {
try {
let successfulBans = 0;

for (const [key, value] of Object.entries(chatsdb)) {
for (const [jid, data] of Object.entries(value)) {
if (data.isBanned === true) continue
if (data.isBanned === false) {
data.isBanned = true;
successfulBans++;
}
}
}
await db.write();

if (successfulBans === 0) {
try {

let resp = `${error} No se pudo banear ningún chat`.trim()
await conn.sendWritingText(m.chat, resp, userdb, m) 
} catch (error) {
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
}
if (/^(unbanchatsall)$/i.test(command)) {
try {
await db.read();

let successfulUnbans = 0;

for (const [key, value] of Object.entries(chatsdb)) {
for (const [jid, data] of Object.entries(value)) {
if (data.isBanned === false) continue
if (data.isBanned === true) {
data.isBanned = false;
successfulUnbans++;
}
}
}
await db.write();

if (successfulUnbans === 0) {
try {

let resp = `No se pudo desbanear ningún chat`.trim()
await conn.sendWritingText(m.chat, resp, userdb, m)
} catch (error) {
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
} else {
const ms = parseDuration(args[0])
if (ms) {
await handler(m, {conn, args: [], usedPrefrix, command: /^banchatsall$/i.test(command) ? 'banchatsall' : 'unbanchatsall', db, privsdb, groupsdb, chatdb, chatsdb, usersdb, userdb, senderJid, objs})
setTimeout(async () => {
await handler(m, {conn, args: [], usedPrefrix, command: /^banchatsall$/i.test(command) ? 'unbanchatsall' : 'banchatsall', db, privsdb, groupsdb, chatdb, chatsdb, usersdb, userdb, senderJid, objs})
}, ms)
}
}
}
//INFO LIST BANCHATS & USERS
if (/^(banlist(users|privs|groups)?)/i.test(command)) {
let chatsPrivs = Object.entries(privsdb).filter(([jid, data]) => data.isBanned)
let chatsGroups = Object.entries(groupsdb).filter(([jid, data]) => data.isBanned)
let users = Object.entries(usersdb).filter(([jid, data]) => data.banned)
const bannedChats = chatsPrivs;
if (/^banlistusers$/i.test(command)) {
let caption = `
┌〔 *USUARIOS BANEADOS* 〕
├ Total : ${users.length} ${users ? '\n' + users.map(([jid], i) => `
├ ${isOwner ? `@${jid.split`@`[0]}` : jid}`.trim()).join('\n') : '├'}
└────
`.trim()
return conn.sendWritingTextCI(m.chat, caption, {mentionedJid: conn.parseMention(caption), groupMentions: await conn.parseGroupMention(caption)}, userdb, m)
} else if (/^banlistprivs$/i.test(command)) {
let caption = `
┌〔 *CHATS PRIVADOS BANEADOS*〕
├ Total : ${chatsPrivs.length} ${chatsPrivs ? '\n' + chatsPrivs.map(([jid], i) => `
├ ${isOwner ? `@${jid.split`@`[0]}` : jid}`.trim()).join('\n') : '├'}
└────
`.trim()
return conn.sendWritingTextCI(m.chat, caption, {mentionedJid: conn.parseMention(caption), groupMentions: await conn.parseGroupMention(caption)}, userdb, m)
} else if (/^banlistgroups$/i.test(command)) {
let caption = `
┌〔 *CHATS GRUPALES BANEADOS*〕
├ Total : ${chatsGroups.length} ${chatsGroups ? '\n' + chatsGroups.map(([jid], i) => `
├ ${isOwner ? `@${jid}` : jid}`.trim()).join('\n') : '├'}
└────
`.trim()
return conn.sendWritingTextCI(m.chat, caption, {mentionedJid: conn.parseMention(caption), groupMentions: await conn.parseGroupMention(caption)}, userdb, m)
} else {
}
let caption = `
┌〔 *USUARIOS BANEADOS* 〕
├ Total : ${users.length} ${users ? '\n' + users.map(([jid], i) => `
├ ${isOwner ? `@${jid.split`@`[0]}` : jid}`.trim()).join('\n') : '├'}
└────

┌〔 *CHATS PRIVADOS BANEADOS*〕
├ Total : ${chatsPrivs.length} ${chatsPrivs ? '\n' + chatsPrivs.map(([jid], i) => `
├ ${isOwner ? `@${jid.split`@`[0]}` : jid}`.trim()).join('\n') : '├'}
└────
┌〔 *CHATS GRUPALES BANEADOS*〕
├ Total : ${chatsGroups.length} ${chatsGroups ? '\n' + chatsGroups.map(([jid], i) => `
├ ${isOwner ? `@${jid}` : jid}`.trim()).join('\n') : '├'}
└────
`.trim()
return conn.sendWritingTextCI(m.chat, caption, {mentionedJid: conn.parseMention(caption), groupMentions: await conn.parseGroupMention(caption)}, userdb, m)
}
if (/^(agregar(vn|msg|video|audio|img|sticker))$/i.test(command)) {
let M = m.constructor
let which = command.replace(/agregar/i, '')
if (!m.quoted) return conn.sendWritingText(m.chat, `*[❗INFO❗] RESPONDE A UN TEXTO MENSAJE, IMAGEN, ETC. Y AÑADE UN TEXTO COMO PALABRA CLAVE*`, userdb, m)
if (!text) return conn.sendWritingText(m.chat, `*[❗INFO❗] UTILIZAR *${usedPrefix}list${which}* PARA VER LA LISTA DE MENSAJES`, userdb, m)
let msgs = botdb.msgs
if (text in msgs) return conn.sendWritingText(m.chat, `*[❗INFO❗] '${text}' SE HA REGISTRADO EN LA LISTA DE MENSAJES`, userdb, m)
msgs[text] = M.toObject(await m.getQuotedObj())
return conn.sendWritingText(m.chat, `*[❗INFO❗] MENSAJE AGREGADO EXITOSAMENTE A LA LISTA DE MENSAJES COMO '${text}'*\n*ACCEDE CON ${usedPrefix}ver${which} ${text}*`, userdb, m)
}
if (/^(eliminar(vn|msg|video|audio|img|sticker))$/i.test(command)) {
let which = command.replace(/eliminar/i, '')
if (!text) return conn.sendWritingText(m.chat, `*[❗INFO❗] USAR ${usedPrefix}list${which} PARA VER LA LISTA*`, userdb, m)
let msgs = botdb.msgs
if (!text in msgs) return conn.sendWritingText(m.chat, `*[❗INFO❗] '${text}' NO REGISTRADO EN LA LISTA DE MENSAJES*`, userdb, m)
delete msgs[text]
return conn.sendWritingText(m.chat, `*[❗INFO❗] ELIMINO CON EXITO DE LA LISTA DE MENSAJES EL MENSAJE CON EL NOMBRE '${text}'*`, userdb, m)
}
if (/^(ver(vn|msg|video|audio|img|sticker))$/i.test(command)) {
let which = command.replace(/ver/i, '')
if (!text) return conn.sendWritingText(m.chat, `*[❗INFO❗] USAR *${usedPrefix}list${which}* PARA VER LA LISTA*`, userdb, m)
let msgs = botdb.msgs
if (!text in msgs) return conn.sendWritingText(m.chat, `*[❗INFO❗] '${text}' NO REGISTRADO EN LA LISTA DE MENSAJES*`, userdb, m)
let _m = await conn.serializeM(msgs[text])
await _m.copyNForward(m.chat, true)
}
if (/^(lista(vn|msg|video|audio|img|sticker))$/i.test(command)) {
let msgs = botdb.msgs
return conn.sendWritingText(m.chat, `
*🔰 LISTA DE TEXTOS/MENSAJES/PALABRAS CLAVE 🔰*

*✳️ MENSAJES ✳️*
${Object.keys(msgs).map(v => '*👉🏻 ' + v).join('*\n*')}*
`.trim(), userdb, m)
}
if (/^(set|add|cmd)(cmd|add|set)$/i.test(command)) {
if (/^(setset|addadd|cmdcmd)$/i.test(command)) return
if (!m.quoted) return conn.sendWritingText(m.chat, `'*[❗INFO❗] RESPONDE AL STICKER O IMAGEN AL CUAL DESEA AGREGAR UN COMANDO O TEXTO*'`, userdb, m)
if (!m.quoted.fileSha256) return conn.sendWritingText(m.chat, `'*[❗INFO❗] SOLO PUEDES ASIGNAR COMANDOS O TEXTOS A STICKERS E IMÁGENES*'`, userdb, m)
if (!text) return conn.sendWritingText(m.chat, `*[❗INFO❗] ERROR DE USO, TEXTO FALTANTE*\n\n*USO CORRECTO DEL COMANDO:*\n*—◉ ${usedPrefix + command} <texto> <responder a sticker o imagen>*\n\n*EJEMPLO DE USO DEL COMANDO:*\n*—◉ ${usedPrefix + command} <#menu> <responder a sticker o imagen>*`, userdb, m)
let sticker = botdb.sticker
let hash = m.quoted.fileSha256.toString('base64')
if (sticker[hash] && sticker[hash].locked) return conn.sendWritingText(m.chat, `'*[❗INFO❗] SOLO EL OWNER PUEDE REALIZAR La MODIFICACIÓN*'`, userdb, m)
sticker[hash] = { text, mentionedJid: m.mentionedJid, creator: senderJid, at: + new Date, locked: false }
return conn.sendWritingText(m.chat, `*[ ✔ ] EL TEXTO/COMANDO ASIGNADO AL STICKER/IMAGEN FUE AGREGADO A La BASE DE DATOS CORRECTAMENTE*`, userdb, m)
}
if (/^(del(ete)?cmd)$/i.test(command)) {
let hash = text
if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex')
if (!hash) return conn.sendWritingText(m.chat, `*[❗INFO❗] SOLO SE PUEDEN ASIGNAR TEXTOS O COMANDOS ASIGNADOS A STICKERS O IMÁGENES, PARA OBTENER EL CÓDIGO ASIGNADO USE EL COMANDO ${usedPrefix}listcmd*`, m)
let sticker = botdb.sticker
if (sticker[hash] && sticker[hash].locked) return conn.sendWritingText(m.chat, `*[❗INFO❗] SOLO EL OWNER PUEDE REALIZAR LA ELIMINACIÓN*`, userdb, m)
delete sticker[hash]
return conn.sendWritingText(m.chat, `*[ ✔ ] EL TEXTO/COMANDO ASIGNADO AL STICKER/IMAGEN FUE ELIMINADO DE LA BASE DE DATOS CORRECTAMENTE*`, userdb, m)
}
if (/^(list(a)?|cmd)(list|cmd)$/i.test(command)) {
if (/^(list(a)?list(a)?|cmdcmd)$/i.test(command)) return
let resp = `*< LISTA DE COMANDOS / TEXTOS ASIGNADOS />*\n${Object.entries(botdb.sticker).map(([key, value], index) => `*${index + 1}.-*\n*CODIGO:* ${value.locked ? `*(bloqueado)* ${key}` : key}\n*COMANDO/TEXTO* ${value.text}`).join('\n\n')}
`.trim()
await conn.writing(m.chat, resp)
return conn.sendMessage(m.chat, { text: resp, mentions: Object.values(botdb.sticker).map(x => x.mentionedJid).reduce((a, b) => [...a, ...b], []) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
};
handler.help = ['banchatAll']

handler.tags = ['owner']
//
handler.command = /^((un)?ban((chat|user)(s(privs|groups|all))?))|^(banlist(users|privs|groups)?)|^((agregar|eliminar|ver|lista)(vn|msg|video|audio|img|sticker))|^((set|add)cmd)|^(set|add|cmd|list(a)?|del(ete)?(cmd|add|set))$/i
handler.owner = true
handler.menu = [
{title: "👑 BANCHAT", description: "#banchat ", id: `banchat`}, 
{title: "👑 UNBANCHAT", description: "#unbanchat ", id: `unbanchat`}, 
{title: "👑 BANUSER", description: "#banuser <@tag> ", id: `banuser`}, 
{title: "👑 UNBANUSER", description: "#unbanuser <@tag> ", id: `unbanuser`}, 
{title: "👑 BANCHATS", description: "#banchatsall <time>\n*Nota:* El tiempo es opcional y el formato puede ser desde 1s(un segundo) hasta dias(1d) siempre y cuando el bot no sea reinicado los chats estaran baneados durante el tiempo elejido y volveran a su estado anterior", id: `banchatsall`}, 
{title: "👑 UNBANCHATS", description: "#unbanchatsall <time>\n*Nota:* El tiempo es opcional y el formato puede ser desde 1s(un segundo) hasta dias(1d) siempre y cuando el bot no sea reinicado los chats estaran desbaneados durante el tiempo elejido y volveran a su estado anterior", id: `unbanchatsall`}, 
{title: "👑 BANUSERS", description: "#banuser <time>\n*Nota:* El tiempo es opcional y el formato puede ser desde 1s(un segundo) hasta dias(1d) siempre y cuando el bot no sea reinicado los usuarios estaran baneados durante el tiempo elejido y volveran a su estado anterior", id: `banusersall`}, 
{title: "👑 UNBANUSERS", description: "#unbanuser <time>\n*Nota:* El tiempo es opcional y el formato puede ser desde 1s(un segundo) hasta dias(1d) siempre y cuando el bot no sea reinicado los usuarios estaran desbaneados durante el tiempo elejido y volveran a su estado anterior", id: `unbanusersall`}, 
{title: "👑 BANCHATSPRIVS", description: "#banchatsprivs <time>*\n*(Usa #help banchatsprivs Para más información)", id: `banchatsprivs`}, 
{title: "👑 UNBANCHATSPRIVS", description: "#unbanchatsprivs <time>*\n*(Usa #help unbanchatsprivs Para más información)", id: `unbanchatsprivs`}, 
{title: "👑 BANCHATSGROUPS", description: "#banchatsgroups <time>*\n*(Usa #help banchatsgroups Para más información)", id: `banchatsgroups`}, 
{title: "👑 UNBANCHATSGROUPS", description: "#unbanchatsgroups <time>*\n*(Usa #help unbanchatsgroups Para más información)", id: `unbanchatsgroups`}, 
{title: "👑 BANLIST", description: "Muestra la lista de usuarios y grupos baneados usando #banlist", id: `banlist`},
{title: "👑 BANLISTUSERS", description: "Muestra solamente los usuarios baneados Usando #banuser", id: `banuser`}, 
{title: "👑 BANLISTPRIVS", description: "Muestra solamente los chats privados baneados usando #banlistprivs", id: `banlistprivs`}, 
{title: "👑 BANLISTGROUPS", description: "Muestra sólo los grupos baneados usando #banlistgroups", id: `banlistgroups`}, 
{header: `AGREGAR A LA LISTA`, title: "🗳️ AGREGAR MENSAJE", description: "#agregarmsg *<texto/comando/palabra clave>* (responde a un texto) ", id: `agregarmsg`},
{title: "🗳️ AGREGAR VN", description: "#agregarvn *<texto/comando/palabra clave>* (responde a una nota de voz) ", id: `agregarvn`},
{title: "🗳️ AGREGAR VIDEO", description: "#agregarvideo *<texto/comando/palabra clave>* (responde a un video) ", id: `agregarvideo`},
{title: "🗳️ AGREGAR AUDIO", description: "#agregaraudio *<texto/comando/palabra clave>* (responde a un audio) ", id: `agregaraudio`},
{title: "🗳️ AGREGAR IMAGEN", description: "#agregarimg *<texto/comando/palabra clave>* (responde a una imagen) ", id: `agregarimg`},
{title: "🗳️ AGREGAR STICKER", description: "#agregarsticker *<texto/comando/palabra clave>* (responde a un sticker) ", id: `agregarsticker`},
{header: `ELIMINAR DE LA LISTA`, title: "🗳️ ELIMINAR MENSAJE", description: "#eliminarmsg *<texto/comando/palabra clave>* ", id: `eliminarmsg`},
{title: "🗳️ ELIMINAR VN", description: "#eliminarvn *<texto/comando/palabra clave>* ", id: `eliminarvn`},
{title: "🗳️ ELIMINAR VIDEO", description: "#eliminarvideo *<texto/comando/palabra clave>* ", id: `eliminarvideo`},
{title: "🗳️ ELIMINAR AUDIO", description: "#eliminaraudio *<texto/comando/palabra clave>* ", id: `eliminaraudio`},
{title: "🗳️ ELIMINAR IMAGEN", description: "#eliminarimg *<texto/comando/palabra clave>* ", id: `eliminarimg`},
{title: "🗳️ ELIMINAR STICKER", description: "#eliminarsticker *<texto/comando/palabra clave>* ", id: `eliminarsticker`},
{header: `VER TEXTOS O ARCHIVOS`, title: "🗳️ VER MENSAJE", description: "#vermsg *<texto/comando/palabra clave>* ", id: `vermsg`},
{title: "🗳️ VER VN", description: "#vervn *<texto/comando/palabra clave>* ", id: `vervn`},
{title: "🗳️ VER VIDEO", description: "#vervideo *<texto/comando/palabra clave>* ", id: `vervideo`},
{title: "🗳️ VER AUDIO", description: "#veraudio *<texto/comando/palabra clave>* ", id: `veraudio`},
{title: "🗳️ VER IMAGEN", description: "#verimg *<texto/comando/palabra clave>* ", id: `verimg`},
{title: "🗳️ VER STICKER", description: "#versticker *<texto/comando/palabra clave>* ", id: `versticker`},
{header: 'LISTAR MENSAJES', title: "🗳️ LISTA MENSAJE", description: "#listamsg ", id: `listamsg`},
{title: "🗳️ LISTA VN", description: "#listavn ", id: `listavn`},
{title: "🗳️ LISTA VIDEO", description: "#listavideo ", id: `listavideo`},
{title: "🗳️ LISTA AUDIO", description: "#listaaudio ", id: `listaaudio`},
{title: "🗳️ LISTA IMAGEN", description: "#listaimg ", id: `listaimg`},
{title: "🗳️ LISTA STICKER", description: "#listasticker ", id: `listasticker`},
{header: 'COMANDOS EN MULTIMEDIA', title: 'ADDCMD', description: ' agrega comandos a un sticker o a una imagen', id: 'addcmd'},
{title: 'DELCMD', description: ' Elimina comandos de un sticker o a una imagen', id: 'delcmd'},
{title: 'LISTCMD', description: 'Lista comandos asignados de stickers he imagenes guardadas', id: 'listcmd'}
];
handler.type = "owners";

handler.disabled = false;

export default handler