//Integracion de menus (objetivo en reduccion del 50% de los archivos de la carpeta plugins)

//idea y arreglos Rey Endymion

import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import fs,{ promises } from 'fs'
import path, { join } from 'path'
import { plugins, getCommandVariants, wrapText } from '../lib/functions.js'
let handler = async (m, {conn, start, info, usedPrefix, usedPrefix: _p, pluginsPath, groupMetadata, text, command, args, isOwner, isAdmin, isROwner, chat, usersdb, userdb, objs, senderJid}) => {
const {media} = await import('../config.js')
const {multiplier} = await import('../lib/constants.js')
const footer = info.nanipe
const {imagen1 } = objs
const pp = fs.readFileSync(imagen1)
const vn = fs.readFileSync(path.join(media, 'audios/menu.mp3'))
let estado = {key: {participant: "0@s.whatsapp.net", "remoteJid": "0@s.whatsapp.net"}, "message": {"groupInviteMessage": {"groupJid": "51995386439-1616969743@g.us", "inviteCode": "m", "groupName": "P", "caption": footer, 'jpegThumbnail': pp}}}

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid 
let usertag = `@${who.split("@")[0]}`
let username = await conn.getName(senderJid)
let locale = 'es'
let d = new Date(new Date + 3600000)
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
console.log('menu: ', pluginsPath)
let _package = JSON.parse(await promises.readFile(join(pluginsPath, '../package.json')).catch(_ => ({}))) || {}
let { exp, limit, level, role } = usersdb[senderJid]
let { min, xp, max } = xpRange(level, multiplier)
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
let time = d.toLocaleTimeString(locale, {
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
})
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000
}
let muptime = clockString(_muptime)
let uptime = clockString(_uptime)
let totalreg = Object.keys(usersdb).length
let rtotalreg = Object.values(usersdb).filter(user => user.registered == true).length
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
level, limit, username, weton, week, date, time, totalreg, rtotalreg, role,
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
let { money, joincount } = usersdb[senderJid]
let mentionedJid = [who]
if (/^(asistente|audioefect|buscar|cajafuerte|chatanonimo|convert|descargas|facebook|fun|gadmin|herramientas|info|juegos|logosefectos|owners|random|rpg|nsfw|stickermenu|youtube|menubots)$/i.test(command)) {
const aliasToType = {
audioefect: 'audio efectos',
buscar: 'buscar',
cajafuerte: 'caja fuerte',
chatanonimo: 'chat anonimo',
convert: 'convertidores',
descargas: 'descargas',
fun: 'bromas/diversion',
gadmin: 'administracion de grupos',
herramientas: 'herramientas',
info: 'informacion',
juegos: 'juegos',
logosefectos: 'logos y efectos',
menubots: 'serbotmenu',
owners: 'owners',
random: 'random',
rpg: 'rpg',
nsfw: 'nsfw',
stickermenu: 'menu stickers',
}
let textoFinal = ``
let lineaFinal = ``
let encontrado = false
const maxChars = m.isGroup ? 29 : 29
const sections = []
const resultados = []

let combinaciones = []
for (const [_, plugin] of plugins.entries()) {
if (plugin.name !== 'handler') continue
if (plugin.type !== command) continue
encontrado = true

if (Array.isArray(plugin.menu)) {
const isGrouped = plugin.menu.every(item => typeof item === 'object' && Array.isArray(item.rows))

const rows = []
if (isGrouped) {
for (const group of plugin.menu) {

for (const item of group.rows) {
if (!item.title && !item.description && !item.id) continue
rows.push({
header: item.header || '',
title: item.title || 'Sin título',
description: item.description?.replace(/#/g, `${usedPrefix}`) || '',
id: usedPrefix + item.id || ''
})
}

if (rows.length > 0) {
sections.push({
title: group.title || 'Sin título',
rows
})
}
}
} else {
for (const item of plugin.menu) {
if (!item.title && !item.description && !item.id) continue
rows.push({
header: item.header || '',
title: item.title || 'Sin título',
description: item.description?.replace(/#/g, `${usedPrefix}`) || '',
id: usedPrefix + item.id || ''
})
}

if (rows.length > 0) {
sections.push({
rows
})
}
}
}
}

if (!encontrado || sections.length === 0) {
return conn.sendWritingText(m.chat, `❌ El menú *${command}* no está disponible por el momento.`, userdb, m)
}
const totalComandos = sections.reduce((acc, section) => acc + section.rows.length, 0)
let title = `*${aliasToType[command].toUpperCase()} ${footer}*\npowered by:\n*${info.namerepre}*`

let resp = `${info.kom} ${totalComandos} comandos de ${aliasToType[command]}\n✨${usertag}✨*`
let buttonText = '🧾 Ver opciones'


console.log('submenus: ', userdb.lang)
if (start.buttons) {
const listMessage = {
title: title,
text: resp,
buffer: pp,
buttonText: buttonText,
footer: footer,
sections: sections,
options: {}
}

return conn.sendList(m.chat, listMessage, userdb, m)
} else {
if (m.isGroup) {
textoFinal = `╔═══════════════════╗\n📂 *Menú: ${aliasToType[command].toUpperCase()}*\n╚═══════════════════╝\n\n`
textoFinal += `${title}\n${resp}\n\n`
let totalComandos = 0
if (Array.isArray(sections)) {
const isGrouped = rows.every(item => typeof item === 'object' && Array.isArray(item.rows))


if (isGrouped) {
for (const group of sections) {
if (group.title) textoFinal += `\n╠═ 📂 *${group.title.toUpperCase()}*\n`
for (const item of group.rows) {
if (!item.title && !item.description && !item.id) continue
textoFinal += `╠════════════════════\n`
if (item.title) textoFinal += `┣ *${item.title}*\n`
if (item.description) textoFinal += wrapText(item.description.replace(/#/g, `${usedPrefix}`), maxChars).split('\n').map((line, index) => index === 0 ? `┣ 📝 ${line}` : `┣ ${line}`).join('\n') + '\n'
if (item.id) textoFinal += `┣ 📎 *Comando:* ${item.id}\n`
totalComandos++
//
}
}
} else {
for (const item of sections) {
if (!item.title && !item.description && !item.id) continue
textoFinal += `╠════════════════════\n`
if (item.title) textoFinal += `┣ *${item.title}*\n`
if (item.description) textoFinal += item.description.replace(/#/g, `${usedPrefix}`).split('\n').map((line, index) => index === 0 ? `┣ 📝 ${line}` : `┣ ${line}`).join('\n') + '\n'
if (item.id) textoFinal += `┣ 📎 *Comando:* ${item.id}\n`
resultados.push({
comandos: combinaciones.getRandom(),
})
totalComandos++
}
}
}

lineaFinal = `╚═══════════════════╝`
} else {
textoFinal = `╔═════════════════════╗\n📂 *Menú: ${aliasToType[command].toUpperCase()}*\n╚═════════════════════╝\n\n`
textoFinal += `${title}\n${resp}\n\n`
//comando.map(v => v + ' <pencarian>')
let totalComandos = 0
if (Array.isArray(sections)) {
const isGrouped = rows.every(item => typeof item === 'object' && Array.isArray(item.rows))

if (isGrouped) {
for (const group of sections) {
if (group.title) textoFinal += `\n╠═ 📂 *${group.title.toUpperCase()}*\n`
for (const item of group.rows) {
if (!item.title && !item.description && !item.id) continue
textoFinal += `╠══════════════════════\n`
if (item.title) textoFinal += `┣ *${item.title}*\n`
if (item.description) textoFinal += wrapText(item.description.replace(/#/g, `${usedPrefix}`), maxChars).split('\n').map((line, index) => index === 0 ? `┣ 📝 ${line}` : `┣ ${line}`).join('\n') + '\n'
if (item.id) textoFinal += `┣ 📎 *Comando:* ${item.id}\n`
totalComandos++
}
}
} else {
for (const item of sections) {
if (!item.title && !item.description && !item.id) continue
textoFinal += `╠══════════════════════\n`
if (item.title) textoFinal += `┣ *${item.title}*\n`
//console.log('submenus: ', item.description.replace(/#/g, `${usedPrefix}`).split('\n').map((line, index) => index === 0 ? `┣ 📝 ${line}` : `┣ ${line}`).join('\n'))
if (item.description) textoFinal += wrapText(item.description.replace(/#/g, `${usedPrefix}`), maxChars).split('\n').map((line, index) => index === 0 ? `┣ 📝 ${line}` : `┣ ${line}`).join('\n') + '\n'
if (item.id) textoFinal += `┣ 📎 *Comando:* ${item.id}\n`
totalComandos++
}
}
}

lineaFinal = `╚═════════════════════╝`
}
if (!encontrado) {
textoFinal = `❌ El menú *${command}* no está disponible por el momento.`
} else {
const resp = `${textoFinal}\n${lineaFinal}`
return conn.sendWritingText(m.chat, resp.trim(), userdb, m)
}
}

}

//Audios del bot

if(command == 'audios') {
const audiosPath = path.join(media, 'audios')
const filepath = path.join(pluginsPath, `nv-global.js`)
const {menuInfo} = await import(filepath)
let source = fs.readFileSync(filepath, 'utf8');
const regexAudio = /let\s+\w+\s*=\s*path\.join\([^,]+,\s*['"`]audios\/([^'"`]+\.mp3)['"`]\)/g

console.log('submenus: ', filepath, menuInfo, await import(filepath))
let match
const resultados = []
let files = []
while ((match = regexAudio.exec(source)) !== null) {
const nombreArchivo = match[1]
const lineaLet = match[0]

const desde = source.indexOf(lineaLet)
const siguienteIf = source.indexOf('if', desde)
const lineaIf = source.slice(siguienteIf, source.indexOf('{', siguienteIf))

const regexDentroIf = lineaIf.match(/\/(.*?)\/[gimsuy]*/)

if (!regexDentroIf) continue

const rawRegex = regexDentroIf[1]
const flags = regexDentroIf[0].split('/').pop() // 'i'
const regex = new RegExp(rawRegex, flags)

let combinaciones = []
combinaciones.push(getCommandVariants(regex))
const rutaCompleta = path.join(audiosPath, nombreArchivo)

if (fs.existsSync(rutaCompleta)) {
resultados.push({
archivo: nombreArchivo,
comandos: combinaciones.getRandom(),
})
}
}
const sections = [
{
title: `${info.kom} ELIJE PARA PROBAR LOS AUDIOS`, 
rows: menuInfo.rows
}, ]

try {
files = fs.readdirSync(audiosPath)
} catch (e) {
console.error('❌ Error leyendo carpeta de audios:', e)
}
let encontrado = false

const audioNames = files.filter(f => f.endsWith('.mp3') || f.endsWith('.ogg') || f.endsWith('.wav') || f.endsWith('.m4a')).map(f => path.parse(f).name.toLowerCase())
const comandoMap = new Map()

for (const { archivo, comandos } of resultados) {
comandoMap.set(archivo, comandos)
for (const cmd of comandos) {
}
}

sections[0].rows = sections[0].rows.map(row => {
if (!row?.id && row?.description) return row

const entry = Array.from(comandoMap.entries()).find(([archivo, variantes]) => 
variantes.includes(row.id.toLowerCase())

)

if (!entry) {
for (const [archivo, variantes] of comandoMap.entries()) {
if (
variantes.some(v => v.includes(row.id.toLowerCase())) ||
row.id.toLowerCase().includes(archivo.replace(/\.mp3$/, '').toLowerCase())
) {
}
}
return null
}

const [archivo, variantes] = entry
const idRandom = variantes.getRandom()

return {
title: row.title || `🔊 ${capitalize(idRandom)}`,
id: idRandom
}
}).filter(Boolean)
const totalAudios = sections[0].rows.length
const totalComandos = sections.reduce((acc, section) => acc + section.rows.length, 0)
let textoFinal = `╔═══════════════════╗\n📂 *Menú: ${command.toUpperCase()}*\n╚═══════════════════╝\n\n`


const listMessage = {
text: `${info.kom} ✨${username}✨estos son los audios predeterminados del Bot`,
footer: `${footer}`,
title: `*MENU AUDIOS ${footer}*\npowered by\n*${info.namerepre}*`,
buttonText: "SELECCIONE AQUÍ",
sections: sections }

listMessage.title = `*MENU AUDIOS ${footer}* (${totalAudios})\npowered by\n*${info.namerepre}*`
let str = `${usertag} por si quieres mas informacion aqui unos botones\n`.trim()
const buttonMessage = {
text: str, 
footer: footer,
}
const options = {url: imagen1, contextInfo: { mentionedJid: [who] }}
const buttons = [['📮 DONAR 📮', '/donasi'], ['🌹 OWNER 🌹', '/owner'], ['🐾 INFOBOT 🐾', '/infobot']]
if (start.buttons) {
await conn.sendList(m.chat, listMessage, estado)

return conn.sendButton(m.chat, buttonMessage, options, buttons, m) 
} else {
textoFinal += `${listMessage.title}\n${listMessage.text}\n\n`
let totalComandos = 0
if (Array.isArray(sections)) {
encontrado = true
const isGrouped = sections.every(item => typeof item === 'object' && Array.isArray(item.rows))

if (isGrouped) {
for (const group of sections) {
if (group.title) textoFinal += `\n╠═ 📂 *${group.title.toUpperCase()}*\n`
for (const item of group.rows) {
if (!item.title && !item.description && !item.id) continue
textoFinal += `╠════════════════════\n`
if (item.title) textoFinal += `┣ *${item.title}*\n`
if (item.description) textoFinal += `┣ 📝 ${item.description.replace('#', usedPrefix)}\n`
if (item.id) textoFinal += `┣ 📎 *Usa el texto:* ${item.id}\n`
totalComandos++
}
}
} else {
for (const item of sections) {
if (!item.title && !item.description && !item.id) continue
textoFinal += `╠════════════════════\n`
if (item.title) textoFinal += `┣ *${item.title}*\n`
if (item.description) textoFinal += `┣ 📝 ${item.description.replace('#', usedPrefix)}\n`
if (item.id) textoFinal += `┣ 📎 *Comando:* ${usedPrefix+item.id}\n`
totalComandos++
}
}
}
if (!encontrado) {
textoFinal = `❌ El menú *${command}* no está disponible por el momento.`
} else {
const resp = `${textoFinal}\n╚═══════════════════╝`
return conn.sendWritingText(m.chat, resp.trim(), userdb, m)
}
}
}

//Informacion del usuario

if (command == 'infoyo') {
let str = `
*${info.kom} aqui esta lo que yo puedo saber de ti segun tu participacion en grupos ✨${usertag}✨👺👍*


╭〘 ✯✯✯✯✯✯✯✯✯✯ 〙╮
║ ◉— ${footer} —◉
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡║
║➤ *Owner:* ${info.author}
║➤ *PayPal:* https://www.paypal.me/AMxScan
║➤ *Fecha:* ${date}
║➤ *Tiempo activo:* ${uptime}
║➤ *Usuarios:* ${rtotalreg}
╰═╡✯✯✯✯✯✯✯✯✯═╯

┏━━━━━━━━━━━━━━━━━━━┓
┃ *INFO DEL USUARIO*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣ *🎖️ Nivel:* ${level}
┣ *🧰 Experiencia:* ${exp}
┣ *⚓ Rango:* ${role}
┣ *💎 Diamantes:* ${limit}
┣ *👾 AMXCoins:* ${money}
┣ *🪙 Tokens:* ${joincount}
┣ *🎟️ Premium:* ${userdb.premiumTime > 0 ? '✅' : '❌'}
┗━━━━━━━━━━━━━━━━━━━┛
`.trim()
const buttons = [['📮 DONAR 📮', '/donasi'], ['🌹 OWNER 🌹', '/owner'], ['https://www.facebook.com/groups/otakustogether', 'GRUPO FACE']]
if (start.buttons) {
const messageObj = {
text: str,
footer
}
return conn.sendButton(m.chat, messageObj, {url: imagen1}, buttons, userdb, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendImageWriting(m.chat, pp, str+'\n'+cmds+'\n'+'\n'+footer, userdb, m)
}
}


//Menu principal

if (command == ['menu']) {
let menuText = `${info.kom} COMANDOS MENU PRINCIPAL ✨${usertag}✨
┣ *📅 FECHA: ${week}, ${date}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📈 TIEMPO ACTIVO: ${uptime}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ *📊 REGISTRADOS: ${rtotalreg}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┏━━━ MENU PRINCIPAL DE ${footer} ━━━
┣ *bot*\nDescripcion: (uso sin prefijo), llamalo solo con "bot"* `;
let lineaFinal = ''
const menuCategorias = {
audios: {title:`🔊 *AUDIOS* `, description: `*- ESCRIBE LAS PALABRAS O FRASES SIN NINGUN PREFIJO (${usedPrefix}, /, *, .)*`, id: `${usedPrefix}audios`},
audioefect: {title:`🎤*EFECTOS DE AUDIOS*`, description: `*- RESPONDE A UN AUDIO O NOTA DE VOZ usando ${usedPrefix}audioefect*`, id: `${usedPrefix}audioefect`},
buscadores: {title:`🔍*BUSCADORES*`, description: `Comando: ${usedPrefix}buscar (buscadores de internet)`, id: `${usedPrefix}buscar`},
convert: {title:`🧧*CONVERTIDORES*`, description: `Comando: ${usedPrefix}convert (para convertidores`, id: `${usedPrefix}convert`},
descargas: {title: `📥*DESCARGAS*`, description: `Comando: ${usedPrefix}descargas (menu descargas)`, id: `${usedPrefix}descargas`},
fun: {title: `🎭*MENU DE COMEDIA*`, description: `Comando: ${usedPrefix}comedia (para comedia)`, id: `${usedPrefix}fun`},
gadmin: {title: `💎*ADMINS-GRUPOS*`, description: `Comando: ${usedPrefix}gAdmin (Solo admins)`, id: `${usedPrefix}gadmin`},
herramientas: {title:`🛠️ *HERRAMIENTAS*`, description: `Comando: ${usedPrefix}herramientas (algunas herramientas`, id: `${usedPrefix}herramientas`},
info: {title:`😉 *INFORMACION*`, description: `Para saber la información disponible para el Bot use Comando: ${usedPrefix}info`, id: `${usedPrefix}info`},
juegos: {title: `🎖️ *JUEGOS* `, description: `Comando: ${usedPrefix}juegos (menu de juegos)`, id: `${usedPrefix}juegos`},
logosefectos: {title:`🖍️*EFECTOS Y LOGOS*`, description: `Comando: ${usedPrefix}logosefectos (para optener efectos y logos)`, id: `${usedPrefix}logosefectos`},
menubots: {title: '🤖 MENU SUBBOTS', description: `Comando: ${usedPrefix}menubots (para uso de los subbots)`, id: `${usedPrefix}menubots`},
nsfw: {title:`🔞 *NSFW +18*`, description: `Comando: ${usedPrefix}nsfw `, id: `${usedPrefix}nsfw`},
owners: {title: `💎*DUEÑO (OWNERs)*`, description: `Comando: ${usedPrefix}owners (Solo owners)`, id: `${usedPrefix}owners`},
ramdom: {title:`👾*RANDOM*`, description: `Comando: ${usedPrefix}random `, id: `${usedPrefix}random`},
rpg: {title:`💵 *RPG - LIMITES - ECONOMIA*`, description: `Comando: ${usedPrefix}rpg (juegos de rol`, id: `${usedPrefix}rpg`},
stickermenu: {title:`👽 *STICKERS*`, description: `Comando: ${usedPrefix}creador-sticker (crear stickers) `, id: `${usedPrefix}stickermenu`},

}
//const values = Object.entries(global.plugins)[info.type]
let menuStrings = []
let contadorPorCategoria = {};
let categoriasYaIncluidas = new Set();
let encontrado = false
const entriesMenu = Object.entries(menuCategorias)
for (const [link, plugin] of plugins.entries()) {
const filepath = path.join(pluginsPath, `nv-global.js`)
let tipo = ''
if (link === filepath) {
const {menuInfo} = await import(filepath)
if (!menuInfo && !menuInfo?.type) continue
tipo = menuInfo.type
if (!categoriasYaIncluidas.has(tipo)) {
menuStrings.push(`┃ ${menuCategorias[tipo]}`); // texto del menú
categoriasYaIncluidas.add(tipo);
contadorPorCategoria[tipo] = menuInfo.rows.length;
} else {
contadorPorCategoria[tipo]++;
}
}
if (plugin.name !== 'handler') continue;
tipo = plugin.type;
if (!menuCategorias[tipo]) continue;

const count = Array.isArray(plugin.menu) ? plugin.menu.reduce((acc, item) => {
if (item?.rows) return acc + item.rows.length
return acc + 1
}, 0) : 0

if (!categoriasYaIncluidas.has(tipo)) {
menuStrings.push(`┃ ${menuCategorias[tipo]}`); // texto del menú
categoriasYaIncluidas.add(tipo);
contadorPorCategoria[tipo] = count;
} else {
contadorPorCategoria[tipo] += count;
}
}

menuText += '\n\n';
const rows = []
const sections = [
{title: `*LISTA DE OPCIONES*`,
rows
}
];
for (const tipo of categoriasYaIncluidas) {
const totalComandos = sections.reduce((acc, section) => acc + section.rows.length, 0)
const texto = `┃ ${tipo}: (${contadorPorCategoria[tipo]} ${tipo === 'audios' ? 'audios' : 'comandos'})`;
menuText += texto + '\n';
rows.push(menuCategorias[tipo]);
}
const title = `*${command.toUpperCase()} ${footer}*\npowered by:\n*${info.namerepre}*`

//menuText = await conn.textTagsLidToJid(menuText, m)
if (start.buttons) {
const listMessage = {
title,
text: menuText,
buffer: pp,
buttonText: '🧾 Ver opciones',
footer: footer,
sections: sections,
options: {}
}
return conn.sendList(m.chat, listMessage, userdb, m)
} else {
console.log('menu: ', categoriasYaIncluidas)
if (m.isGroup) {
encontrado = true
let totalComandos = 0
if (Array.isArray(sections)) {
const isGrouped = sections.every(item => typeof item === 'object' && Array.isArray(item.rows))

if (isGrouped) {
for (const group of sections) {
if (group.title) menuText += `\n╠═ 📂 *${group.title.toUpperCase()}*\n`
for (const item of group.rows) {
if (!item.title && !item.description && !item.id) continue
menuText += `╠════════════════════\n`
if (item.title) menuText += `┣ *${item.title}*\n`
if (item.description) menuText += item.description.replace(/#/g, `📎 ${usedPrefix}`).split('\n').map((line, index) => index === 0 ? `┣ 📝 ${line}` : `┣ ${line}`).join('\n') + '\n'
if (item.id) menuText += `┣ 📎 *Comando:* ${item.id}\n`
totalComandos++
}
}
} else {
for (const item of sections) {
if (!item.title && !item.description && !item.id) continue
menuText += `╠════════════════════\n`
if (item.title) menuText += `┣ *${item.title}*\n`
if (item.description) menuText += item.description.replace(/#/g, `📎 ${usedPrefix}`).split('\n').map((line, index) => index === 0 ? `┣ 📝 ${line}` : `┣ ${line}`).join('\n') + '\n'
if (item.id) menuText += `┣ 📎 *Comando:* ${item.id}\n`
totalComandos++
}
}
}

lineaFinal = `╚═══════════════════╝`
} else {
encontrado = true
let totalComandos = 0
if (Array.isArray(sections)) {
const isGrouped = sections.every(item => typeof item === 'object' && Array.isArray(item.rows))

if (isGrouped) {
for (const group of sections) {
if (group.title) menuText += `\n╠═ 📂 *${group.title.toUpperCase()}*\n`
for (const item of group.rows) {
if (!item.title && !item.description && !item.id) continue
menuText += `╠══════════════════════\n`
if (item.title) menuText += `┣ *${item.title}*\n`
if (item.description) menuText += item.description.replace(/#/g, `📎 ${usedPrefix}`).split('\n').map((line, index) => index === 0 ? `┣ 📝 ${line}` : `┣ ${line}`).join('\n') + '\n'
if (item.id) menuText += `┣ 📎 *Comando:* ${item.id}\n`
totalComandos++
}
}
} else {
for (const item of sections) {
if (!item.title && !item.description && !item.id) continue
menuText += `╠══════════════════════\n`
if (item.title) menuText += `┣ *${item.title}*\n`
console.log('submenus: ', item.description.replace(/#/g, `📎 ${usedPrefix}`).split('\n').map((line, index) => index === 0 ? `┣ 📝 ${line}` : `┣ ${line}`).join('\n'))
if (item.description) menuText += item.description.replace(/#/g, `📎 ${usedPrefix}`).split('\n').map((line, index) => index === 0 ? `┣ 📝 ${line}` : `┣ ${line}`).join('\n') + '\n'
if (item.id) menuText += `┣ 📎 *Comando:* ${item.id}\n`
totalComandos++
}
}
}

lineaFinal = `╚═════════════════════╝`
}
if (!encontrado) {
menuText = `❌ El menú *${command}* no está disponible por el momento.`
} else {
const resp = `${menuText}\n${lineaFinal}`
return conn.sendWritingText(m.chat, resp.trim(), userdb, m)
}
}
}
}

handler.help = ['']
handler.tags = ['menus']
handler.command = ['asistente', 'audioefect', 'audios', 'buscar', 'cajafuerte', 'chatanonimo', 'convert', 'descargas', 'facebook', 'fun', 'gadmin', 'herramientas', 'info', 'infoyo', 'juegos', 'logosefectos', 'menu', 'menubots', 'owners', 'random', 'rpg', 'nsfw', 'stickermenu', 'youtube']
handler.exp = 50
handler.register = false
handler.menu = [
{title: 'MENU INTEGRADO DINAMICO', description: 'Este menu Dinamico fue construido por ReyEndymion', id: 'fullmenu'}
];
handler.type = "menu";

handler.disabled = false;

export default handler
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}