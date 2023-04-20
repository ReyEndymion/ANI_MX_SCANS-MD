let handler = async (m, { conn, usedPrefix, command, paypal }) => {
conn.sendMessage(m.chat, {text:'https://www.paypal.me/AMxScan/'},  { quoted: m })
}
handler.help = ['pagina']
handler.tags = ['info']
handler.command = /^paypal$/i
export default handler