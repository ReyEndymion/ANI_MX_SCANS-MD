let handler = async (m, { customPrefix, conn }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender    

    if (/^aclaración$/i.test(m.text)) {
        m.reply(`🚨🚨🚨🚨🚨🚨🚨🚨🚨 *Esto no es un GRUPO, es un LOBBY de ingreso para un grupo de parejas y amistad entre gente con gustos en el anime, manga y cultura japonesa y asiática llamado: 
      *ㄖㄒ卂Ҡ凵丂*  
      *ㄒㄖᎶ乇ㄒ卄乇尺.*
      *Ser Otaku en Latinoamérica no es lo mismo que ser un Otaku nipón. Quien quiera estar en el grupo principal lo único que se les pide es lo siguiente:*
      
      💫 *ʙɪᴇɴᴠᴇɴɪᴅ@s ᴀ ᴇsᴛᴇ しᝪᗷᗷᎩ 🇦 🇶 🇺 🇮  ᴛɪᴇɴᴇɴ ᴜɴᴀ ꜰɪᴄʜᴀ ᴅᴇ ᴘʀᴇꜱᴇɴᴛᴀᴄɪᴏ́ɴ:* 💫
      🐉 *ɴᴏᴍʙʀᴇ* 🐉:
      🐉 *ᴇᴅᴀᴅ*🐉:
       🐉 *ᴘᴀɪꜱ* 🐉:
      🐉 *Si eres otaku o no:* 🐉
      🐉 *ᴡᴀɪꜰᴜ ᴏ ʜᴜsʙᴀɴᴅᴏ*🐉:
      🐉 *ᴀɴɪᴍᴇ ꜰᴀᴠᴏʀɪᴛᴏ*🐉: 
       🐉 *ᴍᴀɴɢᴀ ꜰᴀᴠᴏʀɪᴛᴏ* 🐉:
      🐉 *ᴅᴇꜱᴅᴇ ʜᴀᴄᴇ ᴄᴜÁɴᴛᴏ ᴇʀᴇꜱ ᴏᴛᴀᴋᴜ*🐉:
      🐉 *ꜰᴏᴛᴏ o un mensaje de voz*🐉:
      *ᴛᴏᴅᴀs ᴇsᴛᴀs ᴘʀᴇɢᴜɴᴛᴀs ᴘᴜᴇᴅᴇɴ sᴇʀ ʀᴇsᴘᴏɴᴅɪᴅᴀs ᴇɴ ᴘʀɪᴠᴀᴅᴏ*
      
      🌊 *Si no eres otaku puedes decirnos tus preferencias con el fin de ubicarlos en grupos de su preferencia*🌊
      
      *Si van a hacer spam.... Piénsenlo dos veces puesto que nosotros pertenecemos a una asociación de grupos.*
      
      *Si eres uno de los administradores de otros grupos y te pasas de listo y haces spam en los grupos principales donde los agreguemos, yo entro a  los grupos que han hecho spam para obtener los números de los integrantes de su grupo y así apoyar a los grupos de la asociación en dónde estamos incluidos.*
      
      *_Los administradores son omitidos en esa extracción de números y eliminados del grupo principal si no restablecen su enlace..._*
      
      *Como dice el dicho:* *_"ladrón que roba a ladrón tiene cien años de perdón"_* 
      
      *Con nosotros pueden formar amistades y también contamos con un grupo de aportes sin tener que estar obligados a compartir contenido ya que tenemos más de 10 aportadores oficiales con contenido de anime y otro tipo de contenidos, también pueden formar parte de la asociación de grupos.*
      
      *También pueden hacer 10 mensajes a la semana para evitar ser eliminados... En algunos grupos el mínimo son 30 mensajes a la semana además de estar obligados a compartir contenido así que les conviene la propuesta de este grupo...*
      🚨🚨🚨🚨🚨🚨🚨🚨🚨`)
      } 

    if (/^ficha$/i.test(m.text)) {
        m.reply(	`*ɴᴏᴍʙʀᴇ*:
      
      
       *ᴇᴅᴀᴅ*:
      
      
       *ᴘᴀÍꜱ* :
      
      
       *ᴡᴀɪꜰᴜ ᴏ ʜᴜsʙᴀɴᴅᴏ*:
      
      
       *ᴀɴɪᴍᴇ ꜰᴀᴠᴏʀɪᴛᴏ*: 
      
      
        *ᴍᴀɴɢᴀ ꜰᴀᴠᴏʀɪᴛᴏ* :
      
      
       *ᴅᴇꜱᴅᴇ ʜᴀᴄᴇ ᴄᴜÁɴᴛᴏ ᴇʀᴇꜱ ᴏᴛᴀᴋᴜ*:
      
      
       *ꜰᴏᴛᴏ o ᴍᴇɴsᴀᴊᴇ ᴅᴇ ᴠᴏᴢ*:
      
      
      **TODOS ESTOS DATOS PUEDEN SER EN PRIVADO SI QUIEREN CON ALGUNO DE LOS ADMINS ACTIVOS**`)
      } 
      if (/^Moonficha| Sailorficha$/i.test(m.text)) {
        m.reply(	`💫 *ʜᴏʟᴀ ʙɪᴇɴᴠᴇɴɪᴅ@ꜱ ᴀʟ ɢʀᴜᴘᴏ  ʏ ʙᴜᴇɴᴏ ᴀQᴜÍ ᴛɪᴇɴᴇ ᴜɴᴀ ꜰɪᴄʜᴀ ᴅᴇ ᴘʀᴇꜱᴇɴᴛᴀᴄɪÓɴ* 💫
      
      
      1.💜 *ɴᴏᴍʙʀᴇ* 💜:
      
      
      2.💜 *ᴇᴅᴀᴅ*💜:
      
      
      3. 💜 *ᴘᴀÍꜱ* 💜:
      
      
      4.💜 *ᴡᴀɪꜰᴜ*💜:
      
      
      5.💜 *ᴀɴɪᴍᴇ ꜰᴀᴠᴏʀɪᴛᴏ*💜: 
      
      
      6. 💜 *ᴍᴀɴɢᴀ ꜰᴀᴠᴏʀɪᴛᴏ* 💜:
      
      
      7.💜 *ᴅᴇꜱᴅᴇ ʜᴀᴄᴇ ᴄᴜÁɴᴛᴏ ᴇʀᴇꜱ ᴏᴛᴀᴋᴜ*💜:
      
      
      8.💜 *ꜰᴏᴛᴏ o ᴍᴇɴsᴀᴊᴇ ᴅᴇ ᴠᴏᴢ*💜:`)
      } 
    
    if (/^No gracias$/i.test(m.text)) {
    m.reply(`a Bueno @${who.split("@s.whatsapp.net")[0]} te me cuidas`)
    }  
return !0
}
export default handler