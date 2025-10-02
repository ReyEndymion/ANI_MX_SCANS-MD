let handler = async (m, {conn, usedPrefix, command, db, userdb, senderJid}) => {
const {  info  } = await import('../config.js');
if (/paypal/.test(command)) {
let resp = info.paypal
return conn.sendWritingText(m.chat, resp, userdb, m);
}
if (/terminos/.test(command)) {
const resp = `Los términos y condiciones del bot ${info.nanip} son los siguientes:

1. Uso Educativo: Este bot est_ dise_ado exclusivamente para fines educativos y de ciberseguridad, permitiendo realizar pruebas de penetración en WhatsApp.

2. No es una API Oficial: El bot utiliza la biblioteca Baileys, que no es una API oficial de WhatsApp.

3. Responsabilidad: El uso del bot es bajo tu propio riesgo. No nos hacemos responsables de cualquier daño o problema que pueda surgir del uso del bot.

4. Prohibiciones: Está prohibido utilizar el bot para actividades ilegales, maliciosas o que puedan causar daño a otros.

5. Modificaciones: Nos reservamos el derecho de modificar los términos y condiciones en cualquier momento, y es responsabilidad del usuario revisar estos cambios.

6. Consentimiento: Al utilizar el bot, aceptas cumplir con estos términos y condiciones.

`

return conn.sendWritingText(m.chat, resp, userdb, m);
}
}
handler.help = ['pagina']
handler.tags = ['info']
handler.command = /^paypal|terminos$/i
handler.menu = [
{title: 'PAYPAL', description: 'pagina paypal del creador', id: 'paypal'},
];
handler.type = "info";
handler.disabled = false;

export default handler
/*
{title: 'CONTACTO', 
rows: [
{title: "?? DONAR ??", id: `donasi`},
{title: "?? OWNER ??", id: `owner`},
{title: "?? INFOBOT ??", id: `infobot`}]
}
*/