let handler = async (m, {conn, info, start, usedPrefix, command, isPrems, db, userdb, senderJid, objs}) => {
const {imagen1} = objs
const {rpgshop, rpgshopp} = await import('../rpg.js')
const {msToTime, pickRandom} = await import('../lib/functions.js')
const {prems} = await import('../config.js')
let resp, imagen, footer
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

let premium = userdb.premium
let prem = prems.includes(who.split`@`[0]) ? true : premium
let minar = `${pickRandom(['Que pro 😎 has minado',
'🌟✨ Genial!! Obtienes',
'WOW!! eres un(a) gran Minero(a) ⛏️ Obtienes',
'Has Minado!!',
'😲 Lograste Minar la cantidad de',
'Tus Ingresos subiran gracias a que minaste',
'⛏️⛏️⛏️⛏️⛏️ Minando',
'🤩 SII!!! AHORA TIENES',
'La minaria esta de tu lado, por ello obtienes',
'😻 La suerte de Minar',
'♻️ Tu Mision se ha cumplido, lograste minar',
'⛏️ La Mineria te ha beneficiado con',
'🛣️ Has encontrado un Lugar y por minar dicho lugar Obtienes',
'👾 Gracias a que has minado tus ingresos suman',
'Felicidades!! Ahora tienes','⛏️⛏️⛏️ Obtienes'])}`
if (/^(mi(nar|ming|ne)(1|coin(s)?))$/i.test(command)) {

let aqua = `${pickRandom([0, 2, 3, 1, 5])}` * 1
let aquapremium = `${pickRandom([2, 4, 6, 7, 5, 9])}` * 1

let rock = `${pickRandom([6, 9, 0, 12, 2])}` * 1
let rockpremium = `${pickRandom([13, 9, 17, 20, 25])}` * 1

let pancingan = `${pickRandom([1, 0, 2, 1, 0, 0, 0])}` * 1
let pancinganpremium = `${pickRandom([1, 3, 4, 9, 2, 5, 8])}` * 1

const recompensas = {	
aqua: prem ? aquapremium : aqua,
rock: prem ? rockpremium : rock,
pancingan: prem ? pancinganpremium : pancingan,
}
let money = `${pickRandom([100, 200, 250, 300, 370, 400, 450, 480, 500, 510, 640, 680, 704, 760, 800, 840, 880, 900, 1000, 1059, 1080, 1100, 1190, 1230, 1380, 1399, 1290, 1300, 1340, 1350, 1590, 1400, 1450, 1700, 1800, 1900, 2000, 0, 0, 10, 1, 99, 999, 1789, 1430])}` * 1
let moneypremium = `${pickRandom([500, 600, 700, 800, 900, 1000, 1050, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1950, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3400, 3500, 3600, 3700, 3800, 3850, 3900, 3950, 4000])}` * 1

let time = userdb.lastcoins + 600000 //10 min
if (new Date - userdb.lastcoins < 600000) {
let resp = `*⏱️ _Vuelve en_ ${msToTime(time - new Date())} _para continuar minando_ ${rpgshopp.emoticon('money')}⛏️*`
return conn.sendWritingText(m.chat, resp, userdb, m);
}    
userdb.money += prem ? moneypremium : money  
let texto = ''
for (let reward of Object.keys(recompensas)) {
if (!(reward in userdb)) continue
userdb[reward] += recompensas[reward]
texto += `+${recompensas[reward]} ${rpgshop.emoticon(reward)}\n`
}
resp = `*${prem ? '🎟️ Recompensa Premium' : '🆓 Recompensa Gratis'}*\n*${minar}*\n*${money} ${rpgshop.emoticon('money')}*`
footer = `🍁 B O N O\n` + texto + `\n\n🎟️ P R E M I U M ⇢ ${prem ? '✅' : '❌'}\n> ${info.nanipe}`
userdb.lastcoins = new Date * 1
const buttons = [['Minar Diamantes 💎', `${usedPrefix}minargemas`], ['Volver al Menú ☘️', `${usedPrefix}menu`]]
if (start.buttons) {
const msgObj = {
text: resp,
footer
}
return conn.sendButton(m.chat, msgObj, {url: imagen1}, buttons, userdb, fkontak)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
resp += `\n\n${footer}\n\n${cmds}`
return conn.sendImageWriting(m.chat, imagen1, resp, userdb, fkontak)
}
}
if (/^(mi(nar|ming|ne)(2|gemas|diam(ante(s)?|ond)))$/i.test(command)) {

let kyubi = `${pickRandom([0, 1, 3, 1, 2])}` * 1
let kyubipremium = `${pickRandom([2, 3, 5, 9, 10, 7])}` * 1

let diamond = `${pickRandom([0, 1, 0, 0, 2])}` * 1
let diamondpremium = `${pickRandom([3, 4, 5, 5, 5])}` * 1

let tiketcoin = `${pickRandom([1, 0, 0, 1, 0, 0, 2])}` * 1
let tiketcoinpremium = `${pickRandom([2, 3, 4, 5, 2, 3, 3])}` * 1

const recompensas = {	
kyubi: prem ? kyubipremium : kyubi,
diamond: prem ? diamondpremium : diamond,
tiketcoin: prem ? tiketcoinpremium : tiketcoin,
}
let limit = `${pickRandom([2, 3, 4, 5, 0, 1, 6, 7, 8, 9, 10])}` * 1
let limitpremium = `${pickRandom([4, 7, 8, 9, 11, 13, 16, 17, 19, 22, 24, 26, 28, 30])}` * 1

let time = userdb.lastdiamantes + 900000 //15 min
if (new Date - userdb.lastdiamantes < 900000) {
resp = `*⏱️ Vuelva en ${msToTime(time - new Date())} para continuar minando ${rpgshopp.emoticon('limit')}⛏️*`
return conn.sendWritingText(m.chat, resp, userdb, m)
} else {
userdb.limit += prem ? limitpremium : limit
let texto = ''
for (let reward of Object.keys(recompensas)) {
if (!(reward in userdb)) continue
userdb[reward] += recompensas[reward]
texto += `+${recompensas[reward]} ${rpgshop.emoticon(reward)}\n`
}
imagen = 'https://img.freepik.com/vector-premium/monton-piedras-preciosas-preciosas-diamantes-azules-brillantes-concepto-joyas-caras-simbolo-riqueza-diseno-grafico-juegos-moviles-icono-vector-plano-dibujos-animados_223337-5395.jpg?w=740'

resp = `*${prem ? '🎟️ Recompensa Premium' : '🆓 Recompensa Gratis'}*\n*${minar}*\n*${limit} ${rpgshop.emoticon('limit')}*`
footer = `🍁 BONO\n` + texto + `\n\n🎟️ PREMIUM ⇢ ${prem ? '✅' : '❌'}\n> ${info.nanipe}`
const buttons = [['Minar XP 🎮', `${usedPrefix}minarxp`], ['_Volver al Menú_ ☘️', `${usedPrefix}menu`]]
userdb.lastdiamantes = new Date * 1
if (start.buttons) {
const msgObj = {
text: resp,
footer
}
return conn.sendButton(m.chat, msgObj, {url: imagen}, buttons, userdb, fkontak)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
resp += `\n\n${footer}\n\n${cmds}`
return conn.sendImageWriting(m.chat, imagen1, resp, userdb, fkontak)
} 
}

}
if (/^(mi(nar|ming|ne|nar)(3|xp))$/i.test(command)) {
let pp = 'https://media.istockphoto.com/vectors/basic-rgb-vector-id1315251368?b=1&k=6&m=1315251368&s=170667a&w=0&h=2BgQx5Pu2CewGeq93Qxsyoyw5oT4gioHOOIkHb7PoyY='

let string = `${pickRandom([1, 2, 3, 4, 5])}` * 1
let stringpremium = `${pickRandom([3, 4, 6, 7, 9, 11])}` * 1

let coal = `${pickRandom([4, 5, 8, 10, 12])}` * 1
let coalpremium = `${pickRandom([9, 14, 15, 17, 20])}` * 1

let emas = `${pickRandom([1, 0, 2, 3, 0, 0, 0])}` * 1
let emaspremium = `${pickRandom([2, 4, 5, 1, 1, 7, 8])}` * 1

const recompensas = {	
string: prem ? stringpremium : string,
coal: prem ? coalpremium : coal,
emas: prem ? emaspremium : emas,
}
let xp = `${pickRandom([100, 200, 250, 300, 370, 400, 450, 480, 500, 510, 640, 680, 704, 760, 800, 840, 880, 900, 1000, 1059, 1080, 1100, 1190, 1230, 1380, 1399, 1290, 1300, 1340, 1350, 1590, 1400, 1450, 1700, 1800, 1900, 2000, 0, 0, 10, 1, 99, 999, 1789, 1430])}` * 1
let exppremium = `${pickRandom([500, 600, 700, 800, 900, 1000, 1050, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1950, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3400, 3500, 3600, 3700, 3800, 3850, 3900, 3950, 4000])}` * 1

let time = userdb.lastmiming + 600000 //10 min
if (new Date - userdb.lastmiming < 600000) return conn.sendWritingText(m.chat, `*[ ⏲️ ] _Espera_ ${msToTime(time - new Date())} _para volver a minar_ ${rpgshopp.emoticon('exp')}*`, userdb, m)  
userdb.exp += prem ? exppremium : xp
let texto = ''
for (let reward of Object.keys(recompensas)) {
if (!(reward in userdb)) continue
userdb[reward] += recompensas[reward]
texto += `\n> +${recompensas[reward]} ${rpgshop.emoticon(reward)}\n`
}
resp = `*${prem ? '🎟️ Recompensa Premium' : '🆓 Recompensa Gratis'}*\n*${minar}*\n*${xp} ${rpgshop.emoticon('exp')}⛏️*`
footer = `🍁 BONO\n` + texto + `\n\n🎟️ PREMIUM ⇢ ${prem ? '✅' : '❌'}\n> ${info.nanipe}`
const buttons = [['Minar Coins 🪙', `${usedPrefix}minarcoins`], ['Volver al Menú ☘️', `${usedPrefix}menu`]]
userdb.lastmiming = new Date * 1
if (start.buttons) {
const msgObj = {
text: resp,
footer
}
return conn.sendButton(m.chat, msgObj, {url: imagen}, buttons, userdb, m,)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
resp += `\n\n${footer}\n\n${cmds}`
return conn.sendImageWriting(m.chat, imagen1, resp, userdb, fkontak)
} 
}
}
handler.help = ['minar']
handler.tags = ['diamantes']
handler.command = /^mi(nar|ming|ne)(1|2|3|coin(s)?|diam(ante(s)?|ond)|gemas|xp)$/i
handler.fail = null
handler.exp = 0
handler.menu = [
{title: "⛏️ MINAR COINS", description: `Minar AMXCoins, usa el comando #minarcoins`, id: `minarcoins`},
{title: "⛏️ MINAR DIAMANTES", description: `Minar diamantes, usa el comando #minar`, id: `minardiamond`},
{title: "⛏️ MINAR XP", description: `Minar XP cada 10 minutos, usa el comando #minar`, id: `minarxp`},
];
handler.type = "rpg";

handler.disabled = false;

export default handler
