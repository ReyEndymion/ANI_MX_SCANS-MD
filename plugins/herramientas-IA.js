
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({ apiKey: 
//`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`
`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`
})
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `Muestra:\n${usedPrefix + command} Que es OpenAi`
//const configuration = new Configuration({
    apiKey: "" //api key bisa didapatkan dari https://openai.com/api/
//});
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let entrance;
let mentionedNames = {};
let int = text;

// Procesar menciones en el mensaje original
if (m.mentionedJid && m.mentionedJid && m.mentionedJid.length > 0) {
  m.mentionedJid.forEach(async (jid) => {
    let user = await conn.getName(jid);
    mentionedNames[jid] = user.pushname || user.name || jid.split('@')[0];
  });
}

// Procesar menciones en el mensaje citado
if (m.quoted && m.quoted.mentionedJid && m.quoted.mentionedJid.length > 0) {
  m.quoted.mentionedJid.forEach(async (jid) => {
    let user = await conn.getName(jid);
    mentionedNames[jid] = user.pushname || user.name || jid.split('@')[0];
  });
}

// Reemplazar menciones con nombres en el texto original
for (let jid in mentionedNames) {
  int = int.replace(new RegExp(jid.replace('@', '\\\@'), 'g'), '@' + mentionedNames[jid]);
}

// Reemplazar menciones con nombres en el mensaje citado
let quoted = m.quoted ? m.quoted.int : '';
for (let jid in mentionedNames) {
  quoted = quoted.replace(new RegExp(jid.replace('@', '\\\@'), 'g'), '@' + mentionedNames[jid]);
}

// Crear la cadena de salida
if (m.mentionedJid) {
  entrance = `Petición: ${int}\nCitado: ${quoted}\nID de Whatsapp: ${Object.keys(mentionedNames).join(', ')}\nNombre de usuario o apodo: ${Object.values(mentionedNames).join(', ')}`;
} else {
  entrance = int;
}

console.log(entrance);


const openai = new OpenAIApi(configuration);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: entrance,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0
        });
        const resp = response.data.choices[0].text
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
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m}, { disappearingMessagesInChat: 1 * 1000} );
    }
handler.help = ['ai <pertanyaan>']
handler.tags = ['ai']
handler.command = /^(ia)$/i
handler.limit = false
handler.register = false

export default handler
//