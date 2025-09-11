import { prems } from "../config.js"
let handler = async (m, {conn, text, usedPrefix, command, groupsdb, usersdb, userdb, senderJid, objs}) => {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : senderJid
else who = m.chat
console.log('rolDb: ', senderJid)
if (/^((añadir|add|dar|\+)prem)$/i.test(command)) {
if (!who) {
let resp = `*[❗INFO❗] INGRESA EL @tag DE LA PERSONA QUE DESEA AGREGAR A LOS USUARIOS PREMIUM*`
return conn.sendWritingText(m.chat, resp, userdb, m);
}
if (usersdb[who]?.premium) {
let resp = '*[❗INFO❗] EL USUARIO REGISTRADO YA ES USUARIO PREMIUM*'
return conn.sendWritingText(m.chat, resp, userdb, m);
} else
prems.push(`${who.split`@`[0]}`)
usersdb[who].premium = true
usersdb[who].premiumTime = Date.now()
let textprem = `*[❗INFO❗] @${who.split`@`[0]} AHORA YA ES UN USUARIO PREMIUM, NO TENDRÁ LÍMITES AL USAR EL BOT*`
return conn.sendWritingText(m.chat, textprem, userdb, m);
}
if (/^((añadir|add|dar)(d|diamantes))$/i.test(command)) {
if (!who) {
let resp ='*[❗INFO❗] ETIQUETA A UN USUARIO CON EL @tag*'
return conn.sendWritingText(m.chat, resp, userdb, m);
}
let txto = text.replace('@' + who.split`@`[0], '').trim()
if (!txto) {
let resp = '*[❗INFO❗] INGRESA LA CANTIDAD DE DIAMANTES QUE DESEA AÑADIR*'
return conn.sendWritingText(m.chat, resp, userdb, m);
}
if (isNaN(txto)) {
let resp = '*[❗INFO❗] SIMBOLO NO ADMITIDO, SOLO NUMEROS!*'
return conn.sendWritingText(m.chat, resp, userdb, m);
}
let dmt = parseInt(txto)
let limit = dmt
let pjk = Math.ceil(dmt * pajak)
limit += pjk
if (limit < 1) {
let resp = '*[❗INFO❗] EL NUMERO MINIMO DE DIAMANTES PARA AÑADIR ES 𝟷*'
return conn.sendWritingText(m.chat, resp, userdb, m);
}
usersdb[who].limit += dmt
let resp = `≡ *💎 AÑADIDO*
┌──────────────
▢ *Total:* ${dmt}
└──────────────`
await conn.sendWritingText(m.chat, resp, userdb, m);
}
if (/^((añadir|add|dar|\+)xp)$/i.test(command)) {
if (!who) {
resp = '*[❗INFO❗] ETIQUETA A UN USUARIO CON EL @tag*'
}
let txto = text.replace('@' + who.split`@`[0], '').trim()
if (!txto) {
resp = '*[❗INFO❗] INGRESA LA CANTIDAD DE EXPERIENCIA (XP) QUE DESEA AÑADIR*'
}
if (isNaN(txto)) {
resp = '*[❗INFO❗] SIMBOLO NO ADMITIDO, SOLO NUMEROS!*'
} else {
let xp = parseInt(txto)
let exp = xp
let pjk = Math.ceil(xp * pajak)
exp += pjk
if (exp < 1) {
resp = '*[❗INFO❗] EL NUMERO MINIMO DE EXPERIENCIA (XP) PARA AÑADIR ES 𝟷*'
}
usersdb[who].exp += xp
resp = `≡ *XP AÑADIDO*
┌──────────────
▢*Total* ${xp}
└──────────────`
}
return conn.sendWritingText(m.chat, resp, userdb, m);
}
if ( /^(listprem|premlist)$/i.test(command)) {
let prem = prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)
let textprem = `*「 USUARIOS PREMIUM 」*
` + prem.map(v => '- @' + v.replace(/@.+/, '')).join`\n`
m.reply(textprem, null, {mentions: conn.parseMention(textprem)})
}
}
handler.help = ['addprem <@user>']
handler.tags = ['owner']
handler.command = /^((añadir|add|dar|\+|list)(d|diamantes|prem|xp))$/i
handler.group = true
handler.rowner = true
handler.menu = [
{title: "👑 AÑADIR PREMIUM", description: "Has a un usuario premium usando #addprem <@tag> ", id: `addprem`},
{title: "💎 AÑADIR DIAMANTES", description: "Añade diamantes a un usuario\nEjemplo: #añadirdiamantes @tag <cantidad>", id: `añadirdiamantes`},
{title: "💎 AÑADIR XP", description: "Añade experiencia (XP) a un usuario\nEjemplo: #añadirxp @tag <cantidad>", id: `añadirxp`},
{title: "👑 LISTAPREM", description: "Lista de usuarios premium", id: `listprem`}
];
handler.type = "owners";
handler.disabled = false;

export default handler
