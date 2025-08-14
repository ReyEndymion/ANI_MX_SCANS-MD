let handler = async (m, {conn, text, db, userdb, senderJid}) => {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
else who = m.chat
if (!who) return conn.sendWritingText(m.chat, `*[❗INFO❗] INGRESA EL @tag DE LA PERSONA QUE DESEA AGREGAR A LOS USUARIOS PREMIUM*`, userdb, m)
if (global.prems.includes(who.split`@`[0])) return conn.sendWritingText(m.chat, `*[❗INFO❗] EL USUARIO REGISTRADO YA ES USUARIO PREMIUM*`, userdb, m)
global.prems.push(`${who.split`@`[0]}`)
let textprem = `*[❗INFO❗] @${who.split`@`[0]} AHORA YA ES UN USUARIO PREMIUM, NO TENDRÁ LÍMITES AL USAR EL BOT*`
return conn.sendWritingText(m.chat, textprem, userdb, m)
}
handler.help = ['addprem <@user>']
handler.tags = ['owner']
handler.command = /^(add|\+)prem$/i
handler.group = true
handler.rowner = true
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
