let handler = m => m
handler.before = async function (m, {conn}) {
conn.suit = conn.suit ? conn.suit : {}
if (db.data.users[m.sender].suit < 0) db.data.users[m.sender].suit = 0
let room = Object.values(conn.suit).find(room => room.id && room.status && [room.p, room.p2].includes(m.sender))
if (room) {
let win = ''
let tie = false
if (m.sender == room.p2 && /^(acc(ept)?|terima|aceptar|gas|aceptare?|nao|gamau|rechazar|ga(k.)?bisa)/i.test(m.text) && m.isGroup && room.status == 'wait') {
if (/^(tolak|gamau|rechazar|ga(k.)?bisa)/i.test(m.text)) {
let textno = `*[❗] @${room.p2.split`@`[0]} RECHAZO EL PVP, EL JUEGO SE CANCELA*`
m.reply(textno, null, {mentions: conn.parseMention(textno)})
delete conn.suit[room.id]
return !0 }
room.status = 'play'
room.asal = m.chat
clearTimeout(room.waktu)
let textplay = `🎮 *JUEGO - PVP* 🎮\n\n(PIEDRA PAPEL O TIJERAS)\n\n—◉ EL JUEGO COMIENZA, LAS OPCIONES HAN SIDO ENVIADAS A LOS CHATS PRIVADOS DE @${room.p.split`@`[0]} Y @${room.p2.split`@`[0]}\n\n◉ SELECCIONEN UNA OPCIÓN EN SUS CHATS PRIVADOS, RESPECTIVAMENTE\n*◉ ELEGIR UNA OPCIÓN EN wa.me/${conn.user.jid.replace(userID, '')}*`
let txt = '';
let count = 0;
for (const c of textplay) {
    await new Promise(resolve => setTimeout(resolve, 10));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
//m.reply(textplay, m.chat, {mentions: conn.parseMention(textplay)})
let imgplay = `https://www.merca2.es/wp-content/uploads/2020/05/Piedra-papel-o-tijera-0003318_1584-825x259.jpeg`    
let resp = `'POR FAVOR ESCRIBA UNA DE LAS SIGUIENTES OPCIONES'\n\n*['🗿' 'PIEDRA o Piedra']*\n\n*['📄' 'PAPEL o Papel']*\n\n*['✂️' 'TIJERA o Tijera']*\n\nGANADOR +${room.poin}𝚇𝙿\n PERDEDOR ${room.poin_lose}𝚇𝙿`
if (!room.pilih)
await conn.updateBlockStatus(room.p, 'unblock')
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 10));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , room.p);
    }
}
   await conn.sendMessage(room.p, {image: {url: imgplay}, caption: resp.trim(), mentions: conn.parseMention(textplay) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )

if (!room.pilih2) 
await conn.updateBlockStatus(room.p2, 'unblock')
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 10));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , room.p2);
    }
}
    await conn.sendMessage(room.p2, {image: {url: imgplay}, caption: resp.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );  
                             
room.waktu_milih = setTimeout(() => {
if (!room.pilih && !room.pilih2) 
conn.sendMessage(m.chat, { text: `[❗] NINGÚN JUGADOR TOMÓ LA INICIATIVA DE EMPEZAR EL JUEGO, EL PVP SE HA CANCELADO`}, wm, null, [['MENÚ PRINCIPAL', '#menu']], m)
else if (!room.pilih || !room.pilih2) {
win = !room.pilih ? room.p2 : room.p 
let textnull = `*[❗] @${(room.pilih ? room.p2 : room.p).split`@`[0]} NO ELEGISTE NINGUNA OPCIÓN, FIN DEL PVP*`
let txt = '';
let count = 0;
for (const c of textnull) {
     new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
     conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
//conn.sendMessage(m.chat, { text: textnull}, wm, null, [['MENÚ PRINCIPAL', '#menu']], m, { mentions: conn.parseMention(textnull)})
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot
db.data.users[win == room.p ? room.p2 : room.p].exp -= room.poin_lose
}
delete conn.suit[room.id]
return !0
}, room.timeout)
}
let jwb = m.sender == room.p
let jwb2 = m.sender == room.p2
let g = /tijera/i
let b = /piedra/i
let k = /papel/i
let reg = /^(tijera|piedra|papel)/i
if (jwb && reg.test(m.text) && !room.pilih && !m.isGroup) {
room.pilih = reg.exec(m.text.toLowerCase())[0]
room.text = m.text
m.reply(`*[ ✔ ] HAS ELEGIDO ${m.text}, REGRESA AL GRUPO Y ${room.pilih2 ? `REVISA LOS RESULTADOS*` : 'ESPERA LOS RESULTADOS*'}\n\n_Para regresar al grupo mas rapido usa el citado de mi mensaje de seleccion de opciones_`)
if (!room.pilih2) conn.reply(room.p2, '*[❗] EL OPONENTE HA ELEGIDO, ES TU TURNO DE ELEGIR!!*', 0)}
if (jwb2 && reg.test(m.text) && !room.pilih2 && !m.isGroup) {
room.pilih2 = reg.exec(m.text.toLowerCase())[0]
room.text2 = m.text
m.reply(`*[ ✔ ] HAS ELEGIDO ${m.text}, REGRESA AL GRUPO Y ${room.pilih ? `REVISA LOS RESULTADOS*` : 'ESPERA LOS RESULTADOS*'}`)
if (!room.pilih) conn.reply(room.p, '*[❗] EL OPONENTE HA ELEGIDO, ES TU TURNO DE ELEGIR!!*', 0)}
let stage = room.pilih
let stage2 = room.pilih2
if (room.pilih && room.pilih2) {
clearTimeout(room.waktu_milih)
if (b.test(stage) && g.test(stage2)) win = room.p
else if (b.test(stage) && k.test(stage2)) win = room.p2
else if (g.test(stage) && k.test(stage2)) win = room.p
else if (g.test(stage) && b.test(stage2)) win = room.p2
else if (k.test(stage) && b.test(stage2)) win = room.p
else if (k.test(stage) && g.test(stage2)) win = room.p2
else if (stage == stage2) tie = true 
conn.reply(room.asal, `
*👑 RESULTADOS DEL PVP 👑*${tie ? '\n*—◉ EMPATE!!*' : ''}

*@${room.p.split`@`[0]} (${room.text}) ${tie ? '' : room.p == win ? ` GANÓ 🥳 +${room.poin}XP*` : ` PERDIÓ 🤡 ${room.poin_lose}XP*`}
*@${room.p2.split`@`[0]} (${room.text2}) ${tie ? '' : room.p2 == win ? ` GANÓ 🥳 +${room.poin}XP*` : ` PERDIÓ 🤡 ${room.poin_lose}XP*`}
`.trim(), m, { mentions: [room.p, room.p2] } )
if (!tie) {
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot
db.data.users[win == room.p ? room.p2 : room.p].exp += room.poin_lose
}
delete conn.suit[room.id]}}
return !0
}
handler.exp = 0
export default handler
function random(arr) {
return arr[Math.floor(Math.random() * arr.length)]}
