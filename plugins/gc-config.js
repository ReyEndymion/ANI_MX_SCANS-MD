let handler = async (m, { conn, args, usedPrefix, command, botAdmin }) => {
if (!m.isGroup) resp = `Esta accion solo puede ser usada en grupos`
const bot = global.db.data.bot[conn.user.jid]
const chats = bot.chats || {}
const groups = chats.groups || {}
const chat = m.isGroup ? groups[m.chat] || {} : privs[m.chat] || {}
const users = m.isGroup ? chat.users || {} : privs || {}
let user = m.isGroup ? users[m.sender] || {} : privs[m.sender] || {}
var resp = ''
if (botAdmin) {
let isClose = { // Switch Case Like :v
'open': 'not_announcement',
'close': 'announcement',
'abierto': 'not_announcement',
'cerrado': 'announcement',
'abrir': 'not_announcement',
'cerrar': 'announcement',
}[(args[0] || '')]
if (isClose === undefined) {
resp = `
*[❗] FORMATO ERRONEO!!*

*┏━━━❲ ✨EJEMPLO✨ ❳━━━┓* 
*┠┉↯ ${usedPrefix + command} abrir*
*┠┉↯ ${usedPrefix + command} cerrar*
`.trim()
} else {
await conn.groupSettingUpdate(m.chat, isClose)
resp = '*[ ✔ ] GRUPO CONFIGURADO CORRECTAMENTE*'
if (isClose === ('cerrado' || 'cerrar' || 'close') && !botAdmin) chat.isBanned = true
if (isClose === ('abierto' || 'abrir' || 'open') && !botAdmin) chat.isBanned = false

}
} else {
resp = `No soy admin: no puedo realizar esta accion`
}
return conn.sendWritingText(m.chat, resp, m)
}
handler.help = ['group open / close', 'grupo abrir / cerrar']
handler.tags = ['group']
handler.command = /^(group|grupo)$/i
handler.group = handler.admin = handler.botAdmin = true
export default handler
