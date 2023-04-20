let handler = async(m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './Menu2.jpg'

if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}
let pesan = args.join` `
let oi = `*MENSAJE:* ${pesan}`
let teks = `*⺀INVOCANDO - GRUPO⺀*\n\n❏ ${oi}\n\n❏ *ETIQUETAS:*\n`
for (let mem of participants) {
teks += `┣➥ @${mem.id.split('@')[0]}\n`}
teks += `*└* BY ${wm}\n\n*▌│█║▌║▌║║▌║▌║▌║█*`
let txt = teks;
        let count = 0;
        for (const c of teks) {
            await new Promise(resolve => setTimeout(resolve, 50));
            count++;
        
            if (count % 10 === 0) {
                conn.sendPresenceUpdate('composing' , m.chat);
            }
        }
        await conn.sendMessage(m.chat, {image: {url: pp}, caption: txt, mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 1 * 100, disappearingMessagesInChat: true} );
}
handler.help = ['tagall <mesaje>','invocar <mesaje>']
handler.tags = ['group']
handler.command = /^(tagall|invocar|invocacion|todos|invocación)$/i
handler.admin = true
handler.group = true
export default handler
