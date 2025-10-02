import { googleImage } from '../lib/googleMedia.js'
import axios from "axios"
let handler = async (m, {command, conn, text, usedPrefix, chatdb, db, userdb, senderJid}) => {
let resp = '', imagen = ''
if (!chatdb.modohorny && m.isGroup) {
resp = `*[❗INFO❗] LOS COMANDOS +18 ESTAN DESACTIVADOS EN ESTE GRUPO, SI ES ADMIN Y DESEA ACTIVARLOS USE EL COMANDO ${usedPrefix}enable modohorny*`
} else { 
const res = await googleImage(command)
let image = await res.getRandom()
let nsfw = `🔎 *RESULTADO DE:* ${text}\n🔗 *LINK ${image}\n🌎 *BUSCADOR:* Google`
if (command == 'nsfwloli') {
imagen = image
resp = nsfw
}
if (command == 'nsfwfoot') {
imagen = image
resp = nsfw
}
if (command == 'nsfwass') {
imagen = image
resp = nsfw
}
if (command == 'nsfwbdsm') {
imagen = image
resp = nsfw
}
if (command == 'nsfwcum') {
imagen = image
resp = nsfw
}
if (command == 'nsfwero') {
imagen = image
resp = nsfw
}
if (command == 'nsfwfemdom') {
imagen = image
resp = nsfw
}
if (command == 'nsfwglass') {
imagen = image
resp = nsfw
}
if (command == 'hentai') {
imagen = image
resp = nsfw
}
if (command == 'nsfworgy') {
imagen = image
resp = nsfw
}
if (command == 'tetas') {
imagen = image
resp = nsfw
}
if (command == 'booty') {
imagen = image
resp = nsfw
}
if (command == 'ecchi') {
imagen = image
resp = nsfw
}
if (command == 'furro') {
imagen = image
resp = nsfw
}
if (command == 'trapito') {
imagen = image
resp = nsfw
}
if (command == 'imagenlesbians') {
imagen = image
resp = nsfw
}
if (command == 'panties') {
imagen = image
resp = nsfw
}
if (command == 'pene') {
imagen = image
resp = nsfw
}
if (command == 'porno') {
imagen = image
resp = nsfw
}
if (command == 'randomxxx') {
imagen = image
resp = nsfw
}
if (command == 'pechos') {
imagen = image
resp = nsfw
}
if (command == 'yaoi') {
imagen = image
resp = nsfw
}
if (command == 'yaoi2') {
imagen = image
resp = nsfw
}
if (command == 'yuri') { 
imagen = image
resp = nsfw
}
if (command == 'yuri2') {
imagen = image
resp = nsfw
}
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 1));
txt += c;
count++;
if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);}}
if (resp && imagen) {//await conn.sendFile (m.chat, imagen, null, txt.trim(), m, null, {viewOnce: true})
return conn.sendMessage(m.chat, {image:{url: image}, caption: txt.trim(), mentions: conn.parseMention(txt), viewOnce: true}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
} else {
return conn.sendWritingText(m.chat, resp, userdb, m)
}
}
}
handler.help = ['nsfwloli', 'nsfwfoot', 'nsfwass', 'nsfwbdsm', 'nsfwcum', 'nsfwero', 'nsfwfemdom', 'nsfwfoot', 'nsfwglss', 'nsfworgy', 'yuri', 'yuri2', 'yaoi', 'yaoi2', 'panties', 'tetas', 'booty', 'ecchi', 'furro', 'hentai', 'trapito', 'imagenlesbians', 'pene', 'porno', 'randomxxx', 'pechos']
handler.command = /^(nsfw(loli|foot|ass|bdsm|cum|ero|femdom|glss|orgy)|yuri|yuri2|yaoi|yaoi2|panties|tetas|booty|ecchi|furro|hentai|trapito|imagenlesbians|pene|porno|randomxxx|pechos)$/
handler.tags = ['nsfw']
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
