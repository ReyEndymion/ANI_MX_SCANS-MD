let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, text, isMods, isOwner, isPrems }) => {
let link = (m.quoted ? m.quoted.text ? m.quoted.text : text : text) || text
let [_, code] = link.match(linkRegex) || []

if (!code) throw '*[ ⚠️ ALERTA ⚠️ ] LINK ERRÓNEO O FALTANTE*\n*👉🏻 INGRESE EL ENLACE DE UN GRUPO*\n\n*ejemplo:*\n*#join https://chat.whatsapp.com/Jgfs9HvNgO80s0OfxiOSfE*\n\n*POR CIERTO ESE ENLACE DE EJEMPLO ES UN GRUPO PARA QUE PUEDAN PEDIR LA SOLICITUD YA QUE LOS PRIVADOS SE ESTARÁN BLOQUEANDO POCO A POCO\n\n*[❗INFO❗] NO RESPONDA A NINGÚN MENSAJE, PUEDE CAUSAR INTERFERENCIA, ESCRÍBALO ÚNICAMENTE COMO MENSAJE NUEVO*'

if ( isPrems || isMods || isOwner || m.fromMe) {
let res = await conn.groupAcceptInvite(code)
await m.reply(`*EL BOT SE UNIÓ CON ÉXITO AL GRUPO, DISFRUTE DEL BOT! ✔️*`)
} else {
const data = global.owner.filter(([id]) => id)

for (let jid of data.map(([id]) => [id] + '@s.whatsapp.net').filter(v => v != conn.user.jid)) 
await m.reply('*[❗INFO❗] NUEVA SOLICITUD DEL BOT PARA UN GRUPO [❗INFO❗]*\n\n*—◉ NÚMERO SOLICITANTE:* ' + 'wa.me/' + m.sender.split('@')[0] + '\n*—◉ LINK DEL GRUPO DÓNDE SE SOLICITA EL BOT ' + link, jid)

await m.reply('*[❗INFO❗] EL LINK DEL GRUPO FUE ENVIADO A MI PROPIETARIO/A*\n\n*👉🏻 SU GRUPO ESTARÁ EN EVALUACIÓN Y EL PROPIETARIO/A DEL BOD DECIDIRÁ SI LO AGREGA O NO*\n\n*[❗INFO❗] ALGUNAS DE LAS RAZONES POR LAS QUE SU SOLICITUD PUEDE SER RECHAZADA:*\n\n*1.- EL BOT ESTÁ SATURADO*\n*2.- SE ELIMINÓ PREVIAMENTE AL BOTE DEL GRUPO DONDE SE ESTÁ SOLICITANDO*\n*3.- EL LINK DEL GRUPO FUE RESTABLECIDO*\n*4.- EL BOT NO SE UNE A GRUPOS POR DECISIÓN DEL PROPIETARIO/A*\N*5.- AÚN NO ESTÁS EN LA ASOCIACIÓN DE GRUPOS*\n\n*👉🏻 TEN EN CUENTA QUE TU SOLICITUD PARA UNIR EL BOT A UN GRUPO PUEDE TARDAR HORAS O DÍAS EN SER RESPONDIDA, TEN PACIENCIA\n\n PARA DAR MÁS RAPIDEZ A ESTE PROCEDIMIENTO PONGA EL COMANDO #RAGOU PARA QUE PUEDAS VER LAS REGLAS DE LA Asociación Y No Se Te Olvide Leer La DESCRIPCIÓN DEL GRUPO DE PETICIONES PARA OBTENER EL COMANDO QUE TE DA EL GRUPO DE LA ASOCIACIÓN')}}

handler.help = ['join [chat.whatsapp.com]']
handler.tags = ['premium']
handler.command = /^join|nuevogrupo$/i
export default handler
