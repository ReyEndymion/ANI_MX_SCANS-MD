let handler = async (m, {conn, args, chatdb, command, userdb, senderJid}) => {
console.log('(ban/unban)chat: ', m.mentionedJid)
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
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = /^(un)?banchat$/i
handler.owner = true
handler.menu = [
{title: "👑 BANCHAT", description: "#banchat ", id: `banchat`}, 
{title: "👑 UNBANCHAT", description: "#unbanchat ", id: `unbanchat`}, 
];
handler.type = "owners";

handler.disabled = false;

export default handler
