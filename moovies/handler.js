'use strict'

const alexa = require('./in/alexa')

let skill

module.exports.search = async (event, context) => {
  console.log(`[INFO] ${Date(Date.now())} Lambda disparada `)
  //console.log(`[INFO] Evento recebido: ${JSON.stringify(event, null, 2)}`)

  if (!skill) {
    skill = alexa.skill
  }

  return await skill.invoke(event, context)
}
