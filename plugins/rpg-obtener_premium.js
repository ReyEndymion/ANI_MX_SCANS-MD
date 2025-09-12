import { rpgshop, rpgshopp } from "../rpg.js"
import { owner, temp, newsletterID, sBroadCastID, groupID, media} from '../config.js'
let handler = async (m, {conn, start, info, text, usedPrefix, command, args, userdb, db, senderJid}) => {
const userName = await conn.getName(senderJid)
const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${senderJid.split('@')[0]}:${senderJid.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" 
}
const imgpre = [ 
'https://logowiki.net/wp-content/uploads/imgp/Premium-Logo-1-5365.jpg', 
'https://img.freepik.com/vector-gratis/coleccion-premium-vector-diseno-placa_53876-66755.jpg',
'https://img.freepik.com/vector-gratis/coleccion-premium-vector-diseno-placa_53876-43822.jpg',
'https://img.freepik.com/vector-gratis/coleccion-premium-vector-diseno-placa_53876-43821.jpg',
'https://www.logotypes101.com/logos/824/A62623847AE4496B7293312FD32E379F/premium-gas-stoves.png',
];
const img = imgpre[Math.floor(Math.random() * imgpre.length)]
const buff = `😻 *Ahora tiene Premium por lo tanto no va tener límites.*\n\n${info.nanie}`
let template = (args[0] || '').toLowerCase() 
if (/prem1/i.test(command)) {
var tiempoPremium = 5 * text //tiempo total 
var tiempoDecretado = 5 * 1 //tiempo decretado 
const limitNumber = 15

if (!text) return conn.sendWritingText(m.chat, `*INGRESA EL NÚMERO DE TIEMPO PREMIUM\n\n*✤ 🎟️ 1 = ${tiempoDecretado} MIMUTOS*\n*✤ ${limitNumber} ${rpgshop.emoticon('limit')}*\n\n*EJEMPLO: ${usedPrefix + command} 1*`, userdb, m)
if (isNaN(text)) return conn.sendWritingText(m.chat, `${userName} SÓLO SE ACEPTAN NÚMEROS\n\n*EJEMPLO: ${usedPrefix + command} 1*`, fkontak, m)
if (userdb.limit < limitNumber) return conn.sendWritingText(m.chat, `${userName} NO TIENES SUFICIENTES *${rpgshop.emoticon('limit')}* PARA ADQUIRIR 🎟️ PREMIUM\n\nCOMPRE ${rpgshopp.emoticon('limit')} EN LA TIENDA USANDO EL COMANDO:\n*${usedPrefix}buy*\nO PUEDES VENDER PARA OBTENER GANANCIAS CON EL COMANDO:\n*${usedPrefix}sell*`, userdb, m)
userdb.limit -= limitNumber * text

var tiempo = 300000 * text //180000 3min | 300000 5 min | 900000 15min | 1800000 30min | 3600000 1h | 10800000 3h | 25200000 7h | 86400000 24h | 259200000 3d
var now = new Date() * 1
if (now < userdb.premiumTime) userdb.premiumTime += tiempo
else userdb.premiumTime = now + tiempo
userdb.premium = true
//let imgpre = 'https://logowiki.net/wp-content/uploads/imgp/Premium-Logo-1-5365.jpg' 
const resp = `*╭┈┈┈┈┈◈ 🌟 ◈┈┈┈┈┈╮*
*┃🎟️ USTED AHORA ES PREMIUM!!!*
*┃*
*┃✨ NOMBRE*
*┃» ${userdb.name}*
*┃💰 PAGO »-${limitNumber * text} ${rpgshopp.emoticon('limit')}*
*┃👝 TENIA » ${userdb.limit + limitNumber} ${rpgshopp.emoticon('limit')}*
*┃🛄 LE QUEDAN » ${userdb.limit} ${rpgshopp.emoticon('limit')}*
*┃🕐 TIEMPO » ${tiempoPremium} min*
*┃📉 TEMPORIZADOR » ${userdb.premiumTime - now} seg*
*╰┈┈┈┈┈◈ 🌟 ◈┈┈┈┈┈╯*\n\n`
if (start.buttons) {
return conn.sendButton(m.chat, resp, buff, img, [
[`🌟 USUARIOS PREMIUM 🌟`, `${usedPrefix}listprem`],
[`🎟️ MÁS TIEMPO PREMIUM 🎟️`, `${usedPrefix + command} 1`],
[`😽 DISFRUTAR PREMIUM 😽`, `${usedPrefix}allmenu`]], fkontak, null)
} else {
return conn.sendImageWriting(m.chat, img, resp+buff, fkontak)
}
}

//┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅

if (/prem2/i.test(command)) {
var tiempoPremium = 15 * text //tiempo total 
var tiempoDecretado = 15 * 1 //tiempo decretado 
const limitNumber = 35

if (!text) return conn.sendWritingText(m.chat, `*INGRESA EL NÚMERO DE TIEMPO PREMIUM\n\n*✤ 🎟️ 1 = ${tiempoDecretado} MIMUTOS*\n*✤ ${limitNumber} ${rpgshop.emoticon('kyubi')}*\n\n*EJEMPLO: ${usedPrefix + command} 1*`, userdb, m)
if (isNaN(text)) return conn.sendWritingText(m.chat, `${userName} SÓLO SE ACEPTAN NÚMEROS\n\n*EJEMPLO: ${usedPrefix + command} 1*`, fkontak, m)
if (userdb.kyubi < limitNumber) return conn.sendWritingText(m.chat, `${userName} NO TIENES SUFICIENTES *${rpgshop.emoticon('kyubi')}* PARA ADQUIRIR 🎟️ PREMIUM\n\nCOMPRE ${rpgshopp.emoticon('kyubi')} EN LA TIENDA USANDO EL COMANDO:\n*${usedPrefix}buy*\nO PUEDES VENDER PARA OBTENER GANANCIAS CON EL COMANDO:\n*${usedPrefix}sell*`, userdb, m)
userdb.kyubi -= limitNumber * text

var tiempo = 900000 * text //180000 3min | 900000 15min | 1800000 30min | 3600000 1h | 10800000 3h | 25200000 7h | 86400000 24h | 259200000 3d
var now = new Date() * 1
if (now < userdb.premiumTime) userdb.premiumTime += tiempo
else userdb.premiumTime = now + tiempo
userdb.premium = true
const resp = `${userName} *╭┈┈┈┈┈◈ 🌟 ◈┈┈┈┈┈╮*
*┃🎟️ USTED AHORA ES PREMIUM!!!*
*┃*
*┃✨ NOMBRE » ${userdb.name}*
*┃💰 PAGO »-${limitNumber * text} ${rpgshopp.emoticon('kyubi')}*
*┃👝 TENIA » ${userdb.limit + limitNumber} ${rpgshopp.emoticon('kyubi')}*
*┃🛄 LE QUEDAN » ${userdb.limit} ${rpgshopp.emoticon('kyubi')}*
*┃🕐 TIEMPO » ${tiempoPremium} min*
*┃📉 TEMPORIZADOR » ${userdb.premiumTime - now} seg*
*╰┈┈┈┈┈◈ 🌟 ◈┈┈┈┈┈╯*\n\n`
if (start.buttons) {
return conn.sendButton(m.chat, resp, buff, img, [
[`🌟 USUARIOS PREMIUM 🌟`, `${usedPrefix}listprem`],
[`🎟️ MÁS TIEMPO PREMIUM 🎟️`, `${usedPrefix + command} 1`],
[`😽 DISFRUTAR PREMIUM 😽`, `${usedPrefix}allmenu`]], fkontak, null)
} else {
return conn.sendImageWriting(m.chat, img, resp+buff, fkontak)
}
}

//┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅

if (/prem3/i.test(command)) {
var tiempoPremium = 30 * text //tiempo total 
var tiempoDecretado = 30 * 1 //tiempo decretado 
const limitNumber = 25

if (!text) return conn.sendWritingText(m.chat, `*INGRESA EL NÚMERO DE TIEMPO PREMIUM\n\n*✤ 🎟️ 1 = ${tiempoDecretado} MIMUTOS*\n*✤ ${limitNumber} ${rpgshop.emoticon('emerald')}*\n\n*EJEMPLO: ${usedPrefix + command} 1*`, userdb, m)
if (isNaN(text)) return conn.sendWritingText(m.chat, `${userName} SÓLO SE ACEPTAN NÚMEROS\n\n*EJEMPLO: ${usedPrefix + command} 1*`, fkontak, m)
if (userdb.emerald < limitNumber) return conn.sendWritingText(m.chat, `${userName} NO TIENES SUFICIENTES *${rpgshop.emoticon('emerald')}* PARA ADQUIRIR 🎟️ PREMIUM\n\nCOMPRE ${rpgshopp.emoticon('emerald')} EN LA TIENDA USANDO EL COMANDO:\n*${usedPrefix}buy*\nO PUEDES VENDER PARA OBTENER GANANCIAS CON EL COMANDO:\n*${usedPrefix}sell*`, userdb, m)
userdb.emerald -= limitNumber * text

var tiempo = 1800000 * text //180000 3min | 900000 15min | 1800000 30min | 3600000 1h | 10800000 3h | 25200000 7h | 86400000 24h | 259200000 3d
var now = new Date() * 1
if (now < userdb.premiumTime) userdb.premiumTime += tiempo
else userdb.premiumTime = now + tiempo
userdb.premium = true
const resp = `${userName} *╭┈┈┈┈┈◈ 🌟 ◈┈┈┈┈┈╮*
*┃🎟️ USTED AHORA ES PREMIUM!!!*
*┃*
*┃✨ NOMBRE » ${userdb.name}*
*┃💰 PAGO »-${limitNumber * text} ${rpgshopp.emoticon('emerald')}*
*┃👝 TENIA » ${userdb.limit + limitNumber} ${rpgshopp.emoticon('emerald')}*
*┃🛄 LE QUEDAN » ${userdb.limit} ${rpgshopp.emoticon('emerald')}*
*┃🕐 TIEMPO » ${tiempoPremium} min*
*┃📉 TEMPORIZADOR » ${userdb.premiumTime - now} seg*
*╰┈┈┈┈┈◈ 🌟 ◈┈┈┈┈┈╯*`

if (start.buttons) {
return conn.sendButton(m.chat, resp, buff, img, [
[`🌟 USUARIOS PREMIUM 🌟`, `${usedPrefix}listprem`],
[`🎟️ MÁS TIEMPO PREMIUM 🎟️`, `${usedPrefix + command} 1`],
[`😽 DISFRUTAR PREMIUM 😽`, `${usedPrefix}allmenu`]], fkontak, null)
} else {
return conn.sendImageWriting(m.chat, img, resp+buff, fkontak)
}
}

//┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅

if (/prem4/i.test(command)) {
var tiempoPremium = 1 * text //tiempo total 
var tiempoDecretado = 1 * 1 //tiempo decretado 
const limitNumber = 50

if (!text) return conn.sendWritingText(m.chat, `*INGRESA EL NÚMERO DE TIEMPO PREMIUM\n\n*✤ 🎟️ 1 = ${tiempoDecretado} MIMUTOS*\n*✤ ${limitNumber} ${rpgshop.emoticon('trash')}*\n\n*EJEMPLO: ${usedPrefix + command} 1*`, userdb, m)
if (isNaN(text)) return conn.sendWritingText(m.chat, `${userName} SÓLO SE ACEPTAN NÚMEROS\n\n*EJEMPLO: ${usedPrefix + command} 1*`, fkontak, m)
if (userdb.trash < limitNumber) return conn.sendWritingText(m.chat, `${userName} NO TIENES SUFICIENTES *${rpgshop.emoticon('trash')}* PARA ADQUIRIR 🎟️ PREMIUM\n\nCOMPRE ${rpgshopp.emoticon('trash')} EN LA TIENDA USANDO EL COMANDO:\n*${usedPrefix}buy*\nO PUEDES VENDER PARA OBTENER GANANCIAS CON EL COMANDO:\n*${usedPrefix}sell*`, userdb, m)
userdb.trash -= limitNumber * text

var tiempo = 3600000 * text //180000 3min | 900000 15min | 1800000 30min | 3600000 1h | 10800000 3h | 25200000 7h | 86400000 24h | 259200000 3d
var now = new Date() * 1
if (now < userdb.premiumTime) userdb.premiumTime += tiempo
else userdb.premiumTime = now + tiempo
userdb.premium = true
const resp = `${userName} *╭┈┈┈┈┈◈ 🌟 ◈┈┈┈┈┈╮*
*┃🎟️ USTED AHORA ES PREMIUM!!!*
*┃*
*┃✨ NOMBRE » ${userdb.name}*
*┃💰 PAGO »-${limitNumber * text} ${rpgshopp.emoticon('trash')}*
*┃👝 TENIA » ${userdb.limit + limitNumber} ${rpgshopp.emoticon('trash')}*
*┃🛄 LE QUEDAN » ${userdb.limit} ${rpgshopp.emoticon('trash')}*
*┃🕐 TIEMPO » ${tiempoPremium} hora(s)*
*┃📉 TEMPORIZADOR » ${userdb.premiumTime - now} seg*
*╰┈┈┈┈┈◈ 🌟 ◈┈┈┈┈┈╯*`

if (start.buttons) {
return conn.sendButton(m.chat, resp, buff, img, [
[`🌟 USUARIOS PREMIUM 🌟`, `${usedPrefix}listprem`],
[`🎟️ MÁS TIEMPO PREMIUM 🎟️`, `${usedPrefix + command} 1`],
[`😽 DISFRUTAR PREMIUM 😽`, `${usedPrefix}allmenu`]], fkontak, null)
} else {
return conn.sendImageWriting(m.chat, img, resp+buff, fkontak)
}
}

//┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅

if (/prem5/i.test(command)) {
var tiempoPremium = 3 * text //tiempo total 
var tiempoDecretado = 3 * 1 //tiempo decretado 
const limitNumber = 40

if (!text) return conn.sendWritingText(m.chat, `*INGRESA EL NÚMERO DE TIEMPO PREMIUM\n\n*✤ 🎟️ 1 = ${tiempoDecretado} MIMUTOS*\n*✤ ${limitNumber} ${rpgshop.emoticon('berlian')}*\n\n*EJEMPLO: ${usedPrefix + command} 1*`, userdb, m)
if (isNaN(text)) return conn.sendWritingText(m.chat, `${userName} SÓLO SE ACEPTAN NÚMEROS\n\n*EJEMPLO: ${usedPrefix + command} 1*`, fkontak, m)
if (userdb.berlian < limitNumber) return conn.sendWritingText(m.chat, `${userName} NO TIENES SUFICIENTES *${rpgshop.emoticon('berlian')}* PARA ADQUIRIR 🎟️ PREMIUM\n\nCOMPRE ${rpgshopp.emoticon('berlian')} EN LA TIENDA USANDO EL COMANDO:\n*${usedPrefix}buy*\nO PUEDES VENDER PARA OBTENER GANANCIAS CON EL COMANDO:\n*${usedPrefix}sell*`, userdb, m)
userdb.berlian -= limitNumber * text

var tiempo = 10800000 * text //180000 3min | 900000 15min | 1800000 30min | 3600000 1h | 10800000 3h | 25200000 7h | 86400000 24h | 259200000 3d
var now = new Date() * 1
if (now < userdb.premiumTime) userdb.premiumTime += tiempo
else userdb.premiumTime = now + tiempo
userdb.premium = true
const resp = `${userName} *╭┈┈┈┈┈◈ 🌟 ◈┈┈┈┈┈╮*
*┃🎟️ USTED AHORA ES PREMIUM!!!*
*┃*
*┃✨ NOMBRE » ${userdb.name}*
*┃💰 PAGO »-${limitNumber * text} ${rpgshopp.emoticon('berlian')}*
*┃👝 TENIA » ${userdb.limit + limitNumber} ${rpgshopp.emoticon('berlian')}*
*┃🛄 LE QUEDAN » ${userdb.limit} ${rpgshopp.emoticon('berlian')}*
*┃🕐 TIEMPO » ${tiempoPremium} hora(s)*
*┃📉 TEMPORIZADOR » ${userdb.premiumTime - now} seg*
*╰┈┈┈┈┈◈ 🌟 ◈┈┈┈┈┈╯*`;

if (start.buttons) {
return conn.sendButton(m.chat, resp, buff, img, [
[`🌟 USUARIOS PREMIUM 🌟`, `${usedPrefix}listprem`],
[`🎟️ MÁS TIEMPO PREMIUM 🎟️`, `${usedPrefix + command} 1`],
[`😽 DISFRUTAR PREMIUM 😽`, `${usedPrefix}allmenu`]], fkontak, null)
} else {
return conn.sendImageWriting(m.chat, img, resp+buff, fkontak)
}
}

//┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅

if (/prem6/i.test(command)) {
var tiempoPremium = 7 * text //tiempo total 
var tiempoDecretado = 7 * 1 //tiempo decretado 
const limitNumber = 70

if (!text) return conn.sendWritingText(m.chat, `*INGRESA EL NÚMERO DE TIEMPO PREMIUM\n\n*✤ 🎟️ 1 = ${tiempoDecretado} MIMUTOS*\n*✤ ${limitNumber} ${rpgshop.emoticon('joincount')}*\n\n*EJEMPLO: ${usedPrefix + command} 1*`, userdb, m)
if (isNaN(text)) return conn.sendWritingText(m.chat, `${userName} SÓLO SE ACEPTAN NÚMEROS\n\n*EJEMPLO: ${usedPrefix + command} 1*`, fkontak, m)
if (userdb.joincount < limitNumber) return conn.sendWritingText(m.chat, `${userName} NO TIENES SUFICIENTES *${rpgshop.emoticon('joincount')}* PARA ADQUIRIR 🎟️ PREMIUM\n\nCOMPRE ${rpgshopp.emoticon('joincount')} EN LA TIENDA USANDO EL COMANDO:\n*${usedPrefix}buy*\nO PUEDES VENDER PARA OBTENER GANANCIAS CON EL COMANDO:\n*${usedPrefix}sell*`, userdb, m)
userdb.joincount -= limitNumber * text

var tiempo = 25200000 * text //180000 3min | 900000 15min | 1800000 30min | 3600000 1h | 10800000 3h | 25200000 7h | 86400000 24h | 259200000 3d
var now = new Date() * 1
if (now < userdb.premiumTime) userdb.premiumTime += tiempo
else userdb.premiumTime = now + tiempo
userdb.premium = true
const resp = `${userName} *╭┈┈┈┈┈◈ 🌟 ◈┈┈┈┈┈╮*
*┃🎟️ USTED AHORA ES PREMIUM!!!*
*┃*
*┃✨ NOMBRE » ${userdb.name}*
*┃💰 PAGO »-${limitNumber * text} ${rpgshopp.emoticon('joincount')}*
*┃👝 TENIA » ${userdb.limit + limitNumber} ${rpgshopp.emoticon('joincount')}*
*┃🛄 LE QUEDAN » ${userdb.limit} ${rpgshopp.emoticon('joincount')}*
*┃🕐 TIEMPO » ${tiempoPremium} hora(s)*
*┃📉 TEMPORIZADOR » ${userdb.premiumTime - now} seg*
*╰┈┈┈┈┈◈ 🌟 ◈┈┈┈┈┈╯*`

if (start.buttons) {
return conn.sendButton(m.chat, resp, buff, img, [
[`🌟 USUARIOS PREMIUM 🌟`, `${usedPrefix}listprem`],
[`🎟️ MÁS TIEMPO PREMIUM 🎟️`, `${usedPrefix + command} 1`],
[`😽 DISFRUTAR PREMIUM 😽`, `${usedPrefix}allmenu`]], fkontak, null)
} else {
return conn.sendImageWriting(m.chat, img, resp+buff, fkontak)
}
}

//┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅

if (/prem7/i.test(command)) {
var tiempoPremium = 24 * text //tiempo total 
var tiempoDecretado = 24 * 1 //tiempo decretado 
const limitNumber = 65

if (!text) return conn.sendWritingText(m.chat, `*INGRESA EL NÚMERO DE TIEMPO PREMIUM\n\n*✤ 🎟️ 1 = ${tiempoDecretado} MIMUTOS*\n*✤ ${limitNumber} ${rpgshop.emoticon('diamond')}*\n\n*EJEMPLO: ${usedPrefix + command} 1*`, userdb, m)
if (isNaN(text)) return conn.sendWritingText(m.chat, `${userName} SÓLO SE ACEPTAN NÚMEROS\n\n*EJEMPLO: ${usedPrefix + command} 1*`, fkontak, m)
if (userdb.diamond < limitNumber) return conn.sendWritingText(m.chat, `${userName} NO TIENES SUFICIENTES *${rpgshop.emoticon('diamond')}* PARA ADQUIRIR 🎟️ PREMIUM\n\nCOMPRE ${rpgshopp.emoticon('diamond')} EN LA TIENDA USANDO EL COMANDO:\n*${usedPrefix}buy*\nO PUEDES VENDER PARA OBTENER GANANCIAS CON EL COMANDO:\n*${usedPrefix}sell*`, userdb, m)
userdb.diamond -= limitNumber * text

var tiempo = 86400000 * text //180000 3min | 900000 15min | 1800000 30min | 3600000 1h | 10800000 3h | 25200000 7h | 86400000 24h | 259200000 3d
var now = new Date() * 1
if (now < userdb.premiumTime) userdb.premiumTime += tiempo
else userdb.premiumTime = now + tiempo
userdb.premium = true
const resp = `${userName} *╭┈┈┈┈┈◈ 🌟 ◈┈┈┈┈┈╮*
*┃🎟️ USTED AHORA ES PREMIUM!!!*
*┃*
*┃✨ NOMBRE » ${userdb.name}*
*┃💰 PAGO »-${limitNumber * text} ${rpgshopp.emoticon('diamond')}*
*┃👝 TENIA » ${userdb.limit + limitNumber} ${rpgshopp.emoticon('diamond')}*
*┃🛄 LE QUEDAN » ${userdb.limit} ${rpgshopp.emoticon('diamond')}*
*┃🕐 TIEMPO » ${tiempoPremium} hora(s)*
*┃📉 TEMPORIZADOR » ${userdb.premiumTime - now} seg*
*╰┈┈┈┈┈◈ 🌟 ◈┈┈┈┈┈╯*`

if (start.buttons) {
return conn.sendButton(m.chat, resp, buff, img, [
[`🌟 USUARIOS PREMIUM 🌟`, `${usedPrefix}listprem`],
[`🎟️ MÁS TIEMPO PREMIUM 🎟️`, `${usedPrefix + command} 1`],
[`😽 DISFRUTAR PREMIUM 😽`, `${usedPrefix}allmenu`]], fkontak, null)
} else {
return conn.sendImageWriting(m.chat, img, resp+buff, fkontak)
}
}

//┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅

if (/prem8/i.test(command)) {
var tiempoPremium = 3 * text //tiempo total 
var tiempoDecretado = 3 * 1 //tiempo decretado 
const limitNumber = 80

if (!text) return conn.sendWritingText(m.chat, `*INGRESA EL NÚMERO DE TIEMPO PREMIUM\n\n*✤ 🎟️ 1 = ${tiempoDecretado} MIMUTOS*\n*✤ ${limitNumber} ${rpgshop.emoticon('gold')}*\n\n*EJEMPLO: ${usedPrefix + command} 1*`, userdb, m)
if (isNaN(text)) return conn.sendWritingText(m.chat, `${userName} SÓLO SE ACEPTAN NÚMEROS\n\n*EJEMPLO: ${usedPrefix + command} 1*`, fkontak, m)
if (userdb.gold < limitNumber) return conn.sendWritingText(m.chat, `${userName} NO TIENES SUFICIENTES *${rpgshop.emoticon('gold')}* PARA ADQUIRIR 🎟️ PREMIUM\n\nCOMPRE ${rpgshopp.emoticon('gold')} EN LA TIENDA USANDO EL COMANDO:\n*${usedPrefix}buy*\nO PUEDES VENDER PARA OBTENER GANANCIAS CON EL COMANDO:\n*${usedPrefix}sell*`, userdb, m)
userdb.gold -= limitNumber * text

var tiempo = 259200000 * text //180000 3min | 900000 15min | 1800000 30min | 3600000 1h | 10800000 3h | 25200000 7h | 86400000 24h | 259200000 3d
var now = new Date() * 1
if (now < userdb.premiumTime) userdb.premiumTime += tiempo
else userdb.premiumTime = now + tiempo
userdb.premium = true
const resp = `${userName} *╭┈┈┈┈┈◈ 🌟 ◈┈┈┈┈┈╮*
*┃🎟️ USTED AHORA ES PREMIUM!!!*
*┃*
*┃✨ NOMBRE » ${userdb.name}*
*┃💰 PAGO »-${limitNumber * text} ${rpgshopp.emoticon('gold')}*
*┃👝 TENIA » ${userdb.limit + limitNumber} ${rpgshopp.emoticon('gold')}*
*┃🛄 LE QUEDAN » ${userdb.limit} ${rpgshopp.emoticon('gold')}*
*┃🕐 TIEMPO » ${tiempoPremium} día(s)*
*┃📉 TEMPORIZADOR » ${userdb.premiumTime - now} seg*
*╰┈┈┈┈┈◈ 🌟 ◈┈┈┈┈┈╯*`

if (start.buttons) {
return conn.sendButton(m.chat, resp, buff, img, [
[`🌟 USUARIOS PREMIUM 🌟`, `${usedPrefix}listprem`],
[`🎟️ MÁS TIEMPO PREMIUM 🎟️`, `${usedPrefix + command} 1`],
[`😽 DISFRUTAR PREMIUM 😽`, `${usedPrefix}allmenu`]], fkontak, null)
} else {
return conn.sendImageWriting(m.chat, img, resp+buff, fkontak)
}
}

//┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅

switch (command) {
case 'premium':
case 'vip':
case 'prem':
case 'pass':
case 'pase':
const sections = [{
title: comienzo + ' 🎟️ PREMIUM 🎟️ ' + fin,
rows: [
{title: "💎 PREMIUM - CLASE ⓵", id: `prem1 1`, description: `✪ Pase Basico\n✪ 15 ${rpgshop.emoticon('limit')} ➟ 5 min Premium\n`},
{title: "🌀 PREMIUM - CLASE ⓶", id: `prem2 1`, description: `✪ Pase Torre de Encanto\n✪ 35 ${rpgshop.emoticon('kyubi')} ➟ 15 min Premium\n`},
{title: "💚 PREMIUM - CLASE ⓷", id: `prem3 1`, description: `✪ Pase Verduzco\n✪ 25 ${rpgshop.emoticon('emerald')} ➟ 30 min Premium\n`},
{title: "🗑 PREMIUM - CLASE ⓸", id: `prem4 1`, description: `✪ Pase Residuos ECO\n✪ 50 ${rpgshop.emoticon('trash')} ➟ 1 h Premium\n`},
{title: "♦️ PREMIUM - CLASE ⓹", id: `prem5 1`, description: `✪ Pase Caza Brillante\n✪ 40 ${rpgshop.emoticon('berlian')} ➟ 3 h Premium\n`},
{title: "🪙 PREMIUM - CLASE ⓺", id: `prem6 1`, description: `✪ Pase Amo del Cripto\n✪ 70 ${rpgshop.emoticon('joincount')} ➟ 7 h Premium\n`},
{title: "💎+ PREMIUM - CLASE ⓻", id: `prem7 1`, description: `✪ Pase Gema Plus\n✪ 65 ${rpgshop.emoticon('diamond')} ➟ 24 h Premium\n`},
{title: "👑 PREMIUM - CLASE ⓼ : PASS ⓼", id: `prem8 1`, description: `✪ Pase Tiempo de Oro\n✪ 80 ${rpgshop.emoticon('gold')} ➟ 3 d Premium\n`}
]},{
title: comienzo + ' 🌟 INFO PREMIUM 🌟 ' + fin,
rows: [
{title: "🎟️ USUARIOS PREMIUM", id: usedPrefix + 'listprem'},
{title: "🏆 TOP MUNDIAL", id: usedPrefix + 'top'},
{title: "🚀 DISFRUTAR PREMIUM", id: usedPrefix + 'allmenu'}

]}]

const listMessage = {
text: `🌟 COMPRA UN TIPO DE PASE PARA SER USUARIO(A) PREMIUM!!!`,
footer: info.nanie,
title: `${htki} *🎟️ PREMIUM 🎟️* ${htka}`,
buttonText: `🎟️ SER PREMIUM 🌟`,
sections
}
let resp = ''
if (start.buttons) {
await conn.sendMessage(m.chat, listMessage, {quoted: fkontak})
return conn.sendButton(m.chat, resp, buff, img, [
[`🌟 USUARIOS PREMIUM 🌟`, `${usedPrefix}listprem`],
[`🎟️ MÁS TIEMPO PREMIUM 🎟️`, `${usedPrefix + command} 1`],
[`😽 DISFRUTAR PREMIUM 😽`, `${usedPrefix}allmenu`]], fkontak, null)
} else {
//comando.map(v => v + ' <pencarian>')
let totalComandos = 0
if (typeof sections === 'string' && sections.trim().length > 0) {
resp += sections + '\n\n'
} else if (Array.isArray(sections)) {
const isGrouped = sections.every(item => typeof item === 'object' && Array.isArray(item.rows))

if (isGrouped) {
resp = listMessage.title+'\n'+listMessage.text
for (const group of sections) {
if (group.title) resp += `\n╠═ 📂 *${group.title.toUpperCase()}*\n`
for (const item of group.rows) {
if (!item.title && !item.description && !item.id) continue
resp += `╠════════════════════\n`
if (item.title) resp += `┣ *${item.title}*\n`
if (item.description) resp += item.description.replace(/#/g, `📎 ${usedPrefix}`).split('\n').map((line, index) => index === 0 ? `┣ 📝 ${line}` : `┣ ${line}`).join('\n') + '\n'
if (item.id) resp += `┣ 📎 *Comando:* ${usedPrefix+item.id}\n`
totalComandos++
}
}
console.log('ObPrem: ', resp)

return conn.sendImageWriting(m.chat, img, resp+listMessage.title, fkontak)
}
}
}
}
}
handler.help = ['addprem [@user] <days>']
handler.tags = ['owner']
handler.command = /^(comprarprem|prem1|prem2|prem3|prem4|prem5|prem6|prem7|prem8|premium|vip|prem|pass|pase)$/i

handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
