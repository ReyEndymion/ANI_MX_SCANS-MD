let handler = async (m, { conn, text }) => {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
else who = m.chat
if (!who) throw `*[❗INFO❗] INGRESA EL @tag DE LA PERSONA QUE DESEE ELIMINAR DE LOS USUARIOS PREMIUM*`
if (!global.prems.includes(who.split`@`[0])) throw '*[❗INFO❗] EL USUARIO INGRESADO NO ES USUARIO PREMIUM*'
let index = global.prems.findIndex(v => (v.replace(/[^0-9]/g, '') + '@s.whatsapp.net') === (who.replace(/[^0-9]/g, '') + '@s.whatsapp.net'))
global.prems.splice(index, 1)
conn.reply(m.chat, `*[❗INFO❗] @${who.split`@`[0]} AHORA YA NO FORMA PARTE DE LOS USUARIOS PREMIUM*`, m, {
contextInfo: {
mentionedJid: [who]
}})}
handler.help = ['delprem <@user>']
handler.tags = ['owner']
handler.command = /^(remove|-|del)prem$/i
handler.group = true
handler.rowner = true
export default handler
