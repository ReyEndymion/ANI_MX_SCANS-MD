let handler = async (m, { conn, args, text, isBotAdmin, isAdmin }) => {
if (isBotAdmin && isAdmin) {

if (!text && !m.quoted) {
let resp = `*[❗INFO❗] INGRESE EL NOMBRE QUE DESEA QUE SEA EL NUEVO NOMBRE DEL GRUPO O CONTESTE A UN MENSAJE QUE TENGA UN TAG Y SEA COMPATIBLE CON LA CANTIDAD DE 25 CARÁCTERES*`
return conn.sendWritingText(m.chat, resp, m);
} else {
try {
let text2 = m.quoted ? m.quoted.text : text ? `${args.join(" ")}` : m.quoted.text
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
let txto = text2.replace('@' + who.replace(/\s+/g, '').split`@`[0], name).trim()
await conn.groupUpdateDescription(m.chat, txto);
//console.log('funcion desc: ', conn.groupUpdateDescription())
let resp = '*✅ La descripción del grupo se modifico correctamente*'
return conn.sendWritingText(m.chat, resp, m);
} catch (e) {
let resp = `*[❗INFO❗] LO SIENTO HUBO UN ERROR, LA DESCRIPCION NO SE PUDO CAMBIAR*'\n ${e.stack}`
return conn.sendWritingText(m.chat, resp, m);
}
}
} else if (!isBotAdmin && isAdmin)  {
let resp = `*[❗INFO❗] EL BOT NO ES ADMINISTRADOR DEL GRUPO, NO PUEDE REALIZAR ESTA ACCIÓN*`;
return conn.sendWritingText(m.chat, resp, m);
} else {
let resp = `*[❗INFO❗] SOLO UN ADMINISTRADOR DEL GRUPO PUEDE REALIZAR ESTA ACCIÓN*`;
return conn.sendWritingText(m.chat, resp, m);
}
}
handler.help = ['Setdesc <text>']
handler.tags = ['group']
handler.command = /^setdesk|setdesc$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
