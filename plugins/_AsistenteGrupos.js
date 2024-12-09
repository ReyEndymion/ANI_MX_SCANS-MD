export async function before (m, { conn, text, participants }) {
if (m.chat.endsWith(newsletterID) || m.chat.endsWith(sBroadCastID)) return
m.chat === 'status@broadcast'
let bot = global.db.data.bot[conn.user.jid] || {}
let chats = bot.chats || {}
const privs = chats.privs || {}
const groups = chats.groups || {}
const chat = m.isGroup ? groups[m.chat] || {} : privs[m.chat] || {}
const users = m.isGroup ? chat.users || {} : privs || {}
const user = m.isGroup ? users[m.sender] || {} : privs[m.sender] || {}
const groupID = m.chat
const userID = m.sender
//console.log(`chats: `, chat)
//.asistente = true || {}
const match = text//Object.entries(text).find(([text]) => regex.test(m.text))
//let int = new RegExp(m.text)
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
//let espadm = espadmins.filter(entry => typeof entry[0] === 'string' && !isNaN(entry[0])).map(entry => ({ jid: entry[0] }));
let ow = global.owner.filter(entry => typeof entry[0] === 'string' && !isNaN(entry[0])).map(entry => ({ jid: entry[0] })).slice(0).map(({jid}) => `${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]}`).join` y `
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
let resp
if(chat.asistente && !chat.isBanned && !m.fromMe) {
if (m.text.match(/buen día|buen dia|hola|Buenos días|qué tal|𝐇𝐨𝐥𝐚$/gi && !m.fromMe)) {
resp = 	`Hola @${who.split("@s.whatsapp.net")[0]} en un momento te respondemos...
por el momento te dejaré las preguntas básicas....
¿Todo bien todo correcto?`
}
if (m.text.match(/^Quién eres?$/gi)) {
resp = `K.I.R.R. la inteligencia artificial programada por ${ow}`
} 

if (m.text.match(/eres un bot$/i)) {
resp = `@${who.split("@s.whatsapp.net")[0]}, yo soy el asistente virtual de este grupo`
} 
if (m.text.match(/Lenin|creador$/gi)) {
resp = `${ow}...\nGracias por comunicarte con ${igfg}. ¿Cómo podemos ayudarte?\n\nPresenté.... (Pero sólo en espíritu) lo siento no puedo responder en este momento`
} 
if (m.text.match(/Quién es Rey Endymion$/gi)) {
resp = `${yos.slice(0).map(({jid}) => `${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]}`).join` y `} el admin superior de este grupo\n☝️😌\n\n@${who.split("@s.whatsapp.net")[0]} te recomiendo que lo invoques para más dudas que tengas`
} 
if (m.text.match(/^cómo te llamas?$/gi)) {
resp = `K.I.R.R. (Knight Intelligence Revolutionary for Respond)`
} 

if (m.text.match(/K.I.R.R.|kirr|^kirr$/g)) {
resp = `Mandé @${who.split("@s.whatsapp.net")[0]}?`
} 
if (m.text.match(/^cómo estás|^cómo estás?|^como estas$/gi)) {
resp = `Todo bien, y tú @${who.split("@s.whatsapp.net")[0]}?... 
Por cierto soy un asistente virtual en este grupo, para más detalles invoca a un administrador diferente`
} 

if (m.text.match(/admin$/gi)) {
resp = `@${who.split("@s.whatsapp.net")[0]} habla con otro admin, yo solo soy un bot\n Aqui algunos\n\n${listAdmin}`
}

if (m.text.match(/Otakus Together$/gi)) {
resp = `ㄖㄒ卂Ҡ凵丂 ㄒㄖᎶ乇ㄒ卄乇尺`
} 

if (m.text.match(/Otakus TogetherS$/gi)) {
resp = `🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂ㄒㄖᎶ乇ㄒ卄乇尺🍜⃢⃟ᭀᬽ`
} 

if (m.text.match(/^otakus forever$/gi)) {
resp = `🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂千ㄖ尺乇ᐯ乇尺🍜⃢⃟ᭀᬽ`
} 

if (m.text.match(/^otakus always$/gi)) {
resp = `🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂 卂ㄥ山卂ㄚ丂🍜⃢⃟ᭀᬽ`
}
if (m.text.match(/nombre del grupo de sailor moon$/gi)) {
resp = `❤️𝓕𝓪𝓷 𝓭𝓮 𝓢𝓪𝓲𝓵𝓸𝓻 𝓜𝓸𝓸𝓷🌙💖`
} 

if (m.text.match(/muestra el grupo de aportes$/gi)) {
resp = `Se les invita al grupo de aportes de
🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂
ㄒㄖᎶ乇ㄒ卄乇尺🍜⃢⃟ᭀᬽ 
**Para estar en ese grupo de aportes no es necesario tener aportes sin embargo es un grupo 0 chat por lo que por respeto a los aportadores oficiales está en modo administrador**

Quien quiera pertenecer a ese grupo y tenga aportes me dice para prestarle admin porque no se puede chatear en aquel grupo por respeto a los aportadores oficiales

${gaportes}

Se puede aportar hasta el momento cualquier tipo de contenido incluyendo películas que no tengan relación con anime...

O música y manga

Cómo requisito para permanecer en ese grupo tienen que estar en este grupo...

*Quién se salga de este grupo por automático será expulsado del grupo de aportes*`
} 

if (m.text.match(/grupo de aportes forever$/gi)) {
resp = `Este es el grupo de aportes de
🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂千ㄖ尺乇ᐯ乇尺🍜⃢⃟ᭀᬽ

${gaportes}

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
}
if (m.text.match(/^haz la presentación de este calabozo de muertos|^calabozo de los muertos$/gi)) {
resp = `En este grupo para los que se han agregado deberán de hacer *30 MENSAJES* los cuáles pueden ser spam de stickers o spam de texto

Se prohíbe completamente los link de invitación de otros grupos ya que serán eliminados automáticamente sin derecho a regresar o a ser ingresados al grupo principal

Para el resto es necesario que completen la cuota antes del jueves de cada semana para evitar ser eliminados si su contador es completamente cero (0)

No serán eliminados sí por lo menos tienen un solo mensaje en toda la semana ya que eso da señales de vida en sus respectivos números`
}
if (m.text.match(/contador 0$/gi)) {
resp = `se mandan por inactivos al grupo muertos para reciclar 👺👎🏼`
} 

if (m.text.match(/Reglas de otakus forever anti$/gi)) {
resp = `Bienvenidos a 
*ㄖㄒ卂Ҡ凵丂千ㄖ尺乇ᐯ乇尺*
*(Antibinarios)*

*Reglas del grupo*
*[1]Pasar links de grupos esta prohibido*

*[2]Queda estrictamente prohibido el Porno y el Ecchi, Hentai, para este último tenemos grupos dedicados*

*[3]Está prohibido agregar administradores sin previo aviso, info para misiones* 
 
*[4]Tienen prohibido faltar al respeto a menos de que se estén llevando*

*[5]El spam de stickers y de texto esta permitido*

*La Nueva generación forever*

https://facebook.com/groups/849679409107132`
} 

if (m.text.match(/^(enlace de invitación|link|enlace del grupo)$/gi)) {
resp = `Solo tienes dos opciones para llegar al grupo principal @${who.split("@s.whatsapp.net")[0]}

Unirte a la comunidad:
${community}

o entrar al grupo de entrevistas:
${lobby}

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
}
if (m.text.match(/porno|xxx|Hentai$/i)) {
resp = `@${who.split("@s.whatsapp.net")[0]} en este chat no pasamos ese contenido...

Busca otro tipo de chats o habla con otros administradores a ver qué te sugiere`



}
let int = '';
let count = 0;
if ( resp === undefined) return
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 50));
int += c;
count++;

if (count % 10 === 0) {
await conn.sendPresenceUpdate('composing' , m.chat);
}
}
return conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
}
} 
/*if (m.text.match(/^.jadibot|^*jadibot|^#jadibot|^/jadibot|^serbot$/gi)) {
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

await conn.sendPresenceUpdate('composing' , m.chat);
}
}
return conn.sendMessage(m.chat, { text: resp.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )



}
if (m.text.match(/^s|^sticker$/gi)) {
let resp = `👺
te saco Este pero tienes que configurar el chat con los mensajes temporales para que se borren cada 24 horas`
conn.sendMessage(m.chat, { text: resp}, { quoted: m })
} */ 
//}
//handler.customPrefix = / /
//handler.command = new RegExp
