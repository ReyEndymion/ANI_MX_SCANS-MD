let handler = async (m, {conn, args, usedPrefix, command, db, userdb, senderJid}) => {
if (!args[0]) return conn.sendWritingText(m.chat, `*[❗] EJEMPLO DE USO DEL COMANDO ${usedPrefix + command} Anya Forger*`, userdb, m)
const fetch = await import('node-fetch')
const { sticker } = await import('../../lib/sticker.js')
try {
let res = await fetch(`https://api.xteam.xyz/sticker/stickerly?q=${args[0]}&APIKEY=5bd33b276d41d6b4`)
let json = await res.json()
for (let data of (json.result.stickerlist || json)) {
const stikers = await sticker(false, data, info.kom, info.gitAuthor)
conn.sendFile(m.chat, stikers, 'sticker.webp', '', m, { asSticker: true })}
//await delay(1500)
} catch { 
try {
let res2 = await fetch(`https://api.xteam.xyz/sticker/stickerly?q=${args[0]}&APIKEY=HIRO`)
let json2 = await res2.json()
for (let data2 of (json2.result.stickerlist || json2)) {
const stikers2 = await sticker(false, data2, info.kom, info.gitAuthor)
conn.sendFile(m.chat, stikers2, 'sticker.webp', '', m, { asSticker: true })}
//await delay(1500)
} catch { 
return conn.sendWritingText(m.chat, `*[❗] ERROR, POR FAVOR VUELVA A INTENTARLO*`, m)
}}}
handler.command = /^stickerly$/i
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
//const delay = time => new Promise(res => setTimeout(res, time))
