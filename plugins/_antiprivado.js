export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, participants, botdb, chatdb, db, userdb, senderJid}) {
const { owner, info, newsletterID, sBroadCastID, media } = await import('../config.js')
if (m.isGroup) return !0
if (m.chat == sBroadCastID || m.chat.endsWith(newsletterID)) return !0
if (m.isBaileys && m.fromMe) return !0
if (!m.message) return !0
let settings = botdb.settings || {}
let sender = senderJid.split`@`[0];
let creators = owner.filter(entry => typeof entry[0] === 'string' && !isNaN(entry[0])).map(entry => ({ jid: entry[0] })).slice(0).map(({jid}) => `${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]}`).join` y `
//console.log('esto da lo que elegi: ', senderJid + '\n\n'+ adm)
const regexp = /(reporte|piedra|papel|tijera|serbot|jadibot|deletebot|stop|codetoken)/i;
const containsWord = regexp.test(m.text);
if (containsWord || (m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Abre este enlace'))) return !0
let ban = `Hola *@${sender}*, está prohibido hablar al privado del bot serás bloqueado.\nDudas con *${creators}\n Para los jadibots aqui solo se pueden usar los comandos jadibot/serbot, deletebot, stop y estado \n\n El grupo para usar el bot es:\n\n${info.ganicmd}`
if (settings.antiPrivate && !isOwner && !isROwner) {
await conn.sendWritingText(m.chat, ban, userdb, m);
return conn.updateBlockStatus(m.chat, 'block');
}

}
export const menuInfo = {
help: `Si se activa esta configuracion, es capaz de bloquear a usuarios que no tienen permiso para usar el bot en su privado\nUsar asi para habilitar: *usedPrefixenable antiprivado*\nUsar asi para deshabilitar: *usedPrefixdisable antiprivado*`,
info: `━━━━━━━━━━━━━━━━━━━━
┣ *👑 ENABLE ANTIPRIVADO*: usedPrefixenable antiprivado
━━━━━━━━━━━━━━━━━━━━
┣ *👑 DISABLE ANTIPRIVADO*: usedPrefixdisable antiprivado
`,
type: 'enable',
chat: `privados`
}