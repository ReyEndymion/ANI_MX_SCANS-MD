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
conn.sendFile (m.chat, res, null, 'lol', m, null, {viewOnce: true})
    await delay(1 * 3000)
//conn.sendMessage(m.chat, { text: `- Bienvenido a TikTok Gold🥵 -`, `*◈•@${who.split("@s.whatsapp.net")[0]}*`, [['🔄 SIGUIENTE 🔄', `/${command}`]], fgif, { mentions: [who] })
}
handler.command = /^(tiktokxxx)$/i
handler.register = true
export default handler
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
global.mkbot = ['UfN5DLvV', 'lwSUluWz', 'KcrY8r8I', 'HSxJ72Rf', 'Gmc5DlDb', 'H6pvVPJc', 'uVAf54xz', 'wF4gTpTZ', 'nwJVzP6v']
global.mkbotkey = mkbot[Math.floor(mkbot.length * Math.random())]
