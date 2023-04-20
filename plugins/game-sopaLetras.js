import WordFind from 'wordfind'
import request from 'request';
import cheerio from 'cheerio';  
import fs from 'fs';
import jimp from 'jimp';

let handler = async (m, text, args) => {
// Definir el mensaje de bienvenida para el usuario 
// m.reply("¡Hola! ¿Te gustaría jugar a una sopa de letras? Solo di 'Sí' para empezar."); 
// Si el usuario responde 'Sí', mostrar la imagen de la sopa de letras y las palabras a encontrar 
//if (/^Sí|si|Si$/gi.test(m.text)) {
let url = 'https://es.m.wiktionary.org/wiki/Ap%C3%A9ndice:1000_palabras_b%C3%A1sicas_en_espa%C3%B1ol';
let palabrasRandom = [];
request(url, (err, res, html) => {
  if (!err && res.statusCode == 200) {
    const $ = cheerio.load(html);
    // Obtenemos todas las palabras de la página web y las guardamos en un array
    let palabras = $('.mw-parser-output > ul > li').map((i, el) => $(i, el).text()).get()
    // Seleccionamos 10 palabras al azar del array de palabras y las guardamos en un nuevo array 
    for (let i=0; i<10; i++) { 
      let randomIndex = Math.floor(Math.random() * palabras.length); 
      let randomWord = palabras[randomIndex]; 
      // Comprobamos que la palabra no se haya seleccionado ya antes para evitar repeticiones 
      if (!palabrasRandom.includes(randomWord)) { 
        palabrasRandom.push(randomWord); 
      } else { 
        i--; // Si la palabra ya ha sido seleccionada antes volvemos a intentarlo con otra diferente  
      }  
    }
    console.log("Lista de 10 Palabras Random:", palabrasRandom);
  } else {   // Si hay algún error mostramos el mensaje correspondiente   console.log("Error: " + err);   } });
request('https://es.m.wiktionary.org/wiki/Ap%C3%A9ndice:1000_palabras_b%C3%A1sicas_en_espa%C3%B1ol', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    m.reply(`no se pudo generar lista, por favor reintente mas tarde`)
  }
})
  }
let words = palabrasRandom
// Crear una imagen de 500x500 píxeles con fondo blanco
let image = new jimp(256, 256, 0xFFFFFFFF)
// Establecer la fuente a usar para las letras de la sopa de letras
image.loadFont('./fonts/arial.fnt').then(font => {
    // Establecer el color de la fuente a negro (0x000000) y el tamaño a 20px
    image.print(font, 0, 0, { text: words.join(' '), alignmentX: jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: jimp.VERTICAL_ALIGN_MIDDLE }, 256, 256, { color: 0x000000, size: 12 });
    // Guardar la imagen en formato .jpg en el directorio actual con el nombre sopa-de-letras.jpg 
    image.write('./tmp/sopa-de-letras.jpg');
    console.log('Imagen creada con éxito!');    
});
    // Mostrar la imagen de la sopa de letras en el chat 
    m.senFile(m.chat, `${image}`, m);
    // Mostrar las palabras a encontrar en el chat 
    m.reply(`Encuentra estas palabras: ${wordsList}`);
    // Establecer un tiempo límite para resolver la sopa de letras 
    setTimeout(() => { 
        // Mostrar un mensaje al usuario cuando se acabe el tiempo límite 
        m.reply("¡Se acabó el tiempo! ¿Quieres volver a jugar?");
    }, 30000); // 30 segundos  
})
}
handler.help = ['juegos']
handler.tags = ['games']
handler.command = /^sopaletras$/i
handler.admin = false 
export default handler

/*
 const $ = cheerio.load(html);
let wordsList = [];
    for (let i = 0; i < 10; i++) {
      let word = $('.ToWrd').eq(i).text();
      wordsList.push(word);
    }
    console.log(wordsList); // Mostrar la lista de palabras generadas en consola 
    
    // Esta función generará una sopa de letras aleatoria a partir de una palabra dada
function generarSopaDeLetras(palabra) {
  // Primero, creamos un array con todas las letras de la palabra
  let letras = palabra.split('');
  // Luego, creamos un array vacío para almacenar la sopa de letras
  let sopaDeLetras = [
  ['A', 'B', 'C', 'D'],
  ['E', 'F', 'G', 'H'],
  ['I', 'J', 'K', 'L'],
  ['M', 'N', 'O', 'P'],
  ['Q','R', 'S', 'T'],
  ['U', 'V', 'X', 'Y', 'Z']
];
WordFind.startsWith(sopaDeLetras).then(words => {
  console.log(words)
}).catch(console.error)
  // Ahora, recorremos el array de letras y rellenamos la sopa de letras con ellas
  for (let i = 0; i < letras.length; i++) {
    // Generamos un número aleatorio entre 0 y el tamaño del array de la sopa de letras
    let posicionAleatoria = Math.floor(Math.random() * sopaDeLetras.length);
    // Insertamos la letra en la posición aleatoria del array
    sopaDeLetras.splice(posicionAleatoria, 0, letras[i]);
  }
  // Devolvemos el array con la sopa de letras generada
  return sopaDeLetras;
}

// Esta función se encargará de enviar el mensaje con la sopa de letras a través de WhatsApp usando Twilio API para WhatsApp
function enviarSopaDeLetrasPorWhatsApp(sopaDeLetras) {  

  // Aquí iría el código para enviar el mensaje usando Twilio API para WhatsApp  

  console.log('Mensaje enviado!');  
}  

  
// Usamos nuestra función para generar una sopa de letras a partir de una palabra dada  
let palabra = `${text}`.args[0];  
let sopaDeLetras = generarSopaDeLetras(palabra);  

WordFind.startsWith(palabra).then(words => {
  console.log(words)
}).catch(console.error)

// what rhymes with orgasm? words that end with asm! 
WordFind.endsWith(text).then(console.log).catch(console.error)

// find any word that contains mania 
WordFind.contains(palabra).then(words => {
  words.forEach(word2 => {
      console.log(`the word '${word2}' contains 'mania' somewhere`)
  })
}).catch(console.error)
  
// Mostramos por consola el resultado obtenido  
console.log('SOPA DE LETRAS:');  
console.log(sopaDeLetras);  

  
// Finalmente, enviamos el mensaje con la sopa de letrass por WhatsApp usando Twilio API for WhatsApp    														     enviarSopaDeLetraspPorWhatsApp(sopadeletrass);
    
//Código de ejemplo

const sopaDeLetras = [
  ['A', 'B', 'C', 'D'],
  ['E', 'F', 'G', 'H'],
  ['I', 'J', 'K', 'L'],
  ['M', 'N', 'O', 'P']
];

function buscarPalabra(sopaDeLetras, palabra) {
  let encontrado = false;
  for (let i = 0; i < sopaDeLetras.length; i++) {
    for (let j = 0; j < sopaDeLetras[i].length; j++) {
      if (sopaDeLetras[i][j] === palabra[0]) {
        // Comprobar si la palabra se encuentra en la sopa de letras
        let palabraEncontrada = true;
        for (let k = 1; k < palabra.length; k++) {
          if (sopaDeLetras[i + k] === undefined || sopaDeLetras[i + k][j] !== palabra[k]) {
            palabraEncontrada = false;
            break;
          }
        }
        if (palabraEncontrada) {
          encontrado = true;
          break;
        }
      }
    }
  }
  return encontrado;
}

console.log(buscarPalabra(sopaDeLetras, 'ABC')); // true
console.log(buscarPalabra(sopaDeLetras, 'KLM')); // true
console.log(buscarPalabra(sopaDeLetras, 'FGH')); // true
console.log(buscarPalabra(sopaDeLetras, 'ABCD')); // false
*/
