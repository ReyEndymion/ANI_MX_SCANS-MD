export async function before(m, {conn, info, db, chatdb}) {
const { owner, temp, newsletterID, sBroadCastID, groupID, media } = await import('../config.js');
const { sticker } = await import('../lib/sticker.js')
const { isUrl } = await import('../lib/functions.js')
if (chatdb.autosticker && m.isGroup) {
let q = m
let stiker = false
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/webp/g.test(mime)) return
if (/image/g.test(mime)) {
let img = await q.download?.()
if (!img) return
stiker = await sticker(img, false, info.nanip, info.gitAuthor)
} else if (/video/g.test(mime)) {
if (/video/g.test(mime)) if ((q.msg || q).seconds > 8) { 
let resp = `*[❗${info.nanipe} INFO❗] EL VIDEO NO PUEDE DURAR MAS DE 7 SEGUNDOS*` + '\n' + info.nanipe + '\n' + 'DESACTIVAR AUTOSTICKER => #disable autosticker'
return conn.sendWritingText(m.chat, resp, userdb, m);
}
let img = await q.download()
if (!img) return
stiker = await sticker(img, false, info.nanip, info.gitAuthor)
} else if (m.text.split(/\n| /i)[0]) {
if (isUrl(m.text)) stiker = await sticker(false, m.text.split(/\n| /i)[0], info.nanip, info.gitAuthor)
else return
}
if (stiker) {
await this.sendFile(m.chat, stiker, null, { asSticker: true })
}
}
}

