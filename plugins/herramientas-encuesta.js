let handler = async (m, { conn, text, args, usedPrefix, command, participants}) => {
    let name = await conn.getName(m.sender);
    let who = m.mentionedJid//
    let menciones = [];
    let txto = text; // Texto formateado en proceso
    let mentions = [...text.matchAll(/@\d+/g)]; // Buscar menciones

    for (const mention of mentions) {
        const phoneNumber = mention[0].replace('@', '');
        const name = await conn.getName(`${phoneNumber}@s.whatsapp.net`);
        txto = txto.replace(new RegExp(mention[0], 'g'), name);
    }
    for (const jid of who) {
    let mencion = `${conn.getName(jid)} `;
    menciones += mencion
    
    //let names = await conn.getName(phoneNumber);    
    }
let num = []
    for (const jid of who){
    let phoneNumber = jid.replace('@s.whatsapp.net', '');
    num += `@${phoneNumber} `
}
    if (name === 'undefined') name = 'Sin nombre';

    let int = text//.includes(menciones)//(who.filter(entry => typeof entry[0] === 'string' && !isNaN(entry[0])).map(entry => ({ jid: entry[0] })).slice(0).map(({jid}) => `${conn.getName(jid)}`).join` y `)//.replace(who, menciones)

    const parts = txto.split('|')
    /*for (let i = 0; i < text.length; i++) {
        text = parts.replace(new RegExp(`@${who[i].replace('@s.whatsapp.net', '')}\\b`, 'g'), menciones[i]);
    } */
    if (parts.length < 4) {
        let resp = `*[❗INFO❗]*\n*FORMATO DE USO (múltiples selecciones)*\n\n${usedPrefix + command} 0|Pregunta?|Opcion1|Opcion2...\n\n*FORMATO DE USO (una sola selección)*\n\n${usedPrefix + command} 1|Pregunta?|Opcion1|Opcion2...`
        let txt = '';
        let count = 0;
        for (const c of resp) {
        await new Promise(resolve => setTimeout(resolve, 15));
        txt += c;
        count++;
    
        if (count % 10 === 0) {
            conn.sendPresenceUpdate('composing' , m.chat);
        }
        }
        return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
    
    //let selectableCount = 0; 
    const selectableCountPart = parts[0];
    let question = parts[1]//.replace(new RegExp(`${num}\\b`, 'g'), menciones)//.replace(num, menciones)//.includes(menciones).join(' ');
    /*for (let i = 0; i < who.length; i++) {
        const phoneNumber = who[i].replace('@s.whatsapp.net', ''); // Obtener el número de teléfono sin @s.whatsapp.net
        question = question.replace(new RegExp(`${num}\\b`, 'g'), menciones);
    }*/
    
    let options = parts.slice(2);
    const selectableCount = parseInt(selectableCountPart); 
    console.log('quien', txto)

    if (!/^\d+$/.test(selectableCountPart)) {
        let resp = "*[❗INFO❗] El primer valor debe ser un número sin espacios.*";
        let txt = '';
        let count = 0;
        for (const c of resp) {
        await new Promise(resolve => setTimeout(resolve, 15));
        txt += c;
        count++;
    
        if (count % 10 === 0) {
            conn.sendPresenceUpdate('composing' , m.chat);
        }
        }
        return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
//    if (args.length > 0) {
//        selectableCount = parseInt(args[0]);
        if (isNaN(selectableCount) || (selectableCount !== 0 && selectableCount !== 1)) {
            let resp =  "*[❗INFO❗] El primer valor debe ser 0 (múltiples selecciones) o 1 (una sola selección).*";
            let txt = '';
            let count = 0;
            for (const c of resp) {
            await new Promise(resolve => setTimeout(resolve, 15));
            txt += c;
            count++;
        
            if (count % 10 === 0) {
                conn.sendPresenceUpdate('composing' , m.chat);
            }
            }
            return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
                }
    //}

    let pollValues = options.map(option => [option]);
    let resp = `*ENCUESTA REALIZADA POR:*\n${name}\n*PREGUNTA:*\n${question}`;
    let txt = '';
    let count = 0;
    for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;
    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
    }
    const poll = {
        poll: {
            name: resp,
            values: pollValues,
            selectableCount: selectableCount
        }
    }
    return conn.sendMessage(m.chat, poll, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 });
}

handler.help = ['encuesta question|option|option']
handler.tags = ['group']
handler.command = ['poll', 'encuesta']
export default handler;
