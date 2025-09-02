/*
              Codigo Creado Por Bruno Sobrino 
    (https://github.com/BrunoSobrino/TheMystic-Bot-MD) 
*/

let handler = async (m, {conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, db, userdb, senderJid}) => {
if (!args[0] || isNaN(args[0])) return conn.sendWritingText(m.chat, `*[❗] INGRESA EL PREFIJO DE ALGUN PAIS PARA BUSCAR NUMEROS EN ESTE GRUPO DE ESE PAIS, EJEMPLO: ${usedPrefix + command} 52*`, userdb, m) 
let lol = args[0].replace(/[+]/g, '')
const groupLid = groupMetadata.addressingMode === 'lid'
let ps = participants.map(u => groupLid ? u.jid : u.id).filter(v => v !== conn.user.jid && v.startsWith(lol)) 
if (ps == '') return conn.sendWritingText(m.chat, `*[❗] EN ESTE GRUPO NO HAY NINGUN NUMERO CON EL PREFIJO +${lol}*`, userdb, m)
let numeros = ps.map(v=> '⭔ @' + v.replace(/@.+/, ''))
return conn.sendWritingText(m.chat, `*LISTA DE NUMEROS CON EL PREFIJO +${lol} QUE ESTAN EN ESTE GRUPO:*\n\n` + numeros.join`\n`, userdb, m)
}
handler.command = /^(listanum)$/i
handler.group = handler.botAdmin = handler.admin = true
handler.fail = null
handler.help = [];
handler.tags = [];
handler.menu = [
{title: "💎 LISTA DE NUMEROS POR PREFIJO", description: "hace una lista de numeros por su prefijo usando #listnum", id: `listanum`},
];
handler.type = "gadmin";

handler.disabled = false;

export default handler
