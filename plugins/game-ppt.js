const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
let pptUsage = {}
let handler = async (m, { conn, text, command, usedPrefix, args }) => {
      // Check if user is banned
  if (pptUsage[m.sender] && pptUsage[m.sender].bannedUntil > Date.now()) {
    let timeLeft = Math.ceil((pptUsage[m.sender].bannedUntil - Date.now()) / 1000 / 60)
    throw `Lo siento, estás baneado del uso de este comando durante ${timeLeft} minutos.`
  }

  // Increment usage count for user
  if (!pptUsage[m.sender]) {
    pptUsage[m.sender] = { count: 0 }
  }
  pptUsage[m.sender].count++

  // Check if user has exceeded usage limit
  if (pptUsage[m.sender].count > 10) {
    // Ban user for 20 minutes
    pptUsage[m.sender].bannedUntil = Date.now() + 20 * 60 * 1000
    let resp = `Has sido baneado del uso de este comando durante 20 minutos.`
    let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;
    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
  }
let pp = 'https://www.bighero6challenge.com/images/thumbs/Piedra,-papel-o-tijera-0003318_1584.jpeg'
let resp = `*_PIEDRA, PAPEL O TIJERA_*\n\n _Puedes usar los *comandos* para jugar o también puedes usar estos comandos_:\n.ppt *_piedra_*\n.ppt *_papel_*\n.ppt *_tijera_*\n\n*Use en minúsculas*\n\n['*_Piedra_* 🪨', ${usedPrefix + command} piedra],
['*_Papel_* 📄', ${usedPrefix + command} papel],
['*_Tijera_* ✂️', ${usedPrefix + command} tijera]`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;
    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
if (!args[0]) throw conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}, null, null, null, null, [])
var astro = Math.random()
if (astro < 0.34) {
astro = 'piedra' 
} else if (astro > 0.34 && astro < 0.67) {
astro = 'tijera' 
} else {
astro = 'papel'
}
if (text == astro) {
global.db.data.users[m.sender].exp += 500
let resp = `🔰 Empate!\n\n*👉🏻 Tu: ${text}\n👉🏻 El Bot: ${astro}\n🎁 Premio +500 XP*`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;
    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
} else if (text == 'papel') {
if (astro == 'piedra') {
global.db.data.users[m.sender].exp += 1000
let resp = `🥳 Tú ganas! 🎉\n\n*👉🏻 Tu: ${text}\n👉🏻 El Bot: ${astro}\n🎁 Premio +1000 XP*`
       let txt = '';
       let count = 0;
       for (const c of resp) {
           await new Promise(resolve => setTimeout(resolve, 15));
           txt += c;
           count++;
           if (count % 10 === 0) {
               conn.sendPresenceUpdate('composing' , m.chat);
           }
       }
           await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
} else {
global.db.data.users[m.sender].exp -= 300
let resp = `☠️ Tú pierdes! ❌\n\n*👉🏻 Tu: ${text}\n👉🏻 El Bot: ${astro}\n❌ Premio -300 XP*`
       let txt = '';
       let count = 0;
       for (const c of resp) {
           await new Promise(resolve => setTimeout(resolve, 15));
           txt += c;
           count++;
           if (count % 10 === 0) {
               conn.sendPresenceUpdate('composing' , m.chat);
           }
       }
           await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
} else if (text == 'tijera') {
if (astro == 'papel') {
global.db.data.users[m.sender].exp += 1000
let resp = `🥳 Tú ganas! 🎉\n\n*👉🏻 Tu: ${text}\n👉🏻 El Bot: ${astro}\n🎁 Premio +1000 XP*`
       let txt = '';
       let count = 0;
       for (const c of resp) {
           await new Promise(resolve => setTimeout(resolve, 15));
           txt += c;
           count++;
           if (count % 10 === 0) {
               conn.sendPresenceUpdate('composing' , m.chat);
           }
       }
           await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
} else {
global.db.data.users[m.sender].exp -= 300
let resp = `☠️ Tú pierdes! ❌\n\n*👉🏻 Tu: ${text}\n👉🏻 El Bot: ${astro}\n❌ Premio -300 XP*`
       let txt = '';
       let count = 0;
       for (const c of resp) {
           await new Promise(resolve => setTimeout(resolve, 15));
           txt += c;
           count++;
           if (count % 10 === 0) {
               conn.sendPresenceUpdate('composing' , m.chat);
           }
       }
           await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
} else if (text == 'tijera') {
if (astro == 'papel') {
global.db.data.users[m.sender].exp += 1000
let resp = `🥳 Tú ganas! 🎉\n\n*👉🏻 Tu: ${text}\n👉🏻 El Bot: ${astro}\n🎁 Premio +1000 XP*`
       let txt = '';
       let count = 0;
       for (const c of resp) {
           await new Promise(resolve => setTimeout(resolve, 15));
           txt += c;
           count++;
           if (count % 10 === 0) {
               conn.sendPresenceUpdate('composing' , m.chat);
           }
       }
           await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
} else {
global.db.data.users[m.sender].exp -= 300
let resp = `☠️ Tú pierdes! ❌\n\n*👉🏻 Tu: ${text}\n👉🏻 El Bot: ${astro}\n❌ Premio -300 XP*`
       let txt = '';
       let count = 0;
       for (const c of resp) {
           await new Promise(resolve => setTimeout(resolve, 15));
           txt += c;
           count++;
           if (count % 10 === 0) {
               conn.sendPresenceUpdate('composing' , m.chat);
           }
       }
           await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
} else if (text == 'papel') {
if (astro == 'piedra') {
global.db.data.users[m.sender].exp += 1000
let resp = `🥳 Tú ganas! 🎉\n\n*👉🏻 Tu: ${text}\n👉🏻 El Bot: ${astro}\n🎁 Premio +1000 XP*`
       let txt = '';
       let count = 0;
       for (const c of resp) {
           await new Promise(resolve => setTimeout(resolve, 15));
           txt += c;
           count++;
           if (count % 10 === 0) {
               conn.sendPresenceUpdate('composing' , m.chat);
           }
       }
           await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
} else {
global.db.data.users[m.sender].exp -= 300
let resp = `☠️ Tú pierdes! ❌\n\n*👉🏻 Tu: ${text}\n👉🏻 El Bot: ${astro}\n❌ Premio -300 XP*`
       let txt = '';
       let count = 0;
       for (const c of resp) {
           await new Promise(resolve => setTimeout(resolve, 15));
           txt += c;
           count++;
           if (count % 10 === 0) {
               conn.sendPresenceUpdate('composing' , m.chat);
           }
       }
           await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
} else if (text == 'piedra') {
if (astro == 'tijera') {
global.db.data.users[m.sender].exp += 1000
let resp = `🥳 Tú ganas! 🎉\n\n*👉🏻 Tu: ${text}\n👉🏻 El Bot: ${astro}\n🎁 Premio +1000 XP*`
       let txt = '';
       let count = 0;
       for (const c of resp) {
           await new Promise(resolve => setTimeout(resolve, 15));
           txt += c;
           count++;
           if (count % 10 === 0) {
               conn.sendPresenceUpdate('composing' , m.chat);
           }
       }
           await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
} else {
global.db.data.users[m.sender].exp -= 300
let resp = `☠️ Tú pierdes! ❌\n\n*👉🏻 Tu: ${text}\n👉🏻 El Bot: ${astro}\n❌ Premio -300 XP*`
       let txt = '';
       let count = 0;
       for (const c of resp) {
           await new Promise(resolve => setTimeout(resolve, 15));
           txt += c;
           count++;
           if (count % 10 === 0) {
               conn.sendPresenceUpdate('composing' , m.chat);
           }
       }
           await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
}}
handler.help = ['ppt']
handler.tags = ['games']
handler.command = /^(ppt)$/i
export default handler
