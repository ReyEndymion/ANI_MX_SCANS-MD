import fetch from 'node-fetch'
import { owner, temp, newsletterID, sBroadCastID, groupID, media} from '../config.js'
//fs.readFileSync()
import { rpg, rpgshop, rpgshopp } from '../rpg.js'
let handler = async (m, {conn, start, info, command, usedPrefix, args, userdb, db, senderJid}) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${senderJid.split('@')[0]}:${senderJid.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" 
}
const items = {
buy: {
exp: { eleksirb: 3 },
limit: { money: 400 },
diamond: { berlian: 5 },
joincount: { limit: 15 },
emerald: { emasbatang: 5 },
berlian: { kyubi: 25 },
kyubi: { trash: 15 },
gold: {diamond: 35 },
money: { kaleng: 2 },
tiketcoin: { joincount: 3 },
stamina: { potion: 2 },

potion: { money: 550 },
aqua: { botol: 2 },
trash: { eleksirb: 5 },
wood: { string: 5 },
rock: { kardus: 6 },
batu: { coal: 25 },
string: { kaleng: 4 },
iron: { kyubi: 20 },
coal: { trash: 20 },
botol: { wood: 4 },
kaleng: { potion: 2 },
kardus: { trash: 20 },

eleksirb: { healtmonster: 2},
emasbatang: { kayu: 30},
emasbiasa: { diamond: 18 },
rubah: { berlian: 40 },
sampah: { trash: 70 },
serigala: { kaleng: 125 },
kayu: { wood: 40 },
sword: { gold: 2 },
umpan: { aqua: 2 },
healtmonster: { kyubi: 19 },
pancingan: { trash: userdb.pancingan == 0 ? 5 : '' || userdb.pancingan == 1 ? 10 : '' || userdb.pancingan == 2 ? 15 : '' || userdb.pancingan == 3 ? 20 : '' || userdb.pancingan >= 4 ? 25 : '' },
emas: { berlian: 20 },
pancing: { tiketcoin: userdb.pancing == 0 ? 1 : '' || userdb.pancing == 1 ? 2 : '' || userdb.pancing == 2 ? 3 : '' || userdb.pancing == 3 ? 4 : '' || userdb.pancing >= 4 ? 7 : '' },

common: { aqua: 40 },
uncoommon: { kyubi: 55 },
mythic: { tiketcoin: 17 },
pet: { kayu: 45 },
gardenboxs: { healtmonster: 25 },
legendary: { emerald: 75 },

anggur: { emerald: 3 },
apel: { emerald: 3 },
jeruk: { emerald: 3 },
mangga: { emerald: 3 },
pisang: { emerald: 3 },

semillasdeuva: { aqua: 15 },
semillasdemanzana: { aqua: 15 },
semillasdenaranja: { aqua: 15 },
semillasdemango: { aqua: 15 },
semillasdeplatano: { aqua: 15 },

centauro: { limit:45 },
griffin: { limit: 55 },
kucing: { limit: 70 },
naga: { limit: 85 },
zorro: { limit: 100 },
kuda: { limit: 125 },
phonix: { limit: 140 },
wolf: { limit: 155 },

petFood: { tiketcoin: 4 },
makanancentaur: { tiketcoin: 6 },
makanangriffin: { tiketcoin: 8 },
makanankyubi: { tiketcoin: 10 },
makanannaga: { tiketcoin: 12 },
makananpet: { tiketcoin: 14 },
makananphonix: { tiketcoin: 16 }
},

sell: {
exp: { trash: pickRandom([1, 1, 2]) },
limit: { eleksirb: pickRandom([1, 4, 1]) },
diamond: { tiketcoin: pickRandom([1, 1, 2]) },
joincount: { emasbatang: pickRandom([1, 1, 2]) },
emerald: { money: pickRandom([10, 500, 1]) },
berlian: { sword: pickRandom([1, 1, 2]) },
kyubi: { aqua: pickRandom([1, 1, 2]) },
gold: { exp: pickRandom([1, 20, 800]) },
money: { aqua: pickRandom([1, 1, 2]) },
tiketcoin: { kyubi: pickRandom([1, 1, 2]) },

potion: { botol: pickRandom([1, 1, 3]) },
aqua: { kaleng: pickRandom([1, 1, 2]) },
trash: { umpan: pickRandom([1, 1, 2]) },
wood: { coal: pickRandom([1, 1, 2]) },
rock: { string: pickRandom([1, 1, 2]) },
batu: { joincount: pickRandom([1, 1, 2]) },
string: { kardus: pickRandom([1, 1, 2]) },
iron: { healtmonster: pickRandom([1, 1, 3]) },
coal: { money: pickRandom([1, 3, 30]) },
botol: { aqua: pickRandom([1, 1, 2]) },
kaleng: { batu: pickRandom([1, 1, 2]) },
kardus: { pancingan: pickRandom([1, 1, 2]) },

eleksirb: { rubah: pickRandom([1, 1, 2]) },
emasbatang: { emasbiasa: pickRandom([1, 1, 3]) },
emasbiasa: { potion: pickRandom([1, 1, 2]) },
rubah: { petFood: pickRandom([1, 1, 4]) },
sampah: { trash: pickRandom([1, 2, 20]) },
serigala: { petFood: pickRandom([1, 2, 22]) },
kayu: { wood: pickRandom([1, 3, 5]) },
sword: { berlian: pickRandom([1, 1, 2]) },
umpan: { exp: pickRandom([1, 5, 40, 0]) },
healtmonster: { diamond: pickRandom([1, 1, 2]) },
pancingan: { money: pickRandom([1, 10, 30]) },
emas: { berlian: pickRandom([1, 1, 3]) },

common: { limit: pickRandom([1, 3, 10]) },
uncoommon: { diamond: pickRandom([1, 4, 15]) },
mythic: { berlian: pickRandom([1, 3, 13]) },
pet: { money: pickRandom([1, 500, 1500]) },
gardenboxs: { gold: pickRandom([1, 1, 3]) },
legendary: { emerald: pickRandom([1, 4, 20]) },

anggur: { joincount: pickRandom([1, 1, 2]) },
apel: { tiketcoin: pickRandom([1, 1, 2]) },
jeruk: { berlian: pickRandom([1, 1, 2]) },
mangga: { gold: pickRandom([1, 1, 2]) },
pisang: { diamond: pickRandom([1, 1, 2]) },

semillasdeuva: { potion: pickRandom([1, 1, 2]) },
semillasdemanzana: { umpan: pickRandom([1, 1, 3]) },
semillasdenaranja: { healtmonster: pickRandom([1, 1, 2]) },
semillasdemango: { pancingan: pickRandom([1, 1, 3]) },
semillasdeplatano: { wood: pickRandom([1, 2, 4]) },

centauro: { anggur: pickRandom([1, 3, 5]) },
griffin: { apel: pickRandom([1, 2, 4]) },
kucing: { jeruk: pickRandom([1, 3, 6]) },
naga: { mangga: pickRandom([1, 4, 8]) },
zorro: { pisang: pickRandom([1, 5, 9]) },
kuda: { anggur: pickRandom([1, 6, 10]) },
phonix: { apel: pickRandom([1, 7, 12]) },
wolf: { jeruk: pickRandom([1, 8, 15]) },

petFood: { money: pickRandom([1, 400, 1400]) },
makanancentaur: { diamond: pickRandom([1, 1, 2]) },
makanangriffin: { diamond: pickRandom([1, 1, 3]) },
makanankyubi: { diamond: pickRandom([1, 2, 4]) },
makanannaga: { diamond: pickRandom([1, 2, 4]) },
makananpet: { diamond: pickRandom([1, 3, 5]) },
makananphonix: { diamond: pickRandom([1, 3, 5]) },
}
} 

let imgr = flaaa.getRandom()
console.log('tienda: ', userdb)
const commandKey = /^(buy|comprar)$/i.test(command.toLowerCase()) ? "buy" : "";

const listItems = Object.fromEntries(Object.entries(items[commandKey]).filter(([v]) => v && v in userdb))

let resp = ''
let footer = ''
let image = ''
let buttons = ''
resp = (/^(buy|comprar)$/i.test(command.toLowerCase()) ? (`${menuform.htki} *COMPRAR* ${menuform.htka}\n\n`.trim()) : (`${menuform.htki} *VENDER* ${menuform.htka}\n\n`.trim())
)
footer = (/^(buy|comprar)$/i.test(command.toLowerCase()) ? (`✨ *EJEMPLO PARA COMPRAR*
*Use el comando de la siguiente forma:*
*» ${usedPrefix}${command} (articulo) (cantidad)*
*» ${usedPrefix}${command} (item) (quantity)*

*★ Ejemplo : Example*
*» ${usedPrefix}${command} potion 5*\n\n🔖 *LISTA DE ARTÍCULOS*\n${Object.keys(listItems).map((v) => {
let paymentMethod = Object.keys(listItems[v]).find(v => v in userdb)
return `*» 1 ⇢ ${rpgshop.emoticon(v)}*\n*Cuesta:* ${listItems[v][paymentMethod]} ${rpgshop.emoticon(paymentMethod)}\n*Compra* ${rpgshopp.emoticon(v)} Usando ${usedPrefix + command} ${v} *Cantidad*\n*----------------------------------------*\n`.trim()}).join('\n')}
`.trim()) : 
(`✨ *EJEMPLO PARA VENDER*
*Use el comando de la siguiente forma:*
*» ${usedPrefix}${command} (articulo) (cantidad)*
*» ${usedPrefix}${command} (item) (quantity)*

*★ Ejemplo : Example*
*» ${usedPrefix}${command} potion 5*\n\n🔖 LISTA DE ARTÍCULOS 
${Object.keys(listItems).map((v) => {
let paymentMethod = Object.keys(listItems[v]).find(v => v in userdb)
return `*» 1 ⇢ ${rpgshop.emoticon(v)}*\n*Ganancia:* ${listItems[v][paymentMethod]} ${rpgshop.emoticon(paymentMethod)}\n*Venda* ${rpgshopp.emoticon(v)} Usando ${usedPrefix + command} ${v} *Cantidad*\n*------------------------------------------*\n`.trim()
}).join('\n')}
`.trim())
)
image = (/^(buy|comprar)$/i.test(command.toLowerCase()) ? (imgr + 'COMPRAR : BUY') : (imgr + 'VENDER : SELL'))
buttons = (/^(buy|comprar)$/i.test(command.toLowerCase()) ?
[
[`🏪 TIENDA PARA VENDER`, `${usedPrefix}sell`],
[`🎒 *INVENTARIO*`, `${usedPrefix}inventory`]
] : 
[
[`🏪 TIENDA PARA COMPRAR`, `${usedPrefix}buy`],
[`🎒 *INVENTARIO*`, `${usedPrefix}inventory`]
]
)
const item = (args[0] || '').toLowerCase()
const total = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
let premium = userdb.premium

if (!listItems[item]) {
const buff = footer
//const buttons = [['💎 𝘾𝙤𝙢𝙥𝙧𝙖𝙧 𝙓50', `${usedPrefix}buy3 50`], ['💎 𝘾𝙤𝙢𝙥𝙧𝙖𝙧 𝙓100', `${usedPrefix}buy3 100`], ['💎 𝘾𝙤𝙢𝙥𝙧𝙖 𝘼𝙗𝙨𝙤𝙡𝙪𝙩𝙖', `${usedPrefix}buyall3`]]
if (start.buttons) {
//conn.sendButton(m.chat, text, footer, image, buttons, m)
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanie, m );
}
}
if (/^(buy|comprar)$/i.test(command.toLowerCase())) {
let paymentMethod = Object.keys(listItems[item]).find(v => v in user)
if (user[paymentMethod] < listItems[item][paymentMethod] * total) {
let resp = `*–--『 *RECURSOS INSUFICIENTES* 』`
const buff = `--–*\n\n*Necesitas ${(listItems[item][paymentMethod] * total) - user[paymentMethod]} ${rpgshop.emoticon(paymentMethod)} Para Comprar ${total} ${rpgshop.emoticon(item)}.*\n\n*Solo tienes ${user[paymentMethod]} ${rpgshop.emoticon(paymentMethod)}.*\n\n*–––––––––––––––––––––––––*
*Misiones para Obtener Recursos*
*⛰️ Aventura : » ${new Date - userdb.lastadventure < 1500000 ? '❌' : `✅ _${usedPrefix}aventura_`}*
*♻️ Cada hora: » ${new Date - userdb.lasthourly < 3600000 ? '❌' : `✅ _${usedPrefix}cadahora_`}*
*💫 Semanalmente : ${new Date - userdb.lastweekly < 259200000 ? '❌' : `✅ _${usedPrefix}cadasemana_`}*
*🏅 Mensual : ${new Date - userdb.lastmonthly < 432000000 ? '❌' : `✅ _${usedPrefix}cadames_`}*\n\nRECURSOS BAJOS\n\nComprar : ${(listItems[item][paymentMethod] * total) - user[paymentMethod]} ${global.rpgshopp.emoticon(paymentMethod)} usa ${usedPrefix}buy ${paymentMethod} ${(listItems[item][paymentMethod] * total) - user[paymentMethod]}\n\nPedir ayuda☘️ usa ${usedPrefix}pedirayuda\n\n*Por Favor alguien ayudeme con *${(listItems[item][paymentMethod] * total) - user[paymentMethod]} ${global.rpg.emoticon(paymentMethod)}.*\n\n*» AYUDA TRANSFIRIENDO:*
*${usedPrefix}transfer ${paymentMethod} ${(listItems[item][paymentMethod] * total) - user[paymentMethod]} @${conn.getName(senderJid)}*`.trim()
const buttons = [
[`Comprar : 𝗕𝘂𝘆 ${(listItems[item][paymentMethod] * total) - user[paymentMethod]} ${rpgshopp.emoticon(paymentMethod)}`, `${usedPrefix}buy ${paymentMethod} ${(listItems[item][paymentMethod] * total) - user[paymentMethod]}`],
[`Pedir ayuda ☘️`, `${usedPrefix}pedirayuda *Por Favor alguien ayudeme con *${(listItems[item][paymentMethod] * total) - user[paymentMethod]} ${rpg.emoticon(paymentMethod)}.*
*» AYUDA TRANSFIRIENDO:*
*${usedPrefix}transfer ${paymentMethod} ${(listItems[item][paymentMethod] * total) - user[paymentMethod]} @${conn.getName(senderJid)}*`]]
if (start.buttons) {
//conn.sendButton(m.chat, text, footer, image, buttons, m)
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanie, m );
}
}
userdb[paymentMethod] -= listItems[item][paymentMethod] * total
userdb[item] += total

let resp = `*––『 COMPRADO 』––*\n\n${conn.getName(senderJid)} 
*Haz comprado ${item} » ${total} ${rpgshop.emoticon(item)}*.
*--------------------------------------------*
*Gastos: ${(listItems[item][paymentMethod] * total)} ${rpgshop.emoticon(paymentMethod)}*
*Ahora tiene: ${user[item]} ${rpgshopp.emoticon(item)}*\n\n*COMPRA EXITOSA*\n\n👝 *CARTERA* usa${usedPrefix}cartera\n🎒 *INVENTARIO* usa ${usedPrefix}inventory
`.trim() 

return conn.sendWritingText(m.chat, resp, userdb, m)
} else {
if (user[item] < total) {
let resp = `🎟️ 𝗣 𝗥 𝗘 𝗠 𝗜 𝗨 𝗠 ⇢ ${premium ? '✅' : '❌'}\n${info.nanie}\n\n*No tienes suficiente ${rpgshop.emoticon(item)} para vender solo tienes ${user[item]} ${rpgshopp.emoticon(item)}*\n\n*You don't have enough ${rpgshop.emoticon(item)} to sell, you only have ${user[item]} ${rpgshopp.emoticon(item)}*\n\n🎒 *INVENTARIO* usa ${usedPrefix}inventory\n\n𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ ☘️usa ${usedPrefix}menu`

return conn.sendWritingText(m.chat, resp, userdb, m)
} 
let paymentMethod = Object.keys(listItems[item]).find(v => v in user)
user[item] -= total
user[paymentMethod] += listItems[item][paymentMethod] * total

let resp = `*––『 VENDIDO 』––*\n\n${conn.getName(senderJid)} 
*Has vendido ${item} » ${total} ${rpgshop.emoticon(item)}*.
*--------------------------------------------*
*𝙂𝙖𝙣𝙖𝙣𝙘𝙞𝙖𝙨: ${(listItems[item][paymentMethod] * total)} ${rpgshop.emoticon(paymentMethod)}*
*Ahora tiene: ${user[paymentMethod]} ${rpgshopp.emoticon(paymentMethod)}*\n\nVENTA EXITOSA\n\n👝 *CARTERA* usa ${usedPrefix}cartera\n\n🎒 *INVENTARIO* usa ${usedPrefix}inventory`.trim()


return conn.sendWritingText(m.chat, resp, userdb, m)
}}
handler.help = ['buy', 'sell'].map(v => v + ' [item] [count]')
handler.tags = ['rpg']
handler.command = /^(buy|comprar|vender|sell)$/i
handler.disabled = false

handler.menu = [];
handler.type = "";

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}

function isNumber(number) {
if (!number) return number
number = parseInt(number)
return typeof number == 'number' && !isNaN(number)
}
