import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

// COMANDOS
let handler = async (m, { conn, command, args }) => {
    if (!m.isGroup) return m.reply('🥥 Solo funciona en grupos 🐆')
    if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {}
    let chat = global.db.data.chats[m.chat]

    // command = on/off | args[0] = welcome/bye/kick
    if (!command ||!args[0]) {
        let w = chat.welcome? '🥥 ON' : '💿 OFF'
        let b = chat.bye? '🥥 ON' : '💿 OFF'
        let k = chat.kick? '🥥 ON' : '💿 OFF'
        return conn.reply(m.chat, `╭─ 🥥 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 🪩 ─╮
│
│ 🐆 *Panel de Control*
│
│ 1. Bienvenidas : ${w}
│ 2. Despedidas : ${b}
│ 3. Expulsiones : ${k}
│
│ *Comandos*
│.on welcome /.off welcome
│.on bye /.off bye
│.on kick /.off kick
│
╰──────── 💿 ────────╯`, m)
    }

    let accion = command.toLowerCase()
    let tipo = args[0].toLowerCase()

    if (accion!== 'on' && accion!== 'off') return m.reply('🥥 Usa:.on welcome o.off welcome 🐆')
    if (!['welcome','bye','kick'].includes(tipo)) return m.reply('🥥 Tipo inválido. Usa: welcome, bye, kick 🐆')

    chat[tipo] = accion === 'on'
    let icon = chat[tipo]? '🥥' : '💿'
    let nombre = tipo === 'welcome'? 'Bienvenidas' : tipo === 'bye'? 'Despedidas' : 'Expulsiones'
    m.reply(`${icon} *${nombre}* ${chat[tipo]? 'activadas 🐆' : 'desactivadas 🪩'}`)
}
handler.command = /^(on|off)$/i
handler.help = ['on welcome', 'on bye', 'on kick']
handler.tags = ['welcome']
handler.admin = true
handler.group = true
export default handler

// DETECTOR
handler.before = async function (m, { conn }) {
    if (!m.messageStubType ||!m.isGroup) return
    if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {}
    let chat = global.db.data.chats[m.chat]

    let who = m.messageStubParameters?.[0]
    if (!who) return

    let metadata = await conn.groupMetadata(m.chat).catch(() => null)
    if (!metadata) return
    let user = '@' + who.split('@')[0]

    // FIX @lid
    let realJid = who
    if (who.endsWith('@lid')) {
        try {
            let info = await conn.onWhatsApp(who)
            realJid = info[0]?.jid || who
        } catch(e){}
    }

    // FOTO
    let img
    try {
        let pp = await conn.profilePictureUrl(realJid, 'image')
        img = await fetch(pp).then(v => v.buffer())
    } catch {
        img = await fetch('https://files.evogb.win/5wXYR4.jpg').then(v => v.buffer()).catch(() => null)
    }

    let txt = ''
    let audio = ''

    // WELCOME
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
        if (chat.welcome == false) return
        audio = 'bienvenida.mp3'
        txt = `╭─ 🥥 *Nuevo Miembro* 🐆 ─╮
│
│ 💿 *Usuario:* ${user}
│ 🪩 *Grupo:* ${metadata.subject}
│ 🐆 *Total:* ${metadata.participants.length} miembros
│
│ "Bienvenido a la jungla 🥥
│ Pasa y ponte cómodo 💿"
│
╰─────────────────────╯`
    }

    // BYE
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
        if (chat.bye == false) return
        audio = 'despedida.mp3'
        txt = `╭─ 🪩 *Se Fue* 💿 ─╮
│
│ 🐆 *Usuario:* ${user}
│ 🥥 *Grupo:* ${metadata.subject}
│ 💿 *Quedan:* ${metadata.participants.length} miembros
│
│ "Nos vemos pronto 🪩"
│
╰───────────────────╯`
    }

    // KICK
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
        if (chat.kick == false) return
        audio = 'kick.mp3'
        txt = `╭─ 🐆 *Expulsado* 🥥 ─╮
│
│ 💿 *Usuario:* ${user}
│ ⚠️ *Motivo:* Rompió reglas
│ 🪩 *Grupo:* ${metadata.subject}
│
│ "Aquí se respetan las reglas 🐆"
│
╰───────────────────╯`
    }

    if (!txt) return

    await conn.sendMessage(m.chat, {
        image: img,
        caption: txt,
        mentions: [who]
    })

    // AUDIO
    let audioPath = path.join(process.cwd(), audio)
    if (fs.existsSync(audioPath)) {
        setTimeout(async () => {
            await conn.sendMessage(m.chat, {
                audio: fs.readFileSync(audioPath),
                mimetype: 'audio/mpeg',
                ptt: false
            })
        }, 1500)
    }
}