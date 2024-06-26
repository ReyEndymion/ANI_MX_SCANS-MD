let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'));

export async function before(m, {conn, isAdmin, isBotAdmin }) {
 
let bot = global.db.data.bot[this.user.jid]
let chats = bot.chats || {}
let privs, groups, chat, users, user
if (m.chat.endsWith(userID)) {
privs = chats.privs || {}
chat = privs[m.chat] || {}
} else if (m.chat.endsWith(groupID)) {
groups = chats.groups || {}
chat = groups[m.chat] || {}
users = chat.users || {}
user = users[m.sender] || {}
} else return
let settings = bot.settings || {}
if (/^[.~#/\$,](read)?viewonce/.test(m.text)) return
if (!chat.antiviewonce || chat.isBanned) return
if (m.mtype == 'viewOnceMessage') {
let msg = m.message.viewOnceMessage.message
let type = Object.keys(msg)[0]
let texto = `${msg[type].caption}\n\n*AQUI NO SE PERMITE OCULTAR NADA*`
let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video')
let buffer = Buffer.from([])
for await (const chunk of media) {
buffer = Buffer.concat([buffer, chunk])}
if (/video/.test(type)) {
return this.sendFile(m.chat, buffer, 'error.mp4', texto, m)
} else if (/image/.test(type)) {
return this.sendFile(m.chat, buffer, 'error.jpg', texto, m)
}}}
