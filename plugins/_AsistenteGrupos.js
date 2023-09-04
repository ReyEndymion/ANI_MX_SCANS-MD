let handler = m => m
handler.before = async (m, { conn, text, participants }) => {
const chat = global.db.data.chats[m.chat]//.asistente = true  || {}
const match = text//Object.entries(text).find(([text]) => regex.test(m.text))
//let int = new RegExp(m.text)
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
//let espadm = espadmins.filter(entry => typeof entry[0] === 'string' && !isNaN(entry[0])).map(entry => ({ jid: entry[0] }));
     let ow = global.owner.filter(entry => typeof entry[0] === 'string' && !isNaN(entry[0])).map(entry => ({ jid: entry[0] })).slice(0).map(({jid}) => `${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]}`).join` y `
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')

//if(chat.asistente && !chat.isBanned){
if (!chat.isBanned && chat.asistente && m.text.match(/buen día|buen dia|hola|Buenos días|qué tal|𝐇𝐨𝐥𝐚$/gi)) {
    let resp = 	`Hola @${who.split("@s.whatsapp.net")[0]} en un momento te respondemos...
    por el momento te dejaré las preguntas básicas....
    ¿Todo bien todo correcto?`
let int = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    int += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
      await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )



    }
if (!chat.isBanned && chat.asistente && m.text.match(/^Quién eres?$/gi)) {
	let resp = `K.I.R.R. la inteligencia artificial programada por ${ow}`
  let int = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    int += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
      await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )



} 

if (!chat.isBanned && chat.asistente && m.text.match(/eres un bot$/i)) {
  let resp = `	@${who.split("@s.whatsapp.net")[0]}, yo soy el asistente virtual de este grupo`
        let int = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    int += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
      await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )



  }     
if (!chat.isBanned && chat.asistente && m.text.match(/Lenin|creador$/gi)) {
    let resp = `${ow}...\nGracias por comunicarte con ${igfg}. ¿Cómo podemos ayudarte?\n\nPresenté.... (Pero sólo en espíritu) lo siento no puedo responder en este momento`
let int = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    int += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
      await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )



    }     
if (!chat.isBanned && chat.asistente && m.text.match(/Quién es Rey Endymion$/gi)) {
  let resp = `${yos.slice(0).map(({jid}) => `${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]}`).join` y `} el admin superior de este grupo\n☝️😌\n\n@${who.split("@s.whatsapp.net")[0]} te recomiendo que lo invoques para más dudas que tengas`
       let int = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    int += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
      await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )



 }     
if (!chat.isBanned && chat.asistente && m.text.match(/^cómo te llamas?$/gi)) {
  let resp = `K.I.R.R. (Knight Intelligence Revolutionary for Respond)`
      await conn.sendPresenceUpdate('composing' , m.chat);

      let int = '';
    for (const c of resp) {
        await new Promise(resolve => setTimeout(resolve, 100));
        int += c;
    }

      await conn.sendPresenceUpdate('composing' , m.chat);
      await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )



} 

if (!chat.isBanned && chat.asistente && m.text.match(/K.I.R.R.|kirr|^kirr$/g)) {
  let resp = `Mandé @${who.split("@s.whatsapp.net")[0]}?`
        let int = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    int += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
      await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )


      handler.customPrefix = / /g
      handler.command = new RegExp
  }     
if (!chat.isBanned && chat.asistente && m.text.match(/^cómo estás|^cómo estás?|^como estas$/gi)) {
  let resp = `Todo bien, y tú @${who.split("@s.whatsapp.net")[0]}?... 
Por cierto soy un asistente virtual en este grupo, para más detalles invoca a un administrador diferente`
      let int = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    int += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
      await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )



} 

if (!chat.isBanned && chat.asistente && m.text.match(/admin$/gi)) {
  let resp = `@${who.split("@s.whatsapp.net")[0]} habla con otro admin, yo solo soy un bot\n Aqui algunos\n\n${listAdmin}`
      let int = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    int += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
      await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )

 
}     
if (!chat.isBanned && chat.asistente && m.text.match(/Otakus Together$/gi)) {
  let resp = `ㄖㄒ卂Ҡ凵丂   ㄒㄖᎶ乇ㄒ卄乇尺`
      let int = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    int += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
      await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )



} 

if (!chat.isBanned && chat.asistente && m.text.match(/Otakus TogetherS$/gi)) {
  let resp = `🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂  ㄒㄖᎶ乇ㄒ卄乇尺🍜⃢⃟ᭀᬽ`
      let int = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    int += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
      await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )



} 

if (!chat.isBanned && chat.asistente && m.text.match(/^otakus forever$/gi)) {
  let resp = `🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂  千ㄖ尺乇ᐯ乇尺🍜⃢⃟ᭀᬽ`
      let int = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    int += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
      await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )



} 

if (!chat.isBanned && chat.asistente && m.text.match(/^otakus always$/gi)) {
  let resp = `🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂 卂ㄥ山卂ㄚ丂🍜⃢⃟ᭀᬽ`
      let int = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    int += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
      await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )



}
if (!chat.isBanned && chat.asistente && m.text.match(/nombre del grupo de sailor moon$/gi)) {
  let resp = `❤️𝓕𝓪𝓷 𝓭𝓮 𝓢𝓪𝓲𝓵𝓸𝓻 𝓜𝓸𝓸𝓷🌙💖`
      let int = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    int += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
      await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )



} 

if (!chat.isBanned && chat.asistente && m.text.match(/muestra el grupo de aportes$/gi)) {
  let resp = `Se les invita al grupo de aportes de
🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂  
ㄒㄖᎶ乇ㄒ卄乇尺🍜⃢⃟ᭀᬽ 
**Para estar en ese grupo de aportes no es necesario tener aportes sin embargo es un grupo 0 chat por lo que por respeto a los aportadores oficiales está en modo administrador**

Quien quiera pertenecer a ese grupo y tenga aportes me dice para prestarle admin porque no se puede chatear en aquel grupo por respeto a los aportadores oficiales

https://chat.whatsapp.com/DhvxhmZ4lMkLppU0obHWp4

Se puede aportar hasta el momento cualquier tipo de contenido incluyendo películas que no tengan relación con anime...

O música y manga

Cómo requisito para permanecer en ese grupo tienen que estar en este grupo...

*Quién se salga de este grupo por automático será expulsado del grupo de aportes*`
let int = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    int += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
      await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )



} 

if (!chat.isBanned && chat.asistente && m.text.match(/grupo de aportes forever$/gi)) {
  let resp = `Este es el grupo de aportes de
🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂  千ㄖ尺乇ᐯ乇尺🍜⃢⃟ᭀᬽ

https://chat.whatsapp.com/DhvxhmZ4lMkLppU0obHWp4

⚡Este grupo es *No Chat*⚡

*Permitido*✅

✅ AMV
✅MÚSICA
✅LIBROS (PDF)
✅ANIME
✅ PELÍCULAS
✅ IMÁGENES O EDITS
 ⚜️Hay Grupo solo para Hentai⚜️

⚠️Si te sales del grupo principal, te eliminaremos de aquí⚠️`
let int = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    int += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
      await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )



}
if (!chat.isBanned && chat.asistente && m.text.match(/^haz la presentación de este calabozo de muertos|^calabozo de los muertos$/gi)) {
  let resp = `En este grupo para los que se han agregado deberán de hacer *30 MENSAJES* los cuáles pueden ser spam de stickers o spam de texto

Se prohíbe completamente los link de invitación de otros grupos ya que serán eliminados automáticamente sin derecho a regresar o a ser ingresados al grupo principal

Para el resto es necesario que completen la cuota antes del jueves de cada semana para evitar ser eliminados si su contador es completamente cero (0)

No serán eliminados sí por lo menos tienen un solo mensaje en toda la semana ya que eso da señales de vida en sus respectivos números`
      let int = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    int += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
      await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )



}
if (!chat.isBanned && chat.asistente && m.text.match(/contador 0$/gi)) {
  let resp = `se mandan por inactivos al grupo muertos para reciclar 👺👎🏼`
      let int = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    int += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
      await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )



} 

if (!chat.isBanned && chat.asistente && m.text.match(/Reglas de otakus forever anti$/gi)) {
  let resp = `Bienvenidos a 
*ㄖㄒ卂Ҡ凵丂  千ㄖ尺乇ᐯ乇尺*
*(Antibinarios)*

*Reglas del grupo*
*[1]Pasar links de grupos esta prohibido*

*[2]Queda estrictamente prohibido el Porno y el Ecchi, Hentai, para este último tenemos grupos dedicados*

*[3]Está prohibido agregar administradores sin previo aviso, info para misiones* 
         
*[4]Tienen prohibido faltar al respeto a menos de que se estén llevando*

*[5]El spam de stickers y de texto esta permitido*

*La Nueva generación forever*

https://facebook.com/groups/849679409107132`
      let int = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    int += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
      await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )



} 

if (!chat.isBanned && chat.asistente && m.text.match(/enlace de invitación|link|enlace del grupo$/gi)) {
  let resp = `Solo tienes dos opciones para llegar al grupo principal @${who.split("@s.whatsapp.net")[0]}

ℂ𝕒𝕗𝕖𝕔𝕚𝕥𝕠 ℍ𝕠𝕣𝕚-𝕊𝕒𝕟𝕕𝕚𝕒🍉☕🥢
https://chat.whatsapp.com/H0SheP7ippc1dF9uxL04Gt

o

しᝪᗷᗷᎩ de 
ㄖㄒ卂Ҡ凵丂   ㄒㄖᎶ乇ㄒ卄乇尺
https://chat.whatsapp.com/L4VRAzaYc11D4LSpt8rB9W

Ahí se les realizará una entrevista dónde tendrán que responder las siguientes preguntas

*ɴᴏᴍʙʀᴇ*:


 *ᴇᴅᴀᴅ*:


 *ᴘᴀÍꜱ* :


 *ᴡᴀɪꜰᴜ ᴏ ʜᴜsʙᴀɴᴅᴏ*:


 *ᴀɴɪᴍᴇ ꜰᴀᴠᴏʀɪᴛᴏ*: 


  *ᴍᴀɴɢᴀ ꜰᴀᴠᴏʀɪᴛᴏ* :


 *ᴅᴇꜱᴅᴇ ʜᴀᴄᴇ ᴄᴜÁɴᴛᴏ ᴇʀᴇꜱ ᴏᴛᴀᴋᴜ*:


 *ꜰᴏᴛᴏ o ᴍᴇɴsᴀᴊᴇ ᴅᴇ ᴠᴏᴢ*:


**TODOS ESTOS DATOS PUEDEN SER EN PRIVADO SI QUIEREN CON ALGUNO DE LOS ADMINS ACTIVOS**`
      let int = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    int += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
      await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )



}
if (!chat.isBanned && chat.asistente && m.text.match(/porno|xxx|Hentai$/i)) {
  let resp = `@${who.split("@s.whatsapp.net")[0]} en este chat no pasamos ese contenido...

Busca otro tipo de chats o habla con otros administradores a ver qué te sugiere`
      let int = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    int += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
      await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )



}
 }   
/*if (!chat.isBanned && chat.asistente && m.text.match(/^.jadibot|^*jadibot|^#jadibot|^/jadibot|^serbot$/gi)) {
  let resp = `👺 @${who.split("@s.whatsapp.net")[0]}
el bot de otakus Together es esclusivo del grupo homónimo

No sé puede volver a iniciar sesión con QR`
      let int = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    int += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
      await conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )



}
if (!chat.isBanned && chat.asistente && m.text.match(/^s|^sticker$/gi)) {
  let resp = `👺
te saco Este pero tienes que configurar el chat con los mensajes temporales para que se borren cada 24 horas`
  conn.sendMessage(m.chat, { text: resp}, { quoted: m })
} */     
//}
//handler.customPrefix = / /
//handler.command = new RegExp
export default handler

