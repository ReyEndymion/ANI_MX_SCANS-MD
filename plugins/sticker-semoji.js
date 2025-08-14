
let handler = async (m, {conn, start, info, args, usedPrefix, command, isPrems, db, userdb, senderJid}) => {
const fetch = await import('node-fetch')
const {default: emoji} = await import('emoji-api')
const { sticker } = await import('../lib/sticker.js')
const { axiosJson } = await import('../lib/functions.js')
const { owner, temp, newsletterID, sBroadCastID, groupID, media } = await import('../config.js')
//const emoji = new EmojiAPI()
let er = `
*[❗] EL USO CORRECTO DE ESTE COMANDO ES*
*◉ ${usedPrefix + command} <tipo> <emoji>*

*—◉ EJEMPLO:*
*◉ ${usedPrefix + command}* fa 😎

*—◉ TIPOS* 

*◉ wha = whatsapp* 
*◉ ap = apple*
*◉ fa = facebook*
*◉ ig = Instagram*
*◉ go = google*
*◉ ht = htc*
*◉ mi = microsoft*
*◉ mo = mozilla*
*◉ op = openmoji*
*◉ pi = pixel*
*◉ sa = samsung*
*◉ tw = twitter*

*—◉ SOLO USAR UN EMOJI Y RESPETE LOS ESPACIOS*`

if (!args[0]) throw er
let template = (args[0] || '').toLowerCase()
if (!args[1]) throw er
if (/emo/i.test(command)) {
try {
switch (template) {
case 'apple':
case 'ip':
case 'ap':
emoji.get(`${args[1]}`)
.then(async emoji => {
let stiker = await sticker(false, emoji.images[0].url, info.kom, info.gitAuthor)
conn.sendFile(m.chat, stiker, null, { asSticker: true }, m)
})
break
case 'facebook':
case 'fb':
case 'fa':
emoji.get(`${args[1]}`)
.then(async emoji => {
let stiker = await sticker(false, emoji.images[6].url, info.kom, info.gitAuthor)
conn.sendFile(m.chat, stiker, null, { asSticker: true }, m)
})
break
case 'google':
case 'go':
emoji.get(`${args[1]}`)
.then(async emoji => {
let stiker = await sticker(false, emoji.images[1].url, info.kom, info.gitAuthor)
conn.sendFile(m.chat, stiker, null, { asSticker: true }, m)
})
break
case 'htc':
case 'ht':
emoji.get(`${args[1]}`)
.then(async emoji => {
let stiker = await sticker(false, emoji.images[12].url, info.kom, info.gitAuthor)
conn.sendFile(m.chat, stiker, null, { asSticker: true }, m)
})
break
case 'lg':
case 'ig':
case 'instagram':
emoji.get(`${args[1]}`)
.then(async emoji => {
let stiker = await sticker(false, emoji.images[11].url, info.kom, info.gitAuthor)
conn.sendFile(m.chat, stiker, null, { asSticker: true }, m)
})
break
case 'microsoft':
case 'mc':
case 'mi':
emoji.get(`${args[1]}`)
.then(async emoji => {
let stiker = await sticker(false, emoji.images[3].url, info.kom, info.gitAuthor)
conn.sendFile(m.chat, stiker, null, { asSticker: true }, m)
})
break
case 'mozilla':
case 'moz':
case 'mo':
emoji.get(`${args[1]}`)
.then(async emoji => {
let stiker = await sticker(false, emoji.images[13].url, info.kom, info.gitAuthor)
conn.sendFile(m.chat, stiker, null, { asSticker: true }, m)
})
break
case 'openmoji':
case 'omoji':
case 'op':
emoji.get(`${args[1]}`)
.then(async emoji => {
let stiker = await sticker(false, emoji.images[8].url, info.kom, info.gitAuthor)
conn.sendFile(m.chat, stiker, null, { asSticker: true }, m)
})
break
case 'pixel':
case 'pi':
emoji.get(`${args[1]}`)
.then(async emoji => {
let stiker = await sticker(false, emoji.images[7].url, info.kom, info.gitAuthor)
conn.sendFile(m.chat, stiker, null, { asSticker: true }, m)
})
break
case 'samsung':
case 'sa':
emoji.get(`${args[1]}`)
.then(async emoji => {
let stiker = await sticker(false, emoji.images[2].url, info.kom, info.gitAuthor)
conn.sendFile(m.chat, stiker, null, { asSticker: true }, m)
})
break
case 'twitter':
case 'tw':
emoji.get(`${args[1]}`)
.then(async emoji => {
let stiker = await sticker(false, emoji.images[5].url, info.kom, info.gitAuthor)
conn.sendFile(m.chat, stiker, null, { asSticker: true }, m)
})
break
case 'whatsapp':
case 'wa':
case 'wh':
case 'wha':
emoji.get(`${args[1]}`)
.then(async emoji => {
let stiker = await sticker(null, emoji.images[4].url, info.kom, info.gitAuthor)
conn.sendFile(m.chat, stiker, null, { asSticker: true }, m)
})
break
}
} catch (e) {
throw er
}}}
handler.help = ['emoji <tipo> <emoji>']
handler.tags = ['sticker'] 
handler.command = ['emoji', 'smoji', 'semoji']
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
