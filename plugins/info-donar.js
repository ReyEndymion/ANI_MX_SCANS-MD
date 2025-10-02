/* ⚠ POR FAVOR NO MODIFIQUES NADA DE AQUÍ ⚠ */

let handler = async (m, {conn, info, usedPrefix, db, objs, userdb, senderJid}) => {
const fs = await import('fs')
const {owner} = await import('../config.js')
const {imagen1} = objs
let ow = owner.filter(entry => typeof entry[0] === `string` && !isNaN(entry[0])).map(entry => ({ jid: entry[0] })).map(({jid}) => `@${jid.split`@`[0]}`).join` y `
let userm = `@${senderJid.split`@`[0]}`
let estado = {key: {participant: "0@s.whatsapp.net", "remoteJid": "0@s.whatsapp.net", id: m.key.id, fromMe: false}, "message": {"groupInviteMessage": {"groupJid": m.chat, "inviteCode": "m", "groupName": "P", "caption": info.nanipe, 'jpegThumbnail': fs.readFileSync(imagen1)}}}
let donar =`
*┏ ┅ ━━━━━━━━━ ┅ ━*
*┇「 DONAR 」*
*┣ ┅ ━━━━━━━━━ ┅ ━*
*┃ HOLA ${userm} 💙*
*┃*
*┃ 👉🏻 AQUI ALGUNOS DATOS*
*┃ POR SI GUSTAS APOYAR :𝟹*

*┃ ➤ CONCEPTO: APOYO*
*┃ ➤ PAYPAL: paypal.me/AMxScan*
*┃ 👉🏻 CONTACTAME SI NECESITAS MAS DATOS Y PARA AGRADECERTE <3*
*┃ ${ow}*
*┗ ┅ ━━━━━━━━━ ┅ ━*\n\n
Usa el comando : *${usedPrefix}paypal* para mostrar el enlace completo\n\n
${info.nanipe}
`.trim()
return conn.sendWritingText(m.chat, donar, userdb, estado) 
}
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si|r)|apoyar$/i
handler.menu = [
{title:"💎 DONAR", description: "muestra información de como donar al bot usando #donar", id: `donar`}
];
handler.type = "info";
handler.disabled = false;

export default handler
