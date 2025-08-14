let handler = async (m, {conn, usedPrefix, text, command, db, botdb, userdb, senderJid}) => {
let hash = text
if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex')
if (!hash) return conn.sendWritingText(m.chat, `*[❗INFO❗] SOLO SE PUEDEN ASIGNAR TEXTOS O COMANDOS ASIGNADOS A STICKERS O IMÁGENES, PARA OBTENER EL CÓDIGO ASIGNADO USE EL COMANDO ${usedPrefix}listcmd*`, m)
let sticker = botdb.sticker
if (sticker[hash] && sticker[hash].locked) return conn.sendWritingText(m.chat, `*[❗INFO❗] SOLO EL OWNER PUEDE REALIZAR LA ELIMINACIÓN*`, userdb, m)
delete sticker[hash]
return conn.sendWritingText(m.chat, `*[ ✔ ] EL TEXTO/COMANDO ASIGNADO AL STICKER/IMAGEN FUE ELIMINADO DE LA BASE DE DATOS CORRECTAMENTE*`, userdb, m)
}
handler.command = ['delcmd']
handler.rowner = true
handler.help = [];
handler.tags = [];
handler.menu = [
{header: 'Comandos en Multimedia', title: 'DELCMD', description: ' Elimina comandos de un sticker o a una imagen', id: 'delcmd'}
];
handler.type = "owners";
handler.disabled = false;

export default handler
