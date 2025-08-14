import { googleImage } from '../lib/googleImagen.js'
import axios from "axios"
let handler = async(m, {conn, usedPrefix, command, text, db, userdb, senderJid}) => {
const res = await googleImage(command)
let image = await res.getRandom()
let link = image
let captionn = `🔎 *RESULTADO DE:* ${text}\n🔗 *LINK ${link}\n🌎 *BUSCADOR:* Google`
conn.sendMessage(m.chat, {image: {url: link}, caption: "*Siiiuuuuuu*" + captionn}, info.nanie, [['⚽ SIGUIENTE ⚽', `${usedPrefix + command}`]], m)
}
handler.help = ['cristianoronaldo']
handler.tags = ['internet']
handler.command = /^(cristianoronaldo)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
