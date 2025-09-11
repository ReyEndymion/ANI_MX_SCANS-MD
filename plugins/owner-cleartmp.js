let handler = async (m, {conn, usedPrefix: _p, pluginsPath, args, db, userdb, senderJid}) => {
const {clearTmp} = await import('../lib/functions.js')
await clearTmp()
conn.sendWritingText(m.chat, '*[ ✔ ] ARCHIVOS DE LA CARPETA TMP ELIMINADOS CON EXITO!!*', userdb, m)
}
handler.help = ['cleartmp']
handler.tags = ['owner']
handler.command = /^(cleartmp|cleartemp)$/i
handler.rowner = true
handler.menu = [
{title: "🗑️ CLEARTMP", description: "Elimina todos los archivos temporales del bot", id: `cleartmp`}
];
handler.type = "owners";
handler.disabled = false;

export default handler
