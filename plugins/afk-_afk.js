export async function before(m, {conn, db, chatdb, usersdb, userdb, senderJid}) {
if (!m.isGroup) return !1
if (userdb.afk > -1) {
let resp = `
*[❗INFO❗] DEJASTE DE ESTAR INACTIVO (AFK)${userdb.afkReason ? ' DESPUES DE ESTAR INACTIVO (AFK) POR EL MOTIVO: ' + userdb.afkReason : ''}*

*—◉ TIEMPO DE INACTIVIDAD (AFK): ${(new Date - userdb.afk).toTimeString()}*
`.trim()
await conn.sendWritingText(m.chat, resp, userdb, m);

userdb.afk = -1
userdb.afkReason = ''
}
let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
for (let jid of jids) {
let user = usersdb[jid]
if (!user)
continue
let afkTime = userdb.afk
if (!afkTime || afkTime < 0)
continue
let reason = userdb.afkReason || ''
let resp = `*[❗] NO LO ETIQUETES [❗]*

*—◉ EL USUARIO QUE USTED ETIQUETO ESTA INACTIVO (AFK)*
*—◉ ${reason ? 'MOTIVO DE INACTIVIDAD (AFK): ' + reason : 'MOTIVO DE INACTIVIDAD (AFK): _EL USUARIO NO ESPECIFICO UN MOTIVO_'}*
*—◉ TIEMPO TRANSCURRIDO DE INACTIVIDAD (AFK): ${(new Date - afkTime).toTimeString()}*
`.trim()
return conn.sendWritingText(m.chat, resp, userdb, m);
}
return true
}
