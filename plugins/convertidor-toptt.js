import { toPTT } from '../lib/converter.js'
let handler = async (m, { conn, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
if (!/video|audio/.test(mime)) throw `*[❗INFO❗] RESPONDA AL VIDEO O AUDIO QUE DESEE CONVERTIR A NOTA DE VOZ*`
let media = await q.download?.()
if (!media && !/video/.test(mime)) throw '*[❗INFO❗] LO LAMENTO, OCURRIO UN ERROR AL DESCARGAR SU VIDEO, POR FAVOR VUELVA A INTENTARLO*'
if (!media && !/audio/.test(mime)) throw '*[❗INFO❗] LO LAMENTO, OCURRIO UN ERROR AL DESCARGAR SU AUDIO, POR FAVOR VUELVA A INTENTARLO*'
let audio = await toPTT(media, 'mp4')
if (!audio.data && !/audio/.test(mime)) throw '*[❗INFO❗] LO LAMENTO, OCURRIO UN ERROR AL CONVERTIR SU AUDIO A NOTA DE VOZ, POR FAVOR VUELVA A INTENTARLO*'
if (!audio.data && !/video/.test(mime)) throw '*[❗INFO❗] LO LAMENTO, OCURRIO UN ERROR AL CONVERTIR SU VIDEO A NOTA DE VOZ, POR FAVOR VUELVA A INTENTARLO*'
conn.sendFile(m.chat, audio.data, 'error.mp3', '', m, true, { mimetype: 'audio/mp4' })
}
handler.help = ['tovn (reply)']
handler.tags = ['audio']
handler.command = /^to(vn|(ptt)?)$/i
export default handler
