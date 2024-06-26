import { sticker } from '../lib/sticker.js'
import MessageType from '@whiskeysockets/baileys'
import fetch from 'node-fetch'
import fs from "fs"
let handler = async (m, { conn, text, args }) => {
if (!args[0]) {
    let resp = '*[❗INFO❗] EL USO DE ESTE COMANDO DEBE SER #emojimix <emoji 1>&<emoji 2>*\n*EJEMPLO:*\n*#emojimix 🤨&😣*'
    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;
    if (count % 10 === 0) {
       await conn.sendPresenceUpdate('composing' , m.chat);
    }
    }
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
let [emoji1, emoji2] = text.split`&`
let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
for (let res of anu.results) {
let stiker = await sticker(false, res.url, global.gt, global.author)
//conn.sendFile(m.chat, stiker, null, { asSticker: true })
conn.sendMessage(m.chat, {sticker: stiker,  mimetype: 'image/webp', asSticker: true}, { quoted: m, ephemeralExpiration: 2*60*1000 });
}
}
handler.help = ['emojimix'].map(v => v + ' emot1|emot2>')
handler.tags = ['fun']
handler.command = /^(emojimix)$/i
export default handler
const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
fetch(url, options)
.then(response => response.json())
.then(json => {
resolve(json)
})
.catch((err) => {
reject(err)
})})
