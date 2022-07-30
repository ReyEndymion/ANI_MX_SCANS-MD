let handler = async (m, { conn, text}) => {
if (!text) throw '*[❗INFO❗] INGRESA EL @tag DE ALGUN USUARIO*'
let who
if (m.isGroup) who = m.mentionedJid[0]
else who = m.chat
if (!who) throw '*[❗INFO❗] INGRESA EL @tag DE ALGÚN USUARIO*'
let users = global.db.data.users
users[who].banned = true
conn.reply(m.chat, `*[❗INFO❗] EL USUARIO FUE BANEADO CON ÉXITO*\n*—◉ EL USUARIO YA NO PODRÁ USAR EL BOT HASTA QUE SEA DESBANEADO*`, m)
}
handler.help = ['banuser']
handler.tags = ['owner']
handler.command = /^banuser$/i
handler.rowner = true
export default handler
