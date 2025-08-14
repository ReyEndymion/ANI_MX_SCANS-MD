let handler = function (m, {conn, userdb}) {
if (!m.quoted) return conn.sendWritingText(m.chat, `*[❗INFO❗] DEBE RESPONDER A UN MENSAJE QUE DESEE ELIMINAR.*\n*NOTA:* ESTO SOLAMENTE ES PARA ELIMINAR LOS MENSAJES DEL BOT`, userdb, m)
let { chat, fromMe, isBaileys, sender } = m.quoted
console.log('msgdel: ', chat, isBaileys, fromMe, sender, m.quoted)
if (!fromMe) throw false
if (isBaileys) return conn.sendWritingText(m.chat, `*[❗INFO❗] ESE MENSAJE NO FUE ENVIADO POR MI, NO LO PUEDO ELIMINAR*`, userdb, m)
conn.sendMessage(chat, { delete: m.quoted.vM.key })
}
handler.help = ['del', 'delete']
handler.tags = ['tools']
handler.command = /^msgdel(ete)?$/i
//handler.group = true
//handler.admin = true
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
