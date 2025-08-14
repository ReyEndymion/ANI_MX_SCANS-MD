let handler = async (m, {conn, participants, usedPrefix, command, db, userdb, senderJid}) => {
if (!db.data.bot[conn.user.jid].settings.restrict) return conn.sendWritingText(m.chat, `*[ ⚠️ ] EL OWNER TIENE RESTRINGIDO (_enable restrict_ / _disable restrict_) EL USO DE ESTE COMANDO*`, userdb, m)
let kicktext = `*[❗] ETIQUETÉ A UNA PERSONA O RESPONDA A UN MENSAJE DEL GRUPO PARA ELIMINAR AL USUARIO*\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} @${global.suittag}*`
if (!m.mentionedJid[0] && !m.quoted) return m.reply(kicktext, m.chat, { mentions: conn.parseMention(kicktext)}) 
let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
let owr = m.chat.split`-`[0]
await conn.groupParticipantsUpdate(m.chat, [user], 'remove')}
handler.command = /^(kick2|echar2|hechar2|sacar2)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
