let handler = async (m, { command, usedPrefix, text }) => {
    let M = m.constructor
    let which = command.replace(/agregar/i, '')
    if (!m.quoted) throw '*[❗INFO❗] RESPONDE A UN TEXTO MENSAJE, IMAGEN, ETC. Y AÑADE UN TEXTO COMO PALABRA CLAVE*'
    if (!text) throw `*[❗INFO❗] UTILIZAR *${usedPrefix}list${which}* PARA VER LA LISTA DE MENSAJES`
    let msgs = global.db.data.msgs
    if (text in msgs) throw `*[❗INFO❗] '${text}' SE HA REGISTRADO EN LA LISTA DE MENSAJES`
    msgs[text] = M.toObject(await m.getQuotedObj())
    m.reply(`*[❗INFO❗] MENSAJE AGREGADO EXITOSAMENTE A LA LISTA DE MENSAJES COMO '${text}'*\n*ACCEDE CON ${usedPrefix}ver${which} ${text}*`)
}
handler.help = ['vn', 'msg', 'video', 'audio', 'img', 'sticker'].map(v => 'add' + v + ' <text>')
handler.tags = ['database']
handler.command = /^agregar(vn|msg|video|audio|img|sticker)$/
handler.rowner = true
export default handler