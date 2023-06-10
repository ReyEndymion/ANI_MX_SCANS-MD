import { googleImage } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `*[❗INFO❗] EJEMPLO DE USO DEL COMANDO ${usedPrefix + command} Minecraft*`
const res = await googleImage(text)
let image = await res.getRandom()
let link = image
let captionn = `🔎 *RESULTADO DE:* ${text}\n🔗 *LINK ${link}\n🌎 *BUSCADOR:* Google\n\nPara 🔄 SIGUIENTE 🔄 usa: *${usedPrefix}imagen ${text}*`
conn.sendMessage(m.chat, { image:{url: image}, caption: captionn}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}, wm , link, m)}
handler.help = ['gimage <query>', 'imagen <query>']
handler.tags = ['internet', 'tools']
handler.command = /^(gimage|image|imagen)$/i
export default handler
