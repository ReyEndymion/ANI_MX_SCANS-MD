let handler = async (m, {conn, usedPrefix, text, db, userdb, senderJid}) => {
if (conn.user.jid !== global.userBot) throw false
let users = [...new Set([...global.conns.filter(conn => conn.user && conn.state !== 'close').map(conn => conn.user.jid)])]
let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
let teks = text ? text : cc.text
let content = conn.cMod(m.chat, cc, /bc|broadcast/i.test(teks) ? teks : '*〔 DIFUSION A SUB BOTS 〕*\n\n' + teks)
for (let id of users) {
await delay(1500)
await conn.copyNForward(id, content, true)
}
conn.sendWritingText(m.chat, `*Difusión enviada con éxito a ${users.length} sub bots*

${users.map(v => '👉🏻 wa.me/' + v.replace(/[^0-9]/g, '') + `?text=${encodeURIComponent(usedPrefix)}estado`).join('\n')}
\n*Se finalizo con el envió en ${users.length * 1.5} segundos aproximadamente*`.trim(), userdb, m)
}
handler.command = /^bcbot$/i
handler.rowner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

handler.help = [];
handler.tags = [];
handler.menu = [
{title: 'SERBOT/JADIBOT-BROADCAST', description: 'Utiliza Este comando Para enviar un mensaje a todos los subbots\nComando: #bcbot', id: 'bcbot'}
];
handler.type = "menubots";
handler.disabled = false;

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const delay = time => new Promise(res => setTimeout(res, time))