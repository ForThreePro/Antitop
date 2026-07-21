import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let chat = global.db.data.chats[m.chat]
  let bot = global.db.data.settings[conn.user.jid] || {}

  // NUEVO: El primer arg es on/off, el segundo es el tipo
  let accion = command.toLowerCase() // on o off
  let type = args[0]?.toLowerCase()

  if (!type) {
    let w = chat.welcome? '🥥 ON' : '💿 OFF'
    let b = chat.bye? '🥥 ON' : '💿 OFF'
    let k = chat.kick? '🥥 ON' : '💿 OFF'
    let d = chat.detect? '🥥 ON' : '💿 OFF'
    return conn.reply(m.chat, `╭─ 🥥 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 🪩 ─╮
│
│ 🐆 *Panel de Control*
│
│ 1. Bienvenidas : ${w}
│ 2. Despedidas : ${b}
│ 3. Expulsiones : ${k}
│ 4. Detect : ${d}
│
│ *Comandos*
│.on welcome /.off welcome
│.on bye /.off bye
│.on kick /.off kick
│.on detect /.off detect
│
╰──────── 💿 ────────╯`, m)
  }

  let isEnable = accion === 'on'
  let fail = false

  switch (type) {
    case 'welcome': case 'bienvenida':
      if (m.isGroup &&!isAdmin) { global.dfail('admin', m, conn); fail = true; break }
      chat.welcome = isEnable
      break
    case 'bye': case 'despedida':
      if (m.isGroup &&!isAdmin) { global.dfail('admin', m, conn); fail = true; break }
      chat.bye = isEnable
      break
    case 'kick': case 'expulsion':
      if (m.isGroup &&!isAdmin) { global.dfail('admin', m, conn); fail = true; break }
      chat.kick = isEnable
      break
    case 'detect':
      if (m.isGroup &&!isAdmin) { global.dfail('admin', m, conn); fail = true; break }
      chat.detect = isEnable
      break
    case 'subbots': case 'serbot':
      if (!isROwner) { global.dfail('rowner', m, conn); fail = true; break }
      bot.jadibotmd = isEnable
      break
    case 'antispam':
      if (!isOwner) { global.dfail('owner', m, conn); fail = true; break }
      bot.antiSpam = isEnable
      break
    case 'antilink':
      if (m.isGroup &&!isAdmin) { global.dfail('admin', m, conn); fail = true; break }
      chat.antiLink = isEnable
      break
    case 'antibot':
      if (m.isGroup &&!isAdmin) { global.dfail('admin', m, conn); fail = true; break }
      chat.antiBot = isEnable
      break
    case 'modoadmin':
      if (m.isGroup &&!isAdmin) { global.dfail('admin', m, conn); fail = true; break }
      chat.modoadmin = isEnable
      break
    case 'nsfw': case 'antinopor':
      if (m.isGroup &&!isAdmin) { global.dfail('admin', m, conn); fail = true; break }
      chat.nsfw = isEnable
      break
    case 'audios':
      chat.audios = isEnable
      break
    case 'autoread': case 'autoleer':
      if (!isROwner) { global.dfail('rowner', m, conn); fail = true; break }
      global.opts['autoread'] = isEnable
      break
    case 'antiprivado':
      if (!isOwner) { global.dfail('owner', m, conn); fail = true; break }
      bot.antiPrivate = isEnable
      break
    default:
      return m.reply(`🥥 Tipo inválido. Usa: welcome, bye, kick, detect`)
  }

  if (fail) return

  const pathImg = join(process.cwd(), 'storage', 'img', 'antitop.jpg')
  let antitopImg = existsSync(pathImg)? readFileSync(pathImg) : null

  let estadoTexto = isEnable? 'activado 🥥' : 'desactivado ❌'
  let emoji = isEnable? '🥥' : '💿'

  let statusTxt = `${emoji} *Antitop Dice: config* 💿\n\n`
  statusTxt += `🐆 *funcion:* ${type}\n`
  statusTxt += `📊 *estado:* ${estadoTexto}\n\n`
  statusTxt += `💿 *Antitop Bot System*`

  if (antitopImg) {
    await conn.sendMessage(m.chat, { image: antitopImg, caption: statusTxt, mentions: [m.sender] }, { quoted: m })
  } else {
    await conn.sendMessage(m.chat, { text: statusTxt, mentions: [m.sender] }, { quoted: m })
  }
}

// LO IMPORTANTE: AHORA EL COMANDO ES on/off
handler.help = ['on/off welcome', 'on/off bye', 'on/off kick', 'on/off detect']
handler.tags = ['config']
handler.command = /^(on|off)$/i // ← Solo acepta.on y.off
handler.admin = true
handler.group = true

export default handler