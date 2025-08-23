import axios from "axios"
import { googleImage } from '../lib/googlePictures.js'
let handler = async (m, {command, conn, text, db, userdb, senderJid}) => {
let imagen, resp 
try {
const res = await googleImage(command)
imagen = await res.getRandom()
resp = `soy random 👺👍🏼`
} catch (e) {
resp = `No se a podido descargar, por favor inténtelo más tarde. El error fue: ${e}`
}

if (imagen) {
return conn.sendMessage(m.chat, { image: {url: imagen}, caption: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}); 
} else {
return conn.sendWritingText(m.chat, resp, userdb, m)
}
}
handler.help = ['meme']
handler.tags = ['random']
handler.command = /^(meme)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler

function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]}
