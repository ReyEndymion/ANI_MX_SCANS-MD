import { createHash } from 'crypto'
let handler = async function (m, { args }) {
if (!args[0]) throw '*[❗INFO❗] INGRESE SU NÚMERO DE SERIE, SI NO LO RECUERDA PUEDE USAR EL COMANDO #myns*'
let user = global.db.data.users[m.sender]
let sn = createHash('md5').update(m.sender).digest('hex')
if (args[0] !== sn) throw '*[❗INFO❗] NÚMERO DE SERIE INCORRECTO, COMPRUEBE QUE LO HAYA ESCRITO CORRECTAMENTE!*\n\n*SI NO LO RECUERDA PUEDE USAR EL COMANDO #myns*'
user.registered = false
m.reply(`*[ ✔ ] SE REALIZÓ CON ÉXITO, USTED YA NO ESTÁ REGISTRADO EN EL BOT*`)
}
handler.help = ['', 'ister'].map(v => 'unreg' + v + ' <numero de serie>')
handler.tags = ['xp']
handler.command = /^unreg(ister)?$/i
handler.register = true
export default handler
