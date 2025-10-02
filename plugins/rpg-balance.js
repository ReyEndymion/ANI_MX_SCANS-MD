let handler = async (m, {conn, info, start, usedPrefix, usersdb, userdb, senderJid}) => {	
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : senderJid
else who = senderJid
let name = who.split`@`[0]
let resp = `
┌───⊷ *BALANCE* ⊶
▢ *Nombre:* @${name}
▢ *Diamantes:* ${usersdb[who].limit}💎
└──────────────
*NOTA:* 
*Puedes comprar diamantes 💎 usando los comandos*
❏ *${usedPrefix}buy <cantidad>*
❏ *${usedPrefix}buyall*`
const buttons = [[`🎒 inventario`, `${usedPrefix}inventory`], [`👝 cartera`, `${usedPrefix}cartera`], ['💎 diamantesXcantidad', `${usedPrefix}buy`], ['comprar todo', `${usedPrefix}buyall`]]
if (start.buttons) {
const msgObj = {
text: resp,
footer: info.nbcde
}
return conn.sendButton(m.chat, msgObj, {url: img}, buttons, userdb, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendImageWriting(m.chat, img, resp, userdb, m)
}

await conn.sendWritingText(m.chat, txt, userdb, m);
}
handler.help = ['bal']
handler.tags = ['xp']
handler.command = ['bal', 'diamantes', 'diamond', 'balance'] 
handler.menu = [
{title: "💰 BALANCE", description: `Consulta tu balance actual, usa el comando #bal`, id: `balance`},
];
handler.type = "rpg";
handler.disabled = false;

export default handler
