/**
 * Comando unificado Para control del link
 */
const { generateWAMessageFromContent } = await import('@whiskeysockets/baileys')
import fetch from 'node-fetch'
import path, { join } from 'path'
import fs from 'fs'
let handler = async (m, {conn, command, usedPrefix, isBotAdmin, isAdmin, chatdb, userdb, senderJid}) => {
if (isBotAdmin && isAdmin) {
if (/^link(g?roup)?$/i.test(command)) {
let name = (await conn.groupMetadata(m.chat)).subject
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat)
try {
var pp = await conn.profilePictureUrl(m.chat, 'image')
var img = await (await fetch(pp)).buffer()
} catch {
var img = fs.readFileSync(join(media, 'pictures/sinFotoG.jpg'))
}
let prep = generateWAMessageFromContent(m.chat, { extendedTextMessage: { text: `*${link}*`, contextInfo: { externalAdReply: { 
body: null, 
containsAutoReply: true, 
mediaType: 1, 
mediaUrl: link,
renderLargerThumbnail: true, 
showAdAttribution: false, 
sourceId: name, 
sourceUrl: link, 
thumbnail: img, 
thumbnailUrl: link, 
title: name
}}}}, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 })
await conn.writing(m.chat, link)
return conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id })
}

if (/^linkreset|linkrevoke$/i.test(command)) {
let revoke = await conn.groupRevokeInvite(m.chat)
if (!chatdb.detect) {
let resp = `🔹️ *_Se restableció con éxito el link del grupo._*`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
}
} else if (!isBotAdmin && isAdmin) {
let resp = `*[❗INFO❗] EL BOT NO ES ADMINISTRADOR DEL GRUPO, NO PUEDE REALIZAR ESTA ACCIÓN HASTA QUE LOD HAGAS ADMIN*`;
return conn.sendWritingText(m.chat, resp, userdb, m);
} else {
let resp = `*[❗INFO❗] SOLO UN ADMINISTRADOR DEL GRUPO PUEDE REALIZAR ESTA ACCIÓN*`;
return conn.sendWritingText(m.chat, resp, userdb, m);
}
}
handler.help = ['linkgroup']
handler.tags = ['group']
handler.command = /^link(gro?up|reset|revoke)?$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
handler.menu = [
{title:" 💎 SOLICITA EL LINK", description: "solicita el link del grupo actual usando #link", id: `link`},
{title:" 💎 NUEVO LINK", description: "resetea el link de invitacion del grupo actual usando #resetlink", id: `resetlink`},
];
handler.type = "gadmin";
handler.disabled = false;

export default handler
