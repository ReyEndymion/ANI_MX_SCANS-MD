/*---------------------------------------------------------------------------------------
🍀 • By https://github.com/ALBERTO9883
🍀 • ⚘Alberto Y Ashly⚘
-----------------------------------------------------------------------------------------*/

import { randomBytes } from 'crypto'
let link = /chat.whatsapp.com/
let handler = async (m, {conn, text, groupMetadata, userdb, db, senderJid}) => {
if (m.isBaileys && m.fromMe)
return !0
if (!m.isGroup) return !1
if (!text) return conn.sendWritingText(m.chat, `*_⚠ • ️Ingrese un -texto- para enviar un mensaje a todos los grupos._*`, userdb, m)
const linkThisGroup = `${link}`
if (m.text.includes(linkThisGroup)) return conn.sendWritingText(m.chat, '❌ *_No puedes espamear enlaces a otros grupos._*', userdb, m)
let time = db.data.bot[conn.user.jid].chats.groups[m.chat].users[senderJid].msgwait + 300000
if (new Date - userdb.msgwait < 300000) return conn.sendWritingText(m.chat, `*_⚠️ • Tienes que esperar ${msToTime(time - new Date())} para volver a enviar un mensaje._*`, userdb, m)
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid
let name = await conn.getName(senderJid)
let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])
let fakegif = { key: {participant: `0@s.whatsapp.net`, ...("5215532867844-1600616542@g.us" ? { remoteJid: "5215532867844-1600616542@g.us" } : {})},message: {"videoMessage": { "title": '🌎ANI MX SCANS🌏', "h": `Hmm`,'seconds': '99999', 'gifPlayback': 'true', 'caption': '🌎ANI MX SCANS🌏', 'jpegThumbnail': false }}}
let teks = `*🌺 • _Grupo:_* ${groupMetadata.subject}\n*🍀 • D𝚎:* ${name}\n*🍁 • _Número:_* wa.me/${who.split`@`[0]}\n*📧 • _Mensaje:_* ${text}`
for (let id of groups) {
await conn.sendMessage(id, { text: teks }, { quoted: fakegif })
db.data.bot[conn.user.jid].chats.groups[m.chat].users[senderJid].msgwait = new Date * 1
}}
handler.command = /^(msg)$/i
handler.owner = true
handler.group = true
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds
return minutes + " m " + seconds + " s " }
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
const randomID = length => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)
