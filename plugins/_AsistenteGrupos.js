let handler = m => m
handler.all = async function (m) {
let chat = global.db.data.chats[m.chat]
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender


if (/^buen día|buen dia|hola|^Buenos días|qué tal|𝐇𝐨𝐥𝐚$/i.test(m.text) && chat.asistente && !chat.isBanned) {
    let text = 	`Hola @${who.split("@s.whatsapp.net")[0]} en un momento te respondemos...
    por el momento te dejaré las preguntas básicas....
    ¿Todo bien todo correcto?`
    await conn.reply(m.chat, text, m, { mentions: this.parseMention(text) })
    }
if (/^Quién eres?$/i.test(m.text) && chat.asistente && !chat.isBanned) {
  m.reply(`	K.I.R.R. la inteligencia artificial programada por Rey Endymion`)
} 
if (/^Lenin|^creador$/i.test(m.text) && chat.asistente && !chat.isBanned) {
    let text = `Rey Endymion, @${who.split("@s.whatsapp.net")[0]}...
      
    Gracias por comunicarte con 🌎ANI MX SCANS🌏. ¿Cómo podemos ayudarte?
      
    Presenté.... (Pero sólo en espíritu) lo siento no puedo responder en este momento`
    await conn.reply(m.chat, text, m, { mentions: this.parseMention(text) })
    }     
    
if (/^cómo te llamas?$/i.test(m.text) && chat.asistente && !chat.isBanned) {
  m.reply(`K.I.R.R. (Knigth Intelligence Revolutionary on the Road)`)
} 

if (/^cómo estás|^cómo estás?|^como estas$/i.test(m.text) && chat.asistente && !chat.isBanned) {
  let text = `Todo bien|^y tú @${who.split("@s.whatsapp.net")[0]}?... 
Por cierto soy un asistente virtual en este grupo|^para más detalles invoca a un administrador diferente`
await conn.reply(m.chat, text, m, { mentions: this.parseMention(text) })
} 
if (/Otakus Together$/i.test(m.text) && chat.asistente && !chat.isBanned) {
  m.reply(`ㄖㄒ卂Ҡ凵丂   ㄒㄖᎶ乇ㄒ卄乇尺`)
} 
if (/Otakus TogetherS$/i.test(m.text) && chat.asistente && !chat.isBanned) {
  m.reply(`🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂  ㄒㄖᎶ乇ㄒ卄乇尺🍜⃢⃟ᭀᬽ`)
} 
if (/^otakus forever$/i.test(m.text) && chat.asistente && !chat.isBanned) {
  m.reply(`🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂  千ㄖ尺乇ᐯ乇尺🍜⃢⃟ᭀᬽ`)
} 
if (/nombre del grupo de sailor moon$/i.test(m.text) && chat.asistente && !chat.isBanned) {
  m.reply(`❤️𝓕𝓪𝓷 𝓭𝓮 𝓢𝓪𝓲𝓵𝓸𝓻 𝓜𝓸𝓸𝓷🌙💖`)
} 
if (/muestra el grupo de aportes$/i.test(m.text) && chat.asistente && !chat.isBanned) {
  m.reply(`Se les invita al grupo de aportes de
🍓⃢⃤ᬽㄖㄒ卂Ҡ凵丂  
ㄒㄖᎶ乇ㄒ卄乇尺🍜⃢⃟ᭀᬽ 
**Para estar en ese grupo de aportes no es necesario tener aportes sin embargo es un grupo 0 chat por lo que por respeto a los aportadores oficiales está en modo administrador**

Quien quiera pertenecer a ese grupo y tenga aportes me dice para prestarle admin porque no se puede chatear en aquel grupo por respeto a los aportadores oficiales

https://chat.whatsapp.com/DhvxhmZ4lMkLppU0obHWp4

Se puede aportar hasta el momento cualquier tipo de contenido incluyendo películas que no tengan relación con anime...

O música y manga

Cómo requisito para permanecer en ese grupo tienen que estar en este grupo...

*Quién se salga de este grupo por automático será expulsado del grupo de aportes*`)
} 
if (/grupo de aportes forever$/i.test(m.text) && chat.asistente && !chat.isBanned) {
  m.reply(`Este es el grupo de aportes de
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

⚠️Si te sales del grupo principal|^te eliminaremos de aquí⚠️`)
}
if (/^haz la presentación de este calabozo de muertos|^calabozo de los muertos$/i.test(m.text) && chat.asistente && !chat.isBanned) {
  m.reply(`En este grupo para los que se han agregado deberán de hacer *30 MENSAJES* los cuáles pueden ser spam de stickers o spam de texto

Se prohíbe completamente los link de invitación de otros grupos ya que serán eliminados automáticamente sin derecho a regresar o a ser ingresados al grupo principal

Para el resto es necesario que completen la cuota antes del jueves de cada semana para evitar ser eliminados si su contador es completamente cero (0)

No serán eliminados sí por lo menos tienen un solo mensaje en toda la semana ya que eso da señales de vida en sus respectivos números`)
}
if (/contador 0$/i.test(m.text) && chat.asistente && !chat.isBanned) {
  m.reply(`	se mandan por inactivos al grupo muertos para reciclar 👺👎🏼`)
} 
if (/Reglas de otakus forever anti$/i.test(m.text) && chat.asistente && !chat.isBanned) {
  m.reply(`Bienvenidos a 
*ㄖㄒ卂Ҡ凵丂  千ㄖ尺乇ᐯ乇尺*
*(Antibinarios)*

*Reglas del grupo*
*[1]Pasar links de grupos esta prohibido*

*[2]Queda estrictamente prohibido el Porno y el Ecchi, Hentai, para este último tenemos grupos dedicados*

*[3]Está prohibido agregar administradores sin previo aviso, info para misiones* 
         
*[4]Tienen prohibido faltar al respeto a menos de que se estén llevando*

*[5]El spam de stickers y de texto esta permitido*

*La Nueva generación forever*

https://facebook.com/groups/849679409107132`)
} 
if (/enlace de invitación|link|enlace del grupo$/i.test(m.text) && chat.asistente && !chat.isBanned) {
  let text = `Solo tienes dos opciones para llegar al grupo principal @${who.split("@s.whatsapp.net")[0]}

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
await conn.reply(m.chat, text, m, { mentions: this.parseMention(text) })
}    
/*if (/^.jadibot|^*jadibot|^#jadibot|^/jadibot|^serbot$/i.test(m.text) && chat.asistente && !chat.isBanned) {
  let text = `👺 @${who.split("@s.whatsapp.net")[0]}
el bot de otakus Together es esclusivo del grupo homónimo

No sé puede volver a iniciar sesión con QR`
await conn.reply(m.chat, text, m, { mentions: this.parseMention(text) })
}
if (/^s|^sticker$/i.test(m.text) && chat.asistente && !chat.isBanned) {
  m.reply(`👺
te saco Este pero tienes que configurar el chat con los mensajes temporales para que se borren cada 24 horas`)
} */     
return !0
}
export default handler
