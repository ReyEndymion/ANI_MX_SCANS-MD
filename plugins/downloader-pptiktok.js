import fetch from 'node-fetch'
let handler = async (m, {conn, args, text, db, userdb, senderJid}) => {
if (!text) return conn.sendWritingText(m.chat, `*[❗INFO❗] INGRESE EL NOMBRE DE USUARIO DE UN USUARIO DE TIKTOK*`, userdb, m)
let res = `https://api.lolhuman.xyz/api/pptiktok/${text}?apikey=${lolkeysapi}`
conn.sendFile(m.chat, res, 'error.jpg', `*[ ✔ ] AQUI ESTA LA FOTO DE PERFIL DE ${text}*`, m, false)}
handler.help = ['tiktokfoto'].map(v => v + ' <username>')
handler.tags = ['downloader']
handler.command = /^(tiktokfoto|pptiktok)$/i
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
