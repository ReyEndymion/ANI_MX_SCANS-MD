let handler = async (m, { conn, usedPrefix }) => {
var doc = ['pdf','zip','vnd.openxmlformats-officedocument.presentationml.presentation','vnd.openxmlformats-officedocument.spreadsheetml.sheet','vnd.openxmlformats-officedocument.wordprocessingml.document']
var document = doc[Math.floor(Math.random() * doc.length)]    
let text = `*[❗INFO❗] LAS FUNCIONES PARA SER BOT (#SERBOT, #JADIBOT, #BOTS, #GETCODE, #SUBBOTS, #SERSUBBOT) NO ESTAN ACTUALMENTE FUNCIONALES PARA ESTE BOT (🌎ANI MX SCANS🌏)*

*—◉ PUEDE PROBAR INSTALAR DESDE CERO EL BOT SIGUIENDO UNO DE LOS TUTORIALES QUE HAY DE MI MAESTRO 𝑩𝒓𝒖𝒏𝒐 𝑺𝒐𝒃𝒓𝒊𝒏𝒐 EN EL CANAL DE THE SHADOW BROKERS*
*◉ https://www.youtube.com/channel/UCSTDMKjbm-EmEovkygX-lCA*`
let buttonMessage= {
'document': { url: `https://github.com/ReyEndymion/ANI_MX_SCANS-MD` },
'mimetype': `application/${document}`,
'fileName': `「Traducciones de Manga 」`,
'fileLength': 99999999999999,
'pageCount': 200,
'contextInfo': {
'forwardingScore': 0,
'isForwarded': false,
'externalAdReply': {
'mediaUrl': 'https://github.com/ReyEndymion/ANI_MX_SCANS-MD',
'mediaType': 2,
'previewType': 'pdf',
'title': 'Bot promocional del proyecto 🌎ANI MX SCANS🌏 ⁩',
'body': '🌎ANI MX SCANS🌏',
'thumbnail': imagen1,
'sourceUrl': 'https://www.facebook.com/ANIMxSCANS'}},
'caption': text,
'footer': wm,
'buttons':[
{buttonId: `${usedPrefix}instalarbot`, buttonText: {displayText: 'INSTALARBOT'}, type: 1}],
'headerType': 6 }
conn.sendMessage(m.chat, buttonMessage, { quoted: m })}
handler.command = /^(jadibot|serbot|bots|subbots|getcode)/i
export default handler

