let handler = async (m, { conn, command }) => {
    
    let titulares = command === 'vs6' ? 6 : 4
    let suplentes = command === 'vs6' ? 3 : 2

    let listaTitulares = ''
    for(let i = 1; i <= titulares; i++) {
        listaTitulares += `🌟 ${i}. ・\n`
    }

    let listaSuplentes = ''
    for(let i = 1; i <= suplentes; i++) {
        listaSuplentes += `💜 ${i}. ・\n`
    }

    let plantilla = `🌙✧･ﾟ: *🌌 𝚃𝙴𝙰𝙼 𝙽𝙸𝙶𝙷𝚃𝚆𝙸𝚂𝙷 🌌* :ﾟ･✧🌙

👑 𝗘𝗡𝗖𝗔𝗥𝗚𝗔𝗗𝗔: ・
⏰ 𝗛𝗢𝗥𝗔: __:__ 🇦🇷  /  __:__ 🇵🇪

───────────────
    ✨ 𝗧𝗜𝗧𝗨𝗟𝗔𝗥𝗘𝗦 ✨
───────────────
${listaTitulares}
───────────────
   💫 𝗦𝗨𝗣𝗟𝗘𝗡𝗧𝗘𝗦 💫
───────────────
${listaSuplentes}
───────────────
   🎁 𝗗𝗢𝗡𝗔𝗗𝗢𝗥𝗔 𝗗𝗘 𝗦𝗔𝗟𝗔 🎁
───────────────
💎 ・

🌙✧･ﾟ: *Llenen y copien* :ﾟ･✧🌙`

    await conn.sendMessage(m.chat, { text: plantilla }, { quoted: m })
}

handler.help = ['vs4', 'vs6']
handler.tags = ['ff']
handler.command = /^(vs4|vs6)$/i
handler.group = true
handler.admin = true  // SOLO ADMINS

export default handler