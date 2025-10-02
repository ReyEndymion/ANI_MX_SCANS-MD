let handler = async (m, {conn, start, info, args, command, jid, text, usedPrefix, usersdb, userdb, db, senderJid, objs}) => {
const {imagen2} = objs
const daily = await import('./rpg-daily.js') 
const weekly = await import('./rpg-weekly.js')
const monthly = await import('./rpg-monthly.js')
const adventure = await import('./rpg-adventure.js')
const { canLevelUp, xpRange } = await import('../lib/levelling.js')
const PhoneNumber = await import('awesome-phonenumber')
const {rpgg, rpg, rpgshop, rpgshopp} = await import('../rpg.js')
const {default: moment} = await import('moment-timezone')
const {menuform, multiplier} = await import('../lib/constants.js')
const {inventory} = await import('../lib/functionsGames.js')
const {default: fs} = await import('fs')
const { owner, temp, newsletterID, sBroadCastID, groupID, media} = await import('../config.js')

//let imgr = flaaa.getRandom()
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.userdb.jid : senderJid
let { lastdiamantes, lastcoins, lastmiming, registered, age, lastrampok, lastdagang, lastcofre, lastcodereg, lastberkebon, lasthourly, lastberburu, lastbansos, lastadventure, lastfishing, lastwar, lastduel, lastmining, lastdungeon, lastclaim, lastweekly, lastmonthly } = userdb
let healt = userdb.health
let level = userdb.level
//armor
let adurability = userdb.armordurability
//sword
let sdurability = userdb.sworddurability
//pickaxe
let pdurability = userdb.pickaxedurability
let pancing = userdb.pancing
let fdurability = userdb.fishingroddurability
let bow = userdb.bow
let bdurability = userdb.bowdurability
let naga = userdb.naga
let _naga = userdb.anaknaga
let phonix = userdb.phonix
let _phonix = userdb.anakphonix
let centauro = userdb.centauro
let _centaur = userdb.anakcentaur
let griffin = userdb.griffin
let _griffin = userdb.anakgriffin
let serigala = userdb.serigala
let _serigala = userdb.anakserigala
let { min, max } = xpRange(level, multiplier)
let kuda = userdb.kuda
let rubah = userdb.rubah
let kucing = userdb.kucing
let anjing = userdb.anjing
let _rubah = userdb.anakrubah
let _kucing = userdb.anakkucing
let _kuda = userdb.anakkuda
let _anjing = userdb.anakanjing
let pickaxe = userdb.pickaxe
let sword = userdb.sword
let armor = userdb.armor
let fishingrod = userdb.fishingrod
let pollo = userdb.pollo
let kambing = userdb.kambing
let sapi = userdb.sapi
let kerbau = userdb.kerbau
let cerdo = userdb.cerdo
let harimau = userdb.harimau
let banteng = userdb.banteng
let monyet = userdb.monyet
let babihutan = userdb.babihutan
let panda = userdb.panda
let gajah = userdb.gajah
let cocodrilo = userdb.cocodrilo
let paus = userdb.paus 
let kepiting = userdb.kepiting
let gurita = userdb.gurita 
let cumi = userdb.cumi 
let buntal = userdb.buntal 
let dory = userdb.dory 
let lumba = userdb.lumba 
let lobster = userdb.lobster 
let hiu = userdb.hiu 
let udang = userdb.udang
let ikan = userdb.ikan 
let orca = userdb.orca 
let pancingan = userdb.pancingan
let _pancingan = userdb.anakpancingan 
let ayamb = userdb.ayamb
let ayamg = userdb.ayamg
let sapir = userdb.sapir
let ssapi = userdb.ssapi
let makananpet = userdb.makananpet
let makanannaga = userdb.makanannaga 
let makananphonix = userdb.makananphonix 
let makanangriffin = userdb.makanangriffin
let makanankyubi = userdb.makanankyubi 
let makanancentaur = userdb.makanancentaur
let mangga = userdb.mangga
let anggur = userdb.anggur
let pisang = userdb.pisang
let jeruk = userdb.jeruk
let apel = userdb.apel
let semillasdeuva = userdb.semillasdeuva
let semillasdenaranja = userdb.semillasdenaranja
let semillasdemanzana = userdb.semillasdemanzana
let semillasdemango = userdb.semillasdemango
let semillasdeplatano = userdb.semillasdeplatano
let rol = userdb.role
let pasangan = userdb.pasangan
let warn = userdb.warn
let money = userdb.money
let exp = userdb.exp
let token = userdb.joincount
let dia = userdb.limit
let tiketm = userdb.healtmonster
let pareja = userdb.pasangan
let name = await conn.getName(who)
if (typeof usersdb[who] == "Sin Datos | No Dates") {
usersdb[who] = {
exp: 0,
limit: 20,
lastclaim: 0,
registered: false,
name: conn.getName(senderJid),
age: -1,
regTime: -1,
afk: -1,
afkReason: '',
banned: false,
level: 0,
lastweekly: 0,
role: 'Novato',
autolevelup: false,
money: 0,
pasangan: "",
}
}
const fkontak = {
"key": {
"participants":"0@s.whatsapp.net",
"remoteJid": "status@broadcast",
"fromMe": false,
"id": "Halo"
},
"message": {
"contactMessage": {
"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${senderJid.split('@')[0]}:${senderJid.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
}
},
"participant": "0@s.whatsapp.net"
}

if (!args[0]) {
const sections = [
{
title: ' ❖ *INVENTARIO* ❖ ',
rows: [
{title: "დ INVENTARIO - ARTICULOS", id: usedPrefix + command + ' 1'},
{title: "დ INVENTARIO - COMBATE", id: usedPrefix + command + ' 2'},
{title: "დ INVENTARIO - MISIONES", id: usedPrefix + command + ' 3'},
{title: "დ INVENTARIO - COMPLETO", id: usedPrefix + command + ' 4'}
]
},{
title: ' ❖ ALIMENTOS Y ANIMALES ❖ ',
rows: [
{title: "ღ INVENTARIO - ALIMENTOS Y ANIMALES", id: usedPrefix + 'alimentos'},
{title: "ღ INVENTARIO - ANIMALES ATRAPADOS", id: usedPrefix + 'animales'}
]}
]
let resp = `✨ *AVERIGUA EL INVENTARIO QUE TIENES*\n`

const listMessage = {
text: resp,
footer: info.nanipe,
title: `*»»— ֎ INVENTARIO ֎ —««*`,
buttonText: `🔖 SELECCIONE AQUÍ 🔖`,
sections
}
/*
*/
let bottime = `${name} TIME: ${moment.tz('America/Bogota').format('HH:mm:ss')}`//America/Los_Angeles
let ftroli = { key: { remoteJid: 'status@broadcast', participant: '0@s.whatsapp.net' }, message: { orderMessage: { itemCount: 99, status: 1, surface: 1, message: info.nanipe, orderTitle: info.nanipe, sellerJid: '0@s.whatsapp.net' } } }
let fgif = {
key: {
participant : '0@s.whatsapp.net'},
message: { 
"videoMessage": { 
"title": info.nanipe,
"h": `Hmm`,
'seconds': '999999999', 
'gifPlayback': 'true', 
'caption': bottime,
'jpegThumbnail': fs.readFileSync(imagen2)
}
}
}
const buff = info.nanipe
const buttons = [['💎 Comprar X50', `${usedPrefix}buy3 50`], ['💎 Comprar X100', `${usedPrefix}buy3 100`], ['💎 Compra AbSoluta', `${usedPrefix}buyall3`]]
if (start.buttons) {
await conn.sendList(m.chat, listMessage, userdb, fkontak)
return conn.sendButton(m.chat, {text: resp, footer: buff}, {url: img}, [
[`🌟 USUARIOS PREMIUM 🌟`, `${usedPrefix}listprem`],
[`🎟️ MÁS TIEMPO PREMIUM 🎟️`, `${usedPrefix + command} 1`],
[`😽 DISFRUTAR PREMIUM 😽`, `${usedPrefix}allmenu`]], userdb, fkontak)
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
if (item.description) resp += item.description.replace(/#/g, `📎 `).split('\n').map((line, index) => index === 0 ? `┣ 📝 ${line}` : `┣ ${line}`).join('\n') + '\n'
if (item.id) resp += `┣ 📎 *Comando:* ${item.id}\n`
totalComandos++
}
}
//
return conn.sendWritingText(m.chat, resp+listMessage.title, fkontak)
}
}
}
}

if (args[0] == '1') { // Inventario 1
let sortedmoney = Object.entries(usersdb).sort((a, b) => b[1].money - a[1].money)
let sortedlevel = Object.entries(usersdb).sort((a, b) => b[1].level - a[1].level)
let sorteddiamond = Object.entries(usersdb).sort((a, b) => b[1].diamond - a[1].diamond)
let sortedpotion = Object.entries(usersdb).sort((a, b) => b[1].potion - a[1].potion)
let sortedsampah = Object.entries(usersdb).sort((a, b) => b[1].sampah - a[1].sampah)
let sortedmakananpet = Object.entries(usersdb).sort((a, b) => b[1].makananpet - a[1].makananpet)
let sortedbatu = Object.entries(usersdb).sort((a, b) => b[1].batu - a[1].batu)
let sortediron = Object.entries(usersdb).sort((a, b) => b[1].iron - a[1].iron)
let sortedkayu = Object.entries(usersdb).sort((a, b) => b[1].kayu - a[1].kayu)
let sortedstring = Object.entries(usersdb).sort((a, b) => b[1].string - a[1].string)
let sortedcommon = Object.entries(usersdb).sort((a, b) => b[1].common - a[1].common)
let sorteduncoommon = Object.entries(usersdb).sort((a, b) => b[1].uncoommon - a[1].uncoommon)
let sortedmythic = Object.entries(usersdb).sort((a, b) => b[1].mythic - a[1].mythic)
let sortedlegendary = Object.entries(usersdb).sort((a, b) => b[1].legendary - a[1].legendary)
let sortedpet = Object.entries(usersdb).sort((a, b) => b[1].pet - a[1].pet)
let usersmoney = sortedmoney.map(v => v[0])
let userslevel = sortedlevel.map(v => v[0])
let usersdiamond = sorteddiamond.map(v => v[0])
let userspotion = sortedpotion.map(v => v[0])
let userssampah = sortedsampah.map(v => v[0])
let usersmakananpet = sortedmakananpet.map(v => v[0])
let usersbatu = sortedbatu.map(v => v[0])
let usersiron = sortediron.map(v => v[0])
let userskayu = sortedkayu.map(v => v[0])
let usersstring = sortedstring.map(v => v[0])
let userscommon = sortedcommon.map(v => v[0])
let usersuncoommon = sorteduncoommon.map(v => v[0])
let usersmythic = sortedmythic.map(v => v[0])
let userslegendary = sortedlegendary.map(v => v[0])
let userspet = sortedpet.map(v => v[0])

let str = `
🏷️ *INVENTARIO* 
👤» *${name}* ( @${who.split("@")[0]} )\n
╭━━━━━━━━━⬣
┃ *INVENTARIO DE ARTICULOS* 
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpg.emoticon('health')} » ${healt}* 
┃ ${rpgg.emoticon('level')} *Nivel : Level » ${level}*
┃ ${rpgg.emoticon('role')} *Rango : Role* 
┃ *»* ${rol}
┃ *${rpgg.emoticon('premium')} ${userdb.premium ? "✅ VIP : Premium": "Limitado : Free"}*
┃ 🏦 *Banco » ${userdb.bank}*
┃ 💞 *Pareja : MyLove* 
┃ *» ${pasangan ? `${name} 💝 ${conn.getName(pareja)}` : `❌`}*
┃ ⚠️ *Advertencia » ${warn}/4*
┃ 🚷 *Baneado(a) » No*
┃
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╮
┃ PRODUCTOS VALIOSOS
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╯
┃ ${rpgg.emoticon('exp')} *Exp » ${exp}*
┃ ${rpgg.emoticon('limit')} *Diamante : Diamond » ${dia}*
┃ ${rpgg.emoticon('money')} *Coins: » ${money}*
┃ ${rpgg.emoticon('joincount')} *Token » ${token}*
┃ *${rpgshop.emoticon('emerald')} » ${userdb.emerald}*
┃ *${rpgshop.emoticon('berlian')} » ${userdb.berlian}*
┃ *${rpgshop.emoticon('tiketcoin')} » ${userdb.tiketcoin}*
┃ *${rpgshop.emoticon('kyubi')} » ${userdb.kyubi}*
┃ *${rpgshop.emoticon('diamond')} » ${userdb.diamond}*
┃ *${rpgshop.emoticon('gold')} » ${userdb.gold}*
┃ *${rpgshop.emoticon('stamina')} » ${userdb.stamina}%*
┃ 🎟️ *Cupón : Coupon » ${userdb.cupon}*
┃ 📉 *Gastos : Expg » ${userdb.expg}*
┃
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╮
┃ SUPERVIVENCIA
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╯
┃ *${rpgshop.emoticon('potion')} » ${userdb.potion}*
┃ *${rpgshop.emoticon('aqua')} » ${userdb.aqua}*
┃ *${rpgshop.emoticon('trash')} » ${userdb.trash}*
┃ *${rpgshop.emoticon('wood')} » ${userdb.wood}*
┃ *${rpgshop.emoticon('rock')} » ${userdb.rock}*
┃ *${rpgshop.emoticon('batu')} » ${userdb.batu}*
┃ *${rpgshop.emoticon('string')} » ${userdb.string}*
┃ *${rpgshop.emoticon('iron')} » ${userdb.iron}*
┃ *${rpgshop.emoticon('coal')} » ${userdb.coal}*
┃ *${rpgshop.emoticon('botol')} » ${userdb.botol}*
┃ *${rpgshop.emoticon('kaleng')} » ${userdb.kaleng}*
┃ *${rpgshop.emoticon('kardus')} » ${userdb.kardus}*
┃
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╮
┃ OBJETOS MISTERIOSOS
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╯
┃ *${rpgshop.emoticon('eleksirb')} » ${userdb.eleksirb}*
┃ *${rpgshop.emoticon('emasbatang')} » ${userdb.emasbatang}*
┃ *${rpgshop.emoticon('emasbiasa')} » ${userdb.emasbiasa}*
┃ *${rpgshop.emoticon('rubah')} » ${userdb.rubah}*
┃ *${rpgshop.emoticon('emas')} » ${userdb.emas}*
┃ *${rpgshop.emoticon('sampah')} » ${userdb.sampah}*
┃ *${rpgshop.emoticon('serigala')} » ${userdb.serigala}*
┃ *${rpgshop.emoticon('kayu')} » ${userdb.kayu}*
┃ *${rpgshop.emoticon('sword')} » ${userdb.sword}*
┃ *${rpgshop.emoticon('kayu')} » ${userdb.kayu}*
┃ *${rpgshop.emoticon('umpan')} » ${userdb.umpan}*
┃ *${rpgshop.emoticon('healtmonster')} » ${userdb.healtmonster}*
┃ *${rpgshop.emoticon('pancingan')} » ${userdb.pancingan}*
┃ *${rpgshop.emoticon('kayu')} » ${userdb.kayu}*
┃ *${rpg.emoticon('ramuan')} » ${userdb.ramuan}*
┃ *🧭 Reloj : Reloj » ${userdb.arlok}*
╰━━━━━━━━━⬣

🏆 *RESUMEN EN LOS TOPS* 🏆 
👤» *${name}* ( @${who.split("@")[0]} )\n
_1.Top Nivel_ *${userslevel.indexOf(senderJid) + 1}* _de_ *${userslevel.length}*
_2.Top Coins_ *${usersmoney.indexOf(senderJid) + 1}* _de_ *${usersmoney.length}*
_3.Top Diamantes+_ *${usersdiamond.indexOf(senderJid) + 1}* _de_ *${usersdiamond.length}*
_4.Top Poción_ *${userspotion.indexOf(senderJid) + 1}* _de_ *${userspotion.length}*
_5.Top Basura_ *${userssampah.indexOf(senderJid) + 1}* _de_ *${userssampah.length}*
_6.Top Alimento para Mascotas_ *${usersmakananpet.indexOf(senderJid) + 1}* _de_ *${usersmakananpet.length}*
_7.Top Piedra_ *${usersbatu.indexOf(senderJid) + 1}* _de_ *${usersbatu.length}*
_8.Top Hierro_ *${usersiron.indexOf(senderJid) + 1}* _de_ *${usersiron.length}*
_9.Top Madera_ *${userskayu.indexOf(senderJid) + 1}* _de_ *${userskayu.length}*
_10.Top Cuerda_ *${usersstring.indexOf(senderJid) + 1}* _de_ *${usersstring.length}*
_11.Top Caja Común_ *${userscommon.indexOf(senderJid) + 1}* _de_ *${userscommon.length}*
_13.Top Caja poco Común_ *${usersuncoommon.indexOf(senderJid) + 1}* _de_ *${usersuncoommon.length}*
_14.Top Caja Mítica_ *${usersmythic.indexOf(senderJid) + 1}* _de_ *${usersmythic.length}*
_15.Top Caja Legendaria_ *${userslegendary.indexOf(senderJid) + 1}* _de_ *${userslegendary.length}*
_16.Top Caja para Mascota_ *${userspet.indexOf(senderJid) + 1}* _de_ *${userspet.length}*
\n
*⚠️ Advertido(a) » ${warn}*
*🚫 Baneado(a) » ${userdb.banned ? '✅' : '❌'}*\n`.trim()

let resp = `*PREMIUM ${userdb.premium ? "✅": "❌"}*\n> ${info.nanipe}` + str
const buff = info.nanipe
const buttons = [[`🤺 _Inventario de combate_`, `${usedPrefix}inventario 2`], [`🏕️ Aventurar`, `${usedPrefix}adventure`], ['💗 _Menu Aventura | RPG_', `${usedPrefix}rpgmenu`]]
if (start.buttons) {
return conn.sendButton( m.chat, {text: resp, footer: buff}, {}, buttons, userdb, fkontak)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanipe, m );
}

} else if (args[0] == '2') { // Inventario 2
const invent = await inventory(daily, weekly, monthly, adventure)
const pets = Object.keys(invent.pets).map(v => userdb[v] && `*${rpg.emoticon(v)} » ${userdb[v] >= invent.pets[v] ? '*Nivel Máximo*' : `Nivel* \n*» ${userdb[v]}*\n`}`).filter(v => v).join('\n').trim()
const cooldowns = Object.entries(invent.cooldowns).map(([cd, { name, time }]) => cd in userdb && `*✧ ${name}*: ${new Date() - userdb[cd] >= time ? '✅' : '❌'}`).filter(v => v).join('\n').trim()


const caption = `
👤» *@${who.split("@")[0]}* 
🛣️ ESTRATEGIAS | ANIMALES

╭━━━━━━━━━⬣
┃ *ESTADO DE COMBATE*
┃
┃ *${rpg.emoticon('health')}* 
┃ *» ${healt}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpg.emoticon('pickaxe')}* 
┃ *» ${pickaxe == 0 ? 'No tengo' : '' || pickaxe == 1 ? 'Nivel ✦ 1' : '' || pickaxe == 2 ? 'Nivel ✦ 2' : '' || pickaxe == 3 ? 'Nivel ✦ 3' : '' || pickaxe == 4 ? 'Nivel ✦ 4' : '' || pickaxe == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ ${rpgshopp.emoticon('sword')} *Espada*
┃ *» ${sword == 0 ? 'No tengo' : '' || sword == 1 ? 'Espada de Cuero ✦' : '' || sword == 2 ? 'Espada de Hierro ✦' : '' || sword == 3 ? 'Espada de Oro ✦' : '' || sword == 4 ? 'Espada de Energía ✦' : '' || sword == 5 ? 'Espada Galáctica ✦ ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ ${rpgg.emoticon('armor')} *Armadura* 
┃ *» ${armor == 0 ? 'No tengo' : '' || armor == 1 ? '✦ Armadura de Cuero : Leather Armor' : '' || armor == 2 ? '✦ Armadura de Hierro' : '' || armor == 3 ? '✦ Armadura Mágica' : '' || armor == 4 ? '✦ Armadura Robótica' : '' || armor == 5 ? 'Armadura Cyborg Estelar' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ 🎣 *Caña de Pescar* 
┃ *» ${fishingrod}* 
╰━━━━━━━━━⬣

*╭───━• ESTRATEGIAS*
*│🥼 Armadura:* 
*│➠ ${armor == 0 ? 'No tengo' : '' || armor == 1 ? '✦ Armadura de Cuero : Leather Armor' : '' || armor == 2 ? '✦ Armadura de Hierro' : '' || armor == 3 ? '✦ Armadura Mágica' : '' || armor == 4 ? '✦ Armadura Robótica' : '' || armor == 5 ? 'Armadura Cyborg Estelar' : ''}*
*│🥼⇡ Durabilidad:* 
*│↸ ${adurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│⚔️ Espada : Sword* 
*│➠ ${sword == 0 ? 'No tengo' : '' || sword == 1 ? 'Espada de Cuero ✦' : '' || sword == 2 ? 'Espada de Hierro ✦' : '' || sword == 3 ? 'Espada de Oro ✦' : '' || sword == 4 ? 'Espada de Energía ✦' : '' || sword > 0 && sword < 5 ? `Ketahanan (*${sword}* / *${sword *100}*)` : '' || sword == 5 ? 'Espada Galáctica ✦ ǁ MAX' : ''}*
*│⚔️⇡ Durabilidad:* 
*│↸ ${sdurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│⛏️ Pico* 
*│➠ ${pickaxe == 0 ? 'No tengo' : '' || pickaxe == 1 ? 'Nivel ✦ 1' : '' || pickaxe == 2 ? 'Nivel ✦ 2' : '' || pickaxe == 3 ? 'Nivel ✦ 3' : '' || pickaxe == 4 ? 'Nivel ✦ 4' : '' || pickaxe == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
*│⛏️⇡ Durabilidad:* 
*│↸ ${pdurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│🎣 Caña de pescar* 
*│➠ ${pancing == 0 ? 'No tengo' : '' || pancing == 1 ? 'Nivel ✦ 1' : '' || pancing == 2 ? 'Nivel ✦ 2' : '' || pancing == 3 ? 'Nivel ✦ 3' : '' || pancing == 4 ? 'Nivel ✦ 4' : '' || pancing == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
*│🎣⇡ Durabilidad:* 
*│↸ ${fdurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│🏹 Arco : Bow*
*│➠ ${bow == 0 ? 'No tengo' : '' || bow == 1 ? '✦ Arco de Poca Distancia || 1' : '' || bow == 2 ? '✦ Flechas Mejoradas || 2' : '' || bow == 3 ? '✦ Arco de última tecnología || 3' : '' || bow == 4 ? '✦ Arco Explosivo || 4' : '' || bow == 5 ? '✦ Arco Nuclear || 5' : ''}*
*│🏹⇡ Durabilidad:* 
*│↸ ${bdurability}*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

╭━━━━━━━━━⬣
┃ *CAJAS ENCONTRADAS*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('common')}*
┃ *» ${userdb.common}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('uncoommon')}*
┃ *» ${userdb.uncoommon}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('mythic')}*
┃ *» ${userdb.mythic}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('pet')}*
┃ *» ${userdb.pet}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('legendary')}*
┃ *» ${userdb.legendary}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('petFood')}*
┃ *» ${userdb.petFood}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('gardenboxs')}*
┃ *» ${userdb.gardenboxs}*
╰━━━━━━━━━⬣

╭━━━━━━━━━⬣
┃ *MASCOTAS*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('kuda')}*
┃ *${kuda == 0 ? 'No tengo Mascota' : '' || kuda == 1 ? 'Nivel ✦ 1' : '' || kuda == 2 ? 'Nivel ✦ 2' : '' || kuda == 3 ? 'Nivel ✦ 3' : '' || kuda == 4 ? 'Nivel ✦ 4' : '' || kuda == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('zorro')}*
┃ *${rubah == 0 ? 'No tengo Mascota' : '' || rubah == 1 ? 'Nivel ✦ 1' : '' || rubah == 2 ? 'Nivel ✦ 2' : '' || rubah == 3 ? 'Nivel ✦ 3' : '' || rubah == 4 ? 'Nivel ✦ 4' : '' || rubah == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('kucing')}*
┃ *${kucing == 0 ? 'No tengo Mascota' : '' || kucing == 1 ? 'Nivel ✦ 1' : '' || kucing == 2 ? 'Nivel ✦ 2' : '' || kucing == 3 ? 'Nivel ✦ 3' : '' || kucing == 4 ? 'Nivel ✦ 4' : '' || kucing == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('anjing')}*
┃ *${anjing == 0 ? 'No tengo Mascota' : '' || anjing == 1 ? 'Nivel ✦ 1' : '' || anjing == 2 ? 'Nivel ✦ 2' : '' || anjing == 3 ? 'Nivel ✦ 3' : '' || anjing == 4 ? 'Nivel ✦ 4' : '' || anjing == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
╰━━━━━━━━━⬣

*PROGRESO*
*╭────────────┄⸙*
*│ ${rpg.emoticon('level')} » ${userdb.level}*
*│ ${rpg.emoticon('role')}*
*│ »* ${userdb.role}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🦊 Zorro*
*│* ${rubah == 0 ? '*No tengo*' : '' || rubah > 0 && rubah < 5 ? `*Nivel ${rubah} A Nivel ${rubah + 1}*\n*│* Exp *${_rubah}* -> *${rubah *100}*` : '' || rubah == 5 ? '*Nivel Máximo*' : ''}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🐈 Gato* 
*│* ${kucing == 0 ? '*No tengo*' : '' || kucing > 0 && kucing < 5 ? `*Nivel ${kucing} A Nivel ${kucing + 1}*\n*│* Exp *${_kucing}* -> *${kucing *100}*` : '' || kucing == 5 ? '*Nivel Máximo*' : ''}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🐎 Caballo* 
*│* ${kuda == 0 ? '*No tengo*' : '' || kuda > 0 && kuda < 5 ? `*Nivel ${kuda} A Nivel ${kuda + 1}*\n*│* Exp *${_kuda}* -> *${kuda *100}*` : '' || kuda == 5 ? '*Nivel Máximo*' : ''}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🐶 Perro* 
*│* ${anjing == 0 ? '*No tengo*' : '' || anjing > 0 && anjing < 5 ? `*Nivel ${anjing} A Nivel ${anjing + 1}*\n*│* Exp *${_anjing}* -> *${anjing *100}*` : '' || anjing == 5 ? '*Nivel Máximo*' : ''}
*╰────┄⸙*

*╭─━• MASCOTAS EN COMBATE*
*│${rpg.emoticon('horse')} » ${kuda == 0 ? '❌' : '' || kuda == 1 ? 'Nivel ✦ 1' : '' || kuda == 2 ? 'Nivel ✦ 2' : '' || kuda == 3 ? 'Nivel ✦ 3' : '' || kuda == 4 ? 'Nivel ✦ 4' : '' || kuda == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('zorro')} » ${rubah == 0 ? '❌' : '' || rubah == 1 ? 'Nivel ✦ 1' : '' || rubah == 2 ? 'Nivel ✦ 2' : '' || rubah == 3 ? 'Nivel ✦ 3' : '' || rubah == 4 ? 'Nivel ✦ 4' : '' || rubah == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('gato')} » ${kucing == 0 ? '❌' : '' || kucing == 1 ? 'Nivel ✦ 1' : '' || kucing == 2 ? 'Nivel ✦ 2' : '' || kucing == 3 ? 'Nivel ✦ 3' : '' || kucing == 4 ? 'Nivel ✦ 4' : '' || kucing == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('dragon')} » ${naga == 0 ? '❌' : '' || naga == 1 ? 'Nivel ✦ 1' : '' || naga == 2 ? 'Nivel ✦ 2' : '' || naga == 3 ? 'Nivel ✦ 3' : '' || naga == 4 ? 'Nivel ✦ 4' : '' || naga == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('phonix')} » ${phonix == 0 ? '❌' : '' || phonix == 1 ? 'Nivel ✦ 1' : '' || phonix == 2 ? 'Nivel ✦ 2' : '' || phonix == 3 ? 'Nivel ✦ 3' : '' || phonix == 4 ? 'Nivel ✦ 4' : '' || phonix == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('centauro')} » ${centauro == 0 ? '❌' : '' || centauro == 1 ? 'Nivel ✦ 1' : '' || centauro == 2 ? 'Nivel ✦ 2' : '' || centauro == 3 ? 'Nivel ✦ 3' : '' || centauro == 4 ? 'Nivel ✦ 4' : '' || centauro == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('griffin')} » ${griffin == 0 ? '❌' : '' || griffin == 1 ? 'Nivel ✦ 1' : '' || griffin == 2 ? 'Nivel ✦ 2' : '' || griffin == 3 ? 'Nivel ✦ 3' : '' || griffin == 4 ? 'Nivel ✦ 4' : '' || griffin == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('wolf')} » ${serigala == 0 ? '❌' : '' || serigala == 1 ? 'Nivel ✦ 1' : '' || serigala == 2 ? 'Nivel ✦ 2' : '' || serigala == 3 ? 'Nivel ✦ 3' : '' || naga == 4 ? 'Nivel ✦ 4' : '' || serigala == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

*╭* ${menuform.htki} *PROGRESOS* ${menuform.htka}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫ ${rpg.emoticon('level')} » ${userdb.level} ➠${userdb.Nivel + 1}*
*╭┫ ✨ Exp » ${userdb.exp} ➠ ${max - userdb.exp}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('zorro')}*\n${rubah == 0 ? '*╰┫❌' : '' || rubah > 0 && rubah < 5 ? `*╰┫ Nivel : Nivel » ${rubah} ➠ ${rubah + 1}*\n*╭┫ ExpPet » ${_rubah} -> ${rubah *100}` : '' || rubah == 5 ? 'Nivel ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('gato')}*\n${kucing == 0 ? '*╰┫❌' : '' || kucing > 0 && kucing < 5 ? `*╰┫ Nivel : Nivel » ${kucing} ➠ ${kucing + 1}*\n*╭┫ ExpPet » ${_kucing} -> ${kucing *100}` : '' || kucing == 5 ? 'Nivel ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('horse')}*\n${kuda == 0 ? '*╰┫❌' : '' || kuda > 0 && kuda < 5 ? `*╰┫ Nivel : Nivel » ${kuda} ➠ ${kuda + 1}*\n*╭┫ ExpPet » ${_kuda} -> ${kuda *100}` : '' || kuda == 5 ? 'Nivel ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('dragon')}*\n${naga == 0 ? '*╰┫❌' : '' || naga > 0 && naga < 5 ? `*╰┫ Nivel : Nivel » ${naga} ➠ ${naga + 1}*\n*╭┫ ExpPet » ${_naga} -> ${naga *100}` : '' || naga == 5 ? 'Nivel ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('phonix')}*\n${phonix == 0 ? '*╰┫❌' : '' || phonix > 0 && phonix < 5 ? `*╰┫ Nivel : Nivel » ${phonix} ➠ ${phonix + 1}*\n*╭┫ ExpPet » ${_phonix} -> ${phonix *100}` : '' || phonix == 5 ? 'Nivel ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('centauro')}*\n${centauro == 0 ? '*╰┫❌' : '' || centauro > 0 && centauro < 5 ? `*╰┫ Nivel : Nivel » ${centauro} ➠ ${centauro + 1}*\n*╭┫ ExpPet » ${_centaur} -> ${centauro *100}` : '' || centauro == 5 ? 'Nivel ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('griffin')}*\n${griffin == 0 ? '*╰┫❌' : '' || griffin > 0 && griffin < 5 ? `*╰┫ Nivel : Nivel » ${griffin} ➠ ${griffin + 1}*\n*╭┫ ExpPet » ${_griffin} -> ${griffin *100}` : '' || griffin == 5 ? 'Nivel ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('wolf')}*\n${serigala == 0 ? '*╰┫❌' : '' || serigala > 0 && serigala < 5 ? `*╰┫ Nivel : Nivel » *${serigala}* ➠ ${serigala + 1}*\n*╭┫ ExpPet » ${_serigala} -> ${serigala *100}` : '' || serigala == 5 ? 'Nivel ✦ ǁ MAX' : ''}*
*╰────────────┄⸙*

🤺 *@${who.split("@")[0]}* 
*✅ » MISIÓN DISPONIBLE*

*❌ » MISIÓN NO DISPONIBLE*

*╭──━• MISIONES*
*│ ⛏️⚡ Minar EXP » ${new Date - userdb.lastmiming < 600000 ? '❌' : '✅'}*
*│ ⛏️🪙 Minar Coins » ${new Date - userdb.lastcoins < 600000 ? '❌' : '✅'}*
*│ ⛏️💎 Minar Diamantes » ${new Date - userdb.lastdiamantes < 900000 ? '❌' : '✅'}* 
*│ ⚗️ Cofre » ${new Date - userdb.lastcofre < 86400000 ? '❌' : '✅'}* 
*│ 🏹 Caza » ${new Date - userdb.lastberburu < 2700000 ? '❌' : '✅'}* 
*│ ⛰️ Aventura: » ${new Date - userdb.lastadventure < 1500000 ? '❌' : '✅'}* 
*│ 🕐 Cada hora » ${new Date - userdb.lasthourly < 3600000 ? '❌' : '✅'}* 
*│ 📦 Reclamar » ${new Date - userdb.lastclaim < 7200000 ? '❌' : '✅'}* 
*│ 🎁 Semanalmente ${new Date - userdb.lastweekly < 259200000 ? '❌' : '✅'}* 
*│ 📮 Mensual ${new Date - userdb.lastmonthly < 432000000 ? '❌' : '✅'}* 
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*`.trim()

let resp = `*PREMIUM ${userdb.premium ? "✅": "❌"}*\n> ${info.nanipe}\n`+ caption 
const buff = info.nanipe
const buttons = [[`⚜️ _Lista de misiones_`, `${usedPrefix}inventario 3`], [`🏕️ Aventurar`, `${usedPrefix}adventure`], ['💗 _Menu Aventura | RPG_', `${usedPrefix}rpgmenu`]]
if (start.buttons) {
return conn.sendButton( m.chat, {text: resp, footer: buff}, {}, buttons, userdb, fkontak, { mentions: conn.parseMention(caption) })
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanipe, m );
}
} else if (args[0] == '3') { // Inventario 3
let sortedmoney = Object.entries(usersdb).sort((a, b) => b[1].money - a[1].money)
let sortedlevel = Object.entries(usersdb).sort((a, b) => b[1].Nivel - a[1].level)
let sorteddiamond = Object.entries(usersdb).sort((a, b) => b[1].diamond - a[1].diamond)
let sortedpotion = Object.entries(usersdb).sort((a, b) => b[1].potion - a[1].potion)
let sortedsampah = Object.entries(usersdb).sort((a, b) => b[1].sampah - a[1].sampah)
let sortedmakananpet = Object.entries(usersdb).sort((a, b) => b[1].makananpet - a[1].makananpet)
let sortedbatu = Object.entries(usersdb).sort((a, b) => b[1].batu - a[1].batu)
let sortediron = Object.entries(usersdb).sort((a, b) => b[1].iron - a[1].iron)
let sortedkayu = Object.entries(usersdb).sort((a, b) => b[1].kayu - a[1].kayu)
let sortedstring = Object.entries(usersdb).sort((a, b) => b[1].string - a[1].string)
let sortedcommon = Object.entries(usersdb).sort((a, b) => b[1].common - a[1].common)
let sorteduncoommon = Object.entries(usersdb).sort((a, b) => b[1].uncoommon - a[1].uncoommon)
let sortedmythic = Object.entries(usersdb).sort((a, b) => b[1].mythic - a[1].mythic)
let sortedlegendary = Object.entries(usersdb).sort((a, b) => b[1].legendary - a[1].legendary)
let sortedpet = Object.entries(usersdb).sort((a, b) => b[1].pet - a[1].pet)
let sortedgold = Object.entries(usersdb).sort((a, b) => b[1].gold - a[1].gold)
let sortedarlok = Object.entries(usersdb).sort((a, b) => b[1].arlok - a[1].arlok)

let usersmoney = sortedmoney.map(v => v[0])
let userslevel = sortedlevel.map(v => v[0])
let usersdiamond = sorteddiamond.map(v => v[0])
let userspotion = sortedpotion.map(v => v[0])
let userssampah = sortedsampah.map(v => v[0])
let usersmakananpet = sortedmakananpet.map(v => v[0])
let usersbatu = sortedbatu.map(v => v[0])
let usersiron = sortediron.map(v => v[0])
let userskayu = sortedkayu.map(v => v[0])
let usersstring = sortedstring.map(v => v[0])
let userscommon = sortedcommon.map(v => v[0])
let usersuncoommon = sorteduncoommon.map(v => v[0])
let usersmythic = sortedmythic.map(v => v[0])
let userslegendary = sortedlegendary.map(v => v[0])
let userspet = sortedpet.map(v => v[0])
let usersgold = sortedgold.map(v => v[0])
let usersarlok = sortedarlok.map(v => v[0])

//let number = `${PhoneNumber('+' + pasangan.replace('@s.whatsapp.net', '')).getNumber('international')}`

let pepe = flaaa.getRandom()
let pp = pepe + 'Inventario'
let str = `
🎒 *_INVENTARIO TOTAL_*
${readMore}
╭━━━━━━━━━⬣
┃ *INVENTARIO DE ARTICULOS* 
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpg.emoticon('health')} » ${healt}* 
┃ ${rpgg.emoticon('level')} *Nivel : Nivel » ${level}*
┃ ${rpgg.emoticon('role')} *Rango : Role* 
┃ *»* ${rol}
┃ *${rpgg.emoticon('premium')} ${userdb.premium ? "✅ VIP : Premium": "Limitado : Free"}*
┃ 🏦 *Banco » ${userdb.bank}*
┃ 💞 *Pareja »* ${pasangan ? `@${pasangan.split("@")[0]}` : `❌`}
┃ ⚠️ *Advertencia » ${warn}*
┃ 🚷 *Baneado(a) » No*
┃
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╮
┃ PRODUCTOS VALIOSOS
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╯
┃ ${rpgg.emoticon('exp')} *Exp » ${exp}*
┃ ${rpgg.emoticon('limit')} *Diamante : Diamond » ${dia}*
┃ ${rpgg.emoticon('money')} *Coins: » ${money}*
┃ ${rpgg.emoticon('joincount')} *Token » ${token}*
┃ *${rpgshop.emoticon('emerald')} » ${userdb.emerald}*
┃ *${rpgshop.emoticon('berlian')} » ${userdb.berlian}*
┃ *${rpgshop.emoticon('tiketcoin')} » ${userdb.tiketcoin}*
┃ *${rpgshop.emoticon('kyubi')} » ${userdb.kyubi}*
┃ *${rpgshop.emoticon('diamond')} » ${userdb.diamond}*
┃ *${rpgshop.emoticon('gold')} » ${userdb.gold}*
┃ *${rpgshop.emoticon('stamina')} » ${userdb.stamina}%*
┃ 🎟️ *Cupón : Coupon » ${userdb.cupon}*
┃ 📉 *Gastos : Expg » ${userdb.expg}*
┃
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╮
┃ SUPERVIVENCIA
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╯
┃ *${rpgshop.emoticon('potion')} » ${userdb.potion}*
┃ *${rpgshop.emoticon('aqua')} » ${userdb.aqua}*
┃ *${rpgshop.emoticon('trash')} » ${userdb.trash}*
┃ *${rpgshop.emoticon('wood')} » ${userdb.wood}*
┃ *${rpgshop.emoticon('rock')} » ${userdb.rock}*
┃ *${rpgshop.emoticon('batu')} » ${userdb.batu}*
┃ *${rpgshop.emoticon('string')} » ${userdb.string}*
┃ *${rpgshop.emoticon('iron')} » ${userdb.iron}*
┃ *${rpgshop.emoticon('coal')} » ${userdb.coal}*
┃ *${rpgshop.emoticon('botol')} » ${userdb.botol}*
┃ *${rpgshop.emoticon('kaleng')} » ${userdb.kaleng}*
┃ *${rpgshop.emoticon('kardus')} » ${userdb.kardus}*
┃
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╮
┃ OBJETOS MISTERIOSOS
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╯
┃ *${rpgshop.emoticon('eleksirb')} » ${userdb.eleksirb}*
┃ *${rpgshop.emoticon('emasbatang')} » ${userdb.emasbatang}*
┃ *${rpgshop.emoticon('emasbiasa')} » ${userdb.emasbiasa}*
┃ *${rpgshop.emoticon('rubah')} » ${userdb.rubah}*
┃ *${rpgshop.emoticon('emas')} » ${userdb.emas}*
┃ *${rpgshop.emoticon('sampah')} » ${userdb.sampah}*
┃ *${rpgshop.emoticon('serigala')} » ${userdb.serigala}*
┃ *${rpgshop.emoticon('kayu')} » ${userdb.kayu}*
┃ *${rpgshop.emoticon('sword')} » ${userdb.sword}*
┃ *${rpgshop.emoticon('kayu')} » ${userdb.kayu}*
┃ *${rpgshop.emoticon('umpan')} » ${userdb.umpan}*
┃ *${rpgshop.emoticon('healtmonster')} » ${userdb.healtmonster}*
┃ *${rpgshop.emoticon('pancingan')} » ${userdb.pancingan}*
┃ *${rpgshop.emoticon('kayu')} » ${userdb.kayu}*
┃ *${rpg.emoticon('ramuan')} » ${userdb.ramuan}*
┃ *🧭 Reloj : Reloj » ${userdb.arlok}*
╰━━━━━━━━━⬣

🏆 *RESUMEN EN LOS TOPS* 🏆 
👤» *${name}* ( @${who.split("@")[0]} )\n
_1.Top Nivel_ *${userslevel.indexOf(senderJid) + 1}* _de_ *${userslevel.length}*
_2.Top Coins_ *${usersmoney.indexOf(senderJid) + 1}* _de_ *${usersmoney.length}*
_3.Top Diamantes+_ *${usersdiamond.indexOf(senderJid) + 1}* _de_ *${usersdiamond.length}*
_4.Top Poción_ *${userspotion.indexOf(senderJid) + 1}* _de_ *${userspotion.length}*
_5.Top Basura_ *${userssampah.indexOf(senderJid) + 1}* _de_ *${userssampah.length}*
_6.Top Alimento para Mascotas_ *${usersmakananpet.indexOf(senderJid) + 1}* _de_ *${usersmakananpet.length}*
_7.Top Piedra_ *${usersbatu.indexOf(senderJid) + 1}* _de_ *${usersbatu.length}*
_8.Top Hierro_ *${usersiron.indexOf(senderJid) + 1}* _de_ *${usersiron.length}*
_9.Top Madera_ *${userskayu.indexOf(senderJid) + 1}* _de_ *${userskayu.length}*
_10.Top Cuerda_ *${usersstring.indexOf(senderJid) + 1}* _de_ *${usersstring.length}*
_11.Top Caja Común_ *${userscommon.indexOf(senderJid) + 1}* _de_ *${userscommon.length}*
_13.Top Caja poco Común_ *${usersuncoommon.indexOf(senderJid) + 1}* _de_ *${usersuncoommon.length}*
_14.Top Caja Mítica_ *${usersmythic.indexOf(senderJid) + 1}* _de_ *${usersmythic.length}*
_15.Top Caja Legendaria_ *${userslegendary.indexOf(senderJid) + 1}* _de_ *${userslegendary.length}*
_16.Top Caja para Mascota_ *${userspet.indexOf(senderJid) + 1}* _de_ *${userspet.length}*

👤» *@${who.split("@")[0]}* 
🛣️ ESTRATEGIAS | ANIMALES 🌄

╭━━━━━━━━━⬣
┃ *ESTADO DE COMBATE*
┃
┃ *${rpg.emoticon('health')}* 
┃ *» ${healt}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpg.emoticon('pickaxe')}* 
┃ *» ${pickaxe == 0 ? 'No tengo' : '' || pickaxe == 1 ? 'Nivel ✦ 1' : '' || pickaxe == 2 ? 'Nivel ✦ 2' : '' || pickaxe == 3 ? 'Nivel ✦ 3' : '' || pickaxe == 4 ? 'Nivel ✦ 4' : '' || pickaxe == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ ${rpgshopp.emoticon('sword')} *Espada | Sword*
┃ *» ${sword == 0 ? 'No tengo' : '' || sword == 1 ? 'Espada de Cuero ✦' : '' || sword == 2 ? 'Espada de Hierro ✦' : '' || sword == 3 ? 'Espada de Oro ✦' : '' || sword == 4 ? 'Espada de Energía ✦' : '' || sword == 5 ? 'Espada Galáctica ✦ ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ ${rpgg.emoticon('armor')} *Armadura | Armor* 
┃ *» ${armor == 0 ? 'No tengo' : '' || armor == 1 ? '✦ Armadura de Cuero : Leather Armor' : '' || armor == 2 ? '✦ Armadura de Hierro' : '' || armor == 3 ? '✦ Armadura Mágica' : '' || armor == 4 ? '✦ Armadura Robótica' : '' || armor == 5 ? 'Armadura Cyborg Estelar' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ 🎣 *Caña de Pescar | FishingRod* 
┃ *» ${fishingrod}* 
╰━━━━━━━━━⬣

*╭───━• ESTRATEGIAS*
*│🥼 Armadura:* 
*│➠ ${armor == 0 ? 'No tengo' : '' || armor == 1 ? '✦ Armadura de Cuero : Leather Armor' : '' || armor == 2 ? '✦ Armadura de Hierro' : '' || armor == 3 ? '✦ Armadura Mágica' : '' || armor == 4 ? '✦ Armadura Robótica' : '' || armor == 5 ? 'Armadura Cyborg Estelar' : ''}*
*│🥼⇡ Durabilidad:* 
*│↸ ${adurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│⚔️ Espada : Sword* 
*│➠ ${sword == 0 ? 'No tengo' : '' || sword == 1 ? 'Espada de Cuero ✦' : '' || sword == 2 ? 'Espada de Hierro ✦' : '' || sword == 3 ? 'Espada de Oro ✦' : '' || sword == 4 ? 'Espada de Energía ✦' : '' || sword > 0 && sword < 5 ? `Ketahanan (*${sword}* / *${sword *100}*)` : '' || sword == 5 ? 'Espada Galáctica ✦ ǁ MAX' : ''}*
*│⚔️⇡ Durabilidad:* 
*│↸ ${sdurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│⛏️ Pico* 
*│➠ ${pickaxe == 0 ? 'No tengo' : '' || pickaxe == 1 ? 'Nivel ✦ 1' : '' || pickaxe == 2 ? 'Nivel ✦ 2' : '' || pickaxe == 3 ? 'Nivel ✦ 3' : '' || pickaxe == 4 ? 'Nivel ✦ 4' : '' || pickaxe == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
*│⛏️⇡ Durabilidad:* 
*│↸ ${pdurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│🎣 Caña de pescar* 
*│➠ ${pancing == 0 ? 'No tengo' : '' || pancing == 1 ? 'Nivel ✦ 1' : '' || pancing == 2 ? 'Nivel ✦ 2' : '' || pancing == 3 ? 'Nivel ✦ 3' : '' || pancing == 4 ? 'Nivel ✦ 4' : '' || pancing == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
*│🎣⇡ Durabilidad:* 
*│↸ ${fdurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│🏹 Arco : Bow*
*│➠ ${bow == 0 ? 'No tengo' : '' || bow == 1 ? '✦ Arco de Poca Distancia || 1' : '' || bow == 2 ? '✦ Flechas Mejoradas || 2' : '' || bow == 3 ? '✦ Arco de última tecnología || 3' : '' || bow == 4 ? '✦ Arco Explosivo || 4' : '' || bow == 5 ? '✦ Arco Nuclear || 5' : ''}*
*│🏹⇡ Durabilidad:* 
*│↸ ${bdurability}*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

╭━━━━━━━━━⬣
┃ *CAJAS ENCONTRADAS*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('common')}*
┃ *» ${userdb.common}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('uncoommon')}*
┃ *» ${userdb.uncoommon}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('mythic')}*
┃ *» ${userdb.mythic}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('pet')}*
┃ *» ${userdb.pet}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('legendary')}*
┃ *» ${userdb.legendary}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('petFood')}*
┃ *» ${userdb.petFood}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('gardenboxs')}*
┃ *» ${userdb.gardenboxs}*
╰━━━━━━━━━⬣

╭━━━━━━━━━⬣
┃ *MASCOTAS*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('kuda')}*
┃ *${kuda == 0 ? 'No tengo Mascota' : '' || kuda == 1 ? 'Nivel ✦ 1' : '' || kuda == 2 ? 'Nivel ✦ 2' : '' || kuda == 3 ? 'Nivel ✦ 3' : '' || kuda == 4 ? 'Nivel ✦ 4' : '' || kuda == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('zorro')}*
┃ *${rubah == 0 ? 'No tengo Mascota' : '' || rubah == 1 ? 'Nivel ✦ 1' : '' || rubah == 2 ? 'Nivel ✦ 2' : '' || rubah == 3 ? 'Nivel ✦ 3' : '' || rubah == 4 ? 'Nivel ✦ 4' : '' || rubah == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('kucing')}*
┃ *${kucing == 0 ? 'No tengo Mascota' : '' || kucing == 1 ? 'Nivel ✦ 1' : '' || kucing == 2 ? 'Nivel ✦ 2' : '' || kucing == 3 ? 'Nivel ✦ 3' : '' || kucing == 4 ? 'Nivel ✦ 4' : '' || kucing == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('anjing')}*
┃ *${anjing == 0 ? 'No tengo Mascota' : '' || anjing == 1 ? 'Nivel ✦ 1' : '' || anjing == 2 ? 'Nivel ✦ 2' : '' || anjing == 3 ? 'Nivel ✦ 3' : '' || anjing == 4 ? 'Nivel ✦ 4' : '' || anjing == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
╰━━━━━━━━━⬣

*PROGRESO*
*╭────────────┄⸙*
*│ ${rpg.emoticon('level')} » ${userdb.level}*
*│ ${rpg.emoticon('role')}*
*│ »* ${userdb.role}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🦊 Zorro*
*│* ${rubah == 0 ? '*No tengo*' : '' || rubah > 0 && rubah < 5 ? `*Nivel ${rubah} A Nivel ${rubah + 1}*\n*│* Exp *${_rubah}* -> *${rubah *100}*` : '' || rubah == 5 ? '*Nivel Máximo*' : ''}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🐈 Gato* 
*│* ${kucing == 0 ? '*No tengo*' : '' || kucing > 0 && kucing < 5 ? `*Nivel ${kucing} A Nivel ${kucing + 1}*\n*│* Exp *${_kucing}* -> *${kucing *100}*` : '' || kucing == 5 ? '*Nivel Máximo*' : ''}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🐎 Caballo* 
*│* ${kuda == 0 ? '*No tengo*' : '' || kuda > 0 && kuda < 5 ? `*Nivel ${kuda} A Nivel ${kuda + 1}*\n*│* Exp *${_kuda}* -> *${kuda *100}*` : '' || kuda == 5 ? '*Nivel Máximo*' : ''}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🐶 Perro* 
*│* ${anjing == 0 ? '*No tengo*' : '' || anjing > 0 && anjing < 5 ? `*Nivel ${anjing} A Nivel ${anjing + 1}*\n*│* Exp *${_anjing}* -> *${anjing *100}*` : '' || anjing == 5 ? '*Nivel Máximo*' : ''}
*╰────┄⸙*

*╭─━• MASCOTAS EN COMBATE*
*│${rpg.emoticon('horse')} » ${kuda == 0 ? '❌' : '' || kuda == 1 ? 'Nivel ✦ 1' : '' || kuda == 2 ? 'Nivel ✦ 2' : '' || kuda == 3 ? 'Nivel ✦ 3' : '' || kuda == 4 ? 'Nivel ✦ 4' : '' || kuda == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('zorro')} » ${rubah == 0 ? '❌' : '' || rubah == 1 ? 'Nivel ✦ 1' : '' || rubah == 2 ? 'Nivel ✦ 2' : '' || rubah == 3 ? 'Nivel ✦ 3' : '' || rubah == 4 ? 'Nivel ✦ 4' : '' || rubah == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('gato')} » ${kucing == 0 ? '❌' : '' || kucing == 1 ? 'Nivel ✦ 1' : '' || kucing == 2 ? 'Nivel ✦ 2' : '' || kucing == 3 ? 'Nivel ✦ 3' : '' || kucing == 4 ? 'Nivel ✦ 4' : '' || kucing == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('dragon')} » ${naga == 0 ? '❌' : '' || naga == 1 ? 'Nivel ✦ 1' : '' || naga == 2 ? 'Nivel ✦ 2' : '' || naga == 3 ? 'Nivel ✦ 3' : '' || naga == 4 ? 'Nivel ✦ 4' : '' || naga == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('phonix')} » ${phonix == 0 ? '❌' : '' || phonix == 1 ? 'Nivel ✦ 1' : '' || phonix == 2 ? 'Nivel ✦ 2' : '' || phonix == 3 ? 'Nivel ✦ 3' : '' || phonix == 4 ? 'Nivel ✦ 4' : '' || phonix == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('centauro')} » ${centauro == 0 ? '❌' : '' || centauro == 1 ? 'Nivel ✦ 1' : '' || centauro == 2 ? 'Nivel ✦ 2' : '' || centauro == 3 ? 'Nivel ✦ 3' : '' || centauro == 4 ? 'Nivel ✦ 4' : '' || centauro == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('griffin')} » ${griffin == 0 ? '❌' : '' || griffin == 1 ? 'Nivel ✦ 1' : '' || griffin == 2 ? 'Nivel ✦ 2' : '' || griffin == 3 ? 'Nivel ✦ 3' : '' || griffin == 4 ? 'Nivel ✦ 4' : '' || griffin == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('wolf')} » ${serigala == 0 ? '❌' : '' || serigala == 1 ? 'Nivel ✦ 1' : '' || serigala == 2 ? 'Nivel ✦ 2' : '' || serigala == 3 ? 'Nivel ✦ 3' : '' || naga == 4 ? 'Nivel ✦ 4' : '' || serigala == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

*╭* ${menuform.htki} *PROGRESO* ${menuform.htka}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫ ${rpg.emoticon('level')} » ${userdb.level} ➠${userdb.Nivel + 1}*
*╭┫ ✨ Exp » ${userdb.exp} ➠ ${max - userdb.exp}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('zorro')}*\n${rubah == 0 ? '*╰┫❌' : '' || rubah > 0 && rubah < 5 ? `*╰┫ Nivel : Nivel » ${rubah} ➠ ${rubah + 1}*\n*╭┫ ExpPet » ${_rubah} -> ${rubah *100}` : '' || rubah == 5 ? 'Nivel ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('gato')}*\n${kucing == 0 ? '*╰┫❌' : '' || kucing > 0 && kucing < 5 ? `*╰┫ Nivel : Nivel » ${kucing} ➠ ${kucing + 1}*\n*╭┫ ExpPet » ${_kucing} -> ${kucing *100}` : '' || kucing == 5 ? 'Nivel ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('horse')}*\n${kuda == 0 ? '*╰┫❌' : '' || kuda > 0 && kuda < 5 ? `*╰┫ Nivel : Nivel » ${kuda} ➠ ${kuda + 1}*\n*╭┫ ExpPet » ${_kuda} -> ${kuda *100}` : '' || kuda == 5 ? 'Nivel ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('dragon')}*\n${naga == 0 ? '*╰┫❌' : '' || naga > 0 && naga < 5 ? `*╰┫ Nivel : Nivel » ${naga} ➠ ${naga + 1}*\n*╭┫ ExpPet » ${_naga} -> ${naga *100}` : '' || naga == 5 ? 'Nivel ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('phonix')}*\n${phonix == 0 ? '*╰┫❌' : '' || phonix > 0 && phonix < 5 ? `*╰┫ Nivel : Nivel » ${phonix} ➠ ${phonix + 1}*\n*╭┫ ExpPet » ${_phonix} -> ${phonix *100}` : '' || phonix == 5 ? 'Nivel ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('centauro')}*\n${centauro == 0 ? '*╰┫❌' : '' || centauro > 0 && centauro < 5 ? `*╰┫ Nivel : Nivel » ${centauro} ➠ ${centauro + 1}*\n*╭┫ ExpPet » ${_centaur} -> ${centauro *100}` : '' || centauro == 5 ? 'Nivel ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('griffin')}*\n${griffin == 0 ? '*╰┫❌' : '' || griffin > 0 && griffin < 5 ? `*╰┫ Nivel : Nivel » ${griffin} ➠ ${griffin + 1}*\n*╭┫ ExpPet » ${_griffin} -> ${griffin *100}` : '' || griffin == 5 ? 'Nivel ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('wolf')}*\n${serigala == 0 ? '*╰┫❌' : '' || serigala > 0 && serigala < 5 ? `*╰┫ Nivel : Nivel » *${serigala}* ➠ ${serigala + 1}*\n*╭┫ ExpPet » ${_serigala} -> ${serigala *100}` : '' || serigala == 5 ? 'Nivel ✦ ǁ MAX' : ''}*
*╰────────────┄⸙*

🤺 *@${who.split("@")[0]}*
*✅ » MISIÓN DISPONIBLE*

*❌ » MISIÓN NO DISPONIBLE*

*╭──━• MISIONES*
*│ ⛏️⚡ Minar EXP » ${new Date - userdb.lastmiming < 600000 ? '❌' : '✅'}*
*│ ⛏️🪙 Minar Coins » ${new Date - userdb.lastcoins < 600000 ? '❌' : '✅'}*
*│ ⛏️💎 Minar Diamantes » ${new Date - userdb.lastdiamantes < 900000 ? '❌' : '✅'}* 
*│ ⚗️ Cofre » ${new Date - userdb.lastcofre < 86400000 ? '❌' : '✅'}* 
*│ 🏹 Caza » ${new Date - userdb.lastberburu < 2700000 ? '❌' : '✅'}* 
*│ ⛰️ Aventura: » ${new Date - userdb.lastadventure < 1500000 ? '❌' : '✅'}* 
*│ 🕐 Cada hora » ${new Date - userdb.lasthourly < 3600000 ? '❌' : '✅'}* 
*│ 📦 Reclamar » ${new Date - userdb.lastclaim < 7200000 ? '❌' : '✅'}* 
*│ 🎁 Semanalmente ${new Date - userdb.lastweekly < 259200000 ? '❌' : '✅'}* 
*│ 📮 Mensual ${new Date - userdb.lastmonthly < 432000000 ? '❌' : '✅'}* 
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

*╭──━• ANIMALES EN RESERVA*
*│${rpg.emoticon('toro')} ➡️ ${banteng}*
*│${rpg.emoticon('tiger')} ➡️ ${harimau}*
*│${rpg.emoticon('elefante')} ➡️ ${gajah}*
*│${rpg.emoticon('kambing')} ➡️ ${kambing}*
*│${rpg.emoticon('panda')} ➡️ ${panda}*
*│${rpg.emoticon('cocodrilo')} ➡️ ${cocodrilo}*
*│${rpg.emoticon('kerbau')} ➡️ ${kerbau}*
*│${rpg.emoticon('cow')} ➡️ ${sapi}*
*│${rpg.emoticon('monyet')} ➡️ ${monyet}*
*│${rpg.emoticon('Jabali')} ➡️ ${babihutan}*
*│${rpg.emoticon('cerdo')} ➡️ ${cerdo}*
*│${rpg.emoticon('pollo')} ➡️ ${pollo}*
*│*
*│🥢 Animales listos para Cocinar*
*│🥢 Animals ready to Cook*
*│💬 Animales totales » ${ cocodrilo + gajah + panda + babihutan + monyet + harimau + kerbau + kambing + pollo + sapi + cerdo + banteng } Para Cocinar*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

*╭────━• COMIDA*
*│🥓 Comida de Mascota : Food Pet » ${makananpet}*
*│🍖 Pollo a la Parrilla : Grilled Chicken » ${ayamb}*
*│🍗 Pollo frito : Fried Chicken » ${ayamg}*
*│🥘 Alimento de Carne : Meat Food » ${sapir}*
*│🥩 Bistec de Carne : Beef Steak » ${ssapi}*
*│*
*│🎒 Total inv » ${makananpet + ayamb + ayamg + sapir + ssapi} Comida*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

*╭──━• FRUTAS Y SEMILLAS*
*│🥭 Mango » ${mangga}*
*│🍇 Uva : Grape » ${anggur}*
*│🍌 Platano : Banana » ${pisang}*
*│🍊 Naranja : Orange » ${jeruk}*
*│🍎 Manzana : Apple » ${apel}*
*│*
*│🌾 Semillas de Mango : Mango Seeds*
*│» ${semillasdemango}*
*│🌾 Semillas de uva : Grape Seeds*
*│» ${semillasdeuva}* 
*│🌾 Semillas de plátano : Banana Seeds*
*│» ${semillasdeplatano}*
*│🌾 Semillas de naranja : Orange Seeds*
*│» ${semillasdenaranja}*
*│🌾 Semillas de manzana : Apple seeds*
*│» ${semillasdemanzana}*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

╭━━━━━━━━━⬣ 
┃ 🍱 *Alimentos para mascotas: Pet Food*
┃ » *${makananpet}*
┃ 🕊️ *Comida para Fénix : Phoenix Food*
┃ » *${makananphonix}*
┃ 🐉 *Comida para Dragón : Dragon Food*
┃ » *${makanannaga}*
┃ 🦅 *Comida para Ave : Griffin Food*
┃ » *${makanangriffin}*
┃ 🌀 *Comida Mágica : Magic Food*
┃ » *${makanankyubi}*
┃ 🐐 *Comida para Centauro : Centauro Food*
┃ » *${makanancentaur}*
╰━━━━━━━━━⬣

╭━━━━━━━━━⬣ 
┃ *PISCINA DE PECES*
┃ *╸╸╸╸╸╸╸╸╸╸╸╸╸╸*
┃ 🦈 *Tiburón : Shark » ${hiu}*
┃ 🐟 *Pez : Fish » ${ikan}*
┃ 🐠 *Dory : Surgeonfish » ${dory}*
┃ 🐋 *Orca : Killer whale » ${orca}*
┃ 🐳 *Ballena : Whale » ${paus}*
┃ 🦑 *Calamar : Squid » ${cumi}*
┃ 🐙 *Pulpo : Octopus » ${gurita}*
┃ 🐡 *Pez Globo : Blowfish » ${buntal}*
┃ 🦐 *Camarón : Shrimp » ${udang}*
┃ 🐬 *Delfín : Dolphin » ${lumba}*
┃ 🦞 *Langosta : Lobster » ${lobster}*
┃ 🦀 *Cangrejo : Crab » ${kepiting}*
╰━━━━━━━━━⬣

*DATOS DEL GANCHO*
*╭────────────────*
*│🪝 Gancho : Hook » ${pancingan == 0 ? 'No tengo' : '' || pancingan == 1 ? 'Nivel ✦ 1' : '' || pancingan == 2 ? 'Nivel ✦ 2' : '' || pancingan == 3 ? 'Nivel ✦ 3' : '' || pancingan == 4 ? 'Nivel ✦ 4' : '' || pancingan == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
*│ Poder del Gancho*\n*│ ${pancingan == 0 ? 'No tengo' : '' || pancingan > 0 && pancingan < 5 ? `Nivel : Nivel » ${pancingan} a Nivel ${pancingan + 1}*\n*│ Exp » ${_pancingan} -> ${pancingan *10000}*` : '' || pancingan == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
*╰────────────────*

╭━━━━━━━━━⬣
┃ *CAJAS*
┃ *╸╸╸╸╸╸╸╸╸╸╸╸╸╸*
┃📥 *Cajas : Boxs » ${userdb.boxs}*
┃📦 *Caja Común : Common Box » ${userdb.common}*
┃🥡 *Caja Poco Común : Uncommon » ${userdb.uncoommon}*
┃🗳️ *Caja Mítica : Mythic Box » ${userdb.mythic}*
┃🎁 *Caja Legendaria : Legendary Box » ${userdb.legendary}*.
┃🍱 *Caja para Mascota : Pet Box » ${userdb.pet}*
┃💐 *Caja de Jardinería : Garden boxs » ${userdb.gardenboxs}*
╰━━━━━━━━━⬣

👤» *@${who.split("@")[0]}* 
*✅ » MISIÓN DISPONIBLE*

*❌ » MISIÓN NO DISPONIBLE*

*╭──━• MISIONES*
*│ ⛏️⚡ Minar EXP » ${new Date - userdb.lastmiming < 600000 ? '❌' : '✅'}*
${new Date - userdb.lastmiming < 600000 ? `${clockString(userdb.lastmiming + 600000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⛏️🪙 Minar Coins » ${new Date - userdb.lastcoins < 600000 ? '❌' : '✅'}*
${new Date - userdb.lastcoins < 600000 ? `${clockString(userdb.lastcoins + 600000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⛏️💎 Minar Diamantes » ${new Date - userdb.lastdiamantes < 900000 ? '❌' : '✅'}* 
${new Date - userdb.lastdiamantes < 900000 ? `${clockString(userdb.lastdiamantes + 900000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⚗️ Cofre » ${new Date - userdb.lastcofre < 86400000 ? '❌' : '✅'}* 
${new Date - userdb.lastcofre < 86400000 ? `${clockString(userdb.lastcofre + 86400000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 🏹 Caza » ${new Date - userdb.lastberburu < 2700000 ? '❌' : '✅'}* 
${new Date - userdb.lastberburu < 2700000 ? `${clockString(userdb.lastberburu + 2700000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⛰️ Aventura: » ${new Date - userdb.lastadventure < 1500000 ? '❌' : '✅'}* 
${new Date - userdb.lastadventure < 1500000 ? `${clockString(userdb.lastadventure + 1500000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 🕐 Cada hora » ${new Date - userdb.lasthourly < 3600000 ? '❌' : '✅'}* 
${new Date - userdb.lasthourly < 3600000 ? `${clockString(userdb.lasthourly + 3600000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 📦 Reclamar » ${new Date - userdb.lastclaim < 7200000 ? '❌' : '✅'}* 
${new Date - userdb.lastclaim < 7200000 ? `${clockString(userdb.lastclaim + 7200000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 🎁 Semanalmente ${new Date - userdb.lastweekly < 259200000 ? '❌' : '✅'}* 
${new Date - userdb.lastweekly < 259200000 ? `${clockString(userdb.lastweekly + 259200000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 📮 Mensual ${new Date - userdb.lastmonthly < 432000000 ? '❌' : '✅'}* 
${new Date - userdb.lastmonthly < 432000000 ? `${clockString(userdb.lastmonthly + 432000000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│*
*│ PROXIMAMENTE* ⬇️
*│*
*│ 🚀 Cohete »* ${userdb.lastroket > 0 ? '✅' : '❌'}
*│ 🚘 Conducir »* ${userdb.lastngojek > 0 ? '✅' : '❌'}
*│ 🚖 taxy: »* ${userdb.lastgrab > 0 ? '✅' : '❌'}
*│ 👺 Maldición »* ${userdb.lastlumber > 0 ? '✅' : '❌'}
*│ 👾 Sacudir »* ${userdb.lastngocok > 0 ? '✅' : '❌'}
*│ ⚔️ Duelo:* ${userdb.lastduel > 0 ? '✅' : '❌'}
*│ 🛡️ Guerra:* ${userdb.lastwar > 0 ? '✅' : '❌'}
*│ 🎃 Mazmorras:* ${userdb.lastdungeon > 0 ? '✅' : '❌'}
*│ 💱 Comercio:* ${userdb.lastdagang > 0 ? '✅' : '❌'}
*│ 🧺 Jardinería:* ${userdb.lastberkebon > 0 ? '✅' : '❌'}
*│ 🎣 Pezca:* ${userdb.lastfishing > 0 ? '✅' : '❌'}
*│ 💰 Asistencia social:* ${userdb.lastbansos > 0 ? '✅' : '❌'}
*│*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

🏆 *RESUMEN EN LOS TOPS* 🏆 
👤» *${name}* ( @${who.split("@")[0]} )\n
_1.Top Nivel_ *${userslevel.indexOf(senderJid) + 1}* _de_ *${userslevel.length}*
_2.Top Coins_ *${usersmoney.indexOf(senderJid) + 1}* _de_ *${usersmoney.length}*
_3.Top Diamantes+_ *${usersdiamond.indexOf(senderJid) + 1}* _de_ *${usersdiamond.length}*
_4.Top Poción_ *${userspotion.indexOf(senderJid) + 1}* _de_ *${userspotion.length}*
_5.Top Basura_ *${userssampah.indexOf(senderJid) + 1}* _de_ *${userssampah.length}*
_6.Top Alimento para Mascotas_ *${usersmakananpet.indexOf(senderJid) + 1}* _de_ *${usersmakananpet.length}*
_7.Top Piedra_ *${usersbatu.indexOf(senderJid) + 1}* _de_ *${usersbatu.length}*
_8.Top Hierro_ *${usersiron.indexOf(senderJid) + 1}* _de_ *${usersiron.length}*
_9.Top Madera_ *${userskayu.indexOf(senderJid) + 1}* _de_ *${userskayu.length}*
_10.Top Cuerda_ *${usersstring.indexOf(senderJid) + 1}* _de_ *${usersstring.length}*
_11.Top Caja Común_ *${userscommon.indexOf(senderJid) + 1}* _de_ *${userscommon.length}*
_13.Top Caja poco Común_ *${usersuncoommon.indexOf(senderJid) + 1}* _de_ *${usersuncoommon.length}*
_14.Top Caja Mítica_ *${usersmythic.indexOf(senderJid) + 1}* _de_ *${usersmythic.length}*
_15.Top Caja Legendaria_ *${userslegendary.indexOf(senderJid) + 1}* _de_ *${userslegendary.length}*
_16.Top Caja para Mascota_ *${userspet.indexOf(senderJid) + 1}* _de_ *${userspet.length}*
_17.Top Gold_ *${usersgold.indexOf(senderJid) + 1}* _de_ *${usersgold.length}*
_18.Top Clock_ *${usersarlok.indexOf(senderJid) + 1}* _de_ *${usersarlok.length}*`

// let ftroli = { key: {participant : '0@s.whatsapp.net'}, message: { orderMessage: { itemCount: 2022, status: 1, surface: 1, message: bottime, orderTitle: info.nanipe, sellerJid: '0@s.whatsapp.net' } } } 
//await conn.sendButton(m.chat, `*PREMIUM ${userdb.premium ? "✅": "❌"}*\n> ${info.nanipe}`, str, imgr + 'Inventario', , m, {quoted: fkontak})
let resp = `*PREMIUM ${userdb.premium ? "✅": "❌"}*\n> ${info.nanipe}` + '\n' + str 
const buff = info.nanipe
const buttons = [[`${healt < 40 ? '❤️ _CURARME_' : 'Aventurar 🏕️'}`, `${healt < 40 ? `${usedPrefix}heal` : `${usedPrefix}adventure`}`], ['🏪 Tienda para Comprar | Buy', `${usedPrefix}buy`], ['🏪 Tienda para Vender', `${usedPrefix}sell`]]
if (start.buttons) {
return conn.sendButton( m.chat, {text: resp, footer: buff}, {}, buttons, userdb, fkontak)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanipe, m );
}
} else if (args[0] == '4') { // Inventario 4

// let name = m.fromMe ? conn.user : conn.contacts[senderJid]
let name = senderJid
let usuario = await conn.getName(name)

let sortedmoney = Object.entries(usersdb).sort((a, b) => b[1].money - a[1].money)
let sortedlevel = Object.entries(usersdb).sort((a, b) => b[1].Nivel - a[1].level)
let sorteddiamond = Object.entries(usersdb).sort((a, b) => b[1].diamond - a[1].diamond)
let sortedpotion = Object.entries(usersdb).sort((a, b) => b[1].potion - a[1].potion)
let sortedsampah = Object.entries(usersdb).sort((a, b) => b[1].sampah - a[1].sampah)
let sortedmakananpet = Object.entries(usersdb).sort((a, b) => b[1].makananpet - a[1].makananpet)
let sortedbatu = Object.entries(usersdb).sort((a, b) => b[1].batu - a[1].batu)
let sortediron = Object.entries(usersdb).sort((a, b) => b[1].iron - a[1].iron)
let sortedkayu = Object.entries(usersdb).sort((a, b) => b[1].kayu - a[1].kayu)
let sortedstring = Object.entries(usersdb).sort((a, b) => b[1].string - a[1].string)
let sortedcommon = Object.entries(usersdb).sort((a, b) => b[1].common - a[1].common)
let sorteduncoommon = Object.entries(usersdb).sort((a, b) => b[1].uncoommon - a[1].uncoommon)
let sortedmythic = Object.entries(usersdb).sort((a, b) => b[1].mythic - a[1].mythic)
let sortedlegendary = Object.entries(usersdb).sort((a, b) => b[1].legendary - a[1].legendary)
let sortedpet = Object.entries(usersdb).sort((a, b) => b[1].pet - a[1].pet)
let sortedgold = Object.entries(usersdb).sort((a, b) => b[1].gold - a[1].gold)
let sortedarlok = Object.entries(usersdb).sort((a, b) => b[1].arlok - a[1].arlok)

let usersmoney = sortedmoney.map(v => v[0])
let userslevel = sortedlevel.map(v => v[0])
let usersdiamond = sorteddiamond.map(v => v[0])
let userspotion = sortedpotion.map(v => v[0])
let userssampah = sortedsampah.map(v => v[0])
let usersmakananpet = sortedmakananpet.map(v => v[0])
let usersbatu = sortedbatu.map(v => v[0])
let usersiron = sortediron.map(v => v[0])
let userskayu = sortedkayu.map(v => v[0])
let usersstring = sortedstring.map(v => v[0])
let userscommon = sortedcommon.map(v => v[0])
let usersuncoommon = sorteduncoommon.map(v => v[0])
let usersmythic = sortedmythic.map(v => v[0])
let userslegendary = sortedlegendary.map(v => v[0])
let userspet = sortedpet.map(v => v[0])
let usersgold = sortedgold.map(v => v[0])
let usersarlok = sortedarlok.map(v => v[0])

let str = `
👤» *${usuario}* ( @${who.split("@")[0]} )\n
*✅ » MISIÓN DISPONIBLE*

*❌ » MISIÓN NO DISPONIBLE*

*╭──━• MISIONES*
*│ ⛏️⚡ Minar EXP » ${new Date - userdb.lastmiming < 600000 ? '❌' : '✅'}*
${new Date - userdb.lastmiming < 600000 ? `${clockString(userdb.lastmiming + 600000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⛏️🪙 Minar Coins » ${new Date - userdb.lastcoins < 600000 ? '❌' : '✅'}*
${new Date - userdb.lastcoins < 600000 ? `${clockString(userdb.lastcoins + 600000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⛏️💎 Minar Diamantes » ${new Date - userdb.lastdiamantes < 900000 ? '❌' : '✅'}* 
${new Date - userdb.lastdiamantes < 900000 ? `${clockString(userdb.lastdiamantes + 900000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⚗️ Cofre » ${new Date - userdb.lastcofre < 86400000 ? '❌' : '✅'}* 
${new Date - userdb.lastcofre < 86400000 ? `${clockString(userdb.lastcofre + 86400000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 🏹 Caza » ${new Date - userdb.lastberburu < 2700000 ? '❌' : '✅'}* 
${new Date - userdb.lastberburu < 2700000 ? `${clockString(userdb.lastberburu + 2700000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⛰️ Aventura: » ${new Date - userdb.lastadventure < 1500000 ? '❌' : '✅'}* 
${new Date - userdb.lastadventure < 1500000 ? `${clockString(userdb.lastadventure + 1500000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 🕐 Cada hora » ${new Date - userdb.lasthourly < 3600000 ? '❌' : '✅'}* 
${new Date - userdb.lasthourly < 3600000 ? `${clockString(userdb.lasthourly + 3600000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 📦 Reclamar » ${new Date - userdb.lastclaim < 7200000 ? '❌' : '✅'}* 
${new Date - userdb.lastclaim < 7200000 ? `${clockString(userdb.lastclaim + 7200000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 🎁 Semanalmente ${new Date - userdb.lastweekly < 259200000 ? '❌' : '✅'}* 
${new Date - userdb.lastweekly < 259200000 ? `${clockString(userdb.lastweekly + 259200000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 📮 Mensual ${new Date - userdb.lastmonthly < 432000000 ? '❌' : '✅'}* 
${new Date - userdb.lastmonthly < 432000000 ? `${clockString(userdb.lastmonthly + 432000000 - new Date())}` : '*│* ✅ MISION YA DISPONIBLE'}
*│*
*│ PROXIMAMENTE* ⬇️
*│*
*│ 🚀 Cohete »* ${userdb.lastroket > 0 ? '✅' : '❌'}
*│ 🚘 Conducir »* ${userdb.lastngojek > 0 ? '✅' : '❌'}
*│ 🚖 taxy: »* ${userdb.lastgrab > 0 ? '✅' : '❌'}
*│ 👺 Maldición »* ${userdb.lastlumber > 0 ? '✅' : '❌'}
*│ 👾 Sacudir »* ${userdb.lastngocok > 0 ? '✅' : '❌'}
*│ ⚔️ Duelo:* ${userdb.lastduel > 0 ? '✅' : '❌'}
*│ 🛡️ Guerra:* ${userdb.lastwar > 0 ? '✅' : '❌'}
*│ 🎃 Mazmorras:* ${userdb.lastdungeon > 0 ? '✅' : '❌'}
*│ 💱 Comercio:* ${userdb.lastdagang > 0 ? '✅' : '❌'}
*│ 🧺 Jardinería:* ${userdb.lastberkebon > 0 ? '✅' : '❌'}
*│ 🎣 Pezca:* ${userdb.lastfishing > 0 ? '✅' : '❌'}
*│ 💰 Asistencia social:* ${userdb.lastbansos > 0 ? '✅' : '❌'}
*│*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

🚀🏆 *RESUMEN EN LOS TOPS* 🏆 🚀
👤» *${usuario}* ( @${who.split("@")[0]} )\n
_1.Top Nivel_ *${userslevel.indexOf(senderJid) + 1}* _de_ *${userslevel.length}*
_2.Top Coins_ *${usersmoney.indexOf(senderJid) + 1}* _de_ *${usersmoney.length}*
_3.Top Diamantes+_ *${usersdiamond.indexOf(senderJid) + 1}* _de_ *${usersdiamond.length}*
_4.Top Poción_ *${userspotion.indexOf(senderJid) + 1}* _de_ *${userspotion.length}*
_5.Top Basura_ *${userssampah.indexOf(senderJid) + 1}* _de_ *${userssampah.length}*
_6.Top Alimento para Mascotas_ *${usersmakananpet.indexOf(senderJid) + 1}* _de_ *${usersmakananpet.length}*
_7.Top Piedra_ *${usersbatu.indexOf(senderJid) + 1}* _de_ *${usersbatu.length}*
_8.Top Hierro_ *${usersiron.indexOf(senderJid) + 1}* _de_ *${usersiron.length}*
_9.Top Madera_ *${userskayu.indexOf(senderJid) + 1}* _de_ *${userskayu.length}*
_10.Top Cuerda_ *${usersstring.indexOf(senderJid) + 1}* _de_ *${usersstring.length}*
_11.Top Caja Común_ *${userscommon.indexOf(senderJid) + 1}* _de_ *${userscommon.length}*
_13.Top Caja poco Común_ *${usersuncoommon.indexOf(senderJid) + 1}* _de_ *${usersuncoommon.length}*
_14.Top Caja Mítica_ *${usersmythic.indexOf(senderJid) + 1}* _de_ *${usersmythic.length}*
_15.Top Caja Legendaria_ *${userslegendary.indexOf(senderJid) + 1}* _de_ *${userslegendary.length}*
_16.Top Caja para Mascota_ *${userspet.indexOf(senderJid) + 1}* _de_ *${userspet.length}*
_17.Top Gold_ *${usersgold.indexOf(senderJid) + 1}* _de_ *${usersgold.length}*
_18.Top Clock_ *${usersarlok.indexOf(senderJid) + 1}* _de_ *${usersarlok.length}*

*Héroe*
Mi héroe: *${userdb.hero == 0 ? 'No tengo' : '' || userdb.hero == 1 ? 'Nivel 1' : '' || userdb.hero == 2 ? 'Nivel 2' : '' || userdb.hero == 3 ? 'Nivel 3' : '' || userdb.hero == 4 ? 'Nivel 4' : '' || userdb.hero == 5 ? 'Nivel 5' : '' || userdb.hero == 6 ? 'Nivel 6' : '' || userdb.hero == 7 ? 'Nivel 7' : '' || userdb.hero == 8 ? 'Nivel 8' : '' || userdb.hero == 9 ? 'Nivel 9' : '' || userdb.hero == 10 ? 'Nivel 10' : '' || userdb.hero == 11 ? 'Nivel 11' : '' || userdb.hero == 12 ? 'Nivel 12' : '' || userdb.hero == 13 ? 'Nivel 13' : '' || userdb.hero == 14 ? 'Nivel 14' : '' || userdb.hero == 15 ? 'Nivel 15' : '' || userdb.hero == 16 ? 'Nivel 16' : '' || userdb.hero == 17 ? 'Nivel 17' : '' || userdb.hero == 18 ? 'Nivel 18' : '' || userdb.hero == 19 ? 'Nivel 19' : '' || userdb.hero == 20 ? 'Nivel 20' : '' || userdb.hero == 21 ? 'Nivel 21' : '' || userdb.hero == 22 ? 'Nivel 22' : '' || userdb.hero == 23 ? 'Nivel 23' : '' || userdb.hero == 24 ? 'Nivel 24' : '' || userdb.hero == 25 ? 'Nivel 25' : '' || userdb.hero == 26 ? 'Nivel 26' : '' || userdb.hero == 27 ? 'Nivel 27' : '' || userdb.hero == 28 ? 'Nivel 28' : '' || userdb.hero == 29 ? 'Nivel 29' : '' || userdb.hero == 30 ? 'Nivel 30' : '' || userdb.hero == 31 ? 'Nivel 31' : '' || userdb.hero == 32 ? 'Nivel 32' : '' || userdb.hero == 33 ? 'Nivel 33' : '' || userdb.hero == 34 ? 'Nivel 34' : '' || userdb.hero == 35 ? 'Nivel 35' : '' || userdb.hero == 36 ? 'Nivel 36' : '' || userdb.hero == 37 ? 'Nivel 37': '' || userdb.hero == 38 ? 'Nivel 38' : '' || userdb.hero == 39 ? 'Nivel 39' : '' || userdb.hero == 40 ? 'Nivel MAX' : ''}*

*Mascota*
Kucing: *${userdb.kucing == 0 ? 'No tengo' : '' || userdb.kucing == 1 ? 'Nivel 1' : '' || userdb.kucing == 2 ? 'Nivel 2' : '' || userdb.kucing == 3 ? 'Nivel 3' : '' || userdb.kucing == 4 ? 'Nivel 4' : '' || userdb.kucing == 5 ? 'Nivel MAX' : ''}*
Kuda: *${kuda == 0 ? 'No tengo' : '' || kuda == 1 ? 'Nivel 1' : '' || kuda == 2 ? 'Nivel 2' : '' || kuda == 3 ? 'Nivel 3' : '' || kuda == 4 ? 'Nivel 4' : '' || kuda == 5 ? 'Nivel MAX' : ''}*
Naga: *${naga == 0 ? 'No tengo' : '' || naga == 1 ? 'Nivel 1' : '' || naga == 2 ? 'Nivel 2' : '' || naga == 3 ? 'Nivel 3' : '' || naga == 4 ? 'Nivel 4' : '' || naga == 5 ? 'Nivel 5' : '' || naga == 6 ? 'Nivel 6' : '' || naga == 7 ? 'Nivel 7' : '' || naga == 8 ? 'Nivel 8' : '' || naga == 9 ? 'Nivel 9' : '' || naga == 10 ? 'Nivel 10' : '' || naga == 11 ? 'Nivel 11' : '' || naga == 12 ? 'Nivel 12' : '' || naga == 13 ? 'Nivel 13' : '' || naga == 14 ? 'Nivel 14' : '' || naga == 15 ? 'Nivel 15' : '' || naga == 16 ? 'Nivel 16' : '' || naga == 17 ? 'Nivel 17' : '' || naga == 18 ? 'Nivel 18' : '' || naga == 19 ? 'Nivel 19' : '' || naga == 20 ? 'Nivel MAX' : ''}*
Kyubi: *${userdb.kyubi == 0 ? 'No tengo' : '' || userdb.kyubi == 1 ? 'Nivel 1' : '' || userdb.kyubi == 2 ? 'Nivel 2' : '' || userdb.kyubi == 3 ? 'Nivel 3' : '' || userdb.kyubi == 4 ? 'Nivel 4' : '' || userdb.kyubi == 5 ? 'Nivel 5' : '' || userdb.kyubi == 6 ? 'Nivel 6' : '' || userdb.kyubi == 7 ? 'Nivel 7' : '' || userdb.kyubi == 8 ? 'Nivel 8' : '' || userdb.kyubi == 9 ? 'Nivel 9' : '' || userdb.kyubi == 10 ? 'Nivel 10' : '' || userdb.kyubi == 11 ? 'Nivel 11' : '' || userdb.kyubi == 12 ? 'Nivel 12' : '' || userdb.kyubi == 13 ? 'Nivel 13' : '' || userdb.kyubi == 14 ? 'Nivel 14' : '' || userdb.kyubi == 15 ? 'Nivel 15' : '' || userdb.kyubi == 16 ? 'Nivel 16' : '' || userdb.kyubi == 17 ? 'Nivel 17' : '' || userdb.kyubi == 18 ? 'Nivel 18' : '' || userdb.kyubi == 19 ? 'Nivel 19' : '' || userdb.kyubi == 20 ? 'Nivel MAX' : ''}*
centauro: *${centauro == 0 ? 'No tengo' : '' || centauro == 1 ? 'Nivel 1' : '' || centauro == 2 ? 'Nivel 2' : '' || centauro == 3 ? 'Nivel 3' : '' || centauro == 4 ? 'Nivel 4' : '' || centauro == 5 ? 'Nivel 5' : '' || centauro == 6 ? 'Nivel 6' : '' || centauro == 7 ? 'Nivel 7' : '' || centauro == 8 ? 'Nivel 8' : '' || centauro == 9 ? 'Nivel 9' : '' || centauro == 10 ? 'Nivel 10' : '' || centauro == 11 ? 'Nivel 11' : '' || centauro == 12 ? 'Nivel 12' : '' || centauro == 13 ? 'Nivel 13' : '' || centauro == 14 ? 'Nivel 14' : '' || centauro == 15 ? 'Nivel 15' : '' || centauro == 16 ? 'Nivel 16' : '' || centauro == 17 ? 'Nivel 17' : '' || centauro == 18 ? 'Nivel 18' : '' || centauro == 19 ? 'Nivel 19' : '' || centauro == 20 ? 'Nivel MAX' : ''}*
Rubah: *${rubah == 0 ? 'No tengo' : '' || rubah == 1 ? 'Nivel 1' : '' || rubah == 2 ? 'Nivel 2' : '' || rubah == 3 ? 'Nivel 3' : '' || rubah == 4 ? 'Nivel 4' : '' || rubah == 5 ? 'Nivel MAX' : ''}*
Phonix: *${phonix == 0 ? 'No tengo' : '' || phonix == 1 ? 'Nivel 1' : '' || phonix == 2 ? 'Nivel 2' : '' || phonix == 3 ? 'Nivel 3' : '' || phonix == 4 ? 'Nivel 4' : '' || phonix == 5 ? 'Nivel 5' : '' || phonix == 6 ? 'Nivel 6' : '' || phonix == 7 ? 'Nivel 7' : '' || phonix == 8 ? 'Nivel 8' : '' || phonix == 9 ? 'Nivel 9' : '' || phonix == 10 ? 'Nivel 10' : '' || phonix == 11 ? 'Nivel 11' : '' || phonix == 12 ? 'Nivel 12' : '' || phonix == 13 ? 'Nivel 13' : '' || phonix == 14 ? 'Nivel 14' : '' || phonix == 15 ? 'Nivel MAX' : ''}*
Griffin: *${griffin == 0 ? 'No tengo' : '' || griffin == 1 ? 'Nivel 1' : '' || griffin == 2 ? 'Nivel 2' : '' || griffin == 3 ? 'Nivel 3' : '' || griffin == 4 ? 'Nivel 4' : '' || griffin == 5 ? 'Nivel 5' : '' || griffin == 6 ? 'Nivel 6' : '' || griffin == 7 ? 'Nivel 7' : '' || griffin == 8 ? 'Nivel 8' : '' || griffin == 9 ? 'Nivel 9' : '' || griffin == 10 ? 'Nivel 10' : '' || griffin == 11 ? 'Nivel 11' : '' || griffin == 12 ? 'Nivel 12' : '' || griffin == 13 ? 'Nivel 13' : '' || griffin == 14 ? 'Nivel 14' : '' || griffin == 15 ? 'Nivel MAX' : ''}*
Serigala: *${serigala == 0 ? 'No tengo' : '' || serigala == 1 ? 'Nivel 1' : '' || serigala == 2 ? 'Nivel 2' : '' || serigala == 3 ? 'Nivel 3' : '' || serigala == 4 ? 'Nivel 4' : '' || serigala == 5 ? 'Nivel 5' : '' || serigala == 6 ? 'Nivel 6' : '' || serigala == 7 ? 'Nivel 7' : '' || serigala == 8 ? 'Nivel 8' : '' || serigala == 9 ? 'Nivel 9' : '' || serigala == 10 ? 'Nivel 10' : '' || serigala == 11 ? 'Nivel 11' : '' || serigala == 12 ? 'Nivel 12' : '' || serigala == 13 ? 'Nivel 13' : '' || serigala == 14 ? 'Nivel 14' : '' || serigala == 15 ? 'Nivel MAX' : ''}*\n
*PROGRESO*
╭────────────────
│Level *${level}* al Nivel *${level}*
│Exp *${exp}* -> *${max}*
│
│Hero ${userdb.hero == 0 ? 'No tengo' : '' || userdb.hero > 0 && userdb.hero < 40 ? `Nivel *${userdb.hero}* al Nivel *${userdb.hero + 1}*\n│Exp *${exp}* -> *${userdb.hero *500}*` : '' || userdb.hero == 40 ? '*Max Nivel*' : ''}
╰────────────────
╭────────────────
│Rubah ${userdb.rubah == 0 ? 'No tengo' : '' || userdb.rubah > 0 && userdb.rubah < 5 ? `Nivel *${userdb.rubah}* al Nivel *${userdb.rubah + 1}*\n│Exp *${userdb.anakrubah}* -> *${userdb.rubah *1000}*` : '' || userdb.rubah == 5 ? '*Max Nivel*' : ''}
╰────────────────
╭────────────────
│Kucing ${userdb.kucing == 0 ? 'No tengo' : '' || userdb.kucing > 0 && userdb.kucing < 5 ? `Nivel *${userdb.kucing}* al Nivel *${userdb.kucing + 1}*\n│Exp *${_kucing}* -> *${userdb.kucing *1000}*` : '' || userdb.kucing == 5 ? '*Max Nivel*' : ''}
╰────────────────
╭────────────────
│Kuda ${kuda == 0 ? 'No tengo' : '' || kuda > 0 && kuda < 5 ? `Nivel *${kuda}* al Nivel *${kuda + 1}*\n│Exp *${_kuda}* -> *${kuda *1000}*` : '' || kuda == 5 ? '*Max Nivel*' : ''}
╰────────────────
╭────────────────
│Naga ${naga == 0 ? 'No tengo' : '' || naga > 0 && naga < 20 ? `Nivel *${naga}* al Nivel *${naga + 1}*\n│Exp *${_naga}* -> *${naga *10000}*` : '' || naga == 20 ? '*Max Nivel*' : ''}
╰────────────────
╭────────────────
│Phonix ${phonix == 0 ? 'No tengo' : '' || phonix > 0 && phonix < 15 ? `Nivel *${phonix}* al Nivel *${phonix + 1}*\n│Exp *${_phonix}* -> *${phonix *10000}*` : '' || phonix == 15 ? '*Max Nivel*' : ''}
╰────────────────
╭────────────────
│Kyubi ${userdb.kyubi == 0 ? 'No tengo' : '' || userdb.kyubi > 0 && userdb.kyubi < 20 ? `Nivel *${userdb.kyubi}* al Nivel *${userdb.kyubi + 1}*\n│Exp *${userdb.kyubi}* -> *${userdb.kyubi *10000}*` : '' || userdb.kyubi == 20 ? '*Max Nivel*' : ''}
╰────────────────
╭────────────────
│Centauro ${centauro == 0 ? 'No tengo' : '' || centauro > 0 && centauro < 20 ? `Nivel *${centauro}* al Nivel *${centauro + 1}*\n│Exp *${_centaur}* -> *${centauro *10000}*` : '' || centauro == 20 ? '*Max Nivel*' : ''}
╰────────────────
╭────────────────
│Griffin ${griffin == 0 ? 'No tengo' : '' || griffin > 0 && griffin < 15 ? `Nivel *${griffin}* al Nivel *${griffin + 1}*\n│Exp *${_griffin}* -> *${griffin *10000}*` : '' || griffin == 15 ? '*Max Nivel*' : ''}
╰────────────────
╭────────────────
│Serigala ${serigala == 0 ? 'No tengo' : '' || serigala > 0 && serigala < 15 ? `Nivel *${serigala}* al Nivel *${serigala + 1}*\n│Exp *${_serigala}* -> *${serigala *10000}*` : '' || serigala == 15? '*Max Nivel*' : ''}
╰────────────────\n\n
`.trim()
/*
*/

let resp = `*PREMIUM ${userdb.premium ? "✅": "❌"}*\n> ${info.nanipe}\n`+ str 
const buff = info.nanipe
const buttons = [[`🍱 Inventario de alimentos `, `${usedPrefix}alimentos`], [`🎒 Inventario total`, `${usedPrefix}inventario 4`], ['💗 _Menu Aventura | RPG_', `${usedPrefix}rpg`]]
if (start.buttons) {
return conn.sendButton( m.chat, {text: resp, footer: buff}, {}, buttons, userdb, fkontak)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanipe, m );
}
} else if (args[0] == 'alimentos') { // Inventario piscina
let aineh = `
*╭──━• ANIMALES EN RESERVA*
*│${rpg.emoticon('toro')} ➡️ ${banteng}*
*│${rpg.emoticon('tiger')} ➡️ ${harimau}*
*│${rpg.emoticon('elefante')} ➡️ ${gajah}*
*│${rpg.emoticon('kambing')} ➡️ ${kambing}*
*│${rpg.emoticon('panda')} ➡️ ${panda}*
*│${rpg.emoticon('cocodrilo')} ➡️ ${cocodrilo}*
*│${rpg.emoticon('kerbau')} ➡️ ${kerbau}*
*│${rpg.emoticon('cow')} ➡️ ${sapi}*
*│${rpg.emoticon('monyet')} ➡️ ${monyet}*
*│${rpg.emoticon('Jabali')} ➡️ ${babihutan}*
*│${rpg.emoticon('cerdo')} ➡️ ${cerdo}*
*│${rpg.emoticon('pollo')} ➡️ ${pollo}*
*│*
*│🥢 Animales listos para Cocinar*
*│🥢 Animals ready to Cook*
*│💬 Animales totales » ${ cocodrilo + gajah + panda + babihutan + monyet + harimau + kerbau + kambing + pollo + sapi + cerdo + banteng } Para Cocinar*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

*╭────━• COMIDA*
*│🥓 Comida de Mascota : Food Pet » ${makananpet}*
*│🍖 Pollo a la Parrilla : Grilled Chicken » ${ayamb}*
*│🍗 Pollo frito : Fried Chicken » ${ayamg}*
*│🥘 Alimento de Carne : Meat Food » ${sapir}*
*│🥩 Bistec de Carne : Beef Steak » ${ssapi}*
*│*
*│🎒 Total inv » ${makananpet + ayamb + ayamg + sapir + ssapi} Comida*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

*╭──━• FRUTAS Y SEMILLAS*
*│🥭 Mango » ${mangga}*
*│🍇 Uva : Grape » ${anggur}*
*│🍌 Platano : Banana » ${pisang}*
*│🍊 Naranja : Orange » ${jeruk}*
*│🍎 Manzana : Apple » ${apel}*
*│*
*│🌾 Semillas de Mango : Mango Seeds*
*│» ${semillasdemango}*
*│🌾 Semillas de uva : Grape Seeds*
*│» ${semillasdeuva}* 
*│🌾 Semillas de plátano : Banana Seeds*
*│» ${semillasdeplatano}*
*│🌾 Semillas de naranja : Orange Seeds*
*│» ${semillasdenaranja}*
*│🌾 Semillas de manzana : Apple seeds*
*│» ${semillasdemanzana}*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

╭━━━━━━━━━⬣ 
┃ 🍱 *Alimentos para mascotas: Pet Food*
┃ » *${makananpet}*
┃ 🕊️ *Comida para Fénix : Phoenix Food*
┃ » *${makananphonix}*
┃ 🐉 *Comida para Dragón : Dragon Food*
┃ » *${makanannaga}*
┃ 🦅 *Comida para Ave : Griffin Food*
┃ » *${makanangriffin}*
┃ 🌀 *Comida Mágica : Magic Food*
┃ » *${makanankyubi}*
┃ 🐐 *Comida para Centauro : Centauro Food*
┃ » *${makanancentaur}*
╰━━━━━━━━━⬣

╭━━━━━━━━━⬣ 
┃ *PISCINA DE PECES*
┃ *╸╸╸╸╸╸╸╸╸╸╸╸╸╸*
┃ 🦈 *Tiburón : Shark » ${hiu}*
┃ 🐟 *Pez : Fish » ${ikan}*
┃ 🐠 *Dory : Surgeonfish » ${dory}*
┃ 🐋 *Orca : Killer whale » ${orca}*
┃ 🐳 *Ballena : Whale » ${paus}*
┃ 🦑 *Calamar : Squid » ${cumi}*
┃ 🐙 *Pulpo : Octopus » ${gurita}*
┃ 🐡 *Pez Globo : Blowfish » ${buntal}*
┃ 🦐 *Camarón : Shrimp » ${udang}*
┃ 🐬 *Delfín : Dolphin » ${lumba}*
┃ 🦞 *Langosta : Lobster » ${lobster}*
┃ 🦀 *Cangrejo : Crab » ${kepiting}*
╰━━━━━━━━━⬣

*DATOS DEL GANCHO*
*╭────────────────*
*│🪝 Gancho : Hook » ${pancingan == 0 ? 'No tengo' : '' || pancingan == 1 ? 'Nivel ✦ 1' : '' || pancingan == 2 ? 'Nivel ✦ 2' : '' || pancingan == 3 ? 'Nivel ✦ 3' : '' || pancingan == 4 ? 'Nivel ✦ 4' : '' || pancingan == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}*
*│ Poder del Gancho » ${pancingan == 0 ? 'No tengo' : '' || pancingan > 0 && pancingan < 5 ? `Nivel : Nivel » ${pancingan} a Nivel ${pancingan + 1}*\n*│ Exp » ${_pancingan} -> ${pancingan *10000}*` : '' || pancingan == 5 ? 'Nivel ✦ 5 ǁ MAX' : ''}
*╰────────────────*

╭━━━━━━━━━⬣
┃ *CAJAS*
┃ *╸╸╸╸╸╸╸╸╸╸╸╸╸╸*
┃📥 *Cajas : Boxs » ${userdb.boxs}*
┃📦 *Caja Común : Common Box » ${userdb.common}*
┃🥡 *Caja Poco Común : Uncommon » ${userdb.uncoommon}*
┃🗳️ *Caja Mítica : Mythic Box » ${userdb.mythic}*
┃🎁 *Caja Legendaria : Legendary Box » ${userdb.legendary}*.
┃🍱 *Caja para Mascota : Pet Box » ${userdb.pet}*
┃💐 *Caja de Jardinería : Garden boxs » ${userdb.gardenboxs}*
╰━━━━━━━━━⬣`.trim()

let resp = `*PREMIUM ${userdb.premium ? "✅": "❌"}*\n> ${info.nanipe}` + aineh.trim()
const buff = info.nanipe
const buttons = [[`🐈 Inventario de animales`, `${usedPrefix}animales`], [`🎒 Inventario total`, `${usedPrefix}inventario 4`], ['_Menu Aventura | RPG_ 💗', `${usedPrefix}rpgmenu`]]
if (start.buttons) {
return conn.sendButton( m.chat, {text: resp, footer: buff}, {}, buttons, userdb, fkontak, { mentions: conn.parseMention(resp) })
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanipe, m );
}
}

}
handler.help = ['inventory', 'inv']
handler.tags = ['rpg']
handler.command = /^(inventory|inv|inventario)$/i
handler.menu = [];
handler.menu = [
{title: "🎒 INVENTARIO", description: `Consulta tu inventario, usa el comando #inventario`, id: `inventario`}
];
handler.type = "rpg";
handler.disabled = false;

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4201)

function clockString(ms) {
let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return ['*│ NUEVA MISION EN : MISSION*\n*│* ', ye, ' *🗓️ Años : Year*\n', '*│* ', mo, ' *⛅ Mes : Month*\n', '*│* ', d, ' *☀️ Días : Days*\n', '*│* ', h, ' *⏰ Horas : Hours*\n', '*│* ', m, ' *🕐 Minutos : Minutes*\n', '*│* ', s, ' *⏱️ Segundos : Seconds*\n*│*'].map(v => v.toString().padStart(2, 0)).join('')
}
