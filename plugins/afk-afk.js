let handler = async (m, {conn, text }) => {
let user = global.db.data.users[m.sender]
user.afk = + new Date
user.afkReason = text
let resp = `*[❗INFO❗] EL USUARIO ${conn.getName(m.sender)} ESTARA INACTIVO (AFK), POR FAVOR NO LO ETIQUETEN*\n\n*—◉ MOTIVO DE LA INACTIVIDAD (AFK)${text ? ': ' + text : ''}*
`
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
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );

}
handler.help = ['afk [alasan]']
handler.tags = ['main']
handler.command = /^afk$/i
export default handler
