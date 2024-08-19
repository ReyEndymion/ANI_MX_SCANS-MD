const { generateWAMessageFromContent } = (await import('@whiskeysockets/baileys')).default;
import fetch from 'node-fetch';
import { join } from 'path';
import fs from 'fs';
const __dirname = global.__dirname(import.meta.url);
let handler = async (m, { conn }, isBotAdmin) => {
let groupName = 'Grupos Otakus Unidos(GOU)'
let groupInvitations = [];
let link, img, group, name;
try {
for (const [jid, chat] of Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats)) {
console.log('la consola dice: ', jid)
try {
name = await conn.getName(jid);
link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(jid);
var pp = await conn.profilePictureUrl(jid, 'image');
img = await (await fetch(pp)).buffer();
} catch {
link = '';
img = fs.readFileSync(join(media, 'pictures/avatar_contact.png'));
}
 if (name.includes(groupName) &&conn.chats[jid].subject === groupName) {
group = chat.subject
break
//groupInvitations.push({ jid, name, link, img });
 }


}
console.log('jid', !name === groupName)

if (link) {
let resp = `_➤ Asociación de grupos de anime S.A._*

**Sean bienvenidos los grupos de anime y todos aquellos que quieran pertenecer aunque no sean de anime**

*${link}*

@${m.sender.split`@`[0]}
En este grupo está formada una alianza entre los grupos de WhatsApp con temática Otaku y diversos

Se pretende que entre todos hagamos un convenio que sirva para prepararnos contra el spam

Este grupo no será activo por lo que los participantes deben activarlo y cuando llegue un mensaje este se activará inmediatamente y sólo va a ser para reuniones de administración duda o consulta entre grupos

Se requiere total seriedad en este grupo...
Los administradores de los grupos se respetaran
`
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 5));
txt += c;
count++;
if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
}
}
let prep = generateWAMessageFromContent(m.chat, {
extendedTextMessage: {
text: `*${txt.trim()}*`,
contextInfo: {
mentionedJid: conn.parseMention(txt),
externalAdReply: {
body: false,
containsAutoReply: true,
mediaType: 1,
mediaUrl: link,
renderLargerThumbnail: true,
showAdAttribution: false,
sourceId: name,
sourceUrl: link,
thumbnail: img,
thumbnailUrl: img,
title: name,
},
},
},
}, { userJid: conn.user.jid, quoted: m//, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 
});

return conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id });
//return await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} else if (group && !link) {
let resp = `Este bot esta en el grupo *${groupName}* pero no es administrador, no puedo ejecutar este comando.`;
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 15));
txt += c;
count++;

if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing', m.chat);
}
}
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 });
} else if (!group) {
let resp = `No puedo enviar el enlace del grupo con el nombre *${groupName}* porque no estoy en ese grupo o no existe o no esta disponible para este bot.`;
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 15));
txt += c;
count++;

if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing', m.chat);
}
}
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 });

} else {
let resp = `No puedo enviar el enlace de invitación del grupo *${groupName}* porque no estoy en ese grupo o no existe.`;
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 15));
txt += c;
count++;

if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing', m.chat);
}
}
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 });
}

} catch (error) {
console.log('error gou', error)
let resp = `Ha ocurrido el siguiente error\n\n *${error}*.`;
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 15));
txt += c;
count++;

if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing', m.chat);
}
}
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 });
}
}
handler.command = /^(asociaciongruposotakus|asociacion de grupos otakus|GOU)$/i
export default handler
