global.math = global.math ? global.math : {};

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let mat = `*[❗INFO❗] INGRESE LA DIFICULTAD CON LA QUE DESEA JUGAR*\n\n*DIFICULTADES DISPONIBLES: ${Object.keys(modes).join(' | ')}*\n\n*EJEMPLO DE USO: ${usedPrefix}mates medium*\n\nMates disponibles:\n- Mates Easy: ${usedPrefix + command} easy\n- Mates Medium: ${usedPrefix + command} medium\n- Mates Hard: ${usedPrefix + command} hard`.trim();
let txt = '';
let count = 0;
for (const c of mat) {
    await new Promise(resolve => setTimeout(resolve, 20));
    txt += c;
    count++;
    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
  if (args.length < 1) return await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});
  
let mode = args[0].toLowerCase()

  if (!(mode in modes)) return await conn.sendMessage(m.chat, { text: mat, mentions: conn.parseMention(mat) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 });
  
let id = m.chat
if (id in global.math) {
    let resp = '*[❗INFO❗] TODAVÍA HAY PREGUNTAS SIN RESPONDER EN ESTE CHAT!*';
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 20));
    txt += c;
    count++;
    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
   return conn.sendMessage(m.chat, { text: txt, mentions: conn.parseMention(txt) }, {quoted: global.math[id][0], ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 });
  }
let math = genMath(mode)
let resp = `CUANTO ES EL RESULTADO DE *${math.str}*?\n\n*⏳ TIEMPO: ${(math.time / 1000).toFixed(2)} _segundos_*\n*🏆 GANA HASTA: ${math.bonus} XP*`.trim()
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
global.math[id] = [
    await conn.sendMessage(m.chat, { text: resp, mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 }),
    math, 4,
setTimeout(() => {
      if (global.math[id]) {
        let resp = `*[❗INFO❗] SE HA FINALIZADO EL TIEMPO PARA RESPONDER*\n\n*LA RESPUESTA ES ${math.result}*`;
        for (const c of resp) {
          new Promise(resolve => setTimeout(resolve, 50));
          txt += c;
          count++;
      
          if (count % 10 === 0) {
              conn.sendPresenceUpdate('composing' , m.chat);
          }
      }
      conn.sendMessage(m.chat, { text: resp, mentions: conn.parseMention(txt) }, {quoted: global.math[id][0], ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 })
        delete global.math[id];
      }
    }, math.time)
  ];
};

handler.help = ['math <mode>'];
handler.tags = ['game'];
handler.command = /^math|mates|matemáticas/i;
export default handler;

let modes = {
  noob: [-3, 3, -3, 3, '+-', 15000, 10],
  easy: [-10, 10, -10, 10, '*/+-', 20000, 40],
  medium: [-40, 40, -20, 20, '*/+-', 40000, 150],
  hard: [-100, 100, -70, 70, '*/+-', 60000, 350],
  extreme: [-999999, 999999, -999999, 999999, '*/', 99999, 9999],
  impossible: [-99999999999, 99999999999, -99999999999, 999999999999, '*/', 30000, 35000],
  impossible2: [-999999999999999, 999999999999999, -999, 999, '/', 30000, 50000]
};

let operators = {
  '+': '+',
  '-': '-',
  '*': '×',
  '/': '÷'
};

function genMath(mode) {
  let [a1, a2, b1, b2, ops, time, bonus] = modes[mode];
  let a = randomInt(a1, a2);
  let b = randomInt(b1, b2);
  let op = pickRandom([...ops]);
  let result = (new Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`))();

  if (op == '/') {
    [a, result] = [result, a];
  }

  return {
    str: `${a} ${operators[op]} ${b}`,
    mode,
    time,
    bonus,
    result
  };
}

function randomInt(from, to) {
  if (from > to) [from, to] = [to, from];
  from = Math.floor(from);
  to = Math.floor(to);
  return Math.floor((to - from) * Math.random() + from);
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
