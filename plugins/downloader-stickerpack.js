/* By https://github.com/ALBERTO9883/NyanCatBot-MD */
let handler = async (m, {conn, text, usedPrefix, command, db, userdb, senderJid}) => {
const fetch = await import('node-fetch')
const { sticker } = await import('../../lib/sticker.js')
if (!text) return conn.sendWritingText(m.chat, `*[❗] EJEMPLO DE USO DEL COMANDO ${usedPrefix + command}* https://getstickerpack.com/stickers/flork-memes-4-1`, userdb, m)
try {
let url = text
let res = await fetch(`https://api.akuari.my.id/downloader/stickerpack?link=${url}`)
let json = await res.json()
for (let data of (json.result || json)) {
const stikers = await sticker(false, data, info.kom, info.gitAuthor)
conn.sendFile(m.chat, stikers, null, { asSticker: true }, m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': true }}, { quoted: m })
//await delay(1500)
}
} catch { 
return conn.sendWritingText(m.chat, `*[❗] ERROR, POR FAVOR VUELVA A INTERNTARLO*`, m)
}}
handler.command = /^stickerpack$/i
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
//const delay = time => new Promise(res => setTimeout(res, time))
