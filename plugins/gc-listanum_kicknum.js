/* Codigo Creado Por Bruno Sobrino 
(https://github.com/BrunoSobrino/TheMystic-Bot-MD) 
*/

let handler = async (m, {conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin, db, userdb, senderJid}) => {
if (!args[0]) return conn.sendWritingText(m.chat, `*[❗] INGRESA EL PREFIJO DE ALGUN PAIS PARA BUSCAR NUMEROS EN ESTE GRUPO DE ESE PAIS, EJEMPLO:usedPrefix + command52*`, m) 
if (isNaN(args[0])) return conn.sendWritingText(m.chat, `*[❗] INGRESA EL PREFIJO DE ALGUN PAIS PARA BUSCAR NUMEROS EN ESTE GRUPO DE ESE PAIS, EJEMPLO:usedPrefix + command52*`, m) 
let lol = args[0].replace(/[+]/g, '')
let ps = participants.map(u => u.id).filter(v => v !== conn.user.jid && v.startsWith(lol || lol)) 
let bot = db.data.bot[conn.user.jid].settings || {}
if (ps == '') return conn.sendWritingText(m.chat, `*[❗] EN ESTE GRUPO NO HAY NINGUN NUMERO CON EL PREFIJO +lol*`, userdb, m)
let numeros = ps.map(v=> '⭔ @' + v.replace(/@.+/, ''))
const delay = time => new Promise(res=>setTimeout(res,time));
switch (command) {
case "listanum": 
conn.sendWritingText(m.chat, `*LISTA DE NUMEROS CON EL PREFIJO +${lol} QUE ESTAN EN ESTE GRUPO:*\n\n` + numeros.join`\n`,m, { mentions: ps , db})
break
case "kicknum": 
if (!bot.restrict) return conn.sendWritingText(m.chat, `*[❗INFO❗] EL PROPIETARIO TIENE HABILITADAS LAS RESTRICCIONES (#𝚎𝚗a𝚋l𝚎 𝚛𝚎𝚜t𝚛𝚒𝚌t) CONTACTE CON EL PARA QUE LO HABILITE*`, userdb, m) 
if (!isBotAdmin) return conn.sendWritingText(m.chat, `*[❗INFO❗] EL BOT NO ES ADMIN, NO PUEDE EXTERMINAR A LAS PERSONAS*`, m) 
conn.sendWritingText(m.chat, `*[❗] INICIANDO LA ELIMINACION DE NUMEROS CON EL PREFIJO +${lol}, CADA 20 SEGUNDOS SE ELIMINARA A UN USUARIO*`, m)
let ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net'
let users = participants.map(u => u.id).filter(v => v !== conn.user.jid && v.startsWith(lol || lol))
for (let user of users) {
let error = `@${user.split("@")[0]} YA HA ABANDONADO EL GRUPO*`
if (user !== ownerGroup + '@s.whatsapp.net' && user !== global.userBot && user !== owner + '@s.whatsapp.net' && user.startsWith(lol || lol) && user !== isSuperAdmin && isBotAdmin && bot.restrict) { 
await delay(20000)
let responseb = await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
if (responseb[0].status === "404") m.reply(error, m.chat, { mentions: conn.parseMention(error)}) 
await delay(20000)
} else return conn.sendWritingText(m.chat, `*[❗] ERROR*`, userdb, m)}
break
}}
handler.command = /^(listanum|kicknum)$/i
handler.group = handler.botAdmin = handler.admin = true
handler.fail = null
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
