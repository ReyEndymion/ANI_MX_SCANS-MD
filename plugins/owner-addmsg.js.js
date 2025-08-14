let handler = async (m, {command, usedPrefix, text, botdb, db, userdb, senderJid}) => {
let M = m.constructor
let which = command.replace(/agregar/i, '')
if (!m.quoted) return conn.sendWritingText(m.chat, `*[❗INFO❗] RESPONDE A UN TEXTO MENSAJE, IMAGEN, ETC. Y AÑADE UN TEXTO COMO PALABRA CLAVE*`, m)
if (!text) return conn.sendWritingText(m.chat, `*[❗INFO❗] UTILIZAR *${usedPrefix}list${which}* PARA VER LA LISTA DE MENSAJES`, userdb, m)
let msgs = botdb.msgs
if (text in msgs) return conn.sendWritingText(m.chat, `*[❗INFO❗] '${text}' SE HA REGISTRADO EN LA LISTA DE MENSAJES`, userdb, m)
msgs[text] = M.toObject(await m.getQuotedObj())
conn.sendWritingText(m.chat, `*[❗INFO❗] MENSAJE AGREGADO EXITOSAMENTE A LA LISTA DE MENSAJES COMO 'text'*\n*ACCEDE CON ${usedPrefix}ver${which} ${text}*`, userdb, m)
}
handler.help = ['vn', 'msg', 'video', 'audio', 'img', 'sticker'].map(v => 'add' + v + ' <text>')
handler.tags = ['database']
handler.command = /^agregar(vn|msg|video|audio|img|sticker)$/
handler.rowner = true
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler