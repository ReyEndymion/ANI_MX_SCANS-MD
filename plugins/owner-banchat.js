/*
let handler = async (m, {conn}) => {
  let chat = global.db.data.chats[m.chat]
  let response = ''
  let who = m.mentionedJid[0]? conn.user.jid : conn.user.jid
  if (m.isGroup && !m.mentionedJid.includes(conn.user.jid) return
  if (m.isGroup && m.mentionedJid.includes(conn.user.jid) || m.fromMe) {
    chat.isBanned = true
  response = `*[❗INFO❗] ESTE CHAT FUE BANEADO PARA QUE @${who.split`@`[0]} NO RESPONDA EN ESTE CHAT\n\n*—◉ LOS BOTS BANEADOS NO RESPONDERÁN A NINGÚN COMANDO HASTA QUE SEAN DESBANEADOS*`
    } else if (!m.isGroup && !m.mentionedJid.includes(conn.user.jid) && !m.quoted) {
      chat.isBanned = true
  response = `*[❗INFO❗] ESTE CHAT FUE BANEADO CON EXITO*\n\n*—◉ EL BOT NO REACCIONARA A NINGUN COMANDO HASTA DESBANEAR ESTE CHAT*`
    }
    if (response !== '' && m.mentionedJid && m.mentionedJid[0] === conn.user.jid) {
      let txt = '';
      let count = 0;
      for (const c of response) {
        await new Promise(resolve => setTimeout(resolve, 50));
        txt += c;
        count++;
        if (count % 10 === 0) {
          conn.sendPresenceUpdate('composing', m.chat);
        }
      }
  await conn.sendMessage(m.chat, { text: response.trim(), mentions: conn.parseMention(response) }, {quoted: m}, { disappearingMessagesInChat: 1 * 1000} );
    }
}  
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = /^banchat$/i
handler.owner = true
export default handler
*/
let handler = async (m, {conn, isROwner}) => {
global.db.data.chats[m.chat].isBanned = true
  let resp = '*[❗INFO❗] ESTE CHAT FUE BANEADO CON EXITO*\n\n*—◉ EL BOT NO REACCIONARA A NINGUN COMANDO HASTA DESBANEAR ESTE CHAT*'
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
      return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
handler.help = ['banchat']

handler.tags = ['owner']

handler.command = /^banchat$/i
handler.owner = true
export default handler
