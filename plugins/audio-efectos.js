import { unlinkSync, readFileSync } from 'fs'
import { join } from 'path'
import { exec } from 'child_process'
import { getRandom } from '../lib/functions.js'
let handler = async (m, {conn, args, pluginsPath, usedPrefix, command, db, userdb, senderJid}) => {
const {temp} = await import('../config.js')
try {
let q = m.quoted ? m.quoted : m
let mime = ((m.quoted ? m.quoted : m.msg).mimetype || '')
let set
if (/bass/.test(command)) set = '-af equalizer=f=94:width_type=o:width=2:g=30'
if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'
if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
if (/earrape/.test(command)) set = '-af volume=12'
if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
if (/reverse/.test(command)) set = '-filter_complex "areverse"'
if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
if (/tupai|squirrel|chipmunk/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'
if (/audio/.test(mime)) {
let ran = getRandom('.mp3')
let filename = join(temp, `/${ran}`)
let media = await q.download(true)
exec(`ffmpeg -i ${media} ${set} ${filename}`, async (err, stderr, stdout) => {
try {
if (err) return conn.sendWritingText(m.chat, `_*Error!*_: ${err}`, userdb, m)
let buff = readFileSync(filename)
//, ran, null, true, {type: 'audioMessage', ptt: true }
await conn.sendAudioRecording(m.chat, buff, m)
} catch (error) {
return conn.sendWritingText(m.chat, `_*Error!*_: ${error.stack}`, userdb, m)
} finally {
try {
unlinkSync(media)
unlinkSync(filename)
} catch (error) {
console.warn('No se pudo borrar')
}
}
})
} else return conn.sendWritingText(m.chat, `*[❗INFO❗] RESPONDA AL AUDIO O NOTA DE VOZ EL CUAL SERA MODIFICADO, USADO EL COMANDO ${usedPrefix + command}*`, userdb, m)
} catch (e) {
throw e
}}
handler.help = ['bass', 'blown', 'deep', 'earrape', 'fast', 'fat', 'nightcore', 'reverse', 'robot', 'slow', 'smooth', 'tupai'].map(v => v + ' [vn]')
handler.tags = ['audio']
handler.command = /^(bass|blown|deep|earrape|fas?t|nightcore|reverse|robot|slow|smooth|tupai|squirrel|chipmunk)$/i
handler.menu = [
{title: "🎤 BASS", description: "responde a un audio o nota de voz con #bass", id: `bass`},
{title: "🎤 BLOWN", description: "responde a un audio o nota de voz con #blown", id: `blown`},
{title: "🎤 DEEP", description: "responde a un audio o nota de voz con #deep", id: `deep`},
{title: "🎤 EARRAPE", description: "responde a un audio o nota de voz con #earrape", id: `earrape`}, 
{title: "🎤 FAST", description: "responde a un audio o nota de voz con #fast", id: `fast`},
{title: "🎤 FAT", description: "responde a un audio o nota de voz con #fat", id: `fat`},
{title: "🎤 NIGHTCORE", description: "responde a un audio o nota de voz con #nightcore", id: `nightcore`},
{title: "🎤 REVERSE", description: "responde a un audio o nota de voz con #reverse", id: `reverse`},
{title: "🎤 ROBOT", description: "responde a un audio o nota de voz con #robot", id: `robot`}, 
{title: "🎤 SLOW", description: "responde a un audio o nota de voz con #slow", id: `slow`},
{title: "🎤 SMOOTH", description: "responde a un audio o nota de voz con #smooth", id: `smooth`}, 
{title: "🎤 TUPAI", description: "responde a un audio o nota de voz con #tupai", id: `tupai`},
];
handler.type = "audioefect";
handler.disabled = false;

export default handler
