import chalk from 'chalk'
import { WAMessageStubType } from '@whiskeysockets/baileys'

let handler = m => m

handler.before = async function (m, { conn, groupMetadata }) {
    if (!m.messageStubType ||!m.isGroup) return

    let chat = global.db.data.chats[m.chat]
    if (!chat?.detect) return

    const userJid = m.sender
    const usuario = `@${userJid.split('@')[0]}`
    const group = groupMetadata.subject

    let txt = ''

    switch (m.messageStubType) {
        case 21: // Cambiar nombre
            txt = `╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: registro del sistema*
│
│ 📢 *cambio de nombre*
│ 👤 *usuario:* ${usuario}
│ 📝 *nuevo:* _${m.messageStubParameters[0]}_
│ 💻 *grupo:* ${group}
│
│ > *🪩 Antitop Dice: sistema renombrado correctamente*
╰─────────────────❒`; break

        case 22: // Cambiar foto
            txt = `╭─❒ *『 Antitop Bot 』* ❒
│ 🐆 *Antitop Dice: registro del sistema*
│
│ 📸 *cambio de foto*
│ 👤 *usuario:* ${usuario}
│ 🖼️ *nueva imagen establecida*
│ 💻 *grupo:* ${group}
│
│ > *💿 Antitop Dice: imagen actualizada en el sistema*
╰─────────────────❒`; break

        case 23: // Cambiar link
            txt = `╭─❒ *『 Antitop Bot 』* ❒
│ 🪩 *Antitop Dice: alerta de seguridad*
│
│ 🔗 *link reseteado*
│ 👤 *usuario:* ${usuario}
│ 💻 *grupo:* ${group}
│
│ > *🥥 Antitop Dice: protocolo de enlace modificado*
╰─────────────────❒`; break

        case 25: // Cambiar ajustes
            txt = `╭─❒ *『 Antitop Bot 』* ❒
│ 💿 *Antitop Dice: ajustes modificados*
│
│ 👤 *usuario:* ${usuario}
│ ⚙️ *permisos:* ${m.messageStubParameters[0] == 'on'? '*solo admins* 🔒' : '*todos* 🔓'}
│ 📊 *edicion de info de grupo*
│
│ > *🐆 Antitop Dice: permisos del sistema actualizados*
╰─────────────────❒`; break

        case 26: // Abrir/Cerrar
            txt = `╭─❒ *『 Antitop Bot 』* ❒
│ 🥥 *Antitop Dice: estado del sistema*
│
│ 👤 *usuario:* ${usuario}
│ 🗣️ *modo:* ${m.messageStubParameters[0] == 'on'? '*solo admins* 🔒' : '*todos* 🔓'}
│ 📢 *grupo:* ${m.messageStubParameters[0] == 'on'? 'cerrado' : 'abierto'}
│
│ > *🪩 Antitop Dice: modo de comunicacion actualizado*
╰─────────────────❒`; break

        case 29: // Dar admin
            txt = `╭─❒ *『 Antitop Bot 』* ❒
│ 🐆 *Antitop Dice: ascenso de rango*
│
│ ⚡ *nuevo admin:* @${m.messageStubParameters[0].split('@')[0]}
│ 👤 *otorgado por:* ${usuario}
│ 💻 *rango:* administrador
│
│ > *💿 Antitop Dice: acceso de administrador concedido*
╰─────────────────❒`; break

        case 30: // Quitar admin
            txt = `╭─❒ *『 Antitop Bot 』* ❒
│ 🪩 *Antitop Dice: rango revocado*
│
│ 💥 *admin removido:* @${m.messageStubParameters[0].split('@')[0]}
│ 👤 *ejecutado por:* ${usuario}
│ 🗑️ *permisos eliminados*
│
│ > *🥥 Antitop Dice: acceso de administrador revocado*
╰─────────────────❒`; break

        case WAMessageStubType.GROUP_PARTICIPANT_ADD:
            txt = `╭─❒ *『 Antitop Bot 』* ❒
│ 💿 *Antitop Dice: nuevo usuario conectado*
│
│ 🔥 *bienvenido:* @${m.messageStubParameters[0].split('@')[0]}
│ 💻 *sistema:* ${group}
│ 🥥 *estado:* conexion registrada
│
│ > *🐆 Antitop Dice: nuevo nodo agregado al sistema*
╰─────────────────❒`; break

        case WAMessageStubType.GROUP_PARTICIPANT_LEAVE:
            txt = `╭─❒ *『 Antitop Bot 』* ❒
│ 🪩 *Antitop Dice: desconexion registrada*
│
│ 😔 *se fue:* @${m.messageStubParameters[0].split('@')[0]}
│ 💻 *sistema:* ${group}
│ 💿 *estado:* abandono el sistema
│
│ > *🥥 Antitop Dice: nodo desconectado*
╰─────────────────❒`; break

        case WAMessageStubType.GROUP_PARTICIPANT_REMOVE:
            txt = `╭─❒ *『 Antitop Bot 』* ❒
│ 🐆 *Antitop Dice: expulsion ejecutada*
│
│ 💣 *eliminado:* @${m.messageStubParameters[0].split('@')[0]}
│ 👤 *por orden de:* ${usuario}
│ 💿 *causa:* violacion de protocolos
│
│ > *🪩 Antitop Dice: protocolo de seguridad aplicado*
╰─────────────────❒`; break
    }

    if (txt) {
        await this.sendMessage(m.chat, {
            text: txt,
            mentions: [userJid,...(m.messageStubParameters?.[0]? [m.messageStubParameters[0]] : [])]
        })
    }
}

export default handler