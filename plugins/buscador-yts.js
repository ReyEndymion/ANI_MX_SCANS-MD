import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { conn, text }) => {
if (!text) throw '*[❗INFO❗] INSERTE EL NOMBRE DE ALGUN VIDEO CANAL DE YOUTUBE*'
try {
let imagennnnn = (await youtubeSearch(text)).video[0].thumbnail
const { video, channel } = await youtubeSearch(text)
let teks = [...video, ...channel].map(v => {
switch (v.type) {
case 'video': return `
📌 *${v.title}* (${v.url})
⌚ Duracion: ${v.durationH}
⏲️ Publicado ${v.publishedTime}
👁️ ${v.view} vistas
`.trim()
case 'channel': return `
📌 *${v.channelName}* (${v.url})
🧑‍🤝‍🧑 _${v.subscriberH} suscriptores_
🎥 ${v.videoCount} videos
`//.trim()
}
}).filter(v => v).join('\n\n========================\n\n')
await conn.sendMessage(m.chat, { image: { url: imagennnnn }, caption: teks }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})  
} catch (e) {
    console.log(e)
/*let get_result = await fetchJson(`https://api.lolhuman.xyz/api/ytsearch?apikey=${lolkeysapi}&query=${text}`)
let get_result2 = get_result.result
let ini_txt = ""
for (var x of get_result2) {
ini_txt += `📌 *${x.title}* (https://www.youtube.com/watch?v=${x.videoId})\n`
ini_txt += `👁️ Vistas ${x.views}\n`
ini_txt += `⏲️ Publicado: ${x.published}`
ini_txt += `\n\n========================\n\n`
}
await conn.sendMessage(m.chat, { image: { url: get_result2[0].thumbnail }, caption: ini_txt }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})  */
}
}   
handler.help = ['', 'earch'].map(v => 'yts' + v + ' <pencarian>')
handler.tags = ['tools']
handler.command = /^yts(earch)?$/i
export default handler
async function fetchJson(url, options) {
try {
options ? options : {}
const res = await axios({ method: 'GET', url: url, headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'}, ...options })
return res.data
} catch (err) {
return err
}}
