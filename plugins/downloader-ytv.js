import { youtubedl, youtubedlv2 } from '../lib/ytscraper.js'
let { default: fetch } = await import('node-fetch');
let handler = async (m, {conn, args, db, userdb, senderJid}) => {
if (!args[0]) {
let resp = '*[❗INFO❗] INSERTE EL COMANDO MAS EL ENLACE / LINK DE UN VIDEO DE YOUTUBE*'

return conn.sendWritingText(m.chat, resp, userdb, m)
}
try {
let url = args[0]
let q = args[1] + 'p'
const yt = await youtubedl(url).catch(async _ => await youtubedlv2(url))
const ttl = yt.title
let dl_url, size, lengthSize
if (yt.video['144p'] && yt.video['144p'].fileSize > 0 && yt.video['144p'].fileSizeH !== 'MB' ) {
size =yt.video['144p'].fileSizeH
dl_url = await yt.video['144p'].download()
lengthSize =yt.video['144p'].fileSize
} else if (yt.video['360p'] && yt.video['360p'].fileSize > 0 && yt.video['360p'].fileSizeH !== 'MB' ) {
size =yt.video['360p'].fileSizeH
dl_url = await yt.video['360p'].download()
lengthSize =yt.video['360p'].fileSize
} else if (yt.video['480p'] && yt.video['480p'].fileSize > 0 && yt.video['480p'].fileSizeH!== 'MB') {
size = yt.video['480p'].fileSizeH
dl_url = await yt.video['480p'].download()
lengthSize = yt.video['480p'].fileSize
} else if (yt.video['720p'] && yt.video['720p'].fileSize > 0 && yt.video['720p'].fileSizeH!== 'MB') {
size = yt.video['720p'].fileSizeH
dl_url = await yt.video['720p'].download()
lengthSize = yt.video['720p'].fileSize
} else if (yt.video['1080p'] && yt.video['1080p'].fileSize > 0 && yt.video['1080p'].fileSizeH!== 'MB') {
size = yt.video['1080p'].fileSizeH
dl_url = await yt.video['1080p'].download()
lengthSize = yt.video['1080p'].fileSize
} else if (args[1]) {
size = yt.video[q].fileSizeH
dl_url = await yt.video[q].download()
} else {
let resp = `Este video no pose medios de descarga o esta protegido`

return conn.sendWritingText(m.chat, resp, userdb, m)
}

if (lengthSize > 200000) {
let resp = `Este video es muy pesado para ser enviado`

return conn.sendWritingText(m.chat, resp, userdb, m)
}
let resp = `*_⏳SE ESTA PROCESANDO SU VIDEO...⏳_*\n\n*◉ SI SU VIDEO NO ES ENVIADO, PRUEBE CON EL COMANDO #playdoc O #play.2 o #ytmp4doc ◉*`


let c = await conn.sendWritingText(m.chat, resp, userdb, m)
let cap = `▢ TITULO: ${ttl}\n▢ PESO DEL VIDEO: ${size}`
for (const c of cap) {
await new Promise(resolve => setTimeout(resolve, 5));
txt += c;
count++;
if (count % 10 === 0) {

await conn.sendPresenceUpdate('composing' , m.chat);
}
}
return conn.sendMessage(m.chat, { video: { url: dl_url }, fileName: `${ttl}.mp4`, mimetype: 'video/mp4', caption: txt, thumbnail: await fetch(yt.thumbnail) }, { quoted: c, ephemeralExpiration: 2*60*1000 })
} catch (e) {
let resp = `*[❗] ERROR: ${e} NO FUE POSIBLE DESCARGAR EL VIDEO*`

return conn.sendWritingText(m.chat, resp, userdb, m)
}
}
handler.command = /^fgmp4|dlmp4|getvid|yt(v|mp4)?$/i
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
