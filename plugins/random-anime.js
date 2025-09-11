//import axios from "axios"
const { owner, temp, newsletterID, sBroadCastID, userID, groupID, media } = await import('../config.js')
let handler = async (m, {start, info, command, conn, db, userdb, senderJid}) => {
let resp = '', imagen
if (command == 'akira') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/akira?apikey=APIKEY`)
conn.sendMessage(m.chat, {image:{url: haha.data}, caption: `_${command}_`.trim(), }, [['🔄 SIGUIENTE 🔄', `/${command}`]], m)}
if (command == 'akiyama') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/akiyama?apikey=APIKEY`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'anna') {
let haha = await conn.getFile(`https://api.sekha.tech/api/wallpaper/ana?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'asuna') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/asuna?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'ayuzawa') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/ayuzawa?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'boruto') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/boruto?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'chiho') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/chiho?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
} 
if (command == 'chitoge') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/chitoge?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'deidara') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/deidara?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'erza') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/erza?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'elaina') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/elaina?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'eba') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/eba?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'emilia') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/emilia?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'hestia') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/hestia?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'hinata') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/hinata?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'inori') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/inori?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'isuzu') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/isuzu?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
} 
if (command == 'itachi') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/itachi?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'itori') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/itori?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'kaga') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/kaga?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'kagura') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/kagura?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'kaori') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/kaori?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'keneki') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/keneki?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
} 
if (command == 'kotori') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/kotori?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'kurumi') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/kurumi?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'madara') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/madara?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'mikasa') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/mikasa?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'miku') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/miku?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'minato') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/minato?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
} 
if (command == 'naruto') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/naruto?apikey=APIKEY`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'nezuko') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/nezuko?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'sagiri') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/sagiri?apikey=APIKEY`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'sasuke') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/sasuke?apikey=APIKEY`)
imagen = haha.data
resp = `_${command}_`.trim()
} 
if (command == 'sakura') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/sakura?apikey=APIKEY`)
imagen = haha.data
resp = `_${command}_`.trim()
}
if (command == 'cosplay') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/random/cosplay?apikey=apirey`)
imagen = haha.data
resp = `_${command}_`.trim()
}
const buff = info.nanie
const buttons = [['🔄 SIGUIENTE 🔄', `/${command}`]]
if (start.buttons) {
return conn.sendButton( m.chat, resp, buff, buttons, fkontak, m)
} else {
const cmds = buttons.map(([a, b]) => `${a}:\n${b}`).join('\n')
return conn.sendImageWriting(m.chat, imagen, resp+'\n'+cmds+'\n'+'\n'+buff, m );
}

}
handler.command = handler.help = ['akira', 'akiyama', 'anna', 'asuna', 'ayuzawa', 'boruto', 'chiho', 'chitoge', 'deidara', 'erza', 'elaina', 'eba', 'emilia', 'hestia', 'hinata', 'inori', 'isuzu', 'itachi', 'itori', 'kaga', 'kagura', 'kaori', 'keneki', 'kotori', 'kurumi', 'madara', 'mikasa', 'miku', 'minato', 'naruto', 'nezuko', 'sagiri', 'sasuke', 'sakura', 'cosplay']
handler.tags = ['anime']
handler.menu = [
{title: "👾 WAIFU", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo waifu", id: `waifu`},
{title: "👾 AKIRA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo akira", id: `akira`},
{title: "👾 AKIYAMA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo akiyama", id: `akiyama`},
{title: "👾 ANNA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo anna", id: `anna`},
{title: "👾 ASUNA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo asuna", id: `asuna`},
{title: "👾 AYUZAWA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo ayuzawa", id: `ayuzawa_`},
{title: "👾 BORUTO", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo boruto", id: `boruto`},
{title: "👾 CHIHO", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo chiho", id: `chiho`},
{title: "👾 CHITOGE", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo chitoge", id: `chitoge`},
{title: "👾 DEIDARA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo deidara", id: `deidara`},
{title: "👾 ERZA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo erza", id: `erza`},
{title: "👾 ELAINA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo elaina", id: `elaina`},
{title: "👾 EBA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo eba", id: `eba`},
{title: "👾 EMILIA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo emilia", id: `emilia_`},
{title: "👾 HESTIA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo hestia", id: `hestia`},
{title: "👾 HINATA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo hinata", id: `hinata`}, 
{title: "👾 INORI", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo inori", id: `inori`}, 
{title: "👾 ISUZU", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo isuzu", id: `isuzu`},
{title: "👾 ITACHI", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo itachi", id: `itachi`},
{title: "👾 ITORI", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo itori", id: `itori`}, 
{title: "👾 KAGA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo kaga", id: `kaga`}, 
{title: "👾 KAGURA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo kagura", id: `kagura`}, 
{title: "👾 KAORI", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo kaori", id: `kaori`}, 
{title: "👾 KENEKI", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo keneki", id: `keneki`}, 
{title: "👾 KOTORI", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo kotori", id: `kotori`}, 
{title: "👾 KURUMI", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo kurumi", id: `kurumi`}, 
{title: "👾 MADARA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo madara", id: `madara`}, 
{title: "👾 MIKASA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo mikasa", id: `mikasa`},
{title: "👾 MIKU", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo miku", id: `miku`},
{title: "👾 MINATO", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo minato", id: `minato`}, 
{title: "👾 NARUTO", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo naruto", id: `naruto`}, 
{title: "👾 NEZUKO", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo nezuko", id: `nezuko`}, 
{title: "👾 SAGIRI", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo sagiri", id: `sagiri`}, 
{title: "👾 SASUKE", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo sasuke", id: `sasuke`}, 
{title: "👾 SAKURA", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo sakura", id: `sakura`},
{title: "👾 COSPLAY", description: "Utiliza el siguiente comando para obtener wallpapers de anime tipo cosplay", id: `cosplay`},
];
handler.type = "random";

handler.disabled = false;

export default handler
