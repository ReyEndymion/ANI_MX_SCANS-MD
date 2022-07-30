export function before(m) {
    let user = global.db.data.users[m.sender]
    if (user.afk > -1) {
        m.reply(`
  *[❗INFO❗] DEJASTE DE ESTAR INACTIVO (AFK)${user.afkReason ? ' DESPUES DE ESTAR INACTIVO (AFK) POR EL MOTIVO: ' + user.afkReason : ''}*
  
  *—◉ TIEMPO DE INACTIVIDAD (AFK): ${(new Date - user.afk).toTimeString()}*
  `.trim())
        user.afk = -1
        user.afkReason = ''
    }
    let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    for (let jid of jids) {
        let user = global.db.data.users[jid]
        if (!user)
            continue
        let afkTime = user.afk
        if (!afkTime || afkTime < 0)
            continue
        let reason = user.afkReason || ''
        m.reply(`*[❗] NO LO ETIQUETES [❗]*

*—◉ EL USUARIO QUE USTED ETIQUETO ESTA INACTIVO (AFK)*      
*—◉ ${reason ? 'MOTIVO DE INACTIVIDAD (AFK): ' + reason : 'MOTIVO DE INACTIVIDAD (AFK): _EL USUARIO NO ESPECIFICO UN MOTIVO_'}*
*—◉ TIEMPO TRANSCURRIDO DE INACTIVIDAD (AFK): ${(new Date - afkTime).toTimeString()}*
  `.trim())
    }
    return true
}
