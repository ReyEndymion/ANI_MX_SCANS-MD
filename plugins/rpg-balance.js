let handler = async (m, {conn, usedPrefix}) => {
const bot = global.db.data.bot[conn.user.jid]
const chats = bot.chats
const privs = chats.privs
const groups = chats.groups
const chat = m.isGroup ? groups[m.chat] || {} : privs[m.chat] || {}
const users = m.isGroup ? chat.users || {} : privs

let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
else who = m.sender
let name = who.split`@`[0]//conn.getName(who) 
let resp = `
┌───⊷ *BALANCE* ⊶
▢ *Nombre:* @${name}
▢ *Diamantes:* ${users[who].limit}💎
└──────────────
*NOTA:* 
*Puedes comprar diamantes 💎 usando los comandos*
❏ *${usedPrefix}buy <cantidad>*
❏ *${usedPrefix}buyall*`
return conn.sendWritingText(m.chat, resp, m );
}
handler.help = ['bal']
handler.tags = ['xp']
handler.command = ['bal', 'diamantes', 'diamond', 'balance'] 
export default handler
