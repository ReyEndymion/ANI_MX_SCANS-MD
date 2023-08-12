import fs from 'fs';
import fetch from 'node-fetch';
import axiostal from "axios"
let handler = async(m, { conn, text, usedPrefix, xteamkey }) => {
if (!text) {
    let resp = '*[❗INFO❗] INGRESE UN ENLACE/URL EL CUAL DESEA ACORTAR*'
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
    return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
    }
    try {

const TOKEN_FILE_PATH = './tokens.json';

async function acortarEnlace(longUrl, accessToken) {
  // Código de acortarEnlace (sin cambios)
  // ...
}

async function obtenerTokenOwner(conn) {
  try {
    // Obtener el JID del owner del bot desde conn.user.jid
    const ownerJid = conn.user.jid;

    // Enviar mensaje al owner para solicitar el token
    let resp = 'Por favor, proporciona el Access Token de Bitly para acortar enlaces.'
    let txt = '';
    let count = 0;
    for (const c of resp) {
        await new Promise(resolve => setTimeout(resolve, 5));
        txt += c;
        count++;
    
        if (count % 10 === 0) {
            conn.sendPresenceUpdate('composing' , m.chat);
        }
    }
        await conn.sendMessage(ownerJid, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
    
    // Esperar a recibir el mensaje del owner con el token
    const { text } = await conn.onMessage({ from: ownerJid, pattern: /^Token: (.+)$/ });

    // Extraer el token del mensaje del owner
    const token = text.split(': ')[1];

    // Guardar el token en el archivo tokens.json
    const tokensData = { bitly: token };
    fs.writeFileSync(TOKEN_FILE_PATH, JSON.stringify(tokensData, null, 2));

    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getTokenFromJson() {
  try {
    // Leer el archivo tokens.json
    const tokensJson = fs.readFileSync(TOKEN_FILE_PATH, 'utf-8');

    // Convertir el contenido del archivo a un objeto
    const tokensData = JSON.parse(tokensJson);

    // Obtener el token de Bitly del objeto
    return tokensData.bitly;
  } catch (error) {
    console.error('Error al leer el archivo tokens.json:', error);
    throw error;
  }
}

async function guardarCredencialesBitly(conn) {
  try {
    // Obtener el JID del usuario que envía el mensaje
    const userJid = conn.user.jid;

    // Enviar mensaje solicitando el usuario y contraseña de Bitly
    let respchatme = 'Para usar Bitly, necesitas una cuenta en https://bitly.com. Por favor, envía los comandos siguientes para proporcionar tu usuario y contraseña:\n\n' +
      `${usedPrefix}userbitly (usuario o correo)\n${usedPrefix}tokenbitly (contraseña)`
      for (let ow of owner){
    let resp = `@${ow[0]} revisa el chat privado de @${me[0][0]} `
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
          await conn.sendMessage(ow + global.userID, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
console.log(ow + userID)
}
          await conn.sendMessage(userJid, { text: respchatme.trim(), mentions: conn.parseMention(respchatme) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
      
    // Esperar a recibir el mensaje con el usuario o correo
    const { text } = await conn.onMessage({ from: userJid, pattern: /^userbitly (.+)$/ });
    const usuarioBitly = text.split(' ')[1];

    // Esperar a recibir el mensaje con la contraseña
    const { text: tokenText } = await conn.onMessage({ from: userJid, pattern: /^tokenbitly (.+)$/ });
    const tokenBitly = tokenText.split(' ')[1];

    // Guardar las credenciales en el archivo tokens.json
    const tokensData = { ...fs.existsSync(TOKEN_FILE_PATH) ? JSON.parse(fs.readFileSync(TOKEN_FILE_PATH, 'utf-8')) : {}, bitly: tokenBitly };
    fs.writeFileSync(TOKEN_FILE_PATH, JSON.stringify(tokensData, null, 2));

    return tokenBitly;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Ejemplo de uso
async function main() {
  const longUrl = 'https://www.example.com';

  try {
    // Crear automáticamente tokens.json si no existe
    if (!fs.existsSync(TOKEN_FILE_PATH)) {
      fs.writeFileSync(TOKEN_FILE_PATH, '{}');
    }

    // Obtener el token de Bitly del archivo tokens.json
    let token = await getTokenFromJson();

    // Si no hay token, solicitar las credenciales al usuario
    if (!token) {
      token = await guardarCredencialesBitly(conn);
    }

    // Acortar el enlace con el token proporcionado
    const shortUrl = await acortarEnlace(longUrl, token);

    console.log('URL acortada:', shortUrl);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Llamamos a la función main para comenzar el proceso
main();

    } catch (error) {
 let json = await (await fetch(`https://api.xteam.xyz/shorturl/tinyurl?url=${text}&apikey=cb15ed422c71a2fb`)).json()
if (!json.status) throw json
let hasil = `*LINK ACORTADO CORECTAMENTE!!*\n\n*LINK ANTERIOR:*\n${text}\n*LINK ACORTADO:*\n*${json.result}*`.trim()   
//m.reply(hasil)
let txt = '';
let count = 0;
for (const c of hasil) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );       
    }


}
handler.help = ['tinyurl','acortar'].map(v => v + ' <link>')
handler.tags = ['tools']
handler.command = /^(tinyurl|short|acortar|corto)$/i
handler.fail = null
export default handler
