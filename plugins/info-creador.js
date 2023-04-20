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
function sort(property, ascending = true) {
    if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
    else return (...args) => args[ascending & 1] - args[!ascending & 1]
  }
  
  function toNumber(property, _default = 0) {
    if (property) return (a, i, b) => {
      return {...b[i], [property]: a[property] === undefined ? _default : a[property]}
    }
    else return a => a === undefined ? _default : a
  }