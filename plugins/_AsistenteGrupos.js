let handler = m => m
handler.all = async function (m) {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let conn = this

if (/^buen día|^buen dia|^hola|^Buenos días|^qué tal|^𝐇𝐨𝐥𝐚$/i.test(m.text)) {
    let text = 	`Hola @${who.split("@s.whatsapp.net")[0]} en un momento te respondemos...
    por el momento te dejaré las preguntas básicas....
    ¿Todo bien todo correcto?`
    await conn.reply(m.chat, text, m, { mentions: this.parseMention(text) })
    }     

if (/^Lenin|^creador$/i.test(m.text)) {
    let text = `Rey Endymion, @${who.split("@s.whatsapp.net")[0]}...
      
    Gracias por comunicarte con 🌎ANI MX SCANS🌏. ¿Cómo podemos ayudarte?
      
    Presenté.... (Pero sólo en espíritu) lo siento no puedo responder en este momento`
    await conn.reply(m.chat, text, m, { mentions: this.parseMention(text) })
    }     
    
if (/^cómo te llamas?$/i.test(m.text)) {
  m.reply(`K.I.R.R. (Knigth Intelligence Revolutionary on the Road)`)
} 

if (/^cómo estás|^cómo estás?|^como estas$/i.test(m.text)) {
  let text = `Todo bien|^y tú @${who.split("@s.whatsapp.net")[0]}?... 
Por cierto soy un asistente virtual en este grupo|^para más detalles invoca a un administrador diferente`
await conn.reply(m.chat, text, m, { mentions: this.parseMention(text) })
}     
return !0
}
export default handler
