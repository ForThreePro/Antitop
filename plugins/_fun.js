let toM = a => '@' + a.split('@')[0]

// FUNCION PARA SACAR RANDOM
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]

let handler = async (m, { conn, groupMetadata, text, command, usedPrefix }) => {

    // 1. COMANDO:.formartrio.formartrios
    if(['formartrio','formartrios'].includes(command)){
        if(!m.isGroup) return m.reply('Este comando solo funciona en grupos')
        let ps = groupMetadata.participants.map(v => v.id)
        if(ps.length < 3) return m.reply('Se necesitan mínimo 3 personas en el grupo')

        let a = getRandom(ps)
        let b
        do b = getRandom(ps)
        while (b === a)
        let c
        do c = getRandom(ps)
        while (c === a || c === b)

        return m.reply(`*Hey!!! ${toM(a)}, ${toM(b)} y ${toM(c)} han pensado en hacer un trio? ustedes 3 hacen un buen trio 😳😏*`, null, {
            mentions: [a, b, c],
        })
    }

    // 2. COMANDO:.penetrar.penetrado
    if(['penetrar','penetrado'].includes(command)){
        let user = m.mentionedJid[0] || (m.quoted? m.quoted.sender : null)
        if(!user) return m.reply(`*✳️ Menciona a quien deseas penetrar*\n\n*📌 ejemplo :*\n${usedPrefix + command} @tag`)

        let userName = `@${user.split('@')[0]}`
        const responseMessage = `
*TE HAN LLENADO LA CARA DE SEMEN POR PUTA Y ZORRA!*

*Le ha metido el pene a ${text || userName}* con todo y condón hasta quedar seco, has dicho "por favor más duroooooo!, ahhhhhhh, ahhhhhh, hazme un hijo que sea igual de pitudo que tú!" mientras te penetraba y luego te ha dejado en silla de ruedas!

*${userName}*
🔥 *YA TE HAN PENETRADO!*`
        return conn.reply(m.chat, responseMessage, null, { mentions: [user] })
    }

    // 3. COMANDO:.follar
    if(command === 'follar'){
        let who = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : text? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
        if (!who) return m.reply(`*✳️ menciona a quien deseas follar*\n\n*📌 ejemplo :*\n${usedPrefix + command} @tag`)

        const abrazo = await conn.reply(m.chat, `@${m.sender.split('@')[0]} se esta follando duro a @${who.split('@')[0]}`, m, {mentions: [who, m.sender]})
        return conn.sendMessage(m.chat, {react: {text: '👌🏼', key: abrazo.key}})
    }

    // 4. COMANDO:.kchero.kchera.folladora.follador
    if(/^kchero|kchera|folladora|follador$/i.test(command)){
        if (!text) throw `*[⚠️ ERROR ⚠️]*\n\n*ESCRIBE EL NOMBRE DE DOS PERSONAS PARA CALCULAR SU ATRACCIÓN SEXUAL*\n*Ejemplo: ${usedPrefix + command} Juan Maria*`
        let [text1,...text2] = text.split(' ')
        text2 = (text2 || []).join(' ')
        if (!text2) throw `*[⚠️ ERROR ⚠️]*\n\n*ESCRIBE EL NOMBRE DE LA SEGUNDA PERSONA*`

        let love = `_🥵 *${text1}* tu oportunidad de cogerte a *${text2}* es de *${Math.floor(Math.random() * 100)}%* 👉👌_\n\n¡Fóllal@ de una vez! con el comando *${usedPrefix}follar ${text2}*`
        return m.reply(love)
    }

    // 5. COMANDO:.love.amor
    if(/^(love|amor)$/i.test(command)){
        if(!text) return m.reply(`*Ejemplo: ${usedPrefix + command} @usuario*`)

        const lovePercentage = Math.floor(Math.random() * 100)
        const isHighLove = lovePercentage >= 50
        const loveMessages = ["¡Eso es un amor ardiente y apasionado! ¡Ve y díselo ahora mismo!", "Parece que hay una chispa entre ustedes dos. ¡Inténtalo!", "Podría haber algo especial aquí. ¡Dale una oportunidad!"]
        const notSoHighLoveMessages = ["A veces, la amistad es el comienzo de algo hermoso, pero no siempre se convierte en amor.", "El amor no es todo, ¡la amistad también es genial!", "Recuerda que las mejores relaciones comienzan con una buena amistad."]
        const loveDescription = isHighLove? "tienen una conexión profunda y un amor" : "tienen una conexión especial, aunque en el amor su porcentaje es"
        const getRandomMessage = (messages) => messages[Math.floor(Math.random() * messages.length)]
        const loveMessage = isHighLove? getRandomMessage(loveMessages) : getRandomMessage(notSoHighLoveMessages)

        const response = `━━━━━━━⬣ *LOVE* ⬣━━━━━━━\n*❥ En el universo del amor, ${text} y @${m.sender.split('@')[0]} ${loveDescription} del ${lovePercentage}% de un 100%*\n\n*❥ ${loveMessage}*\n━━━━━━━⬣ *LOVE* ⬣━━━━━━━`

        let { key } = await conn.sendMessage(m.chat, {text: `*💞 ¡Calculando Porcentaje! 💞*`, mentions: conn.parseMention(response)}, {quoted: m})
        let hawemod = ["《 █▒》10%","《 ████▒》30%","《 ███████▒》50%","《 ██████████▒》80%","《 ████████████》100%"]
        for (let i = 0; i < hawemod.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 800))
            await conn.sendMessage(m.chat, {text: hawemod[i], edit: key, mentions: conn.parseMention(response)}, {quoted: m})
        }
        return conn.sendMessage(m.chat, {text: response, edit: key, mentions: conn.parseMention(response)}, {quoted: m})
    }

    // 6. COMANDO:.nalga
    if(command === 'nalga'){
        let who = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : text? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
        if (!who) return m.reply(`*✳️ menciona a quien deseas agarrarle la nalga*\n\n*📌 ejemplo :*\n${usedPrefix + command} @tag`)

        const abrazo = await conn.reply(m.chat, `@${m.sender.split('@')[0]} le esta agarrando la nalga a @${who.split('@')[0]}`, m, {mentions: [who, m.sender]})
        return conn.sendMessage(m.chat, {react: {text: '🍑', key: abrazo.key}})
    }

    // 7. COMANDO:.zorra
    if(command === 'zorra'){
        let userMentioned = m.mentionedJid[0]
        if (!userMentioned) throw '🥵 *MENCIONA A UN USUARIO PARA CALCULAR SU PORCENTAJE DE ZORRA.*'

        let zorraPercentage = Math.floor(Math.random() * 101)
        let zorraMessage = `━━━━━━━━━━━━━━━\n🥵 *${conn.getName(userMentioned)}*, eres más zorra que tu madre en 4 patas y tienes un ${zorraPercentage}% de serlo!\n━━━━━━━━━━━━━━━`
        return m.reply(zorraMessage, null, { mentions: [userMentioned] })
    }
}

handler.help = ['formartrio', 'penetrar @user', 'follar @user', 'kchero nombre1 nombre2', 'love @user', 'nalga @user', 'zorra @user']
handler.tags = ['fun']
handler.command = /^(formartrio|formartrios|penetrar|penetrado|follar|kchero|kchera|folladora|follador|love|amor|nalga|zorra)$/i
handler.group = true
export default handler