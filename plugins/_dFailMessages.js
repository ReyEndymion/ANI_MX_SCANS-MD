export const config = {
rowner: '*[ ⚠️ ALERTA ⚠️ ]* ESTE COMANDO SOLO PUEDE SER UTILIZADO POR EL/LA *PROPIETARIO/A (OWNER)* DEL BOT',
owner: '*[ ⚠️ ALERTA ⚠️ ]* ESTE COMANDO SOLO PUEDE SER UTILIZADO POR EL/LA *PROPIETARIO/A (OWNER)* DEL BOT',
mods: '*[ ⚠️ ALERTA ⚠️ ]* ESTE COMANDO SOLO PUEDE SER UTILIZADO POR *MODERADORES Y EL/LA PROPIETARIO/A (OWNER)* DEL BOT',
premium: '*[ ⚠️ ALERTA ⚠️ ]* ESTE COMANDO SOLO PUEDE SER UTILIZADO POR *USUARIOS PREMIUM Y EL/LA PROPIETARIO/A OWNER* DEL BOT',
group: '*[ ⚠️ ALERTA ⚠️ ]* ESTE COMANDO SOLO PUEDE SER UTILIZADO EN *GRUPOS*',
private: '*[ ⚠️ ALERTA ⚠️ ]* ESTE COMANDO SOLO PUEDE SER UTILIZADO EN *CHAT PRIVADO DEL BOT*',
admin: '*[ ⚠️ ALERTA ⚠️ ]* ESTE COMANDO SOLO PUEDE SER UTILIZADO POR *ADMINS DEL GRUPO*',
botAdmin: '*[ ⚠️ ALERTA ⚠️ ]* PARA PODER USAR ESTE COMANDO ES NECESARIO QUE *EL BOT SEA ADMIN*, ASCENDER A *ADMIN* ESTE NUMERO',
unreg: '*[ 🛑 HEY!! ALTO, NO ESTAS REGISTRADO 🛑 ]*\n\n*—◉ PARA USAR ESTE COMANDO DEBES REGISTRARTE, USA EL COMANDO*\n*➣ #verificar nombre.edad*',
restrict: '*[ ⚠️ ALERTA ⚠️ ]* ESTE COMANDO ESTA *RESTRINGIDO/DESACTIVADO* POR DESICIÓN DEL PROPIETARIO/A *(OWNER)* DEL BOT'
}

export async function fail(type, m, conn, userdb) {
let msg = {
rowner: config.rowner,
owner: config.owner,
mods: config.mods,
premium: config.premium,
group: config.group,
private: config.private,
admin: config.admin,
botAdmin: config.botAdmin,
unreg: config.unreg,
restrict: config.restrict
}[type];
return conn.sendWritingText(m.chat, msg, userdb, m);

}