/* ⚠ POR FAVOR NO MODIFIQUES NADA DE AQUÍ ⚠ */

let handler = async (m, { conn, usedPrefix, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
let userm = `@${who.replace(/@.+/, '')}`
let donar =`
*┏ ┅ ━━━━━━━━━ ┅ ━*
*┇          「 DONAR 」*
*┣ ┅ ━━━━━━━━━ ┅ ━*
*┃ HOLA ${userm} 💙*
*┃*
*┃ 👉🏻 AQUI ALGUNOS DATOS*
*┃ POR SI GUSTAS APOYAR :𝟹*

*┃ ➤ CONCEPTO: APOYO*  
*┃ ➤ PAYPAL: paypal.me/AMxScan*
*┃ 👉🏻 CONTACTAME SI NECESITAS MAS DATOS Y PARA AGRADECERTE <3*
*┃ wa.me/5215517489568*
*┗ ┅ ━━━━━━━━━ ┅ ━*
`.trim()
let mentionedJid = [who]
conn.sendButton(m.chat, donar, wm,/* 'https://www.paypal.me/AMxScan', 'PAYPAL', null, null, */[['https://www.paypal.me/AMxScan', '/paypal'], 
['MENU PRINCIPAL', '/menu']],
 '', { contextInfo: { mentionedJid }})}
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)|donar|apoyar$/i
export default handler
