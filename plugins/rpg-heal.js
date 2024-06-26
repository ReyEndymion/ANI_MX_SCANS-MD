import { join } from 'path' 
import { promises } from 'fs'
let handler = async (m, { conn, args, usedPrefix, __dirname }) => {
let resp, imagen
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
let user = global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender]
if (user.health >= 100) {
resp = `Tu salud está llena ❤️\n\nSalud: ${user.health}%\n\n${wm}`
} else if (user.potion < count) {
const heal = 40 + (user.gato * 4)
let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0]) || Math.round((90 - user.health) / heal)))) * 1
resp = `${htki} Sin pociones ${htka}\nNecesitas ${count - user.potion} poción 🥤 para curarte\n\nSalud » ${user.health} ❤️\nPoción» ${user.potion} 🥤\nCompra poción o pídele a alguien que te transfiera\n\n*Poción baja?*\n\nComprar poción use:\n${usedPrefix}buy potion ${count - user.potion} 🥤\nPide ayuda así:\n📣${usedPrefix}pedirayuda *Por Favor alguien ayudeme con ${count - user.potion} de POCION* 🥤\n\n*» Ayuda transfiriendo:*\n*${usedPrefix}transfer potion ${count - user.potion}* @${conn.getName(m.sender)}`.trim()
} else {
imagen = flaaa.getRandom()
user.potion -= count * 1 //1 potion = count (1) 
user.health += heal * count 
resp = `*━┈━《 ✅ Salud completa 》━┈━*\n\nUso exitoso de poción 🥤\n\n Quedan *${count}*  para recuperar su salud\n\𝚗Salud » ${user.health} ❤️\n\nSalud completada`
//conn.sendMessage(m.chat, {image:{url: imgr + ''}, caption: resp}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}, [[`𝙰𝚅𝙴𝙽𝚃𝚄𝚁𝙰𝚁 🏕️`, `${usedPrefix}adventure`]], m)
}
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 1));
txt += c;
count++;
if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
}
}
if (resp && imagen) {
return conn.sendMessage(m.chat, { image: {url: imagen}, caption: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});
} else {
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
}
handler.help = ['heal']
handler.tags = ['rpg']
handler.command = /^(heal|curar)$/i
export default handler
function isNumber(number) {
if (!number) return number
number = parseInt(number)
return typeof number == 'number' && !isNaN(number)}
