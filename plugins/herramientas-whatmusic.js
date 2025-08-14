import fs from 'fs'
import acrcloud from 'acrcloud'
import { temp } from '../config.js';
import path from 'path'
let acr = new acrcloud({
host: 'identify-eu-west-1.acrcloud.com',
access_key: 'c33c767d683f78bd17d4bd4991955d81',
access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})

let handler = async (m, {conn, db, userdb, senderJid}) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
let resp
if (/audio|video/.test(mime)) {
let media = await q.download()
let ext = mime.split('/')[1]
fs.writeFileSync(path.join(temp, `${senderJid}.${ext}`), media)
let res = await acr.identify(fs.readFileSync(path.join(temp, `${senderJid}.${ext}`)))
let { code, msg } = res.status
if (code !== 0) {resp = msg}
let { title, artists, album, genres, release_date } = res.metadata.music[0]
resp = `RESULTADOS DE LA BUSQUEDA\n\n
• 📌 TITULO: ${title}
• 👨‍🎤 ARTISTA: ${artists !== undefined ? artists.map(v => v.name).join(', ') : 'No encontrado'}
• 💾 ALBUM: ${album.name || 'No encontrado'}
• 🌐 GENERO: ${genres !== undefined ? genres.map(v => v.name).join(', ') : 'No encontrado'}
• 📆 FECHA DE LANZAMIENTO: ${release_date || 'No encontrado'}
`.trim()
fs.unlinkSync(path.join(temp, `${senderJid}.${ext}`))
} else {resp = '*[❗INFO❗] RESPONDA A UN AUDIO*'}


return conn.sendWritingText(m.chat, resp, userdb, m)
}
handler.command = /^quemusica|quemusicaes|whatmusic$/i
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
