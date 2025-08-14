import { youtubeSearch } from '../lib/ytscraper.js'
import { info, newsletterID, sBroadCastID, media, groupID } from '../config.js'

let handler = async (m, {conn, text, command, usedPrefix, db, userdb, senderJid}) => {
let { default: yts } = await import('yt-search');
let { default: fs } = await import('fs');
let { default: path } = await import('path');
let resp, imagen
if (!text) { 
resp = `⚠️ *_Que quieres que busque en YouTube?_*\n\n*[❗INFO❗] INSERTE EL NOMBRE DE ALGUN VIDEO O CANAL DE YOUTUBE*\n\nDebes usar el comando ${usedPrefix + command} + la frase que deseas buscar\nEjemplo:\n${usedPrefix + command} Armin\n\nLos comandos disponibles son:\n\nyts, yts2, ytsearch y ytsearch2`
} else {
if (/^yts(earch)?$/ig.test(command)) {
try {
const { video, channel } = await youtubeSearch(text)
let imagennnnn = (await youtubeSearch(text)).video[0].thumbnail
resp = [...video, ...channel].map(v => {
console.log('ytsearch: ', v)
//if (/videoId/.test(v))
switch (Object.keys(v)[0]) {
case 'videoId': return `
🎥 Nombre: *${v.title}* 
📎 link: ${v.url}
⌚ Duracion: ${v.durationH}
⏲️ Publicado ${v.publishedTime}
👁️ ${v.view} vistas
📌 Canal que lo publica:
*${v.channelName}*
`.trim()
case 'channelId': return `
*CANAL ENCONTRADO*
📌 Nombre: *${v.channelName}* 
📎 Link: ${v.url}
🧑‍🤝‍🧑 _${v.subscriberH.replace(' subscribers', '')} suscriptores_
📝 ${v.description}
`
}
}).filter(v => v).join('\n\n========================\n\n')
imagen = imagennnnn ? imagennnnn : path.join(media, 'pictures/youtube.jpg')
} catch (e) {
console.log(e)
resp = `${e}\n\n`
resp += `Si ocurrio un error usando el comando ${usedPrefix + command} ${text} y no tuvo resultado puede probar con ${usedPrefix + command}2 ${text}` 
}
}
if (/^yts(earch)?2$/ig.test(command)) {
try {
const results = await yts(text);
const tes = results.all;
resp = results.all.map((v) => {
console.log('ytsearch2: ', v)
switch (v.type) {
case 'video': return `
° *_${v.title}_*
↳ 🫐 *_Link :_* ${v.url}
↳ 🕒 *_Duración :_* ${v.timestamp}
↳ 📥 *_Subido :_* ${v.ago}
↳ 👁 *_Vistas :_* ${v.views}`;
case 'channel': return `
*CANAL ENCONTRADO*
📌 Nombre: *${v.name}* 
📎 Link: ${v.url}
🧑‍🤝‍🧑 _${v.subCountLabel} suscriptores_
📝 ${v.about}
`
}
}).filter((v) => v).join('\n\n◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦\n\n');

imagen = tes[0].thumbnail ? tes[0].thumbnail : path.join(media, 'pictures/youtube.jpg')
//conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg', teks, m);
} catch (error) {
console.log(error)
resp = `${error}\n\n`
resp =+ `Si ocurrio un error usando el comando *${usedPrefix + command} ${text}* y no tuvo resultado puede probar con el comando *${usedPrefix + command.replace(2, '')} ${text}*` 
}
}
}
if (imagen !== undefined) {
return conn.sendImageWriting(m.chat, imagen, resp, userdb, m); 
} else {
return conn.sendWritingText(m.chat, resp, userdb, m)}
}
handler.help = ['', 'earch'].map(v => 'yts' + v + ' <pencarian>')
handler.tags = ['tools']
handler.command = /^yts(earch)?2?$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
