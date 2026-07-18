const userSpamData = {}

let handler = async (m, { conn, args, isOwner }) => {
  if (!isOwner) return global.dfail('owner', m, conn)
  let bot = global.db.data.settings[conn.user.jid] || {}

  if (/on/i.test(args[0])) {
    bot.antiSpam = true
    await conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: anti-spam activado*
│
│ 🐆 *estado:* encendido
│ 💿 *filtro:* stickers + emojis
│ 🪩 *Antitop Dice: el sistema vigila el flood*
╰─────────────────❒`, m)
  } else if (/off/i.test(args[0])) {
    bot.antiSpam = false
    await conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒
│ 🐆 *Antitop Dice: anti-spam desactivado*
│
│ 💿 *estado:* apagado
│ 🪩 *Antitop Dice: se permiten stickers y emojis*
╰─────────────────❒`, m)
  } else {
    await conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒
│ 💿 *Antitop Dice: panel anti-spam*
│
│ 🥥 *uso:*.antispam on /.antispam off
│ 🐆 *funcion:* anti flood de stickers/emojis
│ 💿 *limite:* 4 avisos | 6 expulsion
│
│ 🪩 *Antitop Dice: mantén el sistema limpio*
╰─────────────────❒`, m)
  }
}

handler.help = ['antispam on/off']
handler.tags = ['config']
handler.command = /^(antispam)$/i

handler.before = async function (m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, isPrems }) {
  const chat = global.db.data.chats[m.chat]
  const bot = global.db.data.settings[conn.user.jid] || {}

  if (!bot.antiSpam || m.fromMe) return

  const sender = m.sender
  const currentTime = Date.now()
  const timeWindow = 6000
  const warnLimit = 4
  const kickLimit = 6

  const isEmojiOnly = m.text? /^(?:\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\p{Emoji_Modifier_Base}|\p{Emoji_Modifier}|\p{Emoji_Component})+$/u.test(m.text.trim()) : false
  const isSticker = m.mtype === 'stickerMessage'

  if (!isSticker &&!isEmojiOnly) return

  if (!userSpamData[sender] || (currentTime - userSpamData[sender].startTime > timeWindow)) {
    userSpamData[sender] = {
      startTime: currentTime,
      messageCount: 1
    }
  } else {
    userSpamData[sender].messageCount++
  }

  const count = userSpamData[sender].messageCount

  if (isOwner || isROwner) {
    if (count === warnLimit) {
      await conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: aviso al owner*
│
│ 🐆 *bajale al spam creador*
│ 💿 *estas saturando el sistema*
╰─────────────────❒`, m)
    }
    return
  }

  if (m.isGroup && (isAdmin || isPrems ||!isBotAdmin)) return

  if (count === warnLimit) {
    await conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒
│ 🪩 *Antitop Dice: deteccion de spam*
│
│ 🥥 *usuario:* @${sender.split('@')[0]}
│ 🐆 *progreso:* ${count}/${kickLimit}
│ 💿 *Antitop Dice: baja al flood*
│
│ > *sigue asi y activa el protocolo*
╰─────────────────❒`, m, { mentions: [sender] })
  }
  else if (count >= kickLimit) {
    await conn.reply(m.chat, `╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: expulsion ejecutada*
│
│ 🐆 *usuario:* @${sender.split('@')[0]}
│ 💿 *causa:* spam de stickers/emojis
│ 🪩 *Antitop Dice: protocolo de seguridad activado*
│
│ > *sistema protegido por Antitop Bot*
╰─────────────────❒`, m, { mentions: [sender] })
    if (m.isGroup) {
      await conn.groupParticipantsUpdate(m.chat, [sender], 'remove')
    }
    delete userSpamData[sender]
  }
}

export default handler