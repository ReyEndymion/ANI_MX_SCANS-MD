import { googleImage } from '@bochilteam/scraper'
import axios from 'axios'
let handler = async(m, { conn, usedPrefix, command, text }) => {
    const res = await googleImage(command)
    let image = await res.getRandom()
    let url = image
    let captionn = `🔎 *RESULTADO DE:* ${text}\n🔗 *LINK ${url}\n🌎 *BUSCADOR:* Google`
conn.sendButton(m.chat, "*Messi*", wm, url, [['⚽ SIGUIENTE ⚽', `${usedPrefix + command}`]], m)}
handler.help = ['messi']
handler.tags = ['internet']
handler.command = /^(messi)$/i
export default handler
