const handler = async (m, { conn, command }) => {
  if (!m.mentionedJid[0] &&!m.quoted) {
    let texto = `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ 🛡️ *CONTROL DE ADMIN*
│
│ ⚡ *Menciona o responde al usuario*
│ 🌙 *para ${command === 'promote' || command === 'promover' || command === 'daradmin'? 'promover' : 'degradar'} como administrador*
╰─────────────────❒`
    return m.reply(texto, m.chat, { mentions: conn.parseMention(texto) })
  }

  let user = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted.sender
  let action = /^(promote|promover|daradmin)$/i.test(command)? 'promote' : 'demote'

  let msgAccion = action === 'promote'
   ? `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ ⚡ *PROMOCIÓN*
│
│ 👑 *@${user.split('@')[0]} ahora es Administrador*
│ 🌙 *Acción por:* @${m.sender.split('@')[0]}
│
│ > *“El trueno le otorga poder”*
╰─────────────────❒`
    : `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ ⛈️ *DEGRADACIÓN*
│
│ 🛡️ *@${user.split('@')[0]} ya no es Administrador*
│ 🌙 *Acción por:* @${m.sender.split('@')[0]}
│
│ > *“El rayo retira el mando”*
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