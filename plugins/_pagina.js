let handler = async (m, { conn, usedPrefix, command, paypal }) => {
let resp = 'https://www.paypal.me/AMxScan/'
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 10));
txt += c;
count++;
if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
}
}

conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
handler.help = ['pagina']
handler.tags = ['info']
handler.command = /^paypal$/i
export default handler