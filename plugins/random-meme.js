import axios from "axios"
import { googleImage } from '@bochilteam/scraper'
let handler = async (m, {command, conn, text}) => {
let imagen, resp 
try {
const res = await googleImage(command)
imagen = await res.getRandom()
resp = `soy random 👺👍🏼`
} catch (e) {
resp = `No se a podido descargar, por favor inténtelo más tarde. El error fue: ${e}`
}
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 1));
txt += c;
count++;
if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
}
}
if (imagen) {
return conn.sendMessage(m.chat, { image: {url: imagen}, caption: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});  
} else {
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
}
handler.help = ['meme']
handler.tags = ['random']
handler.command = /^(meme)$/i
export default handler

function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]}
