/*
- Obten mas efectos en https://violetics.pw/api/ephoto360
- Usa la apikey "beta"
*/
let handler = async (m, {conn, args, command, db, userdb, senderJid}) => { 
let response = args.join(' ').split('|')
if (!args[0]) return conn.sendWritingText(m.chat, `*[❗] INGRESE UN TEXTO*`, userdb, m)
try {    
if (command == 'logocorazon') {
conn.sendWritingText(m.chat, '*[❗] ELABORANDO SU DISEÑO, ESPERE UN MOMENTO...*', m)
let res = `https://violetics.pw/api/ephoto360/heart-flashlight?apikey=beta&text=${response[0]}`
conn.sendFile(m.chat, res, 'error.jpg', null, m)}
if (command == 'logochristmas') {
conn.sendWritingText(m.chat, '*[❗] ELABORANDO SU DISEÑO, ESPERE UN MOMENTO...*', m)
let res = `https://violetics.pw/api/ephoto360/christmas-snow?apikey=beta&text=${response[0]}`
conn.sendFile(m.chat, res, 'error.jpg', null, m)}
} catch {
conn.sendWritingText(m.chat, '*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*', m)
}}
handler.command = /^logocorazon|logochristmas/i
handler.help = [];
handler.tags = [];
handler.menu = [
{title: "🧧 LOGO CORAZON", description: "Crea un diseño con el efecto de corazón. Usa #logocorazon <texto>", id: `logocorazon`},
{title: "🖍️ LOGOS NAVIDAD", description: " Crea un diseño con el efecto de Navidad", id: `logochristmas`}, 
];
handler.type = "logoefectos";
handler.disabled = false;

export default handler
