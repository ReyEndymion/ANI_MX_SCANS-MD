let handler = async (m, {conn, start, info, command, usedPrefix, DevMode, args, db, userdb, senderJid}) => {
const {rpg, rpgshop, rpgshopp, rpgg} = await import('../rpg.js')
const {owner, userID} = await import('../config.js')
let type = (args[0] || '').toLowerCase()
let msk = (args[0] || '').toLowerCase()

const listaComida = ['◈ Pollo a la parrilla 🍖','◈ Pollo frito 🍗','◈ Fideos con crema de leche y pollo 🍜','◈ Filete de Vaca 🥩','◈ Paella 🥘','◈ Curry de pollo 🍲','Cerdo asado 🥠','◈ Pescado asado 🐟','']

let cocinar = `
*${listaComida[0]}*
*${rpg.emoticon('pollo')} →* ${userdb.premium ? `_${userdb.pollo}/2_` : `_${userdb.pollo}/3_`}
*${rpgshop.emoticon('coal')} →* ${userdb.premium ? `_${userdb.coal}/1_` : `_${userdb.coal}/1_`}
*${rpg.emoticon('ramuan')} →* ${userdb.premium ? `_${userdb.ramuan}/1__` : `_${userdb.ramuan}/1_`} 
${userdb.pollo >= `${userdb.premium ? 2 : 3}` &&userdb.coal >= `${userdb.premium ? 1 : 1}` &&userdb.ramuan >= `${userdb.premium ? 1 : 1}` ? '*🫕 PUEDE COCINAR 🫕*' : ''.concat(`*FALTA →* `,userdb.pollo < `${userdb.premium ? 2 : 3}` ? `❗${rpgg.emoticon('pollo')} ` : '',userdb.coal < `${userdb.premium ? 1 : 1}` ? `❗${rpgshopp.emoticon('coal')} ` : '',userdb.ramuan < `${userdb.premium ? 1 : 1}` ? `❗${rpgg.emoticon('ramuan')}` : '')} 
- - - - - - - - - - - - - - - - - - - - - - - - - -
*${listaComida[1]}*
*${rpg.emoticon('pollo')} →* ${userdb.premium ? `_${userdb.pollo}/1_` : `_${userdb.pollo}/2_`}
*${rpgshop.emoticon('coal')} →* ${userdb.premium ? `_${userdb.coal}/1_` : `_${userdb.coal}/2_`}
*${rpg.emoticon('ramuan')} →* ${userdb.premium ? `_${userdb.ramuan}/1_` : `_${userdb.ramuan}/1_`}
${userdb.pollo >= `${userdb.premium ? 1 : 2}` &&userdb.coal >= `${userdb.premium ? 1 : 2}` &&userdb.ramuan >= `${userdb.premium ? 1 : 1}` ? '*🫕 PUEDE COCINAR 🫕*' : ''.concat(`*FALTA →* `,userdb.pollo < `${userdb.premium ? 1 : 2}` ? `❗${rpgg.emoticon('pollo')} ` : '',userdb.coal < `${userdb.premium ? 1 : 2}` ? `❗${rpgshopp.emoticon('coal')} ` : '',userdb.ramuan < `${userdb.premium ? 1 : 1}` ? `❗${rpgg.emoticon('ramuan')}` : '')} 
- - - - - - - - - - - - - - - - - - - - - - - - - -
*${listaComida[2]}*
*${rpg.emoticon('pollo')} →* ${userdb.premium ? `_${userdb.pollo}/1_` : `_${userdb.pollo}/1_`}
*${rpgshop.emoticon('aqua')} →* ${userdb.premium ? `_${userdb.aqua}/3_` : `_${userdb.aqua}/5_`}
*${rpg.emoticon('fideos')} →* ${userdb.premium ? `_${userdb.fideos}/2_` : `_${userdb.fideos}/3_`}
*${rpg.emoticon('ramuan')} →* ${userdb.premium ? `_${userdb.ramuan}/1_` : `_${userdb.ramuan}/2_`}
${userdb.pollo >= `${userdb.premium ? 1 : 1}` &&userdb.aqua >= `${userdb.premium ? 3 : 5}` &&userdb.fideos >= `${userdb.premium ? 2 : 3}` &&userdb.ramuan >= `${userdb.premium ? 1 : 2}` ? '*🫕 PUEDE COCINAR 🫕*' : ''.concat(`*FALTA →* `,userdb.pollo < `${userdb.premium ? 1 : 1}` ? `❗${rpgg.emoticon('pollo')} ` : '',userdb.aqua < `${userdb.premium ? 3 : 5}` ? `❗${rpgshopp.emoticon('aqua')} ` : '',userdb.fideos < `${userdb.premium ? 2 : 3}` ? `❗${rpgg.emoticon('fideos')} ` : '',userdb.ramuan < `${userdb.premium ? 1 : 2}` ? `❗${rpgg.emoticon('ramuan')}` : '')} 
- - - - - - - - - - - - - - - - - - - - - - - - - -
*${listaComida[3]}*
*${rpg.emoticon('cow')} →* ${userdb.premium ? `_${userdb.sapi}/1_` : `_${userdb.sapi}/2_`}
*${rpgshop.emoticon('coal')} →* ${userdb.premium ? `_${userdb.coal}/3_` : `_${userdb.coal}/6_`}
*${rpg.emoticon('ramuan')} →* ${userdb.premium ? `_${userdb.ramuan}/1_` : `_${userdb.ramuan}/2_`}
${userdb.sapi >= `${userdb.premium ? 1 : 2}` &&userdb.coal >= `${userdb.premium ? 3 : 6}` &&userdb.ramuan >= `${userdb.premium ? 1 : 2}` ? '*🫕 PUEDE COCINAR 🫕*' : ''.concat(`*FALTA →* `,userdb.sapi < `${userdb.premium ? 1 : 2}` ? `❗${rpgg.emoticon('cow')} ` : '',userdb.coal < `${userdb.premium ? 3 : 6}` ? `❗${rpgshopp.emoticon('coal')} ` : '',userdb.ramuan < `${userdb.premium ? 1 : 2}` ? `❗${rpgg.emoticon('ramuan')}` : '')} 
- - - - - - - - - - - - - - - - - - - - - - - - - -
*${listaComida[4]}*
*${rpg.emoticon('cumi')} →* ${userdb.premium ? `_${userdb.cumi}/1_` : `_${userdb.cumi}/2_`}
*${rpgshop.emoticon('aqua')} →* ${userdb.premium ? `_${userdb.aqua}/3_` : `_${userdb.aqua}/6_`}
*${rpg.emoticon('udang')} →* ${userdb.premium ? `_${userdb.udang}/4_` : `_${userdb.udang}/8_`}
*${rpg.emoticon('ramuan')} →* ${userdb.premium ? `_${userdb.ramuan}/2_` : `_${userdb.ramuan}/3_`}
${userdb.cumi >= `${userdb.premium ? 1 : 2}` &&userdb.aqua >= `${userdb.premium ? 3 : 6}` &&userdb.udang >= `${userdb.premium ? 4 : 8}` &&userdb.ramuan >= `${userdb.premium ? 2 : 3}` ? '*🫕 PUEDE COCINAR 🫕*' : ''.concat(`*FALTA →* `,userdb.cumi < `${userdb.premium ? 1 : 2}` ? `❗${rpgg.emoticon('cumi')} ` : '',userdb.aqua < `${userdb.premium ? 3 : 6}` ? `❗${rpgshopp.emoticon('aqua')} ` : '',userdb.udang < `${userdb.premium ? 4 : 8}` ? `❗${rpgshopp.emoticon('udang')} ` : '',userdb.ramuan < `${userdb.premium ? 2 : 3}` ? `❗${rpgg.emoticon('ramuan')}` : '')} 
- - - - - - - - - - - - - - - - - - - - - - - - - -
*${listaComida[5]}*
*${rpg.emoticon('pollo')} →* ${userdb.premium ? `_${userdb.pollo}/2_` : `_${userdb.pollo}/4_`}
*${rpgshop.emoticon('aqua')} →* ${userdb.premium ? `_${userdb.aqua}/7_` : `_${userdb.aqua}/10_`}
*${rpgshop.emoticon('coal')} →* ${userdb.premium ? `_${userdb.coal}/2_` : `_${userdb.coal}/4_`}
*${rpg.emoticon('ramuan')} →* ${userdb.premium ? `_${userdb.ramuan}/1_` : `_${userdb.ramuan}/2_`}
${userdb.pollo >= `${userdb.premium ? 2 : 4}` &&userdb.aqua >= `${userdb.premium ? 7 : 10}` &&userdb.coal >= `${userdb.premium ? 2 : 4}` &&userdb.ramuan >= `${userdb.premium ? 1 : 2}` ? '*🫕 PUEDE COCINAR 🫕*' : ''.concat(`*FALTA →* `,userdb.pollo < `${userdb.premium ? 2 : 4}` ? `❗${rpgg.emoticon('pollo')} ` : '',userdb.aqua < `${userdb.premium ? 7 : 10}` ? `❗${rpgshopp.emoticon('aqua')} ` : '',userdb.coal < `${userdb.premium ? 2 : 4}` ? `❗${rpgshopp.emoticon('coal')} ` : '',userdb.ramuan < `${userdb.premium ? 1 : 2}` ? `❗${rpgg.emoticon('ramuan')}` : '')} 
- - - - - - - - - - - - - - - - - - - - - - - - - -
*${listaComida[6]}*
*${rpg.emoticon('cerdo')} →* ${userdb.premium ? `_${userdb.cerdo}/2_` : `_${userdb.cerdo}/3_`}
*${rpgshop.emoticon('coal')} →* ${userdb.premium ? `_${userdb.coal}/3_` : `_${userdb.coal}/4_`}
*${rpg.emoticon('ramuan')} →* ${userdb.premium ? `_${userdb.ramuan}/1_` : `_${userdb.ramuan}/2_`}
${userdb.cerdo >= `${userdb.premium ? 2 : 3}` &&userdb.coal >= `${userdb.premium ? 3 : 4}` &&userdb.ramuan >= `${userdb.premium ? 1 : 2}` ? '*🫕 PUEDE COCINAR 🫕*' : ''.concat(`*FALTA →* `,userdb.cerdo < `${userdb.premium ? 2 : 3}` ? `❗${rpgg.emoticon('cerdo')} ` : '',userdb.coal < `${userdb.premium ? 3 : 4}` ? `❗${rpgshopp.emoticon('coal')} ` : '',userdb.ramuan < `${userdb.premium ? 1 : 2}` ? `❗${rpgg.emoticon('ramuan')}` : '')} 
- - - - - - - - - - - - - - - - - - - - - - - - - -
*${listaComida[7]}*
*${rpg.emoticon('ikan')} →* ${userdb.premium ? `_${userdb.ikan}/2_` : `_${userdb.ikan}/4_`}
*${rpgshop.emoticon('coal')} →* ${userdb.premium ? `_${userdb.coal}/3_` : `_${userdb.coal}/6_`}
*${rpg.emoticon('ramuan')} →* ${userdb.premium ? `_${userdb.ramuan}/1_` : `_${userdb.ramuan}/2_`}
${userdb.ikan >= `${userdb.premium ? 2 : 4}` &&userdb.coal >= `${userdb.premium ? 3 : 6}` &&userdb.ramuan >= `${userdb.premium ? 1 : 2}` ? '*🫕 PUEDE COCINAR 🫕*' : ''.concat(`*FALTA →* `,userdb.ikan < `${userdb.premium ? 2 : 4}` ? `❗${rpgg.emoticon('ikan')} ` : '',userdb.coal < `${userdb.premium ? 3 : 6}` ? `❗${rpgshopp.emoticon('coal')} ` : '',userdb.ramuan < `${userdb.premium ? 1 : 2}` ? `❗${rpgg.emoticon('ramuan')}` : '')} 
- - - - - - - - - - - - - - - - - - - - - - - - - -
▧ lele horneado 🐟
〉Necesitas 2 lele 🐟 & 1 carbón 🕳️
▧ nila horneado 🐟
〉Necesitas 2 nila 🐟 & 1 carbón 🕳️
▧ pescado horneado 🐟
〉Necesitas 2 pescados 🐟 & 1 carbón 🕳️
▧ Camarón a la parrilla 🦐
〉Necesitas 2 camarones 🦐 & 1 carbón 🕳️
▧ ballena horneado 🐳
〉Necesitas 2 ballenas 🐳 & 1 carbón 🕳️
▧ cangrejo horneado 🦀
〉Necesita 2 cangrejos 🦀 y 1 carbón 🕳️
`
try {
if (/masak|cook|cocinar/i.test(command)) {
const count = args[1] && args[1].length > 0 ? Math.min(5, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
switch (type) {
case 'ayamhorneado':
if (userdb.pollo < count * 2 ||userdb.coal < 1 * count) {
userdb.pollo >= count * 1
userdb.pollo -= count * 2
userdb.coal -= count * 1
userdb.ayamhorneado += count * 1
await conn.sendWritingText(m.chat, `Cocina exitosa ${count} pollo horneado🍖`, userdb, m)
} else await conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar pollo a la parrilla\nNecesitas 2 pollos y 1 carbón para cocinar`, userdb, m)
break
case 'gulaiayam':
if (userdb.pollo < count * 2 ||userdb.coal < 1 * count) {
userdb.pollo >= count * 1
userdb.pollo -= count * 2
userdb.coal -= count * 1
userdb.gulai += count * 1
conn.reply(m.chat, `Cocina exitosa ${ count } Curry de pollo🍜`, userdb, m)
} else await conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar pollo al curry\nNecesitas 2 pollos y 1 carbón para cocinar`, userdb, m)
break
 case 'rendang':
if (userdb.sapi < count * 2 ||userdb.coal < 1 * count) {
userdb.sapi >= count * 1
userdb.sapi -= count * 2
userdb.coal -= count * 1
userdb.rendang += count * 1
 await conn.sendWritingText(m.chat, `Cocina exitosa ${ count } Rendang 🍜`, userdb, m)
} else await conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar rendang cocinado\nNecesita 2 vacas y 1 carbón para cocinar`, userdb, m)
break
case 'ayamgoreng':
if (userdb.pollo < count * 2 ||userdb.coal < 1 * count) {
userdb.pollo >= count * 1
userdb.pollo -= count * 2
userdb.coal -= count * 1
userdb.ayamgoreng += count * 1
conn.reply(m.chat, `Cocina exitosa ${ count } Pollo frito🍗`, userdb, m)
} else await conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar pollo frito\nNecesitas 2 pollos y 1 carbón para cocinar`, userdb, m)
break
 case 'oporayam':
if (userdb.lele < count * 2 ||userdb.coal < 1 * count) {
userdb.lele >= count * 1
userdb.lele -= count * 2
userdb.coal -= count * 1
userdb.oporayam += count * 1
 await conn.sendWritingText(m.chat, `Cocina exitosa ${ count } opor pollo`, userdb, m)
} else await conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar el pollo opor\nNecesitas 2 pollos y 1 carbón para cocinar`, userdb, m)
break
 case 'steak':
if (userdb.sapi < count * 2 ||userdb.coal < 1 * count) {
userdb.sapi >= count * 1
userdb.sapi -= count * 2
userdb.coal -= count * 1
userdb.steak += count * 1
 await conn.sendWritingText(m.chat, `Cocina exitosa ${ count } Steak`, userdb, m)
} else await conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar filetes\nNecesita 2 vacas y 1 carbón para cocinar`, userdb, m)
break
case 'babipanggang':
if (userdb.cerdo < count * 2 ||userdb.coal < 1 * count) {
userdb.cerdo >= count * 1
userdb.cerdo -= count * 2
userdb.coal -= count * 1
userdb.babipanggang += count * 1
 await conn.sendWritingText(m.chat, `Cocina exitosa ${ count } cerdos a la parrilla`, userdb, m)
} else await conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar carne de cerdo a la parrilla\nNecesitas 2 cerdos y 1 carbón para cocinar`, userdb, m)
break
case 'ikanhorneado':
if (userdb.ikan < count * 2 ||userdb.coal < 1 * count) {
userdb.ikan >= count * 1
userdb.ikan -= count * 2
userdb.coal -= count * 1
userdb.ikanhorneado += count * 1
await conn.sendWritingText(m.chat, `Cocina exitosa ${count} ikan horneado🍖`, userdb, m)
} else await conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar pescado a la parrilla\nNecesitas 2 pescado y 1 carbón para cocinar`, userdb, m)
break
case 'lelehorneado':
if (userdb.lele < count * 2 ||userdb.coal < 1 * count) {
userdb.lele >= count * 1
userdb.lele -= count * 2
userdb.coal -= count * 1
userdb.lelehorneado += count * 1
 await conn.sendWritingText(m.chat, `Cocina exitosa ${count} bagre horneado🍖`, userdb, m)
} else await conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar bagre a la parrilla\nNecesitas 2 bagre y 1 carbón para cocinar`, userdb, m)
break
case 'tilapiahorneado':
if (userdb.nila < count * 2 ||userdb.coal < 1 * count) {
userdb.nila >= count * 1
userdb.nila -= count * 2
userdb.coal -= count * 1
userdb.nilahorneado += count * 1
await conn.sendWritingText(m.chat, `Cocina exitosa ${count} tilapia horneada🍖`, userdb, m)
} else await conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar tilapia\nNecesita 2 tilapia y 1 carbón para cocinar`, userdb, m)
break
case 'pomponeshorneados':
if (userdb.pescado < count * 2 ||userdb.coal < 1 * count) {
userdb.pescado >= count * 1
userdb.pescado -= count * 2
userdb.coal -= count * 1
userdb.pescadohorneado += count * 1
await conn.sendWritingText(m.chat, `Cocina exitosa ${count} pompones horneados🍖`, userdb, m)
} else await conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar pompones\nNecesitas 2 pomfret y 1 carbón para cocinar`, userdb, m)
break
case 'camaronhorneado':
if (userdb.udang < count * 2 ||userdb.coal < 1 * count) {
userdb.udang >= count * 1
userdb.udang -= count * 2
userdb.coal -= count * 1
userdb.udanghorneado += count * 1
 await conn.sendWritingText(m.chat, `Cocina exitosa ${count} Camarón a la parrilla🍖`, userdb, m)
} else await conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar camarones a la parrilla\nNecesitas 2 camarones y 1 carbón para cocinar`, userdb, m)
break
case 'ballenahorneado':
if (userdb.ballena < count * 2 ||userdb.coal < 1 * count) {
userdb.ballena >= count * 1
userdb.ballena -= count * 2
userdb.coal -= count * 1
userdb.ballenahorneado += count * 1
 await conn.sendWritingText(m.chat, `Cocina exitosa ${count} ballena horneado🍖`, userdb, m)
} else await conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar ballenas a la parrilla\nNecesitas 2 ballenas y 1 carbón para cocinar`, userdb, m)
break
case 'cangrejohorneado':
if (userdb.cangrejo < count * 2 ||userdb.coal < 1 * count) {
userdb.cangrejo >= count * 1
userdb.cangrejo -= count * 2
userdb.coal -= count * 1
userdb.cangrejohorneado += count * 1
await conn.sendWritingText(m.chat, `Cocina exitosa ${count} Cangrejo quemado🍖`, userdb, m)
} else await conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar cangrejos a la parrilla\nNecesitas 2 cangrejos y 1 carbón para cocinar`, userdb, m)
break
default:
let resp = `*PREMIUM ${userdb.premium ? "✅": "❌"}*\n\n${cocinar}`
const buttons = [[`🤺 Inventario de Combate`, `${usedPrefix}inventario 2`],
[`🏕️ Aventurar | Venture`, `${usedPrefix}adventure`],
['💗 Menu Aventura | RPG', '.rpgmenu']]
const rows = [{
title: "pollo horneado 🍖",
id: ".cook ayamhorneado",
description: "Cocinar pollo horneado"
},{
title: "pollo Goreng 🍗",
id: ".cook ayamhorneado",
description: "Cocinar pollo Goreng"
},{
title: "Opor pollo 🍜",
id: ".cook oporayam",
description: "Cocinar Opor pollo"
},{
title: "Steak 🥩",
id: ".cook steak",
description: "Cocinar Steak"
},{
title: "Rendang 🥘",
id: ".cook rendang",
description: "Cocinar Rendang"
},{
title: "Gulai pollo 🍲",
id: ".cook gulaiayam",
description: "Cocinar Gulai pollo"
},{
title: "cerdo Panggang 🥠",
id: ".cook babipanggang",
description: "Cocinar cerdo Panggang"
},{
title: "ikan horneado 🐟",
id: ".cook ikanhorneado",
description: "Cocinar ikan horneado"
},{
title: "lele horneado 🐟",
id: ".cook lelehorneado",
description: "Cocinar lele horneado"
},{
title: "nila horneado 🐟",
id: ".cook nilahorneado",
description: "Cocinar nila horneado"
},{
title: "pescado horneado 🐟",
id: ".cook pescadohorneado",
description: "Cocinar pescado horneado"
},{
title: "Camarón a la parrilla 🦐",
id: ".cook udanghorneado",
description: "Cocinar Camarón a la parrilla"
},{
title: "ballena horneado 🐳",
id: ".cook ballenahorneado",
description: "Cocinar ballena horneado"
},{
title: "cangrejo horneado 🦀",
id: ".cook cangrejohorneado",
description: "Cocinar cangrejo horneado"
}
]

if (start.buttons) {
await conn.sendButton(m.chat, {text: resp, footer: info.nbcde}, {}, buttons, userdb, m)
await conn.sendList(m.chat, {
text: info.nanipe,
footer: cocinar,
title: '「 * COCINANDO* 」',
buttonText: "COCINANDO",
sections: [{
title: "Lista",
rows
}]
}, userdb, m)
} else {
let q = await conn.sendWritingText(m.chat, resp, userdb, m);
resp = `*LISTA*\nUse los comandos asi como los presenta la siguiente lista:\n`
for (const item of rows) {
resp += `╠════════════════════\n`
if (!item.title && !item.description && !item.id) continue
if (item.title) resp += `┣ *${item.title}*\n`
if (item.description) resp += item.description + '\n'
if (item.id) resp += `┣ 📎 *Comando:* ${item.id}\n`
}
return conn.sendWritingText(m.chat, `${resp}\n╚═══════════════════╝`, userdb, q);
}
}
}
} catch (e) {
await conn.sendWritingText(m.chat, `Parece que hay un error, intente informar al propietario`, userdb, m)
console.log(e)
for (let jid of owner) {
const resp = 'shop.js error\nNo: *' + senderJid.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e.stack + '*'
}
}
}

handler.help = ['masak <masakan> <args>', 'cook <masakan> <args>']
handler.tags = ['rpg']
handler.command = /^(masak|cook|cocinar)$/i

handler.menu = [
{title: "🍳 COCINAR", description: `Cocina deliciosos platillos con los ingredientes que tienes, usa el comando #cocinar`, id: `cocinar`},
];
handler.type = "rpg";
handler.disabled = false;

export default handler
