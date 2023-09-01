import translate from '@vitalets/google-translate-api'
import fetch from 'node-fetch'
let handler = async (m, {conn, text, usedPrefix, command }) => {
if (!text) throw `*[❗] INGRESE UN TEXTO PARA HABLAR CON SIMSIMI O EL BOT*\n\n*EJEMPLO: ${usedPrefix + command} Hola bot*`
try {
let res = await fetch(`https://api.simsimi.net/v2/?text=${text}&lc=es`)
let json = await res.json()
let resp = json.success.trim()
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
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
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
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
    //m.reply(resu2[0][0][0])
} catch (e) {
    console.log(`este es el error del codigo anterior: ${e}`)
/*let res2 = await fetch(`https://api.phamvandien.xyz/sim?type=ask&ask=${text}`)  
let json2 = await res2.json()
let result = json2.answer*/  
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
                conn.sendPresenceUpdate('composing' , m.chat);
            }
        }
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );

}}
}
handler.help = ['simi', 'bot'].map(v => v + ' <teks>')
handler.tags = ['fun']
handler.command = /^((sim)?simi|bot|alexa|cortana)$/i
export default handler
