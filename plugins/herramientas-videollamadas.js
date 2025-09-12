import fetch from 'node-fetch'
import { API } from '../api.js'
let handler = async (m, {conn, text, usedPrefix, command, db, userdb, senderJid}) => {
if (!text) return conn.sendWritingText(m.chat, `*[❗] INGRESA LA CONTRASEÑA QUE QUIERAS QUE TENGA TU SALA, EJEMPLO ${usedPrefix + command} 12345678*`, m)
let textfilter = text.toLowerCase()
let res = await fetch(API('https://anonyzoom.herokuapp.com', '/index.php', { pass: textfilter }))
let json = await res.json()
if (json.Join_URL == '') { return conn.sendWritingText(m.chat, `*[❗] HUBO UN ERROR AL GENERAR LA SALA VIRTUAL, POR FAVOR INTENTELO DE NUEVO*`, m)
} else {
let zoomA = `*[ GENERADOR DE SALAS DE ZOOM ]*\n
*LINK 𝚉OOM:* ${json.Join_URL}
*CONTRASEÑA:* ${json.Password}
*DURACION DE LA LLAMADA:* ${json.Duration} minutos`
await conn.sendWritingText(m.chat, zoomA, userdb, m)
}}
handler.command = /^(zoom|zoomgen|videollamada)$/i
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
