let handler = async (m, { conn, usedPrefix, command, paypal }) => {
conn.sendHydrated(m.chat, paypal, null, null, 'https://www.paypal.me/AMxScan/', 'PAYPAL', null, null,[
], m)
}
handler.help = ['pagina']
handler.tags = ['info']
handler.command = /^paypal$/i
export default handler