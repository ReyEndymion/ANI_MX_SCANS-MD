export async function instagramdl(url) {
const {  z  } = await import('zod');
let { default: got } = await import('got');
let cheerio = await import('cheerio');
const {  DEFAULT_HEADERS  } = await import('./constants.js');
const InstagramdlArgsSchema = z.object({
0: z.string().url()
});
const InstagramdlItemSchema = z.object({
thumbnail: z.string().url(),
url: z.string().url(),
type: z.literal('video').or(z.literal('image'))
});
const InstagramdlSchema = z.array(InstagramdlItemSchema);
InstagramdlArgsSchema.parse(arguments);
const form = {
recaptchaToken: '',
q: url,
t: 'media',
lang: 'id'
};
const data = await got.post('https://v3.igdownloader.app/api/ajaxSearch', {
headers: {
...DEFAULT_HEADERS,
'content-type': 'application/x-www-form-urlencoded',
'origin': 'https://igdownloader.app',
'referer': 'https://igdownloader.app/'
},
form
}).json();
if (data.status !== 'ok') {
throw data;
}
const $ = cheerio.load(data.data);
const results = [];
$('.download-items').each(function () {
const $el = $(this);
const $img = $el.find('.download-items__thumb > img');
const thumbnail = $img.attr('data-src') || $img.attr('src');
const $a = $el.find('.download-items__btn > a');
const url = $a.attr('href');
const type = /video/i.test($a.find('span').text()) ? 'video' : 'image';
results.push({
thumbnail,
url,
type
});
});
return InstagramdlSchema.parse(results);
}
export async function instagramStory(username) {
const {  z  } = await import('zod');
let { default: got } = await import('got');
let cheerio = await import('cheerio');
const {  DEFAULT_HEADERS  } = await import('./constants.js');
let { default: crypto } = await import('crypto');
const InstagramStoryItemSchema = z.object({
thumbnail: z.string().url(),
url: z.string().url(),
type: z.literal('image').or(z.literal('video'))
});
const InstagramStoryArgsSchema = z.object({
0: z.string()
});
const InstagramStorySchema = z.array(InstagramStoryItemSchema);
InstagramStoryArgsSchema.parse(arguments);
const form = {
'g-recaptcha-response': crypto.randomBytes(16).toString('hex'), // captcha is not checked on the backend 
text_username: username,
user_data: ''
};
const data = await got.post('https://www.storysaver.net/storyProcesst.php?c=1', {
headers: {
...DEFAULT_HEADERS,
'content-type': 'application/x-www-form-urlencoded',
origin: 'https://www.storysaver.net',
referer: 'https://www.storysaver.net/'
},
form
}).text();
const $ = cheerio.load(data);
const results = [];
$('.stylestory').each(function () {
const $el = $(this);
const thumbnail = ($el.find('video').attr('poster') || $el.find('img').attr('src'));
const $a = $el.find('a');
const url = $a.attr('href');
const type = /video/i.test($a.text()) ? 'video' : 'image';
results.push({
thumbnail,
url,
type
});
});
return InstagramStorySchema.parse(results);
}
