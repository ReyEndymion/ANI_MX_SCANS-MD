let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
let text = `
*—◉ TUTORIAL BOXMINE HOST*
> Tutorial: https://youtu.be/eC9TfKICpcY
> Pagina Oficial: https://boxmineworld.com
> Dashboard: https://dash.boxmineworld.com/home
> Panel: https://panel.boxmineworld.com
> Soporte: https://discord.gg/84qsr4v 

------------------------------------

*—◉ TUTORIAL ACIDICNODES HOST*
> Tutorial: https://youtu.be/nbjvreJ0tUk
> Pagina: https://billing.acidicnodes.ml/register?ref=ADII104p
> Soporte: https://whatsapp.acidicnodes.com

------------------------------------

*—◉ COMANDOS TERMUX*
> cd
> termux-setup-storage
> apt update 
> pkg upgrade 
> pkg install git -y
> pkg install nodejs -y
> pkg install ffmpeg -y
> pkg install imagemagick -y
> pkg install yarn
> git clone https://github.com/ReyEndymion/ANI_MX_SCANS-MD
> cd ANI_MX_SCANS-MD
> yarn install 
> npm install
> npm update
> npm install 
> npm start` 
m.reply(text/*, m.chat, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, 
title: 'INFORMACION - INSTALARBOT',
body: '🌎ANI MX SCANS🌏',         
previewType: 0, thumbnail: fs.readFileSync("./Menu2.jpg"),
sourceUrl: `https://www.facebook.com/ANIMxSCANS`}}}*/)   
}
handler.command = /^(instalarbot)/i
export default handler
