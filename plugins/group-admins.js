const handler = async (m, { conn, command }) => {
  if (!m.mentionedJid[0] &&!m.quoted) {
    let texto = `╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: control de admin*
│
│ 🐆 *menciona o responde al usuario*
│ 💿 *para ${command === 'promote' || command === 'promover' || command === 'daradmin'? 'promover' : 'degradar'} como administrador*
╰─────────────────❒`
    return m.reply(texto, m.chat, { mentions: conn.parseMention(texto) })
  }

  let user = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted.sender
  let action = /^(promote|promover|daradmin)$/i.test(command)? 'promote' : 'demote'

  let msgAccion = action === 'promote'
 ? `╭─❒ *『 Antitop Bot 』* ❒
│ 🪩 *Antitop Dice: promocion*
│
│ 👑 *@${user.split('@')[0]} ahora es administrador*
│ 💿 *accion por:* @${m.sender.split('@')[0]}
│
│ > *“permisos otorgados por el sistema”*
╰─────────────────❒`
    : `╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: degradacion*
│
│ 🛡️ *@${user.split('@')[0]} ya no es administrador*
│ 🐆 *accion por:* @${m.sender.split('@')[0]}
│
│ > *“permisos revocados por el sistema”*
╰─────────────────❒`

  await conn.groupParticipantsUpdate(m.chat, [user], action)
  m.reply(msgAccion, m.chat, { mentions: [user, m.sender] })
}

handler.help = ['promote', 'demote']
handler.tags = ['grupos']
handler.command = /^(promote|promover|daradmin|demote|degradar|quitaradmin)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler