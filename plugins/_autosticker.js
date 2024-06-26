import { sticker } from '../lib/sticker.js'

export async function before (m, {conn}) {
let bot = global.db.data.bot[conn.user.jid]
let chats = bot.chats || {}
let privs = chats.privs || {}
let groups = chats.groups || {}
let chat = m.isGroup ? groups[m.chat] || {} : privs[m.chat] || {}
let users = m.isGroup ? chat.users || {} : privs || {}
let user = m.isGroup ? users[m.sender] || {} : privs[m.sender] || {}

if (chat.autosticker && m.isGroup) {
let q = m
let stiker = false
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/webp/g.test(mime)) return
if (/image/g.test(mime)) {
let img = await q.download?.()
if (!img) return
stiker = await sticker(img, false, gt, author)
} else if (/video/g.test(mime)) {
if (/video/g.test(mime)) if ((q.msg || q).seconds > 8) { 
let resp = `*[❗${wm} INFO❗] EL VIDEO NO PUEDE DURAR MAS DE 7 SEGUNDOS*` + '\n' + wm + '\n' + 'DESACTIVAR AUTOSTICKER => #disable autosticker'
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
return await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
let img = await q.download()
if (!img) return
stiker = await sticker(img, false, gt, author)
} else if (m.text.split(/\n| /i)[0]) {
if (isUrl(m.text)) stiker = await sticker(false, m.text.split(/\n| /i)[0], gt, author)
else return
}
if (stiker) {
await this.sendFile(m.chat, stiker, null, { asSticker: true })
}}
return !0
}

const isUrl = (text) => {
return text.match(new RegExp(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png|mp4)/, 'gi'))}
