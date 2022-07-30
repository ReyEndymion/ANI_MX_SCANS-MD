let handler = async (m, { conn, usedPrefix }) => {
var doc = ['pdf','zip','vnd.openxmlformats-officedocument.presentationml.presentation','vnd.openxmlformats-officedocument.spreadsheetml.sheet','vnd.openxmlformats-officedocument.wordprocessingml.document']
var document = doc[Math.floor(Math.random() * doc.length)]    
let text = `
*—◉ EL NUMERO DE MI OWNER ES wa.me/5215517489568*
`.trim()   
let buttonMessage= {
'document': { url: `https://github.com/ReyEndymion/ANI_MX_SCANS-MD` },
'mimetype': `application/${document}`,
'fileName': `「 Traducciones de Manga 」`,
'fileLength': 99999999999999,
'pageCount': 200,
'contextInfo': {
'forwardingScore': 200,
'isForwarded': true,
'externalAdReply': {
'mediaUrl': 'https://github.com/ReyEndymion/ANI_MX_SCANS-MD',
'mediaType': 2,
'previewType': 'pdf',
'title': 'Bot promocional del proyecto 🌎ANI MX SCANS🌏 ⁩',
'body': '🌎ANI MX SCANS🌏',
'thumbnail': imagen1,
'sourceUrl': 'https://www.facebook.com/ANIMxSCANS' }},
'caption': text,
'footer': wm,
'buttons':[
{buttonId: `${usedPrefix}menu`, buttonText: {displayText: 'MENU'}, type: 1}, 
{buttonId: `${usedPrefix}donar`, buttonText: {displayText: 'DONAR'}, type: 1}],
'headerType': 6 }
conn.sendMessage(m.chat, buttonMessage, { quoted: m })
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;𝓡𝓮𝔂 𝓔𝓷𝓭𝔂𝓶𝓲𝓸𝓷 👑;;;\nFN:𝓡𝓮𝔂 𝓔𝓷𝓭𝔂𝓶𝓲𝓸𝓷 👑\nORG:𝓡𝓮𝔂 𝓔𝓷𝓭𝔂𝓶𝓲𝓸𝓷 👑\nTITLE:\nitem1.TEL;waid=5215517489568:+5215533827255\nitem1.X-ABLabel:𝓡𝓮𝔂 𝓔𝓷𝓭𝔂𝓶𝓲𝓸𝓷\nX-WA-BIZ-DESCRIPTION:[❗] CONTACTA A EsTE NUM PARA COsAs IMPORTANTEs.\nX-WA-BIZ-NAME:𝓡𝓮𝔂 𝓔𝓷𝓭𝔂𝓶𝓲𝓸𝓷 👑\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: 'Rey Endymion 👑', contacts: [{ vcard }] }}, {quoted: m})
const data = global.owner.filter(([id, isCreator]) => id && isCreator)
await conn.sendContact(m.chat, data.map(([id, name]) => [id, name]), m)
}
handler.help = ['owner', 'creator']
handler.tags = ['info']
handler.command = /^(owner|creator|creador|propietario)$/i
export default handler
