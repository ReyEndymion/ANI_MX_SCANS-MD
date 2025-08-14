async function handler(m, {conn, args, command, userdb}) {
const {configDinamics} = await import('../lib/database.js')
if (/^configcheckall/.test(command)) {
const config = await configDinamics();
const msg = JSON.stringify(config)
return conn.sendWritingText(m.chat, msg, userdb, m);
}
const [block, key, ...rest] = args;

if (!['info', 'start'].includes(block))
return conn.sendWritingText(m.chat, `Bloque no válido: ${block}`, userdb, m);
if (/^configcheck/.test(command)) {
if (args.length < 2)
return conn.sendWritingText(m.chat, 'Se requieren al menos 2 argumentos: bloque y propiedad', userdb, m);
const config = await configDinamics();
const valor = config[block][key]
const msg = `✅ Configuración consultada:
Bloque: *${block}*
Propiedad: *${key}*
Valor: *${valor}*`;

await conn.sendWritingText(m.chat, msg, userdb, m);
}
if (/^configedit/.test(command)) {
if (args.length < 3)
return conn.sendWritingText(m.chat, 'Se requieren al menos 3 argumentos: bloque y propiedad', userdb, m);

const value = rest.join(' ');
let parsedValue = value;
if (value === 'true') parsedValue = true;
else if (value === 'false') parsedValue = false;
else if (!isNaN(value)) parsedValue = Number(value);
else if (typeof value === 'string') parsedValue = value
const update = {
[block]: {
[key]: parsedValue
}
};
await configDinamics(update);
console.log('editConfig: ', typeof value === 'string', rest, value, await configDinamics())

const msg = `✅ Configuración actualizada:
Bloque: *${block}*
Propiedad: *${key}*
Nuevo valor: *${parsedValue}*`;

await conn.sendWritingText(m.chat, msg, userdb, m);
}
}
handler.command = /^config(check|edit)(all)?/
handler.rowner = true
handler.private = true
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler