import { spawn } from 'child_process';
import { join } from 'path';
const { _quickTest } = await import('./functions.js');
import { raizPath } from '../config.js';
let support = await _quickTest();

/**
* Levelup image
* @param {String} teks
* @param {Number} level
* @return {Promise<Buffer>}
*/

export function levelup(teks, level) {
return new Promise(async (resolve, reject) => {
if (!(support.convert || support.magick || support.gm)) return reject('Not Support!');
const font = join(raizPath, '../src/font');
let fontLevel = join(font, './level_c.otf');
let fontTexts = join(font, './texts.otf');
let xtsx = join(media, 'pictures/lvlup_template.jpg');
let anotations = '+1385+260'; // gapake else if kadang error
if (level > 2) anotations = '+1370+260';
if (level > 10) anotations = '+1330+260';
if (level > 50) anotations = '+1310+260';
if (level > 100) anotations = '+1260+260';

const [_spawnprocess, ..._spawnargs] = [...(support.gm ? ['gm'] : support.magick ? ['magick'] : support.convert ? ['convert'] : []),
'convert',
xtsx,
'-font',
fontTexts,
'-fill',
'#0F3E6A',
'-size',
'1024x784',
'-pointsize',
'68',
'-interline-spacing',
'-7.5',
'-annotate',
'+153+200',
teks,
//original together
'-font',
fontLevel,
'-fill',
'#0A2A48',
'-size',
'1024x784',
'-pointsize',
'140',
'-interline-spacing',
'-1.2',
'-annotate',
anotations,
level,
'-append',
'jpg:-'
]
let bufs = []
spawn(_spawnprocess, _spawnargs)
.on('error', reject)
.on('close', () => {
return resolve(Buffer.concat(bufs));
})
.stdout.on('data', (chunk) => bufs.push(chunk));
});
}
export const growth = Math.pow(Math.PI / Math.E, 1.618) * Math.E * .75;
export function xpRange(level, multiplier = global.multiplier || 1) {
if (level < 0) {
throw new TypeError('level cannot be negative value');
}
level = Math.floor(level);
let min = level === 0 ? 0 : Math.round(Math.pow(level, growth) * multiplier) + 1;
let max = Math.round(Math.pow(++level, growth) * multiplier);
return {
min,
max,
xp: max - min
};
}
export function findLevel(xp, multiplier = global.multiplier || 1) {
if (xp === Infinity) {
return Infinity;
}
if (isNaN(xp)) {
return NaN;
}
if (xp <= 0) {
return -1;
}
let level = 0;
do {
level++;
}
while (xpRange(level, multiplier).min <= xp);
return --level;
}
export function canLevelUp(level, xp, multiplier = global.multiplier || 1) {
if (level < 0) {
return false;
}
if (xp === Infinity) {
return true;
}
if (isNaN(xp)) {
return false;
}
if (xp <= 0) {
return false;
}
return level < findLevel(xp, multiplier);
}
