import { googleImage } from '@bochilteam/scraper'
import axios from "axios"
let handler = async(m, { conn, usedPrefix, command }) => {
const res = await googleImage(command)
let image = await res.getRandom()
let link = image
let captionn = `🔎 *RESULTADO DE:* ${text}\n🔗 *LINK ${link}\n🌎 *BUSCADOR:* Google`
conn.sendButton(m.chat, "*Siiiuuuuuu*", wm,  link, [['⚽ SIGUIENTE ⚽', `${usedPrefix + command}`]], m)}
handler.help = ['cristianoronaldo']
handler.tags = ['internet']
handler.command = /^(cristianoronaldo)$/i
export default handler
