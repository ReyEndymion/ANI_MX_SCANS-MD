const xpperlimit = 350 
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^buy/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender].exp / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender].exp >= xpperlimit * count) {
    global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender].exp -= xpperlimit * count
    global.db.data.bot[conn.user.jid].chats.groups[m.chat].users[m.sender].limit += count
    let resp = `
┌─「 *NOTA DE PAGO* 」
‣ *Compra nominal* : + ${count}💎 
‣ *Gastado* : -${xpperlimit * count} XP
└──────────────`
let txt = '';
let countl = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 1));
txt += c;
countl++;
if (countl % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
}
}

return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
} else {
    let resp = `❎ Lo siento, no tienes suficientes *XP* para comprar *${count}* Diamantes💎`
    let txt = '';
    let countl = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 1));
    txt += c;
    countl++;
    if (countl % 10 === 0) {
    await conn.sendPresenceUpdate('composing' , m.chat);
    }
    }

  return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
  }
}
handler.help = ['Buy', 'Buyall']
handler.tags = ['xp']
handler.command = ['buy1', 'buyall'] 

handler.disabled = false

export default handler
