import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper'
import fetch from 'node-fetch'
let handler = async (m, { conn, args }) => {
if (!args[0]) throw '*[❗𝐈𝐍𝐅𝐎❗] INSERTE EL COMANDO MAS EL ENLACE / LINK DE UN VIDEO DE YOUTUBE*'
await m.reply(`*_⏳SE ESTA PROCESANDO SU VIDEO...⏳_*\n\n*◉ SI SU VIDEO NO ES ENVIADO, PRUEBE CON EL COMANDO #playdoc O #play.2 ᴏ #ytmp4doc ◉*`)
try {
let qu = args[1] || '360'
let q = qu + 'p'
let v = args[0]
const yt = await youtubedl(v).catch(async _ => await youtubedlv2(v)).catch(async _ => await youtubedlv3(v))
const dl_url = await yt.video[q].download()
const ttl = await yt.title
const size = await yt.video[q].fileSizeH
await await conn.sendMessage(m.chat, { video: { url: dl_url }, fileName: `${ttl}.mp4`, mimetype: 'video/mp4', caption: `▢ TITULO: ${ttl}\n▢ PESO DEL VIDEO: ${size}`, thumbnail: await fetch(yt.thumbnail) }, { quoted: m })
} catch {
await conn.reply(m.chat, '*[❗] NO FUE POSIBLE DESCARGAR EL VIDEO*', m)}
}
handler.command = /^getvid|yt(v|mp4)?$/i
export default handler

/*let limit = 50
import fs from 'fs'
import fetch from 'node-fetch'
import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper';
let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {
if (!args || !args[0]) throw `*[❗INFO❗] INSERTE EL COMANDO MAS EL ENLACE / LINK DE UN VIDEO DE YOUTUBE*`
conn.reply(m.chat, `*_⏳SE ESTA PROCESANDO SU VIDEO...⏳_*\n\n*◉ SI SU VIDEO NO ES ENVIADO, PRUEBE CON EL COMANDO #playdoc O #play.2 O #ytmp4doc ◉*`, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, 
title: 'REPRODUCTOR DE VIDEO',
body: '🌎ANI MX SCANS🌏',         
previewType: 0, thumbnail: fs.readFileSync("./Menu2.jpg"),
sourceUrl: `https://www.facebook.com/ANIMxSCANS`}}})
let chat = global.db.data.chats[m.chat]
const isY = /y(es)/gi.test(args[1])
const { thumbnail, video: _video, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
const limitedSize = (isPrems || isOwner ? 350 : limit) * 3074
let video, source, res, link, lastError, isLimit
for (let i in _video) {
try {
video = _video[i]
isLimit = limitedSize < video.fileSizeH
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
if ((!(source instanceof ArrayBuffer) || !link || !res.ok) && !isLimit) throw '*[❗] ERROR: ' + (lastError || 'NO FUE POSIBLE DESCARGAR EL VIDEO*')
let _thumb = {}
try { _thumb = { thumbnail: await (await fetch(thumbnail)).buffer() } }
catch (e) { }
conn.sendFile(m.chat, link, title + '.mp4', `
*🔥 TITULO:* ${title}
*📁 PESO DEL VIDEO:* ${video.fileSizeH}
`.trim(), m, false, {
..._thumb,
asDocument: chat.useDocument
})}
handler.help = ['mp4', 'v'].map(v => 'yt' + v + ` <url>`)
handler.tags = ['downloader']
handler.command = /^yt(v|mp4)?$/i
export default handler*/
