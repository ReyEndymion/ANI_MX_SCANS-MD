import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!text) throw `*[❗INFO❗] NOMBRE DE LA CANCION FALTANTE, POR FAVOR INGRESE EL COMANDO MAS EL NOMBRE/TITULO DE UNA CANCION*\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} Good Feeling - Flo Rida*`
let vid = (await youtubeSearch(text)).video[0]
if (!vid) throw '*[❗INFO❗] LO SIENTO, NO PUDE ENCONTRAR EL AUDIO/VIDEO, INTENTE CON OTRO NOMBRE/TITULO*'
try {
let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
const url = 'https://www.youtube.com/watch?v=' + videoId
conn.sendHydrated(m.chat, `
📌 *TITULO:* ${title}
📇 *DESCRIPCION:* ${description}
📆 *PUBLICADO:* ${publishedTime}
⌚ *DURACION:* ${durationH}
👀 *VISTAS:* ${viewH}
`.trim(), author, thumbnail, `${url}`, 'URL', null, null, [
['AUDIO', `${usedPrefix}yta ${url}`],
['VIDEO', `${usedPrefix}ytv ${url}`],
['MAS RESULTADOS', `${usedPrefix}playlist ${text}`]  
], m)
}catch(e){
m.reply('*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*')
console.log(e)
}}
handler.help = ['play', 'play2'].map(v => v + ' <pencarian>')
handler.tags = ['downloader']
handler.command = /^play2?$/i
export default handler
