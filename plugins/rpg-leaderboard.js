let handler = async (m, { conn, args, participants }) => {
let users = Object.entries(global.db.data.users).map(([key, value]) => {
return {...value, jid: key}})
let sortedExp = users.map(toNumber('exp')).sort(sort('exp'))
let sortedLim = users.map(toNumber('limit')).sort(sort('limit'))
let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
let usersExp = sortedExp.map(enumGetKey)
let usersLim = sortedLim.map(enumGetKey)
let usersLevel = sortedLevel.map(enumGetKey)
let len = args[0] && args[0].length > 0 ? Math.min(100, Math.max(parseInt(args[0]), 5)) : Math.min(5, sortedExp.length)
let resp = `
*< TABLA DE CLASIFICACION >*
    
▢ *TOP ${len} XP* •
Tú : *${usersExp.indexOf(m.sender) + 1}* de *${usersExp.length}*

${sortedExp.slice(0, len).map(({ jid, exp }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *${exp} Exp*`).join`\n`}

▢ *TOP ${len} DIAMANTES💎* •
Tú : *${usersLim.indexOf(m.sender) + 1}* de *${usersLim.length}*

${sortedLim.slice(0, len).map(({ jid, limit }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *${limit} Diamantes*`).join`\n`}

▢ *TOP ${len} NIVEL* • 
Tú : *${usersLevel.indexOf(m.sender) + 1}* de *${usersLevel.length}*

${sortedLevel.slice(0, len).map(({ jid, level }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *Nivel ${level}*`).join`\n`}

_Diseño By FG, naturalizacion by ${author}_`.trim()
  //m.reply(text, null, { mentions: conn.parseMention(text) })
  let txt = '';
  let count = 0;
  for (const c of resp) {
      await new Promise(resolve => setTimeout(resolve, 5));
      txt += c;
      count++;
  
      if (count % 10 === 0) {
          conn.sendPresenceUpdate('composing' , m.chat);
      }
  }
      await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
  }
handler.help = ['top']
handler.tags = ['xp']
handler.command = ['leaderboard', 'lb'] 



handler.fail = null
handler.exp = 0

export default handler

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return {...b[i], [property]: a[property] === undefined ? _default : a[property]}
  }
  else return a => a === undefined ? _default : a
}

function enumGetKey(a) {
  return a.jid
}
