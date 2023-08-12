const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
let handler = async (m, { conn, usedPrefix, participants }) => {
     let ow = global.owner.filter(entry => typeof entry[0] === `string` && !isNaN(entry[0])).map(entry => ({ jid: entry[0] })).slice(0).map(({jid}) => `${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : `@`}${jid.split`@`[0]}`).join` y `
     let me = global.me.filter(entry => typeof entry[0] === `string` && !isNaN(entry[0])).map(entry => ({ jid: entry[0] })).slice(0).map(({jid}) => `${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : `@`}${jid.split`@`[0]}`)
var doc = [`pdf`,`zip`,`vnd.openxmlformats-officedocument.presentationml.presentation`,`vnd.openxmlformats-officedocument.spreadsheetml.sheet`,`vnd.openxmlformats-officedocument.wordprocessingml.document`]
var document = doc[Math.floor(Math.random() * doc.length)]    
let text = `Hola @${m.sender.split`@`[0]} soy ${me}
*—◉ EL NUMERO DE MI OWNER ES: ${ow}*
`.trim()   
let txt = '';
let count = 0;
for (const c of text) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;
    if (count % 10 === 0) {
       await conn.sendPresenceUpdate('composing' , m.chat);
    }
}
const documentUrl = 'https://www.facebook.com/groups/otakustogether';
  const mimetype = `application/${document}`;
  const fileName = namerepre;
  const thumbnailUrl = imagen1;
  const sourceUrl = 'https://www.facebook.com/groups/otakustogether';

  const documentMessage = {
    document: { url: documentUrl },
    caption: txt,
    mimetype: mimetype,
    fileName: fileName,
    fileLength: 99999999999999,
    pageCount: 200,
    contextInfo: {
      forwardingScore: 200,
      isForwarded: false,
      externalAdReply: {
        mediaUrl: 'https://github.com/ReyEndymion/Bot-Comedia-MD',
        mediaType: 2,
        previewType: 'pdf',
        title: 'Bot exclusivo de:',
        body: wm,
        thumbnail: thumbnailUrl,
        sourceUrl: sourceUrl
      },
      mentionedJid: conn.parseMention(txt) // Utiliza mentionedJid en lugar de mentions en un contextInfo
    }
  };
  await conn.sendMessage(m.chat, documentMessage, { mentions: conn.parseMention(txt), quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100});  
const vcardArray = [];

for (let i = 0; i < global.owner.length; i++) {
  const [phoneNumber, displayName, isCompany] = global.owner[i];
  const company = isCompany ? displayName : global.igfg[phoneNumber] || '';
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
//const data = global.owner.filter(([id, isCreator]) => id && isCreator)
//await conn.sendContact(m.chat, data.map(([id, name]) => [id, name]), m)
}
handler.help = ['owner', 'creator']
handler.tags = ['info']
handler.command = /^(owner|creator|creador|propietario)$/i
export default handler

/*
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
let handler = async (m, { conn, usedPrefix, participants }) => {
     let ow = global.owner.filter(entry => typeof entry[0] === `string` && !isNaN(entry[0])).map(entry => ({ jid: entry[0] })).map(toNumber(``)).sort(sort(``)).slice(0).map(({jid}) => `${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : `@`}${jid.split`@`[0]}`).join` y `
     let me = global.animxscans.filter(entry => typeof entry[0] === `string` && !isNaN(entry[0])).map(entry => ({ jid: entry[0] })).map(toNumber(``)).sort(sort(``)).slice(0).map(({jid}) => `${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : `@`}${jid.split`@`[0]}`)
var doc = [`pdf`,`zip`,`vnd.openxmlformats-officedocument.presentationml.presentation`,`vnd.openxmlformats-officedocument.spreadsheetml.sheet`,`vnd.openxmlformats-officedocument.wordprocessingml.document`]
var document = doc[Math.floor(Math.random() * doc.length)]    
let text = `Hola @${m.sender.split`@`[0]} soy ${me}
*—◉ EL NUMERO DE MI OWNER ES: ${ow}*

`.trim()   
let buttonMessage= {
document: { url: animxscansmd},
mimetype: `application/${document}`,
fileName: `「 Traducciones de Manga 」`,
fileLength: 99999999999999,
pageCount: 200,
contextInfo: {
forwardingScore: 0,
isForwarded: false,
externalAdReply: {
mediaUrl: animxscansmd,
mediaType: 2,
previewType: doc,
title: `Bot promocional del proyecto ${igfg}`,
body: igfg,
thumbnail: imagen1,
sourceUrl: hp_animxscans}},
caption: text,
footer: wm,
mentions: conn.parseMention(text),
buttons:[
{buttonId: `${usedPrefix}menu`, buttonText: {displayText: `MENU`}, type: 1}, 
{buttonId: `${usedPrefix}donar`, buttonText: {displayText: `DONAR`}, type: 1}],
headerType: 6 }
conn.sendMessage(m.chat, buttonMessage, { quoted: m }, { disappearingMessagesInChat: 1 * 1000} )
//let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;𝓡𝓮𝔂 𝓔𝓷𝓭𝔂𝓶𝓲𝓸𝓷 👑;;;\nFN:𝓡𝓮𝔂 𝓔𝓷𝓭𝔂𝓶𝓲𝓸𝓷 👑\nORG:𝓡𝓮𝔂 𝓔𝓷𝓭𝔂𝓶𝓲𝓸𝓷 👑\nTITLE:\nitem1.TEL;waid=5215517489568:+5215533827255\nitem1.X-ABLabel:𝓡𝓮𝔂 𝓔𝓷𝓭𝔂𝓶𝓲𝓸𝓷\nX-WA-BIZ-DESCRIPTION:[❗] CONTACTA A ESTE NUM PARA COSAS IMPORTANTES.\nX-WA-BIZ-NAME:𝓡𝓮𝔂 𝓔𝓷𝓭𝔂𝓶𝓲𝓸𝓷 👑\nEND:VCARD`
//await conn.sendMessage(m.chat, { contacts: { displayName: `Rey Endymion 👑`, contacts: [{ vcard }] }}, {quoted: m})
const data = global.owner.filter(([id, isCreator]) => id && isCreator)
//await conn.sendContact(m.chat, data.map(([id, name]) => [id, name]), m)
const templateButtons = [
  {index: 1, urlButton: {displayText: `⭐Facebook!`, url: hp_animxscans}},
  {index: 1, urlButton: {displayText: `⭐GitHub de ${igfg} !`, url: animxscansmd}}, 
]
const templateMessage = {
    text: gt,
    footer: `Aqui esten nuestras paginas oficiales y de descarga del repositorio:`,
    mentions: conn.parseMention(text),
    templateButtons: templateButtons,
    image: {url: imagen1}
}
await delay(1 * 2000)
conn.sendMessage(m.chat, templateMessage, {quoted: m}, { disappearingMessagesInChat: 1 * 1000})
}
handler.help = [`owner`, `creator`]
handler.tags = [`info`]
handler.command = /^(owner|creator|creador|propietario)$/i
export default handler
*/