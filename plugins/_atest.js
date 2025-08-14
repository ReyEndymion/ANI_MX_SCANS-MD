//import * as WABinary_1 from '@whiskeysockets/baileys/lib/WABinary/index.js'
//import * as Types from "@whiskeysockets/baileys/lib/Types/index.js";
//import { decryptMessageNode, generateProfilePicture, generateMessageID } from "@whiskeysockets/baileys/lib/Utils/index.js";
//import * as crypto from 'crypto';
//import { generateMessageIDV2, prepareWAMessageMedia } from '@whiskeysockets/baileys';
//import { nullish } from '../lib/simple.js';
//import { extractGroupMetadata } from '../lib/chats&groups.js';
let handler = async function handler(m, {conn, text, args, usedPrefix, info, command, isAdmin, isOwner, isROwner, isBotAdmin, userdb, senderJid, participants, groupMetadata}) {
const { groupID, userID, lid } = await import('../config.js');
const {proto} = (await import('@whiskeysockets/baileys')).default;
const {default: fs} = await import('fs')
const {default: path} = await import('path')
const {media, imagen1, owner} = await import('../config.js')
const wm = info.np
const pathImgsLoli = path.join(media, 'pictures/lolis')
const readloliImgs = fs.readdirSync(pathImgsLoli)
const img = readloliImgs.map(f => path.join(pathImgsLoli, f)).getRandom()
const bufferImg = fs.readFileSync(img)
const vid = path.join(media, `videos/video.mp4`)
const sections = [{
title: `Título de la sección`,
rows: [
{ header: 'Encabezado1', title: "Título1", description: 'Descripción1', id: usedPrefix + "menu" }, 
{ title: "Título2", description: 'Descripción2', id: "Id2" }, 
{ header: 'Encabezado3', title: "Título3", description: 'Descripción3', id: "Id3" }, 
{ title: "Título4", description: 'Descripción4', id: "Id4" }, 
]},]

//header: 'Encabezado2', header: 'Encabezado4', ['Botón2', 'Id2'], , ['Texto para copiar 2'], ['Enlace2', 'https://example.com/link2'], ['Botón Lista 2', sections], info
if (args[0] === 'carrusel') {
const messages = [
[ // CARRUSEL 1
'Casio original quarzo de dama redondo, plastico, correa plastico, caratula blanca',`${wm}`,fs.readFileSync(img),[['Botón1', `${usedPrefix}menu`]],[['Texto para copiar 1']],[['Enlace1', info.ganisubbots]],[['Botón Lista 1', sections]]
],
/*
text:
footer: 
buffer: 
buttons: //, ['Botón2', 'Id2']
copy: //, ['Texto para copiar 2']
urls: null,//, ['Enlace2', 'https://example.com/link2']
list: null,//null,//null,//null,//null,,null, ['Botón Lista 2', sections]
*/
[ // CARRUSEL 2
'Casio original quarzo de dama cuadrado, plastico, correa plastico, caratula blanca',
`${wm}`,
fs.readFileSync(img),
[['Botón1', 'Id1']],
[['Texto para copiar 1']],
[['Enlace1', 'https://example.com/link1']],
[['Botón Lista 1', sections]]
],
]
return conn.sendCarousel(m.chat, 'Prueba de botones', 'aqui', 'aca', messages, m)
}
const title = '🛍️ Productos Disponibles'
text = `@${senderJid.split('@')[0]} Selecciona una opción de la lista:`
const buttonText = 'Ver opciones'
const footerText = 'test'
let buttons = [['Botón1', `${usedPrefix}menu`], ['Botón2', 'Id2']]
if (args[0] === 'list') {
const messageObj = {title, text, buffer: null, buttonText, listSections: sections, footerText, options: null}
await conn.sendList(m.chat, messageObj, userdb, m )
//jid, quoted
}
const messageContent = {
text: text,
footer: footerText
}
if (args[0] === 'tex') {
//'@'+senderJid
const newText = await conn.textTagsLidToJid(text, m, groupMetadata)
return conn.sendWritingText(m.chat, newText, userdb, m)
}
if (args[0] === 'butt') {
let q = await conn.sendButton(m.chat, messageContent, null, buttons, userdb, m)
const msg = await conn.loadMessage(m.chat, q)
console.log('atest: ', msg)
}
if (args[0] === 'buttimg') {
//, { image: buffer }[{ buttonId: 'id1', buttonText: { displayText: 'button1' }, type: 1 }]
await conn.sendButton(m.chat, messageContent, {url: img}, buttons, userdb, m)

}
if (args[0] === 'buttvid') {
//, [[{ buttonId: 'id1', buttonText: { displayText: 'button1' }, type: 1 }], [{ buttonId: 'id2', buttonText: { displayText: 'button2' }, type: 1 }], [{ buttonId: 'id3', buttonText: { displayText: 'button3' }, type: 1 }] ]
const video = { url: vid }
await conn.sendButton(m.chat, messageContent, video, buttons, userdb, m)
}
if (args[0] === 'buttloc') {
//[{ buttonId: 'row1', buttonText: { displayText: 'button1' }, type: 1 }].find(key => /location(Message)?/.test(key[0])),"caption": text.trim(),"sequenceNumber": "0","text": text,"mentionedJid": []"degreesLatitude": 19.5366116,"degreesLongitude": -99.0691562, {location: { }}, caption: text, contextInfo: {mentionedJid: conn.parseMention(text)}, jpegThumbnail: img
const buffer = {object: {liveLocationMessage: {degreesLatitude: 19.663571, degreesLongitude: -99.068531, sequenceNumber: "0"}}}
await conn.sendButton(m.chat, messageContent, buffer, buttons, userdb, m)

}
if (args[0] === 'buttgif') {
const gif = {
url: vid,
gifPlayback: true,
gifAttribution: Math.random() > 0.5 ? 1 : 2,
jpegThumbnail: await conn.resize(img, 300, 150)
}
await conn.sendButton(m.chat, messageContent, gif, buttons, userdb, m, )
}
if (args[0] === 'buttdoc') {
var doc = ['pdf','zip','vnd.openxmlformats-officedocument.presentationml.presentation','vnd.openxmlformats-officedocument.spreadsheetml.sheet','vnd.openxmlformats-officedocument.wordprocessingml.document']
var document = doc[Math.floor(Math.random() * doc.length)]

let documentMessage = {documentMessage: {
'document': { url: info.hp_animxscans },
'mimetype': `application/${document}`,
'fileName': `「Traducciones de Manga」`,
//'fileLength': 99999999999999,
'pageCount': 200,
'contextInfo': {
'mentionedJid': conn.parseMention(text),
'forwardingScore': 0,
'isForwarded': false,
'externalAdReply': {
"showAdAttribution": true,
"containsAutoReply": true,
"renderLargerThumbnail": true,
'title': `Bot promocional del proyecto ${info.npe}`,
"containsAutoReply": true,
"mediaType": 1, 
'thumbnail': fs.readFileSync(imagen1),
'mediaUrl': info.paypal,
'sourceUrl': info.paypal }},
/*
*/
'caption': text,
'headerType': 6 }}
await conn.sendButton(m.chat, messageContent, {object: documentMessage}, buttons, userdb, m, )

}
if (args[0] === 'buttprod') {
Object.assign(messageContent, {
title: 'moco',
subtitle: 'coco'
})
//{orderMessage: { itemCount : -999999, status: 1, surface : 1, message: info.npe, orderTitle: 'Bang', thumbnail: img, sellerJid: '0@s.whatsapp.net'}}
const product = {
orderMessage: {
currency: "USD",
total_amount: {
value: 42000,
offset: 100
},
reference_id: "Pedido-Xeon123",
type: "physical-goods",
order: {
status: "payment_requested",
subtotal: {
value: 35000,
offset: 100
},
tax: {
value: 5000,
offset: 100
},
discount: {
value: 0,
offset: 100
},
shipping: {
value: 2000,
offset: 100
},
order_type: "ORDER",
items: [
{
retailer_id: "tienda123",
product_id: "producto001",
name: "Camiseta personalizada",
amount: {
value: 35000,
offset: 100
},
quantity: 1
}
]
},
native_payment_methods: [],
share_payment_status: false
}}
buttons = product.orderMessage
await conn.sendButton(m.chat, messageContent, {object: product, url: img}, buttons, userdb, m, )
}
if (args[0] === 'prod') {
//const {default: crypto} = await import('crypto')
//const { generateMessageIDV2, prepareWAMessageMedia } = await import('@whiskeysockets/baileys')
const media = await prepareWAMessageMedia(
{ image: { url: img } },
{ upload: conn.waUploadToServer }
);

const nodoExtra = [
{
attrs: {
native_flow_name: "order_details"
},
tag: "biz"
}
];

const mensajeInteractivo = {
interactiveMessage: {
body: { text: '_Tu pedido est_ listo para pagar!' },
footer: { text: 'Gracias por comprar en Xeon Store _' },
header: {
title: 'Resumen del Pedido',
subtitle: '',
hasMediaAttachment: true,
jpegThumbnail: media.imageMessage.jpegThumbnail
},
nativeFlowMessage: {
buttons: [
{
name: "review_and_pay",
buttonParamsJson: JSON.stringify({
currency: "USD",
total_amount: {
value: 42000,
offset: 100
},
reference_id: "Pedido-Xeon123",
type: "physical-goods",
order: {
status: "payment_requested",
subtotal: {
value: 35000,
offset: 100
},
tax: {
value: 5000,
offset: 100
},
discount: {
value: 0,
offset: 100
},
shipping: {
value: 2000,
offset: 100
},
order_type: "ORDER",
items: [
{
retailer_id: "tienda123",
product_id: "producto001",
name: "Camiseta personalizada",
amount: {
value: 35000,
offset: 100
},
quantity: 1
}
]
},
native_payment_methods: [],
share_payment_status: false
}),
}
],
messageVersion: 1
}
},
messageContextInfo: {
messageSecret: crypto.randomBytes(32)
}
};
return conn.relayMessage(m.chat, mensajeInteractivo, { messageId: generateMessageIDV2(conn.user?.id), additionalNodes: nodoExtra});

}
if (args[0] === 'hydra') {
//bufferImg text = '', footer = '', media = null, buttons = [], urls = [], copy = null, calls = [], options = {} 
const messageFinal = {
text: title,
footer: info.nanie,
buffer: img,
urls: ['https://www.facebook.com/ANIMxSCANS'],
urlText: ['FACEBOOK'],
copy: [['Texto para copiar 1'], ['Texto para copiar 2']],
calls: null,
callText: null,
buttons: [['https://www.facebook.com/groups/otakustogether', 'FACEBOOK'], ['MENU PRINCIPAL', '/menu']]
}
return sendHydratedModern(m.chat, messageFinal, m, conn)

}
if (args[0] === 'ex') {
//const senderJid = conn.decodeJid(m.chat)
let metadataconn = conn.groupMetadata(m.chat)
let metadataplugin = groupMetadata
//conn.decodeJid(senderJid), isROwner, senderJid, participants.find(p => conn.decodeJid(p.id) === senderJid || lidToJidMap[p.id.split('@')[0]] === senderJid).jid.addressingMode
//let extract = extractGroupMetadata(metadata[0])[m.chat], (await conn.groupMetadata(m.chat)), senderJid, m.chat, senderJid, metadataconn

const lidToJidMap = {}
for (const {id, jid} of participants) {
if (id && jid) {
lidToJidMap[id.split('@')[0]] = jid
}
}
//[ conn.decodeJid(conn.user.id), ...owner.map(([number]) => number) ].map((v) => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(participants.find(p => conn.decodeJid(p.id) === senderJid || lidToJidMap[p.id.split('@')[0]] === senderJid).jid), isOwner, metadata

//

}
if (args[0] === 'trad') {
text = await conn.textTagsLidToJid(text, m)
if (userdb.lang === 'es') return text
if (userdb.lang) {
const {default: translate} = await import('@vitalets/google-translate-api')
let result = await translate(`${text}`, { to: userdb.lang, autoCorrect: true })
text = result.text
}
return conn.sendWritingText(m.chat, text, userdb, m )
}


}
handler.command = /^test/i
handler.before = async function before(m, {conn, botdb, userdb, isBotAdmin, botGroup, senderJid, objs}) {
const { groupID, userID, lid } = await import('../config.js');
let {pathBotDBs, inMstore} = objs

//const jid = findJidInAllGroups(allGroups, m.messageStubParameters[0])
//console.log('beforeTest: ', jid)

//let who = m.messageStubParameters[0], text = m.sender
//console.log('nltj: ', rawIds)if (text.endsWith(lid)) 
//who = await lidToJidS(who, m.chat)
//text = await lidToJid(text, m.chat)
//console.log('textNormalize: ', text, who, m.messageStubParameters[0])
//const gmt = m.isGroup ? (await conn.groupMetadata(m.chat)) : []
//const participants = (m.isGroup ? gmt.participants : []) || [];
//const addressingMode = groupMetadata?.addressingMode || 'pn'
//const senderJid = conn.decodeJid(senderJid)
//let userB, botGroup, isRAdmin, isAdmin, isBotAdmin, isROwner, isOwner, isMods, isPrems, chatjid, senderjid
//console.log('handler: ', groupMetadata)participants.find((u) => u.id).id
//userB = (m.isGroup ? participants.find((u) => conn.decodeJid(u.id) === senderJid) : {}) || {}; // User DatasenderJid, isBotAdmin, botGroup, senderJid, conn.user.lid.split(':')[0]botdb
//botGroup = (m.isGroup ? participants.find((u) => conn.decodeJid(u.id).split('@')[0] == conn.user.lid.split(':')[0]) : {}) || {}; // Your Data
//().default BinaryNode.authStatem.mtype.replace(/Message/g, '')._eventsCount.ws.config{ .XWAPaths }.default.ADMIN_COUNTconn.decodeJid()
//var ListType = WAProto.default.proto.Message.ListMessage.ListType;Object.keys(Types.default)userdb.lang
/*
const obj = {}
const sender = senderJid.endsWith(userID)
const lid = m.isGroup ? senderJid.endsWith('@lid') ? senderJid : senderJid : senderJid
obj[m.pushName] = {
sender: sender,
lid: lid
}
const lidToJid = {}
const lidGroups = new Set()
const rawIds = [...m.text.matchAll(/@(\d{5,20})/g)].map(v => v[1])

for (const chat of Object.values(conn.chats)) {
if (chat.id === rawIds + userID) {
console.log('aca: ', [...text.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net'))
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net');
} else if (chat.id.endsWith('@g.us')) {
const participants = chat?.metadata?.participants || []
// Identificar si el grupo usa lid
const isLidGroup = chat?.metadata?.owner?.endsWith('@lid') || chat?.metadata?.subjectOwner?.endsWith('@lid')
if (isLidGroup) lidGroups.add(chat.id)

for (const { id, jid } of participants) {
if (id && jid) {
const lidNum = id.split('@')[0]
lidToJid[lidNum] = {
jid,
original: id, // por si necesitas mantener el @lid
isLid: isLidGroup
}
}
}
}
}
// Buscar menciones como @123456789[...text.matchAll(/@(\d{5,20})/g)].map(v => v[1]), [...text.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net')

// Decidir si usar lid o jid en base al grupo
const mentions = rawIds.map(id => {
const data = lidToJid[id]
if (!data) return id + '@s.whatsapp.net'
return data.isLid ? data.original : data.jid
})

return mentions
*/
async function lidToJid(text, chatjid) {
try {
if (/(\d{5,20})@lid/g.test(text)) {
const rawIds = [...text.matchAll(/(\d{5,20})@lid/g)].map(v => v[1])
if (m.chat.endsWith(userID) ) {
return text
}
if (chatjid.endsWith(groupID)) {
const groupMetadata = conn.chats[chatjid].metadata
const isLidGroup = groupMetadata?.owner?.endsWith('@lid') || groupMetadata?.subjectOwner?.endsWith('@lid')
if (isLidGroup) {
const participants = groupMetadata?.participants || []
for (const { id, jid } of participants) {
if (groupMetadata?.isCommunityAnnounce) continue
if (id && jid) {
const lidNum = id.split('@')[0]
if (rawIds[0] === lidNum) {
text = text.replace(rawIds[0], jid.split('@')[0])
}
} else {
const groupMetadata = (await conn.groupMetadata(chatjid))
const participants = groupMetadata?.participants || []
for (const { id, jid } of participants) {
if (groupMetadata?.isCommunityAnnounce) continue
if (id && jid) {
const lidNum = id.split('@')[0]
if (rawIds[0] === lidNum) {
text = text.replace(rawIds[0], jid.split('@')[0])
}
}
}
}
}
return text.replace(lid, userID)
} else {
return text
}
}
} else {
return text
}
} catch (error) {
}
}
function lidToJidS(string, chatjid) {
try {
if (/(\d{5,20})@lid/g.test(string)) {
const rawIds = [...string.matchAll(/(\d{5,20})@lid/g)].map(v => v[1])
if (chatjid.endsWith(userID) ) {
return string
}
if (chatjid.endsWith(groupID)) {
const groupMetadata = conn.chats[chatjid].metadata
const isLidGroup = groupMetadata?.owner?.endsWith(lid) || groupMetadata?.subjectOwner?.endsWith(lid)
if (isLidGroup) {
const participants = groupMetadata?.participants || []
for (const { id, jid } of participants) {
if (groupMetadata?.isCommunityAnnounce) continue
if (id && jid) {
const lidNum = id.split('@')[0]
if (rawIds[0] === lidNum) {
string = string.replace(rawIds[0], jid.split('@')[0])
}
} else {
const groupMetadata = (conn.groupMetadata(chatjid))
const participants = groupMetadata?.participants || []
for (const { id, jid } of participants) {
if (groupMetadata?.isCommunityAnnounce) continue
if (id && jid) {
const lidNum = id.split('@')[0]
if (rawIds[0] === lidNum) {
text = text.replace(rawIds[0], jid.split('@')[0])
}
console.log('testlidtojidS: ', id, jid, string)
}
}
}

}
return string.replace(lid, userID)
} else {
return string
}
}
} else {
return string
}
} catch (error) {
}

}


}
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
function lidToJid1(text, chatjid, conn) {
return (async () => {
if (!/(\d{5,20})@lid/g.test(text)) return text;

const rawIds = [...text.matchAll(/(\d{5,20})@lid/g)].map(v => v[1]);
if (chatjid.endsWith(userID)) return text;

let metadata = conn.chats?.[chatjid]?.metadata;

// Si no hay metadata cacheado o el usuario no se encuentra, actualiza
const findInMetadata = (meta) => {
const participants = meta?.participants || [];
for (const { id, jid } of participants) {
if (meta?.isCommunityAnnounce) continue;
if (!id || !jid) continue;
const lidNum = id.split('@')[0];
if (rawIds[0] === lidNum) {
return text.replace(rawIds[0], jid.split('@')[0]).replace(lid, userID);
}
}
return null;
};

let result = metadata ? findInMetadata(metadata) : null;
if (result) return result;

try {
metadata = await conn.groupMetadata(chatjid);
conn.chats[chatjid] = conn.chats[chatjid] || {};
conn.chats[chatjid].metadata = metadata;
result = findInMetadata(metadata);
if (result) return result;
} catch (e) {
console.warn('Error actualizando metadata:', e);
}

// No encontró lid ni en caché ni en metadata fresco
return text;
})();
}

function lidToJid2(text, chatjid, conn) {
 if (!/(\d{5,20})@lid/.test(text)) return text;

 const rawIds = [...text.matchAll(/(\d{5,20})@lid/g)].map(v => v[1]);
 if (chatjid.endsWith(userID)) return text;

 const localMetadata = conn.chats?.[chatjid]?.metadata;

 const resolveFromMetadata = (meta) => {
   const participants = meta?.participants || [];
   for (const { id, jid } of participants) {
     if (meta?.isCommunityAnnounce) continue;
     if (!id || !jid) continue;
     const lidNum = id.split('@')[0];
     if (rawIds[0] === lidNum) {
       return text.replace(rawIds[0], jid.split('@')[0]).replace(lid, userID);
     }
   }
   return null;
 };

 const resolved = resolveFromMetadata(localMetadata);
 if (resolved) return resolved;

 // Si no se pudo resolver con metadata en caché, devolvemos una Promesa
 return (async () => {
   try {
     const metadata = await conn.groupMetadata(chatjid);
     conn.chats[chatjid] = conn.chats[chatjid] || {};
     conn.chats[chatjid].metadata = metadata;

     const result = resolveFromMetadata(metadata);
     return result ? result : text;
   } catch (e) {
     console.warn('No se pudo obtener metadata remota:', e);
     return text;
   }
 })();
}