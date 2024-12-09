import * as cheerio from 'cheerio';
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
async function handler(m, { conn, command, args, text, usedPrefix }) {
//process.env.TMPDIR = process.env.TEMP = process.env.TMP = `./tmp`;
const bot = global.db.data.bot[conn.user.jid]
const chats = bot.chats
const privs = chats.privs
const groups = chats.groups
const chat = m.isGroup ? groups[m.chat] : privs[m.chat]
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
if (m.chat == sBroadCastID || m.chat.endsWith(newsletterID)) return

const bot = global.db.data.bot[conn.user.jid]
const chats = bot.chats
const privs = chats.privs
const groups = chats.groups
const chat = m.isGroup ? groups[m.chat] : privs[m.chat]

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
//console.log('ytdl', format)//
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
