let handler = async (m, {conn, text, info, usersdb, userdb, senderJid}) => {
const {multiplier, readMore} = await import('../lib/constants.js')
let { canLevelUp, xpRange } = await import('../lib/levelling.js')
let { levelup } = await import( '../lib/levelling.js')
const {userID} = await import('../config.js')
let userjid = senderJid.split`@`[0]
let { exp, limit, level, role } = userdb
let { min, xp, max } = xpRange(level, multiplier)
if (!canLevelUp(userdb.level, exp, multiplier)) {
return conn.sendWritingText(m.chat, `
┌───⊷ *NIVEL*
▢ Nombre: *@${userjid}*
▢ Nivel: *${level}*
▢ Rango: *${role}*
▢ XP: *${exp - min}/${xp}*
▢ 💎: *${limit}*
└──────────────

Te falta *${max - exp}* de *XP* para subir de nivel\n\n> ${info.nanipe}`.trim(), userdb, m)
}
let before = level * 1
while (canLevelUp(level, exp, multiplier)) level++
if (before !== level) {
let teks = `🎊 Bien hecho @${senderJid.split`@`[0]}Nivel:`
let str = `
┌─⊷ *LEVEL UP*
▢ Nivel anterior : *${before}*
▢ Nivel actual : *${level}*
▢ Rango: *${role}*
▢ Fecha: *${new Date().toLocaleString('id-ID')}*
└──────────────

*_Cuanto más interactúes con @${conn.user.jid.split('@')[0]}, mayor será tu nivel_*\n*_Actualiza tú rango con el comando ${usedPrefix}rol!!_*\n\n> ${info.nanipe}*
`.trim()
try {
const img = await levelup(teks, level)
return conn.sendImageWriting(m.chat, img, str, userdb, m)
} catch (e) {
return conn.sendWritingText(m.chat, str, userdb, m)
}
}
}
handler.help = ['levelup']
handler.tags = ['xp']

handler.command = ['nivel', 'lvl', 'levelup', 'level'] 

handler.menu = [
{title: "🎉 LEVEL UP", description: `Sube de nivel al interactuar con el bot, usa el comando #levelup`, id: `levelup`}
];
handler.type = "rpg";
handler.disabled = false;

export default handler
