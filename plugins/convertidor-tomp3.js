import { toAudio } from '../lib/converter.js'
let handler = async (m, { conn, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (q || q.msg).mimetype || q.mediaType || ''
if (!/video|audio/.test(mime)) {
return conn.sendWritingText(m.chat, `*[❗INFO❗] RESPONDA AL VIDEO O NOTA DE VOZ QUE DESEE CONVERTIR A AUDIO/MP3*`, m)
} else {
let media = await q.download()
if (!media) {
return conn.sendWritingText(m.chat, '*[❗INFO❗] LO LAMENTO, OCURRIO UN ERROR AL DESCARGAR SU VIDEO, POR FAVOR VUELVA A INTENTARLO*', m)
} else {
let audio = await toAudio(media, 'mp4')
if (!audio.data) {
return conn.sendWritingText(m.chat, '*[❗INFO❗] LO LAMENTO, OCURRIO UN ERROR AL CONVERTIR SU NOTA DE VOZ A AUDIO/MP3, POR FAVOR VUELVA A INTENTARLO*', m)
} else {
return conn.sendMessage(m.chat, { audio: audio.data,  mimetype: 'audio/mpeg' }, { quoted: m })
}
}
}
}
handler.alias = ['tomp3', 'toaudio']
handler.command = /^to(mp3|audio)$/i
export default handler
