let handler = async (m, { conn , db, isBotAdmin, userdb, senderJid, objs}) => {
const {dbGroups} = objs
const { generateWAMessageFromContent } = (await import('@whiskeysockets/baileys')).default;
let { default: fetch } = await import('node-fetch');
const { default: path  } = await import('path');
let { default: fs } = await import('fs');
let {media, groupID} = await import('../config.js')
let groupName = 'Grupos Otakus Unidos(GOU)'
let groupInvitations = [];
let link, img, group, name;
try {
await dbGroups.read()
const groups = Object.entries(dbGroups.data)
for (const [_, chat] of groups) {
const jid = chat.id
name = chat.subject
console.log('gouC: ', jid, name)
if (name !== groupName) continue
try {
link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(jid);
var pp = await conn.profilePictureUrl(jid, 'image');
img = await (await fetch(pp)).buffer();
} catch {
link = '';
img = fs.readFileSync(path.join(media, 'pictures/sinFoto.png'));
}
if (name === groupName) {
group = chat.subject
groupInvitations.push({ jid, name, link, img });
}


}
if (link) {
let resp = `_➤ Asociación de grupos de anime S.A._*

**Sean bienvenidos los grupos de anime y todos aquellos que quieran pertenecer aunque no sean de anime**

*${link}*

@${senderJid.split`@`[0]}
En este grupo está formada una alianza entre los grupos de WhatsApp con temática Otaku y diversos

Se pretende que entre todos hagamos un convenio que sirva para prepararnos contra el spam

Este grupo no será activo por lo que los participantes deben activarlo y cuando llegue un mensaje este se activará inmediatamente y sólo va a ser para reuniones de administración duda o consulta entre grupos

Se requiere total seriedad en este grupo...
Los administradores de los grupos se respetaran
`
const contextInfo = {
mentionedJid: conn.parseMention(resp),
externalAdReply: {
body: false,
containsAutoReply: true,
mediaType: 2,
mediaUrl: link,
renderLargerThumbnail: true,
showAdAttribution: false,
sourceId: name,
sourceUrl: link,
thumbnail: img,
thumbnailUrl: img,
title: name,
},
}
return conn.sendWritingTextCI(m.chat, resp, contextInfo, userdb, m)
} else if (group && !link) {
let resp = `Este bot esta en el grupo *${groupName}* pero no es administrador, no puedo ejecutar este comando.`;
return conn.sendWritingText(m.chat, resp, userdb, m);
} else if (!group) {
let resp = `No puedo enviar el enlace del grupo con el nombre *${groupName}* porque no estoy en ese grupo o no existe o no esta disponible para este bot.`;
return conn.sendWritingText(m.chat, resp, userdb, m);

} else {
let resp = `No puedo enviar el enlace de invitación del grupo *${groupName}* porque no estoy en ese grupo o no existe.`;
return conn.sendWritingText(m.chat, resp, userdb, m);
}

} catch (error) {
console.log('error gou', error)
let resp = `Ha ocurrido el siguiente error\n\n *${error.stack}*.`;
return conn.sendWritingText(m.chat, resp, userdb, m);
}
}
handler.command = /^(asociaciongruposotakus|asociacion de grupos otakus|GOU)$/i
handler.help = [];
handler.tags = [];
handler.menu = [
{header: 'informacion', title: 'Asociación de grupos de anime S.A.', description: 'Sean bienvenidos los grupos de anime y todos aquellos que quieran pertenecer aunque no sean de anime', id: 'gou'}
];
handler.type = "info";
handler.disabled = false;

export default handler
