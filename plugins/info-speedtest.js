import cp from 'child_process'
import { promisify } from 'util'
let exec = promisify(cp.exec).bind(cp)
let handler = async (m, {conn, userdb, isROwner}) => {
let {key} = await conn.sendWritingText(m.chat, `⏳ _Cargando, aguarde un momento_`, userdb, m)
const aguarde = [
'*⌛ _Cargando, aguarde un momento..._ ▭▭▭▭*',
'*⏳ _Cargando, aguarde un momento..._ ▬▭▭▭*',
'*⌛ _Cargando, aguarde un momento..._ ▬▬▭▭*',
'*⏳ _Cargando, aguarde un momento..._ ▬▬▬▭*',
'*⌛ _Terminando, aguarde un momento..._ ▬▬▬▬*'
]

for (let i = 0; i < aguarde.length; i++) {
await conn.sendEditWritingText(m.chat, aguarde[i], key, userdb, m)
}

let o
try {
o = await exec(process.platform === 'win32' ? 'py speed.py' : 'python3 speed.py')

} catch (e) {
o = e
} finally {
const {sanitizeSpeedtestOutput} = await import('../lib/functions.js')
let { stdout, stderr } = o
if (stdout.trim()) {
if (m.isGroup || !isROwner) {
conn.sendEditWritingText(m.chat, sanitizeSpeedtestOutput(stdout), key, userdb, m)
} else {
conn.sendEditWritingText(m.chat, stdout, key, userdb, m)
}
}
if (stderr.trim()) {
if (m.isGroup || !isROwner) {
conn.sendEditWritingText(m.chat, sanitizeSpeedtestOutput(stderr), key, userdb, m)
} else {
conn.sendEditWritingText(m.chat, stderr, key, userdb, m)
}
}
}
}
handler.help = ['speedtest']
handler.tags = ['info']
handler.command = /^(speedtest?|test?speed)$/i

handler.menu = [
{title:"🌠 SPEEDTEST", description: "muestra la velocidad de conexi�n del bot usando #speedtest", id: `speedtest`},
];
handler.type = "info";
handler.disabled = false;

export default handler
