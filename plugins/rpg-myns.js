import { createHash } from 'crypto'
let handler = async function (m, { conn, text, usedPrefix , userdb, senderJid}) {
let sn = createHash('md5').update(senderJid).digest('hex')
let resp = `┏┅ ━━━━━━━━━━━━ ┅ ━
┃ *NUMERO DE SERIE:* 
┃ ${sn}
┗┅ ━━━━━━━━━━━━ ┅ ━`
return conn.sendWritingText(m.chat, resp, userdb, m);
}
handler.help = ['myns']
handler.tags = ['xp']
handler.command = /^(myns|ceksn)$/i
handler.register = true
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
