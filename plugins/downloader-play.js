import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import { youtubeSearch, youtubedl, youtubedlv2 } from '@bochilteam/scraper-sosmed'
import y2mateModule from '../lib/y2mate.js';
const { servers, ytv } = y2mateModule
import fs from "fs";
import ytdl from 'ytdl-core';
import yts from 'yt-search';
import translate from '@vitalets/google-translate-api'
const API_KEY = "AIzaSyBAsJbDjVjlXtSugPgPmhIzLUcxmS6Nvb8";
//import { parse } from 'node-html-parser';{ servers, ytv }

let confirmations = {}
async function handler(m, { conn, command, args, text, usedPrefix })  {
//process.env.TMPDIR = process.env.TEMP = process.env.TMP = `./tmp`;
let chat
if (m.chat.endsWith(userID)) {chat = global.db.data.bot[conn.user.jid].chats.privs[m.sender]} else if (m.chat.endsWith(groupID)) {chat = global.db.data.bot[conn.user.jid].chats.groups[m.chat]}
chat = chat
let resp, q
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let {titleP, publishedTimeP, durationHP, viewHP, descriptionP, authorP, videoIdP, thumbnailP, urlP, vidP} = {}
  if (/^play$/ig.test(command)) {
    try {
      let vid = (await youtubeSearch(text)).video[0]
      if (vid){
      const { title, description, thumbnail, authorName, videoId, durationH, viewH, publishedTime, type, authorAvatar } = vid
      vidP = vid
      titleP = title
      descriptionP = description
      authorP = authorName
      thumbnailP = `${thumbnail}.jpg` //
      videoIdP = videoId
      durationHP = durationH
      viewHP = viewH
      publishedTimeP = publishedTime  
      urlP = 'https://www.youtube.com/watch?v=' + videoId
      let texto1 = `*◉—⌈🔊 YOUTUBE PLAY🔊⌋—◉*\n
    📌 *TITULO:* ${titleP}
    📆 *PUBLICADO:* ${publishedTimeP}
    ⌚ *DURACION:* ${durationHP}
    👀 *VISTAS:* ${viewHP}
    📇 *DESCRIPCION:* ${descriptionP}
    👤 *AUTOR:* ${authorP}
    ⏯️ *CANAL:* ${authorAvatar}
    🆔 *ID:* ${videoIdP}
    🪬 *TIPO:* ${type}
    🔗 *LINK:* ${urlP}\n\n🎵 AUDIO 🎵\n\nPara descargar mencione la palabra 'audio' o pruebe con el comando \n\n${usedPrefix}ytmp3 ${urlP}\n\n🎥 VIDEO 🎥\n\nPara descargar mencione la palabra 'video' o pruebe con el comando${usedPrefix}ytmp4 ${urlP} \n\n📋 MAS RESULTADOS 📋\n\nPara ver mas resultados mencione la palabra 'mas' o pruebe con el comando \n${usedPrefix}playlist ${text}`.trim()
      let txt = '';
      let count = 0;
      for (const c of texto1) {
      await new Promise(resolve => setTimeout(resolve, 5));
      txt += c;
      count++;
      if (count % 10 === 0) {
      await conn.sendPresenceUpdate('composing' , m.chat);
          }
          }
      q = await conn.sendMessage(m.chat, {image: {url: thumbnailP}, caption: txt.trim()}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});
    }
    } catch (TypeError) {
      let resp = `*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*\n\n*POSIBLEMENTE FALTE EL NOMBRE DE AUTOR O LA CANCION PARA MEJOR PRECISION*\n\nError: ${TypeError}`
      let txt = '';
      let count = 0;
      for (const c of resp) {
      await new Promise(resolve => setTimeout(resolve, 15));
      txt += c;
      count++;
      if (count % 10 === 0) {
         await conn.sendPresenceUpdate('composing' , m.chat);
      }
      }
       q = await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
    } finally {}
    }
if (/^play2$/ig.test(command)) {
try {
const yt_vid = await search(args.join(' '));
//let {title, name, thumbnail, videoId, seconds, views, ago, url} = yt_vid[0]
vidP = yt_vid[0]
titleP = yt_vid[0].title
descriptionP = yt_vid[0].description
authorP = yt_vid[0].author.name
thumbnailP = `${yt_vid[0].thumbnail}.jpg`
videoIdP = yt_vid[0].videoId
durationHP = secondString(yt_vid[0].duration.seconds)
viewHP = MilesNumber(yt_vid[0].views)
publishedTimeP = yt_vid[0].ago 
urlP = yt_vid[0].url

resp = `*◉—⌈🔊 YOUTUBE PLAY🔊⌋—◉*\n
📌 *TITULO:* ${titleP}
📆 *PUBLICADO:* ${publishedTimeP}
⌚ *DURACION:* ${durationHP}
👀 *VISTAS:* ${viewHP}
📇 *DESCRIPCION:* ${descriptionP}
👤 *AUTOR:* ${authorP}
⏯️ *CANAL:* ${yt_vid[0].author.url}
🆔 *ID:* ${yt_vid[0].videoId}
🪬 *TIPO:* ${yt_vid[0].type}
🔗 *LINK:* ${urlP}\n\n🎵 AUDIO 🎵\n\nPara descargar mencione la palabra 'audio' o pruebe con el comando:\n${usedPrefix}ytmp3 ${urlP}\n\n🎥 VIDEO 🎥\n\nPara descargar mencione la palabra 'video' o pruebe con el comando:\n${usedPrefix}ytmp4 ${urlP} \n\n📋 MAS RESULTADOS 📋\n\nPara ver mas resultados mencione la palabra 'mas' o pruebe con el comando \n${usedPrefix}playlist ${text}`.trim()
} catch (error) {
resp = `*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*\n\n*POSIBLEMENTE FALTE EL NOMBRE DE AUTOR O LA CANCION PARA MEJOR PRECISION*\n\nError: ${error}`
delete confirmations[m.sender]
} finally {}
    }
  if (!text) {
  resp = `*[❗INFO❗] NOMBRE DE LA CANCION FALTANTE, POR FAVOR INGRESE EL COMANDO MAS EL NOMBRE/TITULO DE UNA CANCION*\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} Good Feeling - Flo Rida*`
  delete confirmations[m.sender]
  } 
  if (!vidP) {
  resp = '*[❗INFO❗] LO SIENTO, NO PUDE ENCONTRAR EL AUDIO/VIDEO, INTENTE CON OTRO NOMBRE/TITULO*'
    delete confirmations[m.sender]
}
  
  const type = (args[0] || '').toLowerCase()
  const countP = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1
  confirmations[m.sender] = {
    sender: m.sender,
    to: who, 
    titleP, publishedTimeP, durationHP, viewHP, descriptionP, authorP, videoIdP, thumbnailP, vidP, urlP,
    type,
    message: m,
    q,
    countP,
    timeout: setTimeout(async () => {
      resp = 'Se acabó el tiempo'
      delete confirmations[m.sender]}, 60 * 1000)
  }
  resp = resp
  if (resp === undefined) return
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
if (thumbnailP) {
  //q = await conn.sendMessage(m.chat, {image: {url: thumbnailP}, caption: txt.trim()}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});
  return conn.sendMessage(m.chat, { text: txt, mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
} else {
  return conn.sendMessage(m.chat, { text: txt, mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
 }
 const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;
};
handler.before = async (m, { conn, args}) => {
let bot = global.db.data.bot[conn.user.jid] || {}
const chats = bot.chats || {}
const privs = chats.privs || {}
const groups = chats.groups || {}
let chat, users, user
if (m.chat.endsWith(userID)) {
chat = privs[m.chat] || {}
user = privs[m.sender] || {}
} else if (m.chat.endsWith(groupID)) {
chat = groups[m.chat] || {}
users = chat.users || {}
user = users[m.sender] || {}
} else return

if (!chat.isBanned) {  
const confirmation = Object.values(confirmations).find(c => c.sender === m.sender);
if (!confirmation) return;
  
const response = m.text.toLowerCase();
const { sender, message, type, timeout, vidP, urlP } = confirmation;
if (!urlP) return;
async function obtenerPaginaYouTube() {
const respuesta = await fetch(urlP);
const cookies = respuesta.headers.raw()['set-cookie'];
// Guarda las cookies para usarlas posteriormente en otras solicitudes
return cookies;
}

async function realizarSolicitudConCookies(urlP, cookies) {
    const headers = {
        'Cookie': cookies.join('; ')
    };
    const respuesta = await fetch(urlP, { headers });
    // Continúa con el procesamiento de la respuesta...
    if (respuesta.ok) {
  } else {
      throw new Error('Error al realizar la solicitud: ' + respuesta.status);
  }
}
let resp 
const infoYt = await ytdl.getInfo(urlP);
const titleYt = infoYt.videoDetails.title;
let stream
const format = infoYt.formats
if (response === 'video') {
const titleStringMp4 = `${titleYt}.mp4`
const fileNameTmpMp4 = `${titleYt.replace(/[^a-zA-Z0-9]/g, '')}.mp4`
const cookies = await obtenerPaginaYouTube();
const tmpStringMp4 = `./tmp/${fileNameTmpMp4}` 
//const randomName = getRandom('.mp4');
for (let video of format) {
// Elegir el formato de menor calidad
  // Intentar descargar el video en el formato elegido(info) => info.itag = video.qualityLabel, video.itag, video.audioBitrate, video.hasVideo, video.container
await realizarSolicitudConCookies(urlP, cookies);
console.log('ytdl', video.qualityLabel !== ((null||undefined)), video.audioBitrate !== ((null||undefined)), video.hasVideo, video.container === 'mp4')
if (video.qualityLabel !== ((null||undefined)) && video.audioBitrate !== ((null||undefined)) && video.hasVideo && video.container === 'mp4') {
try {
const stream = ytdl(urlP, {filter: (info) => info.itag === video.itag}).pipe(fs.createWriteStream(tmpStringMp4));
await new Promise((resolve, reject) => {
  stream.on('error', reject);
  stream.on('finish', resolve);
});
} catch (error) {
resp = `ocurrio un error\n ${error}`
}
} 
//if (video.contentLength > 20000000) {resp = `Este video es muy pesado para ser enviado`}
//
}
//if (!format) {resp = 'No se encontraron formatos de video mp4 disponibles.';}
if (fs.existsSync(tmpStringMp4)) {
const readFile = fs.readFileSync(tmpStringMp4);
const stats = fs.statSync(tmpStringMp4);
const fileSizeInBytes = stats.size;
const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
// console.log("Tamaño del video: " + fileSizeInMegabytes);
if (fileSizeInMegabytes <= 999) {
  //if (command == 'ytshort') {
  return conn.sendMessage( m.chat, {video: readFile, fileName: titleStringMp4, mimetype: 'video/mp4'}, {quoted: m, ephemeralExpiration: 2*60*1000 }),
   fs.unlinkSync(tmpStringMp4, { recursive: true, force: true });
  } else {
  return conn.sendMessage( m.chat, {document: readFile, fileName: titleStringMp4, mimetype: 'video/mp4'}, {quoted: m, ephemeralExpiration: 2*60*1000 }),
   fs.unlinkSync(tmpStringMp4, { recursive: true, force: true });
  }
    
} 
//fs.unlinkSync(tmpStringMp4, { recursive: true, force: true });
  }
  if (response === 'audio') {
    const titleStringMp3 = `${titleYt}.mp3`
    const cookies = await obtenerPaginaYouTube();
    const fileNameTmpMp3 = `${titleYt.replace(/[^a-zA-Z0-9]/g, '')}.mp3`;
    const tmpStringMp3 = `./tmp/${fileNameTmpMp3}` 
    
if (!format) {
resp = 'No se encontraron formatos de audio disponibles.';
}
//    console.log('ytdl', format)//
const audioFormats = ytdl.filterFormats(infoYt.formats, 'audioonly');
for (const audio of audioFormats) {
      // Elegir el formato de menor calidad
//console.log("Descargando ->", audio.audioBitrate);
    // Intentar descargar el video en el formato elegido
await realizarSolicitudConCookies(urlP, cookies);
if (audio.itag === 140 && audio.audioBitrate ==! (null||undefined)) {
const stream = ytdl(urlP, {filter: (info) => info.itag == audio.itag}).pipe(fs.createWriteStream(tmpStringMp3));
await new Promise((resolve, reject) => {
  stream.on('error', reject);
  stream.on('finish', resolve);
});
    } else if (audio.itag === 249 && audio.audioBitrate !== (null||undefined)) {
const stream = ytdl(urlP, {filter: (info) => info.itag == audio.itag}).pipe(fs.createWriteStream(tmpStringMp3));
await new Promise((resolve, reject) => {
  stream.on('error', reject);
  stream.on('finish', resolve);
});
    } else if (audio.itag === 250 && audio.audioBitrate ==! (null||undefined)) {
const stream = ytdl(urlP, {filter: (info) => info.itag == audio.itag}).pipe(fs.createWriteStream(tmpStringMp3));
await new Promise((resolve, reject) => {
  stream.on('error', reject);
  stream.on('finish', resolve);
});
    } else if (audio.itag === 251 && audio.audioBitrate !== (null||undefined)) {
const stream = ytdl(urlP, {filter: (info) => info.itag == audio.itag}).pipe(fs.createWriteStream(tmpStringMp3));
await new Promise((resolve, reject) => {
  stream.on('error', reject);
  stream.on('finish', resolve);
});
  }
    }
if (fs.existsSync(tmpStringMp3)) {
const readFile = fs.readFileSync(tmpStringMp3);
const stats = fs.statSync(tmpStringMp3);
const fileSizeInBytes = stats.size;
const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
// console.log("Tamaño del video: " + fileSizeInMegabytes);
if (fileSizeInMegabytes <= 999) {
   await conn.sendMessage( m.chat, {audio: readFile, fileName: titleStringMp3, mimetype: 'audio/mp4'}, {quoted: m, ephemeralExpiration: 2*60*1000 });
   fs.unlinkSync(tmpStringMp3, { recursive: true, force: true });
  } else {
   await conn.sendMessage( m.chat, {document: readFile, fileName: titleStringMp3, mimetype: 'audio/mp4'}, {quoted: m, ephemeralExpiration: 2*60*1000 });
   fs.unlinkSync(tmpStringMp3, { recursive: true, force: true });
  }
} else {
resp = 'No se encontraron formatos de audio disponibles.';
    }
          }
if (resp === undefined) return
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
  
      return conn.sendMessage(m.chat, { text: txt, mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}), clearTimeout(timeout), delete confirmations[m.sender];
      }
  };

handler.help = ['play', 'play2'].map(v => v + ' <pencarian>')
handler.tags = ['downloader']
handler.command = /^play(2|3)?$/ig
export default handler

function isNumber(x) {
  return !isNaN(x)
}
async function search(query, options = {}) {
  const search = await yts.search({query, hl: 'es', gl: 'ES', ...options});
  return search.videos;
}
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
/**    
//fs.unlinkSync(tmpStringMp3, { recursive: true, force: true });
  if (video.itag) { 
}
  if (video.itag === 278 && video.audioBitrate ==! (null||undefined))  {   
const stream = ytdl(urlP, {filter: (info) => info.itag}).pipe(fs.createWriteStream(tmpStringMp4));
await new Promise((resolve, reject) => {
  stream.on('error', reject);
  stream.on('finish', resolve);
});
}
  if (video.itag === 394 && video.audioBitrate ==! (null||undefined))   {  
const stream = ytdl(urlP, {filter: (info) => info.itag}).pipe(fs.createWriteStream(tmpStringMp4));
await new Promise((resolve, reject) => {
  stream.on('error', reject);
  stream.on('finish', resolve);
});
}
} else if (video.qualityLabel === '240p') {
  if (video.itag === 133 && video.audioBitrate ==! (null||undefined)) {    
const stream = ytdl(urlP, {filter: (info) => info.itag}).pipe(fs.createWriteStream(tmpStringMp4));
await new Promise((resolve, reject) => {
  stream.on('error', reject);
  stream.on('finish', resolve);
});
}
  if (video.itag === 242 && video.audioBitrate ==! (null||undefined))  {   
const stream = ytdl(urlP, {filter: (info) => info.itag}).pipe(fs.createWriteStream(tmpStringMp4));
await new Promise((resolve, reject) => {
  stream.on('error', reject);
  stream.on('finish', resolve);
});
}
  if (video.itag === 395 && video.audioBitrate ==! (null||undefined))  {   
const stream = ytdl(urlP, {filter: (info) => info.itag}).pipe(fs.createWriteStream(tmpStringMp4));
await new Promise((resolve, reject) => {
  stream.on('error', reject);
  stream.on('finish', resolve);
});
}
}
if (video.qualityLabel === '360p') {
  if (video.itag === 18 && video.audioBitrate ==! (null||undefined)) {    
const stream = ytdl(urlP, {filter: (info) => info.itag}).pipe(fs.createWriteStream(tmpStringMp4));
await new Promise((resolve, reject) => {
  stream.on('error', reject);
  stream.on('finish', resolve);
});
}
  if (video.itag === 22 && video.audioBitrate ==! (null||undefined)) { 
const stream = ytdl(urlP, {filter: (info) => info.itag}).pipe(fs.createWriteStream(tmpStringMp4));
  await new Promise((resolve, reject) => {
    stream.on('error', reject);
    stream.on('finish', resolve);
  });
  }
  if (video.itag === 134 && video.audioBitrate ==! (null||undefined)) {    
const stream = ytdl(urlP, {filter: (info) => info.itag}).pipe(fs.createWriteStream(tmpStringMp4));
await new Promise((resolve, reject) => {
  stream.on('error', reject);
  stream.on('finish', resolve);
});
}
  if (video.itag === 243 && video.audioBitrate ==! (null||undefined)) { 
const stream = ytdl(urlP, {filter: (info) => info.itag}).pipe(fs.createWriteStream(tmpStringMp4));
  await new Promise((resolve, reject) => {
    stream.on('error', reject);
    stream.on('finish', resolve);
  });
  }
  if (video.itag === 396 && video.audioBitrate ==! (null||undefined)) {
const stream = ytdl(urlP, {filter: (info) => info.itag}).pipe(fs.createWriteStream(tmpStringMp4));
  await new Promise((resolve, reject) => {
    stream.on('error', reject);
    stream.on('finish', resolve);
  });
  }
} else if (video.qualityLabel === '480p') {
  if (video.itag === 135 && video.audioBitrate ==! (null||undefined)) {
const stream = ytdl(urlP, {filter: (info) => info.itag}).pipe(fs.createWriteStream(tmpStringMp4));
  await new Promise((resolve, reject) => {
    stream.on('error', reject);
    stream.on('finish', resolve);
  });
  }
  if (video.itag === 244 && video.audioBitrate ==! (null||undefined)) {
const stream = ytdl(urlP, {filter: (info) => info.itag}).pipe(fs.createWriteStream(tmpStringMp4));
  await new Promise((resolve, reject) => {
    stream.on('error', reject);
    stream.on('finish', resolve);
  });
  }
  if (video.itag === 397 && video.audioBitrate ==! (null||undefined)) {
const stream = ytdl(urlP, {filter: (info) => info.itag == 397}).pipe(fs.createWriteStream(tmpStringMp4));
  await new Promise((resolve, reject) => {
    stream.on('error', reject);
    stream.on('finish', resolve);
  });
  }
} else if (video.qualityLabel === '720p') {
  if (video.itag === 136 && video.audioBitrate ==! (null||undefined)) {
const stream = ytdl(urlP, {filter: (info) => info.itag}).pipe(fs.createWriteStream(tmpStringMp4));
  await new Promise((resolve, reject) => {
    stream.on('error', reject);
    stream.on('finish', resolve);
  });
  }
  if (video.itag === 247 && video.audioBitrate ==! (null||undefined)) {
const stream = ytdl(urlP, {filter: (info) => info.itag == 247}).pipe(fs.createWriteStream(tmpStringMp4));
  await new Promise((resolve, reject) => {
    stream.on('error', reject);
    stream.on('finish', resolve);
  });
  }
  if (video.itag === 398 && video.audioBitrate ==! (null||undefined)) {
const stream = ytdl(urlP, {filter: (info) => info.itag == 398}).pipe(fs.createWriteStream(tmpStringMp4));
  await new Promise((resolve, reject) => {
    stream.on('error', reject);
    stream.on('finish', resolve);
  });
  }
} else if (video.qualityLabel === '1080p') {
  if (video.itag === 137 && video.audioBitrate ==! (null||undefined)) {
const stream = ytdl(urlP, {filter: (info) => info.itag == 137}).pipe(fs.createWriteStream(tmpStringMp4));
  await new Promise((resolve, reject) => {
    stream.on('error', reject);
    stream.on('finish', resolve);
  });
  }
  if (video.itag === 248 && video.audioBitrate ==! (null||undefined)) {
const stream = ytdl(urlP, {filter: (info) => info.itag == 248}).pipe(fs.createWriteStream(tmpStringMp4));
  await new Promise((resolve, reject) => {
    stream.on('error', reject);
    stream.on('finish', resolve);
  });
  }
  if (video.itag === 399 && video.audioBitrate ==! (null||undefined)) {
const stream = ytdl(urlP, {filter: (info) => info.itag == 399}).pipe(fs.createWriteStream(tmpStringMp4));
await new Promise((resolve, reject) => {
  stream.on('error', reject);
  stream.on('finish', resolve);
});
}
        // Manejar eventos de la descarga
        await new Promise((resolve, reject) => {
        stream.on('finish', async () => {
            console.log(`Video descargado como ${titleString}`);
        }, resolve);
        stream.on('error', async (err) => {
            console.error('Error al descargar el video:', err);
        }, reject);
        });
    const readFile = fs.readFileSync(tmpStringMp4);
    const stats = fs.statSync(tmpString);
    const fileSizeInBytes = stats.size;
    const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    // console.log("Tamaño del video: " + fileSizeInMegabytes);
    if (fileSizeInMegabytes <= 999) {
      //if (command == 'ytshort') {
       return conn.sendMessage( m.chat, {video: readFile, fileName: titleString, mimetype: 'video/mp4'}, {quoted: m, ephemeralExpiration: 2*60*1000});
      } else {
       return conn.sendMessage( m.chat, {document: readFile, fileName: titleString, mimetype: 'video/mp4'}, {quoted: m, ephemeralExpiration: 2*60*1000});
      }
  //  } else {
  //    m.reply(`*[❗] 𝙴𝙻 𝙰𝚁𝙲𝙷𝙸𝚅𝙾 𝙴𝚂 𝚂𝚄𝙿𝙴𝚁𝙸𝙾𝚁 𝙰 𝟿𝟿𝟿 𝙼𝙱*`);
  //  }
  if (await tryDownload('144p')) {
    format = chooseFormat(availableFormats, '144p', 'video/mp4')  

    // Descargar el video
  const stream = ytdl(dl_url).pipe(fs.createWriteStream(`./tmp/${titleYt}.mp4`));
} else if (await tryDownload('360p')) {
    format = chooseFormat(availableFormats, '360p', 'video/mp4')  
  } else if (await tryDownload('480p')) {
    format = chooseFormat(availableFormats, '480p', 'video/mp4')  
  } else if (await tryDownload('720p')) {
    format = chooseFormat(availableFormats, '720p', 'video/mp4')  
  } else if (await tryDownload('1080p')) {
    format = chooseFormat(availableFormats, '1080p', 'video/mp4')  
  } 
  await realizarSolicitudConCookies(urlP, cookies);
  await new Promise((resolve, reject) => {
    stream.on('error', reject);
    stream.on('finish', resolve);
  });
  
  let dl_url, size, lengthSize;
  
  const formats = infoYt.formats;
  
  // Función para obtener el formato según la calidad preferida
  const getFormat = (quality) => {
      return ytdl.chooseFormat(formats, { quality });
  };
  
  // Intentar obtener el formato preferido y descargar el video
  const tryDownload = async (quality) => {
      const format = getFormat(quality);
      if (format) {
          size = format.contentLength;
          lengthSize = size;
          dl_url = format.url;
          await new Promise((resolve, reject) => {
              const return stream = ytdl(urlP, { format });
              stream.on('error', reject);
              stream.on('end', resolve);
          });
          return true; // Descarga exitosa
      }
      return false; // Formato no disponible
  };
  
  // Intentar descargar el video en diferentes calidades
 else if (args[1]) {
      const format = getFormat(args[1]); // Utilizar la calidad especificada
      if (format) {
          size = format.contentLength;
          lengthSize = size;
          dl_url = format.url;
      } else {
          resp = 'Formato especificado no disponible';
      }
  } else {
      resp = 'Este video no posee medios de descarga o está protegido';
  }
  
  if (lengthSize > 200000) {
      resp = 'Este video es muy pesado para ser enviado';
  } else if (!dl_url) {
      resp = 'No se encontraron opciones de descarga disponibles';
  } else {
     // resp = `Un momento por favor, ejecutando ${videoUrl}`;
  }
}
  const return stream = ytdl(urlP, {filter: (info) => info.itag == 22 || info.itag == 18}).pipe(fs.createWriteStream(`./tmp/${randomName}`));
  m.reply(global.wait);
  await realizarSolicitudConCookies(urlP, cookies);
  await new Promise((resolve, reject) => {
    stream.on('error', reject);
    stream.on('finish', resolve);
  });
  const stats = fs.statSync(`./tmp/${randomName}`);
  const fileSizeInBytes = stats.size;
  const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
  // console.log("Tamaño del video: " + fileSizeInMegabytes);
  if (fileSizeInMegabytes <= 999) {
    //if (command == 'ytshort') {
      conn.sendMessage( m.chat, {video: fs.readFileSync(`./tmp/${randomName}`), fileName: `${titleYt}.mp4`, mimetype: 'video/mp4'}, {quoted: m});
    } else {
      conn.sendMessage( m.chat, {document: fs.readFileSync(`./tmp/${randomName}`), fileName: `${titleYt}.mp4`, mimetype: 'video/mp4'}, {quoted: m});
    }
//  } else {
//    m.reply(`*[❗] 𝙴𝙻 𝙰𝚁𝙲𝙷𝙸𝚅𝙾 𝙴𝚂 𝚂𝚄𝙿𝙴𝚁𝙸𝙾𝚁 𝙰 𝟿𝟿𝟿 𝙼𝙱*`);
//  }
  fs.unlinkSync(`./tmp/${randomName}`);
}
    const yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v));//ytdl(urlP)
    const ttl =  yt.title;
    if (response === 'audio') {
    const q = '128kbps';
    const dl_url = await yt.audio[q].download();
      const audioUrl = `#ytmp3 ${urlP}`;
    let resp = `un momento por favor\n\nejecutando ${audioUrl}`
    let txt = ''
    let count = 0;
      for (const c of resp) {
        await new Promise(resolve => setTimeout(resolve, 15));
        txt += c;
        count++;
        if (count % 10 === 0) {
          
        await conn.sendPresenceUpdate('composing' , m.chat);
        }
        }
      let qa = await conn.sendMessage(m.chat, { text: txt, mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
      return await conn.sendMessage(m.chat, { audio: {url: dl_url} , ptt: false, mimetype: 'audio/mpeg', fileName: `a.mp3` }, { quoted: qa, ephemeralExpiration: 2*60*1000 })
    } else if (response === 'video') {
      let dl_url, size, lengthSize
      if (yt.video['144p'] && yt.video['144p'].fileSize > 0 && yt.video['144p'].fileSizeH !== 'MB' ) {
          size =  yt.video['144p'].fileSizeH
          dl_url = await yt.video['144p'].download()
          lengthSize =  yt.video['144p'].fileSize
      } else if (yt.video['360p'] && yt.video['360p'].fileSize > 0 && yt.video['360p'].fileSizeH !== 'MB' ) {
          size =  yt.video['360p'].fileSizeH
          dl_url = await yt.video['360p'].download()
          lengthSize =  yt.video['360p'].fileSize
      } else if (yt.video['480p'] && yt.video['480p'].fileSize > 0 && yt.video['480p'].fileSizeH  !== 'MB') {
          size = yt.video['480p'].fileSizeH
          dl_url = await yt.video['480p'].download()
          lengthSize = yt.video['480p'].fileSize
      } else if (yt.video['720p'] && yt.video['720p'].fileSize > 0 && yt.video['720p'].fileSizeH  !== 'MB') {
          size = yt.video['720p'].fileSizeH
          dl_url = await yt.video['720p'].download()
          lengthSize = yt.video['720p'].fileSize
      } else if (yt.video['1080p'] && yt.video['1080p'].fileSize > 0 && yt.video['1080p'].fileSizeH  !== 'MB') {
          size = yt.video['1080p'].fileSizeH
          dl_url = await yt.video['1080p'].download()
          lengthSize = yt.video['1080p'].fileSize
      } else if (args[1]) {
          size = yt.video[q].fileSizeH
          dl_url = await yt.video[q].download()
      } else {
      let resp = `Este video no pose medios de descarga o esta protegido`
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
      return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
      }
      
      if (lengthSize > 200000) {
          let resp = `Este video es muy pesado para ser enviado`
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
          return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
          }
            const videoUrl = `#ytmp4 ${vidP.url}`;
      let resp = `un momento por favor\n\nejecutando ${videoUrl}`
      let txt = ''
      let count = 0;
        for (const c of resp) {
          await new Promise(resolve => setTimeout(resolve, 15));
          txt += c;
          count++;
          if (count % 10 === 0) {
            
          await conn.sendPresenceUpdate('composing' , m.chat);
          }
          }
        let qv = await conn.sendMessage(m.chat, { text: txt, mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
      txt = `Aqui tiene su video`
      return await conn.sendMessage(m.chat, { video: {url: dl_url}, mentions: txt, mimetype: 'video/mp4', caption: txt }, {userJid: conn.user.jid, quoted: qv, ephemeralExpiration: 2*60*1000 } )
    } else if (response === 'mas' && !chat.isBanned) {
      const playlistUrl = `#playlist ${ttl}`//.trim();
    let resp = playlistUrl
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;
    if (count % 10 === 0) {
      
await conn.sendPresenceUpdate('composing' , m.chat);
    }
    }
    return conn.sendMessage(m.chat, { text: playlistUrl, mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
      //conn.sendMessage(sender, playlistUrl, MessageType.text, { quoted: message });
    } else {
      let resp = '*[❗INFO❗] RESPUESTA INVÁLIDA, POR FAVOR INTENTE DE NUEVO USANDO LAS PALABRAS: audio, video o mas*'.trim()
      }
       */
/**
let confirm = {}
const handler = async (m, { conn, command, args, text, usedPrefix }) => {
 if (!text) throw `_*< DESCARGAS - PLAY />*_\n\n*[ ℹ️ ] Hace falta el título o enlace del video de YouTube.*\n\n*[ 💡 ] Ejemplo:* _${usedPrefix + command} Good Feeling - Flo Rida_`;
    // Obtener resultados de búsqueda de manera aleatoria
    const { video, url } = await search(args.join(' '));
    const videoUrl = url; // URL del video encontrado
    const titulo = video.title;
    const publicado = video.ago.toString();
    const duracion = secondString(video.duration.seconds).toString();
    const tipo = video.type.toString();

    // Obtener la descripción completa del video
    const descripcion = await getYouTubeDescription(video.videoId);

    // Traducciones para los campos que deben ser traducidos
    const publicadoTraducido = await translate(`${publicado}`, { to: 'es', autoCorrect: true  });
    const duracionTraducida = await translate(`${duracion}`, { to: 'es', autoCorrect: true  });
    const tipoTraducido = await translate(`${tipo}`, { to: 'es', autoCorrect: true  });

    // Los campos que no requieren traducción
    const vistas = `${MilesNumber(video.views)}`;
    const autor = video.author.name;
    const canal = video.author.url;
    // Construcción del texto
    const texto1 = `*< DESCARGAS - PLAY />*_\n\n▢ *Título:* ${titulo}\n\n▢ *Descripción:* ${descripcion}\n\n▢ *Publicado:* ${publicadoTraducido.text}\n\n▢ *Duración:* ${duracionTraducida.text}\n\n▢ *Vistas:* ${vistas}\n\n▢ *Autor:* ${autor}\n\n▢ *ID:* ${video.videoId}\n\n▢ *Tipo:* ${tipoTraducido.text}\n\n▢ *Enlace:* ${videoUrl}\n\n▢ *Canal:* ${canal}\n\n*[ ℹ️ ] Se está enviando el ${tipoTraducido.text}. Espere...*`.trim();
try {
   await conn.sendMessage(m.chat, { image: { url: video.thumbnail }, caption: texto1 }, { quoted: m });
} catch (error) {
    
}
confirm[m.sender] = {
    sender: m.sender,
    yt_play: video,
    time: setTimeout(async () => {
    await conn.sendMessage(m.chat, { text: 'terminado' }, { quoted: m });
    delete confirm[m.sender];
    }, 60 * 1000),
    };
}
handler.help = ['play', 'play2'].map(v => v + ' <pencarian>')
handler.tags = ['downloader']
handler.command = /^play(2|3)?$/ig
handler.before = async function before(m, {conn, text}) {
const confirmacion = Object.values(confirm).find(c => c.sender === m.sender);
if (!confirmacion) return;
const {yt_play, sender, time } = confirmacion
//
if (m.text.toLowerCase() === 'audio' && sender) {
     try {
            const audio = global.API('CFROSAPI', `/api/v1/ytmp3?url=${yt_play.url}`);
console.log(`play: ${audio}`)
            const ttl = yt_play.title;
            const buff_aud = await getBuffer(audio);
            const fileSizeInBytes = buff_aud.byteLength;
            const fileSizeInKB = fileSizeInBytes / 1024;
            const fileSizeInMB = fileSizeInKB / 1024;
            const size = fileSizeInMB.toFixed(2);

            if (size >= limit_a2) {
                await conn.sendMessage(m.chat, { text: `*[ ℹ️ ] Descargue su audio en:* _${audio}_` }, { quoted: m });
                return;
            }

            if (size >= limit_a1 && size <= limit_a2) {
                await conn.sendMessage(m.chat, { document: buff_aud, mimetype: 'audio/mpeg', fileName: ttl + `.mp3` }, { quoted: m });
                return;
            } else {
                await conn.sendMessage(m.chat, { audio: buff_aud, mimetype: 'audio/mpeg', fileName: ttl + `.mp3` }, { quoted: m });
                return;
            }
        } catch {
            throw '_*< DESCARGAS - PLAY />*_\n\n*[ ℹ️ ] Ocurrió un error. Por favor, inténtalo de nuevo más tarde.*';
        }
    }
if (m.text.toLowerCase() === 'video' && sender) {
        try {
            const video = global.API('CFROSAPI', `/api/v1/ytmp4?url=${yt_play.url}`);
            const ttl2 = yt_play.title;
            const buff_vid = await getBuffer(video);
            const fileSizeInBytes2 = buff_vid.byteLength;
            const fileSizeInKB2 = fileSizeInBytes2 / 1024;
            const fileSizeInMB2 = fileSizeInKB2 / 1024;
            const size2 = fileSizeInMB2.toFixed(2);

            if (size2 >= limit2) {
                await conn.sendMessage(m.chat, { text: `_*< DESCARGAS - PLAY />*_\n\n*[ ℹ️ ] Descargue su vídeo en:* _${video}_` }, { quoted: m });
                return;
            }

            if (size2 >= limit1 && size2 <= limit2) {
                await conn.sendMessage(m.chat, { document: buff_vid, mimetype: 'video/mp4', fileName: ttl2 + `.mp4` }, { quoted: m });
                return;
            } else {
                await conn.sendMessage(m.chat, { video: buff_vid, mimetype: 'video/mp4', fileName: ttl2 + `.mp4` }, { quoted: m });
                return;
            }
        } catch {
            throw '_*< DESCARGAS - PLAY />*_\n\n*[ ℹ️ ] Ocurrió un error. Por favor, inténtalo de nuevo más tarde.*';
        }
}
}   
export default handler;

async function search(query, options = {}) {
    const searchResult = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
    const randomIndex = Math.floor(Math.random() * searchResult.videos.length);
    const selectedVideo = searchResult.videos[randomIndex];
    return { video: selectedVideo, url: selectedVideo.url };
}

async function getYouTubeDescription(videoId) {
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`);
        const description = response.data.items[0].snippet.description;
        return description || 'Descripción no disponible';
    } catch (error) {
        console.error('Error fetching YouTube description:', error);
        return 'Descripción no disponible';
    }
}

// Funciones MilesNumber y secondString no han cambiado

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
    const dDisplay = d > 0 ? d + (d == 1 ? 'd ' : 'd ') : '';
    const hDisplay = h > 0 ? h + (h == 1 ? 'h ' : 'h ') : '';
    const mDisplay = m > 0 ? m + (m == 1 ? 'm ' : 'm ') : '';
    const sDisplay = s > 0 ? s + (s == 1 ? 's' : 's') : '';
    return dDisplay + hDisplay + mDisplay + sDisplay;
}



const getBuffer = async (url, options) => {
    options ? options : {};
    const res = await axios({ method: 'get', url, headers: { 'DNT': 1, 'Upgrade-Insecure-Request': 1, }, ...options, responseType: 'arraybuffer' });
    return res.data;
};
 */

/**    
*/
/**
 */

//const texto1 = `*◉—⌈🔊 YOUTUBE PLAY 🔊⌋—◉*\n\n❏ 📌 *Titulo:* ${yt_vid[0].title}\n❏ 📆 *Publicado:* ${yt_vid[0].ago}\n❏ ⌚ *Duracion:* ${secondString(yt_vid[0].duration.seconds)}\n❏ 👀 *Vistas:* ${`${MilesNumber(yt_vid[0].views)}`}\n❏ 👤 *Autor:* ${yt_vid[0].author.name}\n❏ ⏯️ *Canal:* ${yt_vid[0].author.url}\n❏ 🆔 *ID:* ${yt_vid[0].videoId}\n❏ 🪬 *Tipo:* ${yt_vid[0].type}\n❏ 🔗 *Link:* ${yt_vid[0].url}\n\n❏ *_Enviando ${yt_vid[0].title}, aguarde un momento．．．_*`;
/*** */