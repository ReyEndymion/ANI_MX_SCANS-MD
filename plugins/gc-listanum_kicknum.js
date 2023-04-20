/*              Codigo Creado Por Bruno Sobrino 
      (https://github.com/BrunoSobrino/TheMystic-Bot-MD) 
*/

let handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
if (!args[0]) return m.reply(`*[❗] INGRESA EL PREFIJO DE ALGUN PAIS PARA BUSCAR NUMEROS EN ESTE GRUPO DE ESE PAIS, EJEMPLO: ${usedPrefix + command} 52*`) 
if (isNaN(args[0])) return m.reply(`*[❗] INGRESA EL PREFIJO DE ALGUN PAIS PARA BUSCAR NUMEROS EN ESTE GRUPO DE ESE PAIS, EJEMPLO: ${usedPrefix + command} 52*`) 
let lol = args[0].replace(/[+]/g, '')
let ps = participants.map(u => u.id).filter(v => v !== conn.user.jid && v.startsWith(lol || lol)) 
let bot = global.db.data.settings[conn.user.jid] || {}
if (ps == '') return m.reply(`*[❗] EN ESTE GRUPO NO HAY NINGUN NUMERO CON EL PREFIJO +${lol}*`)
let numeros = ps.map(v=> '⭔ @' + v.replace(/@.+/, ''))
const delay = time => new Promise(res=>setTimeout(res,time));
switch (command) {
case "listanum": 
conn.reply(m.chat, `*LISTA DE NUMEROS CON EL PREFIJO +${lol} QUE ESTAN EN ESTE GRUPO:*\n\n` + numeros.join`\n`, m, { mentions: ps })
break   
case "kicknum":  
if (!bot.restrict) return m.reply('*[❗𝐈𝐍𝐅𝐎❗] EL PROPIETARIO TIENE HABILITADAS LAS RESTRICCIONES (#𝚎𝚗𝚊𝚋𝚕𝚎 𝚛𝚎𝚜𝚝𝚛𝚒𝚌𝚝) CONTACTE CON EL PARA QUE LO HABILITE*') 
if (!isBotAdmin) return m.reply('*[❗𝐈𝐍𝐅𝐎❗] EL BOT NO ES ADMIN, NO PUEDE EXTERMINAR A LAS PERSONAS*')          
conn.reply(m.chat, `*[❗] INICIANDO LA ELIMINACION DE NUMEROS CON EL PREFIJO +${lol}, CADA 20 SEGUNDOS SE ELIMINARA A UN USUARIO*`, m)            
let ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net'
let users = participants.map(u => u.id).filter(v => v !== conn.user.jid && v.startsWith(lol || lol))
for (let user of users) {
let error = `@${user.split("@")[0]} YA HA ABANDONADO EL GRUPO*`    
if (user !== ownerGroup + '@s.whatsapp.net' && user !== global.conn.user.jid && user !== global.owner + '@s.whatsapp.net' && user.startsWith(lol || lol) && user !== isSuperAdmin && isBotAdmin && bot.restrict) { 
await delay(20000)    
let responseb = await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
if (responseb[0].status === "404") m.reply(error, m.chat, { mentions: conn.parseMention(error)})  
await delay(20000)
} else return m.reply('*[❗] 𝙴𝚁𝚁𝙾𝚁*')}
break            
}}
handler.command = /^(listanum|kicknum)$/i
handler.group = handler.botAdmin = handler.admin = true
handler.fail = null
export default handler
