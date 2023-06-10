import translate from '@vitalets/google-translate-api'
import fetch from 'node-fetch'
let handler = async (m, { text, usedPrefix, command }) => {
if (!text) throw `*[❗] INGRESE UN TEXTO PARA HABLAR CON SIMSIMI O EL BOT*\n\n*EJEMPLO: ${usedPrefix + command} Hola bot*`
try {
let res = await fetch(`https://api.simsimi.net/v2/?text=${text}&lc=es`)
let json = await res.json()
let txt = '';
        let count = 0;
        for (const c of (json.success.trim())) {
            await new Promise(resolve => setTimeout(resolve, 50));
            txt += c;
            count++;
        
            if (count % 10 === 0) {
                conn.sendPresenceUpdate('composing' , m.chat);
            }
        }
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: true, disappearingMessagesInChat: 24*60*100} );
} catch (e) {
    console.log(`este es el error del codigo anterior: ${e}`)
let res2 = await fetch(`https://api.phamvandien.xyz/sim?type=ask&ask=${text}`)  
let json2 = await res2.json()
let result = json2.answer  
/*let res2 = await fetch(`https://violetics.pw/api/utility/simsimi?apikey=beta&text=${text}`)  
let json2 = await res2.json()
let result = json2.result*/
let lol = await translate(`${result}`, { to: 'es', autoCorrect: true })
let txt = '';
        let count = 0;
        for (const c of lol.text.trim()) {
            await new Promise(resolve => setTimeout(resolve, 50));
            txt += c;
            count++;
        
            if (count % 10 === 0) {
                conn.sendPresenceUpdate('composing' , m.chat);
            }
        }
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m}, { disappearingMessagesInChat: 1 * 1000} );
}}
handler.help = ['simi', 'bot'].map(v => v + ' <teks>')
handler.tags = ['fun']
handler.command = /^((sim)?simi|bot|alexa|cortana)$/i
export default handler
