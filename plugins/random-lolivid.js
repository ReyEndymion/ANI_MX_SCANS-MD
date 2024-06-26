let handler  = async (m, { conn, usedPrefix, command }) => {
    let resp, video
    try {
    video = await lolivid[Math.floor(Math.random() * lolivid.length)];
    resp = `LOLI IS CUTE 🥺`
    } catch (error) {
    resp = `Ocurrió un error, por favor inténtalo más tarde,El error posiblemente puede hacer solucionado leyendo lo siguiente:\n\n${Error}`
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
if (video) {
return conn.sendMessage(m.chat, { video: {url: video}, caption: txt.trim(), mentions: txt, mimetype: 'video/mp4', caption: txt }, {userJid: conn.user.jid, quoted: m, ephemeralExpiration: 2*60*1000, disappearingMessagesInChat: 2*60*1000 } )
} else {
return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}


}
handler.help = ['lolivid']
handler.tags = ['random']
handler.command = /^(lolivid|lolivideos|lolívid)$/i
export default handler
global.lolivid = [
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli1.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli2.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli3.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli4.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli5.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli6.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli7.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli8.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli9.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli10.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli11.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli12.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli13.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli14.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli15.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli16.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli17.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli18.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli19.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli20.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli21.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli22.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli23.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli24.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli25.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli26.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli27.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli28.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli29.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli30.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli31.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli32.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli33.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli34.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli35.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli36.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli37.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli38.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli39.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli40.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli41.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli42.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli43.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli44.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli45.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli46.mp4',
    'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli47.mp4',
  ];