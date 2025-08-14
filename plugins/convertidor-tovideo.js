import { webp2mp4 } from '../lib/webp2mp4.js'
import { ffmpeg } from '../lib/converter.js'
let handler = async (m, {conn, usedPrefix, command, db, userdb, senderJid}) => {
if (!m.quoted) return conn.sendWritingText(m.chat, `*[❗INFO❗] RESPONDA AL AUDIO QUE DESEA CONVERTIR EN VIDEO CON EL COMANDO ${usedPrefix + command}*`, userdb, m)
let mime = m.quoted.mimetype || ''
if (!/webp/.test(mime)) return conn.sendWritingText(m.chat, `*[❗INFO❗] RESPONDA AL AUDIO QUE DESEA CONVERTIR EN VIDEO CON EL COMANDO ${usedPrefix + command}*`, userdb, m)
let media = await m.quoted.download()
let out = Buffer.alloc(0)
if (/webp/.test(mime)) {
out = await webp2mp4(media)
} else if (/audio/.test(mime)) {
out = await ffmpeg(media, [
'-filter_complex', 'color',
'-pix_fmt', 'yuv420p',
'-crf', '51',
'-c:a', 'copy',
'-shortest'
], 'mp3', 'mp4')
}
await conn.sendFile(m.chat, out, 'error.mp4', '*DONE*', m, 0, { thumbnail: out })
}
handler.help = ['tovideo']
handler.tags = ['sticker']
handler.command = ['tovideo', 'tomp4', 'mp4', 'togif']
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
