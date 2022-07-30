let handler = async (m, { conn, text, isROwner, isOwner }) => {
if (text) {
global.db.data.chats[m.chat].sBye = text
m.reply('*[❗] MENSAJE DE DESPEDIDA CONFIGURADO CORRECTAMENTE PARA ESTE GRUPO*')
} else throw `*[❗] INGRESE EL MENSAJE DE DESPEDIDA QUE DESEE AGREGAR, USE:*\n*- @user (mención)*`
}
handler.help = ['setbye <text>']
handler.tags = ['group']
handler.command = ['setbye'] 
handler.admin = true
export default handler
