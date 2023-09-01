import syntaxerror from "syntax-error";
import { format } from "util";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);

let handler = async (m, _2, msg, isOwner, pickRandom) => {
  let mention =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.quoted
      ? m.quoted.sender
      : false;
  let { conn, usedPrefix, noPrefix, args, groupMetadata } = _2;
  let _return;
  let name = conn.getName(m.sender);
  let _syntax = "";
  let _text = (/^=/.test(usedPrefix) ? "return " : "") + noPrefix;
  let old = m.exp * 1;
  try {
    let i = 15;
    let f = { exports: {} };
    let exec = new (async () => {}).constructor(
      "print",
      "m",
      "handler",
      "require",
      "conn",
      "Array",
      "process",
      "args",
      "groupMetadata",
      "module",
      "exports",
      "argument",
      _text
    );
    _return = await exec.call(
      conn,
      async (...args) => {
        if (--i < 1) return;
        console.log(...args);
        let resp = format(...args);
        let txt = "";
        let count = 0;
        for (const c of resp) {
          await new Promise((resolve) => setTimeout(resolve, 15));
          txt += c;
          count++;

          if (count % 10 === 0) {
            conn.sendPresenceUpdate("composing", m.chat);
          }
        }
        return conn.sendMessage(
          m.chat,
          { text: txt.trim(), mentions: conn.parseMention(txt) },
          {
            quoted: m,
            ephemeralExpiration: 24 * 60 * 100,
            disappearingMessagesInChat: 24 * 60 * 100,
          }
        );
      },
      m,
      handler,
      require,
      conn,
      CustomArray,
      process,
      args,
      groupMetadata,
      f,
      f.exports,
      [conn, _2]
    );
  } catch (e) {
    let err = syntaxerror(_text, "Execution Function", {
      allowReturnOutsideFunction: true,
      allowAwaitOutsideFunction: true,
      sourceType: "module",
    });
    if (err) _syntax = "```" + err + "```\n\n";
    _return = e;
  } finally {
    let resp = _syntax + format(_return);
    let txt = "";
    let count = 0;
    for (const c of resp) {
      await new Promise((resolve) => setTimeout(resolve, 15));
      txt += c;
      count++;

      if (count % 10 === 0) {
        conn.sendPresenceUpdate("composing", m.chat);
      }
    }
    conn.sendMessage(
      m.chat,
      { text: txt.trim(), mentions: conn.parseMention(txt) },
      {
        quoted: m,
        ephemeralExpiration: 24 * 60 * 100,
        disappearingMessagesInChat: 24 * 60 * 100,
      }
    );
    m.exp = old;
  }
};
handler.help = ["> ", "=> "];
handler.tags = ["advanced"];
handler.customPrefix = /^(=?>|~)/;
handler.command = /(?:)/i;

handler.rowner = true;

export default handler;

class CustomArray extends Array {
  constructor(...args) {
    if (typeof args[0] == "number") return super(Math.min(args[0], 10000));
    else return super(...args);
  }
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
