import fetch from 'node-fetch'
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `*[❗INFO❗] INGRESE EL ENLACE DE TWITTER, EJEMPLO: ${usedPrefix + command}* https://twitter.com/auronplay/status/1586487664274206720?s=20&t=3snvkvwGUIez5iWYQAehpw` 
let res = await twitterDl(text)
await m.reply(global.wait)
for (let x = 0; x < res.media.length; x++) {
let caption = x === 0 ? res.caption.replace(/https:\/\/t.co\/[a-zA-Z0-9]+/gi, '').trim() : '*AQUI ESTA SU VIDEO*'
await conn.sendFile(m.chat, res.media[x].url, 'error.mp4', caption, m)}}
handler.command = /^((twdl|tw|twt|twitter)(dl)?)$/i
export default handler
async function twitterDl(url) {
let id = /twitter\.com\/[^/]+\/status\/(\d+)/.exec(url)?.[1]
if (!id) throw '*[❗INFO❗] INGRESE UN ENLACE VALIDO DE TWITTER, EJEMPLO: #twitter* https://twitter.com/auronplay/status/1586487664274206720?s=20&t=3snvkvwGUIez5iWYQAehpw'
let res = await fetch(`https://tweetpik.com/api/tweets/${id}`)
if (res.status !== 200) throw res.statusText
let json = await res.json()
if (json.media) {
let media = []
for (let i of json.media) {
if (/video|animated_gif/.test(i.type)) {
let vid = await (await fetch(`https://tweetpik.com/api/tweets/${id}/video`)).json()
vid = vid.variants.pop()
media.push({ url: vid.url, type: i.type })
} else {
media.push({ url: i.url, type: i.type })}}
return {
caption: json.text, media 
}} else throw '*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*' }
