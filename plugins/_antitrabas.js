//
//By @NeKosmic || https://github.com/NeKosmic/
//

export async function before(m, { conn, start, info, isAdmin, isBotAdmin, usedPrefix, botdb, chatdb , db, userdb, senderJid}) {
if (m.isBaileys && m.fromMe)
return !0
if (!m.isGroup) return !1
let settings = botdb.settings || {}
let delet = m.key.participant
let bang = m.key.id
let name = await conn.getName(m.sender)
let fakemek = {key: {participant: senderJid,"remoteJid": senderJid},"message": {"groupInviteMessage": {"groupJid": m.chat,"inviteCode": "m","groupName": conn.getName(m.chat), "caption": info.nanipe, 'jpegThumbnail': null}}}
let resp = '', eliminado
if (chatdb.antiTraba && m.text.length > 2000) {
if (!settings.restrict) {return conn.sendWritingText(m.chat, '[ ! ] Para realizar acciones de eliminación, mi dueño tiene que encender el modo restringido!', userdb, m)
} else {
if (isBotAdmin) {
if (isAdmin) return conn.sendWritingText(m.chat, `El administrador @${senderJid.split("@")[0]} acaba de enviar un texto que contiene muchos caracteres -.-!`, userdb, fakemek)
eliminado = true
await conn.deleteMessage(m.chat, { remoteJid: m.chat, fromMe: false, id: bang, participant: delet })
resp = `*[ ! ] Se detecto un mensaje que contiene muchos caracteres [ ! ]*\n`
await conn.sendWritingText(m.chat, resp, userdb, m );
setTimeout(() => { 
resp = `Marcar el chat como leido ✓\n${"\n".repeat(400)}\n=> El número : wa.me/${senderJid.split("@")[0]}\n=> Alias : ${name}\n[ ! ] Acaba de enviar un texto que contiene muchos caracteres que puede ocasionar fallos en los dispositivos`
conn.sendWritingText(m.chat, resp, userdb, m );
}, 0)
setTimeout(() => { 
conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}, 1000)
} else {
if (!isBotAdmin && settings.restrict) {
resp = `*[ ! ] Se detecto un mensaje que contiene muchos caracteres [ ! ]... Pero, no soy administrador, no puedo hacer nada 😕*\n${isBotAdmin ? '' : ''}`
return conn.sendWritingText(m.chat, resp, userdb, m );
}
resp = 'No soy administrador, no puedo hacer nada 😕'
return conn.sendWritingText(m.chat, resp, userdb, m );
}
const buff = info.nanipe
const buttons = [['DESACTIVAR ANTI TRABAS ]', '/disable antitraba']]
if (eliminado) {
if (start.buttons) {
await conn.sendButton( m.chat, resp, buff, buttons, fakemek, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
await conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+buff, userdb, fakemek );
}
} else {
return conn.sendWritingText(m.chat, resp, userdb, m );
}
}
}
return !0
}
export const menuInfo = {
help: `Elimina del grupo usuarios que han mandado hipertextos capaces de trabar un chat de manera automatica, se usa para habilitar asi: *usedPrefixenable antitrabas`,
info: `━━━━━━━━━━━━━━━━━━━━
┣ *👑 ENABLE ANTIARABES*: usedPrefixenable antitrabas
━━━━━━━━━━━━━━━━━━━━
`,
type: 'enable',
chat: `grupos`
}
