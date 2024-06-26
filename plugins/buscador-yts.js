import { youtubeSearch } from '@bochilteam/scraper'
import yts from 'yt-search';
import fs from 'fs';

let handler = async (m, { conn, text, command, usedPrefix}) => {
let resp, imagen
console.log('ytsearch: ', /^yts(earch)?$/ig.test(command))
if (/^yts(earch)?$/ig.test(command)) {
if (!text) {    
resp = `⚠️ *_Que quieres que busque en YouTube?_*\n\n*[❗INFO❗] INSERTE EL NOMBRE DE ALGUN VIDEO O CANAL DE YOUTUBE*\n\nDebes usar el comando ${usedPrefix + command} + la frase que deseas buscar\nEjemplo:\n${usedPrefix + command} Armin\n\nLos comandos disponibles son:\n\nyts, yts2, ytsearch y ytsearch2`
 }
try {
const { video, channel } = await youtubeSearch(text)
//let imagennnnn = (await youtubeSearch(text)).video[0].thumbnail
resp = [...video, ...channel].map(v => {
switch (v.type) {
case 'video': return `
📌 *${v.title}* (${v.url})
⌚ Duracion: ${v.durationH}
⏲️ Publicado ${v.publishedTime}
👁️ ${v.view} vistas
`.trim()
case 'channel': return `
📌 *${v.channelName}* (${v.url})
🧑‍🤝‍🧑 _${v.subscriberH} suscriptores_
🎥 ${v.videoCount} videos
`
}
}).filter(v => v).join('\n\n========================\n\n')
imagen = imgYoutube
} catch (e) {
    console.log(e)
resp = `${e}\n\n`
resp = `Si ocurrio un error usando el comando ${usedPrefix + command} ${text} y no tuvo resultado puede probar con ${usedPrefix + command}2 ${text}` 
}
}
if (/^yts(earch)?2$/ig.test(command)) {
    if (!text) {    
resp = `⚠️ *_Que quieres que busque en YouTube?_*\n\n*[❗INFO❗] INSERTE EL NOMBRE DE ALGUN VIDEO O CANAL DE YOUTUBE*\n\nDebes usar el comando ${usedPrefix + command} + la frase que deseas buscar\nEjemplo:\n${usedPrefix + command} Armin`
}
try {
const results = await yts(text);
const tes = results.all;
resp = results.all.map((v) => {
switch (v.type) {
case 'video': return `
  ° *_${v.title}_*
  ↳ 🫐 *_Link :_* ${v.url}
  ↳ 🕒 *_Duración :_* ${v.timestamp}
  ↳ 📥 *_Subido :_* ${v.ago}
  ↳ 👁 *_Vistas :_* ${v.views}`;
}
}).filter((v) => v).join('\n\n◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦\n\n');

imagen = imgYoutube||tes[0].thumbnail 
//conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg', teks, m);
} catch (error) {
console.log(error)
resp = `${error}\n\n`
resp = `Si ocurrio un error usando el comando *${usedPrefix + command} ${text}* y no tuvo resultado puede probar con el comando *${usedPrefix + command.replace(2, '')} ${text}*` 
}
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
if (imagen) {
return conn.sendMessage(m.chat, { image: imagen, caption: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});  
} else {
return conn.sendMessage(m.chat, { text: txt, mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
}   
handler.help = ['', 'earch'].map(v => 'yts' + v + ' <pencarian>')
handler.tags = ['tools']
handler.command = /^yts(earch)?2?$/i
export default handler
async function fetchJson(url, options) {
try {
options ? options : {}
const res = await axios({ method: 'GET', url: url, headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'}, ...options })
return res.data
} catch (err) {
return err
}}
