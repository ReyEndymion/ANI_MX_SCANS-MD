let handler = async (m, { conn, text }) => {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
else who = m.chat
if (!who) throw `*[❗INFO❗] INGRESA EL @tag DE LA PERSONA QUE DESEA AGREGAR A LOS USUARIOS PREMIUM*`
if (global.prems.includes(who.split`@`[0])) throw '*[❗INFO❗] EL USUARIO REGISTRADO YA ES USUARIO PREMIUM*'
global.prems.push(`${who.split`@`[0]}`)
let textprem = `*[❗INFO❗] @${who.split`@`[0]} AHORA YA ES UN USUARIO PREMIUM, NO TENDRÁ LÍMITES AL USAR EL BOT*`
m.reply(textprem, null, { mentions: conn.parseMention(textprem) })
}
handler.help = ['addprem <@user>']
handler.tags = ['owner']
handler.command = /^(add|\+)prem$/i
handler.group = true
handler.rowner = true
export default handler
