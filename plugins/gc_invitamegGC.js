let handler = async (m, {conn, args, db, __dirname, userdb, senderJid}) => {
const { generateWAMessageFromContent } = (await import('@whiskeysockets/baileys')).default;
let { default: fetch } = await import('node-fetch');
const { join } = await import('path');
let { default: fs } = await import('fs');
let groupInvitations = [];
for (let [jid, chat] of Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats)) {
let name = await conn.getName(jid);
let link;
let img;

try {
link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(jid);
var pp = await conn.profilePictureUrl(jid, 'image');
img = await (await fetch(pp)).buffer();
} catch {
link = '';
const {media} = await import('../config.js')
img = fs.readFileSync(join(media, 'pictures/sinFotoG.jpg'));
}

groupInvitations.push({ jid, name, link, img });
}

for (let group of groupInvitations) {
if (group.link) {
let prep = generateWAMessageFromContent(m.chat, {
extendedTextMessage: {
text: `*${group.link}*`,
contextInfo: {
externalAdReply: {
body: false,
containsAutoReply: true,
mediaType: 1,
mediaUrl: group.link,
renderLargerThumbnail: true,
showAdAttribution: false,
sourceId: group.name,
sourceUrl: group.link,
thumbnail: group.img,
thumbnailUrl: group.img,
title: group.name,
},
},
},
}, { userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 });
await conn.writing(m.chat, group.link)
conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id });
} else {
let resp = `No puedo enviar el enlace de invitación del grupo *${group.name}* porque no soy administrador.`

await conn.sendWritingText(m.chat, resp, userdb, m);
}
}
};

handler.help = ['invitame'];
handler.tags = ['group'];
handler.command = /^invitame$/i;
handler.admin = false;
handler.group = false;
handler.botAdmin = false;

handler.menu = [
{title:"💎 INVITAR A GRUPOS", description: "invita a los grupos donde el bot esta usando #invitame", id: `invitame`}];
handler.type = "gadmin";
handler.disabled = false;

export default handler;
