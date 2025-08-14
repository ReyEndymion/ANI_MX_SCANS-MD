import { getBot } from '../lib/functions.js'
const {generateForwardMessageContent} = (await import('@whiskeysockets/baileys')).default
const data = {}
async function handler(m, { conn, text, args, command, usedPrefix, chatdb, userdb, senderJid }) {
if (!chatdb.ia) return //conn.sendWritingText(m.chat, `este comando necesita ser habilitado antes`, userdb, m)
const {userID, lid} = await import('../config.js')
const normalizetext = await conn.textTagsLidToJid(m.text, m.chat)
const isMentionBot = normalizetext.includes('@' + conn.user.jid.split('@')[0])
if (/^(ia|copilot|openai|chatgpt|robot)$/.test(command) || isMentionBot) {
const copilot = conn.formatNumberWA('18772241042') + userID //${args.join(' ')}
const prueba = conn.formatNumberWA('5215611724120') + userID
const metaAI = conn.formatNumberWA('13135550002') + userID
const zapia = conn.formatNumberWA('5217446020040') + userID
const robotOne = conn.formatNumberWA('5213315741776') + userID
const chatGPT = conn.formatNumberWA('18002428478') + userID
//listas: const whatGPT = conn.formatNumberWA('18887070653') + userID
const ia = copilot
const { fromMe, id, participant } = m.message;
if (m.fromMe) return
if (!args[0]) return conn.sendWritingText(m.chat, `Escribe una pregunta o una consulta`, userdb, m)
const pregunta = text.replace(usedPrefix+command, '')
let mime = (m||quoted).mtype
let isMedia = /imageMessage|videoMessage|stickerMessage|audioMessage|document(WithCaption)?Message/.test(mime)
let tipo = ''
if (mime === 'extendedTextMessage') {tipo = `texto`}
if (mime === 'conversation') {tipo = `texto`}
if (mime === 'imageMessage') {tipo = `imagen`}
if (mime === 'videoMessage') {tipo = `video`}
if (mime === 'stickerMessage') {tipo = `sticker`}
if (mime === 'audioMessage') {tipo = `audio`}
if (mime == /document(WithCaption)?Message/) {tipo = `documento`}
if (data[m.chat]?.timeout && m.isGroup) clearTimeout(data[m.chat]?.timeout)
data.chatID = m.chat
data[m.chat] = {
ia,
tipo,
clientJID: senderJid,
mensaje: text,
mime,
isMedia,
messageKey: m.key,
messageWA: m.message,
timeout: setTimeout(async () => {
console.info('Se acabó el tiempo')
//conn.sendWritingText(m.chat, , userdb, m)
delete data[m.chat]
}, 60 * 2000)
}
const formatTextMessage = `${m.isGroup ? `Grupo:${await conn.getName(m.chat)}` : `privado:${await conn.getName(m.chat)}`}\nuser:@${senderJid.split('@')[0]}-${await conn.getName(senderJid)}\nmsgtype:${tipo}\nmsg:${text}`

return conn.sendWritingText(ia, formatTextMessage, userdb, null)
}
}
handler.before = async function before(m, {conn, db, chatdb, userdb, senderJid}) {
const normalizetext = await conn.textTagsLidToJid(m.text, m.chat)
let tagbot = (`@${conn.user.jid.split('@')[0]}` || '')
const isMentionBot = normalizetext.includes(tagbot)
const sender = m.quoted?.sender ? await conn.lidToJidPromises(m.quoted.sender, m.chat) : await conn.lidToJidPromises(m.sender, m.chat)
let args = isMentionBot ? normalizetext.trim().split` `.slice(1) : sender === conn.user.jid ? [normalizetext] : [m.text];
let text = args.join` `;
const chatID = data.chatID
if (!data[chatID]) {
if (sender === conn.user.jid && normalizetext || isMentionBot && args[0] ) {
await handler(m, {conn, text, args, command: 'ia', usedPrefix: '.', chatdb, userdb, senderJid })
}
return
}
let {ia, tipo, clientJID, mensaje, messageKey, messageWA} = data[chatID]
//if (mensaje !== m.text) mensaje = m.text, tipo = ''
//const isMedia = data.isMediaObject.keys(data).length === 1 ||  mensaje !== m.text, data[chatID], ia, chatID, match, m.text, normalizetext
let mime = (m||quoted).mtype
let isMedia = /imageMessage|videoMessage|stickerMessage|audioMessage|document(WithCaption)?Message/.test(mime)
if (mime === 'extendedTextMessage') {tipo = `texto`}
if (mime === 'conversation') {tipo = `texto`}
if (mime === 'imageMessage') {tipo = `imagen`}
if (mime === 'videoMessage') {tipo = `video`}
if (mime === 'stickerMessage') {tipo = `sticker`}
if (mime === 'audioMessage') {tipo = `audio`}
if (mime == /document(WithCaption)?Message/) {tipo = `documento`}
if (messageWA !== m.message) messageWA = m.message
let q = {}
if ((!m.fromMe && m.chat === chatID && senderJid !== ia && senderJid !== conn.user.jid)) {
data[chatID].messageKey = m.key
data[chatID].messageWA = m.message
if (tipo == 'imagen') {q = { key: m.key, message: messageWA}
}
if (tipo == 'documento') {q = { key: m.key, message: messageWA}
}
if (tipo == 'video') {q = { key: m.key, message: messageWA}
}
if (tipo == 'audio') {q = { key: m.key, message: messageWA}
}
if (tipo == 'sticker') {q = { key: m.key, message: messageWA}
}
if (tipo == 'texto') {q = { key: m.key, message: m.message}
}
//mensaje = m.textmime, , mediax
if (mensaje !== m.text ) mensaje = m.text
if (mensaje !== m.text ) mensaje = normalizetext
//if (!m.message || m.key?.id === data[chatID]?.messageKey?.id) return
const formatTextMessage = `${m.isGroup ? `Grupo: ${await conn.getName(chatID)}` : `privado: ${await conn.getName(chatID)}`}\n@${senderJid.split('@')[0]}-${await conn.getName(senderJid)}\nmsgtype:${tipo}\nmsg:${mensaje}`
if ((mensaje !== undefined && mensaje !== m.text || m.quoted?.text) && !isMedia && m.isGroup, text) {
if (!mensaje) return
return conn.sendWritingText(ia, formatTextMessage, userdb, null)
} else if (isMedia) {
if (messageWA !== m.message) messageWA = m.message
var mediax = await (m||quoted).download?.()
if (mime === 'imageMessage') {
await conn.sendWritingText(ia, formatTextMessage, userdb, null)
return conn.sendMessage(ia, { image: mediax}, {quoted: null, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
}
if (mime === 'documentMessage') {
await conn.sendWritingText(ia, formatTextMessage, userdb, null)
return conn.sendMessage(ia, { document: mediax }, { quoted: null, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}) }
if (mime === 'videoMessage') {
await conn.sendWritingText(ia, formatTextMessage, userdb, null)
return conn.sendMessage(ia, { video: mediax, mimetype: 'video/mp4' }, { quoted: q, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
if (mime === 'audioMessage') {
await conn.sendWritingText(ia, formatTextMessage, userdb, null)
return conn.sendMessage(ia, { audio: mediax, mimetype: 'audio/mp4' }, { quoted: null, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
if (mime === 'stickerMessage') {
await conn.sendWritingText(ia, formatTextMessage, userdb, null)
return conn.sendMessage(ia, { sticker: mediax }, { quoted: null, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
}
}
if (senderJid == ia && !m.fromMe && !m.isGroup) {
if (mensaje !== m.text ) mensaje = m.text
if (tipo == 'imagen') {q = { key: data[chatID].messageKey, message: data[chatID].messageWA}
}
if (tipo == 'documento') {q = { key: data[chatID].messageKey, message: data[chatID].messageWA}
}
if (tipo == 'video') {q = { key: data[chatID].messageKey, message: data[chatID].messageWA}
}
if (tipo == 'audio') {q = { key: data[chatID].messageKey, message: data[chatID].messageWA}
}
if (tipo == 'sticker') {q = {key: data[chatID].messageKey, message: data[chatID].messageWA}
}
if (tipo == 'texto') {q = { key: data[chatID].messageKey, message: data[chatID].messageWA}
}
if (m.text) {
if (isMedia) {
var mediax = await (m||quoted).download?.()
if (mime === 'imageMessage') {
return conn.sendMessage(chatID, { image: mediax, caption: m.text.trim()}, {quoted: q, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
}
if (mime === 'documentMessage') {
return conn.sendMessage(chatID, { document: mediax, caption: m.text }, { quoted: q, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}) }
if (mime === 'videoMessage') {
return conn.sendMessage(chatID, { video: mediax, mentions: m.text, mimetype: 'video/mp4', caption: text }, { quoted: q, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
} else {
return conn.sendWritingText(chatID, `${m.text}`, userdb, q)
}
} else if (!m.text) {
let mime = (m||quoted).mtype
let isMedia = /imageMessage|videoMessage|stickerMessage|audioMessage|document(WithCaption)?Message/.test(mime)
let tipo = ''
if (mime === 'extendedTextMessage') {tipo = `texto`}
if (mime === 'conversation') {tipo = `texto`}
if (mime === 'imageMessage') {tipo = `imagen`}
if (mime === 'videoMessage') {tipo = `video`}
if (mime === 'stickerMessage') {tipo = `sticker`}
if (mime === 'audioMessage') {tipo = `audio`}
if (mime == /document(WithCaption)?Message/) {tipo = `documento`}
if (isMedia) {
var mediax = await (m||quoted).download?.()
if (mime === 'imageMessage') {
return conn.sendMessage(chatID, { image: mediax}, {quoted: q, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
}
if (mime === 'documentMessage') {
return conn.sendMessage(chatID, { document: mediax }, { quoted: q, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}) }
if (mime === 'videoMessage') {
return conn.sendMessage(chatID, { video: mediax, mimetype: 'video/mp4' }, { quoted: q, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
if (mime === 'audioMessage') {
return conn.sendMessage(chatID, { audio: mediax, mimetype: 'audio/mp4' }, { quoted: q, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
if (mime === 'stickerMessage') {
return conn.sendMessage(chatID, { sticker: mediax }, { quoted: q, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
}
}
}
// && messageWA !== m.message
if (data[chatID]?.timeout && m.isGroup) {
clearTimeout(data[chatID]?.timeout)
data[chatID] = {
ia,
tipo,
mensaje: m.text,
clientJID,
mime,
isMedia,
messageKey: m.key,
messageWA: m.message,
timeout: setTimeout(async () => {
console.info('Se acabó el tiempo: interaccion terminada')
//conn.sendWritingText(m.chat, 'Se acabó el tiempo', userdb, m)
delete data[chatID]
}, 60 * 2000)
}
}
}
const {jid} = await getBot('ani')
handler.help = ['ai <pregunta>'];
handler.tags = ['ai'];
handler.command = new RegExp(`^(ia|copilot|openai|chatgpt|robot|${jid.split('@')[0]})$`, 'i');///^.*$/i
handler.limit = false;
handler.register = false;
handler.menu = [
{title:"💎 IA", description: "pregunta a la IA usando #ia <pregunta>", id: `ia`},
];
handler.type = "herramientas";
handler.disabled = false;
export default handler;

async function parseIntentFromMessage(text = '') {
text = text.toLowerCase()
const {stickerTriggers, imageTriggers, audioTriggers, videoTriggers} = await import('../lib/constants.js')

for (let phrase of stickerTriggers) if (text.includes(phrase)) return 'sticker'
for (let phrase of imageTriggers) if (text.includes(phrase)) return 'image'
for (let phrase of audioTriggers) if (text.includes(phrase)) return 'audio'
for (let phrase of videoTriggers) if (text.includes(phrase)) return 'video'

return null
}
/*
handler.before = async function before(m, { conn, text, db, userdb, senderJid }) {
const ia = data.ia
if (senderJid != ia || !m.text) return

console.log(`Preguntando a IA: `, text)

const chatID = data.chatID
const tipo = data.tipo
const clientJID = data.clientJID
const mensaje = data.mensaje
const isMedia = data.isMedia

let mediax = null
let mime = (m || quoted).mtype || ''
let intent = parseIntentFromMessage(m.text)

// Si es media, la descargamos
if (isMedia) {
mediax = await (m || quoted)?.download?.()
}

if (intent && mediax) {
const caption = m.text.replace(/\s*([✨➡️🎵]*)\s*(enviar|convierte|genera|hazlo|como)\s+(sticker|imagen|audio|video).*?:?/gi, '').trim()

if (intent === 'sticker') {
await conn.sendSticker(clientJID, mediax, { packname: 'GPT IA', wm: 'by Bot' }, m)
return
}
if (intent === 'image') {
await conn.sendMessage(clientJID, { image: mediax, caption }, { quoted: m })
return
}
if (intent === 'audio') {
await conn.sendMessage(clientJID, { audio: mediax, mimetype: 'audio/mp4' }, { quoted: m })
return
}
if (intent === 'video') {
await conn.sendMessage(clientJID, { video: mediax, mimetype: 'video/mp4', caption }, { quoted: m })
return
}
}

// Si no fue media con intención especial, simulamos contexto del mensaje original
let q = {}
if (tipo === 'imagen') {
q = { key: { fromMe: false, participant: clientJID, remoteJid: m.chat }, message: { "imageMessage": { caption: mensaje, jpegThumbnail: mediax } } }
} else if (tipo === 'documento') {
q = { key: { fromMe: false, participant: clientJID, remoteJid: m.chat }, message: { "documentWithCaptionMessage": { caption: mensaje } } }
} else if (tipo === 'video') {
q = { key: { fromMe: false, participant: clientJID, remoteJid: m.chat }, message: { "videoMessage": { caption: mensaje, jpegThumbnail: '', quoted: m } } }
} else if (tipo === 'audio') {
q = { key: { fromMe: false, participant: clientJID, remoteJid: m.chat }, message: { "audioMessage": { text: mensaje } } }
} else if (tipo === 'sticker') {
q = { key: { fromMe: false, participant: clientJID, remoteJid: m.chat }, message: { "stickerMessage": { text: mensaje } } }
} else if (tipo === 'texto') {
q = { key: { fromMe: false, participant: clientJID, remoteJid: m.chat }, message: { "extendedTextMessage": { text: mensaje } } }
}

return conn.sendWritingText(chatID, m.text, userdb, q)
}
*/

/*+1 877-224-1042
import fetch from 'node-fetch';
import axios from 'axios';
import translate from '@vitalets/google-translate-api';
import {Configuration, OpenAIApi} from 'openai';
const orgOpenai = `org-sHjQj1orPaHZGszldM1hMs3m`
const apiOpenai = `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`//`sk-8nSBib8FojMSlVehJqUjT3BlbkFJVysEP08CyZKwmbcyKIzhAt`
//`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`
//const configuration = new Configuration({ apiKey: apiOpenai})
const configImagKey = new Configuration({apikey: `f30d8faae3ad41fe82cee15c137fd73a`})
const configuration = new Configuration({organization: orgOpenai, apiKey: apiOpenai});
const openaiii = new OpenAIApi(configuration);
let handler = async (m, {conn, text, usedPrefix, command, db, userdb, senderJid}) => {
if (!text) {
let resp = `Muestra:\n${usedPrefix + command} Que es OpenAi`

return conn.sendWritingText(m.chat, resp, userdb, m);

}
function extractMentionedJid(text) {
const regex = /@(\d+)(?:\w|\.)?/g;
const matches = text.match(regex);
if (matches && matches.length > 0) {
return matches[0];
} else {
return null;
}
}

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid;
let txtoint = m.quoted ? m.quoted.text : text
let name = await conn.getName(who);
let usertoname = txtoint.replace('@' + who.split`@`[0], name)
let entrance =`${(text || txtoint || txtoint.includes(usertoname))}\n\nEl quoted fue: ${txtoint//.includes(usertoname)
}` 
***for (let i = 0; i < who.length; i++) {
const txtoint = text || m.quoted;
const name = await conn.getName(who[i]);

// Modificar la mención de usuario en txtoint
const tag = `(@${who[i]} = ${name})`;
txtoint = txtoint.replace(tag, name);

// Verificar si la mención de usuario fue reemplazada por el nombre
if (txtoint.includes(name)) {
// Agregar la mención de usuario y nombre a entrance
entrance += ` ${tag}`;
} else {
// Agregar solo el nombre a entrance
entrance += ` ${name}`;
}
}***


const openai = new OpenAIApi(configuration);
let resp
let sistema1 = `Actuaras como un Bot de WhatsApp el cual fue creado por Rey Endymion, tu seras El bot Comedia.`;
try {
const response = await openai.createCompletion({
model: "text-davinci-003",
prompt: entrance,
temperature: 0,
max_tokens: 3000,
top_p: 1,
frequency_penalty: 0.0,
presence_penalty: 0,
})
***const chatCompletion = await openai.createChatCompletion({
model: "gpt-3.5-turbo",
messages: [{role: "user", content: "Hello world"}],
});****
resp = response.data.choices[0].text;//chatCompletion.data.choices[0].message

await conn.sendWritingText(m.chat, resp, userdb, m);


} catch (error) {
console.log('error?: ', error)
let err = await translate(`${error}`, { to: 'es', autoCorrect: true })
let errorstatus = await translate(`${error.response.statusText}`, { to: 'es', autoCorrect: true })
let resp = `Error en la generación de respuesta: ${err.text} \n\nMotivo: ${errorstatus.text}`

await conn.sendWritingText(m.chat, resp, userdb, m);
}
}

const handler = async (m, {conn, text, usedPrefix, command, db, userdb, senderJid}) => {
const yo = conn.user.jid.replace('@s.whatsapp.net', '')
if (command === new RegExp(`^(ia|${yo})$`, 'i') ) {
let resp
if (usedPrefix == 'a' || usedPrefix == 'A') return;
if (!text) {
resp = `Falta peticion crack...\n\nEjemplo:\n${usedPrefix + command} Que es OpenAi`
}
let sistema1 = `Actuaras como un Bot de WhatsApp el cual fue creado por Rey Endymion, tu seras El bot Comedia.`;
function extractMentionedJid(text) {
const regex = /@(\d+)(?:\w|\.)?/g;
const matches = text.match(regex);
if (matches && matches.length > 0) {
return matches[0];
} else {
return null;
}
}

//let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : senderJid;
//let txtoint = m.quoted ? m.quoted.text : text
let txto = text; // Texto formateado en proceso
*/
/***let mentions = [...txto.matchAll(/@\d+/g)]; // Buscar menciones
let ment
for (const mention of mentions) {
const phoneNumber = mention[0].replace('@', '');
const name = await conn.getName(`${phoneNumber}@s.whatsapp.net`);
ment += mention[0].replace(new RegExp(mention[0], 'g'), name);
}.join(', ')\n${mentions ? `los usuarios de whatsapp mencionados ${mentions} se llaman ${[...ment.replace('undefined', '')]}respectivamente` : ''} */
/***
let entrance =`la pregunta es: ${text}\nEl quoted fue: ${m.quoted?.text ? m.quoted.text : 'no hay citado'}` 
try {
await conn.sendPresenceUpdate('composing', m.chat);
//let sistema1 = await fetch(`https://raw.githubusercontent.com/Skidy89/chat-gpt-jailbreak/main/Text.txt`).then(v => v.text());
async function getOpenAIChatCompletion(texto) {
const openaiAPIKey = global.openai_key;
let chgptdb = global.chatgpt.data.users[senderJid];
chgptdb.push({ role: 'user', content: texto });
const url = "https://api.openai.com/v1/chat/completions";
const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${apiOpenai}` };
const data = { "model": "gpt-3.5-turbo", "messages": [{ "role": "system", "content": sistema1 }, ...chgptdb, ]};
const response = await fetch(url, {method: "POST", headers: headers, body: JSON.stringify(data)});
const result = await response.json();
const finalResponse = result.choices[0].message.content;
return finalResponse;
};
let respuesta = await getOpenAIChatCompletion(entrance);
if (respuesta == 'error' || respuesta == '' || !respuesta) return XD; // causar error undefined para usar otra api
resp = `${respuesta}`.trim()
} catch {
try {
const botIA222 = await openaiii.createCompletion({model: 'text-davinci-003', prompt: entrance, temperature: 0.3, max_tokens: 4097, stop: ['Ai:', 'Human:'], top_p: 1, frequency_penalty: 0.2, presence_penalty: 0});
if (botIA222.data.choices[0].text == 'error' || botIA222.data.choices[0].text == '' || !botIA222.data.choices[0].text) return XD; // causar error undefined para usar otra api
resp = botIA222.data.choices[0].text.trim()
} catch {
try {
const fgapi1 = await fetch(`https://api-fgmods.ddns.net/api/info/openai?text=${entrance}&symsg=${sistema1}&apikey=XlwAnX8d`);
const fgjson1 = await fgapi1.json();
if (fgjson1.result == 'error' || fgjson1.result == '' || !fgjson1.result) return XD; // causar error undefined para lanzar msg de error
resp = `${fgjson1.result}`.trim()
} catch {
try {
const vihangayt1 = await fetch(`https://vihangayt.me/tools/chatgpt?q=${entrance}`);
const vihangaytjson1 = await vihangayt1.json();
if (vihangaytjson1.data == 'error' || vihangaytjson1.data == '' || !vihangaytjson1.data) return XD; // causar error undefined para usar otra api
resp = `${vihangaytjson1.data}`.trim()
} catch {
try {
const vihangayt2 = await fetch(`https://vihangayt.me/tools/chatgpt2?q=${entrance}`);
const vihangaytjson2 = await vihangayt2.json();
if (vihangaytjson2.data == 'error' || vihangaytjson2.data == '' || !vihangaytjson2.data) return XD; // causar error undefined para usar otra api
resp = `${vihangaytjson2.data}`.trim()
} catch {
try {
*//*sirve pero ia seria** const vihangayt3 = await fetch(`https://vihangayt.me/tools/chatgpt3?q=${entrance}`);
const vihangaytjson3 = await vihangayt3.json();
if (vihangaytjson3.data == 'error' || vihangaytjson3.data == '' || !vihangaytjson3.data) return XD; // causar error undefined para usar otra api
resp = `${vihangaytjson3.data}`.trim()*/
//} catch {
// try {
/*no**const tioress22 = await fetch(`https://api.lolhuman.xyz/api/openai?apikey=${lolkeysapi}&text=${entrance}&user=${senderJid}`);
const hasill22 = await tioress22.json();
if (hasill22.result == 'error' || hasill22.result == '' || !hasill22.result) return XD; // causar error undefined para usar otra api
const hasill22_result = await translate(`${hasill22.result}`, {to: 'es', autoCorrect: true});
resp = `${hasill22_result.text}`.trim()*/
//} catch {
//try {
/*no**const searchString2 = ' Indonesia ';
const replacementString2 = ' español ';
const rres = await fetch(`https://api.ibeng.tech/api/others/chatgpt?q=Hola&apikey=eMlBNRzUXv`);
const jjson = await rres.json();
const hahaha = await translate(`${jjson.data}`, {to: 'es', autoCorrect: true});
const sextS = hahaha.text;
resp = sextS.replace(searchString2, replacementString2).trim();
//} catch { 
// try {
const akuariapi2 = await fetch(`https://api.akuari.my.id/ai/gpt?chat=${entrance}`);
const akuariapijson2 = await akuariapi2.json();
if (akuariapijson2.respon == 'error' || akuariapijson2.respon == '' || !akuariapijson2.respon) return XD; // causar error undefined para lanzar msg de error
const akuariapiresult2 = await translate(`${akuariapijson2.respon}`, {to: 'es', autoCorrect: true});
resp = akuariapiresult2.text.trim()/*sirve***/
// } catch {
// try {*/ 
/*no**let XD = `No hay respuesta`
const akuariapi1 = await fetch(`https://api.azz.biz.id/api/bard?q=${entrance}&key=global`);
const akuariapijson1 = await akuariapi1.json();
if (akuariapijson1.respon == 'error' || akuariapijson1.respon == '' || !akuariapijson1.respon) return XD; // causar error undefined para usar otra api
const akuariapiresult1 = await translate(`${akuariapijson1.respon}`, {to: 'es', autoCorrect: true});
resp = `${akuariapiresult1.text}`.trim()
} catch (e) {
resp = `*[❗] ERROR: ${e}, VUELVA A INTENTARLO*`;
}
//}
// }}
// }}
//}}
// }}
console.log(`IA comedia: ${entrance}`);

return conn.sendWritingText(m.chat, resp, userdb, m)
};
}
*/

//