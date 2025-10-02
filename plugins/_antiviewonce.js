let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'));

export async function before(m, {conn, info, isAdmin, isBotAdmin, botdb, chatdb , db, userdb, senderJid}) {
const { newsletterID, sBroadCastID } = await import('../config.js')
if (m.chat == sBroadCastID || m.chat.endsWith(newsletterID)) return
let settings = botdb.settings || {}
if (/^[.~#/\$,](read)?viewonce/.test(m.text)) return
if (!chatdb.antiviewonce || chatdb.isBanned) return
if (m.mtype == 'viewOnceMessage') {
let msg = m.message.viewOnceMessage.message
let type = Object.keys(msg)[0]
let texto = `${msg[type].caption}\n\n*AQUI NO SE PERMITE OCULTAR NADA*`
let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video')
let buffer = Buffer.from([])
for await (const chunk of media) {
buffer = Buffer.concat([buffer, chunk])}
if (/video/.test(type)) {
return conn.sendVideoWriting(m.chat, buffer, texto, userdb, m)
} else if (/image/.test(type)) {
return conn.sendImageWriting(m.chat, buffer, texto, userdb, m)
} else if (/audio/.test(type)) {
return conn.sendAudioRecording(m.chat, buffer, m)
}
}
}
