const xpperlimit = 330
import { owner, temp, newsletterID, sBroadCastID, groupID, media} from '../config.js'
let handler = async (m, {conn, start, info, command, args, usedPrefix, userdb, db, senderJid}) => {
let count = command.replace(/^buy2/i, '')
count = count ? /all/i.test(count) ? Math.floor(userdb.money / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
count = Math.max(1, count)
if (userdb.money >= xpperlimit * count) {
userdb.money -= xpperlimit * count
userdb.limit += count
//conn.sendWritingText(m.chat, `
const resp = `
╭━〔 *DATOS DE COMPRA* 〕━⬣
┃ *Compra Efectuada* : +${count} 💎 
┃ *Ha Gastado* :-${xpperlimit * count} ${info.nanie}COINS
╰━〔 *${info.nanie}* 〕━⬣`.trim()

const buff = info.nanie
const buttons = [['💵 Comprar X10', `${usedPrefix}buy2 10`], ['💸 Comprar X20', `${usedPrefix}buy2 20`], ['⚡ Comprar con Experiencia', `${usedPrefix}buy`]]
if (start.buttons) {
await conn.sendHydrated(m.chat, resp, buff, null, info.repoProyect, info.nanie, null, null, buttons, m,)
return conn.sendButton( m.chat, resp, buff + info.nanie, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanie, m );
}
} else {
const resp = `❎ *Lo siento, no tienes sufucientes ${info.nanie}COINS para comprar ${count} Diamantes* 💎\n\n*Le recomiendo que interactúe con ${info.nanie} para Obtener aniCoins, puede ver sus aniCoins con el comando:\n${usedPrefix}anicoins o ${usedPrefix}experiencia.\n También puede comprar con su Experiencia con el Comando:\n${usedPrefix}buy*`
const buff = info.nanie
const buttons = [
[`${ansicon} Comprar con Experiencia'`, `${usedPrefix}buy`],
['Volver al menú ☘️', `${usedPrefix}menu`]
]
if (start.buttons) {
await conn.sendHydrated(m.chat, resp, info.nanie, null, ig, 'Instagram', null, null, buttons, m,)
return conn.sendButton( m.chat, resp, buff + info.nanie, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
//conn.sendWritingText(m.chat, `o tienes suficientes *XP* para comprar *${count}* Diamantes💎`, userdb, m)
return conn.sendWritingText(m.chat, resp+'\n'+buff+'\n'+cmds+'\n'+info.nanie, m );
}
}
}
handler.help = ['Buy', 'Buyall']
handler.tags = ['xp']
handler.command = ['buy2', 'buyall2'] 
handler.disabled = false
handler.menu = [];
handler.type = "";

export default handler
/*
*/
