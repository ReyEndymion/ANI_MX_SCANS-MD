let handler = async (m, { conn, command, usedPrefix }) => {
let picture = './Menu2.jpg'
let name = await conn.getName(m.sender)
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) { process.send('uptime')
_muptime = await new Promise(resolve => { process.once('message', resolve) 
setTimeout(resolve, 1000) }) * 1000}
let uptime = clockString(_uptime)
let estado =`
╭─[ *🌎ANI MX SCANS🌏* ]
│ *➤ HOLA ${name}*
│
│ *ESTADO DEL BOT*
│ *=> BOT ACTIVO ✅*
│ *=> BOT DE USO PUBLICO ✅*
│ *=> TIEMPO ACTIVO: ${uptime}*
╰───────────────
`.trim()
conn.sendButton(m.chat, estado, wm, picture, [['https://www.facebook.com/ANIMxSCANS', 'FACEBOOK'], 
['MENU PRINCIPAL', '/menu']]/*,
 '')}
conn.sendHydrated(m.chat, estado, wm, picture, 'https://www.facebook.com/ANIMxSCANS', 'FACEBOOK', null, null, [
['MENU PRINCIPAL', '/menu']
]*/, m)}

handler.help = ['estado']
handler.tags = ['main']
handler.command = /^(estado|status|estate|state|stado|stats)$/i
export default handler

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
