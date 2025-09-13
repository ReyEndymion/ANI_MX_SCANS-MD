const { z } = await import('zod');
const { sizeFormatter } = await import('human-readable');
import {DEFAULT_HEADERS} from './constants.js'
const LinkItemSchema = z.object({
size: z.string(),
f: z.string(),
q: z.string(),
q_text: z.string(),
k: z.string(),
});
const LinksSchema = z.object({
mp4: z.record(LinkItemSchema),
mp3: z.record(LinkItemSchema),
other: z.record(LinkItemSchema),
});
const RelatedContentSchema = z.object({
v: z.string(),
t: z.string(),
});
const RelatedVideosSchema = z.object({
title: z.string(),
contents: z.array(RelatedContentSchema),
});
const YoutubedlResponseSchema = z.object({
status: z.string(),
mess: z.string(),
page: z.string(),
vid: z.string(),
extractor: z.string(),
title: z.string(),
t: z.number(),
a: z.string(),
links: LinksSchema,
related: z.array(RelatedVideosSchema),
});
const YoutubeDownloaderArgsSchema = z.object({
0: z.string().url(),
1: z.literal('id')
.or(z.literal('en'))
.or(z.literal('es'))
.optional()
});
const YoutubedlDataSchema = z.object({
quality: z.string(),
type: z.string(),
fileSizeH: z.string(),
fileSize: z.number(),
download: z.function(z.tuple([]), z.promise(z.string().url()))
});
const YoutubedlSchema = z.object({
id: z.string(),
thumbnail: z.string(),
title: z.string(),
duration: z.number(),
video: z.record(z.string(), YoutubedlDataSchema),
audio: z.record(z.string(), YoutubedlDataSchema),
other: z.record(z.string(), YoutubedlDataSchema)
});
const ConvertResponseSchema = z.object({
status: z.string(),
mess: z.string(),
c_status: z.string(),
vid: z.string(),
title: z.string(),
ftype: z.string(),
fquality: z.string(),
dlink: z.string().url(),
});

function parseFileSize(size) {
const sized = parseFloat(size);
return (isNaN(sized) ? 0 : sized) * (/GB/i.test(size)
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
const SUFFIX = 'f24c8c73d48b7686ed11a3bf97983f6f7eb6395f19268184aae742e93683c00c';
async function generateHash(url) {
let { default: crypto } = await import('crypto');
const hash = crypto.createHash('sha256');
const data = url + Date.now() + SUFFIX;
hash.update(data);
return hash.digest('hex');
}
function time2Number(time) {
let [hours, minutes, seconds] = time.split(':').map(Number);
if (!seconds) { // '00:07'
[minutes, seconds] = [hours, minutes];
hours = 0;
}
return hours * 3600
+ minutes * 60
+ seconds * 1;
}
const OwnerBadgeSchema = z.object({
metadataBadgeRenderer: z.object({
style: z.string(),
tooltip: z.string()
})
});
const AccessibilitySchema = z.object({
accessibilityData: z.object({
label: z.string()
})
});
const CollapsedTextSchema = z.object({
text: z.string()
});
const CollapsedThumbnailClassSchema = z.object({
thumbnails: z.array(z.object({
url: z.string(),
width: z.number(),
height: z.number()
}))
});
const CollapsedRunsClassSchema = z.object({
runs: z.array(CollapsedTextSchema)
});
const TextSchema = z.object({
accessibility: AccessibilitySchema,
simpleText: z.string()
});
const CollapsedSimpleTextSchema = z.object({
simpleText: z.string()
});
const ThumbnailOverlaySchema = z.object({
thumbnailOverlayTimeStatusRenderer: z.object({
text: z.object({
accessibility: AccessibilitySchema.optional(),
simpleText: z.string()
}),
style: z.string()
}).optional()
});
const DetailedMetadataSnippetSchema = z.object({
snippetText: z.object({
runs: z.array(CollapsedTextSchema)
})
});
const TitleSchema = z.object({
runs: z.array(CollapsedTextSchema),
accessibility: AccessibilitySchema
});
const RichThumbnailSchema = z.object({
movingThumbnailRenderer: z.object({
movingThumbnailDetails: CollapsedThumbnailClassSchema
})
});
const ChannelThumbnailSupportedRenderersSchema = z.object({
channelThumbnailWithLinkRenderer: z.object({
thumbnail: CollapsedThumbnailClassSchema
})
});
const VideoRendererSchema = z.object({
videoId: z.string(),
thumbnail: CollapsedThumbnailClassSchema,
title: TitleSchema,
longBylineText: CollapsedRunsClassSchema,
publishedTimeText: CollapsedSimpleTextSchema.optional(),
lengthText: TextSchema.optional(),
viewCountText: CollapsedSimpleTextSchema.partial(),
// navigationEndpoint: Endpoint;
// badges?: Badge[],
ownerBadges: z.array(OwnerBadgeSchema).optional(),
ownerText: CollapsedRunsClassSchema,
shortBylineText: CollapsedRunsClassSchema,
// trackingParams: string;
// showActionMenu: boolean;
shortViewCountText: TextSchema.partial(),
// menu: VideoRendererMenu;
channelThumbnailSupportedRenderers: ChannelThumbnailSupportedRenderersSchema,
thumbnailOverlays: z.array(ThumbnailOverlaySchema),
richThumbnail: RichThumbnailSchema.optional(),
detailedMetadataSnippets: z.array(DetailedMetadataSnippetSchema).optional(),
});
//import { OwnerBadgeSchema, CollapsedTextSchema, CollapsedThumbnailClassSchema, CollapsedRunsClassSchema, TextSchema, CollapsedSimpleTextSchema } from './shared.js';
const BylineTextRunSchema = z.object({
text: z.string(),
navigationEndpoint: z.object({
commandMetadata: z.object({
webCommandMetadata: z.object({
url: z.string()
})
}),
browseEndpoint: z.object({
canonicalBaseUrl: z.string()
})
})
});
const BylineTextSchema = z.object({
runs: z.array(BylineTextRunSchema)
});
const ChannelRendererSchema = z.object({
channelId: z.string(),
title: CollapsedTextSchema.partial(),
// navigationEndpoint:RunNavigationEndpoint;
thumbnail: CollapsedThumbnailClassSchema,
descriptionSnippet: CollapsedRunsClassSchema,
shortBylineText: BylineTextSchema,
videoCountText: TextSchema,
// subscriptionButton:SubscriptionButton;
ownerBadges: z.array(OwnerBadgeSchema),
subscriberCountText: CollapsedSimpleTextSchema,
// subscribeButton: SubscribeButton;
// trackingParams:string;
longBylineText: BylineTextSchema,
});
const ItemSectionRendererContentSchema = z.object({
// searchPyvRenderer: SearchPyvRendererSchema.optional(),
videoRenderer: VideoRendererSchema.optional(),
// reelShelfRenderer: ReelShelfRendererSchema.optional(),
// shelfRenderer: ShelfRendererSchema.optional(),
// radioRenderer: RadioRendererSchema.optional(),
// horizontalCardListRenderer: ContentHorizontalCardListRendererSchema.optional(),
channelRenderer: ChannelRendererSchema.optional()
});
const SectionListRendererContentSchema = z.object({
itemSectionRenderer: z.object({
contents: z.array(ItemSectionRendererContentSchema)
}).optional()
});
const TwoColumnSearchResultsRendererSchema = z.object({
primaryContents: z.object({
sectionListRenderer: z.object({
contents: z.array(SectionListRendererContentSchema),
})
})
});
const YoutubeSearchResponseSchema = z.object({
contents: z.object({
twoColumnSearchResultsRenderer: TwoColumnSearchResultsRendererSchema
})
});
const YoutubeSearchArgsSchema = z.object({
0: z.string()
});
const YoutubeSearchVideoSchema = z.object({
videoId: z.string(),
url: z.string().url(),
title: z.string(),
thumbnail: z.string().url(),
description: z.string(),
movingThumbnail: z.string().url(),
channelName: z.string(),
channelAvatar: z.string().url(),
isChannelVerified: z.boolean(),
publishedTime: z.string(),
viewH: z.string(),
view: z.number().int(),
durationH: z.string(),
duration: z.number().int(),
});
const YoutubeSearchChannelSchema = z.object({
channelId: z.string(),
url: z.string().url(),
channelName: z.string(),
username: z.string(),
avatar: z.string().url(),
isChannelVerified: z.boolean(),
subscriberH: z.string(),
description: z.string(),
});
const YoutubeSearchSchema = z.object({
video: z.array(YoutubeSearchVideoSchema),
channel: z.array(YoutubeSearchChannelSchema)
});
export async function youtubeSearch(query) {
let { default: got } = await import('got');
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
YoutubeSearchArgsSchema.parse(arguments);
const html = await got('https://www.youtube.com/results', {
headers: {
...DEFAULT_HEADERS
},
searchParams: {
// Append ?search_query=query
search_query: query
}
}).text();
const script = (_a = /var ytInitialData = {(.*?)};/.exec(html)) === null || _a === void 0 ? void 0 : _a[1];
if (!script) {
throw new Error(`Can't find script data (ytInitialData)!`);
}
const json = JSON.parse('{' + script + '}');
const parsed = YoutubeSearchResponseSchema.parse(json);
const contents = parsed.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
const video = [];
const channel = [];
for (const content of contents) {
const tag = Object.keys(content)[0];
if (tag === 'videoRenderer') {
const data = content[tag];
const videoId = data.videoId;
const url = encodeURI('https://www.youtube.com/watch?v=' + videoId);
const title = data.title.runs.pop().text;
const thumbnail = data.thumbnail.thumbnails.pop().url;
const description = ((_b = data.detailedMetadataSnippets) === null || _b === void 0 ? void 0 : _b.pop().snippetText.runs.map(({ text }) => text).join('')) || '';
const movingThumbnail = (_d = (_c = data.richThumbnail) === null || _c === void 0 ? void 0 : _c.movingThumbnailRenderer.movingThumbnailDetails.thumbnails.pop().url) !== null && _d !== void 0 ? _d : thumbnail;
const channelName = (_f = (_e = data.longBylineText.runs[0].text) !== null && _e !== void 0 ? _e : data.longBylineText.runs[0].text) !== null && _f !== void 0 ? _f : data.shortBylineText.runs[0].text;
const channelAvatar = data.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.thumbnail.thumbnails.pop().url;
const isChannelVerified = (_h = (_g = data.ownerBadges) === null || _g === void 0 ? void 0 : _g.some((badge) => {
return badge.metadataBadgeRenderer.style === 'BADGE_STYLE_TYPE_VERIFIED';
})) !== null && _h !== void 0 ? _h : false;
const publishedTime = (_k = (_j = data.publishedTimeText) === null || _j === void 0 ? void 0 : _j.simpleText) !== null && _k !== void 0 ? _k : 'unknown';
const viewH = (_p = (_m = (_l = data.viewCountText.simpleText) !== null && _l !== void 0 ? _l : data.shortViewCountText.simpleText) !== null && _m !== void 0 ? _m : (_o = data.shortViewCountText.accessibility) === null || _o === void 0 ? void 0 : _o.accessibilityData.label) !== null && _p !== void 0 ? _p : '0 views';
const view = parseInt((_r = (_q = data.viewCountText.simpleText) === null || _q === void 0 ? void 0 : _q.replace(',', '')) !== null && _r !== void 0 ? _r : '0');
const thumbnailOverlayTimeStatusRenderer = (_s = data.thumbnailOverlays.find((thumbnail) => {
const key = Object.keys(thumbnail)[0];
return key === 'thumbnailOverlayTimeStatusRenderer';
})) === null || _s === void 0 ? void 0 : _s.thumbnailOverlayTimeStatusRenderer;
const durationH = (_u = (_t = data.lengthText) === null || _t === void 0 ? void 0 : _t.accessibility.accessibilityData.label) !== null && _u !== void 0 ? _u : (_v = thumbnailOverlayTimeStatusRenderer === null || thumbnailOverlayTimeStatusRenderer === void 0 ? void 0 : thumbnailOverlayTimeStatusRenderer.text.accessibility) === null || _v === void 0 ? void 0 : _v.accessibilityData.label;
const durationTime = (_w = thumbnailOverlayTimeStatusRenderer === null || thumbnailOverlayTimeStatusRenderer === void 0 ? void 0 : thumbnailOverlayTimeStatusRenderer.text.simpleText) !== null && _w !== void 0 ? _w : '00:00';
const isShort = durationTime === 'SHORTS';
const duration = time2Number(isShort ? '00:60' : durationTime);
video.push({
videoId,
url,
title,
thumbnail,
description,
movingThumbnail,
channelName,
channelAvatar,
isChannelVerified,
publishedTime,
viewH,
view,
durationH,
duration,
});
}
if (tag === 'channelRenderer') {
const data = content[tag];
const channelId = data.channelId;
const username = ((_4 = (_2 = (_0 = (_y = (_x = data.longBylineText.runs.pop()) === null || _x === void 0 ? void 0 : _x.navigationEndpoint.browseEndpoint.canonicalBaseUrl) !== null && _y !== void 0 ? _y : (_z = data.longBylineText.runs.pop()) === null || _z === void 0 ? void 0 : _z.navigationEndpoint.commandMetadata.webCommandMetadata.url) !== null && _0 !== void 0 ? _0 : (_1 = data.shortBylineText.runs.pop()) === null || _1 === void 0 ? void 0 : _1.navigationEndpoint.browseEndpoint.canonicalBaseUrl) !== null && _2 !== void 0 ? _2 : (_3 = data.shortBylineText.runs.pop()) === null || _3 === void 0 ? void 0 : _3.navigationEndpoint.commandMetadata.webCommandMetadata.url) !== null && _4 !== void 0 ? _4 : data.subscriberCountText.simpleText).replace(/^\//, '');
const channelName = (_5 = data.title.text) !== null && _5 !== void 0 ? _5 : username;
const url = encodeURI('https://www.youtube.com/' + username);
const avatarUrl = data.thumbnail.thumbnails.pop().url;
const avatar = encodeURI('https:' + avatarUrl);
const isChannelVerified = (_7 = (_6 = data.ownerBadges) === null || _6 === void 0 ? void 0 : _6.some((badge) => {
return badge.metadataBadgeRenderer.style === 'BADGE_STYLE_TYPE_VERIFIED';
})) !== null && _7 !== void 0 ? _7 : false;
const subscriberH = data.videoCountText.simpleText;
// const subscriber = 
const description = data.descriptionSnippet.runs.map(({ text }) => text).join('');
channel.push({
channelId,
url,
channelName,
username,
avatar,
isChannelVerified,
subscriberH,
// TODO: Add subscriber wich is number of subscriber
description
});
}
}
return YoutubeSearchSchema.parse({
video,
channel
});
}

export async function youtubedl(url, server) {
let { default: got } = await import('got');
YoutubeDownloaderArgsSchema.parse(arguments);
const form = {
k_query: url,
k_page: 'home',
hl: server || 'en',
q_auto: 0
};
const data = await got.post('https://www.y2mate.com/mates/analyzeV2/ajax', {
headers: {
...DEFAULT_HEADERS,
'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
cookie: '_ga=GA1.1.1058493269.1720585210; _ga_PSRPB96YVC=GS1.1.1720585209.1.1.1720585486.0.0.0',
origin: 'https://www.y2mate.com'
},
form
}).json();
const json = YoutubedlResponseSchema.parse(data);
const video = {};
const audio = {};
const other = {};
for (const key in json.links) {
for (const tag in json.links[key]) {
const data = json.links[key][tag];
const quality = data.q;
const type = data.f;
const fileSizeH = data.size;
const fileSize = parseFileSize(fileSizeH);
(type === 'mp4' ? video : type === 'mp3' ? audio : other)[quality.toLowerCase()] = {
quality,
type,
fileSizeH,
fileSize,
download: convert.bind(convert, json.vid, data.k)
};
}
}
const result = {
id: json.vid,
thumbnail: `https://i.ytimg.com/vi/${json.vid}/0.jpg`,
title: json.title,
duration: json.t,
video,
audio,
other
};
return YoutubedlSchema.parse(result);
}
export async function convert(vid, k) {
let { default: got } = await import('got');
const form = {
vid,
k
};
const data = await got.post('https://www.y2mate.com/mates/convertV2/index', {
headers: {
...DEFAULT_HEADERS,
'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
cookie: '_ga=GA1.1.1058493269.1720585210; _ga_PSRPB96YVC=GS1.1.1720585209.1.1.1720585486.0.0.0',
origin: 'https://www.y2mate.com'
},
form
}).json();
const json = ConvertResponseSchema.parse(data);
return json.dlink;
}

export async function youtubedlv2(url, server) {
const toFormat = sizeFormatter({
std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
decimalPlaces: 2,
keepTrailingZeroes: false,
render: (literal, symbol) => `${literal} ${symbol}B`
});
let { default: got } = await import('got');
YoutubeDownloaderArgsSchema.parse(arguments);
const form = {
ts: Date.now(),
url,
_s: generateHash(url),
_ts: 1720429578286,
_tsc: 0
};
const data = await got.post('https://api.ssyoutube.com/api/convert', {
headers: {
...DEFAULT_HEADERS,
'origin': 'https://ssyoutube.com'
},
json: form
}).json();
const json = YoutubedlResponseSchema.parse(data);
const video = {};
const audio = {};
const other = {};
for (const item of json.url) {
const type = item.ext; // 'mp4' 'mp3' 'webm'
const quality = item.quality;
const fileSize = item.filesize || item.contentLength || 0;
const fileSizeH = toFormat(fileSize);
(type === 'mp4' ? video : ['mp3', 'opus'].includes(type) ? audio : other)[quality.toLowerCase()] = {
quality,
type,
fileSizeH,
fileSize,
download: async () => url
};
}
const duration = time2Number(json.meta.duration);
const res = {
id: json.id,
title: json.meta.title,
thumbnail: `https://i.ytimg.com/vi/${json.id}/0.jpg`,
duration,
video,
audio,
other
};
return YoutubedlSchema.parse(res);
}
//export async function convert(serverUrl, v_id, ftype, fquality, token, timeExpire) {}
