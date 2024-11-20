const {
proto,
generateWAMessage,
areJidsSameUser
} = (await import('@whiskeysockets/baileys')).default

export async function before(m, {conn, chatUpdate}) {
//console.log('cmdW: ', m.msg)
if (m.isBaileys) return
if (!m.message) return
if (!m.msg.fileSha256) return
let bot = global.db.data.bot[conn.user.jid] || {}
let sticker = bot.sticker || {}
if (!(Buffer.from(m.msg.fileSha256).toString('base64') in sticker)) return

let hash = bot.sticker[Buffer.from(m.msg.fileSha256).toString('base64')]
let { text, mentionedJid } = hash
let messages = await generateWAMessage(m.chat, { text: text, mentions: mentionedJid }, {
userJid: conn.user.id,
quoted: m.quoted && m.quoted.fakeObj
})
messages.key.fromMe = areJidsSameUser(m.sender, conn.user.id)
messages.key.id = m.key.id
messages.pushName = m.pushName
if (m.isGroup) messages.participant = m.sender
let msg = {
...chatUpdate,
messages: [proto.WebMessageInfo.fromObject(messages)],
type: 'append'
}
console.log('cmdW: ', sticker)
conn.ev.emit('messages.upsert', msg)
}
