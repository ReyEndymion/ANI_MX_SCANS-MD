import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!text) throw `*[❗INFO❗] NOMBRE DE LA CANCION FALTANTE, POR FAVOR INGRESE EL COMANDO MAS EL NOMBRE/TITULO DE UNA CANCION*\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} Good Feeling - Flo Rida*`
let vid = (await youtubeSearch(text)).video[0]
if (!vid) throw '*[❗INFO❗] LO SIENTO, NO PUDE ENCONTRAR EL AUDIO/VIDEO, INTENTE CON OTRO NOMBRE/TITULO*'
try {
let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
const url = 'https://www.youtube.com/watch?v=' + videoId
const resp = `
*◉— PLAY DOCUMENT —◉*

📌 *TITULO:* ${title}
📇 *DESCRIPCION:* ${description}
📆 *PUBLICADO:* ${publishedTime}
⌚ *DURACION:* ${durationH}
👀 *VISTAS:* ${viewH}
'URL' => ${url} 
'AUDIO' => ${usedPrefix}yta.2 ${url}
'VIDEO' => ${usedPrefix}ytv.2 ${url}
`.trim()
let txt = '';
       let count = 0;
       for (const c of resp) {
           await new Promise(resolve => setTimeout(resolve, 5));
           txt += c;
           count++;
       
           if (count % 10 === 0) {
               conn.sendPresenceUpdate('composing' , m.chat);
           }
       }
conn.sendMessage(m.chat, {text: txt+'\n\n' +wm, mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}, null, null, [['audio'], ['video']])
}catch(e){
    conn.sendMessage(m.chat, { text: '*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*', mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
console.log(e)
}}
handler.command = /^play3|playdoc?$/i
export default handler
