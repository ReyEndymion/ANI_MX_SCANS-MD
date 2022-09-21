let handler = async (m, { conn, participants, usedPrefix, command }) => {
if (!global.db.data.settings[conn.user.jid].restrict) throw '*[ ⚠️ ] EL OWNER TIENE RESTRINGIDO (_enable restrict_ / _disable restrict_) EL USO DE ESTE COMANDO*'
let kicktext = `*[❗] ETIQUETÉ A UNA PERSONA O RESPONDA A UN MENSAJE DEL GRUPO PARA ELIMINAR AL USUARIO*\n\n*—◉ 𝙴𝙹𝙴𝙼𝙿𝙻𝙾:*\n*${usedPrefix + command} @${global.suittag}*`
if (!m.mentionedJid[0] && !m.quoted) return m.reply(kicktext, m.chat, { mentions: conn.parseMention(kicktext)}) 
let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
let owr = m.chat.split`-`[0]
await conn.groupParticipantsUpdate(m.chat, [user], 'remove')}
/*let users = m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id))
let kickedUser = []
for (let user of users)
if (user.endsWith('@s.whatsapp.net') && !(participants.find(v => areJidsSameUser(v.id, user)) || { admin: true }).admin) {
const res = await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
kickedUser.concat(res)
await delay(1 * 1000)
}}*/
handler.help = ['kick @user']
handler.tags = ['group']
handler.command = /^(banear|kick|sacar|\-)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
