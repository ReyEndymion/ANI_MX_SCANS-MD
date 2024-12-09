let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'));

export async function before(m, {conn, isAdmin, isBotAdmin }) {
if (m.chat == sBroadCastID || m.chat.endsWith(newsletterID)) return
const bot = global.db.data.bot[conn.user.jid]
const chats = bot.chats
const privs = chats.privs
const groups = chats.groups
const chat = m.isGroup ? groups[m.chat] : privs[m.chat]
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
return conn.sendFile(m.chat, buffer, 'error.mp4', texto, m)
} else if (/image/.test(type)) {
return conn.sendFile(m.chat, buffer, 'error.jpg', texto, m)
}}}
