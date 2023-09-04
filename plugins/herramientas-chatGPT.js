import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({ apiKey: `remplaza por tu apikey segun el tutorial`})
let handler = async (m, { text, usedPrefix, command }) => {
if (!text) throw `*[❗] INGRESE UNA PETICION O UNA ORDEN PARA USAR LA FUNCION DE CHATGPT*\n\n*—◉ EJEMPLOS DE PETICIONES Y ORDENES:*\n*◉ ${usedPrefix + command} Reflexion sobre la serie Merlina 2022 de netflix*\n*◉ ${usedPrefix + command} Codigo en JS para un juego de cartas*`
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let txtoint = m.quoted ? m.quoted.text : text
  let name = await conn.getName(who);
  let usertoname = txtoint.replace('@' + who.split`@`[0], name)
  let entrance =  `${(text || txtoint || txtoint.includes(usertoname))} el quoted fue: ${txtoint//.includes(usertoname)
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
    const resp = response.data.choices[0].text;
	let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 1 * 100, disappearingMessagesInChat: true} );
} catch (error) {
let infoChaGPT = `
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
let txt = '';
let count = 0;
for (const c of infoChaGPT) {
    await new Promise(resolve => setTimeout(resolve, 10));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 1 * 100, disappearingMessagesInChat: true} );
}
}
handler.help = ['ai <peticion>']
handler.tags = ['ai']
handler.command = new RegExp(`^(ia|openai|chatgpt|robot|${conn.user.jid.replace('@s.whatsapp.net', '')})$`, 'i');
handler.limit = false
handler.register = false

export default handler//original de https://github.com/ReyEndymion