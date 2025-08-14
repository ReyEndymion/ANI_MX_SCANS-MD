import { API } from '../api.js'
let handler = async (m, {conn, db, userdb, senderJid}) => {
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid
conn.sendFile(m.chat, API('https://some-random-api.ml', '/canvas/horny', {
avatar: await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
}), 'hornycard.png', '*TU ESTAS HORNY 🥵🔥*', m)
}
handler.help = ['hornycard', 'hornylicense']
handler.tags = ['maker'] 
handler.command = /^(horny(card|license))$/i 
handler.menu = [
{title:"💎 HORNY CARD", description: "aplica un efecto de horny a la imagen del perfil usando #hornycard", id: `hornycard`},
];
handler.type = "logosefectos";
handler.disabled = false;

export default handler
