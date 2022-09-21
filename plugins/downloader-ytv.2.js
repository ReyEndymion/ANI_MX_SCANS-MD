let limit = 80
import fs from 'fs'
import fetch from 'node-fetch'
import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper';
let handler = async (m, { conn, args, isPrems, isOwner }) => {
if (!args || !args[0]) throw '*[❗INFO❗] INSERTE EL COMANDO MAS EL ENLACE / LINK DE UN VIDEO DE YOUTUBE*'
conn.reply(m.chat, `*_⏳SE ESTA PROCESANDO SU VIDEO...⏳_*`, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, 
title: 'REPRODUCTOR DE VIDEO V𝟸',
body: 'BY 🌎ANI MX SCANS🌏',         
previewType: 0, thumbnail: fs.readFileSync("./Menu2.jpg"),
sourceUrl: `https://github.com/ReyEndymion/ANI_MX_SCANS-MD`}}})
let chat = global.db.data.chats[m.chat]
const isY = /y(es)/gi.test(args[1])
const { thumbnail, video: _video, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
const limitedSize = (isPrems || isOwner ? 99 : limit) * 1024
let video, source, res, link, lastError, isLimit
for (let i in _video) {
try {
video = _video[i]
isLimit = limitedSize < video.fileSize
if (isLimit) continue
link = await video.download()
if (link) res = await fetch(link)
isLimit = res?.headers.get('content-length') && parseInt(res.headers.get('content-length')) < limitedSize
if (isLimit) continue
if (res) source = await res.arrayBuffer()
if (source instanceof ArrayBuffer) break
} catch (e) {
video = source = link = null
lastError = e
}}
conn.sendMessage(m.chat, { document: { url: link }, mimetype: 'video/mp4', fileName: title + `.mp4`}, {quoted: m})
}
handler.command = /^ytmp4doc|ytvdoc|ytmp4.2|ytv.2$/i
export default handler
