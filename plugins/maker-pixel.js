import { API } from '../api.js'
let handler = async (m, {conn, usedprefix, text, db, userdb, senderJid}) => {
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid
conn.sendFile(m.chat, API('https://some-random-api.ml', '/canvas/pixelate', {
avatar: await conn.profilePictureUrl(senderJid, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
comment: text,
username: conn.getName(senderJid)
}), 'error.png', '*¡¡IMAGEN PIXELEADA CON EXITO!!*', m)
}
handler.help = ['pixel','difuminar']
handler.tags = ['maker']
handler.command = /^(pixel|pixelar|difuminar)$/i
handler.menu = [
{title: "🧧 PIXEL", description: "responde a una imagen o video que desea pixelar. usar #pixel", id: `pixel`},
];
handler.type = "logoefectos";
handler.disabled = false;

export default handler
