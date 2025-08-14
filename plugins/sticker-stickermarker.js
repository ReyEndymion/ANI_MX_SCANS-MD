const effects = ['jail', 'gay', 'glass', 'wasted' ,'triggered', 'lolice', 'simpcard', 'horny']

let handler = async (m, {conn, usedPrefix, text, db, userdb, senderJid}) => {
let effect = text.trim().toLowerCase()
const { effects } = await import('../lib/constants.js')
if (!effects.includes(effect)) throw `
*_✳️ USO CORRECTO DEL COMANDO ✳️_*
*👉 Use:* ${usedPrefix}stickermaker (efecto) 
- Y responda a una imagen
*✅ Ejemplo:* ${usedPrefix}stickermaker jail
*List Effect:*
${effects.map(effect => `_> ${effect}_`).join('\n')}
`.trim()
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) return conn.sendWritingText(m.chat, `*_🔰 No se encontro la imagen_*\n\n*_✅ Responda a una imagen_*`, userdb, m)
if (!/image\/(jpe?g|png)/.test(mime)) return conn.sendWritingText(m.chat, `*_⚠️ Formato no admitido_*\n\n*_👉🏻 Responda a una imagen_*`, userdb, m)
let img = await q.download()
const uploadImage = await import('../lib/uploadImage.js');
let url = await uploadImage(img)
const { API } = await import('../api.js')
let apiUrl = API('https://some-random-api.ml/canvas/', encodeURIComponent(effect), {
avatar: url
})
try {
const { sticker } = await import('../lib/sticker.js')
let stiker = await sticker(null, apiUrl, info.kom, info.gitAuthor)
conn.sendFile(m.chat, stiker, null, { asSticker: true })
} catch (e) {
return conn.sendWritingText(m.chat, `*_⚠️ Ocurrió un error al hacer la conversión a sticker_*\n\n*_✳️ Enviando imagen en su lugar..._*`, userdb, m)
await conn.sendFile(m.chat, apiUrl, 'image.png', null, m)
}}
handler.help = ['stickmaker (caption|reply media)']
handler.tags = ['General']
handler.command = /^(stickmaker|stickermaker|stickermarker|cs)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
