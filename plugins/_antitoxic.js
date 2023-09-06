const toxicRegex = /puto|puta|rata|estupido|imbecil|rctmre|mrd|verga|vrga|maricon/i

export async function before(m, {conn, isAdmin, isBotAdmin, isOwner }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup)
        return !1
    let user = global.db.data.users[m.sender]
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    const isToxic = toxicRegex.exec(m.text)
    
    if (isToxic && chat.antiToxic && !isOwner && !isAdmin) {
       user.warn += 1
       if (!(user.warn >= 5)) {
       let resp = `${user.warn == 1 ? `Hola *@${m.sender.split`@`[0]}*` : `*@${m.sender.split`@`[0]}*`}, decir la palabra (${isToxic}) está prohibido en este bot *${user.warn}/5* advertencia`
       let txt = '';
       let count = 0;
       for (const c of resp) {
           await new Promise(resolve => setTimeout(resolve, 5));
           txt += c;
           count++;
           if (count % 10 === 0) {
               conn.sendPresenceUpdate('composing' , m.chat);
           }
       }
           await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
           }
       }
    
    if (user.warn >= 5) {
       user.warn = 0
       let resp = `Hola *@${m.sender.split`@`[0]}*, superaste las 5 advertencias serás bloqueado y eliminado de este grupo`
       let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
user.banned = true
       await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
       //await this.updateBlockStatus(m.sender, 'block')
    }
    return !1
}
