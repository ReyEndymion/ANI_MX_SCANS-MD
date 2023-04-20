let handler = async (m, { conn, participants, groupMetadata, args }) => {
const pp = './src/users.jpg'
const groupNoAdmins = participants.filter(p => !p.admin && p.id)
const listUsers = groupNoAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
    let pesan = args.join` `
    let oi = `*MENSAJE:* ${pesan}`
    let text = `━「 *INVOCANDO USUARIOS* 」━\n\n${oi}\n\n*USUARIOS:*\n${listUsers}\n\n${wm}`.trim()
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
  
  handler.help = ['users <texto>']
  handler.tags = ['group']
  handler.command = /^(users|usuarios)$/i
  handler.admin = true
  handler.group = true
  
  export default handler
  