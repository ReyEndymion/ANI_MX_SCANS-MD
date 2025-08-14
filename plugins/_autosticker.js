export async function before (m, {conn, chatdb, db}) {
const { owner, info, temp, newsletterID, sBroadCastID, groupID, media  } = await import('../config.js');
const {  sticker  } = await import('../lib/sticker.js');

if (chatdb.autosticker && m.isGroup) {
let q = m
let stiker = false
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/webp/g.test(mime)) return
if (/image/g.test(mime)) {
let img = await q.download?.()
if (!img) return
stiker = await sticker(img, false, info.kom, author)
} else if (/video/g.test(mime)) {
if (/video/g.test(mime)) if ((q.msg || q).seconds > 8) { 
let resp = `*[❗${info.nanie} INFO❗] EL VIDEO NO PUEDE DURAR MAS DE 7 SEGUNDOS*` + '\n' + info.nanie + '\n' + 'DESACTIVAR AUTOSTICKER => #disable autosticker'
return conn.sendWritingText(m.chat, resp, userdb, m);
}
let img = await q.download()
if (!img) return
stiker = await sticker(img, false, info.kom, author)
} else if (m.text.split(/\n| /i)[0]) {
if (isUrl(m.text)) stiker = await sticker(false, m.text.split(/\n| /i)[0], info.kom, author)
else return
}
if (stiker) {
await this.sendFile(m.chat, stiker, null, { asSticker: true })
}
}
}

const isUrl = (text) => {
return text.match(new RegExp(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png|mp4)/, 'gi'))}
