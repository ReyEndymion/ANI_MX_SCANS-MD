import { join } from 'path' 
import { promises } from 'fs'
import { owner, temp, newsletterID, sBroadCastID, groupID, media} from '../config.js'
import { isNumber } from '../lib/functions.js'
import { rpg, rpgg } from '../rpg.js'
let handler = async (m, {conn, start, info, args, usedPrefix, pluginsPath, userdb, db, senderJid}) => {
if (userdb.health >= 100) {
const resp = `Tu salud está llena ❤️\n\nSalud: ${userdb.health}%\n\n`
const buff = info.nanie
const buttons = [
[`🏕️ AVENTURAR`, `${usedPrefix}adventure`], [`ACTUALIZAR MI NIVEL ${rpgg.emoticon('level')}`, `${usedPrefix}nivel`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanie, m );
}
} else if (userdb.potion < count) {
const heal = 40 + (userdb.gato * 4)
let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0]) || Math.round((90 - userdb.health) / heal)))) * 1
const resp = `${htki} Sin pociones ${htka}\nNecesitas ${count - userdb.potion} poción 🥤 para curarte\n\nSalud » ${userdb.health} ❤️\nPoción» ${userdb.potion} 🥤\nCompra poción o pídele a alguien que te transfiera\n\n*Poción baja?*\n\n`.trim()
const buff = `NIVEL ACTUAL: *${userdb.level}*\n` + info.nanie
const buttons = [[`Comprar poción 🥤`, `${usedPrefix}buy potion ${count - userdb.potion}`],
[`Pedir ayuda ☘️`, `${usedPrefix}pedirayuda *Por Favor alguien ayudeme con ${count - userdb.potion} de POCION* 🥤 
*» AYUDA TRANSFIRIENDO:*
*${usedPrefix}transfer potion ${count - userdb.potion}* @${conn.getName(senderJid)}`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanie, m );
}
} else {
imagen = flaaa.getRandom()
userdb.potion -= count * 1 //1 potion = count (1) 
userdb.health += heal * count 
const resp = `*━┈━《 ✅ Salud completa 》━┈━*\n\nUso exitoso de poción 🥤\n\n Quedan *${count}* para recuperar su salud\n\𝚗Salud » ${userdb.health} ❤️\n\nSalud completada`
const buff = info.nanie
const buttons = [
[`🏕️ AVENTURAR`, `${usedPrefix}adventure`], [`ACTUALIZAR MI NIVEL ${rpgg.emoticon('level')}`, `${usedPrefix}nivel`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendImageWriting(m.chat, imagen, resp+'\n'+cmds+'\n'+info.nanie, m );
}
}
}
handler.help = ['heal']
handler.tags = ['rpg']
handler.command = /^(heal|curar)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
