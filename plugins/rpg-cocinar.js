let handler = async (m, { command, usedPrefix, DevMode, args, conn }) => {
let type = (args[0] || '').toLowerCase()
let msk = (args[0] || '').toLowerCase()
let user = global.db.data.users[m.sender]

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
                            conn.reply(m.chat, `Cocina exitosa ${count} pollo horneado🍖`, m)
                       } else conn.reply(m.chat, `No tienes ingredientes para cocinar pollo a la parrilla\nNecesitas 2 pollos y 1 carbón para cocinar`, m)
					break
				  case 'gulaiayam':
            if (user.pollo < count * 2 || user.coal < 1 * count) {
                            user.pollo >= count * 1
                            user.pollo -= count * 2
                            user.coal -= count * 1
                            user.gulai += count * 1
                            conn.reply(m.chat, `Cocina exitosa ${ count } Curry de pollo🍜`, m)
                       } else conn.reply(m.chat, `No tienes ingredientes para cocinar pollo al curry\nNecesitas 2 pollos y 1 carbón para cocinar`, m)
					break
                  case 'rendang':
            if (user.sapi < count * 2 || user.coal < 1 * count) {
                            user.sapi >= count * 1
                            user.sapi -= count * 2
                            user.coal -= count * 1
                            user.rendang += count * 1
                            conn.reply(m.chat, `Cocina exitosa ${ count } Rendang 🍜`, m)
                       } else conn.reply(m.chat, `No tienes ingredientes para cocinar rendang cocinado\nNecesita 2 vacas y 1 carbón para cocinar`, m)
					break
                   case 'ayamgoreng':
            if (user.pollo < count * 2 || user.coal < 1 * count) {
                           user.pollo >= count * 1
                            user.pollo -= count * 2
                            user.coal -= count * 1
                            user.ayamgoreng += count * 1
                            conn.reply(m.chat, `Cocina exitosa ${ count } Pollo frito🍗`, m)
                       } else conn.reply(m.chat, `No tienes ingredientes para cocinar pollo frito\nNecesitas 2 pollos y 1 carbón para cocinar`, m)
					break
                        case 'oporayam':
            if (user.lele < count * 2 || user.coal < 1 * count) {
                          user.lele >= count * 1
                            user.lele -= count * 2
                            user.coal -= count * 1
                            user.oporayam += count * 1
                            conn.reply(m.chat, `Cocina exitosa ${ count } opor pollo`, m)
                       } else conn.reply(m.chat, `No tienes ingredientes para cocinar el pollo opor\nNecesitas 2 pollos y 1 carbón para cocinar`, m)
					break
                        case 'steak':
            if (user.sapi < count * 2 || user.coal < 1 * count) {
                            user.sapi >= count * 1
                            user.sapi -= count * 2
                            user.coal -= count * 1
                            user.steak += count * 1
                            conn.reply(m.chat, `Cocina exitosa ${ count } Steak`, m)
                       } else conn.reply(m.chat, `No tienes ingredientes para cocinar filetes\nNecesita 2 vacas y 1 carbón para cocinar`, m)
				break
             case 'babipanggang':
            if (user.cerdo < count * 2 || user.coal < 1 * count) {
                            user.cerdo >= count * 1
                            user.cerdo -= count * 2
                            user.coal -= count * 1
                            user.babipanggang += count * 1
                            conn.reply(m.chat, `Cocina exitosa ${ count } cerdos a la parrilla`, m)
                       } else conn.reply(m.chat, `No tienes ingredientes para cocinar carne de cerdo a la parrilla\nNecesitas 2 cerdos y 1 carbón para cocinar`, m)
				break
				case 'ikanhorneado':
            if (user.ikan < count * 2 || user.coal < 1 * count) {
                           user.ikan >= count * 1
                            user.ikan -= count * 2
                            user.coal -= count * 1
                            user.ikanhorneado += count * 1
                            conn.reply(m.chat, `Cocina exitosa ${count} ikan horneado🍖`, m)
                       } else conn.reply(m.chat, `No tienes ingredientes para cocinar pescado a la parrilla\nNecesitas 2 pescado y 1 carbón para cocinar`, m)
					break
					case 'lelehorneado':
            if (user.lele < count * 2 || user.coal < 1 * count) {
                           user.lele >= count * 1
                            user.lele -= count * 2
                            user.coal -= count * 1
                            user.lelehorneado += count * 1
                            conn.reply(m.chat, `Cocina exitosa ${count} bagre horneado🍖`, m)
                       } else conn.reply(m.chat, `No tienes ingredientes para cocinar bagre a la parrilla\nNecesitas 2 bagre y 1 carbón para cocinar`, m)
					break
					case 'tilapiahorneado':
            if (user.nila < count * 2 || user.coal < 1 * count) {
                           user.nila >= count * 1
                            user.nila -= count * 2
                            user.coal -= count * 1
                            user.nilahorneado += count * 1
                            conn.reply(m.chat, `Cocina exitosa ${count} tilapia horneada🍖`, m)
                       } else conn.reply(m.chat, `No tienes ingredientes para cocinar tilapia\nNecesita 2 tilapia y 1 carbón para cocinar`, m)
					break
					case 'pomponeshorneados':
            if (user.pescado < count * 2 || user.coal < 1 * count) {
                           user.pescado >= count * 1
                            user.pescado -= count * 2
                            user.coal -= count * 1
                            user.pescadohorneado += count * 1
                            conn.reply(m.chat, `Cocina exitosa ${count} pompones horneados🍖`, m)
                       } else conn.reply(m.chat, `No tienes ingredientes para cocinar pompones\nNecesitas 2 pomfret y 1 carbón para cocinar`, m)
					break
					case 'camaronhorneado':
            if (user.udang < count * 2 || user.coal < 1 * count) {
                           user.udang >= count * 1
                            user.udang -= count * 2
                            user.coal -= count * 1
                            user.udanghorneado += count * 1
                            conn.reply(m.chat, `Cocina exitosa ${count} Camarón a la parrilla🍖`, m)
                       } else conn.reply(m.chat, `No tienes ingredientes para cocinar camarones a la parrilla\nNecesitas 2 camarones y 1 carbón para cocinar`, m)
					break
					case 'ballenahorneado':
            if (user.ballena < count * 2 || user.coal < 1 * count) {
                           user.ballena >= count * 1
                            user.ballena -= count * 2
                            user.coal -= count * 1
                            user.ballenahorneado += count * 1
                            conn.reply(m.chat, `Cocina exitosa ${count} ballena horneado🍖`, m)
                       } else conn.reply(m.chat, `No tienes ingredientes para cocinar ballenas a la parrilla\nNecesitas 2 ballenas y 1 carbón para cocinar`, m)
					break
					case 'cangrejohorneado':
            if (user.cangrejo < count * 2 || user.coal < 1 * count) {
                           user.cangrejo >= count * 1
                            user.cangrejo -= count * 2
                            user.coal -= count * 1
                            user.cangrejohorneado += count * 1
                            conn.reply(m.chat, `Cocina exitosa ${count} Cangrejo quemado🍖`, m)
                       } else conn.reply(m.chat, `No tienes ingredientes para cocinar cangrejos a la parrilla\nNecesitas 2 cangrejos y 1 carbón para cocinar`, m)
					break
default:
     let resp = `*𝗣𝗥𝗘𝗠𝗜𝗨𝗠 ${user.premium ? "✅": "❌"}*\n${wm}\n\n` + cocinar
     let txt = '';
     let count = 0;
     for (const c of resp) {
         await new Promise(resolve => setTimeout(resolve, 15));
         txt += c;
         count++;
     
         if (count % 10 === 0) {
             conn.sendPresenceUpdate('composing' , m.chat);
         }
     }
     await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );    
await conn.sendButton(m.chat, `*𝗣𝗥𝗘𝗠𝗜𝗨𝗠 ${user.premium ? "✅": "❌"}*\n${wm}`, cocinar, [
[`🤺 𝙄𝙣𝙫𝙚𝙣𝙩𝙖𝙧𝙞𝙤 𝙙𝙚 𝘾𝙤𝙢𝙗𝙖𝙩𝙚`, `${usedPrefix}inventario 2`],
[`🏕️ 𝘼𝙫𝙚𝙣𝙩𝙪𝙧𝙖𝙧 | 𝙑𝙚𝙣𝙩𝙪𝙧𝙚`, `${usedPrefix}adventure`],
['💗 𝙈𝙚𝙣𝙪 𝘼𝙫𝙚𝙣𝙩𝙪𝙧𝙖 | 𝙍𝙋𝙂', '.rpgmenu']], m, { mentions: conn.parseMention(cocinar) })	    
await conn.sendMessage(m.chat, {
				text: wm,
				footer: cocinar,
				title: '「 *C O O K I N G* 」',
				buttonText: "C O O K I N G",
				sections: [{
					title: "List Featured",
					rows: [{
				title: "pollo horneado 🍖",
				rowId: ".cook ayamhorneado",
				description: "Cooking pollo horneado"
			},{
				title: "pollo Goreng 🍗",
				rowId: ".cook ayamhorneado",
				description: "Cooking pollo Goreng"
			},{
				title: "Opor pollo 🍜",
				rowId: ".cook oporayam",
				description: "Cooking Opor pollo"
			},{
				title: "Steak 🥩",
				rowId: ".cook steak",
				description: "Cooking Steak"
			},{
				title: "Rendang 🥘",
				rowId: ".cook rendang",
				description: "Cooking Rendang"
			},{
				title: "Gulai pollo 🍲",
				rowId: ".cook gulaiayam",
				description: "Cooking Gulai pollo"
			},{
				title: "cerdo Panggang 🥠",
				rowId: ".cook babipanggang",
				description: "Cooking cerdo Panggang"
			},{
				title: "ikan horneado 🐟",
				rowId: ".cook ikanhorneado",
				description: "Cooking ikan horneado"
			},{
				title: "lele horneado 🐟",
				rowId: ".cook lelehorneado",
				description: "Cooking lele horneado"
			},{
				title: "nila horneado 🐟",
				rowId: ".cook nilahorneado",
				description: "Cooking nila horneado"
			},{
				title: "pescado horneado 🐟",
				rowId: ".cook pescadohorneado",
				description: "Cooking pescado horneado"
			},{
				title: "Camarón a la parrilla 🦐",
				rowId: ".cook udanghorneado",
				description: "Cooking Camarón a la parrilla"
			},{
				title: "ballena horneado 🐳",
				rowId: ".cook ballenahorneado",
				description: "Cooking ballena horneado"
			},{
				title: "cangrejo horneado 🦀",
				rowId: ".cook cangrejohorneado",
				description: "Cooking cangrejo horneado"
			}
					]
				}]
			})
            }
        }
    } catch (e) {
        conn.reply(m.chat, `Parece que hay un error, intente informar al propietario`, m)
        console.log(e)
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, 'shop.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
            }
        }
    }
}

handler.help = ['masak <masakan> <args>', 'cook <masakan> <args>']
handler.tags = ['rpg']
handler.command = /^(masak|cook|cocinar)$/i

export default handler
