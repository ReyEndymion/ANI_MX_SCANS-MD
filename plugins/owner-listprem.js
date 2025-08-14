let handler = async (m, {conn, db, userdb, senderJid}) => {
let prem = global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)
let textprem = `*「 USUARIOS PREMIUM 」*
` + prem.map(v => '- @' + v.replace(/@.+/, '')).join`\n`
m.reply(textprem, null, {mentions: conn.parseMention(textprem)})
}
handler.help = ['premlist']
handler.tags = ['owner']
handler.command = /^ow(listprem|premlist)$/i
handler.rowner = true
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
