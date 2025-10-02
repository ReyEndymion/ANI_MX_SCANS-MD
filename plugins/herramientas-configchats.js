const handler = async function handler(m, {conn, usedPrefix, command, args, isBotAdmin, userdb}) {
const {parseDuration} = await import('../lib/functions.js')
if (/^(pin)$/i.test(command)) {
if (!args && m.quoted?.sender) return conn.sendWritingText(m.chat, `Para que el bot *fije un mensaje* Debe agregar un El modo Y la duracion Ya sea El primer argum Para 1 activar o cambiar I Cero Para desactivar Y como segundo argumento 1d Para un día, 7d Para 7 días Y 30d para 30 días, ejemplo:\n\n${usedPrefix+command} 1 1d`, userdb, m)
const timeDuration = parseDuration(args[1])/1000
if (m.isGroup && isBotAdmin) {
await conn.sendMessage(m.chat, {pin: {type: args[0], time: timeDuration, key: m.key}})
let q = await conn.sendWritingText(m.chat, ` Cambiando la duración de los mensajes a ${args[1]}`, userdb, m)
return conn.sendEditWritingText(m.chat, `listo`, q.key, userdb, m)
} else {
}
}
if (/^duration$/i.test(command)) {
if (!args[0]) {
return conn.sendWritingText(m.chat, `
🚩 Debe ingresar un modo o una duración.

*Opciones:*
- \`off | 0 |false\` → desactivar mensajes temporales
- \`1d\`, \`7d\`, \`90d\` → establecer duración personalizada

*Ejemplo:*
${usedPrefix + command} 7d
`.trim(), userdb, m);
  }
let input = (args[0] || '').toLowerCase()
if (!/^(off|0|false|24h|1d|7d|90d)$/.test(input)) {
return conn.sendWritingText(m.chat, 'Duración inválida. Usa: off | 0 | false para desactivar \n| 24h | 1d | 7d | 90d', userdb, m);
}

if (args[0] === (0|'false'|'off')) input = false
else input = parseDuration(args[0])/1000
console.log('duration: ', args, m.key, m.quoted, input)
if (m.isGroup && isBotAdmin) {
await conn.sendMessage(m.chat, {disappearingMessagesInChat: input})
} else {
await conn.sendMessage(m.chat, {disappearingMessagesInChat: input})
}
}
}
handler.command = /^(duration|pin|fijar)$/i
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler
