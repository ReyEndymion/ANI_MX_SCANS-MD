/* Codigo hecho por @Fabri115 y mejorado por BrunoSobrino */

const handler = async (m, {conn, usedPrefix, db, objs, userdb, senderJid}) => {
let { default: path } = await import('path');
const {  purgeSession, purgeOldFiles, purgeSessionSB  } = await import('../lib/functions.js');
const fs = await import('fs');
if (global.userBot !== conn.user.jid) {
return conn.sendWritingText(m.chat, '*[❗] Utiliza este comando directamente en el número principal del Bot*', userdb, m);
}
const chatId = m.isGroup ? [m.chat, senderJid] : [senderJid];
const {authFolder, authFolderRespald} = objs
const sessionPath = authFolder;
try {
const files = fs.readdirSync(authFolder);
let filesDeleted = 0;
//purgeOldFiles(sessionPath)
for (const file of files) {
for (const id of chatId) {
if (file.includes(id.split('@')[0])) {
fs.unlinkSync(path.join(authFolder, file));
filesDeleted++;
break;
}
}
}
if (filesDeleted === 0) {
await conn.sendWritingText(m.chat, '*[❗] No se encontró ningún archivo que incluya la ID del chat*', userdb, m);
} else {
await conn.sendWritingText(m.chat, `*[❗] Se eliminaron ${filesDeleted} archivos de sesión*`, userdb, m);
}
} catch (err) {
console.error('Error al leer la carpeta o los archivos de sesión:', err);
await conn.sendWritingText(m.chat, '*[❗] Ocurrió un error al eliminar los archivos de sesión*', userdb, m);
}
return conn.sendWritingText(m.chat, `*👋 ¡Hola! Ahora me ves?*\n\n*[❗] Si el Bot no le responde a sus comandos por favor haga un pequeño spam*\n\n*—◉ Ejemplo:*\n${usedPrefix}s\n${usedPrefix}s\n${usedPrefix}s`, userdb, m);
};
handler.help = ['fixmsgespera'];
handler.tags = ['fix'];
handler.command = /^(fixmsgespera|ds)$/i;
handler.menu = [
{title: '🗑️ | FIX: ESPERANDO(users)', description: 'El usuario que note este problema de "*_Esperando mensaje_*" podra usar el comando #ds en el chat problematico', id: 'ds'}
];
handler.type = "herramientas";
handler.disabled = false;

export default handler;
