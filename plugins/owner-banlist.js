let handler = async (m, { conn, isOwner }) => {
let chats = Object.entries(global.db.data.bot[conn.user.jid].chats).filter(chat => chat[1].isBanned)
let users = Object.entries(global.db.data.bot[conn.user.jid].users).filter(user => user[1].banned)
let caption = `
┌〔 *USUARIOS BANEADOS* 〕
├ Total : ${users.length} ${users ? '\n' + users.map(([jid], i) => `
├ ${isOwner ? '@' + jid.split`@`[0] : jid}`.trim()).join('\n') : '├'}
└────

┌〔 *CHATS BANEADOS*〕
├ Total : ${chats.length} ${chats ? '\n' + chats.map(([jid], i) => `
├ ${isOwner ? '@' + jid.split`@`[0] : jid}`.trim()).join('\n') : '├'}
└────
`.trim()
m.reply(caption, null, {mentions: conn.parseMention(caption)})}
handler.command = /^banlist(ned)?|ban(ned)?list|daftarban(ned)?$/i
handler.rowner = true
export default handler
