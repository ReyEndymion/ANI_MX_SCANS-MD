import fs from 'fs'
let handler = async (m, { conn, text } ) => {  
let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])
let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
let teks = text ? text : cc.text
let contextInfo = {  
    mentionedJid: [m.sender],  
    "externalAdReply": {  
    "showAdAttribution": true,  
    "containsAutoReply": true,
    "renderLargerThumbnail": true,  
    "title": '*COMUNICADO OFICIAL A GRUPOS*',   
    "containsAutoReply": true,  
    "mediaType": 1,   
    "thumbnail": imagen1,  
    "mediaUrl": `https://api.whatsapp.com/send/?phone=5215625406730&text=.serbot&type=phone_number&app_absent=0`,  
    "sourceUrl": md  
    }  
    }
for (let id of groups) { 
let resp = `*╔══❰ COMUNICADO ❱══╗*\n*║*\n*╠❧* ${text}\n*║*\n*╚══════════════╝*` + '\n\n*_ESTE ES UN COMUNICADO OFICIAL_*\n'
//conn.sendButton(id, `*╔══❰ COMUNICADO ❱══╗*\n*║*\n*╠❧* ${text}\n*║*\n*╚══════════════╝*`, '*_ESTE ES UN COMUNICADO OFICIAL_*\n' + wm, fs.readFileSync('./src/avatar_contact.png'), [['🤖 OWNER 🤖', '.owner'],['💎 DONAR 💎', '.donasi']], false, { contextInfo: { externalAdReply: {title: '*COMUNICADO OFICIAL A GRUPOS*', body: ' BY 🌎ANI MX SCANS🌏', sourceUrl: md, thumbnail: fs.readFileSync('./Menu2.jpg') }}})
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 30));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , id);
    }
}
conn.sendMessage(id, {text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt)}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 })
}
let resp = `*[❗INFO❗] MENSAJE ENVIADO A ${groups.length} GRUPO/S*\n\n*NOTA: ES POSIBLE QUE ESTE COMANDO TENGA FALLOS Y NO SÉ ENVIÉ A TODOS LOS CHATS, DISCULPE POR EL MOMENTO*`
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
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
}
handler.help = ['broadcastgroup', 'bcgc'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)(group|grup|gc)$/i
handler.rowner = true
export default handler
