let handler = async (m, { conn, command, text }) => {
  let who = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0]
          : m.quoted? m.quoted.sender
          : m.sender;

  let name = await conn.getName(who);
  let userTarget = m.mentionedJid && m.mentionedJid[0]? `@${who.split('@')[0]}` : name;
  let porcentaje = Math.floor(Math.random() * 500) + 1;

  let respuestas = {
    // BASE
    'gay': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES 🏳️‍🌈* *${porcentaje}%* *GAY*\n💻 *Cyber Bot System*`,
    'lesbiana': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES 🏳️‍🌈* *${porcentaje}%* *LESBIANA*\n💻 *Cyber Bot System*`,
    'pajero': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES 😏💦* *${porcentaje}%* *PAJERO*\n💻 *Cyber Bot System*`,
    'pajera': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES 😏💦* *${porcentaje}%* *PAJERA*\n💻 *Cyber Bot System*`,
    'puto': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *PUTO*\n🔥 *MÁS INFO EN SU PRIVADO* 🔥🥵\n💻 *Cyber Bot System*`,
    'puta': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *PUTA*\n🔥 *MÁS INFO EN SU PRIVADO* 🔥🥵\n💻 *Cyber Bot System*`,
    'manco': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *MANCO* 💩\n💻 *Cyber Bot System*`,
    'manca': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *MANCA* 💩\n💻 *Cyber Bot System*`,
    'rata': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *RATA* 🐁 *COME QUESO* 🧀\n💻 *Cyber Bot System*`,
    'prostituto': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *PROSTITUTO* 🫦👅\n❓ *¿QUIÉN QUIERE DE SUS SERVICIOS?*\n💻 *Cyber Bot System*`,
    'prostituta': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *PROSTITUTA* 🫦👅\n❓ *¿QUIÉN QUIERE DE SUS SERVICIOS?*\n💻 *Cyber Bot System*`,

    // PERÚ + NUEVOS
    'choro': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CHORO* 🏃‍♂️💨\n⚠️ *GUARDEN SUS IPHONES* ⚠️\n💻 *Cyber Bot System*`,
    'cachero': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CACHERO* 😈\n🔥 *NI EN DISCOTECA LO PARAN* 🔥\n💻 *Cyber Bot System*`,
    'cauchera': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CAUCHERA* 😈💃\n🔥 *REINA DEL HUARIQUE* 🔥\n💻 *Cyber Bot System*`,
    'cabezón': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CABEZÓN* 🤯\n🧠 *PIENSA CON LA OTRA CABEZA*\n💻 *Cyber Bot System*`,
    'jinetero': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *JINETERO* 🏍️\n💨 *PILOTO DE MOTOTAXI*\n💻 *Cyber Bot System*`,
    'sangre': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *SANGRE* 🩸\n💸 *VIVE DE PRESTAMO*\n💻 *Cyber Bot System*`,
    'tragón': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *TRAGÓN* 🍻\n🍺 *SE TOMA HASTA EL AGUA DEL FLORERO*\n💻 *Cyber Bot System*`,
    'fresa': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *FRESA* 🍓\n💅 *HABLA COMO GRINGO*\n💻 *Cyber Bot System*`,
    'pipero': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *PIPERO* 🌿\n😵‍💫 *VIVE EN OTRA DIMENSIÓN*\n💻 *Cyber Bot System*`,
    'muerto': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *MUERTO* 💀\n😴 *DUERME EN TODA REUNIÓN*\n💻 *Cyber Bot System*`,

    // TUS 5 PEDIDOS
    'burro': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *BURRO* 🫏\n🤡 *NI EL JEFE LO ENTIENDE*\n💻 *Cyber Bot System*`,
    'burra': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *BURRA* 🫏\n🤡 *REPROBÓ HASTA EN EDUC. FÍSICA*\n💻 *Cyber Bot System*`,
    'kbro': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *KBRO* 😈\n🔥 *NO RESPETA NI A SU ABUELA*\n💻 *Cyber Bot System*`,
    'chivo': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CHIVO* 🐐\n💨 *HUELE A CERVEZA Y DISCOTECA*\n💻 *Cyber Bot System*`,
    'kchera': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *KCHERA* 😈💃\n🔥 *ROMPE CORAZONES*\n💻 *Cyber Bot System*`,

    // +30 NUEVOS
    'bamba': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *BAMBA* 📱\n⚠️ *CELULAR DURA 2 DIAS*\n💻 *Cyber Bot System*`,
    'yapa': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *YAPA* 🥭\n😏 *SIEMPRE PIDE DE MÁS*\n💻 *Cyber Bot System*`,
    'caña': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CAÑA* 🥃\n🍺 *CON 2 YA ESTÁ TIRADO*\n💻 *Cyber Bot System*`,
    'pata': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *PATA* 🤝\n😎 *EL ALMA DE LA JODA*\n💻 *Cyber Bot System*`,
    'floro': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *FLORO* 💬\n💋 *ENAMORA CON PURA MENTIRA*\n💻 *Cyber Bot System*`,
    'miserable': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *MISERABLE* 💸\n🥺 *PIDE YAPA Y NO PAGA*\n💻 *Cyber Bot System*`,
    'gil': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *GIL* 🤡\n😵 *SE CAE SOLO*\n💻 *Cyber Bot System*`,
    'gilasa': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *GILASA* 🤡\n😵 *CREE TODO*\n💻 *Cyber Bot System*`,
    'lenteja': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *LENTEJA* 🐢\n🐌 *DEMORA 1 HORA EN RESPONDER*\n💻 *Cyber Bot System*`,
    'chibolo': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CHIBOLO* 👶\n🎮 *VIVE EN FREE FIRE*\n💻 *Cyber Bot System*`,
    'chibola': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CHIBOLA* 👧\n💄 *SUBE 20 HISTORIAS AL DÍA*\n💻 *Cyber Bot System*`,
    'viejo': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *VIEJO* 👴\n😮‍💨 *SE QUEJA DE TODO*\n💻 *Cyber Bot System*`,
    'vieja': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *VIEJA* 👵\n🗣️ *CHISME NIVEL DIOS*\n💻 *Cyber Bot System*`,
    'grasa': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *GRASA* 💪\n🏋️ *SOLO VA AL GYM A TOMAR FOTOS*\n💻 *Cyber Bot System*`,
    'graso': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *GRASO* 💪\n😎 *PIENSA QUE ESTÁ BUENAZO*\n💻 *Cyber Bot System*`,
    'pituco': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *PITUCO* 💎\n💳 *PAGA CON YAPE DE SU MAMÁ*\n💻 *Cyber Bot System*`,
    'pituca': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *PITUCA* 💎\n💅 *TOMA CAFÉ DE 30 SOLES*\n💻 *Cyber Bot System*`,
    'sapa': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *SAPA* 🐸\n👀 *VE TODO Y CUENTA TODO*\n💻 *Cyber Bot System*`,
    'sapo': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *SAPO* 🐸\n👀 *EL INFORMATIVO DEL GRUPO*\n💻 *Cyber Bot System*`,
    'pavo': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *PAVO* 🦃\n🤦 *SE TROPIEZA SOLO*\n💻 *Cyber Bot System*`,
    'pava': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *PAVA* 🦃\n🤦 *OLVIDA HASTA SU NOMBRE*\n💻 *Cyber Bot System*`,
    'trome': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *TROME* 👑\n🔥 *EL CRACK DEL BARRIO*\n💻 *Cyber Bot System*`,
    'reina': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *REINA* 👑\n💅 *MANDA EN EL GRUPO*\n💻 *Cyber Bot System*`,
    'king': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *KING* 👑\n😎 *EL JEFE DE LA JODA*\n💻 *Cyber Bot System*`,
    'zombie': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *ZOMBIE* 🧟\n😴 *VIVE CON SUEÑO*\n💻 *Cyber Bot System*`,
    'tóxica': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *TÓXICA* ☠️\n💔 *REVISA CELULAR*\n💻 *Cyber Bot System*`,
    'tóxico': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *TÓXICO* ☠️\n💔 *CELOSO NIVEL DIOS*\n💻 *Cyber Bot System*`,
    'simp': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *SIMP* 🥺\n💌 *MANDA 50 AUDIOS*\n💻 *Cyber Bot System*`,
    'vago': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *VAGO* 🛌\n😴 *TRABAJA 2 HORAS AL AÑO*\n💻 *Cyber Bot System*`,
    'vaga': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *VAGA* 🛌\n📺 *MARATON DE NETFLIX*\n💻 *Cyber Bot System*`,
    'loquito': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *LOQUITO* 🤪\n🌀 *HABLA SOLO*\n💻 *Cyber Bot System*`,

    // NUEVOS PEDIDOS ⚡
    'fiel': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *FIEL* 💍\n❤️ *NI CON 10 CERVEZAS ENGANCHA*\n💻 *Cyber Bot System*`,
    'infiel': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *INFIEL* 💔\n😏 *TIENE 3 Y NINGUNA SABE*\n💻 *Cyber Bot System*`
  }

  let respuestaFinal = respuestas[command.toLowerCase()];

  if (respuestaFinal) {
    await conn.sendMessage(m.chat, {
      text: respuestaFinal,
      mentions: [who]
    }, { quoted: m });
  }
}

handler.help = ['gay', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'burro', 'burra', 'kbro', 'chivo', 'kchera', 'choro', 'cachero', 'cauchera', 'cabezón', 'jinetero', 'sangre', 'tragón', 'fresa', 'pipero', 'muerto', 'bamba', 'yapa', 'caña', 'pata', 'floro', 'miserable', 'gil', 'gilasa', 'lenteja', 'chibolo', 'chibola', 'viejo', 'vieja', 'grasa', 'graso', 'pituco', 'pituca', 'sapa', 'sapo', 'pavo', 'pava', 'trome', 'reina', 'king', 'zombie', 'tóxica', 'tóxico', 'simp', 'vago', 'vaga', 'loquito', 'manco', 'manca', 'rata', 'prostituta', 'prostituto', 'fiel', 'infiel'].map((v) => v + " *@user*")
handler.tags = ['fun']
handler.command = /^(gay|lesbiana|pajero|pajera|puto|puta|burro|burra|kbro|chivo|kchera|choro|cachero|cauchera|cabezón|jinetero|sangre|tragón|fresa|pipero|muerto|bamba|yapa|caña|pata|floro|miserable|gil|gilasa|lenteja|chibolo|chibola|viejo|vieja|grasa|graso|pituco|pituca|sapa|sapo|pavo|pava|trome|reina|king|zombie|tóxica|tóxico|simp|vago|vaga|loquito|manco|manca|rata|prostituta|prostituto|fiel|infiel)$/i

export default handler
