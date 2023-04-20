/* Creditos a https://github.com/ALBERTO9883/NyanCatBot-MD */

import { youtubeSearch } from '@bochilteam/scraper'
import fetch from 'node-fetch'
let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!text) throw `*[❗INFO❗] NOMBRE DE LA CANCION FALTANTE, POR FAVOR INGRESE EL COMANDO MAS EL NOMBRE/TITULO DE UNA CANCION*\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} Good Feeling - Flo Rida*`
try {
let vid = (await youtubeSearch(text)).video[0]
if (!vid) throw '*[❗INFO❗] LO SIENTO, NO PUDE ENCONTRAR EL AUDIO/VIDEO, INTENTE CON OTRO NOMBRE/TITULO*'
let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
const urll = 'https://www.youtube.com/watch?v=' + videoId
var doc = ['pdf','zip','vnd.openxmlformats-officedocument.presentationml.presentation','vnd.openxmlformats-officedocument.spreadsheetml.sheet','vnd.openxmlformats-officedocument.wordprocessingml.document']
var document = doc[Math.floor(Math.random() * doc.length)]
const buttons = [
{ buttonId: `#ytmp3 ${urll}`, buttonText: { displayText: '🎵 AUDIO 🎵' }, type: 1 },
{ buttonId: `#ytmp4 ${urll}`, buttonText: { displayText: '🎥 VIDEO 🎥' }, type: 1 },
{ buttonId: `#playlist ${text}`, buttonText: { displayText: '📋 MAS RESULTADOS 📋' }, type: 1 }, ]    
let texto1 = `*◉—⌈🔊 YOUTUBE PLAY🔊⌋—◉*\n
📌 *TITULO:* ${title}
📆 *PUBLICADO:* ${publishedTime}
⌚ *DURACION:* ${durationH}
👀 *VISTAS:* ${viewH}
📇 *DESCRIPCION:* ${description}
🔗 *LINK:* ${urll}`.trim()
let buttonMessage = { "document": { url: "https://www.facebook.com/ANIMxSCANS" }, "fileName": '❏ 🌿 ʀᴇᴘʀᴏᴅᴜᴄᴛᴏʀ ᴅᴇ ʏᴏᴜᴛᴜʙᴇ', "mimetype": 'application/vnd.ms-excel', "caption": texto1, "fileLength": '99999999999999', "mentions": [m.sender], "footer": wm, "buttons": buttons, "headerType": 4, contextInfo: { "mentionedJid": [m.sender], "externalAdReply": { "showAdAttribution": true, "title": `${title}`, "mediaType": 2, "previewType": "VIDEO", "thumbnail": await (await fetch(thumbnail)).buffer(), "mediaUrl": `${urll}`, "sourceUrl": `https://github.com/ReyEndymion/ANI_MX_SCANS-MD` }}} 
conn.sendMessage(m.chat, buttonMessage, { quoted: m })
} catch {
try {
let vid2 = await (await fetch(`https://api.lolhuman.xyz/api/ytsearch?apikey=${lolkeysapi}&query=${text}`)).json()
let { videoId, title, views, published, thumbnail } = await vid2.result[0]
const url = 'https://www.youtube.com/watch?v=' + videoId
let ytLink = await fetch(`https://api.lolhuman.xyz/api/ytplay2?apikey=${lolkeysapi}&query=${text}`)
let jsonn = await ytLink.json()
let aud = await jsonn.result.audio
let capt = `❏ 📌 *TITULO:* ${title}\n❏ 📆 *PUBLICADO:* ${ago}\n❏ ⌚ *DURACION:* ${timestamp}\n❏ 👀 *VISTAS:* ${views}\n❏ 🔗 *LINK* ${url}`
const buttons = [{buttonId: `#playlist ${title}`, buttonText: {displayText: '📋 MAS RESULTADOS 📋'}, type: 1}]
const buttonMessage = { image: {url: thumbnail}, caption: capt, footer: '*ENVIANDO AUDIO, AGUARDE UN MOMENTO...*', buttons: buttons, headerType: 4 }
let msg = await conn.sendMessage(m.chat, buttonMessage, { quoted: m })
conn.sendMessage(m.chat, { audio: { url: aud }, mimetype: 'audio/mp4', fileName: `${title}.mp3`}, {quoted: msg})
} catch {  
throw '*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*'}}}
handler.help = ['play', 'play2'].map(v => v + ' <pencarian>')
handler.tags = ['downloader']
handler.command = /^play2?$/i
export default handler
