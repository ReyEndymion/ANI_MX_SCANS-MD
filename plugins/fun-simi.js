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
const confirmationBot = (Object.keys(responseBot)[0]) === conn.user.jid;
const confirmationUser = (Object.keys(responseUser)[0]) === senderJid;
if (m.isBaileys) return;

const botData = responseBot[conn.user.jid];
const userData = responseUser[senderJid];
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
question: question,
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
};
newAnswer = text
console.log(`Chatbot: `, responseBot[conn.user.jid].text, responseUser[senderJid].text, question, newAnswer);
const updateMessage = editResponse(question, newAnswer);
delete responseBot[conn.user.jid];
return conn.sendWritingText(m.chat, updateMessage, userdb, m);
}
}

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
question: question,
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

if (resp.includes("¿Puedes enseñarme?")) {
const answer = text;
if (answer) {
const trainResp = trainChatbot(question, answer);
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
question: answer,
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
const knownResponse = getResponse(text);
if (knownResponse) {
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
question: text,
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
}
handler.menu = [
{title: "🎖️ SIMI", description: "usa #simi <texto> y entrena a este chat bot", id: `botcomedia`},
];
handler.type = "fun";

handler.disabled = false;

export default handler

try {
if (fs.existsSync(dbFilePath)) {
const data = fs.readFileSync(dbFilePath, 'utf-8');
knowledgeBase = JSON.parse(data);
} else {
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

if (data[jid]?.timeout) {
clearTimeout(data[jid].timeout);
}

data[jid] = {
...data[jid],
timeout: setTimeout(() => {
delete data[jid];
console.log(`Tiempo de interacción agotado para ${jid}`);
}, 60 * 1000),
};
}
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
function getResponse(input) {
const normalizedInput = normalizeText(input);
let bestMatch = null;
let highestScore = 0;

for (const entry of knowledgeBase) {
const score = similarity(normalizeText(entry.question), normalizedInput);
if (score > highestScore) {
highestScore = score;
bestMatch = entry;
}
}

if (highestScore > 0.8) {
return bestMatch.answer;
}
return `No estoy seguro de cómo responder a ${input}. ¿Puedes enseñarme?`;
}
function normalizeText(text) {
return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, '').trim();
}

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
existingEntry.answer = newAnswer;
saveKnowledgeBase();
return `He actualizado la respuesta ${existingEntry.answer} para la pregunta ${newQuestion}.`;
}
}
knowledgeBase.push({ question: newQuestion, answer: newAnswer });
saveKnowledgeBase();
return `¡He aprendido algo nuevo!\n\nQue "${newQuestion}" es: "${newAnswer}"`;
}
