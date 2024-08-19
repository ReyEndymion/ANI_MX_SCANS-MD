/*---------------------------------------------------------------------------------------
  🍀 • By https://github.com/ALBERTO9883
  🍀 • ⚘Alberto Y Ashly⚘
-----------------------------------------------------------------------------------------*/

import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
const bot = global.db.data.bot[conn.user.jid]
const chats = bot.chats
const privs = chats.privs
const groups = chats.groups
const chat = m.isGroup ? groups[m.chat] : privs[m.chat]
if (!chat.modohorny && m.isGroup) {throw '*[❗INFO❗] LOS COMANDOS +18 ESTAN DESACTIVADOS EN ESTE GRUPO, SI ES ADMIN Y DESEA ACTIVARLOS USE EL COMANDO #enable modohorny*'} else {
let fgif = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "5215532867844-1600616542@g.us" } : {})},message: {"videoMessage": { "title":`*ALBERTO Y ASHLY♥️*`, "h": `Hmm`,'seconds': '99999', 'gifPlayback': 'true', 'caption': `🧿 🌎ANI MX SCANS🌏 🔮`, 'jpegThumbnail': false }}}
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName[who]
let json = await fetch(`https://es.pornhub.com/video/search?search=tiktok+xxx`)
let jsons = await json.json()
let res = jsons.result
console.log('tiktokxxx: ', res)
let resp = `- Bienvenido a TikTok Gold🥵 -`
let q = await conn.sendMessage(m.chat, { image: {url: res}, caption: resp.trim(), mentions: conn.parseMention(resp), viewOnce: true }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
await delay(1 * 2000)
return conn.sendWritingText(m.chat, resp, q)
}
}
handler.command = /^(tiktokxxx)$/i
handler.register = true
export default handler
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
global.mkbot = ['UfN5DLvV', 'lwSUluWz', 'KcrY8r8I', 'HSxJ72Rf', 'Gmc5DlDb', 'H6pvVPJc', 'uVAf54xz', 'wF4gTpTZ', 'nwJVzP6v']
global.mkbotkey = mkbot[Math.floor(mkbot.length * Math.random())]
