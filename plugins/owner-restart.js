import { exec } from 'child_process'
let handler = async (m, { conn, isROwner, text }) => {
  
  if (!process.send) throw 'Do: node index.js\nDont: node main.js'
  if (global.conn.user.jid == conn.user.jid == isROwner) {
    await m.reply('```Reiniciando el Bot. . .```')
    process.send('reset')
    exec('npm run start', (error, stdout, stderr) => {
  if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
      
  } else throw 'Este comando solo puede ser ejecutado por el propietario del bot'
  }
    /*await m.reply('```Restarting...```')
    process.send('reset')
  } else {
    throw 
  */

 

handler.help = ['restart']
handler.tags = ['owner']
handler.command = /^(res(tart)?)$/i

handler.rowner = true

export default handler
