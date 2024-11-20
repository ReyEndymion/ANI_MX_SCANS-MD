import { mediafiredl } from '@bochilteam/scraper'
let handler = async (m, { conn, args, usedPrefix, command }) => {
let resp, document, fileName, mimetype, fileLength
if (!args[0]) {resp = `*[❗INFO❗]* INGRESE UN ENLACE VALIDO DE MEDIAFIRE, EJEMPLO: *${usedPrefix + command} https://www.mediafire.com/file/zrx6r0jlui6gb0e/FREE_FIRE_Actualizado_1.103.2_by_TelleZ.apk/file*`
return conn.sendWritingText(m.chat, resp, m)
} else {
try {
let res = await mediafiredl(args[0])
let { url, url2, filename, ext, aploud, filesize, filesizeH } = res
console.log('mediafire: ', filesize)
if (filesize > 999) {resp = '*[ ⛔ ] El archivo es demasiado pesado por lo que no se enviará.*';
return conn.sendWritingText(m.chat, resp, m)
} else {
resp = `
*NOMBRE:* ${filename}
*PESO:* ${filesizeH}
*TIPO:* ${ext}

*⏳ ESPERE EN LO QUE ENVIO SU ARCHIVO. . . .* 
*_- ARCHIVOS MAYORES A 100 MB PUEDE QUE NO SEAN ENVIADOS_* 
`
fileLength = filesize
document = url
fileName = filename
mimetype = ext
await conn.writing(m.chat, resp)
return conn.sendMessage(m.chat, {document: { url: document }, caption: txt.trim(), mimetype: mimetype, fileName: fileName}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});
//await conn.sendFile(m.chat, url, filename, '', m, null, { mimetype: ext, asDocument: true })filesize.includes('GB') || 
}
} catch (e) {
resp = `*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*\n\n*- CORROBORE QUE EL ENLACE SEA SIMILAR A:*\n*◉https://www.mediafire.com/file/0j2hmyq7hgb2uqn/Bully_Anniversary_Edition_2022.zip/file*\n\n${e.stack}`
return conn.sendWritingText(m.chat, resp, m)
}
}
}
handler.help = ['mediafire'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(mediafire|mediafiredl|dlmediafire)$/i
export default handler
/*
const documentMessage = {
mentionedJid: conn.parseMention(txt), 
forwardingScore: 0,
isForwarded: false,
externalAdReply: {
mediaUrl: 'https://github.com/ReyEndymion/Bot-Comedia-MD',
mediaType: 2,
previewType: mimetype,
title: fileName,
body: wmbc,
thumbnail: imagen1bc,
sourceUrl: `https://api.whatsapp.com/send/?phone=5215625406730&text=.serbot&type=phone_number&app_absent=0`
},
// Utiliza mentionedJid en lugar de mentions en un contextInfo, fileLength: fileLength, contextInfo: documentMessage
}
conn.reply(m.chat, caption, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, 
title: 'DESCARGAR DE MEDIAFIRE',
body: wm, 
previewType: 0, thumbnail: fs.readFileSync("./Menu2.jpg"),
sourceUrl: hp_otkstogthr}}})
conn.sendFile(m.chat, url, filename, '', m, null, { mimetype: ext, asDocument: true })
} catch (e) {
m.reply('*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*\n\n*- CORROBORE QUE EL ENLACE SEA SIMILAR A:*\n*◉ https://www.mediafire.com/file/pbabuzyc7i8ord5/TheMystic-Bot-MD-master_%25285%2529.zip/file*')
console.log(e)
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 1));
txt += c;
count++;
if (count % 10 === 0) {
 await conn.sendPresenceUpdate('composing' , m.chat);
}
}

if (resp && document && fileName && mimetype && fileLength) {
} else { 
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
//await conn.sendMessage(m.chat, {text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt)}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 })
}
*/
