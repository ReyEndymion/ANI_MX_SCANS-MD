import fetch from 'node-fetch'
let handler = async(m, { conn, text }) => {
if (!text) throw `*[❗INFO❗] INGRESE EL NOMBRE DE ALGUNA CANCION A BUSCAR*`
try {
let res = await fetch(global.API('zeks', '/api/spotify', { q: text }, 'apikey'))
if (!res.ok) throw await res.text()
let json = await res.json()
if(!json.data[0]) throw json
let { title, artists, album, thumb, url, preview_mp3 } = json.data[0]
let spotifyi = `❒═════❬ *SPOTIFY* ❭═════╾❒
┬
├‣✨ *TITULO:* ${title}
┴
┬
├‣🗣️ *ARTISTA:* ${artists}
┴
┬
├‣🎆 *ALBUM:* ${album}
┴
┬
├‣🌐 *URL*: ${url}
┴
┬
├‣💚 *URL DIRECTO:* ${preview_mp3}\n┴\n\n*_- Enviando musica de previsualizacion_*\n\n_﹫🌎ANI MX SCANS🌏_`

conn.sendFile(m.chat, thumb, '', spotifyi, m)
conn.sendFile(m.chat, preview_mp3, 'spotify.mp3', spotifyi, m)
} catch (e) {
throw '*[❗INFO❗] ERROR, NO SE LOGRO BUSCAR LA CANCION O LA PAGINA DE AYUDA PARA BUSCAR LA CANCION ESTA CAIDA, POR FAVOR VUELVA A INTERNTARLO MAS TARDE*'
}}
handler.command = /^(spotify|music)$/i
handler.help = ['spotify']
handler.tags = ['general']
export default handler
