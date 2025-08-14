import { API } from '../api.js'
let handler = async (m, {conn, text, db, userdb, senderJid}) => {
if (!text) return conn.sendWritingText(m.chat, `No Text`, userdb, m)
conn.sendFile(m.chat, API('https://some-random-api.ml', '/canvas/youtube-comment', {
avatar: await conn.profilePictureUrl(senderJid, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
comment: text,
username: conn.getName(senderJid)
}), 'error.png', '*¡¡GRACIAS POR COMENTAR!!*', m)
}
handler.help = ['ytcomment <comment>']
handler.tags = ['maker'] 
handler.command = /^(ytcomment)$/i
handler.menu = [
{title: "🧧 YTCOMMENT", description: "Haz un fake de un comentario en youtube usado #ytcomment <comentario>", id: `ytcomment`}
];
handler.type = "logoefectos";
handler.disabled = false;

export default handler
