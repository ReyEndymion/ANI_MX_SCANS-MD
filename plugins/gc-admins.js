let handler = async (m, { conn, participants, groupMetadata, args }) => {
const pp = './src/admins.jpg'
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
let pesan = args.join` `
let oi = `*MENSAJE:* ${pesan}`
let text = `*━「* INVOCANDO ADMINS *」━*\n\n${oi}\n\n*ADMINS:*\n${listAdmin}\n\n*[ ⚠ ️] USAR ESTE COMANDO SOLO CUANDO SE TRATE DE UNA EMERGENCIA!!*\n\n${wm}`.trim()
let txt = text;
let count = 0;
for (const c of text) {
    await new Promise(resolve => setTimeout(resolve, 50));
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
await conn.sendMessage(m.chat, {image: {url: pp}, caption: txt, mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 1 * 100, disappearingMessagesInChat: true} );
}
handler.help = ['admins <texto>']
handler.tags = ['group']
handler.command = /^(admins|@admins|dmins)$/i
handler.group = true
export default handler
