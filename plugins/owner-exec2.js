import cp, { exec as _exec } from 'child_process'
import { promisify } from 'util'
let exec = promisify(_exec).bind(cp)
let handler = async (m, {conn, isOwner, command, text, db, userdb, senderJid, objs}) => {
const {dataBot} = await import('../lib/functions.js')
const {nameReg} = objs
const data = await dataBot(nameReg)
if (data.jid != conn.user.jid && !isOwner) return
let {key} = await conn.sendWritingText(m.chat, `Executing...`, userdb, m)
let o
try {
o = await exec(command.trimStart()+ ' ' + text.trimEnd())
} catch (e) {
o = e
} finally {
let { stdout, stderr } = o
if (stdout.trim()) conn.sendEditWritingText(m.chat, stdout, key, userdb, m)
if (stderr.trim()) conn.sendEditWritingText(m.chat, stderr, key, userdb, m)
if (!stdout && !stderr) return conn.sendEditWritingText(m.chat, '✅ Comando ejecutado exitosamente, pero no hubo salida.', key, userdb, m)
}
}
handler.customPrefix = /^[$]/
handler.command = new RegExp
handler.rowner = true
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
