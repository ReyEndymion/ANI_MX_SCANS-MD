import { sticker } from '../lib/sticker.js'

export async function before (m, {conn}) {
let bot = global.db.data.bot[conn.user.jid] || {}
const chats = bot.chats || {}
const privs = chats.privs || {}
const groups = chats.groups || {}
let chat, users, user
if (m.chat.endsWith(userID)) {
chat = privs[m.chat] || {}
user = privs[m.sender] || {}
} else if (m.chat.endsWith(groupID)) {
chat = groups[m.chat] || {}
users = chat.users || {}
user = users[m.sender] || {}
} else return

if (m.mentionedJid.includes(conn.user.jid) && m.isGroup && !chat.isBanned && !m.fromMe) {
let stiker = await sticker(stickerAMX, false, global.gt, global.author)
//conn.sendFile(m.chat, stiker, 'sticker.webp', null, m, false, {contextInfo: { externalAdReply: { title: wm, body: author, sourceUrl: md, thumbnail: imagen2am}}})
return conn.sendMessage(m.chat, {sticker: stiker,mimetype: 'image/webp', asSticker: true, contextInfo: { externalAdReply: { title: wm, body: author, sourceUrl: md, thumbnail: stickerAMX}}}, {quoted: m, ephemeralExpiration: 2*60*1000 });
}
if (!m.fromMem && m.text.match(/(Rey Endymion|@5215517489568|@5215533827255|ANIMXSCANS|ANI MX SCANS)/gi)) {
let emot = pickRandom(['🎃', '❤', '😘', '😍', '💕', '😎', '🙌', '⭐', '👻', '🔥']);
conn.sendMessage(m.chat, { react: { text: emot, key: m.key }});
}
if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Abre este enlace')) && !m.isBaileys && !m.isGroup) {
let join = `*< UNE EL BOT A TU GRUPO />*\n\n*HOLA @${m.sender.split`@`[0]}*\n\nPARA SOLICITAR UN BOT A TU GRUPO USA EL COMANDO *#join* MAS EL ENLACE DE INVITACION DE TU GRUPO\n\n*—◉ EJEMPLO:*\n*◉ #join* ${ganicmd}\n\nAqui hay otro grupo donde puedes contactar al bot para usarlo ${ganisubbots}`.trim() 
let txt = '';
let count = 0;
for (const c of join) {
await new Promise(resolve => setTimeout(resolve, 5));
txt += c;
count++;
if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
}
}
let contextInfo = {
mentionedJid: conn.parseMention(txt),
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
"renderLargerThumbnail": true,
"title": wm, 
"containsAutoReply": true,
"mediaType": 1, 
"thumbnail": imagen1,
"mediaUrl": ganisubbots,
"sourceUrl": `https://api.whatsapp.com/send/?phone=5215625406730&text=.join&type=phone_number&app_absent=0`
}
}
return conn.sendMessage(m.chat, {text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt)}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 })
}
}
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)];
}
