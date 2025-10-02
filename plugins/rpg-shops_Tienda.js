import { rpg, rpgshop, rpgshopp } from '../rpg.js'
let handler = async (m, {conn, start, info, command, usedPrefix, args, userdb, db, senderJid}) => {
const {pickRandom, isNumber} = await import('../lib/functions.js')
const {itemsBuySell} = await import('../lib/functionsGames.js')
const {menuform, flaaa} = await import('../lib/constants.js')
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${senderJid.split('@')[0]}:${senderJid.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" 
}

let properBuyCommand, properSellCommand
if (/^((buy|comprar))$/i.test(command)) {
properBuyCommand = command
properSellCommand = 'sell'
} else if (/^((vender|sell))$/i.test(command)) {
properSellCommand = command
properBuyCommand = 'buy'
}

const items = await itemsBuySell(properBuyCommand, properSellCommand, userdb)
if (/^((buy|comprar)|(vender|sell))$/i.test(command)) {
let imgr = flaaa.getRandom()
const listItems = Object.fromEntries(Object.entries(items[command.toLowerCase()]).filter(([v]) => v && v in userdb))
const listBuy = Object.keys(listItems).map((v) => {
let paymentMethod = Object.keys(listItems[v]).find(k => k in userdb)
return {
title: `» ${rpgshop.emoticon(v)} ${v}`.trim(),
description: `💰 Cuesta: ${listItems[v][paymentMethod]} ${rpgshop.emoticon(paymentMethod)}\nCompra ${rpgshop.emoticon(v)} usando ${usedPrefix + command} ${v} *Cantidad*`.trim(),
id: `${usedPrefix + command} ${v}`.trim()
}
})
const listSell = Object.keys(listItems).map((v) => {
let paymentMethod = Object.keys(listItems[v]).find(k => k in userdb)

return {
title: `» ${rpgshop.emoticon(v)} ${v}`,
description: `*Ganancia:* ${listItems[v][paymentMethod]} ${rpgshop.emoticon(paymentMethod)}\n` + `*Venda:* ${rpgshop.emoticon(v)} usando ${usedPrefix + command} ${v} *Cantidad*`,
id: `${usedPrefix + command} ${v}`
}
})
let text = ''
let footer = ''
let image = ''
let buttons = ''
text = (/^((buy|comprar))$/i.test(command.toLowerCase()) ?
(`
${menuform.htki} *COMPRAR* ${menuform.htka}
`.trim()) : 
(`
${menuform.htki} *VENDER* ${menuform.htka}
`.trim())
)
footer = (/^((buy|comprar))$/i.test(command.toLowerCase()) ?
(`
🔖 LISTA DE ARTICULOS
✨ EJEMPLO PARA COMPRAR
*Use el comando de la siguiente forma:*
*» ${usedPrefix}${command} (articulo) (cantidad)*

*★ Ejemplo*
*» ${usedPrefix}${command} potion 5*
`.trim()) : 
(`
🔖 LISTA DE ARTICULOS
✨ EJEMPLO PARA VENDER
*Use el comando de la siguiente forma:*
*» ${usedPrefix}${command} (articulo) (cantidad)*

*★ Ejemplo*
*» ${usedPrefix}${command} potion 5*
`.trim())
)
image = (/^((buy|comprar))$/i.test(command.toLowerCase()) ?
(imgr + 'COMPRAR') : 
(imgr + 'VENDER')
)
buttons = (/^((buy|comprar))$/i.test(command.toLowerCase()) ?
([
[`🏪 TIENDA PARA VENDER`, `${usedPrefix}sell`],
[`🎒 INVENTARIO`, `${usedPrefix}inventory`]
]) : 
([
[`🏪 TIENDA PARA COMPRAR`, `${usedPrefix}buy`],
[`🎒 INVENTARIO`, `${usedPrefix}inventory`]
])
)
const item = (args[0] || '').toLowerCase()
const total = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
let premium = userdb.premium

if (!listItems[item]) {
if (start.buttons) {
return conn.sendList(m.chat, {title: `🔖 LISTA DE ARTICULOS`, text, buffer: image, buttonText: /^((buy|comprar))$/i.test(command.toLowerCase()) ? `COMPRAR` : `VENDER`, sections: /^((buy|comprar))$/i.test(command.toLowerCase()) ? [{title: `🔖 LISTA DE ARTICULOS`,rows: listBuy}] : [{title: `🔖 LISTA DE ARTICULOS`,rows: listSell}]}, userdb, m)
} else {
text += `\n\n${footer}`
return conn.sendWritingText(m.chat, text, userdb, m)
}
}
if (/^((buy|comprar))$/i.test(command.toLowerCase())) {
let paymentMethod = Object.keys(listItems[item]).find(v => v in userdb)
if (userdb[paymentMethod] < listItems[item][paymentMethod] * total) {
text = `*–--『 INSUFICIENTES RECURSOS 』--–*`
footer = `*Necesitas ${(listItems[item][paymentMethod] * total) - userdb[paymentMethod]} ${rpgshop.emoticon(paymentMethod)} Para Comprar ${total} ${rpgshop.emoticon(item)}.*

*Solo tienes ${userdb[paymentMethod]} ${rpgshop.emoticon(paymentMethod)}.*
*–––––––––––––––––––––––––*
*Misiones para Obtener Recursos*
*Quests to Obtain Resources*
*⛰️ Aventura : Adventure : » ${new Date - userdb.lastadventure < 1500000 ? '❌' : `✅ _${usedPrefix}aventura_`}*
*♻️ Cada hora : Hourly » ${new Date - userdb.lasthourly < 3600000 ? '❌' : `✅ _${usedPrefix}cadahora_`}*
*💫 Semanalmente : Weekly ${new Date - userdb.lastweekly < 259200000 ? '❌' : `✅ _${usedPrefix}cadasemana_`}*
*🏅 Mensual : Monthly ${new Date - userdb.lastmonthly < 432000000 ? '❌' : `✅ _${usedPrefix}cadames_`}*`.trim(), imgr + 'RECURSOS BAJOS : LOW RESOURCES'
buttons = [[`Comprar ${(listItems[item][paymentMethod] * total) - userdb[paymentMethod]} ${rpgshopp.emoticon(paymentMethod)}`, `${usedPrefix}buy ${paymentMethod} ${(listItems[item][paymentMethod] * total) - userdb[paymentMethod]}`],
[`Pedir Ayuda ☘️`, `${usedPrefix}pedirayuda *Por Favor alguien ayudeme con *${(listItems[item][paymentMethod] * total) - userdb[paymentMethod]} ${rpg.emoticon(paymentMethod)}.*
*» AYUDA TRANSFIRIENDO:*
*${usedPrefix}transfer ${paymentMethod} ${(listItems[item][paymentMethod] * total) - userdb[paymentMethod]} @${senderJid.split('@')[0]}*`]]
if (start.buttons) {
return conn.sendButton(m.chat, {text, footer}, {}, buttons, userdb, m)
} else {
cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
resp += `\n\n${footer}\n\n${cmds}\n> ${info.nanipe}`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
}
userdb[paymentMethod] -= listItems[item][paymentMethod] * total
userdb[item] += total
text = `*––『 COMPRADO 』––*`
footer = `${conn.getName(senderJid)} 
*Has Comprado ${item} » ${total} ${rpgshop.emoticon(item)}*.
*--------------------------------------------*
*Gastos: ${(listItems[item][paymentMethod] * total)} ${rpgshop.emoticon(paymentMethod)}*
*Ahora tiene: ${userdb[item]} ${rpgshopp.emoticon(item)}*
`.trim(), imgr + 'COMPRA EXITOSA : DONE'
buttons = [[`👝 CARTERA`, `${usedPrefix}cartera`],
[`🎒 INVENTARIO`, `${usedPrefix}inventory`]]
if (start.buttons) {
return conn.sendButton(m.chat, {text, footer}, {}, buttons, userdb, fkontak)
} else {
cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
resp += `\n\n${footer}\n\n${cmds}\n> ${info.nanipe}`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
} else {
if (userdb[item] < total) {
text = `🎟️ P R E M I U M ⇢ ${premium ? '✅' : '❌'}\n${info.nbcde}`, `*No tienes suficiente ${rpgshop.emoticon(item)} para vender solo tienes ${userdb[item]} ${rpgshopp.emoticon(item)}*`
footer = info.nanipe
buttons = [[`🎒 INVENTARIO`, `${usedPrefix}inventory`], ['Volver al Menú ☘️', `${usedPrefix}`]]
if (start.buttons) {
return conn.sendButton(m.chat, {}, {}, buttons, userdb, m)
} else {
cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
resp += `\n\n${footer}\n\n${cmds}\n> ${footer}`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
}
 
let paymentMethod = Object.keys(listItems[item]).find(v => v in userdb)
userdb[item] -= total
userdb[paymentMethod] += listItems[item][paymentMethod] * total
text = `*––『 VENDIDO 』––*`
footer = 'VENTA EXITOSA' + `\n${conn.getName(senderJid)} 
*Has Vendido ${item} » ${total} ${rpgshop.emoticon(item)}*.
*--------------------------------------------*
*Ganancias: ${(listItems[item][paymentMethod] * total)} ${rpgshop.emoticon(paymentMethod)}*
*Ahora tiene: ${userdb[paymentMethod]} ${rpgshopp.emoticon(paymentMethod)}*
`.trim()
buttons = [[`👝 CARTERA`, `${usedPrefix}cartera`], [`🎒 INVENTARIO`, `${usedPrefix}inventory`]]
if (start.buttons) {
return conn.sendButton(m.chat, {text, footer}, {url: imgr}, buttons, userdb, fkontak)
} else {
cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
resp += `\n\n${footer}\n\n${cmds}\n> ${info.nanipe}`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
}
}
if (/^((comprar|buy(all)?)1)$/i.test(command)) {
let count = command.replace(/^buy|comprar/i, '')
count = count ? /all/i.test(count) ? Math.floor(userdb.exp / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
count = Math.max(1, count)
if (userdb.exp >= xpperlimit * count) {
userdb.exp -= xpperlimit * count
userdb.limit += count
conn.sendWritingText(m.chat, `
┌─「 *NOTA DE PAGO* 」
‣ *Compra nominal* : + ${count}💎 
‣ *Gastado* : -${xpperlimit * count} XP
└──────────────`, m)} else conn.sendWritingText(m.chat, `❎ Lo siento, no tienes suficientes *XP* para comprar *${count}* Diamantes💎`, userdb, m)
}
if (/^((comprar|buy(all)?)2)$/i.test(command)) {
let count = command.replace(/^buy2/i, '')
count = count ? /all/i.test(count) ? Math.floor(userdb.money / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
count = Math.max(1, count)
if (userdb.money >= xpperlimit * count) {
userdb.money -= xpperlimit * count
userdb.limit += count
const resp = `
╭━〔 *DATOS DE COMPRA* 〕━⬣
┃ *Compra Efectuada* : +${count} 💎 
┃ *Ha Gastado* :-${xpperlimit * count} COINS
╰━〔 *${info.nanipe}* 〕━⬣`.trim()

const buff = info.nanipe
const buttons = [['💵 Comprar X10', `${usedPrefix}buy2 10`], ['💸 Comprar X20', `${usedPrefix}buy2 20`], ['⚡ Comprar con Experiencia', `${usedPrefix}buy`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff + info.nanipe, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanipe, m );
}
} else {
const resp = `❎ *Lo siento, no tienes sufucientes ${info.nanipe}COINS para comprar ${count} Diamantes* 💎\n\n*Le recomiendo que interactúe con ${info.nanipe} para Obtener aniCoins, puede ver sus aniCoins con el comando:\n${usedPrefix}anicoins o ${usedPrefix}experiencia.\n También puede comprar con su Experiencia con el Comando:\n${usedPrefix}buy*`
const buff = info.nanipe
const buttons = [
[`${ansicon} Comprar con Experiencia'`, `${usedPrefix}buy`],
['Volver al menú ☘️', `${usedPrefix}menu`]
]
if (start.buttons) {
await conn.sendHydrated(m.chat, resp, info.nanipe, null, ig, 'Instagram', null, null, buttons, m,)
return conn.sendButton( m.chat, resp, buff + info.nanipe, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
}
}
if (/^((comprar|buy(all)?)1)$/i.test(command)) {
let count = command.replace(/^buy3|token|tokens/i, '')
count = count ? /all/i.test(count) ? Math.floor(userdb.limit / diamantetk) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
count = Math.max(1, count)
if (userdb.limit >= diamantetk * count) {
userdb.limit -= diamantetk * count
userdb.joincount += count
const resp = `
╭━〔 *DATOS DE COMPRA* 〕━⬣
┃ *Compra Efectuada* : +${count} TOKEN(S) 🪙 
┃ *Ha Gastado* :-${diamantetk * count} DIAMANTES 💎
╰━〔 *𓃠 ${info.nanipe}* 〕━⬣`.trim()

const buff = info.nanipe
const buttons = [['💎 Comprar X50', `${usedPrefix}buy3 50`], ['💎 Comprar X100', `${usedPrefix}buy3 100`], ['💎 Compra Absoluta', `${usedPrefix}buyall3`]]
if (start.buttons) {
await conn.sendHydrated(m.chat, resp, buff, null, info.repoProyect, info.nanipe, null, null, buttons, m,)
return conn.sendButton( m.chat, resp, buff + info.nanipe, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanipe, m );
}

} else {
const resp = `❎ *Lo siento, no tienes sufucientes DIAMANTES 💎 para comprar ${count} TOKEN(S)* 🪙\n\n*Le recomiendo que interactúe con ${info.nanipe} para Obtener Tokens, puede ver sus tokens con el comando ${usedPrefix}cartera o ${usedPrefix}wallet*`
const buff = info.nanipe
const buttons = [
['Volver al menú ☘️', `${usedPrefix}menu`],
]
if (start.buttons) {
await conn.sendHydrated(m.chat, resp, info.nanipe, null, ig, 'Instagram', null, null, buttons, m,)
return conn.sendButton( m.chat, resp, buff + info.nanipe, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanipe, m );
}
}
}

}
handler.help = ['buy', 'sell'].map(v => v + ' [item] [count]')
handler.tags = ['rpg']
handler.command = /^((buy|comprar)|(vender|sell))$/i
handler.disabled = false
handler.menu = [
{ title: "🏪 TIENDA-COMPRAR", description: `Compra o vende artículos con tus recursos`, id: `buy` },
{ title: "🏪 TIENDA-VENDER", description: `Compra o vende artículos con tus recursos`, id: `sell` },
{ title: "💎 COMPRAR DIAMANTES", description: `Compra diamantes con tus XP`, id: `diamonds` },
];
handler.type = "rpg";

export default handler

