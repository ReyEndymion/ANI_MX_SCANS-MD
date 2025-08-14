import fetch from 'node-fetch'
import { webp2png } from '../lib/webp2mp4.js'
let handler = async (m, {conn, db, userdb, senderJid}) => {
let q = m.quoted ? m.quoted : m,
mime = (q || q.msg).mimetype || q.mediaType || ''
if (/image/.test(mime)) {
let url = await webp2png(await q.download()),
res = await fetch(API('https://api.ocr.space', '/parse/imageurl', { apikey: '8e65f273cd88957', url }))
if (res.status !== 200) throw res.statusText
let json = await res.json()
m.reply(json?.ParsedResults?.[0]?.ParsedText)
} else return conn.sendWritingText(m.chat, `*[❗] ERROR, POR FAVOR VUELVE A INTENTARLO, NO OLVIDE RESPONDER A UNA IMAGEN*`, m)
}
handler.command = /^ocr|totexto$/i
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
