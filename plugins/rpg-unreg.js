import { createHash } from 'crypto'
let handler = async function (m, { args }) {
let resp
if (!args[0]) {resp = '*[❗INFO❗] INGRESE SU NÚMERO DE SERIE, SI NO LO RECUERDA PUEDE USAR EL COMANDO #myns*'}
let user = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender]
let sn = createHash('md5').update(m.sender).digest('hex')
if (args[0] !== sn) {resp = '*[❗INFO❗] NÚMERO DE SERIE INCORRECTO, COMPRUEBE QUE LO HAYA ESCRITO CORRECTAMENTE!*\n\n*SI NO LO RECUERDA PUEDE USAR EL COMANDO #myns*'}
user.registered = false
delete createHash('md5').update(m.sender).digest('hex')
resp = `*[ ✔ ] SE REALIZÓ CON ÉXITO, USTED YA NO ESTÁ REGISTRADO EN EL BOT*`
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 1));
txt += c;
count++;
if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
}
}

return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
handler.help = ['', 'ister'].map(v => 'unreg' + v + ' <numero de serie>')
handler.tags = ['xp']
handler.command = /^unreg(ister)?$/i
handler.register = true
export default handler
