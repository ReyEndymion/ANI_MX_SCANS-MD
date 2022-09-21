let handler = async (m, { conn, text, usedPrefix, command }) => {
global.db.data.sticker = global.db.data.sticker || {}
if (!m.quoted) throw '*[❗INFO❗] RESPONDE AL STICKER O IMAGEN AL CUAL DESEA AGREGAR UN COMANDO O TEXTO*'
if (!m.quoted.fileSha256) throw '*[❗INFO❗] SOLO PUEDES ASIGNAR COMANDOS O TEXTOS A STICKERS E IMÁGENES*'
if (!text) throw `*[❗INFO❗] ERROR DE USO, TEXTO FALTANTE*\n\n*USO CORRECTO DEL COMANDO:*\n*—◉ ${usedPrefix + command} <texto> <responder a sticker o imagen>*\n\n*𝙴𝙹𝙴𝙼𝙿𝙻𝙾 𝙳𝙴 𝚄𝚂𝙾 𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙾 𝙳𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾:*\n*—◉ ${usedPrefix + command} <#menu> <responder a sticker o imagen>*`
let sticker = global.db.data.sticker
let hash = m.quoted.fileSha256.toString('base64')
if (sticker[hash] && sticker[hash].locked) throw '*[❗INFO❗] SOLO EL OWNER PUEDE REALIZAR LA MODIFICACIÓN*'
sticker[hash] = { text, mentionedJid: m.mentionedJid, creator: m.sender, at: + new Date, locked: false }
m.reply(`*[ ✔ ] EL TEXTO/COMANDO ASIGNADO  AL STICKER/IMAGEN FUE AGREGADO A LA BASE DE DATOS CORRECTAMENTE*`)
}
handler.command = ['setcmd', 'addcmd', 'cmdadd', 'cmdset']
handler.rowner = true
export default handler
