/* Creditos a https://github.com/ALBERTO9883 */

let handler = async(m, {conn, db, userdb, senderJid}) => {
let revoke = await conn.groupRevokeInvite(m.chat)
//let resp = `🔹️ *_Se restableció con éxito el link del grupo._*\n♾ • Link Nuevo: ${'https://chat.whatsapp.com/' + revoke}`
let resp = `🔹️ *_Se restableció con éxito el link del grupo._*`


conn.sendWritingText(m.chat, resp, userdb, m)
}
handler.command = ['resetlink', 'revoke']
handler.botAdmin = true
handler.admin = true
handler.group = true
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
