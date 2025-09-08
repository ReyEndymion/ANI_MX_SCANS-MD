export async function before(m, {conn, db, userdb, senderJid}) {
const {prems} = await import('../config.js')
if (!m.isGroup || m.chat.endsWith('broadcast')) return
if (prems.includes(senderJid.split`@`[0])) {
userdb.premiumTime = 0
userdb.premium = true
}
if (prems.includes(senderJid.split`@`[0])) return
if (userdb.premiumTime != 0 && userdb.premium) {
if (Date.now() * 1 >= userdb.premiumTime) {
let resp = `*@${senderJid.split`@`[0]} ¡SE ACABO EL TIEMPO DE PREMIUM!*\nSI QUIERES OBTENER UN NUEVO PASE USA EL COMANDO\n*#pase premium*`
userdb.premiumTime = 0
userdb.premium = false
return conn.sendWritingText(m.chat, resp, userdb, m)}
}
}
