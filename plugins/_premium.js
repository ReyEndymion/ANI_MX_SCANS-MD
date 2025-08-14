export async function before(m, {conn, db, userdb, senderJid}) {
if (m.chat.endsWith('broadcast')) return
if (!m.isGroup) return
if (userdb.premiumTime != 0 && userdb.premium) {
if (new Date() * 1 >= userdb.premiumTime) {
let resp = `*@${senderJid.split`@`[0]} ¡SE ACABO EL TIEMPO DE PREMIUM!*\nSI QUIERES OBTENER UN NUEVO PASE USA EL COMANDO\n*#pase premium*`
userdb.premiumTime = 0
userdb.premium = false
return conn.sendWritingText(m.chat, resp, userdb, m)}
}
}
