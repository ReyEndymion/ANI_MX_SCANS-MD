import fetch from 'node-fetch'
let handler = async (m, {conn, text, args, db, userdb, senderJid}) => {
if (!args[0]) return conn.sendWritingText(m.chat, `*[❗] INGRESE EL NOMBRE DE LA APK QUE QUIERA BUSCAR*`, userdb, m)
try {
let enc = encodeURIComponent(text)
let json = await fetch(`https://latam-api.vercel.app/api/playstore?apikey=brunosobrino&q=${enc}`)
let gPlay = await json.json()
let lol = await fetch(`https://api.lolhuman.xyz/api/translate/auto/es?apikey=85faf717d0545d14074659ad&text=${gPlay.descripcion}`)
let loll = await lol.json()
let animxscans = loll.result.translated
if (!gPlay.titulo) return conn.sendWritingText(m.chat, `[ ! ] Sin resultados`, userdb, m)
conn.sendMessage(m.chat,{image:{url: gPlay.imagen},caption:`🔍 Resultado: ${gPlay.titulo}
🧬 Identificador: ${gPlay.id}
⛓️ Link: ${gPlay.link}
🖼️ Imagen: ${gPlay.imagen}
✍️ Desarrollador: ${gPlay.desarrollador}
📜 Descripcion: ${animxscans}
💲 Moneda: ${gPlay.moneda}
🎭 Gratis?: ${gPlay.gratis}
💸 Precio: ${gPlay.precio}
📈 Puntuacion: ${gPlay.puntuacion}`},{quoted:m})
} catch (e) {
return conn.sendWritingText(m.chat, `*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*`, m)

}}
handler.help = ['playstore <aplicacion>']
handler.tags = ['internet']
handler.command = /^(playstore)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
