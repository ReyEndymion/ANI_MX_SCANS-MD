import fetch from 'node-fetch'
import axios from 'axios';
import translate from '@vitalets/google-translate-api';
import {Configuration, OpenAIApi} from 'openai';
let handler = async (m, {conn, text, usedPrefix, command, db, userdb, senderJid}) => {
console.log('chatgpt: ', OpenAIApi, Configuration)
const orgOpenai = `org-sHjQj1orPaHZGszldM1hMs3m`
const apiOpenai = `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`//`sk-8nSBib8FojMSlVehJqUjT3BlbkFJVysEP08CyZKwmbcyKIzhAt`
//`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`
//const configuration = new Configuration({ apiKey: apiOpenai})
const configImagKey = new Configuration({apikey: `f30d8faae3ad41fe82cee15c137fd73a`})
const configuration = new Configuration({organization: orgOpenai, apiKey: apiOpenai});
const openaiii = new OpenAIApi(configuration);
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
for (let i = 0; i < who.length; i++) {
let txtoint = text || m.quoted;
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
}


const openai = new OpenAIApi(configuration);
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
const chatCompletion = await openai.createChatCompletion({
model: "gpt-3.5-turbo",
messages: [{role: "user", content: "Hello world"}],
});
let resp = response.data.choices[0].text;//chatCompletion.data.choices[0].message
return conn.sendWritingText(m.chat, resp, userdb, m);


} catch (error) {
console.log('error?: ', error)
let err = await translate(`${error}`, { to: 'es', autoCorrect: true })
let errorstatus = await translate(`${error.response.statusText}`, { to: 'es', autoCorrect: true })
let resp = `Error en la generación de respuesta: ${err.text} \n\nMotivo: ${errorstatus.text}`
return conn.sendWritingText(m.chat, resp, userdb, m);
}
}
handler.command = ['openai', 'chatgpt']
export default handler
/*
if (!text) return conn.sendWritingText(m.chat, `*[❗] INGRESE UNA PETICION O UNA ORDEN PARA USAR LA 𝙵UNCION DE CHATGPT*\n\n*—◉ EJEMPLOS DE PETICIONES 𝚈 ORDENES*\n*◉ ${usedPrefix + command} Reflexion sobre la serie Merlina 2022 de netflix*\n*◉ ${usedPrefix + command} Codigo en JS para un juego de cartas*`, userdb, m)
try {
await conn.sendWritingText(m.chat, `*[❗] ESPERE UN MOMENTO EN LO QUE MANDO LO QUE ME PIDIO*`, userdb, m)
const {lolkeysapi} = (await import('../api.js')).keysapi
let tiores = await fetch(`https://api.lolhuman.xyz/api/openai?apikey=${lolkeysapi}&text=${text}&user=user-unique-id`)
let hasil = await tiores.json()
m.reply(`${hasil.result}`.trim())
} catch (e) {
return conn.sendWritingText(m.chat, `*[❗] ERROR, VUELVA A INTENTARLO:\n${e.message}`, userdb, m)
}
*/