let handler = async (m, {conn, text, db, userdb, senderJid}) => {
try {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
let img = await q.download()
const uploadImage = await import('../lib/uploadImage.js')
let url = await uploadImage(img)
const { API } = await import('../api.js')
let sremovebg = API(`https://api.lolhuman.xyz/api/removebg?apikey=85faf717d0545d14074659ad&img=${url}`) 
const { sticker } = await import('../lib/sticker.js')
let stickerr = await sticker(false, sremovebg, info.kom, info.gitAuthor)
conn.sendFile(m.chat, stickerr, 'sticker.webp', '',m, { asSticker: true , db})
} catch (e) {
return conn.sendWritingText(m.chat, `*[❗INFO❗] LO SIENTO, OCURRIO UN ERROR, VUELVA A INTERNTARLO, NO OLVIDE RESPONDER A UNA IMAGEN LA CUAL SE CONVERTIRA EN STICKER SIN FONDO*`, m)
}}
handler.command = /^sremovebg|removebg$/i
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
