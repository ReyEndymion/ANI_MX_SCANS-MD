import { wallpaper } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `*[❗INFO❗] EJEMPLO DE USO DEL COMANDO ${usedPrefix + command} Minecraft*`
const res = await (/2/.test(command) ? wallpaper : wallpaper)(text)
const img = res[Math.floor(Math.random() * res.length)]
conn.sendFile(m.chat, img, 'error.jpg', `*RESULTADO DE ${text}*`, m)
}
handler.help = ['', '2'].map(v => 'wallpaper' + v + ' <query>')
handler.tags = ['downloader']
handler.command = /^(wallpaper2?)$/i
export default handler
