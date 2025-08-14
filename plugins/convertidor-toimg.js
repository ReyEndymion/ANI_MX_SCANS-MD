import { webp2png } from '../lib/webp2mp4.js'
let handler = async (m, {conn, usedPrefix, command, db, userdb, senderJid}) => {
const notStickerMessage = `*[❗INFO❗] RESPONDA AL STICKER QUE DESEE CONVERTIR EN IMAGEN CON EL COMANDO ${usedPrefix + command}*`
if (!m.quoted) return conn.sendWritingText(m.chat, `notStickerMessage`, userdb, m)
const q = m.quoted || m
let mime = q.mediaType || ''
if (!/sticker/.test(mime)) return conn.sendWritingText(m.chat, `notStickerMessage`, userdb, m)
let media = await q.download()
let out = await webp2png(media).catch(_ => null) || Buffer.alloc(0)
await conn.sendFile(m.chat, out, 'error.png', null, m)
}
handler.help = ['toimg (reply)']
handler.tags = ['sticker']
handler.command = ['toimg', 'jpg', 'img']
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
