/*---------------------------------------------------------------------------------------
  🍀 • By https://github.com/ALBERTO9883
  🍀 • ⚘Alberto Y Ashly⚘
-----------------------------------------------------------------------------------------*/

import { randomBytes } from 'crypto'
let link = /chat.whatsapp.com/
let handler = async (m, { conn, text, groupMetadata }) => {
if (m.isBaileys && m.fromMe)
return !0
if (!m.isGroup) return !1
if (!text) throw '*_⚠ • ️Ingrese un -texto- para enviar un mensaje a todos los grupos._*'
const linkThisGroup = `${link}`
if (m.text.includes(linkThisGroup)) return conn.reply(m.chat, '❌ *_No puedes espamear enlaces a otros grupos._*', m)
let time = global.db.data.users[m.sender].msgwait + 300000
if (new Date - db.data.users[m.sender].msgwait < 300000) throw `*_⚠️ • Tienes que esperar ${msToTime(time - new Date())} para volver a enviar un mensaje._*`
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(m.sender)
let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])
let fakegif = { key: {participant: `0@s.whatsapp.net`, ...("5215532867844-1600616542@g.us" ? { remoteJid: "5215532867844-1600616542@g.us" } : {})},message: {videoMessage: { title: wm, h: `Hmm`,seconds: '99999', gifPlayback: 'true', 'caption': wm, jpegThumbnail: false }}}
let teks = `*🌺 • Gru𝚙o:* ${groupMetadata.subject}\n*🍀 • De:* ${name}\n*🍁 • Nú𝚖ero:* wa.me/${who.split`@`[0]}\n*📧 • Mensa𝚓e:* ${text}`
for (let id of groups) {
  let txt = '';
  let count = 0;
  for (const c of teks) {
      await new Promise(resolve => setTimeout(resolve, 5));
      txt += c;
      count++;
  
      if (count % 10 === 0) {
          conn.sendPresenceUpdate('composing' , m.chat);
      }
  }
await conn.sendMessage(id, { text: txt, mentions: conn.parseMention(txt) }, { quoted: fakegif, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 })
global.db.data.users[m.sender].msgwait = new Date * 1
}}
handler.command = /^(msg)$/i
handler.owner = true
handler.group = true
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
