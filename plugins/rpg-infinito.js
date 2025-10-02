//SOLO USA SI ERES EL/LA PROPIETARIO(A) DEL BOT PARA TENER TODO ILIMITADO O USA EL COMANDO PREMIUM Jajaj
let handler = async (m, {conn, db, userdb, senderJid}) => {
//console.log('dbCh: ', userdb)
try {
userdb.money = Infinity
userdb.limit = Infinity
userdb.level = Infinity
let resp = `*ÉXITO!!*`
return conn.sendWritingText(m.chat, resp, userdb, m)
} catch (error) {
let resp = `ocurrio un error: ${error.stack}`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
}
handler.help = ['cheat']
handler.tags = ['owner']
handler.command = /^(ilimitado|infiniy)$/i
handler.rowner = true
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.money = 0

handler.menu = [
{title: "🪙 ILIMITADO", description: `Obtén dinero y recursos ilimitados, usa el comando #ilimitado\n\nNota: *SOLO USA SI ERES EL/LA PROPIETARIO(A) DEL BOT PARA TENER TODO ILIMITADO*`, id: `ilimitado`},
];
handler.type = "rpg";
handler.disabled = false;

export default handler
