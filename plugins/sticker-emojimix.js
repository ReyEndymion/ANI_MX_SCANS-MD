import MessageType from '@whiskeysockets/baileys'
import fetch from 'node-fetch'
import fs from "fs"
let handler = async (m, {conn, text, args, db, userdb, senderJid}) => {
const fetch = await import('node-fetch')
const { sticker } = await import('../lib/sticker.js')
const { axiosJson, search } = await import('../lib/functions.js')
if (!args[0]) {
let resp = '*[❗INFO❗] EL USO DE ESTE COMANDO DEBE SER #emojimix <emoji 1>&<emoji 2>*\n*EJEMPLO:*\n*#emojimix 🤨&😣*'
return conn.sendWritingText(m.chat, resp, userdb, m)
}
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
handler.menu = [
{title: "🧩 EMOJIMIX", description: `Crea stickers con emojis`, id: `emojimix`},
];
handler.type = "stickermenu";
handler.disabled = false;

export default handler
