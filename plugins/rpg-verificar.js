import { createHash } from 'crypto'
//import { max } from 'lodash'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) throw `*[❗INFO❗] HEY! YA ESTÁS REGISTRADO*\n\n*QUIERES QUITAR TU REGISTRO? USA EL COMANDO ${usedPrefix}unreg <numero de serie>*\n\n*SI NO RECUERDAS TU NÚMERO DE SERIE PUEDES USAR EL COMANDO ${usedPrefix}myns*`
  if (!Reg.test(text)) {
    let resp = `*[❗INFO❗] FORMATO INCORRECTO*\n\n*—◉ USO DEL COMANDO: ${usedPrefix + command} nombre.edad*\n*—◉ Ejemplo: ${usedPrefix + command} Minombre.18*`
    let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    return await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
  }
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) {
    let resp = '*[❗INFO❗] DEBES PONER UN NOMBRE*'
    let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 10));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
  if (!age) throw '*[❗INFO❗] LA EDAD NO PUEDE ESTAR VACIA*'
  if (name.length >= 30) {
    let resp = '[❗INFO❗] EL NOMBRE ES DEMACIADO LARGO' 
    let txt = '';
    let count = 0;
    for (const c of resp) {
        await new Promise(resolve => setTimeout(resolve, 10));
        txt += c;
        count++;
    
        if (count % 10 === 0) {
            conn.sendPresenceUpdate('composing' , m.chat);
        }
    }
        await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
  }
  if (name.length <= 1) {
    let resp = '[❗INFO❗] EL NOMBRE ES DEMACIADO CORTO'
  let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 10));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
} 
  age = parseInt(age)
  if (age > 100) {
    let resp = '*[❗] Kheee, como sigues vivo con esa edad? 👴🏻*'
  let txt = '';
  let count = 0;
  for (const c of resp) {
      await new Promise(resolve => setTimeout(resolve, 10));
      txt += c;
      count++;
  
      if (count % 10 === 0) {
          conn.sendPresenceUpdate('composing' , m.chat);
      }
  }
      await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
  if (age < 5) {
    let resp = '*[❗] Kheee, un bebé que sabe usar WhatsApp? 😲*'
    let txt = '';
    let count = 0;
    for (const c of resp) {
        await new Promise(resolve => setTimeout(resolve, 10));
        txt += c;
        count++;
    
        if (count % 10 === 0) {
            conn.sendPresenceUpdate('composing' , m.chat);
        }
    }
        await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
      }
user.name = name.trim()
user.age = age
user.regTime = + new Date
user.registered = true
let sn = createHash('md5').update(m.sender).digest('hex')
let caption = `┏┅ ━━━━━━━━━━━━ ┅ ━
┇「 INFORMACIÓN 」
┣┅ ━━━━━━━━━━━━ ┅ ━
┃ *NOMBRE:* ${name}
┃ *EDAD:* ${age} años
┃ *NÚMERO DE SERIE:* 
┃ ${sn}
┗┅ ━━━━━━━━━━━━ ┅ ━`
let resp = `¡TU NÚMERO DE SERIE TE SERVIRÁ TÚ POR SI DESEAS BORRAR TU REGISTRO DEL BOT!\n${author}\n\n[['¡¡AHORA TE HE REGISTRADO!!' usa:  '${usedPrefix}profile']]` 
let txt = '';
let count = 0;
for (const c of caption + '\n\n' + resp) {
    await new Promise(resolve => setTimeout(resolve, 10));
    txt += c;
    count++;
    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
global.db.data.users[m.sender].money += 10000
global.db.data.users[m.sender].exp += 10000
}
handler.help = ['verificar']
handler.tags = ['xp']
handler.command = /^(verify|register|verificar|reg|registrar)$/i
export default handler
