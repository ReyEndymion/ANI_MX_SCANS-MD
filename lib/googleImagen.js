export async function googleImage(query) {
let cheerio = await import('cheerio');
let { default: got } = await import('got');
const {  DEFAULT_HEADERS  } = await import('./constants.js');
const {  z  } = await import('zod');
const GoogleImageSchema = z.string().url();
const data = await got(`https://www.google.com/search?q=${query}&tbm=isch`, {
headers: DEFAULT_HEADERS
}).text();
const $ = cheerio.load(data);
const pattern = /\[1,\[0,"(?<id>[\d\w\-_]+)",\["https?:\/\/(?:[^"]+)",\d+,\d+\]\s?,\["(?<url>https?:\/\/(?:[^"]+))",\d+,\d+\]/gm;
const matches = $.html().matchAll(pattern);
const decodeUrl = (url) => decodeURIComponent(JSON.parse(`"${url}"`));
return [...matches]
.map(({ groups }) => decodeUrl(groups === null || groups === void 0 ? void 0 : groups.url))
.filter((v) => /.*\.jpe?g|png$/gi.test(v))
.map((value) => GoogleImageSchema.parse(value));
}
