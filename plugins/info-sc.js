let handler = async (m, { conn, usedPrefix }) => {
var doc = ['pdf','zip','vnd.openxmlformats-officedocument.presentationml.presentation','vnd.openxmlformats-officedocument.spreadsheetml.sheet','vnd.openxmlformats-officedocument.wordprocessingml.document']
var document = doc[Math.floor(Math.random() * doc.length)]    
let texto = `*${md}*`
let buttonMessage= {
'document': { url: hp_animxscans },
'mimetype': `application/${document}`,
'fileName': `「Traducciones de Manga」`,
'fileLength': 99999999999999,
'pageCount': 200,
'contextInfo': {
'forwardingScore': 0,
'isForwarded': false,
'externalAdReply': {
'mediaUrl': md,
'mediaType': 2,
'previewType': 'pdf',
'title': `Bot promocional del proyecto ${igfg}`,
'body': igfg,
'thumbnail': imagen1,
'sourceUrl': urlgofc }},
'caption': texto,
'footer': wm,
'buttons':[
{buttonId: `${usedPrefix}menu`, buttonText: {displayText: 'MENU'}, type: 1}, 
{buttonId: `${usedPrefix}donar`, buttonText: {displayText: 'DONAR'}, type: 1}],
'headerType': 6 }
let txt = '';
let count = 0;
for (const c of md) {
    await new Promise(resolve => setTimeout(resolve, 50));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
conn.sendMessage(m.chat, buttonMessage, { quoted: m })
        
}
handler.command = ['sc','script']
export default handler
