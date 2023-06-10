import { googleImage } from '@bochilteam/scraper'
import fetch from 'node-fetch'
import axios from 'axios'
let handler = async(m, { conn, args, usedPrefix, command }) => {
let res = await googleImage(command + 'meme')
let img = await res.getRandom()
conn.sendMessage(m.chat, {image: {url: img}, caption: `_${command}_\n\n${wm}`}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}, [['🔄 SIGUIENTE 🔄', `/${command}`]], m)
}
handler.help = ['itzy','kpopitzy']
handler.tags = ['internet']
handler.command = /^(itzy|kpopitzy)$/i
export default handler
