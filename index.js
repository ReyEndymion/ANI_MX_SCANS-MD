console.log('✅ㅤIniciando...')
import { join, dirname } from 'path'
import { createRequire } from "module";
import { fileURLToPath } from 'url'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts';
import { createInterface } from 'readline'
import yargs from 'yargs'
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname) // Bring in the hability to create the 'require' method
const { name, author, description } = require(join(__dirname, './package.json')) // https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/
const { say } = cfonts
const rl = createInterface(process.stdin, process.stdout)

say('🌎ANI MX SCANS🌏\nWhatsApp - Bot - MD', {
font: 'chrome',
align: 'center',
gradient: ['red', 'magenta']
})
say(`'${name}' By @${author.name || author}`, {
font: 'console',
align: 'center',
gradient: ['red', 'magenta']
})

var isRunning = false

/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
function start(file) {
let args = [join(__dirname, file), ...process.argv.slice(2)]

say(`${description}\n\nAjuste la pantalla para escanear el codigo QR`, {
font: 'console',
align: 'center',
gradient: ['red', 'magenta']
});

setupMaster({
exec: args[0],
args: args.slice(1),
})
let p = fork()
p.on('message', data => {
console.log('[RECEIVED]', data)
switch (data) {
case 'reset':
p.removeAllListeners('exit')
p.removeAllListeners('message')
p.process.kill()
start('main.js')
break
case 'uptime':
p.send(process.uptime())
break
}
})
p.on('exit', (_, code) => {
isRunning = false
console.error('❎ㅤOcurrio un error inesperado:', code)
if (code === 0) return
if (code === 'SIGKILL') p.emit('message', 'reset')
watchFile(args[0], () => {
unwatchFile(args[0])
start(file)
})
})
let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
if (!opts['test'])
if (!rl.listenerCount()) rl.on('line', line => {
p.emit('message', line.trim())
})
}

start('main.js')
