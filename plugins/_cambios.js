import fetch from 'node-fetch'

const MARCA = 'Antitop Bot 💱'
const TZ = 'America/Lima'

let handler = async (m, { conn, text }) => {
  await conn.sendMessage(m.chat, { react: { text: '💱', key: m.key } }).catch(_=>{})

  if (!text ||!text.includes('/')) {
    return m.reply(`╭━〔 💱 *Antitop Bot - Cambios* 〕━╮
┃
┃ 🥥 *Antitop Dice: uso*
┃.cambio [monto] / [CODIGO] / [CODIGO]
┃
┃ 🐆 *ejemplos:*
┃.cambio 100 / PEN / USD → oficial
┃.cambio 100 / USD / ARS → blue 🇦🇷
┃.cambio 100 / ARS / PEN → blue inverso 🇦🇷
┃
┃ 💿 *monedas:* PEN, USD, EUR, ARS, COP, MXN, BRL...
┃
╰━━━━━━━━━━━━━━╯`)
  }

  let [montoStr, de, a] = text.split('/').map(v => v.trim().toUpperCase())
  let monto = parseFloat(montoStr.replace(/,/g, ''))

  if (isNaN(monto) || monto <= 0) return m.reply(`🪩 *Antitop Dice: monto invalido*`)
  if (de.length!== 3 || a.length!== 3) return m.reply(`🥥 *Antitop Dice: usa codigos de 3 letras* PEN, USD, ARS`)

  if (de === a) return m.reply(`🐆 *Antitop Dice: ${monto} ${de} = ${monto} ${a}*`)

  try {
    let tasaUSD_ARS = null
    let tipoTasa = 'OFICIAL'

    if (de === 'ARS' || a === 'ARS') {
      let resBlue = await fetch('https://dolarapi.com/v1/dolares/blue')
      let jsonBlue = await resBlue.json()
      if(!jsonBlue.venta) throw new Error('api blue down')
      tasaUSD_ARS = jsonBlue.venta
      tipoTasa = 'BLUE 🔵'
    }

    let total
    if (de === 'USD' && a === 'ARS') total = (monto * tasaUSD_ARS).toFixed(2)
    else if (de === 'ARS' && a === 'USD') total = (monto / tasaUSD_ARS).toFixed(2)
    else if (de === 'ARS') {
      let res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
      let json = await res.json()
      total = ((monto / tasaUSD_ARS) * json.rates[a]).toFixed(2)
    }
    else if (a === 'ARS') {
      let res = await fetch(`https://api.exchangerate-api.com/v4/latest/${de}`)
      let json = await res.json()
      total = ((monto * json.rates.USD) * tasaUSD_ARS).toFixed(2)
    }
    else {
      let res = await fetch(`https://api.exchangerate-api.com/v4/latest/${de}`)
      let json = await res.json()
      if(!json.rates[a]) throw new Error('moneda invalida')
      total = (monto * json.rates[a]).toFixed(2)
    }

    let fecha = new Date().toLocaleDateString('es-PE', { timeZone: TZ })

    let txt = `╭━〔 💱 *Resultado Antitop Bot* 〕━╮
┃
┃ 🪩 *Antitop Dice: conversion*
┃ ${monto} *${de}*
┃ ⬇️
┃ *${total}* *${a}*
┃
┃ 🥥 *tasa:* ${tipoTasa}
${tasaUSD_ARS? `┃ *1 usd* = *${tasaUSD_ARS}* ars` : ''}
┃ 🐆 *fecha:* ${fecha}
┃
╰━━━━━━━━╯
> *💿 Antitop Dice: datos en tiempo real*`

    m.reply(txt)

  } catch(e) {
    console.log(e)
    m.reply(`💿 *Antitop Dice: error* ${e.message}\n\nrevisa los codigos: PEN, USD, ARS, COP...`)
  }
}

handler.help = ['cambio ( monedas )']
handler.tags = ['main']
handler.command = /^cambio$/i
handler.group = true
export default handler