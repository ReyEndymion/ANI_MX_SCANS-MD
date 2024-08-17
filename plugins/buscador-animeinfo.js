import translate from '@vitalets/google-translate-api'
import fetch from 'node-fetch'
import * as cheerio from 'cheerio'
let handler = async (m, { conn, text }) => {
    let resp, imagen
if (!text) {resp = `*[❗INFO❗] INGRESE EL NOMBRE DE ALGUN ANIME QUE DESEE BUSCAR*`}
try {
let res = await fetch(global.API('https://api.jikan.moe', '/v4/search/anime', { q: text }))
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
let res = await fetch(global.API('https://api.jikan.moe', '/v4/search/anime', { q: text }))
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
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 1));
txt += c;
count++;
if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
}
}
if (!imagen) {
await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
if (imagen && resp) {
await conn.sendMessage(m.chat, { image: {url: imagen}, caption: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});  
}
}
handler.help = ['animeinfo <anime>']
handler.tags = ['internet']
handler.command = /^(animeinfo)$/i
export default handler
