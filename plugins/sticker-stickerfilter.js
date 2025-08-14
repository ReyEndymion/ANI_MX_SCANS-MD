let handler = async (m, {conn, usedPrefix, text, db, userdb, senderJid}) => {
let effect = text.trim().toLowerCase()
const {effects} = await import('../lib/constants.js')
if (!effects.includes(effect)){ 
let resp = `
*_✳️ USO CORRECTO DEL COMANDO ✳️_*
*👉 Use:* ${usedPrefix}stickerfilter (efecto) 
- Y responda a una imagen
*✅ Ejemplo:* ${usedPrefix}stickerfilter greyscale
*Lista de efectos:*
${effects.map(effect => `_> ${effect}_`).join('\n')}
`.trim()

await conn.sendWritingText(m.chat, resp, userdb, m);

}
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) {
let resp = '*_🔰 No se encontro la imagen_*\n\n*_✅ Responda a una imagen_*'

await conn.sendWritingText(m.chat, resp, userdb, m);

}
if (!/image\/(jpe?g|png)/.test(mime)) {
let resp = `*_⚠️ Formato no admitido_*\n\n*_👉🏻 Responda a una imagen_*`

await conn.sendWritingText(m.chat, resp, userdb, m);

}
let img = await q.download()
const uploadImage = await import('../lib/uploadImage.js')
let url = await uploadImage(img)
const { API } = await import('../api.js')
let apiUrl = API('https://some-random-api.ml/canvas/', encodeURIComponent(effect), {
avatar: url
})
try {
const { sticker } = await import('../lib/sticker.js')
let stiker = await sticker(null, apiUrl, global.packname, info.gitAuthor)
//conn.sendFile(m.chat, stiker, null, { asSticker: true })
conn.sendMessage(m.chat, {sticker: {url: stiker}?stiker : {url: stiker},mimetype: 'image/webp', asSticker: true}, { quoted: m, ephemeralExpiration: 24 * 60 * 1000 });

} catch (e) {
let resp = '*_⚠️ Ocurrió un error al hacer la conversión a sticker_*\n\n*_✳️ Enviando imagen en su lugar..._*'

//await conn.sendWritingText(m.chat, resp, userdb, m);

//await conn.sendFile(m.chat, apiUrl, 'image.png', null, m)
return conn.sendMessage(m.chat, { image: {url: apiUrl}, caption: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}}
handler.help = ['stickfilter (caption|reply media)']
handler.tags = ['General']
handler.command = /^(stic(k|ker)filter|cs2)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
