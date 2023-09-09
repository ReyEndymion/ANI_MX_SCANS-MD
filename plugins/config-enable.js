let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner, text }) => {
    let name = await conn.getName(m.sender)
    let img = imagen4
    let pp = imagen1
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender 
    let mentionedJid = [who]
    let userm =  `@${who.split(`@s.whatsapp.net`)[0]}` && `@${who.replace(/@.+/, '')}`
    let userg =  await conn.getName(m.chat)
    let resp = `
 ╭══╡✯✯✯✯✯✯✯✯✯✯╞══╮
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
║➤ *✨HOLA, ${userm}!!**
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
*Escribe alguna de las opciones de los comandos de la siguiente lista a continuación:*
     *LISTA DE OPCIONES*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
*"✨ | WELCOME"*
Descripcion: "ACTIVA O DESACTIVA LA BIENVENIDA EN EL GRUPO" 
El comando se usa: *${usedPrefix + command} welcome*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"🌎 | MODO PUBLICO"*
Descripcion: "EL BOT SE VUELVE DE USO PUBLICO Y/O PRIVADO" 
El comando se usa: *${usedPrefix + command} public*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"🥵 | MODO HORNY"*
Descripcion: "ACTIVA O DESACTIVA LOS COMANDOS +18" 
El comando se usa: *${usedPrefix + command} modohorny*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"🔗 | ANTILINK"*
Descripcion: "ACTIVA O DESACTIVA EL ANTI ENLACES DE GRUPOS DE WHATSAPP" 
El comando se usa: *${usedPrefix + command} antilink*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"🔗 | ANTILINK 2"*
Descripcion: "ACTIVA O DESACTIVA EL ANTI ENLACES QUE INICIAN EN HTTPS" 
El comando se usa: *${usedPrefix + command} antilink2*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"🔎 | DETECT"*
Descripcion: "ACTIVA O DESACTIVA LAS NOTIFICACIONES DE NUEVA MODIFICACION EN UN GRUPO" 
El comando se usa: *${usedPrefix + command} detect*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"❗ | RESTRICT"*
Descripcion: "ACTIVA O DESACTIVA LAS RESTRICCIONES PARA SACAR GENTE DE GRUPOS" 
El comando se usa: *${usedPrefix + command} restrict*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"☑️ | AUTOREAD"*
Descripcion: "MARCA AUTOMATICAMENTE LAS CONVERSACIONES COMO LEIDO" 
El comando se usa: *${usedPrefix + command} autoread*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"🔊 | AUDIOS"*
Descripcion: "ACTIVA O DESACTIVA LOS COMANDOS DE AUDIOS SIN PREFIJO" 
El comando se usa: *${usedPrefix + command} audios*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"🔊 | A-ADMINS-OT"*
Descripcion: "ACTIVA O DESACTIVA LOS AUDIOS DE LOS ADMINISTRADORES QUE CREARON ㄖㄒ卂Ҡ凵丂 ㄒㄖᎶ乇ㄒ卄乇尺" 
El comando se usa: *${usedPrefix + command} adminsot*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"👾 | AUTOSTICKER"*
Descripcion: "TODAS LAS IMAGENES, VIDEOS O ENLACES ENVIADOS SE CONVIERTEN EN STICKER" 
El comando se usa: *${usedPrefix + command} autosticker*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"💬 | PCONLY"*
Descripcion: "EL BOT SOLO RESPONDERA A LOS COMANDOS SI ES UN CHAT PRIVADO" 
El comando se usa: *${usedPrefix + command} pconly*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"🏢 | GCONLY"*
Descripcion: "EL BOT SOLO RESPONDERA A LOS COMANDOS SI ES UN GRUPO" 
El comando se usa: *${usedPrefix + command} gconly*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"❌ | ANTIVIEWONCE"*
Descripcion: "ACTIVA O DESACTIVA EL ANTI VER UNA SOLA VEZ" 
El comando se usa: *${usedPrefix + command} antiviewonce*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"📵 | ANTILLAMADA"*
Descripcion: "ACTIVA O DESACTIVA EL ANTI LLAMADA" 
El comando se usa: *${usedPrefix + command} anticall*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"💬 | ANTIPRIVADO"*
Descripcion: "EL BOT BLOQUEARA A LOS USUARIOS QUE LE HABLEN AL PRIVADO" 
El comando se usa: *${usedPrefix + command} antiprivado*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"🤬 | ANTITOXIC"*
Descripcion: "ACTIVA O DESACTIVA EL ANTI MALAS PALABRAS" 
El comando se usa: *${usedPrefix + command} antitoxic*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"🕸️ | ANTITRABAS"*
Descripcion: "ACTIVA O DESACTIVA EL ANTI BINARIOS O TRABAS" 
El comando se usa: *${usedPrefix + command} antitraba*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"👎🏻 | ANTIARABES"*
Descripcion: "AL ENVIAR MENSAJE UN NUMERO ARABE, EL BOT LO SACA" 
El comando se usa: *${usedPrefix + command} antiarabes*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"🤖 | MODEJADIBOT"*
Descripcion: "ACTIVA O DESACTIVA EL COMANDO PARA SUB BOTS (#SERBOT/ #JADIBOT)" 
El comando se usa: *${usedPrefix + command} modejadibot*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"👑 | MODOADMIN"*
Descripcion: "EL BOT SOLO RESPONDERA A LOS ADMINS" 
El comando se usa: *${usedPrefix + command} modoadmin*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"👊🏼🤡 | MODOCOMEDIA"*
Descripcion: "ACTIVA O DESACTIVA EL MODO COMEDIA 👺🤙🏻" 
El comando se usa: *${usedPrefix + command} modocomedia*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"🥸 | ASISTENTE"*
Descripcion: "ACTIVA O DESACTIVA EL ASISTENTE DE GRUPOS 🥸" 
El comando se usa: *${usedPrefix + command} asistente*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"🎭 | ASISTENTE GRUPOSROL"*
Descripcion: "ACTIVA O DESACTIVA EL ASISTENTE DE GRUPOS DE ROL" 
El comando se usa: *${usedPrefix + command} gruposrol*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"🥸 | CAPCIOSA"*
Descripcion: "ACTIVA O DESACTIVA LAS PREGUNTAS CAPCIOSAS 🥸" 
El comando se usa: *${usedPrefix + command} capciosa*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 *"🎭 | STICKERS"*
Descripcion: "ACTIVA O DESACTIVA LOS STICKERS GRACIOSOS" 
El comando se usa: *${usedPrefix + command} stickers*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
 ╰══╡✯✯✯✯✯✯✯✯✯✯╞══╯
`

    
    let isEnable = /true|enable|(turn)?on|1/i.test(command)
    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]
    let bot = global.db.data.settings[conn.user.jid] || {}
    let type = (args[0] || '').toLowerCase()
    let isAll = false, isUser = false
    switch (type) {
    case 'welcome':
    if (!m.isGroup) {
    if (!isOwner) {
    global.dfail('group', m, conn)
    throw false
    }
    } else if (!isAdmin) {
    global.dfail('admin', m, conn)
    throw false
    }
    chat.welcome = isEnable
    break
    case 'detect':
    if (!m.isGroup) {
    if (!isOwner) {
    global.dfail('group', m, conn)
    throw false
    }
    } else if (!isAdmin) {
    global.dfail('admin', m, conn)
    throw false
    }
    chat.detect = isEnable
    break
    case 'delete':
    if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn)
    throw false
    }}
    chat.delete = isEnable
    break
    case 'antidelete':
    if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn)
    throw false
    }}
    chat.delete = !isEnable
    break
    case 'public':
    isAll = true
    if (!isROwner) {
    global.dfail('rowner', m, conn)
    throw false
    }
    global.opts['self'] = !isEnable
    break
    case 'antilink':
    if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn)
    throw false
    }}
    chat.antiLink = isEnable
    break
    case 'antilink2':
    if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn)
    throw false
    }}
    chat.antiLink2 = isEnable 
    break
    case 'antiviewonce':
    if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn)
    throw false
    }}
    chat.antiviewonce = isEnable 
    break
    case 'modohorny':
    if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
    global.dfail('owner', m, conn)
    throw false
    }}
    chat.modohorny = isEnable          
    break
    case 'modoadmin':
    if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn)
    throw false
    }}
    chat.modoadmin = isEnable          
    break    
    case 'autosticker':
    if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn)
    throw false
    }}
    chat.autosticker = isEnable          
    break
    case 'audios':
    if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn)
    throw false
    }}
    chat.audios = isEnable          
    break
    case 'adminsot':
    if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn)
    throw false
    }}
    chat.adminsot = isEnable          
    break
    case 'restrict':
    isAll = true
    if (!isOwner) {
    global.dfail('owner', m, conn)
    throw false
    }
    bot.restrict = isEnable
    break
    case 'nyimak':
    isAll = true
    if (!isROwner) {
    global.dfail('rowner', m, conn)
    throw false
    }
    global.opts['nyimak'] = isEnable
    break
    case 'autoread':
    isAll = true
    if (!isROwner) {
    global.dfail('rowner', m, conn)
    throw false
    }
    global.opts['autoread'] = isEnable
    break
    case 'pconly':
    case 'privateonly':
    isAll = true
    if (!isROwner) {
    global.dfail('rowner', m, conn)
    throw false
    }
    global.opts['pconly'] = isEnable
    break
    case 'gconly':
    case 'grouponly':
    isAll = true
    if (!isROwner) {
    global.dfail('rowner', m, conn)
    throw false
    }
    global.opts['gconly'] = isEnable
    break
    case 'swonly':
    case 'statusonly':
    isAll = true
    if (!isROwner) {
    global.dfail('rowner', m, conn)
    throw false
    }
    global.opts['swonly'] = isEnable
    break
    case 'anticall':
    isAll = true
    if (!isROwner) {
    global.dfail('rowner', m, conn)
    throw false
    }
    bot.antiCall = isEnable
    break
    case 'antiprivado':
    isAll = true
    if (!isOwner) {
    global.dfail('owner', m, conn)
    throw false
    }
    bot.antiPrivate = isEnable
    break
    case 'modejadibot':
    isAll = true
    if (!isROwner) {
    global.dfail('rowner', m, conn)
    throw false
    }
    bot.modejadibot = isEnable
    break        
    case 'antitoxic':
    if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn)
    throw false
    }}
    chat.antiToxic = isEnable
    break
    case 'antitraba':
    if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn)
    throw false
    }}
    chat.antiTraba = isEnable
    break
    case 'antiarabes':
    if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn)
    throw false
    }}
    chat.antiArab = isEnable  
    break
    case 'modocomedia':
    if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn)
    throw false
    }}
    chat.modocomedia = isEnable
    break
    case 'asistente':
    if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn)
    throw false
    }}
    chat.asistente = isEnable
    break
    case 'gruposrol':
    if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn)
    throw false
    }}
    chat.gruposrol = isEnable
    break
    case 'capciosa':
    if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn)
    throw false
    }}
    chat.capciosa = isEnable
    break
    case 'stickers':
    if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn)
    throw false
    }}
    chat.stickers = isEnable
    break
    default:
    if (!/[01]/.test(command)) {
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
        let contextInfo = {  
            mentionedJid: conn.parseMention(txt),  
            "externalAdReply": {  
            "showAdAttribution": true,  
            "containsAutoReply": true,
            "renderLargerThumbnail": true,  
            "title": wm,   
            "containsAutoReply": true,  
            "mediaType": 1,   
            "thumbnail": imagen4,//apii.res.url,  
            "mediaUrl": `https://api.whatsapp.com/send/?phone=5215625406730&text=.serbot&type=phone_number&app_absent=0`,  
            "sourceUrl": `https://api.whatsapp.com/send/?phone=5215625406730&text=.serbot&type=phone_number&app_absent=0`  
            }  
            }  
            return conn.sendMessage(m.chat, {text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt)}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 })
            //throw false
    }
      
    break
    }
try {
        console.log('La consola dice que: '+ text)
    let resp = `🗂️ OPCIÓN: *${type}*\n🎚️ ESTADO: ${isEnable ? '*ACTIVADO*' : '*DESACTIVADO*'}\n📣 PARA: ${isAll ? '*ESTE BOT*' : isUser ? '' : '*ESTE CHAT*'}\n\n'Para ${isEnable ? 'desactivar' : 'activar'} esta opción, copia y pega el mensaje a continuacion para ${isEnable ? '*✖️ DESACTIVAR ✖️*' : '*✔️ ACTIVAR ✔️*'}'`
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
        await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: estado, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});
        try {
        await conn.sendMessage(m.chat, { text: `${isEnable ? /*'✖️ DESACTIVAR ✖️ ' + */`${usedPrefix}disable ${type}` : /*'✔️ ACTIVAR ✔️ ' + */`${usedPrefix}enable ${type}`}`}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )    
} catch (error) {
            
        }  

//    before() 
        
                
} catch (error) {
    console.log(error);
}
        
    
    }
    handler.help = ['en', 'dis'].map(v => v + 'able <option>')
    handler.tags = ['group', 'owner']
    handler.command = /^((en|dis)able|(tru|fals)e|(turn)?[01])$/i
    export default handler
/*
export async function before (m, isOwner, isAdmin) {
    //if (m.sender && /^(activar|desactivar)/i.test(m.text) && isOwner && isAdmin)
        if (m.quoted && m.quoted.text) {
            const quotedMessage = m.quoted.text
            console.log('La consola está recibiendo esto: ' + quotedMessage);
            console.log('La consola está recibiendo esto: ' + text);

        
            const activarRegex = new RegExp(`✔️ ACTIVAR ✔️`);
            const desactivarRegex = new RegExp(`✖️ DESACTIVAR ✖️`);
            if (activarRegex.test(quotedMessage)) {
                if (m.body === '.' || m.body === usedPrefix || usedPrefix === '.') {
                  chat.type = true;
                  console.log('Activando la función ' + type);
                }
              } else if (desactivarRegex.test(quotedMessage)) {
                if (m.body === '.' || m.body === usedPrefix || usedPrefix === '.') {
                  chat.type = false;
                  console.log('Desactivando la función ' + type);
                }
              }
        await conn.sendMessage(m.chat, { text: 'La acción se ha realizado correctamente.'.trim()}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
    }            
      
    }*/