let handler = async(m, {conn, text, db, userdb, senderJid}) => {
let {prefix} = await import('../lib/functions.js')
if (!text) return conn.sendWritingText(m.chat, `[❗INFO❗] NO SE HA DETECTADO NINGUN PRE𝙵IJO...`, userdb, m)
prefix = new RegExp('^[' + (text || opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
await conn.sendWritingText(m.chat, `[❗INFO❗] EL PRE𝙵IJO HA SIDO CAMBIADO A*text*`, userdb, m)
// conn.fakeReply(m.chat, '[❗INFO❗] EL PRE𝙵IJO HA SIDO CAMBIADO A *${text}*', '0@s.whatsapp.net', 'Set Prefix Bot')
}
handler.help = ['setprefix'].map(v => v + ' [prefix]')
handler.tags = ['owner']
handler.command = /^(setprefix)$/i
handler.rowner = true

handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler 
