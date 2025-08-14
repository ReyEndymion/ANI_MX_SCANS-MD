
/***************GLOBAL APIS****************** */
export let keysapi = {
keysZens: ['fiktod', 'c2459db922', 'BF39D349845E', '675e34de8a', '37CC845916', '0b917b905e6f', '6fb0eff124','c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial'],
keysxteammm: ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63'],
keysneoxrrr: ['5VC9rvNx', 'cfALv5'],
lolkeysapi: ['GataDios', 'BrunoSobrino']
}
export let keysxxx = keysapi.keysZens[Math.floor(keysapi.keysZens.length * Math.random())]
export let keysxteam = keysapi.keysxteammm[Math.floor(keysapi.keysxteammm.length * Math.random())]
export let keysneoxr = keysapi.keysneoxrrr[Math.floor(keysapi.keysneoxrrr.length * Math.random())]

export let APIs = { 
xteam: 'https://api.xteam.xyz',
dzx: 'https://api.dhamzxploit.my.id',
lol: 'https://api.lolhuman.xyz',
violetics: 'https://violetics.pw',
neoxr: 'https://api.neoxr.my.id',
zenzapis: 'https://api.zahwazein.xyz',
akuari: 'https://api.akuari.my.id',
akuari2: 'https://apimu.my.id',	
fgmods: 'https://api-fgmods.ddns.net',
botcahx: 'https://api.botcahx.biz.id'
}
export let APIKeys = { 
'https://api.xteam.xyz': `${keysxteam}`,
'https://api.lolhuman.xyz': ['GataDios', '85faf717d0545d14074659ad'],
'https://api.neoxr.my.id': `${keysneoxr}`,	
'https://violetics.pw': 'beta',
'https://api.zahwazein.xyz': `${keysxxx}`,
'https://api-fgmods.ddns.net': 'fg-dylux',
'https://api.botcahx.biz.id': 'Admin'
}

export let API = (name, path = '/', query = {}, apikeyqueryname) => (name in APIs ? APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({...query, ...(apikeyqueryname ? {[apikeyqueryname]: global.APIKeys[name in APIs ? APIs[name] : name]} : {})})) : '');
