
const handler = async (m, {conn, text, usedPrefix, groupMetadata, command, db, objs, userdb, senderJid}) => {
const fs = await import('fs');
const {imagen1} = objs;
const {userID, lid} = await import('../config.js');
const {isNumber, formatNumberWA, soloNumeros} = await import('../lib/functions.js');
const cm = JSON.parse(await conn.lidToJidPromises(JSON.stringify(m), m.chat))
cm.key.fromMe = false;
cm.message[m.mtype] = JSON.parse(await conn.lidToJidPromises(JSON.stringify(m.msg), m.chat));
let who;
if (text.includes('@0')) { 
who = '0@s.whatsapp.net';
}
if (text.includes('||') ) {
const [antes, despues] = text.split('||');
if (isNumber(soloNumeros(text.split('||')[1])) && !text.includes('@')) {
const number = soloNumeros(text.split('||')[1])
text = `${antes} @${number} ${despues.replace(text.split('||')[1].match(/\+?\d[\d\s-]*/g), '').trim()}`
who = formatNumberWA(number) + userID;
}
if (m.quoted && m.quoted.sender) {
who = cm.participant = conn.lidToJid(m.quoted.sender, m.chat);
text =  `${antes} @${who.split`@`[0]} ${despues}`
}
} else if (m.isGroup && !text.includes('||')) {
who = cm.participant = conn.lidToJid(m.mentionedJid[0], m.chat);
} else {
who = m.chat;
}
if (m.isGroup && !who) {
let resp = `*[❗INFO❗] USO DEL COMANDO*\n\n*${usedPrefix + command}* textoFake @${senderJid.split`@`[0]} respuestaBot\n\nPuede *usar* el *numero de telefono* si el usuario no es encuentra en el *grupo*`;
return conn.sendWritingText(m.chat, resp, userdb, m)
} else if (!who) {
let resp = `*[❗INFO❗] USO DEL COMANDO*\n\n*${usedPrefix + command}* hola @${senderJid.split`@`[0]} a\n\nPara privados a mencionar '||' para citar un mensaje inexistente del bot`;
return conn.sendWritingText(m.chat, resp, userdb, m)
}
const sp = '@' + who.split`@`[0];
const [fake, ...real] = text.split(sp);
let q
const indiceAleatorio = Math.floor(Math.random() * text.length);
const dir = text[indiceAleatorio];
if (!fake) {
let resp = `*[❗INFO❗] USO DEL COMANDO*\n\n*${usedPrefix + command}* hola @${senderJid.split`@`[0]} a\n\nPara privados a mencionar '||' para citar un mensaje inexistente del bot`;
return conn.sendWritingText(m.chat, resp, userdb, m)
}
q = { key: { fromMe: false, participant: who, remoteJid: m.chat}, message: { "extendedTextMessage": { "text": `${fake} `}}, participant: who}
if (fake.includes('audio')) {
let duration
text.includes('|') && isNumber(text.split('|')[1].trim().split(' ')[0]) ? duration = text.split('|')[1].trim().split(' ')[0] : duration = indiceAleatorio
q = { key: {fromMe: false, participant: who, ...(m.chat ? { remoteJid: m.chat } : {}) }, message: {"audioMessage": { "mimetype":"audio/ogg; codecs=opus", "seconds": duration, "ptt": "true"}}, participant: who} 
} else if (fake.includes('grupo')) {
q = {key: {fromMe: false, participant: who, remoteJid: m.chat}, message: {groupInviteMessage: {groupJid: "1234567890-9876543210@g.us", inviteCode: `\n`, groupName: `\n`, caption: `${fake.replace('grupo', '')}`, jpegThumbnail: fs.readFileSync(imagen1)}}, participant: who}
} else if (fake.includes('stor')) {
q = { key: {fromMe: false, participant: who }, message: {orderMessage: { itemCount : indiceAleatorio, status: 1, surface : 1, message: fake.replace('stor', ''), orderTitle: 'Bang', thumbnail: fs.readFileSync(imagen1), sellerJid: '0@s.whatsapp.net'}}, participant: who}
} else if (fake.includes('video')) {
let duration
text.includes('|') && isNumber(text.split('|')[1].trim().split(' ')[0]) ? duration = text.split('|')[1].trim().split(' ')[0] : duration = indiceAleatorio
const caption = fake.replace('video', '').replace('|', '').replace(duration, '').trim();
q = { key: {fromMe: false, participant: who, ...(m.chat ? { remoteJid: m.chat } : {}) }, message: {"videoMessage": { "mimetype": 'video/mp4', caption: caption, jpegThumbnail: fs.readFileSync(imagen1), "seconds": duration, "ptt": "true"}}, participant: who}
} else if (fake.includes('doc')) {
q = {key : {fromMe: false, participant : who},message: {documentMessage: {title: `${fake.replace('doc', '')} `}}, participant: who}
}
const textEnd = real.join(sp).trimStart().replace(text.split('||')[1], '');
console.log('fakeReply: ', fake, real, who, textEnd)
return conn.sendWritingText(m.chat, real.join(sp).trimStart(), userdb, q)
};
handler.help = ['fake <text> @user <text2>'];
handler.tags = ['tools'];
handler.command = /^(fitnah|fakereply|fake)$/;

handler.menu = [
{title: "🎖️ FAKEREPLY", description: "usa #fakereply (mensaje) <numero / @tag> (mensaje respondido) o contesta a un mensaje\n\n Puedes audio doc video o stor para mostrar diferentes Tipos de mensajes Falsos respondidos... ejemplo: #fakereply audio 1234|| @usuario (mensaje)\n", id: `fakereply`},
];
handler.type = "fun";

handler.disabled = false;

export default handler;

function copy(obj) {
return JSON.parse(JSON.stringify(obj));
}
