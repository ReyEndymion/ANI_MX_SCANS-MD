import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({ apiKey: `remplaza por tu apikey segun el tutorial`})
let handler = async (m, { text, usedPrefix, command }) => {
if (!text) throw `*[❗] 𝙸𝙽𝙶𝚁𝙴𝚂𝙴 𝚄𝙽𝙰 𝙿𝙴𝚃𝙸𝙲𝙸𝙾𝙽 𝙾 𝚄𝙽𝙰 𝙾𝚁𝙳𝙴𝙽 𝙿𝙰𝚁𝙰 𝚄𝚂𝙰𝚁 𝙻𝙰 𝙵𝚄𝙽𝙲𝙸𝙾𝙽 𝙳𝙴 𝙲𝙷𝙰𝚃𝙶𝙿𝚃*\n\n*—◉ 𝙴𝙹𝙴𝙼𝙿𝙻𝙾𝚂 𝙳𝙴 𝙿𝙴𝚃𝙸𝙲𝙸𝙾𝙽𝙴𝚂 𝚈 𝙾𝚁𝙳𝙴𝙽𝙴𝚂*\n*◉ ${usedPrefix + command} Reflexion sobre la serie Merlina 2022 de netflix*\n*◉ ${usedPrefix + command} Codigo en JS para un juego de cartas*`
let infoChaGPT = `
Aquí te presento un breve tutorial para crear una cuenta y obtener una API key en OpenAI:

Ve a la página web de OpenAI: https://openai.com/
Haz clic en "Sign Up" en la esquina superior derecha de la página.
Se te pedirá que proporciones tu nombre, dirección de correo electrónico y una contraseña. Ingresa esta información y haz clic en "Sign Up".
Una vez que hayas iniciado sesión en tu cuenta, ve a la página de "API Tokens" (https://beta.openai.com/account/api-keys).
Haz clic en "Create New API Key".
Se te pedirá que proporciones un nombre para tu clave API y selecciones las capacidades que deseas que tenga. También se te proporcionará una vista previa de la cantidad de créditos que se utilizarán para cada capacidad. Haz clic en "Create API Key".
Se te proporcionará una clave API. Copia y pega esta clave remplazando lo que esta entre las comillas [const configuration = new Configuration({ apiKey: `remplaza por tu apikey segun el tutorial`})] en este plugin para usar la API de OpenAI.
¡Y eso es todo! Ahora puedes usar la API de OpenAI en tus proyectos de programación sin fines de lucro. Asegúrate de revisar los términos y condiciones de OpenAI para asegurarte de cumplir con los requisitos de uso.
`.trim()
try {
m.reply('*[❗] 𝙴𝚂𝙿𝙴𝚁𝙴 𝚄𝙽 𝙼𝙾𝙼𝙴𝙽𝚃𝙾 𝙴𝙽 𝙻𝙾 𝚀𝚄𝙴 𝙼𝙰𝙽𝙳𝙾 𝙻𝙾 𝚀𝚄𝙴 𝙼𝙴 𝙿𝙸𝙳𝙸𝙾*')

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let txtoint = m.quoted ? m.quoted.text : text
  let name = await conn.getName(who);
  let usertoname = txtoint.replace('@' + who.split`@`[0], name)
  let entrance =  `${(text || txtoint || txtoint.includes(usertoname))} el quoted fue: ${txtoint//.includes(usertoname)
  }` 
  console.log(`Se escribió esta entrada de texto: ${entrance}`);

  
  const openai = new OpenAIApi(configuration);
  const openaiImg = new OpenAIApi(configImagKey)
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
} catch {
throw `*[❗] 𝙴𝚁𝚁𝙾𝚁, 𝚅𝚄𝙴𝙻𝚅𝙰 𝙰 𝙸𝙽𝚃𝙴𝙽𝚃𝙰𝚁𝙻𝙾`
}
} catch {
let txt = '';
let count = 0;
for (const c of infoChaGPT) {
    await new Promise(resolve => setTimeout(resolve, 50));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 1 * 100, disappearingMessagesInChat: true} );
}
}
handler.command = ['openai', 'chatgpt', 'ia', 'robot']
export default handler
