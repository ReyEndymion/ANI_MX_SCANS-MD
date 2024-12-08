const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = (await import('@whiskeysockets/baileys')).default
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
import fetch from 'node-fetch'
import fs from 'fs'
import path, {join} from 'path';

let handler = async (m, { conn, args, participants, text, jid }) => {
let resp = `procesando solicitud.`;
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 15));
txt += c;
count++;

if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing', m.chat);
}
}
let q = conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 });

let _participants = participants.map(user => user.id)
let users = (await Promise.all(text.split(',').map(v => v.replace(/[^0-9]/g, '')).filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net')).map(async v => [v, await conn.onWhatsApp(v + '@s.whatsapp.net')]))).filter(v => v[1][0]?.exists).map(v => v[0] + '@s.whatsapp.net')
const invited = users.map(jid => ({tag: 'participant', attrs: { jid }}))

for (const user of invited) {
const jid = user.attrs.jid
let name = (await conn.groupMetadata(m.chat)).subject
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat)
const invite_code_exp = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
try {
var pp = await conn.profilePictureUrl(m.chat, 'image')
var img = await (await fetch(pp)).buffer()
} catch {
var img = fs.readFileSync(path.join(media, 'pictures/avatar_contact.png'))
}
const inviteMessage = `🌎 Que tal @${jid.split('@')[0]}, soy el Bot ${wm} que esta en este grupo, me han pedido que te envié está invitación porque no te pude añadir, esperemos que aceptes... Bienvenido al grupo 🌏🤝🏼`
let txt = '';
let count = 0;
for (const c of inviteMessage) {
await new Promise(resolve => setTimeout(resolve, 15));
txt += c;
count++;
if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing', jid);
}
}
let prep = generateWAMessageFromContent(m.chat, {extendedTextMessage: { text: txt.trim(), contextInfo: {mentionedJid: conn.parseMention(txt), externalAdReply: { body: false, containsAutoReply: true, mediaType: 1, mediaUrl: link, renderLargerThumbnail: true, showAdAttribution: false, sourceId: name, sourceUrl: link, thumbnail: img, thumbnailUrl: img, title: name}}}}, { userJid: conn.user.jid, quoted: m }) 
let isBlocked 
await conn.fetchBlocklist().then(async data => {
for (let i of data) {
 if (i === jid) {
isBlocked = true
 } else {
isBlocked = false
 }
break
}
})
console.log('invitar: ', jid)
if (isBlocked) {
await conn.updateBlockStatus(jid, 'unblock')
let resp = `Listo @${m.sender.split('@')[0]} Se ha enviado la invitación a @${jid.split('@')[0]} pero se tuvieron que desbloquear algunos usuarios seleccionados.`;
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 15));
txt += c;
count++;

if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing', m.chat);
}
}
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 });
} else {
let devol = `Listo @${m.sender.split('@')[0]} Se ha enviado la invitación a @${jid.split('@')[0]} los usuarios seleccionados.`
let txt = '';
let count = 0;
for (const c of devol) {
await new Promise(resolve => setTimeout(resolve, 15));
txt += c;
count++;
if (count % 10 === 0) {
 await conn.sendPresenceUpdate('composing', m.chat);
 }
 }
await conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id});
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 });
}

}
}


handler.help = ['invite', 'invitar'].map(v => v + ' número')
handler.tags = ['group']
handler.command = /^(invite|invitar)$/i
handler.admin = handler.group = handler.botAdmin = true
export default handler



