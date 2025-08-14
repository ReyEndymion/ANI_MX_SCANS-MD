import fetch from 'node-fetch'
import { FormData, Blob } from 'formdata-node'
import { fileTypeFromBuffer } from 'file-type'
import { DEFAULT_HEADERS } from './constants.js';
/**
* Upload epheremal file to file.io
* `Expired in 1 day`
* `100MB Max Filesize`
* @param {Buffer} buffer File Buffer
*/
const fileIO = async (buffer) => {
const {ext, mime} = await fileTypeFromBuffer(buffer) || {};
const form = new FormData();
const blob = new Blob([buffer.toArrayBuffer()], {type: mime});
form.append('file', blob, 'tmp.' + ext);
const res = await fetch('https://file.io/?expires=1d', { // 1 Day Expiry Date
method: 'POST',
body: form,
});
const contentType = res.headers.get('content-type') || ''
if (!contentType.includes('application/json')) {
const text = await res.text()
console.error('[fileIO]: La respuesta no es un json probablemente un error HTML:')
console.error(text.slice(0, 5000))
throw new Error('error al subir archivo: la respuesta no fue un json')
}
const json = await res.json();
if (!json.success) {
console.error('[fileIO]: Upload fallido', json)
throw json;
}
return json.link;
};

/**
* Upload file to storage.restfulapi.my.id
* @param {Buffer|ReadableStream|(Buffer|ReadableStream)[]} inp File Buffer/Stream or Array of them
* @return {string|null|(string|null)[]}
*/
const RESTfulAPI = async (inp) => {
const form = new FormData();
let buffers = inp;
if (!Array.isArray(inp)) buffers = [inp];
for (const buffer of buffers) {
const blob = new Blob([buffer.toArrayBuffer()]);
form.append('file', blob);
}
const res = await fetch('https://0x0.st', {
method: 'POST',
body: form,
});
let json = await res.text();
try {
json = JSON.parse(json);
if (!Array.isArray(inp)) return json.files[0].url;
return json.files.map((res) => res.url);
} catch (e) {
throw json;
}
};

/**
* alternativa ZeroX0
* @param {Buffer} buffer
* @return {Promise<string>}
*/
const ZeroX0 = async (buffer) => {
const form = new FormData();
try {
const blob = new Blob([buffer.toArrayBuffer()]);
form.append('file', blob, 'upload.webp');
const res = await fetch('https://0x0.st', {
method: 'POST',
body: form,
});

const text = await res.text();
if (!res.ok || !text.startsWith('https://')) {
throw new Error('Error al subir a 0x0.st:\n' + text.slice(0, 300));
}    
return text.trim();
} catch (error) {
throw new Error('Error General:\n' + error.stack.slice(0, 300));

}

};


/**
*
* @param {Buffer} inp
* @return {Promise<string>}
*/
export default async function(inp) {
let err = false, error;
for (const upload of [ZeroX0, fileIO, RESTfulAPI]) {
try {
return await upload(inp);
} catch (e) {
console.error('[uploadFile.js]: ', e.message)
error = e;
err = true
}
}
if (err) throw new Error(` Error subiendo archivo: todas las funciones fallaron último error: ${error}`);
}
