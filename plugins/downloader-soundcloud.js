import fetch from 'node-fetch'
let handler = async(m, { conn, text }) => {
if (!text) throw `*[❗INFO❗] INGRESE EL NOMBRE DE ALGUNA CANCIÓN PARA BUSCAR*`
try {
let res = await fetch(`https://hadi-api.herokuapp.com/api/soundcloud/play?query=${text}`)
let json = await res.json()
let shortUrl = await (await fetch(`https://tinyurl.com/api-create.php?url=${json.result.download}`)).text()
let soundcloudt = `❒═══❬ *SOUNDCLOUD* ❭═══╾❒
┬
├‣✨ *TÍTULO:* ${json.result.title}
┴
┬
├‣💚 *URL DIRECTO:* ${shortUrl}\n┴\n\n*- _Enviando música..._*\n\n_﹫${wm}_`
conn.sendFile(m.chat, json.result.thumbnail, '', soundcloudt, m)
conn.sendFile(m.chat, json.result.download, 'error.mp3', null, m, false, { mimetype: 'audio/mp4' })
} catch (e) {
throw '*[❗INFO❗] ERROR, NO SE LOGRÓ BUSCAR LA CANCIÓN O LA PÁGINA DE AYUDA PARA BUSCAR LA CANCIÓN ESTÁ CAÍDA, POR FAVOR VUELVA A INTENTARLO MÁS TARDE*'
}}
handler.command = /^(soundcloud|cover)$/i
export default handler
