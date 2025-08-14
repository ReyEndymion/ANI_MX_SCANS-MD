let handler = async (m, {conn, isPrems, userdb, db, senderJid}) => {
if (!m.isGroup) return
let hasil = Math.floor(Math.random() * 1000)
let time = userdb.lastmiming + 600000
if (new Date - userdb.lastmiming < 600000) {
let resp = `*[ ⏲️ ] _Espera_ ${msToTime(time - new Date())} _para volver a minar_*`
return await conn.sendWritingText(m.chat, resp, m );
}
let resp = `*[ 🎉 ] Genial, minaste ${hasil} XP*`
userdb.lastmiming = new Date * 1
return await conn.sendWritingText(m.chat, resp, m );
}
handler.help = ['minar']
handler.tags = ['xp']
handler.command = ['minar', 'miming', 'mine'] 
handler.fail = null
handler.exp = 0
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds

return minutes + " m y " + seconds + " s " 
}
