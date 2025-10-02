/*---------------------------------------------------------------------------------------
🍀 • By https://github.com/ALBERTO9883
🍀 • ⚘Alberto Y Ashly⚘
-----------------------------------------------------------------------------------------*/

import {translate} from '@vitalets/google-translate-api'
import fetch from 'node-fetch'
let handler = async (m, {conn, command, db, userdb, senderJid}) => {
try {

if (command == 'consejo') {
let res = await fetch("https://zenzapis.xyz/randomtext/motivasi?apikey=hdiiofficial")
let json = await res.json()
let frase = json.result.message
let frase1 = await translate(frase, { to: 'es', autoCorrect: true })
await conn.sendWritingText(m.chat, `*┏━━━━━━━━━━━━━━━━┓*\n*┠❧ ${frase1.text}*\n*┗━━━━━━━━━━━━━━━━┚*`, userdb, m)}

if (command == 'fraseromantica') {
let res = await fetch("https://supra-api.herokuapp.com/api/romanticafrase?apikey=supraz")
let json = await res.json()
let { frase } = json
let frase1 = await translate(frase, { to: 'es', autoCorrect: true }).catch(_ => null)
return conn.sendWritingText(m.chat, `*╭─◆────◈⚘◈─────◆─╮*\n*❥ ${frase1.text}*\n*╰─◆────◈⚘◈─────◆─╯*`, userdb, m)}

if (command == 'historiaromantica') {
let res = await fetch("https://api-xcoders.site/api/random/cerpen/cinta?apikey=xcoders")
let json = await res.json()
let { story, title, author_name } = json.result
let storytime = await translate(story, { to: 'es', autoCorrect: true }).catch(_ => null)
let titletime = await translate(title, { to: 'es', autoCorrect: true }).catch(_ => null)
conn.sendWritingText(m.chat, `᭥🫐᭢ Título: ${titletime.text}
᭥🍃᭢ Autor: ${author_name}
────────────────
${storytime.text}`, m)}

} catch (e) {
return conn.sendWritingText(m.chat, `*[❗] OCURRIO UN ERROR, posiblemente la página (API) DE AYUDA ESTE CAÍDA TEMPORALMENTE, INTÉNTELO MÁS TARDE*\n\nerror: ${e.stack}`, userdb, m)
}}
handler.tags = ['frases']
handler.command = handler.help = ['consejo', 'fraseromantica', 'historiaromantica']
handler.menu = [
{title: "💞 | FRASES", description: "TE MUESTRA FRASES DE AMOR, CONSEJOS Y MÁS", id: `consejo`},
];
handler.type = "fun";

handler.disabled = false;

export default handler
