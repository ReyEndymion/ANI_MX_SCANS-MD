export async function before(m, {conn, start, info, isAdmin, isBotAdmin, text, botdb, chatdb, userdb, db, senderJid}) {
const { default: path } = await import('path');
const { default: fs } = await import('fs')
let linkRegex = /https:/i
let { owner, temp, newsletterID, sBroadCastID, groupID, media} = await import('../config.js')
if (m.isBaileys && m.fromMe)
return !0
if (!m.isGroup) return !1
let settings = botdb.settings || {}
let delet = m.key.participant
let bang = m.key.id
const isGroupLink = linkRegex.exec(m.text)
if (chatdb.antiLink2 && isGroupLink) {
if (!settings.restrict) {
return conn.sendWritingText(m.chat, `*[❗INFO❗] EL PROPIETARIO DEL BOT NO TIENE HABILITADO LAS RESTRICCIONES (#_enable restrict_) CONTACTE CON EL PARA QUE LO HABILITE*`, null)
} else {
if (isBotAdmin) {
const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
const linkThisGroup2 = `https://www.youtube.com/`
const linkThisGroup3 = `https://youtu.be/`
if (m.text.includes(linkThisGroup)) return !0
if (m.text.includes(linkThisGroup2)) return !0
if (m.text.includes(linkThisGroup3)) return !0
if (m.fromMe) return
if (isAdmin) return conn.sendWritingText(m.chat, `*😎 Salvado, usted @${senderJid.split('@')[0]} es administrador!*`, null)

await conn.deleteMessage(m.chat, { remoteJid: m.chat, fromMe: false, id: bang, participant: delet })
const resp = `*「 ANTI LINKS GENERAL 」*\n*HASTA LA VISTA BABY 👋, ${await this.getName(senderJid)} ROMPISTES LAS REGLAS DEL GRUPO, SERAS EXTERMINADO...!!*${isBotAdmin ? '' : '\n\n'}`
const buff = info.nanipe
const buttons = [['DESACTIVAR ANTILINKS', `/disable antilink2`]]
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')

if (start.buttons) {
const config = {
body: resp,
footer: buff
}
await conn.sendButton( m.chat, config, null, buttons, m)
} else {
await conn.sendWritingText(m.chat, resp+'\n'+cmds+'\n'+buff, null );
}
return conn.groupParticipantsUpdate(m.chat, [senderJid], 'remove')
} else return conn.sendWritingText(m.chat, `*[❗INFO❗] EL BOT NO ES ADMIN, NO PUEDE EXTERMINAR A LAS PERSONAS*`, null)
}

if (isBotAdmin && settings.restrict) {
}
}
}
export const menuInfo = {
help: `Elimina numeros que realizan spam de enlaces de otros grupos o que simplemente no se permiten en el grupo\nUsar asi para habilitar: *usedPrefixenable antilink*\nUsar asi para deshabilitar: *usedPrefixdisable antilink*`,
info: `━━━━━━━━━━━━━━━━━━━━
┣ *👑 ENABLE aNTILINK2*: usedPrefixenable antilink2
━━━━━━━━━━━━━━━━━━━━
┣ *👑 DISABLE aNTILINK2*: usedPrefixdisable antilink2
`,
type: 'enable',
chat: `grupos`
}
