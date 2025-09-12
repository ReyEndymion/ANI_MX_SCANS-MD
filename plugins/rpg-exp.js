import { xpRange } from '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'
import { promises } from 'fs'
import { join } from 'path'
let handler = async (m, {conn, usedPrefix, command, args, usedPrefix: _p, pluginsPath, isOwner, text, isAdmin, isROwner, usersdb, userdb, db, senderJid}) => {


const { levelling } = '../lib/levelling.js'

let { exp, limit, level, role } = userdb
let { min, xp, max } = xpRange(level, global.multiplier)

let d = new Date(new Date + 3600000)
let locale = 'es'
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
day: 'numeric',
month: 'long',
year: 'numeric'
}).format(d)
let time = d.toLocaleTimeString(locale, {
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
})
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000
}
let { money, joincount } = userdb
//let { limit } = userdb
let muptime = clockString(_muptime)
let uptime = clockString(_uptime)
let totalreg = Object.keys(usersdb).length
let rtotalreg = Object.values(usersdb).filter(user => user.registered == true).length
let replace = {
'%': '%',
p: _p, uptime, muptime,
me: conn.getName(conn.user.jid),

exp: exp - min,
maxexp: xp,
totalexp: exp,
xp4levelup: max - exp,

level, limit, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

//let name = await conn.getName(senderJid)
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid
let pp = dirP + 'src/sinFoto.png';
try {
pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png' );
} catch (e) {}
let apii = await conn.getFile(pp)
let username = conn.getName(who)


let menu = `
╭━〔 *${info.nanie}* 〕━⬣
┃ ✪ *NOMBRE* 
┃ ${username}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ ✪ *EXPERIENCIA | EXP* 
┃ ➥ *${userdb.exp - min}/${xp}*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ ✪ *NIVEL | LEVEL*
┃ ➥ *${level}*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ ✪ *ROL*
┃ ➥ ${role}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ ✪ *${info.nanie}coins*
┃ ➥ *${money}*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ ✪ *TOKENS*
┃ ➥ *${joincount}*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ ✪ *DIAMANTES* 
┃ ➥ *${limit}*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ ✪ *FECHA*
┃ ➥ *${week}, ${date}*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ ✪ *USUARIOS | USERS*
┃ ➥ *${Object.keys(usersdb).length}* 
╰━━━〔 *${info.nanie}* 〕━━━⬣`.trim()
return conn.sendImageWriting(m.chat, pp, menu, m );

}

handler.help = ['infomenu'].map(v => v + 'able <option>')
handler.tags = ['group', 'owner']
handler.command = /^(xp|experiencia|esperiencia|esperiensia|experiensia|exp|coinsgata|coins)$/i
handler.group = true
handler.exp = 10
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
