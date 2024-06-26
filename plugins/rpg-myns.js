import { createHash } from 'crypto'
let handler = async function (m, { conn, text, usedPrefix }) {
let sn = createHash('md5').update(m.sender).digest('hex')
let resp = `┏┅ ━━━━━━━━━━━━ ┅ ━
┃ *NUMERO DE SERIE:* 
┃ ${sn}
┗┅ ━━━━━━━━━━━━ ┅ ━`
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 1));
txt += c;
count++;
if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
}
}
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
handler.help = ['myns']
handler.tags = ['xp']
handler.command = /^(myns|ceksn)$/i
handler.register = true
export default handler
