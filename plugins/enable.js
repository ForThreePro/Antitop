import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(args[0])
  let chat = global.db.data.chats[m.chat]
  let bot = global.db.data.settings[conn.user.jid] || {}
  let type = command.toLowerCase()

  if (!args[0]) return m.reply(`🥥 *Antitop Dice: config* 💿\n\n🐆 *configuracion incorrecta.*\n📌 *uso:* ${usedPrefix + command} on/off\n*ejemplo:* ${usedPrefix + command} on`)

  let fail = false
  switch (type) {
    // NUEVOS: WELCOME BYE KICK
    case 'welcome': case 'bienvenida':
      if (m.isGroup &&!isAdmin) { global.dfail('admin', m, conn); fail = true; break }
      chat.welcome = isEnable // unificado en ingles
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
      return
  }

  if (fail) return

  // IMAGEN LOCAL antitop.jpg
  const pathImg = join(process.cwd(), 'storage', 'img', 'antitop.jpg')
  let antitopImg = existsSync(pathImg)? readFileSync(pathImg) : null

  let estadoTexto = isEnable? 'activado 🥥' : 'desactivado ❌'
  let emoji = isEnable? '🥥' : '💿'

  let statusTxt = `${emoji} *Antitop Dice: config* 💿\n\n`
  statusTxt += `🐆 *funcion:* ${type}\n`
  statusTxt += `📊 *estado:* ${estadoTexto}\n\n`
  statusTxt += `💿 *Antitop Bot System*`

  if (antitopImg) {
    await conn.sendMessage(m.chat, {
      image: antitopImg,
      caption: statusTxt,
      mentions: [m.sender]
    }, { quoted: m })
  } else {
    await conn.sendMessage(m.chat, {
      text: statusTxt,
      mentions: [m.sender]
    }, { quoted: m })
  }
}

handler.help = ['welcome', 'bye', 'kick', 'detect', 'antilink', 'antibot', 'modoadmin', 'subbots', 'nsfw', 'audios', 'antiprivado'].map(v => v + ' on/off')
handler.tags = ['config']
handler.command = ['welcome', 'bienvenida', 'bye', 'despedida', 'kick', 'expulsion', 'detect', 'subbots', 'serbot', 'antispam', 'antilink', 'antibot', 'modoadmin', 'nsfw', 'antinopor', 'audios', 'autoleer', 'autoread', 'antiprivado']

export default handler