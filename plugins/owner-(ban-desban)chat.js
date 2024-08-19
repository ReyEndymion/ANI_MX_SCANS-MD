let handler = async (m, {conn, args, command}) => {
let bot = global.db.data.bot[conn.user.jid]
let chats = bot.chats
let privs = chats.privs
let groups = chats.groups
let chat = m.isGroup ? groups[m.chat] : privs[m.chat]
console.log('(ban/unban)chat: ', chat)
let resp
try {
 if (/^banchat$/i.test(command)) {
if (!args[0] || (m && m.quoted && m.quoted.fromMe)) {
chat.isBanned = true
resp = '*[❗INFO❗] ESTE CHAT FUE BANEADO CON EXITO*\n\n*—◉ EL BOT NO REACCIONARA A NINGUN COMANDO HASTA DESBANEAR ESTE CHAT*'
} else if (m.isGroup && (args[0].toString().replace('@', '') + userID).includes(conn.user.jid)) {
 chat.isBanned = true
 resp = `*[❗INFO❗] ESTE CHAT FUE BANEADO PARA QUE @${conn.user.jid.split`@`[0]} NO RESPONDA EN ESTE CHAT*\n\n—◉ LOS BOTS BANEADOS NO RESPONDERÁN A NINGÚN COMANDO HASTA QUE SEAN *DESBANEADOS*`
 } else if (!m.isGroup && !m.mentionedJid.includes(conn.user.jid) && !m.quoted) {
 chat.isBanned = true
 resp = `*[❗INFO❗] ESTE CHAT FUE BANEADO CON EXITO*\n\n*—◉ EL BOT NO REACCIONARA A NINGUN COMANDO HASTA DESBANEAR ESTE CHAT*`
}
}else if (/^unbanchat$/i.test(command)) {
if (!args[0] || (m && m.quoted && m.quoted.fromMe)) {
chat.isBanned = false
resp = '*[❗INFO❗] ESTE CHAT FUE DESBANEADO CON EXITO*'
} else if (m.isGroup && (args[0].toString().replace('@', '') + userID).includes(conn.user.jid)) {
chat.isBanned = false
resp = `*[❗INFO❗] ESTE CHAT FUE DESBANEADO PARA QUE @${conn.user.jid.split`@`[0]} RESPONDA EN ESTE CHAT*\n\n—◉ LOS BOTS DESBANEADOS RESPONDERÁN A TODOS LOS COMANDOS HASTA QUE SEAN *BANEADOS*`
} else if (!m.isGroup && !m.mentionedJid.includes(conn.user.jid) && !m.quoted) {
chat.isBanned = false
resp = `*[❗INFO❗] ESTE CHAT FUE DESBANEADO CON EXITO*\n\n*—◉ EL BOT REACCIONARA A TODOS LOS COMANDO HASTA BANEAR ESTE CHAT*`
 }
}
} catch (error) {
 resp = `${error}`
}
 let txt = '';
 let count = 0;
 if (resp === undefined) return
 for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 20));
txt += c;
count++;
if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing', m.chat);
}
 }
 await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(resp) }, {quoted: m}, { disappearingMessagesInChat: 1 * 1000} );
} 
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = /^(un)?banchat$/i
handler.owner = true
export default handler

/*
let handler = async (m, {conn, isROwner}) => {
global.db.data.chats[m.chat].isBanned = true
 let resp = '*[❗INFO❗] ESTE CHAT FUE BANEADO CON EXITO*\n\n*—◉ EL BOT NO REACCIONARA A NINGUN COMANDO HASTA DESBANEAR ESTE CHAT*'
 let txt = '';
 let count = 0;
 for (const c of resp) {
 await new Promise(resolve => setTimeout(resolve, 15));
 txt += c;
 count++;
 
 if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
 }
 }
 return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
handler.help = ['banchat']

handler.tags = ['owner']

handler.command = /^banchat$/i
handler.owner = true
export default handler
*/
