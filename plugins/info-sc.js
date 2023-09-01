let handler = async (m, { conn, usedPrefix }) => {
var doc = ['pdf','zip','vnd.openxmlformats-officedocument.presentationml.presentation','vnd.openxmlformats-officedocument.spreadsheetml.sheet','vnd.openxmlformats-officedocument.wordprocessingml.document']
var document = doc[Math.floor(Math.random() * doc.length)]    
let texto = `*${md}*`
let contextInfo = {
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
conn.sendMessage(m.chat, { text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100  })
        
}
handler.command = ['sc','script']
export default handler
