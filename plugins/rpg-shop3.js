import { owner, newsletterID, sBroadCastID, groupID, media} from '../config.js'
const diamantetk = 15
let handler = async (m, {conn, start, info, command, args, usedPrefix, userdb, db, senderJid}) => {
let count = command.replace(/^buy3|token|tokens/i, '')
count = count ? /all/i.test(count) ? Math.floor(userdb.limit / diamantetk) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
count = Math.max(1, count)
if (userdb.limit >= diamantetk * count) {
userdb.limit -= diamantetk * count
userdb.joincount += count
//conn.sendWritingText(m.chat, `
const resp = `
╭━〔 *DATOS DE COMPRA* 〕━⬣
┃ *Compra Efectuada* : +${count} TOKEN(S) 🪙 
┃ *Ha Gastado* :-${diamantetk * count} DIAMANTES 💎
╰━〔 *𓃠 ${info.nanie}* 〕━⬣`.trim()

const buff = info.nanie
const buttons = [['💎 Comprar 𝙓50', `${usedPrefix}buy3 50`], ['💎 Comprar 𝙓100', `${usedPrefix}buy3 100`], ['💎 Compra Absoluta', `${usedPrefix}buyall3`]]
if (start.buttons) {
await conn.sendHydrated(m.chat, resp, buff, null, info.repoProyect, info.nanie, null, null, buttons, m,)
return conn.sendButton( m.chat, resp, buff + info.nanie, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanie, m );
}

} else {
const resp = `❎ *Lo siento, no tienes sufucientes DIAMANTES 💎 para comprar ${count} TOKEN(S)* 🪙\n\n*Le recomiendo que interactúe con ${info.nanie} para Obtener Tokens, puede ver sus tokens con el comando ${usedPrefix}cartera o ${usedPrefix}wallet*`
const buff = info.nanie
const buttons = [
['Volver al menú ☘️', `${usedPrefix}menu`],
]
if (start.buttons) {
await conn.sendHydrated(m.chat, resp, info.nanie, null, ig, 'Instagram', null, null, buttons, m,)
return conn.sendButton( m.chat, resp, buff + info.nanie, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanie, m );
}
}
}
handler.help = ['Buy', 'Buyall']
handler.tags = ['xp']
handler.command = ['buy3', 'buyall3', 'token', 'comprar3','tokens'] 
handler.disabled = false
handler.menu = [];
handler.type = "";

export default handler
/*
*/
