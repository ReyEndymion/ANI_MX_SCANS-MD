let handler = async (m, {conn, usedPrefix}) => {	
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
else who = m.sender
let name = who.split`@`[0]//conn.getName(who) 
let resp = `
┌───⊷ *BALANCE* ⊶
▢ *Nombre:* @${name}
▢ *Diamantes:* ${global.db.data.users[who].limit}💎
└──────────────
*NOTA:* 
*Puedes comprar diamantes 💎 usando los comandos*
❏ *${usedPrefix}buy <cantidad>*
❏ *${usedPrefix}buyall*`
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
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
handler.help = ['bal']
handler.tags = ['xp']
handler.command = ['bal', 'diamantes', 'diamond', 'balance'] 
export default handler
