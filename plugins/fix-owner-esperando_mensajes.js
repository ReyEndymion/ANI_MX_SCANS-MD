/* Codigo hecho por @Fabri115 y mejorado por BrunoSobrino */


const handler = async (m, {conn, usedPrefix, db, objs, userdb, senderJid}) => {
const fs = await import('fs');
const {authFolder, sessionNameAni} = await import('../config.js')
let { default: path } = await import('path');
if (global.userBot !== conn.user.jid) {
return conn.sendWritingText(m.chat, '*[❗] Utiliza este comando directamente en el número principal del Bot.*', userdb, m);
}
await conn.sendWritingText(m.chat, '*[❗] Iniciando proceso de eliminación de todos los archivos de sesión, excepto el archivo creds.json...*', m);
const sessionPath = authFolder;
try {
if (!existsSync(sessionPath)) {
return await conn.sendWritingText(m.chat, `*[❗] La carpeta ${sessionNameAni} no existe o está vacía.*`, userdb, m);
}
const files = await fs.readdir(sessionPath);
let filesDeleted = 0;
for (const file of files) {
if (file !== 'creds.json') {
await fs.unlink(path.join(sessionPath, file));
filesDeleted++;
}
}
if (filesDeleted === 0) {
await conn.sendWritingText(m.chat, `*[❗] No se encontró ningún archivo para eliminar en la carpeta ${sessionNameAni}.*`, userdb, m);
} else {
await conn.sendWritingText(m.chat, `*[❗] Se eliminaron ${filesDeleted} archivos de sesión, excepto el archivo creds.json.*`, m);
}
} catch (err) {
console.error('Error al leer la carpeta o los archivos de sesión:', err);
await conn.sendWritingText(m.chat, '*[❗] Ocurrió un error al eliminar los archivos de sesión.*', userdb, m);
}
await conn.sendWritingText(m.chat, `*👋 ¡Hola! Ahora me ves?*\n\n*[❗] Si el Bot no le responde a sus comandos por favor haga un pequeño spam*\n\n*—◉ Ejemplo:*\n${usedPrefix}s\n${usedPrefix}s\n${usedPrefix}s`, userdb, m);
};
handler.help = ['del_reg_in_session_owner'];
handler.tags = ['owner'];
handler.command = /^(del_reg_in_session_owner|dsowner|clearallsession)$/i;
handler.rowner = true
handler.menu = [
{title: "🗑️ | LIMPIAR SESION", description: "LIMPIA LA SESIÓN SI EL BOT NO MUESTRA SUS MENSAJES", id: `del_reg_in_session_owner`},
];
handler.type = "owners";
handler.disabled = false;

export default handler;
