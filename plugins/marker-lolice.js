import { API } from '../api.js'
let handler = async (m, {conn, usedprefix, db, userdb, senderJid}) => {
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid
let resp = '*🚔🚨 LOLICONES COMO TU SOLO PERTENECEN A LA CARCEL 🚨🚔*'
await conn.writing(m.chat, resp)

return conn.sendMessage(m.chat, {image:{ url: API('https://some-random-api.com', '/canvas/misc/lolice', { 
avatar: await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')})}, caption: resp, mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
}

handler.help = ['lolice']
handler.tags = ['maker']
handler.command = /^(lolice)$/i
handler.menu = [
{title: "🚔 LOLICE", description: "Crea un diseño con el efecto de lolice. Usa #lolice", id: `lolice`}
];
handler.type = "logoefectos";
handler.disabled = false;

export default handler
