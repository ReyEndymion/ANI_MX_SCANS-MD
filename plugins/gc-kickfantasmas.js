import { areJidsSameUser } from '@whiskeysockets/baileys'
let handler = async (m, { conn, text, participants, args, command }) => {
    let member = participants.map(u => u.id)
    if(!text) {
    var sum = member.length
    } else {
    var sum = text} 
    var total = 0
    var sider = []
    for(let i = 0; i < sum; i++) {
    let users = m.isGroup ? participants.find(u => u.id == member[i]) : {}
    if((typeof global.db.data.users[member[i]] == 'undefined' || global.db.data.users[member[i]].chat == 0) && !users.isAdmin && !users.isSuperAdmin) { 
    if (typeof global.db.data.users[member[i]] !== 'undefined'){
    if(global.db.data.users[member[i]].whitelist == false){
    total++
    sider.push(member[i])}
    }else {
    total++
    sider.push(member[i])}}}
    let noHay = `*Este grupo no tiene fantasmas :D.*`
    let siHay = `*[ELIMINACION DE INACTIVOS]*\n\n*Grupo: ${await conn.getName(m.chat)}*\n*Participantes: ${sum}*\n\n*[ 👻 FANTASMAS QUE MORIRAN 👻 ]*\n${sider.map(v => '@' + v.replace(/@.+/, '')).join('\n')}\n\n*Nota: Aunque esto no sea 100% acertado, el Bot eliminara la lista mencionada, empezando en 20 segundos y cada 10 segundos eliminara un numero*`
    if(total == 0) {
        let txt = '';
        let count = 0;
        for (const c of noHay) {
            await new Promise(resolve => setTimeout(resolve, 5));
            txt += c;
            count++;
            if (count % 10 === 0) {
                conn.sendPresenceUpdate('composing' , m.chat);
            }
        }
            await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
        
        } else {
                let txt = '';
                let count = 0;
                for (const c of siHay) {
                    await new Promise(resolve => setTimeout(resolve, 5));
                    txt += c;
                    count++;
                    if (count % 10 === 0) {
                        conn.sendPresenceUpdate('composing' , m.chat);
                    }
                }
                    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
               }
        
       await delay(1 * 20000)
       let chat = global.db.data.chats[m.chat]
       chat.welcome = false
       try{
       
       let users = m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id))
       let kickedGhost = sider.map(u => u.id).filter(v => v !== conn.user.jid)
       for (let user of users)
           if (user.endsWith('@s.whatsapp.net') && !(participants.find(v => areJidsSameUser(v.id, user)) || { admin: true }).admin)
        {
        let res = await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
        kickedGhost.concat(res)
       await delay(1 * 10000)
       }} finally{
        chat.welcome = true
       }
}
    handler.command = /^(kickfantasmas|sacarfantasmas)$/i
    handler.admin = true
    handler.botAdmin = true
    export default handler
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    //desarrollado por https://github.com/ReyEndymion
    //participa en desactivacion de despedida https://github.com/BrunoSobrino/
    

