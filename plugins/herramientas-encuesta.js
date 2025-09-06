let handler = async (m, {conn, text, args, usedPrefix, command, groupMetadata, participants, db, userdb, senderJid, objs}) => {
const {dbGroups, inMstore} = objs
const {userID, groupID} = await import('../config.js')
let name = await conn.getName(senderJid);
let who = m.mentionedJid//
let menciones = [];
let txto = text;
let mentions = [...text.matchAll(/@(\d{5,20}(?:-\d+)?)(@g\.us)?/g)];
const isAnnounce = groupMetadata?.announce 

for (const mention of mentions) {
if (mention[0].endsWith(groupID)) await dbGroups.read()
const phoneNumber = mention[0].replace('@', '');
const jid = phoneNumber.endsWith(groupID) ? phoneNumber : phoneNumber + userID 
let name = mention[0].endsWith(groupID) ? (dbGroups.data[jid]?.subject == undefined ? inMstore.chats[jid]?.subject === undefined ? jid : inMstore.chats[jid].subject :  dbGroups.data[jid].subject || jid ) : await conn.getName(jid);
if (name === undefined) name = 'Grupo';
txto = txto.replace(new RegExp(mention[0], 'g'), name);
}
let num = []
for (const jid of who){
let phoneNumber = jid.replace('@s.whatsapp.net', '');
num += `@${phoneNumber} `
}
if (name === 'undefined') name = 'Sin nombre';


const parts = txto.replace(/^\|+|\|+$/g, '').split('|')
if (parts.length < 4) {
let resp = `*[❗INFO❗]*\n*FORMATO DE USO (múltiples selecciones)*\n\n${usedPrefix + command} 0|Pregunta?|Opcion1|Opcion2...\n\n*FORMATO DE USO (una sola selección)*\n\n${usedPrefix + command} 1|Pregunta?|Opcion1|Opcion2...`
return conn.sendWritingText(m.chat, resp, userdb, m)
}

const selectableCountPart = parts[0];
let question = parts[1]
let options = parts.slice(2);
const selectableCount = parseInt(selectableCountPart); 

if (!/^\d+$/.test(selectableCountPart)) {
let resp = "*[❗INFO❗] El primer valor debe ser un número sin espacios.*";
return conn.sendWritingText(m.chat, resp, userdb, m)
}
if (isNaN(selectableCount) || (selectableCount !== 0 && selectableCount !== 1)) {
let resp = "*[❗INFO❗] El primer valor debe ser 0 (múltiples selecciones) o 1 (una sola selección).*";
return conn.sendWritingText(m.chat, resp, userdb, m)
}
//}

let pollValues = options.map(option => [option]);
let resp = `*ENCUESTA REALIZADA POR:*\n${name}\n*PREGUNTA:*\n${question}`;

const poll = {
poll: {
name: resp,
values: pollValues,
selectableCount: selectableCount
}
}
return conn.sendMessage(m.chat, poll, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 });
}

handler.help = ['encuesta question|option|option']
handler.tags = ['group']
handler.command = ['poll', 'encuesta']
handler.menu = [
{title:"💎 ENCUESTA", description: "realiza una encuesta en el grupo usando #encuesta <0|1> | pregunta? | opción1 | opción2 ...", id: `encuesta`}
];
handler.type = "herramientas";
handler.disabled = false;

export default handler;
