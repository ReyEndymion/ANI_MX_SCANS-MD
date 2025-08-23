export const config = {
callmsg: 'Hola *@sender*, las @calls no están permitidas, serás bloqueado.\n-\nSi accidentalmente llamaste póngase en contacto con mi creador @owners para que te desbloquee!'
};
export const menuInfo = {
help: `Bloquea numeros que realizan llamadas molestas al bot\nUsar asi para habilitar: *usedPrefixenable anticall*\nUsar asi para deshabilitar: *usedPrefixdisable anticall*`,
info: `━━━━━━━━━━━━━━━━━━━━
┣ *👑 ENABLE ANTICALL*: usedPrefixenable anticall
━━━━━━━━━━━━━━━━━━━━
┣ *👑 DISABLE ANTICALL*: usedPrefixdisable anticall
`,
type: 'enable',
chat: `ambos`
}
export async function call(callUpdate, {db, conn, owner}) {
let isAnticall = db.data.bot[conn.user.jid].settings.antiCall;
if (!isAnticall) return
try {
for (let call of callUpdate) {
const {chatId, from, date, offline, status, isVideo, isGroup} = call
const owners = owner.filter(entry => typeof entry[0] === 'string' && !isNaN(entry[0])).map(entry => ({ jid: entry[0] })).slice(0).map(({jid}) => `@${jid}`).join` y `

// Verificar si plugins contiene plugins cargados.split`@`[0]
if (isGroup == false) {
if (status == 'offer' || status == 'ringing') {
await conn.rejectCall(chatId, from)
const mensaje = config.callmsg;
const remplazo1 = mensaje.replace('@sender', `@${from.split('@')[0]}`);
const remplazo2 = remplazo1.replace('@calls', isVideo ? 'videollamadas' : 'llamadas');
const resp = remplazo2.replace('@owners', owners)

let q = await conn.sendWritingText(m.chat, resp, userdb, null);
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;ℛℯ𝓎 ℰ𝓃𝒹𝓎𝓂𝒾ℴ𝓃;;;\nFN:ℛℯ𝓎 ℰ𝓃𝒹𝓎𝓂𝒾ℴ𝓃\nORG:ℛℯ𝓎 ℰ𝓃𝒹𝓎𝓂𝒾ℴ𝓃\nTITLE:\nitem1.TEL;waid=5215517489568:+5215517489568\nitem1.X-ABLabel:ℛℯ𝓎 ℰ𝓃𝒹𝓎𝓂𝒾ℴ𝓃\nX-WA-BIZ-DESCRIPTION:[❗] ᴄᴏɴᴛᴀᴄᴛᴀ ᴀ ᴇsᴛᴇ ɴᴜᴍ ᴘᴀʀᴀ ᴄᴏsᴀs ɪᴍᴘᴏʀᴛᴀɴᴛᴇs.\nX-WA-BIZ-NAME:ℛℯ𝓎 ℰ𝓃𝒹𝓎𝓂𝒾ℴ𝓃\nEND:VCARD`;
await conn.sendMessage(from, { contacts: { displayName: 'ℛℯ𝓎 ℰ𝓃𝒹𝓎𝓂𝒾ℴ𝓃', contacts: [{ vcard }] }}, {quoted: q, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100});
return conn.updateBlockStatus(from, 'block');
} else {
console.log('No se encontró un mensaje personalizado para el evento.');
}
}
}
} catch (error) {
console.log('ocurrio un error', error);
}
}

