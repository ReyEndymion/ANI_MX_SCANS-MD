import Presence from '@whiskeysockets/baileys'
let handler  = async (m, { conn, args, text }) => {
if (!text && !m.quoted) {
    let resp = `*[❗INFO❗] INGRESE EL NOMBRE QUE DESEA QUE SEA EL NUEVO NOMBRE DEL GRUPO O CONTESTE A UN MENSAJE QUE TENGA UN TAG Y SEA COMPATIBLE CON LA CANTIDAD DE 25 CARÁCTERES*`
    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;
    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
    }
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
try {
let text2 = m.quoted ? m.quoted.text : text
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
let txto = [] //text2.replace('@' + who.replace(/\s+/g, '').split`@`[0], name).trim()
let mentions = [...text2.matchAll(/@\d+/g)]; // Buscar menciones

    for (const mention of mentions) {
        const phoneNumber = mention[0].replace('@', '');
        const name = await conn.getName(`${phoneNumber}@s.whatsapp.net`);
        txto = text2.replace(new RegExp(mention[0], 'g'), name);
    }
conn.groupUpdateSubject(m.chat, txto)
} catch (e) {
let resp = `*[❗INFO❗] LO SIENTO HUBO UN ERROR ${e}, EL NOMBRE NO PUEDE SER MAS DE 25 CARACTERES*`
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 15));
txt += c;
count++;
if (count % 10 === 0) {
    conn.sendPresenceUpdate('composing' , m.chat);
}
}
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}}
handler.help = ['setname <text>']
handler.tags = ['group']
handler.command = /^(setname)$/i
handler.group = true
handler.admin = true
export default handler
//adaptación https://github.com/SinNombre999
//arreglos finales Rey Endymion 