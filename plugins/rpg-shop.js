const xpperlimit = 350 
let handler = async (m, {conn, command, args, userdb, db, senderJid}) => {
let count = command.replace(/^buy|comprar/i, '')
count = count ? /all/i.test(count) ? Math.floor(userdb.exp / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
count = Math.max(1, count)
if (userdb.exp >= xpperlimit * count) {
userdb.exp -= xpperlimit * count
userdb.limit += count
conn.sendWritingText(m.chat, `
┌─「 *NOTA DE PAGO* 」
‣ *Compra nominal* : + ${count}💎 
‣ *Gastado* : -${xpperlimit * count} XP
└──────────────`, m)} else conn.sendWritingText(m.chat, `❎ Lo siento, no tienes suficientes *XP* para comprar *${count}* Diamantes💎`, m)
}
handler.help = ['Buy', 'Buyall']
handler.tags = ['xp']
handler.command = ['buy1', 'buyall1', 'comprar1'] 

handler.disabled = false

handler.menu = [];
handler.type = "";

export default handler
