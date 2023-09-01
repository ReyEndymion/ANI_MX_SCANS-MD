let handler = async (m, { conn, command, text }) => {
    const startComposing = (conn, m) => {
        conn.sendPresenceUpdate('composing', m.chat);
    };
    
    const stopComposing = (conn, m) => {
        conn.sendPresenceUpdate('paused', m.chat);
    };
let boost1 = `*${pickRandom(['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'])}%*`
let boost2 = `*${pickRandom(['21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40'])}%*`
let boost3 = `*${pickRandom(['41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60'])}%*`
let boost4 = `*${pickRandom(['61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80'])}%*`
let boost5 = `*${pickRandom(['81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100'])}%*`

      const lovePercentage = Math.floor(Math.random() * 100);
      const isHighLove = lovePercentage >= 50;
      const loveMessages = [
        `¡Eso es un amor ardiente y apasionado! ¡Ve y díselo ahora mismo!`,
        `Parece que hay una chispa entre ustedes dos. ¡Inténtalo!`,
        `Podría haber algo especial aquí. ¡Dale una oportunidad!`,
        `Hmm, el amor está en el aire. ¡Quizás sea hora de un café juntos!`,
        `Las estrellas indican que hay un potencial romántico. ¡Haz un movimiento!`,
        `Una historia de amor increíble podría estar esperando para ser escrita por ustedes.`,
        `No subestimen el poder del tiempo y la paciencia en el amor. Grandes cosas pueden suceder.`,
        `Recuerden que el amor es un viaje, y cada paso es valioso, sin importar la distancia.`,
        `Las conexiones fuertes pueden convertirse en relaciones hermosas. ¡Sigan explorando!`,
        `El amor verdadero a menudo requiere tiempo y esfuerzo. ¡No renuncien!`,
        `Deberias pedirle que sea tu novia/o?`,
      ];
      const notSoHighLoveMessages = [
        `A veces, la amistad es el comienzo de algo hermoso, pero no siempre se convierte en amor.`,
        `El amor no es todo, ¡la amistad también es genial! Mantengan su amistad especial.`,
        `Recuerda que las mejores relaciones comienzan con una buena amistad. ¡No subestimen su vínculo!`,
        `A veces, el amor puede crecer con el tiempo. ¡Sigan fortaleciendo su conexión!`,
        `La vida es una sorpresa, ¡quién sabe qué depara el futuro! No pierdan la esperanza.`,
        `Aunque el amor no florezca como esperaban, su conexión sigue siendo valiosa.`,
        `Los corazones pueden tardar en sincronizarse, pero eso no disminuye lo especial que son juntos.`,
        `A pesar de los desafíos del amor, su amistad es un regalo que merece ser celebrado.`,
        `El tiempo puede revelar cosas sorprendentes. ¡Sigamos explorando juntos!`,
        `La vida está llena de giros inesperados. ¡Permanezcan abiertos a las posibilidades!`,
        `Deberias pedirle que sea tu amiga/o?`,
      ];
      const amorPropioMessages = [
        `Te amas a ti mismo más de lo que nadie podría.`,
        `Eres increíble y mereces todo el amor.`,
        `El amor propio es la base de todas las relaciones.`,
        `Aprender a amarte a ti mismo es un regalo.`,
        `Eres digno de amor y cariño, incluso de ti mismo.`,
        `Amarse a uno mismo es un acto valiente.`,
        `El amor propio es la clave para una vida feliz.`,
        `Eres una persona increíble y mereces amor.`,
        `Amar a ti mismo te hace más fuerte.`,
        `Tu amor propio es una inspiración para otros.`,
        `El amor propio es un viaje hermoso.`
    ];
    
    const noAmorAmistadMessages = [
        `A veces, las conexiones no son de amor sino de amistad.`,
        `La amistad puede ser tan valiosa como el amor.`,
        `Las conexiones amistosas también tienen su magia.`,
        `La amistad es una forma hermosa de amor.`,
        `El amor puede ser complejo, pero la amistad es genuina.`,
        `Las amistades pueden durar toda la vida.`,
        `La amistad puede crecer con el tiempo y ser tan valiosa como el amor.`,
        `El amor no siempre es la respuesta, la amistad también importa.`,
        `A veces, la amistad es lo que necesitamos más.`,
        `La amistad es un regalo precioso en sí mismo.`,
        `No todas las conexiones son de amor, pero todas son importantes.`
    ];
    const noAmorPropioMessages = [
        `¡Recuerda que eres increíble tal como eres! Valórate y quiérete a ti mismo.`,
        `Tu amor propio es fundamental. Eres único y especial.`,
        `No necesitas aprobación externa para sentirte valioso. Eres suficiente por ti mismo.`,
        `Ámate a ti mismo antes que a nadie. Eres tu prioridad y mereces ser feliz.`,
        `Eres un ser humano maravilloso. No dejes que la falta de amor externo te afecte.`,
        `Tu amor propio te empodera. No necesitas depender del amor de otros para sentirte bien contigo mismo.`,
        `Eres tu mejor compañía. Aprende a disfrutar de tu propia compañía y a cuidarte.`,
        `No te compares con los demás. Eres único y tienes tus propias cualidades excepcionales.`,
        `La relación más importante es la que tienes contigo mismo. Cuídate y quiérete cada día más.`,
        `Eres capaz de superar cualquier obstáculo. Confía en tu fuerza y valentía.`,
        `Eres valioso y mereces lo mejor. No te conformes con menos de lo que mereces.`,
    ];
    const getRandomMessage = (messages) => messages[Math.floor(Math.random() * messages.length)];
    let loveDescription = "";

    let loveMessage = "";
    let loveMessagesList = [];
    
    if (isHighLove && text) {
        loveMessagesList = loveMessages;
        loveDescription = `${text? text : '@' + m.sender.split('@')[0]} y @${m.sender.split('@')[0]} tienen una conexión profunda y un amor`;
    } else if (!isHighLove && text) {
        loveMessagesList = notSoHighLoveMessages;
        loveDescription = `${text? text : '@' + m.sender.split('@')[0]} y @${m.sender.split('@')[0]} tienen una conexión especial, aunque en el amor su porcentaje es`;
    } else if (lovePercentage === 0) {
        loveDescription = `No parece haber amor ni amistad en el aire entre ${text? text : '@' + m.sender.split('@')[0]} y @${m.sender.split('@')[0]}`;
    } else if (isHighLove && !text) {
        loveMessagesList = amorPropioMessages;
        loveDescription = `@${m.sender.split('@')[0]} te amas a ti mismo`;
    } else if (!isHighLove && !text) {
        loveMessagesList = noAmorPropioMessages;
        loveDescription = `@${m.sender.split('@')[0]} mereces amarte a ti mismo`;
    }
    
    loveMessage = getRandomMessage(loveMessagesList);
    
    let love = "";

    if (!text) {
        love = `*❤️❤️ MEDIDOR DE AMOR PROPIO ❤️❤️*\n${loveDescription} del ${lovePercentage}% de un 100%\n\n*❥ ${loveMessage}*`.trim();
    } else if (text) {
        love = `━━━━━━━⬣❤️❤️ *LOVE* ❤️❤️⬣━━━━━━━\n` +
            `*❥ En el universo del amor, ${loveDescription} del ${lovePercentage}% de un 100%*\n\n*❥ ${loveMessage}*\n` +
            `━━━━━━━⬣ *LOVE* ⬣━━━━━━━`.trim();
    }           
let txt = '';
let count = 0;
for (const c of love) {
    await new Promise(resolve => setTimeout(resolve, 10));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
async function loading() {
    var hawemod = [
        `《 █▒▒▒▒▒▒▒▒▒▒▒》${boost1}`,
        `《 ████▒▒▒▒▒▒▒▒》${boost2}`,
        `《 ███████▒▒▒▒▒》${boost3}`,
        `《 ██████████▒▒》${boost4}`,
        `《 ████████████》${boost5}`
        ]
       let { key } = await conn.sendMessage(m.chat, {text: `*💞 ¡Calculando Porcentaje! 💞*`, mentions: conn.parseMention(txt)}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
    for (let i = 0; i < hawemod.length; i++) {
await new Promise(resolve => setTimeout(resolve, 1000)); 
    startComposing(conn, m);
await conn.sendMessage(m.chat, {text: hawemod[i], edit: key, mentions: conn.parseMention(txt)}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}); 
      }
      stopComposing(conn, m);
       await conn.sendMessage(m.chat, {text: txt, edit: key, mentions: conn.parseMention(txt)}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});  
      return       
     }
    loading()  }
handler.help = ['love']
handler.tags = ['fun']
handler.command = /^(love)$/i
export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]}
    