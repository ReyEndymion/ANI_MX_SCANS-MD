import { API } from '../api.js'
let handler = async (m, {conn, db, userdb, senderJid}) => {
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid
conn.sendFile(m.chat, API('https://some-random-api.ml', '/canvas/simpcard', {
avatar: await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
}), 'error.png', '*¡¡TU RELIGION ES SER UN SIMP!!*', m)
}
handler.help = ['simpcard']
handler.tags = ['maker']  
handler.command = /^(simpcard)$/i  
handler.menu = [
{title: "🧧 SIMPCARD", description: "responde a una imagen o video que desea simpcard. usar #simpcard", id: `simpcard`}
];
handler.type = "logoefectos";
handler.disabled = false;

export default handler
