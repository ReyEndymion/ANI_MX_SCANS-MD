/*
Made by https://github.com/balhisyhrl
*/
let handler = async (m, {conn, text, usedPrefix, command, db, userdb, senderJid}) => {
const cp = await import('child_process')
const { promisify } = await import('util')
let exec = promisify(cp.exec).bind(cp)
let teks = m.quoted ? m.quoted.text : text
if (!teks) {
return conn.sendWritingText(m.chat, `¿Qué texto quieres guardar??\n\nejemplo:\n${usedPrefix + command} ea`, userdb, m)}
if (teks.length < 10) {
return conn.sendWritingText(m.chat, `El texto es demasiado corto, al menos 10 caracteres.!`, m)
}
await conn.sendWritingText(m.chat, global.wait, userdb, m)
let textb64 = Buffer.from(teks, 'utf-8').toString('base64')
let o
try {
o = await exec(`php php/pastebin.php -p="${textb64}"`)
} catch (e) {
o = e
} finally {
let { stdout, stderr } = o
if (stdout.trim()) m.reply(stdout)
}
}
handler.help = ['pastebin <text>']
handler.tags = ['tools','php']
handler.command = /^(pastebin)$/i

handler.menu = [
{ title: "📋 PASTEBIN", description: "Guardar texto en pastebin y obtener el enlace", id: `pastebin <texto>` }
];
handler.type = "herramientas";
handler.disabled = false;

export default handler
