import { toDataURL } from 'qrcode'
let handler = async (m, {text, conn, db, userdb, senderJid}) => {
if (!text) return conn.sendWritingText(m.chat, `*[❗INFO❗] INGRESE EL TEXTO QUE QUIERA CONVERTIR EN CODIGO QR*`, userdb, m)
conn.sendFile(m.chat, await toDataURL(text.slice(0, 2048), { scale: 8 }), 'qrcode.png', '¯\\_(ツ)_/¯', m)
}
handler.help = ['', 'code'].map(v => 'qr' + v + ' <teks>')
handler.tags = ['tools']
handler.command = /^qr(code)?$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
