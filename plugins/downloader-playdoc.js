import { youtubeSearch } from '@bochilteam/scraper'
import fetch from 'node-fetch'
let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!text) throw `*[❗INFO❗] NOMBRE DE LA CANCION FALTANTE, POR FAVOR INGRESE EL COMANDO MAS EL NOMBRE /TITULO DE UNA CANCION*\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} Good Feeling - Flo Rida*`
let vid = (await youtubeSearch(text)).video[0]
if (!vid) throw '*[❗INFO❗] LO SIENTO, NO SE PUDO ENCONTRAR EL AUDIO/ VIDEO, INTENTE CON OTRO NOMBRE/TITULO*'
try {
let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
const urll = 'https://www.youtube.com/watch?v=' + videoId
var doc = ['pdf','zip','vnd.openxmlformats-officedocument.presentationml.presentation','vnd.openxmlformats-officedocument.spreadsheetml.sheet','vnd.openxmlformats-officedocument.wordprocessingml.document']
var document = doc[Math.floor(Math.random() * doc.length)]
const buttons = `
*🎵 𝐀𝐔𝐃𝐈𝐎𝐃𝐎𝐂 🎵* => ${usedPrefix}ytmp3doc ${urll}
*🎥 𝐕𝐈𝐃𝐄𝐎𝐃𝐎𝐂 🎥* => ${usedPrefix}ytmp4doc ${urll}
*📋 𝐌𝐀𝐒 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎𝐒 📋* => ${usedPrefix}playlist ${text}`
let texto1 = `*◉—⌈🔊 PLAY DOCUMENT 🔊⌋—◉*\n
❏ 📌 *TITULO:* ${title}
❏ 📆 *PUBLICADO:* ${publishedTime}
❏ ⌚ *DURACION:* ${durationH}
❏ 👀 *VISTAS:* ${viewH}
❏ 📇 *DESCRIPCION:* ${description}
❏ 🔗 *LINK:* ${urll}`.trim()
let buttonMessage = `{ "document": { url: ${md}}, "fileName": '❏ 🌿 REPRODUCTOR DE YOUTUBE', "mimetype": 'application/vnd.ms-excel', "caption": texto1, "fileLength": '99999999999999', "mentions": [m.sender], "footer": wm, "buttons": buttons, "headerType": 4, contextInfo: { "mentionedJid": [m.sender], "externalAdReply": { "showAdAttribution": true, "title": ${title}, "mediaType": 2, "previewType": "VIDEO", "thumbnail": await (await fetch(thumbnail)).buffer(), "mediaUrl": ${urll}, "sourceUrl": ${urlgofc} }}} `
let txt = '';
let count = 0;
for (const c of texto1+'\n'+buttons+'\n'+buttonMessage) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} catch {
    throw '*[❗INFO❗] ERROR, POR FAVOR VUELAVA A INTENTARLO*'}
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
throw '*[❗INFO❗] ERROR, POR FAVOR VUELAVA A INTENTARLO*'}
}

handler.help = ['playdoc', 'play3'].map(v => v + ' <pencarian>')
handler.tags = ['downloader']
handler.command = /^play3|playdoc?$/i
export default handler
