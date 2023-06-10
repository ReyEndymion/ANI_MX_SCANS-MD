import { exec } from 'child_process'
let handler = async (m, { conn, isROwner, text }) => {
    //if (!process.send) throw 'Dont: node main.js\nDo: node index.js'
    if (conn.user.jid === conn.user.jid && isROwner) {
    await m.reply('```Reiniciando el Bot. . .```')
    process.send('reset')
  } else {
    throw 'Este comando solo puede ser ejecutado por el propietario del bot'
  }
}

handler.help = ['restart']
handler.tags = ['owner']
handler.command = /^(res(tart)?)$/i
handler.owner = true

export default handler
