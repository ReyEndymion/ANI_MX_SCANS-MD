let toM = a => '@' + a.split('@')[0]
async function handler(m, {conn, groupMetadata, db, userdb, senderJid, isLidGroup }) {
let ps = groupMetadata.participants.map(v => isLidGroup ? v.phoneNumber : v.id)
let a = ps.getRandom()
let b
do b = ps.getRandom()
while (b === a)
let resp = `*${toM(a)}, DEBERIAS CASARTE 💍 CON ${toM(b)}, HACEN UNA BUENA PAREJA 💓*`
return conn.sendWritingText(m.chat, resp, userdb, m);
}
handler.help = ['formarpareja']
handler.tags = ['main', 'fun']
handler.command = ['formarpareja','formarparejas']
handler.group = true
handler.menu = [
{title: "🎖️ FORMAR PAREJA", description: "usa #formarpareja <numero / @tag>", id: `formarpareja`},

];
handler.type = "fun";
handler.disabled = false;

export default handler
