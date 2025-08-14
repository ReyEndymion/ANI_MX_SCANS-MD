/* 𝐂𝐑𝐄𝐀𝐃𝐎 𝐏𝐎𝐑 https://github.com/BrunoSobrino

FORMATO DE FUENTES NORMAL POR 
https://github.com/ReyEndymion
*/

let handler = async (m, {conn, usedPrefix, command, db, userdb, senderJid}) => {
if (!m.quoted) return conn.sendWritingText(m.chat, `*[❗INFO❗] RESPONDA A UN VIDEO QUÉ DESEE CONVERTIR EN GIF CON AUDIO*`, userdb, m)
const q = m.quoted || m
let mime = (q.msg || q).mimetype || ''
if (!/(mp4)/.test(mime)) return conn.sendWritingText(m.chat, `*[❗] EL TIPO DE ARCHIVO ${mime} NO ES CORRECTO, RESPONDA A UN VIDEO QUE DESEE CONVERTIR EN GIF CON AUDIO*`, m)
m.reply(global.wait)
let media = await q.download()
conn.sendMessage(m.chat, { video: media, gifPlayback: true, caption: '*_AQUÍ ESTÁ SU GIF CON AUDIO, AL ABRIRLO SE REPRODUCE CON AUDIO_*' }, { quoted: m })}
handler.command = ['togifaud']
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
