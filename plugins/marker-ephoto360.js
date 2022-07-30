/*
- Obten mas efectos en https://violetics.pw/api/ephoto360
- Usa la apikey "beta"
*/
let handler = async (m, { conn, args, command }) => { 
let response = args.join(' ').split('|')
if (!args[0]) throw '*[❗] INGRESE UN TEXTO*'
try {    
if (command == 'logocorazon') {
conn.reply(m.chat, '*[❗] ELABORANDO SU DISEÑO, ESPERE UN MOMENTO...*', m)
let res = `https://violetics.pw/api/ephoto360/heart-flashlight?apikey=beta&text=${response[0]}`
conn.sendFile(m.chat, res, 'error.jpg', null, m)}
if (command == 'logochristmas') {
conn.reply(m.chat, '*[❗] ELABORANDO SU DISEÑO, ESPERE UN MOMENTO...*', m)
let res = `https://violetics.pw/api/ephoto360/christmas-snow?apikey=beta&text=${response[0]}`
conn.sendFile(m.chat, res, 'error.jpg', null, m)}
} catch {
conn.reply(m.chat, '*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*', m)    
}}
handler.command = /^logocorazon|logochristmas/i
export default handler
