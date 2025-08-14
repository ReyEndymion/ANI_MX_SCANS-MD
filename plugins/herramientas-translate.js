let handler = async (m, {conn, args, usedPrefix, command, db, userdb, senderJid}) => {
const {default: translate} = await import('@vitalets/google-translate-api');
const {default: fetch} = await import('node-fetch');
let resp = ''
if (!args || !args[0]) {
resp = `*[❗INFO❗] USO CORRECTO DEL COMANDO ${usedPrefix + command} (idioma) (texto)*\n*EJEMPLO:*\n*${usedPrefix + command} es Hello*\n\n*CONOCE LOS IDIOMAS ADMITIDOS EN:*\n*- https://cloud.google.com/translate/docs/languages*`
return conn.sendWritingText(m.chat, resp, m )
}
let lang = args[0]
let text = args.slice(1).join(' ')
const defaultLang = 'es'
if ((args[0] || '').length !== 2) {
lang = defaultLang
text = args.join(' ')}
if (!text && m.quoted && m.quoted.text) text = m.quoted.text
try { 
let result = await translate(`${text}`, { to: lang, autoCorrect: true })
resp = '*Traducción:* ' + result.text
return conn.sendWritingText(m.chat, resp, m )
} catch {
try {
let lol = await fetch(`https://api.lolhuman.xyz/api/translate/auto/${lang}?apikey=85faf717d0545d14074659ad&text=${text}`)
let loll = await lol.json()
let result2 = loll.result.translated
resp = '*Traducción:* ' + result2
return conn.sendWritingText(m.chat, resp, m )
} catch (e) {
resp = `*[❗INFO❗] ERROR: ${e}, VUELVA A INTENTARLO*`
return conn.sendWritingText(m.chat, resp, m )
}}}
handler.command = /^(translate|traducir|trad)$/i
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
