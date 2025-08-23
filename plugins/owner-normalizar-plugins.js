import fs from 'fs'
async function handler(m, { conn, __dirname, userdb, senderJid }) {
const path = await import('path')
let {__filename, plugins, opts, prefix } = await import('../lib/functions.js');
let normalizados = 0;
let omitidos = 0;
let escritos = [];

for (const [pathModule, plugin] of plugins.entries()) {
const filepath = __filename(pathModule, true)
if (plugin.name !== 'handler') {
omitidos++;
continue;
}

const propsFaltantes = [];

if (plugin.help == null) {
plugin.help = [];
propsFaltantes.push(`handler.help = ${JSON.stringify(plugin.help)};`);
}
if (plugin.tags == null) {
plugin.tags = [];
propsFaltantes.push(`handler.tags = ${JSON.stringify(plugin.tags)};`);
}
if (plugin.menu == null) {
plugin.menu = [];
propsFaltantes.push(`handler.menu = ${JSON.stringify(plugin.menu)};`);
}
if (plugin.command == null) {
plugin.command = [];
propsFaltantes.push(`handler.command = ${JSON.stringify(plugin.command)};`);
}
if (plugin.type == null) {
plugin.type = '';
propsFaltantes.push(`handler.type = ${JSON.stringify(plugin.type)};`);
}
if (plugin.disable == null) {
plugin.disabled = false
propsFaltantes.push(`handler.disabled = ${JSON.stringify(plugin.disabled)};`)
}

if (propsFaltantes.length === 0) continue;
let source = fs.readFileSync(filepath, 'utf8');

let modificaciones = propsFaltantes.filter(linea => !source.includes(linea.split('=')[0].trim()));

if (modificaciones.length > 0) {
if (source.includes('export default handler')) {
source = source.replace(
/export\s+default\s+handler/,
modificaciones.join('\n') + '\n\nexport default handler'
);
} else {
source += '\n\n' + modificaciones.join('\n');
}

fs.writeFileSync(filepath, source, 'utf8');
normalizados++;
escritos.push(filepath);
}
}
const resp = `✅ Plugins normalizados: ${normalizados}\n📁 Archivos escritos:\n` +
escritos.map(f => `- ${path.basename(f)}`).join('\n') +
`\n⛔ Plugins omitidos (sin handler): ${omitidos}`
return conn.sendWritingText(m.chat, resp, userdb, m);
}

handler.help = ['normalizarplugins'];
handler.tags = ['owner'];
handler.command = /^normalizarplugins$/i;
handler.menu = [
{title: 'NORMALIZAR PLUGINS', description: 'añade propiedades faltantes para la administracion y edicion del plugin', id: 'normalizarplugins'}
]
handler.type = 'owners'
handler.rowner = true;
export default handler
