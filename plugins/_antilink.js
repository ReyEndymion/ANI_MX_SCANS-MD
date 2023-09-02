let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
export async function before(m, { isAdmin, isBotAdmin }) {
if (m.isBaileys && m.fromMe)
return !0
if (!m.isGroup) return !1
let chat = global.db.data.chats[m.chat]
let delet = m.key.participant
let bang = m.key.id
let bot = global.db.data.settings[this.user.jid] || {}
const isGroupLink = linkRegex.exec(m.text)
const grupo = `https://chat.whatsapp.com`
if (isAdmin && chat.antiLink && m.text.includes(grupo)) return m.reply('*HEY!! EL ANTILINK ESTA ACTIVO, PERO ERES UN ADMIN 😎, SALVADO/A!*')
if (chat.antiLink && isGroupLink && !isAdmin) {
if (isBotAdmin && bot.restrict) {
const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
if (m.text.includes(linkThisGroup)) return !0
let resp = `*「 ANTI LINKS 」*\n*HASTA LA VISTA BABY 👋, ${await this.getName(m.sender)} ROMPISTE LAS REGLAS DEL GRUPO, SERAS EXTERMINADO...!!*${isBotAdmin ? '' : '\n\n*[❗INFO❗] EL BOT NO ES ADMIN, NO PUEDE EXTERMINAR A LAS PERSONAS*'}`
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
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
} else if (!bot.restrict) {
    let resp = `*[❗INFO❗] EL PROPIETARIO DEL BOT NO TIENE HABILITADO LAS RESTRICCIONES *(#_enable restrict_)* CONTACTE CON EL PARA QUE LO HABILITE*`
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
return !0
}
