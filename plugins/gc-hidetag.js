import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
import * as fs from 'fs'
let handler = async (m, {conn, info, text, participants, isOwner, isAdmin, db, userdb, senderJid, objs}) => {
const {imagen1} = objs
if (m.isBaileys) return
try {
let users = participants.map(u => conn.decodeJid(u.id))
let q = m.quoted ? m.quoted : m || m.text || senderJid
let d = m.quoted ? await m.getQuotedObj() : m.msg || m.text || senderJid
let msg = conn.cMod(m.chat, generateWAMessageFromContent(m.chat, { [m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? d.message[q.mtype] : { text: '' || d }}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100, userJid: conn.user.id }), text || q.text, conn.user.jid, { mentions: users, gpmentions: await conn.parseGroupMention(text || q?.text || '')})
try {
if (msg.message.extendedTextMessage && msg.message.extendedTextMessage.text !== undefined) {
await conn.writing(m.chat, msg.message.extendedTextMessage.text) 
}
await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id }, {quoted: m, ephemeralExpiration: 2*60*1000})    
} catch (error) {
//await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id }, {quoted: m, ephemeralExpiration: 2*60*1000, disappearingMessagesInChat: 24*60*100})    
console.log('texto: ', msg.message + error)
}
} catch (e) {  
  console.log('texto error: ', e)

/**
[ By @NeKosmic || https://github.com/NeKosmic/ ]
**/  
  
let users = participants.map(u => conn.decodeJid(u.id))
let quoted = m.quoted ? m.quoted : m
let mime = (quoted.msg || quoted).mimetype || ''
let isMedia = /image|video|sticker|audio/.test(mime)
let more = String.fromCharCode(8206)
let masss = more.repeat(850)
let htextos = `${text ? text : "*Hola :D*: " + e }`
const messageFinal = {extendedTextMessage: {
text: `${masss}\n${htextos}\n`,
...{ contextInfo: { 
mentionedJid: users, gpmentions: await conn.parseGroupMention(text || q?.text || ''), externalAdReply: { thumbnail: fs.readFileSync(imagen1), sourceUrl: info.repoProyect }}}}}
if ((isMedia && quoted.mtype === 'imageMessage') && htextos) {
var mediax = await quoted.download?.()
conn.sendMessage(m.chat, { image: mediax, mentions: users, caption: htextos, mentions: users, gpmentions: await conn.parseGroupMention(text || q?.text || '') }, { quoted: m, ephemeralExpiration: 2*60*1000 })
} else if ((isMedia && quoted.mtype === 'videoMessage') && htextos) {
var mediax = await quoted.download?.()
conn.sendMessage(m.chat, { video: mediax, mentions: users, mimetype: 'video/mp4', caption: htextos }, { quoted: m, ephemeralExpiration: 2*60*1000 })
} else if ((isMedia && quoted.mtype === 'audioMessage') && htextos) {
var mediax = await quoted.download?.()
conn.sendMessage(m.chat, { audio: mediax, mentions: users, mimetype: 'audio/mp4', fileName: `Hidetag.mp3` }, { quoted: m, ephemeralExpiration: 2*60*1000 })
} else if ((isMedia && quoted.mtype === 'stickerMessage') && htextos) {
var mediax = await quoted.download?.()
conn.sendMessage(m.chat, {sticker: mediax, mentions: users}, { quoted: m, ephemeralExpiration: 2*60*1000 })
} else {
await conn.relayMessage(m.chat, messageFinal, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
}
}
handler.command = /^(hidetag|notificar|notify)$/i
handler.group = true
handler.admin = true
handler.help = [];
handler.tags = [];
handler.menu = [
{title: "?? NOTIFICAR A TODOS", description: "notifica a todos los miembros del grupo usando #hidetag <mensaje>", id: `hidetag`}
];
handler.type = "gadmin";

handler.disabled = false;

export default handler

