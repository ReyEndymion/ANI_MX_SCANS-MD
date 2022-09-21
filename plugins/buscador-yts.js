import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { text }) => {
if (!text) throw '*[❗INFO❗] INSERTE EL NOMBRE DE ALGUN VIDEO CANAL DE YOUTUBE*'
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
`.trim()
}
}).filter(v => v).join('\n\n========================\n\n')
m.reply(teks)
}
handler.help = ['', 'earch'].map(v => 'yts' + v + ' <pencarian>')
handler.tags = ['tools']
handler.command = /^yts(earch)?$/i
export default handler
