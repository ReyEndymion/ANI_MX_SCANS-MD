import path, { join } from 'path'
import fs from 'fs'
const __dirname = global.__dirname(import.meta.url)
let handler = async (m, { conn, isOwner }) => {
let adv = Object.entries(global.db.data.users).filter(user => user[1].warn)
let warns = global.db.data.users.warn
let user = global.db.data.users
let imagewarn = fs.readFileSync(join(dirP, 'src/warn.jpg'))
let caption = `⚠️ USUARIOS ADVERTIDOS\n 
*╔═══════════════════·•*
║ *Total : ${adv.length}\n Usuarios* ${adv ? '\n' + adv.map(([jid, user], i) => `
║
║ 1.- ${isOwner ? '@' + jid.split`@`[0] : jid} *(${user.warn}/3)*\n║\n║ - - - - - - - - -`.trim()).join('\n') : ''}
*╚═══════════════════·•*`
let txt = '';
let count = 0;
for (const c of caption) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;
    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
await conn.sendMessage(m.chat, {image: imagewarn, caption: caption, wm, mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
}
handler.command = /^(listwarn)$/i 
handler.group = true
handler.admin = true
export default handler
