let handler = async (m, { conn, text, usedPrefix, command}) => {
    let resp, who
if (!m.mentionedJid[0] && !m.quoted) {
    resp = `*[❗INFO❗] ETIQUETE A UNA PERSONA O RESPONDA A UN MENSAJE ENVIADO POR EL USUARIO QUE DESEE BANEAR\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} @${global.suittag}*`
}
if (m.isGroup) {who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender} else {who = m.chat}
const bot = global.db.data.bot[conn.user.jid]
const chats = bot.chats || {}
const privs = chats.privs || {}
const groups = chats.groups || {}
let chat, users, user
if (m.chat.endsWith(userID)) {
  chat = privs[m.chat] || {}
  user = privs[m.sender] || {}
} else if (m.chat.endsWith(groupID)){
  chat = groups[m.chat] || {}
  users = chat.users || {}
  user = users[m.sender] || {}
} else return
users[who].banned = true
resp = `*[❗INFO❗] EL USUARIO FUE BANEADO CON ÉXITO*\n*—◉ EL USUARIO YA NO PODRÁ USAR EL BOT HASTA QUE SEA DESBANEADO*`
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
handler.command = /^banuser$/i
handler.owner = true
export default handler
