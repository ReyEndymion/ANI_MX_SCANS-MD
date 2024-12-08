let handler = async (m, { conn, text, isROwner, isOwner, isAdmin, isBotAdmin }) => {
const bot = global.db.data.bot[conn.user.jid]
const chats = bot.chats
const privs = chats.privs
const groups = chats.groups
const chat = m.isGroup ? groups[m.chat] : privs[m.chat]

if (isBotAdmin && isAdmin) {
if (text === 'clear') {
chat.sBye = ''
let resp = '*[❗] MENSAJE DE DESPEDIDA BORRADO CORRECTAMENTE PARA ESTE GRUPO*'
return conn.sendWritingText(m.chat, resp, m);
} else if (text) {
chat.sBye = text
let resp = '*[❗] MENSAJE DE DESPEDIDA CONFIGURADO CORRECTAMENTE PARA ESTE GRUPO*'
return conn.sendWritingText(m.chat, resp, m);
} else {
let resp = `*[❗] INGRESE EL MENSAJE DE DESPEDIDA QUE DESEE AGREGAR, USE:*\n*- @user (mención)*`
return conn.sendWritingText(m.chat, resp, m);
}
} else if (!isBotAdmin && isAdmin)  {
let resp = `*[❗INFO❗] EL BOT NO ES ADMINISTRADOR DEL GRUPO, NO PUEDE REALIZAR ESTA ACCIÓN*`;
return conn.sendWritingText(m.chat, resp, m);
} else {
let resp = `*[❗INFO❗] SOLO UN ADMINISTRADOR DEL GRUPO PUEDE REALIZAR ESTA ACCIÓN*`;
return conn.sendWritingText(m.chat, resp, m);
}

}
handler.help = ['setbye <text>']
handler.tags = ['group']
handler.command = ['setbye']
handler.group = true
export default handler
