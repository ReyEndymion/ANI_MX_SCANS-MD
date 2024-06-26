import ws from 'ws';
import fs, { writeFileSync, readdirSync, statSync, unlinkSync, existsSync, readFileSync, copyFileSync, watch, rmSync, readdir, stat, mkdirSync, rename } from 'fs';
import path, { join } from 'path'
let confirm = {}
let handler = async (m, { conn, usedPrefix, args, participants })=> {
  const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
  const txto = await Promise.all(users.map(async (v, index) => {
  let uptime = await ajusteTiempo(Date.now() - v.uptime)
  //let _uptime = process.uptime() * 1000
  //if (uptime == isNaN(v.uptime) ) {
  //  uptime = clockString(_uptime)
  //}
  //if (conn.user.jid !== global.conn.user.jid) return 
  return `*${index + 1}. 👉🏻* @${v.user.jid.replace(/[^0-9]/g, '')}\n*Uptime:* ${uptime}`}))//.join('\n\n');
  let message = txto.join('\n\n')
  const replyMessage = (message.length === 0 || message.length === undefined) ? '*—◉ No hay Sub-Bots activos en estos momentos.*' : message;
  let totalUsers
  if (global.conns === undefined) {
    totalUsers = '0'
  } else {
  totalUsers = users.length;
  }
  //let stop = db.data.stop;
  //users = users.filter(user => !stop[user]); // filtra los usuarios que han usado el comando 'stop'

  let resp = `*🤖 Aquí tienes la lista de algunos Sub-Bots (jadibot/serbot) de ${igfg} 🤖️*\n\n*👉🏻 Puedes contactarlos para ver si se unen a tu grupo*\n\n*Te pedimos de favor que:*\n*1.- Seas amable ✅*\n*2.- No insistas ni discutas ✅*\n\n*_⚠ NOTA: ️ELLOS SON PERSONAS QUE NO CONOCEMOS.. POR LO QUE EL EQUIPO DE ${wm} NO SE HACE RESPONSABLE DE LO QUE PUEDA OCURRIR AHI.._*\nSi la lista anterior te sale vacía puedes probar con cualquiera de los bots que inician mencionando la palabra botsmain después de que salga el mensaje`
  let SB = `*Sub-Bots Conectados:* ${totalUsers || '0'}\n\n${replyMessage.trim()}`
  
  let int = '';
  let count = 0;
for (const c of resp) {
      await new Promise(resolve => setTimeout(resolve, 1));
      int += c;
      count++;
  
      if (count % 10 === 0) {
          conn.sendPresenceUpdate('composing' , m.chat);
      }
  }
  let q = await conn.sendMessage(m.chat, { text: int, mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
  for (const c of SB) {
    await new Promise(resolve => setTimeout(resolve, 1));
    int += c;
    count++;
    if (count % 10 === 0) {
       await conn.sendPresenceUpdate('composing' , m.chat);
    }
}
 let qq = await conn.sendMessage(m.chat, { text: SB, mentions: conn.parseMention(SB) }, {quoted: q, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
confirm[m.sender] = {
  sender: m.sender,
  q: qq,
  totalUsers: totalUsers,
  time: setTimeout(async () => {
    delete confirm[m.sender]
  }, 60 * 1000)
}
console.log('SubbotsInfo: ', confirm)

}
handler.command = handler.help = ['listjadibot','bots','subsbots']
handler.tags = ['jadibot']
handler.before = async function before (m, {conn}) {
if (m.text.toLowerCase() === 'botsmain') {
const confirmacion = Object.values(confirm).find(c => c.sender === m.sender);
if (!confirmacion) return;
//const {sender, q, totalUsers} = confirmacion
let bots = '';
for (let i of readdirSync(global.authFolderAniMX)) {
  var bot = i.match(/\d+/g);
  if (bot) {
    bots += `@${bot[0]}\n`;
  }
}
bots = bots.trim();
await conn.sendMessage(m.chat, {text: `Bots actuales:\n${bots}`, mentions: conn.parseMention(bots) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
}
export default handler
 async function ajusteTiempo(ms) {
  var segundos = Math.floor(ms / 1000);
  var minutos = Math.floor(segundos / 60);
  var horas = Math.floor(minutos / 60);
  var días = Math.floor(horas / 24);

  segundos %= 60;
  minutos %= 60;
  horas %= 24;

  var resultado = "";
  if (días !== 0) {
    resultado += días + " días, ";
  }
  if (horas !== 0) {
    resultado += horas + " horas, ";
  }
  if (minutos !== 0) {
    resultado += minutos + " minutos, ";
  }
  if (segundos !== 0) {
    resultado += segundos + " segundos";
  }

  return resultado;
}
/*// Variable de bandera para rastrear si la desconexión es temporal
let isTemporaryDisconnect = false;

// Función para obtener el tiempo de actividad acumulado de un subbot
function getUptime(subbotId) {
  // Leer el archivo de almacenamiento
  try {
    const data = fs.readFileSync(jadibts + `connections/${subbotId}_uptime.txt`, 'utf8');
    return parseFloat(data);
  } catch (err) {
    // Si no se encuentra el archivo, devolver 0 como tiempo de actividad
    return 0;
  }
}

// Función para guardar el tiempo de actividad acumulado de un subbot
function saveUptime(subbotId, uptime) {
  // Guardar el tiempo de actividad en el archivo de almacenamiento
  fs.writeFileSync(jadibts + `connections/${subbotId}_uptime.txt`, uptime.toString());
}

// Función para manejar la desconexión del subbot
function handleDisconnect(subbotId, isTemporary) {
  if (isTemporary) {
    // La desconexión es temporal, incrementar el tiempo de actividad acumulado
    const previousUptime = getUptime(subbotId);
    const currentUptime = previousUptime + 10; // Simula 10 segundos de tiempo de actividad adicional
    saveUptime(subbotId, currentUptime);
    console.log(`Tiempo de actividad acumulado: ${currentUptime} segundos`);
  } else {
    // La desconexión no es temporal, reiniciar el tiempo de actividad acumulado
    saveUptime(subbotId, 0);
    console.log(`Tiempo de actividad acumulado reseteado.`);
  }
}

// Ejemplo de uso cuando ocurre una desconexión (debes determinar si es temporal o no)
const subbotId = txto
const isTemporary = true; // Esto debería ser determinado por tu lógica
handleDisconnect(subbotId, isTemporary); */