import gtts from 'node-gtts'
import { readFileSync, unlinkSync } from 'fs'
import { join } from 'path'
const {  temp  } = await import('../config.js');

let handler = async (m, {conn, args, usedPrefix, command, db, userdb, senderJid}) => {

const defaultLang = 'es'
let lang = args[0]
let text = args.slice(1).join(' ')
if ((args[0] || '').length !== 2) {
lang = defaultLang
text = args.join(' ')
}
if (!text && m.quoted?.text) text = m.quoted.text

if (!text) return conn.sendWritingText(m.chat, `*[❗INFO❗] INSERTE EL TEXTO QUE QUIERA CONVERTIR A NOTA DE VOZ, EJEMPLO: ${usedPrefix + command} es Hola Mundo*`, userdb, m)
let res
try { res = await tts(text, lang) }
catch (e) {
await conn.sendWritingText(m.chat, e.stack, userdb, m)
text = args.join(' ')
res = await tts(text, defaultLang)
} finally {
if (res) await conn.sendAudioRecording(m.chat, res, m)//conn.sendFile(m.chat, res, 'tts.opus', null, m, true)
}}
handler.help = ['tts <lang> <teks>']
handler.tags = ['tools']
handler.command = /^g?tts$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler

function tts(text, lang = 'es') {
console.log(lang, text)
return new Promise((resolve, reject) => {
try {
let tts = gtts(lang)
let filePath = join(temp, (1 * new Date) + '.wav')
tts.save(filePath, text, () => {
resolve(readFileSync(filePath))
unlinkSync(filePath)
})
} catch (e) { reject(e) }
})}
