let handler = async (m, {conn, args, usedPrefix, command, isBotAdmin, db, chatdb, userdb, senderJid}) => {
if (!m.isGroup) return conn.sendWritingText(m.chat, `Esta accion solo puede ser usada en grupos`, userdb, m)

if (isBotAdmin) {
let isClose = { // Switch Case Like :v
'open': 'not_announcement',
'close': 'announcement',
'abierto': 'not_announcement',
'cerrado': 'announcement',
'abrir': 'not_announcement',
'cerrar': 'announcement',
}[(args[0] || '')]
if (isClose === undefined) {
let resp = `
*[❗] FORMATO ERRONEO!!*

*┏━━━❲ ✨EJEMPLO✨ ❳━━━┓* 
*┠┉↯ ${usedPrefix + command} abrir*
*┠┉↯ ${usedPrefix + command} cerrar*
`.trim()
return conn.sendWritingText(m.chat, resp, userdb, m)
}
await conn.groupSettingUpdate(m.chat, isClose)
let resp = '*[ ✔ ] GRUPO CONFIGURADO CORRECTAMENTE*'
if (isClose === ('cerrado' || 'cerrar' || 'close') && !isBotAdmin) chatdb.isBanned = true
if (isClose === ('abierto' || 'abrir' || 'open') && !isBotAdmin) chatdb.isBanned = false
return conn.sendWritingText(m.chat, resp, userdb, m)
} else {
let resp = `No soy admin: no puedo realizar esta accion`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
}
handler.help = ['group open / close', 'grupo abrir / cerrar']
handler.tags = ['group']
handler.command = /^(group|grupo)$/i
handler.admin = true
handler.group = handler.admin = handler.botAdmin = true
handler.menu = [
{title:"💎 ABRE O CIERRA EL GRUPO", description: "abrir o cerrar el grupo para controlar la conversacion usando #grupo", id: `grupo`},
];
handler.type = "gadmin";
handler.disabled = false;

export default handler
