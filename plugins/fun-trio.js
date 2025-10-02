let toM = a => '@' + a.split('@')[0]
async function handler(m, { conn, groupMetadata, db, userdb, senderJid, isLidGroup }) {
let ps = groupMetadata.participants.map(v => isLidGroup ? v.phoneNumber : v.id)
let a = ps.getRandom()
let b
do b = ps.getRandom()
while (b === a)
let c
do c = ps.getRandom()
while (b === a)

let resp = `*_Hey!!! ${toM(a)}, ${toM(b)} y ${toM(c)} han pensado en hacer un trio? ustedes 3 hacen un buen trio 🥵_*`
return conn.sendWritingText(m.chat, resp, userdb, m);
}
handler.help = ['formartrio']
handler.tags = ['main', 'fun']
handler.command = ['formartrio','formartrios']
handler.group = true

handler.menu = [
{title: "🎖️ FORMAR TRIO", description: "Forma un trio con 3 miembros del grupo", id: `formartrio`},
];
handler.type = "fun";
handler.disabled = false;

export default handler