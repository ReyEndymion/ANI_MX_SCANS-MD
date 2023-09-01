let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
let resp = ` @${m.sender.split('@')[0]} Estos son los métodos para poder instalar el bot

*—◉ METODOS DE INSTALACIÓN*

************[SERVIDORES]***********

*—◉ TUTORIAL BOXMINE HOST*
> Tutorial: https://youtu.be/eC9TfKICpcY
> Pagina Oficial: https://boxmineworld.com
> Dashboard: https://dash.boxmineworld.com/home
> Panel: https://panel.boxmineworld.com
> Soporte: https://discord.gg/84qsr4v 
-----------------------------------------------------------

*—◉ TUTORIAL ZIPPONODES HOST*
> Pagina: https://www.zipponodes.com/
> Informacion: https://docs.zipponodes.com/inicio/enlaces
> Soporte: https://chat.whatsapp.com/EKQaXhfAO1D5ojNMcRdRVF
> Tutorial: https://youtu.be/nbjvreJ0tUk
*NOTA IMPORTANTE*: En cada host hay algunos inicios de sesión muy similares por lo que deben cambiar algunas partes del tutorial sobre todo los enlaces para que puedan realizar su cuenta
-----------------------------------------------------------

**************[MOVILES]*************

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
> git clone ${md}
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
