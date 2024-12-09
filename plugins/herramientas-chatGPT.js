import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({ apiKey: `remplaza por tu apikey segun el tutorial`})
let handler = async (m, {conn, text, usedPrefix, command }) => {
var resp = ''
if (!text) {resp = `*[❗] INGRESE UNA PETICION O UNA ORDEN PARA USAR LA FUNCION DE CHATGPT*\n\n*—◉ EJEMPLOS DE PETICIONES Y ORDENES:*\n*◉ ${usedPrefix + command} Reflexion sobre la serie Merlina 2022 de netflix*\n*◉ ${usedPrefix + command} Codigo en JS para un juego de cartas*`}
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
let txtoint = m.quoted ? m.quoted.text : text
let name = await conn.getName(who);
let usertoname = txtoint.replace('@' + who.split`@`[0], name)
let entrance =`${(text || txtoint || txtoint.includes(usertoname))} el quoted fue: ${txtoint//.includes(usertoname)
}` 
const openai = new OpenAIApi(configuration);
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
resp = response.data.choices[0].text;
return conn.sendWritingText(m.chat, resp, m );
} catch (error) {
resp = `
Error en la generación de respuesta o posible apikey vencida: ${error}
Aquí te presento un breve tutorial para crear una cuenta y obtener una API key en OpenAI:

Ve a la página web de OpenAI: https://openai.com/
Haz clic en "Sign Up" en la esquina superior derecha de la página.
Se te pedirá que proporciones tu nombre, dirección de correo electrónico y una contraseña. Ingresa esta información y haz clic en "Sign Up".
Una vez que hayas iniciado sesión en tu cuenta, ve a la página de "API Tokens" (https://beta.openai.com/account/api-keys).
Haz clic en "Create New API Key".
Se te pedirá que proporciones un nombre para tu clave API y selecciones las capacidades que deseas que tenga. También se te proporcionará una vista previa de la cantidad de créditos que se utilizarán para cada capacidad. Haz clic en "Create API Key".
Se te proporcionará una clave API. Copia y pega esta clave remplazando el texto que esta entre las comillas en esta parte del codigo: [const configuration = new Configuration({ apiKey: 'remplaza por tu apikey segun el tutorial'})] en este plugin para usar la API de OpenAI.
¡Y eso es todo! Ahora puedes usar la API de OpenAI en tus proyectos de programación sin fines de lucro. Asegúrate de revisar los términos y condiciones de OpenAI para asegurarte de cumplir con los requisitos de uso.
`.trim()
}
return conn.sendWritingText(m.chat, resp, m );
}
handler.help = ['ai <peticion>']
handler.tags = ['ai']
handler.command = new RegExp(`^(ia|openai|chatgpt|robot)$`, 'i');
handler.limit = false
handler.register = false
//|${conn?.user?.jid.replace('@s.whatsapp.net', '')}
export default handler
//original de https://github.com/ReyEndymion