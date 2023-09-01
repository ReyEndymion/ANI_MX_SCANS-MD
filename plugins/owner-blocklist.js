/* Creado por https://github.com/FG98F */

let handler = async (m, { conn }) => {	
await conn.fetchBlocklist().then(async data => {
let resp = `*≡ Lista de bloqueados*\n\n*Total :* ${data.length}\n\n┌─⊷\n`
for (let i of data) {
resp += `▢ @${i.split("@")[0]}\n`}
resp += "└───────────"
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}).catch(async err => {
console.log(err);
let resp = 'No hay números bloqueados'
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );  
})
}
handler.help = ['blocklist']
handler.tags = ['main']
handler.command = ['blocklist', 'listblock'] 
handler.rowner = true
export default handler
