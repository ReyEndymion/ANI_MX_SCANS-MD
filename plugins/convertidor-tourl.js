import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
let handler = async (m, {conn, db, userdb, senderJid}) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) return conn.sendWritingText(m.chat, `'*[❗INFO❗] RESPONDA A UNA IMAGEN O VIDEO EL CUAL SERA CONVERTIDO A ENLACE*'`, userdb, m)
let media = await q.download()
let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
let link = await (isTele ? uploadImage : uploadFile)(media)
return conn.sendWritingText(m.chat, `*ENLACE A SU ARCHIVO:* ${link}`, userdb, m)}
handler.help = ['tourl <reply image>']
handler.tags = ['sticker']
handler.command = /^(upload|tourl)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
