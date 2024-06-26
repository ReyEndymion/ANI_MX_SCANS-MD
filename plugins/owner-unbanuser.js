let handler = async (m, { conn, text}) => {
let resp, who
if (m.isGroup) {who = m.mentionedJid[0]
} else {who = m.chat}
if (!(text || who)) {resp = '*[❗INFO❗] INGRESA EL @tag DE ALGUN USUARIO*'}
let bot = global.db.data.bot[conn.user.jid] || {}
const chats = bot.chats || {}
const privs = chats.privs || {}
const groups = chats.groups || {}
let chat, users, user
if (m.chat.endsWith(userID)) {
chat = privs[m.chat] || {}
user = privs[who] || {}
} else if (m.chat.endsWith(groupID)) {
chat = groups[m.chat] || {}
users = chat.users || {}
user = users[who] || {}
} else return
users.banned = false
resp = `*[❗INFO❗] ${who} FUE DESBANEADO CON ÉXITO*\n*—◉ EL USUARIO YA PUEDE USAR EL BOT*`
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 5));
txt += c;
count++;
if (count % 10 === 0) {
   await conn.sendPresenceUpdate('composing' , m.chat);
}
}
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})

}
handler.help = ['unbanuser']
handler.tags = ['owner']
handler.command = /^unbanuser$/i
handler.owner = true
export default handler
