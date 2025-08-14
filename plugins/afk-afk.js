let handler = async (m, {conn, text, db, userdb, senderJid}) => {
if (!m.isGroup) return !1
userdb.afk = + new Date
userdb.afkReason = text
let resp = `*[❗INFO❗] EL USUARIO ${conn.getName(senderJid)} ESTARA INACTIVO (AFK), POR FAVOR NO LO ETIQUETEN*\n\n*—◉ MOTIVO DE LA INACTIVIDAD (AFK)${text ? ': ' + text : ''}*`
return conn.sendWritingText(m.chat, resp, userdb, m);
}
handler.help = ['afk [alasan]']
handler.tags = ['main']
handler.command = /^afk$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
