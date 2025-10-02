export async function before(m, {conn, chatdb, db, userdb, senderJid}) {
const { info, newsletterID, sBroadCastID } = await import('../config.js')
if (m.chat == sBroadCastID || m.chat.endsWith(newsletterID)) return
if (/ficha$/i.test(m.text) && chatdb.gruposrol && !chatdb.isBanned) {
let resp = 	
`❢◥ ▬▬▬▬▬▬ ◆ ▬▬▬▬▬▬ ◤❢
*_𐂡MAGIC MEDIEVAL TECNOLOGÍ𐂡_*
❢◥ ▬▬▬▬▬▬ ◆ ▬▬▬▬▬▬ ◤❢
*~_FICHA ÚNICA DE PERSONAJE, EVITE LA PERDIDA DE SU FICHA AL COMPLETARLA_~*

*_✿:･NIVEL DEL PERSONAJE･:✿_*
_(No modificar)_

⌦NIVEL ACTUAL:1

*_✿:･EXPERIENCIA DEL PERSONAJE･:✿_*
_(No modificar)_

⌦(0/50)

*_✿:･OBJETOS DEL PERSONAJE･:✿_*
_(No modificar)_

⌦

*_✿:･DINERO DEL PERSONAJE･:✿_*
_(no modificar)_

⌦100(Moneda única en el rol)

*_✿:･NOMBRE DEL PERSONAJE･:✿_*

⌦

*_✿:･EDAD DEL PERSONAJE･:✿_*

⌦

*_✿:･SEXO Y ORIENTACIÓN SEXUAL DEL PERSONAJE･:✿_*

⌦

*_✿:･ESTATURA DEL PERSONAJE･:✿_*

⌦

*_✿:･RAZA U/O ESPECIE DE PERSONAJE･:✿_*

⌦

*_✿:･ELEMENTO DE CONTROL･:✿_*
_(es solo un elemento por personaje)_

⌦

*_✿:･SECCION DE HABILIDADES･:✿_*

*_➛ HABILIDADES MÁGICAS_*

⌦
⌦
⌦
⌦
⌦

*_➛HABILIDAD FISICA_*

⌦

*_HABILIDADES COMUNES_*

⌦
⌦
⌦
⌦
⌦

*_✿:･SECCION DE DEBILIDADES･:✿_*
⌦
⌦
⌦
⌦

*_➛DEBILIDADES MÁGICAS_*

⌦
⌦
⌦
⌦
⌦

*_➛DEBILIDADES FISICAS_*

⌦
⌦
⌦
⌦
⌦

*_➛INEPTITUDES DEL PERSONAJE_*


⌦
⌦
⌦
⌦
⌦

*_✿:･ARMAS PORTADAS O EQUIPADAS DEL PERSONAJE･:✿_*


⌦
⌦
⌦
⌦
⌦

*_✿:･APARIENCIA DEL PERSONAJE･:✿_*
Imagen o descripción 


*_✿:･HISTORIA DE PERSONAJE･:✿_*

⌦`.trim()
return conn.sendWritingText(m.chat, resp, userdb, m);
} 
}
