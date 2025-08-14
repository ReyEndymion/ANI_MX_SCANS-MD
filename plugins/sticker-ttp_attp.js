import { API } from '../api.js'
let handler = async(m, {conn, text, args, usedPrefix, command, db, userdb, senderJid}) => {
if (!text) return conn.sendWritingText(m.chat, `*[❗] INGRESE UN TEXTO*\n\n*—◉ EJEMPLO:*\n*◉ ${usedPrefix + command} Mystic-Bot*`, userdb, m)
let teks = encodeURI(text)

if (command == 'attp') {
let teksb = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
conn.sendFile(m.chat, API('xteam', '/attp', { file: '', text: teksb }), 'sticker.webp', '', m, false, { asSticker: true })}

if (command == 'attp2') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/attp?apikey=${lolkeysapi}&text=${teks}`, 'sticker.webp', '',m, { asSticker: true , db})}

if (command == 'attp3') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/attp2?apikey=${lolkeysapi}&text=${teks}`, 'sticker.webp', '',m, { asSticker: true , db})}

if (command == 'ttp5') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/ttp6?apikey=${lolkeysapi}&text=${teks}`, 'sticker.webp', '',m, { asSticker: true , db})}

if (command == 'ttp4') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/ttp5?apikey=${lolkeysapi}&text=${teks}`, 'sticker.webp', '',m, { asSticker: true , db})}

if (command == 'ttp3') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/ttp3?apikey=${lolkeysapi}&text=${teks}`, 'sticker.webp', '',m, { asSticker: true , db})}

if (command == 'ttp2') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/ttp2?apikey=${lolkeysapi}&text=${teks}`, 'sticker.webp', '',m, { asSticker: true , db})}

if (command == 'ttp') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/ttp?apikey=${lolkeysapi}&text=${teks}`, 'sticker.webp', '',m, { asSticker: true , db})}

}
handler.command = handler.help = ['ttp', 'ttp2', 'ttp3', 'ttp4', 'ttp5', 'attp', 'attp2', 'attp3']
handler.tags = ['sticker']
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
