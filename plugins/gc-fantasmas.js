let handler = async (m, { conn, text, participants }) => {
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
	if(total == 0) {
let noHay = `*Este grupo no tiene fantasmas :D.*`
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
    let siHay = `*[🌎REVISIÓN DE INACTIVOS🌏]*\n\n*Grupo: ${await conn.getName(m.chat)}*\n*Participantes: ${sum}*\n\n*[ 👻 LISTA DE FANTASMAS 👻 ]*\n${sider.map(v => '🌎👉🏻 @' + v.replace(/@.+/, '')).join('\n')}\n\n*Nota: Esto puede no ser 100% acertado, el Bot inicia el conteo de mensajes a partir de que se activo en este grupo*`
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
    }
handler.command = /^(verfantasmas|fantasmas|sider|Sider)$/i
handler.admin = true
handler.botAdmin = true
export default handler
