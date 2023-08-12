import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'
let handler = async (m, { conn, args }) => {
if (!args[0]) throw '*[❗INFO❗] INSERTE EL COMANDO MAS EL ENLACE / LINK DE UN VIDEO DE YOUTUBE*'
await m.reply(`*_⏳SE ESTA PROCESANDO SU VIDEO...⏳_*\n\n*◉ SI SU VIDEO NO ES ENVIADO, PRUEBE CON EL COMANDO #playdoc ᴏ #play.2 ᴏ #ytmp4doc ◉*`)
try {
let qu = args[1] || '360'
let q = qu + 'p'
let v = args[0]
const yt = await youtubedl(v).catch(async _ => await youtubedlv2(v))
const dl_url = await yt.video[q].download()
const ttl = await yt.title
const size = await yt.video[q].fileSizeH
let cap = `*◉—⌈📥 YOUTUBE DL 📥⌋—◉*\n❏ *TITULO:* ${ttl}\n❏ *PESO:* ${size}`.trim()
await await conn.sendMessage(m.chat, { document: { url: dl_url }, caption: cap, mimetype: 'video/mp4', fileName: ttl + `.mp4`}, {quoted: m})
} catch {
try {
let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=85faf717d0545d14074659ad&url=${args[0]}`)    
let lolh = await lolhuman.json()
let n = lolh.result.title || 'error'
let n2 = lolh.result.link
let n3 = lolh.result.size
let cap2 = `*◉—⌈📥 YOUTUBE DL 📥⌋—◉*\n❏ *TITULO:* ${ttl}\n❏ *PESO:* ${n3}`.trim()
await conn.sendMessage(m.chat, { document: { url: n2 }, caption: cap2, mimetype: 'video/mp4', fileName: n + `.mp4`}, {quoted: m})
} catch {
await conn.reply(m.chat, '*[❗] ERROR NO FUE POSIBLE DESCARGAR EL VIDEO*', m)}
}}
handler.command = /^ytmp4doc|ytvdoc|ytmp4.2|ytv.2$/i
export default handler
