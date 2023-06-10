let handler = async (m, { conn, text, usedPrefix, command}) => {
    let BANtext = `*[❗INFO❗] ETIQUETE A UNA PERSONA O RESPONDA A UN MENSAJE ENVIADO POR EL USUARIO QUE DESEE BANEAR\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} @${global.suittag}*`
if (!m.mentionedJid[0] && !m.quoted) return m.reply(BANtext, m.chat, { mentions: conn.parseMention(BANtext)})
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
else who = m.chat
let users = global.db.data.users
users[who].banned = true
m.reply(`*[❗INFO❗] EL USUARIO FUE BANEADO CON ÉXITO*\n*—◉ EL USUARIO YA NO PODRÁ USAR EL BOT HASTA QUE SEA DESBANEADO*`)    }
handler.command = /^banuser$/i
handler.rowner = true
export default handler
