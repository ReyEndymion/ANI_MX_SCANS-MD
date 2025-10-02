import { userID } from '../config.js';

export async function before (m, {conn, info, chatdb, db, objs, userdb, senderJid, isROwner, isLidGroup}) {
if (m.fromMe) return
const fs = await import('fs')
let { sticker } = await import('../lib/sticker.js')
let { owner, temp, newsletterID, sBroadCastID, groupID, lid, media } = await import('../config.js')
const {stickerAMX, imagen1} = objs
const { pickRandom } = await import('../lib/functions.js');
const stk = fs.readFileSync(stickerAMX)
const normalizetext = await conn.textTagsLidToJid(m.text, m.chat)
const isMentionBot = normalizetext.includes('@' + conn.user.jid.split('@')[0])
if (isMentionBot && m.isGroup && !chatdb.isBanned && chatdb.autoreac && !m.fromMe) {
return conn.sendSticker(m.chat, stk, {packname: info.kom, wm: info.gitAuthor, contextInfo: {externalAdReply: { title: info.nanipe, body: info.repoProyect, sourceUrl: info.repoProyect, thumbnail: stk}}}, m)
}
const isMentionOwner = m.mentionedJid.some(ment => owner.some(([number, nameOw, boolean]) => {
ment.endsWith(lid) ? ment = conn.lidToJid(ment, m.chat) : ment

if (ment === number+userID) return true 
else return false
}))
if (chatdb.autoreac && (/(Rey Endymion|ANIMXSCANS|ANI MX SCANS)/gi.test(normalizetext.toLowerCase()) || isMentionOwner)) {
let emot = pickRandom(['🎃', '❤', '😘', '😍', '💕', '😎', '🙌', '⭐', '👻', '🔥']);
conn.sendMessage(m.chat, { react: { text: emot, key: m.key }});
}
if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Abre este enlace')) && !m.isBaileys && !m.isGroup && !isROwner) {
const botNumber = conn.user.jid.split('@')[0]
let join = `*< UNE EL BOT A TU GRUPO />*\n\n*HOLA @${senderJid.split`@`[0]}*\n\nPARA SOLICITAR UN BOT A TU GRUPO USA EL COMANDO *#join* MAS EL ENLACE DE INVITACION DE TU GRUPO\n\n*—◉ EJEMPLO:*\n*◉ #join* ${info.ganicmd}\n\nAqui hay otro grupo donde puedes contactar al bot para usarlo ${info.ganisubbots}`.trim() 
let contextInfo = {
mentionedJid: conn.parseMention(join),
"externalAdReply": {
"title": info.nanipe, 
"containsAutoReply": true,
"renderLargerThumbnail": true,
"containsAutoReply": true,
"mediaType": 2, 
"thumbnail": fs.readFileSync(imagen1),
"mediaUrl": info.ganisubbots,
"sourceUrl": `https://api.whatsapp.com/send/?phone=${botNumber}&text=.join&type=phone_number&app_absent=0`
}
}
return conn.sendWritingTextCI(m.chat, join.trim(), contextInfo, userdb, m)
}
}
