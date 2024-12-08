let handler = async (m, { conn, text, isROwner, isOwner, isAdmin, isBotAdmin }) => {
let resp
const bot = global.db.data.bot[conn.user.jid] || {}
const chats = bot.chats || {}
const groups = chats.groups || {}
const chat = groups[m.chat] || {}

if (isBotAdmin && isAdmin) {
if (text === 'clear') {
chat.sWelcome = ''
resp = '*[❗] MENSAJE DE BIENVENIDA BORRADO CORRECTAMENTE PARA ESTE GRUPO*'
} else if (text) {
chat.sWelcome = text
resp = '*[❗] MENSAJE DE BIENVENIDA CONFIGURADO CORRECTAMENTE PARA ESTE GRUPO*'
} else {
resp = `*[❗] INGRESE EL MENSAJE DE BIENVENIDA QUE DESEE AGREGAR, USE:*\n*- @user (mención)*\n*- @group (nombre de grupo)*\n*- @desc (description de grupo)*`
}
return conn.sendWritingText(m.chat, resp, m);
} else if (!isBotAdmin && isAdmin)  {
let resp = `*[❗INFO❗] EL BOT NO ES ADMINISTRADOR DEL GRUPO, NO PUEDE REALIZAR ESTA ACCIÓN*`;
return conn.sendWritingText(m.chat, resp, m);
} else {
let resp = `*[❗INFO❗] SOLO UN ADMINISTRADOR DEL GRUPO PUEDE REALIZAR ESTA ACCIÓN*`;
return conn.sendWritingText(m.chat, resp, m);
}
}
handler.help = ['setwelcome <text>']
handler.tags = ['group']
handler.command = ['setwelcome'] 
handler.group = true
export default handler
