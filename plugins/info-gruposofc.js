let media = './Menu2.jpg'
let handler = async (m, { conn, command }) => conn.sendButton(m.chat, `
*Hola 👋🏻, unete a los grupos oficiales para pasar un rato agradable usando el Bot 🌎ANI MX SCANS🌏*

*_➤ Grupos oficiales del Bot:_*
*_1.-_* *https://chat.whatsapp.com/L4VRAzaYc11D4LSpt8rB9W*

*_2.-_* *https://chat.whatsapp.com/H0SheP7ippc1dF9uxL04Gt*

*Grupo de rol*
*_3.-* *https://chat.whatsapp.com/DCn5C6m11Js0ie9bZUlNFX* 
`.trim(), wm, media, [['IR AL MENU PRINCIPAL', '.menu']], m)
handler.command = /^linkgc|grupos$/i
export default handler
