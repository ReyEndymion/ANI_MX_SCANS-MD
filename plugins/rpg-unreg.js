import { createHash } from 'crypto'
let handler = async function (m, {conn, args , db, userdb, senderJid}) {
let resp
if (!args[0]) {resp = '*[❗INFO❗] INGRESE SU NÚMERO DE SERIE, SI NO LO RECUERDA PUEDE USAR EL COMANDO #myns*'}
let sn = createHash('md5').update(senderJid).digest('hex')
if (args[0] !== sn) {resp = '*[❗INFO❗] NÚMERO DE SERIE INCORRECTO, COMPRUEBE QUE LO HAYA ESCRITO CORRECTAMENTE!*\n\n*SI NO LO RECUERDA PUEDE USAR EL COMANDO #myns*'}
userdb.registered = false
delete createHash('md5').update(senderJid).digest('hex')
resp = `*[ ✔ ] SE REALIZÓ CON ÉXITO, USTED YA NO ESTÁ REGISTRADO EN EL BOT*`

return conn.sendWritingText(m.chat, resp, userdb, m)}
handler.help = ['', 'ister'].map(v => 'unreg' + v + ' <numero de serie>')
handler.tags = ['xp']
handler.command = /^unreg(ister)?$/i
handler.register = true
handler.menu = [
{title: "❌ UNREGISTRO", description: `Desregistrate del bot, usa el comando #unreg`, id: `unreg`}
];
handler.type = "rpg";
handler.disabled = false;

export default handler
