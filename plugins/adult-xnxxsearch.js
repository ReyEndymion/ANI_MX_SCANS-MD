import axios from 'axios'
import fs from 'fs'
let handler = async (m, {text, conn, args, command, usedPrefix, chatdb, db, userdb, senderJid}) => {
if (!chatdb.modohorny && m.isGroup) {
return conn.sendWritingText(m.chat, '*[❗INFO❗] LOS COMANDOS +18 ESTAN DESACTIVADOS EN ESTE GRUPO, SI ES ADMIN Y DESEA ACTIVARLOS USE EL COMANDO #enable modohorny*', m)
} else {
if (!text) {
return conn.sendWritingText(m.chat, `*[❗INFO❗] EJEMPLO DE USO DEL COMANDO ${usedPrefix + command} Con mi prima*`, userdb, m)
} else {
try {
let res = await axios.get(`https://zenzapis.xyz/searching/xnxx?apikey=${keysxxx}&query=${text}`)
let json = res.data
let listSerch = []
let teskd = `Videos relacionados con: ${args.join(" ")}`
const sections = [{
title: `*RESULTADOS*`,
rows: listSerch }]
const listMessage = {
text: teskd,
footer: 'Elija una opcion y precione Enviar',
title: " 『 VIDEOS RELACIONADOS 』",
buttonText: "[♦ RESULTADOS ♦]",
sections}
for (let i of json.result) {
listSerch.push({title: i.title, description: '⇧ SELECCIONA ESTA OPCION PARA DESCARGAR EsTE VIDEO ⇧', id: `${usedPrefix}xnxxdl ${i.url}`})} 
conn.sendMessage(m.chat, listMessage, { quoted: m })
} catch (e) {
return conn.sendWritingText(m.chat, '*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*')
}}}}
handler.command = /^porhubsearch|xvideossearch|xnxxsearch$/i
handler.register = true
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
