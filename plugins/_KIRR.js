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
let handler = async (m, { conn, text, participants }) => {
//let mentionedJid = [m.sender]
//let name = m.fromMe ? conn.user : conn.contacts[m.sender]
let owners = global.owner.filter(entry => typeof entry[0] === 'string' && !isNaN(entry[0])).map(entry => ({ jid: entry[0] }));
let lenins = global.lenin.filter(entry => typeof entry[0] === 'string' && !isNaN(entry[0])).map(entry => ({ jid: entry[0] }));
let espadm = global.espadmins.filter(entry => typeof entry[0] === 'string' && !isNaN(entry[0])).map(entry => ({ jid: entry[0] }));
     let ow = owners.map(toNumber('')).sort(sort(''))
     let yos = lenins.map(toNumber('')).sort(sort(''))
     let adm = espadm.map(toNumber('')).sort(sort(''))
     //if (/^Quién eres\?$/.test(m.text)) {
      let resp = `K.I.R.R. la inteligencia artificial programada por ${ow.slice(0).map(({jid}) => `${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]}`).join` y `}`.trim()
  
      await conn.sendPresenceUpdate('composing' , m.chat);

      let txt = '';
    for (const c of resp) {
        await new Promise(resolve => setTimeout(resolve, 100));
        txt += c;
    }

      await conn.sendPresenceUpdate('composing' , m.chat);
    await conn.sendMessage(m.chat, { text: txt, mentions: conn.parseMention(txt) }, { quoted: m});
  
      // Mostrar estado de "disponible"
      //await conn.sendPresenceUpdate(m.chat, 'available');
  //}
  
}
 handler.customPrefix = /Quién eres?/i
handler.command = new RegExp
export default handler
