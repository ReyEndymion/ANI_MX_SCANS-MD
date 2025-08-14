import MessageType from '@whiskeysockets/baileys'
let pajak = 0
let handler = async (m, {conn, text, db, userdb, senderJid}) => {
let who
if (m.isGroup) who = m.mentionedJid[0]
else who = m.chat
if (!who) return conn.sendWritingText(m.chat, `*[❗INFO❗] ETIQUETA A UN USUARIO CON EL @tag*`, userdb, m)
let txt = text.replace('@' + who.split`@`[0], '').trim()
if (!txt) return conn.sendWritingText(m.chat, `*[❗INFO❗] INGRESA LA CANTIDAD DE EXPERIENCIA (XP) QUE DESEA AÑADIR*`, userdb, m)
if (isNaN(txt)) return conn.sendWritingText(m.chat, `*[❗INFO❗] SIMBOLO NO ADMITIDO, SOLO NUMEROS!*`, m)
let xp = parseInt(txt)
let exp = xp
let pjk = Math.ceil(xp * pajak)
exp += pjk
if (exp < 1) return conn.sendWritingText(m.chat, `*[❗INFO❗] EL NUMERO MINIMO DE EXPERIENCIA (XP) PARA AÑADIR ES 𝟷*`, userdb, m)
let users = db.data.bot[conn.user.jid].users
users[who].exp += xp
m.reply(`≡ *XP AÑADIDO*
┌──────────────
▢ *Total* ${xp}
└──────────────`)
}
handler.command = ['añadirxp','addexp'] 
handler.rowner = true
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
