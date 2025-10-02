let handler = async (m, {conn, start, info, args, usedPrefix, pluginsPath, userdb, db, senderJid}) => {
let resp, imagen
const { isNumber } = await import('../lib/functions.js')
const { rpg, rpgg } = await import('../rpg.js')
const { join } = await import('path')
const {menuform, flaaa} = await import('../lib/constants.js')
const { promises } = await import('fs')
const { owner, temp, newsletterID, sBroadCastID, groupID, media} = await import('../config.js')
const heal = 40 + (userdb.gato * 4)
let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0]) || Math.round((90 - userdb.health) / heal)))) * 1
if (userdb.health >= 100) {
const resp = `Tu salud está llena ❤️\n\nSalud: ${userdb.health}%\n\n`
const buff = info.nanipe
const buttons = [
[`🏕️ AVENTURAR`, `${usedPrefix}adventure`], [`ACTUALIZAR MI NIVEL ${rpgg.emoticon('level')}`, `${usedPrefix}nivel`]]
if (start.buttons) {
return conn.sendButton( m.chat, {text: resp, footer: buff}, {}, buttons, userdb, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanipe, m );
}
} else if (userdb.potion < count) {
const resp = `${menuform.htki} Sin pociones ${menuform.htka}\nNecesitas ${count - userdb.potion} poción 🥤 para curarte\n\nSalud » ${userdb.health} ❤️\nPoción» ${userdb.potion} 🥤\nCompra poción o pídele a alguien que te transfiera\n\n*Poción baja?*\n\n`.trim()
const buff = `NIVEL ACTUAL: *${userdb.level}*\n` + info.nanipe
const buttons = [[`Comprar poción 🥤`, `${usedPrefix}buy potion ${count - userdb.potion}`],
[`Pedir ayuda ☘️`, `${usedPrefix}pedirayuda *Por Favor alguien ayudeme con ${count - userdb.potion} de POCION* 🥤 
*» AYUDA TRANSFIRIENDO:*
*${usedPrefix}transfer potion ${count - userdb.potion}* @${conn.getName(senderJid)}`]]
if (start.buttons) {
return conn.sendButton( m.chat, {text: resp, footer: buff}, {}, buttons, userdb, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanipe, m );
}
} else {
imagen = flaaa.getRandom()
userdb.potion -= count * 1 
userdb.health += heal * count 
const resp = `*━┈━《 ✅ Salud completa 》━┈━*\n\nUso exitoso de poción 🥤\n\n Quedan *${count}* para recuperar su salud\n\nSalud » ${userdb.health} ❤️\n\nSalud completada`
const buff = info.nanipe
const buttons = [
[`🏕️ AVENTURAR`, `${usedPrefix}adventure`], [`ACTUALIZAR MI NIVEL ${rpgg.emoticon('level')}`, `${usedPrefix}nivel`]]
if (start.buttons) {
return conn.sendButton( m.chat, {text: resp, footer: buff}, {url: imagen}, buttons, userdb, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendImageWriting(m.chat, imagen, resp+'\n'+cmds+'\n'+info.nanipe, m );
}
}
}
handler.help = ['heal']
handler.tags = ['rpg']
handler.command = /^(heal|curar)$/i
handler.menu = [
{title: "❤️ CURAR", description: `Usa pociones para curarte, usa el comando #heal`, id: `heal`},
];
handler.type = "rpg";
handler.disabled = false;

export default handler
