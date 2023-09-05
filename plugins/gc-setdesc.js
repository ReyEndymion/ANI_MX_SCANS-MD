let handler = async (m, { conn, args, text }) => {
    if (!text && !m.quoted) {
        let resp = `*[❗INFO❗] INGRESE EL NOMBRE QUE DESEA QUE SEA EL NUEVO NOMBRE DEL GRUPO O CONTESTE A UN MENSAJE QUE TENGA UN TAG Y SEA COMPATIBLE CON LA CANTIDAD DE 25 CARÁCTERES*`
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
    return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
try {
let text2 = m.quoted ? m.quoted.text : text ? `${args.join(" ")}` : m.quoted.text
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
let txto = text2.replace('@' + who.replace(/\s+/g, '').split`@`[0], name).trim()
await conn.groupUpdateDescription(m.chat, txto);
//console.log('funcion desc: ', conn.groupUpdateDescription())
let resp = '*✅ La descripción del grupo se modifico correctamente*'
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
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
} catch (e) {
    let resp = `*[❗INFO❗] LO SIENTO HUBO UN ERROR, LA DESCRIPCION NO SE PUDO CAMBIAR*'\n ${JSON.stringify(e)}`
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
    return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
    }
}
handler.help = ['Setdesc <text>']
handler.tags = ['group']
handler.command = /^setdesk|setdesc$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
