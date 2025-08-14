/* Creado por https://github.com/FG98F */

let handler = async (m, {conn, db, userdb, senderJid}) => {	
await conn.fetchBlocklist().then(async data => {
let resp = `*≡ Lista de bloqueados*\n\n*Total :* ${data.length}\n\n┌─⊷\n`
for (let i of data) {
resp += `▢ @${i.split("@")[0]}\n`}
resp += "└───────────"
return conn.sendWritingText(m.chat, resp, userdb, m)}).catch(async err => {
console.log(err);
let resp = 'No hay números bloqueados'
return conn.sendWritingText(m.chat, resp, userdb, m)})
}
handler.help = ['blocklist']
handler.tags = ['main']
handler.command = ['blocklist', 'listblock'] 
handler.rowner = true
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
