let handler = async (m, { conn, usedPrefix, text, command }) => {
let hash = text
if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex')
if (!hash) throw `*[❗INFO❗] SOLO SE PUEDEN ASIGNAR TEXTOS O COMANDOS ASIGNADOS A STICKERS O IMÁGENES, PARA OBTENER EL CÓDIGO ASIGNADO USE EL COMANDO ${usedPrefix}listcmd*`
let sticker = global.db.data.sticker
if (sticker[hash] && sticker[hash].locked) throw '*[❗INFO❗] SOLO EL OWNER PUEDE REALIZAR LA ELIMINACIÓN*'
delete sticker[hash]
m.reply(`*[ ✔ ] EL TEXTO/COMANDO ASIGNADO AL STICKER/IMAGEN FUE ELIMINADO DE LA BASE DE DATOS CORRECTAMENTE*`)}
handler.command = ['delcmd']
handler.rowner = true
export default handler
