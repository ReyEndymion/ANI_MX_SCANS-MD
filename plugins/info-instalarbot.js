let handler = async (m, {conn, info, command, args, usedPrefix, DevMode, db, objs, userdb, senderJid}) => {
const fs = await import('fs')
const {imagen1} = objs
let resp = ` @${senderJid.split('@')[0]} Estos son los métodos para poder instalar el bot

*—◉ METODOS DE INSTALACIÓN*

************[SERVIDORES]***********

*—◉ TUTORIAL BOXMINE HOST*
> Tutorial: https://youtu.be/eC9TfKICpcY
> Pagina Oficial: https://boxmineworld.com
> Dashboard: https://dash.boxmineworld.com/home
> Panel: https://panel.boxmineworld.com
> Soporte: https://discord.gg/84qsr4v 
-----------------------------------------------------------

*—◉ TUTORIAL CAFIREXOS HOST*
> Pagina: https://www.cafirexos.com/
> Informacion: https://docs.cafirexos.com/inicio/enlaces
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
> git clone ${info.repoProyect}
> cd ani_mx_scans-md
> yarn install 
> npm install
> npm update
> npm install 
> npm start` 
return conn.sendWritingText(m.chat, resp, userdb, m)
}
handler.command = /^(instalarbot)/i
handler.help = [];
handler.tags = [];
handler.menu = [
{title:"💎 INSTALAR BOT", description: "muestra información de como instalar el bot usando #instalarbot", id: `instalarbot`}
];
handler.type = "info";
handler.disabled = false;

export default handler
