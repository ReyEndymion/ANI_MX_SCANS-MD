let handler = async (m, {conn, text, db, userdb, senderJid}) => {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
else who = m.chat
if (!who) return conn.sendWritingText(m.chat, `*[❗INFO❗] INGRESA EL @tag DE LA PERSONA QUE DESEE ELIMINAR DE LOS USUARIOS PREMIUM*`, userdb, m)
if (!global.prems.includes(who.split`@`[0])) return conn.sendWritingText(m.chat, `*[❗INFO❗] EL USUARIO INGRESADO NO ES USUARIO PREMIUM*`, userdb, m)
let index = global.prems.findIndex(v => (v.replace(/[^0-9]/g, '') + '@s.whatsapp.net') === (who.replace(/[^0-9]/g, '') + '@s.whatsapp.net'))
global.prems.splice(index, 1)
let textdelprem = `*[❗INFO❗] @${who.split`@`[0]} AHORA YA NO FORMA PARTE DE LOS USUARIOS PREMIUM*`
return conn.sendWritingText(m.chat, textdelprem, userdb, m)
}
handler.help = ['delprem <@user>']
handler.tags = ['owner']
handler.command = /^(remove|-|del)prem$/i
handler.group = true
handler.rowner = true
handler.menu = [
{title: "👑 DELPREM", description: "Quitar premium con #delprem <@tag> ", id: `delprem`}
];
handler.type = "owners";
handler.disabled = false;

export default handler
