import { toAudio } from '../lib/converter.js'
let handler = async (m, { conn, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (q || q.msg).mimetype || q.mediaType || ''
if (!/video|audio/.test(mime)) throw `*[❗INFO❗] RESPONDA AL VIDEO O NOTA DE VOZ QUE DESEE CONVERTIR A AUDIO/MP3*`
let media = await q.download()
if (!media) throw '*[❗INFO❗] LO LAMENTO, OCURRIO UN ERROR AL DESCARGAR SU VIDEO, POR FAVOR VUELVA A INTENTARLO*'
let audio = await toAudio(media, 'mp4')
if (!audio.data) throw '*[❗INFO❗] LO LAMENTO, OCURRIO UN ERROR AL CONVERTIR SU NOTA DE VOZ A AUDIO/MP3, POR FAVOR VUELVA A INTENTARLO*'
conn.sendMessage(m.chat, { audio: audio.data,  mimetype: 'audio/mpeg' }, { quoted: m })
}
handler.alias = ['tomp3', 'toaudio']
handler.command = /^to(mp3|audio)$/i
export default handler
