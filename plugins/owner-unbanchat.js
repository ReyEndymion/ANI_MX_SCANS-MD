/*
let handler = async (m, {conn}) => {
    let chat = global.db.data.bot[conn.user.jid].chats[m.chat]
    let response = ''
    let who = m.mentionedJid[0]? conn.user.jid : global.conn.user.jid
    if (m.isGroup && m.mentionedJid.includes(conn.user.jid)) {
      chat.isBanned = false
    response = `*[❗INFO❗] ESTE CHAT FUE DESBANEADO PARA QUE @${who.split`@`[0]} RESPONDA EN ESTE CHAT\n\n*—◉ LOS BOTS DESBANEADOS RESPONDERÁN A TODOS LOS COMANDOS HASTA QUE SEAN BANEADOS*`
      } else {
        chat.isBanned = false
        response = `*[❗INFO❗] ESTE CHAT FUE DESBANEADO CON EXITO*\n\n*—◉ EL BOT REACCIONARA A TODOS LOS COMANDO HASTA BANEAR ESTE CHAT*`
      }
      if (response !== '' && m.mentionedJid && m.mentionedJid[0] === conn.user.jid) {
        let txt = '';
        let count = 0;
        for (const c of response) {
          await new Promise(resolve => setTimeout(resolve, 50));
          txt += c;
          count++;
          if (count % 10 === 0) {
           await conn.sendPresenceUpdate('composing', m.chat);
          }
        }
    await conn.sendMessage(m.chat, { text: response.trim(), mentions: conn.parseMention(response) }, {quoted: m}, { disappearingMessagesInChat: 1 * 1000} );
      }
  }  
handler.help = ['unbanchat']
handler.tags = ['owner']
handler.command = /^unbanchat$/i
handler.owner = true
export default handler
*/
let handler = async (m, {conn, isROwner, isOwner}) => {
let bot = global.db.data.bot[conn.user.jid] || {}
const chats = bot.chats || {}
const privs = chats.privs || {}
const groups = chats.groups || {}
let chat, users, user, resp
if (m.chat.endsWith(userID)) {
chat = privs[m.chat] || {}
user = privs[m.sender] || {}
} else if (m.chat.endsWith(groupID)) {
chat = groups[m.chat] || {}
users = chat.users || {}
user = users[m.sender] || {}
} else return

try {
if (isROwner || isOwner || conn.user.jid) {
chat.isBanned = false
resp = '*[❗INFO❗] ESTE CHAT FUE DESBANEADO CON EXITO*'
}
} catch (error) {
resp = `Error: ${error}`
}
  let txt = '';
  let count = 0;
  if (resp === undefined) return
  for (const c of resp) {
      await new Promise(resolve => setTimeout(resolve, 15));
      txt += c;
      count++;
  
      if (count % 10 === 0) {
         await conn.sendPresenceUpdate('composing' , m.chat);
      }
  }
      return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
handler.help = ['unbanchat']
handler.tags = ['owner']
handler.command = /^unbanchat$/i
handler.owner = true
export default handler
