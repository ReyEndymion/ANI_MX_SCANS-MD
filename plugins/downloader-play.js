import { youtubeSearch } from '@bochilteam/scraper'
import fetch from 'node-fetch'
let confirmations = {}
async function handler(m, { conn, command, text, usedPrefix })  {
if (!text) throw `*[❗INFO❗] NOMBRE DE LA CANCION FALTANTE, POR FAVOR INGRESE EL COMANDO MAS EL NOMBRE/TITULO DE UNA CANCION*\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} Good Feeling - Flo Rida*`
try {
let vid = (await youtubeSearch(text)).video[0]
console.log('lastimosamente:', text)
if (!vid) throw '*[❗INFO❗] LO SIENTO, NO PUDE ENCONTRAR EL AUDIO/VIDEO, INTENTE CON OTRO NOMBRE/TITULO*'
let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
const urll = 'https://www.youtube.com/watch?v=' + videoId
var doc = ['pdf','zip','vnd.openxmlformats-officedocument.presentationml.presentation','vnd.openxmlformats-officedocument.spreadsheetml.sheet','vnd.openxmlformats-officedocument.wordprocessingml.document']
var document = doc[Math.floor(Math.random() * doc.length)]
const buttons =  `${usedPrefix}ytmp3 ${urll}  para descargar '🎵 AUDIO 🎵'\n\n${usedPrefix}ytmp4 ${urll}  para descargar '🎥 VIDEO 🎥'\n\n${usedPrefix}playlist ${text}  para ver '📋 MAS RESULTADOS 📋'`    
let texto1 = `*◉—⌈🔊 YOUTUBE PLAY🔊⌋—◉*\n
📌 *TITULO:* ${title}
📆 *PUBLICADO:* ${publishedTime}
⌚ *DURACION:* ${durationH}
👀 *VISTAS:* ${viewH}
📇 *DESCRIPCION:* ${description}
🔗 *LINK:* ${urll}`.trim()
let buttonMessage = { "document": { url: "https://www.facebook.com/ANIMxSCANS" }, "fileName": '❏ 🌿 ʀᴇᴘʀᴏᴅᴜᴄᴛᴏʀ ᴅᴇ ʏᴏᴜᴛᴜʙᴇ', "mimetype": 'application/vnd.ms-excel', "caption": texto1, "fileLength": '99999999999999', "mentions": [m.sender], "footer": wm, "buttons": buttons, "headerType": 4, contextInfo: { "mentionedJid": [m.sender], "externalAdReply": { "showAdAttribution": true, "title": `${title}`, "mediaType": 2, "previewType": "VIDEO", "thumbnail": await (await fetch(thumbnail)).buffer(), "mediaUrl": `${urll}`, "sourceUrl": `https://github.com/ReyEndymion/ANI_MX_SCANS-MD` }}} 
conn.sendMessage(m.chat,{text: texto1 + '\n\n' + buttons}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}, false, null, [['audio'], ['video'], ['mas']])
confirmations[m.sender] = {
    sender: m.sender,
    to: who,
    message: m,
    type,
    count,
    timeout: setTimeout(() => (m.reply('Se acabó el tiempo'), delete confirmations[m.sender]), 60 * 1000)
}
} catch {
try {/*
let vid2 = await (await fetch(`https://api.lolhuman.xyz/api/ytsearch?apikey=${lolkeysapi}&query=${text}`)).json()
let { videoId, title, views, published, thumbnail, timestamp } = await vid2.result[0]
const url = 'https://www.youtube.com/watch?v=' + videoId
let ytLink = await fetch(`https://api.lolhuman.xyz/api/ytplay2?apikey=${lolkeysapi}&query=${text}`)
let jsonn = await ytLink.json()
let aud = await jsonn.result.audio
let capt = `❏ 📌 *TITULO:* ${title}\n❏ 📆 *PUBLICADO:* ${published}\n❏ ⌚ *DURACION:* ${timestamp}\n❏ 👀 *VISTAS:* ${views}\n❏ 🔗 *LINK* ${url}`
const buttons = [{buttonId: `#playlist ${title}`, buttonText: {displayText: '📋 MAS RESULTADOS 📋'}, type: 1}]
const buttonMessage = { image: {url: thumbnail}, caption: capt, footer: '*ENVIANDO AUDIO, AGUARDE UN MOMENTO...*', buttons: buttons, headerType: 4 }
let msg = await conn.sendMessage(m.chat, buttonMessage, { quoted: m })
//conn.sendMessage(m.chat, { audio: { url: aud }, mimetype: 'audio/mp4', fileName: `${title}.mp3`}, {quoted: msg})*/
} catch {  
throw '*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*'}}
}

handler.before = async (m, { conn }) => {
    const confirmation = Object.values(confirmations).find(c => c.sender === m.sender);
    if (!confirmation) return;
  
    const response = m.text.toLowerCase();
    const { sender, message, type, timeout } = confirmation;
  
    clearTimeout(timeout);
    delete confirmations[m.sender];
  
    if (response === 'audio') {
      const audioUrl = `#ytmp3 ${message.url}`;
      conn.sendMessage(sender, audioUrl, MessageType.text, { quoted: message });
    } else if (response === 'video') {
      const videoUrl = `#ytmp4 ${message.url}`;
      conn.sendMessage(sender, videoUrl, MessageType.text, { quoted: message });
    } else if (response === 'mas') {
      const playlistUrl = `#playlist ${message.text}`;
      conn.sendMessage(sender, playlistUrl, MessageType.text, { quoted: message });
    } else {
      conn.sendMessage(sender, '*[❗INFO❗] RESPUESTA INVÁLIDA, POR FAVOR INTENTE DE NUEVO*', MessageType.text, { quoted: message });
    }
  };

handler.help = ['play', 'play2'].map(v => v + ' <pencarian>')
handler.tags = ['downloader']
handler.command = /^play2?$/i
export default handler

