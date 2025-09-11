/*
Made by https://github.com/balhisyhrl
*/
let handler = async (m, {conn, text, usedPrefix, command, db, userdb, senderJid}) => {
const cp = await import('child_process')
const { promisify } = await import('util')
let exec = promisify(cp.exec).bind(cp)
let teks = m.quoted ? m.quoted.text : text
if (!teks) return conn.sendWritingText(m.chat, `Qué texto quieres codificar?\n\nejemplo:\n${usedPrefix + command} tst`, userdb, m)
await conn.sendWritingText(m.chat, global.wait, userdb, m)
let textb64 = Buffer.from(teks, 'utf-8').toString('base64')
let o
try {
o = await exec(`php php/ROT.php --text ${textb64}`)
} catch (e) {
o = e
} finally {
let { stdout, stderr } = o
if (stdout.trim()) m.reply(stdout)
}
}
handler.help = ['rot <text>']
handler.tags = ['tools','php']
handler.command = /^(rot)$/i

handler.menu = [
{ title: "🔄 ROT", description: "Codificar texto en ROT13", id: `rot <texto>` }
];
handler.type = "herramientas";
handler.disabled = false;

export default handler
