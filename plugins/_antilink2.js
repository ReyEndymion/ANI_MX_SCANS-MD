let linkRegex = /https:/i
export async function before(m, { isAdmin, isBotAdmin, text }) {
if (m.isBaileys && m.fromMe)
return !0
if (!m.isGroup) return !1
let chat = global.db.data.chats[m.chat]
let bot = global.db.data.settings[this.user.jid] || {}
const isGroupLink = linkRegex.exec(m.text)
if (chat.antiLink2 && isGroupLink && !isAdmin) {
if (isBotAdmin) {
const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
const linkThisGroup2 = `https://www.youtube.com/`
const linkThisGroup3 = `https://youtu.be/`
if (m.text.includes(linkThisGroup)) return !0
if (m.text.includes(linkThisGroup2)) return !0
if (m.text.includes(linkThisGroup3)) return !0
}    
await conn.sendButton(m.chat, `*「 ANTI LINKS 」*\n*HASTA LA VISTA BABY 👋, ${await this.getName(m.sender)} ROMPISTES LAS REGLAS DEL GRUPO, SERAS EXTERMINADO...!!*${isBotAdmin ? '' : '\n\n*[❗INFO❗] EL BOT NO ES ADMIN, NO PUEDE EXTERMINAR A LAS PERSONAS*'}`, author, ['DESACTIVAR ANTILINKS', '/disable antilink'], m)    
if (isBotAdmin && bot.restrict) {
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
} else if (!bot.restrict) return m.reply('*[❗INFO❗] EL PROPIEARIO DEL BOT NO TIEIE HABILITADO LAS RESTRICCIONES (#_enable restrict_) CONTACTE CON EL PARA QUE LO HABILITE*')
}
return !0
}
