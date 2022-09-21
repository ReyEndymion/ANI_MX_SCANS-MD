/*---------------------------------------------------------------------------------------
  🍀 • By https://github.com/ALBERTO9883
  🍀 • ⚘Alberto Y Ashly⚘
-----------------------------------------------------------------------------------------*/

import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
if (!db.data.chats[m.chat].modohorny && m.isGroup) throw '*[❗INFO❗] LOS COMANDOS +18 ESTAN DESACTIVADOS EN ESTE GRUPO, SI ES ADMIN Y DESEA ACTIVARLOS USE EL COMANDO #enable modohorny*'
let fgif = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "5215532867844-1600616542@g.us" } : {})},message: {"videoMessage": { "title":`*ALBERTO Y ASHLY♥️*`, "h": `Hmm`,'seconds': '99999', 'gifPlayback': 'true', 'caption': `🧿 🌎ANI MX SCANS🌏 🔮`, 'jpegThumbnail': false }}}
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let user = global.db.data.users[who]
let name = await conn.getName[who]
let json = await fetch(`http://mkbot.online/api/tiktok/nsfw/nsfwtt?&apikey=${mkbotkey}`)
let jsons = await json.json()
let res = jsons.result
conn.sendButton(m.chat, `- Bienvenido a TikTok Gold🥵 -`, `*◈•@${who.split("@s.whatsapp.net")[0]}*`, res, [['🔄 SIGUIENTE 🔄', `/${command}`]], fgif, { mentions: [who] })}
handler.command = /^(tiktokxxx)$/i
export default handler
global.mkbot = ['lwSUluWz', 'HSxJ72Rf', 'H6pvVPJc', 'uVAf54xz', 'nwJVzP6v']
global.mkbotkey = mkbot[Math.floor(mkbot.length * Math.random())]
