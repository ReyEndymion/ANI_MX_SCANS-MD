export async function before(m, {conn, chatUpdate, botdb, db, senderJid}) {
const {proto, generateWAMessage, areJidsSameUser} = (await import('@whiskeysockets/baileys'))
if (m.isBaileys) return
if (!m.message) return
if (!m.msg.fileSha256) return
let sticker = botdb.sticker || {}
if (!(Buffer.from(m.msg.fileSha256).toString('base64') in sticker)) return

let hash = botdb.sticker[Buffer.from(m.msg.fileSha256).toString('base64')]
let { text, mentionedJid } = hash
let messages = await generateWAMessage(m.chat, { text: text, mentions: mentionedJid }, {
userJid: conn.user.id,
quoted: m.quoted && m.quoted.fakeObj
})
messages.key.fromMe = areJidsSameUser(senderJid, conn.user.id)
messages.key.id = m.key.id
messages.pushName = m.pushName
if (m.isGroup) messages.participant = senderJid
let msg = {
...chatUpdate,
messages: [proto.WebMessageInfo.create(messages)],
type: 'append'
}
conn.ev.emit('messages.upsert', msg)
}
