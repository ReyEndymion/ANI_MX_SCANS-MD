let handler = async (m, { conn }) => {
let resp = `*_➤ Asociación de grupos de anime S.A._*

    **Sean bienvenidos los grupos de anime y todos aquellos que quieran pertenecer aunque no sean de anime**
    
    *https://chat.whatsapp.com/IxskSqj7CWUC4ZUpl1Hn04*
    
    @${m.sender.split`@`[0]}
    En este grupo está formada una alianza entre los grupos de WhatsApp con temática Otaku y diversos
    
    Se pretende que entre todos hagamos un convenio que sirva para prepararnos contra el spam
    
    Este grupo no será activo por lo que los participantes deben activarlo y cuando llegue un mensaje este se activará inmediatamente y sólo va a ser para reuniones de administración duda o consulta entre grupos
    
    Se requiere total seriedad en este grupo...
    Los administradores de los grupos se respetaran
    `
    let txt = '';
    let count = 0;
    for (const c of resp) {
        await new Promise(resolve => setTimeout(resolve, 5));
        txt += c;
        count++;
    
        if (count % 10 === 0) {
            conn.sendPresenceUpdate('composing' , m.chat);
        }
    }
        return await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(resp) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
}
    handler.command = /^(asociaciongruposotakus|asociacion de grupos otakus|GOU)$/i
    export default handler
    
