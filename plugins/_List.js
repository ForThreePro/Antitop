import fs from 'fs'
import path from 'path'

const dbPath = path.join('./database', 'sorteos.json')
if (!fs.existsSync('./database')) fs.mkdirSync('./database')
if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, '{}')

const DIAS = ['lunes','martes','miercoles','jueves','viernes','sabado']
const TZ = 'America/Lima'

const cargarDB = () => JSON.parse(fs.readFileSync(dbPath))
const guardarDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
const getHoy = () => {
    let dia = new Date().toLocaleString('es-PE', {timeZone: TZ, weekday: 'long'}).toLowerCase()
    dia = dia.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return dia === 'domingo'? 'extra' : dia
}

const EMOJIS_DIA = {
    lunes: '🥥', martes: '🐆', miercoles: '💿', jueves: '🪩',
    viernes: '🥥', sabado: '🐆', extra: '💿'
}

let handler = async (m, { conn, args, command, isAdmin }) => {
    let gid = m.chat
    let data = cargarDB()
    if(!data[gid]) data[gid] = {lunes:[], martes:[], miercoles:[], jueves:[], viernes:[], sabado:[], extra:[]}

    let hoy = getHoy()
    let texto = args.join(' ')

    // =====.v ===== DISEÑO ANTITOP BOT
    if(command === 'v'){
        let msg = `╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: sistema de sorteos activo*
│ 🐆 *Bot:* Antitop Bot
╰─────────────────❒\n\n`

        for(let d of [...DIAS, 'extra']){
            msg += `╭─── ${EMOJIS_DIA[d]} ${d.toUpperCase()} ───╮\n`
            if(data[gid][d].length === 0) {
                msg += `│ 💿 _Antitop Dice: sin participantes_\n`
            } else {
                data[gid][d].forEach((u,i) => {
                    msg += `│ 🪩 ${i+1}️⃣ *${u.nombre}*\n`
                    msg += `│ 📱 \`${u.numero}\`\n`
                    msg += `│ 🎁 Premio: *${u.premio}*\n`
                    msg += `│ ─────────────────\n`
                })
            }
            msg += `╰───────────────────╯\n\n`
        }

        msg += `╭─❒ *『 COMANDOS 』* ❒\n`
        msg += `│ 🥥 *.list* Nombre / Numero / Premio\n`
        msg += `│ 🐆 *.extra* Nombre / Numero / Premio\n`
        msg += `│ 💿 *.delall* Borrar todo [Admin]\n`
        msg += `│ 🪩 *.v* Ver esta lista\n`
        msg += `╰─────────────────❒\n\n`
        msg += `> *🥥 Antitop Dice: conectando ganadores al sistema*\n`
        msg += `> *© Antitop Bot*`

        return conn.reply(m.chat, msg, m)
    }

    // =====.list =====
    if(command === 'list'){
        if(hoy === 'extra') return conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒\n│ 🥥 *Antitop Dice: error*\n│ domingo solo se anota en *extra*\n╰─────────────────❒`, m)

        let [nombre, numero, premio] = texto.split('/').map(x => x.trim())
        numero = numero?.replace(/[^0-9]/g, '')

        if(!nombre ||!numero ||!premio) return conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒\n│ 🐆 *Antitop Dice: formato incorrecto*\n│\n│ *ejemplo:*\n│.list whois / 936994155 / bot mensual\n╰─────────────────❒`, m)

        for(let d of Object.keys(data[gid])){
            data[gid][d] = data[gid][d].filter(u => u.numero!== numero)
        }

        data[gid][hoy].push({nombre, numero, premio})
        guardarDB(data)
        return conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒\n│ 💿 *Antitop Dice: registrado en el sistema*\n│\n│ 👤 *nombre:* ${nombre}\n│ 📱 *numero:* ${numero}\n│ 🎁 *premio:* ${premio}\n│ 📅 *dia:* ${hoy.toUpperCase()}\n│\n│ 🪩 *Antitop Dice: suerte en el sorteo*\n╰─────────────────❒`, m)
    }

    // =====.extra =====
    if(command === 'extra'){
        let [nombre, numero, premio] = texto.split('/').map(x => x.trim())
        numero = numero?.replace(/[^0-9]/g, '')

        if(!nombre ||!numero ||!premio) return conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒\n│ 🥥 *Antitop Dice: formato incorrecto*\n│\n│ *ejemplo:*\n│.extra juan / 999888777 / 20 soles\n╰─────────────────❒`, m)

        for(let d of Object.keys(data[gid])){
            data[gid][d] = data[gid][d].filter(u => u.numero!== numero)
        }

        data[gid].extra.push({nombre, numero, premio})
        guardarDB(data)
        return conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒\n│ 🐆 *Antitop Dice: anotado en extra*\n│\n│ 👤 *nombre:* ${nombre}\n│ 📱 *numero:* ${numero}\n│ 🎁 *premio:* ${premio}\n│\n│ 💿 *Antitop Dice: premio especial del sistema*\n╰─────────────────❒`, m)
    }

    // =====.delall =====
    if(command === 'delall'){
        if(!isAdmin) return conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒\n│ 🪩 *Antitop Dice: error*\n│ solo *admins* pueden usar esto\n╰─────────────────❒`, m)
        data[gid] = {lunes:[], martes:[], miercoles:[], jueves:[], viernes:[], sabado:[], extra:[]}
        guardarDB(data)
        return conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒\n│ 🥥 *Antitop Dice: sistema reiniciado*\n│\n│ 🐆 lista reseteada: lunes a sabado + extra\n│ 💿 *Antitop Dice: grupo listo para empezar de 0*\n╰─────────────────❒`, m)
    }
}

handler.help = ['v Ver lista','list Nombre / Numero / Premio','extra Nombre / Numero / Premio','delall Borrar todo [Admin]']
handler.tags = ['sorteos']
handler.command = ['v','list','extra','delall']
handler.group = true
export default handler