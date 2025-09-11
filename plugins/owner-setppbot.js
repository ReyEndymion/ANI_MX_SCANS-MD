let handler = async (m, {conn, usedPrefix, command, db, userdb, senderJid}) => {
let bot = conn.user.jid
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (/image/.test(mime)) {
let img = await q.download()
if (!img) return conn.sendWritingText(m.chat, `*[❗INFO❗] NO SE ENCONTRO LA IMAGEN, POR FAVOR RESPONDE A UNA IMAGENUSANDO EL COMANDO ${usedPrefix + command}*`, m)
await conn.updateProfilePicture(bot, img)
conn.sendWritingText(m.chat, '*[❗INFO❗] SE CAMBIO CON EXITO LA FOTO DE PERFILDEL NUMERO DEL BOT*', userdb, m)
} else return conn.sendWritingText(m.chat, `*[❗INFO❗] NO SE ENCONTRO LA IMAGEN, POR FAVOR RESPONDE A UNA IMAGEN USANDO EL COMANDO ${usedPrefix + command}*`, m)}
handler.command = /^setppbot$/i
handler.rowner = true
handler.help = [];
handler.tags = [];
handler.menu = [
{title: "📷 SETPPBOT", description: "Cambiar la foto de perfil del bot", id: `setppbot`}
];
handler.type = "owners";
handler.disabled = false;

export default handler 
