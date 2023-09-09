let handler = async (m, { conn, usedPrefix }) => {
var doc = ['pdf','zip','vnd.openxmlformats-officedocument.presentationml.presentation','vnd.openxmlformats-officedocument.spreadsheetml.sheet','vnd.openxmlformats-officedocument.wordprocessingml.document']
var document = doc[Math.floor(Math.random() * doc.length)]    
let texto = `Este es el script de para que puedas instalarlo *@${m.sender.replace('@s.whatsapp.net', '')}*\n\n *${md}*`
let txt = '';
let count = 0;
for (const c of texto) {
    await new Promise(resolve => setTimeout(resolve, 50));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
let documentMessage = {
'document': { url: hp_animxscans },
'mimetype': `application/${document}`,
'fileName': `「Traducciones de Manga」`,
'fileLength': 99999999999999,
'pageCount': 200,
'contextInfo': {
'mentionedJid': conn.parseMention(txt),  
'forwardingScore': 0,
'isForwarded': false,
'externalAdReply': {
"showAdAttribution": true,  
"containsAutoReply": true,
"renderLargerThumbnail": true,  
'title': `Bot promocional del proyecto ${igfg}`,
"containsAutoReply": true,  
"mediaType": 1,   
'thumbnail': imagen1,
'mediaUrl': serbot,
'sourceUrl': serbot }},
'caption': txt,
'headerType': 6 }

conn.sendMessage(m.chat, documentMessage, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100  })
        
}
handler.command = ['sc','script']
export default handler
