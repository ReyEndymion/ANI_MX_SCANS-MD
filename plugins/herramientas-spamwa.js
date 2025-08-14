let handler = async (m, {conn, text, db, userdb, senderJid}) => {

let [nomor, pesan, jumlah] = text.split('|')
if (!nomor) return conn.sendWritingText(m.chat, `*[ ⚠️ ] POR FAVOR INGRESE EL NUMERO AL CUAL SE LE HARA EL SPAM DE MENSAJES!*\n*USO CORRECTO:*\n*—◉ #spamwa numero|texto|cantidad*\n*EJEMPLO:*\n*—◉ #spamwa 5219999999999|responde :v|25*`, userdb, m)
if (!pesan) return conn.sendWritingText(m.chat, `*[ ⚠️ ] POR FAVOR INGRESE EL MENSAJE PARA HACER EL SPAM!*\n*USO CORRECTO:*\n*—◉ #spamwa numero|texto|cantidad*\n*EJEMPLO:*\n*—◉ #spamwa 5219999999999|responde :v|25*`, userdb, m)
if (jumlah && isNaN(jumlah)) return conn.sendWritingText(m.chat, `*[ ⚠️ ] LA CANTIDAD DEBE SER UN NUMERO!*\n*USO CORRECTO:*\n*—◉ #spamwa numero|texto|cantidad*\n*EJEMPLO:*\n*—◉ #spamwa 5219999999999|responde :v|25*`, userdb, m)

let fixedNumber = nomor.replace(/[-+<>@]/g, '').replace(/ +/g, '').replace(/^[0]/g, '62') + '@s.whatsapp.net'
let fixedJumlah = jumlah ? jumlah * 1 : 10
if (fixedJumlah > 50) return conn.sendWritingText(m.chat, `*[ ⚠️ ] DEMASIADOS MENSAJES! LA CANTIDAD DEBE SER MENOR A 50 MENSAJES*️`, userdb, m)
await conn.sendWritingText(m.chat, `*[❗] EL SPAM DE MENSAJES AL NUMEROnomorFUE REALIZADO CON EXITO*\n*CANTIDAD ENVIADA:*\n*—◉ ${fixedJumlah} veces!*`, userdb, m)
for (let i = fixedJumlah; i > 1; i--) {
if (i !== 0) conn.reply(fixedNumber, pesan.trim(), m)
}}
handler.help = ['spamwa <number>|<mesage>|<no of messages>']
handler.tags = ['General']
handler.command = /^spam(wa)?$/i
handler.group = false
handler.premium = false
handler.private = true
handler.limit = true
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
