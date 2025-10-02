let handler = async(m, {isOwner, isAdmin, conn, text, participants, args, command, db, userdb, senderJid}) => {
let pesan = args.join` `
let oi = `*MENSAJE:* ${pesan}`
let teks = `╭━〔 *PIDIENDO AYUDA* 〕━⬣\n\n${oi}\n\n`
for (let mem of participants) {
teks += `┃➥ @${mem.id.split('@')[0]}\n`}
teks += `╰━━━━━━[ *𓃠 ${info.nanipe}* ]━━━━━━⬣`
return conn.sendWritingText(m.chat, `teks`, userdb, m)}
handler.help = ['tagall <mesaje>','invocar <mesaje>']
handler.tags = ['group']
handler.command = /^(pedirayuda)$/i
handler.group = true
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
