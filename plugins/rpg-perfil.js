const fetch = await import('node-fetch');
let handler = async (m, {conn, info, usedPrefix, command, text, args, privsdb, usersdb, db, userdb, senderJid}) => {
const {prems} = await import('../config.js')
let resp = '', imagen
//imagen = 'https://i.imgur.com/WHjtUae.jpg'
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid

try {
if (userdb) {
let { name, limit, lastclaim, registered, regTime, age } = userdb
let username =`@${who.split`@`[0]}`//conn.getName(who)PhoneNumber()//.getNumber('international')
let prem = prems.includes(who.split`@`[0])
const { createHash } = await import('crypto')
let sn = createHash('md5').update(who).digest('hex')
if (!(who in usersdb)) {
resp = `El usuario que está mencionando no está registrado en mi base de datos`
return conn.sendWritingText(m.chat, resp, userdb, m);
} else {
try {
imagen = await conn.profilePictureUrl(who)
} catch (e) {
resp = `${e.stack}`
} finally {}
const {default: PhoneNumber} = await import('awesome-phonenumber');
if (!text) {
resp = `*NOMBRE:* ${username} ${registered ? `(${name}) '`: ''}
*NUMERO:* ${PhoneNumber(`+${who.replace('@s.whatsapp.net', '')}`).getNumber('international')}
*LINK:* wa.me/${who.split`@`[0]}
${registered ? `*EDAD:*${age} años` : ''}
*LIMITE:* ${limit} USOS
*REGISTRADO:* ${registered ? 'Si': 'No'}
*PREMIUM:* ${prem ? 'Si' : 'No'}
*NUMERO DE SERIE:* ${sn}\n\n*Puedes pedir tu numero de serie individual añadiendo al comando las palabras "numero de serie", ejemplo*:\n*${usedPrefix + command} numero de serie*\n\n${info.nanie}`
return conn.sendImageWriting(m.chat, imagen, resp.trim(), userdb, m)
} else if (text && who) {
console.log(`profile: `, who.replace('@s.whatsapp.net', ''), text, imagen)
resp = `*NOMBRE:* ${username} ${registered ? '(' + name + ') ': ''}
*NUMERO:* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
*LINK:* wa.me/${who.split`@`[0]}${registered ? '\n*EDAD:* ' + age + ' años' : ''}
*LIMITE:* ${limit} USOS
*REGISTRADO:* ${registered ? 'Si': 'No'}
*PREMIUM:* ${prem ? 'Si' : 'No'}
*NUMERO DE SERIE:* ${sn}\n\n*Puedes pedir tu numero de serie individual añadiendo al comando las palabras "numero de serie", ejemplo*:\n*${usedPrefix + command} numero de serie*\n\n${info.nanie}`
return conn.sendImageWriting(m.chat, imagen, resp.trim(), userdb, m)
} else if (/n(u|ú)mero de serie/ig.test(text)) {
resp = `${sn}`
return conn.sendWritingText(m.chat, resp, userdb, m);
}

}


} else return

} catch (error) {
resp = `${error.stack}`
}
await conn.writing(m.chat, resp)
if (imagen) {
} else {
}
}
handler.help = ['profile [@user]']
handler.tags = ['xp']
handler.command = /^perfil|profile?$/i
handler.menu = [
{title: "👤 PERFIL", description: `Consulta tu perfil o el de un usuario mencionado`, id: `perfil`},
];
handler.type = "rpg";
handler.disabled = false;

export default handler
