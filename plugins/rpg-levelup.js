
let handler = async (m, {conn, userdb, db, senderJid}) => {
let { canLevelUp, xpRange } = await import('../lib/levelling.js')
let { levelup } = await import( '../lib/levelling.js')
const {userID} = await import('../config.js')

if (m.chat.endsWith(userID)) return
let name = senderJid.split`@`[0]//conn.getName(senderJid)
if (!canLevelUp(userdb.level, userdb.exp, global.multiplier)) {
let { min, xp, max } = xpRange(userdb.level, global.multiplier)
let resp =`
┌───⊷ *NIVEL*
▢ Nombre : *@${name}*
▢ Nivel : *${userdb.level}*
▢ XP : *${userdb.exp - min}/${xp}*
└──────────────

Te falta *${max - userdb.exp}* de *XP* para subir de nivel
`.trim()
return conn.sendWritingText(m.chat, resp, userdb, m)
}
let before = userdb.level * 1
while (canLevelUp(userdb.level, userdb.exp, global.multiplier)) userdb.level++
if (before !== userdb.level) {
let teks = `🎊 Bien hecho @${senderJid.split`@`[0]}Nivel:`
let str = `
┌─⊷ *LEVEL UP*
▢ Nivel anterior : *${before}*
▢ Nivel actual : *${userdb.level}*
└──────────────

*_Cuanto más interactúes con los bots, mayor será tu nivel_*
`.trim()
try {
const img = await levelup(teks, userdb.level)
return conn.sendImageWriting(m.chat, img, str, m );
} catch (e) {
return conn.sendWritingText(m.chat, `Error: ${e.stack}`, userdb, m)}
}
}

handler.help = ['levelup']
handler.tags = ['xp']

handler.command = ['nivel', 'lvl', 'levelup', 'level'] 

handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
