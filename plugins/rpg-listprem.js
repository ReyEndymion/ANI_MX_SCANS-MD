import { owner, temp, newsletterID, sBroadCastID, groupID, media} from '../config.js'
let handler = async (m, {conn, start, info, args, usedPrefix, chatdb, usersdb, userdb, db, senderJid}) => {
let usuario = userdb.premiumTime
let user = Object.entries(usersdb).filter(user => user[1].premiumTime).map(([key, value]) => {
return { ...value, jid: key }
})
let name = '🎟️ PREMIUM'
let premTime = userdb.premiumTime
let prem = userdb.premium
let waktu = clockString(`${premTime - new Date() * 1} `)
let sortedP = user.map(toNumber('premiumTime')).sort(sort('premiumTime'))
let len = args[0] && args[0].length > 0 ? Math.min(100, Math.max(parseInt(args[0]), 10)) : Math.min(10, sortedP.length)
const resp = `${htki} *🎟️ PREMIUM 🎟️* ${htka}

*╭ ༻✦༺ PREMIUM INFO ༻✦༺*
*┃✢ NOMBRE*\n*┃✢* ${conn.getName(senderJid)}
${prem ? `${clockString (usuario - new Date() * 1)}` : '┃✢ *TIEMPO PREMIUM*\n┃🚫 CADUCADO'}
*╰•·–––––––––––––––·•*

╭•·–––––––––––––––·•
🌟 USUARIOS PREMIUM
╰•·–––––––––––––––·•${sortedP.slice(0, len).map(({ jid, name, premiumTime, prem, registered }, i) => `\n\n╭–✦ ${registered ? name : conn.getName(jid)}\n┃• wa.me/${jid.split`@`[0]}\n${premiumTime > 0 ? `${clockString (premiumTime - new Date() * 1)}` : '┃🚫 CADUCADO'}`).join`\n╰–––––––––––·•`}
╰–––––––––––·•`.trim()
const buff = `🎟️ PREMIUM ⇢ ${prem ? '✅' : '❌'}\n${info.nanie}`
const buttons = [[`${prem ? '✦ DISFRUTAR PREMIUM ✦': '✦ COMPRAR PASE PREMIUM ✦'}`, `${prem ? `${usedPrefix}allmenu`: `${usedPrefix}pase premium`}`]]
setTimeout(() => {
if (chatdb.deletemedia) conn.deleteMessage(m.chat, key)
}, chatdb.deletemediaTime)
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+buff, m );
}

}
handler.help = ['premlist [angka]']
handler.tags = ['info']
handler.command = /^(listprem|premlist|listavip|viplista)$/i
//handler.command = /^(vip|prem|premium|lista|list)vip|prem|premium|lista|list$/i

handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler

function clockString(ms) {
let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return ['┃ ', ye, ' *🗓️ Años : Year*\n', '┃ ', mo, ' *⛅ Mes : Month*\n', '┃ ', d, ' *☀️ Días : Days*\n', '┃ ', h, ' *⏰ Horas : Hours*\n', '┃ ', m, ' *🕐 Minutos : Minutes*\n', '┃ ', s, ' *⏱️ Segundos : Seconds*'].map(v => v.toString().padStart(2, 0)).join('')
}

function sort(property, ascending = true) {
if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
if (property) return (a, i, b) => {
return { ...b[i], [property]: a[property] === undefined ? _default : a[property] }
}
else return a => a === undefined ? _default : a
}
