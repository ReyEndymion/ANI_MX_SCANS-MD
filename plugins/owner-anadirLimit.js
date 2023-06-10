import MessageType from '@whiskeysockets/baileys'
let pajak = 0
let handler = async (m, { conn, text }) => {
let who
if (m.isGroup) who = m.mentionedJid[0]
else who = m.chat
if (!who) throw '*[❗INFO❗] ETIQUETA A UN USUARIO CON EL @tag*'
let txt = text.replace('@' + who.split`@`[0], '').trim()
if (!txt) throw '*[❗INFO❗] IGRESA LA CANTIDAD DE DIAMANTES QUE DESEA AÑADIR*'
if (isNaN(txt)) throw '*[❗𝐈𝐍𝐅𝐎❗] SIMBOLO NO ADMITIDO, SOLO NUMEROS!*'
let dmt = parseInt(txt)
let limit = dmt
let pjk = Math.ceil(dmt * pajak)
limit += pjk
if (limit < 1) throw '*[❗𝐈𝐍𝐅𝐎❗] EL NUMERO MINIMO DE DIAMANTES PARA AÑADIR ES 𝟷*'
let users = global.db.data.users
users[who].limit += dmt
m.reply(`≡ *💎 AÑADIDO*
┌──────────────
▢ *𝚃𝚘𝚝𝚊𝚕:* ${dmt}
└──────────────`)
}
handler.command = ['añadirdiamantes','addd','dard','dardiamantes'] 
handler.rowner = true
export default handler
