import fetch from 'node-fetch'
import { format } from 'util'

let handler = async (m, {conn, text, db, userdb, senderJid}) => {
if (!text) return conn.sendWritingText(m.chat, `Masukkan url`, userdb, m)
let { href: url, origin } = new URL(text)
let res = await fetch(url, { headers: { 'referer': origin }})
if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) return conn.sendWritingText(m.chat, `Content-Length: ${res.headers.get('content-length')}`, userdb, m)
if (!/text|json/.test(res.headers.get('content-type'))) return conn.sendFile(m.chat, url, 'file', text, m)
let txt = await res.buffer()
try {
txt = format(JSON.parse(txt + ''))
} catch (e) {
txt = txt + ''
} finally {
m.reply(txt.slice(0, 65536) + '')
}
}
handler.help = ['fetch']
handler.tags = ['tools']
handler.alias = ['get', 'fetch']
handler.command = /^(fetch|get)$/i
handler.rowner = true
handler.menu = [
{ title: "?? Fetch", description: "Obtiene el contenido de una URL", id: `fetch` }
];
handler.type = "herramientas";
handler.disabled = false;

export default handler
