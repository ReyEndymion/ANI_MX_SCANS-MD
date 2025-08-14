import { API } from '../api.js'
let handler = async (m, {conn, usedprefix, db, userdb, senderJid}) => {
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid
conn.sendFile(m.chat, API('https://some-random-api.ml', '/canvas/blur', {
avatar: await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
}), 'hornycard.png', '*[ ✔ ] EFECTO APLICADO*', m)
}
handler.help = ['blur','difuminar2']
handler.tags = ['maker']
handler.command = /^(blur|difuminar2)$/i
handler.menu = [
{title:"💎 DIFUMINAR", description: "aplica un efecto de difuminado a la imagen del perfil usando #blur", id: `blur`},
];
handler.type = "logosefectos";
handler.disabled = false;

export default handler
