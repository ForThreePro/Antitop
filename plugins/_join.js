let handler = async (m, { conn, text, isOwner }) => {
    if (!isOwner) return m.reply('🐼 Solo mi creador puede usar este comando')

    if (!text) return m.reply(`*Uso:*.join https://chat.whatsapp.com/xxxxx\nPásame el link y me uno al grupo 💗`)

    let link = text.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/)
    if (!link) return m.reply('❌ Link inválido. Envíame un link de grupo de WhatsApp válido')

    let code = link[1]

    // Mensaje de que ya se está uniendo
    await m.reply(`⏳ *Ya me estoy uniendo...*\n\nSi tienen verificación de ingreso al grupo, *acéptenme* porfa 🐼💗`)

    try {
        let res = await conn.groupAcceptInvite(code)

        // Mensaje cuando ya entró
        await conn.sendMessage(res + '@g.us', {
            text: `HOLA 🐼💗\nSoy COTTI DZN BOT\nGracias por aceptarme! Ya estoy aquí para ayudar ✨`
        })

        await m.reply(`✅ Ya me uní al grupo exitosamente\n*ID:* ${res}`)

    } catch (e) {
        console.log(e)
        if (e.message.includes('already')) {
            m.reply('❌ Ya estoy en ese grupo')
        } else if (e.message.includes('revoked')) {
            m.reply('❌ El link expiró o fue revocado')
        } else if (e.message.includes('pending')) {
            m.reply('⏳ Quedé pendiente de aprobación. Esperen a que un admin me acepte 🐼')
        } else {
            m.reply('❌ No pude unirme. Revisa el link o que no me hayan baneado')
        }
    }
}
handler.help = ['join <link>']
handler.tags = ['owner']
handler.command = ['join', 'unirbot', 'entrar']
handler.owner = true

export default handler