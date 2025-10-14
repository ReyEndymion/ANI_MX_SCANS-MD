const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
let handler = async (m, {conn, info, usedPrefix, db, objs, userdb, senderJid}) => {
const fs = await import('fs')
const {imagen1} = objs
const {owner} = await import('../config.js') 
let ow = owner.filter(entry => typeof entry[0] === `string` && !isNaN(entry[0])).map(entry => ({ jid: entry[0] })).slice(0).map(({jid}) => `@${jid}`).join` y `
let me = `@${conn.user.jid.split`@`[0]}`
var doc = [`pdf`,`zip`,`vnd.openxmlformats-officedocument.presentationml.presentation`,`vnd.openxmlformats-officedocument.spreadsheetml.sheet`,`vnd.openxmlformats-officedocument.wordprocessingml.document`]
var document = doc[Math.floor(Math.random() * doc.length)]
let text = `Hola @${senderJid.split`@`[0]} soy ${me}
*—◉ EL NUMERO DE MI OWNER ES: ${ow}*
`.trim() 

const documentUrl = info.gitAuthor;
const mimetype = `application/${document}`;
const fileName = info.namerepre;
const thumbnailUrl = fs.readFileSync(imagen1);
const sourceUrl = 'https://www.facebook.com/groups/otakustogether';

const documentMessage = {
//document: { url: documentUrl },
caption: text,
mimetype: mimetype,
fileName: fileName,
fileLength: 99999999999999,
pageCount: 200,
contextInfo: {
forwardingScore: 200,
isForwarded: false,
externalAdReply: {
mediaUrl: info.gitAuthor,
mediaType: 2,
previewType: document,
title: info.namerepre,
body: info.nani,
thumbnail: thumbnailUrl,
sourceUrl: info.gitAuthor
},
mentionedJid: conn.parseMention(text)
}
};
await conn.sendDocumentWriting(m.chat, documentUrl, documentMessage, userdb, m);
const vcardArray = [];

for (let i = 0; i < owner.length; i++) {
const [phoneNumber, displayName, isCompany] = owner[i];
const company = isCompany ? displayName : info.npe[phoneNumber] || '';
let vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${displayName};;;
FN:${displayName}
${company ? 'ORG:' + company : ''}
TEL;type=CELL;waid=${phoneNumber}:${phoneNumber}
X-ABLabel:${displayName}
X-WA-BIZ-DESCRIPTION:[❗] CONTACTA A ESTE NUM PARA COSAS IMPORTANTES.
X-WA-BIZ-NAME:${displayName}
END:VCARD`

vcardArray.push(vcard);
}

const vcardString = vcardArray.join('\n\n');




await conn.sendMessage(m.chat, { contacts: { displayName: 'Rey Endymion 👑', contacts: vcardArray.map((vcard) => ({ vcard })) }}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
handler.help = ['owner', 'creator']
handler.tags = ['info']
handler.command = /^(owner|creator|creador|propietario)$/i
handler.menu = [
{title:"💎 OWNER", description: "muestra información del creador del bot usando #owner", id: `owner`},
];
handler.type = "info";
handler.disabled = false;

export default handler
