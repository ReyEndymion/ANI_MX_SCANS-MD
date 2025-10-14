import cp, {exec as _exec} from 'child_process';
const handler = async (m, {conn, info, isROwner, usedPrefix, command, text, db, userdb, senderJid, objs}) => {
let {plugins, opts, prefix } = await import('../lib/functions.js');
const {imagen1, pluginsPath} = objs//= await import('../config.js')
const { promisify } = await import('util');
let { default: fs } = await import('fs');
const path = await import('path')
const exec = promisify(_exec).bind(cp);
const ar = [...plugins.keys()];
const ar1 = ar.map((v) => path.basename(v).replace('.js', ''));
const bannedPlugins = ['jadibot-serbot', '_pruebasConsoleHandler', '_pruebasConsoleBefore', 'gc_invitamegGC', '_textos'];
if (!text) {
let resp = `*[❗] Ingresa el nombre de algún plugin (archivo) existente*\n\n*—◉ por ejemplo*\n*◉ ${usedPrefix + command}* info-infobot\n\n—◉ Para la lista de plugins (archivos) existentes usa el comando\n*${usedPrefix}listinfoplugin*\nNota: solo el nombre sin la extensión (.js)`;
return conn.sendWritingText(m.chat, resp, userdb, m)
}
if (ar.includes(text + '.js') && bannedPlugins.includes(text.toLowerCase())) {
let resp = `Lo siento este codigo esta prohibido por el autor`
return conn.sendWritingText(m.chat, resp, userdb, m)
}
if (!ar1.includes(text)) {
let resp = `*[❗] No se encontró ningún plugin (archivo) llamado "${text}", ingresa alguno existente*\n\n*==================================*\n\n*—◉ Lista de archivos existentes:*\n*◉* ${ar1.map((v) => ' ' + v).join`\n*◉*`}`;

return conn.sendWritingText(m.chat, resp, userdb, m)
} 
let o;
const file = path.join(pluginsPath, text + '.js')
try {
o = await exec(`cat ${file}`);
} catch (e) {
o = e;
} finally {
const {stdout, stderr} = o;
console.log ('gp: ', o)
if (stdout.trim()) {
let resp = stdout
const botNumber = conn.user.jid.split('@')[0]
let contextInfo = { 
mentionedJid: conn.parseMention(resp), 
"externalAdReply": { 
//"showAdAttribution": true, 
"containsAutoReply": true,
"renderLargerThumbnail": true, 
"title": info.nanipe,
"containsAutoReply": true, 
"mediaType": 2,
"thumbnail": fs.readFileSync(imagen1),//apii.res.url, path.basename()
"mediaUrl": `https://api.whatsapp.com/send/?phone=${botNumber}&text=.serbot&type=phone_number&app_absent=0`, 
"sourceUrl": `https://api.whatsapp.com/send/?phone=${botNumber}&text=.serbot&type=phone_number&app_absent=0` 
} 
} 
const aa = await conn.sendWritingTextCI(m.chat, resp, contextInfo, userdb, m)
const message = {mimetype: 'application/javascript', fileName: `${text}.js`}
return conn.sendDocumentWriting(m.chat, fs.readFileSync(file), message, userdb, aa)
}
if (stderr.trim()) {
const aa2 = await conn.sendWritingText(m.chat, stderr, userdb, m);
const message = {mimetype: 'application/javascript', fileName: `${text}.js`}
return conn.sendDocumentWriting(m.chat, fs.readFileSync(file), message, userdb, aa2)
}
}
};
handler.help = ['getplugin'].map((v) => v + ' *<nombre>*');
handler.tags = ['owner'];
handler.command = /^(getplugin|gp)$/i;
handler.rowner = true;
handler.menu = [
{title: 'SOLICITAR PLUGINS', description: ' Solicita cualquier plugin Que esté autorizado a mostrarse en público, Puedes usar el comando #listinfoplugin Para listar todos los plugins\n\nEjemplo: #getplugin _editConfig\nNota: no uses la extencion (.js) en el comando', id: 'gp'},
];
handler.type = "owners";
handler.disabled = false;

export default handler;
