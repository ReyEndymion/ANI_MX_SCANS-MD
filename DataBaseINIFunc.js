/**
 * Nueva y original estructura de la base de datos desarrollada por https://github.com/ReyEndymion
 * 
 * 3 funciones principales:
 * @callback dataPrivsChats 
 * @param {Object} sock - propiedades de conn
 * @param {string} chatID - chat privado
 * @param {string} senderID - chatID del usuario
 * 
 * @callback dataGroupsChats 
 * @param {Object} sock - propiedades de conn
 * @param {string} chatID - grupo
 * @callback dataGroupUsers 
 * @param {Object} sock - propiedades de conn
 * @param {string} chatID - grupo
 * @param {string} participant - participante
 */
const isNumber = (x) => typeof x === 'number' && !isNaN(x);
export async function dataPrivsChats(sock, db, chatID, senderID) {
const botID = sock.user.jid
const chat = db.data.bot[botID].chats.privs[chatID]
if (typeof chat !== 'object') db.data.bot[botID].chats.privs[chatID] = {};
if (chat) {
if (!('sender' in chat)) chat.sender = senderID;
if (!('user' in chat)) chat.user = chatID;
if (!('isBanned' in chat)) chat.isBanned = false;
if (!('muteconsole' in chat)) chat.muteconsole = false;
if (!('delete' in chat)) chat.delete = true;
if (!('autosticker' in chat)) chat.autosticker = false;
if (!('autoreac' in chat)) chat.autoreac = false;
if (!('audios' in chat)) chat.audios = false;
if (!('antiviewonce' in chat)) chat.antiviewonce = false;
if (!('antiToxic' in chat)) chat.antiToxic = false;
if (!('simi' in chat)) chat.simi = false;
if (!('stickers' in chat)) chat.stickers = false;
if (!('asistente' in chat)) chat.asistente = false;
if (!('ia' in chat)) chat.ia = false;
if (!isNumber(chat.expired)) chat.expired = 1;
if (!('lang' in chat)) chat.lang = 'es';
} else {
db.data.bot[botID].chats.privs[chatID] = {
sender: senderID,
isBanned: false,
muteconsole: false,
delete: true,
modohorny: true,
autosticker: false,
autoreac: false,
audios: true,
antiviewonce: false,
simi: false,
stickers: true,
asistente: false,
ia: false,
expired: 0,
lang: 'es'
}
}
}

export async function dataGroupsChats(sock, db, group) {
const botID = sock.user.jid
const chat = db.data.bot[botID].chats.groups[group];
if (typeof chat !== 'object') db.data.bot[botID].chats.groups[group] = {};
const nameChat = await sock.getName(group)
if (chat) {
if (!('nameChat' in chat)) chat.nameChat = nameChat;
if (!('isBanned' in chat)) chat.isBanned = false;
if (!('muteconsole' in chat)) chat.muteconsole = false;
if (!('welcome' in chat)) chat.welcome = true;
if (!('bye' in chat)) chat.bye = true;
if (!('isCountMsgs' in chat)) chat.isCountMsgs = false;
if (!('detect' in chat)) chat.detect = true;
if (!('sWelcome' in chat)) chat.sWelcome = '';
if (!('sBye' in chat)) chat.sBye = '';
if (!('sPromote' in chat)) chat.sPromote = '';
if (!('sDemote' in chat)) chat.sDemote = '';
if (!('delete' in chat)) chat.delete = false;
if (!('modohorny' in chat)) chat.modohorny = false;
if (!('autosticker' in chat)) chat.autosticker = false;
if (!('autoreac' in chat)) chat.autoreac = true;
if (!('audios' in chat)) chat.audios = false;
if (!('antiLink' in chat)) chat.antiLink = false;
if (!('antiLink2' in chat)) chat.antiLink2 = false;
if (!('antispam' in chat)) chat.antispam = false;
if (!('antiviewonce' in chat)) chat.antiviewonce = false;
if (!('antiToxic' in chat)) chat.antiToxic = false;
if (!('antiTraba' in chat)) chat.antiTraba = false;
if (!('antiArab' in chat)) chat.antiArab = false;
if (!('antiporno' in chat)) chat.antiporno = false;
if (!('modoadmin' in chat)) chat.modoadmin = false;
if (!('simi' in chat)) chat.simi = false;
if (!('stickers' in chat)) chat.stickers = false;
if (!('asistente' in chat)) chat.asistente = false;
if (!('ia' in chat)) chat.ia = false;
if (!('users' in chat)) chat.users = {};
if (!('gRol' in chat)) chat.gruposRol = false;
if (!isNumber(chat.expired)) chat.expired = 0;
} else
db.data.bot[botID].chats.groups[group] = {
nameChat: nameChat,
muteconsole: false,
isBanned: false,
welcome: true,
bye: true,
isCountMsgs: false,
detect: true,
sWelcome: '',
sBye: '',
sPromote: '',
sDemote: '',
delete: true,
modohorny: true,
autosticker: false,
autoreac: true,
audios: true,
antiLink: false,
antiLink2: false,
antispam: false,
antiviewonce: false,
antiToxic: false,
antiTraba: false,
antiArab: false,
antiArab2: false,
antiporno: false,
modoadmin: false,
simi: false,
stickers: true,
asistente: false,
ia: false,
users: {},
gruposRol: false,
expired: 0,
};

}

export async function dataGroupUsers(sock, db, group, participant) {
const botID = sock.user.jid
const user = db.data.bot[botID].chats.groups[group].users[participant];
if (typeof user !== 'object') {
db.data.bot[botID].chats.groups[group].users[participant] = {};
}
const nameW = await sock.getName(participant)
if (user) {
//datos usuario
if (!('lang' in user)) user.lang = 'es';
if (!('registered' in user)) user.registered = false;
if (!user.registered) {
if (!('name' in user)) user.name = nameW;
if (!isNumber(user.age)) user.age = -1;
if (!isNumber(user.regTime)) user.regTime = -1;
if (!isNumber(user.premiumDate)) user.premiumDate = -1;
}
//control usuario
if (!isNumber(user.afk)) user.afk = -1;
if (!('premium' in user)) user.premium = false;
if (!('banned' in user)) user.banned = false;
if (!('lastCommandTime' in user)) user.lastCommandTime = 0;
if (!('lastCommandUsed' in user)) user.lastCommandUsed = '';
if (!('commandCount' in user)) user.commandCount = 0;
if (!('bannedMessageCount' in user)) user.bannedMessageCount = 0;
if (!('BannedReason' in user)) user.BannedReason = 'SPAM';
if (!('afkReason' in user)) user.afkReason = '';
if (!isNumber(user.antispam)) user.antispam = 0;
if (!isNumber(user.antispamlastclaim)) user.antispamlastclaim = 0;
if (!user.premium) user.premium = false;
if (!user.premium) user.premiumTime = 0;
if (!('msgcount' in user)) user.msgcount = {};
if (!isNumber(user.msgcount.count)) {user.msgcount.count = 0;}
if (!isNumber(user.msgcount.time)) {user.msgcount.time = 0;}
//rol usuario
if (!isNumber(user.exp)) user.exp = 0;
if (!isNumber(user.joincount)) user.joincount = 2;
if (!isNumber(user.limit)) user.limit = 20;
if (!isNumber(user.money)) user.money = 15;
if (!('autolevelup' in user)) user.autolevelup = true;
if (!('role' in user)) user.role = 'Novato';
if (!isNumber(user.agility)) user.agility = 0;
if (!isNumber(user.anakanjing)) user.anakanjing = 0;
if (!isNumber(user.anggur)) user.anggur = 0;
if (!isNumber(user.apel)) user.apel = 0;
if (!isNumber(user.bibitanggur)) user.bibitanggur = 0;
if (!isNumber(user.bibitapel)) user.bibitapel = 0;
if (!isNumber(user.bibitjeruk)) user.bibitjeruk = 0;
if (!isNumber(user.bibitmangga)) user.bibitmangga = 0;
if (!isNumber(user.bibitpisang)) user.bibitpisang = 0;
if (!isNumber(user.emas)) user.emas = 0;
if (!isNumber(user.jeruk)) user.jeruk = 0;
if (!isNumber(user.kayu)) user.kayu = 0;
if (!isNumber(user.makanan)) user.makanan = 0;
if (!isNumber(user.mangga)) user.mangga = 0;
if (!isNumber(user.pisang)) user.pisang = 0;
if (!isNumber(user.semangka)) user.semangka = 0;
if (!isNumber(user.stroberi)) user.stroberi = 0;
if (!isNumber(user.anakcentaur)) user.anakcentaur = 0;
if (!isNumber(user.anakgriffin)) user.anakgriffin = 0;
if (!isNumber(user.anakkucing)) user.anakkucing = 0;
if (!isNumber(user.anakkuda)) user.anakkuda = 0;
if (!isNumber(user.anakkyubi)) user.anakkyubi = 0;
if (!isNumber(user.anaknaga)) user.anaknaga = 0;
if (!isNumber(user.anakpancingan)) user.anakpancingan = 0;
if (!isNumber(user.anakphonix)) user.anakphonix = 0;
if (!isNumber(user.anakrubah)) user.anakrubah = 0;
if (!isNumber(user.anakserigala)) user.anakserigala = 0;
if (!isNumber(user.anggur)) user.anggur = 0;
if (!isNumber(user.anjing)) user.anjing = 0;
if (!isNumber(user.anjinglastclaim)) user.anjinglastclaim = 0;
if (!isNumber(user.apel)) user.apel = 0;
if (!isNumber(user.aqua)) user.aqua = 0;
if (!isNumber(user.arc)) user.arc = 0;
if (!isNumber(user.arcdurability)) user.arcdurability = 0;
if (!isNumber(user.arlok)) user.arlok = 0;
if (!isNumber(user.armor)) user.armor = 0;
if (!isNumber(user.armordurability)) user.armordurability = 0;
if (!isNumber(user.armormonster)) user.armormonster = 0;
if (!isNumber(user.as)) user.as = 0;
if (!isNumber(user.atm)) user.atm = 0;
if (!isNumber(user.axe)) user.axe = 0;
if (!isNumber(user.axedurability)) user.axedurability = 0;
if (!isNumber(user.ayam)) user.ayam = 0;
if (!isNumber(user.ayamb)) user.ayamb = 0;
if (!isNumber(user.ayambakar)) user.ayambakar = 0;
if (!isNumber(user.ayamg)) user.ayamg = 0;
if (!isNumber(user.ayamgoreng)) user.ayamgoreng = 0;
if (!isNumber(user.babi)) user.babi = 0;
if (!isNumber(user.babihutan)) user.babihutan = 0;
if (!isNumber(user.babipanggang)) user.babipanggang = 0;
if (!isNumber(user.bandage)) user.bandage = 0;
if (!isNumber(user.bank)) user.bank = 0;
if (!isNumber(user.banteng)) user.banteng = 0;
if (!isNumber(user.batu)) user.batu = 0;
if (!isNumber(user.bawal)) user.bawal = 0;
if (!isNumber(user.bawalbakar)) user.bawalbakar = 0;
if (!isNumber(user.bayam)) user.bayam = 0;
if (!isNumber(user.berlian)) user.berlian = 10;
if (!isNumber(user.bibitanggur)) user.bibitanggur = 0;
if (!isNumber(user.bibitapel)) user.bibitapel = 0;
if (!isNumber(user.bibitjeruk)) user.bibitjeruk = 0;
if (!isNumber(user.bibitmangga)) user.bibitmangga = 0;
if (!isNumber(user.bibitpisang)) user.bibitpisang = 0;
if (!isNumber(user.botol)) user.botol = 0;
if (!isNumber(user.bow)) user.bow = 0;
if (!isNumber(user.bowdurability)) user.bowdurability = 0;
if (!isNumber(user.boxs)) user.boxs = 0;
if (!isNumber(user.brick)) user.brick = 0;
if (!isNumber(user.brokoli)) user.brokoli = 0;
if (!isNumber(user.buaya)) user.buaya = 0;
if (!isNumber(user.buntal)) user.buntal = 0;
if (!isNumber(user.cat)) user.cat = 0;
if (!isNumber(user.catexp)) user.catexp = 0;
if (!isNumber(user.catlastfeed)) user.catlastfeed = 0;
if (!isNumber(user.centaur)) user.centaur = 0;
if (!isNumber(user.centaurexp)) user.centaurexp = 0;
if (!isNumber(user.centaurlastclaim)) user.centaurlastclaim = 0;
if (!isNumber(user.centaurlastfeed)) user.centaurlastfeed = 0;
if (!isNumber(user.clay)) user.clay = 0;
if (!isNumber(user.coal)) user.coal = 0;
if (!isNumber(user.coin)) user.coin = 0;
if (!isNumber(user.common)) user.common = 0;
if (!isNumber(user.crystal)) user.crystal = 0;
if (!isNumber(user.cumi)) user.cumi = 0;
if (!isNumber(user.cupon)) user.cupon = 0;
if (!isNumber(user.diamond)) user.diamond = 3;
if (!isNumber(user.dog)) user.dog = 0;
if (!isNumber(user.dogexp)) user.dogexp = 0;
if (!isNumber(user.doglastfeed)) user.doglastfeed = 0;
if (!isNumber(user.dory)) user.dory = 0;
if (!isNumber(user.dragon)) user.dragon = 0;
if (!isNumber(user.dragonexp)) user.dragonexp = 0;
if (!isNumber(user.dragonlastfeed)) user.dragonlastfeed = 0;
if (!isNumber(user.emas)) user.emas = 0;
if (!isNumber(user.emerald)) user.emerald = 0;
if (!isNumber(user.enchant)) user.enchant = 0;
if (!isNumber(user.esteh)) user.esteh = 0;
if (!isNumber(user.exp)) user.exp = 0;
if (!isNumber(user.expg)) user.expg = 0;
if (!isNumber(user.exphero)) user.exphero = 0;
if (!isNumber(user.eleksirb)) user.eleksirb = 0;
if (!isNumber(user.emasbatang)) user.emasbatang = 0;
if (!isNumber(user.emasbiasa)) user.emasbiasa = 0;
if (!isNumber(user.fideos)) user.fideos = 0;
if (!isNumber(user.fishingrod)) user.fishingrod = 0;
if (!isNumber(user.fishingroddurability)) user.fishingroddurability = 0;
if (!isNumber(user.fortress)) user.fortress = 0;
if (!isNumber(user.fox)) user.fox = 0;
if (!isNumber(user.foxexp)) user.foxexp = 0;
if (!isNumber(user.foxlastfeed)) user.foxlastfeed = 0;
if (!isNumber(user.fullatm)) user.fullatm = 0;
if (!isNumber(user.gadodado)) user.gadodado = 0;
if (!isNumber(user.gajah)) user.gajah = 0;
if (!isNumber(user.gamemines)) user.gamemines = false;
if (!isNumber(user.ganja)) user.ganja = 0;
if (!isNumber(user.gardenboxs)) user.gardenboxs = 0;
if (!isNumber(user.gems)) user.gems = 0;
if (!isNumber(user.glass)) user.glass = 0;
if (!isNumber(user.glimit)) user.glimit = 20;
if (!isNumber(user.glory)) user.glory = 0;
if (!isNumber(user.gold)) user.gold = 0;
if (!isNumber(user.griffin)) user.griffin = 0;
if (!isNumber(user.griffinexp)) user.griffinexp = 0;
if (!isNumber(user.griffinlastclaim)) user.griffinlastclaim = 0;
if (!isNumber(user.griffinlastfeed)) user.griffinlastfeed = 0;
if (!isNumber(user.gulai)) user.gulai = 0;
if (!isNumber(user.gurita)) user.gurita = 0;
if (!isNumber(user.harimau)) user.harimau = 0;
if (!isNumber(user.haus)) user.haus = 100;
if (!isNumber(user.healt)) user.healt = 100;
if (!isNumber(user.health)) user.health = 100;
if (!isNumber(user.healthmonster)) user.healthmonster = 0;
if (!isNumber(user.healtmonster)) user.healtmonster = 0;
if (!isNumber(user.hero)) user.hero = 1;
if (!isNumber(user.herolastclaim)) user.herolastclaim = 0;
if (!isNumber(user.hiu)) user.hiu = 0;
if (!isNumber(user.horse)) user.horse = 0;
if (!isNumber(user.horseexp)) user.horseexp = 0;
if (!isNumber(user.horselastfeed)) user.horselastfeed = 0;
if (!isNumber(user.ikan)) user.ikan = 0;
if (!isNumber(user.ikanbakar)) user.ikanbakar = 0;
if (!isNumber(user.intelligence)) user.intelligence = 0;
if (!isNumber(user.iron)) user.iron = 0;
if (!isNumber(user.jagung)) user.jagung = 0;
if (!isNumber(user.jagungbakar)) user.jagungbakar = 0;
if (!isNumber(user.jeruk)) user.jeruk = 0;
if (!isNumber(user.joinlimit)) user.joinlimit = 1;
if (!isNumber(user.judilast)) user.judilast = 0;
if (!isNumber(user.kaleng)) user.kaleng = 0;
if (!isNumber(user.kambing)) user.kambing = 0;
if (!isNumber(user.kangkung)) user.kangkung = 0;
if (!isNumber(user.kapak)) user.kapak = 0;
if (!isNumber(user.kardus)) user.kardus = 0;
if (!isNumber(user.katana)) user.katana = 0;
if (!isNumber(user.katanadurability)) user.katanadurability = 0;
if (!isNumber(user.kayu)) user.kayu = 0;
if (!isNumber(user.kentang)) user.kentang = 0;
if (!isNumber(user.kentanggoreng)) user.kentanggoreng = 0;
if (!isNumber(user.kepiting)) user.kepiting = 0;
if (!isNumber(user.kepitingbakar)) user.kepitingbakar = 0;
if (!isNumber(user.kerbau)) user.kerbau = 0;
if (!isNumber(user.kerjadelapan)) user.kerjadelapan = 0;
if (!isNumber(user.kerjadelapanbelas)) user.kerjadelapanbelas = 0;
if (!isNumber(user.kerjadua)) user.kerjadua = 0;
if (!isNumber(user.kerjaduabelas)) user.kerjaduabelas = 0;
if (!isNumber(user.kerjaduadelapan)) user.kerjaduadelapan = 0;
if (!isNumber(user.kerjaduadua)) user.kerjaduadua = 0;
if (!isNumber(user.kerjaduaempat)) user.kerjaduaempat = 0;
if (!isNumber(user.kerjaduaenam)) user.kerjaduaenam = 0;
if (!isNumber(user.kerjadualima)) user.kerjadualima = 0;
if (!isNumber(user.kerjaduapuluh)) user.kerjaduapuluh = 0;
if (!isNumber(user.kerjaduasatu)) user.kerjaduasatu = 0;
if (!isNumber(user.kerjaduasembilan)) user.kerjaduasembilan = 0;
if (!isNumber(user.kerjaduatiga)) user.kerjaduatiga = 0;
if (!isNumber(user.kerjaduatujuh)) user.kerjaduatujuh = 0;
if (!isNumber(user.kerjaempat)) user.kerjaempat = 0;
if (!isNumber(user.kerjaempatbelas)) user.kerjaempatbelas = 0;
if (!isNumber(user.kerjaenam)) user.kerjaenam = 0;
if (!isNumber(user.kerjaenambelas)) user.kerjaenambelas = 0;
if (!isNumber(user.kerjalima)) user.kerjalima = 0;
if (!isNumber(user.kerjalimabelas)) user.kerjalimabelas = 0;
if (!isNumber(user.kerjasatu)) user.kerjasatu = 0;
if (!isNumber(user.kerjasebelas)) user.kerjasebelas = 0;
if (!isNumber(user.kerjasembilan)) user.kerjasembilan = 0;
if (!isNumber(user.kerjasembilanbelas)) user.kerjasembilanbelas = 0;
if (!isNumber(user.kerjasepuluh)) user.kerjasepuluh = 0;
if (!isNumber(user.kerjatiga)) user.kerjatiga = 0;
if (!isNumber(user.kerjatigabelas)) user.kerjatigabelas = 0;
if (!isNumber(user.kerjatigapuluh)) user.kerjatigapuluh = 0;
if (!isNumber(user.kerjatujuh)) user.kerjatujuh = 0;
if (!isNumber(user.kerjatujuhbelas)) user.kerjatujuhbelas = 0;
if (!isNumber(user.korbanngocok)) user.korbanngocok = 0;
if (!isNumber(user.kubis)) user.kubis = 0;
if (!isNumber(user.kucing)) user.kucing = 0;
if (!isNumber(user.kucinglastclaim)) user.kucinglastclaim = 0;
if (!isNumber(user.kuda)) user.kuda = 0;
if (!isNumber(user.kudalastclaim)) user.kudalastclaim = 0;
if (!isNumber(user.kyubi)) user.kyubi = 0;
if (!isNumber(user.kyubiexp)) user.kyubiexp = 0;
if (!isNumber(user.kyubilastclaim)) user.kyubilastclaim = 0;
if (!isNumber(user.kyubilastfeed)) user.kyubilastfeed = 0;
if (!isNumber(user.labu)) user.labu = 0;
if (!isNumber(user.laper)) user.laper = 100;
if (!isNumber(user.lastadventure)) user.lastadventure = 0;
if (!isNumber(user.lastbansos)) user.lastbansos = 0;
if (!isNumber(user.lastberbru)) user.lastberbru = 0;
if (!isNumber(user.lastberkebon)) user.lastberkebon = 0;
if (!isNumber(user.lastbunga)) user.lastbunga = 0;
if (!isNumber(user.lastbunuhi)) user.lastbunuhi = 0;
if (!isNumber(user.lastcoins)) user.lastcoins = 0;
if (!isNumber(user.lastclaim)) user.lastclaim = 0;
if (!isNumber(user.lastcode)) user.lastcode = 0;
if (!isNumber(user.lastcofre)) user.lastcofre = 0;
if (!isNumber(user.lastcodereg)) user.lastcodereg = 0;
if (!isNumber(user.lastcrusade)) user.lastcrusade = 0;
if (!isNumber(user.lastdagang)) user.lastdagang = 0;
if (!isNumber(user.lastdiamantes)) user.lastdiamantes = 0;
if (!isNumber(user.lastduel)) user.lastduel = 0;
if (!isNumber(user.lastdungeon)) user.lastdungeon = 0;
if (!isNumber(user.lasteasy)) user.lasteasy = 0;
if (!isNumber(user.lastfight)) user.lastfight = 0;
if (!isNumber(user.lastfishing)) user.lastfishing = 0;
if (!isNumber(user.lastgift)) user.lastgift = 0;
if (!isNumber(user.lastgojek)) user.lastgojek = 0;
if (!isNumber(user.lastgrab)) user.lastgrab = 0;
if (!isNumber(user.lasthourly)) user.lasthourly = 0;
if (!isNumber(user.lasthunt)) user.lasthunt = 0;
if (!isNumber(user.lastIstigfar)) user.lastIstigfar = 0;
if (!isNumber(user.lastjb)) user.lastjb = 0;
if (!isNumber(user.lastkill)) user.lastkill = 0;
if (!isNumber(user.lastlink)) user.lastlink = 0;
if (!isNumber(user.lastlumber)) user.lastlumber = 0;
if (!isNumber(user.lastmancingeasy)) user.lastmancingeasy = 0;
if (!isNumber(user.lastmancingextreme)) user.lastmancingextreme = 0;
if (!isNumber(user.lastmancinghard)) user.lastmancinghard = 0;
if (!isNumber(user.lastmancingnormal)) user.lastmancingnormal = 0;
if (!isNumber(user.lastmining)) user.lastmining = 0;
if (!isNumber(user.lastmisi)) user.lastmisi = 0;
if (!isNumber(user.lastmonthly)) user.lastmonthly = 0;
if (!isNumber(user.lastmulung)) user.lastmulung = 0;
if (!isNumber(user.lastnambang)) user.lastnambang = 0;
if (!isNumber(user.lastnebang)) user.lastnebang = 0;
if (!isNumber(user.lastngocok)) user.lastngocok = 0;
if (!isNumber(user.lastngojek)) user.lastngojek = 0;
if (!isNumber(user.lastopen)) user.lastopen = 0;
if (!isNumber(user.lastpekerjaan)) user.lastpekerjaan = 0;
if (!isNumber(user.lastpago)) user.lastpago = 0;
if (!isNumber(user.lastpotionclaim)) user.lastpotionclaim = 0;
if (!isNumber(user.lastrampok)) user.lastrampok = 0;
if (!isNumber(user.lastramuanclaim)) user.lastramuanclaim = 0;
if (!isNumber(user.lastrob)) user.lastrob = 0;
if (!isNumber(user.lastroket)) user.lastroket = 0;
if (!isNumber(user.lastsda)) user.lastsda = 0;
if (!isNumber(user.lastseen)) user.lastseen = 0;
if (!isNumber(user.lastSetStatus)) user.lastSetStatus = 0;
if (!isNumber(user.lastspam)) user.lastspam = 0;
if (!isNumber(user.lastsironclaim)) user.lastsironclaim = 0;
if (!isNumber(user.lastsmancingclaim)) user.lastsmancingclaim = 0;
if (!isNumber(user.laststringclaim)) user.laststringclaim = 0;
if (!isNumber(user.lastswordclaim)) user.lastswordclaim = 0;
if (!isNumber(user.lastturu)) user.lastturu = 0;
if (!isNumber(user.lastwar)) user.lastwar = 0;
if (!isNumber(user.lastwarpet)) user.lastwarpet = 0;
if (!isNumber(user.lastweaponclaim)) user.lastweaponclaim = 0;
if (!isNumber(user.lastweekly)) user.lastweekly = 0;
if (!isNumber(user.lastwork)) user.lastwork = 0;
if (!isNumber(user.legendary)) user.legendary = 0;
if (!isNumber(user.lele)) user.lele = 0;
if (!isNumber(user.leleb)) user.leleb = 0;
if (!isNumber(user.lelebakar)) user.lelebakar = 0;
if (!isNumber(user.leleg)) user.leleg = 0;
if (!isNumber(user.level)) user.level = 0;
if (!isNumber(user.limit)) user.limit = 20;
if (!isNumber(user.limitjoinfree)) user.limitjoinfree = 1;
if (!isNumber(user.lion)) user.lion = 0;
if (!isNumber(user.lionexp)) user.lionexp = 0;
if (!isNumber(user.lionlastfeed)) user.lionlastfeed = 0;
if (!isNumber(user.lobster)) user.lobster = 0;
if (!isNumber(user.lumba)) user.lumba = 0;
if (!isNumber(user.magicwand)) user.magicwand = 0;
if (!isNumber(user.magicwanddurability)) user.magicwanddurability = 0;
if (!isNumber(user.makanancentaur)) user.makanancentaur = 0;
if (!isNumber(user.makanangriffin)) user.makanangriffin = 0;
if (!isNumber(user.makanankyubi)) user.makanankyubi = 0;
if (!isNumber(user.makanannaga)) user.makanannaga = 0;
if (!isNumber(user.makananpet)) user.makananpet = 0;
if (!isNumber(user.makananphonix)) user.makananphonix = 0;
if (!isNumber(user.makananserigala)) user.makananserigala = 0;
if (!isNumber(user.mana)) user.mana = 0;
if (!isNumber(user.mangga)) user.mangga = 0;
if (!isNumber(user.money)) user.money = 15;
if (!isNumber(user.monyet)) user.monyet = 0;
if (!isNumber(user.mythic)) user.mythic = 0;
if (!isNumber(user.naga)) user.naga = 0;
if (!isNumber(user.nagalastclaim)) user.nagalastclaim = 0;
if (!isNumber(user.net)) user.net = 0;
if (!isNumber(user.nila)) user.nila = 0;
if (!isNumber(user.nilabakar)) user.nilabakar = 0;
if (!isNumber(user.note)) user.note = 0;
if (!isNumber(user.ojekk)) user.ojekk = 0;
if (!isNumber(user.oporayam)) user.oporayam = 0;
if (!isNumber(user.orca)) user.orca = 0;
if (!isNumber(user.pancing)) user.pancing = 0;
if (!isNumber(user.pancingan)) user.pancingan = 1;
if (!isNumber(user.panda)) user.panda = 0;
if (!isNumber(user.paus)) user.paus = 0;
if (!isNumber(user.pausbakar)) user.pausbakar = 0;
if (!isNumber(user.pc)) user.pc = 0;
if (!isNumber(user.pepesikan)) user.pepesikan = 0;
if (!isNumber(user.pertambangan)) user.pertambangan = 0;
if (!isNumber(user.pertanian)) user.pertanian = 0;
if (!isNumber(user.pet)) user.pet = 0;
if (!isNumber(user.petFood)) user.petFood = 0;
if (!isNumber(user.phonix)) user.phonix = 0;
if (!isNumber(user.phonixexp)) user.phonixexp = 0;
if (!isNumber(user.phonixlastclaim)) user.phonixlastclaim = 0;
if (!isNumber(user.phonixlastfeed)) user.phonixlastfeed = 0;
if (!isNumber(user.pickaxe)) user.pickaxe = 0;
if (!isNumber(user.pickaxedurability)) user.pickaxedurability = 0;
if (!isNumber(user.pillhero)) user.pillhero= 0;
if (!isNumber(user.pisang)) user.pisang = 0;
if (!isNumber(user.pointxp)) user.pointxp = 0;
if (!isNumber(user.potion)) user.potion = 0;
if (!isNumber(user.psenjata)) user.psenjata = 0;
if (!isNumber(user.psepick)) user.psepick = 0;
if (!isNumber(user.ramuan)) user.ramuan = 0;
if (!isNumber(user.ramuancentaurlast)) user.ramuancentaurlast = 0;
if (!isNumber(user.ramuangriffinlast)) user.ramuangriffinlast = 0;
if (!isNumber(user.ramuanherolast)) user.ramuanherolast = 0;
if (!isNumber(user.ramuankucinglast)) user.ramuankucinglast = 0;
if (!isNumber(user.ramuankudalast)) user.ramuankudalast = 0;
if (!isNumber(user.ramuankyubilast)) user.ramuankyubilast = 0;
if (!isNumber(user.ramuannagalast)) user.ramuannagalast = 0;
if (!isNumber(user.ramuanphonixlast)) user.ramuanphonixlast = 0;
if (!isNumber(user.ramuanrubahlast)) user.ramuanrubahlast = 0;
if (!isNumber(user.ramuanserigalalast)) user.ramuanserigalalast = 0;
if (!isNumber(user.reglast)) user.reglast = 0;
if (!isNumber(user.rendang)) user.rendang = 0;
if (!isNumber(user.rhinoceros)) user.rhinoceros = 0;
if (!isNumber(user.rhinocerosexp)) user.rhinocerosexp = 0;
if (!isNumber(user.rhinoceroslastfeed)) user.rhinoceroslastfeed = 0;
if (!isNumber(user.robo)) user.robo = 0;
if (!isNumber(user.roboxp)) user.roboxp = 0;
if (!isNumber(user.rock)) user.rock = 0;
if (!isNumber(user.roket)) user.roket = 0;
if (!isNumber(user.roti)) user.roti = 0;
if (!isNumber(user.rubah)) user.rubah = 0;
if (!isNumber(user.rubahlastclaim)) user.rubahlastclaim = 0;
if (!isNumber(user.rumahsakit)) user.rumahsakit = 0;
if (!isNumber(user.sampah)) user.sampah = 0;
if (!isNumber(user.sand)) user.sand = 0;
if (!isNumber(user.sapi)) user.sapi = 0;
if (!isNumber(user.sapir)) user.sapir = 0;
if (!isNumber(user.seedbayam)) user.seedbayam = 0;
if (!isNumber(user.seedbrokoli)) user.seedbrokoli = 0;
if (!isNumber(user.seedjagung)) user.seedjagung = 0;
if (!isNumber(user.seedkangkung)) user.seedkangkung = 0;
if (!isNumber(user.seedkentang)) user.seedkentang = 0;
if (!isNumber(user.seedkubis)) user.seedkubis = 0;
if (!isNumber(user.seedlabu)) user.seedlabu = 0;
if (!isNumber(user.seedtomat)) user.seedtomat = 0;
if (!isNumber(user.seedwortel)) user.seedwortel = 0;
if (!isNumber(user.serigala)) user.serigala = 0;
if (!isNumber(user.serigalalastclaim)) user.serigalalastclaim = 0;
if (!isNumber(user.shield)) user.shield = false;
if (!isNumber(user.skillexp)) user.skillexp = 0;
if (!isNumber(user.snlast)) user.snlast = 0;
if (!isNumber(user.soda)) user.soda = 0;
if (!isNumber(user.sop)) user.sop = 0;
if (!isNumber(user.spammer)) user.spammer = 0;
if (!isNumber(user.spinlast)) user.spinlast = 0;
if (!isNumber(user.ssapi)) user.ssapi = 0;
if (!isNumber(user.stamina)) user.stamina = 100;
if (!isNumber(user.steak)) user.steak = 0;
if (!isNumber(user.stick)) user.stick = 0;
if (!isNumber(user.strength)) user.strength = 0;
if (!isNumber(user.string)) user.string = 0;
if (!isNumber(user.superior)) user.superior = 0;
if (!isNumber(user.suplabu)) user.suplabu = 0;
if (!isNumber(user.sushi)) user.sushi = 0;
if (!isNumber(user.sword)) user.sword = 0;
if (!isNumber(user.sworddurability)) user.sworddurability = 0;
if (!isNumber(user.tigame)) user.tigame = 50;
if (!isNumber(user.tiketcoin)) user.tiketcoin = 0;
if (!isNumber(user.title)) user.title = 0;
if (!isNumber(user.tomat)) user.tomat = 0;
if (!isNumber(user.tprem)) user.tprem = 0;
if (!isNumber(user.trash)) user.trash = 0;
if (!isNumber(user.trofi)) user.trofi = 0;
if (!isNumber(user.troopcamp)) user.troopcamp = 0;
if (!isNumber(user.tumiskangkung)) user.tumiskangkung = 0;
if (!isNumber(user.udang)) user.udang = 0;
if (!isNumber(user.udangbakar)) user.udangbakar = 0;
if (!isNumber(user.umpan)) user.umpan = 0;
if (!isNumber(user.uncoommon)) user.uncoommon = 0;
if (!isNumber(user.unreglast)) user.unreglast = 0;
if (!isNumber(user.upgrader)) user.upgrader = 0;
if (!isNumber(user.vodka)) user.vodka = 0;
if (!isNumber(user.wallet)) user.wallet = 0;
if (!isNumber(user.warn)) user.warn = 0;
if (!isNumber(user.weapon)) user.weapon = 0;
if (!isNumber(user.weapondurability)) user.weapondurability = 0;
if (!isNumber(user.wolf)) user.wolf = 0;
if (!isNumber(user.wolfexp)) user.wolfexp = 0;
if (!isNumber(user.wolflastfeed)) user.wolflastfeed = 0;
if (!isNumber(user.wood)) user.wood = 0;
if (!isNumber(user.wortel)) user.wortel = 0;
if (!user.lbars) user.lbars = '[▒▒▒▒▒▒▒▒▒]';
if (!user.job) user.job = 'Desempleo';
if (!user.wait) user.wait = 0;
if (!user.rtrofi) user.rtrofi = 'Bronce';
} else {
db.data.bot[botID].chats.groups[group].users[participant] = {
lang: 'es',
msgcount: {count: 0, time: 0},
exp: 0,
limit: 10,
lastclaim: 0,
registered: false,
name: nameW,
age: -1,
anggur: 0,
apel: 0,
afk: -1,
wait: 0,
afkReason: '',
agility: 16,
anakanjing: 0,
anakcentaur: 0,
anakgriffin: 0,
anakkucing: 0,
anakkuda: 0,
anakkyubi: 0,
anaknaga: 0,
anakpancingan: 0,
anakphonix: 0,
anakrubah: 0,
anakserigala: 0,
anjing: 0,
anjinglastclaim: 0,
antispam: 0,
antispamlastclaim: 0,
aqua: 0,
arc: 0,
arcdurability: 0,
arlok: 0,
armor: 0,
armordurability: 0,
armormonster: 0,
as: 0,
atm: 0,
autolevelup: true,
axe: 0,
axedurability: 0,
ayam: 0,
ayamb: 0,
ayambakar: 0,
ayamg: 0,
ayamgoreng: 0,
babi: 0,
babihutan: 0,
babipanggang: 0,
bandage: 0,
bank: 0,
banned: false,
BannedReason: '',
Banneduser: false,
lastCommandUsed: '',
banteng: 0,
batu: 0,
bawal: 0,
bawalbakar: 0,
bayam: 0,
berlian: 10,
bibitanggur: 0,
bibitapel: 0,
bibitjeruk: 0,
bibitmangga: 0,
bibitpisang: 0,
botol: 0,
bow: 0,
bowdurability: 0,
boxs: 0,
brick: 0,
brokoli: 0,
buaya: 0,
buntal: 0,
cat: 0,
catlastfeed: 0,
catngexp: 0,
centaur: 0,
centaurexp: 0,
centaurlastclaim: 0,
centaurlastfeed: 0,
clay: 0,
coal: 0,
coin: 0,
common: 0,
crystal: 0,
cumi: 0,
cupon: 0,
diamond: 3,
dog: 0,
dogexp: 0,
doglastfeed: 0,
dory: 0,
dragon: 0,
dragonexp: 0,
dragonlastfeed: 0,
emas: 0,
emerald: 0,
esteh: 0,
expg: 0,
exphero: 0,
expired: 0,
eleksirb: 0,
emasbatang: 0,
emasbiasa: 0,
fideos: 0,
fishingrod: 0,
fishingroddurability: 0,
fortress: 0,
fox: 0,
foxexp: 0,
foxlastfeed: 0,
fullatm: 0,
gadodado: 0,
gajah: 0,
gamemines: false,
ganja: 0,
gardenboxs: 0,
gems: 0,
glass: 0,
gold: 0,
griffin: 0,
griffinexp: 0,
griffinlastclaim: 0,
griffinlastfeed: 0,
gulai: 0,
gurita: 0,
harimau: 0,
haus: 100,
healt: 100,
health: 100,
healtmonster: 100,
hero: 1,
herolastclaim: 0,
hiu: 0,
horse: 0,
horseexp: 0,
horselastfeed: 0,
ikan: 0,
ikanbakar: 0,
intelligence: 10,
iron: 0,
jagung: 0,
jagungbakar: 0,
jeruk: 0,
job: 'Pengangguran',
joincount: 2,
joinlimit: 1,
judilast: 0,
kaleng: 0,
kambing: 0,
kangkung: 0,
kapak: 0,
kardus: 0,
katana: 0,
katanadurability: 0,
kayu: 0,
kentang: 0,
kentanggoreng: 0,
kepiting: 0,
kepitingbakar: 0,
kerbau: 0,
kerjadelapan: 0,
kerjadelapanbelas: 0,
kerjadua: 0,
kerjaduabelas: 0,
kerjaduadelapan: 0,
kerjaduadua: 0,
kerjaduaempat: 0,
kerjaduaenam: 0,
kerjadualima: 0,
kerjaduapuluh: 0,
kerjaduasatu: 0,
kerjaduasembilan: 0,
kerjaduatiga: 0,
kerjaduatujuh: 0,
kerjaempat: 0,
kerjaempatbelas: 0,
kerjaenam: 0,
kerjaenambelas: 0,
kerjalima: 0,
kerjalimabelas: 0,
kerjasatu: 0,
kerjasebelas: 0,
kerjasembilan: 0,
kerjasembilanbelas: 0,
kerjasepuluh: 0,
kerjatiga: 0,
kerjatigabelas: 0,
kerjatigapuluh: 0,
kerjatujuh: 0,
kerjatujuhbelas: 0,
korbanngocok: 0,
kubis: 0,
kucing: 0,
kucinglastclaim: 0,
kuda: 0,
kudalastclaim: 0,
kumba: 0,
kyubi: 0,
kyubilastclaim: 0,
labu: 0,
laper: 100,
lastadventure: 0,
lastberbru: 0,
lastberkebon: 0,
lastbunga: 0,
lastbunuhi: 0,
lastcoins: 0,
lastcode: 0,
lastcofre: 0,
lastcrusade: 0,
lastdaang: 0,
lastdagang: 0,
lastdiamantes: 0,
lastduel: 0,
lastdungeon: 0,
lasteasy: 0,
lastfight: 0,
lastfishing: 0,
lastgojek: 0,
lastgrab: 0,
lasthourly: 0,
lasthunt: 0,
lastjb: 0,
lastkill: 0,
lastlink: 0,
lastlumber: 0,
lastmancingeasy: 0,
lastmancingextreme: 0,
lastmancinghard: 0,
lastmancingnormal: 0,
lastmining: 0,
lastmisi: 0,
lastmonthly: 0,
lastmulung: 0,
lastnambang: 0,
lastnebang: 0,
lastngocok: 0,
lastngojek: 0,
lastopen: 0,
lastpekerjaan: 0,
lastpago: 0,
lastpotionclaim: 0,
lastramuanclaim: 0,
lastspam: 0,
lastrob: 0,
lastroket: 0,
lastseen: 0,
lastSetStatus: 0,
lastsironclaim: 0,
lastsmancingclaim: 0,
laststringclaim: 0,
lastswordclaim: 0,
lastturu: 0,
lastwarpet: 0,
lastweaponclaim: 0,
lastweekly: 0,
lastwork: 0,
lbars: '[▒▒▒▒▒▒▒▒▒]',
legendary: 0,
lele: 0,
leleb: 0,
lelebakar: 0,
leleg: 0,
level: 0,
limitjoinfree: 1,
lion: 0,
lionexp: 0,
lionlastfeed: 0,
lobster: 0,
lumba: 0,
magicwand: 0,
magicwanddurability: 0,
makanan: 0,
makanancentaur: 0,
makanangriffin: 0,
makanankyubi: 0,
makanannaga: 0,
makananpet: 0,
makananphonix: 0,
makananserigala: 0,
mana: 20,
mangga: 0,
misi: '',
money: 15,
monyet: 0,
mythic: 0,
naga: 0,
nagalastclaim: 0,
net: 0,
nila: 0,
nilabakar: 0,
note: 0,
ojekk: 0,
oporayam: 0,
orca: 0,
pancingan: 1,
panda: 0,
pasangan: '',
paus: 0,
pausbakar: 0,
pc: 0,
pepesikan: 0,
pet: 0,
phonix: 0,
phonixexp: 0,
phonixlastclaim: 0,
phonixlastfeed: 0,
pickaxe: 0,
pickaxedurability: 0,
pillhero: 0,
pisang: 0,
pointxp: 0,
potion: 10,
premium: false,
premiumTime: 0,
ramuan: 0,
ramuancentaurlast: 0,
ramuangriffinlast: 0,
ramuanherolast: 0,
ramuankucinglast: 0,
ramuankudalast: 0,
ramuankyubilast: 0,
ramuannagalast: 0,
ramuanphonixlast: 0,
ramuanrubahlast: 0,
ramuanserigalalast: 0,
reglast: 0,
regTime: -1,
rendang: 0,
rhinoceros: 0,
rhinocerosexp: 0,
rhinoceroslastfeed: 0,
rock: 0,
roket: 0,
role: 'Novato',
roti: 0,
rtrofi: 'bronce',
rubah: 0,
rubahlastclaim: 0,
rumahsakit: 0,
sampah: 0,
sand: 0,
sapi: 0,
sapir: 0,
seedbayam: 0,
seedbrokoli: 0,
seedjagung: 0,
seedkangkung: 0,
seedkentang: 0,
seedkubis: 0,
seedlabu: 0,
seedtomat: 0,
seedwortel: 0,
semangka: 0,
serigala: 0,
serigalalastclaim: 0,
sewa: false,
shield: 0,
skill: '',
skillexp: 0,
snlast: 0,
soda: 0,
sop: 0,
spammer: 0,
spinlast: 0,
ssapi: 0,
stamina: 100,
steak: 0,
stick: 0,
strength: 30,
string: 0,
stroberi: 0,
superior: 0,
suplabu: 0,
sushi: 0,
sword: 0,
sworddurability: 0,
tigame: 50,
tiketcoin: 0,
title: '',
tomat: 0,
tprem: 0,
trash: 0,
trofi: 0,
troopcamp: 0,
tumiskangkung: 0,
udang: 0,
udangbakar: 0,
umpan: 0,
uncoommon: 0,
unreglast: 0,
upgrader: 0,
vodka: 0,
wallet: 0,
warn: 0,
weapon: 0,
weapondurability: 0,
wolf: 0,
wolfexp: 0,
wolflastfeed: 0,
wood: 0,
wortel: 0,
}
}
}
