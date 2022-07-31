let handler = async (m, { conn, command, usedPrefix, text }) => {
let which = command.replace(/ver/i, '')
if (!text) throw `*[❗INFO❗] USAR *${usedPrefix}list${which}* PARA VER LA LISTA*`
let msgs = global.db.data.msgs
if (!text in msgs) throw `*[❗INFO❗] '${text}' NO REGISTRADO EN LA LISTA DE MENSAJES*`
let _m = await conn.serializeM(msgs[text])
await _m.copyNForward(m.chat, true)
}
handler.help = ['vn', 'msg', 'video', 'audio', 'img', 'sticker'].map(v => 'get' + v + ' <text>')
handler.tags = ['database']
handler.command = /^ver(vn|msg|video|audio|img|sticker)$/
handler.rowner = true
export default handler