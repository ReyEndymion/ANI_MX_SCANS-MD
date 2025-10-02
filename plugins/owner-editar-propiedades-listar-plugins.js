import { parse } from 'acorn'
async function handler(m, { conn, args, text, command, usedPrefix, userdb, senderJid, objs }) {
const path = await import('path')
const fs = await import('fs')
let {__filename, plugins, opts, prefix } = await import('../lib/functions.js');
const {pluginsPath} = objs

if (/^listinfoplugin$/i.test(command)) {
const isHandler = []
const filter = args[0]?.toLowerCase(); 
const filters = filter ? filter.split('+') : [];
const entries = plugins.entries();
const lista = [...entries].filter(([_, plugin]) => {
if (!filters) return true;
return filters.every(f => {
if (f === 'handler') return typeof plugin === 'function' || plugin.handler;
if (f === 'before') {
return plugin && typeof plugin.before === 'function';
}

if (f === 'all') {
return plugin && typeof plugin.all === 'function';
}
if (f === 'anonymous') {
return plugin && typeof plugin === 'function' && plugin.name === '' || typeof plugin.handler === 'function' && plugin.handler.name === ''
}
return false;
})
}).map(([filepath], idx) => `${idx + 1}. ${path.basename(filepath)}`);

const encabezado = filter
? `🔍 Listando plugins con función "${filter}":\n\n`
: '📦 Lista de todos los plugins:\n\n';

return conn.sendWritingText(m.chat, encabezado + lista.join('\n'), userdb, m);
}
if (/^infoplugin$/i.test(command)) {
if (!args[0]) return conn.sendWritingText(m.chat, `Uso incorrecto:\n${usedPrefix+command} <número> contestando sobre la lista que el bot debio mandar con el comando ${usedPrefix}listinfoplugin`, userdb, m);
if (m.quoted?.text) {
const lines = m.quoted?.text.trim().split('\n').filter(line => /^\d+\./.test(line));
const idx = parseInt(args[0]) - 1;
if (isNaN(idx) || !lines[idx]) return conn.sendWritingText(m.chat, 'Número inválido o fuera de rango.', userdb, m);

const filename = lines[idx].split('. ').slice(1).join('. ').trim(); 

const [filepath, plugin] = [...plugins.entries()].find(([fp]) => path.basename(fp) === filename) || [];

if (!plugin) return conn.sendWritingText(m.chat, `No se encontró el plugin ${filename}.`, userdb, m);
const name = path.basename(filepath)
let info = ''
if (plugin.name === 'handler') {
const props = {
help: JSON.stringify(plugin.help, null, 2),
tags: JSON.stringify(plugin.tags, null, 2),
menu: JSON.stringify(plugin.menu, null, 2),
command: plugin.command instanceof RegExp ? plugin.command.toString() : JSON.stringify(plugin.command || {}, null, 2),
type: JSON.stringify(plugin.type || '', null, 2)
};

info = `🧩 *Plugin:* ${name}\n` +
Object.entries(props)
.map(([key, val]) => `• *${key}:* ${val}`)
.join('\n');
} else {
info = `Este Plugin es de tipo before o all\nSi quiere observar el contenido del plugin deberá usar *${usedPrefix}getplugin ${name.split('.')[0]}*`
}
return conn.sendWritingText(m.chat, info, userdb, m);
} else {
return conn.sendWritingText(m.chat, `Debe contestar a la lista que el bot debe mandar con el comando:\n${usedPrefix}listinfoplugin`, userdb, m);
}
}
if (/^editinfoplugin/i.test(command)) {
if (args.length < 2) return conn.sendWritingText(m.chat, `Uso correcto:\n${usedPrefix+command} <número> | <propiedad> = <valor>`, userdb, m);
if (!m.quoted?.text) return conn.sendWritingText(m.chat, 'No ha contestado a un mensaje con una lista.', userdb, m)
const lines = m.quoted?.text.trim().split('\n').filter(line => /^\d+\./.test(line));
const idx = parseInt(args[0]) - 1;
if (isNaN(idx) || !lines[idx]) return conn.sendWritingText(m.chat, 'Número inválido o fuera de rango.', userdb, m);
const filename = lines[idx].split('. ').slice(1).join('. ').trim();

const entries = plugins.entries();
const [filepath, plugin] = [...entries].find(([fp]) => path.basename(fp) === filename) || [];
const [rawPluginIdx, propYvalor] = text.split('|').map(s => s.trim());
const [prop, rawValue] = propYvalor.split('=').map(s => s.trim());

if (isNaN(idx) || !prop || rawValue === undefined)
return conn.sendWritingText(m.chat, 'Formato incorrecto. Asegúrate de usar: número | propiedad = valor', userdb, m);


if (!plugin) return conn.sendWritingText(m.chat, 'No se encontró el plugin con ese número.', userdb, m);

if (plugin.name === 'handler') {
const oldValue = plugin[prop];

try {
let newValue;

if (['null', 'undefined'].includes(rawValue)) {
if (plugin.hasOwnProperty(prop)) {
delete plugin[prop];
return conn.sendWritingText(m.chat, `Propiedad '${prop}' eliminada del plugin.`, userdb, m);
} else {
return conn.sendWritingText(m.chat, `La propiedad '${prop}' no existe, nada que eliminar.`, m);
}
}
if (rawValue.startsWith('{') || rawValue.startsWith('[')) {
newValue = eval(`(${rawValue})`);

if (typeof oldValue === 'string') {
return conn.sendWritingText(m.chat, `Este plugin ya tiene un valor tipo *string* en '${prop}':\n${oldValue}\n\nUsa el modo simple con:\n${usedPrefix+command} <número> | ${prop} = <texto>`, userdb, m);
} else {

}
if (typeof oldValue === 'object' || oldValue === undefined) {
plugin[prop] = newValue;
return conn.sendWritingText(m.chat, `Propiedad '${prop}' actualizada como objeto.`, userdb, m);
} else {
return conn.sendWritingText(m.chat, `Este plugin ya tiene un valor tipo *${typeof oldValue}* en '${prop}', incompatible con objeto.\n\nUsa el modo correspondiente.`, m);
}
} else if (rawValue === 'true' || rawValue === 'false') {
newValue = rawValue === 'true';
return conn.sendWritingText(m.chat, `Propiedad '${prop}' actualizada como booleano: *${newValue}*`, userdb, m);
} else if (!isNaN(rawValue)) {
newValue = Number(rawValue);
plugin[prop] = rawValue;
return conn.sendWritingText(m.chat, `Propiedad '${prop}' actualizada como número: *${newValue}*`, userdb, m);
} else {
if (typeof oldValue === 'object' && !Array.isArray(oldValue)) {
await conn.sendWritingText(m.chat, `Este plugin ya tiene un valor tipo *objeto* en '${prop}':\n${JSON.stringify(oldValue, null, 2)}\n\nSi quieres cambiarlo por un texto, usa:\n${usedPrefix+command} <número> | ${prop} = "nuevo texto"\n\n*⚠️ Esto reemplazará completamente el valor actual.*`, m);
}
newValue = rawValue;
plugin[prop] = rawValue;
await conn.sendWritingText(m.chat, `Propiedad '${prop}' del archivo ${path.basename(filepath)} actualizada con el texto: "${rawValue}"`, userdb, m);
}
const fileContent = fs.readFileSync(filepath, 'utf8');
const exportRegex = /export\s+default\s+handler/;

const match = fileContent.match(exportRegex);
console.log('lis-edit-infoplugin: ', exportRegex)
if (!exportRegex.test(fileContent)) throw new Error('No se pudo encontrar el bloque export default');

const modificacion = `handler.${prop} = ${typeof newValue === 'string' ? JSON.stringify(newValue) : JSON.stringify(newValue, null, 2)};`;

let nuevoContenido;
if (fileContent.includes(`handler.${prop}`)) {
const propRegex = new RegExp(`handler\\.${prop}\\s*=.*?;`, 's');
nuevoContenido = fileContent.replace(propRegex, modificacion);
} else {
nuevoContenido = fileContent.replace(exportRegex, `${modificacion}\n\n${exportRegex}`);
}

fs.writeFileSync(filepath, nuevoContenido, 'utf8');

} catch (e) {
return conn.sendWritingText(m.chat, `Error al procesar el valor: ${e.message}\n${e.stack}`, userdb, m);
}
} else {
return conn.sendWritingText(m.chat, `El plugin que selecciono no debe llevar propiedades handler\n`, userdb, m);
}
}
if (/^(upload|cargar)plugin$/i.test(command)) {
const file = m.quoted?.message?.documentMessage || m.message?.documentMessage;
const commandCaption = m.quoted?.message?.documentMessage?.caption || m.message?.documentMessage?.caption;

if (!file || !file.fileName?.endsWith('.js')) {
return conn.sendWritingText(m.chat, '❌ Debes enviar un archivo `.js` con el caption `/cargarplugin` o responder a uno con ese comando.', userdb, m );
}

let quoted = m.quoted ? m.quoted : m
const buffer = await quoted.download();
const filename = file.fileName.replace(/[^a-zA-Z0-9_\-.]/g, '');
const filepath = path.join(pluginsPath, filename);

try {
const code = buffer.toString('utf8');

parse(code, {
ecmaVersion: 'latest',
sourceType: 'module',
});

if (!code.includes('export default handler')) {
return conn.sendWritingText(m.chat, `⚠️ El archivo no contiene \`export default handler\`. Asegúrate de exportar correctamente el plugin.`, userdb, m );
}

await fs.promises.writeFile(filepath, code, 'utf8');

conn.sendWritingText(m.chat, `✅ Plugin \`${filename}\` cargado correctamente en la carpeta de plugins.`, userdb, m );
} catch (e) {
conn.sendWritingText(m.chat, `❌ Error al cargar el plugin:\n${e.message}` , userdb, m);
}
}
}
handler.help = ['editinfoplugin'];
handler.tags = ['owner'];
handler.command = /^((edit|list)?(info|upload|cargar)plugin)$/i;
handler.rowner = true;
handler.menu = [
{title: 'EDITAR PROPIEDADES DE PLUGINS', description: 'añade o edita propiedades faltantes para la administracion y edicion del plugin', id: 'editinfoplugin'},
{title: 'LISTAR PLUGINS', description: 'Lista los plugins existentes: usar los filtros handler, before, anonymous, handler+before... etc. Ejemplo:\n *#listinfoplugin before', id: 'listinfoplugin'},
{title: 'INFORMACION DE PROPIEDADES EN PLUGINS', description: ' Informa de las propiedades existentes del plugin', id: 'infoplugin'},
{title: 'CARGAR PLUGINS', description: 'añade o reemplaza un plugin (ideal para debuggin)', id: 'uploadplugin'},
];
handler.type = "owners";

handler.disabled = false;

export default handler