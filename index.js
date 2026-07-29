import path, { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { setupMaster, fork } from 'cluster'
import { createInterface } from 'readline'
import { createRequire } from "module";
import cfonts from 'cfonts';
import { runAnimation } from './lib/functions.js';
const { child, spawn, exec, execSync } = await import('child_process');
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname) // Bring in the hability to create the 'require' method
const { name, nameProyect, author, description } = require(join(__dirname, './package.json')) // https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/
const { say, render } = cfonts
await runAnimation(name, nameProyect, author, description)
const rl = createInterface({input: process.stdin, output: process.stdout})

const mainStart = [{name: 'ANIMXSCANS', path: 'start.js', message: 'Proceso arrancando...'}]

/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
const processes = new Map()

function existsAndAlive(name) {
    const p = processes.get(name)

    return (
        p &&
        p.worker &&
        p.worker.process &&
        p.worker.process.exitCode === null &&
        p.worker.isConnected()
    )
}

function start(file, meta) {

    return new Promise((resolve, reject) => {

        if (existsAndAlive(meta.name)) {
            console.log(`[SKIP] ${meta.name} ya existe`)
            return resolve()
        }

        cfonts.say(meta.message, {
            font: 'console',
            align: 'center',
            gradient: ['red', 'magenta']
        })

        const args = [
            join(__dirname, file),
            ...process.argv.slice(2)
        ]

        setupMaster({
            exec: args[0],
            args: args.slice(1)
        })

        const worker = fork()

        processes.set(meta.name, {
            worker,
            meta,
            restarting: false
        })

        console.log(
            `[START] ${meta.name} PID=${worker.process.pid}`
        )

        worker.on('message', data => {
            try {

                if (!data)
                    return
                if (typeof data === 'string') {
                    const raw = data.trim()

                if (/^fullreset$/i.test(data))
                    data = {
                        type: 'fullreset'
                }
                const match = raw.match(/^(reset|stop|start)\s+(.+)$/i)
                if (match) {

                const [, cmd, arg] = match

                data = {
                type: cmd.toLowerCase(),
                bot: arg.trim()
                }

                } else {

                data = {
                type: 'command',
                text: raw
                }
            }
        }

                if (typeof data === 'object' && data) {

                // respuesta a pregunta
                if (data.type === 'ask') {

                    rl.question(data.text, answer => {

                        if (worker.isConnected()) {
                            worker.send({
                                type: 'response',
                                answer: answer.trim()
                            })
                        }
                    })

                    return
                }

                // reset individual
                if (
                    typeof data === 'object' &&
                    data.type === 'reset'
                ) {

                    scheduleRestart(data.bot)
                    return
                }

                // reinicio global
                if (
                    typeof data === 'object' &&
                    data.type === 'fullreset'
                ) {

                    fullreset()
                    return
                }

                // stop
                if (
                    typeof data === 'object' &&
                    data.type === 'stop'
                ) {

                    stopbot(data.bot)
                    return
                }

                // start
                if (
                    typeof data === 'object' &&
                    data.type === 'start'
                ) {

                    const m =
                        mainStart.find(
                            x => x.name === data.bot
                        )

                    if (m)
                        start(m.path, m)

                    return
                }
            }
            } catch (e) {
                console.error(e)
            }
        })

        worker.once('disconnect', () => {

            console.log(
                `[IPC] ${meta.name} desconectado`
            )

            scheduleRestart(meta.name)
        })

        worker.once('exit', (code, signal) => {

            console.log(
                `[EXIT] ${meta.name}`,
                code,
                signal
            )

            if (
                code !== 0 ||
                signal
            ) {
                scheduleRestart(meta.name)
            }
        })

        worker.once('error', err => {

            console.error(
                `[ERROR] ${meta.name}`,
                err
            )

            scheduleRestart(meta.name)
        })

        resolve()
    })
}

async function cleanup(name) {

    const proc = processes.get(name)

    if (!proc)
        return

    try {

        proc.worker.removeAllListeners()

        if (
            proc.worker?.isConnected?.()
        ) {
            proc.worker.disconnect()
        }

        if (
            proc.worker.process
        ) {
            proc.worker.process.kill(
                'SIGTERM'
            )
        }

    } catch {}

    processes.delete(name)

    await new Promise(
        r => setTimeout(r, 2000)
    )
}

async function restartbot(name) {

    const proc =
        processes.get(name)

    if (!proc)
        return

    console.log(
        `♻️ Reiniciando ${name}`
    )

    const meta = proc.meta

    await cleanup(name)

    return start(
        meta.path,
        meta
    )
}

function scheduleRestart(name) {

    const proc =
        processes.get(name)

    if (!proc)
        return

    if (proc.restarting)
        return

    proc.restarting = true

    setTimeout(() => {

        restartbot(name)
            .catch(console.error)

    }, 1000)
}

async function stopbot(name) {

    console.log(
        `[STOP] ${name}`
    )

    await cleanup(name)
}

async function fullreset() {

    console.log(
        '🚨 FULL RESET'
    )

    const bots =
        [...processes.keys()]

    for (const b of bots)
        await cleanup(b)

    for (const m of mainStart)
        await start(
            m.path,
            m
        )
}


rl.on('SIGINT', () => {
console.log('\n❎ㅤSaliendo...');
process.exit(0);
});


start(mainStart[0].path, mainStart[0])
