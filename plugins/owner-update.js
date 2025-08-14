import { execSync } from 'child_process'
let handler = async (m, {conn, text, db, userdb, senderJid}) => {
try {

try { 
if (global.userBot == conn.user.jid) {
let stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''))
let resp = `${stdout.toString()}`

return conn.sendWritingText(m.chat, resp, userdb, m)
}
} catch {
var update = execSync(`git remote set-url origin ${info.repoProyect}.git && git pull`)
let resp = `${update.toString()}`

return conn.sendWritingText(m.chat, resp, userdb, m)
}
} catch (error) {
console.error(error);
let errorMessage = 'Se produjo un error al ejecutar el comando.';
if (error.message) {
errorMessage += '\nError message: ' + error.message;
}
let resp = errorMessage


return conn.sendWritingText(m.chat, resp, userdb, m)
}
}
handler.help = ['update']
handler.tags = ['owner']
handler.command = /^update|actualizar$/i
handler.rowner = true
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
