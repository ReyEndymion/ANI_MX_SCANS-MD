export async function wallpaper(query) {
const {  z  } = await import('zod');
let cheerio = await import('cheerio');
let { default: got } = await import('got');
const {  DEFAULT_HEADERS  } = await import('./constants.js');

const WallpaperSchema = z.string().url();
const data = await got(`https://www.shutterstock.com/search/${query}`, {
headers: DEFAULT_HEADERS
}).text();
const $ = cheerio.load(data);
const results = [
...new Set([
...$.html().matchAll(/https?:\/\/(image|www)\.shutterstock\.com\/([^"]+)/gim)
]
.map((v) => v[0])
.filter((v) => /.*\.jpe?g|png$/gi.test(v)))
];
return results.map((value) => WallpaperSchema.parse(value));
}
