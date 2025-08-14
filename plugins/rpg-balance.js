let handler = async (m, {conn, usedPrefix, usersdb, db, userdb, senderJid}) => {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : senderJid
else who = senderJid
let name = who.split`@`[0]//conn.getName(who) 
let resp = `
┌───⊷ *BALANCE* ⊶
▢ *Nombre:* @${name}
▢ *Diamantes:* ${usersdb[who].limit}💎
└──────────────
*NOTA:* 
*Puedes comprar diamantes 💎 usando los comandos*
❏ *${usedPrefix}buy <cantidad>*
❏ *${usedPrefix}buyall*`
return conn.sendWritingText(m.chat, resp, m );
}
handler.help = ['bal']
handler.tags = ['xp']
handler.command = ['bal', 'diamantes', 'diamond', 'balance'] 
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
