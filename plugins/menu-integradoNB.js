//Integracion de menus (objetivo en reduccion del 50% de los archivos de la carpeta plugins)

//idea y arreglos Rey Endymion

import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import { promises } from 'fs'
import fs from 'fs'
import { join } from 'path'
let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command, args, isOwner, isAdmin, isROwner }) => {
let chat = global.db.data.chats[m.chat]
let vn = join(media, 'menu.mp3')
let img = imagen4
let pp = imagen1
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender 
let userm =  `@${who.split(`@s.whatsapp.net`)[0]}` && `@${who.replace(/@.+/, '')}`
let userg =  await conn.getName(m.chat)
let estado = {key: {participant: who, remoteJid: who}, message: {groupInviteMessage: {groupJid: "1234567890-9876543210@g.us", inviteCode: `\n`, groupName: `\n`, caption: `${userg}\n${usedPrefix + command}\n${igfg}`, jpegThumbnail: pp}}}
let contextInfo = {  
  mentionedJid: [m.sender],  
  "externalAdReply": {  
  "showAdAttribution": true,  
  "containsAutoReply": true,
  "renderLargerThumbnail": true,  
  "title": global.wm,   
  "containsAutoReply": true,  
  "mediaType": 1,   
  "thumbnail": pp,  
  "mediaUrl": `https://api.whatsapp.com/send/?phone=5215625406730&text=.serbot&type=phone_number&app_absent=0`,  
  "sourceUrl": `https://api.whatsapp.com/send/?phone=5215625406730&text=.serbot&type=phone_number&app_absent=0`  
  }  
  }  
let locale = 'es'
let d = new Date(new Date + 3600000)
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
wm = global.wm
let _package = JSON.parse(await promises.readFile(join(__dirname, `../package.json`)).catch(_ => ({}))) || {}
let { exp, limit, level, role } = global.db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)
let week = d.toLocaleDateString(locale, { weekday: `long` })
let date = d.toLocaleDateString(locale, {
day: `numeric`,
month: `long`,
year: `numeric`
})
let time = d.toLocaleTimeString(locale, {
hour: `numeric`,
minute: `numeric`,
second: `numeric`
})
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) {
process.send(`uptime`)
_muptime = await new Promise(resolve => {
process.once(`message`, resolve)
setTimeout(resolve, 500)
}) * 1000
}
let muptime = clockString(_muptime)
let uptime = clockString(_uptime)
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
let replace = {
'%': '%',
p: _p, uptime, muptime,
me: conn.getName(conn.user.jid),
npmname: _package.name,
npmdesc: _package.description,
version: _package.version,
exp: exp - min,
maxexp: xp,
totalexp: exp,
xp4levelup: max - exp,
github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
level, limit, userm, weton, week, date, time, totalreg, rtotalreg, role,
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
let { money, joincount } = global.db.data.users[m.sender]
let user = global.db.data.users[m.sender]

    
//Asistente de grupos
switch (command) {
case `asistente`:
try {
  let resp = `┏━━━━━━━━━━━━━━━━━━━━━┓
┣   HOLA ✨${userm}✨, ESTE ES EL MENU DE *ACTIVAR O DESACTIVAR LOS ASISTENTES DE GRUPO* DE ${wm}* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *ASISTENTES DE GRUPO ${wm}*\npowered by\n*${namerepre}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *ACTIVAR O DESACTIVAR LOS ASISTENTES DE GRUPO*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ enable asistente*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + enable  \nUsar asi: *${usedPrefix}enable asistente* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ disable asistente*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + disable  \nUsar asi: *${usedPrefix}disable asistente* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ enable gruposRol*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + enable gruposRol \nUsar asi: *${usedPrefix}enable gruposRol* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ disable gruposRol*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + disable gruposRol \nUsar asi: *${usedPrefix}disable gruposRol* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ enable adminsot*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + enable adminsot \nUsar asi: *${usedPrefix}enable adminsot* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ disable adminsot*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + disable adminsot \nUsar asi: *${usedPrefix}disable adminsot* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ enable modocomedia*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + enable modocomedia \nUsar asi: *${usedPrefix}enable modocomedia* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ disable modocomedia*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + disable modocomedia \nUsar asi: *${usedPrefix}disable modocomedia* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ enable capciosa*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + enable capciosa \nUsar asi: *${usedPrefix}enable capciosa* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ disable capciosa*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + disable capciosa \nUsar asi: *${usedPrefix}disable capciosa* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ enable stickers*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + enable stickers \nUsar asi: *${usedPrefix}enable stickers* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ disable stickers*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + disable stickers \nUsar asi: *${usedPrefix}disable stickers`
      let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
    conn.sendPresenceUpdate('composing' , m.chat);
    }
}
  await conn.sendMessage(m.chat, { text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
  
} catch {
  let str = `
  *HOLA ✨${userm}✨, ESTE ES EL MENU DE *ACTIVAR O DESACTIVAR LOS ASISTENTES DE GRUPO* DE ${wm}*
┣ *📅 FECHA: ${week}, ${date}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📈 TIEMPO ACTIVO: ${uptime}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📊 USUARIOS: ${rtotalreg}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ enable asistente, \nComando:\nEl prefijo actual: ${usedPrefix} + enable* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ disable asistente*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + disable asistente* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ enable gruposRol*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + enable gruposRol* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ disable gruposRol*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + disable gruposRol* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ enable adminsot*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + enable adminsot* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ disable adminsot*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + disable adminsot* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ enable modocomedia*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + enable modocomedia* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ disable modocomedia*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + disable modocomedia* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ enable capciosa*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + enable capciosa* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ disable capciosa*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + disable capciosa* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ enable stickers*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + enable stickers* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *☑️ disable stickers*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + disable stickers* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *${usedPrefix}donasi para: 📮 DONAR 📮* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *${usedPrefix}owner para: 🌹 OWNER 🌹
┣ *${usedPrefix}infobot para: 🐾 INFOBOT 🐾* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *FACEBOOK enlace: https://www.facebook.com/ANIMxSCANs* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *GITHUB enlace: https://github.com/ReyEndymion/ANI_MX_SCANS-Md* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌹 CONTACTO 🌹 wa.me/5215517489568
┣ *📮 DONAR 📮 usa el comando: ${usedPrefix}donasi* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌹 OWNER 🌹 usa el comando: ${usedPrefix}owner* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🐾 INFOBOT 🐾 usa el comando: ${usedPrefix}infobot` 



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
  
  await conn.sendMessage(m.chat, { text: str.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )

}

break
//efectos de audio

    case `audioefect`:
  try {
    let resp =  `${gt} ESTE ES EL MENU DE LOS EFECTOS DE AUDIO\n✨${userm}✨*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *EFECTOS DE AUDIOS ${wm}*\npowered by\n*${namerepre}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *LISTA DE OPCIONES*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎤 BASS*\nDescripcion: responde a un audio o nota de voz con ${usedPrefix}bass \nUsar asi: *${usedPrefix}bass* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎤 BLOWN*\nDescripcion: responde a un audio o nota de voz con ${usedPrefix}blown \nUsar asi: *${usedPrefix}blown* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎤 DEEP*\nDescripcion: responde a un audio o nota de voz con ${usedPrefix}deep \nUsar asi: *${usedPrefix}deep* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎤 EARRAPE*\nDescripcion: responde a un audio o nota de voz con ${usedPrefix}earrape \nUsar asi: *${usedPrefix}earrape* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎤 FAST*\nDescripcion: responde a un audio o nota de voz con ${usedPrefix}fast \nUsar asi: *${usedPrefix}fast* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎤 FAT*\nDescripcion: responde a un audio o nota de voz con ${usedPrefix}fat \nUsar asi: *${usedPrefix}fat* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎤 NIGHTCORE*\nDescripcion: responde a un audio o nota de voz con ${usedPrefix}nightcore \nUsar asi: *${usedPrefix}nightcore* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎤 REVERSE*\nDescripcion: responde a un audio o nota de voz con ${usedPrefix}reverse \nUsar asi: *${usedPrefix}reverse* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎤 ROBOT*\nDescripcion: responde a un audio o nota de voz con ${usedPrefix}robot \nUsar asi: *${usedPrefix}robot* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎤 SLOW*\nDescripcion: responde a un audio o nota de voz con ${usedPrefix}slow \nUsar asi: *${usedPrefix}slow* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎤 SMOOTH*\nDescripcion: responde a un audio o nota de voz con ${usedPrefix}smooth \nUsar asi: *${usedPrefix}smooth* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎤 TUPAI*\nDescripcion: responde a un audio o nota de voz con ${usedPrefix}tupai \nUsar asi: *${usedPrefix}tupai`

    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
    conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
 
} catch {

    }
break;
  
//Audios del bot

case `audios`:
  try {
  
    let resp = `${gt} ✨${userm}✨ESTE ES EL MENU DE los audios predeterminados del Bot* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *MENU AUDIOS ${wm}*\npowered by\n*${namerepre}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *${gt}* ELIJE \nUsar asi: *${usedPrefix}PROBAR LOS AUDIOS* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Quien es tu sempai botsito 7w7 escribe: Quien es tu sempai botsito 7w7* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Te diagnostico con gay escribe: Te diagnostico con gay* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 A nadie le importa escribe: A nadie le importa* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Fiesta del admin escribe: Fiesta del admin* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Fiesta del administrador escribe: Fiesta del administrador* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Vivan los novios escribe: Vivan los novios* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Feliz cumpleaños escribe: Feliz cumpleaños* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Noche de paz escribe: Noche de paz* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Buenos dias escribe: Buenos dias* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Buenos tardes escribe: Buenos tardes* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Buenos noches escribe: Buenos noches* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Audio hentai escribe: Audio hentai* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Chica lgante escribe: Chica lgante* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Feliz navidad escribe: Feliz navidad* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Vete a la vrg escribe: Vete a la vrg* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Pasa pack Bot escribe: Pasa pack Bot* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Atencion grupo escribe: Atencion grupo* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Marica quien escribe: Marica quien* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Murio el grupo escribe: Murio el grupo* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Oh me vengo escribe: Oh me vengo* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 tio que rico escribe: tio que rico* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Viernes escribe: Viernes* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Baneado escribe: Baneado* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Sexo escribe: Sexo* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Hola escribe: Hola* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Un pato escribe: Un pato* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Nyanpasu escribe: Nyanpasu* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Te amo escribe: Te amo* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Yamete escribe: Yamete* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Bañate escribe: Bañate* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Es puto escribe: Es puto* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 La biblia escribe: La biblia* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Onichan escribe: Onichan* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Mierda de Bot escribe: Mierda de Bot* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Siuuu escribe: Siuuu* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Epico escribe: Epico* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Shitpost escribe: Shitpost* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 Rawr escribe: Rawr* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 UwU escribe: Uwu* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 :c escribe: :c* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 a escribe: a* 
`.trim()
    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
    conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
{    let str = `${userm} POR SI QUIERES MAS INFORMACION 
┣ *Facebook: https://www.facebook.com/groups/otakustogether 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📮 DONAR 📮 usa el comando: ${usedPrefix}donasi* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌹 OWNER 🌹 usa el comando: ${usedPrefix}owner* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🐾 INFOBOT 🐾 usa el comando: ${usedPrefix}infobot`
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
await conn.sendMessage(m.chat, { text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
}
} catch {

}
break
//buscadores

case `buscar`:
  try {
  
    let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS para DESCARGAR ✨${userm}✨
┣ *BUSCAR ${wm}*powered by\n${igfg}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *LISTA DE OPCIONES*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔍 MODAPK*\nDescripcion: buscar apks mod usando el comando ${usedPrefix}modapk \nUsar asi: *${usedPrefix}modapk* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔍 STICKERSEARCH*\nDescripcion: buscar stickers usando el comando ${usedPrefix}stickersearch \nUsar asi: *${usedPrefix}stickersearch* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔍 *STICKERSEARCH2*\nDescripcion: buscar stickers usando el comando ${usedPrefix}stickersearch2 \nUsar asi: *${usedPrefix}stickersearch2* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔍 XNXXSEARCH*\nDescripcion: buscar videos desde xnxx usando el comando ${usedPrefix}xnxxsearch \nUsar asi: *${usedPrefix}xnxxsearch* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔍 ANIMEINFO*\nDescripcion: buscar informacion de anime usando el comando ${usedPrefix}animeinfo \nUsar asi: *${usedPrefix}animeinfo* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔍 GOOGLE*\nDescripcion: buscar desde google usando el comando ${usedPrefix}google \nUsar asi: *${usedPrefix}google* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔍 LETRA*\nDescripcion: buscar lyrics (letras) usando el comando ${usedPrefix}letra \nUsar asi: *${usedPrefix}letra* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔍 WIKIPEDIA*\nDescripcion: buscar desde wikipedia usando el comando ${usedPrefix}wikipedia \nUsar asi: *${usedPrefix}wikipedia* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔍 YTSEARCH*\nDescripcion: buscar desde youtube usando el comando ${usedPrefix}ytsearch \nUsar asi: *${usedPrefix}ytsearch* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔍 APKDONE*\nDescripcion: buscar desde apkdone usando el comando ${usedPrefix}apkdone \nUsar asi: *${usedPrefix}apkdone* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔍 APKGOOGLE*\nDescripcion: buscar desde apkgoogle usando el comando ${usedPrefix}apkgoogle \nUsar asi: *${usedPrefix}apkgoogle* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔍 APKMODY*\nDescripcion: buscar desde apkmody usando el comando ${usedPrefix}apkmody \nUsar asi: *${usedPrefix}apkmody* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔍 APKSHUB*\nDescripcion: buscar desde apkshub usando el comando ${usedPrefix}apkshub \nUsar asi: *${usedPrefix}apkshub* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔍 HAPPYMOD*\nDescripcion: buscar happymod usando el comando ${usedPrefix}happymod \nUsar asi: *${usedPrefix}happymod* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔍 HOSTAPK*\nDescripcion: buscar desde hostapk usando el comando ${usedPrefix}hostapk \nUsar asi: *${usedPrefix}hostapk* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔍 REVDL*\nDescripcion: buscar desde revdl usando el comando ${usedPrefix}revdl \nUsar asi: *${usedPrefix}revdl* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔍 TORACCINO*\nDescripcion: buscar desde toraccino usando el comando ${usedPrefix}toraccino \nUsar asi: *${usedPrefix}toraccino* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔍 UAPKPRO*\nDescripcion: buscar desde uapkpro usando el comando ${usedPrefix}uapkpro \nUsar asi: *${usedPrefix}uapkpro* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔍 PLAYSTORE*\nDescripcion: buscar desde playstore usando el comando ${usedPrefix}playstore \nUsar asi: *${usedPrefix}playstore* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *CONTACTO*
┣ *📮 DONAR 📮* \nUsar asi: *${usedPrefix}donasi* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌹 OWNER 🌹* \nUsar asi: *${usedPrefix}owner* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🐾 INFOBOT 🐾* \nUsar asi: *${usedPrefix}infobot*`


    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
    conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )

} catch {

}
break
//caja fuerte

case `cajafuerte`:
  try {
    let resp = `${gt}✨${userm}✨ ESTE ES EL MENU DE LOS COMANDOS DE LA CAJA FUERTE \n\nAQUI PUEDE GUARDAR MENSAJES QUE QUIERAS VER MAS TARDE* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️CAJA FUERTE🔐 ${wm}*\npowered by\n*${namerepre}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *AGREGAR A LA LISTA*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ AGREGAR MENSAJE*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + agregarmsg *<texto/comando/palabra clave>* (responde a un texto) \nUsar asi: *${usedPrefix}agregarmsg* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ AGREGAR VN*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + agregarvn *<texto/comando/palabra clave>* (responde a una nota de voz) \nUsar asi: *${usedPrefix}agregarvn* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ AGREGAR VIDEO*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + agregarvideo *<texto/comando/palabra clave>* (responde a un video) \nUsar asi: *${usedPrefix}agregarvideo* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ AGREGAR AUDIO*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + agregaraudio *<texto/comando/palabra clave>* (responde a un audio) \nUsar asi: *${usedPrefix}agregaraudio* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ AGREGAR IMAGEN*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + agregarimg *<texto/comando/palabra clave>* (responde a una imagen) \nUsar asi: *${usedPrefix}agregarimg* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ AGREGAR STICKER*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + agregarsticker *<texto/comando/palabra clave>* (responde a un sticker) \nUsar asi: *${usedPrefix}agregarsticker* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *LISTA DE COMANDOS* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ LISTA MENSAJE*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + listamsg \nUsar asi: *${usedPrefix}listamsg* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ LISTA VN*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + listavn \nUsar asi: *${usedPrefix}listavn* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ LISTA VIDEO*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + listavideo \nUsar asi: *${usedPrefix}listavideo* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ LISTA AUDIO*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + listaaudio \nUsar asi: *${usedPrefix}listaaudio* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ LISTA IMAGEN*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + listaimg \nUsar asi: *${usedPrefix}listaimg* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ LISTA STICKER*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + listasticker \nUsar asi: *${usedPrefix}listasticker* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *VER TEXTOS O ARCHIVOS* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ VER MENSAJE*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + vermsg *<texto/comando/palabra clave>* \nUsar asi: *${usedPrefix}vermsg* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ VER VN*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + vervn *<texto/comando/palabra clave>* \nUsar asi: *${usedPrefix}vervn* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ VER VIDEO*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + vervideo *<texto/comando/palabra clave>* \nUsar asi: *${usedPrefix}vervideo* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ VER AUDIO*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + veraudio *<texto/comando/palabra clave>* \nUsar asi: *${usedPrefix}veraudio* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ VER IMAGEN*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + verimg *<texto/comando/palabra clave>* \nUsar asi: *${usedPrefix}verimg* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ VER STICKER*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + versticker *<texto/comando/palabra clave>* \nUsar asi: *${usedPrefix}versticker* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *ELIMINAR*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ ELIMINAR MENSAJE*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + eliminarmsg *<texto/comando/palabra clave>* \nUsar asi: *${usedPrefix}eliminarmsg* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ ELIMINAR VN*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + eliminarvn *<texto/comando/palabra clave>* \nUsar asi: *${usedPrefix}eliminarvn* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ ELIMINAR VIDEO*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + eliminarvideo *<texto/comando/palabra clave>* \nUsar asi: *${usedPrefix}eliminarvideo* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ ELIMINAR AUDIO*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + eliminaraudio *<texto/comando/palabra clave>* \nUsar asi: *${usedPrefix}eliminaraudio* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ ELIMINAR IMAGEN*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + eliminarimg *<texto/comando/palabra clave>* \nUsar asi: *${usedPrefix}eliminarimg* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🗳️ ELIMINAR STICKER*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + eliminarsticker *<texto/comando/palabra clave>* \nUsar asi: *${usedPrefix}eliminarsticker* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *APOYO*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💵 DONAR*\nDescripcion: dona por favor que los pobres deben comer y ya no desarrollan \nUsar asi: *${usedPrefix}donasi  
┣ *👽 OWNER*\nDescripcion: conoce los numeros de quien da soporte a este bot \nUsar asi: *${usedPrefix}owner* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔰 INFOBOT*\nDescripcion: la informacion del Bot \nUsar asi: *${usedPrefix}infobot* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔗 REDES SOCIALES*\nDescripcion: BUSCANOS EN FACEBOOK https://www.facebook.com/groups/otakustogether`


    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
    conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )

} catch {

}
break
//Chat Anonimo

case `chatanonimo`:
  try {
  
    let resp = `${gt} ESTE ES EL MENU DE los comandos para el chat anonimo\n✨${userm}✨
┣ *CHAT ANONIMO ${wm}*\npowered by\n*${namerepre}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *LISTA DE OPCIONES*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📳 START*\nDescripcion: \nUsar asi: *${usedPrefix}iniciar el chat anonimo use ${usedPrefix}start \nUsar asi: *${usedPrefix}start* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📳 NEXT*\nDescripcion: \nUsar asi: *${usedPrefix}el siguiente chat anonimo use ${usedPrefix}next \nUsar asi: *${usedPrefix}next* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📳 LEAVE*\nDescripcion: \nUsar asi: *${usedPrefix}salir del chat anonimo use ${usedPrefix}leave \nUsar asi: *${usedPrefix}leave* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💵 DONAR*\nDescripcion: dona por favor que los pobres deben comer y ya no desarrollan \nUsar asi: *${usedPrefix}donasi* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👽 OWNER*\nDescripcion: conoce los numeros de quien da soporte a este bot \nUsar asi: *${usedPrefix}owner`
    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
    conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} catch {

}
break
//Convertidores

case `convert`:
  try {
  
    let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS para CONVERTIR ✨${userm}✨
* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *CONVERTIDORES ${wm}*\npowered by\n*${namerepre}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *LISTA DE OPCIONES*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🧧 TO(GIF-AUD)*\nDescripcion: responde a un video que desea convertir en gif con audio. \nComando:\nEl prefijo actual: ${usedPrefix} + togifaud \nUsar asi: *${usedPrefix}togifaud* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🧧 TO(IMG)*\nDescripcion: responde a un sticker que desea convertir a imagen. \nComando:\nEl prefijo actual: ${usedPrefix} + toimg \nUsar asi: *${usedPrefix}toimg* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🧧 TO(MP3)*\nDescripcion: responde a un video o nota de voz que desea convertir en audio mp3. \nComando:\nEl prefijo actual: ${usedPrefix} + tomp3 \nUsar asi: *${usedPrefix}tomp3* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🧧 TO(PTT)*\nDescripcion: responde a un video que desea convertir en nota de voz. \nComando:\nEl prefijo actual: ${usedPrefix} + toptt \nUsar asi: *${usedPrefix}toptt* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🧧 TO(VIDEO)*\nDescripcion: responda a un sticker de movimiento que desee convertir en video. \nComando:\nEl prefijo actual: ${usedPrefix} + tovideo \nUsar asi: *${usedPrefix}tovideo* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🧧 TO(URL)*\nDescripcion: responda a una imagen o video el cual sera convertido en enlace. \nComando:\nEl prefijo actual: ${usedPrefix} + tourl \nUsar asi: *${usedPrefix}tourl* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🧧 TTS*\nDescripcion: convierte un texto en nota de voz, ejemplo: ${usedPrefix}tts hola mundo \nUsar asi: *${usedPrefix}tts*`


    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
    conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} catch {

}
break
//Descargas

case `descargas`:
  try {
    let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS para DESCARGAR ✨${userm}✨ powered by ${igfg}*
    *DESCARGAS ${wm}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *LISTA DE OPCIONES*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 INSTAGRAM*\nDescripcion: \nUsar asi: *${usedPrefix}poder descargar de Instagram utiliza ${usedPrefix}instagram <enlace / link / url> \nUsar asi: *${usedPrefix}instagram* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 MEDIAFIRE*\nDescripcion: \nUsar asi: *${usedPrefix}poder descargar de mediafire utiliza ${usedPrefix}mediafire <enlace / link / url> \nUsar asi: *${usedPrefix}mediafire* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 *GITCLONE*\nDescripcion: \nUsar asi: *${usedPrefix}poder descargar desde github utiliza ${usedPrefix}gitclone <enlace / link / url> \nUsar asi: *${usedPrefix}gitclone* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 TIKTOK*\nDescripcion: \nUsar asi: *${usedPrefix}poder descargar de tiktok utiliza ${usedPrefix}<enlace / link / url> \nUsar asi: *${usedPrefix}tiktok* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 XNXXDL*\nDescripcion: \nUsar asi: *${usedPrefix}poder descargar de la página XNXX utiliza ${usedPrefix}xnxxdl <enlace / link / url> \nUsar asi: *${usedPrefix}xnxxdl* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 XVIDEOSDL*\nDescripcion: \nUsar asi: *${usedPrefix}poder descargar de la página xvideos utiliza ${usedPrefix}xvideosdl <enlace / link / url> \nUsar asi: *${usedPrefix}xvideosdl* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 TWITTER*\nDescripcion: \nUsar asi: *${usedPrefix}poder descargar desde Twitter utiliza ${usedPrefix}twitter <enlace / link / url> \nUsar asi: *${usedPrefix}twitter* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 FACEBOOK*\nDescripcion: te muestro las opciones en el siguiente menu de facebook \nUsar asi: *${usedPrefix}facebook* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 YOUTUBE*\nDescripcion: te muestro las opciones en el siguiente menu de youtube \nUsar asi: *${usedPrefix}youtube* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 STICKERPACK*\nDescripcion: descargar stickers desde getstickerpack.com usando ${usedPrefix}stickerpack \nUsar asi: *${usedPrefix}stickerpack* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 DESCARGAR CON PLAY*\nDescripcion: descargar usando ${usedPrefix}play \nUsar asi: *${usedPrefix}play* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 DESCARGAR CON PLAY.1*\nDescripcion: buscar y descargar con ${usedPrefix}play.1 \nUsar asi: *${usedPrefix}play.x* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 DESCARGAR CON PLAY.2*\nDescripcion: buscar y descargar con ${usedPrefix}play.2 \nUsar asi: *${usedPrefix}play.2* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 PLAYDOC*\nDescripcion: descargar como documento usando ${usedPrefix}playdoc \nUsar asi: *${usedPrefix}playdoc* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 PLAYLIST*\nDescripcion: descargar una lista de opciones usando ${usedPrefix}playlist \nUsar asi: *${usedPrefix}playlist* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 PLAYLIST2*\nDescripcion: descargar una 2a lista de opciones usando ${usedPrefix}playlist2 \nUsar asi: *${usedPrefix}playlist2* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 SPOTIFY*\nDescripcion: descarga desde spotify usando ${usedPrefix}spotify <enlace / link / url> \nUsar asi: *${usedPrefix}spotify* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 STICKERLY*\nDescripcion: descargar stickers desde getstickerpack.com sticker.ly usando ${usedPrefix}stickerly <enlace / link / url> \nUsar asi: *${usedPrefix}stickerly* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 RINGTONE*\nDescripcion: busca y descarga tonos usando ${usedPrefix}ringtone <enlace / link / url> \nUsar asi: *${usedPrefix}ringtone* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 SOUNDCLOUD*\nDescripcion: descarga desde soundcloud usando ${usedPrefix}soundcloud <enlace / link / url> \nUsar asi: *${usedPrefix}soundcloud* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 IMAGEN*\nDescripcion: solicita imagenes usando ${usedPrefix}imagen <texto> \nUsar asi: *${usedPrefix}imagen* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 PINTEREST*\nDescripcion: solicita imagenes de pinterest usando ${usedPrefix}pinterest <texto> \nUsar asi: *${usedPrefix}pinterest* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 WALLPAPER*\nDescripcion: solicita imagenes wallpaper usando ${usedPrefix}wallpaper <texto> \nUsar asi: *${usedPrefix}wallpaper* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 WALLPAPER2*\nDescripcion: solicita imagenes 2a opcion \nUsar asi: *${usedPrefix}wallpaper usando ${usedPrefix}wallpaper2 <texto> \nUsar asi: *${usedPrefix}wallpaper2* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 PPTIKTOK*\nDescripcion: solicita la imagen de un usuario de tiktok usando ${usedPrefix}tiktok <usuario> \nUsar asi: *${usedPrefix}pptiktok* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 IGSTALK*\nDescripcion: solicita imagenes de un usuario de instagram \nUsar asi: *${usedPrefix}igstalk* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 IGSTORY*\nDescripcion: solicita imagen e informacion de un usuario de instagram \nUsar asi: *${usedPrefix}igstory* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 TIKTOKSTALK*\nDescripcion: solicita imagen e informacion de un usuario de tiktok \nUsar asi: *${usedPrefix}tiktokstalk*`
.trim()

    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
    conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} catch {

}
break
//Facebook

case `facebook`:
  try {
  
    let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS DE FACEBOOK\n✨${userm}✨\npowered by\n*${namerepre}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *FACEBOOK ${wm}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *LISTA DE OPCIONES*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 OPCION 1*\nDescripcion: opcion 1 \nUsar asi: *${usedPrefix}facebook \nComando:\nEl prefijo actual: ${usedPrefix} + fb \nUsar asi: *${usedPrefix}fb* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 OPCION 2*\nDescripcion: opcion 2 \nUsar asi: *${usedPrefix}facebook \nComando:\nEl prefijo actual: ${usedPrefix} + fb2 \nUsar asi: *${usedPrefix}fb2* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 OPCION 3*\nDescripcion: opcion 3 \nUsar asi: *${usedPrefix}facebook \nComando:\nEl prefijo actual: ${usedPrefix} + fb3 \nUsar asi: *${usedPrefix}fb3* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 OPCION 4*\nDescripcion: opcion 4 \nUsar asi: *${usedPrefix}facebook \nComando:\nEl prefijo actual: ${usedPrefix} + fb4 \nUsar asi: *${usedPrefix}fb4* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 OPCION 5*\nDescripcion: opcion 5 \nUsar asi: *${usedPrefix}facebook \nComando:\nEl prefijo actual: ${usedPrefix} + fb5 \nUsar asi: *${usedPrefix}fb5*`


    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
    conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} catch {

}
break
//Grupos (administradores)

case `gadmin`:
  try {
  
    let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS para LOS ADMINS ✨${userm}✨
    *📅 ${gt} fecha: ${week}, ${date}*
    *📊 Registrados: ${rtotalreg}*
* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *MENU \nUsar asi: *${usedPrefix}SOLO ADMINS de ${wm} powered by*\n*${igfg}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *LISTA DE OPCIONES*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 AGREGAR*\nDescripcion: añadir a alguien al grupo usando ${usedPrefix}add \nUsar asi: *${usedPrefix}add* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 ELIMINAR*\nDescripcion: eliminar a uno o a varios del grupo usando ${usedPrefix}kick \nUsar asi: *${usedPrefix}kick* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 ELIMINAR DESDE MENSAJE*\nDescripcion: elimina a alguien contestando un mensaje del usuario usando ${usedPrefix}kick2 \nUsar asi: *${usedPrefix}kick2* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 LISTA DE NUMEROS POR PREFIJO*\nDescripcion: hace una lista de numeros por su prefijo usando ${usedPrefix}listnum \nUsar asi: *${usedPrefix}listanum* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 ELIMINA NUMEROS POR PREFIJO*\nDescripcion: elimina una lista por su prefijo del grupo usando ${usedPrefix}kicknum \nUsar asi: *${usedPrefix}kicknum* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 ABRE O CIERRA EL GRUPO*\nDescripcion: abrir o cerrar el grupo \nUsar asi: *${usedPrefix}controlar la conversacion usando ${usedPrefix}grupo \nUsar asi: *${usedPrefix}grupo* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 DAR ADMIN*\nDescripcion: promueve a alguien como admin usando ${usedPrefix}promote \nUsar asi: *${usedPrefix}promote* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 QUITAR ADMIN*\nDescripcion: degrada a alguien como admin usando ${usedPrefix}demote \nUsar asi: *${usedPrefix}demote* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 INFORMACION DEL GRUPO*\nDescripcion: envia la informacion del grupo en un mensaje usando ${usedPrefix}infogroup \nUsar asi: *${usedPrefix}infogroup* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 NUEVO LINK*\nDescripcion: resetea el link de invitacion del grupo actual usando ${usedPrefix}resetlink \nUsar asi: *${usedPrefix}resetlink* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 SOLICITA EL LINK*\nDescripcion: solicita el link del grupo actual usando ${usedPrefix}link \nUsar asi: *${usedPrefix}link* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 CAMBIA EL NOMBRE DEL GRUPO*\nDescripcion: solicita al bot que cambie el nombre al grupo usando ${usedPrefix}setname \nUsar asi: *${usedPrefix}setname* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 CAMBIAR LA DESCRIPCION DEL GRUPO*\nDescripcion: edita o borra la Descripcion: del grupo usando ${usedPrefix}setdesc \nUsar asi: *${usedPrefix}setdesc* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 CAMBIA LA IMAGEN DEL GRUPO*\nDescripcion: contesta a una imagen o sube la imagen \nUsar asi: *${usedPrefix}cambiarla usando ${usedPrefix}setpp \nUsar asi: *${usedPrefix}setpp* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 CAMBIAR LA BIENVENIDA DEL BOT*\nDescripcion: edita la bienvenida del BOT usando ${usedPrefix}setwelcome \nUsar asi: *${usedPrefix}setwelcome* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 CAMBIAR LA DESPEDIDA DEL BOT*\nDescripcion: edita la despedida del bot usando ${usedPrefix}setbye \nUsar asi: *${usedPrefix}setbye* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 INVOCAR GRUPO*\nDescripcion: invoca a todo el grupo usando ${usedPrefix}invocar \nUsar asi: *${usedPrefix}invocar* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 MENSAJE GENERAL EN SILENCIO*\nDescripcion: hace que el bot mencione a todos en un mensaje sin que se note el tag usando ${usedPrefix}hidetag \nUsar asi: *${usedPrefix}hidetag* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 CREA ADVERTENCIAS*\nDescripcion: recibe 3 advertencias de un admin usando el bot y este te eliminara usando ${usedPrefix}warn \nUsar asi: *${usedPrefix}warn* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 ELIMINA ADVERTENCIAS*\nDescripcion: los admins pueden eliminar cada advertencia hecha en el bot usando ${usedPrefix}unwarn \nUsar asi: *${usedPrefix}unwarn* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 LISTA DE ADVERTENCIAS*\nDescripcion: aqui puedes ver las advertencias y los usuarios que las tienen usando ${usedPrefix}listwarn \nUsar asi: *${usedPrefix}listwarn* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 FANTASMAS*\nDescripcion: busca y encuentra gente inactiva en el grupo usando ${usedPrefix}fantasmas \nUsar asi: *${usedPrefix}fantasmas* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 DESTRABAS*\nDescripcion: se utiliza en el caso de recibir virus en modo texto (trabas) \nUsar asi: *${usedPrefix}dejarlas muy atras en el chat usando ${usedPrefix}destraba \nUsar asi: *${usedPrefix}destraba*`


    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
    conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} catch {

}
break
//Herramientas

case `herramientas`:
  try {
  
    let resp = `${gt} ✨${userm}✨ ESTE ES EL MENU DE HERRAMIENTAS* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *HERRAMIENTAS ${wm}*\npowered by\n*${namerepre}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *LISTA DE OPCIONES*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🛠️  SPAM MENSAJE*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + spamwa *<numero|texto|cantidad>* \nUsar asi: *${usedPrefix}spamwa* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🛠️  TAMAÑO*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + tamaño *<cantidad> <imagen / video>* \nUsar asi: *${usedPrefix}tamaño* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🛠️  CLIMA*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + clima *<país> <ciudad>* \nUsar asi: *${usedPrefix}clima* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🛠️  ENCUESTA*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + encuesta *<texto1|texto2...>* \nUsar asi: *${usedPrefix}encuesta* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🛠️  NO MOLESTAR*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + afk *<motivo>* \nUsar asi: *${usedPrefix}afk* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🛠️  RECONOCIMIENTO DE TEXTO EN IMAGENES*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + ocr *<responde a imagen>* \nUsar asi: *${usedPrefix}ocr* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🛠️  ACORTAR*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + acortar *<enlace / link / url>* \nUsar asi: *${usedPrefix}acortar* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🛠️  CALCULADORA*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + calc *<operacion math>* \nUsar asi: *${usedPrefix}calc* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🛠️  BORRAR*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + del *<mensaje>* \nUsar asi: *${usedPrefix}del* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🛠️  RECONOCIENTO DE MUSICA*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + whatmusic *<audio>* \nUsar asi: *${usedPrefix}whatmusic* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🛠️  LEER QR*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + readqr *<imagen (QR)>* \nUsar asi: *${usedPrefix}readqr* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🛠️  ENVIAR QR*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + qrcode *<texto>* \nUsar asi: *${usedPrefix}qrcode* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🛠️  READMORE*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + readmore *<texto1| texto2>* \nUsar asi: *${usedPrefix}readmore* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🛠️  STYLETEXT*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + styletext *<texto>* \nUsar asi: *${usedPrefix}styletext* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🛠️  TRADUCIR*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + traducir *<texto>* \nUsar asi: *${usedPrefix}traducir* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🛠️  VIDEO CONFERENCIA EN ZOOM*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + zoom *<texto>* \nUsar asi: *${usedPrefix}zoom* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🛠️  NUMEROS EN WHATSAPP*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + nowa *<numero>x* \nUsar asi: *${usedPrefix}nowa* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🛠️  COVID*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + covid *<pais>* \nUsar asi: *${usedPrefix}covid* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🛠️  HORARIO*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + horario \nUsar asi: *${usedPrefix}horario*` 

    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
    conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
    } catch {
  let str = `
┣ *HOLA ✨${userm}✨, ESTE ES EL MENU DE HERRAMIENTAS DE ${igfg}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📅 FECHA: ${week}, ${date}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📈 TIEMPO ACTIVO: ${uptime}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📊 USUARIOS: ${rtotalreg}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *<HERRAMIENTAS/>*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *ඬ⃟ 🛠️* _${usedPrefix}spamwa *<numero|texto|cantidad>*_
┣ *ඬ⃟ 🛠️* _${usedPrefix}tamaño *<cantidad> <imagen / video>*_
┣ *ඬ⃟ 🛠️* _${usedPrefix}clima *<país> <ciudad>*_
┣ *ඬ⃟ 🛠️* _${usedPrefix}encuesta *<texto1|texto2...>*_
┣ *ඬ⃟ 🛠️* _${usedPrefix}afk *<motivo>*_
┣ *ඬ⃟ 🛠️* _${usedPrefix}ocr *<responde a imagen>*_
┣ *ඬ⃟ 🛠️* _${usedPrefix}acortar *<enlace / link / url>*_
┣ *ඬ⃟ 🛠️* _${usedPrefix}calc *<operacion math>*_
┣ *ඬ⃟ 🛠️* _${usedPrefix}del *<mensaje>*_
┣ *ඬ⃟ 🛠️* _${usedPrefix}whatmusic *<audio>*_
┣ *ඬ⃟ 🛠️* _${usedPrefix}readqr *<imagen (QR)>*_
┣ *ඬ⃟ 🛠️* _${usedPrefix}qrcode *<texto>*_
┣ *ඬ⃟ 🛠️* _${usedPrefix}readmore *<texto1| texto2>*_
┣ *ඬ⃟ 🛠️* _${usedPrefix}styletext *<texto>*_
┣ *ඬ⃟ 🛠️* _${usedPrefix}traducir *<texto>*_
┣ *ඬ⃟ 🛠️* _${usedPrefix}zoom *<texto>*_
┣ *ඬ⃟ 🛠️* _${usedPrefix}nowa *<numero>*_
┣ *ඬ⃟ 🛠️* _${usedPrefix}covid *<pais>*_
┣ *ඬ⃟ 🛠️* _${usedPrefix}horario_
┣ ${usedPrefix}donar \nUsar asi: *${usedPrefix}📮 𝙳𝙾𝙽𝙰𝚁 📮* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *${usedPrefix}terminosycondiciones \nUsar asi: *${usedPrefix}📋 𝚃𝙴𝚁𝙼𝙸𝙽𝙾𝚂 𝚈 𝙲𝙾𝙽𝙳𝙸𝙲𝙸𝙾𝙽𝙴𝚂 📋* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *${usedPrefix}infobot \nUsar asi: *${usedPrefix}🐾 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 🐾
` 



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
conn.sendMessage(m.chat, { text: str.trim(), mentions: conn.parseMention(str) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
try {
  let vn = `./media/menu.mp3`
  let pp = `./Menu.png`
  let str = `https://www.facebook.com/ANIMxSCANS

📮 DONAR 📮 usa el comando: ${usedPrefix}donasi
🌹 OWNER 🌹 usa el comando: ${usedPrefix}owner
🐾 INFOBOT 🐾 usa el comando: ${usedPrefix}infobot`.trim()
   let txt = '';
  let count = 0;
  for (const c of resp) {
  await new Promise(resolve => setTimeout(resolve, 5));
  txt += c;
  count++;

  if (count % 10 === 0) {
  conn.sendPresenceUpdate('composing' , m.chat);
  }
}
  await conn.sendFile(m.chat, vn, `../media/menu.mp3`, null, m, true, { type: `audioMessage`, ptt: true})
  } catch (e) {
  conn.reply(m.chat, `*[❗INFO❗] EL MENU TIENE UN ERROR Y NO FUE POSIBLE ENVIARLO, REPORTELO AL PROPIETARIO DEL BOT*`, m)
  throw e
  }


}
break
//Informacion del usuario

case `infoyo`:
  try {
  let str = `
*${gt} AQUI ESTA LO QUE YO PUEDO SABER DE TI SEGUN TU PARTICIPACION EN GRUPOS ✨${userm}✨*


╭═〘 ✯✯✯✯✯✯✯✯✯✯ 〙═╮
║ ◉— ${wm} —◉
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡║
║➤ *Owner:* ${author}
║➤ *Numero:* wa.me/5215517489568\nwa.me/5215533827255
║➤ *Bot ofc:* wa.me/5215535705067
║➤ *PayPal:* https://www.paypal.me/AMxScan
║➤ *Fecha:* ${date}
║➤ *Tiempo activo:* ${uptime}
║➤ *Usuarios:* ${rtotalreg}
╰═══╡✯✯✯✯✯✯✯✯✯╞══╯

┏━━━━━━━━━━━━━━━━━━━┓
┃ *INFO DEL USUARIO*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣ *🎖️ Nivel:* ${level}
┣ *🧰 Experiencia:* ${exp}
┣ *⚓ Rango:* ${role}
┣ *💎 Diamantes:* ${limit}
┣ *👾 AMXCoins:* ${money}
┣ *🪙 Tokens:* ${joincount}
┣ *🎟️ Premium:* ${user.premiumTime > 0 ? `✅` : `❌`}
┗━━━━━━━━━━━━━━━━━━━┛
  ${usedPrefix}donar \nUsar asi: ${usedPrefix}📮 𝙳𝙾𝙽𝙰𝚁 📮
  ${usedPrefix}owner \nUsar asi: ${usedPrefix}🌹 OWNER 🌹
  ${usedPrefix}infobot \nUsar asi: ${usedPrefix}🐾 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 🐾`
  .trim()

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
conn.sendMessage(m.chat, { text: str.trim(), mentions: conn.parseMention(str) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
  
} catch {
  

}
break
//Juegos

case `juegos`:
  try {
  
    let resp = `${packname} Ahí te van los comandos de juegos\n✨${userm}✨\ndel ${wm}\npowered by\n*${namerepre}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *JUEGOS ${wm}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *LISTA DE OPCIONES*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎖️️ MATEMATICAS*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + mates  <noob / easy / medium / hard / extreme /impossible /impossible2> \nUsar asi: *${usedPrefix}mates* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎖️️ PIEDRA, PAPEL O TIJERAS*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + ppt </papel /tijera /piedra> \nUsar asi: *${usedPrefix}ppt* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎖️️ JODA PROSTITUTO*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + prostituto <nombre / @tag> \nUsar asi: *${usedPrefix}prostituto* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎖️️ JODA PROSTITUTA*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + prostituta <nombre / @tag> \nUsar asi: *${usedPrefix}prostituta* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎖️ ️JODA GAY*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + gay2 <nombre / @tag> \nUsar asi: *${usedPrefix}gay2* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎖️ ️JODA LESBIANA*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + lesbiana <nombre / @tag> \nUsar asi: *${usedPrefix}lesbiana* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎖️ ️JODA PAJERO*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + pajero <nombre / @tag> \nUsar asi: *${usedPrefix}pajero* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎖️ ️JODA PAJERA*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + pajera <nombre / @tag> \nUsar asi: *${usedPrefix}pajera* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎖️ ️JODA PUTO*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + puto <nombre / @tag> \nUsar asi: *${usedPrefix}puto* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎖️ ️JODA PUTA*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + puta <nombre / @tag> \nUsar asi: *${usedPrefix}puta* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎖️ ️JODA MANCO*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + manco <nombre / @tag> \nUsar asi: *${usedPrefix}manco* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎖️ JODA MANCA*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + manca <nombre / @tag> \nUsar asi: *${usedPrefix}manca* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎖️ JODA RATA*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + rata <nombre / @tag> \nUsar asi: *${usedPrefix}rata* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎖️ JODA LOVE*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + love <nombre / @tag> \nUsar asi: *${usedPrefix}love* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎖️ DOXEO*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + doxear <nombre / @tag> \nUsar asi: *${usedPrefix}doxear* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎖️ PREGUNTA*\nDescripcion: pregunta algo al bot \nComando:\nEl prefijo actual: ${usedPrefix} + pregunta \nUsar asi: *${usedPrefix}pregunta* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣🎖️ APUESTA*\nDescripcion: apuesta \nComando:\nEl prefijo actual: ${usedPrefix} + slot \nUsar asi: *${usedPrefix}slot* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣🎖️ PVP*\nDescripcion: desafia a alguien, \nComando:\nEl prefijo actual: ${usedPrefix} + top <tag> \nUsar asi: *${usedPrefix}pvp* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣🎖️ DESAFIA 3 EN RAYA*\nDescripcion: Desafia a alguien en este juego de gato virtual \nComando:\nEl prefijo actual: ${usedPrefix} + ttt \nUsar asi: *${usedPrefix}ttt* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣🎖️ ELIMINA DESAFIO 3 EN RAYA (JUEGO DE GATO)*\nDescripcion: Elimina un desafio 3 en raya \nComando:\nEl prefijo actual: ${usedPrefix} + delttt \nUsar asi: *${usedPrefix}delttt* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣🎖️ CONVERSA*\nDescripcion: Conversa con el bot \nComando:\nEl prefijo actual: ${usedPrefix} + simi \nUsar asi: *${usedPrefix}simi* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣🎖️ TOP*\nDescripcion: Top del grupo \nComando:\nEl prefijo actual: ${usedPrefix} + top <tema a eleccion> \nUsar asi: *${usedPrefix}top* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣🎖️ JODA TOP GAYS*\nDescripcion: Top gays \nComando:\nEl prefijo actual: ${usedPrefix} + topgays \nUsar asi: *${usedPrefix}topgays* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣🎖️ JODA TOP OTAKUS*\nDescripcion: Top otakus \nComando:\nEl prefijo actual: ${usedPrefix} + topotakus \nUsar asi: *${usedPrefix}topotakus* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣🎖️ FORMAR PAREJA*\nDescripcion: Formar pareja \nComando:\nEl prefijo actual: ${usedPrefix} + formarpareja \nUsar asi: *${usedPrefix}formarpareja* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣🎖️ FORMAR  TRIO*\nDescripcion: Formar trio \nComando:\nEl prefijo actual: ${usedPrefix} + formartrio \nUsar asi: *${usedPrefix}formartrio* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣🎖️ VERDAD*\nDescripcion: juego de la Verdad, \nComando:\nEl prefijo actual: ${usedPrefix} + verdad \nUsar asi: *${usedPrefix}verdad* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣🎖️ RETO*\nDescripcion: juego Reto, \nComando:\nEl prefijo actual: ${usedPrefix} + reto \nUsar asi: *${usedPrefix}reto* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣🎖️ CANCION*\nDescripcion: Adivina la cancion \nComando:\nEl prefijo actual: ${usedPrefix} + cancion \nUsar asi: *${usedPrefix}cancion* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣🎖️ PISTA*\nDescripcion: Adivina el fragmento \nComando:\nEl prefijo actual: ${usedPrefix} + pista \nUsar asi: *${usedPrefix}pista*`


    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
    conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} catch {
  let str = `
┣ *${gt}* ESTE ES EL MENU DE LOS COMANDOS DE JUEGOS\n✨${userm}✨\n\npowered by\n*${namerepre}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📅 FECHA: ${week}, ${date}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📈 TIEMPO ACTIVO: ${uptime}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📊 USUARIOS: ${rtotalreg}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *ඬ⃟ 🎖️* _${usedPrefix}mates *<noob / easy / medium / hard / extreme /impossible /impossible2>*_
┣ *ඬ⃟ 🎖️* _${usedPrefix}ppt *<papel / tijera /piedra>*_
┣ *ඬ⃟ 🎖️* _${usedPrefix}prostituto *<nombre / @tag>*_
┣ *ඬ⃟ 🎖️* _${usedPrefix}prostituta *<nombre / @tag>*_
┣ *ඬ⃟ 🎖️* _${usedPrefix}gay2 *<nombre / @tag>*_
┣ *ඬ⃟ 🎖️* _${usedPrefix}lesbiana *<nombre / @tag>*_
┣ *ඬ⃟ 🎖️* _${usedPrefix}pajero *<nombre / @tag>*_
┣ *ඬ⃟ 🎖️* _${usedPrefix}pajera *<nombre / @tag>*_
┣ *ඬ⃟ 🎖️* _${usedPrefix}puto *<nombre / @tag>*_
┣ *ඬ⃟ 🎖️* _${usedPrefix}puta *<nombre / @tag>*_
┣ *ඬ⃟ 🎖️* _${usedPrefix}manco *<nombre / @tag>*_
┣ *ඬ⃟ 🎖️* _${usedPrefix}manca *<nombre / @tag>*_
┣ *ඬ⃟ 🎖️* _${usedPrefix}rata *<nombre / @tag>*_
┣ *ඬ⃟ 🎖️* _${usedPrefix}love *<nombre / @tag>*_
┣ *ඬ⃟ 🎖️* _${usedPrefix}doxear *<nombre / @tag>*_
┣ *ඬ⃟ 🎖️* _${usedPrefix}pregunta *<texto>*_
┣ *ඬ⃟ 🎖️* _${usedPrefix}suitpvp *<@tag>*_
┣ *ඬ⃟ 🎖️* _${usedPrefix}slot *<apuesta>*_
┣ *ඬ⃟ 🎖️* _${usedPrefix}ttt *<nombre sala>*_
┣ *ඬ⃟ 🎖️* _${usedPrefix}delttt_
┣ *ඬ⃟ 🎖️* _${usedPrefix}simi *<texto>*_
┣ *ඬ⃟ 🎖️* _${usedPrefix}top *<texto>*_
┣ *ඬ⃟ 🎖️* _${usedPrefix}topgays_
┣ *ඬ⃟ 🎖️* _${usedPrefix}topotakus_
┣ *ඬ⃟ 🎖️* _${usedPrefix}formarpareja_
┣ *ඬ⃟ 🎖️* _${usedPrefix}verdad_
┣ *ඬ⃟ 🎖️* _${usedPrefix}reto_
┣ *ඬ⃟ 🎖️* _${usedPrefix}cancion_
┣ *ඬ⃟ 🎖️* _${usedPrefix}pista_
    
${usedPrefix}donar \nUsar asi: ${usedPrefix}📮 𝙳𝙾𝙽𝙰𝚁 📮 
${usedPrefix}terminosycondiciones \nUsar asi: ${usedPrefix}📋 𝚃𝙴𝚁𝙼𝙸𝙽𝙾𝚂 𝚈 𝙲𝙾𝙽𝙳𝙸𝙲𝙸𝙾𝙽𝙴𝚂 📋 
${usedPrefix}infobot \nUsar asi: ${usedPrefix}🐾 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 🐾 
`.trim()



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
conn.sendMessage(m.chat, { text: str.trim(), mentions: conn.parseMention(str) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )

}
break
//logos y efectos de estos

case `logosefectos`:
  try {
  
    let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS DE LOS EFECTOS Y LOGOS\n✨${userm}✨
    *📅 ${gt} Fecha: ${week}, ${date}*
    *📈 Tiempo activo ${gt}: ${uptime}*
    *📊 Registrados: ${rtotalreg}*
* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *EFECTOS Y LOGOS ${wm}*\npowered by\n*${namerepre}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *LISTA DE OPCIONES*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🖍️ MENSAJE FALSO*\nDescripcion: opcion 1 \nUsar asi: *${usedPrefix}facebook \nUsar asi: *${usedPrefix}mensajefalso* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🖍️ PHMAKER*\nDescripcion: dale efecto a una imagen usando ${usedPrefix}phmaker (opcion) y responde un mensaje o agrega el comando a una imagen con las opciones que te dare \nUsar asi: *${usedPrefix}phmaker* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🖍️ LOGOS*\nDescripcion: opcion 3 \nUsar asi: *${usedPrefix}facebook \nUsar asi: *${usedPrefix}logos* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🖍️ LOGOS NAVIDAD*\nDescripcion: opcion 4 \nUsar asi: *${usedPrefix}facebook \nUsar asi: *${usedPrefix}logochristmas* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🖍️ LOGOS CORAZON*\nDescripcion: opcion 5 \nUsar asi: *${usedPrefix}facebook \nUsar asi: *${usedPrefix}logocorazon* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🖍️ COMENTARIO DE YOUTUBE*\nDescripcion: haz un fake de un comentario en youtube \nUsar asi: *${usedPrefix}ytcomment* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🖍️ TARJETA HORNY*\nDescripcion: responde a un mensaje o manda el comando ${usedPrefix}hornycard y pon tu imagen de perfil o la de alguien mas en una tarjeta horny \nUsar asi: *${usedPrefix}hornycard* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🖍️ TARJETA SIMP*\nDescripcion: responde a un mensaje o manda el comando ${usedPrefix}simcard y pon tu imagen de perfil o la de alguien mas en una tarjeta \nUsar asi: *${usedPrefix}simps \nUsar asi: *${usedPrefix}simpcard* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🖍️ POLICIA DE LOLIS*\nDescripcion: responde a un mensaje o manda el comando ${usedPrefix}lolice y pon tu imagen de perfil o la de alguien mas en una loli \nUsar asi: *${usedPrefix}lolice* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🖍️ MEME ERES ESTUPIDO*\nDescripcion: responde a un mensaje o manda el comando ${usedPrefix}itssostupid y pon tu imagen de perfil o la de alguien mas en un meme \nUsar asi: *${usedPrefix}itssostupid* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🖍️ PIXELAR*\nDescripcion: responde a un mensaje o manda el comando ${usedPrefix}pixelar y pon tu imagen de perfil o la de alguien mas en una imagen pixelada \nUsar asi: *${usedPrefix}pixelar* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🖍️ BLUR*\nDescripcion: responde a un mensaje o manda el comando ${usedPrefix}blur y pon tu imagen de perfil o la de alguien mas con efecto borroso \nUsar asi: *${usedPrefix}blur*`


    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
    conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} catch {
  let str = `
┣ *${gt}* ESTE ES EL MENU DE LOS COMANDOS DE LOS EFECTOS Y LOGOS\n✨${userm}✨*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📅 FECHA: ${week}, ${date}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📈 TIEMPO ACTIVO: ${uptime}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📊 USUARIOS: ${rtotalreg}*
  
┣ *ඬ⃟ 🖍️* _${usedPrefix}mensajefalso *<nombre|mensaje>*_
┣ *ඬ⃟ 🖍️* _${usedPrefix}phmaker *<opcion> <imagen>*_
┣ *ඬ⃟ 🖍️* _${usedPrefix}logos *<efecto> <texto>*_
┣ *ඬ⃟ 🖍️* _${usedPrefix}logochristmas *<texto>*_
┣ *ඬ⃟ 🖍️* _${usedPrefix}logocorazon *<texto>*_
┣ *ඬ⃟ 🖍️* _${usedPrefix}ytcomment *<texto>*_
┣ *ඬ⃟ 🖍️* _${usedPrefix}hornycard *<@tag>*_
┣ *ඬ⃟ 🖍️* _${usedPrefix}simpcard *<@tag>*_
┣ *ඬ⃟ 🖍️* _${usedPrefix}lolice *<@tag>*_
┣ *ඬ⃟ 🖍️* _${usedPrefix}itssostupid_
┣ *ඬ⃟ 🖍️* _${usedPrefix}pixelar_
┣ *ඬ⃟ 🖍️* _${usedPrefix}blur_
  
${usedPrefix}donar para 📮 𝙳𝙾𝙽𝙰𝚁 📮 
${usedPrefix}terminosycondiciones para 📋 𝚃𝙴𝚁𝙼𝙸𝙽𝙾𝚂 𝚈 𝙲𝙾𝙽𝙳𝙸𝙲𝙸𝙾𝙽𝙴𝚂 📋
${usedPrefix}infobot para 🐾 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 🐾  
`.trim()
 
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
conn.sendMessage(m.chat, { text: str.trim(), mentions: conn.parseMention(str) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )

}
break
//Menu principal

case `menu`:
  case `menú`:
  case `memu`:
  case `memú`:
  case `help`:
  case `info`:
  case `comandos`:
  case `2help`:
  case `ayuda`:
case `allmenu`:
case `menu1.2`:
case `commands`:
case `commandos`:
case `cmd`:
try {
    let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS DEL MENU PRINCIPAL ✨${userm}✨
    *📅 ${gt} Fecha: ${week}, ${date}*
    *📈 Tiempo activo ${gt}: ${uptime}*
    *📊 Registrados: ${rtotalreg}*
    *MENU ${wm} powered by*\n*${igfg}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *MENU PRINCIPAL DEL ${wm} 
┣ *bot*\nDescripcion: menu de ayuda (uso sin prefijo)bot|Bot* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎖️ JUEGOS*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + juegos (menu de juegos) \nUsar asi: *${usedPrefix}juegos* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔰 REPORTES DE FALLOS*\nDescripcion: reporta los fallos despues del comando ${usedPrefix}reporte *texto* \nUsar asi: *${usedPrefix}reporte* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 DESCARGAS*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + descargas (menu descargas) \nUsar asi: *${usedPrefix}descargas* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 ADMINS-GRUPOS*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + gAdmin (Solo admins) \nUsar asi: *${usedPrefix}gAdmin* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💎 DUEÑO (OWNERs)*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + owners (Solo owners) \nUsar asi: *${usedPrefix}gAdmin* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🧧 CONVERTIDORES*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + convert ( \nUsar asi: *${usedPrefix}convertidores \nUsar asi: *${usedPrefix}convert* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🖍️ EFECTOS Y LOGOS*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + logosefectos ( \nUsar asi: *${usedPrefix}optener efectos y logos) \nUsar asi: *${usedPrefix}logosefectos* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 RANDOM*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + random \nUsar asi: *${usedPrefix}random* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🎤 EFECTOS DE AUDIOS*\nDescripcion: *- RESPONDE A UN AUDIO O NOTA DE VOZ usando ${usedPrefix}audioefect* \nUsar asi: *${usedPrefix}audioefect* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📳 CHAT ANONIMO*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + chatanonimo \nUsar asi: *${usedPrefix}chatanonimo* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔍 BUSCADORES*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + buscar (buscadores de internet) \nUsar asi: *${usedPrefix}buscar* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔊 AUDIOS*\nDescripcion: *- ESCRIBE LAS PALABRAS O FRASES SIN NINGUN PREFIJO (${usedPrefix}, /, *, .)* \nUsar asi: *${usedPrefix}audios* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🛠️ HERRAMIENTAS*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + herramientas (algunas herramientas \nUsar asi: *${usedPrefix}herramientas* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💵 RPG - LIMITES - ECONOMIA*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + rpg (juegos de rol \nUsar asi: *${usedPrefix}rpg* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👽 STICKERS*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + creador-sticker (crear stickers) \nUsar asi: *${usedPrefix}stickermenu* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 NSFW +18*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + nsfw \nUsar asi: *${usedPrefix}nsfw* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *😉 INFO TÚ*\nDescripcion: \nUsar asi: *${usedPrefix}saber la información que has juntado en los grupo \nComando:\nEl prefijo actual: ${usedPrefix} + infoyo \nUsar asi: *${usedPrefix}infoyo* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *UTILIDAD*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *💵 DONAR*\nDescripcion: si quieres apoyar al bot y a su dueño se te agradece \nUsar asi: *${usedPrefix}donasi* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👽 OWNER*\nDescripcion: contacta con mi creador \nUsar asi: *${usedPrefix}owner* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔰 INFOBOT*\nDescripcion: te muestro mi informacion al funcionar \nUsar asi: *${usedPrefix}infobot* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔗 REDES SOCIALES*\nDescripcion: BUSCANOS EN FACEBOOK https://www.facebook.com/groups/otakustogether`
.trim()

    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
    conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: resp.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} catch {
  let str = `
┣ *HOLA ✨${userm}✨, ESTE ES EL MENU DE MENUS DE ${igfg}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📅 FECHA: ${week}, ${date}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📈 TIEMPO ACTIVO: ${uptime}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📊 USUARIOS: ${rtotalreg}*
  
┣ *ඬ⃟ 💟* _Bot_ (_uso sin prefijo_)
┣ *ඬ⃟ 🎖️ *JUEGOS*, \nComando:* _${usedPrefix}juegos_
┣ *ඬ⃟ 🔰 *REPORTES DE FALLOS*, reporta los fallos despues del comando* _${usedPrefix}reporte_
┣ *ඬ⃟ 📥*DESCARGAS*, \nComando: * _${usedPrefix}descargas_
┣ *ඬ⃟ 💎*ADMINS-GRUPOS*, \nComando: * _${usedPrefix}gAdmin_
┣ *ඬ⃟ 💎*DUEÑO (OWNERs)*, \nComando:* _${usedPrefix}owners_
┣ *ඬ⃟ 🧧*CONVERTIDORES*, \nComando:* _${usedPrefix}convert_
┣ *ඬ⃟ 🖍️*EFECTOS Y LOGOS*, \nComando:* _${usedPrefix}logosefectos_
┣ *ඬ⃟ 👾*RANDOM*, \nComando:* _${usedPrefix}random_
┣ *ඬ⃟ 🎤*EFECTOS DE AUDIOS*, *- RESPONDE A UN AUDIO O NOTA DE VOZ usando* _${usedPrefix}audioefect_
┣ *ඬ⃟ 📳*CHAT ANONIMO*, \nComando:* _${usedPrefix}chatanonimo_
┣ *ඬ⃟ 🔍*BUSCADORES*, \nComando:* _${usedPrefix}buscar_
┣ *ඬ⃟ 🔊 *AUDIOS*,  *- ESCRIBE LAS PALABRAS O FRASES SIN NINGUN PREFIJO* _${usedPrefix}audios-bot_
┣ *ඬ⃟ 🛠️ *HERRAMIENTAS*, \nComando:* _${usedPrefix}herramientas_
┣ *ඬ⃟ 💵 *RPG - LIMITES - ECONOMIA*, \nComando:* _${usedPrefix}rpg_
┣ *ඬ⃟ 👽 *STICKERS*, \nComando:* _${usedPrefix}stickermenu_
┣ *ඬ⃟ 💟🔞 *NSFW +18*, \nComando:* _${usedPrefix}nsfw_
┣ *ඬ⃟ 😉 *INFO TÚ*,para saber la información que has juntado en los grupo \nComando:* _${usedPrefix}infoyo*
 
  ┃ *<SERBOT - JADIBOT*
  ┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣ *ඬ⃟ 🤖* _${usedPrefix}serbot_
┣ *ඬ⃟ 🤖* _${usedPrefix}stop_
┣ *ඬ⃟ 🤖* _${usedPrefix}bots_
┣ *ඬ⃟ 🤖* _${usedPrefix}codetoken_
┣ *ඬ⃟ 🤖* _${usedPrefix}deletebot_
┣ *${usedPrefix}donar para 📮 𝙳𝙾𝙽𝙰𝚁 📮
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *${usedPrefix}terminosycondiciones para 📋 𝚃𝙴𝚁𝙼𝙸𝙽𝙾𝚂 𝚈 𝙲𝙾𝙽𝙳𝙸𝙲𝙸𝙾𝙽𝙴𝚂 📋
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *${usedPrefix}infobot para 🐾 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 🐾` 
.trim()


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
conn.sendMessage(m.chat, { text: str.trim(), mentions: conn.parseMention(str) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )


}
break
//Owners o propietarios

case `owners`:
  try {
  
    let resp = `${gt}✨${userm}✨ ESTE ES EL MENU DE LOS COMANDOS SOLO para PERSONAL CON TITULO DE OWNER O SIMILAR
┣ *OWNERS Y MODERADORES ${wm}*\npowered by\n*${namerepre}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *LISTA DE OPCIONES*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 >*\nDescripcion: > <funcion>>
┣ *👑 =>*\nDescripcion: => <funcion>=>
┣ *👑 $*\nDescripcion: $ <funcion>$
┣ *👑 SET PREFIX*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + setprefix <prefijo> \nUsar asi: *${usedPrefix}setprefix* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 RESET PREFIX*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + resetprefix \nUsar asi: *${usedPrefix}resetprefix* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 AUTOADMIN*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + autoadmin \nUsar asi: *${usedPrefix}autoadmin* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 LEAVEGC*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + leavegc \nUsar asi: *${usedPrefix}leavegc* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 CAJA FUERTE*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + cajafuerte \nUsar asi: *${usedPrefix}cajafuerte* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 BLOCKLIST*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + blocklist \nUsar asi: *${usedPrefix}blocklist* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 BLOCK*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + block <@tag / numero> \nUsar asi: *${usedPrefix}block* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 UNBLOCK*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + unblock <@tag / numero> \nUsar asi: *${usedPrefix}unblock* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 ENABLE RESTRICT*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + enable restrict \nUsar asi: *${usedPrefix}enable restrict* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 DISABLE RESTRICT*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + disable restrict \nUsar asi: *${usedPrefix}disable restrict* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 ENABLE AUTOREAD*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + enable autoread \nUsar asi: *${usedPrefix}enable autoread* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 DISABLE AUTOREAD*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + disable autoread \nUsar asi: *${usedPrefix}disable autoread* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 ENABLE PUBLIC*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + enable public \nUsar asi: *${usedPrefix}enable public* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 DISABLE PUBLIC*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + disable public \nUsar asi: *${usedPrefix}disable public* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 ENABLE PCONLY*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + enable pconly \nUsar asi: *${usedPrefix}enable pconly* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 DISABLE PCONLY*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + disable pconly \nUsar asi: *${usedPrefix}disable pconly* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 ENABLE GCONLY*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + enable gconly \nUsar asi: *${usedPrefix}enable gconly* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 DISABLE GCONLY*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + disable gconly \nUsar asi: *${usedPrefix}disable gconly* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 ENABLE ANTICALL*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + enable anticall \nUsar asi: *${usedPrefix}enable anticall* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 DISABLE ANTICALL*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + disable anticall \nUsar asi: *${usedPrefix}disable anticall* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 ENABLE ANTIPRIVADO*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + enable antiprivado \nUsar asi: *${usedPrefix}enable antiprivado* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 DISABLE ANTIPRIVADO*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + disable antiprivado \nUsar asi: *${usedPrefix}disable antiprivado* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 ENABLE MODEJADIBOT*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + enable modejadibot \nUsar asi: *${usedPrefix}enable modejadibot* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 DISABLE MODEJADIBOT*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + disable modejadibot \nUsar asi: *${usedPrefix}disable modejadibot* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 MSG*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + msg <texto> \nUsar asi: *${usedPrefix}msg* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 BANCHAT*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + banchat \nUsar asi: *${usedPrefix}banchat* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 UNBANCHAT*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + unbanchat \nUsar asi: *${usedPrefix}unbanchat* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 BANUSER*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + banuser <@tag> \nUsar asi: *${usedPrefix}banuser* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 UNBANUSER*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + unbanuser <@tag> \nUsar asi: *${usedPrefix}unbanuser* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 DAR DIAMANTES*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + dardiamantes <@tag> \nUsar asi: *${usedPrefix}dardiamantes* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 AÑADIR XP*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + añadirxp <@tag> \nUsar asi: *${usedPrefix}añadirxp* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 BC*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + bc <texto> \nUsar asi: *${usedPrefix}bc* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 BCCHATS*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + bcchats <texto> \nUsar asi: *${usedPrefix}bcchats* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 BCGC*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + bcgc <texto> \nUsar asi: *${usedPrefix}bcgc* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 BCBOT*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + bcbot <texto> \nUsar asi: *${usedPrefix}bcbot* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 CLEARTPM*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + cleartpm \nUsar asi: *${usedPrefix}cleartpm* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 RESTART*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + restart \nUsar asi: *${usedPrefix}restart* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 UPDATE*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + update \nUsar asi: *${usedPrefix}update* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 BANLIST*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + banlist \nUsar asi: *${usedPrefix}banlist* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 ADDPREM*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + addprem <@tag> \nUsar asi: *${usedPrefix}addprem* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 DELPREM*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + delprem <@tag> \nUsar asi: *${usedPrefix}delprem* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 LISTPREM*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + listprem \nUsar asi: *${usedPrefix}listprem* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 LISTCMD*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + listcmd \nUsar asi: *${usedPrefix}listcmd* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 SETPPBOT*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + setppbot <responder a imagen> \nUsar asi: *${usedPrefix}setppbot* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 ADDCMD*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + addcmd <texto> <responder a sticker/imagen> \nUsar asi: *${usedPrefix}addcmd* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👑 DELCMD*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + delcmd <responder a sticker/imagen con comando o texto asignado> \nUsar asi: *${usedPrefix}delcmd*`

    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
    conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} catch {
  let str = `
┣ *HOLA ✨${userm}✨, ESTE ES EL MENU DE OWNER Y MODERADORES DE ${igfg}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📅 FECHA: ${week}, ${date}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📈 TIEMPO ACTIVO: ${uptime}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📊 USUARIOS: ${rtotalreg}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *ඬ⃟ 👑 > *<funcion>*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *ඬ⃟ 👑 => *<funcion>*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *ඬ⃟ 👑 $ *<funcion>*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *ඬ⃟ 👑* _${usedPrefix}setprefix *<prefijo>*_
┣ *ඬ⃟ 👑* _${usedPrefix}resetprefix_
┣ *ඬ⃟ 👑* _${usedPrefix}autoadmin_
┣ *ඬ⃟ 👑* _${usedPrefix}leavegc_
┣ *ඬ⃟ 👑* _${usedPrefix}cajafuerte_
┣ *ඬ⃟ 👑* _${usedPrefix}blocklist_
┣ *ඬ⃟ 👑* _${usedPrefix}block *<@tag / numero>*_
┣ *ඬ⃟ 👑* _${usedPrefix}unblock *<@tag / numero>*_
┣ *ඬ⃟ 👑* _${usedPrefix}enable *restrict*_
┣ *ඬ⃟ 👑* _${usedPrefix}disable *restrict*_
┣ *ඬ⃟ 👑* _${usedPrefix}enable *autoread*_
┣ *ඬ⃟ 👑* _${usedPrefix}disable *autoread*_
┣ *ඬ⃟ 👑* _${usedPrefix}enable *public*_
┣ *ඬ⃟ 👑* _${usedPrefix}disable *public*_
┣ *ඬ⃟ 👑* _${usedPrefix}enable *pconly*_
┣ *ඬ⃟ 👑* _${usedPrefix}disable *pconly*_
┣ *ඬ⃟ 👑* _${usedPrefix}enable *gconly*_
┣ *ඬ⃟ 👑* _${usedPrefix}disable *gconly*_
┣ *ඬ⃟ 👑* _${usedPrefix}enable *anticall*_
┣ *ඬ⃟ 👑* _${usedPrefix}disable *anticall*_
┣ *ඬ⃟ 👑* _${usedPrefix}enable *antiprivado*_
┣ *ඬ⃟ 👑* _${usedPrefix}disable *antiprivado*_
┣ *ඬ⃟ 👑* _${usedPrefix}enable *modejadibot*_
┣ *ඬ⃟ 👑* _${usedPrefix}disable *modejadibot*_
┣ *ඬ⃟ 👑* _${usedPrefix}msg *<texto>*_
┣ *ඬ⃟ 👑* _${usedPrefix}banchat_
┣ *ඬ⃟ 👑* _${usedPrefix}unbanchat_
┣ *ඬ⃟ 👑* _${usedPrefix}banuser *<@tag>*_
┣ *ඬ⃟ 👑* _${usedPrefix}unbanuser *<@tag>*_
┣ *ඬ⃟ 👑* _${usedPrefix}dardiamantes *<@tag>*_
┣ *ඬ⃟ 👑* _${usedPrefix}añadirxp *<@tag>*_
┣ *ඬ⃟ 👑* _${usedPrefix}banuser *<@tag>*_
┣ *ඬ⃟ 👑* _${usedPrefix}bc *<texto>*_
┣ *ඬ⃟ 👑* _${usedPrefix}bcchats *<texto>*_
┣ *ඬ⃟ 👑* _${usedPrefix}bcgc *<texto>*_
┣ *ඬ⃟ 👑* _${usedPrefix}bcbot *<texto>*_
┣ *ඬ⃟ 👑* _${usedPrefix}cleartpm_
┣ *ඬ⃟ 👑* _${usedPrefix}restart_
┣ *ඬ⃟ 👑* _${usedPrefix}update_
┣ *ඬ⃟ 👑* _${usedPrefix}banlist_
┣ *ඬ⃟ 👑* _${usedPrefix}addprem *<@tag>*_
┣ *ඬ⃟ 👑* _${usedPrefix}delprem *<@tag>*_
┣ *ඬ⃟ 👑* _${usedPrefix}listprem_
┣ *ඬ⃟ 👑* _${usedPrefix}listcmd_
┣ *ඬ⃟ 👑* _${usedPrefix}setppbot *<responder a imagen>*_
┣ *ඬ⃟ 👑* _${usedPrefix}addcmd *<texto> <responder a sticker/imagen>*_
┣ *ඬ⃟ 👑* _${usedPrefix}delcmd *<responder a sticker/imagen con comando o texto asignado>*_
┣ *${usedPrefix}donar para 📮 𝙳𝙾𝙽𝙰𝚁 📮
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *${usedPrefix}terminosycondiciones para 📋 𝚃𝙴𝚁𝙼𝙸𝙽𝙾𝚂 𝚈 𝙲𝙾𝙽𝙳𝙸𝙲𝙸𝙾𝙽𝙴𝚂 📋
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *${usedPrefix}infobot para 🐾 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 🐾
`.trim()
  
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
conn.sendMessage(m.chat, { text: str.trim(), mentions: conn.parseMention(str) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )

}
break
//Ramdon

case `random`:
  try{
  
    let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS RANDOM\n✨${userm}✨
┣ *MENU RANDOM ${wm}*\npowered by\n*${namerepre}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *LISTA DE OPCIONES*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 KPOP*\nDescripcion: blackpink / exo / bts \nUsar asi: *${usedPrefix}kpop* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 CRISTIANO RONALDO*\nDescripcion: \nUsar asi: *${usedPrefix}cristianoronaldo* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 MESSI*\nDescripcion: \nUsar asi: *${usedPrefix}messi* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 MEME*\nDescripcion: \nUsar asi: *${usedPrefix}meme* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 ITZY*\nDescripcion: \nUsar asi: *${usedPrefix}itzy* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 BLACKPINK*\nDescripcion: \nUsar asi: *${usedPrefix}blackpink* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 LOLIVID*\nDescripcion: \nUsar asi: *${usedPrefix}lolivid* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 LOLI*\nDescripcion: \nUsar asi: *${usedPrefix}loli* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 NAVIDAD*\nDescripcion: \nUsar asi: *${usedPrefix}navidad* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 PPCOUPLE*\nDescripcion: \nUsar asi: *${usedPrefix}ppcouple* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 WPMONTAÑA*\nDescripcion: \nUsar asi: *${usedPrefix}wpmontaña* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 PUBG*\nDescripcion: \nUsar asi: *${usedPrefix}pubg* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 WPGAMING*\nDescripcion: \nUsar asi: *${usedPrefix}wpgaming* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 WPAESTHETIC*\nDescripcion: \nUsar asi: *${usedPrefix}wpaesthetic* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 WPAESTHETIC2*\nDescripcion: \nUsar asi: *${usedPrefix}wpaesthetic2* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 WPRANDOM*\nDescripcion: \nUsar asi: *${usedPrefix}wprandom* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 WALLHP*\nDescripcion: \nUsar asi: *${usedPrefix}wallhp* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 WPVEHICULO*\nDescripcion: \nUsar asi: *${usedPrefix}wpvehiculo* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 WPMOTO*\nDescripcion: \nUsar asi: *${usedPrefix}wpmoto* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 COFFEE*\nDescripcion: \nUsar asi: *${usedPrefix}coffee* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 PENTOL*\nDescripcion: \nUsar asi: *${usedPrefix}pentol* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 CARICATURA*\nDescripcion: \nUsar asi: *${usedPrefix}caricatura* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 CIBERESPACIO*\nDescripcion: \nUsar asi: *${usedPrefix}ciberespacio* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 TECHNOLOGY*\nDescripcion: \nUsar asi: *${usedPrefix}technology* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 DORAEMON*\nDescripcion: \nUsar asi: *${usedPrefix}doraemon* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 HACKER*\nDescripcion: \nUsar asi: *${usedPrefix}hacker* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 PLANETA*\nDescripcion: \nUsar asi: *${usedPrefix}planeta* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 RANDOMPROFILE*\nDescripcion: \nUsar asi: *${usedPrefix}randomprofile* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 NEKO*\nDescripcion: \nUsar asi: *${usedPrefix}neko* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 WAIFU*\nDescripcion: \nUsar asi: *${usedPrefix}waifu* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 AKIRA*\nDescripcion: \nUsar asi: *${usedPrefix}akira* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 AKIYAMA*\nDescripcion: \nUsar asi: *${usedPrefix}akiyama* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 ANNA*\nDescripcion: \nUsar asi: *${usedPrefix}anna* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 ASUNA*\nDescripcion: \nUsar asi: *${usedPrefix}asuna* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 AYUZAWA*\nDescripcion: \nUsar asi: *${usedPrefix}ayuzawa* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 BORUTO*\nDescripcion: \nUsar asi: *${usedPrefix}boruto* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 CHIHO*\nDescripcion: \nUsar asi: *${usedPrefix}chiho* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 CHITOGE*\nDescripcion: \nUsar asi: *${usedPrefix}chitoge* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 DEIDARA*\nDescripcion: * \nUsar asi: *${usedPrefix}deidara* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 ERZA*\nDescripcion: \nUsar asi: *${usedPrefix}erza* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 ELAINA*\nDescripcion: \nUsar asi: *${usedPrefix}elaina* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 EBA*\nDescripcion: \nUsar asi: *${usedPrefix}eba* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 EMILIA*\nDescripcion: \nUsar asi: *${usedPrefix}emilia* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 HESTIA*\nDescripcion: \nUsar asi: *${usedPrefix}hestia* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 HINATA*\nDescripcion: \nUsar asi: *${usedPrefix}hinata* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 INORI*\nDescripcion: \nUsar asi: *${usedPrefix}inori* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 ISUZU*\nDescripcion: \nUsar asi: *${usedPrefix}isuzu* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 ITACHI*\nDescripcion: \nUsar asi: *${usedPrefix}itachi* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 ITORI*\nDescripcion: \nUsar asi: *${usedPrefix}itori* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 KAGA*\nDescripcion: \nUsar asi: *${usedPrefix}kaga* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 KAGURA*\nDescripcion: \nUsar asi: *${usedPrefix}kagura* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 KAORI*\nDescripcion: \nUsar asi: *${usedPrefix}kaori* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 KENEKI*\nDescripcion: \nUsar asi: *${usedPrefix}keneki* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 KOTORI*\nDescripcion: \nUsar asi: *${usedPrefix}kotori* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 KURUMI*\nDescripcion: \nUsar asi: *${usedPrefix}kurumi* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 MADARA*\nDescripcion: \nUsar asi: *${usedPrefix}madara* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 MIKASA*\nDescripcion: \nUsar asi: *${usedPrefix}mikasa* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 MIKU*\nDescripcion: \nUsar asi: *${usedPrefix}miku* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 MINATO*\nDescripcion: \nUsar asi: *${usedPrefix}minato* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 NARUTO*\nDescripcion: \nUsar asi: *${usedPrefix}naruto* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 NEZUKO*\nDescripcion: \nUsar asi: *${usedPrefix}nezuko* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 SAGIRI*\nDescripcion: \nUsar asi: *${usedPrefix}sagiri* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 SASUKE*\nDescripcion: \nUsar asi: *${usedPrefix}sasuke* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 SAKURA*\nDescripcion: \nUsar asi: *${usedPrefix}sakura* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *👾 COSPLAY*\nDescripcion: \nUsar asi: *${usedPrefix}cosplay*`


    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
    conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} catch {
  let str = `
┣ *${gt}* ESTE ES EL MENU DE LOS COMANDOS RANDOM\n✨${userm}✨*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📅 FECHA: ${week}, ${date}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📈 TIEMPO ACTIVO: ${uptime}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📊 USUARIOS: ${rtotalreg}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *ඬ⃟ 👾* _${usedPrefix}kpop *<blackpink / exo / bts>*_
┣ *ඬ⃟ 👾* _${usedPrefix}cristianoronaldo_
┣ *ඬ⃟ 👾* _${usedPrefix}messi_
┣ *ඬ⃟ 👾* _${usedPrefix}meme_
┣ *ඬ⃟ 👾* _${usedPrefix}itzy_
┣ *ඬ⃟ 👾* _${usedPrefix}blackpink_
┣ *ඬ⃟ 👾* _${usedPrefix}lolivid_
┣ *ඬ⃟ 👾* _${usedPrefix}loli_
┣ *ඬ⃟ 👾* _${usedPrefix}navidad_
┣ *ඬ⃟ 👾* _${usedPrefix}ppcouple_
┣ *ඬ⃟ 👾* _${usedPrefix}wpmontaña_
┣ *ඬ⃟ 👾* _${usedPrefix}pubg_
┣ *ඬ⃟ 👾* _${usedPrefix}wpgaming_
┣ *ඬ⃟ 👾* _${usedPrefix}wpaesthetic_
┣ *ඬ⃟ 👾* _${usedPrefix}wpaesthetic2_
┣ *ඬ⃟ 👾* _${usedPrefix}wprandom_
┣ *ඬ⃟ 👾* _${usedPrefix}wallhp_
┣ *ඬ⃟ 👾* _${usedPrefix}wpvehiculo_
┣ *ඬ⃟ 👾* _${usedPrefix}wpmoto_
┣ *ඬ⃟ 👾* _${usedPrefix}coffee_
┣ *ඬ⃟ 👾* _${usedPrefix}pentol_
┣ *ඬ⃟ 👾* _${usedPrefix}caricatura_
┣ *ඬ⃟ 👾* _${usedPrefix}ciberespacio_
┣ *ඬ⃟ 👾* _${usedPrefix}technology_
┣ *ඬ⃟ 👾* _${usedPrefix}doraemon_
┣ *ඬ⃟ 👾* _${usedPrefix}hacker_
┣ *ඬ⃟ 👾* _${usedPrefix}planeta_
┣ *ඬ⃟ 👾* _${usedPrefix}randomprofile_
┣ *ඬ⃟ 👾* _${usedPrefix}neko_
┣ *ඬ⃟ 👾* _${usedPrefix}waifu_
┣ *ඬ⃟ 👾* _${usedPrefix}akira_
┣ *ඬ⃟ 👾* _${usedPrefix}akiyama_
┣ *ඬ⃟ 👾* _${usedPrefix}anna_
┣ *ඬ⃟ 👾* _${usedPrefix}asuna_
┣ *ඬ⃟ 👾* _${usedPrefix}ayuzawa_
┣ *ඬ⃟ 👾* _${usedPrefix}boruto_
┣ *ඬ⃟ 👾* _${usedPrefix}chiho_
┣ *ඬ⃟ 👾* _${usedPrefix}chitoge_
┣ *ඬ⃟ 👾* _${usedPrefix}deidara_
┣ *ඬ⃟ 👾* _${usedPrefix}erza_
┣ *ඬ⃟ 👾* _${usedPrefix}elaina_
┣ *ඬ⃟ 👾* _${usedPrefix}eba_
┣ *ඬ⃟ 👾* _${usedPrefix}emilia_
┣ *ඬ⃟ 👾* _${usedPrefix}hestia_
┣ *ඬ⃟ 👾* _${usedPrefix}hinata_
┣ *ඬ⃟ 👾* _${usedPrefix}inori_
┣ *ඬ⃟ 👾* _${usedPrefix}isuzu_
┣ *ඬ⃟ 👾* _${usedPrefix}itachi_
┣ *ඬ⃟ 👾* _${usedPrefix}itori_
┣ *ඬ⃟ 👾* _${usedPrefix}kaga_
┣ *ඬ⃟ 👾* _${usedPrefix}kagura_
┣ *ඬ⃟ 👾* _${usedPrefix}kaori_
┣ *ඬ⃟ 👾* _${usedPrefix}keneki_
┣ *ඬ⃟ 👾* _${usedPrefix}kotori_
┣ *ඬ⃟ 👾* _${usedPrefix}kurumi_
┣ *ඬ⃟ 👾* _${usedPrefix}madara_
┣ *ඬ⃟ 👾* _${usedPrefix}mikasa_
┣ *ඬ⃟ 👾* _${usedPrefix}miku_
┣ *ඬ⃟ 👾* _${usedPrefix}minato_
┣ *ඬ⃟ 👾* _${usedPrefix}naruto_
┣ *ඬ⃟ 👾* _${usedPrefix}nezuko_
┣ *ඬ⃟ 👾* _${usedPrefix}sagiri_
┣ *ඬ⃟ 👾* _${usedPrefix}sasuke_
┣ *ඬ⃟ 👾* _${usedPrefix}sakura_
┣ *ඬ⃟ 👾* _${usedPrefix}cosplay_
┣ *${usedPrefix}donar para 📮 𝙳𝙾𝙽𝙰𝚁 📮
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *${usedPrefix}terminosycondiciones para 📋 𝚃𝙴𝚁𝙼𝙸𝙽𝙾𝚂 𝚈 𝙲𝙾𝙽𝙳𝙸𝙲𝙸𝙾𝙽𝙴𝚂 📋
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *${usedPrefix}infobot para 🐾 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 🐾 
  `.trim()



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
conn.sendMessage(m.chat, { text: str.trim(), mentions: conn.parseMention(str) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )

}
break
//RPG, Limites y economia para juegos de rol

case `rpg`:
  try {
  
    let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS DE ROL para GRUPOS\n✨${userm}✨\nAsi que: Compra, Adquiere Recuersos, Mejora Tú Nivel y Rango!!
┣ *RPG, LIMITES Y ECONOMIA ${wm}*\npowered by\n*${namerepre}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *LISTA DE OPCIONES*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ PASE*\nDescripcion: \nUsar asi: *${usedPrefix}pase premium* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ PASS*\nDescripcion: \nUsar asi: *${usedPrefix}pass premium* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ LISTAPREMIUM*\nDescripcion: \nUsar asi: *${usedPrefix}listapremium | listprem* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ TRANSFERIR*\nDescripcion: *tipo cantidad @tag* \nUsar asi: *${usedPrefix}transfer* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ DAR*\nDescripcion: \nUsar asi: *${usedPrefix}dar *tipo cantidad @tag*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ ENVIAR*\nDescripcion: *tipo cantidad @tag* \nUsar asi: *${usedPrefix}enviar 
┣ *⚗️ BALANCE*\nDescripcion: \nUsar asi: *${usedPrefix}balance* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ CARTERA*\nDescripcion: \nUsar asi: *${usedPrefix}cartera | wallet* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ EXPERIENCIA*\nDescripcion: \nUsar asi: *${usedPrefix}experiencia | exp* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ TOP*\nDescripcion: \nUsar asi: *${usedPrefix}top | lb | leaderboard* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ NIVEL*\nDescripcion: \nUsar asi: *${usedPrefix}nivel | level | lvl* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ ROL*\nDescripcion: \nUsar asi: *${usedPrefix}rol | rango* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ INVENTARIO*\nDescripcion: \nUsar asi: *${usedPrefix}inventario | inventory* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ AVENTURA*\nDescripcion: \nUsar asi: *${usedPrefix}aventura | adventure* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ CAZA*\nDescripcion: \nUsar asi: *${usedPrefix}caza | cazar | hunt* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ PESCAR*\nDescripcion: \nUsar asi: *${usedPrefix}pescar | fishing* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ ANIMALES*\nDescripcion: \nUsar asi: *${usedPrefix}animales* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ ALIMENTOS*\nDescripcion: \nUsar asi: *${usedPrefix}alimentos* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ CURAR*\nDescripcion: \nUsar asi: *${usedPrefix}curar | heal* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ BUY*\nDescripcion: \nUsar asi: *${usedPrefix}buy* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ SELL*\nDescripcion: \nUsar asi: *${usedPrefix}sell* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ VERIFICAR*\nDescripcion: \nUsar asi: *${usedPrefix}verificar | registrar* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ PERFIL*\nDescripcion: \nUsar asi: *${usedPrefix}perfil | profile* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ MYNS*\nDescripcion: \nUsar asi: *${usedPrefix}myns* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ UNREG*\nDescripcion: \nUsar asi: *${usedPrefix}unreg *numero de serie*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ MINAR DIAMANTES*\nDescripcion: \nUsar asi: *${usedPrefix}minardiamantes | minargemas* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ MINAR AMXCOINS*\nDescripcion: \nUsar asi: *${usedPrefix}minaramxcoins | minarcoins* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ MINAR EXPERIENCIA*\nDescripcion: \nUsar asi: *${usedPrefix}minarexperiencia | minarexp* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ MINAR*\nDescripcion: \nUsar asi: *${usedPrefix}minar *:* minar2 *:* minar3* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ RECLAMAR*\nDescripcion: \nUsar asi: *${usedPrefix}reclamar | regalo | claim* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ CADA HORA*\nDescripcion: \nUsar asi: *${usedPrefix}cadahora | hourly* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ CADA SEMANA*\nDescripcion: \nUsar asi: *${usedPrefix}cadasemana | semanal | weekly* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ CADA MES*\nDescripcion: \nUsar asi: *${usedPrefix}cadames | mes | monthly* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ COFRE*\nDescripcion: \nUsar asi: *${usedPrefix}cofre | abrircofre | coffer* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *⚗️ TRABAJAR*\nDescripcion: \nUsar asi: *${usedPrefix}trabajar | work*` 

    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
    conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )

} catch {
let str = `
┣ *${gt}* ESTE ES EL MENU DE LOS COMANDOS DE ROL \nUsar asi: *${usedPrefix}GRUPOS\n✨${userm}✨\nAsi que: Compra, Adquiere Recuersos, Mejora Tú Nivel y Rango!!
┣ *📅 FECHA: ${week}, ${date}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📈 TIEMPO ACTIVO: ${uptime}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📊 USUARIOS: ${rtotalreg}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *ඬ⃟ 💵* _${usedPrefix}transfer *<tipo> <cantidad> <@tag>*_
┣ *ඬ⃟ 💵* _${usedPrefix}balance_
┣ *ඬ⃟ 💵* _${usedPrefix}claim_
┣ *ඬ⃟ 💵* _${usedPrefix}lb_
┣ *ඬ⃟ 💵* _${usedPrefix}levelup_
┣ *ඬ⃟ 💵* _${usedPrefix}myns_
┣ *ඬ⃟ 💵* _${usedPrefix}perfil_
┣ *ඬ⃟ 💵* _${usedPrefix}work_
┣ *ඬ⃟ 💵* _${usedPrefix}minar_
┣ *ඬ⃟ 💵* _${usedPrefix}buy_
┣ *ඬ⃟ 💵* _${usedPrefix}buyall_
┣ *ඬ⃟ 💵* _${usedPrefix}verificar_
┣ *ඬ⃟ 💵* _${usedPrefix}unreg *<numero de serie>*_
┣ *${usedPrefix}donar para 📮 𝙳𝙾𝙽𝙰𝚁 📮
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *${usedPrefix}terminosycondiciones para 📋 𝚃𝙴𝚁𝙼𝙸𝙽𝙾𝚂 𝚈 𝙲𝙾𝙽𝙳𝙸𝙲𝙸𝙾𝙽𝙴𝚂 📋
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *${usedPrefix}infobot para 🐾 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 🐾` 



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
conn.sendMessage(m.chat, { text: str.trim(), mentions: conn.parseMention(str) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )

}
break
//solo mayores de 18 (requiere registro)

case `nsfw`:
  try {
  if (!db.data.chats[m.chat].modohorny && m.isGroup) throw `*[❗INFO❗] LOS COMANDOS +18 ESTAN DESACTIVADOS EN ESTE GRUPO, SI ES ADMIN Y DESEA ACTIVARLOS USE EL COMANDO ${usedPrefix}enable modohorny*`
  
    let resp = `${gt} ✨${userm}✨(PUERCO🐽) ESTE ES EL MENU DE LOS COMANDOS +18
┣ *COMANDOS +18 ${wm}*\npowered by\n*${namerepre}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *LISTA PUERCA🐷*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 PACK*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + pack \nUsar asi: *${usedPrefix}pack* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 PACK2*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + pack2 \nUsar asi: *${usedPrefix}pack2* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 PACK3*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + pack3 \nUsar asi: *${usedPrefix}pack3* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 VIDEO XXX*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + videoxxx \nUsar asi: *${usedPrefix}videoxxx* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 TETAS*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + tetas \nUsar asi: *${usedPrefix}tetas* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 BOOTY*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + booty \nUsar asi: *${usedPrefix}booty* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 ECCHI*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + ecchi \nUsar asi: *${usedPrefix}ecchi* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 FURRO*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + furro \nUsar asi: *${usedPrefix}furro* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 IMAGEN LESBIANS*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + imagenlesbians \nUsar asi: *${usedPrefix}imagenlesbians* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 PANTIES*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + panties \nUsar asi: *${usedPrefix}panties* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 PENE*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + pene \nUsar asi: *${usedPrefix}pene* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 PORNO*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + porno \nUsar asi: *${usedPrefix}porno* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 PORNO2*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + porno2 \nUsar asi: *${usedPrefix}porno2* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 RANDOM XXX*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + randomxxx \nUsar asi: *${usedPrefix}randomxxx* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 PECHOS*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + pechos \nUsar asi: *${usedPrefix}pechos* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 YAOI*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + yaoi \nUsar asi: *${usedPrefix}yaoi* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 YAOI2*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + yaoi2 \nUsar asi: *${usedPrefix}yaoi2* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 YURI*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + yuri \nUsar asi: *${usedPrefix}yuri* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 YURI2*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + yuri2 \nUsar asi: *${usedPrefix}yuri2* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 TRAPITO*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + trapito \nUsar asi: *${usedPrefix}trapito* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 HENTAI*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + hentai \nUsar asi: *${usedPrefix}hentai* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 PIES*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + pies \nUsar asi: *${usedPrefix}pies* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 NSFW LOLI*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + nsfwloli \nUsar asi: *${usedPrefix}nsfwloli* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 NSFW ORGY*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + nsfworgy \nUsar asi: *${usedPrefix}nsfworgy* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 NSFW FOOT*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + nsfwfoot \nUsar asi: *${usedPrefix}nsfwfoot* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 NSFW ASS*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + nsfwass \nUsar asi: *${usedPrefix}nsfwass* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 NSFW BDSM*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + nsfwbdsm \nUsar asi: *${usedPrefix}nsfwbdsm* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 NSFW CUM*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + nsfwcum \nUsar asi: *${usedPrefix}nsfwcum* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 NSFWERO*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + nsfwero \nUsar asi: *${usedPrefix}nsfwero* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 NSFWFEMDOM*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + nsfwfemdom \nUsar asi: *${usedPrefix}nsfwfemdom* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🔞 NSFW GLASS*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + nsfwglass \nUsar asi: *${usedPrefix}nsfwglass*`

    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
    conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
    handler.register = true
    handler.modohorny = true
} catch {
  let str = `
┣ *${gt}* ✨${userm}✨(PUERCO🐽) ESTE ES EL MENU DE LOS COMANDOS +18
┣ *📅 FECHA: ${week}, ${date}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📈 TIEMPO ACTIVO: ${uptime}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📊 USUARIOS: ${rtotalreg}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *ඬ⃟ 🔞* _${usedPrefix}pack_
┣ *ඬ⃟ 🔞* _${usedPrefix}pack2_
┣ *ඬ⃟ 🔞* _${usedPrefix}pack3_
┣ *ඬ⃟ 🔞* _${usedPrefix}videoxxx_
┣ *ඬ⃟ 🔞* _${usedPrefix}videolesbixxx_
┣ *ඬ⃟ 🔞* _${usedPrefix}tiktokxxx_
┣ *ඬ⃟ 🔞* _${usedPrefix}tetas_
┣ *ඬ⃟ 🔞* _${usedPrefix}booty_
┣ *ඬ⃟ 🔞* _${usedPrefix}ecchi_
┣ *ඬ⃟ 🔞* _${usedPrefix}furro_
┣ *ඬ⃟ 🔞* _${usedPrefix}imagenlesbians_
┣ *ඬ⃟ 🔞* _${usedPrefix}panties_
┣ *ඬ⃟ 🔞* _${usedPrefix}pene_
┣ *ඬ⃟ 🔞* _${usedPrefix}porno_
┣ *ඬ⃟ 🔞* _${usedPrefix}randomxxx_
┣ *ඬ⃟ 🔞* _${usedPrefix}pechos_
┣ *ඬ⃟ 🔞* _${usedPrefix}yaoi_
┣ *ඬ⃟ 🔞* _${usedPrefix}yaoi2_
┣ *ඬ⃟ 🔞* _${usedPrefix}yuri_
┣ *ඬ⃟ 🔞* _${usedPrefix}yuri2_
┣ *ඬ⃟ 🔞* _${usedPrefix}trapito_
┣ *ඬ⃟ 🔞* _${usedPrefix}hentai_
┣ *ඬ⃟ 🔞* _${usedPrefix}nsfwloli_
┣ *ඬ⃟ 🔞* _${usedPrefix}nsfworgy_
┣ *ඬ⃟ 🔞* _${usedPrefix}nsfwfoot_
┣ *ඬ⃟ 🔞* _${usedPrefix}nsfwass_
┣ *ඬ⃟ 🔞* _${usedPrefix}nsfwbdsm_
┣ *ඬ⃟ 🔞* _${usedPrefix}nsfwcum_
┣ *ඬ⃟ 🔞* _${usedPrefix}nsfwero_
┣ *ඬ⃟ 🔞* _${usedPrefix}nsfwfemdom_
┣ *ඬ⃟ 🔞* _${usedPrefix}nsfwglass_
┣ *${usedPrefix}donar para 📮 𝙳𝙾𝙽𝙰𝚁 📮
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *${usedPrefix}terminosycondiciones para 📋 𝚃𝙴𝚁𝙼𝙸𝙽𝙾𝚂 𝚈 𝙲𝙾𝙽𝙳𝙸𝙲𝙸𝙾𝙽𝙴𝚂 📋
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *${usedPrefix}infobot para 🐾 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 🐾` 
  
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
conn.sendMessage(m.chat, { text: str.trim(), mentions: conn.parseMention(str) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
  
}
break
//Stickers

case `stickermenu`:
  try {
  
    let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS para HACER STICKERS\n✨${userm}✨
┣ *STICKERS ${wm}*\npowered by\n*${namerepre}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *LISTA DE OPCIONES*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌠 STICKER*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + sticker <responder a imagen o video> o <enlace / link / url> \nUsar asi: *${usedPrefix}sticker* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌠 S*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + s <responder a imagen o video> o <enlace / link / url> \nUsar asi: *${usedPrefix}s* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌠 SFULL*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + sfull <responder a imagen o video> \nUsar asi: *${usedPrefix}sfull* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌠 EMOJIMIX*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + emojimix <emoji 1>&<emoji 2> \nUsar asi: *${usedPrefix}emojimix* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌠 SCIRCLE*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + scircle <responder a imagen> \nUsar asi: *${usedPrefix}scircle* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌠 SREMOVEBG*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + sremovebg <responder a imagen> \nUsar asi: *${usedPrefix}sremovebg* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌠 SEMOJI*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + semoji <tipo> <emoji> \nUsar asi: *${usedPrefix}semoji* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌠 ATTP*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + attp <texto> \nUsar asi: *${usedPrefix}attp* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌠 ATTP2*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + attp2 <texto> \nUsar asi: *${usedPrefix}attp2* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌠 ATTP3*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + attp3 <texto> \nUsar asi: *${usedPrefix}attp3* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌠 TTP*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + ttp <texto> \nUsar asi: *${usedPrefix}ttp* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌠 TTP2*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + ttp2 <texto> \nUsar asi: *${usedPrefix}ttp2* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌠 TTP3*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + ttp3 <texto> \nUsar asi: *${usedPrefix}ttp3* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌠 TTP4*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + ttp4 <texto> \nUsar asi: *${usedPrefix}ttp4* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌠 TTP5*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + ttp5 <texto> \nUsar asi: *${usedPrefix}ttp5* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌠 PAT*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + pat <@tag> \nUsar asi: *${usedPrefix}pat* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌠 SLAP*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + slap <@tag> \nUsar asi: *${usedPrefix}slap* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌠 KISS*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + kiss <@tag> \nUsar asi: *${usedPrefix}kiss* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌠 DADO*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + dado \nUsar asi: *${usedPrefix}dado* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌠 WM*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + wm <packname> <author> \nUsar asi: *${usedPrefix}wm* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌠 STICKERMARKER*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + stickermarker <efecto> <responder a imagen> \nUsar asi: *${usedPrefix}stickermarker* 
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *🌠 STICKERFILTER*\nDescripcion: \nComando:\nEl prefijo actual: ${usedPrefix} + stickerfilter <efecto> <responder a imagen> \nUsar asi: *${usedPrefix}stickerfilter*`

    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
    conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )

    try {
  let vn = `./media/menu.mp3`
  let str = `por si quieres mas info`.trim()
  `💎 GRUPOS OFICIALES 💎 usa el comando: ${usedPrefix}grupos` `🤴 OWNER 🤴 usa el comando: ${usedPrefix}owner` `🔰 INFOBOT 🔰 usa el comando: ${usedPrefix}infobot`   
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
conn.sendMessage(m.chat, { text: str.trim(), mentions: conn.parseMention(str) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
  await conn.sendFile(m.chat, vn, `../media/menu.mp3`, null, m, true, {type: `audioMessage`, ptt: true, ephemeralExpiration: 24*60*100 })
    } catch (e) {
    conn.reply(m.chat, `*[❗INFO❗] EL MENU TIENE UN ERROR Y NO FUE POSIBLE ENVIARLO, REPORTELO AL PROPIETARIO DEL BOT*`, m)
    throw e
    }
} catch {
  let str = `
┣ *${gt}* ESTE ES EL MENU DE LOS COMANDOS \nUsar asi: ${usedPrefix}HACER STICKERS\n✨${userm}✨
┣ *📅 FECHA: ${week}, ${date}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📈 TIEMPO ACTIVO: ${uptime}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📊 USUARIOS: ${rtotalreg}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *ඬ⃟ 👽* _${usedPrefix}sticker *<responder a imagen o video>*_
┣ *ඬ⃟ 👽* _${usedPrefix}sticker *<enlace / link / url>*_
┣ *ඬ⃟ 👽* _${usedPrefix}s *<responder a imagen o video>*_
┣ *ඬ⃟ 👽* _${usedPrefix}s *<enlace / link / url>*_
┣ *ඬ⃟ 👽* _${usedPrefix}sfull *<imagen o video>*_
┣ *ඬ⃟ 👽* _${usedPrefix}emojimix *<emoji 1>&<emoji 2>*_
┣ *ඬ⃟ 👽* _${usedPrefix}scircle *<imagen>*_
┣ *ඬ⃟ 👽* _${usedPrefix}sremovebg *<imagen>*_
┣ *ඬ⃟ 👽* _${usedPrefix}semoji *<tipo> <emoji>*_
┣ *ඬ⃟ 👽* _${usedPrefix}attp *<texto>*_
┣ *ඬ⃟ 👽* _${usedPrefix}attp2 *<texto>*_
┣ *ඬ⃟ 👽* _${usedPrefix}attp3 *<texto>*_
┣ *ඬ⃟ 👽* _${usedPrefix}ttp *<texto>*_
┣ *ඬ⃟ 👽* _${usedPrefix}ttp2 *<texto>*_
┣ *ඬ⃟ 👽* _${usedPrefix}ttp3 *<texto>*_
┣ *ඬ⃟ 👽* _${usedPrefix}ttp4 *<texto>*_
┣ *ඬ⃟ 👽* _${usedPrefix}ttp5 *<texto>*_
┣ *ඬ⃟ 👽* _${usedPrefix}pat *<@tag>*_
┣ *ඬ⃟ 👽* _${usedPrefix}slap *<@tag>*_
┣ *ඬ⃟ 👽* _${usedPrefix}kiss *<@tag>*_
┣ *ඬ⃟ 👽* _${usedPrefix}dado_
┣ *ඬ⃟ 👽* _${usedPrefix}wm *<packname> <author>*_
┣ *ඬ⃟ 👽* _${usedPrefix}stickermarker *<efecto> <imagen>*_
┣ *ඬ⃟ 👽* _${usedPrefix}stickerfilter *<efecto> <imagen>*_
┣ *${usedPrefix}donar para 📮 𝙳𝙾𝙽𝙰𝚁 📮
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *${usedPrefix}terminosycondiciones para 📋 𝚃𝙴𝚁𝙼𝙸𝙽𝙾𝚂 𝚈 𝙲𝙾𝙽𝙳𝙸𝙲𝙸𝙾𝙽𝙴𝚂 📋
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *${usedPrefix}infobot para 🐾 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 🐾` 
  
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
conn.sendMessage(m.chat, { text: str.trim(), mentions: conn.parseMention(str) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
  
}
break
//Youtube opciones

case `youtube`:
  try {
  
     let resp = `${c} ESTE ES EL MENU DE LOS COMANDOS DE YOUTUBE\n✨${userm}✨\npowered by\n*${namerepre}*
    *📅 ${gt} Fecha: ${week}, ${date}*
    *📈 Tiempo activo: ${gt}: ${uptime}*
    *📊 Registrados: ${rtotalreg}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *YOUTUBE ${wm}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *LISTA DE OPCIONES*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 Youtube AUDIO*\nDescripcion: Use el \nComando:\nEl prefijo actual: ${usedPrefix} + ytmp3 + enlace \nUsar asi: ${usedPrefix}ytmp3
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 Youtube VIDEO*\nDescripcion: Use el \nComando:\nEl prefijo actual: ${usedPrefix} + ytmp4 + enlace \nUsar asi: ${usedPrefix}ytmp4
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 Youtube AUDIO (force)*\nDescripcion: Use el \nComando:\nEl prefijo actual: ${usedPrefix} + ytmp3doc + enlace \nUsar asi: ${usedPrefix}ytmp3doc
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📥 Youtube VIDEO (force)*\nDescripcion: Use el \nComando:\nEl prefijo actual: ${usedPrefix} + ytmp4doc + enlace \nUsar asi: ${usedPrefix}ytmp4doc`   

    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
    conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt) }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} catch {
  let str = `
┣ *${gt}* ESTE ES EL MENU DE LOS COMANDOS DE YOUTUBE\n✨${userm}✨\npowered by\n*${namerepre}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📅 FECHA: ${week}, ${date}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📈 TIEMPO ACTIVO: ${uptime}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📊 USUARIOS: ${rtotalreg}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *ඬ⃟ 📥* _${usedPrefix}ytmp3 *<enlace / link / url>*_
┣ *ඬ⃟ 📥* _${usedPrefix}ytmp4 *<enlace / link / url>*_
┣ *ඬ⃟ 📥* _${usedPrefix}ytmp3doc *<enlace / link / url>*_
┣ *ඬ⃟ 📥* _${usedPrefix}ytmp4doc *<enlace / link / url>*_
┣ *${usedPrefix}donar para 📮 𝙳𝙾𝙽𝙰𝚁 📮
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *${usedPrefix}terminosycondiciones para 📋 𝚃𝙴𝚁𝙼𝙸𝙽𝙾𝚂 𝚈 𝙲𝙾𝙽𝙳𝙸𝙲𝙸𝙾𝙽𝙴𝚂 📋
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *${usedPrefix}infobot para 🐾 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 🐾` 
  
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
conn.sendMessage(m.chat, { text: str.trim(), mentions: conn.parseMention(str) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
  
}

break
default:
break;
} 
}

handler.help = [`menu integrado`]
handler.tags = [`menus`]
handler.command = [`asistente`, `audioefect`, `audios`, `buscar`, `cajafuerte`, `chatanonimo`, `convert`, `descargas`, `facebook`, `gadmin`, `herramientas`, `infoyo`, `juegos`, `logosefectos`, `menu`, `owners`, `random`, `rpg`, `nsfw`, `stickermenu`, `youtube`]
export default handler
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function clockString(ms) {
    let h = isNaN(ms) ? `--` : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? `--` : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? `--` : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(`:`)
  }