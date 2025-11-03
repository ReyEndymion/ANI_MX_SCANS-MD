import chalk from 'chalk'
import path, { join, dirname } from 'path'
import { createRequire } from "module";
import { fileURLToPath } from 'url'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts';
import { createInterface } from 'readline'
import yargs from 'yargs'
import { runAnimation } from './lib/functions.js';
const { child, spawn, exec, execSync } = await import('child_process');
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname) // Bring in the hability to create the 'require' method
const { name, nameProyect, author, description } = require(join(__dirname, './package.json')) // https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/
const { say, render } = cfonts
const rl = createInterface(process.stdin, process.stdout)
await runAnimation(name, nameProyect, author, description)
var isRunning = false

/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
function start(file) {
let args = [join(__dirname, file), ...process.argv.slice(2)]

say(`${description}`, {
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
if (data.type === 'ask') {
rl.question(data.text, (answer) => {
p.send({ type: 'response', answer: answer.trim() });
});
} else {
console.log('[RECEIVED]', data)
}
switch (data) {
case 'reset':
p.removeAllListeners('exit')
p.removeAllListeners('message')
p.process.kill()
start(file)
break
case 'uptime':
p.send(process.uptime())
break
}
})
p.on('exit', (_, code) => {
isRunning = false
console.error('❎ㅤOcurrio un error inesperado:', code)
p.removeAllListeners('exit')
p.removeAllListeners('message')
if (code === 0) return
if (code !== 0 || code === 'SIGKILL' || code === 'SIGABRT') p.emit('message', 'reset');start(file)
watchFile(args[0], () => {
unwatchFile(args[0])
start(file)
})
})
let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
if (!opts['test']) {
if (!rl.listenerCount()) {
rl.on('line', line => {
p.emit('message', line.trim())
})
}
rl.prompt()
}
}
rl.on('SIGINT', () => {
console.log('\n❎ㅤSaliendo...');
process.exit(0);
});

start('start.js')
