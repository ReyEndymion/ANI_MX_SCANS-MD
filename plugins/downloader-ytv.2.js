import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'
let handler = async (m, { conn, args, usedPrefix, command }) => {
let resp, document, titulo, tamaño
if (!args[0]) {
resp = '*[❗INFO❗] INSERTE EL COMANDO MAS EL ENLACE / LINK DE UN VIDEO DE YOUTUBE*'
}
try {
let url = args[0]
let q = args[1] + 'p'
const yt = await youtubedl(url).catch(async _ => await youtubedlv2(url))
const ttl = yt.title
let dl_url, size, lengthSize
if (yt.video['144p'] && yt.video['144p'].fileSize > 0 && yt.video['144p'].fileSizeH !== 'MB' ) {
    size =  yt.video['144p'].fileSizeH
    //dl_url = await yt.video['144p'].download()
    lengthSize =  yt.video['144p'].fileSize
} else if (yt.video['360p'] && yt.video['360p'].fileSize > 0 && yt.video['360p'].fileSizeH !== 'MB' ) {
    size =  yt.video['360p'].fileSizeH
    //dl_url = await yt.video['360p'].download()
    lengthSize =  yt.video['360p'].fileSize
} else if (yt.video['480p'] && yt.video['480p'].fileSize > 0 && yt.video['480p'].fileSizeH  !== 'MB') {
    size = yt.video['480p'].fileSizeH
    //dl_url = await yt.video['480p'].download()
    lengthSize = yt.video['480p'].fileSize
} else if (yt.video['720p'] && yt.video['720p'].fileSize > 0 && yt.video['720p'].fileSizeH  !== 'MB') {
    size = yt.video['720p'].fileSizeH
    //dl_url = await yt.video['720p'].download()
    lengthSize = yt.video['720p'].fileSize
} else if (yt.video['1080p'] && yt.video['1080p'].fileSize > 0 && yt.video['1080p'].fileSizeH  !== 'MB') {
    size = yt.video['1080p'].fileSizeH
    //dl_url = await yt.video['1080p'].download()
    lengthSize = yt.video['1080p'].fileSize
} else if (args[1]) {
    size = yt.video[q].fileSizeH
    dl_url = await yt.video[q].download()
} else {
resp = `Este video no pose medios de descarga o esta protegido`
}
console.log('docmp4 yt:', yt)	
if (lengthSize > 200000) {
resp = `Este video es muy pesado para ser enviado`
}
//let ytV = yt.video ? yt.video['360p'] > 0 : yt.video['480p'] > 0
resp = `*_⏳SE ESTA PROCESANDO SU VIDEO...⏳_*\n\nSe han encontrado las siguientes calidades: ${JSON.stringify(Object.keys(yt.video))} pero la mas baja disponible es la de la informacion siguiente:\n\n*◉—⌈📥 YOUTUBE DL 📥⌋—◉*\n❏ *TITULO:* ${ttl}\n❏ *PESO:* ${size}\n\n*◉ SI SU VIDEO NO ES ENVIADO, PRUEBE OTRA VEZ USANDO:\n${usedPrefix} ${command} ${args[0]} ${Object.keys(yt.video)}\nO PUEDE PROBAR CON EL COMANDO #play ᴏ #play.2 ᴏ #ytmp4 ◉*`
//resp = '';
document = dl_url
titulo = ttl// + `.mp4`
tamaño = size
} catch (e) {
resp = `*[❗] ERROR: ${e} NO FUE POSIBLE DESCARGAR EL VIDEO*`
}
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
if (titulo) {
let c = await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
txt = `*◉—⌈📥 YOUTUBE DL 📥⌋—◉*\n❏ *TITULO:* ${titulo}\n❏ *PESO:* ${tamaño}`
//return conn.sendMessage(m.chat, { document: { url: document }, caption: txt.trim(), mimetype: 'video/mp4', fileName: titulo}, {quoted: c, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})/**/

} else {
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
}

handler.command = /^ytmp4doc|ytvdoc|ytmp4.2|ytv.2$/i
export default handler
