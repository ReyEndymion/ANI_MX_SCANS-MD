import { youtubedl, youtubedlv2 } from '../lib/ytscraper.js'
import fetch from 'node-fetch'
let handler = async (m, {conn, args, db, userdb, senderJid}) => {
if (!args[0]) return conn.sendWritingText(m.chat, `*[❗INFO❗] INSERTE EL COMANDO MAS EL ENLACE / LINK DE UN VIDEO DE YOUTUBE*`, userdb, m)
await conn.sendWritingText(m.chat, `*_⏳SE ESTA PROCESANDO SU AUDIO...⏳_*\n\n*◉ SI SU AUDIO NO Es ENVIADO, PRUEBE CON EL COMANDO #playdoc o #play.2 o #ytmp4doc ◉*`, m)
try {
let q = '128kbps'
let v = args[0]
const yt = await youtubedl(v).catch(async _ => await youtubedlv2(v))
const dl_url = await yt.audio[q].download()
const ttl = await yt.title
const size = await yt.audio[q].fileSizeH
await conn.sendFile(m.chat, dl_url, ttl + '.mp3', null, m, false, { mimetype: 'audio/mp4' })
} catch {
try {
let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=85faf717d0545d14074659ad&url=${args[0]}`)
let lolh = await lolhuman.json()
let n = lolh.result.title || 'error'
await conn.sendFile(m.chat, lolh.result.link, `${n}.mp3`, null, m, false, { mimetype: 'audio/mp4' })
} catch {
await conn.sendWritingText(m.chat, '*[❗] ERROR NO FUE POSIBLE DESCARGAR EL AUDIO*', userdb, m)}
}}
handler.command = /^fgmp3|dlmp3|getaud|yt(a|mp3)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

handler.help = [];
handler.tags = [];

export default handler

