//Integracion de menus (objetivo en reduccion del 50% de los archivos de la carpeta plugins)

//idea y arreglos Rey Endymion

import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import { promises } from 'fs'
import fs from 'fs'
import { join } from 'path'
//import handler from './handler.js'
let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command, args, isOwner, isAdmin, isROwner }) => {
let chat = global.db.data.chats[m.chat]
let vn = `./media/menu.mp3`
let img = imagen4
let pp = imagen1
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender 
let mentionedJid = [who]
let userm =  `@${who.split(`@s.whatsapp.net`)[0]}` && `@${who.replace(/@.+/, '')}`
let userg =  await conn.getName(m.chat)
let estado = {key: {participant: who, remoteJid: who}, message: {groupInviteMessage: {groupJid: "1234567890-9876543210@g.us", inviteCode: `\n`, groupName: `\n`, caption: `${userg}\n${usedPrefix + command}\n${igfg}`, jpegThumbnail: pp}}}
let locale = `es`
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
setTimeout(resolve, 1000)
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
github: _package.homepage ? _package.homepage.url || _package.homepage : `[unknown github url]`,
level, limit, userm, weton, week, date, time, totalreg, rtotalreg, role,
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, `g`), (_, name) => '' + replace[name])
let { money, joincount } = global.db.data.users[m.sender]
let user = global.db.data.users[m.sender]

//Asistente de grupos
switch (command) {
case `asistente`:
try {
  const sections = [
  {
  title: `*ACTIVAR O DESACTIVAR LOS ASISTENTES DE GRUPO*`,
  rows: [
  {title: `☑️ enable asistente`, description: `Comando: ${usedPrefix}enable  `, rowId: `${usedPrefix}enable asistente`},
  {title: `☑️ disable asistente`, description: `Comando: ${usedPrefix}disable  `, rowId: `${usedPrefix}disable asistente`},
  {title: `☑️ enable gruposRol`, description: `Comando: ${usedPrefix}enable gruposRol `, rowId: `${usedPrefix}enable gruposRol`},
  {title: `☑️ disable gruposRol`, description: `Comando: ${usedPrefix}disable gruposRol `, rowId: `${usedPrefix}disable gruposRol`},
  {title: `☑️ enable adminsot`, description: `Comando: ${usedPrefix}enable adminsot `, rowId: `${usedPrefix}enable adminsot`},
  {title: `☑️ disable adminsot`, description: `Comando: ${usedPrefix}disable adminsot `, rowId: `${usedPrefix}disable adminsot`},
  {title: `☑️ enable modocomedia`, description: `Comando: ${usedPrefix}enable modocomedia `, rowId: `${usedPrefix}enable modocomedia`},
  {title: `☑️ disable modocomedia`, description: `Comando: ${usedPrefix}disable modocomedia `, rowId: `${usedPrefix}disable modocomedia`},
  {title: `☑️ enable capciosa`, description: `Comando: ${usedPrefix}enable capciosa `, rowId: `${usedPrefix}enable capciosa`},
  {title: `☑️ disable capciosa`, description: `Comando: ${usedPrefix}disable capciosa `, rowId: `${usedPrefix}disable capciosa`},
  {title: `☑️ enable stickers`, description: `Comando: ${usedPrefix}enable stickers `, rowId: `${usedPrefix}enable stickers`},
  {title: `☑️ disable stickers`, description: `Comando: ${usedPrefix}disable stickers `, rowId: `${usedPrefix}disable stickers`}
  ]}, ]
  let resp = `${gt} ESTE ES EL MENU DE DEL ASISTENTE DE GRUPOS\n✨${userm}✨`
  const listMessage = {
  text: resp,
  footer: `${wm}`,
  title: `*ASISTENTES DE GRUPO ${wm}*\npowered by\n*${igfg}*`,
  buttonText: `*SELECCIONE AQUÍ*`,
  mentions: conn.parseMention(resp),
  sections }
  
  await delay(1 * 1000)
  await conn.sendMessage(m.chat, listMessage, {quoted: estado}, { ephemeralExpiration: 1 * 1000 })
  await delay(1 * 1000)
  await conn.sendFile(m.chat, vn, `../media/menu.mp3`, null, m, true, {type: `audioMessage`, ptt: true, ephemeralExpiration: 1 * 1000 })} catch {
  let str = `
  *HOLA ✨${userm}✨, ESTE ES EL MENU DE *ACTIVAR O DESACTIVAR LOS ASISTENTES DE GRUPO* DE ${wm}*
*📅 FECHA: ${week}, ${date}*
*📈 TIEMPO ACTIVO: ${uptime}*
*📊 USUARIOS: ${rtotalreg}*

☑️ enable asistente, Comando: ${usedPrefix}enable 
☑️ disable asistente, description: Comando: ${usedPrefix}disable asistente
☑️ enable gruposRol, description: Comando: ${usedPrefix}enable gruposRol 
☑️ disable gruposRol, description: Comando: ${usedPrefix}disable gruposRol
☑️ enable adminsot, description: Comando: ${usedPrefix}enable adminsot
☑️ disable adminsot, description: Comando: ${usedPrefix}disable adminsot
☑️ enable modocomedia, description: Comando: ${usedPrefix}enable modocomedia
☑️ disable modocomedia, description: Comando: ${usedPrefix}disable modocomedia
☑️ enable capciosa, description: Comando: ${usedPrefix}enable capciosa
☑️ disable capciosa, description: Comando: ${usedPrefix}disable capciosa
☑️ enable stickers, description: Comando: ${usedPrefix}enable stickers
☑️ disable stickers, description: Comando: ${usedPrefix}disable stickers
`
const buttons = [
  {buttonId: `${usedPrefix}donasi`, buttonText: {displayText: `📮 DONAR 📮`}, type: 1},
  {buttonId: `${usedPrefix}owner`, buttonText: {displayText: `🌹 OWNER 🌹`}, type: 1},
  {buttonId: `${usedPrefix}infobot`, buttonText: {displayText: `🐾 INFOBOT 🐾`}, type: 1}
]
const templateButtons = [
  {index: 1, urlButton: {displayText: `FACEBOOK`, url: `https://www.facebook.com/ANIMxSCANS`}},
  {index: 1, urlButton: {displayText: `GITHUB`, url: `https://github.com/ReyEndymion/ANI_MX_SCANS-MD`}},
//  {index: 2, callButton: {displayText: `🌹 CONTACTO 🌹`, phoneNumber: `wa.me/5215517489568`}},
  {index: 3, quickReplyButton: {displayText: `📮 DONAR 📮`, id: `/donasi`}},
  {index: 4, quickReplyButton: {displayText: `🌹 OWNER 🌹`, id: `/owner`}},
  {index: 5, quickReplyButton: {displayText: `🐾 INFOBOT 🐾`, id: `/infobot`}},
]
const listMessage = {
image: {url: imagen1},
text: str.trim(),
mentions: conn.parseMention(str),
buttons: buttons,
templateButtons: templateButtons,
footer: `*${wm}*`,
caption: "Hi it`s button message",
headerType: 4
//contextInfo: {
//mentionedJid: [userm],
//quoted: m, 
//jpegThumbnail: "./Menu2.jpg", 
//ephemeralExpiration: 1 * 1000
//  }

}

  await delay(1 * 1000)
  const thumb = global.imagen1;
  await conn.sendMessage(m.chat, listMessage, {quoted: m, thumbnail: thumb})

  await conn.sendFile(m.chat, vn, `../media/menu.mp3`, null, m, true, {type: `audioMessage`, ptt: true, ephemeralExpiration: 1 * 1000 })}

break
//efectos de audio

    case `audioefect`:
      try {
   const sections = [
    {
    title: `*LISTA DE OPCIONES*`,
    rows: [
    {title: `🎤 BASS`, description: `responde a un audio o nota de voz con ${usedPrefix}bass`, rowId: `${usedPrefix}bass`},
    {title: `🎤 BLOWN`, description: `responde a un audio o nota de voz con ${usedPrefix}blown`, rowId: `${usedPrefix}blown`},
    {title: `🎤 DEEP`, description: `responde a un audio o nota de voz con ${usedPrefix}deep`, rowId: `${usedPrefix}deep`},
    {title: `🎤 EARRAPE`, description: `responde a un audio o nota de voz con ${usedPrefix}earrape`, rowId: `${usedPrefix}earrape`},   
    {title: `🎤 FAST`, description: `responde a un audio o nota de voz con ${usedPrefix}fast`, rowId: `${usedPrefix}fast`},
    {title: `🎤 FAT`, description: `responde a un audio o nota de voz con ${usedPrefix}fat`, rowId: `${usedPrefix}fat`},
    {title: `🎤 NIGHTCORE`, description: `responde a un audio o nota de voz con ${usedPrefix}nightcore`, rowId: `${usedPrefix}nightcore`},
    {title: `🎤 REVERSE`, description: `responde a un audio o nota de voz con ${usedPrefix}reverse`, rowId: `${usedPrefix}reverse`},
    {title: `🎤 ROBOT`, description: `responde a un audio o nota de voz con ${usedPrefix}robot`, rowId: `${usedPrefix}robot`},   
    {title: `🎤 SLOW`, description: `responde a un audio o nota de voz con ${usedPrefix}slow`, rowId: `${usedPrefix}slow`},
    {title: `🎤 SMOOTH`, description: `responde a un audio o nota de voz con ${usedPrefix}smooth`, rowId: `${usedPrefix}smooth`},   
    {title: `🎤 TUPAI`, description: `responde a un audio o nota de voz con ${usedPrefix}tupai`, rowId: `${usedPrefix}tupai`},
    ]}, ]
    let resp =  `${gt} ESTE ES EL MENU DE LOS EFECTOS DE AUDIO\n✨${userm}✨*`
    const listMessage = {
    text: resp,
    footer: `${wm}`,
    title: `*EFECTOS DE AUDIOS ${wm}*\npowered by\n*${igfg}*`,
    buttonText: "*SELECCIONE AQUÍ*",
    mentions: conn.parseMention(resp),
    sections }
    
    await delay(1 * 1000)
    await conn.sendMessage(m.chat, listMessage, {quoted: estado}, { ephemeralExpiration: 1 * 1000 })
    await delay(1 * 1000)
    await conn.sendFile(m.chat, vn, `../media/menu.mp3`, null, m, true, {type: `audioMessage`, ptt: true, ephemeralExpiration: 1 * 1000 })     

} catch {
    

    }
break;
  
//Audios del bot

case `audios`:
  try {
  const sections = [
    {
    title: `${gt} ELIJE PARA PROBAR LOS AUDIOS`, 
    rows: [
    {title: `🔊 Quien es tu sempai botsito 7w7`, rowId: `Quien es tu sempai botsito 7w7`},
    {title: `🔊 Te diagnostico con gay`, rowId: `Te diagnostico con gay`},
    {title: `🔊 A nadie le importa`, rowId: `A nadie le importa`},
    {title: `🔊 Fiesta del admin`, rowId: `Fiesta del admin`},   
    {title: `🔊 Fiesta del administrador`, rowId: `Fiesta del administrador`},
    {title: `🔊 Vivan los novios`, rowId: `Vivan los novios`},
    {title: `🔊 Feliz cumpleaños`, rowId: `Feliz cumpleaños`},
    {title: `🔊 Noche de paz`, rowId: `Noche de paz`},
    {title: `🔊 Buenos dias`, rowId: `Buenos dias`},
    {title: `🔊 Buenos tardes`, rowId: `Buenos tardes`},
    {title: `🔊 Buenos noches`, rowId: `Buenos noches`},
    {title: `🔊 Audio hentai`, rowId: `Audio hentai`},
    {title: `🔊 Chica lgante`, rowId: `Chica lgante`},
    {title: `🔊 Feliz navidad`, rowId: `Feliz navidad`},
    {title: `🔊 Vete a la vrg`, rowId: `Vete a la vrg`},
    {title: `🔊 Pasa pack Bot`, rowId: `Pasa pack Bot`},
    {title: `🔊 Atencion grupo`, rowId: `Atencion grupo`},
    {title: `🔊 Marica quien`, rowId: `Marica quien`},
    {title: `🔊 Murio el grupo`, rowId: `Murio el grupo`},
    {title: `🔊 Oh me vengo`, rowId: `Oh me vengo`},
    {title: `🔊 tio que rico`, rowId: `tio que rico`},
    {title: `🔊 Viernes`, rowId: `Viernes`},
    {title: `🔊 Baneado`, rowId: `Baneado`},
    {title: `🔊 Sexo`, rowId: `Sexo`},
    {title: `🔊 Hola`, rowId: `Hola`},
    {title: `🔊 Un pato`, rowId: `Un pato`},
    {title: `🔊 Nyanpasu`, rowId: `Nyanpasu`},
    {title: `🔊 Te amo`, rowId: `Te amo`},
    {title: `🔊 Yamete`, rowId: `Yamete`},
    {title: `🔊 Bañate`, rowId: `Bañate`},
    {title: `🔊 Es puto`, rowId: `Es puto`},
    {title: `🔊 La biblia`, rowId: `La biblia`},
    {title: `🔊 Onichan`, rowId: `Onichan`},
    {title: `🔊 Mierda de Bot`, rowId: `Mierda de Bot`},
    {title: `🔊 Siuuu`, rowId: `Siuuu`},
    {title: `🔊 Epico`, rowId: `Epico`},
    {title: `🔊 Shitpost`, rowId: `Shitpost`},
    {title: `🔊 Rawr`, rowId: `Rawr`},
    {title: `🔊 UwU`, rowId: `UwU`},
    {title: `🔊 :c`, rowId: `:c`},
    {title: `🔊 a`, rowId: `a`}   
    ]}, ]
    let resp = `${gt} ✨${userm}✨ESTE ES EL MENU DE los audios predeterminados del Bot`
    const listMessage = {
      text: resp,
    footer: `${wm}`,
    title: `*MENU AUDIOS ${wm}*\npowered by\n*${igfg}*`,
    buttonText: `SELECCIONE AQUÍ`,
    mentions: conn.parseMention(resp),
    sections }
    
    await delay(1 * 1000)
    await conn.sendMessage(m.chat, listMessage, {quoted: estado}, { ephemeralExpiration: 1 * 1000 })
    
    let str = `${userm} POR SI QUIERES MAS INFORMACION AQUI UNOS BOTONES 
    `.trim()
    await delay(1 * 1000)
    conn.sendButton(m.chat, str, wm, pp, 
    /*conn.sendHydrated(m.chat, str, wm, pp, `https://www.facebook.com/groups/otakustogether`, `Facebook`, null, null, */[
    [`📮 DONAR 📮`, `/donasi`],
    [`🌹 OWNER 🌹`, `/owner`],
    [`🐾 INFOBOT 🐾`, `/infobot`]
    ], ``, { contextInfo: { mentionedJid }}) 
    await delay(1 * 1000)
  await conn.sendFile(m.chat, vn, `../media/menu.mp3`, null, m, true, {
        type: `audioMessage`, 
        ptt: true})
} catch {

}
break
//buscadores

case `buscar`:
  try {
  const sections = [
    {
    title: `*LISTA DE OPCIONES*`,
    rows: [
    {title: `🔍 MODAPK`, description: `buscar apks mod usando el comando ${usedPrefix}modapk`, rowId: `${usedPrefix}modapk`},
    {title: `🔍 STICKERSEARCH`, description: `buscar stickers usando el comando ${usedPrefix}stickersearch`, rowId: `${usedPrefix}stickersearch`},
    {title: `🔍 *STICKERSEARCH2`, description: `buscar stickers usando el comando ${usedPrefix}stickersearch2`, rowId: `${usedPrefix}stickersearch2`},
    {title: `🔍 XNXXSEARCH`, description: `buscar videos desde xnxx usando el comando ${usedPrefix}xnxxsearch`, rowId: `${usedPrefix}xnxxsearch`},
    {title: `🔍 ANIMEINFO`, description: `buscar informacion de anime usando el comando ${usedPrefix}animeinfo`, rowId: `${usedPrefix}animeinfo`},
    {title: `🔍 GOOGLE`, description: `buscar desde google usando el comando ${usedPrefix}google`, rowId: `${usedPrefix}google`},
    {title: `🔍 LETRA`, description: `buscar lyrics (letras) usando el comando ${usedPrefix}letra`, rowId: `${usedPrefix}letra`},
    {title: `🔍 WIKIPEDIA`, description: `buscar desde wikipedia usando el comando ${usedPrefix}wikipedia`, rowId: `${usedPrefix}wikipedia`},
    {title: `🔍 YTSEARCH`, description: `buscar desde youtube usando el comando ${usedPrefix}ytsearch`, rowId: `${usedPrefix}ytsearch`},
    {title: `🔍 APKDONE`, description: `buscar desde apkdone usando el comando ${usedPrefix}apkdone`, rowId: `${usedPrefix}apkdone`},
    {title: `🔍 APKGOOGLE`, description: `buscar desde apkgoogle usando el comando ${usedPrefix}apkgoogle`, rowId: `${usedPrefix}apkgoogle`},
    {title: `🔍 APKMODY`, description: `buscar desde apkmody usando el comando ${usedPrefix}apkmody`, rowId: `${usedPrefix}apkmody`},
    {title: `🔍 APKSHUB`, description: `buscar desde apkshub usando el comando ${usedPrefix}apkshub`, rowId: `${usedPrefix}apkshub`},
    {title: `🔍 HAPPYMOD`, description: `buscar happymod usando el comando ${usedPrefix}happymod`, rowId: `${usedPrefix}happymod`},
    {title: `🔍 HOSTAPK`, description: `buscar desde hostapk usando el comando ${usedPrefix}hostapk`, rowId: `${usedPrefix}hostapk`},   
    {title: `🔍 REVDL`, description: `buscar desde revdl usando el comando ${usedPrefix}revdl`, rowId: `${usedPrefix}revdl`},   
    {title: `🔍 TORACCINO`, description: `buscar desde toraccino usando el comando ${usedPrefix}toraccino`, rowId: `${usedPrefix}toraccino`},
    {title: `🔍 UAPKPRO`, description: `buscar desde uapkpro usando el comando ${usedPrefix}uapkpro`, rowId: `${usedPrefix}uapkpro`},
    {title: `🔍 PLAYSTORE`, description: `buscar desde playstore usando el comando ${usedPrefix}playstore`, rowId: `${usedPrefix}playstore`},
    ]},
    {title: `CONTACTO`, rows: [
    {title: `📮 DONAR 📮`, rowId: `${usedPrefix}donasi`},
    {title: `🌹 OWNER 🌹`, rowId: `${usedPrefix}owner`},
    {title: `🐾 INFOBOT 🐾`, rowId: `${usedPrefix}infobot`}]}
  ]
    let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS PARA DESCARGAR ✨${userm}✨`
    const listMessage = {
      text: resp,
    footer: `${wm}`,
    title: `*BUSCAR ${wm}*powered by\n${igfg}*`,
    buttonText: "SELECCIONE AQUÍ",
    mentions: conn.parseMention(resp),
    sections }
    
    await delay(1 * 1000)
    await conn.sendMessage(m.chat, listMessage, {quoted: estado}, { ephemeralExpiration: 1 * 1000 })
    await delay(1 * 1000)
    await conn.sendFile(m.chat, vn, `../media/menu.mp3`, null, m, true, { type: `audioMessage`, ptt: true})
} catch {

}
break
//caja fuerte

case `cajafuerte`:
  try {
  const sections = [{
    title: `AGREGAR A LA LISTA`,
    rows: [
        {title: `🗳️ AGREGAR MENSAJE`, description: `Comando: ${usedPrefix}agregarmsg *<texto/comando/palabra clave>* (responde a un texto) `, rowId: `${usedPrefix}agregarmsg`},
        {title: `🗳️ AGREGAR VN`, description: `Comando: ${usedPrefix}agregarvn *<texto/comando/palabra clave>* (responde a una nota de voz) `, rowId: `${usedPrefix}agregarvn`},
        {title: `🗳️ AGREGAR VIDEO`, description: `Comando: ${usedPrefix}agregarvideo *<texto/comando/palabra clave>* (responde a un video) `, rowId: `${usedPrefix}agregarvideo`},
        {title: `🗳️ AGREGAR AUDIO`, description: `Comando: ${usedPrefix}agregaraudio *<texto/comando/palabra clave>* (responde a un audio) `, rowId: `${usedPrefix}agregaraudio`},
        {title: `🗳️ AGREGAR IMAGEN`, description: `Comando: ${usedPrefix}agregarimg *<texto/comando/palabra clave>* (responde a una imagen) `, rowId: `${usedPrefix}agregarimg`},
        {title: `🗳️ AGREGAR STICKER`, description: `Comando: ${usedPrefix}agregarsticker *<texto/comando/palabra clave>* (responde a un sticker) `, rowId: `${usedPrefix}agregarsticker`}
    ]},
    {title: `LISTA DE COMANDOS`,
    rows: [    
        {title: `🗳️ LISTA MENSAJE`, description: `Comando: ${usedPrefix}listamsg `, rowId: `${usedPrefix}listamsg`},
        {title: `🗳️ LISTA VN`, description: `Comando: ${usedPrefix}listavn `, rowId: `${usedPrefix}listavn`},
        {title: `🗳️ LISTA VIDEO`, description: `Comando: ${usedPrefix}listavideo `, rowId: `${usedPrefix}listavideo`},
        {title: `🗳️ LISTA AUDIO`, description: `Comando: ${usedPrefix}listaaudio `, rowId: `${usedPrefix}listaaudio`},
        {title: `🗳️ LISTA IMAGEN`, description: `Comando: ${usedPrefix}listaimg `, rowId: `${usedPrefix}listaimg`},
        {title: `🗳️ LISTA STICKER`, description: `Comando: ${usedPrefix}listasticker `, rowId: `${usedPrefix}listasticker`}
    ]},
    {title: `VER TEXTOS O ARCHIVOS`,
    rows: [
        {title: `🗳️ VER MENSAJE`, description: `Comando: ${usedPrefix}vermsg *<texto/comando/palabra clave>* `, rowId: `${usedPrefix}vermsg`},
        {title: `🗳️ VER VN`, description: `Comando: ${usedPrefix}vervn *<texto/comando/palabra clave>* `, rowId: `${usedPrefix}vervn`},
        {title: `🗳️ VER VIDEO`, description: `Comando: ${usedPrefix}vervideo *<texto/comando/palabra clave>* `, rowId: `${usedPrefix}vervideo`},
        {title: `🗳️ VER AUDIO`, description: `Comando: ${usedPrefix}veraudio *<texto/comando/palabra clave>* `, rowId: `${usedPrefix}veraudio`},
        {title: `🗳️ VER IMAGEN`, description: `Comando: ${usedPrefix}verimg *<texto/comando/palabra clave>* `, rowId: `${usedPrefix}verimg`},
        {title: `🗳️ VER STICKER`, description: `Comando: ${usedPrefix}versticker *<texto/comando/palabra clave>* `, rowId: `${usedPrefix}versticker`}
    ]},
    {title: `ELIMINAR`,
    rows: [
        {title: `🗳️ ELIMINAR MENSAJE`, description: `Comando: ${usedPrefix}eliminarmsg *<texto/comando/palabra clave>* `, rowId: `${usedPrefix}eliminarmsg`},
        {title: `🗳️ ELIMINAR VN`, description: `Comando: ${usedPrefix}eliminarvn *<texto/comando/palabra clave>* `, rowId: `${usedPrefix}eliminarvn`},
        {title: `🗳️ ELIMINAR VIDEO`, description: `Comando: ${usedPrefix}eliminarvideo *<texto/comando/palabra clave>* `, rowId: `${usedPrefix}eliminarvideo`},
        {title: `🗳️ ELIMINAR AUDIO`, description: `Comando: ${usedPrefix}eliminaraudio *<texto/comando/palabra clave>* `, rowId: `${usedPrefix}eliminaraudio`},
        {title: `🗳️ ELIMINAR IMAGEN`, description: `Comando: ${usedPrefix}eliminarimg *<texto/comando/palabra clave>* `, rowId: `${usedPrefix}eliminarimg`},
        {title: `🗳️ ELIMINAR STICKER`, description: `Comando: ${usedPrefix}eliminarsticker *<texto/comando/palabra clave>* `, rowId: `${usedPrefix}eliminarsticker`}
    ]},
    {title: `APOYO`,
    rows: [
        {title: `💵 DONAR`, description: `dona por favor que los pobres deben comer y ya no desarrollan`, rowId: `${usedPrefix}donasi`},   
        {title: `👽 OWNER`, description: `conoce los numeros de quien da soporte a este bot`, rowId: `${usedPrefix}owner`},
        {title: `🔰 INFOBOT`, description: `la informacion del Bot`, rowId: `${usedPrefix}infobot`},
        {title: `🔗 REDES SOCIALES`, description: `BUSCANOS EN FACEBOOK https://www.facebook.com/groups/otakustogether`, rowId: ``}
    ]}]
    let resp = `${gt}✨${userm}✨ ESTE ES EL MENU DE LOS COMANDOS DE LA CAJA FUERTE \n\nAQUI PUEDE GUARDAR MENSAJES QUE QUIERAS VER MAS TARDE`
    const listMessage = {
    text: resp,
    footer: `${wm}`,
    title: `*🗳️CAJA FUERTE🔐 ${wm}*\npowered by\n*${igfg}*`,
    buttonText: "*SELECCIONE AQUÍ*",
    mentions: conn.parseMention(resp),
    sections }

    await delay(1 * 1000)
    await conn.sendMessage(m.chat, listMessage, {quoted: estado}, { ephemeralExpiration: 1 * 1000 })
    await delay(1 * 1000)
    await conn.sendFile(m.chat, vn, `../media/menu.mp3`, null, m, true, {type: `audioMessage`, ptt: true, ephemeralExpiration: 1 * 1000 })

} catch {

}
break
//Chat Anonimo

case `chatanonimo`:
  try {
  const sections = [
    {
    title: `*LISTA DE OPCIONES*`,
    rows: [
    {title: `📳 START`, description: `para iniciar el chat anonimo use ${usedPrefix}start`, rowId: `${usedPrefix}start`},
    {title: `📳 NEXT`, description: `para el siguiente chat anonimo use ${usedPrefix}next`, rowId: `${usedPrefix}next`},
    {title: `📳 LEAVE`, description: `para salir del chat anonimo use ${usedPrefix}leave`, rowId: `${usedPrefix}leave`},
    {title: `💵 DONAR`, description: `dona por favor que los pobres deben comer y ya no desarrollan`, rowId: `${usedPrefix}donasi`},   
    {title: `👽 OWNER`, description: `conoce los numeros de quien da soporte a este bot`, rowId: `${usedPrefix}owner`},
    
    ]}, ]
    let resp = `${gt} ESTE ES EL MENU DE los comandos para el chat anonimo\n✨${userm}✨`
    const listMessage = {
    text: resp,
    footer: `${wm}`,
    title: `*CHAT ANONIMO ${wm}*\npowered by\n*${igfg}*`,
    buttonText: "*SELECCIONE AQUÍ*",
    mentions: conn.parseMention(resp),
    sections }
    
    await delay(1 * 1000)
    await conn.sendMessage(m.chat, listMessage, {quoted: estado}, { ephemeralExpiration: 1 * 1000 })
    await delay(1 * 1000)
    await conn.sendFile(m.chat, vn, `../media/menu.mp3`, null, m, true, {type: `audioMessage`, ptt: true, ephemeralExpiration: 1 * 1000 })
} catch {

}
break
//Convertidores

case `convert`:
  try {
  const sections = [
    {
    title: `*LISTA DE OPCIONES*`,
    rows: [
    {title: `🧧 TO(GIF-AUD)`, description: `responde a un video que desea convertir en gif con audio. Comando: ${usedPrefix}togifaud`, rowId: `${usedPrefix}togifaud`},
    {title: `🧧 TO(IMG)`, description: `responde a un sticker que desea convertir a imagen. Comando: ${usedPrefix}toimg`, rowId: `${usedPrefix}toimg`},
    {title: `🧧 TO(MP3)`, description: `responde a un video o nota de voz que desea convertir en audio mp3. Comando: ${usedPrefix}tomp3`, rowId: `${usedPrefix}tomp3`},
    {title: `🧧 TO(PTT)`, description: `responde a un video que desea convertir en nota de voz. Comando: ${usedPrefix}toptt`, rowId: `${usedPrefix}toptt`},   
    {title: `🧧 TO(VIDEO)`, description: `responda a un sticker de movimiento que desee convertir en video. Comando: ${usedPrefix}tovideo`, rowId: `${usedPrefix}tovideo`},
    {title: `🧧 TO(URL)`, description: `responda a una imagen o video el cual sera convertido en enlace. Comando: ${usedPrefix}tourl`, rowId: `${usedPrefix}tourl`},
    {title: `🧧 TTS`, description: `convierte un texto en nota de voz, ejemplo: ${usedPrefix}tts hola mundo`, rowId: `${usedPrefix}tts`},   
    ]}, ]
    let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS PARA CONVERTIR ✨${userm}✨
    
    *📅 ${gt} La fecha es: ${week}, ${date}*`
    const listMessage = {
    text: resp,
    footer: `${wm}`,
    title: `*CONVERTIDORES ${wm}*\npowered by\n*${igfg}*`,
    buttonText: "*SELECCIONE AQUÍ*",
    mentions: conn.parseMention(resp),
    sections }
    
    await delay(1 * 1000)
    await conn.sendMessage(m.chat, listMessage, {quoted: estado}, { ephemeralExpiration: 1 * 1000 })
    await delay(1 * 1000)
    await conn.sendFile(m.chat, vn, `../media/menu.mp3`, null, m, true, {type: `audioMessage`, ptt: true, ephemeralExpiration: 1 * 1000 })
} catch {

}
break
//Descargas

case `descargas`:
  try {
    const sections = [
        {
        title: `*LISTA DE OPCIONES*`,
    rows: [
    {title: `📥 INSTAGRAM`, description: `para poder descargar de Instagram utiliza ${usedPrefix}instagram <enlace / link / url>`, rowId: `${usedPrefix}instagram`},
    {title: `📥 MEDIAFIRE`, description: `para poder descargar de mediafire utiliza ${usedPrefix}mediafire <enlace / link / url>`, rowId: `${usedPrefix}mediafire`},
    {title: `📥 *GITCLONE`, description: `para poder descargar desde github utiliza ${usedPrefix}gitclone <enlace / link / url>`, rowId: `${usedPrefix}gitclone`},
    {title: `📥 TIKTOK`, description: `para poder descargar de tiktok utiliza ${usedPrefix}<enlace / link / url>`, rowId: `${usedPrefix}tiktok`},
    {title: `📥 XNXXDL`, description: `para poder descargar de la página XNXX utiliza ${usedPrefix}xnxxdl <enlace / link / url>`, rowId: `${usedPrefix}xnxxdl`},
    {title: `📥 XVIDEOSDL`, description: `para poder descargar de la página xvideos utiliza ${usedPrefix}xvideosdl <enlace / link / url>`, rowId: `${usedPrefix}xvideosdl`},
    {title: `📥 TWITTER`, description: `para poder descargar desde Twitter utiliza ${usedPrefix}twitter <enlace / link / url>`, rowId: `${usedPrefix}twitter`},
    {title: `📥 FACEBOOK`, description: `te muestro las opciones en el siguiente menu de facebook`, rowId: `${usedPrefix}facebook`},
    {title: `📥 YOUTUBE`, description: `te muestro las opciones en el siguiente menu de youtube`, rowId: `${usedPrefix}youtube`},
    {title: `📥 STICKERPACK`, description: `descargar stickers desde getstickerpack.com usando ${usedPrefix}stickerpack`, rowId: `${usedPrefix}stickerpack`},
    {title: `📥 DESCARGAR CON PLAY`, description: `descargar usando ${usedPrefix}play`, rowId: `${usedPrefix}play`},
    {title: `📥 DESCARGAR CON PLAY.1`, description: `buscar y descargar con ${usedPrefix}play.1`, rowId: `${usedPrefix}play.1`},
    {title: `📥 DESCARGAR CON PLAY.2`, description: `buscar y descargar con ${usedPrefix}play.2`, rowId: `${usedPrefix}play.2`},
    {title: `📥 PLAYDOC`, description: `descargar como documento usando ${usedPrefix}playdoc`, rowId: `${usedPrefix}playdoc`},
    {title: `📥 PLAYLIST`, description: `descargar una lista de opciones usando ${usedPrefix}playlist`, rowId: `${usedPrefix}playlist`},
    {title: `📥 PLAYLIST2`, description: `descargar una 2a lista de opciones usando ${usedPrefix}playlist2`, rowId: `${usedPrefix}playlist2`},   
    {title: `📥 SPOTIFY`, description: `descarga desde spotify usando ${usedPrefix}spotify <enlace / link / url>`, rowId: `${usedPrefix}spotify`},   
    {title: `📥 STICKERLY`, description: `descargar stickers desde getstickerpack.com sticker.ly usando ${usedPrefix}stickerly <enlace / link / url>`, rowId: `${usedPrefix}stickerly`},
    {title: `📥 RINGTONE`, description: `busca y descarga tonos usando ${usedPrefix}ringtone <enlace / link / url>`, rowId: `${usedPrefix}ringtone`},
    {title: `📥 SOUNDCLOUD`, description: `descarga desde soundcloud usando ${usedPrefix}soundcloud <enlace / link / url>`, rowId: `${usedPrefix}soundcloud`},   
    {title: `📥 IMAGEN`, description: `solicita imagenes usando ${usedPrefix}imagen <texto>`, rowId: `${usedPrefix}imagen`},   
    {title: `📥 PINTEREST`, description: `solicita imagenes de pinterest usando ${usedPrefix}pinterest <texto>`, rowId: `${usedPrefix}pinterest`},   
    {title: `📥 WALLPAPER`, description: `solicita imagenes wallpaper usando ${usedPrefix}wallpaper <texto>`, rowId: `${usedPrefix}wallpaper`},   
    {title: `📥 WALLPAPER2*`, description: `solicita imagenes 2a opcion para wallpaper usando ${usedPrefix}wallpaper2 <texto>`, rowId: `${usedPrefix}wallpaper2`},   
    {title: `📥 PPTIKTOK`, description: `solicita la imagen de un usuario de tiktok usando ${usedPrefix}tiktok <usuario>`, rowId: `${usedPrefix}pptiktok`},   
    {title: `📥 IGSTALK`, description: `solicita imagenes de un usuario de instagram`, rowId: `${usedPrefix}igstalk`},   
    {title: `📥 IGSTORY`, description: `solicita imagen e informacion de un usuario de instagram`, rowId: `${usedPrefix}igstory`},   
    {title: `📥 TIKTOKSTALK`, description: `solicita imagen e informacion de un usuario de tiktok`, rowId: `${usedPrefix}tiktokstalk`},
    ]}, ]
    let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS PARA DESCARGAR ✨${userm}✨ powered by ${igfg}*`
    const listMessage2 = {
    text: resp,
    footer: `${wm}`,
    title: `*DESCARGAS ${wm}*`,
    buttonText: "*SELECCIONE AQUÍ*",
    mentions: conn.parseMention(resp),
    sections }
    
    await delay(1 * 1000)
    await conn.sendMessage(m.chat, listMessage2, {quoted: estado})
    await delay(1 * 1000)
    await conn.sendFile(m.chat, vn, `../media/menu.mp3`, null, m, true, {type: `audioMessage`, ptt: true, ephemeralExpiration: 1 * 1000 })
} catch {

}
break
//Facebook

case `facebook`:
  try {
  const sections = [
    {
    title: `*LISTA DE OPCIONES*`,
    rows: [
    {title: `📥 OPCION 1`, description: `opcion 1 para facebook Comando: ${usedPrefix}fb`, rowId: `${usedPrefix}fb`},
    {title: `📥 OPCION 2`, description: `opcion 2 para facebook Comando: ${usedPrefix}fb2`, rowId: `${usedPrefix}fb2`},
    {title: `📥 OPCION 3`, description: `opcion 3 para facebook Comando: ${usedPrefix}fb3`, rowId: `${usedPrefix}fb3`},
    {title: `📥 OPCION 4`, description: `opcion 4 para facebook Comando: ${usedPrefix}fb4`, rowId: `${usedPrefix}fb4`},   
    {title: `📥 OPCION 5`, description: `opcion 5 para facebook Comando: ${usedPrefix}fb5`, rowId: `${usedPrefix}fb5`},
    
    ]}, ]
    let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS DE FACEBOOK\n✨${userm}✨\npowered by\n*${igfg}*`
    const listMessage = {
    text: resp,
    footer: `${wm}`,
    title: `*FACEBOOK ${wm}*`,
    buttonText: "*SELECCIONE AQUÍ*",
    mentions: conn.parseMention(resp),
    sections }
    
    await delay(1 * 1000)
    await conn.sendMessage(m.chat, listMessage, {quoted: estado}, { ephemeralExpiration: 1 * 1000 })
    await delay(1 * 1000)
    await conn.sendFile(m.chat, vn, `../media/menu.mp3`, null, m, true, {type: `audioMessage`, ptt: true, ephemeralExpiration: 1 * 1000 })
} catch {

}
break
//Grupos (administradores)

case `gadmin`:
  try {
  const sections = [
    {
    title: `*LISTA DE OPCIONES*`,
    rows: [
    {title: `💎 AGREGAR`, description: `añadir a alguien al grupo usando ${usedPrefix}add`, rowId: `${usedPrefix}add`},
    {title: `💎 ELIMINAR`, description: `eliminar a uno o a varios del grupo usando ${usedPrefix}kick`, rowId: `${usedPrefix}kick`},
    {title: `💎 ELIMINAR DESDE MENSAJE`, description: `elimina a alguien contestando un mensaje del usuario usando ${usedPrefix}kick2`, rowId: `${usedPrefix}kick2`},
    {title: `💎 LISTA DE NUMEROS POR PREFIJO`, description: `hace una lista de numeros por su prefijo usando ${usedPrefix}listnum`, rowId: `${usedPrefix}listanum`},
    {title: `💎 ELIMINA NUMEROS POR PREFIJO`, description: `elimina una lista por su prefijo del grupo usando ${usedPrefix}kicknum`, rowId: `${usedPrefix}kicknum`},   
    {title:`💎 ABRE O CIERRA EL GRUPO`, description: `abrir o cerrar el grupo para controlar la conversacion usando ${usedPrefix}grupo`, rowId: `${usedPrefix}grupo`},
    {title:`💎 DAR ADMIN`, description: `promueve a alguien como admin usando ${usedPrefix}promote`, rowId: `${usedPrefix}promote`},
    {title:`💎 QUITAR ADMIN`, description: `degrada a alguien como admin usando ${usedPrefix}demote`, rowId: `${usedPrefix}demote`},
    {title:`💎 INFORMACION DEL GRUPO`, description: `envia la informacion del grupo en un mensaje usando ${usedPrefix}infogroup`, rowId: `${usedPrefix}infogroup`},
    {title:`💎 NUEVO LINK`, description: `resetea el link de invitacion del grupo actual usando ${usedPrefix}resetlink`, rowId: `${usedPrefix}resetlink`},
    {title:`💎 SOLICITA EL LINK`, description: `solicita el link del grupo actual usando ${usedPrefix}link`, rowId: `${usedPrefix}link`},
    {title:`💎 CAMBIA EL NOMBRE DEL GRUPO`, description: `solicita al bot que cambie el nombre al grupo usando ${usedPrefix}setname`, rowId: `${usedPrefix}setname`},
    {title:`💎 CAMBIAR LA DESCRIPCION DEL GRUPO`, description: `edita o borra la descripcion del grupo usando ${usedPrefix}setdesc`, rowId: `${usedPrefix}setdesc`},
    {title:`💎 CAMBIA LA IMAGEN DEL GRUPO`, description: `contesta a una imagen o sube la imagen para cambiarla usando ${usedPrefix}setpp`, rowId: `${usedPrefix}setpp`},
    {title:`💎 CAMBIAR LA BIENVENIDA DEL BOT`, description: `edita la bienvenida del BOT usando ${usedPrefix}setwelcome`, rowId: `${usedPrefix}setwelcome`},   
    {title:`💎 CAMBIAR LA DESPEDIDA DEL BOT`, description: `edita la despedida del bot usando ${usedPrefix}setbye`, rowId: `${usedPrefix}setbye`},
    {title:`💎 INVOCAR GRUPO`, description: `invoca a todo el grupo usando ${usedPrefix}invocar`, rowId: `${usedPrefix}invocar`},
    {title:`💎 MENSAJE GENERAL EN SILENCIO`, description: `hace que el bot mencione a todos en un mensaje sin que se note el tag usando ${usedPrefix}hidetag`, rowId: `${usedPrefix}hidetag`},
    {title:`💎 CREA ADVERTENCIAS`, description: `recibe 3 advertencias de un admin usando el bot y este te eliminara usando ${usedPrefix}warn`, rowId: `${usedPrefix}warn`},
    {title:`💎 ELIMINA ADVERTENCIAS`, description: `los admins pueden eliminar cada advertencia hecha en el bot usando ${usedPrefix}unwarn`, rowId: `${usedPrefix}unwarn`},
    {title:`💎 LISTA DE ADVERTENCIAS`, description: `aqui puedes ver las advertencias y los usuarios que las tienen usando ${usedPrefix}listwarn`, rowId: `${usedPrefix}listwarn`},
    {title:`💎 FANTASMAS`, description: `busca y encuentra gente inactiva en el grupo usando ${usedPrefix}fantasmas`, rowId: `${usedPrefix}fantasmas`},
    {title:`💎 DESTRABAS`, description: `se utiliza en el caso de recibir virus en modo texto (trabas) para dejarlas muy atras en el chat usando ${usedPrefix}destraba`, rowId: `${usedPrefix}destraba`},
    ]}, ]
    let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS PARA LOS ADMINS ✨${userm}✨
    
    *📅 ${gt} fecha: ${week}, ${date}*
    *📊 Registrados: ${rtotalreg}*`
    const listMessage = {
    text: resp,
    footer: `${wm}`,
    title: `*MENU PARA SOLO ADMINS de ${wm} powered by*\n*${igfg}*`,
    buttonText: "*SELECCIONE AQUÍ*",
    mentions: conn.parseMention(resp),
    sections }
    
    await delay(1 * 1000)
    await conn.sendMessage(m.chat, listMessage, {quoted: estado}, { ephemeralExpiration: 1 * 1000 })
    await delay(1 * 1000)
    await conn.sendFile(m.chat, vn, `../media/menu.mp3`, null, m, true, {type: `audioMessage`, ptt: true, ephemeralExpiration: 1 * 1000 })
} catch {

}
break
//Herramientas

case `herramientas`:
  try {
  const sections = [
    {
    title: `*LISTA DE OPCIONES*`,
    rows: [
    {title: `🛠️  SPAM MENSAJE`, description: `Comando: ${usedPrefix}spamwa *<numero|texto|cantidad>*`, rowId: `${usedPrefix}spamwa`},
    {title: `🛠️  TAMAÑO`, description: `Comando: ${usedPrefix}tamaño *<cantidad> <imagen / video>*`, rowId: `${usedPrefix}tamaño`},
    {title: `🛠️  CLIMA`, description: `Comando: ${usedPrefix}clima *<país> <ciudad>*`, rowId: `${usedPrefix}clima`},
    {title: `🛠️  ENCUESTA`, description: `Comando: ${usedPrefix}encuesta *<texto1|texto2...>*`, rowId: `${usedPrefix}encuesta`},   
    {title: `🛠️  NO MOLESTAR`, description: `Comando: ${usedPrefix}afk *<motivo>*`, rowId: `${usedPrefix}afk`},
    {title: `🛠️  RECONOCIMIENTO DE TEXTO EN IMAGENES`, description: `Comando: ${usedPrefix}ocr *<responde a imagen>*`, rowId: `${usedPrefix}ocr`},
    {title: `🛠️  ACORTAR`, description: `Comando: ${usedPrefix}acortar *<enlace / link / url>*`, rowId: `${usedPrefix}acortar`},
    {title: `🛠️  CALCULADORA`, description: `Comando: ${usedPrefix}calc *<operacion math>*`, rowId: `${usedPrefix}calc`},
    {title: `🛠️  BORRAR`, description: `Comando: ${usedPrefix}del *<mensaje>*`, rowId: `${usedPrefix}del`},   
    {title: `🛠️  RECONOCIENTO DE MUSICA`, description: `Comando: ${usedPrefix}whatmusic *<audio>*`, rowId: `${usedPrefix}whatmusic`},
    {title: `🛠️  LEER QR`, description: `Comando: ${usedPrefix}readqr *<imagen (QR)>*`, rowId: `${usedPrefix}readqr`},
    {title: `🛠️  ENVIAR QR`, description: `Comando: ${usedPrefix}qrcode *<texto>*`, rowId: `${usedPrefix}qrcode`},
    {title: `🛠️  READMORE`, description: `Comando: ${usedPrefix}readmore *<texto1| texto2>*`, rowId: `${usedPrefix}readmore`},
    {title: `🛠️  STYLETEXT`, description: `Comando: ${usedPrefix}styletext *<texto>*`, rowId: `${usedPrefix}styletext`},   
    {title: `🛠️  TRADUCIR`, description: `Comando: ${usedPrefix}traducir *<texto>*`, rowId: `${usedPrefix}traducir`},
    {title: `🛠️  VIDEO CONFERENCIA EN ZOOM`, description: `Comando: ${usedPrefix}zoom *<texto>*`, rowId: `${usedPrefix}zoom`},
    {title: `🛠️  NUMEROS EN WHATSAPP`, description: `Comando: ${usedPrefix}nowa *<numero>x*`, rowId: `${usedPrefix}nowa`},
    {title: `🛠️  COVID`, description: `Comando: ${usedPrefix}covid *<pais>*`, rowId: `${usedPrefix}covid`},   
    {title: `🛠️  HORARIO`, description: `Comando: ${usedPrefix}horario`, rowId: `${usedPrefix}horario`}
    ]}, ]
    let resp = `${gt} ✨${userm}✨ ESTE ES EL MENU DE HERRAMIENTAS`
    const listMessage = {
    text: resp,
    footer: `${wm}`,
    title: `*HERRAMIENTAS ${wm}*\npowered by\n*${igfg}*`,
    buttonText: "*SELECCIONE AQUÍ*",
    mentions: conn.parseMention(resp),
    sections }
    
    await delay(1 * 1000)
    await conn.sendMessage(m.chat, listMessage, {quoted: estado}, { ephemeralExpiration: 1 * 1000 })
    
    try {
    let vn = `./media/menu.mp3`
    let pp = `./Menu.png`
    let str = `https://www.facebook.com/ANIMxSCANS`.trim()
    conn.sendButton(m.chat, str, wm, pp, [
    [`📮 DONAR 📮`, `/donasi`],
    [`🌹 OWNER 🌹`, `/owner`],
    [`🐾 INFOBOT 🐾`, `/infobot`]
    ], m,)
    await delay(1 * 1000)
    await conn.sendFile(m.chat, vn, `../media/menu.mp3`, null, m, true, { type: `audioMessage`, ptt: true})
        } catch (e) {
    conn.reply(m.chat, `*[❗INFO❗] EL MENU TIENE UN ERROR Y NO FUE POSIBLE ENVIARLO, REPORTELO AL PROPIETARIO DEL BOT*`, m)
    throw e
    }
} catch {
  let str = `
  *HOLA ✨${userm}✨, ESTE ES EL MENU DE MENUS DE ${igfg}*
  *📅 FECHA: ${week}, ${date}*
  *📈 TIEMPO ACTIVO: ${uptime}*
  *📊 USUARIOS: ${rtotalreg}*
    *<HERRAMIENTAS/>*

  ┣ ඬ⃟ 🛠️ _${usedPrefix}spamwa *<numero|texto|cantidad>*_
  ┣ ඬ⃟ 🛠️ _${usedPrefix}tamaño *<cantidad> <imagen / video>*_
  ┣ ඬ⃟ 🛠️ _${usedPrefix}clima *<país> <ciudad>*_
  ┣ ඬ⃟ 🛠️ _${usedPrefix}encuesta *<texto1|texto2...>*_
  ┣ ඬ⃟ 🛠️ _${usedPrefix}afk *<motivo>*_
  ┣ ඬ⃟ 🛠️ _${usedPrefix}ocr *<responde a imagen>*_
  ┣ ඬ⃟ 🛠️ _${usedPrefix}acortar *<enlace / link / url>*_
  ┣ ඬ⃟ 🛠️ _${usedPrefix}calc *<operacion math>*_
  ┣ ඬ⃟ 🛠️ _${usedPrefix}del *<mensaje>*_
  ┣ ඬ⃟ 🛠️ _${usedPrefix}whatmusic *<audio>*_
  ┣ ඬ⃟ 🛠️ _${usedPrefix}readqr *<imagen (QR)>*_
  ┣ ඬ⃟ 🛠️ _${usedPrefix}qrcode *<texto>*_
  ┣ ඬ⃟ 🛠️ _${usedPrefix}readmore *<texto1| texto2>*_
  ┣ ඬ⃟ 🛠️ _${usedPrefix}styletext *<texto>*_
  ┣ ඬ⃟ 🛠️ _${usedPrefix}traducir *<texto>*_
  ┣ ඬ⃟ 🛠️ _${usedPrefix}zoom *<texto>*_
  ┣ ඬ⃟ 🛠️ _${usedPrefix}nowa *<numero>*_
  ┣ ඬ⃟ 🛠️ _${usedPrefix}covid *<pais>*_
  ┣ ඬ⃟ 🛠️ _${usedPrefix}horario_
  `
  let buttons = [
{ buttonId: `${usedPrefix}donar`, buttonText: { displayText: `📮 𝙳𝙾𝙽𝙰𝚁 📮` }, type: 1 },
//{ buttonId: `${usedPrefix}terminosycondiciones`, buttonText: { displayText: `📋 𝚃𝙴𝚁𝙼𝙸𝙽𝙾𝚂 𝚈 𝙲𝙾𝙽𝙳𝙸𝙲𝙸𝙾𝙽𝙴𝚂 📋` }, type: 1 }]
{ buttonId: `${usedPrefix}infobot`, buttonText: { displayText: `🐾 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 🐾` }, type: 1 }]
let buttonMessage = {
image: pp,
caption: str.trim(),
mentions: [m.sender],
footer: `*${wm}*`,
buttons: buttons,
headerType: 4,
contextInfo: {
mentionedJid: [m.sender],
externalAdReply: {
showAdAttribution: true,
mediaType: `VIDEO`,
mediaUrl: null,
title: igfg,
body: null,
thumbnail: img,
sourceUrl: paypal
}}}
conn.sendMessage(m.chat, buttonMessage, { quoted: m })
await conn.sendFile(m.chat, vn, `menu.mp3`, null, m, true, { type: `audioMessage`, ptt: true})
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
`.trim()
let buttons = [
  { buttonId: `${usedPrefix}donar`, buttonText: { displayText: `📮 𝙳𝙾𝙽𝙰𝚁 📮` }, type: 1 },
  { buttonId: `${usedPrefix}owner`, buttonText: { displayText: `🌹 OWNER 🌹` }, type: 1 },
  { buttonId: `${usedPrefix}infobot`, buttonText: { displayText: `🐾 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 🐾` }, type: 1 }]
  let buttonMessage = {
  image: pp,
  caption: str.trim(),
  mentions: [m.sender],
  footer: `*${wm}*`,
  buttons: buttons,
  headerType: 4,
  contextInfo: {
  mentionedJid: [m.sender],
  externalAdReply: {
  showAdAttribution: true,
  mediaType: `VIDEO`,
  mediaUrl: null,
  title: igfg,
  body: null,
  thumbnail: img,
  sourceUrl: paypal
  }}}
  conn.sendMessage(m.chat, buttonMessage, { quoted: m })
  await conn.sendFile(m.chat, vn, `menu.mp3`, null, m, true, { type: `audioMessage`, ptt: true})
} catch {
  let str = `
  *${gt} ESTE ES EL MENU DE LOS COMANDOS DE JUEGOS\n✨${userm}✨\n\npowered by\n*${igfg}*
  *📅 FECHA: ${week}, ${date}*
  *📈 TIEMPO ACTIVO: ${uptime}*
  *📊 USUARIOS: ${rtotalreg}*
  
  ┣ ඬ⃟ 🎖️ _${usedPrefix}mates *<noob / easy / medium / hard / extreme /impossible /impossible2>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}ppt *<papel / tijera /piedra>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}prostituto *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}prostituta *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}gay2 *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}lesbiana *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}pajero *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}pajera *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}puto *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}puta *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}manco *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}manca *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}rata *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}love *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}doxear *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}pregunta *<texto>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}suitpvp *<@tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}slot *<apuesta>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}ttt *<nombre sala>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}delttt_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}simi *<texto>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}top *<texto>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}topgays_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}topotakus_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}formarpareja_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}verdad_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}reto_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}cancion_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}pista_
  `.trim()

}
break
//Juegos

case `juegos`:
  try {
  const sections = [
    {
    title: `*LISTA DE OPCIONES*`,
    rows: [
    {title: `🎖️️ MATEMATICAS`, description: `Comando: ${usedPrefix}mates  <noob / easy / medium / hard / extreme /impossible /impossible2>`, rowId: `${usedPrefix}mates`},
    {title: `🎖️️ PIEDRA, PAPEL O TIJERAS`, description: `Comando: ${usedPrefix}ppt </papel /tijera /piedra>`, rowId: `${usedPrefix}ppt`},
    {title: `🎖️️ JODA PROSTITUTO`, description: `Comando: ${usedPrefix}prostituto <nombre / @tag>`, rowId: `${usedPrefix}prostituto`},
    {title: `🎖️️ JODA PROSTITUTA`, description: `Comando: ${usedPrefix}prostituta <nombre / @tag>`, rowId: `${usedPrefix}prostituta`},
    {title: `🎖️ ️JODA GAY`, description: `Comando: ${usedPrefix}gay2 <nombre / @tag>`, rowId: `${usedPrefix}gay2`},
    {title: `🎖️ ️JODA LESBIANA`, description: `Comando: ${usedPrefix}lesbiana <nombre / @tag>`, rowId: `${usedPrefix}lesbiana`},
    {title: `🎖️ ️JODA PAJERO`, description: `Comando: ${usedPrefix}pajero <nombre / @tag>`, rowId: `${usedPrefix}pajero`},
    {title: `🎖️ ️JODA PAJERA`, description: `Comando: ${usedPrefix}pajera <nombre / @tag>`, rowId: `${usedPrefix}pajera`},
    {title: `🎖️ ️JODA PUTO`, description: `Comando: ${usedPrefix}puto <nombre / @tag>`, rowId: `${usedPrefix}puto`},
    {title: `🎖️ ️JODA PUTA`, description: `Comando: ${usedPrefix}puta <nombre / @tag>`, rowId: `${usedPrefix}puta`},
    {title: `🎖️ ️JODA MANCO`, description: `Comando: ${usedPrefix}manco <nombre / @tag>`, rowId: `${usedPrefix}manco`},
    {title: `🎖️ JODA MANCA`, description: `Comando: ${usedPrefix}manca <nombre / @tag>`, rowId: `${usedPrefix}manca`},
    {title: `🎖️ JODA RATA`, description: `Comando: ${usedPrefix}rata <nombre / @tag>`, rowId: `${usedPrefix}rata`},
    {title: `🎖️ JODA LOVE`, description: `Comando: ${usedPrefix}love <nombre / @tag>`, rowId: `${usedPrefix}love`},
    {title: `🎖️ DOXEO`, description: `Comando: ${usedPrefix}doxear <nombre / @tag>`, rowId: `${usedPrefix}doxear`},
    {title: `🎖️ PREGUNTA`, description: `pregunta algo al bot Comando: ${usedPrefix}pregunta `, rowId: `${usedPrefix}pregunta`},   
    {title: `🎖️ APUESTA`, description: `apuesta Comando: ${usedPrefix}slot `, rowId: `${usedPrefix}slot`},   
    {title: `🎖️ PVP`, description: `desafia a alguien, Comando: ${usedPrefix}top <tag>`, rowId: `${usedPrefix}pvp`},   
    {title: `🎖️ DESAFIA 3 EN RAYA`, description: `Desafia a alguien en este juego de gato virtual Comando: ${usedPrefix}ttt `, rowId: `${usedPrefix}ttt`},
    {title: `🎖️ ELIMINA DESAFIO 3 EN RAYA (JUEGO DE GATO)`, description: `Elimina un desafio 3 en raya Comando: ${usedPrefix}delttt `, rowId: `${usedPrefix}delttt`},
    {title: `🎖️ CONVERSA`, description: `Conversa con el bot Comando: ${usedPrefix}simi `, rowId: `${usedPrefix}simi`},   
    {title: `🎖️ TOP`, description: `Top del grupo Comando: ${usedPrefix}top <tema a eleccion>`, rowId: `${usedPrefix}top`},   
    {title: `🎖️ JODA TOP GAYS`, description: `Top gays Comando: ${usedPrefix}topgays `, rowId: `${usedPrefix}topgays`},   
    {title: `🎖️ JODA TOP OTAKUS`, description: `Top otakus Comando: ${usedPrefix}topotakus `, rowId: `${usedPrefix}topotakus`},   
    {title: `🎖️ FORMAR PAREJA`, description: `Formar pareja Comando: ${usedPrefix}formarpareja `, rowId: `${usedPrefix}formarpareja`},   
    {title: `🎖️ FORMAR  TRIO`, description: `Formar trio Comando: ${usedPrefix}formartrio `, rowId: `${usedPrefix}formartrio`},   
    {title: `🎖️ VERDAD`, description: `juego de la Verdad, Comando: ${usedPrefix}verdad `, rowId: `${usedPrefix}verdad`},   
    {title: `🎖️ RETO`, description: `juego Reto, Comando: ${usedPrefix}reto `, rowId: `${usedPrefix}reto`},   
    {title: `🎖️ CANCION`, description: `Adivina la cancion Comando: ${usedPrefix}cancion `, rowId: `${usedPrefix}cancion`},
    {title: `🎖️ PISTA`, description: `Adivina el fragmento Comando: ${usedPrefix}pista `, rowId: `${usedPrefix}pista`},
    ]}, ]
    let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS DE JUEGOS\n✨${userm}✨\n\npowered by\n*${igfg}*`
    const listMessage = {
      text: resp,
    footer: `${wm}`,
    title: `*JUEGOS ${wm}*`,
    buttonText: "*SELECCIONE AQUÍ*",
    mentions: conn.parseMention(resp),
    sections }
    
    await delay(1 * 1000)
    await conn.sendMessage(m.chat, listMessage, {quoted: estado}, { ephemeralExpiration: 1 * 1000 })
    await delay(1 * 1000)
    await conn.sendFile(m.chat, vn, `../media/menu.mp3`, null, m, true, {type: `audioMessage`, ptt: true, ephemeralExpiration: 1 * 1000 })
} catch {
  let str = `
  *${gt} ESTE ES EL MENU DE LOS COMANDOS DE JUEGOS\n✨${userm}✨\n\npowered by\n*${igfg}*
  *📅 FECHA: ${week}, ${date}*
  *📈 TIEMPO ACTIVO: ${uptime}*
  *📊 USUARIOS: ${rtotalreg}*
  
  ┣ ඬ⃟ 🎖️ _${usedPrefix}mates *<noob / easy / medium / hard / extreme /impossible /impossible2>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}ppt *<papel / tijera /piedra>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}prostituto *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}prostituta *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}gay2 *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}lesbiana *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}pajero *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}pajera *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}puto *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}puta *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}manco *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}manca *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}rata *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}love *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}doxear *<nombre / @tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}pregunta *<texto>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}suitpvp *<@tag>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}slot *<apuesta>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}ttt *<nombre sala>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}delttt_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}simi *<texto>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}top *<texto>*_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}topgays_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}topotakus_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}formarpareja_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}verdad_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}reto_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}cancion_
  ┣ ඬ⃟ 🎖️ _${usedPrefix}pista_
  `.trim()
  let buttons = [
{ buttonId: `${usedPrefix}donar`, buttonText: { displayText: `📮 𝙳𝙾𝙽𝙰𝚁 📮` }, type: 1 },
//{ buttonId: `${usedPrefix}terminosycondiciones`, buttonText: { displayText: `📋 𝚃𝙴𝚁𝙼𝙸𝙽𝙾𝚂 𝚈 𝙲𝙾𝙽𝙳𝙸𝙲𝙸𝙾𝙽𝙴𝚂 📋` }, type: 1 }]
{ buttonId: `${usedPrefix}infobot`, buttonText: { displayText: `🐾 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 🐾` }, type: 1 }]
let buttonMessage = {
image: pp,
caption: str.trim(),
mentions: [m.sender],
footer: `*${wm}*`,
buttons: buttons,
headerType: 4,
contextInfo: {
mentionedJid: [m.sender],
externalAdReply: {
showAdAttribution: true,
mediaType: `VIDEO`,
mediaUrl: null,
title: igfg,
body: null,
thumbnail: img,
sourceUrl: paypal
}}}
conn.sendMessage(m.chat, buttonMessage, { quoted: m })
await conn.sendFile(m.chat, vn, `menu.mp3`, null, m, true, { type: `audioMessage`, ptt: true})
}
break
//logos y efectos de estos

case `logosefectos`:
  try {
  const sections = [
    {
    title: `*LISTA DE OPCIONES*`,
    rows: [
    {title: `🖍️ MENSAJE FALSO`, description: `opcion 1 para facebook`, rowId: `${usedPrefix}mensajefalso`},
    {title: `🖍️ PHMAKER`, description: `dale efecto a una imagen usando ${usedPrefix}phmaker (opcion) y responde un mensaje o agrega el comando a una imagen con las opciones que te dare`, rowId: `${usedPrefix}phmaker`},
    {title: `🖍️ LOGOS`, description: `opcion 3 para facebook`, rowId: `${usedPrefix}logos`},
    {title: `🖍️ LOGOS NAVIDAD`, description: `opcion 4 para facebook`, rowId: `${usedPrefix}logochristmas`},   
    {title: `🖍️ LOGOS CORAZON`, description: `opcion 5 para facebook`, rowId: `${usedPrefix}logocorazon`},
    {title: `🖍️ COMENTARIO DE YOUTUBE`, description: `haz un fake de un comentario en youtube`, rowId: `${usedPrefix}ytcomment`},
    {title: `🖍️ TARJETA HORNY`, description: `responde a un mensaje o manda el comando ${usedPrefix}hornycard y pon tu imagen de perfil o la de alguien mas en una tarjeta horny`, rowId: `${usedPrefix}hornycard`},
    {title: `🖍️ TARJETA SIMP`, description: `responde a un mensaje o manda el comando ${usedPrefix}simcard y pon tu imagen de perfil o la de alguien mas en una tarjeta para simps`, rowId: `${usedPrefix}simpcard`},
    {title: `🖍️ POLICIA DE LOLIS`, description: `responde a un mensaje o manda el comando ${usedPrefix}lolice y pon tu imagen de perfil o la de alguien mas en una loli`, rowId: `${usedPrefix}lolice`},   
    {title: `🖍️ MEME ERES ESTUPIDO`, description: `responde a un mensaje o manda el comando ${usedPrefix}itssostupid y pon tu imagen de perfil o la de alguien mas en un meme`, rowId: `${usedPrefix}itssostupid`},
    {title: `🖍️ PIXELAR`, description: `responde a un mensaje o manda el comando ${usedPrefix}pixelar y pon tu imagen de perfil o la de alguien mas en una imagen pixelada`, rowId: `${usedPrefix}pixelar`},   
    {title: `🖍️ BLUR`, description: `responde a un mensaje o manda el comando ${usedPrefix}blur y pon tu imagen de perfil o la de alguien mas con efecto borroso`, rowId: `${usedPrefix}blur`},
    ]}, ]
    let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS DE LOS EFECTOS Y LOGOS\n✨${userm}✨
    
    *📅 ${gt} Fecha: ${week}, ${date}*
    *📈 Tiempo activo ${gt}: ${uptime}*
    *📊 Registrados: ${rtotalreg}*`
    const listMessage = {
    text: resp,
    footer: `${wm}`,
    title: `*EFECTOS Y LOGOS ${wm}*\npowered by\n*${igfg}*`,
    buttonText: "*SELECCIONE AQUÍ*",
    mentions: conn.parseMention(resp),
    sections }
    
    await delay(1 * 1000)
    await conn.sendMessage(m.chat, listMessage, {quoted: estado}, { ephemeralExpiration: 1 * 1000 })
    await delay(1 * 1000)
    await conn.sendFile(m.chat, vn, `../media/menu.mp3`, null, m, true, {type: `audioMessage`, ptt: true, ephemeralExpiration: 1 * 1000 })
} catch {
  let str = `
  *${gt} ESTE ES EL MENU DE LOS COMANDOS DE LOS EFECTOS Y LOGOS\n✨${userm}✨*
  *📅 FECHA: ${week}, ${date}*
  *📈 TIEMPO ACTIVO: ${uptime}*
  *📊 USUARIOS: ${rtotalreg}*
  
  ┣ ඬ⃟ 🖍️ _${usedPrefix}mensajefalso *<nombre|mensaje>*_
  ┣ ඬ⃟ 🖍️ _${usedPrefix}phmaker *<opcion> <imagen>*_
  ┣ ඬ⃟ 🖍️ _${usedPrefix}logos *<efecto> <texto>*_
  ┣ ඬ⃟ 🖍️ _${usedPrefix}logochristmas *<texto>*_
  ┣ ඬ⃟ 🖍️ _${usedPrefix}logocorazon *<texto>*_
  ┣ ඬ⃟ 🖍️ _${usedPrefix}ytcomment *<texto>*_
  ┣ ඬ⃟ 🖍️ _${usedPrefix}hornycard *<@tag>*_
  ┣ ඬ⃟ 🖍️ _${usedPrefix}simpcard *<@tag>*_
  ┣ ඬ⃟ 🖍️ _${usedPrefix}lolice *<@tag>*_
  ┣ ඬ⃟ 🖍️ _${usedPrefix}itssostupid_
  ┣ ඬ⃟ 🖍️ _${usedPrefix}pixelar_
  ┣ ඬ⃟ 🖍️ _${usedPrefix}blur_
  `.trim()
  let buttons = [
{ buttonId: `${usedPrefix}donar`, buttonText: { displayText: `📮 𝙳𝙾𝙽𝙰𝚁 📮` }, type: 1 },
//{ buttonId: `${usedPrefix}terminosycondiciones`, buttonText: { displayText: `📋 𝚃𝙴𝚁𝙼𝙸𝙽𝙾𝚂 𝚈 𝙲𝙾𝙽𝙳𝙸𝙲𝙸𝙾𝙽𝙴𝚂 📋` }, type: 1 }]
{ buttonId: `${usedPrefix}infobot`, buttonText: { displayText: `🐾 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 🐾` }, type: 1 }]
let buttonMessage = {
image: pp,
caption: str.trim(),
mentions: [m.sender],
footer: `*${wm}*`,
buttons: buttons,
headerType: 4,
contextInfo: {
mentionedJid: [m.sender],
externalAdReply: {
showAdAttribution: true,
mediaType: `VIDEO`,
mediaUrl: null,
title: igfg,
body: null,
thumbnail: img,
sourceUrl: paypal
}}}
conn.sendMessage(m.chat, buttonMessage, { quoted: m })
await conn.sendFile(m.chat, vn, `menu.mp3`, null, m, true, { type: `audioMessage`, ptt: true})
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
  const sections = [
    {
    title: `MENU PRINCIPAL DEL ${wm}`,
    rows: [
      {title: `bot`, description: `menu de ayuda (uso sin prefijo)`, rowId: `bot|Bot`},
      {title: `🎖️ *JUEGOS* `, description: `Comando: ${usedPrefix}juegos (menu de juegos)`, rowId: `${usedPrefix}juegos`},
      {title: `🔰 *REPORTES DE FALLOS*`, description: `reporta los fallos despues del comando ${usedPrefix}reporte *texto*`, rowId: `${usedPrefix}reporte`},
      {title: `📥*DESCARGAS*`, description: `Comando: ${usedPrefix}descargas (menu descargas)`, rowId: `${usedPrefix}descargas`},
      {title: `💎*ADMINS-GRUPOS*`, description: `Comando: ${usedPrefix}gAdmin (Solo admins)`, rowId: `${usedPrefix}gAdmin`},
      {title: `💎*DUEÑO (OWNERs)*`, description: `Comando: ${usedPrefix}owners (Solo owners)`, rowId: `${usedPrefix}gAdmin`},   
      {title:`🧧*CONVERTIDORES*`, description: `Comando: ${usedPrefix}convert (para convertidores`, rowId: `${usedPrefix}convert`},
      {title:`🖍️*EFECTOS Y LOGOS*`, description: `Comando: ${usedPrefix}logosefectos (para optener efectos y logos)`, rowId: `${usedPrefix}logosefectos`},
      {title:`👾*RANDOM*`, description: `Comando: ${usedPrefix}random `, rowId: `${usedPrefix}random`},
      {title:`🎤*EFECTOS DE AUDIOS*`, description: `*- RESPONDE A UN AUDIO O NOTA DE VOZ usando ${usedPrefix}audioefect*`, rowId: `${usedPrefix}audioefect`},
      {title:`📳*CHAT ANONIMO*`, description: `Comando: ${usedPrefix}chatanonimo `, rowId: `${usedPrefix}chatanonimo`},
      {title:`🔍*BUSCADORES*`, description: `Comando: ${usedPrefix}buscar (buscadores de internet)`, rowId: `${usedPrefix}buscar`},
      {title:`🔊 *AUDIOS* `, description: `*- ESCRIBE LAS PALABRAS O FRASES SIN NINGUN PREFIJO (${usedPrefix}, /, *, .)*`, rowId: `${usedPrefix}audios-bot`},
      {title:`🛠️ *HERRAMIENTAS*`, description: `Comando: ${usedPrefix}herramientas (algunas herramientas`, rowId: `${usedPrefix}herramientas`},
      {title:`💵 *RPG - LIMITES - ECONOMIA*`, description: `Comando: ${usedPrefix}rpg (juegos de rol`, rowId: `${usedPrefix}rpg`},
      {title:`👽 *STICKERS*`, description: `Comando: ${usedPrefix}creador-sticker (crear stickers) `, rowId: `${usedPrefix}stickermenu`},
      {title:`🔞 *NSFW +18*`, description: `Comando: ${usedPrefix}nsfw `, rowId: `${usedPrefix}nsfw`},
      {title:`😉 *INFO TÚ*`, description: `Para saber la información que has juntado en los grupo Comando: ${usedPrefix}infoyo`, rowId: `${usedPrefix}infoyo`}
    ]}, 
      {title: `UTILIDAD`, rows:[
      {title:`💵 DONAR`, description: `si quieres apoyar al bot y a su dueño se te agradece`, rowId: `${usedPrefix}donasi`},
      {title:`👽 OWNER`, description: `contacta con mi creador`, rowId: `${usedPrefix}owner`},
      {title:`🔰 INFOBOT`, description: `te muestro mi informacion al funcionar`, rowId: `${usedPrefix}infobot`},
      {title: `🔗 REDES SOCIALES`, description: `BUSCANOS EN FACEBOOK https://www.facebook.com/groups/otakustogether`, rowId: ``}
    ]}]
    let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS DEL MENU PRINCIPAL ✨${userm}✨
    
    *📅 ${gt} Fecha: ${week}, ${date}*
    *📈 Tiempo activo ${gt}: ${uptime}*
    *📊 Registrados: ${rtotalreg}*`
    const listMessage1 = {
    text: resp,
    footer: `${wm}`,
    title: `*MENU ${wm} powered by*\n*${igfg}*`,
    buttonText: "*SELECCIONE AQUÍ*",
    mentions: conn.parseMention(resp),
    sections }

    await delay(1 * 1000)
    await conn.sendMessage(m.chat, listMessage1, {quoted: m, quoted: estado})
    await delay(1 * 1000)
    await conn.sendFile(m.chat, vn, `../media/menu.mp3`, null, m, true, {type: `audioMessage`, ptt: true, ephemeralExpiration: 1 * 1000 })
} catch {
  let str = `
  *HOLA ✨${userm}✨, ESTE ES EL MENU DE MENUS DE ${igfg}*
  *📅 FECHA: ${week}, ${date}*
  *📈 TIEMPO ACTIVO: ${uptime}*
  *📊 USUARIOS: ${rtotalreg}*
  
  ┣ ඬ⃟ 💟 _Bot_ (_uso sin prefijo_)
  ┣ ඬ⃟ 🎖️ *JUEGOS*, Comando: _${usedPrefix}juegos_
  ┣ ඬ⃟ 🔰 *REPORTES DE FALLOS*, reporta los fallos despues del comando _${usedPrefix}reporte_
  ┣ ඬ⃟ 📥*DESCARGAS*, Comando:  _${usedPrefix}descargas_
  ┣ ඬ⃟ 💎*ADMINS-GRUPOS*, Comando:  _${usedPrefix}gAdmin_
  ┣ ඬ⃟ 💎*DUEÑO (OWNERs)*, Comando: _${usedPrefix}owners_
  ┣ ඬ⃟ 🧧*CONVERTIDORES*, Comando: _${usedPrefix}convert_
  ┣ ඬ⃟ 🖍️*EFECTOS Y LOGOS*, Comando: _${usedPrefix}logosefectos_
  ┣ ඬ⃟ 👾*RANDOM*, Comando: _${usedPrefix}random_
  ┣ ඬ⃟ 🎤*EFECTOS DE AUDIOS*, *- RESPONDE A UN AUDIO O NOTA DE VOZ usando _${usedPrefix}audioefect_
  ┣ ඬ⃟ 📳*CHAT ANONIMO*, Comando: _${usedPrefix}chatanonimo_
  ┣ ඬ⃟ 🔍*BUSCADORES*, Comando: _${usedPrefix}buscar_
  ┣ ඬ⃟ 🔊 *AUDIOS*,  *- ESCRIBE LAS PALABRAS O FRASES SIN NINGUN PREFIJO _${usedPrefix}audios-bot_
  ┣ ඬ⃟ 🛠️ *HERRAMIENTAS*, Comando: _${usedPrefix}herramientas_
  ┣ ඬ⃟ 💵 *RPG - LIMITES - ECONOMIA*, Comando: _${usedPrefix}rpg_
  ┣ ඬ⃟ 👽 *STICKERS*, Comando: _${usedPrefix}stickermenu_
  ┣ ඬ⃟ 💟🔞 *NSFW +18*, Comando: _${usedPrefix}nsfw_
  ┣ ඬ⃟ 😉 *INFO TÚ*, Para saber la información que has juntado en los grupo Comando: _${usedPrefix}infoyo_
 
  ┃ *<SERBOT - JADIBOT*
  ┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
  ┣ ඬ⃟ 🤖 _${usedPrefix}serbot_
  ┣ ඬ⃟ 🤖 _${usedPrefix}stop_
  ┣ ඬ⃟ 🤖 _${usedPrefix}bots_
  ┣ ඬ⃟ 🤖 _${usedPrefix}codetoken_
  ┣ ඬ⃟ 🤖 _${usedPrefix}deletebot_
  `.trim()
  let buttons = [
{ buttonId: `${usedPrefix}donar`, buttonText: { displayText: `📮 𝙳𝙾𝙽𝙰𝚁 📮` }, type: 1 },
//{ buttonId: `${usedPrefix}terminosycondiciones`, buttonText: { displayText: `📋 𝚃𝙴𝚁𝙼𝙸𝙽𝙾𝚂 𝚈 𝙲𝙾𝙽𝙳𝙸𝙲𝙸𝙾𝙽𝙴𝚂 📋` }, type: 1 }]
{ buttonId: `${usedPrefix}infobot`, buttonText: { displayText: `🐾 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 🐾` }, type: 1 }]
let buttonMessage = {
image: pp,
caption: str.trim(),
mentions: [m.sender],
footer: `*${wm}*`,
buttons: buttons,
headerType: 4,
contextInfo: {
mentionedJid: [m.sender],
externalAdReply: {
showAdAttribution: true,
mediaType: `VIDEO`,
mediaUrl: null,
title: igfg,
body: null,
thumbnail: img,
sourceUrl: paypal
}}}
conn.sendMessage(m.chat, buttonMessage, { quoted: m })
await conn.sendFile(m.chat, vn, `menu.mp3`, null, m, true, { type: `audioMessage`, ptt: true})

}
break
//Owners o propietarios

case `owners`:
  try {
  const sections = [
    {
    title: `*LISTA DE OPCIONES*`,
    rows: [
    
    {title: `👑 >`, description: `> <funcion>`, rowId: `>`},
    {title: `👑 =>`, description: `=> <funcion>`, rowId: `=>`},   
    {title: `👑 $`, description: `$ <funcion>`, rowId: `$`},   
    {title: `👑 SET PREFIX`, description: `Comando: ${usedPrefix}setprefix <prefijo>`, rowId: `${usedPrefix}setprefix`},   
    {title: `👑 RESET PREFIX`, description: `Comando: ${usedPrefix}resetprefix `, rowId: `${usedPrefix}resetprefix`},   
    {title: `👑 AUTOADMIN`, description: `Comando: ${usedPrefix}autoadmin `, rowId: `${usedPrefix}autoadmin`},   
    {title: `👑 LEAVEGC`, description: `Comando: ${usedPrefix}leavegc `, rowId: `${usedPrefix}leavegc`},   
    {title: `👑 CAJA FUERTE`, description: `Comando: ${usedPrefix}cajafuerte `, rowId: `${usedPrefix}cajafuerte`},   
    {title: `👑 BLOCKLIST`, description: `Comando: ${usedPrefix}blocklist `, rowId: `${usedPrefix}blocklist`},   
    {title: `👑 BLOCK`, description: `Comando: ${usedPrefix}block <@tag / numero>`, rowId: `${usedPrefix}block`},   
    {title: `👑 UNBLOCK`, description: `Comando: ${usedPrefix}unblock <@tag / numero> `, rowId: `${usedPrefix}unblock`},   
    {title: `👑 ENABLE RESTRICT`, description: `Comando: ${usedPrefix}enable restrict `, rowId: `${usedPrefix}enable restrict`},   
    {title: `👑 DISABLE RESTRICT`, description: `Comando: ${usedPrefix}disable restrict `, rowId: `${usedPrefix}disable restrict`},   
    {title: `👑 ENABLE AUTOREAD`, description: `Comando: ${usedPrefix}enable autoread `, rowId: `${usedPrefix}enable autoread`},   
    {title: `👑 DISABLE AUTOREAD`, description: `Comando: ${usedPrefix}disable autoread `, rowId: `${usedPrefix}disable autoread`},   
    {title: `👑 ENABLE PUBLIC`, description: `Comando: ${usedPrefix}enable public `, rowId: `${usedPrefix}enable public`},   
    {title: `👑 DISABLE PUBLIC`, description: `Comando: ${usedPrefix}disable public `, rowId: `${usedPrefix}disable public`},   
    {title: `👑 ENABLE PCONLY`, description: `Comando: ${usedPrefix}enable pconly `, rowId: `${usedPrefix}enable pconly`},   
    {title: `👑 DISABLE PCONLY`, description: `Comando: ${usedPrefix}disable pconly `, rowId: `${usedPrefix}disable pconly`},   
    {title: `👑 ENABLE GCONLY`, description: `Comando: ${usedPrefix}enable gconly `, rowId: `${usedPrefix}enable gconly`},   
    {title: `👑 DISABLE GCONLY`, description: `Comando: ${usedPrefix}disable gconly `, rowId: `${usedPrefix}disable gconly`},   
    {title: `👑 ENABLE ANTICALL`, description: `Comando: ${usedPrefix}enable anticall `, rowId: `${usedPrefix}enable anticall`},   
    {title: `👑 DISABLE ANTICALL`, description: `Comando: ${usedPrefix}disable anticall `, rowId: `${usedPrefix}disable anticall`},   
    {title: `👑 ENABLE ANTIPRIVADO`, description: `Comando: ${usedPrefix}enable antiprivado `, rowId: `${usedPrefix}enable antiprivado`},   
    {title: `👑 DISABLE ANTIPRIVADO`, description: `Comando: ${usedPrefix}disable antiprivado `, rowId: `${usedPrefix}disable antiprivado`},   
    {title: `👑 ENABLE MODEJADIBOT`, description: `Comando: ${usedPrefix}enable modejadibot `, rowId: `${usedPrefix}enable modejadibot`},   
    {title: `👑 DISABLE MODEJADIBOT`, description: `Comando: ${usedPrefix}disable modejadibot `, rowId: `${usedPrefix}disable modejadibot`},   
    {title: `👑 MSG`, description: `Comando: ${usedPrefix}msg <texto> `, rowId: `${usedPrefix}msg`},   
    {title: `👑 BANCHAT`, description: `Comando: ${usedPrefix}banchat `, rowId: `${usedPrefix}banchat`},   
    {title: `👑 UNBANCHAT`, description: `Comando: ${usedPrefix}unbanchat `, rowId: `${usedPrefix}unbanchat`},   
    {title: `👑 BANUSER`, description: `Comando: ${usedPrefix}banuser <@tag> `, rowId: `${usedPrefix}banuser`},   
    {title: `👑 UNBANUSER`, description: `Comando: ${usedPrefix}unbanuser <@tag> `, rowId: `${usedPrefix}unbanuser`},   
    {title: `👑 DAR DIAMANTES`, description: `Comando: ${usedPrefix}dardiamantes <@tag> `, rowId: `${usedPrefix}dardiamantes`},   
    {title: `👑 AÑADIR XP`, description: `Comando: ${usedPrefix}añadirxp <@tag> `, rowId: `${usedPrefix}añadirxp`},   
    {title: `👑 BC`, description: `Comando: ${usedPrefix}bc <texto> `, rowId: `${usedPrefix}bc`},   
    {title: `👑 BCCHATS`, description: `Comando: ${usedPrefix}bcchats <texto> `, rowId: `${usedPrefix}bcchats`},   
    {title: `👑 BCGC`, description: `Comando: ${usedPrefix}bcgc <texto> `, rowId: `${usedPrefix}bcgc`},   
    {title: `👑 BCBOT`, description: `Comando: ${usedPrefix}bcbot <texto> `, rowId: `${usedPrefix}bcbot`},   
    {title: `👑 CLEARTPM`, description: `Comando: ${usedPrefix}cleartpm `, rowId: `${usedPrefix}cleartpm`},   
    {title: `👑 RESTART`, description: `Comando: ${usedPrefix}restart `, rowId: `${usedPrefix}restart`},   
    {title: `👑 UPDATE`, description: `Comando: ${usedPrefix}update `, rowId: `${usedPrefix}update`},   
    {title: `👑 BANLIST`, description: `Comando: ${usedPrefix}banlist `, rowId: `${usedPrefix}banlist`},   
    {title: `👑 ADDPREM`, description: `Comando: ${usedPrefix}addprem <@tag> `, rowId: `${usedPrefix}addprem`},   
    {title: `👑 DELPREM`, description: `Comando: ${usedPrefix}delprem <@tag> `, rowId: `${usedPrefix}delprem`},   
    {title: `👑 LISTPREM`, description: `Comando: ${usedPrefix}listprem `, rowId: `${usedPrefix}listprem`},   
    {title: `👑 LISTCMD`, description: `Comando: ${usedPrefix}listcmd `, rowId: `${usedPrefix}listcmd`},   
    {title: `👑 SETPPBOT`, description: `Comando: ${usedPrefix}setppbot <responder a imagen> `, rowId: `${usedPrefix}setppbot`},   
    {title: `👑 ADDCMD`, description: `Comando: ${usedPrefix}addcmd <texto> <responder a sticker/imagen> `, rowId: `${usedPrefix}addcmd`},   
    {title: `👑 DELCMD`, description: `Comando: ${usedPrefix}delcmd <responder a sticker/imagen con comando o texto asignado> `, rowId: `${usedPrefix}delcmd`}
    ]}]
    let resp = `${gt}✨${userm}✨ ESTE ES EL MENU DE LOS COMANDOS SOLO PARA PERSONAL CON TITULO DE OWNER O SIMILAR`
    const listMessage = {
      text: resp,
    footer: `${wm}`,
    title: `*OWNERS Y MODERADORES ${wm}*\npowered by\n*${igfg}*`,
    buttonText: "*SELECCIONE AQUÍ*",
    mentions: conn.parseMention(resp),
    sections }
    
    await delay(1 * 1000)
    await conn.sendMessage(m.chat, listMessage, {quoted: estado}, { ephemeralExpiration: 1 * 1000 })
    await delay(1 * 1000)
    await conn.sendFile(m.chat, vn, `../media/menu.mp3`, null, m, true, {type: `audioMessage`, ptt: true, ephemeralExpiration: 1 * 1000 })
} catch {
  let str = `
*HOLA ✨${userm}✨, ESTE ES EL MENU DE OWNER Y MODERADORES DE ${igfg}*
*📅 FECHA: ${week}, ${date}*
*📈 TIEMPO ACTIVO: ${uptime}*
*📊 USUARIOS: ${rtotalreg}*

  ┣ ඬ⃟ 👑 > *<funcion>*
  ┣ ඬ⃟ 👑 => *<funcion>*
  ┣ ඬ⃟ 👑 $ *<funcion>*
  ┣ ඬ⃟ 👑 _${usedPrefix}setprefix *<prefijo>*_
  ┣ ඬ⃟ 👑 _${usedPrefix}resetprefix_
  ┣ ඬ⃟ 👑 _${usedPrefix}autoadmin_
  ┣ ඬ⃟ 👑 _${usedPrefix}leavegc_
  ┣ ඬ⃟ 👑 _${usedPrefix}cajafuerte_
  ┣ ඬ⃟ 👑 _${usedPrefix}blocklist_
  ┣ ඬ⃟ 👑 _${usedPrefix}block *<@tag / numero>*_
  ┣ ඬ⃟ 👑 _${usedPrefix}unblock *<@tag / numero>*_
  ┣ ඬ⃟ 👑 _${usedPrefix}enable *restrict*_
  ┣ ඬ⃟ 👑 _${usedPrefix}disable *restrict*_
  ┣ ඬ⃟ 👑 _${usedPrefix}enable *autoread*_
  ┣ ඬ⃟ 👑 _${usedPrefix}disable *autoread*_
  ┣ ඬ⃟ 👑 _${usedPrefix}enable *public*_
  ┣ ඬ⃟ 👑 _${usedPrefix}disable *public*_
  ┣ ඬ⃟ 👑 _${usedPrefix}enable *pconly*_
  ┣ ඬ⃟ 👑 _${usedPrefix}disable *pconly*_
  ┣ ඬ⃟ 👑 _${usedPrefix}enable *gconly*_
  ┣ ඬ⃟ 👑 _${usedPrefix}disable *gconly*_
  ┣ ඬ⃟ 👑 _${usedPrefix}enable *anticall*_
  ┣ ඬ⃟ 👑 _${usedPrefix}disable *anticall*_
  ┣ ඬ⃟ 👑 _${usedPrefix}enable *antiprivado*_
  ┣ ඬ⃟ 👑 _${usedPrefix}disable *antiprivado*_
  ┣ ඬ⃟ 👑 _${usedPrefix}enable *modejadibot*_
  ┣ ඬ⃟ 👑 _${usedPrefix}disable *modejadibot*_
  ┣ ඬ⃟ 👑 _${usedPrefix}msg *<texto>*_
  ┣ ඬ⃟ 👑 _${usedPrefix}banchat_
  ┣ ඬ⃟ 👑 _${usedPrefix}unbanchat_
  ┣ ඬ⃟ 👑 _${usedPrefix}banuser *<@tag>*_
  ┣ ඬ⃟ 👑 _${usedPrefix}unbanuser *<@tag>*_
  ┣ ඬ⃟ 👑 _${usedPrefix}dardiamantes *<@tag>*_
  ┣ ඬ⃟ 👑 _${usedPrefix}añadirxp *<@tag>*_
  ┣ ඬ⃟ 👑 _${usedPrefix}banuser *<@tag>*_
  ┣ ඬ⃟ 👑 _${usedPrefix}bc *<texto>*_
  ┣ ඬ⃟ 👑 _${usedPrefix}bcchats *<texto>*_
  ┣ ඬ⃟ 👑 _${usedPrefix}bcgc *<texto>*_
  ┣ ඬ⃟ 👑 _${usedPrefix}bcbot *<texto>*_
  ┣ ඬ⃟ 👑 _${usedPrefix}cleartpm_
  ┣ ඬ⃟ 👑 _${usedPrefix}restart_
  ┣ ඬ⃟ 👑 _${usedPrefix}update_
  ┣ ඬ⃟ 👑 _${usedPrefix}banlist_
  ┣ ඬ⃟ 👑 _${usedPrefix}addprem *<@tag>*_
  ┣ ඬ⃟ 👑 _${usedPrefix}delprem *<@tag>*_
  ┣ ඬ⃟ 👑 _${usedPrefix}listprem_
  ┣ ඬ⃟ 👑 _${usedPrefix}listcmd_
  ┣ ඬ⃟ 👑 _${usedPrefix}setppbot *<responder a imagen>*_
  ┣ ඬ⃟ 👑 _${usedPrefix}addcmd *<texto> <responder a sticker/imagen>*_
  ┣ ඬ⃟ 👑 _${usedPrefix}delcmd *<responder a sticker/imagen con comando o texto asignado>*_
  `.trim()
  let buttons = [
{ buttonId: `${usedPrefix}donar`, buttonText: { displayText: `📮 𝙳𝙾𝙽𝙰𝚁 📮` }, type: 1 },
//{ buttonId: `${usedPrefix}terminosycondiciones`, buttonText: { displayText: `📋 𝚃𝙴𝚁𝙼𝙸𝙽𝙾𝚂 𝚈 𝙲𝙾𝙽𝙳𝙸𝙲𝙸𝙾𝙽𝙴𝚂 📋` }, type: 1 }]
{ buttonId: `${usedPrefix}infobot`, buttonText: { displayText: `🐾 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 🐾` }, type: 1 }]
let buttonMessage = {
image: pp,
caption: str.trim(),
mentions: [m.sender],
footer: `*${wm}*`,
buttons: buttons,
headerType: 4,
contextInfo: {
mentionedJid: [m.sender],
externalAdReply: {
showAdAttribution: true,
mediaType: `VIDEO`,
mediaUrl: null,
title: igfg,
body: null,
thumbnail: img,
sourceUrl: paypal
}}}
conn.sendMessage(m.chat, buttonMessage, { quoted: m })
await conn.sendFile(m.chat, vn, `menu.mp3`, null, m, true, { type: `audioMessage`, ptt: true})
}
break
//Ramdon

case `random`:
  try{
  const sections = [
    {
    title: `*LISTA DE OPCIONES*`,
    rows: [
    {title: `👾 KPOP`, description: `blackpink / exo / bts`, rowId: `${usedPrefix}kpop`},
    {title: `👾 CRISTIANO RONALDO`, description: ``, rowId: `${usedPrefix}cristianoronaldo`},
    {title: `👾 MESSI`, description: ``, rowId: `${usedPrefix}messi`},
    {title: `👾 MEME`, description: ``, rowId: `${usedPrefix}meme`},
    {title: `👾 ITZY`, description: ``, rowId: `${usedPrefix}itzy`},
    {title: `👾 BLACKPINK`, description: ``, rowId: `${usedPrefix}blackpink`},
    {title: `👾 LOLIVID`, description: ``, rowId: `${usedPrefix}lolivid`},
    {title: `👾 LOLI`, description: ``, rowId: `${usedPrefix}loli`},
    {title: `👾 NAVIDAD`, description: ``, rowId: `${usedPrefix}navidad`},
    {title: `👾 PPCOUPLE`, description: ``, rowId: `${usedPrefix}ppcouple`},
    {title: `👾 WPMONTAÑA`, description: ``, rowId: `${usedPrefix}wpmontaña`},
    {title: `👾 PUBG`, description: ``, rowId: `${usedPrefix}pubg`},
    {title: `👾 WPGAMING`, description: ``, rowId: `${usedPrefix}wpgaming`},
    {title: `👾 WPAESTHETIC`, description: ``, rowId: `${usedPrefix}wpaesthetic`},
    {title: `👾 WPAESTHETIC2`, description: ``, rowId: `${usedPrefix}wpaesthetic2`},
    {title: `👾 WPRANDOM`, description: ``, rowId: `${usedPrefix}wprandom`},   
    {title: `👾 WALLHP`, description: ``, rowId: `${usedPrefix}wallhp`},   
    {title: `👾 WPVEHICULO`, description: ``, rowId: `${usedPrefix}wpvehiculo`},
    {title: `👾 WPMOTO`, description: ``, rowId: `${usedPrefix}wpmoto`},
    {title: `👾 COFFEE`, description: ``, rowId: `${usedPrefix}coffee`},   
    {title: `👾 PENTOL`, description: ``, rowId: `${usedPrefix}pentol`},   
    {title: `👾 CARICATURA`, description: ``, rowId: `${usedPrefix}caricatura`},   
    {title: `👾 CIBERESPACIO`, description: ``, rowId: `${usedPrefix}ciberespacio`},   
    {title: `👾 TECHNOLOGY`, description: ``, rowId: `${usedPrefix}technology`},   
    {title: `👾 DORAEMON`, description: ``, rowId: `${usedPrefix}doraemon`},   
    {title: `👾 HACKER`, description: ``, rowId: `${usedPrefix}hacker`},   
    {title: `👾 PLANETA`, description: ``, rowId: `${usedPrefix}planeta`},   
    {title: `👾 RANDOMPROFILE`, description: ``, rowId: `${usedPrefix}randomprofile`},
    {title: `👾 NEKO`, description: ``, rowId: `${usedPrefix}neko`},
    {title: `👾 WAIFU`, description: ``, rowId: `${usedPrefix}waifu`},
    {title: `👾 AKIRA`, description: ``, rowId: `${usedPrefix}akira`},
    {title: `👾 AKIYAMA`, description: ``, rowId: `${usedPrefix}akiyama`},
    {title: `👾 ANNA`, description: ``, rowId: `${usedPrefix}anna`},
    {title: `👾 ASUNA`, description: ``, rowId: `${usedPrefix}asuna`},
    {title: `👾 AYUZAWA`, description: ``, rowId: `${usedPrefix}ayuzawa_`},
    {title: `👾 BORUTO`, description: ``, rowId: `${usedPrefix}boruto`},
    {title: `👾 CHIHO`, description: ``, rowId: `${usedPrefix}chiho`},
    {title: `👾 CHITOGE`, description: ``, rowId: `${usedPrefix}chitoge`},
    {title: `👾 DEIDARA`, description: `**`, rowId: `${usedPrefix}deidara`},
    {title: `👾 ERZA`, description: ``, rowId: `${usedPrefix}erza`},
    {title: `👾 ELAINA`, description: ``, rowId: `${usedPrefix}elaina`},
    {title: `👾 EBA`, description: ``, rowId: `${usedPrefix}eba`},
    {title: `👾 EMILIA`, description: ``, rowId: `${usedPrefix}emilia_`},
    {title: `👾 HESTIA`, description: ``, rowId: `${usedPrefix}hestia`},
    {title: `👾 HINATA`, description: ``, rowId: `${usedPrefix}hinata`},   
    {title: `👾 INORI`, description: ``, rowId: `${usedPrefix}inori`},   
    {title: `👾 ISUZU`, description: ``, rowId: `${usedPrefix}isuzu`},
    {title: `👾 ITACHI`, description: ``, rowId: `${usedPrefix}itachi`},
    {title: `👾 ITORI`, description: ``, rowId: `${usedPrefix}itori`},   
    {title: `👾 KAGA`, description: ``, rowId: `${usedPrefix}kaga`},   
    {title: `👾 KAGURA`, description: ``, rowId: `${usedPrefix}kagura`},   
    {title: `👾 KAORI`, description: ``, rowId: `${usedPrefix}kaori`},   
    {title: `👾 KENEKI`, description: ``, rowId: `${usedPrefix}keneki`},   
    {title: `👾 KOTORI`, description: ``, rowId: `${usedPrefix}kotori`},   
    {title: `👾 KURUMI`, description: ``, rowId: `${usedPrefix}kurumi`},   
    {title: `👾 MADARA`, description: ``, rowId: `${usedPrefix}madara`},   
    {title: `👾 MIKASA`, description: ``, rowId: `${usedPrefix}mikasa`},
    {title: `👾 MIKU`, description: ``, rowId: `${usedPrefix}miku`},
    {title: `👾 MINATO`, description: ``, rowId: `${usedPrefix}minato`},   
    {title: `👾 NARUTO`, description: ``, rowId: `${usedPrefix}naruto`},   
    {title: `👾 NEZUKO`, description: ``, rowId: `${usedPrefix}nezuko`},   
    {title: `👾 SAGIRI`, description: ``, rowId: `${usedPrefix}sagiri`},   
    {title: `👾 SASUKE`, description: ``, rowId: `${usedPrefix}sasuke`},   
    {title: `👾 SAKURA`, description: ``, rowId: `${usedPrefix}sakura`},
    {title: `👾 COSPLAY`, description: ``, rowId: `${usedPrefix}cosplay`},
    ]}, ]
    let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS RANDOM\n✨${userm}✨`
    const listMessage = {
    text: resp,
    footer: `${wm}`,
    title: `*MENU RANDOM ${wm}*\npowered by\n*${igfg}*`,
    buttonText: "*SELECCIONE AQUÍ*",
    mentions: conn.parseMention(resp),
    sections }
    
    await delay(1 * 1000)
    await conn.sendMessage(m.chat, listMessage, {quoted: estado}, { ephemeralExpiration: 1 * 1000 })
    await delay(1 * 1000)
    await conn.sendFile(m.chat, vn, `../media/menu.mp3`, null, m, true, {type: `audioMessage`, ptt: true, ephemeralExpiration: 1 * 1000 })
} catch {
  let str = `
*${gt} ESTE ES EL MENU DE LOS COMANDOS RANDOM\n✨${userm}✨*
*📅 FECHA: ${week}, ${date}*
*📈 TIEMPO ACTIVO: ${uptime}*
*📊 USUARIOS: ${rtotalreg}*

┣ ඬ⃟ 👾 _${usedPrefix}kpop *<blackpink / exo / bts>*_
┣ ඬ⃟ 👾 _${usedPrefix}cristianoronaldo_
┣ ඬ⃟ 👾 _${usedPrefix}messi_
┣ ඬ⃟ 👾 _${usedPrefix}meme_
┣ ඬ⃟ 👾 _${usedPrefix}itzy_
┣ ඬ⃟ 👾 _${usedPrefix}blackpink_
┣ ඬ⃟ 👾 _${usedPrefix}lolivid_
┣ ඬ⃟ 👾 _${usedPrefix}loli_
┣ ඬ⃟ 👾 _${usedPrefix}navidad_
┣ ඬ⃟ 👾 _${usedPrefix}ppcouple_
┣ ඬ⃟ 👾 _${usedPrefix}wpmontaña_
┣ ඬ⃟ 👾 _${usedPrefix}pubg_
┣ ඬ⃟ 👾 _${usedPrefix}wpgaming_
┣ ඬ⃟ 👾 _${usedPrefix}wpaesthetic_
┣ ඬ⃟ 👾 _${usedPrefix}wpaesthetic2_
┣ ඬ⃟ 👾 _${usedPrefix}wprandom_
┣ ඬ⃟ 👾 _${usedPrefix}wallhp_
┣ ඬ⃟ 👾 _${usedPrefix}wpvehiculo_
┣ ඬ⃟ 👾 _${usedPrefix}wpmoto_
┣ ඬ⃟ 👾 _${usedPrefix}coffee_
┣ ඬ⃟ 👾 _${usedPrefix}pentol_
┣ ඬ⃟ 👾 _${usedPrefix}caricatura_
┣ ඬ⃟ 👾 _${usedPrefix}ciberespacio_
┣ ඬ⃟ 👾 _${usedPrefix}technology_
┣ ඬ⃟ 👾 _${usedPrefix}doraemon_
┣ ඬ⃟ 👾 _${usedPrefix}hacker_
┣ ඬ⃟ 👾 _${usedPrefix}planeta_
┣ ඬ⃟ 👾 _${usedPrefix}randomprofile_
┣ ඬ⃟ 👾 _${usedPrefix}neko_
┣ ඬ⃟ 👾 _${usedPrefix}waifu_
┣ ඬ⃟ 👾 _${usedPrefix}akira_
┣ ඬ⃟ 👾 _${usedPrefix}akiyama_
┣ ඬ⃟ 👾 _${usedPrefix}anna_
┣ ඬ⃟ 👾 _${usedPrefix}asuna_
┣ ඬ⃟ 👾 _${usedPrefix}ayuzawa_
┣ ඬ⃟ 👾 _${usedPrefix}boruto_
┣ ඬ⃟ 👾 _${usedPrefix}chiho_
┣ ඬ⃟ 👾 _${usedPrefix}chitoge_
┣ ඬ⃟ 👾 _${usedPrefix}deidara_
┣ ඬ⃟ 👾 _${usedPrefix}erza_
┣ ඬ⃟ 👾 _${usedPrefix}elaina_
┣ ඬ⃟ 👾 _${usedPrefix}eba_
┣ ඬ⃟ 👾 _${usedPrefix}emilia_
┣ ඬ⃟ 👾 _${usedPrefix}hestia_
┣ ඬ⃟ 👾 _${usedPrefix}hinata_
┣ ඬ⃟ 👾 _${usedPrefix}inori_
┣ ඬ⃟ 👾 _${usedPrefix}isuzu_
┣ ඬ⃟ 👾 _${usedPrefix}itachi_
┣ ඬ⃟ 👾 _${usedPrefix}itori_
┣ ඬ⃟ 👾 _${usedPrefix}kaga_
┣ ඬ⃟ 👾 _${usedPrefix}kagura_
┣ ඬ⃟ 👾 _${usedPrefix}kaori_
┣ ඬ⃟ 👾 _${usedPrefix}keneki_
┣ ඬ⃟ 👾 _${usedPrefix}kotori_
┣ ඬ⃟ 👾 _${usedPrefix}kurumi_
┣ ඬ⃟ 👾 _${usedPrefix}madara_
┣ ඬ⃟ 👾 _${usedPrefix}mikasa_
┣ ඬ⃟ 👾 _${usedPrefix}miku_
┣ ඬ⃟ 👾 _${usedPrefix}minato_
┣ ඬ⃟ 👾 _${usedPrefix}naruto_
┣ ඬ⃟ 👾 _${usedPrefix}nezuko_
┣ ඬ⃟ 👾 _${usedPrefix}sagiri_
┣ ඬ⃟ 👾 _${usedPrefix}sasuke_
┣ ඬ⃟ 👾 _${usedPrefix}sakura_
┣ ඬ⃟ 👾 _${usedPrefix}cosplay_
  `.trim()
  let buttons = [
{ buttonId: `${usedPrefix}donar`, buttonText: { displayText: `📮 𝙳𝙾𝙽𝙰𝚁 📮` }, type: 1 },
//{ buttonId: `${usedPrefix}terminosycondiciones`, buttonText: { displayText: `📋 𝚃𝙴𝚁𝙼𝙸𝙽𝙾𝚂 𝚈 𝙲𝙾𝙽𝙳𝙸𝙲𝙸𝙾𝙽𝙴𝚂 📋` }, type: 1 }]
{ buttonId: `${usedPrefix}infobot`, buttonText: { displayText: `🐾 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 🐾` }, type: 1 }]
let buttonMessage = {
image: pp,
caption: str.trim(),
mentions: [m.sender],
footer: `*${wm}*`,
buttons: buttons,
headerType: 4,
contextInfo: {
mentionedJid: [m.sender],
externalAdReply: {
showAdAttribution: true,
mediaType: `VIDEO`,
mediaUrl: null,
title: igfg,
body: null,
thumbnail: img,
sourceUrl: paypal
}}}
conn.sendMessage(m.chat, buttonMessage, { quoted: m })
await conn.sendFile(m.chat, vn, `menu.mp3`, null, m, true, { type: `audioMessage`, ptt: true})
}
break
//RPG, Limites y economia para juegos de rol

case `rpg`:
  try {
  const sections = [
    {
    title: `*LISTA DE OPCIONES*`,
    rows: [
    {title: `⚗️ PASE`, description: ``, rowId: `${usedPrefix}pase premium`},
    {title: `⚗️ PASS`, description: ``, rowId: `${usedPrefix}pass premium`},
    {title: `⚗️ LISTAPREMIUM`, description: ``, rowId: `${usedPrefix}listapremium | listprem`},
    {title: `⚗️ TRANSFERIR`, description: `*tipo cantidad @tag*`, rowId: `${usedPrefix}transfer `},
    {title: `⚗️ DAR`, description: ``, rowId: `${usedPrefix}dar *tipo cantidad @tag*`},
    {title: `⚗️ ENVIAR`, description: `*tipo cantidad @tag*`, rowId: `${usedPrefix}enviar `},
    {title: `⚗️ BALANCE`, description: ``, rowId: `${usedPrefix}balance`},
    {title: `⚗️ CARTERA`, description: ``, rowId: `${usedPrefix}cartera | wallet`},
    {title: `⚗️ EXPERIENCIA`, description: ``, rowId: `${usedPrefix}experiencia | exp`},
    {title: `⚗️ TOP`, description: ``, rowId: `${usedPrefix}top | lb | leaderboard`},
    {title: `⚗️ NIVEL`, description: ``, rowId: `${usedPrefix}nivel | level | lvl`},
    {title: `⚗️ ROL`, description: ``, rowId: `${usedPrefix}rol | rango`},
    {title: `⚗️ INVENTARIO`, description: ``, rowId: `${usedPrefix}inventario | inventory`},
    {title: `⚗️ AVENTURA`, description: ``, rowId: `${usedPrefix}aventura | adventure`},
    {title: `⚗️ CAZA`, description: ``, rowId: `${usedPrefix}caza | cazar | hunt`},
    {title: `⚗️ PESCAR`, description: ``, rowId: `${usedPrefix}pescar | fishing`},
    {title: `⚗️ ANIMALES`, description: ``, rowId: `${usedPrefix}animales`},
    {title: `⚗️ ALIMENTOS`, description: ``, rowId: `${usedPrefix}alimentos`},
    {title: `⚗️ CURAR`, description: ``, rowId: `${usedPrefix}curar | heal`},
    {title: `⚗️ BUY`, description: ``, rowId: `${usedPrefix}buy`},
    {title: `⚗️ SELL`, description: ``, rowId: `${usedPrefix}sell`},
    {title: `⚗️ VERIFICAR`, description: ``, rowId: `${usedPrefix}verificar | registrar`},
    {title: `⚗️ PERFIL`, description: ``, rowId: `${usedPrefix}perfil | profile`},
    {title: `⚗️ MYNS`, description: ``, rowId: `${usedPrefix}myns`},
    {title: `⚗️ UNREG`, description: ``, rowId: `${usedPrefix}unreg *numero de serie*`},
    {title: `⚗️ MINAR DIAMANTES`, description: ``, rowId: `${usedPrefix}minardiamantes | minargemas`},
    {title: `⚗️ MINAR AMXCOINS`, description: ``, rowId: `${usedPrefix}minaramxcoins | minarcoins`},
    {title: `⚗️ MINAR EXPERIENCIA`, description: ``, rowId: `${usedPrefix}minarexperiencia | minarexp`},
    {title: `⚗️ MINAR`, description: ``, rowId: `${usedPrefix}minar *:* minar2 *:* minar3`},
    {title: `⚗️ RECLAMAR`, description: ``, rowId: `${usedPrefix}reclamar | regalo | claim`},
    {title: `⚗️ CADA HORA`, description: ``, rowId: `${usedPrefix}cadahora | hourly`},
    {title: `⚗️ CADA SEMANA`, description: ``, rowId: `${usedPrefix}cadasemana | semanal | weekly`},
    {title: `⚗️ CADA MES`, description: ``, rowId: `${usedPrefix}cadames | mes | monthly`},
    {title: `⚗️ COFRE`, description: ``, rowId: `${usedPrefix}cofre | abrircofre | coffer`},
    {title: `⚗️ TRABAJAR`, description: ``, rowId: `${usedPrefix}trabajar | work`}
    ]}, ]
    let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS DE ROL PARA GRUPOS\n✨${userm}✨\nAsi que: Compra, Adquiere Recuersos, Mejora Tú Nivel y Rango!!`
    const listMessage = {
    text: resp,
    footer: `${wm}`,
    title: `*RPG, LIMITES Y ECONOMIA ${wm}*\npowered by\n*${igfg}*`,
    buttonText: "*SELECCIONE AQUÍ*",
    mentions: conn.parseMention(resp),
    sections }
    
    await delay(1 * 1000)
    await conn.sendMessage(m.chat, listMessage, {quoted: estado}, { ephemeralExpiration: 1 * 1000 })
    await delay(1 * 1000)
    await conn.sendFile(m.chat, vn, `../media/menu.mp3`, null, m, true, { type: `audioMessage`, ptt: true})
    
} catch {
let str = `
${gt} ESTE ES EL MENU DE LOS COMANDOS DE ROL PARA GRUPOS\n✨${userm}✨\nAsi que: Compra, Adquiere Recuersos, Mejora Tú Nivel y Rango!!

*📅 FECHA: ${week}, ${date}*
*📈 TIEMPO ACTIVO: ${uptime}*
*📊 USUARIOS: ${rtotalreg}*

┣ ඬ⃟ 💵 _${usedPrefix}transfer *<tipo> <cantidad> <@tag>*_
┣ ඬ⃟ 💵 _${usedPrefix}balance_
┣ ඬ⃟ 💵 _${usedPrefix}claim_
┣ ඬ⃟ 💵 _${usedPrefix}lb_
┣ ඬ⃟ 💵 _${usedPrefix}levelup_
┣ ඬ⃟ 💵 _${usedPrefix}myns_
┣ ඬ⃟ 💵 _${usedPrefix}perfil_
┣ ඬ⃟ 💵 _${usedPrefix}work_
┣ ඬ⃟ 💵 _${usedPrefix}minar_
┣ ඬ⃟ 💵 _${usedPrefix}buy_
┣ ඬ⃟ 💵 _${usedPrefix}buyall_
┣ ඬ⃟ 💵 _${usedPrefix}verificar_
┣ ඬ⃟ 💵 _${usedPrefix}unreg *<numero de serie>*_
`  
let buttons = [
{ buttonId: `${usedPrefix}donar`, buttonText: { displayText: `📮 𝙳𝙾𝙽𝙰𝚁 📮` }, type: 1 },
//{ buttonId: `${usedPrefix}terminosycondiciones`, buttonText: { displayText: `📋 𝚃𝙴𝚁𝙼𝙸𝙽𝙾𝚂 𝚈 𝙲𝙾𝙽𝙳𝙸𝙲𝙸𝙾𝙽𝙴𝚂 📋` }, type: 1 }]
{ buttonId: `${usedPrefix}infobot`, buttonText: { displayText: `🐾 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 🐾` }, type: 1 }]
let buttonMessage = {
image: pp,
caption: str.trim(),
mentions: [m.sender],
footer: `*${wm}*`,
buttons: buttons,
headerType: 4,
contextInfo: {
mentionedJid: [m.sender],
externalAdReply: {
showAdAttribution: true,
mediaType: `VIDEO`,
mediaUrl: null,
title: igfg,
body: null,
thumbnail: img,
sourceUrl: paypal
}}}
conn.sendMessage(m.chat, buttonMessage, { quoted: m })
await conn.sendFile(m.chat, vn, `menu.mp3`, null, m, true, { type: `audioMessage`, ptt: true})
}
break
//solo mayores de 18 (requiere registro)

case `nsfw`:
  try {
  if (!db.data.chats[m.chat].modohorny && m.isGroup) throw `*[❗INFO❗] LOS COMANDOS +18 ESTAN DESACTIVADOS EN ESTE GRUPO, SI ES ADMIN Y DESEA ACTIVARLOS USE EL COMANDO ${usedPrefix}enable modohorny*`
  const sections = [
    {
    title: `*LISTA PUERCA🐷`,
    rows: [
    {title: `🔞 PACK`, description: `Comando: ${usedPrefix}pack `, rowId: `${usedPrefix}pack`},
    {title: `🔞 PACK2`, description: `Comando: ${usedPrefix}pack2 `, rowId: `${usedPrefix}pack2`},
    {title: `🔞 PACK3`, description: `Comando: ${usedPrefix}pack3 `, rowId: `${usedPrefix}pack3`},
    {title: `🔞 VIDEO XXX`, description: `Comando: ${usedPrefix}videoxxx `, rowId: `${usedPrefix}videoxxx`},
    {title: `🔞 TETAS`, description: `Comando: ${usedPrefix}tetas `, rowId: `${usedPrefix}tetas`},
    {title: `🔞 BOOTY`, description: `Comando: ${usedPrefix}booty `, rowId: `${usedPrefix}booty`},
    {title: `🔞 ECCHI`, description: `Comando: ${usedPrefix}ecchi `, rowId: `${usedPrefix}ecchi`},
    {title: `🔞 FURRO`, description: `Comando: ${usedPrefix}furro `, rowId: `${usedPrefix}furro`},
    {title: `🔞 IMAGEN LESBIANS`, description: `Comando: ${usedPrefix}imagenlesbians `, rowId: `${usedPrefix}imagenlesbians`},
    {title: `🔞 PANTIES`, description: `Comando: ${usedPrefix}panties `, rowId: `${usedPrefix}panties`},
    {title: `🔞 PENE`, description: `Comando: ${usedPrefix}pene `, rowId: `${usedPrefix}pene`},
    {title: `🔞 PORNO`, description: `Comando: ${usedPrefix}porno `, rowId: `${usedPrefix}porno`},
    {title: `🔞 PORNO2`, description: `Comando: ${usedPrefix}porno2 `, rowId: `${usedPrefix}porno2`},
    {title: `🔞 RANDOM XXX`, description: `Comando: ${usedPrefix}randomxxx `, rowId: `${usedPrefix}randomxxx`},
    {title: `🔞 PECHOS`, description: `Comando: ${usedPrefix}pechos `, rowId: `${usedPrefix}pechos`},
    {title: `🔞 YAOI`, description: `Comando: ${usedPrefix}yaoi `, rowId: `${usedPrefix}yaoi`},
    {title: `🔞 YAOI2`, description: `Comando: ${usedPrefix}yaoi2 `, rowId: `${usedPrefix}yaoi2`},
    {title: `🔞 YURI`, description: `Comando: ${usedPrefix}yuri `, rowId: `${usedPrefix}yuri`},
    {title: `🔞 YURI2`, description: `Comando: ${usedPrefix}yuri2 `, rowId: `${usedPrefix}yuri2`},
    {title: `🔞 TRAPITO`, description: `Comando: ${usedPrefix}trapito `, rowId: `${usedPrefix}trapito`},
    {title: `🔞 HENTAI`, description: `Comando: ${usedPrefix}hentai `, rowId: `${usedPrefix}hentai`},
    {title: `🔞 PIES`, description: `Comando: ${usedPrefix}pies `, rowId: `${usedPrefix}pies`},
    {title: `🔞 NSFW LOLI`, description: `Comando: ${usedPrefix}nsfwloli `, rowId: `${usedPrefix}nsfwloli`},
    {title: `🔞 NSFW ORGY`, description: `Comando: ${usedPrefix}nsfworgy `, rowId: `${usedPrefix}nsfworgy`},
    {title: `🔞 NSFW FOOT`, description: `Comando: ${usedPrefix}nsfwfoot `, rowId: `${usedPrefix}nsfwfoot`},
    {title: `🔞 NSFW ASS`, description: `Comando: ${usedPrefix}nsfwass `, rowId: `${usedPrefix}nsfwass`},
    {title: `🔞 NSFW BDSM`, description: `Comando: ${usedPrefix}nsfwbdsm `, rowId: `${usedPrefix}nsfwbdsm`},
    {title: `🔞 NSFW CUM`, description: `Comando: ${usedPrefix}nsfwcum `, rowId: `${usedPrefix}nsfwcum`},
    {title: `🔞 NSFWERO`, description: `Comando: ${usedPrefix}nsfwero `, rowId: `${usedPrefix}nsfwero`},
    {title: `🔞 NSFWFEMDOM`, description: `Comando: ${usedPrefix}nsfwfemdom `, rowId: `${usedPrefix}nsfwfemdom`},
    {title: `🔞 NSFW GLASS`, description: `Comando: ${usedPrefix}nsfwglass `, rowId: `${usedPrefix}nsfwglass`},
    ]}, ]
    let resp = `${gt} ✨${userm}✨(PUERCO🐽) ESTE ES EL MENU DE LOS COMANDOS +18`
    const listMessage = {
      text: resp,
    footer: `${wm}`,
    title: `*COMANDOS +18 ${wm}*\npowered by\n*${igfg}*`,
    buttonText: "*SELECCIONE AQUÍ*",
    mentions: conn.parseMention(resp),
    sections }
    
    await delay(1 * 1000)
    await conn.sendMessage(m.chat, listMessage, {quoted: estado}, { ephemeralExpiration: 1 * 1000 })
    await delay(1 * 1000)
    await conn.sendFile(m.chat, vn, `../media/menu.mp3`, null, m, true, {type: `audioMessage`, ptt: true, ephemeralExpiration: 1 * 1000 })
    handler.register = true
    handler.modohorny = true
    
} catch {
  let str = `
  ${gt} ✨${userm}✨(PUERCO🐽) ESTE ES EL MENU DE LOS COMANDOS +18
  *📅 FECHA: ${week}, ${date}*
  *📈 TIEMPO ACTIVO: ${uptime}*
  *📊 USUARIOS: ${rtotalreg}*

  ┣ ඬ⃟ 🔞 _${usedPrefix}pack_
┣ ඬ⃟ 🔞 _${usedPrefix}pack2_
┣ ඬ⃟ 🔞 _${usedPrefix}pack3_
┣ ඬ⃟ 🔞 _${usedPrefix}videoxxx_
┣ ඬ⃟ 🔞 _${usedPrefix}videolesbixxx_
┣ ඬ⃟ 🔞 _${usedPrefix}tiktokxxx_
┣ ඬ⃟ 🔞 _${usedPrefix}tetas_
┣ ඬ⃟ 🔞 _${usedPrefix}booty_
┣ ඬ⃟ 🔞 _${usedPrefix}ecchi_
┣ ඬ⃟ 🔞 _${usedPrefix}furro_
┣ ඬ⃟ 🔞 _${usedPrefix}imagenlesbians_
┣ ඬ⃟ 🔞 _${usedPrefix}panties_
┣ ඬ⃟ 🔞 _${usedPrefix}pene_
┣ ඬ⃟ 🔞 _${usedPrefix}porno_
┣ ඬ⃟ 🔞 _${usedPrefix}randomxxx_
┣ ඬ⃟ 🔞 _${usedPrefix}pechos_
┣ ඬ⃟ 🔞 _${usedPrefix}yaoi_
┣ ඬ⃟ 🔞 _${usedPrefix}yaoi2_
┣ ඬ⃟ 🔞 _${usedPrefix}yuri_
┣ ඬ⃟ 🔞 _${usedPrefix}yuri2_
┣ ඬ⃟ 🔞 _${usedPrefix}trapito_
┣ ඬ⃟ 🔞 _${usedPrefix}hentai_
┣ ඬ⃟ 🔞 _${usedPrefix}nsfwloli_
┣ ඬ⃟ 🔞 _${usedPrefix}nsfworgy_
┣ ඬ⃟ 🔞 _${usedPrefix}nsfwfoot_
┣ ඬ⃟ 🔞 _${usedPrefix}nsfwass_
┣ ඬ⃟ 🔞 _${usedPrefix}nsfwbdsm_
┣ ඬ⃟ 🔞 _${usedPrefix}nsfwcum_
┣ ඬ⃟ 🔞 _${usedPrefix}nsfwero_
┣ ඬ⃟ 🔞 _${usedPrefix}nsfwfemdom_
┣ ඬ⃟ 🔞 _${usedPrefix}nsfwglass_
`  
let buttons = [
  { buttonId: `${usedPrefix}donar`, buttonText: { displayText: `📮 𝙳𝙾𝙽𝙰𝚁 📮` }, type: 1 },
  //{ buttonId: `${usedPrefix}terminosycondiciones`, buttonText: { displayText: `📋 𝚃𝙴𝚁𝙼𝙸𝙽𝙾𝚂 𝚈 𝙲𝙾𝙽𝙳𝙸𝙲𝙸𝙾𝙽𝙴𝚂 📋` }, type: 1 }]
  { buttonId: `${usedPrefix}infobot`, buttonText: { displayText: `🐾 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 🐾` }, type: 1 }]
  let buttonMessage = {
  image: pp,
  caption: str.trim(),
  mentions: [m.sender],
  footer: `*${wm}*`,
  buttons: buttons,
  headerType: 4,
  contextInfo: {
  mentionedJid: [m.sender],
  externalAdReply: {
  showAdAttribution: true,
  mediaType: `VIDEO`,
  mediaUrl: null,
  title: igfg,
  body: null,
  thumbnail: img,
  sourceUrl: paypal
  }}}
  conn.sendMessage(m.chat, buttonMessage, { quoted: m })
  await conn.sendFile(m.chat, vn, `menu.mp3`, null, m, true, { type: `audioMessage`, ptt: true})
}
break
//Stickers

case `stickermenu`:
  try {
  const sections = [
    {
    title: `*LISTA DE OPCIONES*`,
    rows: [
    {title: `🌠 STICKER`, description: `Comando: ${usedPrefix}sticker <responder a imagen o video> o <enlace / link / url>`, rowId: `${usedPrefix}sticker`},
    {title: `🌠 S`, description: `Comando: ${usedPrefix}s <responder a imagen o video> o <enlace / link / url>`, rowId: `${usedPrefix}s`},
    {title: `🌠 SFULL`, description: `Comando: ${usedPrefix}sfull <responder a imagen o video>`, rowId: `${usedPrefix}sfull`},
    {title: `🌠 EMOJIMIX`, description: `Comando: ${usedPrefix}emojimix <emoji 1>&<emoji 2>`, rowId: `${usedPrefix}emojimix`},
    {title: `🌠 SCIRCLE`, description: `Comando: ${usedPrefix}scircle <responder a imagen>`, rowId: `${usedPrefix}scircle`},
    {title: `🌠 SREMOVEBG`, description: `Comando: ${usedPrefix}sremovebg <responder a imagen>`, rowId: `${usedPrefix}sremovebg`},
    {title: `🌠 SEMOJI`, description: `Comando: ${usedPrefix}semoji <tipo> <emoji>`, rowId: `${usedPrefix}semoji`},
    {title: `🌠 ATTP`, description: `Comando: ${usedPrefix}attp <texto>`, rowId: `${usedPrefix}attp`},
    {title: `🌠 ATTP2`, description: `Comando: ${usedPrefix}attp2 <texto>`, rowId: `${usedPrefix}attp2`},
    {title: `🌠 ATTP3`, description: `Comando: ${usedPrefix}attp3 <texto>`, rowId: `${usedPrefix}attp3`},
    {title: `🌠 TTP`, description: `Comando: ${usedPrefix}ttp <texto>`, rowId: `${usedPrefix}ttp`},
    {title: `🌠 TTP2`, description: `Comando: ${usedPrefix}ttp2 <texto>`, rowId: `${usedPrefix}ttp2`},
    {title: `🌠 TTP3`, description: `Comando: ${usedPrefix}ttp3 <texto>`, rowId: `${usedPrefix}ttp3`},
    {title: `🌠 TTP4`, description: `Comando: ${usedPrefix}ttp4 <texto>`, rowId: `${usedPrefix}ttp4`},
    {title: `🌠 TTP5`, description: `Comando: ${usedPrefix}ttp5 <texto>`, rowId: `${usedPrefix}ttp5`},
    {title: `🌠 PAT`, description: `Comando: ${usedPrefix}pat <@tag>`, rowId: `${usedPrefix}pat`},
    {title: `🌠 SLAP`, description: `Comando: ${usedPrefix}slap <@tag>`, rowId: `${usedPrefix}slap`},
    {title: `🌠 KISS`, description: `Comando: ${usedPrefix}kiss <@tag>`, rowId: `${usedPrefix}kiss`},
    {title: `🌠 DADO`, description: `Comando: ${usedPrefix}dado`, rowId: `${usedPrefix}dado`},
    {title: `🌠 WM`, description: `Comando: ${usedPrefix}wm <packname> <author>`, rowId: `${usedPrefix}wm`},
    {title: `🌠 STICKERMARKER`, description: `Comando: ${usedPrefix}stickermarker <efecto> <responder a imagen>`, rowId: `${usedPrefix}stickermarker`},
    {title: `🌠 STICKERFILTER`, description: `Comando: ${usedPrefix}stickerfilter <efecto> <responder a imagen>`, rowId: `${usedPrefix}stickerfilter`} 
    ]}, ]
    let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS PARA HACER STICKERS\n✨${userm}✨`
    const listMessage = {
    text: resp,
    footer: `${wm}`,
    title: `*STICKERS ${wm}*\npowered by\n*${igfg}*`,
    buttonText: "*SELECCIONE AQUÍ*",
    mentions: conn.parseMention(resp),
    sections }
    
    await delay(1 * 1000)
    await conn.sendMessage(m.chat, listMessage, {quoted: estado}, { ephemeralExpiration: 1 * 1000 })
    await delay(1 * 1000)
    try {
      let vn = `./media/menu.mp3`
      let str = `por si quieres mas info`.trim()
      conn.sendButton(m.chat, str, wm, null,  [[`💎 GRUPOS OFICIALES 💎`, `/grupos`], [`🤴 OWNER 🤴`, `/owner`], [`🔰 INFOBOT 🔰`, `/infobot`] ], m,) 
      await delay(1 * 1000)
      await conn.sendFile(m.chat, vn, `../media/menu.mp3`, null, m, true, {type: `audioMessage`, ptt: true, ephemeralExpiration: 1 * 1000 })
    } catch (e) {
    conn.reply(m.chat, `*[❗INFO❗] EL MENU TIENE UN ERROR Y NO FUE POSIBLE ENVIARLO, REPORTELO AL PROPIETARIO DEL BOT*`, m)
    throw e
    }
} catch {
  let str = `
  ${gt} ESTE ES EL MENU DE LOS COMANDOS PARA HACER STICKERS\n✨${userm}✨
  *📅 FECHA: ${week}, ${date}*
  *📈 TIEMPO ACTIVO: ${uptime}*
  *📊 USUARIOS: ${rtotalreg}*

  ┣ ඬ⃟ 👽 _${usedPrefix}sticker *<responder a imagen o video>*_
  ┣ ඬ⃟ 👽 _${usedPrefix}sticker *<enlace / link / url>*_
  ┣ ඬ⃟ 👽 _${usedPrefix}s *<responder a imagen o video>*_
  ┣ ඬ⃟ 👽 _${usedPrefix}s *<enlace / link / url>*_
  ┣ ඬ⃟ 👽 _${usedPrefix}sfull *<imagen o video>*_
  ┣ ඬ⃟ 👽 _${usedPrefix}emojimix *<emoji 1>&<emoji 2>*_
  ┣ ඬ⃟ 👽 _${usedPrefix}scircle *<imagen>*_
  ┣ ඬ⃟ 👽 _${usedPrefix}sremovebg *<imagen>*_
  ┣ ඬ⃟ 👽 _${usedPrefix}semoji *<tipo> <emoji>*_
  ┣ ඬ⃟ 👽 _${usedPrefix}attp *<texto>*_
  ┣ ඬ⃟ 👽 _${usedPrefix}attp2 *<texto>*_
  ┣ ඬ⃟ 👽 _${usedPrefix}attp3 *<texto>*_
  ┣ ඬ⃟ 👽 _${usedPrefix}ttp *<texto>*_
  ┣ ඬ⃟ 👽 _${usedPrefix}ttp2 *<texto>*_
  ┣ ඬ⃟ 👽 _${usedPrefix}ttp3 *<texto>*_
  ┣ ඬ⃟ 👽 _${usedPrefix}ttp4 *<texto>*_
  ┣ ඬ⃟ 👽 _${usedPrefix}ttp5 *<texto>*_
  ┣ ඬ⃟ 👽 _${usedPrefix}pat *<@tag>*_
  ┣ ඬ⃟ 👽 _${usedPrefix}slap *<@tag>*_
  ┣ ඬ⃟ 👽 _${usedPrefix}kiss *<@tag>*_
  ┣ ඬ⃟ 👽 _${usedPrefix}dado_
  ┣ ඬ⃟ 👽 _${usedPrefix}wm *<packname> <author>*_
  ┣ ඬ⃟ 👽 _${usedPrefix}stickermarker *<efecto> <imagen>*_
  ┣ ඬ⃟ 👽 _${usedPrefix}stickerfilter *<efecto> <imagen>*_
`  
let buttons = [
  { buttonId: `${usedPrefix}donar`, buttonText: { displayText: `📮 𝙳𝙾𝙽𝙰𝚁 📮` }, type: 1 },
  //{ buttonId: `${usedPrefix}terminosycondiciones`, buttonText: { displayText: `📋 𝚃𝙴𝚁𝙼𝙸𝙽𝙾𝚂 𝚈 𝙲𝙾𝙽𝙳𝙸𝙲𝙸𝙾𝙽𝙴𝚂 📋` }, type: 1 }]
  { buttonId: `${usedPrefix}infobot`, buttonText: { displayText: `🐾 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 🐾` }, type: 1 }]
  let buttonMessage = {
  image: pp,
  caption: str.trim(),
  mentions: [m.sender],
  footer: `*${wm}*`,
  buttons: buttons,
  headerType: 4,
  contextInfo: {
  mentionedJid: [m.sender],
  externalAdReply: {
  showAdAttribution: true,
  mediaType: `VIDEO`,
  mediaUrl: null,
  title: igfg,
  body: null,
  thumbnail: img,
  sourceUrl: paypal
  }}}
  conn.sendMessage(m.chat, buttonMessage, { quoted: m })
  await conn.sendFile(m.chat, vn, `menu.mp3`, null, m, true, { type: `audioMessage`, ptt: true})
}
break
//Youtube opciones

case `youtube`:
  try {
  const sections = [
    {
    title: `*LISTA DE OPCIONES*`,
    rows: [
    {title: `📥 Youtube AUDIO`, description: `Use el Comando: ${usedPrefix}ytmp3 + enlace`, rowId: `${usedPrefix}ytmp3`},
    {title: `📥 Youtube VIDEO`, description: `Use el Comando: ${usedPrefix}ytmp4 + enlace`, rowId: `${usedPrefix}ytmp4`},
    {title: `📥 Youtube AUDIO (force)`, description: `Use el Comando: ${usedPrefix}ytmp3doc + enlace`, rowId: `${usedPrefix}ytmp3doc`},
    {title: `📥 Youtube VIDEO (force)`, description: `Use el Comando: ${usedPrefix}ytmp4doc + enlace`, rowId: `${usedPrefix}ytmp4doc`},   
    
    ]}, ]
    let resp = `${c} ESTE ES EL MENU DE LOS COMANDOS DE YOUTUBE\n✨${userm}✨\npowered by\n*${igfg}*
    
    *📅 ${gt} Fecha: ${week}, ${date}*
    *📈 Tiempo activo: ${gt}: ${uptime}*
    *📊 Registrados: ${rtotalreg}*`
    const listMessage = {
    text: resp,
    footer: `${wm}`,
    title: `*YOUTUBE ${wm}*`,
    buttonText: "*SELECCIONE AQUÍ*",
    mentions: conn.parseMention(resp),
    sections }
    
    await delay(1 * 1000)
    await conn.sendMessage(m.chat, listMessage, {quoted: estado}, { ephemeralExpiration: 1 * 1000 })
    await delay(1 * 1000)
    await conn.sendFile(m.chat, vn, `../media/menu.mp3`, null, m, true, {type: `audioMessage`, ptt: true, ephemeralExpiration: 1 * 1000 })
} catch {
  let str = `
  ${gt} ESTE ES EL MENU DE LOS COMANDOS DE YOUTUBE\n✨${userm}✨\npowered by\n*${igfg}*
  *📅 FECHA: ${week}, ${date}*
  *📈 TIEMPO ACTIVO: ${uptime}*
  *📊 USUARIOS: ${rtotalreg}*

  ┣ ඬ⃟ 📥 _${usedPrefix}ytmp3 *<enlace / link / url>*_
  ┣ ඬ⃟ 📥 _${usedPrefix}ytmp4 *<enlace / link / url>*_
  ┣ ඬ⃟ 📥 _${usedPrefix}ytmp3doc *<enlace / link / url>*_
  ┣ ඬ⃟ 📥 _${usedPrefix}ytmp4doc *<enlace / link / url>*_
`  
let buttons = [
  { buttonId: `${usedPrefix}donar`, buttonText: { displayText: `📮 𝙳𝙾𝙽𝙰𝚁 📮` }, type: 1 },
  //{ buttonId: `${usedPrefix}terminosycondiciones`, buttonText: { displayText: `📋 𝚃𝙴𝚁𝙼𝙸𝙽𝙾𝚂 𝚈 𝙲𝙾𝙽𝙳𝙸𝙲𝙸𝙾𝙽𝙴𝚂 📋` }, type: 1 }]
  { buttonId: `${usedPrefix}infobot`, buttonText: { displayText: `🐾 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 🐾` }, type: 1 }]
  let buttonMessage = {
  image: pp,
  caption: str.trim(),
  mentions: [m.sender],
  footer: `*${wm}*`,
  buttons: buttons,
  headerType: 4,
  contextInfo: {
  mentionedJid: [m.sender],
  externalAdReply: {
  showAdAttribution: true,
  mediaType: `VIDEO`,
  mediaUrl: null,
  title: igfg,
  body: null,
  thumbnail: img,
  sourceUrl: paypal
  }}}
  conn.sendMessage(m.chat, buttonMessage, { quoted: m })
  await conn.sendFile(m.chat, vn, `menu.mp3`, null, m, true, { type: `audioMessage`, ptt: true})
}

break
default:
break;
} 
}

handler.help = [`menu integrado`]
handler.tags = [`menus`]
handler.command = [`asistente`, `audioefect`, `audios`, `buscar`, `cajafuerte`, `chatanonimo`, `convert`, `descargas`, `gadmin`, `herramientas`, `infoyo`, `juegos`, `logosefectos`, `menu`, `owners`, `random`, `rpg`, `nsfw`, `stickermenu`, `youtube`]
export default handler
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function clockString(ms) {
    let h = isNaN(ms) ? `--` : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? `--` : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? `--` : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(`:`)
  }