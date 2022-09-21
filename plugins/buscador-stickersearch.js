/* Created By https://github.com/ALBERTO9883 */
import fetch from 'node-fetch'
import fs from 'fs'
let handler = async (m, {text, usedPrefix, command, conn}) => {
let sfoto = fs.readFileSync('./Menu2.jpg')
if (!text) throw `*[❗] INGRESE EL NOMBRE DEL PAQUETE QUE DESEE BUSCAR*`
let json = await fetch(`https://api.zacros.my.id/search/sticker?query=${text}`)
let jsons = await json.json()
  let res = jsons.result.map((v, index) => `*🪴 • RESULTADO:* ${1 + index}\n*🌵 • NOMBRE:* ${v.title}\n*🍂 • URL:* ${v.url}`).join`\n\n─────────────────────\n\n`
var doc = ['pdf','zip','vnd.openxmlformats-officedocument.presentationml.presentation','vnd.openxmlformats-officedocument.spreadsheetml.sheet','vnd.openxmlformats-officedocument.wordprocessingml.document']
var document = doc[Math.floor(Math.random() * doc.length)]    
let buttonMessage= {
'document': { url: `https://github.com/ReyEndymion/ANI_MX_SCANS-MD` },
'mimetype': `application/${document}`,
'fileName': `「  𝑯𝒆𝒍𝒍𝒐 𝑾𝒐𝒓𝒍𝒅 」`,
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
'body': wm,
'thumbnail': sfoto,
'sourceUrl': 'https://www.youtube.com/channel/UCSTDMKjbm-EmEovkygX-lCA'}},
'caption': res,
'footer': `• SI DESEA DESCARGAR UN\n*PAQUETE DE STICKERS*\n*ESCRIBA ${usedPrefix}stickerpack <URL>*`,
'buttons':[
{buttonId: `${usedPrefix}menu`, buttonText: {displayText: 'MENU'}, type: 1}],
'headerType': 6 }
conn.sendMessage(m.chat, buttonMessage, { quoted: m })
}
handler.command = ['stickersearch', 'searchsticker', 'stickerssearch', 'searchstickers']
export default handler
