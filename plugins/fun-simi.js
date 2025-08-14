import fs from 'fs'
import path from 'path'
import similarity from 'similarity'
import { dataBases } from '../config.js';
const dbFilePath = path.join(dataBases, 'knowledgeBase.json');
let responseUser = {}
let responseBot = {}
let knowledgeBase = [];
let handler = async (m, {conn, text, usedPrefix, command, args, db, userdb, senderJid}) => {
let resp = ''
if (!text) {
resp = `*[❗] INGRESE UN TEXTO PARA HABLAR CON SIMSIMI O EL BOT*\n\n*EJEMPLO: ${usedPrefix + command} Hola bot*`
} else {
try {
resp = getResponse(text);
if (resp.includes("¿Puedes enseñarme?")) {
//resp += `\n\nNo sé cómo responder a "${text}". Escribe por favor qué debo responder a esta pregunta.`
responseUser[senderJid] = {
sender: senderJid,
id: m.id,
chat: m.chat,
text: text,
args: args,
usedPrefix: usedPrefix,
command: command,
resp,
question: text,
timeout: setTimeout(async () => {
resp = 'Tiempo de espera agotado para volver a preguntar sin el comando.'
delete responseUser[senderJid]
}, 60 * 1000)
}
responseBot[conn.user.jid] = {
bot: conn.user.jid,
id: m.id,
chat: m.chat,
text: text,
args: args,
usedPrefix: usedPrefix,
command: command,
resp,
question: text,
timeout: setTimeout(async () => {
resp = 'Tiempo de espera agotado para volver a preguntar sin el comando.'
delete responseUser[senderJid]
}, 60 * 1000)
}
} else {
if (responseUser[senderJid]?.timeout) clearTimeout(responseUser[senderJid].timeout);
responseUser[senderJid] = {
sender: senderJid,
id: m.id,
chat: m.chat,
text: text,
args: args,
usedPrefix: usedPrefix,
command: command,
resp,
question: text,
timeout: setTimeout(async () => {
resp = 'Tiempo de espera agotado para volver a preguntar sin el comando.'
delete responseUser[senderJid]
}, 60 * 1000)
}
}
if (responseBot[conn.user.jid]?.timeout) clearTimeout(responseBot[conn.user.jid]?.timeout);
responseBot[conn.user.jid] = {
bot: conn.user.jid,
id: m.id,
chat: m.chat,
text: text,
args: args,
usedPrefix: usedPrefix,
command: command,
resp,
question: text,
timeout: setTimeout(async () => {
resp = 'Tiempo de espera agotado para volver a preguntar sin el comando.'
delete responseUser[senderJid]
}, 60 * 1000)
}
} catch (error) {
console.log(`este es el error del codigo anterior: ${error.stack}`)
resp = error.stack
}
}
return conn.sendWritingText(m.chat, resp, userdb, m)
}
handler.help = ['simi', 'bot'].map(v => v + ' <teks>')
handler.tags = ['fun']
handler.command = /^((sim)?simi|bot|botcomedia)$/i
handler.before = async function before(m, {conn, isROwner, db, userdb, senderJid}) {
let sender = senderJid.split`@`[0]
// Evitar que el bot se responda a sí mismo
//const text = m.text
const confirmationBot = (Object.keys(responseBot)[0]) === conn.user.jid;
const confirmationUser = (Object.keys(responseUser)[0]) === senderJid;
if (m.isBaileys) return;

const botData = responseBot[conn.user.jid];
const userData = responseUser[senderJid];
/*

// Actualizar la última pregunta o respuesta del bot
if (botData) {
botData.lastMessage = m.text; // Guardar el último mensaje del owner
}

if (userData) {
userData.lastMessage = m.text; // Guardar el último mensaje del usuario
}
if (botData || userData) {
resetTimeout(botData ? responseBot : responseUser, botData ? conn.user.jid : senderJid, m);
}
*/
// Manejo del owner para editar respuestas
if ((isROwner) && botData) {
if (!confirmationBot) return;
let { usedPrefix, command, resp, args, question, awaitingNewAnswer, chat } = botData;
const text = m.text.replace(usedPrefix+command, '').trim()
if (chat !== m.chat) return
//, , , , , , , 
if (awaitingNewAnswer) {
if (/editstop/i.test(m.text)) {
delete responseBot[conn.user.jid];
return conn.sendWritingText(m.chat, "Edición cancelada.", userdb, m);
}

// Actualizar respuesta si el owner proporciona texto
let newAnswer = responseUser[senderJid]?.text;
if (newAnswer) {
responseUser[senderJid] = {
sender: senderJid,
id: m.id,
chat: m.chat,
text: text,
args: [],
usedPrefix: usedPrefix,
command: command,
resp: resp,
question: question, // Actualiza con la última pregunta
timeout: setTimeout(() => {
delete responseUser[senderJid];
}, 60 * 1000)
};
responseBot[conn.user.jid] = {
bot: conn.user.jid,
id: m.id,
chat: m.chat,
text: text,
args: [],
usedPrefix: usedPrefix,
command: command,
resp: resp,
question: question,
awaitingNewAnswer: false,
//question: botData.lastMessage, // Usar el último mensaje como la pregunta a editar
};
newAnswer = text
console.log(`Chatbot: `, responseBot[conn.user.jid].text, responseUser[senderJid].text, question, newAnswer);
const updateMessage = editResponse(question, newAnswer);
delete responseBot[conn.user.jid];
return conn.sendWritingText(m.chat, updateMessage, userdb, m);
}
}

// Solicitar nueva respuesta si se detecta un comando de edición
if (/corregir|editar/i.test(normalizeText(m.text)) && isROwner) {
responseUser[senderJid] = {
sender: senderJid,
id: m.id,
chat: m.chat,
text: responseUser[senderJid].text,
args: [],
usedPrefix: usedPrefix,
command: command,
resp: resp,
question: question, // Actualiza con la última pregunta
timeout: setTimeout(() => {
delete responseUser[senderJid];
}, 60 * 1000)
};
responseBot[conn.user.jid] = {
bot: conn.user.jid,
id: m.id,
chat: m.chat,
text: responseUser[senderJid].text,
args: [],
usedPrefix: usedPrefix,
command: command,
resp: resp,
question,
awaitingNewAnswer: true,
timeout: setTimeout(() => {
delete responseUser[senderJid];
}, 60 * 1000)
};
return conn.sendWritingText(m.chat, `La respuesta a "${question}" está mal. ¿Qué respuesta la reemplazará?`, userdb, m);
}
}

// Manejo del entrenamiento por parte del usuario
if (userData) {
if (!confirmationUser) return;
let { usedPrefix, command, resp, args, question, chat } = userData;
const text = m.text.replace(usedPrefix+command, '').trim()
if (chat !== m.chat) return
if (question) {
if (/trainstop/i.test(m.text)) {
delete responseUser[senderJid];
return conn.sendWritingText(m.chat, "Entrenamiento cancelado.", userdb, m);
}

// Si hay una pregunta pendiente, entrenar al bot
if (resp.includes("¿Puedes enseñarme?")) {
const answer = text;
if (answer) {
const trainResp = trainChatbot(question, answer);
// Reiniciar el temporizador si el usuario sigue interactuando
if (responseUser[senderJid]?.timeout) clearTimeout(responseUser[senderJid].timeout);
responseUser[senderJid] = {
sender: senderJid,
id: m.id,
chat: m.chat,
text: text,
args: [],
usedPrefix: usedPrefix,
command: command,
resp: trainResp,
question: answer, // Actualiza con la última respuesta
timeout: setTimeout(() => {
delete responseUser[senderJid];
}, 60 * 1000)
};
if (responseBot[conn.user.jid]?.timeout) clearTimeout(responseBot[conn.user.jid]?.timeout);
responseBot[conn.user.jid] = {
bot: conn.user.jid,
id: m.id,
chat: m.chat,
text: text,
args: [],
usedPrefix: usedPrefix,
command: command,
resp: trainResp,
question: answer,
timeout: setTimeout(() => {
delete responseBot[conn.user.jid];
}, 60 * 1000)
};
return conn.sendWritingText(m.chat, trainResp, userdb, m);
} else {
}
} else {
//\nm.text: ${m.text}\ntext: ${text}\nargs: ${args[0]}\nusedPrefix: ${usedPrefix}\ncommand: ${command}\nresp: ${resp}\nquestion: ${question}
const knownResponse = getResponse(text); // Función para obtener la respuesta conocida
if (knownResponse) {
console.log(`Respuesta conocida encontrada: "${knownResponse}"`);
if (responseUser[senderJid]?.timeout) resetTimeout(responseUser, senderJid);
responseUser[senderJid] = {
sender: senderJid,
id: m.id,
chat: m.chat,
text: text,
args: [],
usedPrefix: usedPrefix,
command: command,
resp: knownResponse,
question: text, // Actualiza con la última pregunta
timeout: setTimeout(() => {
delete responseUser[senderJid];
}, 60 * 1000)
};
if (responseBot[conn.user.jid]?.timeout) resetTimeout(responseBot, conn.user.jid);
responseBot[conn.user.jid] = {
bot: conn.user.jid,
id: m.id,
chat: m.chat,
text: responseUser[senderJid].text,
args: [],
usedPrefix: usedPrefix,
command: command,
resp: resp,
question: text,
timeout: setTimeout(() => {
delete responseBot[conn.user.jid];
}, 60 * 1000)
};
return conn.sendWritingText(m.chat, knownResponse, userdb, m);
}
}
}
}

// Si no conoce la respuesta, iniciar entrenamiento


//await conn.sendWritingText(m.chat, "No conozco esa respuesta. Por favor, enséñame qué debería responder.", m);
}
handler.menu = [
{title: "🎖️ SIMI", description: "usa #simi <texto> y entrena a este chat bot", id: `botcomedia`},
];
handler.type = "fun";

handler.disabled = false;

export default handler
/*
if (!responseUser.length) return 
Object.entries(responseUser).map(c => c[0] === senderJid) === senderJid
const confirmation = Object.entries(responseUser).map(c => c);
console.log(`Chatbot: `, responseUser, confirmation);
if (!confirmation) return;
const {resp, timeout} = responseUser
*/
//clearTimeout(timeout);${resp}resp.includes("¿Puedes enseñarme?")

try {
if (fs.existsSync(dbFilePath)) {
const data = fs.readFileSync(dbFilePath, 'utf-8');
knowledgeBase = JSON.parse(data);
} else {
// Base de datos inicial si el archivo no existe
knowledgeBase = [
{ question: "¿Cómo estás?", answer: "¡Estoy bien, gracias por preguntar!" },
{ question: "¿Cuál es tu nombre?", answer: "Bot Comedia, Soy un chatbot entrenable." },
{ question: "¿Qué puedes hacer?", answer: "Puedo responder preguntas simples. Entréname para saber más." }
];
fs.writeFileSync(dbFilePath, JSON.stringify(knowledgeBase, null, 2));
}
} catch (error) {
console.error("Error al cargar la base de datos:", error);

}
function resetTimeout(data, jid) {
// Cancelar el timeout anterior si existe

if (data[jid]?.timeout) {
clearTimeout(data[jid].timeout);
}

// Reiniciar el timeout
data[jid] = {
...data[jid],
timeout: setTimeout(() => {
delete data[jid];
console.log(`Tiempo de interacción agotado para ${jid}`);
}, 60 * 1000), // 1 minuto
};
}// Función para guardar la base de datos en el archivo
function saveKnowledgeBase() {
try {
fs.writeFileSync(dbFilePath, JSON.stringify(knowledgeBase, null, 2));
} catch (error) {
console.error("Error al guardar la base de datos:", error);
}
}
function editResponse(question, newAnswer) {
const entry = knowledgeBase.find(entry => normalizeText(entry.question) === normalizeText(question));
if (!entry) {
return `La pregunta ${question} no existe en la base de datos.`;
}
entry.answer = newAnswer;
saveKnowledgeBase();
return `La respuesta a "${question}" ha sido actualizada correctamente.`;
}
// Función para encontrar la mejor respuesta
function getResponse(input) {
const normalizedInput = normalizeText(input);
let bestMatch = null;
let highestScore = 0;

// Comparar cada pregunta en la base de datos
for (const entry of knowledgeBase) {
const score = similarity(normalizeText(entry.question), normalizedInput);
if (score > highestScore) {
highestScore = score;
bestMatch = entry;
}
}

// Ajustar el umbral de similitud
if (highestScore > 0.8) { // Cambia este valor según lo que consideres una buena coincidencia
return bestMatch.answer;
}
return `No estoy seguro de cómo responder a ${input}. ¿Puedes enseñarme?`;
/*
const match = knowledgeBase.find(entry => entry.question.toLowerCase() === input.toLowerCase());
return match ? match.answer : "No estoy seguro de cómo responder eso. ¿Puedes enseñarme?";
*/
}
function normalizeText(text) {
return text
.toLowerCase()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
.replace(/[^\w\s]/gi, '') // Eliminar signos de puntuación
.trim();
}

// Función para entrenar al chatbot
function trainChatbot(newQuestion, newAnswer) {
if (!newQuestion || !newAnswer) {
return "Por favor, proporciona tanto una pregunta como una respuesta.";
}
const normalizedNewQuestion = normalizeText(newQuestion);
const exists = knowledgeBase.some(entry => normalizeText(entry.question) === normalizedNewQuestion);
if (exists) {
const existingEntry = knowledgeBase.find(entry => normalizeText(entry.question) === normalizedNewQuestion);
if (existingEntry.answer === newAnswer) {
return `Ya conozco la respuesta ${newAnswer} a esta pregunta: ${newQuestion}. Usa una pregunta diferente.`;
} else {
existingEntry.answer = newAnswer; // Actualiza la respuesta
saveKnowledgeBase();
return `He actualizado la respuesta ${existingEntry.answer} para la pregunta ${newQuestion}.`;
}
}
knowledgeBase.push({ question: newQuestion, answer: newAnswer });
saveKnowledgeBase();
return `¡He aprendido algo nuevo!\n\nQue "${newQuestion}" es: "${newAnswer}"`;
}
/*
import translate from '@vitalets/google-translate-api'
import fetch from 'node-fetch'
let handler = async (m, {conn, text, usedPrefix, command, db, userdb, senderJid}) => {
if (!text) return conn.sendWritingText(m.chat, `*[❗] INGRESE UN TEXTO PARA HABLAR CON SIMSIMI O EL BOT*\n\n*EJEMPLO: ${usedPrefix + command} Hola bot*`, userdb, m)
try {
let res = await fetch(`https://api.simsimi.net/v2/?text=${text}&lc=es`)
let json = await res.json()
let resp = json.success.trim()

await conn.sendWritingText(m.chat, resp, userdb, m);
} catch {
try {
if (text.includes('Hola')) text = text.replace('Hola', 'Hello')
if (text.includes('hola')) text = text.replace('hola', 'Hello')
if (text.includes('HOLA')) text = text.replace('HOLA', 'HELLO')
let reis = await fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=" + text)
let resu = await reis.json()
let nama = m.pushName || '1'
let api = await fetch("http://api.brainshop.ai/get?bid=153868&key=rcKonOgrUFmn5usX&uid=" + nama + "&msg=" + resu[0][0][0])
let res = await api.json()
let reis2 = await fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=es&dt=t&q=" + res.cnt)
let resu2 = await reis2.json()
let resp = resu2[0][0][0]

await conn.sendWritingText(m.chat, resp, userdb, m);
//m.reply(resu2[0][0][0])
} catch (e) {
console.log(`este es el error del codigo anterior: ${e}`)

let reisss = await fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=id&dt=t&q=" + text)
let resuuu = await reisss.json()
let res2 = await fetch(`https://violetics.pw/api/utility/simsimi?apikey=beta&text=${resuuu[0][0][0]}`)
let json2 = await res2.json()
let result = json2.result
let lol = await translate(`${result}`, { to: 'es', autoCorrect: true })
let txt = '';
let count = 0;
for (const c of lol.text.trim()) {
await new Promise(resolve => setTimeout(resolve, 50));
txt += c;
count++;
if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
}
}
await conn.sendWritingText(m.chat, resp, userdb, m);

}}
}
handler.help = ['simi', 'bot'].map(v => v + ' <teks>')
handler.tags = ['fun']
handler.command = /^((sim)?simi|bot|alexa|cortana)$/i
export default handler
*/
/*let res2 = await fetch(`https://api.phamvandien.xyz/sim?type=ask&ask=${text}`)
let json2 = await res2.json()
let result = json2.answer*/