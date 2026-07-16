let handler = async (m, { conn, isOwner }) => {
    if (!isOwner) return m.reply('❌ Solo el owner puede usar este comando')

    let botnum = conn.user.jid.split('@')[0]

    let texto = `🐼 *SOLICITUD DE INGRESO*

Hola admins! Soy el bot.
Por favor agréguenme al grupo.

*Mi número:* +${botnum}
*Link:* https://wa.me/${botnum}

Si hay verificación de ingreso, acéptenme porfa 💗`

    m.reply(texto)
}

handler.help = ['pedirjoin']
handler.tags = ['owner']
handler.command = ['pedirjoin', 'agregame']
handler.owner = true

export default handler