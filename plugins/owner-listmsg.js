let handler = m => {
let msgs = db.data.bot[conn.user.jid].msgs
m.reply(`
*🔰 LISTA DE TEXTOS/MENSAJES/PALABRAS CLAVE 🔰*

*✳️ MENSAJES ✳️*
${Object.keys(msgs).map(v => '*👉🏻 ' + v).join('*\n*')}*
`.trim())
}
handler.help = ['vn', 'msg', 'video', 'audio', 'img', 'sticker'].map(v => 'list' + v)
handler.tags = ['database']
handler.command = /^lista(vn|msg|video|audio|img|sticker)$/
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler