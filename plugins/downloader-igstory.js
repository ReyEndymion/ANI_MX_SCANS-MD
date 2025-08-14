/* CREDITOS A https://github.com/FG98F */
import axios from 'axios'
import hx from 'hxz-api' 
let handler = async (m, {conn, args, usedPrefix, command, text, db, userdb, senderJid}) => {
if (!text) return conn.sendWritingText(m.chat, `*[❗INFO❗] INGRESE EL NOMBRE DE UN USUARIO DE INSTAGRAM*\n\n*EJEMPLO:*\n*${usedPrefix + command} luisitocomunica*`, userdb, m)
hx.igstory(text).then(async (result) => {
for (let i of result.medias) {
if (i.url.includes("mp4")) {
conn.sendFile(m.chat, i.url, 'igstory.mp4', null, m)
} else { 
conn.sendFile(m.chat, i.url, '', '', m)
}}});
}
handler.help = ['igstory <username>']
handler.tags = ['downloader']
handler.command = ['igstory', 'ighistoria' ]
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
