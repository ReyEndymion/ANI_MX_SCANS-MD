import { createHash } from 'crypto'
let handler = async function (m, { args }) {
let resp
if (!args[0]) {resp = '*[❗INFO❗] INGRESE SU NÚMERO DE SERIE, SI NO LO RECUERDA PUEDE USAR EL COMANDO #myns*'}
const bot = global.db.data.bot[conn.user.jid]
const chats = bot.chats || {}
const privs = chats.privs || {}
const groups = chats.groups || {}
const chat = m.isGroup ? groups[m.chat] || {} : privs[m.chat] || {}
const users = m.isGroup ? chat.users || {} : privs || {}
let user = m.isGroup ? users[m.sender] || {} : privs[m.sender] || {}
let sn = createHash('md5').update(m.sender).digest('hex')
if (args[0] !== sn) {resp = '*[❗INFO❗] NÚMERO DE SERIE INCORRECTO, COMPRUEBE QUE LO HAYA ESCRITO CORRECTAMENTE!*\n\n*SI NO LO RECUERDA PUEDE USAR EL COMANDO #myns*'}
user.registered = false
delete createHash('md5').update(m.sender).digest('hex')
resp = `*[ ✔ ] SE REALIZÓ CON ÉXITO, USTED YA NO ESTÁ REGISTRADO EN EL BOT*`

return conn.sendWritingText(m.chat, resp, m)
}
handler.help = ['', 'ister'].map(v => 'unreg' + v + ' <numero de serie>')
handler.tags = ['xp']
handler.command = /^unreg(ister)?$/i
handler.register = true
export default handler
