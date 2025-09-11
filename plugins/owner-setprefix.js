let handler = async(m, {conn, text, db, userdb, senderJid}) => {
let {prefix, opts} = await import('../lib/functions.js')
if (!text) return conn.sendWritingText(m.chat, `[❗INFO❗] NO SEA DETECTADO NINGÚN PREFIJO...`, userdb, m)
prefix = new RegExp('^[' + (text || opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
await conn.sendWritingText(m.chat, `[❗INFO❗] EL PREFIJO HA SIDO CAMBIADO A *${text}*`, userdb, m)
}
handler.help = ['setprefix'].map(v => v + ' [prefix]')
handler.tags = ['owner']
handler.command = /^(setprefix)$/i
handler.rowner = true

handler.menu = [
{ title: "🔄 CAMBIAR PREFIJO", description: "Cambiar el prefijo del bot", id: `setprefix [nuevo_prefijo]` }
];
handler.type = "owners";
handler.disabled = false;

export default handler 
