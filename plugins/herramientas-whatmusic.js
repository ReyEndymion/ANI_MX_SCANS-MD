import fs from 'fs'
import acrcloud from 'acrcloud'
let acr = new acrcloud({
host: 'identify-eu-west-1.acrcloud.com',
access_key: 'c33c767d683f78bd17d4bd4991955d81',
access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})

let handler = async (m, {conn}) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
let resp
if (/audio|video/.test(mime)) {
let media = await q.download()
let ext = mime.split('/')[1]
fs.writeFileSync(dirP + `tmp/${m.sender}.${ext}`, media)
let res = await acr.identify(fs.readFileSync(dirP + `tmp/${m.sender}.${ext}`))
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
fs.unlinkSync(dirP + `tmp/${m.sender}.${ext}`)
} else {resp = '*[❗INFO❗] RESPONDA A UN AUDIO*'}
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 15));
txt += c;
count++;
if (count % 10 === 0) {
   await conn.sendPresenceUpdate('composing' , m.chat);
}
}

return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
handler.command = /^quemusica|quemusicaes|whatmusic$/i
export default handler
