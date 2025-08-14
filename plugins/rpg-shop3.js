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
┃ *Compra Efectuada* : +${count} 𝙏𝙊𝙆𝙀𝙉(𝙎) 🪙 
┃ *Ha Gastado* :-${diamantetk * count} 𝘿𝙄𝘼𝙈𝘼𝙉𝙏𝙀𝙎 💎
╰━〔 *𓃠 ${info.nanie}* 〕━⬣`.trim()

const buff = info.nanie
const buttons = [['💎 𝘾𝙤𝙢𝙥𝙧𝙖𝙧 𝙓50', `${usedPrefix}buy3 50`], ['💎 𝘾𝙤𝙢𝙥𝙧𝙖𝙧 𝙓100', `${usedPrefix}buy3 100`], ['💎 𝘾𝙤𝙢𝙥𝙧𝙖 𝘼𝙗𝙨𝙤𝙡𝙪𝙩𝙖', `${usedPrefix}buyall3`]]
if (start.buttons) {
await conn.sendHydrated(m.chat, resp, buff, null, info.repoProyect, info.nanie, null, null, buttons, m,)
return conn.sendButton( m.chat, resp, buff + info.nanie, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+info.nanie, m );
}

} else {
const resp = `❎ *Lo siento, no tienes sufucientes 𝘿𝙄𝘼𝙈𝘼𝙉𝙏𝙀𝙎 💎 para comprar ${count} 𝙏𝙊𝙆𝙀𝙉(𝙎)* 🪙\n\n*Le recomiendo que interactúe con ${info.nanie} para Obtener Tokens, puede ver sus tokens con el comando ${usedPrefix}cartera o ${usedPrefix}wallet*`
const buff = info.nanie
const buttons = [
['Volver al menú ☘️', `${usedPrefix}menu`],
]
if (start.buttons) {
await conn.sendHydrated(m.chat, resp, info.nanie, null, ig, '𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢', null, null, buttons, m,)
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
