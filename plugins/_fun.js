let toM = a => '@' + a.split('@')[0]

// FUNCION PARA SACAR RANDOM
function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

let handler = async (m, { conn, groupMetadata, text, command }) => {

    if(command === 'formartrio' || command === 'formartrios'){
        if(!m.isGroup) return m.reply('Este comando solo funciona en grupos')

        let ps = groupMetadata.participants.map(v => v.id)
        if(ps.length < 3) return m.reply('Se necesitan mínimo 3 personas en el grupo')

        let a = getRandom(ps)
        let b
        do b = getRandom(ps)
        while (b === a)
        let c
        do c = getRandom(ps)
        while (c === a || c === b) // Arreglé el bug: antes decía b === a

        return m.reply(`*Hey!!! ${toM(a)}, ${toM(b)} y ${toM(c)} han pensado en hacer un trio? ustedes 3 hacen un buen trio 😳😏*`, null, {
            mentions: [a, b, c],
        })
    }

    if(command === 'penetrar' || command === 'penetrado'){
        // if (!db.data.chats[m.chat].nsfw && m.isGroup) return m.reply('Activa el NSFW primero')

        let user = m.mentionedJid[0] || (m.quoted? m.quoted.sender : null)
        if(!user) return m.reply('Menciona a alguien o responde a su mensaje\nEjemplo:.penetrar @usuario')

        let userName = `@${user.split('@')[0]}`

        const responseMessage = `
*TE HAN LLENADO LA CARA DE SEMEN POR PUTA Y ZORRA!*

*Le ha metido el pene a ${text? text : userName}* con todo y condón hasta quedar seco, has dicho "por favor más duroooooo!, ahhhhhhh, ahhhhhh, hazme un hijo que sea igual de pitudo que tú!" mientras te penetraba y luego te ha dejado en silla de ruedas!

*${userName}*
🔥 *YA TE HAN PENETRADO!*`

        return conn.reply(m.chat, responseMessage, null, { mentions: [user] })
    }
}

handler.help = ['formartrio', 'penetrar @user']
handler.tags = ['fun']
handler.command = ['formartrio','formartrios','penetrar', 'penetrado']
handler.group = true
export default handler