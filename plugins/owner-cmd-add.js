let handler = async (m, {conn, text, usedPrefix, command, botdb, db, userdb, senderJid}) => {
botdb.sticker = botdb.sticker || {}
if (!m.quoted) return conn.sendWritingText(m.chat, `'*[❗INFO❗] RESPONDE AL STICKER O IMAGEN AL CUAL DESEA AGREGAR UN COMANDO O TEXTO*'`, userdb, m)
if (!m.quoted.fileSha256) return conn.sendWritingText(m.chat, `'*[❗INFO❗] SOLO PUEDES ASIGNAR COMANDOS O TEXTOS A STICKERS E IMÁGENES*'`, userdb, m)
if (!text) return conn.sendWritingText(m.chat, `*[❗INFO❗] ERROR DE USO, TEXTO FALTANTE*\n\n*USO CORRECTO DEL COMANDO:*\n*—◉ ${usedPrefix + command} <texto> <responder a sticker o imagen>*\n\n*EJEMPLO DE USO DEL COMANDO:*\n*—◉ ${usedPrefix + command} <#menu> <responder a sticker o imagen>*`, userdb, m)
let sticker = botdb.sticker
let hash = m.quoted.fileSha256.toString('base64')
if (sticker[hash] && sticker[hash].locked) return conn.sendWritingText(m.chat, `'*[❗INFO❗] SOLO EL OWNER PUEDE REALIZAR LA MODIFICACIÓN*'`, userdb, m)
sticker[hash] = { text, mentionedJid: m.mentionedJid, creator: senderJid, at: + new Date, locked: false }
return conn.sendWritingText(m.chat, `*[ ✔ ] EL TEXTO/COMANDO ASIGNADO AL STICKER/IMAGEN FUE AGREGADO A LA BASE DE DATOS CORRECTAMENTE*`, userdb, m)
}
handler.command = ['setcmd', 'addcmd', 'cmdadd', 'cmdset']
handler.rowner = true
handler.help = [];
handler.tags = [];
handler.menu = [
{header: 'Comandos en Multimedia', title: 'ADDCMD', description: ' Agrega comandos a un sticker o a una imagen', id: 'addcmd'}
];
handler.type = "owners";
handler.disabled = false;

export default handler
