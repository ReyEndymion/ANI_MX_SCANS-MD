import fetch from 'node-fetch'
let handler = async (m, {command, conn, text}) => {
if (!text) throw `[❗INFO❗] NOMBRE DE LA CANCION FALTANTE, POR FAVOR INGRESE EL COMANDO MAS EL NOMBRE/TITULO O ENLACE DE ALGUNA CANCION O VIDEO DE YOUTUBE\n\n*—◉ EJEMPLO:\n#play.1 Good Feeling - Flo Rida*`
try {
let res = await fetch(`https://api.lolhuman.xyz/api/ytplay2?apikey=${lolkeysapi}&query=${text}`)
if (command == 'play.1') {
conn.reply(m.chat, `*_⏳ SE ESTÁ PROCESANDO SU AUDIO...⏳_*`, m)  
let json = await res.json()
conn.sendFile(m.chat, json.result.audio, 'error.mp3', null, m, false, { mimetype: 'audio/mp4' })}
if (command == 'play.2') {
conn.reply(m.chat, `*_⏳ SE ESTÁ PROCESANDO SU VIDEO...⏳_*`, m)
let json = await res.json()
conn.sendFile(m.chat, json.result.dlmp4, 'error.mp4', `_🌎ANI MX SCANS🌏_`, m)}
}catch(e){
m.reply('*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*')
}}
handler.help = ['play.1' , 'play.2'].map(v => v + ' <texto>')
handler.tags = ['downloader']
handler.command = ['play.1', 'play.2']
export default handler
