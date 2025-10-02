let handler = async (m, {conn, text, usedPrefix, command, isROwner, isOwner, chatdb, userdb, senderJid}) => {
if (!text) {
let resp
if (/^set/g.test(command)) resp = `*[❗] INGRESE EL MENSAJE DE ${/setbye/i.test(command) ? 'DESPEDIDA' : 'BIENVENIDA'} QUE DESEE AGREGAR, USE DENTRO DEL MENSAJE*\n*- @user Para agregar la mención Dentro del mensaje Un médico local que esté configurando*`
if (/^resetwelcome$/i.test(command)) chatdb.sWelcome = ''
if (/^resetbye$/i.test(command)) chatdb.sBye = ''
if (/^reset/g.test(command)) resp = `*[❗] MENSAJE DE ${/resetbye/i.test(command) ? 'DESPEDIDA' : 'BIENVENIDA'} REINICIADO CORRECTAMENTE PARA ESTE GRUPO*`
//if (/^reset$/g.test(command)) resp = `*[❗] REINICIE EL MENSAJE DE ${/setbye/i.test(command) ? 'DESPEDIDA' : 'BIENVENIDA'} QUE DESEE AGREGAR, USE:*\n*- @user (mención)*`
return conn.sendWritingText(m.chat, resp, userdb, m)
} else {
if (/^setbye$/i.test(command)) chatdb.sBye = text
if (/^setwelcome$/i.test(command)) chatdb.sWelcome = text
let resp
if (/^set/g.test(command)) resp = `*[❗] MENSAJE DE ${/setbye/i.test(command) ? 'DESPEDIDA' : 'BIENVENIDA'} CONFIGURADO CORRECTAMENTE PARA ESTE GRUPO*`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
}
handler.help = ['setbye <text>']
handler.tags = ['group']
handler.command = /^((set|reset)(bye|welcome))$/
handler.admin = true
handler.menu = [
{title:"💎 CAMBIAR LA BIENVENIDA DEL BOT", description: "edita la bienvenida del BOT usando #setwelcome", id: `setwelcome`}, 
{title:"💎 CAMBIAR LA DESPEDIDA DEL BOT", description: "edita la despedida del bot usando #setbye", id: `setbye`},
];
handler.type = "gadmin";

handler.disabled = false;

export default handler
