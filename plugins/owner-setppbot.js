let handler = async (m, { conn, usedPrefix, command }) => {
let bot = conn.user.jid
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (/image/.test(mime)) {
let img = await q.download()
if (!img) throw `*[❗INFO❗] NO SE ENCONTRO LA IMAGEN, POR FAVOR RESPONDE A UNA IMAGENUSANDO EL COMANDO ${usedPrefix + command}*`
await conn.updateProfilePicture(bot, img)
conn.reply(m.chat, '*[❗INFO❗] SE CAMBIO CON EXITO LA FOTO DE PERFILDEL NUMERO DEL BOT*', m)
} else throw `*[❗INFO❗] NO SE ENCONTRO LA IMAGEN, POR FAVOR RESPONDE A UNA IMAGEN USANDO EL COMANDO ${usedPrefix + command}*`}
handler.command = /^setppbot$/i
handler.rowner = true
export default handler 
