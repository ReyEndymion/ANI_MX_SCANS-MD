let handler = async (m, { text }) => {
let user = global.db.data.users[m.sender]
user.afk = + new Date
user.afkReason = text
m.reply(`*[❗INFO❗] EL USUARIO ${conn.getName(m.sender)} ESTARA INACTIVO (AFK), POR FAVOR NO LO ETIQUETEN*\n\n*—◉ MOTIVO DE LA INACTIVIDAD (AFK)${text ? ': ' + text : ''}*
`)}
handler.help = ['afk [alasan]']
handler.tags = ['main']
handler.command = /^afk$/i
export default handler
