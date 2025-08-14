import { youtubedl, youtubedlv2 } from '../lib/ytscraper.js'
import fetch from 'node-fetch'
import { owner, info, temp, newsletterID, sBroadCastID, groupID, media } from '../config.js'
let handler = async (m, {conn, args, db, userdb, senderJid}) => {
if (!args[0]) return conn.sendWritingText(m.chat, `*[❗INFO❗] INSERTE EL COMANDO MAS EL ENLACE / LINK DE UN VIDEO DE YOUTUBE*`, userdb, m)
await conn.sendWritingText(m.chat, `*_⏳SE ESTA PROCESANDO SU AUDIO...⏳_*\n\n*◉ SI SU AUDIO NO ES ENVIADO, PRUEBE CON EL COMANDO #playdoc o #play.2 o #ytmp4doc ◉*`, m)
try {
let q = '128kbps'
let v = args[0]
const yt = await youtubedl(v).catch(async _ => await youtubedlv2(v))
const dl_url = await yt.audio[q].download()
const ttl = await yt.title
const size = await yt.audio[q].fileSizeH
let cap = `*◉—⌈📥 YOUTUBE DL 📥⌋—◉*\n❏ *TITULO:* ${ttl}\n❏ *PESO:* ${size}`.trim()
await conn.sendMessage(m.chat, { document: { url: dl_url }, caption: cap, mimetype: 'audio/mpeg', fileName: `${ttl}.mp3`}, { quoted: m })
} catch {
try {
let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=85faf717d0545d14074659ad&url=${args[0]}`)
let lolh = await lolhuman.json()
let n = lolh.result.title || 'error'
let n2 = lolh.result.link
let n3 = lolh.result.size
let cap2 = `*◉—⌈📥 YOUTUBE DL 📥⌋—◉*\n❏ *TITULO:* ${n}\n❏ *PESO* ${n3}`.trim()
await conn.sendMessage(m.chat, { document: { url: n2 }, caption: cap2, mimetype: 'audio/mpeg', fileName: `${n}.mp3`}, {quoted: m})
} catch {
await conn.sendWritingText(m.chat, '*[❗] ERROR NO FUE POSIBLE DESCARGAR EL AUDIO*', userdb, m)}
}}
handler.command = /^ytmp3doc|ytadoc|ytmp3.2|yta.2$/i
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
