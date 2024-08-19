import gtts from 'node-gtts'
import { readFileSync, unlinkSync } from 'fs'
import { join } from 'path'

const defaultLang = 'es'
let handler = async (m, { conn, args, usedPrefix, command }) => {

let lang = args[0]
let text = args.slice(1).join(' ')
let res
if ((args[0] || '').length !== 2) {
lang = defaultLang
text = args.join(' ')
res = await tts(text, defaultLang)
}
if (!text && m.quoted?.text) text = m.quoted.text
try { 
console.log('gtts: ', res)
if (!text) {
return conn.sendWritingText(m.chat, `*[❗INFO❗] INSERTE EL TEXTO QUE QUIERA CONVERTIR A NOTA DE VOZ, EJEMPLO: ${usedPrefix + command} es Hola Mundo*`, m)
} else { 
}

} catch (e) {
return conn.sendWritingText(m.chat, e + '', m)
} finally {
text = args.join(' ')
res = await tts(text, lang)
if (res) {
//return conn.sendMessage(m.chat, { audio: res/*, seconds: '3600'*/, ptt: true, mimetype: 'audio/mpeg', fileName: `a.mp3` }, { quoted: m, ephemeralExpiration: 2*60*1000 })
return conn.sendAudioRecording(m.chat, res, m)
}
}
}
handler.help = ['tts <lang> <teks>']
handler.tags = ['tools']
handler.command = /^g?tts$/i
export default handler

function tts(text, lang = 'es') {
return new Promise((resolve, reject) => {
try {
let tts = gtts(lang)
let filePath = join(global.__dirname(import.meta.url), '../tmp', (1 * new Date) + '.wav')
tts.save(filePath, text, () => {
resolve(readFileSync(filePath))
unlinkSync(filePath)
})
} catch (e) { reject(e) }
})}
