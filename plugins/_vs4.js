let handler = async (m, { conn, participants, groupMetadata, command }) => {

    // SI ES GDC
    if (command === 'gdc' || command === 'guerradeclanes' || command === 'guerra') {
        const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './storage/img/rayo.jpg'
        const groupAdmins = participants.filter(p => p.admin)
        const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'

        let text = `🥥✧･ﾟ: *💿 gdc - antitop bot 💿* :ﾟ･✧🥥

👑 *sistema:* ${groupMetadata.subject}
⏰ *horario:* __:__ 🇦🇷 / __:__ 🇵🇪

╭──────────────╮
│🐆 *equipo* ➹1
│
│👑 ➤ ・
│💿 ➤ ・
│🪩 ➤ ・
│🥥 ➤ ・
│
│🐆 *equipo* ➹2
│
│👑 ➤ ・
│💿 ➤ ・
│🪩 ➤ ・
│🥥 ➤ ・
│
│🐆 *equipo* ➹3
│
│👑 ➤ ・
│💿 ➤ ・
│🪩 ➤ ・
│🥥 ➤ ・
│
│🐆 *equipo* ➹4
│
│👑 ➤ ・
│💿 ➤ ・
│🪩 ➤ ・
│🥥 ➤ ・
│
│🐆 *equipo* ➹5
│
│👑 ➤ ・
│💿 ➤ ・
│🪩 ➤ ・
│🥥 ➤ ・
│
│🐆 *equipo* ➹6
│
│👑 ➤ ・
│💿 ➤ ・
│🪩 ➤ ・
│🥥 ➤ ・
│
│💿 *reservas:*
│🐆 ➤ ・
│🥥 ➤ ・
│🪩 ➤ ・
│💿 ➤ ・
│🐆 ➤ ・
│🥥 ➤ ・
╰─────────────╯

🥥✧･ﾟ: *Antitop Dice: completen y copien* :ﾟ･✧🥥`.trim()

        return await conn.sendFile(m.chat, pp, 'gdc.jpg', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
    }

    // SI ES VS4 O VS6
    let titulares = command === 'vs6'? 6 : 4
    let suplentes = command === 'vs6'? 3 : 2

    let listaTitulares = ''
    for(let i = 1; i <= titulares; i++) {
        listaTitulares += `🐆 ${i}. ・\n`
    }

    let listaSuplentes = ''
    for(let i = 1; i <= suplentes; i++) {
        listaSuplentes += `💿 ${i}. ・\n`
    }

    let plantilla = `🥥✧･ﾟ: *💿 antitop bot 💿* :ﾟ･✧🥥

👑 *admin:* ・
⏰ *hora:* __:__ 🇦🇷 / __:__ 🇵🇪

───────────────
    🐆 *titulares* 🐆
───────────────
${listaTitulares}
───────────────
   💿 *reservas* 💿
───────────────
${listaSuplentes}
───────────────
   🪩 *anfitrion* 🪩
───────────────
🥥 ・

🥥✧･ﾟ: *Antitop Dice: completen y copien* :ﾟ･✧🥥`

    await conn.sendMessage(m.chat, { text: plantilla }, { quoted: m })
}

handler.help = ['vs4', 'vs6', 'gdc']
handler.tags = ['ff']
handler.command = /^(vs4|vs6|gdc|guerradeclanes|guerra)$/i
handler.group = true
handler.admin = true // SOLO ADMINS

export default handler