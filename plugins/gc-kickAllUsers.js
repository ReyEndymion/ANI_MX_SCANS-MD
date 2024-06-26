import { areJidsSameUser } from '@whiskeysockets/baileys'
import path, {join} from 'path';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
let handler = async (m, { conn, args, participants }) => {
    if (!global.db.data.bot[conn.user.jid].settings.restrict) {
    let resp = '*[ ⚠️ ] EL OWNER TIENE RESTRINGIDO (_enable restrict_ / _disable restrict_) EL USO DE ESTE COMANDO*'
    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;
    if (count % 10 === 0) {
    await conn.sendPresenceUpdate('composing' , m.chat);
    }
    }
    return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}

    try {
    const pp = join(media, 'pictures/users.jpg')
    const groupNoAdmins = participants.filter(p => !p.admin && p.id)
    const listUsers = groupNoAdmins.map((v) => `@${v.id.split('@')[0]}`).join(' ')
    let pesan = args.join` `
    let oi = `*MENSAJE:* ${pesan}`
    let text = `━「 *SERAN ELIMINADOS* 」━\n\n${oi}\n\n*USUARIOS:*\n${listUsers}\n\n${wm}`.trim()
    let txt = text;

    let count = 0;
    for (const c of text) {
        await new Promise(resolve => setTimeout(resolve, 10));
        count++;

        if (count % 10 === 0) {
           await conn.sendPresenceUpdate('composing' , m.chat);
        }
    }

    let q = conn.sendMessage(m.chat, {image: {url: pp}, caption: txt, mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
    //await delay(1 * 2000)

    let chat = global.db.data.bot[conn.user.jid].chats[m.chat]
    chat.welcome = false

for (let user of listUsers.split(' ')) {
    const userId = user.endsWith('@s.whatsapp.net') ? user : `${user}@s.whatsapp.net`;
    await conn.groupParticipantsUpdate(m.chat, [userId], 'remove');
console.log('admin?: ', user)
    await delay(10 * 1000);
  }

    let txt2 = `LA ELIMINACION DE:\n${listUsers}\nFUE EXITOSA `;
    let count2 = 0;
    for (const c of txt2) {
        await new Promise(resolve => setTimeout(resolve, 15));
        count2++;

        if (count2 % 10 === 0) {
           await conn.sendPresenceUpdate('composing' , m.chat);
        }
    }
    await conn.sendMessage(m.chat, {image: {url: pp}, caption: txt2, mentions: conn.parseMention(txt2) }, {quoted: q, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );

    } catch (e) {
        console.log(e)
    } finally {
        chat.welcome = true
    }
}

handler.help = ['kickallusers', '-'].map(v => 'o' + v + ' @user')
handler.tags = ['owner']
handler.command = /^(kickallusers)$/i

handler.owner = true
handler.group = true
handler.botAdmin = true

export default handler

// version creada por https://github.com/ReyEndymion