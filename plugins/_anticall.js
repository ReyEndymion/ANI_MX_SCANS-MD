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
    
export async function callUpdate(callUpdate, conn,  isAdmin, isBotAdmin, isOwner, isROwner, participants) {
    let isAnticall = global.db.data.settings[this.user.jid].antiCall
	//console.log(some())
    if (!isAnticall) return
    for (let nk of callUpdate) {
    let owners = global.owner.filter(entry => typeof entry[0] === 'string' && !isNaN(entry[0])).map(entry => ({ jid: entry[0] }));
    //let own = owners.map(toNumber('')).sort(sort(''))
    //let ow = own.slice(0).map(({jid}) => `${participants.some(nk => jid === nk.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]}`).join` y `
    //if (global.antiblock.map(v => v + '@s.whatsapp.net').includes(m.sender)) return !0
    if (nk.isGroup == false) {
    if (nk.status == "offer") {
    let callmsg =  `Hola *@${nk.from.split('@')[0]}*, las ${nk.isVideo ? 'videollamadas' : 'llamadas'} no están permitidas, serás bloqueado.\n-\nSi accidentalmente llamaste póngase en contacto con mi creador ${owners.from.split('@')[0]} para que te desbloquee!`
    await this.reply(nk.from, callmsg, false, { mentions: this.parseMentions(callmsg) })
    //let data = global.owner.filter(([id, isCreator]) => id && isCreator)
    //await this.sendContact(nk.from, data.map(([id, name]) => [id, name]), false, { quoted: callmsg })
    await this.updateBlockStatus(nk.from, 'block')
    }
    }
    }
}