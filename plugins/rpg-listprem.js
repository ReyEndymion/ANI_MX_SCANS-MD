let handler = async (m, {conn, info, start, args, command, usedPrefix, participants, isLidGroup, groupsdb, chatdb, usersdb, userdb, senderJid}) => {
const {clockString, sort, toNumber} = await import('../lib/functions.js')
const {prems, userID} = await import('../config.js')
const {menuform} = await import('../lib/constants.js')
if (/^((list(a)?)?(prem|vip)(list(a)?)?)$/i.test(command)) {
const part = participants.map(p => isLidGroup ? p.phoneNumber : p.id)
let usuario = usersdb[senderJid]
const usersInDB = Object.entries(usersdb).filter(user => user[1].premiumTime).map(([key, value]) => {
return { ...value, jid: key }
})
const usersInPrems = prems.map(v => v.replace(/[^0-9]/g, '') + userID).map(key => {
return { name: '', premiumTime: Infinity, prem: true, registered: false, jid: key }
})
let user = usersInDB.length > 0 ? usersInDB : usersInPrems.length > 0 ? usersInPrems : []
let name = '🎟️ PREMIUM'
let prem = usuario.premium 
let premTime = usuario.premiumTime
let waktu = clockString(`${premTime - new Date() * 1} `)
let fkon = { key: { fromMe: false, participant: `${senderJid.split`@`[0]}@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${prem ? '*PREMIUM*: ✅ ACTIVO' : '*PREMIUM*: 🚫 CADUCADO'}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${waktu}\nitem1.TEL;waid=${senderJid.split('@')[0]}:${senderJid.split('@')[0]}\nitem1.X-aBLabel:Ponsel\nEND:VCARD`}}}
let sortedP = user.map(toNumber('premiumTime')).sort(sort('premiumTime'))
let len = args[0] && args[0].length > 0 ? Math.min(100, Math.max(parseInt(args[0]), 10)) : Math.min(10, sortedP.length)
let msgPremium = `${menuform.htki} *🎟️ PREMIUM 🎟️* ${menuform.htka}

*╭ ༻✦༺ _PREMIUM INFO_ ༻✦༺*
*┃✢*@${senderJid.split`@`[0]}*\n┃✢*_NOMBRE_ : ${conn.getName(senderJid)}
${prem ? premTime === 0 ? '┃✢ ♾️ SIN LIMITE' : `┃✢ *TIEMPO PREMIUM:* ${clockString(premTime - new Date() * 1)}` : '❌ NO PREMIUM'}
*╰•·–––––––––––––––·•*

╭•·–––––––––––––––·•
🌟 USUARIOS PREMIUM DEL GRUPO (${sortedP.length})
╰•·–––––––––––––––·•${sortedP.slice(0, len).map(({ jid, name, premiumTime, prem, registered }, i) => prem ? part.includes(jid) ? `\n\n╭–✦ ${registered ? name : conn.getName(jid)}\n┃• @${jid.split`@`[0]}\n${premiumTime > 0 ? premiumTime === Infinity ? '*USUARIO ESPECIAL*' : `┃✢ *TIEMPO PREMIUM:* ${clockString(premiumTime - new Date() * 1)}` : '┃🚫 CADUCADO'}` : '' : '').join`\n╰–––––––––––·•`}
╰–––––––––––·•`.trim()
const footer = `🎟️ PREMIUM ⇢ ${prem ? '✅' : '❌'}\n> ${info.nanipe}`
const buttons = [[`${prem ? '✦ DISFRUTAR PREMIUM ✦': '✦ COMPRAR PASE PREMIUM ✦'}`, `${prem ? `${usedPrefix}allmenu`: `${usedPrefix}pase premium`}`]]
if (start.buttons) {
const msgObj = {
title: `🎟️ P R E M I U M ⇢ ${prem ? '✅' : '❌'}\n${info.nbcde}`,
text: msgPremium,
footer: info.nanipe
}
return conn.sendButton(m.chat, msgObj, {}, buttons, userdb, fkon) 
} else {
const cmds = buttons.map(([a, b]) => `${a}: ${b}`).join('\n')
msgPremium += `\n${cmds}\n\n> ${footer}`
return conn.sendWritingText(m.chat, msgPremium, userdb, fkon)
}
setTimeout(() => {
if (chatdb.deletemedia) conn.deleteMessage(m.chat, key)
}, chatdb.deletemediaTime)
}
if ( /^(listpremgral|premlistgral)$/i.test(command)) {
const premgral = []
const groups = Object.entries(groupsdb)
let prem = prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)
premgral.push(prem)
const uniquePremium = new Set(prem)
for (const [key, value] of groups) {
if (!value?.users) continue
for (const [user, data] of Object.entries(value.users)) {
if (data.premium) uniquePremium.add(user)//
}
}
let textprem = `*「 USUARIOS PREMIUM DEL BOT 」*`
for (const premiun of uniquePremium) {
textprem += `\n- @${premiun.replace(/@.+/, '')}`
}
textprem += `\n\n> ${info.nbcde}`
return conn.sendWritingText(m.chat, textprem, userdb, m)
}
}
handler.help = ['premlist [angka]']
handler.tags = ['info']
handler.command = /^((list(a)?)?(prem|vip)(list(a)?)?(gral)?)$/i
//handler.command = /^(vip|prem|premium|lista|list)vip|prem|premium|lista|list$/i
handler.menu = [
{ title: "🎟️ LISTA PREMIUM", description: `Consulta la lista de usuarios Premium de un grupo, usa el comando #premlist`, id: `premlist` },
{title: "👑 LISTA PREMIUM GENERAL", description: "Lista de usuarios premium de todo el bot use #listpremgral", id: `listpremgral`}
];
handler.type = "rpg";

handler.disabled = false;

export default handler
