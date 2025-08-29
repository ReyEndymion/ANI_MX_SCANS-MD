export async function before (m, { conn, text, participants, chatdb , db, userdb, senderJid}) {
const { info, newsletterID, sBroadCastID, owner, anidir } = await import('../config.js')
if (!m.isGroup) return
if (m.chat.endsWith(newsletterID) || m.chat.endsWith(sBroadCastID)) return
const match = text
let ow = owner.filter(entry => typeof entry[0] === 'string' && !isNaN(entry[0])).map(entry => ({ jid: entry[0] })).slice(0).map(({jid}) => `${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]}`).join` y `
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
let resp = ''
if(chatdb.asistente && !chatdb.isBanned && !m.fromMe) {
if (/buen(os)? d(i|í)a(s)?|hola|qu(e|é) tal|𝐇𝐨𝐥𝐚$/gi.test(m.text.toLowerCase())) {
resp = 	`Hola @${senderJid.split('@')[0]} en un momento te respondemos...
por el momento te dejaré las preguntas básicas....
¿Todo bien todo correcto?`
}
if (/^Qui(e|é)n eres?$/gi.test(m.text.toLowerCase())) {
resp = `${anidir.replace(/_/g, ' ')} bot, programado por ${ow}`
} 

if (/eres un bot$/i.test(m.text.toLowerCase())) {
resp = `@${senderJid.split('@')[0]}, yo soy el asistente virtual de este grupo`
} 
if (/Lenin|creador$/gi.test(m.text.toLowerCase())) {
resp = `${ow}...\nGracias por comunicarte con ${info.npe}. ¿Cómo podemos ayudarte?\n\nPresenté.... (Pero sólo en espíritu) lo siento no puedo responder en este momento`
} 
if (/Qui(e|é)n es Rey Endymion$/gi.test(m.text.toLowerCase())) {
resp = `${ow} Es el creador de este bot\n☝️😌\n\n@${senderJid.split('@')[0]} te recomiendo que lo invoques para más dudas que tengas`
} 
if (/^c(o|ó)mo te llamas?$/gi.test(m.text.toLowerCase())) {
resp = `K.I.R.R. (Knight Intelligence Revolutionary for Respond)`
} 

if (/K.I.R.R.|kirr|^kirr$/g.test(m.text.toLowerCase())) {
resp = `Mandé @${senderJid.split('@')[0]}?`
} 
if (/^c(o|ó)mo est(a|á)(s)?$/gi.test(m.text.toLowerCase())) {
resp = `Todo bien, y tú @${senderJid.split('@')[0]}?... 
Por cierto soy un asistente virtual en este grupo, para más detalles invoca a un administrador diferente`
} 

if (/admin$/gi.test(m.text.toLowerCase())) {
resp = `@${senderJid.split('@')[0]} habla con otro admin, yo solo soy un bot\n Aqui algunos\n\n${listAdmin}`
}

if (/Otakus Together$/gi.test(m.text.toLowerCase())) {
resp = `ㄖㄒ卂Ҡ凵丂 ㄒㄖᎶ乇ㄒ卄乇尺`
} 

if (/Otakus TogetherS$/gi.test(m.text.toLowerCase())) {
resp = `🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂ㄒㄖᎶ乇ㄒ卄乇尺🍜⃢⃟ᭀᬽ`
} 

if (/^otakus forever$/gi.test(m.text.toLowerCase())) {
resp = `🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂千ㄖ尺乇ᐯ乇尺🍜⃢⃟ᭀᬽ`
} 

if (/^otakus always$/gi.test(m.text.toLowerCase())) {
resp = `🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂 卂ㄥ山卂ㄚ丂🍜⃢⃟ᭀᬽ`
}
if (/nombre del grupo de sailor moon$/gi.test(m.text.toLowerCase())) {
resp = `❤️𝓕𝓪𝓷 𝓭𝓮 𝓢𝓪𝓲𝓵𝓸𝓻 𝓜𝓸𝓸𝓷🌙💖`
} 

if (/muestra el grupo de aportes$/gi.test(m.text.toLowerCase())) {
resp = `Se les invita al grupo de aportes de
🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂
ㄒㄖᎶ乇ㄒ卄乇尺🍜⃢⃟ᭀᬽ 
**Para estar en ese grupo de aportes no es necesario tener aportes sin embargo es un grupo 0 chat por lo que por respeto a los aportadores oficiales está en modo administrador**

Quien quiera pertenecer a ese grupo y tenga aportes me dice para prestarle admin porque no se puede chatear en aquel grupo por respeto a los aportadores oficiales

${info.gaportes}

Se puede aportar hasta el momento cualquier tipo de contenido incluyendo películas que no tengan relación con anime...

O música y manga

Cómo requisito para permanecer en ese grupo tienen que estar en este grupo...

*Quién se salga de este grupo por automático será expulsado del grupo de aportes*`
} 

if (/grupo de aportes forever$/gi.test(m.text.toLowerCase())) {
resp = `Este es el grupo de aportes de
🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂千ㄖ尺乇ᐯ乇尺🍜⃢⃟ᭀᬽ

${info.gaportes}

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
if (/^(haz la presentación (del|de este))? calabozo de (los)? muertos$/gi.test(m.text.toLowerCase())) {
resp = `En este grupo para los que se han agregado deberán de hacer *30 MENSAJES* los cuáles pueden ser spam de stickers o spam de texto

Se prohíbe completamente los link de invitación de otros grupos ya que serán eliminados automáticamente sin derecho a regresar o a ser ingresados al grupo principal

Para el resto es necesario que completen la cuota antes del jueves de cada semana para evitar ser eliminados si su contador es completamente cero (0)

No serán eliminados sí por lo menos tienen un solo mensaje en toda la semana ya que eso da señales de vida en sus respectivos números`
}
if (/contador (0|cero)$/gi.test(m.text.toLowerCase())) {
resp = `se mandan por inactivos al grupo muertos para reciclar 👺👎🏼`
} 

if (/Reglas de otakus forever anti$/gi.test(m.text.toLowerCase())) {
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

if (/(enlace d(e invitaci(o|ó)n|el grupo)|link)$/gi.test(m.text.toLowerCase())) {
resp = `Solo tienes dos opciones para llegar al grupo principal @${senderJid.split('@')[0]}

Unirte a la comunidad:
${info.community}

o entrar al grupo de entrevistas:
${info.lobby}

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
if (/porno|xxx|Hentai$/i.test(m.text.toLowerCase())) {
resp = `@${senderJid.split('@')[0]} en este chat no pasamos ese contenido...

Busca otro tipo de chats o habla con otros administradores a ver qué te sugiere`



}
if (resp.length === 0) return
return conn.sendWritingText(m.chat, resp, userdb, m )
}
} 
/*if (/^.jadibot|^*jadibot|^#jadibot|^/jadibot|^serbot$/gi.test(m.text.toLowerCase())) {
let resp = `👺 @${senderJid.split('@')[0]}
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
return conn.sendWritingText(m.chat, resp.trim, userdb, m)



}
if (/^s|^sticker$/gi.test(m.text.toLowerCase())) {
let resp = `👺
te saco Este pero tienes que configurar el chat con los mensajes temporales para que se borren cada 24 horas`
conn.sendMessage(m.chat, { text: resp}, { quoted: m })
} */ 
//}
//handler.customPrefix = / /
//handler.command = new RegExp
