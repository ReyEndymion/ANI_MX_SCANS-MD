import translate from '@vitalets/google-translate-api'
import fetch from 'node-fetch'
import * as cheerio from 'cheerio'
import { API } from '../api.js'
let handler = async (m, {conn, text, db, userdb, senderJid}) => {
let resp, imagen
if (!text) {resp = `*[❗INFO❗] INGRESE EL NOMBRE DE ALGUN ANIME QUE DESEE BUSCAR*`}
try {
let res = await fetch(API('https://api.jikan.moe', '/v4/search/anime', { q: text }))
if (!res.ok) {resp = await res.text()}
let json = await res.json()
let { title, members, synopsis, episodes, url, rated, score, image_url, type, start_date, end_date, mal_id } = json.results[0]
let res2 = await fetch(`https://myanimelist.net/anime/${mal_id}`)
if (!res2.ok) {resp = await res2.text()}
let html = await res2.text()
const tld = 'cn'
let resultes = await translate(`${synopsis}`, { to: 'es', autoCorrect: true })
resp = `✨ *Titulo:* ${title}
🎆 *Episodios:* ${episodes}
💬 *Transmitido en:* ${type}
💌 *Rating:* ${rated}
❤️ *Score:* ${score}
👥 *Miembros:* ${members}
💚 *Sinopsis:* ${resultes.text}
🌐 *URL*: ${url}`
imagen = image_url
} catch {
let res = await fetch(API('https://api.jikan.moe', '/v4/search/anime', { q: text }))
if (!res.ok) {resp = await res.text()}
let json = await res.json()
let { title, members, synopsis, episodes, url, rated, score, image_url, type, start_date, end_date, mal_id } = json.results[0]
let res2 = await fetch(`https://myanimelist.net/anime/${mal_id}`)
if (!res2.ok) {resp = await res2.text()}
let html = await res2.text()
resp = `✨ *Titulo:* ${title}
🎆 *Episodios:* ${episodes}
💬 *Transmitido en:* ${type}
💌 *Rating:* ${rated}
❤️ *Score:* ${score}
👥 *Miembros:* ${members}
💚 *Sinopsis:* ${synopsis}
🌐 *URL*: ${url}`
imagen = image_url
}
if (!imagen) {
await conn.sendWritingText(m.chat, resp, userdb, m)}
if (imagen && resp) {
await conn.sendImageWriting(m.chat, imagen, resp, userdb, m); 
}
}
handler.help = ['animeinfo <anime>']
handler.tags = ['internet']
handler.command = /^(animeinfo)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
