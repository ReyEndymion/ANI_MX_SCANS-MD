import fs from 'fs'
let handler = async (m, {conn, info, usedPrefix, command, text, db, privsdb, userdb, senderJid, objs, isLidGroup}) => {
const {dbGroups, imagen1, imagen2} = objs
await dbGroups.read()
const {delay, parseDuration} = await import('../lib/functions.js')
const path = await import('path')
const {media, groupID, userID, lid} = await import('../config.js')
if (!text && !m.quoted?.text) return conn.sendWritingText(m.chat, ` Ingres Un texto el cual será el comunicado o conteste a un mensaje con un texto que desee comunicar a los chats`, userdb, m)
let q = { key: {participant: `0@s.whatsapp.net`, remoteJid: `0@s.whatsapp.net`},message: {"videoMessage": { "title": info.nanipe, "h": `Hmm`,'seconds': '99999', 'gifPlayback': 'true', 'caption': info.namerepre, 'jpegThumbnail': false }}}
if (/^(b(road)?c(ast)?p(rivs)?)$/i.test(command)) {
let chats = Object.entries(privsdb).filter(([jid, data]) => !jid.includes(conn.user.jid) && !jid.endsWith('@g.us') && data.user).map(v => v[0])
let _text = m.quoted?.text ? m.quoted.text : text
for (let id of chats) {
const msg = `*╔══❰ COMUNICADO ❱══╗*\n*║* hola @${id.split('@')[0]}\n*╠❧* ${_text}\n*║*\n*╚══════════════╝*`
const resp = await conn.writing(id, msg)
const contextInfo = { 
mentionedJid: conn.parseMention(resp),
externalAdReply: {
title: '*COMUNICADO OFICIAL A LOS CHATS PRIVADOS*',
body: info.nanipe, 
sourceUrl: info.hp_otkstogthr, 
thumbnail: fs.readFileSync(imagen2) }}
await conn.sendWritingTextCI(id, resp, contextInfo, userdb, q)
await delay(parseDuration('30s'))
}
return conn.sendWritingText(m.chat, `*[❗INFO❗] MENSAJE ENVIADO A ${chats.length} CHATS PRIVADOS*\n\n*NOTA: ESTE COMANDO SOLO ENVIA A LOS CHATS PRIVADOS INICIALIZADOS*`, userdb, m)
}
if (/^(b(road)?c(ast)?g(roups)?)$/i.test(command)) {
let groups = Object.entries(dbGroups.data)
let _text = m.quoted?.text ? m.quoted.text : text
for (let [id, metadata] of groups) {
const msg = `*╔══❰ COMUNICADO ❱══╗*\n*║* @${id}\n*╠❧* ${_text}\n*║*\n*╚══════════════╝*`
const groupLid = metadata.addressingMode === 'lid'
const isBotInCommunityAnnounce = metadata.isCommunityAnnounce ? metadata.participants.find(p => (p.id === conn.user.lid.split(':')[0] + lid)) : false

if (isBotInCommunityAnnounce.admin === null) continue
const resp = await conn.writing(id, msg)
const contextInfo = {
mentionedJid: metadata.participants.map(p => groupLid ? p.jid : p.id),
groupMentions: await conn.parseGroupMention(resp),
externalAdReply: {
title: '*COMUNICADO OFICIAL A GRUPOS*',
body: info.nanipe, 
sourceUrl: info.urlgofc, 
thumbnail: fs.readFileSync(imagen1) 
}
}
await conn.sendWritingTextCI(id, resp, contextInfo, userdb, q)
await delay(parseDuration('30s'))

}
return conn.sendWritingText(m.chat, `*[❗INFO❗] MENSAJE ENVIADO A ${groups.length} GRUPO/S*\n\n*NOTA: ES POSIBLE QUE ESTE COMANDO REALMENTE MANDE A TODOS LOS CHATS GRUPALES, USELO CON PRECAUCIÓN SI CUENTA CON DEMASIADOS CHATS*`, userdb, m)
}
if (/^(b(road)?c(ast)?all)$/i.test(command)) {
let chatsconn = Object.entries(conn.chats).filter(([_, chat]) => !_.includes(conn.user.jid) && chat.isChats).map(v => v)
let chatsprivs = Object.entries(privsdb).filter(([jid, data]) => !jid.includes(conn.user.jid) && !jid.endsWith('@g.us') && data.user).map(([jid, data]) => [jid, data])
let chatsgroups = Object.entries(dbGroups.data)
const chatsall = new Map([...chatsconn, ...chatsprivs, ...chatsgroups])
let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
let _text = m.quoted?.text ? m.quoted.text : text
for (let [id, metadata] of chatsall) { 
const msg = `*╔══❰ COMUNICADO ❱══╗*\n*║* @${id.endsWith(groupID) ? id : id.split('@')[0]}\n*╠❧* ${_text}\n*║*\n*╚══════════════╝*`
const groupLid = id.endsWith(groupID) ? metadata.addressingMode === 'lid' : false
const isBotInCommunityAnnounce = id.endsWith(groupID) ? metadata.isCommunityAnnounce ? metadata.participants.find(p => (p.id === conn.user.lid.split(':')[0] + lid)) : false : false
if (isBotInCommunityAnnounce.admin === null) continue
const resp = await conn.writing(id, msg)
const contextInfo = { 
mentionedJid: id.endsWith(groupID) ? metadata.participants.map(p => groupLid ? p.jid : p.id) : conn.parseMention(msg),
groupMentions: id.endsWith(groupID) ? await conn.parseGroupMention(resp) : [],
externalAdReply: {
title: 'COMUNICADO OFICIAL A TODOS LOS CHATS',
body: info.nanipe, 
sourceUrl: info.hp_otkstogthr, 
thumbnail: fs.readFileSync(imagen2)
}
}
await conn.sendWritingTextCI(id, resp, contextInfo, userdb, q)
await delay(parseDuration('30s'))
}
return conn.sendWritingText(m.chat, `*[❗INFO❗] MENSAJE ENVIADO A TODOS LOS CHATS*\n\n*NOTA: ES POSIBLE QUE ESTE COMANDO NO SÉ ENVIÉ A TODOS LOS CHATS PRIVADOS POR FALTA DE INICIALIZACION O INACTIVIDAD*`, userdb, m)
}
}
handler.help = ['broadcastchats', 'bcchats'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(b(road)?c(ast)?(p(rivs)?|g(roups)?|all))$/i
handler.rowner = true
handler.menu = [
{title: "📢 BROADCAST PRIVS", description: "Envía un mensaje a todos los chats privados del bot: #broadcastprivs <mensaje>", id: `broadcastprivs`},
{title: "📢 BROADCAST GROUPS", description: "Envía un mensaje a todos los grupos del bot: #broadcastgroups", id: `broadcastgroups`},
{title: "📢 BROADCAST ALL", description: "Envía un mensaje a todos los chats del bot: #broadcastall <mensaje>", id: `broadcastall`}
];
handler.type = "owners";

handler.disabled = false;

export default handler
