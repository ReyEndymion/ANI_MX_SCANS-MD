const {  z  } = await import('zod');
const MediafiredlArgsSchema = z.object({
0: z.string().url()
});
const MediafiredlSchema = z.object({
url: z.string().url(),
url2: z.string().url(),
filename: z.string(),
filetype: z.string(),
ext: z.string(),
aploud: z.string(),
filesizeH: z.string(),
filesize: z.number()
});
function parseFileSize(size) {
return parseFloat(size) * (/GB/i.test(size)
? 1000000
: /MB/i.test(size)
? 1000
: /KB/i.test(size)
? 1
: /bytes?/i.test(size)
? 0.001
: /B/i.test(size)
? 0.1
: 0);
}
export async function mediafiredl(url) {
let cheerio = await import('cheerio');
let { default: got } = await import('got');
const {  DEFAULT_HEADERS  } = await import('./constants.js');
var _a, _b;
MediafiredlArgsSchema.parse(arguments);
const data = await got(url, {
headers: {
...DEFAULT_HEADERS
}
}).text();
const $ = cheerio.load(data);
const Url = ($('#downloadButton').attr('href') || '').trim();
const url2 = ($('#download_link > a.retry').attr('href') || '').trim();
const $intro = $('div.dl-info > div.intro');
const filename = $intro.find('div.filename').text().trim();
const filetype = $intro.find('div.filetype > span').eq(0).text().trim();
const ext = ((_b = (_a = /\(\.(.*?)\)/.exec($intro.find('div.filetype > span').eq(1).text())) === null || _a === void 0 ? void 0 : _a[1]) === null || _b === void 0 ? void 0 : _b.trim()) || 'bin';
const $li = $('div.dl-info > ul.details > li');
const aploud = $li.eq(1).find('span').text().trim();
const filesizeH = $li.eq(0).find('span').text().trim();
const filesize = parseFileSize(filesizeH);
const result = {
url: Url || url2,
url2,
filename,
filetype,
ext,
aploud,
filesizeH,
filesize
};
return MediafiredlSchema.parse(result);
}
