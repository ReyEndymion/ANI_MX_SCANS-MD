/**
 * Unificación de comandos para taggear usuarios construido por ReyEndymion
 */
let handler = async (m, {conn, text, info, usedPrefix, command, participants, groupMetadata, args, db, userdb, senderJid, objs, isLidGroup}) => {
const { generateWAMessageFromContent } = await import('@whiskeysockets/baileys')
const {imagen1} = objs
const { randomString } = await import('../lib/functions.js');
let { default: fetch } = await import('node-fetch');
let { Jimp } = await import('jimp');
const path = await import('path')
const fs = await import('fs')
const { temp, media, userID, lid } = await import('../config.js')
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => isLidGroup ? `${i + 1}. @${v.phoneNumber.split('@')[0]}` : `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => fs.readFileSync(join(media, 'pictures/sinFotoG.png')));
const profilePicture = await Jimp.read(await (await fetch(pp)).buffer());
let msg = args.join` `
let oi = `*MENSAJE:* ${msg}`

if (/^((@)?adm(ins)?)$/i.test(command)) {
const lettersImage = await Jimp.read(fs.readFileSync(path.join(media, 'pictures/invAdmins.png')));
lettersImage.resize(profilePicture.getWidth(), profilePicture.getHeight());
profilePicture.composite(lettersImage, 0, 0);
const img = path.join(temp, `${randomString(5)}.jpg`);
await profilePicture.writeAsync(img);


let text = `*━「*INVOCANDO ADMINS*」━*\n\n${oi}\n\n*ADMINS:*\n${listAdmin}\n\n*[ ⚠ ️] USAR ESTE COMANDO SOLO CUANDO SE TRATE DE UNA EMERGENCIA!!*\n\n${info.nanipe}`.trim()
return conn.sendImageWriting(m.chat, img, text, userdb, m );
}
if (/^ownergroup$/i.test(command)) {
const owner = groupMetadata?.ownerPn && groupMetadata?.owner ? groupMetadata.owner.endsWith(lid) ? groupMetadata.ownerPn : groupMetadata.owner : false
let text = '', ownertag
if (owner) {
const isOwnerGroup = participants.find(p => isLidGroup ? owner === p.phoneNumber : owner === p.id)
if (isOwnerGroup) {
ownertag = owner.split('@')[0]
if (isOwnerGroup.admin === 'superadmin') {
text = `*━「*INVOCANDO AL CREADOR DEL GRUPO*」━*\n\n${oi}\n\n*CREADORGP:*\n@${ownertag}\n\n*[ ⚠ ️] USAR ESTE COMANDO SOLO CUANDO SE TRATE DE UNA EMERGENCIA!!*\n\n${info.nanipe}`.trim()
}
if (isOwnerGroup.admin === 'admin') {
text = `*EL CREADOR DEL GRUPO* @${ownertag} esta presente, pero da lo mismo que hablar con otro admin ya que no es inmutable`
}
} else {
text = `EL CREADOR DEL GRUPO esta ausente, pero el admin que ha hecho cambios al grupo @${(groupMetadata.subjectOwner.endsWith(lid) ? groupMetadata.subjectOwnerPn : groupMetadata.subjectOwner).split('@')[0]} u otro admin pueden ayudarte`
}
} else {
text = `EL CREADOR DEL GRUPO *no existe*\n\nPide ayuda a cualquiera de los siguientes admins:\n${listAdmin}`
}
return conn.sendWritingText(m.chat, text, userdb, m );
}
if (/^(users|usuarios)$/i.test(command)) {
const lettersImage = await Jimp.read(fs.readFileSync(path.join(media, 'pictures/invUsers.png')));
lettersImage.resize(profilePicture.getWidth(), profilePicture.getHeight());
profilePicture.composite(lettersImage, 0, 0);
const img = path.join(temp, `${randomString(5)}.jpg`);
await profilePicture.writeAsync(img);
const groupNoAdmins = participants.filter(p => !p.admin)
const listUsers = groupNoAdmins.map((v, i) => isLidGroup ? `${i + 1}. @${v.phoneNumber.split('@')[0]}` : `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
if (listUsers.length === 0) return conn.sendWritingText(m.chat, `[❗] EN ESTE GRUPO SÓLO HAY ADMINS NO PUEDO LLAMAR A LOS USUARIOS`, userdb, m)
let pesan = args.join` `
let oi = `*MENSAJE:* ${pesan}`
let text = `━「 *INVOCANDO USUARIOS* 」━\n\n${oi}\n\n*USUARIOS:*\n${listUsers}\n\n> ${info.nanipe}`.trim()
return conn.sendImageWriting(m.chat, img, text, userdb, m);
}
if (/^(list(a)?num)$/i.test(command)) {
if (!args[0] || isNaN(args[0])) return conn.sendWritingText(m.chat, `*[❗] INGRESA EL PREFIJO DE ALGUN PAIS PARA BUSCAR NUMEROS EN ESTE GRUPO DE ESE PAIS, EJEMPLO: ${usedPrefix + command} 52*`, userdb, m) 
let lol = args[0].replace(/[+]/g, '')
let ps = participants.map(u => isLidGroup ? u.phoneNumber : u.id).filter(v => v !== conn.user.jid && v.startsWith(lol)) 
if (ps == '') return conn.sendWritingText(m.chat, `*[❗] EN ESTE GRUPO NO HAY NINGUN NUMERO CON EL PREFIJO +${lol}*`, userdb, m)
let numeros = ps.map(v=> '⭔ @' + v.replace(/@.+/, ''))
return conn.sendWritingText(m.chat, `*LISTA DE NUMEROS CON EL PREFIJO +${lol} QUE ESTAN EN ESTE GRUPO:*\n\n` + numeros.join`\n`, userdb, m)
}
if (/^(tagall|invoca(r|ci(o|ó)n)|todos)$/i.test(command)) {
const lettersImage = await Jimp.read(fs.readFileSync(join(media, 'pictures/invAll.png')));

lettersImage.resize(profilePicture.getWidth(), profilePicture.getHeight());

profilePicture.composite(lettersImage, 0, 0);

const img = path.join(temp, `${randomString(5)}.jpg`);
await profilePicture.writeAsync(img);

let pesan = args.join` `
let oi = `*MENSAJE:* ${pesan}`
let teks = `*⺀INVOCANDO - GRUPO⺀*\n\n❏ ${oi}\n\n❏ *ETIQUETAS:*\n`
for (let mem of participants) {
teks += `┣➥ @${mem.id.split('@')[0]}\n`}
teks += `*└* BY ${info.nanip}\n\n*▌│█║▌║▌║║▌║▌║▌║█*`
return conn.sendImageWriting(m.chat, img, teks, userdb, m);
}
if (/^hidetag|notif(icar|y)$/i.test(command)) {
if (m.isBaileys) return
let users = participants.map(u => isLidGroup ? conn.decodeJid(u.phoneNumber) : conn.decodeJid(u.id))
try {
let q = m.quoted ? m.quoted : m || m.text || senderJid
let d = m.quoted ? await m.getQuotedObj() : m.msg || m.text || senderJid
let msg = conn.cMod(m.chat, generateWAMessageFromContent(m.chat, { [m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? d.message[q.mtype] : { text: '' || d }}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100, userJid: conn.user.id }), text || q.text, conn.user.jid, { mentions: users, gpmentions: await conn.parseGroupMention(text || q?.text || '')})
try {
if (msg.message.extendedTextMessage && msg.message.extendedTextMessage.text !== undefined) {
await conn.writing(m.chat, msg.message.extendedTextMessage.text) 
}
await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id }, {quoted: m, ephemeralExpiration: 2*60*1000})
} catch (error) {
await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id }, {quoted: m, ephemeralExpiration: 2*60*1000, disappearingMessagesInChat: 24*60*100})
console.log('texto: ', msg.message + error)
}
} catch (e) {
console.log('texto error: ', e)

/**
[ By @NeKosmic || https://github.com/NeKosmic/ ]
**/

let quoted = m.quoted ? m.quoted : m
let mime = (quoted.msg || quoted).mimetype || ''
let isMedia = /image|video|sticker|audio/.test(mime)
let more = String.fromCharCode(8206)
let masss = more.repeat(850)
let htextos = `${text ? text : "*Hola :D*: " + e }`
const messageFinal = {extendedTextMessage: {
text: `${masss}\n${htextos}\n`,
...{ contextInfo: { 
mentionedJid: users, gpmentions: await conn.parseGroupMention(text || q?.text || ''), externalAdReply: { thumbnail: fs.readFileSync(imagen1), sourceUrl: info.repoProyect }}}}}
if ((isMedia && quoted.mtype === 'imageMessage') && htextos) {
var mediax = await quoted.download?.()
conn.sendMessage(m.chat, { image: mediax, mentions: users, caption: htextos, mentions: users, gpmentions: await conn.parseGroupMention(text || q?.text || '') }, { quoted: m, ephemeralExpiration: 2*60*1000 })
} else if ((isMedia && quoted.mtype === 'videoMessage') && htextos) {
var mediax = await quoted.download?.()
conn.sendMessage(m.chat, { video: mediax, mentions: users, mimetype: 'video/mp4', caption: htextos }, { quoted: m, ephemeralExpiration: 2*60*1000 })
} else if ((isMedia && quoted.mtype === 'audioMessage') && htextos) {
var mediax = await quoted.download?.()
conn.sendMessage(m.chat, { audio: mediax, mentions: users, mimetype: 'audio/mp4', fileName: `Hidetag.mp3` }, { quoted: m, ephemeralExpiration: 2*60*1000 })
} else if ((isMedia && quoted.mtype === 'stickerMessage') && htextos) {
var mediax = await quoted.download?.()
conn.sendMessage(m.chat, {sticker: mediax, mentions: users}, { quoted: m, ephemeralExpiration: 2*60*1000 })
} else {
await conn.relayMessage(m.chat, messageFinal, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
}
}
}
handler.help = ['admins <texto>']
handler.tags = ['group']
handler.command = /^(((@)?adm(ins)?|ownergroup|us(ers|uarios)|list(a)?num|tagall|invoca(r|ci(o|ó)n)|todos|hidetag|notif(icar|y)))$/i
handler.group = true
handler.menu = [
{title:"💎 INVOCAR AL OWNER DEL GRUPO", description: "invoca al owner del grupo usando #ownergroup <mensaje>", id: `ownergroup`},
{title:"💎 INVOCAR A ADMINS", description: "invoca a los administradores del grupo usando #admins <mensaje>", id: `admins`},
{title: "💎 LISTA DE NUMEROS POR PREFIJO", description: "hace una lista de numeros invocandolos a travez de su prefijo usando #listnum", id: `listanum`},
{title:"💎 INVOCAR A USUARIOS", description: "invoca a todos los usuarios del grupo usando #users <mensaje>", id: `users`},
{title:"💎 INVOCAR A TODOS", description: "invoca a todos los miembros del grupo usando #tagall <mensaje>", id: `tagall`},
{title: "💎 NOTIFICAR A TODOS", description: "notifica a todos los miembros del grupo usando #hidetag <mensaje>", id: `hidetag`}
];
handler.type = "gadmin";
handler.disabled = false;

export default handler
