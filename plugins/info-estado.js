import { clockString } from '../lib/functions.js'
let handler = async (m, {conn, info, command, usedPrefix, db, objs, userdb, senderJid}) => {
const fs = await import('fs')
const {owner} = await import('../config.js')
const {imagen1} = objs
let picture = fs.readFileSync(imagen1)
let name = await conn.getName(senderJid)
//sort
//tonumber
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) { process.send('uptime')
_muptime = await new Promise(resolve => { process.once('message', resolve) 
setTimeout(resolve, 1000) }) * 1000}
let uptime = clockString(_uptime)
const used = process.memoryUsage()
const toMB = bytes => (bytes / 1024 / 1024).toFixed(2) + ' MB';
const memory = Object.entries(used).map(([key, value]) => `│      ${key}: ${toMB(value)}`).join('\n')
let estado =`
╭─[ *${info.nanip}* ]
│ *➤ HOLA @${senderJid.split`@`[0]}*
│
│ *ESTADO DE @${conn.user.jid.split('@')[0]}:*
│ *=> BOT ACTIVO ✅*
│ *=> BOT DE USO PUBLICO ✅*
│ *=> TIEMPO ACTIVO: ${uptime}*
│ *=> MEMORIA USADA:*\n${memory}
╰───────────────
${info.hp_animxscans}\n\n> ${info.nanipe}
`.trim()
let contextInfo = {
mentionedJid: conn.parseMention(estado),
"externalAdReply": {
"containsAutoReply": true,
"renderLargerThumbnail": true,
"title": info.nanipe, 
"containsAutoReply": false,
"mediaType": 2, 
"thumbnail": picture,
"mediaUrl": info.ganisubbots,
"sourceUrl": info.ganisubbots
}
}
return conn.sendWritingTextCI(m.chat, estado, contextInfo, userdb, m)
}

handler.help = ['estado']
handler.tags = ['main']
handler.command = /^(estado|status|estate|state|stado|stats)$/i
handler.menu = [
{title:"💎 ESTADO", description: "muestra el estado del bot usando #estado", id: `estado`}
];
handler.type = "info";
handler.disabled = false;

export default handler
