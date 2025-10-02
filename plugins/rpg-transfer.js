const items = [
'limit', 'exp',
]
let confirmation = {}
async function handler(m, { conn, info, start, args, usedPrefix, command, usersdb, userdb, senderJid }) {
const {userID} = await import('../config.js')
const {isNumber} = await import('../lib/functions.js')
if (confirmation[senderJid]) return conn.sendWritingText(m.chat, `estas haciendo una transferencia`, userdb, m)

const item = items.filter(v => v in userdb && typeof userdb[v] == 'number')
let lol = `✳️ Uso del comamdo 
*${usedPrefix + command}*[tipo] [cantidad] [@user]
📌 Ejemplo : ${usedPrefix + command} exp 65 @${senderJid.split('@')[0]}


📍 Artículos transferibles
┌──────────────
▢ *limit* = diamante
▢ *exp* = experiencia
└──────────────
`.trim()
const type = (args[0] || '').toLowerCase()
if (!item.includes(type)) return conn.sendWritingText(m.chat, lol, userdb, m)
const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + userID) : ''
if (!who) return conn.sendWritingText(m.chat, `✳️ Taguea al usuario`, userdb, m)
if (!(who in usersdb)) return conn.sendWritingText(m.chat, `✳️ Usuario ${who} no está en ladatabase`, userdb, m)
if (userdb[type] * 1 < count) return conn.sendWritingText(m.chat, `✳️*${type}*insuficiente para transferir`, userdb, m)
let text = `¿Está seguro de que desea transferir *${count}* ${type} a *@${who.split('@')[0]}* ?\n\nTienes *60s*`.trim()
const footer = `\n> ${info.nanie}`
const buttons = [['si', 'si'], ['no', `no`], ['Menu Principal ⚡', `${usedPrefix}menu`]]
confirmation[senderJid] = {
sender: senderJid,
to: who,
message: m,
type,
count,
timeout: setTimeout(() => ( conn.sendWritingText(m.chat, `Se acabó el tiempo`, userdb, m), delete confirmation[senderJid]), 60 * 1000)
}
if (!start.buttons) {
return conn.sendButton(m.chat, {text, footer}, {}, buttons, userdb, m)  
} else {
text += `\n\nResponde *si* para aceptar o *no* para cancelar`
return conn.sendWritingText(m.chat, `${text+footer}`, userdb, m)
return conn.sendMessage(m.chat, {text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt)}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 })
conn.sendMessage(m.chat, { text: confirm, mentions: conn.parseMention(confirm)}, {quoted: m, ephemeralExpiration: {}, disappearingMessagesInChat: {}}, [['si'], ['no']])
}

}

handler.before = async (m, {conn, usersdb, userdb, senderJid}) => {
const {userID} = await import('../config.js')
if (m.isBaileys) return
if (!(senderJid in confirmation)) return
if (!m.text) return
let { timeout, sender, message, to, type, count } = confirmation[senderJid]
if (m.id === message.id) return
let user = usersdb[sender]
let _user = usersdb[to]
if (/no?/g.test(m.text.toLowerCase())) {
clearTimeout(timeout)
delete confirmation[sender]
return conn.sendWritingText(m.chat, `Cancelado`, userdb, m)
}
if (/si?/g.test(m.text.toLowerCase())) {
let previous = user[type] * 1
let _previous = _user[type] * 1
user[type] -= count * 1
_user[type] += count * 1
if (previous > user[type] * 1 && _previous < _user[type] * 1) {
await conn.sendWritingText(m.chat, `✅ transferencia exitosa de:\n\n*${count}* *${type}* a @${to.split('@')[0]}`, userdb, m)
} else {
user[type] = previous
_user[type] = _previous
await m.sendWritingText(m.chat, `Error al transferir *${count}* ${type} a *@${to.split('@')[0]}*`, userdb, m)
}
clearTimeout(timeout)
delete confirmation[sender]
}
}

handler.help = ['transfer'].map(v => v + ' [tipo] [cantidad] [@tag]')
handler.tags = ['xp']
handler.command = ['payxp', 'transfer', 'darxp', 'transferir'] 
handler.disabled = false

handler.menu = [
{ title: "💸 TRANSFERIR", description: `Transfiere XP o 💎 a otro usuario, usa el comando #transferir [tipo] [cantidad] [@usuario]`, id: `transfer` }
];
handler.type = "rpg";

export default handler

function special(type) {
let b = type.toLowerCase()
let special = (['common', 'uncommon', 'mythic', 'legendary', 'pet'].includes(b) ? ' Crate' : '')
return special
}

function isNumber(x) {
return !isNaN(x)
}
