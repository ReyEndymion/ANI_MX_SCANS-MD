let { default: got } = await import('got');
let cheerio = await import('cheerio');
const {  DEFAULT_HEADERS  } = await import('./constants.js');
const {  z  } = await import('zod');
const {  createHmac  } = await import('crypto');
const SECRET = '96dea4bfb6afcbcc28c7f6080afe7435';
const LyricsArgsSchema = z.object({
0: z.string()
});
const LyricsMetadataBestMatchSchema = z.object({
id: z.number(),
type: z.string()
});
const LyricsMetadataTrackSchema = z.object({
track: z.object({
track_id: z.number(),
track_spotify_id: z.string(),
track_share_url: z.string().url(),
track_name: z.string(),
artist_name: z.string(),
album_name: z.string(),
first_release_date: z.string().datetime(),
album_coverart_100x100: z.preprocess((str) => str || undefined, z.string().url().optional()),
album_coverart_350x350: z.preprocess((str) => str || undefined, z.string().url().optional()),
album_coverart_500x500: z.preprocess((str) => str || undefined, z.string().url().optional()),
album_coverart_800x800: z.preprocess((str) => str || undefined, z.string().url().optional())
})
});
const LyricsMetadataResponseSchema = z.object({
message: z.object({
body: z.object({
macro_result_list: z.object({
best_match: LyricsMetadataBestMatchSchema,
track_list: z.array(LyricsMetadataTrackSchema)
})
})
})
});
const LyricsSchema = z.object({
id: z.number(),
title: z.string(),
url: z.string().url(),
artist: z.string(),
album: z.string(),
albumCover: z.string().url(),
release: z.string().datetime(),
spotify: z.string().url(),
lyrics: z.object({
type: z.literal('header').or(z.literal('lyric')),
text: z.string()
}).array()
});
const LyricsV2SearchSectionSchema = z.object({
hits: z.object({
type: z.string(),
result: z.object({
api_path: z.string(),
url: z.string().url()
})
}).array(),
type: z.string()
});
const LyricsV2SearchResponseSchema = z.object({
response: z.object({
sections: LyricsV2SearchSectionSchema.array()
})
});
const LyricsV2MetadataSongSchema = z.object({
id: z.number(),
artist_names: z.string(),
full_title: z.string(),
description_preview: z.string(),
apple_music_player_url: z.string().url(),
soundcloud_url: z.string().url().nullish(),
spotify_uuid: z.string().nullish(),
youtube_url: z.string().url(),
release_date_components: z.object({
day: z.number(),
month: z.number(),
year: z.number()
}),
header_image_thumbnail_url: z.string().url(),
header_image_url: z.string().url(),
album: z.object({
name: z.string()
})
});
const LyricsV2MetadataResponseSchema = z.object({
response: z.object({
song: LyricsV2MetadataSongSchema
})
});
const LyricsV2Schema = z.object({
id: z.number(),
title: z.string(),
url: z.string().url(),
artist: z.string(),
album: z.string(),
albumCover: z.string().url(),
release: z.string().datetime(),
spotify: z.string().url().optional(),
youtube: z.string().url().optional(),
soundcloud: z.string().url().optional(),
appleMusicPlayer: z.string().url().optional(),
lyrics: z.object({
type: z.literal('header').or(z.literal('lyric')),
url: z.string().url().optional(),
text: z.string()
}).array()
});
function generateMusixmatchHash(url) {
const d = new Date();
const year = d.getUTCFullYear().toString();
const month = serializeDate(d.getUTCMonth() + 1);
const date = serializeDate(d.getUTCDate());
const hmac = createHmac('sha256', SECRET);
hmac.update(url + year + month + date);
return hmac.digest('base64');
}
export function serializeDate(d) {
const repetition = 2;
return ("0".repeat(repetition) + d).slice(-repetition);
}
/**
* Scrape from https://www.musixmatch.com
*/
export async function lyrics(query) {
LyricsArgsSchema.parse(arguments);
const baseUrl = `https://www.musixmatch.com/ws/1.1/macro.search?app_id=mxm-com-v1.0&format=json&part=track_artist%2Cartist_image&q=${encodeURIComponent(query).replace(/%20/, '+')}&page_size=20&track_fields_set=community_track_search&artist_fields_set=community_artist_search`;
const hash = generateMusixmatchHash(baseUrl);
const data = await got(`${baseUrl}&signature=${encodeURIComponent(hash)}&signature_protocol=sha256`, {
headers: {
...DEFAULT_HEADERS,
accept: 'application/json',
referer: 'https://www.musixmatch.com/search',
cookie: '_gcl_au=1.1.85206978.1720616187; _ga=GA1.1.1878424828.1720616188; OptanonConsent=isGpcEnabled=0&datestamp=Thu+Jul+11+2024+09%3A45%3A32+GMT%2B0700+(Western+Indonesia+Time)&version=202402.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=380df0d7-977b-41ad-ac81-c550cdc8a59c&interactionCount=1&isAnonUser=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A0%2CC0003%3A0%2CC0004%3A0&AwaitingReconsent=false; _ga_71BQKD81W0=GS1.1.1720668421.3.0.1720668421.0.0.0; _ga_FPN5W0WTG8=GS1.1.1720668422.3.0.1720668422.0.0.0'
}
}).json();
const json = LyricsMetadataResponseSchema.parse(data);
const trackList = json.message.body.macro_result_list.track_list;
if (!trackList.length)
throw new Error(`Can't get lyrics '${query}'!`);
const { track_share_url, track_spotify_id, track_id, track_name, artist_name, album_name, first_release_date, album_coverart_100x100, album_coverart_350x350, album_coverart_500x500, album_coverart_800x800, } = trackList[0].track;
const html = await got(track_share_url, {
headers: {
...DEFAULT_HEADERS,
cookie: '_gcl_au=1.1.85206978.1720616187; _ga=GA1.1.1878424828.1720616188; OptanonConsent=isGpcEnabled=0&datestamp=Thu+Jul+11+2024+09%3A45%3A32+GMT%2B0700+(Western+Indonesia+Time)&version=202402.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=380df0d7-977b-41ad-ac81-c550cdc8a59c&interactionCount=1&isAnonUser=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A0%2CC0003%3A0%2CC0004%3A0&AwaitingReconsent=false; _ga_71BQKD81W0=GS1.1.1720668421.3.0.1720668421.0.0.0; _ga_FPN5W0WTG8=GS1.1.1720668422.3.0.1720668422.0.0.0'
}
}).text();
const $ = cheerio.load(html);
const lyrics = $('div.css-175oi2r.r-13awgt0.r-eqz5dr.r-1v1z2uz > div.css-175oi2r.r-zd98yo > div.css-175oi2r').filter('.r-k200y, .r-18u37iz').map(function () {
const $el = $(this);
const header = $el.find('div > h3').text();
const lyric = $el.find('div').text();
return {
type: header ? 'header' : 'lyric',
text: header || lyric
};
}).toArray();
const result = {
id: track_id,
title: track_name,
url: track_share_url,
artist: artist_name,
album: album_name,
albumCover: album_coverart_800x800 || album_coverart_500x500 || album_coverart_350x350 || album_coverart_100x100,
release: first_release_date,
spotify: `https://open.spotify.com/track/${track_spotify_id}`,
lyrics
};
return LyricsSchema.parse(result);
}
/**
* Scrape from https://genius.com
*/
export async function lyricsv2(query) {
LyricsArgsSchema.parse(arguments);
const search = await got(`https://genius.com/api/search/multi?per_page=5&q=${encodeURIComponent(query).replace(/%20/, '+')}`).json();
const json = LyricsV2SearchResponseSchema.parse(search);
const sections = json.response.sections.find((section) => section.type === 'song');
const { api_path, url } = sections.hits[0].result;
const [data, html] = await Promise.all([
got(`https://genius.com/api${api_path}`).json(),
got(url).text()
]);
const metadata = LyricsV2MetadataResponseSchema.parse(data);
const { id, full_title, artist_names, album, header_image_url, header_image_thumbnail_url, description_preview, release_date_components, spotify_uuid, youtube_url, soundcloud_url, apple_music_player_url } = metadata.response.song;
const $ = cheerio.load(html);
const $lyrics = $('#lyrics-root > div[data-lyrics-container="true"]');
const lyrics = ($lyrics.find('a').length ?
//The lyric has meaning
$lyrics.find('a').map(function () {
const $el = $(this);
const url = encodeURI('https://genius.com' + $el.attr('href'));
const $span = $el.find('span');
// https://github.com/cheeriojs/cheerio/issues/839#issuecomment-205077830
const html = $span.html().replace(/<br>/g, '\n');
const text = $span.html(html).text().trim();
if (!text)
return false;
return {
type: /\[.*?\]/.test(text) ? 'header' : 'lyric',
url,
text
};
}).toArray()
// Only lyric 
: $lyrics.html().replace(/<br>/g, '\n').split('\n').map((text) => {
if (!text)
return false;
return {
type: /\[.*?\]/.test(text) ? 'header' : 'lyric',
text: text.trim()
};
})).filter(Boolean);
const result = {
id,
title: full_title,
url,
artist: artist_names,
album: album.name,
albumCover: header_image_url || header_image_thumbnail_url,
release: new Date(release_date_components.year, release_date_components.month - 1, release_date_components.day).toISOString(),
description: description_preview,
...(spotify_uuid ? { spotify: `https://open.spotify.com/track/${spotify_uuid}` } : {}),
youtube: youtube_url,
soundcloud: soundcloud_url,
appleMusicPlayer: apple_music_player_url,
lyrics
};
return LyricsV2Schema.parse(result);
}
