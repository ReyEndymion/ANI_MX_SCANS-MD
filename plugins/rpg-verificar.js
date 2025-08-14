import { createHash } from 'crypto'
//import { max } from 'lodash'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let data = {}
async function handler(m, { conn, info, start, text, usedPrefix, command, db, userdb, senderJid }) {
let resp = '', consola
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid
if (m.fromMe) return
let nameWA = await conn.getName(who)
if (userdb.registered === true) {
resp = `*[❗INFO❗] HEY! YA ESTÁS REGISTRADO*\n\n*QUIERES QUITAR TU REGISTRO? USA EL COMANDO ${usedPrefix}unreg <numero de serie>*\n\n*SI NO RECUERDAS TU NÚMERO DE SERIE PUEDES USAR EL COMANDO ${usedPrefix}myns*`
return conn.sendWritingText(m.chat, resp, userdb, m );
} else {
if (!m.text || !Reg.test(m.text)) {
resp = `*[❗INFO❗] FORMATO INCORRECTO*\n\n*—◉ USO DEL COMANDO: ${usedPrefix + command} nombre.edad*\n*—◉ Ejemplo: ${usedPrefix + command} ${nameWA.replace(' ', '')}.18*`
return conn.sendWritingText(m.chat, resp, userdb, m );
} else {
let [_, name, splitter, age] = m.text.match(Reg)
data[who] = {
who,
usedPrefix,
command,
nameWA,
_,
name,
splitter,
age,
user: userdb,
timeout: setTimeout(async () => {
resp = 'Se acabó el tiempo'
delete data[who]
return conn.sendWritingText(m.chat, resp, userdb, m );
}, 60 * 1000)
}
/*.length == 0, datos, contesta si, de lo contrario contesta no*/
resp = `Deseas que use tu *nickname de Whatsapp* como *Nombre* o prefieres el que has elegido?... *60 segundos para decidir*`
const buttons = [['aceptar', 'si'], ['rechazar', 'no']]
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
if (start.buttons) {
const messageContent = {
text: resp,
footer: info.nanie
}
await conn.sendButton(m.chat, messageContent, {}, buttons, userdb, m)
} else {
resp += `${cmds}`
return conn.sendWritingText(m.chat, resp, userdb, m );
}
}
}
//return conn.sendWritingText(m.chat, resp, userdb, m );
}
handler.help = ['verificar']
handler.tags = ['xp']
handler.command = /^(verify|register|verificar|reg|registrar)$/i
handler.before = async function before(m, {conn, info, text, db, userdb, senderJid}) {
let resp = ''
const datos = Object.values(data)//.find(c => c.nameWA)
if (m.fromMe) return
if (datos.length === 0) return
let [{who, usedPrefix, command, nameWA, _, name, splitter, age, user}] = datos
if (/si/i.test(m.text.toLowerCase())) {
user.name = nameWA
}
if (/no/i.test(m.text.toLowerCase())) {
let regex = new RegExp(`^\\s*\\${usedPrefix}\\s*${command}\\s+`, 'i')
user.name = name.replace(regex, '').trim()
}
console.log('verificar: ', name)

//`${text.match(Reg)}`, splitter, age, user.registered, name.match(Reg)m.text, datos.length === 0
if (!name) {
resp = '*[❗INFO❗] DEBES PONER UN name*'
delete data[who]
return conn.sendWritingText(m.chat, resp, userdb, m );
}
if (name.length >= 30) {
resp = '[❗INFO❗] EL name ES DEMASIADO LARGO' 
delete data[who]
return conn.sendWritingText(m.chat, resp, userdb, m );
}
if (name.length <= 1) {
resp = '[❗INFO❗] EL name ES DEMASIADO CORTO'
delete data[who]
return conn.sendWritingText(m.chat, resp, userdb, m );
} 
age = parseInt(age)
if (!age) {
resp = '*[❗INFO❗] LA EDAD NO PUEDE ESTAR VACIA*'
delete data[who]
return conn.sendWritingText(m.chat, resp, userdb, m );
}
if (age > 100) {
resp = '*[❗] Kheee, como sigues vivo con esa edad? 👴🏻*'
delete data[who]
return conn.sendWritingText(m.chat, resp, userdb, m );
}
if (age < 5) {
resp = '*[❗] Kheee, un bebé que sabe usar WhatsApp? 😲*'
delete data[who]
return conn.sendWritingText(m.chat, resp, userdb, m );
} 
user.regTime = + new Date
user.registered = true
let sn = createHash('md5').update(senderJid).digest('hex')
resp = `\n\n¡¡AHORA TE HE REGISTRADO!!\n\n┏┅ ━━━━━━━━━━━━ ┅ ━
┇「 INFORMACIÓN 」
┣┅ ━━━━━━━━━━━━ ┅ ━
┃ *name:* ${user.name}
┃ *EDAD:* ${user.age} años
┃ *NÚMERO DE SERIE:* 
┃ ${sn}
┗┅ ━━━━━━━━━━━━ ┅ ━\n\n¡TU NÚMERO DE SERIE TE SERVIRÁ TÚ POR SI DESEAS BORRAR TU REGISTRO DEL BOT ${info.nanie}!\nPara corroborar tu informacion usa:\n'${usedPrefix}profile y si quieres tu numero de serie agrega al comando la frase "numero de serie"` 
user.money += 10000
user.exp += 10000
delete data[who]
return conn.sendWritingText(m.chat, resp, userdb, m );
}
handler.menu = [
{title: "👤 REGISTRAR", description: `Registra tus datos en el Bot`, id: `reg`},
];
handler.type = "rpg";
handler.disabled = false;

export default handler
