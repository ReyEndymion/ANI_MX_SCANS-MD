const free = 5000
const prem = 20000
import {msToTime} from '../lib/functions.js'
let handler = async (m, {conn, isPrems, userdb, db, senderJid}) => {
let time = userdb.lastclaim + 86400000
if (new Date - userdb.lastclaim < 86400000) {
let resp =`🎁 *Ya recogiste tu recompensa diaria*\n\n🕚 Vuelve en *${msToTime(time - new Date())}* `
return conn.sendWritingText(m.chat, resp, m );

}
userdb.exp += isPrems ? prem : free
let resp = `
🎁 *RECOMPENSA DIARIA*
▢ *Has recibido:*
🆙 *XP* : +${isPrems ? prem : free}`
return conn.sendWritingText(m.chat, resp, m );

userdb.lastclaim = new Date * 1
}
handler.help = ['daily']
handler.tags = ['xp']
handler.command = ['daily', 'claim'] 


handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
