import { rpg } from "../rpg.js"
let handler = async (m, {command, usedPrefix, DevMode, args, conn, db, userdb, senderJid}) => {
let type = (args[0] || '').toLowerCase()
let msk = (args[0] || '').toLowerCase()
let user = db.data.bot[conn.user.jid].chats.groups[m.chat].users[senderJid]

const listaComida = ['◈ Pollo a la parrilla 🍖','◈ Pollo frito 🍗','◈ Fideos con crema de leche y pollo 🍜','◈ Filete de Vaca 🥩','◈ Paella 🥘','◈ Curry de pollo 🍲','Cerdo asado 🥠','◈ Pescado asado 🐟','']

let cocinar = `
*${listaComida[0]}*
*${rpg.emoticon('pollo')} →* ${user.premium ? `_${user.pollo}/2_` : `_${user.pollo}/3_`}
*${rpgshop.emoticon('coal')} →* ${user.premium ? `_${user.coal}/1_` : `_${user.coal}/1_`}
*${rpg.emoticon('ramuan')} →* ${user.premium ? `_${user.ramuan}/1__` : `_${user.ramuan}/1_`} 
${user.pollo >= `${user.premium ? 2 : 3}` && user.coal >= `${user.premium ? 1 : 1}` && user.ramuan >= `${user.premium ? 1 : 1}` ? '*🫕 PUEDE COCINAR 🫕*' : ''.concat(`*FALTA →* `, user.pollo < `${user.premium ? 2 : 3}` ? `❗${rpgg.emoticon('pollo')} ` : '', user.coal < `${user.premium ? 1 : 1}` ? `❗${rpgshopp.emoticon('coal')} ` : '', user.ramuan < `${user.premium ? 1 : 1}` ? `❗${rpgg.emoticon('ramuan')}` : '')} 
- - - - - - - - - - - - - - - - - - - - - - - - - -
*${listaComida[1]}*
*${rpg.emoticon('pollo')} →* ${user.premium ? `_${user.pollo}/1_` : `_${user.pollo}/2_`}
*${rpgshop.emoticon('coal')} →* ${user.premium ? `_${user.coal}/1_` : `_${user.coal}/2_`}
*${rpg.emoticon('ramuan')} →* ${user.premium ? `_${user.ramuan}/1_` : `_${user.ramuan}/1_`}
${user.pollo >= `${user.premium ? 1 : 2}` && user.coal >= `${user.premium ? 1 : 2}` && user.ramuan >= `${user.premium ? 1 : 1}` ? '*🫕 PUEDE COCINAR 🫕*' : ''.concat(`*FALTA →* `, user.pollo < `${user.premium ? 1 : 2}` ? `❗${rpgg.emoticon('pollo')} ` : '', user.coal < `${user.premium ? 1 : 2}` ? `❗${rpgshopp.emoticon('coal')} ` : '', user.ramuan < `${user.premium ? 1 : 1}` ? `❗${rpgg.emoticon('ramuan')}` : '')} 
- - - - - - - - - - - - - - - - - - - - - - - - - -
*${listaComida[2]}*
*${rpg.emoticon('pollo')} →* ${user.premium ? `_${user.pollo}/1_` : `_${user.pollo}/1_`}
*${rpgshop.emoticon('aqua')} →* ${user.premium ? `_${user.aqua}/3_` : `_${user.aqua}/5_`}
*${rpg.emoticon('fideos')} →* ${user.premium ? `_${user.fideos}/2_` : `_${user.fideos}/3_`}
*${rpg.emoticon('ramuan')} →* ${user.premium ? `_${user.ramuan}/1_` : `_${user.ramuan}/2_`}
${user.pollo >= `${user.premium ? 1 : 1}` && user.aqua >= `${user.premium ? 3 : 5}` && user.fideos >= `${user.premium ? 2 : 3}` && user.ramuan >= `${user.premium ? 1 : 2}` ? '*🫕 PUEDE COCINAR 🫕*' : ''.concat(`*FALTA →* `, user.pollo < `${user.premium ? 1 : 1}` ? `❗${rpgg.emoticon('pollo')} ` : '', user.aqua < `${user.premium ? 3 : 5}` ? `❗${rpgshopp.emoticon('aqua')} ` : '', user.fideos < `${user.premium ? 2 : 3}` ? `❗${rpgg.emoticon('fideos')} ` : '', user.ramuan < `${user.premium ? 1 : 2}` ? `❗${rpgg.emoticon('ramuan')}` : '')} 
- - - - - - - - - - - - - - - - - - - - - - - - - -
*${listaComida[3]}*
*${rpg.emoticon('cow')} →* ${user.premium ? `_${user.sapi}/1_` : `_${user.sapi}/2_`}
*${rpgshop.emoticon('coal')} →* ${user.premium ? `_${user.coal}/3_` : `_${user.coal}/6_`}
*${rpg.emoticon('ramuan')} →* ${user.premium ? `_${user.ramuan}/1_` : `_${user.ramuan}/2_`}
${user.sapi >= `${user.premium ? 1 : 2}` && user.coal >= `${user.premium ? 3 : 6}` && user.ramuan >= `${user.premium ? 1 : 2}` ? '*🫕 PUEDE COCINAR 🫕*' : ''.concat(`*FALTA →* `, user.sapi < `${user.premium ? 1 : 2}` ? `❗${rpgg.emoticon('cow')} ` : '', user.coal < `${user.premium ? 3 : 6}` ? `❗${rpgshopp.emoticon('coal')} ` : '', user.ramuan < `${user.premium ? 1 : 2}` ? `❗${rpgg.emoticon('ramuan')}` : '')} 
- - - - - - - - - - - - - - - - - - - - - - - - - -
*${listaComida[4]}*
*${rpg.emoticon('cumi')} →* ${user.premium ? `_${user.cumi}/1_` : `_${user.cumi}/2_`}
*${rpgshop.emoticon('aqua')} →* ${user.premium ? `_${user.aqua}/3_` : `_${user.aqua}/6_`}
*${rpg.emoticon('udang')} →* ${user.premium ? `_${user.udang}/4_` : `_${user.udang}/8_`}
*${rpg.emoticon('ramuan')} →* ${user.premium ? `_${user.ramuan}/2_` : `_${user.ramuan}/3_`}
${user.cumi >= `${user.premium ? 1 : 2}` && user.aqua >= `${user.premium ? 3 : 6}` && user.udang >= `${user.premium ? 4 : 8}` && user.ramuan >= `${user.premium ? 2 : 3}` ? '*🫕 PUEDE COCINAR 🫕*' : ''.concat(`*FALTA →* `, user.cumi < `${user.premium ? 1 : 2}` ? `❗${rpgg.emoticon('cumi')} ` : '', user.aqua < `${user.premium ? 3 : 6}` ? `❗${rpgshopp.emoticon('aqua')} ` : '', user.udang < `${user.premium ? 4 : 8}` ? `❗${rpgshopp.emoticon('udang')} ` : '', user.ramuan < `${user.premium ? 2 : 3}` ? `❗${rpgg.emoticon('ramuan')}` : '')} 
- - - - - - - - - - - - - - - - - - - - - - - - - -
*${listaComida[5]}*
*${rpg.emoticon('pollo')} →* ${user.premium ? `_${user.pollo}/2_` : `_${user.pollo}/4_`}
*${rpgshop.emoticon('aqua')} →* ${user.premium ? `_${user.aqua}/7_` : `_${user.aqua}/10_`}
*${rpgshop.emoticon('coal')} →* ${user.premium ? `_${user.coal}/2_` : `_${user.coal}/4_`}
*${rpg.emoticon('ramuan')} →* ${user.premium ? `_${user.ramuan}/1_` : `_${user.ramuan}/2_`}
${user.pollo >= `${user.premium ? 2 : 4}` && user.aqua >= `${user.premium ? 7 : 10}` && user.coal >= `${user.premium ? 2 : 4}` && user.ramuan >= `${user.premium ? 1 : 2}` ? '*🫕 PUEDE COCINAR 🫕*' : ''.concat(`*FALTA →* `, user.pollo < `${user.premium ? 2 : 4}` ? `❗${rpgg.emoticon('pollo')} ` : '', user.aqua < `${user.premium ? 7 : 10}` ? `❗${rpgshopp.emoticon('aqua')} ` : '', user.coal < `${user.premium ? 2 : 4}` ? `❗${rpgshopp.emoticon('coal')} ` : '', user.ramuan < `${user.premium ? 1 : 2}` ? `❗${rpgg.emoticon('ramuan')}` : '')} 
- - - - - - - - - - - - - - - - - - - - - - - - - -
*${listaComida[6]}*
*${rpg.emoticon('cerdo')} →* ${user.premium ? `_${user.cerdo}/2_` : `_${user.cerdo}/3_`}
*${rpgshop.emoticon('coal')} →* ${user.premium ? `_${user.coal}/3_` : `_${user.coal}/4_`}
*${rpg.emoticon('ramuan')} →* ${user.premium ? `_${user.ramuan}/1_` : `_${user.ramuan}/2_`}
${user.cerdo >= `${user.premium ? 2 : 3}` && user.coal >= `${user.premium ? 3 : 4}` && user.ramuan >= `${user.premium ? 1 : 2}` ? '*🫕 PUEDE COCINAR 🫕*' : ''.concat(`*FALTA →* `, user.cerdo < `${user.premium ? 2 : 3}` ? `❗${rpgg.emoticon('cerdo')} ` : '', user.coal < `${user.premium ? 3 : 4}` ? `❗${rpgshopp.emoticon('coal')} ` : '', user.ramuan < `${user.premium ? 1 : 2}` ? `❗${rpgg.emoticon('ramuan')}` : '')} 
- - - - - - - - - - - - - - - - - - - - - - - - - -
*${listaComida[7]}*
*${rpg.emoticon('ikan')} →* ${user.premium ? `_${user.ikan}/2_` : `_${user.ikan}/4_`}
*${rpgshop.emoticon('coal')} →* ${user.premium ? `_${user.coal}/3_` : `_${user.coal}/6_`}
*${rpg.emoticon('ramuan')} →* ${user.premium ? `_${user.ramuan}/1_` : `_${user.ramuan}/2_`}
${user.ikan >= `${user.premium ? 2 : 4}` && user.coal >= `${user.premium ? 3 : 6}` && user.ramuan >= `${user.premium ? 1 : 2}` ? '*🫕 PUEDE COCINAR 🫕*' : ''.concat(`*FALTA →* `, user.ikan < `${user.premium ? 2 : 4}` ? `❗${rpgg.emoticon('ikan')} ` : '', user.coal < `${user.premium ? 3 : 6}` ? `❗${rpgshopp.emoticon('coal')} ` : '', user.ramuan < `${user.premium ? 1 : 2}` ? `❗${rpgg.emoticon('ramuan')}` : '')} 
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
if (user.pollo < count * 2 || user.coal < 1 * count) {
user.pollo >= count * 1
user.pollo -= count * 2
user.coal -= count * 1
user.ayamhorneado += count * 1
conn.sendWritingText(m.chat, `Cocina exitosa ${count} pollo horneado🍖`, userdb, m)
} else conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar pollo a la parrilla\nNecesitas 2 pollos y 1 carbón para cocinar`, userdb, m)
					break
				 case 'gulaiayam':
if (user.pollo < count * 2 || user.coal < 1 * count) {
user.pollo >= count * 1
user.pollo -= count * 2
user.coal -= count * 1
user.gulai += count * 1
conn.sendWritingText(m.chat, `Cocina exitosa ${ count } Curry de pollo🍜`, userdb, m)
} else conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar pollo al curry\nNecesitas 2 pollos y 1 carbón para cocinar`, userdb, m)
					break
case 'rendang':
if (user.sapi < count * 2 || user.coal < 1 * count) {
user.sapi >= count * 1
user.sapi -= count * 2
user.coal -= count * 1
user.rendang += count * 1
conn.sendWritingText(m.chat, `Cocina exitosa ${ count } Rendang 🍜`, userdb, m)
} else conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar rendang cocinado\nNecesita 2 vacas y 1 carbón para cocinar`, userdb, m)
					break
case 'ayamgoreng':
if (user.pollo < count * 2 || user.coal < 1 * count) {
user.pollo >= count * 1
user.pollo -= count * 2
user.coal -= count * 1
user.ayamgoreng += count * 1
conn.sendWritingText(m.chat, `Cocina exitosa ${ count } Pollo frito🍗`, userdb, m)
} else conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar pollo frito\nNecesitas 2 pollos y 1 carbón para cocinar`, userdb, m)
					break
case 'oporayam':
if (user.lele < count * 2 || user.coal < 1 * count) {
user.lele >= count * 1
user.lele -= count * 2
user.coal -= count * 1
user.oporayam += count * 1
conn.sendWritingText(m.chat, `Cocina exitosa ${ count } opor pollo`, userdb, m)
} else conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar el pollo opor\nNecesitas 2 pollos y 1 carbón para cocinar`, userdb, m)
					break
case 'steak':
if (user.sapi < count * 2 || user.coal < 1 * count) {
user.sapi >= count * 1
user.sapi -= count * 2
user.coal -= count * 1
user.steak += count * 1
conn.sendWritingText(m.chat, `Cocina exitosa ${ count } Steak`, userdb, m)
} else conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar filetes\nNecesita 2 vacas y 1 carbón para cocinar`, userdb, m)
				break
case 'babipanggang':
if (user.cerdo < count * 2 || user.coal < 1 * count) {
user.cerdo >= count * 1
user.cerdo -= count * 2
user.coal -= count * 1
user.babipanggang += count * 1
conn.sendWritingText(m.chat, `Cocina exitosa ${ count } cerdos a la parrilla`, userdb, m)
} else conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar carne de cerdo a la parrilla\nNecesitas 2 cerdos y 1 carbón para cocinar`, userdb, m)
				break
				case 'ikanhorneado':
if (user.ikan < count * 2 || user.coal < 1 * count) {
user.ikan >= count * 1
user.ikan -= count * 2
user.coal -= count * 1
user.ikanhorneado += count * 1
conn.sendWritingText(m.chat, `Cocina exitosa ${count} ikan horneado🍖`, userdb, m)
} else conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar pescado a la parrilla\nNecesitas 2 pescado y 1 carbón para cocinar`, userdb, m)
					break
					case 'lelehorneado':
if (user.lele < count * 2 || user.coal < 1 * count) {
user.lele >= count * 1
user.lele -= count * 2
user.coal -= count * 1
user.lelehorneado += count * 1
conn.sendWritingText(m.chat, `Cocina exitosa ${count} bagre horneado🍖`, userdb, m)
} else conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar bagre a la parrilla\nNecesitas 2 bagre y 1 carbón para cocinar`, userdb, m)
					break
					case 'tilapiahorneado':
if (user.nila < count * 2 || user.coal < 1 * count) {
user.nila >= count * 1
user.nila -= count * 2
user.coal -= count * 1
user.nilahorneado += count * 1
conn.sendWritingText(m.chat, `Cocina exitosa ${count} tilapia horneada🍖`, userdb, m)
} else conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar tilapia\nNecesita 2 tilapia y 1 carbón para cocinar`, userdb, m)
					break
					case 'pomponeshorneados':
if (user.pescado < count * 2 || user.coal < 1 * count) {
user.pescado >= count * 1
user.pescado -= count * 2
user.coal -= count * 1
user.pescadohorneado += count * 1
conn.sendWritingText(m.chat, `Cocina exitosa ${count} pompones horneados🍖`, userdb, m)
} else conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar pompones\nNecesitas 2 pomfret y 1 carbón para cocinar`, userdb, m)
					break
					case 'camaronhorneado':
if (user.udang < count * 2 || user.coal < 1 * count) {
user.udang >= count * 1
user.udang -= count * 2
user.coal -= count * 1
user.udanghorneado += count * 1
conn.sendWritingText(m.chat, `Cocina exitosa ${count} Camarón a la parrilla🍖`, userdb, m)
} else conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar camarones a la parrilla\nNecesitas 2 camarones y 1 carbón para cocinar`, userdb, m)
					break
					case 'ballenahorneado':
if (user.ballena < count * 2 || user.coal < 1 * count) {
user.ballena >= count * 1
user.ballena -= count * 2
user.coal -= count * 1
user.ballenahorneado += count * 1
conn.sendWritingText(m.chat, `Cocina exitosa ${count} ballena horneado🍖`, userdb, m)
} else conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar ballenas a la parrilla\nNecesitas 2 ballenas y 1 carbón para cocinar`, userdb, m)
					break
					case 'cangrejohorneado':
if (user.cangrejo < count * 2 || user.coal < 1 * count) {
user.cangrejo >= count * 1
user.cangrejo -= count * 2
user.coal -= count * 1
user.cangrejohorneado += count * 1
conn.sendWritingText(m.chat, `Cocina exitosa ${count} Cangrejo quemado🍖`, userdb, m)
} else conn.sendWritingText(m.chat, `No tienes ingredientes para cocinar cangrejos a la parrilla\nNecesitas 2 cangrejos y 1 carbón para cocinar`, userdb, m)
					break
default:
let resp = `*𝗣𝗥𝗘𝗠𝗜𝗨𝗠 ${user.premium ? "✅": "❌"}*\n${info.nanie}\n\n` + cocinar

await conn.sendWritingText(m.chat, resp, userdb, m);
await conn.sendButton(m.chat, `*𝗣𝗥𝗘𝗠𝗜𝗨𝗠 ${user.premium ? "✅": "❌"}*\n${info.nanie}`, cocinar, [
[`🤺 𝙄𝙣𝙫𝙚𝙣𝙩𝙖𝙧𝙞𝙤 𝙙𝙚 𝘾𝙤𝙢𝙗𝙖𝙩𝙚`, `${usedPrefix}inventario 2`],
[`🏕️ 𝘼𝙫𝙚𝙣𝙩𝙪𝙧𝙖𝙧 | 𝙑𝙚𝙣𝙩𝙪𝙧𝙚`, `${usedPrefix}adventure`],
['💗 𝙈𝙚𝙣𝙪 𝘼𝙫𝙚𝙣𝙩𝙪𝙧𝙖 | 𝙍𝙋𝙂', '.rpgmenu']], m, { mentions: conn.parseMention(cocinar) })	
await conn.sendMessage(m.chat, {
				text: info.nanie,
				footer: cocinar,
				title: '「 *C O O K I N G* 」',
				buttonText: "C O O K I N G",
				sections: [{
					title: "List Featured",
					rows: [{
				title: "pollo horneado 🍖",
				id: ".cook ayamhorneado",
				description: "Cooking pollo horneado"
			},{
				title: "pollo Goreng 🍗",
				id: ".cook ayamhorneado",
				description: "Cooking pollo Goreng"
			},{
				title: "Opor pollo 🍜",
				id: ".cook oporayam",
				description: "Cooking Opor pollo"
			},{
				title: "Steak 🥩",
				id: ".cook steak",
				description: "Cooking Steak"
			},{
				title: "Rendang 🥘",
				id: ".cook rendang",
				description: "Cooking Rendang"
			},{
				title: "Gulai pollo 🍲",
				id: ".cook gulaiayam",
				description: "Cooking Gulai pollo"
			},{
				title: "cerdo Panggang 🥠",
				id: ".cook babipanggang",
				description: "Cooking cerdo Panggang"
			},{
				title: "ikan horneado 🐟",
				id: ".cook ikanhorneado",
				description: "Cooking ikan horneado"
			},{
				title: "lele horneado 🐟",
				id: ".cook lelehorneado",
				description: "Cooking lele horneado"
			},{
				title: "nila horneado 🐟",
				id: ".cook nilahorneado",
				description: "Cooking nila horneado"
			},{
				title: "pescado horneado 🐟",
				id: ".cook pescadohorneado",
				description: "Cooking pescado horneado"
			},{
				title: "Camarón a la parrilla 🦐",
				id: ".cook udanghorneado",
				description: "Cooking Camarón a la parrilla"
			},{
				title: "ballena horneado 🐳",
				id: ".cook ballenahorneado",
				description: "Cooking ballena horneado"
			},{
				title: "cangrejo horneado 🦀",
				id: ".cook cangrejohorneado",
				description: "Cooking cangrejo horneado"
			}
					]
				}]
			})
}
}
} catch (e) {
conn.sendWritingText(m.chat, `Parece que hay un error, intente informar al propietario`, m)
console.log(e)
if (DevMode) {
for (let jid of owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
conn.sendMessage(jid, 'shop.js error\nNo: *' + senderJid.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
}
}
}
}

handler.help = ['masak <masakan> <args>', 'cook <masakan> <args>']
handler.tags = ['rpg']
handler.command = /^(masak|cook|cocinar)$/i

handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
