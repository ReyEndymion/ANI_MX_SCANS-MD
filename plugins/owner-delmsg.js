let handler = async (m, {command, usedPrefix, text, db, userdb, senderJid}) => {
let which = command.replace(/eliminar/i, '')
if (!text) return conn.sendWritingText(m.chat, `*[❗INFO❗] USAR ${usedPrefix}list${which} PARA VER LA LISTA*`, userdb, m)
let msgs = db.data.bot[conn.user.jid].msgs
if (!text in msgs) return conn.sendWritingText(m.chat, `*[❗INFO❗] '${text}' NO REGISTRADO EN LA LISTA DE MENSAJES*`, userdb, m)
delete msgs[text]
conn.sendWritingText(m.chat, `*[❗INFO❗] ELIMINO CON EXITO EN LA LISTA DE MENSAJES EL MENSAJE CON EL NOMBRE 'text'*`, userdb, m)
}
handler.help = ['vn', 'msg', 'video', 'audio', 'img', 'sticker'].map(v => 'del' + v + ' <text>')
handler.tags = ['database']
handler.command = /^eliminar(vn|msg|video|audio|img|sticker)$/
handler.rowner = true
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler