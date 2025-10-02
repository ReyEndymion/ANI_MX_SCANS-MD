import { performance } from 'perf_hooks'
let handler = async (m, {conn, info, usedPrefix, participants, botdb, groupsdb, privsdb, usersdb, db, userdb, senderJid, objs}) => {
const {imagen1, dbGroups, storeFile, inMstore} = objs
inMstore.readFromFile(storeFile)

const storefilejson = inMstore.chats
await dbGroups.read()
const fs = await import('fs')
const stat = fs.statSync(storeFile)
const readstore = fs.readFileSync(storeFile)
const datajsonstore = JSON.parse(readstore)
const {owner, userID, groupID} = await import('../config.js')
const { generateWAMessageFromContent } = await import('@whiskeysockets/baileys')
const {clockString, opts} = await import('../lib/functions.js')
let _uptime = process.uptime() * 1000
let uptime = clockString(_uptime) 
const objKeysDBUsG = Object.keys(groupsdb)
const objKeysDBUsP = Object.keys(privsdb)
let totalChatRegDB = objKeysDBUsP.length + objKeysDBUsG.length
const connchats = Object.entries(conn.chats)
const conngroups = connchats.filter(([id]) => id.endsWith(groupID))
const connprivs = connchats.filter(([id]) => id.endsWith(userID))
let totalChatRegConn = connchats.length
const groupChatsJson = Object.entries(dbGroups.data)
const dataStore = Object.entries(datajsonstore.chats)
const dataStorePrivs = dataStore.filter(([id]) => id.endsWith(userID))
const dataStoreGroups = dataStore.filter(([id]) => id.endsWith(groupID))
const groupsIn = groupChatsJson.length > conngroups.length ? groupChatsJson : connchats
const used = process.memoryUsage()
const { restrict, antiCall, antiprivado } = botdb.settings || {}
const { autoread, gconly, pconly, self } = opts || {}
let registered = []
for (const [key, values] of Object.entries(usersdb)) {
if (values.registered === true) {
registered.push(usersdb)
}
}
const usersInChat = m.isGroup ? participants.length : (conn.user.jid === m.sender ? 1 : 2)
const userReg = {}
let old = performance.now()
let neww = performance.now()
let speed = neww - old
let ow = owner.filter(entry => typeof entry[0] === 'string' && !isNaN(entry[0])).map(entry => ({ jid: entry[0] })).slice(0).map(({jid}) => `@${jid.split`@`[0]}`).join` y `
let info1 = 'hola' 
const resp = `
hola @${senderJid.split`@`[0]}
╠═〘 INFO DEL BOT 〙 ═
╠${info.nanipe} by ${info.author}
╠➥ [🤴🏻] CREADOR: ${ow}
╠➥ [🎳] PREFIJO: *${usedPrefix}*
╠➥ [🎩] USUARIOS EN CHAT: *${usersInChat} NUMEROS*
╠   *Registrados en base de datos:*
╠➥ [🔐] CHATS PRIVADOS: *${objKeysDBUsP.length}*
╠➥ [🦜] CHATS DE GRUPOS: *${objKeysDBUsG.length}* 
╠➥ [💡] CHATS TOTALES: *${totalChatRegDB}* 
╠   *Registrados en plataforma* (Detectados por actividad)
╠➥ [🔐] CHATS PRIVADOS: *${connprivs.length}*
╠➥ [🦜] CHATS DE GRUPOS: *${conngroups.length}* 
╠➥ [💡] CHATS TOTALES: *${connchats.length}* 
╠➥ [🚀] ACTIVIDAD: *${uptime}*
╠➥ [🎩] USUARIOS REGISTRADOS EN BOT: *${registered.length} NUMEROS*
╠➥ [☑️] AUTOREAD: ${autoread ? '*activado*' : '*desactivado*'}
╠➥ [❗] RESTRICT: ${restrict ? '*activado*' : '*desactivado*'} 
╠➥ [💬] ANTIPRIVADO: ${antiprivado ? '*activado*' : '*desactivado*'}
╠➥ [📵] ANTILLAMADA: ${antiCall ? '*activado*' : '*desactivado*'}
╠➥ [💬] PCONLY: ${pconly ? '*activado*' : '*desactivado*'}
╠➥ [🏢] GCONLY: ${gconly ? '*activado*' : '*desactivado*'}
╠➥ [🌎] MODO: ${self ? '*privado*' : '*público*'}
╠➥ [👨‍🦯] VELOCIDAD: *${speed} MILISEGUNDOS*
╠°°° El grupo oficial es:\n${info.urlgofc}
╠═〘 *${info.nanipe}* 〙 ═
`.trim() 
await conn.writing(m.chat, resp)
let res = generateWAMessageFromContent(m.chat, {liveLocationMessage: {degreesLatitude: 19.663571, degreesLongitude: -99.068531, caption: resp, sequenceNumber: "0", contextInfo: {mentionedJid: conn.parseMention(resp)}}}, {userJid: conn.user.jid})
conn.relayMessage(m.chat, res.message, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
return conn.sendMessage(m.chat, {text: resp, contextInfo: {mentionedJid: conn.parseMention(resp), externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: 'INFO DEL BOT', body: `${info.npe} by ${info.namerepre}`, previewType: 0, thumbnail: fs.readFileSync(imagen1), sourceUrl: info.repoProyect}}}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
handler.help = ['infobot', 'speed']
handler.tags = ['info', 'tools']
handler.command = /^(ping|infobot)$/i
handler.menu = [
{title:"💎 INFO BOT", description: "muestra información del bot usando #infobot", id: `infobot`},
];
handler.type = "info";
handler.disabled = false;

export default handler
