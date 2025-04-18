import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command, text, args }) => {
let resp = '', imagen
//imagen = 'https://i.imgur.com/WHjtUae.jpg'
const bot = global.db.data.bot[conn.user.jid]
const chats = bot.chats || {}
const privs = chats.privs || {}
const groups = chats.groups || {}
const chat = m.isGroup ? groups[m.chat] || {} : privs[m.chat] || {}
const users = m.isGroup ? chat.users || {} : privs || {}
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let user = m.isGroup ? users[who] || {} : privs[who] || {}

try {
if (user) {
let { name, limit, lastclaim, registered, regTime, age } = user
let username =`@${who.split`@`[0]}`//conn.getName(who)PhoneNumber()//.getNumber('international')
let prem = global.prems.includes(who.split`@`[0])
let sn = createHash('md5').update(who).digest('hex')
if (!(who in users)) {
resp = `El usuario que está mencionando no está registrado en mi base de datos`
} else {
console.log(`profile: `, who.replace('@s.whatsapp.net', ''))
try {
imagen = await conn.profilePictureUrl(who)
} catch (e) {
resp = `${e.stack}`
} finally {
if (text) {
resp = `*NOMBRE:* ${username} ${registered ? `(${name}) '`: ''}
*NUMERO:* ${PhoneNumber(`+${who.replace('@s.whatsapp.net', '')}`).getNumber('international')}
*LINK:* wa.me/${who.split`@`[0]}
${registered ? `*EDAD:*${age} años` : ''}
*LIMITE:* ${limit} USOS
*REGISTRADO:* ${registered ? 'Si': 'No'}
*PREMIUM:* ${prem ? 'Si' : 'No'}
*NUMERO DE SERIE:* ${sn}\n\n*Puedes pedir tu numero de serie individual añadiendo al comando las palabras "numero de serie", ejemplo*:\n*${usedPrefix + command} numero de serie*\n\n${wm}`
} else {
resp = `*NOMBRE:* ${username} ${registered ? '(' + name + ') ': ''}
*NUMERO:* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
*LINK:* wa.me/${who.split`@`[0]}${registered ? '\n*EDAD:* ' + age + ' años' : ''}
*LIMITE:* ${limit} USOS
*REGISTRADO:* ${registered ? 'Si': 'No'}
*PREMIUM:* ${prem ? 'Si' : 'No'}
*NUMERO DE SERIE:* ${sn}\n\n*Puedes pedir tu numero de serie individual añadiendo al comando las palabras "numero de serie", ejemplo*:\n*${usedPrefix + command} numero de serie*\n\n${wm}`
}
if (/n(u|ú)mero de serie/ig.test(text)) {
resp = `${sn}`
}
}
}
} else return

} catch (error) {
resp = `${error.stack}`
}
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 5));
txt += c;
count++;

if (count % 10 === 0) {
 await conn.sendPresenceUpdate('composing' , m.chat);
}
}
if (imagen) {
return conn.sendMessage(m.chat, {image: {url: imagen}, caption: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} else {
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
}
handler.help = ['profile [@user]']
handler.tags = ['xp']
handler.command = /^perfil|profile?$/i
export default handler
