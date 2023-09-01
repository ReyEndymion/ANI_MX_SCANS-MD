import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
let stiker = false
try {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/webp|image|video/g.test(mime)) {
if (/video/g.test(mime)) if ((q.msg || q).seconds > 8) return m.reply('*[❗INFO❗] EL VIDEO NO PUEDE DURAR MÁS DE 7 SEGUNDOS*')
let img = await q.download?.()

if (!img) { 
    let resp = `*[❗INFO❗] RESPONDE A UN VIDEO, IMAGEN O INSERTE EL ENLACE DE UNA IMAGEN TERMINACIÓN .jpg EL CUAL SERÁ CONVERTIDO EN STICKER, DEBE RESPONDER O USAR EL COMANDO ${usedPrefix + command}*`
    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;

    if (count % 10 === 0) {
    conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} ) 
}
let out
try {
stiker = await sticker(img, false, global.packname, global.author)
} catch (e) {
console.error(e)
} finally {
if (!stiker) {
if (/webp/g.test(mime)){ out = await webp2png(img)
}else if (/image/g.test(mime)){ out = await uploadImage(img)
}else if (/video/g.test(mime)){ out = await uploadFile(img)}
if (typeof out !== 'string'){ out = await uploadImage(img)}
stiker = await sticker(false, out, global.packname, global.author)
}}
} else if (args[0]) {
if (isUrl(args[0])){ stiker = await sticker(false, args[0], global.packname, global.author)
} else {
let resp ='*[❗INFO❗] EL ENLACE/URL/ LINK NO ES VALIDA, LA TERMINACION DEL ENLACE/URL/ LINK DEBE SER .jpg, EJEMPLO: #s https://telegra.ph/file/0dc687c61410765e98de2.jpg*'
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 15));
txt += c;
count++;

if (count % 10 === 0) {
conn.sendPresenceUpdate('composing' , m.chat);
}
}
await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} ) 
}  
}
} catch (e) {
console.error(e)
if (!stiker) stiker = e
} finally {
if (stiker) {
    conn.sendMessage(m.chat, {sticker: {url: stiker}? stiker : {url: stiker},  mimetype: 'image/webp', asSticker: true}, { quoted: m, ephemeralExpiration: 24 * 60 * 1000 });
} else {
let resp =  '*[❗INFO❗] LO SIENTO, OCURRIÓ UN ERROR, VUELVA A INTENTARLO. NO OLVIDE RESPONDER A UN VIDEO, IMAGEN O INSERTE EL ENLACE DE UNA IMAGEN TERMINACIÓN .jpg EN EL CUAL SERÁ CONVERTIDO EN STICKER*'
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 15));
txt += c;
count++;

if (count % 10 === 0) {
conn.sendPresenceUpdate('composing' , m.chat);
}
}
await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} ) 
}
}}
handler.help = ['stiker (caption|reply media)', 'stiker <url>', 'stikergif (caption|reply media)', 'stikergif <url>']
handler.tags = ['sticker']
handler.command = /^s(tic?ker)?(gif)?(wm)?$/i
export default handler

const isUrl = (text) => {
return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))}
