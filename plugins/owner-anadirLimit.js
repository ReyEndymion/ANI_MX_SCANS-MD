import MessageType from '@whiskeysockets/baileys'
let pajak = 0
let handler = async (m, {conn, text, db, userdb, senderJid}) => {
let who
if (m.isGroup) who = m.mentionedJid[0]
else who = m.chat
if (!who) return conn.sendWritingText(m.chat, `*[❗INFO❗] ETIQUETA A UN USUARIO CON EL @tag*`, userdb, m)
let txt = text.replace('@' + who.split`@`[0], '').trim()
if (!txt) return conn.sendWritingText(m.chat, `*[❗INFO❗] IGRESA LA CANTIDAD DE DIAMANTES QUE DESEA AÑADIR*`, userdb, m)
if (isNaN(txt)) return conn.sendWritingText(m.chat, `*[❗INFO❗] SIMBOLO NO ADMITIDO, SOLO NUMEROS!*`, m)
let dmt = parseInt(txt)
let limit = dmt
let pjk = Math.ceil(dmt * pajak)
limit += pjk
if (limit < 1) return conn.sendWritingText(m.chat, `*[❗INFO❗] EL NUMERO MINIMO DE DIAMANTES PARA AÑADIR ES 𝟷*`, userdb, m)
let users = db.data.bot[conn.user.jid].users
users[who].limit += dmt
m.reply(`≡ *💎 AÑADIDO*
┌──────────────
▢ *Total:* ${dmt}
└──────────────`)
}
handler.command = ['añadirdiamantes','addd','dard','dardiamantes'] 
handler.rowner = true
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
