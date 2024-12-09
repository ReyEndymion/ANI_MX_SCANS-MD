//let handler = m => m
export async function before(m, {conn}) {
if (m.chat.endsWith('broadcast')) return
if (!m.isGroup) return
let bot = global.db.data.bot[conn.user.jid]
let chats = bot.chats || {}
let privs = chats.privs || {}
const groups = chats.groups || {}
const chat = m.isGroup ? groups[m.chat] || {} : privs[m.chat] || {}
const users = m.isGroup ? chat.users || {} : privs
const user = m.isGroup ? users[m.sender] || {} : privs[m.sender] || {}
//console.log('user:', user.level)
if (user.premiumTime != 0 && user.premium) {
if (new Date() * 1 >= user.premiumTime) {
let resp = `*@${m.sender.split`@`[0]} ¡SE ACABO EL TIEMPO DE PREMIUM!*\nSI QUIERES OBTENER UN NUEVO PASE USA EL COMANDO\n*#pase premium*`
user.premiumTime = 0
user.premium = false
return conn.sendWritingText(m.chat, resp, m)
}
}
}
