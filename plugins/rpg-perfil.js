import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, participants }) => {
let pp = 'https://i.imgur.com/WHjtUae.jpg'
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!(who in global.db.data.users)) throw `El usuario que está mencionando no está registrado en mi base de datos`
try {
pp = await conn.profilePictureUrl(who)
} catch (e) {

} finally {
let { name, limit, lastclaim, registered, regTime, age } = global.db.data.users[who]
let username =`@${who.split`@`[0]}`//conn.getName(who)
let prem = global.prems.includes(who.split`@`[0])
let sn = createHash('md5').update(who).digest('hex')
let str = `*NOMBRE:* ${username} ${registered ? '(' + name + ') ': ''}
*NUMERO:* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
*LINK:* wa.me/${who.split`@`[0]}${registered ? '\n*EDAD:* ' + age + ' años' : ''}
*LIMITE:* ${limit} USOS
*REGISTRADO:* ${registered ? 'Si': 'No'}
*PREMIUM:* ${prem ? 'Si' : 'No'}
*NUMERO DE SERIE:* ${sn}\n\n[['MENU PRINCIPAL' usa: '/menu']]`
let txt = '';
let count = 0;
for (const c of str) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
conn.sendMessage(m.chat, {image:{url: pp}, caption: txt + ' ' + wm, mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
}
}
handler.help = ['profile [@user]']
handler.tags = ['xp']
handler.command = /^perfil|profile?$/i
export default handler
