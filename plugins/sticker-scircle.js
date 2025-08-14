let handler = async (m, {conn, text, db, userdb, senderJid}) => {
const uploadImage = await import('../lib/uploadImage.js')
const fetch = await import('node-fetch')
const { API } = await import('../api.js')
const { sticker } = await import('../lib/sticker.js')
const { axiosJson } = await import('../lib/functions.js')
try {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
let img = await q.download()
let url = await uploadImage(img)
let scircle = API('dzx', '/api/canvas/circle', { url }) 
let stiker = await sticker(null, scircle, info.kom, info.gitAuthor)
conn.sendFile(m.chat, stiker, 'sticker.webp', '',m, { asSticker: true , db})
} catch (e) {
return conn.sendWritingText(m.chat, `*[!INFO!] LO SIENTO, OCURRO UN ERROR, VUELVA A INTENTARLO, NO OLVIDE RESPONDER A UNA IMAGEN LA CUAL SE CONVERTIRA EN STICKER CIRCULAR*`, m)
}}
handler.command = /^scircle|circle$/i
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
/* `https://api.dhamzxploit.my.id/api/canvas/circle?url=${url}` */
