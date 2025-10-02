import { xpRange } from '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'
import fs, { promises } from 'fs'
import { join } from 'path'
let handler = async (m, {conn, info, start, usedPrefix, command, args, usedPrefix: _p, pluginsPath, isOwner, isAdmin, isROwner, db, userdb, senderJid, objs}) => {
const {multiplier} = await import('../lib/constants.js')
const {imagen2} = objs

const { levelling } = '../lib/levelling.js'

let { exp, limit, level, role } = userdb
let { min, xp, max } = xpRange(level, multiplier)

let usertag = `@${senderJid.split('@')[0]}`

userdb.registered = false

let text = `
╭━━━〔 RANGOS 〕━━━⬣
NOMBRE
${usertag}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
TU  RANGO ACTUAL
${role}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
👑 *∞ ÉLITE GLOBAL I* 💎🏁
👑 *∞ ÉLITE GLOBAL II* 💎🏁
👑 *∞ ÉLITE GLOBAL III* 💎🏁
👑 *∞ ÉLITE GLOBAL IV* 💎🏁
👑 *∞ ÉLITE GLOBAL V* 💎🏁
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
👑 *ÉLITE GLOBAL I* 🏁
👑 *ÉLITE GLOBAL II* 🏁
👑 *ÉLITE GLOBAL III* 🏁
👑 *ÉLITE GLOBAL IV* 🏁
👑 *ÉLITE GLOBAL V* 🏁
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*TOP ASTRAL I* ⚜️🔱
*TOP ASTRAL II* ⚜️🔱
*TOP ASTRAL III* ⚜️🔱
*TOP ASTRAL IV* ⚜️🔱
*TOP ASTRAL V* ⚜️🔱
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*ESTELAR I* ☄️
*ESTELAR II* ☄️
*ESTELAR III* ☄️
*ESTELAR IV* ☄️
*ESTELAR V* ☄️
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*LEYENDA I* 🏆
*LEYENDA II* 🏆
*LEYENDA III* 🏆
*LEYENDA IV* 🏆
*LEYENDA V* 🏆
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*LEGENDARIO(A) I* 🛡️
*LEGENDARIO(A) II* 🛡️
*LEGENDARIO(A) III* 🛡️
*LEGENDARIO(A) IV* 🛡️
*LEGENDARIO(A) V* 🛡️
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*SUPER PRO I* 🎩
*SUPER PRO II* 🎩
*SUPER PRO III* 🎩
*SUPER PRO IV* 🎩
*SUPER PRO V* 🎩
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*PRO EN ${info.nanipe} I* ${info.amsicon.getRandom()}
*PRO EN ${info.nanipe} II* ${info.amsicon.getRandom()}
*PRO EN ${info.nanipe} III* ${info.amsicon.getRandom()}
*PRO EN ${info.nanipe} IV* ${info.amsicon.getRandom()}
*PRO EN ${info.nanipe} V* ${info.amsicon.getRandom()}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*DIAMANTE I* 💎
*DIAMANTE II* 💎
*DIAMANTE III* 💎
*DIAMANTE IV* 💎
*DIAMANTE V* 💎
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*ORO I* 🏅
*ORO II* 🏅
*ORO III* 🏅
*ORO IV* 🏅
*ORO V* 🏅
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*PLATA I* 🔮
*PLATA II* 🔮
*PLATA III* 🔮
*PLATA IV* 🔮
*PLATA V* 🔮
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*IRON I* 🦾
*IRON II* 🦾
*IRON III* 🦾
*IRON IV* 🦾
*IRON V* 🦾
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*MAESTRO(A) I* ⚒️
*MAESTRO(A) II* ⚒️
*MAESTRO(A) III* ⚒️
*MAESTRO(A) IV* ⚒️
*MAESTRO(A) V* ⚒️
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*EXPLORADOR(A) I* 🪓
*EXPLORADOR(A) II* 🪓
*EXPLORADOR(A) III* 🪓
*EXPLORADOR(A) IV* 🪓
*EXPLORADOR(A) V* 🪓
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*APRENDIS I* 🪚
*APRENDIS II* 🪚
*APRENDIS III* 🪚
*APRENDIS IV* 🪚
*APRENDIS V* 🪚
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*NOVATO(A) I* 🪤
*NOVATO(A) II* 🪤
*NOVATO(A) III* 🪤
*NOVATO(A) IV* 🪤
*NOVATO(A) V* 🪤
╰━━━━━━━━━━━━━━━━━━━⬣
Tops 🏆: ${usedPrefix}top
`.trim()


let contextInfo = {  
mentionedJid: conn.parseMention(text),  
"externalAdReply": {  
"containsAutoReply": true,
"renderLargerThumbnail": true,  
"title": info.nanie,   
"containsAutoReply": true,  
"mediaType": 2,   
"thumbnail": fs.readFileSync(imagen2),//apii.res.url,  
"mediaUrl": `https://api.whatsapp.com/send/?phone=5215625406730&text=.serbot&type=phone_number&app_absent=0`,  
"sourceUrl": `https://api.whatsapp.com/send/?phone=5215625406730&text=.serbot&type=phone_number&app_absent=0`  
}  
}  

const footer = `\n> ${info.nanie}`
const buttons = [['Menú RPG 💫', `${usedPrefix}rpg`], ['Tops 🏆', `${usedPrefix}top`], ['Menu Principal ⚡', `${usedPrefix}menu`]]
if (start.buttons) {
return conn.sendButton(m.chat, {text, footer}, {url: imagen2, contextInfo}, buttons, userdb, m)  
} else {
return conn.sendWritingTextCI(m.chat, `${text+footer}`, contextInfo, userdb, m)
}
}
handler.help = ['infomenu'].map(v => v + 'able <option>')
handler.tags = ['group', 'owner']
handler.command = /^(rol|rango|roles|rangos)$/i
handler.register = true
handler.exp = 50
handler.menu = [
{title: "🎭 ROLES | RANGOS", description: `Consulta los roles o rangos del bot, usa el comando #rol`, id: `rol`},
];
handler.type = "rpg";
handler.disabled = false;

export default handler

