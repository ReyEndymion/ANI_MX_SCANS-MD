let handler = async (m, {conn, text, db, userdb, senderJid}) => {
if (!m.quoted) {
let resp = '*[❗INFO❗] RESPONDE AL STICKER QUE DESEA AGREGAR UN PAQUETE Y UN NOMBRE*'


return conn.sendWritingText(m.chat, resp, userdb, m)
}
let stiker = false
try {
let [gt, ...author] = text.split('|')
author = (author || []).join('|')
let mime = m.quoted.mimetype || ''
if (!/webp/.test(mime)) {
let resp = '*[❗INFO❗] RESPONDE AL STICKER QUE DESEA AGREGAR UN PAQUETE Y UN NOMBRE*'


return conn.sendWritingText(m.chat, resp, userdb, m)
}
let img = await m.quoted.download()
if (!img) {
let resp = '*[❗INFO❗] RESPONDE AL STICKER QUE DESEA AGREGAR UN PAQUETE Y UN NOMBRE*'

return conn.sendWritingText(m.chat, resp, userdb, m)
}
const { addExif } = await import('../lib/sticker.js')
stiker = await addExif(img, gt || '', author || '')
} catch (e) {
console.error(e)
if (Buffer.isBuffer(e)) stiker = e
} finally {
if (stiker) {
conn.sendMessage(m.chat, {sticker: stiker, mimetype: 'image/webp', asSticker: true}, { quoted: m, ephemeralExpiration: 2*60*1000 });

} else {
let resp = '*[❗INFO❗] LO SIENTO, ALGO FALLO.. CORROBORE QUE HAYA RESPONDIDO A UN STICKER Y HAYA AGREGADO UN NOMBRE DE PAQUETE Y UN NOMBRE DE USUARIO*'


return conn.sendWritingText(m.chat, resp, userdb, m)
}
}}
handler.help = ['info.nanipe <gt>|<author>']
handler.tags = ['sticker']
handler.command = /^take|nuestro|info.nanipe$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
