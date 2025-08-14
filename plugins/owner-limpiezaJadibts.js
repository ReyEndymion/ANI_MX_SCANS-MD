import fs, { writeFileSync, readdirSync, statSync, unlinkSync, existsSync, readFileSync, copyFileSync, watch, rmSync, readdir, stat, mkdirSync,  watchFile, unwatchFile, rmdirSync  } from 'fs';
import path, { join } from 'path'
let handler = async function (m, {conn, db}) {
  let carpetas = readdirSync(jadibts)//Object.keys(dirP + '/jadibts')
  let resp
      try {
  for(let carpeta of carpetas) {
      const carpetaPath = path.join(jadibts, carpeta);
      const stats = statSync(carpetaPath);

      // Verificar si es un directorio (carpeta)
      if (stats.isDirectory()) {
          // Obtener la lista de archivos y carpetas dentro de la carpeta
          const contenidoCarpeta = readdirSync(carpetaPath);

          // Si la carpeta está vacía, eliminarla
          if (contenidoCarpeta.length === 0) {
              console.log(`La carpeta ${carpeta} está vacía. Eliminando...`);
              rmdirSync(carpetaPath, { recursive: true });
              console.log(`Carpeta ${carpeta} eliminada.`);
          } else {
          const tiempoTranscurrido = Date.now() - stats.mtimeMs;

          // Si ha pasado más de 15 días desde el último acceso
          if (tiempoTranscurrido > 15 * 24 * 60 * 60 * 1000) {
              console.log(`La carpeta ${carpeta} ha pasado más de 15 días de antiguedad. Eliminando...`);
              rmdirSync(carpetaPath, { recursive: true });
              console.log(`Carpeta ${carpeta} eliminada.`);
          }
      }
      } else {
          // Si es un archivo
          const tiempoTranscurrido = Date.now() - stats.mtimeMs;

          // Si ha pasado más de 15 días desde la última modificación
          if (tiempoTranscurrido > 15 * 24 * 60 * 60 * 1000) {
              console.log(`El archivo ${carpeta} ha pasado más de 15 días de antiguedad. Eliminando...`);
              unlinkSync(carpetaPath, { recursive: true });
              console.log(`Archivo ${carpeta} eliminado.`);
          }
      }
  }
//       console.log('carpJdbts: ', carpetas)
 console.log(resp = `Proceso de limpieza completo.\n\nLos directorios de la carpeta ${jadibts} mas antiguos de 15 dias o vacios fueron eliminados correctamente`);
} catch (error) {
  console.error(resp = `Error al leer el directorio principal: ${error.message}\n\nPosiblemtente no se encuentre ningun directorio antiguo`);
  }
  let txt = '';
  let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 1));
    txt += c;
    count++;
  
    if (count % 10 === 0) {
    await conn.sendPresenceUpdate('composing' , m.chat);
    }
  }
    return conn.sendWritingText(m.chat, resp, userdb, m)
}
handler.command = /limpjdbts$/i
handler.rowner = true
handler.help = [];
handler.tags = [];
handler.menu = [];
handler.type = "";
handler.disabled = false;

export default handler