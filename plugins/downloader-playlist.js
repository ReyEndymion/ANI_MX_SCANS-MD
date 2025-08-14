const {  youtubeSearch  } = await import('../lib/ytscraper.js');
let { default: yts } = await import('yt-search');
import path, { join } from 'path'
import fs from 'fs'
import { owner, info, temp, newsletterID, sBroadCastID, groupID, media } from '../config.js'

let handler = async (m, {conn, args, usedPrefix, command, text, db, userdb, senderJid}) => {
if (!text) {
let resp = `*[❗INFO❗] NOMBRE DE LA CANCION FALTANTE, POR FAVOR INGRESE EL COMANDO MAS EL NOMBRE/TITULO DE UNA CANCION*\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} Begin you*`;

return conn.sendWritingText(m.chat, resp, userdb, m)
}

try {

let video 
if (args.join(' ')) {
//video = (await youtubeSearch(args.join(' ')))//.catch(
} else {
video = [await yts.search({text, hl: 'es', gl: 'ES', ...options})];
console.log('playlist: ', video)
}
/**
if (video && video.video && video.video.length > 0) {
// Procede con el código para manejar los resultados
const video = video.video;
console.log(video);
} else {
// Muestra un mensaje si no se encontraron resultados
console.log('No se encontraron videos para la búsqueda:', args.join(' '));
} */

const listSections = [];

let resp = [...video].map((v, i) => {
listSections.push(`
========================
[${i + 1}]
❏ 📌 *Titulo:* ${v.title}
❏ 📆 *Publicado:* ${v.publishedTime}
❏ 👤 *Autor:* ${v.authorName}
❏ 🆔 *ID:* ${v.videoId}
❏ 🔗 *Link:* ${v.url}
`);
}).filter((v) => v);
//\n\nCopia y usa el comando\n\n'Video 🎥' => ${usedPrefix}ytmp4 ${v.url}\n\n'Videodoc 🎥' => ${usedPrefix}ytmp4doc ${v.url}\n\n'Audio 🎧', => ${usedPrefix}ytmp3 ${v.url}\n\n'Audiodoc 🎧', => ${usedPrefix}ytmp3doc ${v.url}
resp += `『*MUSICA RELACIONADA* 』\n\nMusica relacionada con: ${args.join(' ')}\n${listSections}\n`
await conn.writing(m.chat, resp)
let contextInfo = {
mentionedJid: conn.parseMention(txt),
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
"renderLargerThumbnail": true,
"title": info.nanie, 
"containsAutoReply": true,
"mediaType": 1, 
"thumbnail": fs.readFileSync(join(media, `pictures/youtube.jpg`)),
"mediaUrl": '',
"sourceUrl": "https://www.youtube.com"
}
}

return await conn.sendMessage(m.chat, {text: resp, contextInfo: contextInfo, mentions: conn.parseMention(txt)}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 }) 
/**
*/
} catch (e){
let resp = `*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO CON OTRO NOMBRE DE UNA CANCION*\n\n${e}`

return conn.sendWritingText(m.chat, resp, userdb, m)	
}
};

handler.command = /^playlist|playlist2$/i;
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler;
function MilesNumber(number) {
const exp = /(\d)(?=(\d{3})+(?!\d))/g;
const rep = '$1.';
const arr = number.toString().split('.');
arr[0] = arr[0].replace(exp, rep);
return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
seconds = Number(seconds);
const d = Math.floor(seconds / (3600 * 24));
const h = Math.floor((seconds % (3600 * 24)) / 3600);
const m = Math.floor((seconds % 3600) / 60);
const s = Math.floor(seconds % 60);
const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
return dDisplay + hDisplay + mDisplay + sDisplay;
}