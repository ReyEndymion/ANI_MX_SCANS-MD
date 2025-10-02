
async function handler(m, { conn, participants, botdb, chatdb, usedPrefix, command, args, isAdmin, isBotAdmin, isOwner, isROwner, objs, userdb, senderJid, isLidGroup }) {
const {dataBases} = await import('../config.js') 
if (!botdb.settings.restrict) {return conn.sendWritingText(m.chat, `'*[ ⚠️ ] EL OWNER TIENE RESTRINGIDO (_enable restrict_ / _disable restrict_) EL USO DE ESTE COMANDO*'`, userdb, m)
} else {
if (isBotAdmin) {
const participantsMap = participants.map((p) => isLidGroup ? p.phoneNumber : p.id);

if (participantsMap.length < 2) {
return console.log('Debe haber al menos 2 participantes en el grupo para jugar a la ruleta rusa.');
}

const a = participantsMap.getRandom();
let b;
do {
b = participantsMap.getRandom();
} while (b === a);

const toMention = (id) => `@${id.split('@')[0]}`;
const replyText = `¡Bang! 💥 ${toMention(a)} o ${toMention(b)}, uno de ustedes será eliminado del grupo en 30 segundos 👎.`;
await conn.sendWritingText(m.chat, replyText, userdb, m);

await new Promise((resolve) => setTimeout(resolve, 30000));

const selectedParticipant = Math.random() < 0.5 ? a : b;
chatdb.welcome = false
await conn.groupParticipantsUpdate(m.chat, [selectedParticipant], 'remove');
await conn.sendWritingText(m.chat, `Ya desapareci a @${selectedParticipant.split('@')[0]} ahora toca aparecerlo`, userdb, m);
const response = await conn.query({tag: 'iq', attrs: {type: 'set', xmlns: 'w:g2', to: m.chat, }, content: [{ tag: 'add', attrs: {}, content: [{ tag: 'participant', attrs: { jid: selectedParticipant } }]}]})
const pp = await conn.profilePictureUrl(m.chat).catch(_ => null)
const jpegThumbnail = pp ? await (await fetch(pp)).buffer() : Buffer.alloc(0)
const { getBinaryNodeChild, getBinaryNodeChildren } = (await import('@whiskeysockets/baileys')).default
const add = getBinaryNodeChild(response, 'add')
const participant = getBinaryNodeChildren(add, 'participant')
for (const user of participant.filter(item => item.attrs.error == 403)) {
const jid = user.attrs.jid
const content = getBinaryNodeChild(user, 'add_request')
const invite_code = content.attrs.code
const invite_code_exp = content.attrs.expiration
const groupName = await conn.getName(m.chat)
let teks = `*Envie un invitación privada :v!!*`
if (user === 'block'){
chatdb.unblock = true
}
await conn.sendWritingText(m.chat, teks, userdb, m)
let { generateWAMessageFromContent, prepareWAMessageMedia, proto } = (await import('@whiskeysockets/baileys')).default
const inviteMessage = `We regresa al grupo (${groupName}), si no, no se completa mi magia XD`
var messaa = await prepareWAMessageMedia({ image: jpegThumbnail }, { upload: conn.waUploadToServer })
var groupInvite = generateWAMessageFromContent(m.chat, proto.Message.create({ groupInviteMessage: { groupJid: m.chat,inviteCode: invite_code, inviteExpiration: invite_code_exp, groupName: groupName, caption: inviteMessage, jpegThumbnail: messaa }}), { userJid: jid })

return conn.relayMessage(jid, groupInvite.message, { messageId: groupInvite.key.id })
}
chatdb.welcome = true
return conn.sendWritingText(m.chat, `tadaaaa`, userdb, m)
} else {
return conn.sendWritingText(m.chat, `*[❗] NO PUEDO JUGAR A ESTE JUEGO, NO SOY ADMIN EN ESTE GRUPO*`, m)
}
}
}
handler.command = ['ruleta'];
handler.group = true
handler.owner = true
handler.admin = true
handler.help = [];
handler.tags = [];
handler.menu = [
{title: "🎖️ RUSSIAN ROULETTE", description: "usa #ruleta para sacar a un o unos incautos de un grupo", id: `ruleta`},
];
handler.type = "fun";
handler.disabled = false;

export default handler;
