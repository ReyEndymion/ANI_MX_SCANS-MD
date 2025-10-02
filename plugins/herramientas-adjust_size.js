import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'
let handler = async (m, {conn, usedPrefix, command, args, text, db, userdb, senderJid}) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) return conn.sendWritingText(m.chat, `⚠️️ Responde a una imagen o video.`, userdb, m)
if (!text) return conn.sendWritingText(m.chat, `⚠️️ Ingrese el peso nuevo de la imágen/video.`, userdb, m)
if (isNaN(text)) return conn.sendWritingText(m.chat, ` 🔢 sólo números`, userdb, m)
if (!/image\/(jpe?g|png)|video|document/.test(mime)) return conn.sendWritingText(m.chat, `⚠️️ Formato no soportado`, userdb, m)
let img = await q.download()
let url = await uploadImage(img)

if (/image\/(jpe?g|png)/.test(mime)) {
conn.sendMessage(m.chat, { image: {url: url}, caption: `Aqui tienes`, fileLength: `${text}`, mentions: [senderJid] }, { ephemeralExpiration: 24*3600, quoted: m})
} else if (/video/.test(mime)) {
return conn.sendMessage(m.chat, { video: {url: url}, caption: `Aqui tienes`, fileLength: `${text}`, mentions: [senderJid] }, { ephemeralExpiration: 24*3600, quoted: m })}
}
handler.tags = ['tools']
handler.help = ['tamaño <cantidad>']
handler.command = /^(length|filelength|edittamaño|totamaño|tamaño)$/i
handler.menu = [
{title:"💎 AJUSTAR TAMAÑO", description: "ajusta el tamaño de una imagen o video usando #tamaño <cantidad>", id: `tamaño`}
];
handler.type = "herramientas";
handler.disabled = false;

export default handler
