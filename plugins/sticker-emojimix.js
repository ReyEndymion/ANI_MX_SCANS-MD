import MessageType from '@whiskeysockets/baileys'
import fs from "fs"
let handler = async (m, {conn, text, args, db, userdb, senderJid}) => {
if (!args[0]) {
let resp = '*[❗INFO❗] EL USO DE ESTE COMANDO DEBE SER #emojimix <emoji 1>&<emoji 2>*\n*EJEMPLO:*\n*#emojimix 🤨&😣*'
return conn.sendWritingText(m.chat, resp, userdb, m)
}
const fetch = await import('node-fetch')
const { sticker } = await import('../lib/sticker.js')
const { axiosJson } = await import('../lib/functions.js')
let [emoji1, emoji2] = text.split`&`
let anu = await axiosJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
for (let res of anu.results) {
let stiker = await sticker(false, res.url, info.kom, info.gitAuthor)
//conn.sendFile(m.chat, stiker, null, { asSticker: true })
conn.sendMessage(m.chat, {sticker: stiker, mimetype: 'image/webp', asSticker: true}, { quoted: m, ephemeralExpiration: 2*60*1000 });
}
}
handler.help = ['emojimix'].map(v => v + ' emot1|emot2>')
handler.tags = ['fun']
handler.command = /^(emojimix)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
