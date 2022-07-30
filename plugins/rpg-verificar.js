import { createHash } from 'crypto'
let handler = async function (m, { text, usedPrefix }) {
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
let user = global.db.data.users[m.sender]
if (user.registered === true) throw `*[❗INFO❗] HEY! YA ESTÁS REGISTRADO*\n\n*QUIERES QUITAR TU REGISTRO? USA EL COMANDO ${usedPrefix}unreg <numero de serie>*\n\n*SI NO RECUERDAS TU NÚMERO DE SERIE PUEDES USAR EL COMANDO ${usedPrefix}myns*`
let name = conn.getName(m.sender)
let age = Math.floor(Math.random() * 41)
age = parseInt(age)
user.name = name.trim()
user.age = age
user.regTime = + new Date
user.registered = true
let sn = createHash('md5').update(m.sender).digest('hex')
let caption = `┏┅ ━━━━━━━━━━━━ ┅ ━
┇「 INFORMACIÓN 」
┣┅ ━━━━━━━━━━━━ ┅ ━
┃ *NOMBRE:* ${name}
┃ *EDAD:* ${age} años
┃ *NÚMERO DE SERIE:* 
┃ ${sn}
┗┅ ━━━━━━━━━━━━ ┅ ━`
let author = global.author
conn.sendButton(m.chat, caption, `¡TU NÚMERO DE SERIE TE SERVIRÁ TÚ POR SI DESEAS BORRAR TU REGISTRO DEL BOT!\n${author}`, [['¡¡AHORA TE HE REGISTRADO!!', '/profile']], m)
global.db.data.users[m.sender].money += 10000
global.db.data.users[m.sender].exp += 10000
}
handler.help = ['verificar']
handler.tags = ['xp']
handler.command = /^(verify|register|verificar|reg|registrar)$/i
export default handler
