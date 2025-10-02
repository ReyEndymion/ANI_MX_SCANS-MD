let handler = async(m, {conn, db, userdb, senderJid}) => {
let {prefix} = await import('../lib/functions.js')

prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
await conn.sendWritingText(m.chat, `[❗INFO❗] PREFIJO RESTABLECIDO CON EXITO`, userdb, m)
}
handler.help = ['resetprefix']
handler.tags = ['owner']
handler.command = /^(resetprefix)$/i
handler.rowner = true


handler.menu = [
{ title: "🔄 RESTABLECER PREFIJO", description: "Restablecer el prefijo del bot", id: `resetprefix` }
];
handler.type = "owners";
handler.disabled = false;

export default handler
