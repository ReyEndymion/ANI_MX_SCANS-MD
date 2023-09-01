import { smsg } from './lib/simple.js';
import { format } from 'util';
import { fileURLToPath } from 'url';
import path, { join } from 'path';
import { unwatchFile, watchFile } from 'fs';
import chalk from 'chalk';

/**
 * @type {import('@whiskeysockets/baileys')}
 */
const { proto } = (await import('@whiskeysockets/baileys')).default;
const isNumber = (x) => typeof x === 'number' && !isNaN(x);
const delay = (ms) =>
  isNumber(ms) &&
  new Promise((resolve) =>
    setTimeout(function () {
      clearTimeout(this);
      resolve();
    }, ms)
  );

/**
 * Handle messages upsert
 * @param {import('@whiskeysockets/baileys').BaileysEventMap<unknown>['messages.upsert']} groupsUpdate
 */
export async function handler(chatUpdate) {
  this.msgqueque = this.msgqueque || [];
  if (!chatUpdate) {
    return;
  }
  this.pushMessage(chatUpdate.messages).catch(console.error);
  let m = chatUpdate.messages[chatUpdate.messages.length - 1];
  if (!m) {
    return;
  }
  if (global.db.data == null) await global.loadDatabase();
  try {
    m = smsg(this, m) || m;
    if (!m) {
      return;
    }
    m.exp = 0;
    m.money = false;
    m.limit = false;
    try {
      // TODO: use loop to insert data instead of this
      let user = global.db.data.users[m.sender];
      if (typeof user !== 'object') {
        global.db.data.users[m.sender] = {};
      }
      if (user) {
        if (!isNumber(user.exp)) user.exp = 0;
        if (!isNumber(user.limit)) user.limit = 10;
        if (!isNumber(user.lastclaim)) user.lastclaim = 0;
        if (!('registered' in user)) user.registered = false;
        if (!user.registered) {
          if (!('name' in user)) user.name = m.name;
          if (!isNumber(user.age)) user.age = -1;
          if (!isNumber(user.regTime)) user.regTime = -1;
        }
        if (!isNumber(user.afk)) user.afk = -1;
        if (!('role' in user)) user.role = 'Novato';
        if (!('afkReason' in user)) user.afkReason = '';
        if (!('banned' in user)) user.banned = false;
        if (!isNumber(user.warn)) user.warn = 0;
        if (!isNumber(user.level)) user.level = 0;
        if (!('autolevelup' in user)) user.autolevelup = true;
        if (!isNumber(user.money)) user.money = 0;
        if (!isNumber(user.limit)) user.limit = 10;
        if (!isNumber(user.lastclaim)) user.lastclaim = 0;
      } else
        global.db.data.users[m.sender] = {
          exp: 0,
          limit: 10,
          lastclaim: 0,
          registered: false,
          name: m.name,
          age: -1,
          regTime: -1,
          afk: -1,
          afkReason: '',
          banned: false,
          warn: 0,
          level: 0,
          role: 'Novato',
          autolevelup: true,
          money: 0,
          limit: 10,
          lastclaim: 0,
          lastweekly: 0,
          lastmonthly: 0,
        };
      let chat = global.db.data.chats[m.chat];
      if (typeof chat !== 'object') global.db.data.chats[m.chat] = {};
      if (chat) {
        if (!('isBanned' in chat)) chat.isBanned = false;
        if (!('welcome' in chat)) chat.welcome = true;
        if (!('detect' in chat)) chat.detect = true;
        if (!('sWelcome' in chat)) chat.sWelcome = '';
        if (!('sBye' in chat)) chat.sBye = '';
        if (!('sPromote' in chat)) chat.sPromote = '';
        if (!('sDemote' in chat)) chat.sDemote = '';
        if (!('delete' in chat)) chat.delete = true;
        if (!('modohorny' in chat)) chat.modohorny = false;
        if (!('autosticker' in chat)) chat.autosticker = false;
        if (!('audios' in chat)) chat.audios = false;
        if (!('antiLink' in chat)) chat.antiLink = false;
        if (!('antiLink2' in chat)) chat.antiLink2 = false;
        if (!('antiviewonce' in chat)) chat.antiviewonce = false;
        if (!('antiToxic' in chat)) chat.antiToxic = false;
        if (!('antiTraba' in chat)) chat.antiTraba = false;
        if (!('antiArab' in chat)) chat.antiArab = false;
        if (!('modoadmin' in chat)) chat.modoadmin = false;
        if (!('simi' in chat)) chat.simi = false;
        if (!('stickers' in chat)) chat.stickers = false;
        if (!('asistente' in chat)) chat.asistente = false;
        if (!('gRol' in chat)) chat.gruposRol = false;
        if (!isNumber(chat.expired)) chat.expired = 1;
      } else
        global.db.data.chats[m.chat] = {
          isBanned: false,
          welcome: true,
          detect: true,
          sWelcome: '',
          sBye: '',
          sPromote: '',
          sDemote: '',
          delete: true,
          modohorny: true,
          autosticker: false,
          audios: true,
          antiLink: false,
          antiLink2: false,
          antiviewonce: false,
          antiToxic: false,
          antiTraba: false,
          antiArab: false,
          modoadmin: false,
          simi: false,
          stickers: true,
          asistente: false,
          gruposRol: false,
          expired: 0,
        };
      let settings = global.db.data.settings[this.user.jid];
      if (typeof settings !== 'object')
        global.db.data.settings[this.user.jid] = {};
      if (settings) {
        if (!('self' in settings)) settings.self = false;
        if (!('autoread' in settings)) settings.autoread = false;
        if (!('restrict' in settings)) settings.restrict = false;
        if (!('antiCall' in settings)) settings.antiCall = false;
        if (!('antiPrivate' in settings)) settings.antiPrivate = false;
        if (!('modejadibot' in settings)) settings.modejadibot = true;
      } else
        global.db.data.settings[this.user.jid] = {
          self: false,
          autoread: false,
          restrict: false,
          antiCall: false,
          antiPrivate: false,
          modejadibot: true,
        };
    } catch (e) {
      console.error(e);
    }
    if (opts['nyimak']) return;
    if (!m.fromMe && opts['self']) return;
    if (opts['pconly'] && m.chat.endsWith('g.us')) return;
    if (opts['gconly'] && !m.chat.endsWith('g.us')) return;
    if (opts['swonly'] && m.chat !== 'status@broadcast') return;
    if (typeof m.text !== 'string') m.text = '';

    const isROwner = [
      conn.decodeJid(global.conn.user.id),
      ...global.owner.map(([number]) => number),
    ]
      .map((v) => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
      .includes(m.sender);
    const isOwner = isROwner || m.fromMe;
    const isMods =
      isOwner ||
      global.mods
        .map((v) => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
        .includes(m.sender);
    const isPrems =
      isROwner ||
      global.prems
        .map((v) => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
        .includes(m.sender);

    if (opts['queque'] && m.text && !(isMods || isPrems)) {
      let queque = this.msgqueque,
        time = 1000 * 5;
      const previousID = queque[queque.length - 1];
      queque.push(m.id || m.key.id);
      setInterval(async function () {
        if (queque.indexOf(previousID) === -1) clearInterval(this);
        await delay(time);
      }, time);
    }

    if (m.isBaileys) return;
    m.exp += Math.ceil(Math.random() * 10);

    let usedPrefix;
    let _user =
      global.db.data && global.db.data.users && global.db.data.users[m.sender];

    const groupMetadata =
      (m.isGroup
        ? (conn.chats[m.chat] || {}).metadata ||
          (await this.groupMetadata(m.chat).catch((_) => null))
        : {}) || {};
    const participants = (m.isGroup ? groupMetadata.participants : []) || [];
    const user =
      (m.isGroup
        ? participants.find((u) => conn.decodeJid(u.id) === m.sender)
        : {}) || {}; // User Data
    const bot =
      (m.isGroup
        ? participants.find((u) => conn.decodeJid(u.id) == this.user.jid)
        : {}) || {}; // Your Data
    const isRAdmin = user?.admin == 'superadmin' || false;
    const isAdmin = isRAdmin || user?.admin == 'admin' || false; // Is User Admin?
    const isBotAdmin = bot?.admin || false; // Are you Admin?

    const ___dirname = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      './plugins'
    );
    for (let name in global.plugins) {
      let plugin = global.plugins[name];
      if (!plugin) continue;
      if (plugin.disabled) continue;
      const __filename = join(___dirname, name);
      if (typeof plugin.all === 'function') {
        try {
          await plugin.all.call(this, m, {
            chatUpdate,
            __dirname: ___dirname,
            __filename,
          });
        } catch (e) {
          // if (typeof e === 'string') continue
          console.error(e);
          for (let [jid] of global.owner.filter(
            ([number, _, isDeveloper]) => isDeveloper && number
          )) {
            let data = (await conn.onWhatsApp(jid))[0] || {};
            if (data.exists) {
              let resp = `*[REPORTE DE COMANDO CON FALLOS]*\n\n*PLUGIN:* ${name}\n*USUARIO:* ${m.sender}\n*COMANDO:* ${m.text}\n\n*ERROR:*\n\`\`\`${format(e)}\`\`\`\n\n*[!] REPORTELO AL CREADOR, EL TRATARA DE DARLE SOLUCIÓN, PUEDE USAR EL COMANDO #reporte*`.trim()
              let txt = '';
              let count = 0;
              for (const c of resp) {
              await new Promise(resolve => setTimeout(resolve, 15));
              txt += c;
              count++;
          
              if (count % 10 === 0) {
                  conn.sendPresenceUpdate('composing' , data.jid);
              }
              }
              conn.sendMessage(data.jid, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
              }
                    }
        }
      }
      if (!opts['restrict'])
        if (plugin.tags && plugin.tags.includes('admin')) {
          // global.dfail('restrict', m, this)
          continue;
        }
      const str2Regex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
      let _prefix = plugin.customPrefix
        ? plugin.customPrefix
        : conn.prefix
        ? conn.prefix
        : global.prefix;
      let match = (
        _prefix instanceof RegExp // RegExp Mode?
          ? [[_prefix.exec(m.text), _prefix]]
          : Array.isArray(_prefix) // Array?
          ? _prefix.map((p) => {
              let re =
                p instanceof RegExp // RegExp in Array?
                  ? p
                  : new RegExp(str2Regex(p));
              return [re.exec(m.text), re];
            })
          : typeof _prefix === 'string' // String?
          ? [
              [
                new RegExp(str2Regex(_prefix)).exec(m.text),
                new RegExp(str2Regex(_prefix)),
              ],
            ]
          : [[[], new RegExp()]]
      ).find((p) => p[1]);
      if (typeof plugin.before === 'function') {
        if (
          await plugin.before.call(this, m, {
            match,
            conn: this,
            participants,
            groupMetadata,
            user,
            bot,
            isROwner,
            isOwner,
            isRAdmin,
            isAdmin,
            isBotAdmin,
            isPrems,
            chatUpdate,
            __dirname: ___dirname,
            __filename,
          })
        )
          continue;
      }
      if (typeof plugin !== 'function') continue;
      if ((usedPrefix = (match[0] || '')[0])) {
        let noPrefix = m.text.replace(usedPrefix, '');
        let [command, ...args] = noPrefix.trim().split` `.filter((v) => v);
        args = args || [];
        let _args = noPrefix.trim().split` `.slice(1);
        let text = _args.join` `;
        command = (command || '').toLowerCase();
        let fail = plugin.fail || global.dfail; // When failed
        let isAccept =
          plugin.command instanceof RegExp // RegExp Mode?
            ? plugin.command.test(command)
            : Array.isArray(plugin.command) // Array?
            ? plugin.command.some((cmd) =>
                cmd instanceof RegExp // RegExp in Array?
                  ? cmd.test(command)
                  : cmd === command
              )
            : typeof plugin.command === 'string' // String?
            ? plugin.command === command
            : false;

        if (!isAccept) {
          continue;
        }
        m.plugin = name;
        if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
          let chat = global.db.data.chats[m.chat];
          let user = global.db.data.users[m.sender];
          const botSpam = global.db.data.settings[this.user.jid];

          if (!['owner-unbanchat.js', 'gc-link.js', 'gc-hidetag.js', 'info-creator.js'].includes(name) && chat && chat.isBanned && !isROwner) return; // Except this

          if (name != 'owner-unbanchat.js' && name != 'owner-exec.js' && name != 'owner-exec2.js' && name != 'tool-delete.js' && chat?.isBanned && !isROwner) return;

          if (m.text && user.banned && !isROwner) {
            if (typeof user.bannedMessageCount === 'undefined') {
              user.bannedMessageCount = 0;
            }

            if (user.bannedMessageCount < 3) {
              const messageNumber = user.bannedMessageCount + 1;
const messageText = `
╔═════════════════════════╗
 ❰ ⚠️ ❱ *¡USUARIO BANEADO!* ❰ ⚠️ ❱
—◉ *Aviso ${messageNumber}/3 (Total: 3)*
—◉ ${user.bannedReason ? `\n*Motivo:* ${user.bannedReason}` : '*Motivo:* Sin especificar'}
—◉ *Si consideras que esto es un error y cuentas con pruebas, puedes comunicarte con el propietario del Bot para apelar la suspensión.*
—◉ *Contacto para apelaciones:* wa.me/5219992095479
╚═════════════════════════╝
               `.trim();
              let resp = messageText;
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
              conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
              user.bannedMessageCount++;
            } else if (user.bannedMessageCount === 3) {
              user.bannedMessageSent = true;
            } else {
              return;
            }
            return;
          }
		
          if (botSpam.antispam && m.text && user && user.lastCommandTime && (Date.now() - user.lastCommandTime) < 5000 && !isROwner) {
            if (user.commandCount === 2) {
              const remainingTime = Math.ceil((user.lastCommandTime + 5000 - Date.now()) / 1000);
              if (remainingTime > 0) {
                const messageText = `*[ ⚠ ] Espera ${remainingTime} segundos antes de usar otro comando*`;
                m.reply(messageText);
                return;
              } else {
                user.commandCount = 0;
              }
            } else {
              user.commandCount += 1;
            }
          } else {
            user.lastCommandTime = Date.now();
            user.commandCount = 1;
          }
        }
        let hl = _prefix;
        let adminMode = global.db.data.chats[m.chat].modoadmin;
        let animxscans = `${plugin.botAdmin || plugin.admin || plugin.group || plugin || noPrefix || hl || m.text.slice(0, 1) == hl || plugin.command}`;
        if (adminMode && !isOwner && !isROwner && m.isGroup && !isAdmin && animxscans) return;

        if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner
          fail('owner', m, this);
          continue;
        }
        if (plugin.rowner && !isROwner) { // Real Owner
          fail('rowner', m, this);
          continue;
        }
        if (plugin.owner && !isOwner) { // Number Owner
          fail('owner', m, this);
          continue;
        }
        if (plugin.mods && !isMods) { // Moderator
          fail('mods', m, this);
          continue;
        }
        if (plugin.premium && !isPrems) { // Premium
          fail('premium', m, this);
          continue;
        }
        if (plugin.group && !m.isGroup) { // Group Only
          fail('group', m, this);
          continue;
        } else if (plugin.botAdmin && !isBotAdmin) { // You Admin
          fail('botAdmin', m, this);
          continue;
        } else if (plugin.admin && !isAdmin) { // User Admin
          fail('admin', m, this);
          continue;
        }
        if (plugin.private && m.isGroup) { // Private Chat Only
          fail('private', m, this);
          continue;
        }
        if (plugin.register == true && _user.registered == false) { // Butuh daftar?
          fail('unreg', m, this);
          continue;
        }
        m.isCommand = true;
        let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17; // XP Earning per command
        if (xp > 200) {
          let resp = 'Ngecit -_-';
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
          //conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
              } // Hehehe
        else {
          m.exp += xp;
        }
        if (!isPrems && plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 1) {
          let resp = `*[! INFO!] SUS DIAMANTES SE HAN AGOTADO, PUEDE COMPRAR MÁS USANDO EL COMANDO ${usedPrefix}buy <cantidad>*`;
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
          conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
          continue; // Limit habis
        }
        if (plugin.level > _user.level) {
          let resp = `*[❗INFO ❗] SE REQUIERE EL NIVEL ${plugin.level} PARA USAR ESTE COMANDO. TU NIVEL ES ${_user.level}*`;
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
          conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
          continue; // If the level has not been reached
        }
        let extra = {
          match,
          usedPrefix,
          noPrefix,
          _args,
          args,
          command,
          text,
          conn: this,
          participants,
          groupMetadata,
          user,
          bot,
          isROwner,
          isOwner,
          isRAdmin,
          isAdmin,
          isBotAdmin,
          isPrems,
          chatUpdate,
          __dirname: ___dirname,
          __filename,
        };
        try {
          await plugin.call(this, m, extra);
          if (!isPrems) {
            m.limit = m.limit || plugin.limit || false;
          }
        } catch (e) {
          // Error occured
          m.error = e;
          console.error(e);
          if (e) {
            let text = format(e);
            for (let key of Object.values(global.APIKeys)) {
              text = text.replace(new RegExp(key, 'g'), '#HIDDEN#');
            }
            if (e.name)
              for (let [jid] of global.owner.filter(
                ([number, _, isDeveloper]) => isDeveloper && number
              )) {
                let data = (await conn.onWhatsApp(jid))[0] || {};
                if (data.exists){
                  let resp = `*[¡REPORTE DE COMANDO CON FALLOS!]*\n\n*PLUGIN:* ${m.plugin}\n*USUARIO:* ${m.sender}\n*COMANDO:* ${usedPrefix}${command} ${args.join( ' ')}\n\n\`\`\`${text}\`\`\`\n\n*[!] REPORTELO AL CREADOR, EL TRATARA DE DARLE SOLUCION, PUEDE USAR EL COMANDO #reporte*`.trim()

                  let txt = '';
                  let count = 0;
                  for (const c of resp) {
                  await new Promise(resolve => setTimeout(resolve, 15));
                  txt += c;
                  count++;
              
                  if (count % 10 === 0) {
                      conn.sendPresenceUpdate('composing' , data.jid);
                  }
                  }
                  conn.sendMessage(data.jid, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
                   }
                }
            let resp = text;
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
            conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
                  }
        } finally {
          // m.reply(util.format(_user))
          if (typeof plugin.after === 'function') {
            try {
              await plugin.after.call(this, m, extra);
            } catch (e) {
              console.error(e);
            }
          }
          if (m.limit) { 
            let resp = +m.limit + ' DIAMANTE 💎 USADO';
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
            conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
                  }
        }
        break;
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    if (opts['queque'] && m.text) {
      const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id);
      if (quequeIndex !== -1) {
        this.msgqueque.splice(quequeIndex, 1);
      }
    }
    //console.log(global.db.data.users[m.sender])
    let user, stats = global.db.data.stats;
    if (m) {
      if (m.sender && (user = global.db.data.users[m.sender])) {
        user.exp += m.exp;
        user.limit -= m.limit * 1;
      }

      let stat;
      if (m.plugin) {
        let now = +new Date();
        if (m.plugin in stats) {
          stat = stats[m.plugin];
          if (!isNumber(stat.total)) {stat.total = 1;}
          if (!isNumber(stat.success)) {stat.success = m.error != null ? 0 : 1;}
          if (!isNumber(stat.last)) {stat.last = now;}
          if (!isNumber(stat.lastSuccess)) {stat.lastSuccess = m.error != null ? 0 : now;}
        } else {
          stat = stats[m.plugin] = {
            total: 1,
            success: m.error != null ? 0 : 1,
            last: now,
            lastSuccess: m.error != null ? 0 : now,
          };
        }
        stat.total += 1;
        stat.last = now;
        if (m.error == null) {
          stat.success += 1;
          stat.lastSuccess = now;
        }
      }
    }

    try {
      if (!opts['noprint']) await (await import(`./lib/print.js`)).default(m, this);
    } catch (e) {
      console.log(m, m.quoted, e);
    }
    const settingsREAD = global.db.data.settings[this.user.jid] || {};
    if (opts['autoread']) await this.readMessages([m.key]);
    if (settingsREAD.autoread2) await this.readMessages([m.key]);
    // if (settingsREAD.autoread2 == 'true') await this.readMessages([m.key])

    if (!m.fromMem && m.text.match(/(Rey Endymion|@5215517489568|@5215533827255|ANIMXSCANS|ANI MX SCANS)/gi)) {
      let emot = pickRandom([
        '🎃',
        '❤',
        '😘',
        '😍',
        '💕',
        '😎',
        '🙌',
        '⭐',
        '👻',
        '🔥',
      ]);
      this.sendMessage(m.chat, { react: { text: emot, key: m.key } });
    }
    function pickRandom(list) {
      return list[Math.floor(Math.random() * list.length)];
    }
  }
}

/**
 * Handle groups participants update
 * @param {import('@whiskeysockets/baileys').BaileysEventMap<unknown>['group-participants.update']} groupsUpdate
 * Tipo de dato para el stub de mensajes de WhatsApp
 * @typedef {import('@whiskeysockets/baileys').WAMessageStubType} WAMessageStubType
 */
export async function participantsUpdate({ id, conn, participants, action }) {

}
/**
 * Handle groups update
 * @param {import('@whiskeysockets/baileys').BaileysEventMap<unknown>['groups.update']} groupsUpdate
 */
export async function groupsUpdate(groupsUpdate) {

}

export async function callUpdate( callUpdate, conn, isAdmin, isBotAdmin, isOwner, isROwner, participants) {
  let ow = global.owner.filter((entry) => typeof entry[0] === 'string' && !isNaN(entry[0])).map((entry) => ({ jid: entry[0] })).slice(0).map(({ jid }) => `${participants.some((p) => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]}`).join` y `;
  let adm = global.espadmins.filter((entry) => typeof entry[0] === 'string' && !isNaN(entry[0])).map((entry) => ({ jid: entry[0] })).slice(0).map(({ jid }) => `${participants.some((p) => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]}`).join`, `;
  console.log(some);
  let sender = `@${m.sender.split`@`[0]}`;
  if (adm.includes(sender)) {
    console.log(
      `Este remitente ${sender} está en la lista, no lo puedo bloquear.`
    );
  } else {
    console.log(`Bloqueando usuario ${sender} con la función antiprivate.`);
  }
  let isAnticall = global.db.data.settings[this.user.jid].antiCall;
  if (!isAnticall) return;
  for (let nk of callUpdate) {
    if (nk.isGroup == false) {
      if (nk.status == 'offer') {
        let callmsg = `Hola *@${nk.from.split('@')[0]}*, las ${nk.isVideo ? 'videollamadas' : 'llamadas'} no están permitidas, serás bloqueado.\n-\nSi accidentalmente llamaste póngase en contacto con mi creador ${ow} para que te desbloquee!`;
        let txt = '';
        let count = 0;
        for (const c of callmsg) {
          await new Promise((resolve) => setTimeout(resolve, 5));
          txt += c;
          count++;
          if (count % 10 === 0) {
            conn.sendPresenceUpdate('composing', m.chat);
          }
        }
        await conn.sendMessage(nk.from, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100});
        //let data = global.owner.filter(([id, isCreator]) => id && isCreator)
        //await this.sendContact(nk.from, data.map(([id, name]) => [id, name]), false, { quoted: callmsg })
        let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;ℛℯ𝓎 ℰ𝓃𝒹𝓎𝓂𝒾ℴ𝓃;;;\nFN:ℛℯ𝓎 ℰ𝓃𝒹𝓎𝓂𝒾ℴ𝓃\nORG:ℛℯ𝓎 ℰ𝓃𝒹𝓎𝓂𝒾ℴ𝓃\nTITLE:\nitem1.TEL;waid=5215517489568:+521 5517489568\nitem1.X-ABLabel:ℛℯ𝓎 ℰ𝓃𝒹𝓎𝓂𝒾ℴ𝓃\nX-WA-BIZ-DESCRIPTION:[❗] ᴄᴏɴᴛᴀᴄᴛᴀ ᴀ ᴇsᴛᴇ ɴᴜᴍ ᴘᴀʀᴀ ᴄᴏsᴀs ɪᴍᴘᴏʀᴛᴀɴᴛᴇs.\nX-WA-BIZ-NAME:ℛℯ𝓎 ℰ𝓃𝒹𝓎𝓂𝒾ℴ𝓃\nEND:VCARD`;
        await this.sendMessage(
          nk.from,
          { contacts: { displayName: 'ℛℯ𝓎 ℰ𝓃𝒹𝓎𝓂𝒾ℴ𝓃', contacts: [{ vcard }] } },
          {quoted: callmsg, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100});
        await this.updateBlockStatus(nk.from, 'block');
      }
    }
  }
}

export async function deleteUpdate(message) {
  try {
    const { fromMe, id, participant } = message;
    if (fromMe) return;
    let msg = this.serializeM(this.loadMessage(id));
    if (!msg) return;
    let chat = global.db.data.chats[msg.chat] || {};
    if (chat.delete) return;
    let resp = `
━━━━⬣  *ANTI DELETE*  ⬣━━━━
*■ Nombre:* @${participant.split`@`[0]}
*■ Enviando el mensaje..*
*■ Para desactivar esta función escriba el comando:*
*—◉ #disable antidelete*
*—◉ #enable delete*
━━━━⬣  *ANTI DELETE*  ⬣━━━━
`.trim();
let txt = '';
let count = 0;
for (const c of resp) {
await new Promise(resolve => setTimeout(resolve, 15));
txt += c;
count++;

if (count % 10 === 0) {
    conn.sendPresenceUpdate('composing' , msg.chat);
}
}
conn.sendMessage(msg.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
this.copyNForward(msg.chat, msg).catch((e) => console.log(e, msg));
  } catch (e) {
    console.error(e);
  }
}

global.dfail = (type, m, conn) => {
  let msg = {
    rowner:
      '*[ ⚠️ *ALERTA* ⚠️ ] ESTE COMANDO SOLO PUEDE SER UTILIZADO POR EL/LA PROPIETARIO/A (OWNER) DEL BOT*',
    owner:
      '*[ ⚠️ *ALERTA* ⚠️ ] ESTE COMANDO SOLO PUEDE SER UTILIZADO POR EL/LA PROPIETARIO/A (OWNER) DEL BOT*',
    mods: '*[ ⚠️ *ALERTA* ⚠️ ] ESTE COMANDO SOLO PUEDE SER UTILIZADO POR MODERADORES Y EL/LA PROPIETARIO/A (OWNER) DEL BOT*',
    premium:
      '*[ ⚠️ *ALERTA* ⚠️ ] ESTE COMANDO SOLO PUEDE SER UTILIZADO POR USUARIOS PREMIUM Y EL/LA PROPIETARIO/A OWNER DEL BOT*',
    group:
      '*[ ⚠️ *ALERTA* ⚠️ ] ESTE COMANDO SOLO PUEDE SER UTILIZADO EN GRUPOS*',
    private:
      '*[ ⚠️ ALERTA ⚠️ ] ESTE COMANDO SOLO PUEDE SER UTILIZADO EN CHAT PRIVADO DEL BOT*',
    admin:
      '*[ ⚠️ ALERTA ⚠️ ] ESTE COMANDO SOLO PUEDE SER UTILIZADO POR ADMINS DEL GRUPO*',
    botAdmin:
      '*[ ⚠️ ALERTA ⚠️ ] PARA PODER USAR ESTE COMANDO ES NECESARIO QUE EL BOT SEA ADMIN, ASCENDER A ADMIN ESTE NUMERO*',
    unreg:
      '*[ 🛑 HEY!! ALTO, NO ESTAS REGISTRADO 🛑 ]*\n\n*—◉ PARA USAR ESTE COMANDO DEBES REGISTRARTE, USA EL COMANDO*\n*➣ #verificar nombre.edad*',
    restrict:
      '*[ ⚠️ ALERTA ⚠️ ] ESTE COMANDO ESTA RESTRINGIDO/DESACTIVADO POR DESICION DEL PROPIETARIO/A (OWNER) DEL BOT*',
  }[type];
  if (msg) {
    //m.reply(msg)
    let txt = '';
    let count = 0;
    for (const c of msg) {
      new Promise((resolve) => setTimeout(resolve, 15));
      txt += c;
      count++;

      if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing', m.chat);
      }
    }
    conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100});
  }
};

let file = global.__filename(import.meta.url, true);
watchFile(file, async () => {
  unwatchFile(file);
  console.log(chalk.redBright(`Se actualizo "handler.js"`));
  if (global.reloadHandler) console.log(await global.reloadHandler());
});
