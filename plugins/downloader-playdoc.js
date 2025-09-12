import { youtubeSearch } from '../lib/ytscraper.js'
import { owner, info, temp, newsletterID, sBroadCastID, groupID, media } from '../config.js'
import fetch from 'node-fetch'
let handler = async (m, {conn, command, text, usedPrefix, db, userdb, senderJid}) => {
if (!text) return conn.sendWritingText(m.chat, `*[❗INFO❗] NOMBRE DE LA CANCION FALTANTE, POR FAVOR INGRESE EL COMANDO MAS EL NOMBRE /TITULO DE UNA CANCION*\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} Good Feeling - Flo Rida*`, m)
let vid = (await youtubeSearch(text)).video[0]
if (!vid) return conn.sendWritingText(m.chat, `*[❗INFO❗] LO SIENTO, NO SE PUDO ENCONTRAR EL AUDIO/ VIDEO, INTENTE CON OTRO NOMBRE/TITULO*`, m)
try {
let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
const urll = 'https://www.youtube.com/watch?v=' + videoId
var doc = ['pdf','zip','vnd.openxmlformats-officedocument.presentationml.presentation','vnd.openxmlformats-officedocument.spreadsheetml.sheet','vnd.openxmlformats-officedocument.wordprocessingml.document']
var document = doc[Math.floor(Math.random() * doc.length)]
const buttons = `
*🎵 AUDIODOC 🎵* => ${usedPrefix}ytmp3doc ${urll}
*🎥 VIDEODOC 🎥* => ${usedPrefix}ytmp4doc ${urll}
*📋 MAS RESULTADOS 📋* => ${usedPrefix}playlist ${text}`
let texto1 = `*◉—⌈🔊 PLAY DOCUMENT 🔊⌋—◉*\n
❏ 📌 *TITULO:* ${title}
❏ 📆 *PUBLICADO:* ${publishedTime}
❏ ⌚ *DURACION:* ${durationH}
❏ 👀 *VISTAS:* ${viewH}
❏ 📇 *DESCRIPCION:* ${description}
❏ 🔗 *LINK:* ${urll}`.trim()

await conn.sendWritingText(m.chat, texto1, userdb, m)
} catch {
return conn.sendWritingText(m.chat, `*[❗INFO❗] ERROR, POR FAVOR VUELAVA A INTENTARLO*`, m)}
try { 
let vid2 = await (await fetch(API('rrul', '/api/yt/yts', { q: text }))).json()
let { url, title, description, image, seconds, timestamp, ago, views } = await vid2.result[0]
let ytLink = await fetch(`https://api.lolhuman.xyz/api/ytplay2?apikey=${lolkeysapi}&query=${text}`)
let jsonn = await ytLink.json()
let aud = await jsonn.result.audio
let capt = `❏ 📌 *TITULO:* ${title}\n❏ 📆 *PUBLICADO:* ${ago}\n❏ ⌚ *DURACION:* ${timestamp}\n❏ 👀 *VISTAS:* ${views.toLocaleString()}\n❏ 🔗 *LINK:* ${url}`
const buttons = [{buttonId: `#playlist ${title}`, buttonText: {displayText: '📋 MAS RESULTADOS 📋'}, type: 1}]
const buttonMessage = { image: {url: image}, caption: capt, footer: '*ENVIANDO AUDIO, AGUARDE UN MOMENTO...*', buttons: buttons, headerType: 4 }
let msg = await conn.sendMessage(m.chat, buttonMessage, { quoted: m })
conn.sendMessage(m.chat, { document: { url: aud }, mimetype: 'audio/mpeg', fileName: `${title}.mp3`}, {quoted: msg})
} catch { 
return conn.sendWritingText(m.chat, `*[❗INFO❗] ERROR, POR FAVOR VUELAVA A INTENTARLO*`, m)}
}

handler.help = ['playdoc', 'play3'].map(v => v + ' <pencarian>')
handler.tags = ['downloader']
handler.command = /^playdoc$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
