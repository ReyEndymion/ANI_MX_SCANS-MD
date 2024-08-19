//Integracion de menus (objetivo en reduccion del 50% de los archivos de la carpeta plugins)

//idea y arreglos Rey Endymion

import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import { promises } from 'fs'
import fs from 'fs'
import { join } from 'path'
import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } from '@whiskeysockets/baileys'
//import handler from './handler.js'usedPrefix: _p, 
let handler = async (m, { conn, usedPrefix, __dirname, text, command, args, isOwner, isAdmin, isROwner }) => {
const bot = global.db.data.bot[conn.user.jid] || {}
const chats = bot.chats || {}
const privs = chats.privs || {}
const groups = chats.groups || {}
const inDBChat = m.isGroup ? groups : privs
const chat = m.isGroup ? groups[m.chat] || {} : privs[m.chats] || {}
const users = m.isGroup ? chat.users || {} : privs || {}
const user = m.isGroup ? users[m.sender] || {} : privs[m.sender]
let vn = `./media/audios/menu.mp3`
let img = imagen4
let pp = await prepareWAMessageMedia({ image: imagen1}, { upload: conn.waUploadToServer })
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender 
let mentionedJid = [who]
let userm =`@${who.split(`@s.whatsapp.net`)[0]}` && `@${who.replace(/@.+/, '')}`
let userg =await conn.getName(m.chat)
let estado = {key: {participant: who, remoteJid: who}, message: {groupInviteMessage: {groupJid: "1234567890-9876543210@g.us", inviteCode: `\n`, groupName: `\n`, caption: `${userg}\n${usedPrefix + command}\n${igfg}`, jpegThumbnail: pp}}}
let locale = `es`
let d = new Date(new Date + 3600000)
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
wm = global.wm
let _package = JSON.parse(await promises.readFile(join(__dirname, `../package.json`)).catch(_ => ({}))) || {}
let { exp, limit, level, role } = users[m.sender]
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
let totalreg = Object.keys(users).length
let rtotalreg = Object.values(users).filter(user => user.registered == true).length
let replace = {
'%': '%',
uptime, muptime,
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
//text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, `g`), (_, name) => '' + replace[name])
let { money, joincount } = users[m.sender]

//Asistente de grupos
switch (command) {
case `asistente`:
try {
const sections = [
{
title: `*ACTIVAR O DESACTIVAR LOS ASISTENTES DE GRUPO*`,
rows: [
{title: `☑️ enable asistente`, description: `Comando: ${usedPrefix}enable`, id: `${usedPrefix}enable asistente`},
{title: `☑️ disable asistente`, description: `Comando: ${usedPrefix}disable`, id: `${usedPrefix}disable asistente`},
{title: `☑️ enable gruposRol`, description: `Comando: ${usedPrefix}enable gruposRol `, id: `${usedPrefix}enable gruposRol`},
{title: `☑️ disable gruposRol`, description: `Comando: ${usedPrefix}disable gruposRol `, id: `${usedPrefix}disable gruposRol`},
{title: `☑️ enable adminsot`, description: `Comando: ${usedPrefix}enable adminsot `, id: `${usedPrefix}enable adminsot`},
{title: `☑️ disable adminsot`, description: `Comando: ${usedPrefix}disable adminsot `, id: `${usedPrefix}disable adminsot`},
{title: `☑️ enable modocomedia`, description: `Comando: ${usedPrefix}enable modocomedia `, id: `${usedPrefix}enable modocomedia`},
{title: `☑️ disable modocomedia`, description: `Comando: ${usedPrefix}disable modocomedia `, id: `${usedPrefix}disable modocomedia`},
{title: `☑️ enable capciosa`, description: `Comando: ${usedPrefix}enable capciosa `, id: `${usedPrefix}enable capciosa`},
{title: `☑️ disable capciosa`, description: `Comando: ${usedPrefix}disable capciosa `, id: `${usedPrefix}disable capciosa`},
{title: `☑️ enable stickers`, description: `Comando: ${usedPrefix}enable stickers `, id: `${usedPrefix}enable stickers`},
{title: `☑️ disable stickers`, description: `Comando: ${usedPrefix}disable stickers `, id: `${usedPrefix}disable stickers`}
]}, ]
let resp = `${gt} ESTE ES EL MENU DE DEL ASISTENTE DE GRUPOS\n✨${userm}✨`
let title = `*ASISTENTES DE GRUPO ${wm}*\npowered by\n*${igfg}*`
const listMessage = {
body: {text: resp},
header: {
title, 
hasMediaAttachment: true,
imageMessage: pp.imageMessage,
},
nativeFlowMessage: {
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: "SELECCIONE AQUÍ",
sections
})
}
],
messageParamsJson: ''
},
contextInfo: {
mentionedJid: conn.parseMention(resp)
},
sections,
footer: {text: `${wm}`},
}

await delay(1 * 1000)
await conn.sendMessageList(m.chat, listMessage, estado)
await delay(1 * 1000)
return conn.sendAudioRecording(m.chat, vn, m)} catch {
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
//{index: 2, callButton: {displayText: `🌹 CONTACTO 🌹`, phoneNumber: `wa.me/5215517489568`}},
{index: 3, quickReplyButton: {displayText: `📮 DONAR 📮`, id: `/donasi`}},
{index: 4, quickReplyButton: {displayText: `🌹 OWNER 🌹`, id: `/owner`}},
{index: 5, quickReplyButton: {displayText: `🐾 INFOBOT 🐾`, id: `/infobot`}},
]
let title = `*COMANDOS DE LA CAJA FUERTE ${wm}*\npowered by\n*${igfg}*`
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
//}

}

await delay(1 * 1000)
const thumb = global.imagen1;
await conn.sendMessage(m.chat, listMessage, {quoted: m, thumbnail: thumb})

return conn.sendAudioRecording(m.chat, vn, m)}

break
//efectos de audio

case `audioefect`:
try {
 const sections = [
{
title: `*LISTA DE OPCIONES*`,
rows: [
{title: `🎤 BASS`, description: `responde a un audio o nota de voz con ${usedPrefix}bass`, id: `${usedPrefix}bass`},
{title: `🎤 BLOWN`, description: `responde a un audio o nota de voz con ${usedPrefix}blown`, id: `${usedPrefix}blown`},
{title: `🎤 DEEP`, description: `responde a un audio o nota de voz con ${usedPrefix}deep`, id: `${usedPrefix}deep`},
{title: `🎤 EARRAPE`, description: `responde a un audio o nota de voz con ${usedPrefix}earrape`, id: `${usedPrefix}earrape`}, 
{title: `🎤 FAST`, description: `responde a un audio o nota de voz con ${usedPrefix}fast`, id: `${usedPrefix}fast`},
{title: `🎤 FAT`, description: `responde a un audio o nota de voz con ${usedPrefix}fat`, id: `${usedPrefix}fat`},
{title: `🎤 NIGHTCORE`, description: `responde a un audio o nota de voz con ${usedPrefix}nightcore`, id: `${usedPrefix}nightcore`},
{title: `🎤 REVERSE`, description: `responde a un audio o nota de voz con ${usedPrefix}reverse`, id: `${usedPrefix}reverse`},
{title: `🎤 ROBOT`, description: `responde a un audio o nota de voz con ${usedPrefix}robot`, id: `${usedPrefix}robot`}, 
{title: `🎤 SLOW`, description: `responde a un audio o nota de voz con ${usedPrefix}slow`, id: `${usedPrefix}slow`},
{title: `🎤 SMOOTH`, description: `responde a un audio o nota de voz con ${usedPrefix}smooth`, id: `${usedPrefix}smooth`}, 
{title: `🎤 TUPAI`, description: `responde a un audio o nota de voz con ${usedPrefix}tupai`, id: `${usedPrefix}tupai`},
]}, ]
let resp =`${gt} ESTE ES EL MENU DE LOS EFECTOS DE AUDIO\n✨${userm}✨*`
let title = `*EFECTOS DE AUDIOS ${wm}*\npowered by\n*${igfg}*`
const listMessage = {
body: {text: resp},
header: {
title, 
hasMediaAttachment: true,
imageMessage: pp.imageMessage,
},
nativeFlowMessage: {
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: "SELECCIONE AQUÍ",
sections
})
}
],
messageParamsJson: ''
},
contextInfo: {
mentionedJid: conn.parseMention(resp)
},
sections,
footer: {text: `${wm}`},
}

await delay(1 * 1000)
await conn.sendMessageList(m.chat, listMessage, estado)
await delay(1 * 1000)
return conn.sendAudioRecording(m.chat, vn, m) 

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
{title: `🔊 Quien es tu sempai botsito 7w7`, id: `Quien es tu sempai botsito 7w7`},
{title: `🔊 Te diagnostico con gay`, id: `Te diagnostico con gay`},
{title: `🔊 A nadie le importa`, id: `A nadie le importa`},
{title: `🔊 Fiesta del admin`, id: `Fiesta del admin`}, 
{title: `🔊 Fiesta del administrador`, id: `Fiesta del administrador`},
{title: `🔊 Vivan los novios`, id: `Vivan los novios`},
{title: `🔊 Feliz cumpleaños`, id: `Feliz cumpleaños`},
{title: `🔊 Noche de paz`, id: `Noche de paz`},
{title: `🔊 Buenos dias`, id: `Buenos dias`},
{title: `🔊 Buenos tardes`, id: `Buenos tardes`},
{title: `🔊 Buenos noches`, id: `Buenos noches`},
{title: `🔊 Audio hentai`, id: `Audio hentai`},
{title: `🔊 Chica lgante`, id: `Chica lgante`},
{title: `🔊 Feliz navidad`, id: `Feliz navidad`},
{title: `🔊 Vete a la vrg`, id: `Vete a la vrg`},
{title: `🔊 Pasa pack Bot`, id: `Pasa pack Bot`},
{title: `🔊 Atencion grupo`, id: `Atencion grupo`},
{title: `🔊 Marica quien`, id: `Marica quien`},
{title: `🔊 Murio el grupo`, id: `Murio el grupo`},
{title: `🔊 Oh me vengo`, id: `Oh me vengo`},
{title: `🔊 tio que rico`, id: `tio que rico`},
{title: `🔊 Viernes`, id: `Viernes`},
{title: `🔊 Baneado`, id: `Baneado`},
{title: `🔊 Sexo`, id: `Sexo`},
{title: `🔊 Hola`, id: `Hola`},
{title: `🔊 Un pato`, id: `Un pato`},
{title: `🔊 Nyanpasu`, id: `Nyanpasu`},
{title: `🔊 Te amo`, id: `Te amo`},
{title: `🔊 Yamete`, id: `Yamete`},
{title: `🔊 Bañate`, id: `Bañate`},
{title: `🔊 Es puto`, id: `Es puto`},
{title: `🔊 La biblia`, id: `La biblia`},
{title: `🔊 Onichan`, id: `Onichan`},
{title: `🔊 Mierda de Bot`, id: `Mierda de Bot`},
{title: `🔊 Siuuu`, id: `Siuuu`},
{title: `🔊 Epico`, id: `Epico`},
{title: `🔊 Shitpost`, id: `Shitpost`},
{title: `🔊 Rawr`, id: `Rawr`},
{title: `🔊 UwU`, id: `UwU`},
{title: `🔊 :c`, id: `:c`},
{title: `🔊 a`, id: `a`} 
]}, ]
let resp = `${gt} ✨${userm}✨ESTE ES EL MENU DE los audios predeterminados del Bot`
let title = `audios predeterminados del Bot`
const listMessage = {
body: {text: resp},
header: {
title, 
hasMediaAttachment: true,
imageMessage: pp.imageMessage,
},
nativeFlowMessage: {
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: "SELECCIONE AQUÍ",
sections
})
}
],
messageParamsJson: ''
},
contextInfo: {
mentionedJid: conn.parseMention(resp)
},
sections,
footer: {text: `${wm}`},
}

await delay(1 * 1000)
await conn.sendMessageList(m.chat, listMessage, estado)

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
return conn.sendAudioRecording(m.chat, vn, `../media/menu.mp3`, null, m, true, {
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
{title: `🔍 MODAPK`, description: `buscar apks mod usando el comando ${usedPrefix}modapk`, id: `${usedPrefix}modapk`},
{title: `🔍 STICKERSEARCH`, description: `buscar stickers usando el comando ${usedPrefix}stickersearch`, id: `${usedPrefix}stickersearch`},
{title: `🔍 *STICKERSEARCH2`, description: `buscar stickers usando el comando ${usedPrefix}stickersearch2`, id: `${usedPrefix}stickersearch2`},
{title: `🔍 XNXXSEARCH`, description: `buscar videos desde xnxx usando el comando ${usedPrefix}xnxxsearch`, id: `${usedPrefix}xnxxsearch`},
{title: `🔍 ANIMEINFO`, description: `buscar informacion de anime usando el comando ${usedPrefix}animeinfo`, id: `${usedPrefix}animeinfo`},
{title: `🔍 GOOGLE`, description: `buscar desde google usando el comando ${usedPrefix}google`, id: `${usedPrefix}google`},
{title: `🔍 LETRA`, description: `buscar lyrics (letras) usando el comando ${usedPrefix}letra`, id: `${usedPrefix}letra`},
{title: `🔍 WIKIPEDIA`, description: `buscar desde wikipedia usando el comando ${usedPrefix}wikipedia`, id: `${usedPrefix}wikipedia`},
{title: `🔍 YTSEARCH`, description: `buscar desde youtube usando el comando ${usedPrefix}ytsearch`, id: `${usedPrefix}ytsearch`},
{title: `🔍 APKDONE`, description: `buscar desde apkdone usando el comando ${usedPrefix}apkdone`, id: `${usedPrefix}apkdone`},
{title: `🔍 APKGOOGLE`, description: `buscar desde apkgoogle usando el comando ${usedPrefix}apkgoogle`, id: `${usedPrefix}apkgoogle`},
{title: `🔍 APKMODY`, description: `buscar desde apkmody usando el comando ${usedPrefix}apkmody`, id: `${usedPrefix}apkmody`},
{title: `🔍 APKSHUB`, description: `buscar desde apkshub usando el comando ${usedPrefix}apkshub`, id: `${usedPrefix}apkshub`},
{title: `🔍 HAPPYMOD`, description: `buscar happymod usando el comando ${usedPrefix}happymod`, id: `${usedPrefix}happymod`},
{title: `🔍 HOSTAPK`, description: `buscar desde hostapk usando el comando ${usedPrefix}hostapk`, id: `${usedPrefix}hostapk`}, 
{title: `🔍 REVDL`, description: `buscar desde revdl usando el comando ${usedPrefix}revdl`, id: `${usedPrefix}revdl`}, 
{title: `🔍 TORACCINO`, description: `buscar desde toraccino usando el comando ${usedPrefix}toraccino`, id: `${usedPrefix}toraccino`},
{title: `🔍 UAPKPRO`, description: `buscar desde uapkpro usando el comando ${usedPrefix}uapkpro`, id: `${usedPrefix}uapkpro`},
{title: `🔍 PLAYSTORE`, description: `buscar desde playstore usando el comando ${usedPrefix}playstore`, id: `${usedPrefix}playstore`},
]},
{title: `CONTACTO`, rows: [
{title: `📮 DONAR 📮`, id: `${usedPrefix}donasi`},
{title: `🌹 OWNER 🌹`, id: `${usedPrefix}owner`},
{title: `🐾 INFOBOT 🐾`, id: `${usedPrefix}infobot`}]}
]
let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS PARA DESCARGAR ✨${userm}✨`
let title = `*COMANDOS PARA DESCARGAR ${wm}*\npowered by\n*${igfg}*`
const listMessage = {
body: {text: resp},
header: {
title, 
hasMediaAttachment: true,
imageMessage: pp.imageMessage,
},
nativeFlowMessage: {
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: "SELECCIONE AQUÍ",
sections
})
}
],
messageParamsJson: ''
},
contextInfo: {
mentionedJid: conn.parseMention(resp)
},
sections,
footer: {text: `${wm}`},
}

await delay(1 * 1000)
await conn.sendMessageList(m.chat, listMessage, estado)
await delay(1 * 1000)
return conn.sendAudioRecording(m.chat, vn, `../media/menu.mp3`, null, m, true, { type: `audioMessage`, ptt: true})
} catch {

}
break
//caja fuerte

case `cajafuerte`:
try {
const sections = [{
title: `AGREGAR A LA LISTA`,
rows: [
{title: `🗳️ AGREGAR MENSAJE`, description: `Comando: ${usedPrefix}agregarmsg *<texto/comando/palabra clave>* (responde a un texto) `, id: `${usedPrefix}agregarmsg`},
{title: `🗳️ AGREGAR VN`, description: `Comando: ${usedPrefix}agregarvn *<texto/comando/palabra clave>* (responde a una nota de voz) `, id: `${usedPrefix}agregarvn`},
{title: `🗳️ AGREGAR VIDEO`, description: `Comando: ${usedPrefix}agregarvideo *<texto/comando/palabra clave>* (responde a un video) `, id: `${usedPrefix}agregarvideo`},
{title: `🗳️ AGREGAR AUDIO`, description: `Comando: ${usedPrefix}agregaraudio *<texto/comando/palabra clave>* (responde a un audio) `, id: `${usedPrefix}agregaraudio`},
{title: `🗳️ AGREGAR IMAGEN`, description: `Comando: ${usedPrefix}agregarimg *<texto/comando/palabra clave>* (responde a una imagen) `, id: `${usedPrefix}agregarimg`},
{title: `🗳️ AGREGAR STICKER`, description: `Comando: ${usedPrefix}agregarsticker *<texto/comando/palabra clave>* (responde a un sticker) `, id: `${usedPrefix}agregarsticker`}
]},
{title: `LISTA DE COMANDOS`,
rows: [
{title: `🗳️ LISTA MENSAJE`, description: `Comando: ${usedPrefix}listamsg `, id: `${usedPrefix}listamsg`},
{title: `🗳️ LISTA VN`, description: `Comando: ${usedPrefix}listavn `, id: `${usedPrefix}listavn`},
{title: `🗳️ LISTA VIDEO`, description: `Comando: ${usedPrefix}listavideo `, id: `${usedPrefix}listavideo`},
{title: `🗳️ LISTA AUDIO`, description: `Comando: ${usedPrefix}listaaudio `, id: `${usedPrefix}listaaudio`},
{title: `🗳️ LISTA IMAGEN`, description: `Comando: ${usedPrefix}listaimg `, id: `${usedPrefix}listaimg`},
{title: `🗳️ LISTA STICKER`, description: `Comando: ${usedPrefix}listasticker `, id: `${usedPrefix}listasticker`}
]},
{title: `VER TEXTOS O ARCHIVOS`,
rows: [
{title: `🗳️ VER MENSAJE`, description: `Comando: ${usedPrefix}vermsg *<texto/comando/palabra clave>* `, id: `${usedPrefix}vermsg`},
{title: `🗳️ VER VN`, description: `Comando: ${usedPrefix}vervn *<texto/comando/palabra clave>* `, id: `${usedPrefix}vervn`},
{title: `🗳️ VER VIDEO`, description: `Comando: ${usedPrefix}vervideo *<texto/comando/palabra clave>* `, id: `${usedPrefix}vervideo`},
{title: `🗳️ VER AUDIO`, description: `Comando: ${usedPrefix}veraudio *<texto/comando/palabra clave>* `, id: `${usedPrefix}veraudio`},
{title: `🗳️ VER IMAGEN`, description: `Comando: ${usedPrefix}verimg *<texto/comando/palabra clave>* `, id: `${usedPrefix}verimg`},
{title: `🗳️ VER STICKER`, description: `Comando: ${usedPrefix}versticker *<texto/comando/palabra clave>* `, id: `${usedPrefix}versticker`}
]},
{title: `ELIMINAR`,
rows: [
{title: `🗳️ ELIMINAR MENSAJE`, description: `Comando: ${usedPrefix}eliminarmsg *<texto/comando/palabra clave>* `, id: `${usedPrefix}eliminarmsg`},
{title: `🗳️ ELIMINAR VN`, description: `Comando: ${usedPrefix}eliminarvn *<texto/comando/palabra clave>* `, id: `${usedPrefix}eliminarvn`},
{title: `🗳️ ELIMINAR VIDEO`, description: `Comando: ${usedPrefix}eliminarvideo *<texto/comando/palabra clave>* `, id: `${usedPrefix}eliminarvideo`},
{title: `🗳️ ELIMINAR AUDIO`, description: `Comando: ${usedPrefix}eliminaraudio *<texto/comando/palabra clave>* `, id: `${usedPrefix}eliminaraudio`},
{title: `🗳️ ELIMINAR IMAGEN`, description: `Comando: ${usedPrefix}eliminarimg *<texto/comando/palabra clave>* `, id: `${usedPrefix}eliminarimg`},
{title: `🗳️ ELIMINAR STICKER`, description: `Comando: ${usedPrefix}eliminarsticker *<texto/comando/palabra clave>* `, id: `${usedPrefix}eliminarsticker`}
]},
{title: `APOYO`,
rows: [
{title: `💵 DONAR`, description: `dona por favor que los pobres deben comer y ya no desarrollan`, id: `${usedPrefix}donasi`}, 
{title: `👽 OWNER`, description: `conoce los numeros de quien da soporte a este bot`, id: `${usedPrefix}owner`},
{title: `🔰 INFOBOT`, description: `la informacion del Bot`, id: `${usedPrefix}infobot`},
{title: `🔗 REDES SOCIALES`, description: `BUSCANOS EN FACEBOOK https://www.facebook.com/groups/otakustogether`, id: ``}
]}]
let resp = `${gt}✨${userm}✨ ESTE ES EL MENU DE LOS COMANDOS DE LA CAJA FUERTE \n\nAQUI PUEDE GUARDAR MENSAJES QUE QUIERAS VER MAS TARDE`
let title = `*COMANDOS DE LA CAJA FUERTE ${wm}*\npowered by\n*${igfg}*`
const listMessage = {
body: {text: resp},
header: {
title, 
hasMediaAttachment: true,
imageMessage: pp.imageMessage,
},
nativeFlowMessage: {
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: "SELECCIONE AQUÍ",
sections
})
}
],
messageParamsJson: ''
},
contextInfo: {
mentionedJid: conn.parseMention(resp)
},
sections,
footer: {text: `${wm}`},
}

await delay(1 * 1000)
await conn.sendMessageList(m.chat, listMessage, estado)
await delay(1 * 1000)
return conn.sendAudioRecording(m.chat, vn, m)

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
{title: `📳 START`, description: `para iniciar el chat anonimo use ${usedPrefix}start`, id: `${usedPrefix}start`},
{title: `📳 NEXT`, description: `para el siguiente chat anonimo use ${usedPrefix}next`, id: `${usedPrefix}next`},
{title: `📳 LEAVE`, description: `para salir del chat anonimo use ${usedPrefix}leave`, id: `${usedPrefix}leave`},
{title: `💵 DONAR`, description: `dona por favor que los pobres deben comer y ya no desarrollan`, id: `${usedPrefix}donasi`}, 
{title: `👽 OWNER`, description: `conoce los numeros de quien da soporte a este bot`, id: `${usedPrefix}owner`},

]}, ]
let resp = `${gt} ESTE ES EL MENU DE los comandos para el chat anonimo\n✨${userm}✨`
let title = `*COMANDOS para el chat anonimo ${wm}*\npowered by\n*${igfg}*`
const listMessage = {
body: {text: resp},
header: {
title, 
hasMediaAttachment: true,
imageMessage: pp.imageMessage,
},
nativeFlowMessage: {
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: "SELECCIONE AQUÍ",
sections
})
}
],
messageParamsJson: ''
},
contextInfo: {
mentionedJid: conn.parseMention(resp)
},
sections,
footer: {text: `${wm}`},
}

await delay(1 * 1000)
await conn.sendMessageList(m.chat, listMessage, estado)
await delay(1 * 1000)
return conn.sendAudioRecording(m.chat, vn, m)
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
{title: `🧧 TO(GIF-AUD)`, description: `responde a un video que desea convertir en gif con audio. Comando: ${usedPrefix}togifaud`, id: `${usedPrefix}togifaud`},
{title: `🧧 TO(IMG)`, description: `responde a un sticker que desea convertir a imagen. Comando: ${usedPrefix}toimg`, id: `${usedPrefix}toimg`},
{title: `🧧 TO(MP3)`, description: `responde a un video o nota de voz que desea convertir en audio mp3. Comando: ${usedPrefix}tomp3`, id: `${usedPrefix}tomp3`},
{title: `🧧 TO(PTT)`, description: `responde a un video que desea convertir en nota de voz. Comando: ${usedPrefix}toptt`, id: `${usedPrefix}toptt`}, 
{title: `🧧 TO(VIDEO)`, description: `responda a un sticker de movimiento que desee convertir en video. Comando: ${usedPrefix}tovideo`, id: `${usedPrefix}tovideo`},
{title: `🧧 TO(URL)`, description: `responda a una imagen o video el cual sera convertido en enlace. Comando: ${usedPrefix}tourl`, id: `${usedPrefix}tourl`},
{title: `🧧 TTS`, description: `convierte un texto en nota de voz, ejemplo: ${usedPrefix}tts hola mundo`, id: `${usedPrefix}tts`}, 
]}, ]
let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS PARA CONVERTIR ✨${userm}✨

*📅 ${gt} La fecha es: ${week}, ${date}*`
let title = `*COMANDOS PARA CONVERTIR ${wm}*\npowered by\n*${igfg}*`
const listMessage = {
body: {text: resp},
header: {
title, 
hasMediaAttachment: true,
imageMessage: pp.imageMessage,
},
nativeFlowMessage: {
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: "SELECCIONE AQUÍ",
sections
})
}
],
messageParamsJson: ''
},
contextInfo: {
mentionedJid: conn.parseMention(resp)
},
sections,
footer: {text: `${wm}`},
}

await delay(1 * 1000)
await conn.sendMessageList(m.chat, listMessage, estado)
await delay(1 * 1000)
return conn.sendAudioRecording(m.chat, vn, m)
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
{title: `📥 INSTAGRAM`, description: `para poder descargar de Instagram utiliza ${usedPrefix}instagram <enlace / link / url>`, id: `${usedPrefix}instagram`},
{title: `📥 MEDIAFIRE`, description: `para poder descargar de mediafire utiliza ${usedPrefix}mediafire <enlace / link / url>`, id: `${usedPrefix}mediafire`},
{title: `📥 *GITCLONE`, description: `para poder descargar desde github utiliza ${usedPrefix}gitclone <enlace / link / url>`, id: `${usedPrefix}gitclone`},
{title: `📥 TIKTOK`, description: `para poder descargar de tiktok utiliza ${usedPrefix}<enlace / link / url>`, id: `${usedPrefix}tiktok`},
{title: `📥 XNXXDL`, description: `para poder descargar de la página XNXX utiliza ${usedPrefix}xnxxdl <enlace / link / url>`, id: `${usedPrefix}xnxxdl`},
{title: `📥 XVIDEOSDL`, description: `para poder descargar de la página xvideos utiliza ${usedPrefix}xvideosdl <enlace / link / url>`, id: `${usedPrefix}xvideosdl`},
{title: `📥 TWITTER`, description: `para poder descargar desde Twitter utiliza ${usedPrefix}twitter <enlace / link / url>`, id: `${usedPrefix}twitter`},
{title: `📥 FACEBOOK`, description: `te muestro las opciones en el siguiente menu de facebook`, id: `${usedPrefix}facebook`},
{title: `📥 YOUTUBE`, description: `te muestro las opciones en el siguiente menu de youtube`, id: `${usedPrefix}youtube`},
{title: `📥 STICKERPACK`, description: `descargar stickers desde getstickerpack.com usando ${usedPrefix}stickerpack`, id: `${usedPrefix}stickerpack`},
{title: `📥 DESCARGAR CON PLAY`, description: `descargar usando ${usedPrefix}play`, id: `${usedPrefix}play`},
{title: `📥 DESCARGAR CON PLAY.1`, description: `buscar y descargar con ${usedPrefix}play.1`, id: `${usedPrefix}play.1`},
{title: `📥 DESCARGAR CON PLAY.2`, description: `buscar y descargar con ${usedPrefix}play.2`, id: `${usedPrefix}play.2`},
{title: `📥 PLAYDOC`, description: `descargar como documento usando ${usedPrefix}playdoc`, id: `${usedPrefix}playdoc`},
{title: `📥 PLAYLIST`, description: `descargar una lista de opciones usando ${usedPrefix}playlist`, id: `${usedPrefix}playlist`},
{title: `📥 PLAYLIST2`, description: `descargar una 2a lista de opciones usando ${usedPrefix}playlist2`, id: `${usedPrefix}playlist2`}, 
{title: `📥 SPOTIFY`, description: `descarga desde spotify usando ${usedPrefix}spotify <enlace / link / url>`, id: `${usedPrefix}spotify`}, 
{title: `📥 STICKERLY`, description: `descargar stickers desde getstickerpack.com sticker.ly usando ${usedPrefix}stickerly <enlace / link / url>`, id: `${usedPrefix}stickerly`},
{title: `📥 RINGTONE`, description: `busca y descarga tonos usando ${usedPrefix}ringtone <enlace / link / url>`, id: `${usedPrefix}ringtone`},
{title: `📥 SOUNDCLOUD`, description: `descarga desde soundcloud usando ${usedPrefix}soundcloud <enlace / link / url>`, id: `${usedPrefix}soundcloud`}, 
{title: `📥 IMAGEN`, description: `solicita imagenes usando ${usedPrefix}imagen <texto>`, id: `${usedPrefix}imagen`}, 
{title: `📥 PINTEREST`, description: `solicita imagenes de pinterest usando ${usedPrefix}pinterest <texto>`, id: `${usedPrefix}pinterest`}, 
{title: `📥 WALLPAPER`, description: `solicita imagenes wallpaper usando ${usedPrefix}wallpaper <texto>`, id: `${usedPrefix}wallpaper`}, 
{title: `📥 WALLPAPER2*`, description: `solicita imagenes 2a opcion para wallpaper usando ${usedPrefix}wallpaper2 <texto>`, id: `${usedPrefix}wallpaper2`}, 
{title: `📥 PPTIKTOK`, description: `solicita la imagen de un usuario de tiktok usando ${usedPrefix}tiktok <usuario>`, id: `${usedPrefix}pptiktok`}, 
{title: `📥 IGSTALK`, description: `solicita imagenes de un usuario de instagram`, id: `${usedPrefix}igstalk`}, 
{title: `📥 IGSTORY`, description: `solicita imagen e informacion de un usuario de instagram`, id: `${usedPrefix}igstory`}, 
{title: `📥 TIKTOKSTALK`, description: `solicita imagen e informacion de un usuario de tiktok`, id: `${usedPrefix}tiktokstalk`},
]}, ]
let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS PARA DESCARGAR ✨${userm}✨ powered by ${igfg}*`
let title = `*COMANDOS PARA DESCARGAR ${wm}*\npowered by\n*${igfg}*`
const listMessage = {
body: {text: resp},
header: {
title, 
hasMediaAttachment: true,
imageMessage: pp.imageMessage,
},
nativeFlowMessage: {
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: "SELECCIONE AQUÍ",
sections
})
}
],
messageParamsJson: ''
},
contextInfo: {
mentionedJid: conn.parseMention(resp)
},
sections,
footer: {text: `${wm}`},
}

await delay(1 * 1000)
await conn.sendMessageList(m.chat, listMessage, estado)
await delay(1 * 1000)
return conn.sendAudioRecording(m.chat, vn, m)
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
{title: `📥 OPCION 1`, description: `opcion 1 para facebook Comando: ${usedPrefix}fb`, id: `${usedPrefix}fb`},
{title: `📥 OPCION 2`, description: `opcion 2 para facebook Comando: ${usedPrefix}fb2`, id: `${usedPrefix}fb2`},
{title: `📥 OPCION 3`, description: `opcion 3 para facebook Comando: ${usedPrefix}fb3`, id: `${usedPrefix}fb3`},
{title: `📥 OPCION 4`, description: `opcion 4 para facebook Comando: ${usedPrefix}fb4`, id: `${usedPrefix}fb4`}, 
{title: `📥 OPCION 5`, description: `opcion 5 para facebook Comando: ${usedPrefix}fb5`, id: `${usedPrefix}fb5`},

]}, ]
let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS DE FACEBOOK\n✨${userm}✨\npowered by\n*${igfg}*`
let title = `*COMANDOS DE FACEBOOK ${wm}*\npowered by\n*${igfg}*`
const listMessage = {
body: {text: resp},
header: {
title, 
hasMediaAttachment: true,
imageMessage: pp.imageMessage,
},
nativeFlowMessage: {
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: "SELECCIONE AQUÍ",
sections
})
}
],
messageParamsJson: ''
},
contextInfo: {
mentionedJid: conn.parseMention(resp)
},
sections,
footer: {text: `${wm}`},
}

await delay(1 * 1000)
await conn.sendMessageList(m.chat, listMessage, estado)
await delay(1 * 1000)
return conn.sendAudioRecording(m.chat, vn, m)
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
{title: `💎 AGREGAR`, description: `añadir a alguien al grupo usando ${usedPrefix}add`, id: `${usedPrefix}add`},
{title: `💎 ELIMINAR`, description: `eliminar a uno o a varios del grupo usando ${usedPrefix}kick`, id: `${usedPrefix}kick`},
{title: `💎 ELIMINAR DESDE MENSAJE`, description: `elimina a alguien contestando un mensaje del usuario usando ${usedPrefix}kick2`, id: `${usedPrefix}kick2`},
{title: `💎 LISTA DE NUMEROS POR PREFIJO`, description: `hace una lista de numeros por su prefijo usando ${usedPrefix}listnum`, id: `${usedPrefix}listanum`},
{title: `💎 ELIMINA NUMEROS POR PREFIJO`, description: `elimina una lista por su prefijo del grupo usando ${usedPrefix}kicknum`, id: `${usedPrefix}kicknum`}, 
{title:`💎 ABRE O CIERRA EL GRUPO`, description: `abrir o cerrar el grupo para controlar la conversacion usando ${usedPrefix}grupo`, id: `${usedPrefix}grupo`},
{title:`💎 DAR ADMIN`, description: `promueve a alguien como admin usando ${usedPrefix}promote`, id: `${usedPrefix}promote`},
{title:`💎 QUITAR ADMIN`, description: `degrada a alguien como admin usando ${usedPrefix}demote`, id: `${usedPrefix}demote`},
{title:`💎 INFORMACION DEL GRUPO`, description: `envia la informacion del grupo en un mensaje usando ${usedPrefix}infogroup`, id: `${usedPrefix}infogroup`},
{title:`💎 NUEVO LINK`, description: `resetea el link de invitacion del grupo actual usando ${usedPrefix}resetlink`, id: `${usedPrefix}resetlink`},
{title:`💎 SOLICITA EL LINK`, description: `solicita el link del grupo actual usando ${usedPrefix}link`, id: `${usedPrefix}link`},
{title:`💎 CAMBIA EL NOMBRE DEL GRUPO`, description: `solicita al bot que cambie el nombre al grupo usando ${usedPrefix}setname`, id: `${usedPrefix}setname`},
{title:`💎 CAMBIAR LA DESCRIPCION DEL GRUPO`, description: `edita o borra la descripcion del grupo usando ${usedPrefix}setdesc`, id: `${usedPrefix}setdesc`},
{title:`💎 CAMBIA LA IMAGEN DEL GRUPO`, description: `contesta a una imagen o sube la imagen para cambiarla usando ${usedPrefix}setpp`, id: `${usedPrefix}setpp`},
{title:`💎 CAMBIAR LA BIENVENIDA DEL BOT`, description: `edita la bienvenida del BOT usando ${usedPrefix}setwelcome`, id: `${usedPrefix}setwelcome`}, 
{title:`💎 CAMBIAR LA DESPEDIDA DEL BOT`, description: `edita la despedida del bot usando ${usedPrefix}setbye`, id: `${usedPrefix}setbye`},
{title:`💎 INVOCAR GRUPO`, description: `invoca a todo el grupo usando ${usedPrefix}invocar`, id: `${usedPrefix}invocar`},
{title:`💎 MENSAJE GENERAL EN SILENCIO`, description: `hace que el bot mencione a todos en un mensaje sin que se note el tag usando ${usedPrefix}hidetag`, id: `${usedPrefix}hidetag`},
{title:`💎 CREA ADVERTENCIAS`, description: `recibe 3 advertencias de un admin usando el bot y este te eliminara usando ${usedPrefix}warn`, id: `${usedPrefix}warn`},
{title:`💎 ELIMINA ADVERTENCIAS`, description: `los admins pueden eliminar cada advertencia hecha en el bot usando ${usedPrefix}unwarn`, id: `${usedPrefix}unwarn`},
{title:`💎 LISTA DE ADVERTENCIAS`, description: `aqui puedes ver las advertencias y los usuarios que las tienen usando ${usedPrefix}listwarn`, id: `${usedPrefix}listwarn`},
{title:`💎 FANTASMAS`, description: `busca y encuentra gente inactiva en el grupo usando ${usedPrefix}fantasmas`, id: `${usedPrefix}fantasmas`},
{title:`💎 DESTRABAS`, description: `se utiliza en el caso de recibir virus en modo texto (trabas) para dejarlas muy atras en el chat usando ${usedPrefix}destraba`, id: `${usedPrefix}destraba`},
]}, ]
let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS PARA LOS ADMINS ✨${userm}✨

*📅 ${gt} fecha: ${week}, ${date}*
*📊 Registrados: ${rtotalreg}*`
let title = `*COMANDOS PARA LOS ADMINS ${wm}*\npowered by\n*${igfg}*`
const listMessage = {
body: {text: resp},
header: {
title, 
hasMediaAttachment: true,
imageMessage: pp.imageMessage,
},
nativeFlowMessage: {
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: "SELECCIONE AQUÍ",
sections
})
}
],
messageParamsJson: ''
},
contextInfo: {
mentionedJid: conn.parseMention(resp)
},
sections,
footer: {text: `${wm}`},
}

await delay(1 * 1000)
await conn.sendMessageList(m.chat, listMessage, estado)
await delay(1 * 1000)
return conn.sendAudioRecording(m.chat, vn, m)
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
{title: `🛠️SPAM MENSAJE`, description: `Comando: ${usedPrefix}spamwa *<numero|texto|cantidad>*`, id: `${usedPrefix}spamwa`},
{title: `🛠️TAMAÑO`, description: `Comando: ${usedPrefix}tamaño *<cantidad> <imagen / video>*`, id: `${usedPrefix}tamaño`},
{title: `🛠️CLIMA`, description: `Comando: ${usedPrefix}clima *<país> <ciudad>*`, id: `${usedPrefix}clima`},
{title: `🛠️ENCUESTA`, description: `Comando: ${usedPrefix}encuesta *<texto1|texto2...>*`, id: `${usedPrefix}encuesta`}, 
{title: `🛠️NO MOLESTAR`, description: `Comando: ${usedPrefix}afk *<motivo>*`, id: `${usedPrefix}afk`},
{title: `🛠️RECONOCIMIENTO DE TEXTO EN IMAGENES`, description: `Comando: ${usedPrefix}ocr *<responde a imagen>*`, id: `${usedPrefix}ocr`},
{title: `🛠️ACORTAR`, description: `Comando: ${usedPrefix}acortar *<enlace / link / url>*`, id: `${usedPrefix}acortar`},
{title: `🛠️CALCULADORA`, description: `Comando: ${usedPrefix}calc *<operacion math>*`, id: `${usedPrefix}calc`},
{title: `🛠️BORRAR`, description: `Comando: ${usedPrefix}del *<mensaje>*`, id: `${usedPrefix}del`}, 
{title: `🛠️RECONOCIENTO DE MUSICA`, description: `Comando: ${usedPrefix}whatmusic *<audio>*`, id: `${usedPrefix}whatmusic`},
{title: `🛠️LEER QR`, description: `Comando: ${usedPrefix}readqr *<imagen (QR)>*`, id: `${usedPrefix}readqr`},
{title: `🛠️ENVIAR QR`, description: `Comando: ${usedPrefix}qrcode *<texto>*`, id: `${usedPrefix}qrcode`},
{title: `🛠️READMORE`, description: `Comando: ${usedPrefix}readmore *<texto1| texto2>*`, id: `${usedPrefix}readmore`},
{title: `🛠️STYLETEXT`, description: `Comando: ${usedPrefix}styletext *<texto>*`, id: `${usedPrefix}styletext`}, 
{title: `🛠️TRADUCIR`, description: `Comando: ${usedPrefix}traducir *<texto>*`, id: `${usedPrefix}traducir`},
{title: `🛠️VIDEO CONFERENCIA EN ZOOM`, description: `Comando: ${usedPrefix}zoom *<texto>*`, id: `${usedPrefix}zoom`},
{title: `🛠️NUMEROS EN WHATSAPP`, description: `Comando: ${usedPrefix}nowa *<numero>x*`, id: `${usedPrefix}nowa`},
{title: `🛠️COVID`, description: `Comando: ${usedPrefix}covid *<pais>*`, id: `${usedPrefix}covid`}, 
{title: `🛠️HORARIO`, description: `Comando: ${usedPrefix}horario`, id: `${usedPrefix}horario`}
]}, ]
let resp = `${gt} ✨${userm}✨ ESTE ES EL MENU DE HERRAMIENTAS`
let title = `*COMANDOS DE HERRAMIENTAS ${wm}*\npowered by\n*${igfg}*`
const listMessage = {
body: {text: resp},
header: {
title, 
hasMediaAttachment: true,
imageMessage: pp.imageMessage,
},
nativeFlowMessage: {
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: "SELECCIONE AQUÍ",
sections
})
}
],
messageParamsJson: ''
},
contextInfo: {
mentionedJid: conn.parseMention(resp)
},
sections,
footer: {text: `${wm}`},
}

await delay(1 * 1000)
await conn.sendMessageList(m.chat, listMessage, estado)

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
return conn.sendAudioRecording(m.chat, vn, `../media/menu.mp3`, null, m, true, { type: `audioMessage`, ptt: true})
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
return conn.sendAudioRecording(m.chat, vn, m)
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
return conn.sendAudioRecording(m.chat, vn, m)
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
{title: `🎖️️ MATEMATICAS`, description: `Comando: ${usedPrefix}mates<noob / easy / medium / hard / extreme /impossible /impossible2>`, id: `${usedPrefix}mates`},
{title: `🎖️️ PIEDRA, PAPEL O TIJERAS`, description: `Comando: ${usedPrefix}ppt </papel /tijera /piedra>`, id: `${usedPrefix}ppt`},
{title: `🎖️️ JODA PROSTITUTO`, description: `Comando: ${usedPrefix}prostituto <nombre / @tag>`, id: `${usedPrefix}prostituto`},
{title: `🎖️️ JODA PROSTITUTA`, description: `Comando: ${usedPrefix}prostituta <nombre / @tag>`, id: `${usedPrefix}prostituta`},
{title: `🎖️ ️JODA GAY`, description: `Comando: ${usedPrefix}gay2 <nombre / @tag>`, id: `${usedPrefix}gay2`},
{title: `🎖️ ️JODA LESBIANA`, description: `Comando: ${usedPrefix}lesbiana <nombre / @tag>`, id: `${usedPrefix}lesbiana`},
{title: `🎖️ ️JODA PAJERO`, description: `Comando: ${usedPrefix}pajero <nombre / @tag>`, id: `${usedPrefix}pajero`},
{title: `🎖️ ️JODA PAJERA`, description: `Comando: ${usedPrefix}pajera <nombre / @tag>`, id: `${usedPrefix}pajera`},
{title: `🎖️ ️JODA PUTO`, description: `Comando: ${usedPrefix}puto <nombre / @tag>`, id: `${usedPrefix}puto`},
{title: `🎖️ ️JODA PUTA`, description: `Comando: ${usedPrefix}puta <nombre / @tag>`, id: `${usedPrefix}puta`},
{title: `🎖️ ️JODA MANCO`, description: `Comando: ${usedPrefix}manco <nombre / @tag>`, id: `${usedPrefix}manco`},
{title: `🎖️ JODA MANCA`, description: `Comando: ${usedPrefix}manca <nombre / @tag>`, id: `${usedPrefix}manca`},
{title: `🎖️ JODA RATA`, description: `Comando: ${usedPrefix}rata <nombre / @tag>`, id: `${usedPrefix}rata`},
{title: `🎖️ JODA LOVE`, description: `Comando: ${usedPrefix}love <nombre / @tag>`, id: `${usedPrefix}love`},
{title: `🎖️ DOXEO`, description: `Comando: ${usedPrefix}doxear <nombre / @tag>`, id: `${usedPrefix}doxear`},
{title: `🎖️ PREGUNTA`, description: `pregunta algo al bot Comando: ${usedPrefix}pregunta `, id: `${usedPrefix}pregunta`}, 
{title: `🎖️ APUESTA`, description: `apuesta Comando: ${usedPrefix}slot `, id: `${usedPrefix}slot`}, 
{title: `🎖️ PVP`, description: `desafia a alguien, Comando: ${usedPrefix}top <tag>`, id: `${usedPrefix}pvp`}, 
{title: `🎖️ DESAFIA 3 EN RAYA`, description: `Desafia a alguien en este juego de gato virtual Comando: ${usedPrefix}ttt `, id: `${usedPrefix}ttt`},
{title: `🎖️ ELIMINA DESAFIO 3 EN RAYA (JUEGO DE GATO)`, description: `Elimina un desafio 3 en raya Comando: ${usedPrefix}delttt `, id: `${usedPrefix}delttt`},
{title: `🎖️ CONVERSA`, description: `Conversa con el bot Comando: ${usedPrefix}simi `, id: `${usedPrefix}simi`}, 
{title: `🎖️ TOP`, description: `Top del grupo Comando: ${usedPrefix}top <tema a eleccion>`, id: `${usedPrefix}top`}, 
{title: `🎖️ JODA TOP GAYS`, description: `Top gays Comando: ${usedPrefix}topgays `, id: `${usedPrefix}topgays`}, 
{title: `🎖️ JODA TOP OTAKUS`, description: `Top otakus Comando: ${usedPrefix}topotakus `, id: `${usedPrefix}topotakus`}, 
{title: `🎖️ FORMAR PAREJA`, description: `Formar pareja Comando: ${usedPrefix}formarpareja `, id: `${usedPrefix}formarpareja`}, 
{title: `🎖️ FORMARTRIO`, description: `Formar trio Comando: ${usedPrefix}formartrio `, id: `${usedPrefix}formartrio`}, 
{title: `🎖️ VERDAD`, description: `juego de la Verdad, Comando: ${usedPrefix}verdad `, id: `${usedPrefix}verdad`}, 
{title: `🎖️ RETO`, description: `juego Reto, Comando: ${usedPrefix}reto `, id: `${usedPrefix}reto`}, 
{title: `🎖️ CANCION`, description: `Adivina la cancion Comando: ${usedPrefix}cancion `, id: `${usedPrefix}cancion`},
{title: `🎖️ PISTA`, description: `Adivina el fragmento Comando: ${usedPrefix}pista `, id: `${usedPrefix}pista`},
]}, ]
let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS DE JUEGOS\n✨${userm}✨\n\npowered by\n*${igfg}*`
let title = `*COMANDOS DE JUEGOS ${wm}*\npowered by\n*${igfg}*`
const listMessage = {
body: {text: resp},
header: {
title, 
hasMediaAttachment: true,
imageMessage: pp.imageMessage,
},
nativeFlowMessage: {
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: "SELECCIONE AQUÍ",
sections
})
}
],
messageParamsJson: ''
},
contextInfo: {
mentionedJid: conn.parseMention(resp)
},
sections,
footer: {text: `${wm}`},
}

await delay(1 * 1000)
await conn.sendMessageList(m.chat, listMessage, estado)
await delay(1 * 1000)
return conn.sendAudioRecording(m.chat, vn, m)
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
return conn.sendAudioRecording(m.chat, vn, m)
}
break
//logos y efectos de estos

case `logosefectos`:
try {
const sections = [
{
title: `*LISTA DE OPCIONES*`,
rows: [
{title: `🖍️ MENSAJE FALSO`, description: `opcion 1 para facebook`, id: `${usedPrefix}mensajefalso`},
{title: `🖍️ PHMAKER`, description: `dale efecto a una imagen usando ${usedPrefix}phmaker (opcion) y responde un mensaje o agrega el comando a una imagen con las opciones que te dare`, id: `${usedPrefix}phmaker`},
{title: `🖍️ LOGOS`, description: `opcion 3 para facebook`, id: `${usedPrefix}logos`},
{title: `🖍️ LOGOS NAVIDAD`, description: `opcion 4 para facebook`, id: `${usedPrefix}logochristmas`}, 
{title: `🖍️ LOGOS CORAZON`, description: `opcion 5 para facebook`, id: `${usedPrefix}logocorazon`},
{title: `🖍️ COMENTARIO DE YOUTUBE`, description: `haz un fake de un comentario en youtube`, id: `${usedPrefix}ytcomment`},
{title: `🖍️ TARJETA HORNY`, description: `responde a un mensaje o manda el comando ${usedPrefix}hornycard y pon tu imagen de perfil o la de alguien mas en una tarjeta horny`, id: `${usedPrefix}hornycard`},
{title: `🖍️ TARJETA SIMP`, description: `responde a un mensaje o manda el comando ${usedPrefix}simcard y pon tu imagen de perfil o la de alguien mas en una tarjeta para simps`, id: `${usedPrefix}simpcard`},
{title: `🖍️ POLICIA DE LOLIS`, description: `responde a un mensaje o manda el comando ${usedPrefix}lolice y pon tu imagen de perfil o la de alguien mas en una loli`, id: `${usedPrefix}lolice`}, 
{title: `🖍️ MEME ERES ESTUPIDO`, description: `responde a un mensaje o manda el comando ${usedPrefix}itssostupid y pon tu imagen de perfil o la de alguien mas en un meme`, id: `${usedPrefix}itssostupid`},
{title: `🖍️ PIXELAR`, description: `responde a un mensaje o manda el comando ${usedPrefix}pixelar y pon tu imagen de perfil o la de alguien mas en una imagen pixelada`, id: `${usedPrefix}pixelar`}, 
{title: `🖍️ BLUR`, description: `responde a un mensaje o manda el comando ${usedPrefix}blur y pon tu imagen de perfil o la de alguien mas con efecto borroso`, id: `${usedPrefix}blur`},
]}, ]
let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS DE LOS EFECTOS Y LOGOS\n✨${userm}✨

*📅 ${gt} Fecha: ${week}, ${date}*
*📈 Tiempo activo ${gt}: ${uptime}*
*📊 Registrados: ${rtotalreg}*`
let title = `*COMANDOS DE LOS EFECTOS Y LOGOS ${wm}*\npowered by\n*${igfg}*`
const listMessage = {
body: {text: resp},
header: {
title, 
hasMediaAttachment: true,
imageMessage: pp.imageMessage,
},
nativeFlowMessage: {
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: "SELECCIONE AQUÍ",
sections
})
}
],
messageParamsJson: ''
},
contextInfo: {
mentionedJid: conn.parseMention(resp)
},
sections,
footer: {text: `${wm}`},
}

await delay(1 * 1000)
await conn.sendMessageList(m.chat, listMessage, estado)
await delay(1 * 1000)
return conn.sendAudioRecording(m.chat, vn, m)
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
return conn.sendAudioRecording(m.chat, vn, m)
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
title: `MENU PRINCIPAL ${wm}`,
rows: [
{title: `bot`, description: `menu de ayuda (uso sin prefijo)`, id: `bot`},
{title: `🎖️ *JUEGOS* `, description: `Comando: ${usedPrefix}juegos (menu de juegos)`, id: `${usedPrefix}juegos`},
{title: `🔰 *REPORTES DE FALLOS*`, description: `reporta los fallos despues del comando ${usedPrefix}reporte *texto*`, id: `${usedPrefix}reporte`},
{title: `📥*DESCARGAS*`, description: `Comando: ${usedPrefix}descargas (menu descargas)`, id: `${usedPrefix}descargas`},
{title: `💎*ADMINS-GRUPOS*`, description: `Comando: ${usedPrefix}gAdmin (Solo admins)`, id: `${usedPrefix}gAdmin`},
{title: `💎*DUEÑO (OWNERs)*`, description: `Comando: ${usedPrefix}owners (Solo owners)`, id: `${usedPrefix}gAdmin`}, 
{title:`🧧*CONVERTIDORES*`, description: `Comando: ${usedPrefix}convert (para convertidores`, id: `${usedPrefix}convert`},
{title:`🖍️*EFECTOS Y LOGOS*`, description: `Comando: ${usedPrefix}logosefectos (para optener efectos y logos)`, id: `${usedPrefix}logosefectos`},
{title:`👾*RANDOM*`, description: `Comando: ${usedPrefix}random `, id: `${usedPrefix}random`},
{title:`🎤*EFECTOS DE AUDIOS*`, description: `*- RESPONDE A UN AUDIO O NOTA DE VOZ usando ${usedPrefix}audioefect*`, id: `${usedPrefix}audioefect`},
{title:`📳*CHAT ANONIMO*`, description: `Comando: ${usedPrefix}chatanonimo `, id: `${usedPrefix}chatanonimo`},
{title:`🔍*BUSCADORES*`, description: `Comando: ${usedPrefix}buscar (buscadores de internet)`, id: `${usedPrefix}buscar`},
{title:`🔊 *AUDIOS* `, description: `*- ESCRIBE LAS PALABRAS O FRASES SIN NINGUN PREFIJO (${usedPrefix}, /, *, .)*`, id: `${usedPrefix}audios-bot`},
{title:`🛠️ *HERRAMIENTAS*`, description: `Comando: ${usedPrefix}herramientas (algunas herramientas`, id: `${usedPrefix}herramientas`},
{title:`💵 *RPG - LIMITES - ECONOMIA*`, description: `Comando: ${usedPrefix}rpg (juegos de rol`, id: `${usedPrefix}rpg`},
{title:`👽 *STICKERS*`, description: `Comando: ${usedPrefix}creador-sticker (crear stickers) `, id: `${usedPrefix}stickermenu`},
{title:`🔞 *NSFW +18*`, description: `Comando: ${usedPrefix}nsfw `, id: `${usedPrefix}nsfw`},
{title:`😉 *INFO TÚ*`, description: `Para saber la información que has juntado en los grupo Comando: ${usedPrefix}infoyo`, id: `${usedPrefix}infoyo`}
]}, 
{title: `UTILIDAD`, rows:[
{title:`💵 DONAR`, description: `si quieres apoyar al bot y a su dueño se te agradece`, id: `${usedPrefix}donasi`},
{title:`👽 OWNER`, description: `contacta con mi creador`, id: `${usedPrefix}owner`},
{title:`🔰 INFOBOT`, description: `te muestro mi informacion al funcionar`, id: `${usedPrefix}infobot`},
{title: `🔗 REDES SOCIALES`, description: `BUSCANOS EN FACEBOOK https://www.facebook.com/groups/otakustogether`, id: ``}
]}]
let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS DEL MENU PRINCIPAL ✨${userm}✨

*📅 ${gt} Fecha: ${week}, ${date}*
*📈 Tiempo activo ${gt}: ${uptime}*
*📊 Registrados: ${rtotalreg}*`
let title = `*COMANDOS DEL MENU PRINCIPAL ${wm}*\npowered by\n*${igfg}*`
const listMessage = {
body: {text: resp},
header: {
title, 
hasMediaAttachment: true,
imageMessage: pp.imageMessage,
},
nativeFlowMessage: {
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: "SELECCIONE AQUÍ",
sections
})
}
],
messageParamsJson: ''
},
contextInfo: {
mentionedJid: conn.parseMention(resp)
},
sections,
footer: {text: `${wm}`},
}
await conn.writing(m.chat, resp)
let q = await conn.sendMessageList(m.chat, listMessage, estado)
let quoted = await conn.chats[m.chat].messages[q]
console.log('menu: ', quoted)

//return conn.sendAudioRecording(m.chat, vn, q)
} catch {
let str = `
*HOLA ✨${userm}✨, ESTE ES EL MENU DE MENUS DE ${igfg}*
*📅 FECHA: ${week}, ${date}*
*📈 TIEMPO ACTIVO: ${uptime}*
*📊 USUARIOS: ${rtotalreg}*

┣ ඬ⃟ 💟 _Bot_ (_uso sin prefijo_)
┣ ඬ⃟ 🎖️ *JUEGOS*, Comando: _${usedPrefix}juegos_
┣ ඬ⃟ 🔰 *REPORTES DE FALLOS*, reporta los fallos despues del comando _${usedPrefix}reporte_
┣ ඬ⃟ 📥*DESCARGAS*, Comando:_${usedPrefix}descargas_
┣ ඬ⃟ 💎*ADMINS-GRUPOS*, Comando:_${usedPrefix}gAdmin_
┣ ඬ⃟ 💎*DUEÑO (OWNERs)*, Comando: _${usedPrefix}owners_
┣ ඬ⃟ 🧧*CONVERTIDORES*, Comando: _${usedPrefix}convert_
┣ ඬ⃟ 🖍️*EFECTOS Y LOGOS*, Comando: _${usedPrefix}logosefectos_
┣ ඬ⃟ 👾*RANDOM*, Comando: _${usedPrefix}random_
┣ ඬ⃟ 🎤*EFECTOS DE AUDIOS*, *- RESPONDE A UN AUDIO O NOTA DE VOZ usando _${usedPrefix}audioefect_
┣ ඬ⃟ 📳*CHAT ANONIMO*, Comando: _${usedPrefix}chatanonimo_
┣ ඬ⃟ 🔍*BUSCADORES*, Comando: _${usedPrefix}buscar_
┣ ඬ⃟ 🔊 *AUDIOS*,*- ESCRIBE LAS PALABRAS O FRASES SIN NINGUN PREFIJO _${usedPrefix}audios-bot_
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
let q = await conn.sendMessage(m.chat, buttonMessage, { quoted: m })
return conn.sendAudioRecording(m.chat, vn, q)

}
break
//Owners o propietarios

case `owners`:
try {
const sections = [
{
title: `*LISTA DE OPCIONES*`,
rows: [

{title: `👑 >`, description: `> <funcion>`, id: `>`},
{title: `👑 =>`, description: `=> <funcion>`, id: `=>`}, 
{title: `👑 $`, description: `$ <funcion>`, id: `$`}, 
{title: `👑 SET PREFIX`, description: `Comando: ${usedPrefix}setprefix <prefijo>`, id: `${usedPrefix}setprefix`}, 
{title: `👑 RESET PREFIX`, description: `Comando: ${usedPrefix}resetprefix `, id: `${usedPrefix}resetprefix`}, 
{title: `👑 AUTOADMIN`, description: `Comando: ${usedPrefix}autoadmin `, id: `${usedPrefix}autoadmin`}, 
{title: `👑 LEAVEGC`, description: `Comando: ${usedPrefix}leavegc `, id: `${usedPrefix}leavegc`}, 
{title: `👑 CAJA FUERTE`, description: `Comando: ${usedPrefix}cajafuerte `, id: `${usedPrefix}cajafuerte`}, 
{title: `👑 BLOCKLIST`, description: `Comando: ${usedPrefix}blocklist `, id: `${usedPrefix}blocklist`}, 
{title: `👑 BLOCK`, description: `Comando: ${usedPrefix}block <@tag / numero>`, id: `${usedPrefix}block`}, 
{title: `👑 UNBLOCK`, description: `Comando: ${usedPrefix}unblock <@tag / numero> `, id: `${usedPrefix}unblock`}, 
{title: `👑 ENABLE RESTRICT`, description: `Comando: ${usedPrefix}enable restrict `, id: `${usedPrefix}enable restrict`}, 
{title: `👑 DISABLE RESTRICT`, description: `Comando: ${usedPrefix}disable restrict `, id: `${usedPrefix}disable restrict`}, 
{title: `👑 ENABLE AUTOREAD`, description: `Comando: ${usedPrefix}enable autoread `, id: `${usedPrefix}enable autoread`}, 
{title: `👑 DISABLE AUTOREAD`, description: `Comando: ${usedPrefix}disable autoread `, id: `${usedPrefix}disable autoread`}, 
{title: `👑 ENABLE PUBLIC`, description: `Comando: ${usedPrefix}enable public `, id: `${usedPrefix}enable public`}, 
{title: `👑 DISABLE PUBLIC`, description: `Comando: ${usedPrefix}disable public `, id: `${usedPrefix}disable public`}, 
{title: `👑 ENABLE PCONLY`, description: `Comando: ${usedPrefix}enable pconly `, id: `${usedPrefix}enable pconly`}, 
{title: `👑 DISABLE PCONLY`, description: `Comando: ${usedPrefix}disable pconly `, id: `${usedPrefix}disable pconly`}, 
{title: `👑 ENABLE GCONLY`, description: `Comando: ${usedPrefix}enable gconly `, id: `${usedPrefix}enable gconly`}, 
{title: `👑 DISABLE GCONLY`, description: `Comando: ${usedPrefix}disable gconly `, id: `${usedPrefix}disable gconly`}, 
{title: `👑 ENABLE ANTICALL`, description: `Comando: ${usedPrefix}enable anticall `, id: `${usedPrefix}enable anticall`}, 
{title: `👑 DISABLE ANTICALL`, description: `Comando: ${usedPrefix}disable anticall `, id: `${usedPrefix}disable anticall`}, 
{title: `👑 ENABLE ANTIPRIVADO`, description: `Comando: ${usedPrefix}enable antiprivado `, id: `${usedPrefix}enable antiprivado`}, 
{title: `👑 DISABLE ANTIPRIVADO`, description: `Comando: ${usedPrefix}disable antiprivado `, id: `${usedPrefix}disable antiprivado`}, 
{title: `👑 ENABLE MODEJADIBOT`, description: `Comando: ${usedPrefix}enable modejadibot `, id: `${usedPrefix}enable modejadibot`}, 
{title: `👑 DISABLE MODEJADIBOT`, description: `Comando: ${usedPrefix}disable modejadibot `, id: `${usedPrefix}disable modejadibot`}, 
{title: `👑 MSG`, description: `Comando: ${usedPrefix}msg <texto> `, id: `${usedPrefix}msg`}, 
{title: `👑 BANCHAT`, description: `Comando: ${usedPrefix}banchat `, id: `${usedPrefix}banchat`}, 
{title: `👑 UNBANCHAT`, description: `Comando: ${usedPrefix}unbanchat `, id: `${usedPrefix}unbanchat`}, 
{title: `👑 BANUSER`, description: `Comando: ${usedPrefix}banuser <@tag> `, id: `${usedPrefix}banuser`}, 
{title: `👑 UNBANUSER`, description: `Comando: ${usedPrefix}unbanuser <@tag> `, id: `${usedPrefix}unbanuser`}, 
{title: `👑 DAR DIAMANTES`, description: `Comando: ${usedPrefix}dardiamantes <@tag> `, id: `${usedPrefix}dardiamantes`}, 
{title: `👑 AÑADIR XP`, description: `Comando: ${usedPrefix}añadirxp <@tag> `, id: `${usedPrefix}añadirxp`}, 
{title: `👑 BC`, description: `Comando: ${usedPrefix}bc <texto> `, id: `${usedPrefix}bc`}, 
{title: `👑 BCCHATS`, description: `Comando: ${usedPrefix}bcchats <texto> `, id: `${usedPrefix}bcchats`}, 
{title: `👑 BCGC`, description: `Comando: ${usedPrefix}bcgc <texto> `, id: `${usedPrefix}bcgc`}, 
{title: `👑 BCBOT`, description: `Comando: ${usedPrefix}bcbot <texto> `, id: `${usedPrefix}bcbot`}, 
{title: `👑 CLEARTPM`, description: `Comando: ${usedPrefix}cleartpm `, id: `${usedPrefix}cleartpm`}, 
{title: `👑 RESTART`, description: `Comando: ${usedPrefix}restart `, id: `${usedPrefix}restart`}, 
{title: `👑 UPDATE`, description: `Comando: ${usedPrefix}update `, id: `${usedPrefix}update`}, 
{title: `👑 BANLIST`, description: `Comando: ${usedPrefix}banlist `, id: `${usedPrefix}banlist`}, 
{title: `👑 ADDPREM`, description: `Comando: ${usedPrefix}addprem <@tag> `, id: `${usedPrefix}addprem`}, 
{title: `👑 DELPREM`, description: `Comando: ${usedPrefix}delprem <@tag> `, id: `${usedPrefix}delprem`}, 
{title: `👑 LISTPREM`, description: `Comando: ${usedPrefix}listprem `, id: `${usedPrefix}listprem`}, 
{title: `👑 LISTCMD`, description: `Comando: ${usedPrefix}listcmd `, id: `${usedPrefix}listcmd`}, 
{title: `👑 SETPPBOT`, description: `Comando: ${usedPrefix}setppbot <responder a imagen> `, id: `${usedPrefix}setppbot`}, 
{title: `👑 ADDCMD`, description: `Comando: ${usedPrefix}addcmd <texto> <responder a sticker/imagen> `, id: `${usedPrefix}addcmd`}, 
{title: `👑 DELCMD`, description: `Comando: ${usedPrefix}delcmd <responder a sticker/imagen con comando o texto asignado> `, id: `${usedPrefix}delcmd`}
]}]
let resp = `${gt}✨${userm}✨ ESTE ES EL MENU DE LOS COMANDOS SOLO PARA PERSONAL CON TITULO DE OWNER O SIMILAR`
let title = `*COMANDOS SOLO PARA PERSONAL CON TITULO DE OWNER O SIMILAR ${wm}*\npowered by\n*${igfg}*`
const listMessage = {
body: {text: resp},
header: {
title, 
hasMediaAttachment: true,
imageMessage: pp.imageMessage,
},
nativeFlowMessage: {
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: "SELECCIONE AQUÍ",
sections
})
}
],
messageParamsJson: ''
},
contextInfo: {
mentionedJid: conn.parseMention(resp)
},
sections,
footer: {text: `${wm}`},
}

await delay(1 * 1000)
await conn.sendMessageList(m.chat, listMessage, estado)
await delay(1 * 1000)
return conn.sendAudioRecording(m.chat, vn, m)
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
return conn.sendAudioRecording(m.chat, vn, m)
}
break
//Ramdon

case `random`:
try{
const sections = [
{
title: `*LISTA DE OPCIONES*`,
rows: [
{title: `👾 KPOP`, description: `blackpink / exo / bts`, id: `${usedPrefix}kpop`},
{title: `👾 CRISTIANO RONALDO`, description: ``, id: `${usedPrefix}cristianoronaldo`},
{title: `👾 MESSI`, description: ``, id: `${usedPrefix}messi`},
{title: `👾 MEME`, description: ``, id: `${usedPrefix}meme`},
{title: `👾 ITZY`, description: ``, id: `${usedPrefix}itzy`},
{title: `👾 BLACKPINK`, description: ``, id: `${usedPrefix}blackpink`},
{title: `👾 LOLIVID`, description: ``, id: `${usedPrefix}lolivid`},
{title: `👾 LOLI`, description: ``, id: `${usedPrefix}loli`},
{title: `👾 NAVIDAD`, description: ``, id: `${usedPrefix}navidad`},
{title: `👾 PPCOUPLE`, description: ``, id: `${usedPrefix}ppcouple`},
{title: `👾 WPMONTAÑA`, description: ``, id: `${usedPrefix}wpmontaña`},
{title: `👾 PUBG`, description: ``, id: `${usedPrefix}pubg`},
{title: `👾 WPGAMING`, description: ``, id: `${usedPrefix}wpgaming`},
{title: `👾 WPAESTHETIC`, description: ``, id: `${usedPrefix}wpaesthetic`},
{title: `👾 WPAESTHETIC2`, description: ``, id: `${usedPrefix}wpaesthetic2`},
{title: `👾 WPRANDOM`, description: ``, id: `${usedPrefix}wprandom`}, 
{title: `👾 WALLHP`, description: ``, id: `${usedPrefix}wallhp`}, 
{title: `👾 WPVEHICULO`, description: ``, id: `${usedPrefix}wpvehiculo`},
{title: `👾 WPMOTO`, description: ``, id: `${usedPrefix}wpmoto`},
{title: `👾 COFFEE`, description: ``, id: `${usedPrefix}coffee`}, 
{title: `👾 PENTOL`, description: ``, id: `${usedPrefix}pentol`}, 
{title: `👾 CARICATURA`, description: ``, id: `${usedPrefix}caricatura`}, 
{title: `👾 CIBERESPACIO`, description: ``, id: `${usedPrefix}ciberespacio`}, 
{title: `👾 TECHNOLOGY`, description: ``, id: `${usedPrefix}technology`}, 
{title: `👾 DORAEMON`, description: ``, id: `${usedPrefix}doraemon`}, 
{title: `👾 HACKER`, description: ``, id: `${usedPrefix}hacker`}, 
{title: `👾 PLANETA`, description: ``, id: `${usedPrefix}planeta`}, 
{title: `👾 RANDOMPROFILE`, description: ``, id: `${usedPrefix}randomprofile`},
{title: `👾 NEKO`, description: ``, id: `${usedPrefix}neko`},
{title: `👾 WAIFU`, description: ``, id: `${usedPrefix}waifu`},
{title: `👾 AKIRA`, description: ``, id: `${usedPrefix}akira`},
{title: `👾 AKIYAMA`, description: ``, id: `${usedPrefix}akiyama`},
{title: `👾 ANNA`, description: ``, id: `${usedPrefix}anna`},
{title: `👾 ASUNA`, description: ``, id: `${usedPrefix}asuna`},
{title: `👾 AYUZAWA`, description: ``, id: `${usedPrefix}ayuzawa_`},
{title: `👾 BORUTO`, description: ``, id: `${usedPrefix}boruto`},
{title: `👾 CHIHO`, description: ``, id: `${usedPrefix}chiho`},
{title: `👾 CHITOGE`, description: ``, id: `${usedPrefix}chitoge`},
{title: `👾 DEIDARA`, description: `**`, id: `${usedPrefix}deidara`},
{title: `👾 ERZA`, description: ``, id: `${usedPrefix}erza`},
{title: `👾 ELAINA`, description: ``, id: `${usedPrefix}elaina`},
{title: `👾 EBA`, description: ``, id: `${usedPrefix}eba`},
{title: `👾 EMILIA`, description: ``, id: `${usedPrefix}emilia_`},
{title: `👾 HESTIA`, description: ``, id: `${usedPrefix}hestia`},
{title: `👾 HINATA`, description: ``, id: `${usedPrefix}hinata`}, 
{title: `👾 INORI`, description: ``, id: `${usedPrefix}inori`}, 
{title: `👾 ISUZU`, description: ``, id: `${usedPrefix}isuzu`},
{title: `👾 ITACHI`, description: ``, id: `${usedPrefix}itachi`},
{title: `👾 ITORI`, description: ``, id: `${usedPrefix}itori`}, 
{title: `👾 KAGA`, description: ``, id: `${usedPrefix}kaga`}, 
{title: `👾 KAGURA`, description: ``, id: `${usedPrefix}kagura`}, 
{title: `👾 KAORI`, description: ``, id: `${usedPrefix}kaori`}, 
{title: `👾 KENEKI`, description: ``, id: `${usedPrefix}keneki`}, 
{title: `👾 KOTORI`, description: ``, id: `${usedPrefix}kotori`}, 
{title: `👾 KURUMI`, description: ``, id: `${usedPrefix}kurumi`}, 
{title: `👾 MADARA`, description: ``, id: `${usedPrefix}madara`}, 
{title: `👾 MIKASA`, description: ``, id: `${usedPrefix}mikasa`},
{title: `👾 MIKU`, description: ``, id: `${usedPrefix}miku`},
{title: `👾 MINATO`, description: ``, id: `${usedPrefix}minato`}, 
{title: `👾 NARUTO`, description: ``, id: `${usedPrefix}naruto`}, 
{title: `👾 NEZUKO`, description: ``, id: `${usedPrefix}nezuko`}, 
{title: `👾 SAGIRI`, description: ``, id: `${usedPrefix}sagiri`}, 
{title: `👾 SASUKE`, description: ``, id: `${usedPrefix}sasuke`}, 
{title: `👾 SAKURA`, description: ``, id: `${usedPrefix}sakura`},
{title: `👾 COSPLAY`, description: ``, id: `${usedPrefix}cosplay`},
]}, ]
let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS RANDOM\n✨${userm}✨`
let title = `*COMANDOS RANDOM ${wm}*\npowered by\n*${igfg}*`
const listMessage = {
body: {text: resp},
header: {
title, 
hasMediaAttachment: true,
imageMessage: pp.imageMessage,
},
nativeFlowMessage: {
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: "SELECCIONE AQUÍ",
sections
})
}
],
messageParamsJson: ''
},
contextInfo: {
mentionedJid: conn.parseMention(resp)
},
sections,
footer: {text: `${wm}`},
}

await delay(1 * 1000)
await conn.sendMessageList(m.chat, listMessage, estado)
await delay(1 * 1000)
return conn.sendAudioRecording(m.chat, vn, m)
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
return conn.sendAudioRecording(m.chat, vn, m)
}
break
//RPG, Limites y economia para juegos de rol

case `rpg`:
try {
const sections = [
{
title: `*LISTA DE OPCIONES*`,
rows: [
{title: `⚗️ PASE`, description: ``, id: `${usedPrefix}pase premium`},
{title: `⚗️ PASS`, description: ``, id: `${usedPrefix}pass premium`},
{title: `⚗️ LISTAPREMIUM`, description: ``, id: `${usedPrefix}listapremium | listprem`},
{title: `⚗️ TRANSFERIR`, description: `*tipo cantidad @tag*`, id: `${usedPrefix}transfer `},
{title: `⚗️ DAR`, description: ``, id: `${usedPrefix}dar *tipo cantidad @tag*`},
{title: `⚗️ ENVIAR`, description: `*tipo cantidad @tag*`, id: `${usedPrefix}enviar `},
{title: `⚗️ BALANCE`, description: ``, id: `${usedPrefix}balance`},
{title: `⚗️ CARTERA`, description: ``, id: `${usedPrefix}cartera | wallet`},
{title: `⚗️ EXPERIENCIA`, description: ``, id: `${usedPrefix}experiencia | exp`},
{title: `⚗️ TOP`, description: ``, id: `${usedPrefix}top | lb | leaderboard`},
{title: `⚗️ NIVEL`, description: ``, id: `${usedPrefix}nivel | level | lvl`},
{title: `⚗️ ROL`, description: ``, id: `${usedPrefix}rol | rango`},
{title: `⚗️ INVENTARIO`, description: ``, id: `${usedPrefix}inventario | inventory`},
{title: `⚗️ AVENTURA`, description: ``, id: `${usedPrefix}aventura | adventure`},
{title: `⚗️ CAZA`, description: ``, id: `${usedPrefix}caza | cazar | hunt`},
{title: `⚗️ PESCAR`, description: ``, id: `${usedPrefix}pescar | fishing`},
{title: `⚗️ ANIMALES`, description: ``, id: `${usedPrefix}animales`},
{title: `⚗️ ALIMENTOS`, description: ``, id: `${usedPrefix}alimentos`},
{title: `⚗️ CURAR`, description: ``, id: `${usedPrefix}curar | heal`},
{title: `⚗️ BUY`, description: ``, id: `${usedPrefix}buy`},
{title: `⚗️ SELL`, description: ``, id: `${usedPrefix}sell`},
{title: `⚗️ VERIFICAR`, description: ``, id: `${usedPrefix}verificar | registrar`},
{title: `⚗️ PERFIL`, description: ``, id: `${usedPrefix}perfil | profile`},
{title: `⚗️ MYNS`, description: ``, id: `${usedPrefix}myns`},
{title: `⚗️ UNREG`, description: ``, id: `${usedPrefix}unreg *numero de serie*`},
{title: `⚗️ MINAR DIAMANTES`, description: ``, id: `${usedPrefix}minardiamantes | minargemas`},
{title: `⚗️ MINAR AMXCOINS`, description: ``, id: `${usedPrefix}minaramxcoins | minarcoins`},
{title: `⚗️ MINAR EXPERIENCIA`, description: ``, id: `${usedPrefix}minarexperiencia | minarexp`},
{title: `⚗️ MINAR`, description: ``, id: `${usedPrefix}minar *:* minar2 *:* minar3`},
{title: `⚗️ RECLAMAR`, description: ``, id: `${usedPrefix}reclamar | regalo | claim`},
{title: `⚗️ CADA HORA`, description: ``, id: `${usedPrefix}cadahora | hourly`},
{title: `⚗️ CADA SEMANA`, description: ``, id: `${usedPrefix}cadasemana | semanal | weekly`},
{title: `⚗️ CADA MES`, description: ``, id: `${usedPrefix}cadames | mes | monthly`},
{title: `⚗️ COFRE`, description: ``, id: `${usedPrefix}cofre | abrircofre | coffer`},
{title: `⚗️ TRABAJAR`, description: ``, id: `${usedPrefix}trabajar | work`}
]}, ]
let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS DE ROL PARA GRUPOS\n✨${userm}✨\nAsi que: Compra, Adquiere Recuersos, Mejora Tú Nivel y Rango!!`
let title = `*COMANDOS DE ROL PARA GRUPOS ${wm}*\npowered by\n*${igfg}*`
const listMessage = {
body: {text: resp},
header: {
title, 
hasMediaAttachment: true,
imageMessage: pp.imageMessage,
},
nativeFlowMessage: {
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: "SELECCIONE AQUÍ",
sections
})
}
],
messageParamsJson: ''
},
contextInfo: {
mentionedJid: conn.parseMention(resp)
},
sections,
footer: {text: `${wm}`},
}

await delay(1 * 1000)
await conn.sendMessageList(m.chat, listMessage, estado)
await delay(1 * 1000)
return conn.sendAudioRecording(m.chat, vn, `../media/menu.mp3`, null, m, true, { type: `audioMessage`, ptt: true})

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
return conn.sendAudioRecording(m.chat, vn, m)
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
{title: `🔞 PACK`, description: `Comando: ${usedPrefix}pack `, id: `${usedPrefix}pack`},
{title: `🔞 PACK2`, description: `Comando: ${usedPrefix}pack2 `, id: `${usedPrefix}pack2`},
{title: `🔞 PACK3`, description: `Comando: ${usedPrefix}pack3 `, id: `${usedPrefix}pack3`},
{title: `🔞 VIDEO XXX`, description: `Comando: ${usedPrefix}videoxxx `, id: `${usedPrefix}videoxxx`},
{title: `🔞 TETAS`, description: `Comando: ${usedPrefix}tetas `, id: `${usedPrefix}tetas`},
{title: `🔞 BOOTY`, description: `Comando: ${usedPrefix}booty `, id: `${usedPrefix}booty`},
{title: `🔞 ECCHI`, description: `Comando: ${usedPrefix}ecchi `, id: `${usedPrefix}ecchi`},
{title: `🔞 FURRO`, description: `Comando: ${usedPrefix}furro `, id: `${usedPrefix}furro`},
{title: `🔞 IMAGEN LESBIANS`, description: `Comando: ${usedPrefix}imagenlesbians `, id: `${usedPrefix}imagenlesbians`},
{title: `🔞 PANTIES`, description: `Comando: ${usedPrefix}panties `, id: `${usedPrefix}panties`},
{title: `🔞 PENE`, description: `Comando: ${usedPrefix}pene `, id: `${usedPrefix}pene`},
{title: `🔞 PORNO`, description: `Comando: ${usedPrefix}porno `, id: `${usedPrefix}porno`},
{title: `🔞 PORNO2`, description: `Comando: ${usedPrefix}porno2 `, id: `${usedPrefix}porno2`},
{title: `🔞 RANDOM XXX`, description: `Comando: ${usedPrefix}randomxxx `, id: `${usedPrefix}randomxxx`},
{title: `🔞 PECHOS`, description: `Comando: ${usedPrefix}pechos `, id: `${usedPrefix}pechos`},
{title: `🔞 YAOI`, description: `Comando: ${usedPrefix}yaoi `, id: `${usedPrefix}yaoi`},
{title: `🔞 YAOI2`, description: `Comando: ${usedPrefix}yaoi2 `, id: `${usedPrefix}yaoi2`},
{title: `🔞 YURI`, description: `Comando: ${usedPrefix}yuri `, id: `${usedPrefix}yuri`},
{title: `🔞 YURI2`, description: `Comando: ${usedPrefix}yuri2 `, id: `${usedPrefix}yuri2`},
{title: `🔞 TRAPITO`, description: `Comando: ${usedPrefix}trapito `, id: `${usedPrefix}trapito`},
{title: `🔞 HENTAI`, description: `Comando: ${usedPrefix}hentai `, id: `${usedPrefix}hentai`},
{title: `🔞 PIES`, description: `Comando: ${usedPrefix}pies `, id: `${usedPrefix}pies`},
{title: `🔞 NSFW LOLI`, description: `Comando: ${usedPrefix}nsfwloli `, id: `${usedPrefix}nsfwloli`},
{title: `🔞 NSFW ORGY`, description: `Comando: ${usedPrefix}nsfworgy `, id: `${usedPrefix}nsfworgy`},
{title: `🔞 NSFW FOOT`, description: `Comando: ${usedPrefix}nsfwfoot `, id: `${usedPrefix}nsfwfoot`},
{title: `🔞 NSFW ASS`, description: `Comando: ${usedPrefix}nsfwass `, id: `${usedPrefix}nsfwass`},
{title: `🔞 NSFW BDSM`, description: `Comando: ${usedPrefix}nsfwbdsm `, id: `${usedPrefix}nsfwbdsm`},
{title: `🔞 NSFW CUM`, description: `Comando: ${usedPrefix}nsfwcum `, id: `${usedPrefix}nsfwcum`},
{title: `🔞 NSFWERO`, description: `Comando: ${usedPrefix}nsfwero `, id: `${usedPrefix}nsfwero`},
{title: `🔞 NSFWFEMDOM`, description: `Comando: ${usedPrefix}nsfwfemdom `, id: `${usedPrefix}nsfwfemdom`},
{title: `🔞 NSFW GLASS`, description: `Comando: ${usedPrefix}nsfwglass `, id: `${usedPrefix}nsfwglass`},
]}, ]
let resp = `${gt} ✨${userm}✨(PUERCO🐽) ESTE ES EL MENU DE LOS COMANDOS +18`
let title = `*COMANDOS +18 ${wm}*\npowered by\n*${igfg}*`
const listMessage = {
body: {text: resp},
header: {
title, 
hasMediaAttachment: true,
imageMessage: pp.imageMessage,
},
nativeFlowMessage: {
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: "SELECCIONE AQUÍ",
sections
})
}
],
messageParamsJson: ''
},
contextInfo: {
mentionedJid: conn.parseMention(resp)
},
sections,
footer: {text: `${wm}`},
}

await delay(1 * 1000)
await conn.sendMessageList(m.chat, listMessage, estado)
await delay(1 * 1000)
return conn.sendAudioRecording(m.chat, vn, m)
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
return conn.sendAudioRecording(m.chat, vn, m)
}
break
//Stickers

case `stickermenu`:
try {
const sections = [
{
title: `*LISTA DE OPCIONES*`,
rows: [
{title: `🌠 STICKER`, description: `Comando: ${usedPrefix}sticker <responder a imagen o video> o <enlace / link / url>`, id: `${usedPrefix}sticker`},
{title: `🌠 S`, description: `Comando: ${usedPrefix}s <responder a imagen o video> o <enlace / link / url>`, id: `${usedPrefix}s`},
{title: `🌠 SFULL`, description: `Comando: ${usedPrefix}sfull <responder a imagen o video>`, id: `${usedPrefix}sfull`},
{title: `🌠 EMOJIMIX`, description: `Comando: ${usedPrefix}emojimix <emoji 1>&<emoji 2>`, id: `${usedPrefix}emojimix`},
{title: `🌠 SCIRCLE`, description: `Comando: ${usedPrefix}scircle <responder a imagen>`, id: `${usedPrefix}scircle`},
{title: `🌠 SREMOVEBG`, description: `Comando: ${usedPrefix}sremovebg <responder a imagen>`, id: `${usedPrefix}sremovebg`},
{title: `🌠 SEMOJI`, description: `Comando: ${usedPrefix}semoji <tipo> <emoji>`, id: `${usedPrefix}semoji`},
{title: `🌠 ATTP`, description: `Comando: ${usedPrefix}attp <texto>`, id: `${usedPrefix}attp`},
{title: `🌠 ATTP2`, description: `Comando: ${usedPrefix}attp2 <texto>`, id: `${usedPrefix}attp2`},
{title: `🌠 ATTP3`, description: `Comando: ${usedPrefix}attp3 <texto>`, id: `${usedPrefix}attp3`},
{title: `🌠 TTP`, description: `Comando: ${usedPrefix}ttp <texto>`, id: `${usedPrefix}ttp`},
{title: `🌠 TTP2`, description: `Comando: ${usedPrefix}ttp2 <texto>`, id: `${usedPrefix}ttp2`},
{title: `🌠 TTP3`, description: `Comando: ${usedPrefix}ttp3 <texto>`, id: `${usedPrefix}ttp3`},
{title: `🌠 TTP4`, description: `Comando: ${usedPrefix}ttp4 <texto>`, id: `${usedPrefix}ttp4`},
{title: `🌠 TTP5`, description: `Comando: ${usedPrefix}ttp5 <texto>`, id: `${usedPrefix}ttp5`},
{title: `🌠 PAT`, description: `Comando: ${usedPrefix}pat <@tag>`, id: `${usedPrefix}pat`},
{title: `🌠 SLAP`, description: `Comando: ${usedPrefix}slap <@tag>`, id: `${usedPrefix}slap`},
{title: `🌠 KISS`, description: `Comando: ${usedPrefix}kiss <@tag>`, id: `${usedPrefix}kiss`},
{title: `🌠 DADO`, description: `Comando: ${usedPrefix}dado`, id: `${usedPrefix}dado`},
{title: `🌠 WM`, description: `Comando: ${usedPrefix}wm <packname> <author>`, id: `${usedPrefix}wm`},
{title: `🌠 STICKERMARKER`, description: `Comando: ${usedPrefix}stickermarker <efecto> <responder a imagen>`, id: `${usedPrefix}stickermarker`},
{title: `🌠 STICKERFILTER`, description: `Comando: ${usedPrefix}stickerfilter <efecto> <responder a imagen>`, id: `${usedPrefix}stickerfilter`} 
]}, ]
let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS PARA HACER STICKERS\n✨${userm}✨`
let title = `*COMANDOS PARA HACER STICKERS ${wm}*\npowered by\n*${igfg}*`
const listMessage = {
body: {text: resp},
header: {
title, 
hasMediaAttachment: true,
imageMessage: pp.imageMessage,
},
nativeFlowMessage: {
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: "SELECCIONE AQUÍ",
sections
})
}
],
messageParamsJson: ''
},
contextInfo: {
mentionedJid: conn.parseMention(resp)
},
sections,
footer: {text: `${wm}`},
}

await delay(1 * 1000)
await conn.sendMessageList(m.chat, listMessage, estado)
await delay(1 * 1000)
try {
let vn = `./media/menu.mp3`
let str = `por si quieres mas info`.trim()
conn.sendButton(m.chat, str, wm, null,[[`💎 GRUPOS OFICIALES 💎`, `/grupos`], [`🤴 OWNER 🤴`, `/owner`], [`🔰 INFOBOT 🔰`, `/infobot`] ], m,) 
await delay(1 * 1000)
return conn.sendAudioRecording(m.chat, vn, m)
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
return conn.sendAudioRecording(m.chat, vn, m)
}
break
//Youtube opciones

case `youtube`:
try {
const sections = [
{
title: `*LISTA DE OPCIONES*`,
rows: [
{title: `📥 Youtube AUDIO`, description: `Use el Comando: ${usedPrefix}ytmp3 + enlace`, id: `${usedPrefix}ytmp3`},
{title: `📥 Youtube VIDEO`, description: `Use el Comando: ${usedPrefix}ytmp4 + enlace`, id: `${usedPrefix}ytmp4`},
{title: `📥 Youtube AUDIO (force)`, description: `Use el Comando: ${usedPrefix}ytmp3doc + enlace`, id: `${usedPrefix}ytmp3doc`},
{title: `📥 Youtube VIDEO (force)`, description: `Use el Comando: ${usedPrefix}ytmp4doc + enlace`, id: `${usedPrefix}ytmp4doc`}, 

]}, ]
let resp = `${gt} ESTE ES EL MENU DE LOS COMANDOS DE YOUTUBE\n✨${userm}✨\npowered by\n*${igfg}*

*📅 ${gt} Fecha: ${week}, ${date}*
*📈 Tiempo activo: ${gt}: ${uptime}*
*📊 Registrados: ${rtotalreg}*`
let title = `*COMANDOS DE YOUTUBE ${wm}*\npowered by\n*${igfg}*`
const listMessage = {
body: {text: resp},
header: {
title, 
hasMediaAttachment: true,
imageMessage: pp.imageMessage,
},
nativeFlowMessage: {
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: "SELECCIONE AQUÍ",
sections
})
}
],
messageParamsJson: ''
},
contextInfo: {
mentionedJid: conn.parseMention(resp)
},
sections,
footer: {text: `${wm}`},
}

await delay(1 * 1000)
await conn.sendMessageList(m.chat, listMessage, estado)
await delay(1 * 1000)
return conn.sendAudioRecording(m.chat, vn, m)
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
return conn.sendAudioRecording(m.chat, vn, m)
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