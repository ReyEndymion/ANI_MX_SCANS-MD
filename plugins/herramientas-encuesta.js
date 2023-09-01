import pkg from '@whiskeysockets/baileys';
const {WAProto, generateWAMessageFromContent, proto } = pkg;
import { randomBytes } from 'crypto'
let handler = async (m, { conn, text, args, usedPrefix, participants, command }) => {
    let name = await conn.getName(m.sender);
    let users = participants.map(u => conn.decodeJid(u.id))
    if (name === 'undefined') name = 'Sin nombre';
    const a = [];
    const b = text.split('|');
  let c = ''
if (!b[1]) throw `⚠️️ *_Ingrese un texto para iniciar la escuesta._*\n\n📌 Ejemplo : \n*${usedPrefix + command}* Pregunta? |texto|texto2...`
if (b[12]) throw  `⚠️️ Separe las encuestas con *|* \n\n📌 Ejemplo : \n*${usedPrefix + command}* Pregunta?|texto|texto2...`
  for (let c = 1; c < b.length; c++) {
    a.push([b[c]]);
  }
var pollCreation = {
"poll": {
"name": `*ENCUESTA REALIZADA POR:*\n${name} PREGUNTA: ${b[0]}`,
"values": a,
"selectableCount": 1,
"mentionedJid": users
        }
}
    return conn.sendMessage(m.chat, pollCreation, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });
}
handler.help = ['encuesta question <text|text2>']
handler.tags = ['group'];
handler.command = ['poll', 'encuesta'];
handler.group = false
export default handler;
