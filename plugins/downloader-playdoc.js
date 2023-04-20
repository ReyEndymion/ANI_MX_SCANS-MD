import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!text) throw `*[❗INFO❗] NOMBRE DE LA CANCION FALTANTE, POR FAVOR INGRESE EL COMANDO MAS EL NOMBRE /TITULO DE UNA CANCION*\n\n*—◉ 𝙴𝙹𝙴𝙼𝙿𝙻𝙾:*\n*${usedPrefix + command} Good Feeling - Flo Rida*`
let vid = (await youtubeSearch(text)).video[0]
if (!vid) throw '*[❗INFO❗] LO SIENTO, NO SE PUDO ENCONTRAR EL AUDIO/ VIDEO, INTENTE CON OTRO NOMBRE/TITULO*'
try {
let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
const url = 'https://www.youtube.com/watch?v=' + videoId
conn.sendHydrated(m.chat, `
*◉— PLAY DOCUMENT—◉*

📌 *𝚃𝙸𝚃𝚄𝙻𝙾:* ${title}
📇 *𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝙲𝙸𝙾𝙽:* ${description}
📆 *𝙿𝚄𝙱𝙻𝙸𝙲𝙰𝙳𝙾:* ${publishedTime}
⌚ *𝙳𝚄𝚁𝙰𝙲𝙸𝙾𝙽:* ${durationH}
👀 *𝚅𝙸𝚂𝚃𝙰𝚂:* ${viewH}
`.trim(), wm, thumbnail, `${url}`, '𝚄𝚁𝙻', null, null, [
['AUDIO', `${usedPrefix}yta.2 ${url}`],
['VIDEO', `${usedPrefix}ytv.2 ${url}`],
['MAS RESULTADOS', `${usedPrefix}playlist ${text}`]
], m)
}catch(e){
m.reply('*[❗INFO❗] ERROR, POR FAVOR VUELAVA A INTENTARLO*')
console.log(e)
}}
handler.command = /^play3|playdoc?$/i
export default handler
