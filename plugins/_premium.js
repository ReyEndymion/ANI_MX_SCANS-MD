//let handler = m => m
export async function before(m, {conn}) {
if (m.chat.endsWith('broadcast')) return
if (!m.isGroup) return
let resp
let chats = global.db.data.bot[this.user.jid].chats.groups
let chat = chats[m.chat] || {}
let users = chat.users
let user = users[m.sender] || {}
console.log('user', user.level)
//if (m.chat.endsWith(userID)) {user = global.db.data.bot[this.user.jid].chats.privs[m.sender]} else if (m.chat.endsWith(groupID)) {user = global.db.data.bot[this.user.jid].chats.groups[m.chat].users[m.sender]}
//user = user
if (user.premiumTime != 0 && user.premium) {
if (new Date() * 1 >= user.premiumTime) {
resp = `*@${m.sender.split`@`[0]} ¡SE ACABO EL TIEMPO DE PREMIUM!*\nSI QUIERES OBTENER UN NUEVO PASE USA EL COMANDO\n*#pase premium*`
user.premiumTime = 0
user.premium = false
}
}
if (resp !== undefined) {
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
}
