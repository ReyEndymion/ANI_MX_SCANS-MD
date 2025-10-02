
export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, chatdb, botdb, userdb , db, senderJid}) {
const toxicRegex = /puto|puta|rata|estupido|imbecil|rctmre|mrd|verga|vrga|maricon/i
if (m.isBaileys && m.fromMe)
return !0
if (!m.isGroup) return !1
let settings = botdb.settings || {}
const isToxic = toxicRegex.exec(m.text)

if (isToxic && chatdb.antiToxic && !isOwner && !isAdmin) {
userdb.warn += 1
if (!(user.warn >= 5)) {
let resp = `${userdb.warn == 1 ? `Hola *@${senderJid.split`@`[0]}*` : `*@${senderJid.split`@`[0]}*`}, decir la palabra (${isToxic}) está prohibido en este bot *${userdb.warn}/5* advertencia`
return conn.sendWritingText(m.chat, resp, userdb, m);
}
}

if (userdb.warn >= 5) {
userdb.warn = 0
let resp = `Hola *@${senderJid.split`@`[0]}*, superaste las 5 advertencias serás bloqueado y eliminado de este grupo`
await conn.sendWritingText(m.chat, resp, userdb, m);
userdb.banned = true
await conn.groupParticipantsUpdate(m.chat, [senderJid], 'remove')
return conn.updateBlockStatus(senderJid, 'block')
}
}
export const menuInfo = {
help: `Si esta activa esta configuracion, elimina usuarios groceros de grupos o que simplemente usan palabras ofensivas que no se permiten en el grupo\nUsar asi para habilitar: *usedPrefixenable antitoxic*\nUsar asi para deshabilitar: *usedPrefixdisable antitoxic*`,
info: `━━━━━━━━━━━━━━━━━━━━
┣ *👑 ENABLE ANTITOXIC*: usedPrefixenable antitoxic
━━━━━━━━━━━━━━━━━━━━
┣ *👑 DISABLE ANTITOXIC*: usedPrefixdisable antitoxic
`,
type: 'enable',
chat: `grupos`
}
