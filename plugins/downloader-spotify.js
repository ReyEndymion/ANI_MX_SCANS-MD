import fetch from 'node-fetch'
let handler = async(m, {conn, text, db, userdb, senderJid}) => {
if (!text) return conn.sendWritingText(m.chat, `*[❗INFO❗] INGRESE EL NOMBRE DE ALGUNA CANCIÓN A BUSCAR*`, userdb, m)
try {
let res = await fetch(`https://api.lolhuman.xyz/api/spotifysearch?apikey=${lolkeysapi}&query=${text}`)
let json = await res.json()
let { link } = json.result[0]
let res2 = await fetch(`https://api.lolhuman.xyz/api/spotify?apikey=${lolkeysapi}&url=${link}`)
let json2 = await res2.json()
let { thumbnail, title, artists, preview_url } = json2.result
let spotifyi = `❒═════❬ SPOTIFY❭═════╾❒\n┬\n├‣✨ *TÍTULO:* ${title}\n┴\n┬\n├‣🗣️ *ARTISTA:* ${artists}\n┴\n┬\n├‣🌐 *URL*: ${link}\n┴\n┬\n├‣💚 *URL DE DESCARGA:* ${preview_url}\n┴`
conn.sendFile(m.chat, thumbnail, 'error.jpg', spotifyi, m)
await conn.sendFile(m.chat, preview_url, 'error.mp3', null, m, false, { mimetype: 'audio/mp4' }) 
} catch (e) {
return conn.sendWritingText(m.chat, `*[❗INFO❗] ERROR, NO SE LOGRÓ BUSCAR LA CANCIÓN O LA PÁGINA DE AYUDA PARA BUSCAR LA CANCIÓN ESTÁ CAÍDA, POR FAVOR VUELVE A INTENTARLO MÁS TARDE*`, m)
}}
handler.command = /^(spotify|music)$/i
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
