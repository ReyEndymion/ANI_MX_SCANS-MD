export async function before(m, {conn, isAdmin, isBotAdmin, chatdb, botdb , db, userdb, senderJid}) {
let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
if (m.isBaileys && m.fromMe)
return !0
if (!m.isGroup) return !1
let settings = botdb.settings || {}

let delet = m.key.participant
let bang = m.key.id
const isGroupLink = linkRegex.exec(m.text)
const grupo = `https://chat.whatsapp.com`
if (isAdmin && chatdb.antiLink && m.text.includes(grupo)) { 
let resp = `*😎 Salvado, usted @${senderJid.split('@')[0]} es administrador!*`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
if (chatdb.antiLink && isGroupLink && !isAdmin) {
if (isBotAdmin && settings.restrict) {
const linkThisGroup = `https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}`
if (m.text.includes(linkThisGroup)) {
let resp = '*Lol.. enviaste el enlace de este grupo :v*'
return conn.sendWritingText(m.chat, resp, m );
}
await conn.deleteMessage(m.chat, {remoteJid: m.chat, fromMe: false, id: bang, participant: delet});
let resp = `*「 ANTI LINKS WHATSAPP 」*\n*HASTA LA VISTA BABY 👋, ${await conn.getName(senderJid)} ROMPISTE LAS REGLAS DEL GRUPO, SERAS EXTERMINADO...!!*`
await conn.sendWritingText(m.chat, resp, m );
return await conn.groupParticipantsUpdate(m.chat, [senderJid], 'remove') 
} else if (isBotAdmin && !settings.restrict) {
let resp = `*[❗INFO❗] EL PROPIETARIO DEL BOT NO TIENE HABILITADO LAS RESTRICCIONES *(#_enable restrict_)* CONTACTE CON EL PARA QUE LO HABILITE*`
return conn.sendWritingText(m.chat, resp, m );
} else if (!isBotAdmin) {
let resp = '*[❗INFO❗] EL BOT NO ES ADMIN, NO PUEDE EXTERMINAR A LAS PERSONAS*'
return conn.sendWritingText(m.chat, resp, userdb, m )}
} 
return !0
}
export const menuInfo = {
help: `Elimina numeros que realizan spam de enlaces de otros grupos o que simplemente no se permiten en el grupo\nUsar asi para habilitar: *usedPrefixenable antilink*\nUsar asi para deshabilitar: *usedPrefixdisable antilink*`,
info: `━━━━━━━━━━━━━━━━━━━━
┣ *👑 ENABLE ANTILINK*: usedPrefixenable antilink
━━━━━━━━━━━━━━━━━━━━
┣ *👑 DISABLE ANTILINK*: usedPrefixdisable antilink
`,
type: 'enable',
chat: `grupos`
}
