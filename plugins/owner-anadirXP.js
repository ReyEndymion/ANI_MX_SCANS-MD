import MessageType from '@whiskeysockets/baileys'
let pajak = 0
let handler = async (m, { conn, text }) => {
let who
if (m.isGroup) who = m.mentionedJid[0]
else who = m.chat
if (!who) throw '*[❗INFO❗] ETIQUETA A UN USUARIO CON EL @tag*'
let txt = text.replace('@' + who.split`@`[0], '').trim()
if (!txt) throw '*[❗𝐈𝐍𝐅𝐎❗] INGRESA LA CANTIDAD DE EXPERIENCIA (XP) QUE DESEA AÑADIR*'
if (isNaN(txt)) throw '*[❗𝐈𝐍𝐅𝐎❗] SIMBOLO NO ADMITIDO, SOLO NUMEROS!*'
let xp = parseInt(txt)
let exp = xp
let pjk = Math.ceil(xp * pajak)
exp += pjk
if (exp < 1) throw '*[❗INFO❗] EL NUMERO MINIMO DE EXPERIENCIA (XP) PARA AÑADIR ES 𝟷*'
let users = global.db.data.users
users[who].exp += xp
  m.reply(`≡ *XP AÑADIDO*
┌──────────────
▢  *Total* ${xp}
└──────────────`)
}
handler.command = ['añadirxp','addexp'] 
handler.rowner = true
export default handler
