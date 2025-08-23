/*By https://github.com/ALBERTO9883 */
import { owner, info, temp, newsletterID, sBroadCastID, groupID, media } from '../config.js'
import { getRandom } from '../lib/functions.js'
import fs from 'fs'
import fetch from 'node-fetch'
import { googleImage } from '../lib/googlePictures.js'
let handler = async (m, {text, usedPrefix, command, conn, db, userdb, senderJid}) => {
try {
if (!text) return conn.sendWritingText(m.chat, `*[❗] INGRESE EL NOMBRE DEL PAQUETE QUE DESEE BUSCAR*`, userdb, m)
const res2 = await googleImage(text)
console.log('stikSearch: ', res2)
let sfoto = getRandom(res2)
let json = await fetch(`https://api.akuari.my.id/search/sticker?query=${text}`)
let jsons = await json.json()
let res = jsons.result.map((v, index) => `*🪴 • Resultado:* ${1 + index}\n*🌵 • Nombre:* ${v.title}\n*🍂 • Url:* ${v.url}`).join`\n\n───\n\n`
await conn.sendFile(m.chat, sfoto, 'error.jpg', res, m)
} catch (e) {
await conn.sendWritingText(m.chat, `*[❗] ERROR, POR FAVOR VUELVA A INTENTARLO*\n\n${e.stack}`, m)
}}
handler.tags = ['sticker', 'search']
/*var doc = ['pdf','zip','vnd.openxmlformats-officedocument.presentationml.presentation','vnd.openxmlformats-officedocument.spreadsheetml.sheet','vnd.openxmlformats-officedocument.wordprocessingml.document']
var document = doc[Math.floor(Math.random() * doc.length)]
let buttonMessage= {
'document': { url: `https://github.com/ReyEndymion/ANI_MX_SCANS-MD` },
'mimetype': `application/${document}`,
'fileName': `「𝑯𝒆𝒍𝒍𝒐 𝑾𝒐𝒓𝒍𝒅 」`,
'fileLength': 99999999999999,
'pageCount': 200,
'contextInfo': {
'forwardingScore': 200,
'isForwarded': true,
'externalAdReply': {
'mediaUrl': 'https://github.com/ReyEndymion/ANI_MX_SCANS-MD',
'mediaType': 2,
'previewType': 'pdf',
'title': `• Resultados Encontrados🔎`,
'body': info.nanie,
'thumbnail': sfoto,
'sourceUrl': 'https://www.youtube.com/channel/UCSTDMKjbm-EmEovkygX-lCA'}},
'caption': res,
'footer': `• SI DESEA DESCARGAR UN\n*PAQUETE DE STICKERS*\n*ESCRIBA ${usedPrefix}stickerpack <URL>*`,
'buttons':[
{buttonId: `${usedPrefix}menu`, buttonText: {displayText: 'MENU'}, type: 1}],
'headerType': 6 }
conn.sendMessage(m.chat, buttonMessage, { quoted: m })
}*/
handler.command = ['stickersearch', 'searchsticker', 'stickerssearch', 'searchstickers']
handler.help = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
