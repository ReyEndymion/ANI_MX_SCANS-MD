let handler = async (m, { conn, text, command}) => {
let bot = global.db.data.bot[conn.user.jid]
let chats = bot.chats
let privs = chats.privs
let groups = chats.groups
let chat = m.isGroup ? groups[m.chat] : privs[m.chat]
let users = m.isGroup ? chat.users : privs
let who = m.isGroup ? m.mentionedJid[0] : m.chat
let resp = ''
if (!text || !who) {resp = '*[❗INFO❗] INGRESA EL @tag DE ALGUN USUARIO*'
} else {
try {
//console.log('(ban/unban)user: ', /^banuser$/i.test(command))
if (/^banuser$/i.test(command)) {
users[who].banned = true
resp = `*[❗INFO❗] EL USUARIO FUE BANEADO CON ÉXITO*\n*—◉ EL USUARIO YA NO PODRÁ USAR EL BOT HASTA QUE SEA DESBANEADO*`
} else if (/^unbanuser$/i.test(command)) {
users[who].banned = false
users[who].bannedMessageCount = 0
resp = `*[❗INFO❗] EL CHAT FUE DESBANEADO CON ÉXITO*\n*—◉ EL USUARIO YA PUEDE USAR EL BOT*`
}
} catch (error) {
resp = `${error}`
}
}
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 1));
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
handler.command = /^(un)?banuser$/i
handler.rowner = true
export default handler
