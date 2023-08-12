import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'
let handler = async (m, { conn, args }) => {
if (!args[0]) throw '*[❗𝐈𝐍𝐅𝐎❗] INSERTE EL COMANDO MAS EL ENLACE / LINK DE UN VIDEO DE YOUTUBE*'
await m.reply(`*_⏳SE ESTA PROCESANDO SU VIDEO...⏳_*\n\n*◉ SI SU VIDEO NO ES ENVIADO, PRUEBE CON EL COMANDO #playdoc O #play.2 ᴏ #ytmp4doc ◉*`)
try {
let qu = args[1] || '360'
let q = qu + 'p'
let v = args[0]
const yt = await youtubedl(v).catch(async _ => await youtubedlv2(v))
const dl_url = await yt.video[q].download()
const ttl = await yt.title
const size = await yt.video[q].fileSizeH
await await conn.sendMessage(m.chat, { video: { url: dl_url }, fileName: `${ttl}.mp4`, mimetype: 'video/mp4', caption: `▢ TITULO: ${ttl}\n▢ PESO DEL VIDEO: ${size}`, thumbnail: await fetch(yt.thumbnail) }, { quoted: m })
} catch {
try {
let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=85faf717d0545d14074659ad&url=${args[0]}`)    
let lolh = await lolhuman.json()
let n = lolh.result.title || 'error'
let n2 = lolh.result.link
let n3 = lolh.result.size
let n4 = lolh.result.thumbnail
await conn.sendMessage(m.chat, { video: { url: n2 }, fileName: `${n}.mp4`, mimetype: 'video/mp4', caption: `▢ TITULO: ${n}\n▢ PESO DEL VIDEO: ${n3}`, thumbnail: await fetch(n4) }, { quoted: m })
} catch {
await conn.reply(m.chat, '*[❗] ERROR NO FUE POSIBLE DESCARGAR EL VIDEO*', m)}
}}
handler.command = /^fgmp4|dlmp4|getvid|yt(v|mp4)?$/i
export default handler
