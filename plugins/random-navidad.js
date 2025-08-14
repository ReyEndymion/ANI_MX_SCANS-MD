import { googleImage } from '../lib/googleImagen.js'
import fetch from 'node-fetch'
import axios from 'axios'
let handler = async(m, {conn, args, usedPrefix, command, db, userdb, senderJid}) => {
let res = await googleImage(command+'meme')
let image = await res.getRandom()
let json = res.data
//let img = json.url
conn.sendMessage(m.chat, {image: {url: image}, caption: `_Navidad 🧑‍🎄_\n\n${info.nanie}`}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}, [['🔄 SIGUIENTE 🔄', `/${command}`]], m)
}
handler.help = ['navidad']
handler.tags = ['internet']
handler.command = /^(navidad)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
