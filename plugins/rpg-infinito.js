//SOLO USA SI ERES EL/LA PROPIETARIO(A) DEL BOT PARA TENER TODO ILIMITADO O USA EL COMANDO PREMIUM Jajaj
let handler = async (m, {conn, userdb, db, senderJid}) => {
if (m.chat.endsWith(userID)) return
//console.log('dbCh: ', userdb)
userdb.money = Infinity
userdb.limit = Infinity
userdb.level = Infinity

let resp = `*ÉXITO!!*`
return conn.sendWritingText(m.chat, resp, userdb, m)}
handler.help = ['cheat']
handler.tags = ['owner']
handler.command = /^(ilimitado|infiniy)$/i
handler.rowner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.money = 0

handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
