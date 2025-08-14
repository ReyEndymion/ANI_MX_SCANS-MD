async function handler(m, {conn, args, db, chatdb, userdb}) {
if (!args[0]) {
return conn.sendWritingText(m.chat, ` Debe especificar  *true* Para activar el no mostrar en consola o *false* para desactivar el no mostrar en consola para activar o desactivar la consola en este chat`, userdb, m)
} else {
if (/true|false/.test(args[0])) {
const bolean = args[0] === 'false' ? false : args[0] === 'true' ? true : false
chatdb.muteconsole = bolean
//await db.write()
return conn.sendWritingText(m.chat, `El Estado para mostrar en consola a cambiado a: ${chatdb.muteconsole}`, userdb, m)
}
if (/estado/.test(args[0])) {
return conn.sendWritingText(m.chat, `El Estado de la consola para este chat es: ${chatdb.muteconsole}`, userdb, m)

}
}
}
handler.rowner = true
handler.command = /^muteconsole$/i
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler