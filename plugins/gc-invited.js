import path, {join} from 'path'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = (await import('@whiskeysockets/baileys')).default
import fetch from 'node-fetch'
import fs from 'fs'

let handler = async (m, {conn, info, args, participants, text, jid, usedPrefix, command, db, userdb, senderJid, isLidGroup}) => {
const {delay, formatNumberWA} = await import('../lib/functions.js')
const {userID, media} = await import('../config.js')
if (args.length === 0) {
return conn.sendWritingText(m.chat, `El uso correcto de este comando es: *${usedPrefix+command}* numero, numero ...etc | mensaje`, m)
} else {

let q = await conn.sendWritingText(m.chat, `Procesando solicitud`, userdb, m);
try {
let usuariosNoRegistrados = [];
let usuariosEnGrupo = [];
let usuariosInvitar = [];
const parts = text.toString().split('|')
const rawNumbers = parts[0];
const splitNumbers = rawNumbers.split(',');
for (const invitado of splitNumbers) {
let rawNumber = invitado.replace(/[^\d]/g, '')
let numero = formatNumberWA(rawNumber)
let _participants = participants.map(user => isLidGroup ? user.phoneNumber : user.id)
let numeros = numero.split(',').map(v => v.replace(/[^0-9]/g, '')).filter(v => v.length > 4 && v.length < 20);
for (let v of numeros) {
let waId = v + userID;

let [isRegistered] = await conn.onWhatsApp(waId);
if (!isRegistered?.exists) {
usuariosNoRegistrados.push(v);
continue;
}
if (_participants.includes(waId)) {
usuariosEnGrupo.push(v);
continue;
}

usuariosInvitar.push(waId);
}

let textPersonal = parts[1]

if (usuariosInvitar.length > 0) {
const jid = numero + userID
let name = (await conn.groupMetadata(m.chat)).subject
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat)
const invite_code_exp = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
try {
var pp = await conn.profilePictureUrl(m.chat, 'image')
var img = await (await fetch(pp)).buffer()
} catch {
var img = fs.readFileSync(path.join(media, 'pictures/sinFoto.png'))
}
const inviteMessage = textPersonal !== (''||undefined) ? textPersonal : `🌎 Que tal @${jid.split('@')[0]}, soy el Bot ${info.nanipe} que esta en este grupo, me han pedido que te envié está invitación porque no te pude añadir, esperemos que aceptes... Bienvenido al grupo 🌏🤝🏼`

let txt = await conn.writing(jid, inviteMessage)
let prep = generateWAMessageFromContent(m.chat, {
extendedTextMessage: {
text: txt,
contextInfo: {
mentionedJid: await conn.parseMention(txt),
externalAdReply: { body: false,
containsAutoReply: true,
mediaType: 2,
mediaUrl: link,
renderLargerThumbnail: true,
showAdAttribution: false,
sourceId: name,
sourceUrl: link,
thumbnail: img,
thumbnailUrl: img,
title: name
}}}}, { userJid: jid, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}) 
let isBlocked = false
console.log('invitar: ', jid)
await conn.fetchBlocklist().then(async data => {
for (let i of data) {
if (i === jid) {
isBlocked = true
}
}
}).catch(async err => {
console.log('error en lista de bloqueados', err);
})
if (isBlocked) {
await conn.updateBlockStatus(jid, 'unblock')
await delay (1 * 40000)
await conn.relayMessage(jid, prep.message, {messageId: prep.key.id, user: conn.user.jid});
} else {
await delay (1 * 40000)
await conn.relayMessage(jid, prep.message, {messageId: prep.key.id,user: conn.user.jid});
}
}
}

let messageToSend = '';

if (usuariosEnGrupo.length > 0) {
messageToSend = `Los siguientes usuarios ya están en el grupo:\n${usuariosEnGrupo.map(u => `@${u.split('@')[0]}`).join(', ')}\n\n`;
await conn.sendEditWritingText(m.chat, messageToSend, q.key, userdb, m);
}
if (usuariosNoRegistrados.length > 0) {
messageToSend = `Los siguientes números no están registrados en WhatsApp:\n${usuariosNoRegistrados.join(', ')}\n\n`;
await conn.sendEditWritingText(m.chat, messageToSend, q.key, userdb, m);
}
if (usuariosInvitar.length > 0) {
messageToSend = `Se ha enviado la invitación a los siguientes usuarios:\n${usuariosInvitar.map(u => `@${u.split('@')[0]}`).join(', ')}\n\n`;
await conn.sendEditWritingText(m.chat, messageToSend, q.key, userdb, m);
} else {
messageToSend = 'No se encontraron números válidos para invitar.';
await conn.sendEditWritingText(m.chat, messageToSend, q.key, userdb, m);
}

} catch (error) {
return conn.sendWritingText(m.chat, error.stack.toString(), userdb, m)
}
}
}

handler.help = ['invite', 'invitar'].map(v => v + ' número')
handler.tags = ['group']
handler.command = /^(invite|invitar)$/i
handler.admin = handler.group = handler.botAdmin = true
handler.menu = [
{title:"💎 INVITAR A USUARIOS", description: "invita a los usuarios al grupo usando #invite <número>, <número> ...etc | mensaje", id: `invite`}
];
handler.type = "gadmin";
handler.disabled = false;

export default handler
