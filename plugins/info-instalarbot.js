let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
let resp = ` @${m.sender.split('@')[0]}
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
let txt = '';
let count = 0;
let context = { text: resp.trim(),  contextInfo: {mentionedJid: conn.parseMention(resp), externalAdReply :{ mediaUrl: null, mediaType: 1, description: resp, 
title: 'INFORMACION - INSTALARBOT',
body: wm,         
previewType: 0, thumbnail: imagen1,
sourceUrl: md}}}
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 5));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, context, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
//m.reply(text/*, m.chat, m, */)   
}
handler.command = /^(instalarbot)/i
export default handler
