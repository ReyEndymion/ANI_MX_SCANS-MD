import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'
let handler = async (m, {conn, text, usedPrefix, command, db, userdb, senderJid}) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) return conn.sendWritingText(m.chat, `*[❗] RESPONDA / ETIQUETE A UNA IMAGEN*`, userdb, m)
let img = await q.download?.()
let url = await uploadImage(img)
let anu = await fetch(`https://api.lolhuman.xyz/api/read-qr?apikey=85faf717d0545d14074659ad&img=${url}`)
let json = await anu.json()
await conn.sendWritingText(m.chat, `*El Texto del Codigo QR Es:*json.result`, userdb, m)}
handler.command = /^(readqr)$/i
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
