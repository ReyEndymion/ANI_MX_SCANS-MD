import fs from 'fs';
import path from 'path';
import https from 'https';
import axios from 'axios';
import fetch from 'node-fetch'
import {getCommandVariants} from '../lib/functions.js'
import { facebookdl } from '../lib/facebookscraper.js'
import fbDownloader from 'fb-downloader-scrapper'
let handler = async (m, {conn, args, command, usedPrefix, db, userdb, senderJid}) => {
let resp, video
if (!args[0]) {resp = `*[❗INFO❗] INGRESE UN ENLACE DE FACEBOOK, EJEMPLO: ${usedPrefix + command}* https://fb.watch/fOTpgn6UFQ/`} 
if (!args[0].match(/www.facebook.com|fb.watch/g)) {resp = `*[❗INFO❗] INGRESE UN ENLACE DE FACEBOOK, EJEMPLO: ${usedPrefix + command}* https://fb.watch/fOTpgn6UFQ/`}
try {
resp = `*[❗] DESCARGANDO SU VIDEO, AGUARDE UN MOMENTO POR FAVOR, ESTE PROCESO PUEDE DURAR ENTRE 2 Y 10 MINUTOS DEPENDIENDO DE LA DURACIÓN DEL VIDEO...*`
let q = await conn.sendWritingText(m.chat, resp, userdb, m)
switch (command) { 
case "facebook1": case "fb1": case "facebookdl1": case "fbdl1":
try {
const result = await facebookdl(args[0])
const { thumbnail, duration, video } = await result
let url = '', quality = ''
for (const data of [...video]) {
if (quality === '360p (SD)') {
url = await data.download()
quality = data.quality
} else if (quality === '720p (HD)') {
quality = data.quality
url = await data.download()
} else {
quality = data.quality
url = await data.download()
}
}

resp = `*AQUI ESTA SU VIDEO*\n\n*TIEMPO: ${duration}*\n\n*Calidad:* ${quality}`
return conn.sendVideoWriting(m.chat, url, resp, userdb, q)
} catch (error) {
resp = `${error.stack}` 
return conn.sendWritingText(m.chat, resp, userdb, m)
}
break 
case "facebook2": case "fb2": case "facebookdl2": case "fbdl2": 
try {
let ress = await fg.fbdl(args[0])
const {title, size, sizeB, videoUrl} = await ress
const file = path.join(temp, 'video.mp4')

//const url = fs.existsSync(file) ? file : await savefrom(args[0])
resp = `*AQUI ESTA SU VIDEO*\n\n*TITULO: ${title}*`
return conn.sendVideoWriting(m.chat, videoUrl, resp, userdb, q)
} catch (error) {
resp = `${error.stack}` 
return conn.sendWritingText(m.chat, resp, userdb, m)
}
break
case "facebook3": case "fb3": case "facebookdl3": case "fbdl3":
try {
let res = await fbDownloader(args[0]).catch(_ => console.error(_))
for (let result of res) {
video = result.url
resp ='*AQUI ESTA SU VIDEO*'
return conn.sendVideoWriting(m.chat, video, resp, userdb, q)
}
} catch (error) {
resp = `error: ${error.stack}`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
break 
}
} catch {
resp = `*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO, SI EL ERROR SIGUE, PRUEBE CON OTRA OPCION (${usedPrefix}fb1, ${usedPrefix}fb2, ${usedPrefix}fb3, ${usedPrefix}fb4, ${usedPrefix}fb5)*`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
}
handler.command = /^(fb|facebook)(1|2|3|4|5)$/i
handler.help = [];
handler.tags = [];
handler.menu = [
{title: "📥 FACEBOOK", description: `Commandos disponibles:\n${getCommandVariants(handler.command).map(hc => `#${hc} enlace.link/url`).join('\n')}`, id: `fb`},

];
handler.type = "descargas";

handler.disabled = false;

export default handler
