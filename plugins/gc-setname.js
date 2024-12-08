
let handler = async (m, { conn, args, text, isBotAdmin, isAdmin }) => {
if (isBotAdmin && isAdmin) {
if (!text && !m.quoted) {
let resp = `*[❗INFO❗] INGRESE EL NOMBRE QUE DESEA QUE SEA EL NUEVO NOMBRE DEL GRUPO O CONTESTE A UN MENSAJE QUE TENGA UN TAG Y SEA COMPATIBLE CON LA CANTIDAD DE 25 CARÁCTERES*`;

return conn.sendWritingText(m.chat, resp, m);
}

try {
let text2 = m.quoted ? m.quoted.text : text;

let mentions = [...text2.matchAll(/@\d+/g)];

if (mentions.length > 0) {
for (const mention of mentions) {
const phoneNumber = mention[0].replace('@', '');
const name = await conn.getName(`${phoneNumber}@s.whatsapp.net`);
text2 = text2.replace(new RegExp(mention[0], 'g'), name);
}
}

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
let name = await conn.getName(who);
let txto = text2.includes('@') ? text2 : text2.replace(new RegExp(who.replace(/\s+/g, '').split`@`[0], 'g'), name);

console.log(txto);
conn.groupUpdateSubject(m.chat, txto);

} catch (e) {
let resp = `*[❗INFO❗] LO SIENTO HUBO UN ERROR ${e.stack}, EL NOMBRE NO PUEDE SER MAS DE 25 CARACTERES*`;
return conn.sendWritingText(m.chat, resp, m);
}
} else if (!isBotAdmin && isAdmin)  {
let resp = `*[❗INFO❗] EL BOT NO ES ADMINISTRADOR DEL GRUPO, NO PUEDE REALIZAR ESTA ACCIÓN*`;
return conn.sendWritingText(m.chat, resp, m);
} else {
let resp = `*[❗INFO❗] SOLO UN ADMINISTRADOR DEL GRUPO PUEDE REALIZAR ESTA ACCIÓN*`;
return conn.sendWritingText(m.chat, resp, m);
}
};
handler.help = ['setname <text>'];
handler.tags = ['group'];
handler.command = /^(setname)$/i;
handler.group = true;
handler.admin = true;

export default handler;
//adaptación https://github.com/SinNombre999
//arreglos finales Rey Endymion
