//import instagramGetUrl from 'instagram-url-direct';
//import {instagram} from '@xct007/frieren-scraper';
const handler = async (m, {conn, args, command, usedPrefix, db, userdb, senderJid}) => {
let resp, q, video
if (!args[0]) {
resp =`*[❗INFO❗] Ingrese un enlace de Instagram, ejemplo: ${usedPrefix + command}* https://www.instagram.com/reel/Cc0NuYBg8CR/?utm_source=ig_web_copy_link`;
} else {
try {
q = `*[❗] Descargando su video, aguarde un momento por favor, este proceso puede durar entre 2 y 10 minutos dependiendo de la duración del vídeo...*`
try {
let { default: instagramDl } = await import('@sasmeee/igdl');
const img = await instagramDl(args[0]);
for (let i = 0; i < img.length; i++) {
const bufferInfo = await getBuffer(img[i].download_link);
if (bufferInfo.detectedType.mime.startsWith('image/')) {
await conn.sendMessage(m.chat, {image: {url: img[i].download_link}}, {quoted: m});
} else if (bufferInfo.detectedType.mime.startsWith('video/')) {
await conn.sendMessage(m.chat, {video: {url: img[i].download_link }}, {quoted: m});
}
}
} catch (e) {
try {
let { default: fetch } = await import('node-fetch');
const datTa = await instagram.download(args[0]);
for (const urRRl of datTa) {
const shortUrRRl = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
const tXXxt = `🔗 *Url:* ${shortUrRRl}`.trim();
conn.sendFile(m.chat, urRRl.url, 'error.mp4', tXXxt, m, true, {quoted: m, ephemeralExpiration: 2*60*1000});
await new Promise((resolve) => setTimeout(resolve, 10000));
}
} catch (e) {
try {
const resultss = await instagramGetUrl(args[0]).url_list[0];
const shortUrl2 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
const txt2 = `🔗 *Url:* ${shortUrl2}`.trim();
console.log('variable: ', args[0])
await conn.sendFile(m.chat, resultss, 'error.mp4', txt2, m, {quoted: m, ephemeralExpiration: 2*60*1000});
} catch (e) {
resp = `Error: ${e}\n\nReintentando....`
try {
let { default: fetch } = await import('node-fetch');
const { instagramdl } = await import('../lib/instagramscraper.js');
const resultssss = await instagramdl(args[0]);
const shortUrl3 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
const txt4 = `🔗 *Url:* ${shortUrl3}`.trim();
for (const {url} of resultssss) await conn.sendFile(m.chat, url, 'error.mp4', txt4, m, {quoted: m, ephemeralExpiration: 2*60*1000});
} catch (e) {
resp = `Error: ${e}\n\nReintentando....`
/*const human = await fetch(`https://api.lolhuman.xyz/api/instagram?apikey=${lolkeysapi}&url=${args[0]}`);
const json = await human.json();
const videoig = json.result;
const shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
const txt1 = `🔗 *Url:* ${shortUrl1}`.trim();
await conn.sendFile(m.chat, videoig, 'error.mp4', txt1, m, true, {quoted: m, ephemeralExpiration: 2*60*1000});*/
} }
}
}
} catch (e) {
resp = `*[❗INFO❗] Error: ${e}, por favor vuelva a intentarlo*`;
}
}
let txt = '';
let count = 0;
if (resp === undefined) return
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 5));
txt += c;
count++;
if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
}
}
if (resp && q) {
q = await conn.sendWritingText(m.chat, resp, userdb, m);
return conn.sendWritingText(m.chat, resp, userdb, q);

} else if (resp && video && q)
return conn.sendWritingText(m.chat, resp, userdb, m);
};
handler.command = /^(instagramdl|instagram|igdl|ig|instagramdl2|instagram2|igdl2|ig2|instagramdl3|instagram3|igdl3|ig3)$/i;
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler;

const getBuffer = async (url, options) => {
let { default: axios } = await import('axios');
options = options || {};
const res = await axios({method: 'get', url, headers: {'DNT': 1, 'Upgrade-Insecure-Request': 1}, ...options, responseType: 'arraybuffer'});
const buffer = Buffer.from(res.data, 'binary');
const { fileTypeFromBuffer } = await import('file-type');
const detectedType = await fileTypeFromBuffer(buffer);
if (!detectedType || (detectedType.mime !== 'image/jpeg' && detectedType.mime !== 'image/png' && detectedType.mime !== 'video/mp4')) {
return null;
}
return { buffer, detectedType };
};
