let handler = async (m, {conn, command, usedPrefix, text, db, userdb, senderJid}) => {
let which = command.replace(/ver/i, '')
if (!text) return conn.sendWritingText(m.chat, `*[❗INFO❗] USAR *${usedPrefix}list${which}* PARA VER LA LISTA*`, userdb, m)
let msgs = db.data.bot[conn.user.jid].msgs
if (!text in msgs) return conn.sendWritingText(m.chat, `*[❗INFO❗] '${text}' NO REGISTRADO EN LA LISTA DE MENSAJES*`, userdb, m)
let _m = await conn.serializeM(msgs[text])
await _m.copyNForward(m.chat, true)
}
handler.help = ['vn', 'msg', 'video', 'audio', 'img', 'sticker'].map(v => 'get' + v + ' <text>')
handler.tags = ['database']
handler.command = /^ver(vn|msg|video|audio|img|sticker)$/
handler.rowner = true
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler