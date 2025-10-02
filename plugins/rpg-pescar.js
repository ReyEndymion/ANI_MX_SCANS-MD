let response = {}
let handler= async (m, {conn, start, info, command, args, usedPrefix, userdb, db, senderJid}) => {
const {getRandom} = await import('../lib/functions.js')
const { rpg, rpgg, rpgshop, rpgshopp } = await import('../rpg.js');
const { owner, temp, newsletterID, sBroadCastID, groupID, media } = await import('../config.js');
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${senderJid.split('@')[0]}:${senderJid.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

let pescarUsuario = await conn.getName(senderJid)
let gancho = userdb.pancingan
let canaDePescar = userdb.pancing
let carnadaUser = userdb.umpan
let type = (args[0] || '').toLowerCase()
let pancing = userdb.pancing
let pancingan = userdb.pancingan
let nivelPescar = pancing == 0 ? 'No tengo | I do not have' : '' || pancing == 1 ? 'Nivel | Level ✦ 1' : '' || pancing == 2 ? 'Nivel | Level ✦ 2' : '' || pancing == 3 ? 'Nivel | Level ✦ 3' : '' || pancing == 4 ? 'Nivel | Level ✦ 4' : '' || pancing >= 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''
let nivelGancho = pancingan == 0 ? 'No tengo | I do not have' : '' || pancingan == 1 ? 'Nivel | Level ✦ 1' : '' || pancingan == 2 ? 'Nivel | Level ✦ 2' : '' || pancingan == 3 ? 'Nivel | Level ✦ 3' : '' || pancingan == 4 ? 'Nivel | Level ✦ 4' : '' || pancingan >= 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''

var img1 = ['https://www.lavanguardia.com/files/og_thumbnail/files/fp/uploads/2021/05/05/6092b70b84a7c.r_d.618-390-0.jpeg','https://i.blogs.es/874833/dubai1/1366_2000.jpg','https://www.orangesmile.com/extreme/img/main/marina-bay-sands-pool_2.jpg','https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Marina_Bay_Sands_in_the_evening_-_20101120.jpg/800px-Marina_Bay_Sands_in_the_evening_-_20101120.jpg','https://www.infoviajera.com/wp-content/uploads/2019/08/La_Piscina_Infinita_Mas_Grande_del_Mundo_Singapur_Marina_Bay-infinity-pool-4-d.jpg'].getRandom()
var img2 = ['https://i.ytimg.com/vi/eonYdzU1MIA/maxresdefault.jpg','https://fb36e89981.cbaul-cdnwnd.com/1c7fd8909117357b511677a932235d4e/200000528-c615dc70fe/700/lago%20tanganika%20africa.jpg?ph=fb36e89981','https://d2uqfpnktc64mn.cloudfront.net/uploads/post_section/image/813/Image-Lake-Tanganyika-Mahale-Mountains-National-Park-Tanzania-Courtesy-of-of-the-National-Science-Foundation.jpg','https://www.goafrique.it/wp-content/uploads/sites/118/2018/02/lake-tanganyika-1024x597.jpg','https://media.istockphoto.com/photos/lake-tanganyika-picture-id183316304?k=20&m=183316304&s=612x612&w=0&h=PGk1q2U-9foXY-QVorJwJF6Lrjl-uupu4iRC5st_2qo='].getRandom()
var img3 = ['https://viajes.nationalgeographic.com.es/medio/2020/05/25/agujero-azul-belice_1377ebaf_1280x720.jpg','https://www.fundacionaquae.org/wp-content/uploads/2019/08/baikal5.jpg','http://www.capital.com.pa/wp-content/uploads/2011/05/CraterLakeAerial.jpg','https://guia.viajobien.com/wp-content/uploads/2017/06/7554289674_28b922f42c_h.jpg'].getRandom()
var img4 = ['https://pinake.files.wordpress.com/2020/09/mar-caspio.jpg','https://www.meteorologiaenred.com/wp-content/uploads/2020/03/Formaci%C3%B3n-del-mar-Caspio.jpg','https://www.gaceta.unam.mx/wp-content/uploads/2021/01/caspdes.jpg','https://viajes.chavetas.es/wp-content/uploads/albums/uzbekistan16/d11-05.jpg','https://www.caracteristicas.co/wp-content/uploads/2017/03/mares-4-e1565805117646.jpg'].getRandom()
var img5 = ['https://www.caracteristicas.co/wp-content/uploads/2018/11/oceano-pacifico-2-e1583028795824.jpg','https://www.caracteristicas.co/wp-content/uploads/2018/10/oceano-pacifico-arrefice-e1540842615839.jpg','https://ecologismos.com/wp-content/2017/12/reservas-marinas.jpg','https://www.nationalgeographic.com.es/medio/2021/06/07/atun-rojo_d35c81ef_1280x853.jpg'].getRandom()

var mensajePesca = [`PREPARANDO LA ${rpgg.emoticon('fishingrod')} CAÑA DE PESCAR...`, `🪣 ALISTANDO IMPLEMENTOS DE PESCA...`, `📡 BUSCANDO LUGAR DE PESCA...`, `EN HORA BUENA!! HOY SERA UNA GRAN PESCA 🌤️`, `PREPARANDO ${rpgshopp.emoticon('pancingan')} gancho DE PESCA`, `🌊 EN BREVE EMPEZARÁ LAPESCA!!`].getRandom()
var mensajePesca2 = [`PREPARANDO LA CARNADA ${rpgshopp.emoticon('umpan')}`, `💥 PARECE QUÉ OBTENDRÁS MUCHOS PECES`, `TIENES MUCHA ENERGIA ✨ PARA UNA GRAN PESCA`, `TU NIVEL DE ${rpgg.emoticon('fishingrod')} Y ${rpgshopp.emoticon('pancingan')} ESTÁN LISTOS PARA ESTÁ GRAN PESCA!!`, `🍀 LA Suerte te brindará una excelente PESCA`, `🌊 EL NIVEL gol del agua es estable PARA COMENZAR A PESCAR`].getRandom()
var mensajePesca3 = [`TAL VEZ ATRAPO!! 🦀🦞🦐`, `TAL VEZ ATRAPO!! 🦑🐙🐡`, `TAL VEZ ATRAPO!! 🐠🐟🐬`, `TAL VEZ ATRAPO!! 🐳🦈🐋`].getRandom()
var mensajeLugar = [
// Asia
"PISCINA MARINA DE SINGAPUR",
"RIO MEKONG",
"LAGO BAIKAL",
"RIO GANGES",
"GOLFO DE TAILANDIA",

// África
"LAGUNA TANGANICA",
"RIO NILO",
"LAGO VICTORIA",
"COSTA DE NAMIBIA",

// Europa
"RIO EBRO",
"LAGO DE GINEBRA",
"FIORDOS DE NORUEGA",
"MAR BÁLTICO",
"ISLAS LOFOTEN",

// América del Sur
"LAGO TITICACA",
"RIO AMAZONAS",
"RIO PARANÁ",
"LAGUNA COLORADA",
"RIO ORINOCO",
"RIO URUGUAY",
"RIO NEGRO",

// América Central y el Caribe
"MAR CARIBE",
"LAGO DE ATITLÁN",
"LAGO NICARAGUA",
"LAGUNA DE BACALAR",

// América del Norte
"RIO COLORADO",
"RIO MISSISSIPPI",
"LAGO CHAPALA",
"GRANDES LAGOS",
"BAHÍA DE ALASKA",
"GOLFO DE MÉXICO",

// Oceanía
"GRAN BARRERA DE CORAL",
"BAHÍA DE SYDNEY",
"ISLAS FIJI",
"LAGOS DE NUEVA ZELANDA",

// Regiones polares y remotas
"OCEANO PACIFICO",
"OCEANO ATLANTICO",
"OCEANO INDICO",
"MAR CASPIO",
"MAR DE BERING",
"ISLAS MALDIVAS",
"ARCHIPIELAGO DE GALÁPAGOS",
"MAR DE WEDDELL"
];

var energia = ['10', '20', '40', '60', '90']
var carnada = ['0', '40', '80', '150', '200']
var nivelCanaDePescar = ['1', '2', '3', '4', '5', '6']
var nivelDelGancho = ['1', '2', '3', '4', '5', '6']
var nivelUser = ['2', '4', '5', '7', '10']

const sections = [
{
title: menuform.htjava + ' 🛥️ LUGARES PARA PESCAR ' + menuform.htjava,
rows: [
{title: "🎣 " + mensajeLugar[0], id: usedPrefix + command + ' 1', description: `Una piscina panora𝒎ica con varias especies 𝒎arinas!!\n`},
{title: "🎣 " + mensajeLugar[1], id: usedPrefix + command + ' 2', description: `Atrevete a pescar en la Laguna 𝒎as diversa del Mundo!!\n`}, 
{title: "🎣 " + mensajeLugar[2], id: usedPrefix + command + ' 3', description: `Considerada la Madre de los Lagos, aqui tal vez esten los Cala𝒎ares!!\n`},
{title: "🎣 " + mensajeLugar[3], id: usedPrefix + command + ' 4', description: `Un lago tan grande que es probable que abunde 𝒎uchas especies 𝒎arinas!!\n`},
{title: "🎣 " + mensajeLugar[4], id: usedPrefix + command + ' 5', description: `Un Mar tan grande y Profundo Perfecto para Pescar!!\n`}
]}]

const listMessage = {
text: `🦦 *ELIJA EN QUÉ LUGAR QUIERES PESCAR!!*`,
footer: `*- - - - - - - - - - - - - - - - - -*
*⊹ ${rpgshop.emoticon('stamina')}*
➥ *${userdb.stamina}%* ${rpgshopp.emoticon('stamina')}
*⊹ ${rpgshop.emoticon('umpan')}*
➥ *${userdb.umpan}* ${rpgshopp.emoticon('umpan')}
*⊹ ${rpgshop.emoticon('pancing')}*
➥ *${nivelPescar}* ${rpgshopp.emoticon('pancing')}
*⊹ ${rpgshop.emoticon('pancingan')}*
➥ *${nivelGancho}* ${rpgshopp.emoticon('pancingan')}
*- - - - - - - - - - - - - - - - - -*
*PREMIUM ${userdb.premium ? "✅": "❌"}*
${info.nanipe}`,
title: `*⎔───ꕤ PESCA ꕤ───⎔*`,
buttonText: `${rpgshopp.emoticon('pancing')} PESCAR ${rpgshopp.emoticon('pancing')}`,
sections }

try {
if (/fishing|mancing|pescar/i.test(command)) {
switch (type) {

case '1':
let __temporizador1 = userdb.lastmancingeasy + 3600000 //1 h lastfishing
let totalTiempo1 = clockString(__temporizador1 - new Date() * 1)
let usuario = conn.getName(senderJid)

if (userdb.level <= 1) {
const resp = `${pescarUsuario} NECESITAS TENER EL NIVEL *${nivelUser[0]}*`
const buff = `NIVEL ACTUAL: *${userdb.level}*\n` + info.nanipe
const buttons = [[`ACTUALIZAR MI NIVEL ${rpgg.emoticon('level')}`, `${usedPrefix}nivel`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, null,buttons, fkontak)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
} 
if (userdb.stamina < 9) {
const resp = `${pescarUsuario} NO TIENES SUFICIENTE ENERGIA. MINIMO NECESITAS UN *${energia[0]}%* DE ENERGIA ✨`
const buff = `ENERGIA ACTUAL: ${rpgg.emoticon('stamina')} *${userdb.stamina}%*\n` + info.nanipe
const buttons = [[`COMPRAR ${energia[0]}% ${rpgg.emoticon('stamina')}`, `${usedPrefix}buy stamina 10`], [`🎒 INVENTARIO`, `${usedPrefix}inventario`], [`MENU ☘️`, `${usedPrefix}menu`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, null, buttons, fkontak)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
} 
if (userdb.pancingan > 0 ) {
if (userdb.pancing > 0 ) {
if (userdb.umpan > 0 ) {
if (new Date - userdb.lastmancingeasy > 3600000) {
	
let ikan = `${Math.floor(Math.random() * 10)}`.trim()
let lele = `${Math.floor(Math.random() * 10)}`.trim() 
let nila = `${Math.floor(Math.random() * 10)}`.trim() 
let bawal = `${Math.floor(Math.random() * 10)}`.trim() 
let buntal = `${Math.floor(Math.random() * 10)}`.trim() 
let udang = `${Math.floor(Math.random() * 10)}`.trim()
let paus = `${Math.floor(Math.random() * 10)}`.trim() 
let kepiting = `${Math.floor(Math.random() * 10)}`.trim()

let _psepick= `${pickRandom([1, 0, 0, 1])}`
let psepick = (_psepick * 1)
let _psenjata = `${pickRandom([1, 0, 0, 0])}`
let psenjata = (_psenjata * 1)

let pesca1 = `
${rpgg.emoticon('fishingrod')} RESULTADO DE SU PESCA!! ${pescarUsuario}

🌊🐟🌊 Pez : Fish » ${ikan}
🌊🐟🌊 Super Pez : Fish Super » ${lele}
🌊🦭🌊 Foca : Sea Lion » ${nila}
🌊🐡🌊 Pez Globo : Blowfish » ${bawal}
🌊🐡🌊 Super Pez Globo : Blowfish Super » ${buntal}
🌊🦐🌊 Camarón : Shrimp » ${udang}
🌊🐳🌊 Ballena : Whale » ${paus}
🌊🦀🌊 Cangrejo : Crab » ${kepiting}` 

setTimeout(async () => {
const resp = `${pescarUsuario} HEY JUEGA DE NUEVO A PESCAR EN ${rpgg.emoticon('fishingrod')} ${mensajeLugar[0]}`
const buff = info.nanipe
const buttons = [[`${rpgg.emoticon('fishingrod')} PESCAR DE NUEVO`, `${usedPrefix}pescar 1`]]
if (start.buttons) {
conn.sendHydrated(m.chat, resp, info.nanipe, null, null, null, null, null, buttons, null)
conn.sendButton( m.chat, resp, buff, null, buttons, fkontak)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 3600000) 

setTimeout(() => {
const resp = `${rpgg.emoticon('fishingrod')} ${mensajeLugar[0]}\n` + info.nanipe
const buff = info.nanipe
const buttons = [[`🎒 INVENTARIO`, `${usedPrefix}inventario`]]
if (start.buttons) {
conn.sendButton( m.chat, resp, pesca1, img1, buttons, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 35000)

setTimeout(() => {
if (psepick > 0 ) {
userdb.psepick += psepick * 1
const resp = `🥳 ACABAS DE OBTENER *${psepick}* TRAJE COMUN!! 🧥`
const buff = info.nanipe
const buttons = [[`${rpgg.emoticon('fishingrod')} PESCAR OTRA VEZ`, `${usedPrefix}pescar`], [`🎒 INVENTARIO`, `${usedPrefix}inventario`]]
if (start.buttons) {
conn.sendButton( m.chat, resp, info.nanipe, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}
}, 33000)

setTimeout(() => {
if(psenjata > 0 ) {
userdb.psenjata += psenjata * 1
const resp = `🥳 ACABAS DE OBTENER *${psenjata}* TRAJE EPICO!! 🥷`
const buff = info.nanipe
const buttons = [[`${rpgg.emoticon('fishingrod')} PESCAR OTRA VEZ`, `${usedPrefix}pescar`], [`🎒 INVENTARIO`, `${usedPrefix}inventario`]]
if (start.buttons) {
conn.sendButton( m.chat, resp, info.nanipe, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}
}, 30000)

setTimeout(() => {
const resp = `${pescarUsuario} ${mensajePesca3}`
const buff = info.nanipe
const buttons = [[`${rpgg.emoticon('fishingrod')} PESCAR DE NUEVO`, `${usedPrefix}pescar 1`]]
if (start.buttons) {
conn.sendHydrated(m.chat, resp, info.nanipe, null, null, null, null, null, buttons, null)
conn.sendButton( m.chat, resp, null, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 15000)

setTimeout(() => {
const resp = `${pescarUsuario} ${mensajePesca2}`
const buff = info.nanipe
const buttons = [[`${rpgg.emoticon('fishingrod')} PESCAR DE NUEVO`, `${usedPrefix}pescar 1`]]
if (start.buttons) {
conn.sendHydrated(m.chat, resp, info.nanipe, null, null, null, null, null, buttons, null)
conn.sendButton( m.chat, resp, null, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 8000)

setTimeout(() => {
const resp = `${pescarUsuario} ${mensajePesca}`
const buff = info.nanipe
const buttons = [[`${rpgg.emoticon('fishingrod')} PESCAR DE NUEVO`, `${usedPrefix}pescar 1`]]
if (start.buttons) {
conn.sendHydrated(m.chat, resp, info.nanipe, null, null, null, null, null, buttons, null)
conn.sendButton( m.chat, resp, null, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 0)

userdb.lastmancingeasy = new Date * 1
userdb.ikan += ikan * 1
userdb.lele += lele * 1
userdb.nila += nila * 1
userdb.bawal += bawal * 1
userdb.buntal += buntal * 1 
userdb.udang += udang * 1
userdb.paus += paus * 1
userdb.kepiting += kepiting * 1
userdb.umpan -= 1
userdb.stamina -= 2 * 1

} else {
const resp = `YA FUE E PESCA POR FAVOR DESCANSE`
const buff = `TIEMPO DEL DESCANSO:\n${totalTiempo1}\n\n` + info.nanipe
const buttons = [[`MENU ☘️`, `${usedPrefix}menu`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
} 
} else {
const resp = `NO TIENE *${rpgshop.emoticon('umpan')}* PARA PESCAR`
const buff = info.nanipe
const buttons = [[`COMPRAR 10 CARNADA ${rpgshopp.emoticon('umpan')}`, `${usedPrefix}buy umpan 10`], [`COMPRAR 50 CARNADA ${rpgshopp.emoticon('umpan')}`, `${usedPrefix}buy umpan 50`], [`🏪 TIENDA PARA COMPRAR`, `${usedPrefix}buy`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, info.nanipe, buttons, fkontak,m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}
} else {
const resp = `NO TIENE *${rpgshop.emoticon('pancing')}* PARA PESCAR`
const buff = info.nanipe
const buttons = [[`COMPRAR CAÑA DE PESCAR ${rpgshopp.emoticon('pancing')}`, `${usedPrefix}buy pancing 1`], [`COMPRAR 2 CAÑA DE PESCAR ${rpgshopp.emoticon('pancingan')}`, `${usedPrefix}buy pancing 2`]]
if (start.buttons) {
return conn.sendButton(m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanipe, m );
}
}
} else {
const resp = `NO TIENE *${rpgshop.emoticon('pancingan')}* PARA PESCAR`
const buff = info.nanipe
const buttons = [[`COMPRAR UN GANCHO ${rpgshopp.emoticon('pancingan')}`, `${usedPrefix}buy pancingan 1`], [`COMPRAR 2 GANCHO ${rpgshopp.emoticon('pancingan')}`, `${usedPrefix}buy pancingan 2`]]
if (start.buttons) {
return conn.sendButton(m.chat, resp, buff, null, buttons, fkontak)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}
break

case '2':
let __temporizador2 = userdb.lastmancingeasy + 3600000 //1 h
let tiempoTotal2 = clockString(__temporizador2 - new Date() * 1)
if (userdb.level <= 3) {
const resp = `${pescarUsuario} NECESITAS TENER EL NIVEL *${nivelUser[1]}*`
const buff = `NIVEL ACTUAL: *${userdb.level}*\n` + info.nanipe
const buttons = [[`ACTUALIZAR MI NIVEL ${rpgg.emoticon('level')}`, `${usedPrefix}nivel`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, null,buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
} 
if (userdb.stamina < 19) {
const resp = `${pescarUsuario} NO TIENES SUFICIENTE ENERGIA. MINIMO NECESITAS UN *${energia[1]}%* DE ENERGIA ✨`
const buff = `ENERGIA ACTUAL: ${rpgg.emoticon('stamina')} *${userdb.stamina}%*\n` + info.nanipe
const buttons = [[`COMPRAR ${energia[1]}% ${rpgg.emoticon('stamina')}`, `${usedPrefix}buy stamina 20`], [`🎒 INVENTARIO`, `${usedPrefix}inventario`], [`MENU ☘️`, `${usedPrefix}menu`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
} 
if (gancho <= 0) {
const resp = `NO TIENE *${rpgshop.emoticon('umpan')}* PARA PESCAR`
const buff = info.nanipe
const buttons = [[`COMPRAR 10 CARNADA ${rpgshopp.emoticon('umpan')}`, `${usedPrefix}buy umpan 10`], [`COMPRAR 50 CARNADA ${rpgshopp.emoticon('umpan')}`, `${usedPrefix}buy umpan 50`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanipe, m );
}
}
if (canaDePescar <= 0) {
const resp = `NO TIENE *${rpgshop.emoticon('pancing')}* PARA PESCAR`
const buff = info.nanipe
const buttons = [[`COMPRAR 1 CAÑA DE PESCAR ${rpgshopp.emoticon('pancing')}`, `${usedPrefix}buy pancing 1`], [`COMPRAR 2 CAÑA DE PESCAR ${rpgshopp.emoticon('pancing')}`, `${usedPrefix}buy pancing 2`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanipe, m );
}
}
if (carnadaUser <= 0) {
const resp = `NO TIENE *${rpgshop.emoticon('pancingan')}* PARA PESCAR`
const buff = info.nanipe
const buttons = [[`COMPRAR UN GANCHO ${rpgshopp.emoticon('pancingan')}`, `${usedPrefix}buy pancingan 1`], [`COMPRAR 2 GANCHO ${rpgshopp.emoticon('pancingan')}`, `${usedPrefix}buy pancingan 2`]]
if (start.buttons) {
return conn.sendButton(m.chat, resp, buff, buttons, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanipe, m );
}
}
if (new Date - userdb.lastmancingeasy > 3600000) {
if (userdb.pancing > 1) {
if (userdb.pancingan > 1) {
if (userdb.umpan > 39) {

let resultado1 = `${Math.floor(Math.random() * 20)}`
let resultado2 = `${Math.floor(Math.random() * 20)}`
let resultado3 = `${Math.floor(Math.random() * 20)}`
let resultado4 = `${Math.floor(Math.random() * 20)}`
let resultado5 = `${Math.floor(Math.random() * 20)}`
let resultado6 = `${Math.floor(Math.random() * 20)}`
let resultado7 = `${Math.floor(Math.random() * 20)}`
let resultado8 = `${Math.floor(Math.random() * 20)}`
let resultado9 = `${Math.floor(Math.random() * 20)}`
let resultado10 = `${Math.floor(Math.random() * 20)}`
let resultado11 = `${Math.floor(Math.random() * 20)}`
let resultado12 = `${Math.floor(Math.random() * 20)}`
let resultado13 = `${Math.floor(Math.random() * 20)}`

let total1 = (resultado1 * 1)
let total2 = (resultado2 * 1) 
let total3 = (resultado3 * 1)
let total4 = (resultado4 * 1)
let total5 = (resultado5 * 1)
let total6 = (resultado6 * 1)
let total7 = (resultado7 * 1)
let total8 = (resultado8 * 1)
let total9 = (resultado9 * 1)
let total10 = (resultado10 * 1)
let total11 = (resultado11 * 1)
let total12 = (resultado12 * 1)
let total13 = (resultado13 * 1)

let zero1 = `${total1}`
let zero2 = `${total2}`
let zero3 = `${total3}`
let zero4 = `${total4}`
let zero5 = `${total5}`
let zero6 = `${total6}`
let zero7 = `${total7}`
let zero8 = `${total8}`
let zero9 = `${total9}`
let zero10 = `${total10}`
let zero11 = `${total11}`
let zero12 = `${total12}`

let pesca2 = `
${htjava} RESULTADO DE SU PESCA ${pescarUsuario} ${htjava}
🌊🦀🌊 = ${zero2}		 🌊🐠🌊 = ${zero6}
🌊🦞🌊 = ${zero8}			🌊🐟🌊 = ${zero11}
🌊🦐🌊 = ${zero10}			 🌊🐬🌊 = ${zero7}
🌊🦑🌊 = ${zero4}			🌊🐳🌊 = ${zero12}
🌊🐙🌊 = ${zero3}			 🌊🦈🌊 = ${zero9}
🌊🐡🌊 = ${zero5}			🌊🐋🌊 = ${zero1} 

BONO: +1 ${rpgshop.emoticon('tiketcoin')}
`.trim()

setTimeout(() => {
const resp = `${pescarUsuario} HEY JUEGA DE NUEVO A PESCAR EN ${rpgg.emoticon('fishingrod')} ${mensajeLugar[1]}`
const buff = info.nanipe
const buttons = [[`${rpgg.emoticon('fishingrod')} PESCAR DE NUEVO`, `${usedPrefix}pescar 2`]]
if (start.buttons) {
conn.sendHydrated(m.chat, resp, buff, null, null, null, null, null, buttons, null)
conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 3600000) 

setTimeout(() => {
const resp = `${rpgg.emoticon('fishingrod')} ${mensajeLugar[1]}\n` + info.nanipe
const buff = pesca2
const buttons = [[`🎒 INVENTARIO`, `${usedPrefix}inventario`]]
if (start.buttons) {
conn.sendButton( m.chat, resp, buff, img2, buttons, null)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 35000) 

setTimeout(() => {
const resp = `${pescarUsuario} ${mensajePesca3}`
const buff = info.nanipe
const buttons = [[`🎒 INVENTARIO`, `${usedPrefix}inventario`]]
if (start.buttons) {
conn.sendHydrated(m.chat, resp, buff, null, null, null, null, null, [[null, null]], null)
conn.sendButton( m.chat, resp, buff, img2, buttons, null)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 15000)

setTimeout(() => {
const resp = `${pescarUsuario} ${mensajePesca2}`
const buff = info.nanipe
const buttons = [[`🎒 INVENTARIO`, `${usedPrefix}inventario`]]
if (start.buttons) {
conn.sendHydrated(m.chat, resp, buff, null, null, null, null, null, [[null, null]], null)
conn.sendButton( m.chat, resp, buff, img2, buttons, null)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 8000)

setTimeout(() => {
const resp = `${pescarUsuario} ${mensajePesca}`
const buff = info.nanipe
const buttons = [[`🎒 INVENTARIO`, `${usedPrefix}inventario`]]
if (start.buttons) {
conn.sendHydrated(m.chat, resp, buff, null, null, null, null, null, [[null, null]], null)
conn.sendButton( m.chat, resp, buff, img2, buttons, null)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 0)

userdb.lastmancingeasy = new Date * 1
userdb.paus += total1
userdb.kepiting += total2
userdb.gurita += total3
userdb.cumi += total4 
userdb.buntal += total5
userdb.dory += total6
userdb.lumba += total7
userdb.lobster += total8
userdb.hiu += total9
userdb.udang += total10
userdb.ikan += total1
userdb.orca += total2
userdb.umpan -= total13
userdb.tiketcoin += 1
userdb.stamina -= 4 * 1

} else {
const resp = `MINIMO *${carnada[1]}* DE *${rpgshop.emoticon('umpan')}* PARA PESCAR`
const buff = info.nanipe
const buttons = [[`COMPRAR ${carnada[1]} ${rpgshopp.emoticon('umpan')}`, `${usedPrefix}buy umpan 40`], [`COMPRAR 100 ${rpgshopp.emoticon('umpan')}`, `${usedPrefix}buy umpan 100`]]
if (start.buttons) {
conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}
} else {
const resp = `SU *${rpgshop.emoticon('pancingan')}* NECESITAS EL NIVEL *${nivelDelGancho[1]}* PARA PESCAR`
const buff = info.nanipe
const buttons = [[`SUBIR AL NIVEL ${nivelCanaDePescar[1]} ${rpgshopp.emoticon('pancingan')}`, `${usedPrefix}buy pancingan 2`], [`SUBIR AL NIVEL ${nivelCanaDePescar[2]} ${rpgshopp.emoticon('pancingan')}`, `${usedPrefix}buy pancingan 3`]]
if (start.buttons) {
conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}
} else {
const resp = `SU *${rpg.emoticon('fishingrod')}* NECESITAS EL NIVEL *${nivelCanaDePescar[1]}* PARA PESCAR`
const buff = info.nanipe
const buttons = [[`SUBIR AL NIVEL ${nivelCanaDePescar[1]} ${rpgg.emoticon('fishingrod')}`, `${usedPrefix}buy pancing 2`], [`SUBIR AL NIVEL ${nivelCanaDePescar[2]} ${rpgg.emoticon('fishingrod')}`, `${usedPrefix}buy pancing 3`]]
if (start.buttons) {
conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}
} else {
const resp = `YA FUE DE PESCA POR FAVOR DESCANSE`
const buff = `TIEMPO DEL DESCANSO:\n${tiempoTotal2}\n\n` + info.nanipe
const buttons = [[`MENU ☘️`, `${usedPrefix}menu`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
} 
break

case '3':
let __temporizador3 = userdb.lastmancingnormal + 3600000 //1 h
let tiempoTotal3 = clockString(__temporizador3 - new Date() * 1)
if (userdb.level <= 4) {
const resp = `${pescarUsuario} NECESITAS TENER EL NIVEL *${nivelUser[2]}*`
const buff = `NIVEL ACTUAL: *${userdb.level}*\n` + info.nanipe
const buttons = [[`ACTUALIZAR MI NIVEL ${rpgg.emoticon('level')}`, `${usedPrefix}nivel`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}
if (userdb.stamina < 39) {
const resp = `${pescarUsuario} NO TIENES SUFICIENTE ENERGIA. MINIMO NECESITAS UN *${energia[2]}%* DE ENERGIA ✨`
const buff = `ENERGIA ACTUAL: ${rpgg.emoticon('stamina')} *${userdb.stamina}%*\n` + info.nanipe
const buttons = [[`COMPRAR ${energia[2]}% ${rpgg.emoticon('stamina')}`, `${usedPrefix}buy stamina 40`], [`🎒 INVENTARIO`, `${usedPrefix}inventario`], [`MENU ☘️`, `${usedPrefix}menu`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}

if (new Date - userdb.lastmancingnormal > 3600000) {
if (userdb.pancing > 2) {
if (userdb.pancingan > 2) {
if (userdb.umpan > 79) {

let resultado1 = `${Math.floor(Math.random() * 30)}`
let resultado2 = `${Math.floor(Math.random() * 30)}`
let resultado3 = `${Math.floor(Math.random() * 30)}`
let resultado4 = `${Math.floor(Math.random() * 30)}`
let resultado5 = `${Math.floor(Math.random() * 30)}`
let resultado6 = `${Math.floor(Math.random() * 30)}`
let resultado7 = `${Math.floor(Math.random() * 30)}`
let resultado8 = `${Math.floor(Math.random() * 30)}`
let resultado9 = `${Math.floor(Math.random() * 30)}`
let resultado10 = `${Math.floor(Math.random() * 30)}`
let resultado11 = `${Math.floor(Math.random() * 30)}`
let resultado12 = `${Math.floor(Math.random() * 30)}`
let resultado13 = `${Math.floor(Math.random() * 40)}`

let total1 = (resultado1 * 1)
let total2 = (resultado2 * 1) 
let total3 = (resultado3 * 1)
let total4 = (resultado4 * 1)
let total5 = (resultado5 * 1)
let total6 = (resultado6 * 1)
let total7 = (resultado7 * 1)
let total8 = (resultado8 * 1)
let total9 = (resultado9 * 1)
let total10 = (resultado10 * 1)
let total11 = (resultado11 * 1)
let total12 = (resultado12 * 1)
let total13 = (resultado13 * 1)

let zero1 = `${total1}`
let zero2 = `${total2}`
let zero3 = `${total3}`
let zero4 = `${total4}`
let zero5 = `${total5}`
let zero6 = `${total6}`
let zero7 = `${total7}`
let zero8 = `${total8}`
let zero9 = `${total9}`
let zero10 = `${total10}`
let zero11 = `${total11}`
let zero12 = `${total12}`

let pescar3 = `
${htjava} RESULTADO DE SU PESCA ${pescarUsuario} ${htjava}
🌊🦀🌊 = ${zero2}		 🌊🐠🌊 = ${zero6}
🌊🦞🌊 = ${zero8}		 🌊🐟🌊 = ${zero11}
🌊🦐🌊 = ${zero10}	 🌊🐬🌊 = ${zero7}
🌊🦑🌊 = ${zero4}		 🌊🐳🌊 = ${zero12}
🌊🐙🌊 = ${zero3}		 🌊🦈🌊 = ${zero9}
🌊🐡🌊 = ${zero5}		 🌊🐋🌊 = ${zero1} 

BONO: +1 ${rpgshop.emoticon('tiketcoin')}`.trim()

setTimeout(() => {
const resp = `${pescarUsuario} HEY JUEGA DE NUEVO A PESCAR EN ${rpgg.emoticon('fishingrod')} ${mensajeLugar[2]}`
const buff = info.nanipe
const buttons = [[`${rpgg.emoticon('fishingrod')} PESCAR DE NUEVO`, `${usedPrefix}pescar 3`]]
if (start.buttons) {
conn.sendHydrated(m.chat, resp, info.nanipe, null, null, null, null, null, buttons, null)
conn.sendButton( m.chat, resp, buff, img2, buttons, null)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 3600000) 

setTimeout(() => {
const resp = `${rpgg.emoticon('fishingrod')} ${mensajeLugar[2]}\n` + info.nanipe
const buff = pescar3
const buttons = [[`🎒 INVENTARIO`, `${usedPrefix}inventario`]]
if (start.buttons) {
conn.sendButton( m.chat, resp, buff, img3, buttons, null)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 35000)

setTimeout(() => {
const resp = `${pescarUsuario} ${mensajePesca3}`
const buff = info.nanipe
const buttons = [[`${rpgg.emoticon('fishingrod')} PESCAR DE NUEVO`, `${usedPrefix}pescar 3`]]
if (start.buttons) {
conn.sendHydrated(m.chat, resp, info.nanipe, null, null, null, null, null, buttons, null)
conn.sendButton( m.chat, resp, buff, null, buttons, null)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 15000)

setTimeout(() => {
const resp = `${pescarUsuario} ${mensajePesca2}`
const buff = info.nanipe
const buttons = [[`${rpgg.emoticon('fishingrod')} PESCAR DE NUEVO`, `${usedPrefix}pescar 3`]]
if (start.buttons) {
conn.sendHydrated(m.chat, resp, info.nanipe, null, null, null, null, null, buttons, null)
conn.sendButton( m.chat, resp, buff, img2, buttons, null)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 8000)

setTimeout(() => {
const resp = `${pescarUsuario} ${mensajePesca}`
const buff = info.nanipe
const buttons = [[`${rpgg.emoticon('fishingrod')} PESCAR DE NUEVO`, `${usedPrefix}pescar 3`]]
if (start.buttons) {
conn.sendHydrated(m.chat, resp, info.nanipe, null, null, null, null, null, buttons, null)
conn.sendButton( m.chat, resp, buff, img2, buttons, null)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 0)

userdb.lastmancingnormal = new Date * 1
userdb.paus += total1
userdb.kepiting += total2
userdb.gurita += total3
userdb.cumi += total4 
userdb.buntal += total5
userdb.dory += total6
userdb.lumba += total7
userdb.lobster += total8
userdb.hiu += total9
userdb.udang += total10
userdb.ikan += total1
userdb.orca += total2
userdb.umpan -= total13
userdb.tiketcoin += 1 
userdb.stamina -= 6 * 1 

} else {
const resp = `MINIMO *${carnada[2]}* DE *${rpgshop.emoticon('umpan')}* PARA PESCAR`
const buff = info.nanipe
const buttons = [[`COMPRAR ${carnada[2]} ${rpgshopp.emoticon('umpan')}`, `${usedPrefix}buy umpan 80`], [`COMPRAR 200 ${rpgshopp.emoticon('umpan')}`, `${usedPrefix}buy umpan 200`], [`🏪 TIENDA PARA COMPRAR`, `${usedPrefix}buy`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}
} else {
const resp = `SU *${rpgshop.emoticon('pancingan')}* NECESITAS EL NIVEL *${nivelDelGancho[2]}* PARA PESCAR`
const buff = info.nanipe
const buttons = [[`SUBIR AL NIVEL ${nivelCanaDePescar[2]} ${rpgshopp.emoticon('pancingan')}`, `${usedPrefix}buy pancingan 3`], [`SUBIR AL NIVEL ${nivelCanaDePescar[3]} ${rpgshopp.emoticon('pancingan')}`, `${usedPrefix}buy pancingan 4`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}
} else {
const resp = `SU *${rpg.emoticon('fishingrod')}* NECESITAS EL NIVEL *${nivelCanaDePescar[2]}* PARA PESCAR`
const buff = info.nanipe
const buttons = [[`SUBIR AL NIVEL ${nivelCanaDePescar[2]} ${rpgg.emoticon('fishingrod')}`, `${usedPrefix}buy pancing 3`], [`SUBIR AL NIVEL ${nivelCanaDePescar[3]} ${rpgg.emoticon('fishingrod')}`, `${usedPrefix}buy pancing 4`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}
} else {
const resp = `YA FUE DE PESCA POR FAVOR DESCANSE`
const buff = `TIEMPO DEL DESCANSO:\n${tiempoTotal3}\n\n` + info.nanipe
const buttons = [[`MENU ☘️`, `${usedPrefix}menu`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, img2, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
} 
break

case '4':
let __temporizador4 = userdb.lastmancinghard + 3600000 
let tiempoTotal4 = clockString(__temporizador4 - new Date() * 1)
if (userdb.level <= 6) {
const resp = `${pescarUsuario} NECESITAS TENER EL NIVEL *${nivelUser[3]}*`
const buff = `NIVEL ACTUAL: *${userdb.level}*\n`
const buttons = [[`ACTUALIZAR MI NIVEL ${rpgg.emoticon('level')}`, `${usedPrefix}nivel`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff + info.nanipe, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}
if (userdb.stamina < 59) {
const resp = `${pescarUsuario} NO TIENES SUFICIENTE ENERGIA. MINIMO NECESITAS UN *${energia[3]}%* DE ENERGIA ✨`
const buff = `ENERGIA ACTUAL: ${rpgg.emoticon('stamina')} *${userdb.stamina}%*\n` + info.nanipe
const buttons = [[`COMPRAR ${energia[3]}% ${rpgg.emoticon('stamina')}`, `${usedPrefix}buy stamina 60`], [`🎒 INVENTARIO`, `${usedPrefix}inventario`], [`MENU ☘️`, `${usedPrefix}menu`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
} 

if (new Date - userdb.lastmancinghard > 3600000) {
if (userdb.pancing > 3) {
if (userdb.pancingan > 3) {
if (userdb.umpan > 149) {

let resultado1 = `${Math.floor(Math.random() * 40)}`
let resultado2 = `${Math.floor(Math.random() * 40)}`
let resultado3 = `${Math.floor(Math.random() * 40)}`
let resultado4 = `${Math.floor(Math.random() * 40)}`
let resultado5 = `${Math.floor(Math.random() * 40)}`
let resultado6 = `${Math.floor(Math.random() * 40)}`
let resultado7 = `${Math.floor(Math.random() * 40)}`
let resultado8 = `${Math.floor(Math.random() * 40)}`
let resultado9 = `${Math.floor(Math.random() * 40)}`
let resultado10 = `${Math.floor(Math.random() * 40)}`
let resultado11 = `${Math.floor(Math.random() * 40)}`
let resultado12 = `${Math.floor(Math.random() * 40)}`
let resultado13 = `${Math.floor(Math.random() * 75)}`

let total1 = (resultado1 * 1)
let total2 = (resultado2 * 1) 
let total3 = (resultado3 * 1)
let total4 = (resultado4 * 1)
let total5 = (resultado5 * 1)
let total6 = (resultado6 * 1)
let total7 = (resultado7 * 1)
let total8 = (resultado8 * 1)
let total9 = (resultado9 * 1)
let total10 = (resultado10 * 1)
let total11 = (resultado11 * 1)
let total12 = (resultado12 * 1)
let total13 = (resultado13 * 1)

let zero1 = `${total1}`
let zero2 = `${total2}`
let zero3 = `${total3}`
let zero4 = `${total4}`
let zero5 = `${total5}`
let zero6 = `${total6}`
let zero7 = `${total7}`
let zero8 = `${total8}`
let zero9 = `${total9}`
let zero10 = `${total10}`
let zero11 = `${total11}`
let zero12 = `${total12}`

let pescar4 = `
${htjava} RESULTADO DE SU PESCA ${pescarUsuario} ${htjava}
🌊🦀🌊 = ${zero2}		 🌊🐠🌊 = ${zero6}
🌊🦞🌊 = ${zero8}			🌊🐟🌊 = ${zero11}
🌊🦐🌊 = ${zero10}		🌊🐬🌊 = ${zero7}
🌊🦑🌊 = ${zero4}			🌊🐳🌊 = ${zero12}
🌊🐙🌊 = ${zero3}			🌊🦈🌊 = ${zero9}
🌊🐡🌊 = ${zero5}			🌊🐋🌊 = ${zero1} 

BONO: +1 ${rpgshop.emoticon('tiketcoin')}
`.trim()

setTimeout(() => {
const resp = `${pescarUsuario} HEY JUEGA DE NUEVO A PESCAR EN ${rpgg.emoticon('fishingrod')} ${mensajeLugar[3]}`
const buff = info.nanipe
const buttons = [[`${rpgg.emoticon('fishingrod')} PESCAR DE NUEVO`, `${usedPrefix}pescar 3`]]
if (start.buttons) {
conn.sendHydrated(m.chat, resp, buff, null, null, null, null, null, buttons, null)
conn.sendButton( m.chat, resp, buff + info.nanipe, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 3600000) 

setTimeout(() => {
const resp = `${rpgg.emoticon('fishingrod')} ${mensajeLugar[3]}\n` + info.nanipe
const buff = pescar4
const buttons = [[`🎒 INVENTARIO`, `${usedPrefix}inventario`]]
if (start.buttons) {
conn.sendButton( m.chat, resp, buff, img4, buttons, null)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 35000)

setTimeout(() => {
const resp = `${pescarUsuario} ${mensajePesca3}`
const buff = info.nanipe
const buttons = [[`${rpgg.emoticon('fishingrod')} PESCAR DE NUEVO`, `${usedPrefix}pescar 3`]]
if (start.buttons) {
conn.sendHydrated(m.chat, resp, buff, null, null, null, null, null, buttons, null)
conn.sendButton( m.chat, resp, buff + info.nanipe, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 15000)

setTimeout(() => {
const resp = `${pescarUsuario} ${mensajePesca2}`
const buff = info.nanipe
const buttons = [[`${rpgg.emoticon('fishingrod')} PESCAR DE NUEVO`, `${usedPrefix}pescar 3`]]
if (start.buttons) {
conn.sendHydrated(m.chat, resp, buff, null, null, null, null, null, buttons, null)
conn.sendButton( m.chat, resp, buff + info.nanipe, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 8000)

setTimeout(() => {
const resp = `${pescarUsuario} ${mensajePesca}`
const buff = info.nanipe
const buttons = [[`${rpgg.emoticon('fishingrod')} PESCAR DE NUEVO`, `${usedPrefix}pescar 3`]]
if (start.buttons) {
conn.sendHydrated(m.chat, resp, buff, null, null, null, null, null, buttons, null)
conn.sendButton( m.chat, resp, buff + info.nanipe, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 0)

userdb.lastmancinghard = new Date * 1
userdb.paus += total1
userdb.kepiting += total2
userdb.gurita += total3
userdb.cumi += total4 
userdb.buntal += total5
userdb.dory += total6
userdb.lumba += total7
userdb.lobster += total8
userdb.hiu += total9
userdb.udang += total10
userdb.ikan += total1
userdb.orca += total2
userdb.umpan -= total13
userdb.tiketcoin += 1
userdb.stamina -= 8 * 1

} else {
const resp = `MINIMO *${carnada[3]}* DE *${rpgshop.emoticon('umpan')}* PARA PESCAR`
const buff = info.nanipe
const buttons = [[`COMPRAR ${carnada[3]} ${rpgshopp.emoticon('umpan')}`, `${usedPrefix}buy umpan 150`], [`COMPRAR 400 ${rpgshopp.emoticon('umpan')}`, `${usedPrefix}buy umpan 400`], [`🏪 TIENDA PARA COMPRAR`, `${usedPrefix}buy`]]
if (start.buttons) {
conn.sendButton( m.chat, resp, buff + info.nanipe, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}
} else {
const resp = `SU *${rpgshop.emoticon('pancingan')}* NECESITAS EL NIVEL *${nivelDelGancho[3]}* PARA PESCAR`
const buff = info.nanipe
const buttons = [[`SUBIR AL NIVEL ${nivelCanaDePescar[3]} ${rpgshopp.emoticon('pancingan')}`, `${usedPrefix}buy pancingan 4`], [`SUBIR AL NIVEL ${nivelCanaDePescar[4]} ${rpgshopp.emoticon('pancingan')}`, `${usedPrefix}buy pancingan 5`]]
if (start.buttons) {
conn.sendButton( m.chat, resp, buff + info.nanipe, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}
} else {
const resp = `SU *${rpg.emoticon('fishingrod')}* NECESITAS EL NIVEL *${nivelCanaDePescar[3]}* PARA PESCAR`
const buff = info.nanipe
const buttons = [[`SUBIR AL NIVEL ${nivelCanaDePescar[3]} ${rpgg.emoticon('fishingrod')}`, `${usedPrefix}buy pancing 4`], [`SUBIR AL NIVEL ${nivelCanaDePescar[4]} ${rpgg.emoticon('fishingrod')}`, `${usedPrefix}buy pancing 5`]]
if (start.buttons) {
conn.sendButton( m.chat, resp, buff + info.nanipe, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}
} else {
const resp = `YA FUE E PESCA POR FAVOR DESCANSE`
const buff = `TIEMPO DEL DESCANSO:\n${tiempoTotal4}\n\n` + info.nanipe
const buttons = [[`MENU ☘️`, `${usedPrefix}menu`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff + info.nanipe, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
} 
break

case '5':
let __temporizador5 = userdb.lastmancingextreme + 3600000 //1 h
let tiempoTotal5 = clockString(__temporizador5 - new Date() * 1)
if (userdb.level <= 9) {
const resp = `${pescarUsuario} NECESITAS TENER EL NIVEL *${nivelUser[4]}*`
const buff = `NIVEL ACTUAL: *${userdb.level}*\n` + info.nanipe
const buttons = [[`ACTUALIZAR MI NIVEL ${rpgg.emoticon('level')}`, `${usedPrefix}nivel`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, null, buttons, fkontak)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}
if (userdb.stamina < 90) {
const resp = `${pescarUsuario} NO TIENES SUFICIENTE ENERGIA. MINIMO NECESITAS UN *${energia[4]}%* DE ENERGIA ✨`
const buff = `ENERGIA ACTUAL: ${rpgg.emoticon('stamina')} *${userdb.stamina}%*\n` + info.nanipe
const buttons = [[`COMPRAR ${energia[4]}% ${rpgg.emoticon('stamina')}`, `${usedPrefix}buy stamina 90`], [`🎒 INVENTARIO`, `${usedPrefix}inventario`], [`MENU ☘️`, `${usedPrefix}menu`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff + info.nanipe, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
} 

if (new Date - userdb.lastmancingextreme > 3600000) {
if (userdb.pancing > 4) {
if (userdb.pancingan > 4) {
if (userdb.umpan > 199) {

let resultado1 = `${Math.floor(Math.random() * 100)}`
let resultado2 = `${Math.floor(Math.random() * 100)}`
let resultado3 = `${Math.floor(Math.random() * 100)}`
let resultado4 = `${Math.floor(Math.random() * 100)}`
let resultado5 = `${Math.floor(Math.random() * 100)}`
let resultado6 = `${Math.floor(Math.random() * 100)}`
let resultado7 = `${Math.floor(Math.random() * 100)}`
let resultado8 = `${Math.floor(Math.random() * 100)}`
let resultado9 = `${Math.floor(Math.random() * 100)}`
let resultado10 = `${Math.floor(Math.random() * 100)}`
let resultado11 = `${Math.floor(Math.random() * 100)}`
let resultado12 = `${Math.floor(Math.random() * 100)}`
let resultado13 = `${Math.floor(Math.random() * 100)}`

let total1 = (resultado1 * 1)
let total2 = (resultado2 * 1) 
let total3 = (resultado3 * 1)
let total4 = (resultado4 * 1)
let total5 = (resultado5 * 1)
let total6 = (resultado6 * 1)
let total7 = (resultado7 * 1)
let total8 = (resultado8 * 1)
let total9 = (resultado9 * 1)
let total10 = (resultado10 * 1)
let total11 = (resultado11 * 1)
let total12 = (resultado12 * 1)
let total13 = (resultado13 * 1)

let zero1 = `${total1}`
let zero2 = `${total2}`
let zero3 = `${total3}`
let zero4 = `${total4}`
let zero5 = `${total5}`
let zero6 = `${total6}`
let zero7 = `${total7}`
let zero8 = `${total8}`
let zero9 = `${total9}`
let zero10 = `${total10}`
let zero11 = `${total11}`
let zero12 = `${total12}`

let pescar5 = `${htjava} RESULTADO DE SU PESCA ${pescarUsuario} ${htjava}
🌊🦀🌊 = ${zero2}		🌊🐠🌊 = ${zero6}
🌊🦞🌊 = ${zero8}		🌊🐟🌊 = ${zero11}
🌊🦐🌊 = ${zero10}	🌊🐬🌊 = ${zero7}
🌊🦑🌊 = ${zero4}		🌊🐳🌊 = ${zero12}
🌊🐙🌊 = ${zero3}		🌊🦈🌊 = ${zero9}
🌊🐡🌊 = ${zero5}		🌊🐋🌊 = ${zero1} 

BONO: +1 ${rpgshop.emoticon('tiketcoin')}`.trim()

setTimeout(() => {
const resp = `${pescarUsuario} HEY JUEGA DE NUEVO A PESCAR EN ${rpgg.emoticon('fishingrod')} ${mensajeLugar[4]}`
const buff = info.nanipe
const buttons = [[`${rpgg.emoticon('fishingrod')} PESCAR DE NUEVO`, `${usedPrefix}pescar 5`]]
if (start.buttons) {
conn.sendHydrated(m.chat, resp, buff, null, null, null, null, null, buttons, null)
conn.sendButton( m.chat, resp, buff + info.nanipe, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 3600000) 

setTimeout(() => {
const resp = `${rpgg.emoticon('fishingrod')} ${mensajeLugar[4]}\n`
const buff = info.nanipe
const buttons = [[`🎒 INVENTARIO`, `${usedPrefix}inventario`]]
if (start.buttons) {
conn.sendButton( m.chat, resp + info.nanipe, pescar5, img5, buttons, null)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 35000)

setTimeout(() => {
const resp = `${pescarUsuario} ${mensajePesca3}`
const buff = info.nanipe
const buttons = [[`${rpgg.emoticon('fishingrod')} PESCAR DE NUEVO`, `${usedPrefix}pescar 5`]]
if (start.buttons) {
conn.sendHydrated(m.chat, resp, buff, null, null, null, null, null, buttons, null)
conn.sendButton( m.chat, resp, buff, null, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 15000)

setTimeout(() => {
const resp = `${pescarUsuario} ${mensajePesca2}`
const buff = info.nanipe
const buttons = [[`${rpgg.emoticon('fishingrod')} PESCAR DE NUEVO`, `${usedPrefix}pescar 5`]]
if (start.buttons) {
conn.sendHydrated(m.chat, resp, buff, null, null, null, null, null, buttons, null)
conn.sendButton( m.chat, resp, buff + info.nanipe, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 8000)

setTimeout(() => {
const resp = `${pescarUsuario} ${mensajePesca}`
const buff = info.nanipe
const buttons = [[`${rpgg.emoticon('fishingrod')} PESCAR DE NUEVO`, `${usedPrefix}pescar 5`]]
if (start.buttons) {
conn.sendHydrated(m.chat, resp, buff, null, null, null, null, null, buttons, null)
conn.sendButton( m.chat, resp, buff + info.nanipe, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}, 0)

userdb.lastmancingextreme = new Date * 1
userdb.paus += total1
userdb.kepiting += total2
userdb.gurita += total3
userdb.cumi += total4 
userdb.buntal += total5
userdb.dory += total6
userdb.lumba += total7
userdb.lobster += total8
userdb.hiu += total9
userdb.udang += total10
userdb.ikan += total1
userdb.orca += total2
userdb.umpan -= total13
userdb.tiketcoin += 1
userdb.stamina -= 10 * 1

} else {
const resp = `MINIMO *${carnada[4]}* DE *${rpgshop.emoticon('umpan')}* PARA PESCAR`
const buff = info.nanipe
const buttons = [[`COMPRAR ${carnada[4]} ${rpgshopp.emoticon('umpan')}`, `${usedPrefix}buy umpan 200`], [`COMPRAR 800 ${rpgshopp.emoticon('umpan')}`, `${usedPrefix}buy umpan 800`], [`🏪 TIENDA PARA COMPRAR`, `${usedPrefix}buy`]]
if (start.buttons) {
conn.sendButton( m.chat, resp, buff + info.nanipe, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}
} else {
const resp = `SU *${rpgshop.emoticon('pancingan')}* NECESITAS EL NIVEL *${nivelDelGancho[4]}* PARA PESCAR`
const buff = info.nanipe
const buttons = [[`SUBIR AL NIVEL ${nivelCanaDePescar[4]} ${rpgshopp.emoticon('pancingan')}`, `${usedPrefix}buy pancingan 5`], [`SUBIR AL NIVEL ${nivelCanaDePescar[5]} ${rpgshopp.emoticon('pancingan')}`, `${usedPrefix}buy pancingan 6`]]
if (start.buttons) {
conn.sendButton( m.chat, resp, buff + info.nanipe, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}
} else {
const resp = `SU *${rpg.emoticon('fishingrod')}* NECESITAS EL NIVEL *${nivelCanaDePescar[4]}* PARA PESCAR`
const buff = info.nanipe
const buttons = [[`SUBIR AL NIVEL ${nivelCanaDePescar[4]} ${rpgg.emoticon('fishingrod')}`, `${usedPrefix}buy pancing 5`], [`SUBIR AL NIVEL ${nivelCanaDePescar[5]} ${rpgg.emoticon('fishingrod')}`, `${usedPrefix}buy pancing 6`]]
if (start.buttons) {
conn.sendButton( m.chat, resp, buff + info.nanipe, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}
} else {
const resp = `YA FUE E PESCA POR FAVOR DESCANSE`
const buff = `TIEMPO DEL DESCANSO:\n${tiempoTotal5}\n\n` + info.nanipe
const buttons = [[`MENU ☘️`, `${usedPrefix}menu`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff + info.nanipe, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
} 
break

default:
let resp = ''
const img = [img1, img2, img3, img4, img5].getRandom()
const buff = info.nanipe
const buttons = [
[`🌟 USUARIOS PREMIUM 🌟`, `${usedPrefix}listprem`],
[`🎟️ MÁS TIEMPO PREMIUM 🎟️`, `${usedPrefix + command} 1`],
[`😽 DISFRUTAR PREMIUM 😽`, `${usedPrefix}allmenu`]]
console.log('pescar: ', img)
if (start.buttons) {
resp = listMessage.text
//await conn.sendWritingText(m.chat, resp+'\n'+buff, m );
await conn.sendList(m.chat, listMessage.title, listMessage.text, null, listMessage.buttonText, sections, buff, null, m )
return conn.sendButton(m.chat, resp, buff, img, buttons, fkontak, null)
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
if (group.title) resp += `\n╠═ *${group.title.toUpperCase()}*\n`
for (const item of group.rows) {
if (!item.title && !item.description && !item.id) continue
resp += `╠════════════════════\n`
if (item.title) resp += `┣ *${item.title}*\n`
if (item.description) resp += item.description.replace(/#/g, `📎 `).split('\n').map((line, index) => index === 0 ? `┣ 📝 ${line}` : `┣ ${line}`).join('\n') + '\n'
if (item.id) resp += `┣ 📎 *Comando:* ${item.id}\n`
totalComandos++
}
}
//
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendImageWriting(m.chat, img, resp+listMessage.title, fkontak)
}
}
}
}
}
} catch (e) {
await conn.sendWritingText(m.chat, `ERROR AL INTENTAR PESCAR\n\nREPORTE ESTE COMANDO CON EL COMANDO #REPORTE\nError: ${e.stack}`, userdb, m)
console.log(e)
}
}

handler.help = ['fishing <args>']
handler.tags = ['rpg']
handler.command = /^(fishing|mancing|pescar)$/i
handler.before = async function before(m, {conn, db}) {

}
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}
function clockString(ms) {
let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return ['┃⇢ ', d, ' *☀️ Días : Days*\n', '┃⇢ ', h, ' *⏰ Horas : Hours*\n', '┃⇢ ', m, ' *🕐 Minutos : Minutes*\n', '┃⇢ ', s, ' *⏱️ Segundos : Seconds*'].map(v => v.toString().padStart(2, 0)).join('')
}
