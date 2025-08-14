const items = [
'limit', 'exp',
]
let confirmation = {}
async function handler(m, { conn, args, usedPrefix, command, db, userdb, senderJid }) {
let resp
let user = global.user
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
const type = (args[0] || '').toLowerCase()
const item = items.filter(v => v in user && typeof user[v] == 'number')
const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1
if (!item.includes(type)) {resp = `✳️ Uso del comamdo\n\n*${usedPrefix + command}* [tipo] [cantidad] [@user]\n\n📌 Ejemplo : ${usedPrefix + command} exp 65 @${me[0][0]}\n\n📍 Artículos transferibles\n┌──────────────\n▢ *limit* = diamante\n▢ *exp* = experiencia\n└──────────────`.trim()
} else if (!who) {resp = '✳️ Taguea al usuario'
} else if (!(who in global._user)) {resp = `✳️ Usuario ${who} no está en la database`
} else if (user[type] * 1 < count) {resp = `✳️ *${type}* insuficiente para transferir`
} else if (confirmation[senderJid]) {resp = 'Estas haciendo una transferencia'
} else {
let c = `FG - dylux-bot, sin botones por ${info.nanie} `
resp = `¿Está seguro de que desea transferir *${count}* ${type} a *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}* ?\n\nResponde *si* para aceptar o *no* para cancelar, Tienes *60* s\n\n${c}`.trim()
}
confirmation[senderJid] = {
sender: senderJid,
to: who,
message: m,
type,
count,
timeout: setTimeout(async () => (
resp = 'Se acabó el tiempo'
, delete confirmation[senderJid]), 60 * 1000)
}
return conn.sendWritingText(m.chat, resp, userdb, m)
}
handler.before = async (m, {conn, db, userdb, senderJid}) => {
let resp
if (m.isBaileys) return
if (!(senderJid in confirmation)) return
if (!m.text) return
let { timeout, sender, message, to, type, count } = confirmation[senderJid]
if (m.id === message.id) return
let user = global.user
let _user = global._user[to]
if (/no?/g.test(m.text.toLowerCase())) {
clearTimeout(timeout)
delete confirmation[sender]
resp = 'Cancelado'
}
if (/si?/g.test(m.text.toLowerCase())) {
let previous = user[type] * 1
let _previous = _user[type] * 1
user[type] -= count * 1
_user[type] += count * 1
if (previous > user[type] * 1 && _previous < _user[type] * 1) {resp = `✅ transferencia exitosa de \n\n*${count}* *${type}* a @${(to || '').replace(/@s\.whatsapp\.net/g, '')}`}
else {
user[type] = previous
_user[type] = _previous
resp = `Error al transferir *${count}* ${type} to *@${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`
}
clearTimeout(timeout)
delete confirmation[sender]
}
return conn.sendWritingText(m.chat, resp, userdb, m)

}

handler.help = ['transfer'].map(v => v + ' [tipo] [cantidad] [@tag]')
handler.tags = ['xp']
handler.command = ['payxp', 'transfer', 'darxp', 'transferir'] 
handler.groups = true
handler.disabled = false

handler.menu = [];
handler.type = "";

export default handler

function special(type) {
let b = type.toLowerCase()
let special = (['common', 'uncommon', 'mythic', 'legendary', 'pet'].includes(b) ? ' Crate' : '')
return special
}

function isNumber(x) {
return !isNaN(x)
}
