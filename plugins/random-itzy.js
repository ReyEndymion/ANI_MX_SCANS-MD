import { googleImage } from '../lib/googlePictures.js'
import fetch from 'node-fetch'
import axios from 'axios'
let handler = async(m, {conn, args, usedPrefix, command, db, userdb, senderJid}) => {
let res = await googleImage(command + 'meme')
let img = await res.getRandom()
conn.sendMessage(m.chat, {image: {url: img}, caption: `_${command}_\n\n${info.nanie}`}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}, [['🔄 SIGUIENTE 🔄', `/${command}`]], m)
}
handler.help = ['itzy','kpopitzy']
handler.tags = ['internet']
handler.command = /^(itzy|kpopitzy)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
