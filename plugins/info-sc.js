let handler = async (m, {conn, info, usedPrefix, db, userdb, senderJid, objs}) => {
const {imagen1} = objs
const fs = await import('fs')
var doc = ['pdf','zip','vnd.openxmlformats-officedocument.presentationml.presentation','vnd.openxmlformats-officedocument.spreadsheetml.sheet','vnd.openxmlformats-officedocument.wordprocessingml.document']
var document = doc[Math.floor(Math.random() * doc.length)]
let texto = `Este es el script de para que puedas instalarlo *@${senderJid.replace('@s.whatsapp.net', '')}*\n\n *${info.repoProyect}*`
const message = {
'caption': texto,
'mimetype': `application/${document}`,
'fileName': info.namerepre,
'fileLength': 99999999999999,
'pageCount': 200,
//'headerType': 6,
'contextInfo': {
'mentionedJid': conn.parseMention(texto),
'forwardingScore': 0,
'isForwarded': false,
'externalAdReply': {
'title': `Bot promocional del proyecto ${info.nanip}`,
//"showAdAttribution": true,
"renderLargerThumbnail": true,
"containsAutoReply": true,
"mediaType": 1, 
'thumbnail': fs.readFileSync(imagen1),
'mediaUrl': info.paypal,
'sourceUrl': info.paypal }}
}
return conn.sendDocumentWriting(m.chat, info.hp_animxscans, message, userdb, m)

}
handler.command = ['sc','script']
handler.help = [];
handler.tags = [];
handler.menu = [
{title:"💎 SCRIPT", description: "muestra información del enlace para descargar el bot usando #script", id: `script`},
];
handler.type = "info";
handler.disabled = false;

export default handler
