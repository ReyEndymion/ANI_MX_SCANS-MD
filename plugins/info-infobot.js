import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
//import os from 'os'
//import util from 'util'
//import sizeFormatter from 'human-readable'
//import MessageType from '@whiskeysockets/baileys'
//import fs from 'fs'
import { performance } from 'perf_hooks'
let handler = async (m, { conn, usedPrefix, participants }, jid) => {
let _uptime = process.uptime() * 1000
let uptime = clockString(_uptime) 
let totalreg = Object.keys(global.db.data.users).length
const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'))
const groups = chats.filter(([id]) => id.endsWith('@g.us'))
const used = process.memoryUsage()
const { restrict, antiCall, antiprivado } = global.db.data.settings[conn.user.jid] || {}
const { autoread, gconly, pconly, self } = global.opts || {}
let old = performance.now()
let neww = performance.now()
let speed = neww - old
let ow = global.owner.filter(entry => typeof entry[0] === 'string' && !isNaN(entry[0])).map(entry => ({ jid: entry[0] })).slice(0).map(({jid}) => `${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]}`).join` y `
let info1 = 'hola' 
let info = `
hola @${m.sender.split`@`[0]}
╠═〘 INFO DEL BOT 〙 ═
╠${wm} by ${igfg}
╠➥ [🤴🏻] CREADOR: ${ow}
╠➥ [🎳] PREFIJO: *${usedPrefix}*
╠➥ [🔐] CHATS PRIVADOS: *${chats.length - groups.length}*
╠➥ [🦜] CHATS DE GRUPOS: *${groups.length}* 
╠➥ [💡] CHATS TOTALES: *${chats.length}* 
╠➥ [🚀] ACTIVIDAD: *${uptime}*
╠➥ [🎩] USUARIOS: *${totalreg} NUMEROS*
╠➥ [☑️] AUTOREAD: ${autoread ? '*𝚊𝚌𝚝𝚒𝚟𝚊𝚍𝚘*' : '*𝚍𝚎𝚜𝚊𝚌𝚝𝚒𝚟𝚊𝚍𝚘*'}
╠➥ [❗] RESTRICT: ${restrict ? '*𝚊𝚌𝚝𝚒𝚟𝚊𝚍𝚘*' : '*𝚍𝚎𝚜𝚊𝚌𝚝𝚒𝚟𝚊𝚍𝚘*'} 
╠➥ [💬] ANTIPRIVADO: ${antiprivado ? '*𝚊𝚌𝚝𝚒𝚟𝚊𝚍𝚘*' : '*𝚍𝚎𝚜𝚊𝚌𝚝𝚒𝚟𝚊𝚍𝚘*'}
╠➥ [📵] ANTILLAMADA: ${antiCall ? '*𝚊𝚌𝚝𝚒𝚟𝚊𝚍𝚘*' : '*𝚍𝚎𝚜𝚊𝚌𝚝𝚒𝚟𝚊𝚍𝚘*'}
╠➥ [💬] PCONLY: ${pconly ? '*𝚊𝚌𝚝𝚒𝚟𝚊𝚍𝚘*' : '*𝚍𝚎𝚜𝚊𝚌𝚝𝚒𝚟𝚊𝚍𝚘*'}
╠➥ [🏢] GCONLY: ${gconly ? '*𝚊𝚌𝚝𝚒𝚟𝚊𝚍𝚘*' : '*𝚍𝚎𝚜𝚊𝚌𝚝𝚒𝚟𝚊𝚍𝚘*'}
╠➥ [🌎] MODO: ${self ? '*𝚙𝚛𝚒𝚟𝚊𝚍𝚘*' : '*𝚙𝚞𝚋𝚕𝚒𝚌𝚘*'}
╠➥ [👨‍🦯] VELOCIDAD:  *${speed} MILISEGUNDOS*
╠°°° El grupo oficial es:\n${urlgofc}
╠═〘 *${wm}* 〙 ═
`.trim() 
let txt = '';
let count = 0;
for (const c of info) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;
    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
let res = generateWAMessageFromContent(m.chat, {liveLocationMessage: {degreesLatitude: 19.663571, degreesLongitude: -99.068531, caption: info, sequenceNumber: "0", contextInfo: {mentionedJid: conn.parseMention(info)}}}, {userJid: conn.user.jid})
conn.relayMessage(m.chat,  res.message, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
//console.log('y esto: ', res)
conn.sendMessage(m.chat, {text: info, contextInfo: {mentionedJid: conn.parseMention(info), externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: 'INFO DEL BOT', body: `${igfg} by ${namerepre}`, previewType: 0, thumbnail: imagen1, sourceUrl: md}}}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
handler.help = ['infobot', 'speed']
handler.tags = ['info', 'tools']
handler.command = /^(ping|speed|infobot)$/i
export default handler

function clockString(ms) {
let h = Math.floor(ms / 3600000)
let m = Math.floor(ms / 60000) % 60
let s = Math.floor(ms / 1000) % 60
console.log({ms,h,m,s})
return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')}
