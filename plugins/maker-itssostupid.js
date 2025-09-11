import { API } from '../api.js'
let handler = async (m, {conn, args, db, userdb, senderJid}) => {
let text = args.slice(1).join(' ')
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid
conn.sendFile(m.chat, API('https://some-random-api.ml', '/canvas/its-so-stupid', {
avatar: await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
dog: text || 'im+stupid'
}), 'error.png', `*@${author}*`, m)
}
handler.help = ['itssostupid', 'iss', 'stupid']
handler.tags = ['maker']
handler.command = /^(itssostupid|iss|stupid)$/i
handler.menu = [
{title: "💎 IT'S SO STUPID", description: "crea una imagen con el texto 'im+stupid' usando #itssostupid", id: `itssostupid`}
];
handler.type = "logosefectos";
handler.disabled = false;

export default handler
