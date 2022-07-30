import hx from 'hxz-api'
import fetch from 'node-fetch'
let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!(args[0])) throw `*[❗INFO❗] INGRESE UN ENLACE DE INSTAGRAM, EJEMPLO: ${usedPrefix + command} https://www.instagram.com/reel/Cc0NuYBg8CR/?utm_source=ig_web_copy_link*`
hx.igdl(args[0]).then(async (r) => {
for (let i = 0; i < r.medias.length; i++) {
let shortUrl = await (await fetch(`https://tinyurl.com/api-create.php?url=${r.medias[i].url}`)).text()
let txt = `🔗 *Url:* ${shortUrl}`.trim()
await conn.sendFile(m.chat, r.medias[i].url, '', txt, m)
}})}
handler.command = /^instagramdl|instagram|igdl|ig$/i
handler.dfail = null
export default handler
