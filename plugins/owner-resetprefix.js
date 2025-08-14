let handler = async(m, {conn, db, userdb, senderJid}) => {
let {prefix} = await import('../lib/functions.js')

prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
await conn.sendWritingText(m.chat, `[❗INFO❗] PRE𝙵IJO RESTABLECIDO CON EXITO`, userdb, m)
// conn.fakeReply(m.chat, '[❗INFO❗] PRE𝙵IJO RESTABLECIDO CON EXITO', '0@s.whatsapp.net', 'Reset Prefix')
}
handler.help = ['resetprefix']
handler.tags = ['owner']
handler.command = /^(resetprefix)$/i
handler.rowner = true


handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
