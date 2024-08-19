let handler = async (m, { conn, text, isROwner, isOwner, isAdmin }) => {
const bot = global.db.data.bot[conn.user.jid]
const chats = bot.chats
const privs = chats.privs
const groups = chats.groups
const chat = m.isGroup ? groups[m.chat] : privs[m.chat]
let resp = ''
if (!isAdmin) {resp = 'Tienes que ser admin o el bot tiene que ser admin para usar este comando'}
if (!text) {
resp = `*[❗] INGRESE EL MENSAJE DE DESPEDIDA QUE DESEE AGREGAR, USE:*\n*- @user (mención)*`
} else {
chat.sBye = text
resp = '*[❗] MENSAJE DE DESPEDIDA CONFIGURADO CORRECTAMENTE PARA ESTE GRUPO*'
}
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

return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
handler.help = ['setbye <text>']
handler.tags = ['group']
handler.command = ['setbye']
handler.group = true
//handler.admin = true
export default handler
