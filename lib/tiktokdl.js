export async function tiktokdl(url) {
const { default: z  } = await import('zod');
let { default: got } = await import('got');
let cheerio = await import('cheerio');
const {  DEFAULT_HEADERS  } = await import('./constants.js');
console.log('ttdlLib: ', z)
const TiktokDlArgsSchema = z.object({
0: z.string().url()
});
const TiktokDlSchema = z.object({
nickname: z.string(),
username: z.string(),
avatar: z.string().url(),
description: z.string(),
thumbnail: z.string().url(),
played: z.string(),
commented: z.string(),
saved: z.string(),
shared: z.string(),
song: z.string(),
video: z.object({
noWatermark: z.string().url(),
withWatermark: z.string().url()
}),
audio: z.string().url()
});
TiktokDlArgsSchema.parse(arguments);
const html = await got.post('https://ttsave.app/download', {
headers: {
...DEFAULT_HEADERS,
origin: 'https://ttsave.app'
},
json: {
language_id: '1',
query: url
}
}).text();
const $ = cheerio.load(html);
const $div = $('div.flex');
const nickname = $div.find('h2').text();
const username = $div.find('a.font-extrabold').text();
const avatar = $div.find('a > img').attr('src');
const description = $div.find('p').text();
const $span = $div.find('div.flex > div.flex > span');
const played = $span.eq(0).text();
const commented = $span.eq(1).text();
const saved = $span.eq(2).text();
const shared = $span.eq(3).text();
const song = $div.find('div.flex > span').eq(4).text();
const $a = $('#button-download-ready > a');
const noWatermark = $a.eq(0).attr('href');
const withWatermark = $a.eq(1).attr('href');
const audio = $a.eq(2).attr('href');
const thumbnail = $a.eq(4).attr('href');
const result = {
nickname,
username,
avatar,
description,
thumbnail,
played,
commented,
saved,
shared,
song,
video: {
noWatermark,
withWatermark
},
audio
};
return TiktokDlSchema.parse(result);
}

async function getInfo(url) {
let id = url.split('?')[0].split('/')
let res = await (await fetch(`https://www.tiktok.com/node/share/video/${id[3]}/${id[5]}/`)).json()
return res?.seoProps?.metaParams}
async function shortUrl(url) {
return await (await fetch(`https://tinyurl.com/api-create.php?url=${url}`)).text()}
