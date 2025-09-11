import axiostal from "axios"
let handler = async(m, {conn, text, usedPrefix, xteamkey, db, userdb, senderJid}) => {
let { default: fs } = await import('fs');
let { default: fetch } = await import('node-fetch');
if (!text) return conn.sendWritingText(m.chat, `*[❗INFO❗] INGRESE UN ENLACE / URL EL CUAL DESEA ACORTAR*`, userdb, m)
let json = await (await fetch(`https://api.xteam.xyz/shorturl/tinyurl?url=${text}&apikey=cb15ed422c71a2fb`)).json()
if (!json.status) throw json
let hasil = `*LINK ACORTADO CORECTAMENTE!!*\n\n*LINK ANTERIOR:*\n${text}\n*LINK ACORTADO:*\n*${json.result}*`.trim() 
//m.reply(hasil)

await conn.sendWritingText(m.chat, hasil, userdb, m); 
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
