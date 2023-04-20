let handler = async (m, { conn, text, command, usedPrefix }) => {
let pp = './src/warn.jpg'
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
else who = m.chat
let user = global.db.data.users[who]
let bot = global.db.data.settings[conn.user.jid] || {}
let warntext = `*[❗] ETIQUETE A UNA PERSONA O RESPONDA A UN MENSAJE DEL GRUPO PARA ADVERTIR AL USUARIO*\n\n*—◉ EJEMPLO:*\n*${usedPrefix + command} @${global.suittag}*`
if (conn.user.jid == who) throw 'No puedo advertirme a mi mismo'
if (!who) throw m.reply(warntext, m.chat, { mentions: conn.parseMention(warntext)}) 
user.warn += 1
  
await conn.sendButton(m.chat,`${user.warn == 1 ? `*@${who.split`@`[0]}*` : `*@${who.split`@`[0]}*`} RECIBIO UNA ADVERTENCIA EN ESTE GRUPO!`, `*ADVERTENCIAS ${user.warn}/3*\n\n${wm}`, pp, [['📋 LISTA DE ADVERTENCIAS 📋', '#listwarn']], m, { mentions: [who] })
	
if (user.warn >= 3) {
if (!bot.restrict) return m.reply('*[❗INFO❗] EL PROPIETARIO DEL BOT NO TIENE HABILITADO LAS RESTRICCIONES (#enable restrict) CONTACTE CON EL PARA QUE LO HABILITE*')        
user.warn = 0
await m.reply(`TE LO ADVERTI VARIAS VECES!!\n*@${who.split`@`[0]}* SUPERASTE LAS *3* ADVERTENCIAS, AHORA SERAS ELIMINADO/A 👽`, null, { mentions: [who]})
//user.banned = true
await conn.groupParticipantsUpdate(m.chat, [who], 'remove') 
} 
return !1
}
handler.command = /^(advertir|advertencia|warn|warning)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
//arreglos en la linea 9 por https://github.com/SinNombre999
