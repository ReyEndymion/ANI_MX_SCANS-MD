export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, participants}) {
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
 let owners = global.owner.filter(entry => typeof entry[0] === 'string' && !isNaN(entry[0])).map(entry => ({ jid: entry[0] }));
 let espadm = global.espadmins.filter(entry => typeof entry[0] === 'string' && !isNaN(entry[0])).map(entry => ({ jid: entry[0] }));
 let ow = owners.map(toNumber('')).sort(sort(''))
 let creators = ow.slice(0).map(({jid}) => `${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]}`).join` y `
 let adms = espadm.map(toNumber('')).sort(sort(''))
 let adm = `${adms.slice(0).map(({jid}) => `${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]}`).join`, `}`
 let sender = `@${m.sender.split`@`[0]}`;
 
 if (m.isBaileys && m.fromMe) return !0
 if (m.isGroup) return !1
 if (adm.includes(sender)) return !0
 if (!m.message) return !0
    if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('jadibot') || m.text.includes('deletebot') || m.text.includes('stop') || m.text.includes('estado'))
       return !0
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    let ban = `Hola *@${m.sender.split`@`[0]}*, está prohibido hablar al privado del bot serás bloqueado.\nDudas con *${creators}\n Para los jadibots aqui solo se pueden usar los comandos jadibot/serbot, deletebot, stop y estado \n\n El grupo para usar el bot es : https://chat.whatsapp.com/DpcgpFF2RO16wFG9SlZemG`
    if (bot.antiPrivate && !isOwner && !isROwner) {
       await m.reply(ban, false, { mentions: conn.parseMention(ban) })
       await this.updateBlockStatus(m.chat, 'block')
    }
    return !1
}
