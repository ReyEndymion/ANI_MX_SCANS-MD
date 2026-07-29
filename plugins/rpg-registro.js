import { createHash } from 'crypto'
//import { max } from 'lodash'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let data = {}
async function handler(m, { conn, info, start, args, text, usedPrefix, command, usersdb, userdb, senderJid, isROwner, isOwner }) {
let resp = '', consola
const {prems, userID} = await import('../config.js')
if (/^(verify|register|verificar|reg|registrar)$/i.test(command)) {
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
}
if (/^unreg(ister)?$/i.test(command)) {
if (!args[0]) {
resp = '*[❗INFO❗] INGRESE SU NÚMERO DE SERIE, SI NO LO RECUERDA PUEDE USAR EL COMANDO #myns*'
return conn.sendWritingText(m.chat, resp, userdb, m );
}
let sn = createHash('md5').update(senderJid).digest('hex')
if (args[0] !== sn) {
resp = '*[❗INFO❗] NÚMERO DE SERIE INCORRECTO, COMPRUEBE QUE LO HAYA ESCRITO CORRECTAMENTE!*\n\n*SI NO LO RECUERDA PUEDE USAR EL COMANDO #myns*'
return conn.sendWritingText(m.chat, resp, userdb, m)
}
userdb.registered = false
delete createHash('md5').update(senderJid).digest('hex')
resp = `*[ ✔ ] SE REALIZÓ CON ÉXITO, USTED YA NO ESTÁ REGISTRADO EN EL BOT*`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
if (/^(myns|ceksn)$/i.test(command)) {
if (userdb.serial === createHash('md5').update(senderJid).digest('hex')) {
let sn = userdb.serial//
if (/cop(y|iar)/i.test(args[0])) return conn.sendWritingText(m.chat, sn, userdb, m)
return conn.sendWritingText(m.chat, `┏┅ ━━━━━━━━━━━━ ┅ ━
┃ *NUMERO DE SERIE:* 
┃ ${sn}
┗┅ ━━━━━━━━━━━━ ┅ ━`.trim(), userdb, m)
} else {
return conn.sendWritingText(m.chat, `Usted no esta registrado, no tiene un numero de serie`, userdb, m)
}
}
if (/^(perfil|profile)?$/i.test(command)) {
let resp = '', imagen
//imagen = 'https://i.imgur.com/WHjtUae.jpg'
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid

try {
const usersInDB = Object.entries(usersdb).filter(user => user[1].premiumTime).map(([key, value]) => {
return { ...value, jid: key }
})
//filter(v => v != conn.user.jid && v === part).
const usersInPrems = prems.map(v => v.replace(/[^0-9]/g, '') + userID).map(key => {
return { name: '', premiumTime: Infinity, prem: true, registered: false, jid: key }
})
let user = usersInDB.length > 0 ? usersInDB : usersInPrems.length > 0 ? usersInPrems : []
const {default: PhoneNumber} = await import('awesome-phonenumber');
//let sortedP = user.map(toNumber('premiumTime')).sort(sort('premiumTime'))

//sortedP.map(({ jid, name, premiumTime, prem, registered }, i) => prem ? part.includes(jid) ? `\n\n╭–✦ ${registered ? name : conn.getName(jid)}\n┃• @${jid.split`@`[0]}\n${premiumTime > 0 ? premiumTime === Infinity ? '*USUARIO ESPECIAL*' : `┃✢ *TIEMPO PREMIUM:* ${clockString(premiumTime - new Date() * 1)}` : '┃🚫 CADUCADO'}` : '' : '').join`\n╰–––––––––––·•`

if (userdb) {
let { name, limit, lastclaim, registered, regTime, age, premium } = userdb
let username =`@${who.split`@`[0]}`//conn.getName(who)PhoneNumber()//.getNumber('international')
let prem = prems.includes(who.split`@`[0]) ? true : premium
const { createHash } = await import('crypto')
let sn = userdb?.serial || 'No Registrado'//createHash('md5').update(who).digest('hex')
console.log(`profile: `, who.replace(userID, ''), text)
if (!(who in usersdb)) {
resp = `El usuario que está mencionando no está registrado en mi base de datos`
return conn.sendWritingText(m.chat, resp, userdb, m);
} else {
try {
imagen = await conn.profilePictureUrl(who)
} catch (e) {
resp = `${e.stack}`
} finally {}
resp = `*NOMBRE:* ${username} ${registered ? '(' + name + ') ': ''}
*NUMERO:* ${PhoneNumber('+' + who.split('@')[0]).getNumber('international')}
*LINK:* wa.me/${who.split`@`[0]}${registered ? '\n*EDAD:* ' + age + ' años' : ''}
*LIMITE:* ${limit} USOS
*REGISTRADO:* ${registered ? 'Si': 'No'}
*PREMIUM:* ${prem ? 'Si' : 'No'}
*NUMERO DE SERIE:* ${registered ? sn : '¡Es Necesario registro!'}\n\n${registered ? `*Puedes pedir tu numero de serie individual añadiendo al comando las palabras "numero de serie", ejemplo*:\n*${usedPrefix + command} numero de serie*` : `Regístrese usando ${usedPrefix}reg nombre.edad`}\n\n> ${info.nanie}`
if (!text) {
return conn.sendImageWriting(m.chat, imagen, resp.trim(), userdb, m)
} else {
if (/n(u|ú)mero de serie/ig.test(text)) {
resp = `${sn}`
return conn.sendWritingText(m.chat, resp, userdb, m);
}
if ((!isROwner || !isOwner) && who) return conn.sendWritingText(m.chat, `[❗ALERTA❗] El uso de esta forma del comando es exclusiva para el Owner del Bot`, userdb, m);
return conn.sendImageWriting(m.chat, imagen, resp.trim(), userdb, m)
}

}

} else return

} catch (error) {
resp = `${error.stack}`
return conn.sendWritingText(m.chat, resp, userdb, m);
}

}
}
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
resp = '*[❗INFO❗] DEBES PONER UN NAME*'
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
user.serial = sn
resp = `\n\n¡¡AHORA TE HE REGISTRADO!!\n\n┏┅ ━━━━━━━━━━━━ ┅ ━
┇「 INFORMACIÓN 」
┣┅ ━━━━━━━━━━━━ ┅ ━
┃ *name:* ${user.name}
┃ *EDAD:* ${user.age} años
┃ *NÚMERO DE SERIE:* 
┃ ${sn}
┗┅ ━━━━━━━━━━━━ ┅ ━\n\n¡TU NÚMERO DE SERIE TE SERVIRÁ TÚ POR SI DESEAS BORRAR TU REGISTRO DEL BOT ${info.nanipe}!\nPara corroborar tu informacion usa:\n'${usedPrefix}profile y si quieres tu numero de serie agrega al comando la frase "numero de serie"` 
user.money += 10000
user.exp += 10000
delete data[who]
return conn.sendWritingText(m.chat, resp, userdb, m );
}
handler.menu = [
{title: "👤 PERFIL", description: `Consulta tu perfil o el de un usuario mencionado`, id: `perfil`},
{title: "👤 REGISTRAR", description: `Registra tus datos en el Bot usando #reg`, id: `reg`},
{title: "❌ UNREGISTRO", description: `quita tu registro del bot, usa el comando #unreg`, id: `unreg`},
{title: "🔢 NUMERO DE SERIE", description: `Consulta tu número de serie, usa el comando #myns`, id: `myns`}
];
handler.help = ['verificar']
handler.tags = ['xp']
handler.command = /^(((un)?(verif(y|icar)|reg(ister|istrar))|(perfil|profile)|(myns|ceksn)))$/i
handler.type = "rpg";
handler.disabled = false;

export default handler
