import { createHash } from 'crypto'
//import { max } from 'lodash'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
let resp, consola
const bot = global.db.data.bot[conn.user.jid]
const chats = bot.chats || {}
const privs = chats.privs || {}
const groups = chats.groups || {}
const chat = m.isGroup ? groups[m.chat] || {} : privs[m.chat] || {}
const users = m.isGroup ? chat.users || {} : privs || {}
let user = m.isGroup ? users[m.sender] || {} : privs[m.sender] || {}
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name2 = await conn.getName(who)
if (user.registered === true) {resp = `*[❗INFO❗] HEY! YA ESTÁS REGISTRADO*\n\n*QUIERES QUITAR TU REGISTRO? USA EL COMANDO ${usedPrefix}unreg <numero de serie>*\n\n*SI NO RECUERDAS TU NÚMERO DE SERIE PUEDES USAR EL COMANDO ${usedPrefix}myns*`
}
if (!text || !Reg.test(text)) {resp = `*[❗INFO❗] FORMATO INCORRECTO*\n\n*—◉ USO DEL COMANDO: ${usedPrefix + command} nombre.edad*\n*—◉ Ejemplo: ${usedPrefix + command} ${name2.replace(' ', '')}.18*`
}
console.log('verificar: ', consola = text)
if (text) {
let [_, name, splitter, age] = consola = text.match(Reg)//`${text.match(Reg)}`
if (resp == (null || undefined)) {resp = `verificar: ${consola}`}
if (!name) {resp = '*[❗INFO❗] DEBES PONER UN NOMBRE*'
}
if (!age) {resp = '*[❗INFO❗] LA EDAD NO PUEDE ESTAR VACIA*'
}
if (name.length >= 30) {resp = '[❗INFO❗] EL NOMBRE ES DEMACIADO LARGO' 
}
if (name.length <= 1) {resp = '[❗INFO❗] EL NOMBRE ES DEMACIADO CORTO'
} 
age = parseInt(age)
if (age > 100) {resp = '*[❗] Kheee, como sigues vivo con esa edad? 👴🏻*'
}
if (age < 5) {resp = '*[❗] Kheee, un bebé que sabe usar WhatsApp? 😲*'
} 
user.name = name
user.age = age
user.regTime = + new Date
user.registered = true
let sn = createHash('md5').update(m.sender).digest('hex')
resp = `\n\n¡¡AHORA TE HE REGISTRADO!!\n\n┏┅ ━━━━━━━━━━━━ ┅ ━
┇「 INFORMACIÓN 」
┣┅ ━━━━━━━━━━━━ ┅ ━
┃ *NOMBRE:* ${name}
┃ *EDAD:* ${age} años
┃ *NÚMERO DE SERIE:* 
┃ ${sn}
┗┅ ━━━━━━━━━━━━ ┅ ━\n\n¡TU NÚMERO DE SERIE TE SERVIRÁ TÚ POR SI DESEAS BORRAR TU REGISTRO DEL BOT ${wm}!\nPara corroborar tu informacion usa:\n'${usedPrefix}profile y si quieres tu numero de serie agrega al comando la frase "numero de serie"` 
global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender].money += 10000
global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender].exp += 10000
}/** */
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 10));
txt += c;
count++;
if (count % 10 === 0) {
 await conn.sendPresenceUpdate('composing' , m.chat);
}
}
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
handler.help = ['verificar']
handler.tags = ['xp']
handler.command = /^(verify|register|verificar|reg|registrar)$/i
export default handler
