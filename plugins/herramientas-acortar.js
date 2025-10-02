import axiostal from "axios"
let handler = async(m, {conn, text, usedPrefix, xteamkey, db, userdb, senderJid}) => {
let { default: fs } = await import('fs');
let { default: fetch } = await import('node-fetch');
if (!text) return conn.sendWritingText(m.chat, `*[❗INFO❗] INGRESE UN ENLACE / URL EL CUAL DESEA ACORTAR*`, userdb, m)
try {
let res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(text)}`);
let shortUrl = await res.text();

console.error('info:', res);
if (!shortUrl.startsWith('http')) 
throw new Error('No se pudo acortar el enlace');

let hasil = `**LINK ACORTADO CORRECTAMENTE!!**\n\n` +
`*LINK ANTERIOR:*\n${text}\n` +
`*LINK ACORTADO:*\n${shortUrl}`;

return conn.sendWritingText(m.chat, hasil, userdb, m);

} catch (e) {
console.error(e);
await conn.sendWritingText(m.chat, `⚠️ Ocurrió un error al intentar acortar el enlace`, userdb, m);
}
}

handler.help = ['tinyurl','acortar'].map(v => v + ' <link>')
handler.tags = ['tools']
handler.command = /^(tinyurl|short|acortar|corto)$/i
handler.fail = null
handler.menu = [
{title:"💎 ACORTAR ENLACES", description: "acorta enlaces usando #tinyurl <enlace>", id: `tinyurl`}
];
handler.type = "herramientas";
handler.disabled = false;

export default handler
