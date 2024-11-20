let confimacion = {}
let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner, text }) => {
    let resp, context, q
    let name = await conn.getName(m.sender)
    let img = imagen4
    let pp = imagen1
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender 
    let mentionedJid = [who]
    let userm =  `@${who.split(`@s.whatsapp.net`)[0]}` && `@${who.replace(/@.+/, '')}`
    let userg =  await conn.getName(m.chat)

    
    let isEnable = /true|enable|(turn)?on|1/i.test(command)
    var bot = global.db.data.bot[conn.user.jid] || {}
    const chats = bot.chats || {}
    const privs = chats.privs || {}
    const groups = chats.groups || {}
    let chat, users, user
    if (m.chat.endsWith(userID)) {
    chat = privs[m.chat] || {}
    user = privs[m.sender] || {}
    } else if (m.chat.endsWith(groupID)) {
    chat = groups[m.chat] || {}
    users = chat.users || {}
    user = users[m.sender] || {}
    } else return

    const settings = bot.settings || {}
    let type = (args[0] || '').toLowerCase()
    let isAll = false, isUser = false
    switch (type) {
    //GRUPOS
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
    //OWNER
    case 'restrict':
    isAll = true
    if (!isOwner) {
    global.dfail('owner', m, conn)
    throw false
    }
    settings.restrict = isEnable
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
    global.dfail('owner', m, conn)
    throw false
    }
    settings.antiCall = isEnable
    break
    case 'antiprivado':
    isAll = true
    if (!isOwner) {
    global.dfail('owner', m, conn)
    throw false
    }
    settings.antiPrivate = isEnable
    break
    case 'modejadisettings':
    isAll = true
    if (!isROwner) {
    global.dfail('rowner', m, conn)
    throw false
    }
    settings.modejadibot = isEnable
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
    case 'stickers':
    if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn)
    throw false
    }}
    chat.stickers = isEnable
    break
    default:
break
}
        // && type ==! ''/[01]/.test(command)
console.log(`enable: ${type}`)
if (type) {
resp = `🗂️ OPCIÓN: *${type}*\n🎚️ ESTADO: ${isEnable ? '*ACTIVADO*' : '*DESACTIVADO*'}\n📣 PARA: ${isAll ? '*ESTE BOT*' : isUser ? '' : '*ESTE CHAT*'}\n\n'Para ${isEnable ? 'desactivar' : 'activar'} esta opción, contesta este mensaje a continuacion con la palabra ${isEnable ? '*desactivar*' : '*activar*'}'`
context = false
// if (args[0])
} else {
resp = `
 ╭══╡✯✯✯✯✯✯✯✯✯✯╞══╮
║━━━━━━━━━━━━━━━━━━━━
║➤ *✨HOLA, ${userm}!!**
║━━━━━━━━━━━━━━━━━━━━
*Escribe alguna de las opciones de los comandos de la siguiente lista a continuación:*
     *LISTA DE OPCIONES*
║━━━━━━━━━━━━━━━━━━━━
*"✨ | WELCOME" => ${usedPrefix + command} welcome*
║━━━━━━━━━━━━━━━━━━━━
 *"🌎 | MODO PUBLICO" => ${usedPrefix + command} public*
║━━━━━━━━━━━━━━━━━━━━
 *"🥵 | MODO HORNY" => ${usedPrefix + command} modohorny*
║━━━━━━━━━━━━━━━━━━━━
 *"🔗 | ANTILINK" => ${usedPrefix + command} antilink*
║━━━━━━━━━━━━━━━━━━━━
 *"🔗 | ANTILINK 2" => ${usedPrefix + command} antilink2*
║━━━━━━━━━━━━━━━━━━━━
 *"🔎 | DETECT" => ${usedPrefix + command} detect*
║━━━━━━━━━━━━━━━━━━━━
 *"❗ | RESTRICT" => ${usedPrefix + command} restrict*
║━━━━━━━━━━━━━━━━━━━━
 *"☑️ | AUTOREAD" => ${usedPrefix + command} autoread*
║━━━━━━━━━━━━━━━━━━━━
 *"🔊 | AUDIOS" => ${usedPrefix + command} audios*
║━━━━━━━━━━━━━━━━━━━━
 *"👾 | AUTOSTICKER" => ${usedPrefix + command} autosticker*
║━━━━━━━━━━━━━━━━━━━━
 *"💬 | PCONLY" => ${usedPrefix + command} pconly*
║━━━━━━━━━━━━━━━━━━━━
 *"🏢 | GCONLY" => ${usedPrefix + command} gconly*
║━━━━━━━━━━━━━━━━━━━━
 *"❌ | ANTIVIEWONCE" => ${usedPrefix + command} antiviewonce*
║━━━━━━━━━━━━━━━━━━━━
 *"📵 | ANTILLAMADA" => ${usedPrefix + command} anticall*
║━━━━━━━━━━━━━━━━━━━━
 *"💬 | ANTIPRIVADO" => ${usedPrefix + command} antiprivado*
║━━━━━━━━━━━━━━━━━━━━
 *"🤬 | ANTITOXIC" => ${usedPrefix + command} antitoxic*
║━━━━━━━━━━━━━━━━━━━━
 *"🕸️ | ANTITRABAS" => ${usedPrefix + command} antitraba*
║━━━━━━━━━━━━━━━━━━━━
 *"👎🏻 | ANTIARABES" => ${usedPrefix + command} antiarabes*
║━━━━━━━━━━━━━━━━━━━━
 *"🤖 | MODEJADIBOT" => ${usedPrefix + command} modejadibot*
║━━━━━━━━━━━━━━━━━━━━
 *"👑 | MODOADMIN" => ${usedPrefix + command} modoadmin*
║━━━━━━━━━━━━━━━━━━━━
 *"🥸 | ASISTENTE" => ${usedPrefix + command} asistente*
║━━━━━━━━━━━━━━━━━━━━
 *"🎭 | ASISTENTE GRUPOSROL" => ${usedPrefix + command} gruposrol*
║━━━━━━━━━━━━━━━━━━━━
 ╰══╡✯✯✯✯✯✯✯✯✯✯╞══╯`
context = true
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

if (context) {
        let contextInfo = {  
            mentionedJid: conn.parseMention(txt),  
            "externalAdReply": {  
            "showAdAttribution": true,  
            "containsAutoReply": true,
            "renderLargerThumbnail": true,  
            "title": wm,   
            "containsAutoReply": true,  
            "mediaType": 1,   
            "thumbnail": imagen4,  
"mediaUrl": paypal,  
"sourceUrl": paypal  
}  
}  
return conn.sendMessage(m.chat, {text: txt.trim(), contextInfo: contextInfo, mentions: conn.parseMention(txt)}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 })
} else {
q = await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: estado, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});

confimacion[m.sender] = {
    sender: m.sender,
    isEnable: isEnable,
    type: type,
    chat: chat,
    user: user,
    settings: settings,
    message: args[0],
    quoted: q,
    timeout: setTimeout(async () => {
  delete confimacion[m.sender]}, 60 * 1000)
}
}        //throw false
/**
 */   
context = ''
}
handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['group', 'owner']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?[01])$/i
handler.before = async function before (m, {conn, text, isOwner, isAdmin, command, args}) {
const confirmation = Object.values(confimacion).find(c => c.sender === m.sender);
if (!confirmation) return;
let resp
const regEx = /(des)?(activar)/i.test(m.text)
//console.log('before config enable: ',  regEx);
if (regEx)  {
const { sender, isEnable, message, quoted, type, timeout, chat, user, settings } = confirmation;
let analiztxt = (m.quoted ? m.quoted?.text : m.text ) || m.caption;
let regexIsEnable = /🎚️ ESTADO: (.+)/g;
let matchM = analiztxt.match(regexIsEnable);
const activarRegex = `ACTIVAR`.toLowerCase();
const desactivarRegex = `DESACTIVAR`.toLowerCase();
//.test(matchM).test(matchM)sender &&  && type
let activadoRGX = new RegExp('ACTIVADO')
let desactivadoRGX = new RegExp('DESACTIVADO')
if (desactivadoRGX.test(matchM) && activarRegex === m.text.toLowerCase()) {
(chat||settings)[type] = true;
resp = `${isEnable ? `✖️ *DESACTIVADO* ✖️\nFunción ${type}` : `✔️ *ACTIVADO* ✔️\nFunción ${type}`}`  
//console.log(resp = 'Activando la función ' + type);
} else if (activadoRGX.test(matchM) && desactivarRegex === m.text.toLowerCase()) {
(chat||settings)[type] = false;
resp = `${isEnable ? `✖️ *DESACTIVADO* ✖️\nFunción ${type}` : `'✔️ *ACTIVADO* ✔️\nFunción ${type}`}`  
//console.log(resp = 'Desactivando la función ' + type);
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
    return conn.sendMessage(m.chat, { text: resp.trim()}, {quoted: quoted, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
}
export default handler
    /*
console.log('La consola está recibiendo esto: ', { sender, message, type });
if (m.body === '.' || m.body === usedPrefix || usedPrefix === '.') {
if (m.body === '.' || m.body === usedPrefix || usedPrefix === '.') {
              }
}
 */
        
