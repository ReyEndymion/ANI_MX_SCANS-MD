let handler = async (m, { conn, command, usedPrefix, participants }) => {
let picture = imagen1
let name = await conn.getName(m.sender)
//sort
//tonumber
let me = global.me.filter(entry => typeof entry[0] === `string` && !isNaN(entry[0])).map(entry => ({ jid: entry[0] })).slice(0).map(({jid}) => `${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : `@`}${jid.split`@`[0]}`)
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) { process.send('uptime')
_muptime = await new Promise(resolve => { process.once('message', resolve) 
setTimeout(resolve, 1000) }) * 1000}
let uptime = clockString(_uptime)
let estado =`
╭─[ *${igfg}* ]
│ *➤ HOLA @${m.sender.split`@`[0]}*
│
│ *ESTADO DE ${me}*
│ *=> BOT ACTIVO ✅*
│ *=> BOT DE USO PUBLICO ✅*
│ *=> TIEMPO ACTIVO: ${uptime}*
╰───────────────
${hp_animxscans}\n\n${wm}
`.trim()
let txt = '';
let count = 0;
for (const c of estado) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;
    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
conn.sendMessage(m.chat, {image: picture, caption: estado, mentions: conn.parseMention(txt)}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}, [['https://www.facebook.com/groups/otakustogether', 'FACEBOOK'], 
['MENU PRINCIPAL', '/menu']]/*,
 '')}
conn.sendHydrated(m.chat, estado, wm, picture, 'https://www.facebook.com/ANIMxSCANS', 'FACEBOOK', null, null, [
['MENU PRINCIPAL', '/menu']
]*/)}

handler.help = ['estado']
handler.tags = ['main']
handler.command = /^(estado|status|estate|state|stado|stats)$/i
export default handler

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
