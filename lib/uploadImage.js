import fetch from 'node-fetch';
import { FormData, Blob } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type';

/**
* Upload image to telegra.ph
* Supported mimetype:
* - `image/jpeg`
* - `image/jpg`
* - `image/png`s
* @param {Buffer} buffer Image Buffer
* @return {Promise<string>}
*/
export default async (buffer) => {
const {ext, mime} = await fileTypeFromBuffer(buffer);
const form = new FormData();
const blob = new Blob([buffer.toArrayBuffer()], {type: mime});
form.append('file', blob, 'tmp.' + ext);
const res = await fetch('https://telegra.ph/upload', {
method: 'POST',
body: form
});
const text = await res.text()
console.log('uploadImage: ', text)
if (!res.ok || text.startsWith('<')) {
throw new Error(' Error al subir imágen: ' + text.slice(0, 300))
}
let json
try {
json = JSON.parse(text)
} catch (error) {
throw new Error(' La respuesta no es un JSON válido: ' + text.slice(0, 300))
}
if (json.error) throw json.error
const img = await res.json();
if (img.error) throw img.error;
return 'https://telegra.ph' + img[0].src;
};

